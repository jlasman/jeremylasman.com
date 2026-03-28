// Email capture → Google Sheets via Apps Script
// Replace SCRIPT_URL with your deployed Google Apps Script URL
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyYHQrL_XzHpOJfdyUcgdwp2W3zltJWop2Og9SkVU9E06W8RG9pVj2-gShpyPltRvvr7g/exec';

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('subscribe-form');
  if (!form) return;

  const btn = form.querySelector('.capture-btn');
  const input = form.querySelector('.capture-input');
  const note = document.getElementById('capture-note');
  const originalText = btn.textContent;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = input.value.trim();
    if (!email) return;

    btn.textContent = 'Sending…';
    btn.disabled = true;

    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          source: window.location.pathname
        })
      });

      // no-cors means we can't read the response, but the request goes through
      input.value = '';
      btn.textContent = 'Subscribed ✓';
      note.textContent = 'You\'re in. Thank you.';
      
      setTimeout(function () {
        btn.textContent = originalText;
        btn.disabled = false;
        note.textContent = 'Your email stays private. No spam, ever.';
      }, 4000);

    } catch (err) {
      btn.textContent = 'Try again';
      btn.disabled = false;
      note.textContent = 'Something went wrong. Please try again.';
      
      setTimeout(function () {
        btn.textContent = originalText;
        note.textContent = 'Your email stays private. No spam, ever.';
      }, 3000);
    }
  });
});
