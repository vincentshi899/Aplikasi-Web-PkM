document.addEventListener('DOMContentLoaded', function () {

    // 1. MAPPING KONFIGURASI INPUT -> PREVIEW
    const mappings = {
        // --- Data Artikel ---
        'in-judul-artikel': ['out-judul-artikel', 'preview-surat-judul', 'preview-surat-judul2'],
        'in-penulis1': ['out-penulis1'],
        'in-penulis2': ['out-penulis2'],
        'in-inst1': ['out-inst1'],
        'in-email': ['out-email'],
        'in-abstrak': ['out-abstrak'],
        'in-keywords': ['out-keywords'],
        'in-abstract-en': ['out-abstract-en'],
        'in-keywords-en': ['out-keywords-en'],
        'in-pendahuluan': ['out-pendahuluan'],
        'in-metode': ['out-metode'],
        'in-hasil': ['out-hasil'],
        'in-kesimpulan': ['out-kesimpulan'],
        'in-terimakasih': ['out-terimakasih'],
        'in-kontribusi': ['out-kontribusi'],

        // --- Biodata Lampiran 1 (Ketua) ---
        'input-bio-nama': ['preview-bio-nama'],
        'input-bio-jk': ['preview-bio-jk'],
        'input-bio-prodi': ['preview-bio-prodi'],
        'input-bio-nim': ['preview-bio-nim'],
        'input-bio-ttl': ['preview-bio-ttl'],
        'input-bio-email': ['preview-bio-email'],
        'input-bio-telp': ['preview-bio-telp'],
        'input-ttd-nama': ['preview-ttd-nama'],
        'input-ttd-nim': ['preview-ttd-nim'],
        'input-ttd-kota-tgl': ['preview-ttd-kota-tgl', 'preview-ttd-tgl-ang1', 'preview-ttd-tgl-ang2', 'preview-ttd-tgl-surat3'],

        // --- Biodata Lampiran 1 (Anggota 1) ---
        'input-ang1-nama': ['preview-ang1-nama', 'preview-ttd-nama-ang1', 'preview-l2-nama-ang1'],
        'input-ang1-jk': ['preview-ang1-jk'],
        'input-ang1-prodi': ['preview-ang1-prodi'],
        'input-ang1-nim': ['preview-ang1-nim', 'preview-ttd-nim-ang1'],
        'input-ang1-ttl': ['preview-ang1-ttl'],
        'input-ang1-email': ['preview-ang1-email'],
        'input-ang1-telp': ['preview-ang1-telp'],

        // --- Biodata Lampiran 1 (Anggota 2) ---
        'input-ang2-nama': ['preview-ang2-nama', 'preview-ttd-nama-ang2', 'preview-l2-nama-ang2'],
        'input-ang2-jk': ['preview-ang2-jk'],
        'input-ang2-prodi': ['preview-ang2-prodi'],
        'input-ang2-nim': ['preview-ang2-nim', 'preview-ttd-nim-ang2'],
        'input-ang2-ttl': ['preview-ang2-ttl'],
        'input-ang2-email': ['preview-ang2-email'],
        'input-ang2-telp': ['preview-ang2-telp'],

        // --- Biodata Lampiran 1 (Dosen) ---
        'input-dosen-nama': ['preview-dosen-nama', 'preview-ttd-nama-dosen-bwh', 'preview-l2-nama-dosen'],
        'input-dosen-nip': ['preview-dosen-nip', 'preview-ttd-nip-dosen-bwh'],

        // --- Data Institusi ---
        'in-prodi': ['out-prodi', 'preview-surat-prodi'],
        'in-kampus': ['out-kampus'],

        // --- Identitas Ketua Tim Utama ---
        'in-nama': ['out-nama', 'out-nama-ttd', 'preview-surat-nama', 'preview-ttd-nama-surat3', 'preview-l2-nama-ketua'],
        'in-nim': ['out-nim', 'out-nim-ttd', 'preview-surat-nim', 'preview-ttd-nim-surat3'],

        // --- Detail PKM-AI ---
        'in-dosen': ['out-dosen', 'preview-surat-dosen'],
        'in-sumber': ['out-sumber'],
        'in-topik': ['out-topik'],
        'in-pelaksanaan': ['out-pelaksanaan'],

        // --- Tanggal Surat Akhir ---
        'in-kota': ['out-kota']
    };

    // 2. FUNGSI UPDATE PREVIEW OTOMATIS
    Object.entries(mappings).forEach(([inputId, targetIds]) => {
        const inputEl = document.getElementById(inputId);
        if (inputEl) {
            const updatePreview = function () {
                const val = inputEl.value;
                targetIds.forEach(targetId => {
                    const targetEl = document.getElementById(targetId);
                    if (targetEl) {
                        targetEl.innerText = val || "..........";
                    }
                });
            };

            inputEl.addEventListener('input', updatePreview);
            inputEl.addEventListener('change', updatePreview);
            updatePreview();
        }
    });

    // 3. LOGIKA TANGGAL
    const inTanggal = document.getElementById("in-tanggal");
    const outTanggal = document.getElementById("out-tanggal");
    if (inTanggal) {
        inTanggal.valueAsDate = new Date();
        inTanggal.addEventListener("change", function () {
            const dateVal = new Date(this.value);
            const options = { year: "numeric", month: "long", day: "numeric" };
            if (outTanggal) outTanggal.innerText = dateVal.toLocaleDateString("id-ID", options);
        });
        inTanggal.dispatchEvent(new Event('change'));
    }

    // 4. LOGIKA PENGATURAN MARGIN KERTAS
    const inMargin = document.getElementById("in-margin");
    const paperPreview = document.querySelector(".paper-preview");

    if (inMargin && paperPreview) {
        function updateMargin() {
            const val = inMargin.value;
            if (val === "4333") {
                paperPreview.style.padding = "30mm 30mm 30mm 40mm";
            } else if (val === "4433") {
                paperPreview.style.padding = "40mm 30mm 30mm 40mm";
            }
        }
        inMargin.addEventListener("change", updateMargin);
        updateMargin();
    }

    // 5. LOGIKA GENERATOR DAFTAR PUSTAKA
    const citationSchema = {
        buku: [
            { id: 'c-authors', ph: 'Penulis (Nama Belakang, Inisial)' },
            { id: 'c-year', ph: 'Tahun (2024)' },
            { id: 'c-title', ph: 'Judul Buku' },
            { id: 'c-publisher', ph: 'Penerbit' },
            { id: 'c-city', ph: 'Kota Terbit' }
        ],
        jurnal: [
            { id: 'c-authors', ph: 'Penulis' },
            { id: 'c-year', ph: 'Tahun' },
            { id: 'c-title', ph: 'Judul Artikel' },
            { id: 'c-journal', ph: 'Nama Jurnal' },
            { id: 'c-vol', ph: 'Volume(No): Halaman' }
        ],
        website: [
            { id: 'c-authors', ph: 'Penulis/Pemilik' },
            { id: 'c-year', ph: 'Tahun' },
            { id: 'c-title', ph: 'Judul Halaman' },
            { id: 'c-url', ph: 'URL Lengkap' },
            { id: 'c-access', ph: 'Tgl Akses (12 Jan 2025)' }
        ],
        prosiding: [
            { id: 'c-authors', ph: 'Penulis' },
            { id: 'c-year', ph: 'Tahun' },
            { id: 'c-title', ph: 'Judul Artikel' },
            { id: 'c-conf', ph: 'Nama Konferensi' },
            { id: 'c-city', ph: 'Kota/Negara' }
        ],
        skripsi: [
            { id: 'c-authors', ph: 'Penulis' },
            { id: 'c-year', ph: 'Tahun' },
            { id: 'c-title', ph: 'Judul Skripsi/Tesis' },
            { id: 'c-univ', ph: 'Nama Universitas' },
            { id: 'c-type', ph: 'Jenis (Skripsi/Tesis)' }
        ]
    };

    let citationsData = [];

    const selectType = document.getElementById('cite-type');
    const inputContainer = document.getElementById('cite-input-container');
    const btnAdd = document.getElementById('btn-add-cite');
    const editorList = document.getElementById('editor-cite-list');
    const outPustaka = document.getElementById('out-pustaka');

    if (selectType && inputContainer) {

        function renderInputs() {
            const type = selectType.value;
            const fields = citationSchema[type];
            inputContainer.innerHTML = '';

            fields.forEach(field => {
                const input = document.createElement('input');
                input.type = 'text';
                input.id = field.id;
                input.placeholder = field.ph;
                inputContainer.appendChild(input);
            });
        }

        function formatCitation(data, type) {
            let res = '';
            const getVal = (id) => (data[id] || '').trim();

            if (type === 'buku') {
                res = `${getVal('c-authors')} (${getVal('c-year')}). <i>${getVal('c-title')}</i>. ${getVal('c-publisher')}. ${getVal('c-city')}.`;
            }
            else if (type === 'jurnal') {
                res = `${getVal('c-authors')} (${getVal('c-year')}). ${getVal('c-title')}. <i>${getVal('c-journal')}</i>. ${getVal('c-vol')}.`;
            }
            else if (type === 'website') {
                res = `${getVal('c-authors')} (${getVal('c-year')}). <i>${getVal('c-title')}</i>. URL: ${getVal('c-url')}. Diakses: ${getVal('c-access')}.`;
            }
            else if (type === 'prosiding') {
                res = `${getVal('c-authors')} (${getVal('c-year')}). ${getVal('c-title')}. <i>${getVal('c-conf')}</i>. ${getVal('c-city')}.`;
            }
            else if (type === 'skripsi') {
                res = `${getVal('c-authors')} (${getVal('c-year')}). ${getVal('c-title')}. <i>${getVal('c-type')}</i>. ${getVal('c-univ')}.`;
            }
            return res;
        }

        function renderAll() {
            // Render Editor List
            editorList.innerHTML = '';
            citationsData.sort((a, b) => a.text.replace(/<[^>]*>?/gm, '').localeCompare(b.text.replace(/<[^>]*>?/gm, '')));

            citationsData.forEach((item, index) => {
                const li = document.createElement('li');
                const cleanText = item.text.replace(/<[^>]*>?/gm, '');

                li.innerHTML = `
                    <span title="${cleanText}">${cleanText}</span>
                    <button class="btn-del-cite" onclick="removeCitation(${index})">
                        <i class="fas fa-times"></i>
                    </button>
                `;
                editorList.appendChild(li);
            });

            // Render Preview
            outPustaka.innerHTML = '';
            if (citationsData.length === 0) {
                outPustaka.innerHTML = '<p class="pustaka-item">............</p>';
            } else {
                citationsData.forEach(item => {
                    const p = document.createElement('p');
                    p.className = 'pustaka-item';
                    p.innerHTML = item.text;
                    outPustaka.appendChild(p);
                });
            }
        }

        btnAdd.addEventListener('click', function () {
            const type = selectType.value;
            const fields = citationSchema[type];
            let dataObj = {};
            let isComplete = true;

            fields.forEach(field => {
                const val = document.getElementById(field.id).value;
                if (!val) isComplete = false;
                dataObj[field.id] = val;
            });

            if (!isComplete) {
                alert("Mohon lengkapi semua kolom data pustaka.");
                return;
            }

            const formatted = formatCitation(dataObj, type);
            citationsData.push({ text: formatted });

            fields.forEach(field => document.getElementById(field.id).value = '');
            renderAll();
        });

        // Jadikan global agar bisa diakses onclick dari HTML
        window.removeCitation = function (index) {
            citationsData.splice(index, 1);
            renderAll();
        };

        selectType.addEventListener('change', renderInputs);
        renderInputs();
    }

    // 6. LOGIKA DARK/LIGHT MODE TOGGLE
    const themeToggleBtn = document.getElementById("theme-toggle");
    const logo = document.getElementById("navbar-logo");

    function updateLogo() {
        if (!logo) return; // cegah error jika logo tidak ditemukan

        if (document.body.classList.contains("light-mode")) {
            logo.src = "assets/logo-normalmode.png";
        } else {
            logo.src = "assets/logo-darkmode.png";
        }
    }

    if (themeToggleBtn) {
        const themeIcon = themeToggleBtn.querySelector("i");

        // cek tema dari localStorage
        const currentTheme = localStorage.getItem("theme");

        if (currentTheme === "light") {
            document.body.classList.add("light-mode");
            updateLogo();

            if (themeIcon) {
                themeIcon.classList.remove("fa-sun");
                themeIcon.classList.add("fa-moon");
            }
        } else {
            if (themeIcon) {
                themeIcon.classList.remove("fa-moon");
                themeIcon.classList.add("fa-sun");
            }
        }

        // set logo saat pertama load
        updateLogo();

        // event toggle theme
        themeToggleBtn.addEventListener("click", function () {
            document.body.classList.toggle("light-mode");

            let theme = "dark";

            if (document.body.classList.contains("light-mode")) {
                theme = "light";

                if (themeIcon) {
                    themeIcon.classList.remove("fa-sun");
                    themeIcon.classList.add("fa-moon");
                }
            } else {
                if (themeIcon) {
                    themeIcon.classList.remove("fa-moon");
                    themeIcon.classList.add("fa-sun");
                }
            }

            localStorage.setItem("theme", theme);

            // update logo setelah toggle
            updateLogo();
        });
    }
    function updateLogo() {
        if (!logo) return;

        if (document.body.classList.contains("light-mode")) {
            logo.src = "assets/logo-normalmode.png";
        } else {
            logo.src = "assets/logo-darkmode.png";
        }
    }
});

