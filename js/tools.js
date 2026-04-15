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
   Boot — init all tools on DOMContentLoaded
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {
  initJpgToPdf();
  initPdfExtractor();
  initImageCompressor();
});
