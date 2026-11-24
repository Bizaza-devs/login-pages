(() => {
  'use strict';
  const { $, setError, checkEmail, revalidateOnInput, wireToggle } = window.Auth;
  const name = $('name'), email = $('email'), pw = $('password'), confirm = $('confirm'), terms = $('terms');
  const status = $('status'), submit = $('submit'), strength = $('strength');

  const checkName = () => setError(name, $('name-err'), name.value.trim() ? '' : 'Enter your name.');
  const checkMail = () => checkEmail(email, $('email-err'));
  const checkPw = () => setError(pw, $('pw-err'), !pw.value ? 'Choose a password.' : pw.value.length < 8 ? 'Use at least 8 characters.' : '');
  const checkConfirm = () => setError(confirm, $('confirm-err'), confirm.value !== pw.value ? 'The passwords do not match.' : '');
  const checkTerms = () => setError(terms, $('terms-err'), terms.checked ? '' : 'Please accept the terms to continue.');

  function score(v) {
    let s = 0;
    if (v.length >= 8) s++;
    if (v.length >= 12) s++;
    if (/[a-z]/.test(v) && /[A-Z]/.test(v)) s++;
    if (/\d/.test(v) && /[^A-Za-z0-9]/.test(v)) s++;
    return s;
  }
  pw.addEventListener('input', () => {
    strength.textContent = pw.value ? ['weak', 'weak', 'fair', 'good', 'strong'][score(pw.value)] : '–';
    if (confirm.value) checkConfirm();
  });

  [[name, checkName], [email, checkMail], [pw, checkPw], [confirm, checkConfirm]].forEach(([i, f]) => revalidateOnInput(i, f));
  terms.addEventListener('change', checkTerms);
  wireToggle($('toggle'), [pw, confirm]);

  $('form').addEventListener('submit', (e) => {
    e.preventDefault();
    status.className = 'status'; status.textContent = '';
    const checks = [[name, checkName], [email, checkMail], [pw, checkPw], [confirm, checkConfirm], [terms, checkTerms]];
    const results = checks.map(([, f]) => f());
    const firstBad = checks.find((_, i) => !results[i]);
    if (firstBad) { firstBad[0].focus(); return; }
    submit.disabled = true; submit.textContent = 'Creating…';
    // Demo only: no network request is made and nothing is stored.
    setTimeout(() => {
      submit.disabled = false; submit.textContent = 'Create account';
      status.textContent = 'Demo mode: the form is valid. No account was created.';
      pw.value = confirm.value = ''; strength.textContent = '–';
    }, 900);
  });
})();