// =========================================================
// 7. FUNGSI DOWNLOAD WORD (DITARUH DI LUAR DOMCONTENTLOADED)
// =========================================================
function exportToWord() {
  // 1. Ambil preview dan clone agar tidak merusak tampilan di web
  var originalPreview = document.querySelector('.paper-preview');
  var previewClone = originalPreview.cloneNode(true);

  // --- UPDATE: FIX SURAT-META & SUB-POINT (Agar Sejajar ke Samping & Lebar) ---
  const bioRows = previewClone.querySelectorAll('.surat-row, .sub-point');
  bioRows.forEach(row => {
    const label = row.querySelector('.surat-col1, .sub-label');
    const value = row.querySelector('div:last-child, .sub-value');

    if (label && value) {
      const cleanValue = value.innerText.replace(/^:\s*/, '');
      
      // Menggunakan tabel transparan agar Label : Isi tetap satu baris di Word
      // width: 100% agar tabelnya lebar sesuai kertas
      row.innerHTML = `
        <table style="width: 100%; border:none; border-collapse:collapse; margin-bottom: 2px;">
          <tr>
            <td style="width: 180pt; border:none; padding: 1px 0; vertical-align: top; font-family: 'Times New Roman', serif; font-size: 12pt; text-align: left;">${label.innerText}</td>
            <td style="width: 15pt; border:none; padding: 1px 0; vertical-align: top; font-family: 'Times New Roman', serif; font-size: 12pt;">:</td>
            <td style="border:none; padding: 1px 0; vertical-align: top; font-family: 'Times New Roman', serif; font-size: 12pt; text-align: left;">${cleanValue}</td>
          </tr>
        </table>`;
      row.style.display = 'block';
    }
  });

  // --- PERBAIKAN: PAKSA JUDUL SEKSI (BOLD) KE UJUNG KIRI ---
  const sections = [
    'PENDAHULUAN', 'METODE', 'HASIL DAN PEMBAHASAN', 
    'KESIMPULAN', 'UCAPAN TERIMA KASIH', 'KONTRIBUSI PENULIS', 'DAFTAR PUSTAKA'
  ];

  const allElements = previewClone.querySelectorAll('b, strong, .section-title, h4, div, p');
  allElements.forEach(el => {
    if (sections.includes(el.innerText.trim().toUpperCase())) {
      el.style.textAlign = 'left';
      el.style.display = 'block';
      el.style.width = '100%';
      el.style.marginLeft = '0';
      el.style.fontWeight = 'bold';
    }
  });

  // --- PERBAIKAN: PAKSA DATA DIRI (TABEL) KE KIRI & LEBAR ---
  const tables = previewClone.querySelectorAll('table:not([style*="border:none"])');
  tables.forEach(table => {
    table.style.marginLeft = '0';
    table.style.marginRight = 'auto';
    table.style.width = '100%';
    
    const cells = table.querySelectorAll('td, th');
    cells.forEach(cell => {
      cell.style.textAlign = 'left';
    });
  });

  // --- PERBAIKAN: TANDA TANGAN TETAP DI KANAN ---
  var sigBoxes = previewClone.querySelectorAll('.signature-box, .ttd-box');
  sigBoxes.forEach(function(box) {
    var content = box.innerHTML;
    box.innerHTML = `
      <table style="width:100%; border:none; border-collapse:collapse;">
        <tr>
          <td style="width:60%; border:none;"></td>
          <td style="width:40%; border:none; text-align:left;">${content}</td>
        </tr>
      </table>`;
  });

  var content = previewClone.innerHTML;
  content = content.replace(/>\s+</g, "><"); 

  // 2. Header dengan CSS khusus Word
  var header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
               "xmlns:w='urn:schemas-microsoft-com:office:word' " +
               "xmlns='http://www.w3.org/TR/REC-html40'>" +
               "<head><meta charset='utf-8'>" +
               "<style>" +
               "body { font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.5; } " +
               "p, div, li { margin: 0; padding: 0; mso-margin-top-alt:0; mso-margin-bottom-alt:0; text-align: justify; } " +
               
               // Judul Artikel Utama tetap Center
               ".preview-judul-artikel, h2 { text-align: center !important; text-transform: uppercase; font-weight: bold; } " +
               
               // Paksa semua Judul Seksi (Pendahuluan dll) ke Kiri
               "b, strong { text-align: left !important; display: inline-block; width: auto; } " +
               
               // Tabel Bergaris (Data Diri)
               "table { border-collapse: collapse; width: 100%; } " +
               "td { border: 1px solid black; padding: 4px; text-align: left !important; } " +
               
               // Hilangkan border untuk tabel layout (Surat Meta & TTD)
               ".signature-box td, .surat-row td, .sub-point td { border: none !important; } " +
               "</style></head><body>";
               
  var footer = "</body></html>";
  var sourceHTML = header + content + footer;
  
  // 3. Proses Download
  var source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
  var fileDownload = document.createElement("a");
  document.body.appendChild(fileDownload);
  fileDownload.href = source;
  fileDownload.download = 'Draft_PKM_Final_Update.doc';
  fileDownload.click();
  document.body.removeChild(fileDownload);
}
/* =========================
   RIWAYAT PENDIDIKAN
========================= */

