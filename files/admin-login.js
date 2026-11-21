/* =============================================================================
   admin-login.js — Admin login
   On success the admin session is saved (inside TurfDB) and the admin is sent
   to the dashboard.
============================================================================= */
(function () {
  'use strict';

  // Already logged in? Go straight to the dashboard.
  if (TurfDB.getCurrentAdmin()) {
    window.location.replace('admin-dashboard.html');
    return;
  }

  const form = document.getElementById('admin-form');
  const message = document.getElementById('message');

  // Show the demo credentials on the page (remove this once real admin accounts exist)
  const demo = TurfDB.getDemoAdminCredentials();
  document.getElementById('demo-username').textContent = demo.username;
  document.getElementById('demo-password').textContent = demo.password;

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const result = TurfDB.loginAdmin(
      document.getElementById('admin-username').value,
      document.getElementById('admin-password').value
    );

    if (!result.ok) {
      TurfUtils.showMessage(message, 'error', result.error);
      return;
    }
    window.location.href = 'admin-dashboard.html';
  });
})();
