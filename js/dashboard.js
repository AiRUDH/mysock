/**
 * MySock — Premium Dashboard Controller
 * Handles: user population, section navigation, sidebar, notifications, sign-out.
 */
(function () {
  'use strict';

  var auth = window.MySockAuth;

  /* ============================================================
     User Population
     ============================================================ */
  function populateUser() {
    var user   = auth.getUser();
    var method = auth.getLoginMethod ? auth.getLoginMethod() : 'password';
    if (!user) return;

    var initials = (user.name || 'DU').split(' ').map(function (w) { return w[0]; }).join('').slice(0, 2).toUpperCase();

    /* Sidebar user */
    var sidebarUser = document.getElementById('sidebarUser');
    if (sidebarUser) {
      sidebarUser.innerHTML =
        '<div class="sidebar-user-avatar">' + initials + '</div>' +
        '<div style="overflow:hidden;min-width:0">' +
          '<span class="sidebar-user-name">' + (user.name || 'User') + '</span>' +
          '<span class="sidebar-user-role">' + (user.role || 'Client') + '</span>' +
        '</div>';
    }

    /* Topbar profile */
    var topbarProfile = document.getElementById('topbarProfile');
    if (topbarProfile) {
      topbarProfile.innerHTML =
        '<div class="topbar-profile-avatar">' + initials + '</div>' +
        '<span class="topbar-profile-name">' + (user.name || 'User').split(' ')[0] + '</span>';
    }

    /* Welcome panel */
    var welcomeAvatar = document.getElementById('welcomeAvatar');
    if (welcomeAvatar) welcomeAvatar.textContent = initials;

    var welcomeHeading = document.getElementById('welcomeHeading');
    if (welcomeHeading) {
      var hour = new Date().getHours();
      var greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
      welcomeHeading.textContent = greeting + ', ' + (user.name || 'User').split(' ')[0];
    }

    var welcomeDate = document.getElementById('welcomeDate');
    if (welcomeDate) {
      welcomeDate.textContent = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }

    /* Settings section */
    setText('settingName',   user.name  || '—');
    setText('settingEmail',  user.email || '—');
    setText('settingId',     user.id    || '—');
    setText('settingRole',   user.role  || '—');
    setText('settingMethod', method === 'google' ? 'Google (Demo)' : 'ID & Password');
  }

  function setText(id, val) {
    var el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  /* ============================================================
     Section Navigation
     ============================================================ */
  var sections = document.querySelectorAll('.section');
  var navItems = document.querySelectorAll('.sidebar-nav-item[data-section]');
  var pageTitle = document.getElementById('topbarPageTitle');

  var titles = {
    overview:      'Dashboard',
    services:      'Services',
    work:          'Our Work',
    projects:      'Projects',
    notifications: 'Notifications',
    settings:      'Settings',
  };

  function showSection(id) {
    sections.forEach(function (s) {
      s.classList.toggle('active', s.id === 'section-' + id);
    });
    navItems.forEach(function (n) {
      n.classList.toggle('active', n.dataset.section === id);
    });
    if (pageTitle) pageTitle.textContent = titles[id] || 'Dashboard';
    window.scrollTo(0, 0);
  }

  function bindNav() {
    navItems.forEach(function (item) {
      item.addEventListener('click', function (e) {
        e.preventDefault();
        showSection(item.dataset.section);
        closeSidebar();
      });
    });
  }

  /* ============================================================
     Sign-Out
     ============================================================ */
  function bindSignOut() {
    document.querySelectorAll('#dashSignOutBtn, #settingsLogoutBtn').forEach(function (btn) {
      btn.addEventListener('click', function () { auth.signOut(); });
    });
  }

  /* ============================================================
     Sidebar (mobile)
     ============================================================ */
  var sidebar, overlay;

  function initSidebar() {
    sidebar = document.getElementById('sidebar');
    overlay = document.getElementById('sidebarOverlay');
    var menuBtn  = document.getElementById('topbarMenuBtn');
    var closeBtn = document.getElementById('sidebarClose');

    if (menuBtn)  menuBtn.addEventListener('click', openSidebar);
    if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
    if (overlay)  overlay.addEventListener('click', closeSidebar);
  }

  function openSidebar() {
    if (sidebar) sidebar.classList.add('open');
    if (overlay) overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  /* ============================================================
     Boot
     ============================================================ */
  document.addEventListener('DOMContentLoaded', function () {
    populateUser();
    bindNav();
    bindSignOut();
    initSidebar();
    showSection('overview');
  });

})();