function tambahPendidikan() {
    const table = document.getElementById("pendidikan-table");

    const row = table.insertRow();

    row.innerHTML = `
    <td><input type="text" class="jenjang"></td>
    <td><input type="text" class="bidang"></td>
    <td><input type="text" class="instansi"></td>
    <td><input type="text" class="tahun"></td>
  `;
}

function hapusPendidikan() {
    const table = document.getElementById("pendidikan-table");

    if (table.rows.length > 2) {
        table.deleteRow(-1);
    }
}

function updatePendidikanPreview() {

    const jenjang = document.querySelectorAll(".jenjang");
    const bidang = document.querySelectorAll(".bidang");
    const instansi = document.querySelectorAll(".instansi");
    const tahun = document.querySelectorAll(".tahun");

    const preview = document.getElementById("preview-pendidikan");

    let html = "";

    for (let i = 0; i < jenjang.length; i++) {

        if (jenjang[i].value === "") continue;

        html += `
      <tr>
        <td class="rab-center">${i + 1}</td>
        <td>${jenjang[i].value}</td>
        <td>${bidang[i].value}</td>
        <td>${instansi[i].value}</td>
        <td>${tahun[i].value}</td>
      </tr>
    `;
    }

    preview.innerHTML = html;
}



/* =========================
   PENDIDIKAN / PENGAJARAN
========================= */

