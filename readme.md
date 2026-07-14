ArtConnect

A gallery and community platform for artists working in the dark, and pure expression inspired, and built for CIS 2336.

🔗 Repository: https://github.com/mmorales0124-netizen/morales-matthew-cis2336-project (update with your actual repo URL)


Table of Contents


About the Project
Features
Tech Stack
Project Structure
Getting Started
Usage
Known Limitations
AI Usage Disclosure
Credits
License



About the Project

ArtConnect is a front-end web platform built for artists whose work doesn't quite fit the traditional gallery mold. It gives artists a place to display their work, lets visitors browse and filter a gallery, and lists community events — all wrapped in a dystopian, gothic visual identity inspired by Bladee's ethereal digital-decay aesthetic, The Cure's romantic gothic mood, and Underoath's DIY scene energy.

This project was built as the front-end phase of a two-part assignment for CIS 2336. The backend (real data persistence, authentication, and server-side booking/submission handling) is a planned future phase — everything here runs entirely in the browser.

Why this design direction? Most student gallery sites default to a clean, minimal, corporate look. ArtConnect intentionally leans into something moodier and more specific — a chromatic-aberration glitch effect on the wordmark, a drifting fog background, blackletter typography — to make the site feel like an actual extension of the kind of art it showcases, rather than a generic template.

Challenges faced:


Getting a subtle, always-visible glitch/chromatic-aberration effect on the hero title without it being distracting or inaccessible (solved with a low-opacity constant offset plus periodic sharper pulses, and respecting prefers-reduced-motion).
Building form validation that's genuinely accessible (aria-invalid, aria-describedby, focus management) instead of just visually flagging errors.
Structuring reusable page-specific CSS/JS files (gallery.css, events.js, etc.) that extend a shared style.css design system without duplicating the whole stylesheet per page.


Planned for a future phase:


Connecting the Artist Submission form and Room Booking form to a real backend.
Real room-availability data instead of the current mocked JS object.
User accounts so artists can manage their own submissions.



Features


Homepage — hero section with a glitching wordmark, welcome message, ArtConnect description, featured artwork, featured events, and developer contact info.
Gallery — six credited artworks (image, title, artist, category, price/"Not for Sale") in a responsive 3-column grid, with a full click-to-enlarge lightbox (keyboard-navigable, with prev/next), plus an embedded YouTube video.
Events — four upcoming events with a click-to-expand detail modal populated dynamically via JavaScript, and a 5-room booking form with full client-side validation and a mocked availability check.
Artist Submission — a form for submitting artwork info (name, email, title, category, price, description) with full client-side validation; not yet connected to a backend.
FAQ — six expandable/collapsible questions with an accessible accordion, plus "Expand All" / "Collapse All" controls.
References — documents every image source, multimedia source, external resource, and AI prompt used during development.



Tech Stack


HTML5 — semantic markup across all six pages
CSS3 — custom properties (CSS variables) for a shared design system, CSS Grid & Flexbox for layout, no framework
Vanilla JavaScript — no libraries or frameworks; all interactivity (nav toggle, lightbox, modals, accordions, form validation) is hand-written
Google Fonts — UnifrakturMaguntia (display), Jost (body), Space Mono (labels/UI)
Lorem Picsum — royalty-free placeholder photography for event images



Project Structure

morales-matthew-cis2336-project/
│
├── frontend/
│   ├── index.html
│   ├── css/
│   │   ├── style.css        # shared design system (colors, type, layout)
│   │   ├── gallery.css
│   │   ├── events.css
│   │   ├── faq.css
│   │   ├── submit.css
│   │   └── references.css
│   ├── js/
│   │   ├── script.js        # shared: mobile nav toggle
│   │   ├── gallery.js       # lightbox
│   │   ├── events.js        # event modal + booking form validation
│   │   ├── faq.js           # accordion
│   │   └── submit.js        # submission form validation
│   ├── images/               # artwork images + favicon/logo assets
│   └── pages/
│       ├── gallery.html
│       ├── events.html
│       ├── submit.html
│       ├── faq.html
│       └── references.html
│
├── backend/                  # reserved for a future phase
└── README.md


Getting Started

This is a static front-end project — no build tools, package installs, or server-side setup required.


Clone the repository


   git clone https://github.com/yourusername/morales-matthew-cis2336-project.git
   cd morales-matthew-cis2336-project


Open the project in VS Code (or your editor of choice).
Run it with a local server, rather than double-clicking the HTML file directly. The embedded YouTube video on the Gallery page requires a real http:// origin to work correctly — opening the file directly (file://) can throw a player error.

In VS Code, install the Live Server extension, then right-click frontend/index.html → Open with Live Server.
Or, from the project root, run a simple local server: python3 -m http.server, then visit http://localhost:8000/frontend/.



Navigate the site using the nav bar — Home, Gallery, Events, Submit Art, FAQ, References.



Usage


Browsing the gallery: click any artwork to open it full-size in a lightbox. Use the on-screen arrows, your keyboard's arrow keys, or Esc to navigate/close.
Viewing events: click any event card to see its full description in a modal.
Booking a room: fill out the booking form on the Events page. All fields are validated client-side; a mocked availability check will occasionally flag a slot as already booked, to demonstrate what a real backend response would look like.
Submitting artwork: fill out the form on the Submit Art page. Check "Not for Sale" if the piece isn't priced. On successful validation you'll see a confirmation message — no data is actually saved anywhere yet.
FAQ: click any question to expand its answer, or use "Expand All" / "Collapse All."



Known Limitations


The Artist Submission form and Room Booking form do not connect to a real backend yet — both are front-end validation demos only, per the current assignment phase.
Room availability on the Events page is simulated using a hardcoded JavaScript object, not real data.
Artwork images displayed in the Gallery are real, copyrighted works used for a non-commercial school project with attribution (see References) — they are not original submissions and are not for sale.



AI Usage Disclosure

Claude (Anthropic) was used throughout development to help design the visual direction, write HTML/CSS/JS, and debug issues (such as a YouTube embed player error). A full, chronological log of the prompts used is documented on the References page under AI Prompts Used During Development, per the assignment's academic honesty requirement.


Credits

Developer: Matthew Morales Galdamez
Contact: mfmoral3@cougarnet.uh.edu
Course: CIS 2336

Artwork, fonts, and media credits are listed in full on the References page.


License

This project was created for academic purposes as part of a CIS 2336 course assignment. It is not licensed for commercial use or redistribution. Artwork displayed in the Gallery remains the property of its respective original artists.