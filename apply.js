// Application form → Google Sheets via Apps Script
const APPLY_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyYHQrL_XzHpOJfdyUcgdwp2W3zltJWop2Og9SkVU9E06W8RG9pVj2-gShpyPltRvvr7g/exec';

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('apply-form');
  if (!form) return;

  const btn = form.querySelector('.apply-btn');
  const note = document.getElementById('apply-note');
  const originalText = btn.textContent;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const interest = form.querySelector('[name="interest"]').value;
    const building = form.querySelector('[name="building"]').value.trim();
    const potential = form.querySelector('[name="potential"]').value.trim();

    if (!name || !email || !interest || !building || !potential) return;

    btn.textContent = 'Sending…';
    btn.disabled = true;

    try {
      await fetch(APPLY_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'application',
          name: name,
          email: email,
          interest: interest,
          building: building,
          potential: potential
        })
      });

      form.reset();
      btn.textContent = 'Sent ✓';
      note.textContent = 'Got it. I\'ll be in touch.';

      setTimeout(function () {
        btn.textContent = originalText;
        btn.disabled = false;
      }, 5000);

    } catch (err) {
      btn.textContent = 'Try again';
      btn.disabled = false;
      note.textContent = 'Something went wrong. Please try again.';

      setTimeout(function () {
        btn.textContent = originalText;
        note.textContent = '';
      }, 3000);
    }
  });
});