function tambahPengajaran() {

    const table = document.getElementById("pengajaran-table");

    const row = table.insertRow();

    row.innerHTML = `
    <td><input type="text" class="mk"></td>
    <td><input type="text" class="jenis"></td>
    <td><input type="text" class="sks"></td>
  `;
}

function hapusPengajaran() {

    const table = document.getElementById("pengajaran-table");

    if (table.rows.length > 2) {
        table.deleteRow(-1);
    }
}

function updatePengajaranPreview() {

    const mk = document.querySelectorAll(".mk");
    const jenis = document.querySelectorAll(".jenis");
    const sks = document.querySelectorAll(".sks");

    const preview = document.getElementById("preview-pengajaran");

    let html = "";

    for (let i = 0; i < mk.length; i++) {

        if (mk[i].value === "") continue;

        html += `
      <tr>
        <td class="rab-center">${i + 1}</td>
        <td>${mk[i].value}</td>
        <td>${jenis[i].value}</td>
        <td>${sks[i].value}</td>
      </tr>
    `;
    }

    preview.innerHTML = html;
}

/*Penelitian */
function tambahPenelitian() {

    const table = document.getElementById("penelitian-table");

    const row = table.insertRow();

    row.innerHTML = `
<td><input type="text" class="judul-penelitian"></td>
<td><input type="text" class="dana-penelitian"></td>
<td><input type="text" class="tahun-penelitian"></td>
`;

}

