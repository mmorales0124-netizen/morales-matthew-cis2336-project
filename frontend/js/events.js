// ArtConnect — events.js
// Handles:
//   1. Dynamic event detail display (click a card -> modal with full info)
//   2. Room booking form: field validation + a MOCK availability check.
//
// IMPORTANT: The availability check below is a placeholder using a local
// JS object. It only exists so the form has something to validate against
// during front-end development. Once the backend exists, replace
// checkAvailability() with a real fetch() call to the server, which will
// be the actual source of truth for room availability.

document.addEventListener('DOMContentLoaded', () => {
  initEventModal();
  initBookingForm();
});

/* ============================================================
   1. EVENT DETAIL MODAL
   ============================================================ */
function initEventModal() {
  const cards = Array.from(document.querySelectorAll('.event-card'));
  const modal = document.getElementById('eventModal');
  if (!modal || cards.length === 0) return;

  const modalImage = document.getElementById('eventModalImage');
  const modalDate = document.getElementById('eventModalDate');
  const modalTitle = document.getElementById('eventModalTitle');
  const modalLoc = document.getElementById('eventModalLoc');
  const modalDesc = document.getElementById('eventModalDesc');
  const closeBtn = document.getElementById('eventModalClose');

  function openModal(card) {
    const d = card.dataset;
    modalImage.src = d.image;
    modalImage.alt = d.title + ' event photo';
    modalDate.textContent = d.date;
    modalTitle.textContent = d.title;
    modalLoc.textContent = d.location;
    modalDesc.textContent = d.description;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    closeBtn.focus();
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  cards.forEach((card) => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.addEventListener('click', () => openModal(card));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(card);
      }
    });
  });

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });
}

/* ============================================================
   2. ROOM BOOKING FORM
   ============================================================ */
function initBookingForm() {
  const form = document.getElementById('bookingForm');
  if (!form) return;

  const fields = {
    name: document.getElementById('bookName'),
    email: document.getElementById('bookEmail'),
    room: document.getElementById('bookRoom'),
    date: document.getElementById('bookDate'),
    time: document.getElementById('bookTime'),
    guests: document.getElementById('bookGuests'),
  };

  const capacityHint = document.getElementById('roomCapacityHint');
  const statusBox = document.getElementById('bookingStatus');
  const submitBtn = document.getElementById('bookingSubmit');

  // Room capacities — used for the guest-count validation and the hint text.
  const ROOM_CAPACITY = {
    'aftermath-main-hall': 120,
    'the-hollow-basement': 45,
    'vantablack-studio': 30,
    'the-drowned-room': 60,
    'static-chapel': 80,
  };

  // MOCK booked slots: "roomId|YYYY-MM-DD|timeSlot" -> true.
  // Stand-in for a real backend availability lookup.
  const MOCK_BOOKED_SLOTS = {
    'aftermath-main-hall|2026-08-14|evening': true,
    'the-hollow-basement|2026-09-02|evening': true,
    'vantablack-studio|2026-09-20|afternoon': true,
  };

  // set the date input's minimum to today, so past dates can't be picked
  const todayStr = new Date().toISOString().split('T')[0];
  fields.date.setAttribute('min', todayStr);

  // show room capacity dynamically when a room is selected
  fields.room.addEventListener('change', () => {
    const cap = ROOM_CAPACITY[fields.room.value];
    capacityHint.textContent = cap ? `Capacity: up to ${cap} guests` : '';
  });

  function showError(field, message) {
    field.classList.add('invalid');
    field.setAttribute('aria-invalid', 'true');
    const errorEl = document.getElementById(field.id + 'Error');
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add('show');
    }
  }

  function clearError(field) {
    field.classList.remove('invalid');
    field.removeAttribute('aria-invalid');
    const errorEl = document.getElementById(field.id + 'Error');
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.classList.remove('show');
    }
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function validateForm() {
    let firstInvalid = null;
    let valid = true;

    function fail(field, message) {
      showError(field, message);
      valid = false;
      if (!firstInvalid) firstInvalid = field;
    }

    clearError(fields.name);
    clearError(fields.email);
    clearError(fields.room);
    clearError(fields.date);
    clearError(fields.time);
    clearError(fields.guests);

    if (fields.name.value.trim().length < 2) {
      fail(fields.name, 'Enter your full name.');
    }

    if (fields.email.value.trim() === '') {
      fail(fields.email, 'Email address is required.');
    } else if (!isValidEmail(fields.email.value.trim())) {
      fail(fields.email, 'Enter a valid email address (e.g. name@example.com).');
    }

    if (fields.room.value === '') {
      fail(fields.room, 'Select a room.');
    }

    if (fields.date.value === '') {
      fail(fields.date, 'Select a date.');
    } else if (fields.date.value < todayStr) {
      fail(fields.date, 'Date cannot be in the past.');
    }

    if (fields.time.value === '') {
      fail(fields.time, 'Select a time slot.');
    }

    const guestsRaw = fields.guests.value.trim();
    if (guestsRaw === '') {
      fail(fields.guests, 'Enter the number of attendees.');
    } else if (!/^\d+$/.test(guestsRaw) || Number(guestsRaw) < 1) {
      fail(fields.guests, 'Enter a whole number of 1 or more.');
    } else if (fields.room.value && Number(guestsRaw) > ROOM_CAPACITY[fields.room.value]) {
      fail(fields.guests, `This room holds a maximum of ${ROOM_CAPACITY[fields.room.value]} guests.`);
    }

    return { valid, firstInvalid };
  }

  // Placeholder availability check — replace with a real backend call later.
  function checkAvailability(roomId, date, time) {
    const key = `${roomId}|${date}|${time}`;
    return !MOCK_BOOKED_SLOTS[key];
  }

  function showStatus(type, message) {
    statusBox.textContent = message;
    statusBox.classList.remove('success', 'conflict');
    statusBox.classList.add('show', type);
  }

  function hideStatus() {
    statusBox.classList.remove('show', 'success', 'conflict');
    statusBox.textContent = '';
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    hideStatus();

    const { valid, firstInvalid } = validateForm();
    if (!valid) {
      firstInvalid.focus();
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Checking availability…';

    // simulate a brief lookup delay, standing in for a real server round-trip
    setTimeout(() => {
      const available = checkAvailability(fields.room.value, fields.date.value, fields.time.value);

      if (!available) {
        showStatus('conflict', 'That room is already booked for the selected date and time. Please choose a different slot — final availability will be confirmed by the server once the backend is connected.');
      } else {
        showStatus('success', `Request received: ${fields.room.options[fields.room.selectedIndex].text} on ${fields.date.value} (${fields.time.options[fields.time.selectedIndex].text}). This is not yet a confirmed booking — the backend will finalize and confirm availability in a future phase.`);
        form.reset();
        capacityHint.textContent = '';
      }

      submitBtn.disabled = false;
      submitBtn.textContent = 'Request Booking';
    }, 600);
  });

  // clear individual field errors as the user fixes them
  Object.values(fields).forEach((field) => {
    field.addEventListener('input', () => clearError(field));
    field.addEventListener('change', () => clearError(field));
  });
}
