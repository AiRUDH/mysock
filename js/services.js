/**
 * MySock — Services Page Controller
 * Amazon-style service marketplace with WhatsApp CTA + backend order logging.
 */
(function () {
  'use strict';

  var auth = window.MySockAuth;
  var BACKEND = 'http://localhost:3000';
  var WA_NUMBER = '919999999999'; // fallback if backend unavailable

  /* ── Service Data ─────────────────────────────────────── */
  var SERVICES = [
    {
      id: 1, category: 'Development',
      title: 'Custom Website Development',
      desc: 'Fully responsive, SEO-optimised website built from scratch with modern stack.',
      price: '₹9,999', priceRaw: 9999,
      rating: 4.8, reviews: 312,
      badge: 'bestseller', icon: '🌐',
    },
    {
      id: 2, category: 'Development',
      title: 'E-commerce Store Setup',
      desc: 'Complete online store with payment gateway, inventory & order management.',
      price: '₹14,999', priceRaw: 14999,
      rating: 4.7, reviews: 198,
      badge: 'recommended', icon: '🛒',
    },
    {
      id: 3, category: 'Marketing',
      title: 'Social Media Marketing',
      desc: 'Monthly content calendar, creatives & ad management across all platforms.',
      price: '₹4,999', priceRaw: 4999,
      rating: 4.6, reviews: 445,
      badge: 'popular', icon: '📣',
    },
    {
      id: 4, category: 'Marketing',
      title: 'Google Ads Campaign',
      desc: 'Targeted PPC campaigns with keyword research, A/B testing & weekly reports.',
      price: '₹6,999', priceRaw: 6999,
      rating: 4.5, reviews: 267,
      badge: 'bestseller', icon: '📈',
    },
    {
      id: 5, category: 'Automation',
      title: 'Business Process Automation',
      desc: 'Automate repetitive workflows using Zapier, Make or custom scripts.',
      price: '₹7,999', priceRaw: 7999,
      rating: 4.9, reviews: 134,
      badge: 'recommended', icon: '⚙️',
    },
    {
      id: 6, category: 'Automation',
      title: 'WhatsApp Business Automation',
      desc: 'Auto-replies, broadcast lists, chatbot flows & CRM integration.',
      price: '₹3,999', priceRaw: 3999,
      rating: 4.7, reviews: 389,
      badge: 'popular', icon: '💬',
    },
    {
      id: 7, category: 'E-commerce',
      title: 'Amazon / Flipkart Listing',
      desc: 'Optimised product listings with SEO titles, bullet points & A+ content.',
      price: '₹2,999', priceRaw: 2999,
      rating: 4.6, reviews: 521,
      badge: 'bestseller', icon: '📦',
    },
    {
      id: 8, category: 'E-commerce',
      title: 'D2C Brand Launch Package',
      desc: 'End-to-end D2C setup: store, branding, ads & first 100 orders strategy.',
      price: '₹24,999', priceRaw: 24999,
      rating: 4.8, reviews: 87,
      badge: 'recommended', icon: '🚀',
    },
    {
      id: 9, category: 'Consulting',
      title: 'Growth Strategy Session',
      desc: '90-minute 1:1 strategy call with actionable roadmap for your business.',
      price: '₹999', priceRaw: 999,
      rating: 5.0, reviews: 203,
      badge: 'popular', icon: '🎯',
    },
    {
      id: 10, category: 'Consulting',
      title: 'AI Integration Consulting',
      desc: 'Identify & implement AI tools that save time and cut operational costs.',
      price: '₹12,999', priceRaw: 12999,
      rating: 4.9, reviews: 76,
      badge: 'recommended', icon: '🤖',
    },
    {
      id: 11, category: 'Development',
      title: 'Mobile App Development',
      desc: 'Cross-platform iOS & Android app with clean UI and backend integration.',
      price: '₹29,999', priceRaw: 29999,
      rating: 4.7, reviews: 112,
      badge: 'bestseller', icon: '📱',
    },
    {
      id: 12, category: 'Marketing',
      title: 'SEO Optimisation Package',
      desc: 'On-page, off-page & technical SEO to rank on Google page 1 in 90 days.',
      price: '₹5,999', priceRaw: 5999,
      rating: 4.5, reviews: 334,
      badge: 'popular', icon: '🔍',
    },
  ];

  var activeCategory = 'All';
  var searchQuery = '';

  /* ── Populate user in header ──────────────────────────── */
  function populateUser() {
    var user = auth.getUser();
    var nameEl = document.getElementById('svUserName');
    if (nameEl && user) {
      nameEl.textContent = 'Hello, ' + (user.name || 'User').split(' ')[0];
    }
  }

  /* ── Render grid ──────────────────────────────────────── */
  function starsHtml(rating) {
    var full = Math.floor(rating);
    var half = rating % 1 >= 0.5 ? 1 : 0;
    var empty = 5 - full - half;
    return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
  }

  function badgeClass(badge) {
    if (badge === 'bestseller') return 'sv-card-badge--bestseller';
    if (badge === 'recommended') return 'sv-card-badge--recommended';
    return 'sv-card-badge--popular';
  }

  function badgeLabel(badge) {
    if (badge === 'bestseller') return 'Best Seller';
    if (badge === 'recommended') return 'Recommended';
    return 'Most Popular';
  }

  function renderGrid() {
    var grid = document.getElementById('svGrid');
    var countEl = document.getElementById('svCount');
    if (!grid) return;

    var filtered = SERVICES.filter(function (s) {
      var catMatch = activeCategory === 'All' || s.category === activeCategory;
      var qMatch = !searchQuery || s.title.toLowerCase().indexOf(searchQuery) !== -1 ||
                   s.desc.toLowerCase().indexOf(searchQuery) !== -1;
      return catMatch && qMatch;
    });

    if (countEl) countEl.textContent = filtered.length;

    grid.innerHTML = filtered.map(function (s) {
      return '<div class="sv-card" data-id="' + s.id + '">' +
        '<div class="sv-card-img">' + s.icon + '</div>' +
        '<div class="sv-card-body">' +
          '<span class="sv-card-badge ' + badgeClass(s.badge) + '">' + badgeLabel(s.badge) + '</span>' +
          '<div class="sv-card-title">' + s.title + '</div>' +
          '<div class="sv-card-desc">' + s.desc + '</div>' +
          '<div class="sv-card-rating">' +
            '<span class="sv-card-stars">' + starsHtml(s.rating) + '</span>' +
            '<span>' + s.rating + '</span>' +
            '<span class="sv-card-reviews">(' + s.reviews + ')</span>' +
          '</div>' +
          '<div class="sv-card-price">' + s.price + ' <span>onwards</span></div>' +
        '</div>' +
        '<button class="sv-card-cta" data-id="' + s.id + '" data-name="' + s.title + '" data-price="' + s.price + '" data-cat="' + s.category + '">' +
          '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.845L0 24l6.335-1.508A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.65-.49-5.19-1.348l-.372-.22-3.762.896.952-3.668-.242-.378A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>' +
          'Get Service on WhatsApp' +
        '</button>' +
      '</div>';
    }).join('');
  }

  /* ── WhatsApp CTA handler ─────────────────────────────── */
  function handleOrder(btn) {
    var name  = btn.getAttribute('data-name');
    var price = btn.getAttribute('data-price');
    var cat   = btn.getAttribute('data-cat');

    btn.disabled = true;
    btn.textContent = 'Opening…';

    fetch(BACKEND + '/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ service_name: name, price: price, category: cat }),
    })
    .then(function (r) { return r.json(); })
    .then(function (data) {
      var waUrl = data.whatsapp ||
        'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent('I want this service: ' + name);
      window.open(waUrl, '_blank');
    })
    .catch(function () {
      // Backend unavailable — open WhatsApp directly
      var waUrl = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent('I want this service: ' + name);
      window.open(waUrl, '_blank');
    })
    .finally(function () {
      btn.disabled = false;
      btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.845L0 24l6.335-1.508A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.65-.49-5.19-1.348l-.372-.22-3.762.896.952-3.668-.242-.378A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg> Get Service on WhatsApp';
    });
  }

  /* ── Event delegation ─────────────────────────────────── */
  document.addEventListener('click', function (e) {
    // CTA button
    var btn = e.target.closest('.sv-card-cta');
    if (btn) { e.stopPropagation(); handleOrder(btn); return; }

    // Category tab
    var tab = e.target.closest('.sv-tab');
    if (tab) {
      document.querySelectorAll('.sv-tab').forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');
      activeCategory = tab.getAttribute('data-cat');
      renderGrid();
      return;
    }

    // Sign out
    if (e.target.closest('#svSignOut')) {
      auth.signOut();
    }
  });

  /* ── Search ───────────────────────────────────────────── */
  var searchInput = document.getElementById('svSearch');
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      searchQuery = this.value.trim().toLowerCase();
      renderGrid();
    });
    searchInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { searchQuery = this.value.trim().toLowerCase(); renderGrid(); }
    });
  }

  /* ── Filter checkboxes ────────────────────────────────── */
  document.addEventListener('change', function (e) {
    if (e.target.matches('.sv-filter-check')) {
      renderGrid();
    }
  });

  /* ── Init ─────────────────────────────────────────────── */
  populateUser();
  renderGrid();

})();