function hapusPenelitian() {

    const table = document.getElementById("penelitian-table");

    if (table.rows.length > 2) {
        table.deleteRow(-1);
    }

}

function updatePenelitianPreview() {

    const judul = document.querySelectorAll(".judul-penelitian");
    const dana = document.querySelectorAll(".dana-penelitian");
    const tahun = document.querySelectorAll(".tahun-penelitian");

    const preview = document.getElementById("preview-penelitian");

    let html = "";

    for (let i = 0; i < judul.length; i++) {

        if (judul[i].value === "") continue;

        html += `
<tr>
<td class="rab-center">${i + 1}</td>
<td>${judul[i].value}</td>
<td>${dana[i].value}</td>
<td>${tahun[i].value}</td>
</tr>
`;

    }

    preview.innerHTML = html;

}
/*Pengabdian Pada Masyarakat */
function tambahPengabdian() {

    const table = document.getElementById("pengabdian-table");

    const row = table.insertRow();

    row.innerHTML = `
<td><input type="text" class="judul-pengabdian"></td>
<td><input type="text" class="dana-pengabdian"></td>
<td><input type="text" class="tahun-pengabdian"></td>
`;

}

function hapusPengabdian() {

    const table = document.getElementById("pengabdian-table");

    if (table.rows.length > 2) {
        table.deleteRow(-1);
    }

}

function updatePengabdianPreview() {

    const judul = document.querySelectorAll(".judul-pengabdian");
    const dana = document.querySelectorAll(".dana-pengabdian");
    const tahun = document.querySelectorAll(".tahun-pengabdian");

    const preview = document.getElementById("preview-pengabdian");

    let html = "";

    for (let i = 0; i < judul.length; i++) {

        if (judul[i].value === "") continue;

        html += `
<tr>
<td class="rab-center">${i + 1}</td>
<td>${judul[i].value}</td>
<td>${dana[i].value}</td>
<td>${tahun[i].value}</td>
</tr>
`;

    }

    preview.innerHTML = html;

}

/* =========================
   EVENT LISTENER
========================= */

document.addEventListener("input", function () {

    updatePendidikanPreview();
    updatePengajaranPreview();
    updatePenelitianPreview();
    updatePengabdianPreview();

});
