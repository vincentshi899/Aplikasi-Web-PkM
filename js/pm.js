      // 1. MAPPING INPUT
      const fields = [
        { in: "in-latar", out: ["out-latar"] },
        { in: "in-tujuan", out: ["out-tujuan"] },
        { in: "in-manfaat", out: ["out-manfaat"] },
        { in: "in-luaran", out: ["out-luaran"] },
        { in: "in-profil", out: ["out-profil"] },
        { in: "in-solusi", out: ["out-solusi"] },
        { in: "in-perencanaan", out: ["out-perencanaan"] },
        { in: "in-pelaksanaan", out: ["out-pelaksanaan"] },
        { in: "in-keberlanjutan", out: ["out-keberlanjutan"] },
        { in: "in-b1", out: ["out-b1"] },
        { in: "in-b2", out: ["out-b2"] },
        { in: "in-b3", out: ["out-b3"] },
        { in: "in-keg1", out: ["out-keg1"] },
        { in: "in-keg2", out: ["out-keg2"] },
        { in: "in-keg16", out: ["out-keg16"] },
        { in: "in-keg17", out: ["out-keg17"] },
        { in: "in-keg18", out: ["out-keg18"] },
        { in: "in-keg19", out: ["out-keg19"] },
        { in: "in-keg20", out: ["out-keg20"] },
        { in: "in-keg21", out: ["out-keg21"] },
        { in: "in-note-42", out: ["out-note-42"] },
        { in: "in-s1", out: ["out-s1"] },
        { in: "in-s2", out: ["out-s2"] },
        { in: "in-s3", out: ["out-s3"] },
        { in: "in-t1", out: ["out-t1"] },
        { in: "in-t2", out: ["out-t2"] },
        { in: "in-t3", out: ["out-t3"] },
        { in: "in-l1", out: ["out-l1"] },
        { in: "in-l2", out: ["out-l2"] },
        { in: "in-l3", out: ["out-l3"] },
        { in: "in-total-all", out: ["out-total-all"] },
        { in: "in-rekap-belmawa", out: ["out-rekap-belmawa"] },
        { in: "in-rekap-pt", out: ["out-rekap-pt"] },
        { in: "in-rekap-instansi", out: ["out-rekap-instansi"] },
        { in: "in-rekap-total", out: ["out-rekap-total"] },
        { in: "in-notes", out: ["out-notes"] },
        { in: "in-nama", out: ["out-nama", "out-nama-ttd"] },
        { in: "in-nim", out: ["out-nim", "out-nim-ttd"] },
        { in: "in-prodi", out: ["out-prodi"] },
        { in: "in-dosen", out: ["out-dosen"] },
        { in: "in-kampus", out: ["out-kampus"] },
        { in: "in-judul", out: ["out-judul"] },
        { in: "in-kota", out: ["out-kota"] },
        { in: "in-judul-lamp5", out: ["out-judul-lamp5"] },
        { in: "in-kota-tanggal", out: ["out-kota-tanggal"] },
        { in: "in-ttd", out: ["out-ttd"] },
        { in: "input-dosen-nama", out: ["out-dosen-nama"] },
        { in: "input-dosen-programstudi", out: ["out-dosen-programstudi"] },
        { in: "input-dosen-nip", out: ["out-dosen-nip"] },
        { in: "input-dosen-ttl", out: ["out-dosen-ttl"] },
        { in: "input-dosen-email", out: ["out-dosen-email"] },
        { in: "input-dosen-telp", out: ["out-dosen-telp"] },

      ];

      fields.forEach((field) => {
        const inputEl = document.getElementById(field.in);
        if (inputEl) {
          inputEl.addEventListener("input", function () {
            const val = this.value || `[${this.placeholder || "Data"}]`;
            field.out.forEach((outId) => {
              const outEl = document.getElementById(outId);
              if (outEl) {
                if (outId === "out-nim-ttd")
                  outEl.innerText = "NIM. " + this.value;
                else outEl.innerText = val;
              }
            });
          });
        }
      });

      // 2. TANGGAL OTOMATIS
      const inTanggal = document.getElementById("in-tanggal");
      const outTanggal = document.getElementById("out-tanggal");

      inTanggal.valueAsDate = new Date();
      updateTanggal();
      inTanggal.addEventListener("change", updateTanggal);

      function updateTanggal() {
        if (!inTanggal.value) return;
        const dateVal = new Date(inTanggal.value);
        const options = { year: "numeric", month: "long", day: "numeric" };
        outTanggal.innerText = dateVal.toLocaleDateString("id-ID", options);
      }

      // 3. LOGIKA MARGIN
      const inMargin = document.getElementById("in-margin");
      const paperPreview = document.querySelector(".paper-preview");

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

      // 4. UPLOAD GAMBAR
      const imageInput = document.getElementById("imageUpload");
      const previewImage = document.getElementById("previewImage");

      imageInput.addEventListener("change", function () {
        const file = this.files[0];
        if (file) {
          const imageURL = URL.createObjectURL(file);
          previewImage.src = imageURL;
          previewImage.style.display = "block";
        }
      });

      // 5. EXPORT TO WORD
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

  // --- PERBAIKAN: PAKSA DATA DIRI (TABEL) KE KIRI, LEBAR & BORDER FULL ---
  const tables = previewClone.querySelectorAll('table:not([style*="border:none"])');
  tables.forEach(table => {
    table.style.marginLeft = '0';
    table.style.marginRight = 'auto';
    table.style.width = '100%';
    
    // BANTU WORD: Set atribut HTML dasar agar Word langsung mengenali tabel bergaris
    table.setAttribute('border', '1'); 
    table.style.borderCollapse = 'collapse';
    
    // UPDATE: Ambil elemen 'td' DAN 'th' agar kepala tabel tidak terlewat
    const cells = table.querySelectorAll('td, th');
    cells.forEach(cell => {
      cell.style.textAlign = 'left';
      cell.style.border = '1px solid black'; // Paksa garis hitam via inline style
      cell.style.padding = '4px';
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
               
               ".preview-judul-artikel, h2 { text-align: center !important; text-transform: uppercase; font-weight: bold; } " +
               "b, strong { text-align: left !important; display: inline-block; width: auto; } " +
               
               // UPDATE CSS: Tambahkan 'th' bersanding dengan 'td' 
               "table { border-collapse: collapse; width: 100%; } " +
               "td, th { border: 1px solid black; padding: 4px; text-align: left !important; } " +
               
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
      
      // 7. GENERATOR DAFTAR PUSTAKA
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

      if (selectType && inputContainer && btnAdd) {
          function renderInputs() {
              const type = selectType.value;
              const fields = citationSchema[type];
              inputContainer.innerHTML = ''; 

              fields.forEach(field => {
                  const input = document.createElement('input');
                  input.type = 'text';
                  input.id = field.id;
                  input.placeholder = field.ph;
                  input.style.marginBottom = "5px";
                  input.style.width = "100%";
                  input.style.padding = "8px";
                  inputContainer.appendChild(input);
              });
          }

          function formatCitation(data, type) {
              const getVal = (id) => (data[id] || '').trim();
              
              if (type === 'buku') {
                  return `${getVal('c-authors')} (${getVal('c-year')}). <i>${getVal('c-title')}</i>. ${getVal('c-publisher')}. ${getVal('c-city')}.`;
              } else if (type === 'jurnal') {
                  return `${getVal('c-authors')} (${getVal('c-year')}). ${getVal('c-title')}. <i>${getVal('c-journal')}</i>. ${getVal('c-vol')}.`;
              } else if (type === 'website') {
                  return `${getVal('c-authors')} (${getVal('c-year')}). <i>${getVal('c-title')}</i>. URL: ${getVal('c-url')}. Diakses: ${getVal('c-access')}.`;
              } else if (type === 'prosiding') {
                  return `${getVal('c-authors')} (${getVal('c-year')}). ${getVal('c-title')}. <i>${getVal('c-conf')}</i>. ${getVal('c-city')}.`;
              } else if (type === 'skripsi') {
                  return `${getVal('c-authors')} (${getVal('c-year')}). ${getVal('c-title')}. <i>${getVal('c-type')}</i>. ${getVal('c-univ')}.`;
              }
              return '';
          }

          function renderAll() {
              editorList.innerHTML = '';
              
              citationsData.sort((a, b) => a.text.replace(/<[^>]*>?/gm, '').localeCompare(b.text.replace(/<[^>]*>?/gm, '')));

              citationsData.forEach((item, index) => {
                  const li = document.createElement('li');
                  const cleanText = item.text.replace(/<[^>]*>?/gm, ''); 

                  li.innerHTML = `
                      <span title="${cleanText}" style="display:inline-block; width:85%; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; vertical-align:middle;">${cleanText}</span>
                      <button class="btn-del-cite" onclick="removeCitation(${index})" style="background:red; color:white; border:none; padding:2px 5px; cursor:pointer; float:right;">
                          <i class="fas fa-times"></i> X
                      </button>
                  `;
                  li.style.marginBottom = "5px";
                  editorList.appendChild(li);
              });

              outPustaka.innerHTML = '';
              if (citationsData.length === 0) {
                  outPustaka.innerHTML = '<p class="pustaka-item">............</p>';
              } else {
                  citationsData.forEach(item => {
                      const p = document.createElement('p');
                      p.className = 'pustaka-item';
                      p.style.marginBottom = "10px";
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

          selectType.addEventListener('change', renderInputs);

          window.removeCitation = function (index) {
              citationsData.splice(index, 1);
              renderAll();
          };

          renderInputs();
      }
      // =====================================
// DARK / LIGHT MODE (SAMA DENGAN PKM AI)
// =====================================
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

function hapusPendidikan(){
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

function tambahPengajaran(){

  const table = document.getElementById("pengajaran-table");

  const row = table.insertRow();

  row.innerHTML = `
    <td><input type="text" class="mk"></td>
    <td><input type="text" class="jenis"></td>
    <td><input type="text" class="sks"></td>
  `;
}

function hapusPengajaran(){

  const table = document.getElementById("pengajaran-table");

  if (table.rows.length > 2) {
    table.deleteRow(-1);
  }
}

function updatePengajaranPreview(){

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
function tambahPenelitian(){

const table = document.getElementById("penelitian-table");

const row = table.insertRow();

row.innerHTML = `
<td><input type="text" class="judul-penelitian"></td>
<td><input type="text" class="dana-penelitian"></td>
<td><input type="text" class="tahun-penelitian"></td>
`;

}

function hapusPenelitian(){

const table = document.getElementById("penelitian-table");

if (table.rows.length > 2) {
table.deleteRow(-1);
}

}

function updatePenelitianPreview(){

const judul = document.querySelectorAll(".judul-penelitian");
const dana = document.querySelectorAll(".dana-penelitian");
const tahun = document.querySelectorAll(".tahun-penelitian");

const preview = document.getElementById("preview-penelitian");

let html = "";

for (let i = 0; i < judul.length; i++){

if (judul[i].value === "") continue;

html += `
<tr>
<td class="rab-center">${i+1}</td>
<td>${judul[i].value}</td>
<td>${dana[i].value}</td>
<td>${tahun[i].value}</td>
</tr>
`;

}

preview.innerHTML = html;

}
/*Pengabdian Pada Masyarakat */
function tambahPengabdian(){

const table = document.getElementById("pengabdian-table");

const row = table.insertRow();

row.innerHTML = `
<td><input type="text" class="judul-pengabdian"></td>
<td><input type="text" class="dana-pengabdian"></td>
<td><input type="text" class="tahun-pengabdian"></td>
`;

}

function hapusPengabdian(){

const table = document.getElementById("pengabdian-table");

if (table.rows.length > 2) {
table.deleteRow(-1);
}

}

function updatePengabdianPreview(){

const judul = document.querySelectorAll(".judul-pengabdian");
const dana = document.querySelectorAll(".dana-pengabdian");
const tahun = document.querySelectorAll(".tahun-pengabdian");

const preview = document.getElementById("preview-pengabdian");

let html = "";

for (let i = 0; i < judul.length; i++){

if (judul[i].value === "") continue;

html += `
<tr>
<td class="rab-center">${i+1}</td>
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

document.addEventListener("input", function(){

updatePendidikanPreview();
updatePengajaranPreview();
updatePenelitianPreview();
updatePengabdianPreview();

});

