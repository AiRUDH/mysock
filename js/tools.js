/**
 * MySock Tools — Pure browser-based file utilities
 * No API, no backend, no login required.
 */

/* ============================================================
   TOOL 1: JPG / PNG → PDF
   Uses jsPDF (loaded via CDN in tools.html)
   ============================================================ */
function initJpgToPdf() {
  var input   = document.getElementById('jpgInput');
  var preview = document.getElementById('jpgPreview');
  var btn     = document.getElementById('jpgConvertBtn');
  var status  = document.getElementById('jpgStatus');
  var files   = [];

  if (!input) return;

  input.addEventListener('change', function () {
    files = Array.from(this.files).filter(function (f) {
      return f.type.startsWith('image/');
    });
    preview.innerHTML = '';
    files.forEach(function (f) {
      var img = document.createElement('img');
      img.src = URL.createObjectURL(f);
      img.className = 'tool-thumb';
      preview.appendChild(img);
    });
    btn.disabled = files.length === 0;
    status.textContent = files.length + ' image(s) selected';
  });

  btn.addEventListener('click', async function () {
    if (!files.length) return;
    btn.disabled = true;
    status.textContent = 'Converting…';

    try {
      var jsPDF = window.jspdf.jsPDF;
      var pdf   = null;

      for (var i = 0; i < files.length; i++) {
        var dataUrl = await readFileAsDataURL(files[i]);
        var dims    = await getImageDimensions(dataUrl);

        // Fit image to A4 (595 x 842 pt) with 20pt margin
        var maxW = 555, maxH = 802;
        var ratio = Math.min(maxW / dims.w, maxH / dims.h);
        var w = dims.w * ratio;
        var h = dims.h * ratio;
        var x = (595 - w) / 2;
        var y = (842 - h) / 2;

        if (i === 0) {
          pdf = new jsPDF({ unit: 'pt', format: 'a4' });
        } else {
          pdf.addPage();
        }

        var fmt = files[i].type === 'image/png' ? 'PNG' : 'JPEG';
        pdf.addImage(dataUrl, fmt, x, y, w, h);
      }

      pdf.save('mysock-converted.pdf');
      status.textContent = 'Done! PDF downloaded.';
    } catch (err) {
      status.textContent = 'Error: ' + err.message;
    }

    btn.disabled = false;
  });
}

function readFileAsDataURL(file) {
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();
    reader.onload  = function (e) { resolve(e.target.result); };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function getImageDimensions(dataUrl) {
  return new Promise(function (resolve) {
    var img = new Image();
    img.onload = function () { resolve({ w: img.naturalWidth, h: img.naturalHeight }); };
    img.src = dataUrl;
  });
}

/* ============================================================
   TOOL 2: PDF Text Extractor
   Uses pdf.js (loaded via CDN in tools.html)
   ============================================================ */
function initPdfExtractor() {
  var input  = document.getElementById('pdfInput');
  var btn    = document.getElementById('pdfExtractBtn');
  var output = document.getElementById('pdfOutput');
  var copyBtn = document.getElementById('pdfCopyBtn');
  var status = document.getElementById('pdfStatus');

  if (!input) return;

  input.addEventListener('change', function () {
    btn.disabled = !this.files.length;
    output.value = '';
    status.textContent = this.files.length ? this.files[0].name + ' selected' : '';
    copyBtn.style.display = 'none';
  });

  btn.addEventListener('click', async function () {
    var file = input.files[0];
    if (!file) return;

    btn.disabled = true;
    status.textContent = 'Extracting text…';
    output.value = '';

    try {
      var pdfjsLib = window['pdfjs-dist/build/pdf'] || window.pdfjsLib;
      pdfjsLib.GlobalWorkerOptions.workerSrc =
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

      var arrayBuffer = await file.arrayBuffer();
      var pdf         = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      var allText     = '';

      for (var p = 1; p <= pdf.numPages; p++) {
        var page    = await pdf.getPage(p);
        var content = await page.getTextContent();
        var pageText = content.items.map(function (item) { return item.str; }).join(' ');
        allText += '--- Page ' + p + ' ---\n' + pageText + '\n\n';
      }

      output.value = allText.trim() || '(No text found — this may be a scanned/image PDF)';
      status.textContent = pdf.numPages + ' page(s) extracted.';
      copyBtn.style.display = 'inline-flex';
    } catch (err) {
      status.textContent = 'Error: ' + err.message;
    }

    btn.disabled = false;
  });

  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      navigator.clipboard.writeText(output.value).then(function () {
        copyBtn.textContent = 'Copied!';
        setTimeout(function () { copyBtn.textContent = 'Copy Text'; }, 2000);
      });
    });
  }
}

/* ============================================================
   TOOL 3: Image Compressor
   Pure Canvas API — no library needed
   ============================================================ */
