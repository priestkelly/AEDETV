document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? '×' : '☰';
    });
  }

  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === current) link.classList.add('active');
  });

  document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(item => item.classList.remove('active'));
      button.classList.add('active');
      const filter = button.dataset.filter;
      document.querySelectorAll('.track').forEach(track => {
        track.hidden = !(filter === 'all' || track.dataset.year === filter);
      });
    });
  });

  document.querySelectorAll('.faq button').forEach(button => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq');
      item.classList.toggle('open');
      button.querySelector('span').textContent = item.classList.contains('open') ? '−' : '＋';
    });
  });

  document.querySelectorAll('.demo-form').forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const notice = form.querySelector('.notice');
      if (notice) notice.classList.add('show');
    });
  });
});



const form = document.getElementById("aede-tv-form");
const status = document.getElementById("form-status");
const submitBtn = document.getElementById("submit-btn");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
    status.hidden = true;

    try {
        const response = await fetch(form.action, {
            method: "POST",
            body: new FormData(form),
            headers: {
                "Accept": "application/json"
            }
        });

        if (response.ok) {
            status.textContent = "Your message has been sent successfully! Thank you for contacting AEDETV.";
            status.hidden = false;
            form.reset();
        } else {
            const result = await response.json();
            status.textContent = result.errors
                ? result.errors.map(error => error.message).join(", ")
                : "Unable to send your message. Please try again.";
            status.hidden = false;
        }

    } catch (error) {
        status.textContent = "Connection error. Please check your internet and try again.";
        status.hidden = false;
    }

    submitBtn.disabled = false;
    submitBtn.textContent = "Send message";
});


const bookingForm = document.getElementById("aede-booking-form");
const bookingStatus = document.getElementById("booking-status");
const bookingButton = document.getElementById("booking-submit-btn");

if (bookingForm && bookingStatus && bookingButton) {

    bookingForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        bookingButton.disabled = true;
        bookingButton.textContent = "Sending enquiry...";
        bookingStatus.hidden = false;
        bookingStatus.textContent = "Submitting your enquiry...";

        try {
            const response = await fetch(bookingForm.action, {
                method: "POST",
                body: new FormData(bookingForm),
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.ok) {
                bookingStatus.textContent =
                    "Your booking enquiry has been sent successfully! Thank you for contacting AEDETV.";

                bookingForm.reset();

            } else {
                const result = await response.json();

                bookingStatus.textContent = result.errors
                    ? result.errors.map(error => error.message).join(", ")
                    : "Submission failed. Please try again.";
            }

        } catch (error) {
            console.error("Booking form error:", error);

            bookingStatus.textContent =
                "Connection error. Please check your internet connection and try again.";
        }

        bookingButton.disabled = false;
        bookingButton.textContent = "Send booking enquiry";
    });

}
