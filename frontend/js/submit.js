// ArtConnect — submit.js
// Handles: client-side validation for the Artist Submission form.
// NOTE: this form does NOT connect to a backend yet. On successful
// validation it just shows a confirmation message and resets — no
// data is actually sent or stored anywhere. Wire this up to a real
// endpoint once the backend exists.

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('submitForm');
  if (!form) return;

  const fields = {
    name: document.getElementById('subName'),
    email: document.getElementById('subEmail'),
    title: document.getElementById('subTitle'),
    category: document.getElementById('subCategory'),
    price: document.getElementById('subPrice'),
    description: document.getElementById('subDescription'),
  };

  const notForSale = document.getElementById('subNotForSale');
  const charCount = document.getElementById('descCharCount');
  const statusBox = document.getElementById('submitStatus');
  const submitBtn = document.getElementById('submitBtn');

  const MIN_DESCRIPTION_LENGTH = 20;

  /* ---------- "Not for Sale" disables the price field ---------- */
  notForSale.addEventListener('change', () => {
    if (notForSale.checked) {
      fields.price.value = '';
      fields.price.disabled = true;
      clearError(fields.price);
    } else {
      fields.price.disabled = false;
    }
  });

  /* ---------- live description character counter ---------- */
  fields.description.addEventListener('input', () => {
    const len = fields.description.value.trim().length;
    charCount.textContent = `${len} / ${MIN_DESCRIPTION_LENGTH} minimum characters`;
    charCount.classList.toggle('low', len < MIN_DESCRIPTION_LENGTH);
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

    Object.values(fields).forEach(clearError);

    // Artist Name — empty-field validation
    if (fields.name.value.trim().length < 2) {
      fail(fields.name, 'Enter the artist\'s full name.');
    }

    // Email — empty-field + email-format validation
    if (fields.email.value.trim() === '') {
      fail(fields.email, 'Email address is required.');
    } else if (!isValidEmail(fields.email.value.trim())) {
      fail(fields.email, 'Enter a valid email address (e.g. name@example.com).');
    }

    // Artwork Title — empty-field validation
    if (fields.title.value.trim() === '') {
      fail(fields.title, 'Enter the artwork\'s title.');
    }

    // Category — empty-field validation
    if (fields.category.value === '') {
      fail(fields.category, 'Select a category.');
    }

    // Price — numeric validation, skipped entirely if "Not for Sale" is checked
    if (!notForSale.checked) {
      const priceRaw = fields.price.value.trim();
      if (priceRaw === '') {
        fail(fields.price, 'Enter a price, or check "Not for Sale."');
      } else if (isNaN(Number(priceRaw)) || Number(priceRaw) <= 0) {
        fail(fields.price, 'Price must be a number greater than 0.');
      }
    }

    // Description — empty-field + minimum-length validation
    const descLen = fields.description.value.trim().length;
    if (descLen === 0) {
      fail(fields.description, 'Enter a short description of the artwork.');
    } else if (descLen < MIN_DESCRIPTION_LENGTH) {
      fail(fields.description, `Description must be at least ${MIN_DESCRIPTION_LENGTH} characters (currently ${descLen}).`);
    }

    return { valid, firstInvalid };
  }

  function showStatus(type, message) {
    statusBox.textContent = message;
    statusBox.classList.remove('success', 'error');
    statusBox.classList.add('show', type);
  }

  function hideStatus() {
    statusBox.classList.remove('show', 'success', 'error');
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
    submitBtn.textContent = 'Submitting…';

    // No backend yet — simulate a brief processing delay, then confirm.
    setTimeout(() => {
      const priceText = notForSale.checked ? 'Not for Sale' : `$${Number(fields.price.value).toFixed(2)}`;
      showStatus(
        'success',
        `Thanks, ${fields.name.value.trim()} — "${fields.title.value.trim()}" (${priceText}) has been received. This is a front-end demo only: nothing was actually saved. The backend will handle real submissions in a future phase.`
      );
      form.reset();
      fields.price.disabled = false;
      charCount.textContent = `0 / ${MIN_DESCRIPTION_LENGTH} minimum characters`;
      charCount.classList.remove('low');

      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit Artwork';
    }, 600);
  });

  // clear individual field errors as the user fixes them
  Object.values(fields).forEach((field) => {
    field.addEventListener('input', () => clearError(field));
    field.addEventListener('change', () => clearError(field));
  });
});
