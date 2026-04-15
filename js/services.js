/**
 * MySock — Services Page Controller
 * Dynamic filtering, search, live clock, WhatsApp CTA.
 * Pure JS — no backend, no API.
 */
(function () {
  'use strict';

  /* ── Service Data ─────────────────────────────────────── */
  var SERVICES = [
    {
      id: 1,
      category: 'Development',
      title: 'Custom Website Development',
      desc: 'Professional website development tailored to your business needs — fast, responsive, and SEO-ready.',
      rating: 4.8, reviews: 312,
      badge: 'bestseller',
      img: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&q=80',
      imgAlt: 'Web development on laptop',
    },
    {
      id: 2,
      category: 'Development',
      title: 'E-commerce Store Setup',
      desc: 'Complete online store with payment gateway, inventory management, and order tracking.',
      rating: 4.7, reviews: 198,
      badge: 'recommended',
      img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80',
      imgAlt: 'E-commerce shopping',
    },
    {
      id: 3,
      category: 'Marketing',
      title: 'Social Media Marketing',
      desc: 'Monthly content calendar, creatives, and ad management across all major platforms.',
      rating: 4.6, reviews: 445,
      badge: 'popular',
      img: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&q=80',
      imgAlt: 'Social media marketing',
    },
    {
      id: 4,
      category: 'Marketing',
      title: 'Google Ads Campaign',
      desc: 'Targeted PPC campaigns with keyword research, A/B testing, and weekly performance reports.',
      rating: 4.5, reviews: 267,
      badge: 'bestseller',
      img: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&q=80',
      imgAlt: 'Google Ads analytics',
    },
    {
      id: 5,
      category: 'Automation',
      title: 'Business Process Automation',
      desc: 'Automate repetitive workflows using Zapier, Make, or custom scripts to save hours daily.',
      rating: 4.9, reviews: 134,
      badge: 'recommended',
      img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80',
      imgAlt: 'Automation technology',
    },
    {
      id: 6,
      category: 'Automation',
      title: 'WhatsApp Business Automation',
      desc: 'Auto-replies, broadcast lists, chatbot flows, and CRM integration for WhatsApp Business.',
      rating: 4.7, reviews: 389,
      badge: 'popular',
      img: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=600&q=80',
      imgAlt: 'WhatsApp messaging',
    },
    {
      id: 7,
      category: 'E-commerce',
      title: 'Amazon / Flipkart Listing',
      desc: 'Optimised product listings with SEO titles, bullet points, and A+ content that converts.',
      rating: 4.6, reviews: 521,
      badge: 'bestseller',
      img: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=600&q=80',
      imgAlt: 'Online marketplace',
    },
    {
      id: 8,
      category: 'E-commerce',
      title: 'D2C Brand Launch Package',
      desc: 'End-to-end D2C setup: store, branding, ads, and a strategy to get your first 100 orders.',
      rating: 4.8, reviews: 87,
      badge: 'recommended',
      img: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80',
      imgAlt: 'Brand launch',
    },
    {
      id: 9,
      category: 'Consulting',
      title: 'Growth Strategy Session',
      desc: '90-minute 1:1 strategy call with a clear, actionable roadmap for your business growth.',
      rating: 5.0, reviews: 203,
      badge: 'popular',
      img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80',
      imgAlt: 'Business strategy meeting',
    },
    {
      id: 10,
      category: 'Consulting',
      title: 'AI Integration Consulting',
      desc: 'Identify and implement AI tools that save time, reduce costs, and scale your operations.',
      rating: 4.9, reviews: 76,
      badge: 'recommended',
      img: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80',
      imgAlt: 'AI technology consulting',
    },
    {
      id: 11,
      category: 'Development',
      title: 'Mobile App Development',
      desc: 'Cross-platform iOS & Android apps with clean UI, smooth UX, and backend integration.',
      rating: 4.7, reviews: 112,
      badge: 'bestseller',
      img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80',
      imgAlt: 'Mobile app development',
    },
    {
      id: 12,
      category: 'Marketing',
      title: 'SEO Optimisation Package',
      desc: 'On-page, off-page, and technical SEO to rank on Google page 1 within 90 days.',
      rating: 4.5, reviews: 334,
      badge: 'popular',
      img: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=600&q=80',
      imgAlt: 'SEO search engine optimisation',
    },
  ];

  /* ── State ────────────────────────────────────────────── */
  var activeCategory = 'All';
  var searchQuery    = '';

  /* ── Helpers ──────────────────────────────────────────── */
  function starsHtml(rating) {
    var full  = Math.floor(rating);
    var half  = (rating % 1) >= 0.5 ? 1 : 0;
    var empty = 5 - full - half;
    return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
  }

  function badgeClass(badge) {
    var map = { bestseller: 'svc-card-badge--bestseller', recommended: 'svc-card-badge--recommended' };
    return map[badge] || 'svc-card-badge--popular';
  }

  function badgeLabel(badge) {
    var map = { bestseller: 'Best Seller', recommended: 'Recommended' };
    return map[badge] || 'Most Popular';
  }

  function waUrl(title) {
    return 'https://wa.me/918057470837?text=' + encodeURIComponent('Hi, I am interested in: ' + title);
  }

  /* ── Render ───────────────────────────────────────────── */
  function renderGrid() {
    var grid    = document.getElementById('svcGrid');
    var countEl = document.getElementById('svcCount');
    var empty   = document.getElementById('svcEmpty');
    if (!grid) return;

    var filtered = SERVICES.filter(function (s) {
      var catOk = activeCategory === 'All' || s.category === activeCategory;
      var q     = searchQuery.toLowerCase();
      var qOk   = !q || s.title.toLowerCase().indexOf(q) !== -1 || s.desc.toLowerCase().indexOf(q) !== -1;
      return catOk && qOk;
    });

    if (countEl) countEl.textContent = filtered.length;

    if (filtered.length === 0) {
      grid.innerHTML = '';
      if (empty) empty.hidden = false;
      return;
    }

    if (empty) empty.hidden = true;

    grid.innerHTML = filtered.map(function (s, i) {
      return (
        '<article class="svc-card" data-category="' + s.category + '" style="animation-delay:' + (i * 0.05) + 's">' +
          '<div class="svc-card-img">' +
            '<img src="' + s.img + '" alt="' + s.imgAlt + '" loading="lazy" ' +
              'onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'" />' +
            '<div class="svc-card-img-fallback" style="display:none">🖼️</div>' +
          '</div>' +
          '<div class="svc-card-body">' +
            '<div style="display:flex;align-items:center;justify-content:space-between;gap:6px">' +
              '<span class="svc-card-cat">' + s.category + '</span>' +
              '<span class="svc-card-badge ' + badgeClass(s.badge) + '">' + badgeLabel(s.badge) + '</span>' +
            '</div>' +
            '<h3 class="svc-card-title">' + s.title + '</h3>' +
            '<p class="svc-card-desc">' + s.desc + '</p>' +
            '<div class="svc-card-rating">' +
              '<span class="svc-card-stars" aria-label="' + s.rating + ' stars">' + starsHtml(s.rating) + '</span>' +
              '<span class="svc-card-rating-num">' + s.rating + '</span>' +
              '<span class="svc-card-reviews">(' + s.reviews + ' reviews)</span>' +
            '</div>' +
          '</div>' +
          '<a href="' + waUrl(s.title) + '" target="_blank" rel="noopener" class="svc-card-cta" aria-label="Contact about ' + s.title + '">' +
            '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.845L0 24l6.335-1.508A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.65-.49-5.19-1.348l-.372-.22-3.762.896.952-3.668-.242-.378A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>' +
            'Contact: +91 8057470837' +
          '</a>' +
        '</article>'
      );
    }).join('');
  }

  /* ── Filter tabs ──────────────────────────────────────── */
  function initTabs() {
    var tabs = document.getElementById('svcTabs');
    if (!tabs) return;

    tabs.addEventListener('click', function (e) {
      var tab = e.target.closest('.svc-tab');
      if (!tab) return;

      tabs.querySelectorAll('.svc-tab').forEach(function (t) {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      activeCategory = tab.getAttribute('data-cat');
      renderGrid();
    });
  }

  /* ── Search ───────────────────────────────────────────── */
  function initSearch() {
    var input = document.getElementById('svcSearch');
    if (!input) return;

    var timer;
    input.addEventListener('input', function () {
      clearTimeout(timer);
      var val = this.value;
      timer = setTimeout(function () {
        searchQuery = val.trim();
        renderGrid();
      }, 200);
    });
  }

  /* ── Live clock ───────────────────────────────────────── */
  function initClock() {
    var el = document.getElementById('svcClock');
    if (!el) return;

    function tick() {
      var now = new Date();
      var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      var dd  = String(now.getDate()).padStart(2, '0');
      var mmm = months[now.getMonth()];
      var yyyy = now.getFullYear();
      var hh  = now.getHours();
      var min = String(now.getMinutes()).padStart(2, '0');
      var sec = String(now.getSeconds()).padStart(2, '0');
      var ampm = hh >= 12 ? 'PM' : 'AM';
      hh = hh % 12 || 12;
      hh = String(hh).padStart(2, '0');
      el.textContent = dd + ' ' + mmm + ' ' + yyyy + '  |  ' + hh + ':' + min + ':' + sec + ' ' + ampm;
    }

    tick();
    setInterval(tick, 1000);
  }

  /* ── Boot ─────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    initClock();
    initTabs();
    initSearch();
    renderGrid();
  });

})();
