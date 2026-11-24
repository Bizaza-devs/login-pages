(() => {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const form = $('form'), email = $('email'), pw = $('password');
  const emailErr = $('email-err'), pwErr = $('pw-err'), status = $('status');
  const submit = $('submit'), toggle = $('toggle');
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function setError(input, el, msg) {
    el.textContent = msg;
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
  }
  function checkEmail() {
    const v = email.value.trim();
    const msg = !v ? 'Enter your email address.' : emailRe.test(v) ? '' : 'That email address looks incomplete.';
    setError(email, emailErr, msg); return !msg;
  }
  function checkPw() {
    const v = pw.value;
    const msg = !v ? 'Enter your password.' : v.length < 8 ? 'Use at least 8 characters.' : '';
    setError(pw, pwErr, msg); return !msg;
  }

  email.addEventListener('blur', checkEmail);
  pw.addEventListener('blur', checkPw);
  email.addEventListener('input', () => email.getAttribute('aria-invalid') === 'true' && checkEmail());
  pw.addEventListener('input', () => pw.getAttribute('aria-invalid') === 'true' && checkPw());

  toggle.addEventListener('click', () => {
    const show = pw.type === 'password';
    pw.type = show ? 'text' : 'password';
    toggle.textContent = show ? 'Hide' : 'Show';
    toggle.setAttribute('aria-pressed', String(show));
    toggle.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    status.className = 'status'; status.textContent = '';
    const okEmail = checkEmail(), okPw = checkPw();
    if (!okEmail || !okPw) { (okEmail ? pw : email).focus(); return; }
    submit.disabled = true; submit.textContent = 'Signing in…';
    // Demo only: no network request is made and nothing is stored.
    setTimeout(() => {
      submit.disabled = false; submit.textContent = 'Sign in';
      status.textContent = 'Demo mode: the form is valid. No server is connected.';
      pw.value = '';
    }, 900);
  });

})();