function initImageCompressor() {
  var input    = document.getElementById('compressInput');
  var quality  = document.getElementById('compressQuality');
  var qualVal  = document.getElementById('qualityValue');
  var btn      = document.getElementById('compressBtn');
  var preview  = document.getElementById('compressPreview');
  var status   = document.getElementById('compressStatus');

  if (!input) return;

  quality.addEventListener('input', function () {
    qualVal.textContent = this.value + '%';
  });

  input.addEventListener('change', function () {
    btn.disabled = !this.files.length;
    if (this.files.length) {
      var url = URL.createObjectURL(this.files[0]);
      preview.innerHTML = '<img src="' + url + '" class="tool-thumb" />';
      var kb = (this.files[0].size / 1024).toFixed(1);
      status.textContent = 'Original: ' + kb + ' KB';
    }
  });

  btn.addEventListener('click', function () {
    var file = input.files[0];
    if (!file) return;

    btn.disabled = true;
    status.textContent = 'Compressing…';

    var q   = parseInt(quality.value) / 100;
    var img = new Image();
    var url = URL.createObjectURL(file);

    img.onload = function () {
      var canvas = document.createElement('canvas');
      canvas.width  = img.naturalWidth;
      canvas.height = img.naturalHeight;
      canvas.getContext('2d').drawImage(img, 0, 0);

      canvas.toBlob(function (blob) {
        var link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'compressed-' + file.name.replace(/\.[^.]+$/, '') + '.jpg';
        link.click();

        var origKb = (file.size / 1024).toFixed(1);
        var newKb  = (blob.size / 1024).toFixed(1);
        var saved  = (((file.size - blob.size) / file.size) * 100).toFixed(0);
        status.textContent = origKb + ' KB → ' + newKb + ' KB (' + saved + '% smaller)';
        btn.disabled = false;
      }, 'image/jpeg', q);

      URL.revokeObjectURL(url);
    };

    img.src = url;
  });
}

/* ============================================================
   Boot
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {
  // Scroll fix — always start from top
  window.scrollTo(0, 0);

  initModal();
  initJpgToPdf();
  initPdfExtractor();
  initImageCompressor();
  initWordCounter();
  initUrlCleaner();
  initToolsFilter();
});
function initWordCounter() {
  var input    = document.getElementById('wordInput');
  if (!input) return;

  function update() {
    var text = input.value;
    var words     = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    var chars     = text.length;
    var noSpace   = text.replace(/\s/g, '').length;
    var sentences = text.trim() === '' ? 0 : (text.match(/[^.!?]*[.!?]+/g) || []).length;

    document.getElementById('wordCount').textContent     = words;
    document.getElementById('charCount').textContent     = chars;
    document.getElementById('charNoSpace').textContent   = noSpace;
    document.getElementById('sentenceCount').textContent = sentences;
  }

  input.addEventListener('input', update);
}

/* ============================================================
   TOOL 5: URL Cleaner
   ============================================================ */
function initUrlCleaner() {
  var cleanBtn = document.getElementById('urlCleanBtn');
  var copyBtn  = document.getElementById('urlCopyBtn');
  var result   = document.getElementById('urlResult');
  var output   = document.getElementById('urlOutput');
  var input    = document.getElementById('urlInput');

  if (!cleanBtn) return;

  var TRACKING_PARAMS = [
    'utm_source','utm_medium','utm_campaign','utm_term','utm_content',
    'fbclid','gclid','msclkid','mc_eid','ref','source','affiliate',
    '_ga','_gl','igshid','twclid','li_fat_id','ttclid'
  ];

  cleanBtn.addEventListener('click', function () {
    var raw = (input.value || '').trim();
    if (!raw) { input.focus(); return; }

    try {
      var url    = new URL(raw);
      var params = url.searchParams;
      TRACKING_PARAMS.forEach(function (p) { params.delete(p); });
      url.search = params.toString();
      output.value = url.toString();
      result.hidden = false;
    } catch (e) {
      alert('Please enter a valid URL (including https://)');
    }
  });

  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      navigator.clipboard.writeText(output.value).then(function () {
        copyBtn.textContent = 'Copied!';
        setTimeout(function () { copyBtn.textContent = 'Copy'; }, 2000);
      });
    });
  }
}

/* ============================================================
   MODAL CONTROLLER
   ============================================================ */
