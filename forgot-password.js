(() => {
  'use strict';
  const { $, checkEmail, revalidateOnInput } = window.Auth;
  const email = $('email'), status = $('status'), submit = $('submit');
  const check = () => checkEmail(email, $('email-err'));
  revalidateOnInput(email, check);

  $('form').addEventListener('submit', (e) => {
    e.preventDefault();
    status.className = 'status'; status.textContent = '';
    if (!check()) { email.focus(); return; }
    submit.disabled = true; submit.textContent = 'Sending…';
    // Demo only: no email is sent. The wording is deliberately generic so a real
    // implementation would not reveal whether an address has an account.
    setTimeout(() => {
      submit.disabled = false; submit.textContent = 'Send reset link';
      status.textContent = 'If an account exists for that address, a reset link would be sent. (Demo: nothing was sent.)';
    }, 900);
  });
})();
