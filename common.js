/* Shared helpers for the minimal auth pages. Demo only: no network, nothing stored. */
window.Auth = (() => {
  'use strict';
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const $ = (id) => document.getElementById(id);
  function setError(input, el, msg) {
    el.textContent = msg;
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    return !msg;
  }
  function checkEmail(input, el) {
    const v = input.value.trim();
    return setError(input, el, !v ? 'Enter your email address.' : emailRe.test(v) ? '' : 'That email address looks incomplete.');
  }
  function revalidateOnInput(input, fn) {
    input.addEventListener('blur', fn);
    input.addEventListener('input', () => input.getAttribute('aria-invalid') === 'true' && fn());
  }
  function wireToggle(btn, inputs) {
    btn.addEventListener('click', () => {
      const show = inputs[0].type === 'password';
      inputs.forEach((i) => { i.type = show ? 'text' : 'password'; });
      btn.textContent = show ? 'Hide' : 'Show';
      btn.setAttribute('aria-pressed', String(show));
      btn.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
    });
  }
  return { $, setError, checkEmail, revalidateOnInput, wireToggle };
})();