function initModal() {
  var overlay = document.getElementById('toolModal');
  var closeBtn = document.getElementById('modalClose');
  if (!overlay) return;

  // Tool metadata
  var TOOLS = {
    'jpg-pdf': {
      title: 'JPG / PNG to PDF',
      sub:   'Combine images into a single PDF — one image per page.',
      iconBg: '#eff6ff', iconColor: '#2563eb',
      iconSvg: '<svg width="18" height="18" viewBox="0 0 20 20" fill="none"><rect x="2" y="1" width="11" height="15" rx="1.5" stroke="currentColor" stroke-width="1.5"/><path d="M13 1l5 5v13a1.5 1.5 0 01-1.5 1.5H5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
    },
    'pdf-extract': {
      title: 'PDF Text Extractor',
      sub:   'Extract all readable text from any PDF document.',
      iconBg: '#eef2ff', iconColor: '#6366f1',
      iconSvg: '<svg width="18" height="18" viewBox="0 0 20 20" fill="none"><rect x="2" y="1" width="11" height="15" rx="1.5" stroke="currentColor" stroke-width="1.5"/><path d="M13 1l5 5v13a1.5 1.5 0 01-1.5 1.5H5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="8" cy="9" r="2" stroke="currentColor" stroke-width="1.3"/><path d="M10 11l2 2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>',
    },
    'compress': {
      title: 'Image Compressor',
      sub:   'Reduce image file size without losing visible quality.',
      iconBg: '#f0fdfa', iconColor: '#0d9488',
      iconSvg: '<svg width="18" height="18" viewBox="0 0 20 20" fill="none"><rect x="1" y="1" width="18" height="18" rx="3" stroke="currentColor" stroke-width="1.5"/><path d="M6 10l3 3 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    },
    'word-counter': {
      title: 'Word Counter',
      sub:   'Count words, characters, and sentences in any text.',
      iconBg: '#fffbeb', iconColor: '#d97706',
      iconSvg: '<svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M3 5h14M3 9h10M3 13h12M3 17h7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
    },
    'url-cleaner': {
      title: 'URL Cleaner',
      sub:   'Strip UTM and tracking parameters from any URL.',
      iconBg: '#f0fdf4', iconColor: '#16a34a',
      iconSvg: '<svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M8 12a4 4 0 006.24.44l2.5-2.5a4 4 0 00-5.66-5.66l-1.43 1.42" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 8a4 4 0 00-6.24-.44l-2.5 2.5a4 4 0 005.66 5.66l1.42-1.42" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    },
  };

  var currentTool = null;

  function openModal(toolId) {
    var meta = TOOLS[toolId];
    if (!meta) return;

    // Hide all panels, show the right one
    overlay.querySelectorAll('.tool-modal-panel').forEach(function (p) {
      p.classList.remove('active');
    });
    var panel = document.getElementById('panel-' + toolId);
    if (panel) panel.classList.add('active');

    // Set header content
    var icon = document.getElementById('modalIcon');
    icon.style.background = meta.iconBg;
    icon.style.color      = meta.iconColor;
    icon.innerHTML        = meta.iconSvg;

    document.getElementById('modalTitle').textContent = meta.title;
    document.getElementById('modalSub').textContent   = meta.sub;

    // Show overlay
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
    currentTool = toolId;

    // Focus close button for accessibility
    setTimeout(function () { closeBtn.focus(); }, 50);
  }

  function closeModal() {
    overlay.hidden = true;
    document.body.style.overflow = '';
    currentTool = null;
  }

  // Open on card button click
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-tool]');
    if (btn && !btn.disabled) {
      e.preventDefault();
      openModal(btn.getAttribute('data-tool'));
    }
  });

  // Close button
  closeBtn.addEventListener('click', closeModal);

  // Click outside modal box
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeModal();
  });

  // Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !overlay.hidden) closeModal();
  });
}

/* ============================================================
   FILTER + SEARCH — Tools grid
   ============================================================ */
function initToolsFilter() {
  var tabs    = document.getElementById('toolsTabs');
  var grid    = document.getElementById('toolsGrid');
  var empty   = document.getElementById('toolsEmpty');
  var search  = document.getElementById('toolSearch');

  if (!tabs || !grid) return;

  var activecat = 'all';
  var query     = '';

  function filter() {
    var cards   = grid.querySelectorAll('.tool-card');
    var visible = 0;

    cards.forEach(function (card) {
      var cat  = card.getAttribute('data-cat') || '';
      var name = (card.getAttribute('data-name') || '').toLowerCase();
      var catOk  = activecat === 'all' || cat === activecat;
      var queryOk = !query || name.indexOf(query) !== -1;

      if (catOk && queryOk) {
        card.style.display = '';
        visible++;
      } else {
        card.style.display = 'none';
      }
    });

    if (empty) empty.hidden = visible > 0;
  }

  tabs.addEventListener('click', function (e) {
    var tab = e.target.closest('.tools-tab');
    if (!tab) return;
    tabs.querySelectorAll('.tools-tab').forEach(function (t) {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    activecat = tab.getAttribute('data-cat');
    filter();
  });

  if (search) {
    var timer;
    search.addEventListener('input', function () {
      clearTimeout(timer);
      var val = this.value;
      timer = setTimeout(function () { query = val.trim().toLowerCase(); filter(); }, 180);
    });
  }
}
