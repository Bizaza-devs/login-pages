# Login pages

> Template-friendly starter: three plain HTML/CSS/JS auth screens with validation, accessibility and dark/light theme. Use it as a starting point, not as a production auth system.

Three small, accessible auth pages in plain HTML, CSS and JavaScript. No framework, no dependencies, no build step.

| Page | Style | Link |
|---|---|---|
| Sign in | card, gradient accent | [index.html](https://bizaza-devs.github.io/login-pages/) |
| Create account | minimal | [create-account.html](https://bizaza-devs.github.io/login-pages/create-account.html) |
| Reset password | minimal | [forgot-password.html](https://bizaza-devs.github.io/login-pages/forgot-password.html) |

**Live:** https://bizaza-devs.github.io/login-pages/

## What it does
- Client-side validation with inline error messages (email format, minimum password length, matching passwords, terms)
- Password strength hint on the create-account page; the reset page uses neutral wording so a real backend would not reveal which emails have accounts
- Show / hide password toggle
- Keyboard and screen-reader friendly: labels, `aria-invalid`, `role="alert"`, visible focus rings
- Dark and light theme (follows the system), respects `prefers-reduced-motion`
- Responsive down to 320 px

## Use as a template
Click **Use this template** on GitHub (after enabling *Template repository* in Settings), or clone and copy the files.

## Not included
This is a **front-end demo**. It has no backend: nothing is sent, stored or checked against a server, and the password field is cleared after submit.
A real sign-in needs server-side authentication (hashed passwords, HTTPS, rate limiting, CSRF protection).

## Run locally
```bash
python -m http.server 5173
# open http://localhost:5173/projects/login-page/
```
