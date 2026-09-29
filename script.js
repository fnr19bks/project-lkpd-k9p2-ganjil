/* =========================================================
 * MISI KURIR MUDA — Petualangan Graf Berbobot
 * LKPD Interaktif Informatika — Berpikir Komputasional
 * SMP Negeri 19 Kota Bekasi
 * Vanilla JS · Tanpa backend · Offline-first
 * ========================================================= */
'use strict';

/* =========================================================
 * 1. PARAMETER TUNABLE (⚙️ Guru boleh ubah)
 * ========================================================= */
const MAX_LIVES     = 3;                          // 1–5
const TOTAL_LEVELS  = 4;                          // 3–6
const LEVEL_TIMER   = null;                       // null = nonaktif, atau 30–180 (detik)
const BLITZ_SECONDS = 60;                         // dipakai saat Mode Tantangan Kilat aktif
const DEFAULT_LANG  = 'id';                       // 'id' atau 'en'
const SOUND_ENABLED = true;                       // true/false
const AUTHOR_NAME   = 'SMP Negeri 19 Kota Bekasi';
const SCHOOL_YEAR   = 2026;
const STORAGE_KEY   = 'lkpdGrafK9_bestScore';
const MAX_SCORE     = 240;

/* =========================================================
 * 2. DATA GRAF & SOAL (PERSIS dari materi)
 * ========================================================= */
const GRAPH_MAIN = {
  viewBox: '0 0 700 480',
  nodes: [
    { id:'A', x: 80, y:150, name:{ id:'Toko / Rumah Kirana', en:'Shop / Kirana\u2019s House' } },
    { id:'B', x:240, y: 80, name:{ id:'Simpang Pasar',       en:'Market Junction' } },
    { id:'C', x:240, y:330, name:{ id:'Jalan Merdeka',       en:'Merdeka Street' } },
    { id:'D', x:440, y:180, name:{ id:'Sekolah',             en:'School' } },
    { id:'E', x:440, y:400, name:{ id:'Taman Kota',          en:'City Park' } },
    { id:'F', x:630, y:290, name:{ id:'Rumah Bu Sari',       en:'Mrs. Sari\u2019s House' } }
  ],
  edges: [
    { from:'A', to:'B', time: 5, cost:    0, off:-26 },
    { from:'A', to:'C', time: 8, cost: 2000, off:-26 },
    { from:'B', to:'C', time: 3, cost:    0, off:-34 },
    { from:'B', to:'D', time: 6, cost: 1000, off:-26 },
    { from:'C', to:'D', time: 4, cost:    0, off:-26 },
    { from:'C', to:'E', time: 7, cost: 2000, off:-26 },
    { from:'D', to:'E', time: 2, cost:    0, off: 38 },
    { from:'D', to:'F', time: 5, cost: 1000, off:-26 },
    { from:'E', to:'F', time: 4, cost:    0, off: 26 }
  ]
};

const DATA = {

  /* ---------- LEVEL 0 : Graf Sederhana 4 Simpul ---------- */
  level0: {
    viewBox: '0 0 640 430',
    nodes: [
      { id:'P', x:110, y:120, name:{ id:'Rumah',        en:'House' } },
      { id:'Q', x:400, y: 80, name:{ id:'Pasar',        en:'Market' } },
      { id:'R', x:190, y:330, name:{ id:'Sekolah',      en:'School' } },
      { id:'S', x:510, y:300, name:{ id:'Perpustakaan', en:'Library' } }
    ],
    edges: [
      { from:'P', to:'Q', time:8, off:-26 },
      { from:'P', to:'R', time:5, off:-26 },
      { from:'Q', to:'S', time:6, off:-26 },
      { from:'R', to:'S', time:7, off:-26 },
      { from:'Q', to:'R', time:4, off: 26 }
    ]
  },

  /* ---------- LEVEL 1 : 5 Soal Pilihan Ganda ---------- */
  level1: [
    {
      q:{
        id:'Manakah yang merupakan simpul (<em>vertex</em>) pada peta graf di atas?',
        en:'Which one is a vertex (<em>simpul</em>) on the graph map above?'
      },
      options:[
        { id:'Simpul A',            en:'Vertex A' },
        { id:'Sisi A–B',            en:'Edge A–B' },
        { id:'Bobot 5 menit',       en:'Weight 5 minutes' },
        { id:'Rute (route)',        en:'Route (rute)' }
      ],
      answer:0,
      explain:{
        id:'Simpul (vertex) digambar sebagai lingkaran dan diberi nama satu huruf besar, misalnya A, B, C, D, E, dan F.',
        en:'A vertex (simpul) is drawn as a circle and labelled with one capital letter, for example A, B, C, D, E and F.'
      },
      formula:'Vertex (simpul) = lingkaran berlabel huruf besar'
    },
    {
      q:{
        id:'Sisi (<em>edge</em>) yang menghubungkan simpul A dan simpul B adalah…',
        en:'The edge (<em>sisi</em>) that connects vertex A and vertex B is…'
      },
      options:[
        { id:'A–B', en:'A–B' },
        { id:'A–C', en:'A–C' },
        { id:'B–C', en:'B–C' },
        { id:'D–F', en:'D–F' }
      ],
      answer:0,
      explain:{
        id:'Sisi adalah garis penghubung dua simpul. Garis yang menghubungkan A dan B ditulis A–B dengan bobot 5 menit dan Rp0.',
        en:'An edge is the line connecting two vertices. The line connecting A and B is written A–B with weight 5 minutes and Rp0.'
      },
      formula:'Sisi A–B = 5 menit / Rp0'
    },
    {
      q:{
        id:'Berapa bobot (<em>weight</em>) pada sisi B–D?',
        en:'What is the weight (<em>bobot</em>) of edge B–D?'
      },
      options:[
        { id:'3 menit', en:'3 minutes' },
        { id:'4 menit', en:'4 minutes' },
        { id:'6 menit', en:'6 minutes' },
        { id:'8 menit', en:'8 minutes' }
      ],
      answer:2,
      explain:{
        id:'Pada tabel bobot, sisi B–D memiliki waktu 6 menit dan biaya Rp1.000. Jadi bobot waktunya 6 menit.',
        en:'In the weight table, edge B–D has a time of 6 minutes and a cost of Rp1,000. So its time weight is 6 minutes.'
      },
      formula:'Sisi B–D = 6 menit / Rp1.000'
    },
    {
      q:{
        id:'Apa arti <em>route</em> (rute)?',
        en:'What does route (<em>rute</em>) mean?'
      },
      options:[
        { id:'Urutan simpul yang dilalui dari titik awal ke titik tujuan.', en:'A sequence of vertices travelled from the start point to the destination.' },
        { id:'Banyaknya simpul yang ada di dalam satu graf.',               en:'The number of vertices inside one graph.' },
        { id:'Nama lain dari bobot pada sebuah sisi.',                      en:'Another name for the weight of an edge.' },
        { id:'Gambar lingkaran kecil di dalam graf.',                       en:'A small circle drawn inside the graph.' }
      ],
      answer:0,
      explain:{
        id:'Rute (route) adalah urutan simpul yang dilalui, misalnya A → B → D → F, mulai dari titik awal sampai titik tujuan.',
        en:'A route is a sequence of vertices travelled, for example A → B → D → F, from the start point to the destination.'
      },
      formula:'Contoh rute: A → B → D → F'
    },
    {
      q:{
        id:'Simpul mana yang paling banyak terhubung (memiliki sisi terbanyak)?',
        en:'Which vertex is the most connected (has the most edges)?'
      },
      options:[
        { id:'Simpul A (2 sisi)',                               en:'Vertex A (2 edges)' },
        { id:'Simpul B (3 sisi)',                               en:'Vertex B (3 edges)' },
        { id:'Simpul C dan D (masing-masing 4 sisi)',           en:'Vertices C and D (4 edges each)' },
        { id:'Simpul F (2 sisi)',                               en:'Vertex F (2 edges)' }
      ],
      answer:2,
      explain:{
        id:'Simpul C terhubung ke A, B, D, E (4 sisi). Simpul D terhubung ke B, C, E, F (4 sisi). Jadi C dan D paling banyak terhubung.',
        en:'Vertex C connects to A, B, D, E (4 edges). Vertex D connects to B, C, E, F (4 edges). So C and D are the most connected.'
      },
      formula:'C = A,B,D,E (4)  ·  D = B,C,E,F (4)'
    }
  ],

  /* ---------- LEVEL 2 : 4 Soal Input Angka ---------- */
  level2: [
    {
      route:'A → B → D → F',
      q:{
        id:'Hitung total waktu (menit) untuk rute berikut:',
        en:'Calculate the total time (minutes) for this route:'
      },
      answer:16,
      unit:'menit',
      explain:{
        id:'A→B = 5 menit, B→D = 6 menit, D→F = 5 menit. Total = 5 + 6 + 5 = 16 menit.',
        en:'A→B = 5 min, B→D = 6 min, D→F = 5 min. Total = 5 + 6 + 5 = 16 minutes.'
      },
      formula:'5 + 6 + 5 = 16 menit'
    },
    {
      route:'A → C → D → F',
      q:{
        id:'Hitung total biaya (Rp) untuk rute berikut:',
        en:'Calculate the total cost (Rp) for this route:'
      },
      answer:3000,
      unit:'Rp',
      explain:{
        id:'A→C = Rp2.000, C→D = Rp0, D→F = Rp1.000. Total = Rp2.000 + Rp0 + Rp1.000 = Rp3.000.',
        en:'A→C = Rp2,000, C→D = Rp0, D→F = Rp1,000. Total = Rp2,000 + Rp0 + Rp1,000 = Rp3,000.'
      },
      formula:'2.000 + 0 + 1.000 = Rp3.000'
    },
    {
      route:'A → B → C → D → F',
      q:{
        id:'Hitung total waktu (menit) untuk rute berikut:',
        en:'Calculate the total time (minutes) for this route:'
      },
      answer:17,
      unit:'menit',
      explain:{
        id:'A→B = 5, B→C = 3, C→D = 4, D→F = 5. Total = 5 + 3 + 4 + 5 = 17 menit.',
        en:'A→B = 5, B→C = 3, C→D = 4, D→F = 5. Total = 5 + 3 + 4 + 5 = 17 minutes.'
      },
      formula:'5 + 3 + 4 + 5 = 17 menit'
    },
    {
      route:'A → B → D → E → F',
      q:{
        id:'Hitung total biaya (Rp) untuk rute berikut:',
        en:'Calculate the total cost (Rp) for this route:'
      },
      answer:1000,
      unit:'Rp',
      explain:{
        id:'A→B = Rp0, B→D = Rp1.000, D→E = Rp0, E→F = Rp0. Total = Rp0 + Rp1.000 + Rp0 + Rp0 = Rp1.000.',
        en:'A→B = Rp0, B→D = Rp1,000, D→E = Rp0, E→F = Rp0. Total = Rp0 + Rp1,000 + Rp0 + Rp0 = Rp1,000.'
      },
      formula:'0 + 1.000 + 0 + 0 = Rp1.000'
    }
  ],

  /* ---------- LEVEL 3 : 4 Skenario Pemilihan Rute ---------- */
  level3: [
    {
      scenario:{
        id:'Paket Pak Rudi harus sampai dalam waktu maksimal 17 menit, dan biaya pengiriman harus paling murah. Rute mana yang kamu pilih?',
        en:'Mr. Rudi\u2019s package must arrive within a maximum of 17 minutes, and the delivery cost must be the cheapest. Which route do you choose?'
      },
      options:[
        { id:'Rute A → B → D → F — 16 menit / Rp2.000',      en:'Route A → B → D → F — 16 minutes / Rp2,000' },
        { id:'Rute A → B → C → D → F — 17 menit / Rp1.000',  en:'Route A → B → C → D → F — 17 minutes / Rp1,000' },
        { id:'Rute A → C → E → F — 19 menit / Rp4.000',      en:'Route A → C → E → F — 19 minutes / Rp4,000' }
      ],
      answer:1,
      explain:{
        id:'Rute pertama (16 menit) lebih cepat, tetapi biayanya Rp2.000. Rute kedua tepat 17 menit dan biayanya hanya Rp1.000. Rute ketiga sudah melebihi batas 17 menit. Jadi rute kedua paling sesuai.',
        en:'The first route (16 minutes) is faster but costs Rp2,000. The second route is exactly 17 minutes and costs only Rp1,000. The third route exceeds the 17-minute limit. So the second route fits best.'
      },
      formula:'16 mnt/Rp2.000  ·  17 mnt/Rp1.000 ✔  ·  19 mnt/Rp4.000'
    },
    {
      scenario:{
        id:'Bu Sari sedang hamil muda dan harus dikirim lewat rute paling aman sekaligus paling cepat. Rute mana yang kamu pilih?',
        en:'Mrs. Sari is in early pregnancy and must be sent through the safest and fastest route. Which route do you choose?'
      },
      options:[
        { id:'Rute biasa (A → B → D → F) — 16 menit, jalan lebar dan mulus, biaya Rp2.000',            en:'Normal route (A → B → D → F) — 16 minutes, wide smooth road, cost Rp2,000' },
        { id:'Rute macet (A → C → E → F) — 19 menit, jalan sedang diperbaiki, biaya Rp4.000',          en:'Congested route (A → C → E → F) — 19 minutes, road under repair, cost Rp4,000' },
        { id:'Rute alternatif (A → B → C → D → F) — 17 menit, jalan kecil berbatu, biaya Rp1.000',     en:'Alternative route (A → B → C → D → F) — 17 minutes, small rocky road, cost Rp1,000' }
      ],
      answer:0,
      explain:{
        id:'Rute biasa hanya 16 menit (paling cepat) dan jalannya lebar serta mulus sehingga paling aman. Rute macet lebih lama dan rusak; rute alternatif berbatu dan kurang nyaman.',
        en:'The normal route takes only 16 minutes (the fastest) and the road is wide and smooth, so it is the safest. The congested route is longer and damaged; the alternative route is rocky and uncomfortable.'
      },
      formula:'16 menit (tercepat) + jalan lebar & mulus = paling aman ✔'
    },
    {
      scenario:{
        id:'Hari ini hujan, jalan B–D banjir sehingga bobotnya berubah menjadi 15 menit. Pilih rute tercepat!',
        en:'It is raining today, the B–D road is flooded so its weight changes to 15 minutes. Choose the fastest route!'
      },
      options:[
        { id:'A → B → D → F = 5 + 15 + 5 = 25 menit',        en:'A → B → D → F = 5 + 15 + 5 = 25 minutes' },
        { id:'A → B → C → D → F = 5 + 3 + 4 + 5 = 17 menit', en:'A → B → C → D → F = 5 + 3 + 4 + 5 = 17 minutes' },
        { id:'A → C → E → F = 8 + 7 + 4 = 19 menit',         en:'A → C → E → F = 8 + 7 + 4 = 19 minutes' }
      ],
      answer:1,
      explain:{
        id:'Karena sisi B–D banjir (15 menit), rute lewat B–D menjadi 25 menit. Rute A → B → C → D → F hanya 17 menit, lebih cepat daripada rute A → C → E → F (19 menit).',
        en:'Because edge B–D is flooded (15 minutes), the route through B–D becomes 25 minutes. Route A → B → C → D → F takes only 17 minutes, faster than A → C → E → F (19 minutes).'
      },
      formula:'5 + 3 + 4 + 5 = 17 menit ✔ (vs 25 dan 19 menit)'
    },
    {
      scenario:{
        id:'Ada 3 paket yang harus diantar. Kamu ingin hemat biaya sekaligus tetap cepat. Rute mana yang kamu pilih?',
        en:'There are 3 packages to deliver. You want to save cost while still being fast. Which route do you choose?'
      },
      options:[
        { id:'Rute A → B → D → F — 16 menit, Rp2.000',       en:'Route A → B → D → F — 16 minutes, Rp2,000' },
        { id:'Rute A → B → C → D → F — 17 menit, Rp1.000',   en:'Route A → B → C → D → F — 17 minutes, Rp1,000' },
        { id:'Rute A → C → E → F — 19 menit, Rp4.000',       en:'Route A → C → E → F — 19 minutes, Rp4,000' }
      ],
      answer:1,
      explain:{
        id:'Rute A → B → C → D → F hanya 1 menit lebih lama (17 menit) tetapi menghemat Rp1.000 dibanding rute A → B → D → F, dan jauh lebih murah serta lebih cepat daripada rute A → C → E → F.',
        en:'Route A → B → C → D → F is only 1 minute slower (17 minutes) but saves Rp1,000 compared to A → B → D → F, and is much cheaper and faster than A → C → E → F.'
      },
      formula:'Selisih waktu 1 menit, penghematan Rp1.000 → pilihan seimbang ✔'
    }
  ],

  /* ---------- LEVEL 4 : 2 Soal Esai ---------- */
  level4: [
    {
      q:{
        id:'Mengapa kamu memilih rute A → B → C → D → F daripada A → B → D → F? Tulis alasanmu dengan menyebut angka!',
        en:'Why do you choose route A → B → C → D → F instead of A → B → D → F? Write your reason and mention the numbers!'
      },
      minNumbers:2,
      keywords:['karena','lebih','total','menit','rupiah','murah','hemat','cepat','rp'],
      sample:{
        id:'Rute A → B → C → D → F total 17 menit dan Rp1.000, lebih murah Rp1.000 daripada A → B → D → F yang 16 menit tetapi Rp2.000. Selisih waktunya hanya 1 menit, jadi saya pilih yang lebih hemat biaya.',
        en:'Route A → B → C → D → F takes 17 minutes and costs Rp1,000, which is Rp1,000 cheaper than A → B → D → F (16 minutes but Rp2,000). The time difference is only 1 minute, so I choose the cheaper one.'
      },
      explain:{
        id:'Jawaban yang baik menyebut minimal 2 angka (misalnya 16 dan 17 menit, atau Rp1.000 dan Rp2.000) serta memakai kata kunci seperti "karena", "lebih", "total", atau "rupiah".',
        en:'A good answer mentions at least 2 numbers (e.g. 16 and 17 minutes, or Rp1,000 and Rp2,000) and uses keywords such as "karena", "lebih", "total", or "rupiah".'
      }
    },
    {
      q:{
        id:'Menurutmu, kapan waktu lebih penting daripada biaya? Berikan 1 contoh dari peta graf di atas!',
        en:'In your opinion, when is time more important than cost? Give 1 example from the graph map above!'
      },
      minNumbers:2,
      keywords:['karena','lebih','total','menit','rupiah','murah','hemat','cepat','rp'],
      sample:{
        id:'Waktu lebih penting saat paket harus segera sampai, misalnya obat untuk Bu Sari. Rute A → B → D → F hanya 16 menit meskipun biayanya Rp2.000, sedangkan rute A → B → C → D → F 17 menit dengan biaya Rp1.000. Karena darurat, saya pilih rute 16 menit.',
        en:'Time is more important when the package must arrive immediately, for example medicine for Mrs. Sari. Route A → B → D → F takes only 16 minutes even though it costs Rp2,000, while A → B → C → D → F takes 17 minutes at Rp1,000. Because it is urgent, I choose the 16-minute route.'
      },
      explain:{
        id:'Waktu menjadi prioritas ketika ada kondisi darurat, tenggat waktu (deadline) yang ketat, atau barang mudah rusak. Contohnya memilih rute 16 menit walaupun biayanya Rp2.000.',
        en:'Time becomes the priority when there is an emergency, a tight deadline, or perishable goods. For example, choosing the 16-minute route even though it costs Rp2,000.'
      }
    }
  ]
};

/* =========================================================
 * 3. KAMUS DWIBAHASA (I18N)
 * ========================================================= */
const I18N = {
  id: {
    appSubtitle:'Petualangan Graf Berbobot (Weighted Graph Adventure)',
    lives:'Nyawa', score:'Skor', time:'Waktu',
    welcomeSub:'Kamu adalah kurir muda SMP Negeri 19 Kota Bekasi. Bantu Pak Rudi, Kirana, dan Bu Sari mengantar paket lewat rute terbaik!',
    level0Title:'Level 0 — Tutorial Interaktif (Interactive Tutorial)',
    level1Title:'Level 1 — Kenali Bagian Graf (Identify the Graph Parts)',
    level2Title:'Level 2 — Hitung Total Bobot (Calculate the Total Weight)',
    level3Title:'Level 3 — Pilih Rute Terbaik (Pick the Best Route)',
    level4Title:'Level 4 — Jelaskan Alasanmu (Explain Your Reasoning)',
    tutorialGraphTitle:'Peta Sederhana (Simple Map)',
    tutorialInstruction:'Klik simpul (vertex) untuk mengenal namanya. / Click a node to learn its name.',
    discoveryTitle:'Daftar Penjelajahan (Exploration List)',
    nodesLabel:'Simpul (Vertex)', edgesLabel:'Sisi (Edge)',
    tutorialInfoEmpty:'Belum ada yang dipilih. Mulailah menjelajah peta!',
    blitzLabel:'Mode Tantangan Kilat (Blitz Challenge) — 60 detik per level',
    graphCaption:'Peta Graf Utama — 6 simpul, 9 sisi. Setiap sisi punya bobot waktu (menit) dan biaya (rupiah).',
    graphCaption2:'Gunakan peta ini untuk menjumlahkan bobot setiap sisi pada rute.',
    graphCaption3:'Baca skenario dengan teliti, lalu pilih rute yang paling sesuai.',
    graphCaption4:'Tuliskan alasanmu dengan menyebut angka dari peta di atas.',
    questionOf:'Soal {n} dari {m}',
    levelWord:'Level',
    checkAnswer:'Periksa Jawaban', submit:'Kirim', next:'Lanjut',
    correctTitle:'Benar! Hebat!', wrongTitle:'Belum Tepat',
    correctMsg:'Jawabanmu tepat. Pertahankan!',
    wrongMsg:'Jawabanmu belum tepat. Perhatikan penjelasan berikut.',
    timeUpTitle:'Waktu Habis!', timeUpText:'Waktu untuk level ini habis. Nyawa berkurang 1 dan level dimulai ulang.',
    lifeLostText:'Nyawa berkurang 1 ❤️',
    gameOverTitle:'Nyawa Habis!',
    gameOverText:'Jangan menyerah, Kurir Muda. Ayo coba lagi dari Level 1.',
    retryL1:'Coba Lagi dari Level 1',
    resultTitle:'Misi Selesai! 🎉',
    resultScore:'Skor Akhir', bestScoreLabel:'Skor terbaikmu',
    nameLabel:'Nama Murid (Student Name)',
    namePlaceholder:'Tulis namamu di sini…',
    reviewTitle:'Pembahasan (Review)',
    calcTitle:'Kalkulator Bantu (Helper Calculator)',
    calcHint:'Tulis angka yang ingin dijumlahkan, pisahkan dengan tanda +.',
    glossaryTitle:'Glosarium (Glossary) ID ↔ EN',
    aboutTitle:'Cara Bermain (How to Play)',
    keywordHint:'Gunakan minimal 2 angka dan 1 kata kunci: karena, lebih, total, menit, rupiah.',
    essayPlaceholder:'Tulis alasanmu di sini (maksimal 280 karakter)…',
    charLeft:'{n} karakter tersisa',
    essayIncomplete:'Jawabanmu belum lengkap',
    essayIncompleteText:'Sertakan minimal 2 angka dan 1 kata kunci (karena / lebih / total / menit / rupiah). Coba lagi ya!',
    minShort:'mnt',
    unitMinute:'menit', unitRp:'Rp',
    inputPlaceholder:'Tulis angka…',
    newBest:'🎉 Rekor baru!',
    bestEver:'Terbaik sebelumnya',
    locked:'Terkunci',
    aboutSteps:[
      'Tulis namamu di kolom yang tersedia sebelum mencetak sertifikat.',
      'Level 0 (Tutorial): klik semua simpul (vertex) dan sisi (edge) pada peta untuk membuka Level 1.',
      'Level 1: jawab 5 soal pilihan ganda tentang simpul, sisi, dan bobot. Setiap jawaban benar bernilai 10 poin.',
      'Level 2: hitung total bobot rute lalu tulis jawabannya dalam angka. Setiap jawaban benar bernilai 15 poin.',
      'Level 3: baca skenario, lalu pilih rute terbaik. Setiap jawaban benar bernilai 20 poin.',
      'Level 4: tulis alasanmu dengan menyebut angka. Setiap jawaban valid bernilai 25 poin.',
      'Kamu punya 3 nyawa ❤️. Setiap jawaban salah mengurangi 1 nyawa. Jika habis, kamu kembali ke Level 1.',
      'Gunakan tombol 🧮 (kalkulator), 📖 (glosarium), 🌐 (bahasa), 🌙 (mode gelap), dan 🔊 (suara) kapan saja.'
    ],
    badge:[
      { min:200, label:'🏆 Kurir Legendaris (Legendary Courier)' },
      { min:150, label:'🥇 Kurir Ahli (Expert Courier)' },
      { min:100, label:'🥈 Kurir Magang (Apprentice Courier)' },
      { min:0,   label:'🎯 Perlu Latihan Lagi (Needs More Practice)' }
    ],
    certTitle:'SERTIFIKAT',
    certSub:'Misi Kurir Muda — Petualangan Graf Berbobot',
    certGiven:'Diberikan kepada',
    certLine:'telah berhasil menyelesaikan LKPD Interaktif Berpikir Komputasional dengan topik <strong>Graf Berbobot dan Rute Terpendek</strong>',
    certScoreLabel:'Skor Akhir',
    certStars:'Bintang (Stars)',
    certPlace:'Bekasi',
    certTeacher:'Guru Informatika',
    certHead:'Kepala Sekolah',
    certFoot:'LKPD Informatika Kelas 8 · Graf Berbobot dan Rute Terpendek · © 2026 SMP Negeri 19 Kota Bekasi'
  },
  en: {
    appSubtitle:'Weighted Graph Adventure (Petualangan Graf Berbobot)',
    lives:'Lives', score:'Score', time:'Time',
    welcomeSub:'You are a young courier of SMP Negeri 19 Kota Bekasi. Help Mr. Rudi, Kirana and Mrs. Sari deliver packages using the best route!',
    level0Title:'Level 0 — Interactive Tutorial (Tutorial Interaktif)',
    level1Title:'Level 1 — Identify the Graph Parts (Kenali Bagian Graf)',
    level2Title:'Level 2 — Calculate the Total Weight (Hitung Total Bobot)',
    level3Title:'Level 3 — Pick the Best Route (Pilih Rute Terbaik)',
    level4Title:'Level 4 — Explain Your Reasoning (Jelaskan Alasanmu)',
    tutorialGraphTitle:'Simple Map (Peta Sederhana)',
    tutorialInstruction:'Click a node to learn its name. / Klik simpul (vertex) untuk mengenal namanya.',
    discoveryTitle:'Exploration List (Daftar Penjelajahan)',
    nodesLabel:'Vertex (Simpul)', edgesLabel:'Edge (Sisi)',
    tutorialInfoEmpty:'Nothing selected yet. Start exploring the map!',
    blitzLabel:'Blitz Challenge Mode (Mode Tantangan Kilat) — 60 seconds per level',
    graphCaption:'Main Graph Map — 6 vertices, 9 edges. Every edge has a time weight (minutes) and a cost (rupiah).',
    graphCaption2:'Use this map to add up the weight of each edge along the route.',
    graphCaption3:'Read the scenario carefully, then choose the most suitable route.',
    graphCaption4:'Write your reason and mention the numbers from the map above.',
    questionOf:'Question {n} of {m}',
    levelWord:'Level',
    checkAnswer:'Check Answer', submit:'Submit', next:'Next',
    correctTitle:'Correct! Well done!', wrongTitle:'Not Quite',
    correctMsg:'Your answer is correct. Keep it up!',
    wrongMsg:'Your answer is not quite right. Read the explanation below.',
    timeUpTitle:'Time is Up!', timeUpText:'Time for this level is up. You lose 1 life and the level restarts.',
    lifeLostText:'You lose 1 life ❤️',
    gameOverTitle:'Out of Lives!',
    gameOverText:'Do not give up, Young Courier. Let us try again from Level 1.',
    retryL1:'Retry from Level 1',
    resultTitle:'Mission Complete! 🎉',
    resultScore:'Final Score', bestScoreLabel:'Your best score',
    nameLabel:'Student Name (Nama Murid)',
    namePlaceholder:'Write your name here…',
    reviewTitle:'Review (Pembahasan)',
    calcTitle:'Helper Calculator (Kalkulator Bantu)',
    calcHint:'Write the numbers you want to add, separated by +.',
    glossaryTitle:'Glossary (Glosarium) ID ↔ EN',
    aboutTitle:'How to Play (Cara Bermain)',
    keywordHint:'Use at least 2 numbers and 1 keyword: karena, lebih, total, menit, rupiah.',
    essayPlaceholder:'Write your reason here (maximum 280 characters)…',
    charLeft:'{n} characters left',
    essayIncomplete:'Your answer is incomplete',
    essayIncompleteText:'Include at least 2 numbers and 1 keyword (karena / lebih / total / menit / rupiah). Please try again!',
    minShort:'min',
    unitMinute:'minutes', unitRp:'Rp',
    inputPlaceholder:'Type a number…',
    newBest:'🎉 New record!',
    bestEver:'Previous best',
    locked:'Locked',
    aboutSteps:[
      'Write your name in the field provided before printing the certificate.',
      'Level 0 (Tutorial): click every vertex (simpul) and edge (sisi) on the map to unlock Level 1.',
      'Level 1: answer 5 multiple-choice questions about vertices, edges and weights. Each correct answer is worth 10 points.',
      'Level 2: calculate the total weight of a route and type the answer as a number. Each correct answer is worth 15 points.',
      'Level 3: read the scenario, then choose the best route. Each correct answer is worth 20 points.',
      'Level 4: write your reason and mention the numbers. Each valid answer is worth 25 points.',
      'You have 3 lives ❤️. Every wrong answer costs 1 life. If they run out, you return to Level 1.',
      'Use the 🧮 (calculator), 📖 (glossary), 🌐 (language), 🌙 (dark mode) and 🔊 (sound) buttons anytime.'
    ],
    badge:[
      { min:200, label:'🏆 Legendary Courier (Kurir Legendaris)' },
      { min:150, label:'🥇 Expert Courier (Kurir Ahli)' },
      { min:100, label:'🥈 Apprentice Courier (Kurir Magang)' },
      { min:0,   label:'🎯 Needs More Practice (Perlu Latihan Lagi)' }
    ],
    certTitle:'CERTIFICATE',
    certSub:'Young Courier Mission — Weighted Graph Adventure',
    certGiven:'Awarded to',
    certLine:'has successfully completed the Interactive Computational Thinking Worksheet on the topic of <strong>Weighted Graph and Shortest Route</strong>',
    certScoreLabel:'Final Score',
    certStars:'Stars (Bintang)',
    certPlace:'Bekasi',
    certTeacher:'Informatics Teacher',
    certHead:'School Principal',
    certFoot:'LKPD Informatika Kelas 8 · Graf Berbobot dan Rute Terpendek · © 2026 SMP Negeri 19 Kota Bekasi'
  }
};

/* =========================================================
 * 4. STATE GLOBAL
 * ========================================================= */
const state = {
  lang: DEFAULT_LANG,
  sound: SOUND_ENABLED,
  dark: false,
  blitz: false,
  lives: MAX_LIVES,
  score: 0,
  level: 0,
  best: 0,
  idx: { 1:0, 2:0, 3:0, 4:0 },
  scores: { 1:0, 2:0, 3:0, 4:0 },
  log: [],
  discoveredNodes: new Set(),
  discoveredEdges: new Set(),
  essayTries: { 0:0, 1:0 }
};

let feedbackCallback = null;
let timerId = null;
let timeLeft = 0;

/* =========================================================
 * 5. UTILITAS
 * ========================================================= */
const $  = (sel, root) => (root || document).querySelector(sel);
const $$ = (sel, root) => Array.prototype.slice.call((root || document).querySelectorAll(sel));

function t(key){
  const dict = I18N[state.lang] || I18N.id;
  return Object.prototype.hasOwnProperty.call(dict, key) ? dict[key] : (I18N.id[key] || key);
}

function esc(str){
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* Izinkan tag <em> pada teks soal */
function safeRich(str){
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/&lt;em&gt;/g, '<em>')
    .replace(/&lt;\/em&gt;/g, '</em>');
}

function formatRp(n){
  if (!n || n === 0) return 'Rp0';
  return 'Rp' + n.toLocaleString('id-ID');
}

function normalizeNumber(str){
  if (str === null || str === undefined) return NaN;
  const digits = String(str).replace(/[^\d]/g, '');
  if (digits === '') return NaN;
  return parseInt(digits, 10);
}

function pickLang(obj){
  if (obj === null || obj === undefined) return '';
  if (typeof obj === 'string') return obj;
  return obj[state.lang] !== undefined ? obj[state.lang] : (obj.id || '');
}

/* =========================================================
 * 6. SUARA (Web Audio API — tanpa file eksternal)
 * ========================================================= */
let audioCtx = null;

function beep(kind){
  if (!state.sound) return;
  try{
    if (!audioCtx){
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      audioCtx = new Ctx();
    }
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (kind === 'correct'){
      osc.type = 'sine';
      osc.frequency.setValueAtTime(660, now);
      osc.frequency.setValueAtTime(880, now + 0.09);
      osc.frequency.setValueAtTime(1180, now + 0.18);
    } else if (kind === 'click'){
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(520, now);
    } else {
      osc.type = 'square';
      osc.frequency.setValueAtTime(240, now);
      osc.frequency.setValueAtTime(150, now + 0.13);
    }

    gain.gain.setValueAtTime(0.07, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);
    osc.start(now);
    osc.stop(now + 0.34);
  } catch(err){ /* diabaikan bila browser memblokir audio */ }
}

/* =========================================================
 * 7. PEMBANGUN SVG GRAF
 * ========================================================= */
function edgeLabelPos(x1, y1, x2, y2, off){
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny =  dx / len;
  return { x: mx + nx * off, y: my + ny * off };
}

function buildMainGraphSVG(opts){
  const o = opts || {};
  const graph = o.graph || GRAPH_MAIN;
  const withCost = o.withCost !== false;
  const pos = {};
  graph.nodes.forEach(n => { pos[n.id] = n; });

  let svg = '<svg viewBox="' + graph.viewBox + '" role="img" aria-label="' +
    esc(state.lang === 'id' ? 'Peta graf berbobot' : 'Weighted graph map') + '" ' +
    'xmlns="http://www.w3.org/2000/svg">';

  /* --- Sisi --- */
  graph.edges.forEach(function(e){
    const a = pos[e.from];
    const b = pos[e.to];
    const lp = edgeLabelPos(a.x, a.y, b.x, b.y, e.off || -26);
    const label = withCost
      ? (e.time + ' ' + t('minShort') + ' / ' + formatRp(e.cost))
      : (e.time + ' ' + t('minShort'));

    svg += '<g class="edge-group" data-edge="' + e.from + '|' + e.to + '" tabindex="0" role="button" ' +
      'aria-label="' + esc('Sisi ' + e.from + ' ke ' + e.to + ', bobot ' + e.time + ' menit') + '">';
    svg += '<line class="edge-hit" x1="' + a.x + '" y1="' + a.y + '" x2="' + b.x + '" y2="' + b.y + '"/>';
    svg += '<line class="edge-line" x1="' + a.x + '" y1="' + a.y + '" x2="' + b.x + '" y2="' + b.y + '"/>';
    svg += '<rect class="edge-label-bg" x="' + (lp.x - 50) + '" y="' + (lp.y - 12) + '" width="100" height="24" rx="8"/>';
    svg += '<text class="edge-label-text" x="' + lp.x + '" y="' + (lp.y + 4) + '">' + esc(label) + '</text>';
    svg += '</g>';
  });

  /* --- Simpul --- */
  graph.nodes.forEach(function(n){
    const nm = pickLang(n.name);
    svg += '<g class="node-group" data-node="' + n.id + '" tabindex="0" role="button" ' +
      'aria-label="' + esc('Simpul ' + n.id + ' — ' + nm) + '">';
    svg += '<circle class="node-circle" cx="' + n.x + '" cy="' + n.y + '" r="30"/>';
    svg += '<text class="node-letter" x="' + n.x + '" y="' + (n.y + 8) + '">' + n.id + '</text>';
    svg += '<text class="node-name" x="' + n.x + '" y="' + (n.y + 50) + '">' + esc(nm) + '</text>';
    svg += '</g>';
  });

  svg += '</svg>';
  return svg;
}

/* =========================================================
 * 8. NAVIGASI SCREEN & HEADER
 * ========================================================= */
function showScreen(id){
  $$('.screen').forEach(function(s){ s.classList.remove('active'); });
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateHeader(){
  const hearts = '❤️'.repeat(Math.max(state.lives, 0)) + '🤍'.repeat(Math.max(MAX_LIVES - state.lives, 0));
  $('#lives-display').textContent = hearts;
  $('#score-display').textContent = state.score;
}

function updateProgress(){
  const pct = Math.min(100, (state.level / TOTAL_LEVELS) * 100);
  $('#progress-fill').style.width = pct + '%';
  $('#progress-text').textContent = t('levelWord') + ' ' + state.level + ' / ' + TOTAL_LEVELS;
  $('#progress-track').setAttribute('aria-valuenow', String(state.level));
}

function updateLangLabel(){
  $('#lang-label').textContent = state.lang.toUpperCase();
  document.documentElement.lang = state.lang;
}

function applyI18n(){
  $$('[data-i18n]').forEach(function(el){
    const key = el.getAttribute('data-i18n');
    if (I18N[state.lang][key] !== undefined){
      el.textContent = I18N[state.lang][key];
    }
  });
  updateLangLabel();
  updateHeader();
  updateProgress();
}

/* =========================================================
 * 9. MODAL UMPAN BALIK
 * ========================================================= */
function showFeedback(cfg){
  $('#fb-icon').textContent = cfg.correct ? '✅' : '❌';
  $('#fb-title').textContent = cfg.title || (cfg.correct ? t('correctTitle') : t('wrongTitle'));
  $('#fb-text').innerHTML = cfg.text || '';
  $('#fb-formula').innerHTML = cfg.formula ? esc(cfg.formula) : '';
  feedbackCallback = cfg.onNext || null;
  $('#modal-feedback').hidden = false;
  $('#fb-next').focus();
}

function closeFeedback(){
  $('#modal-feedback').hidden = true;
}

/* =========================================================
 * 10. NYAWA & GAME OVER
 * ========================================================= */
function loseLife(){
  state.lives = Math.max(0, state.lives - 1);
  updateHeader();
}

function showGameOver(){
  stopTimer();
  $('#modal-gameover').hidden = false;
  $('#go-retry').focus();
}

function resetToLevel1(){
  state.lives = MAX_LIVES;
  state.score = 0;
  state.scores = { 1:0, 2:0, 3:0, 4:0 };
  state.idx = { 1:0, 2:0, 3:0, 4:0 };
  state.log = [];
  updateHeader();
  renderLevel1();
}

/* =========================================================
 * 11. TIMER (MODE TANTANGAN KILAT)
 * ========================================================= */
function updateTimerDisplay(){
  $('#timer-display').textContent = String(timeLeft);
}

function stopTimer(){
  if (timerId){
    clearInterval(timerId);
    timerId = null;
  }
  $('#timer-chip').hidden = true;
}

function startLevelTimer(){
  stopTimer();
  const seconds = state.blitz ? BLITZ_SECONDS : LEVEL_TIMER;
  if (!seconds) return;
  timeLeft = seconds;
  $('#timer-chip').hidden = false;
  updateTimerDisplay();
  timerId = setInterval(function(){
    timeLeft -= 1;
    updateTimerDisplay();
    if (timeLeft <= 0){
      stopTimer();
      onTimeOut();
    }
  }, 1000);
}

function onTimeOut(){
  const lv = state.level;
  state.score -= state.scores[lv] || 0;
  state.scores[lv] = 0;
  state.idx[lv] = 0;
  loseLife();
  if (state.lives <= 0){ showGameOver(); return; }
  showFeedback({
    correct:false,
    title:t('timeUpTitle'),
    text:t('timeUpText'),
    formula:'',
    onNext:function(){ renderCurrentLevel(); }
  });
}

function renderCurrentLevel(){
  if (state.level === 1) renderLevel1();
  else if (state.level === 2) renderLevel2();
  else if (state.level === 3) renderLevel3();
  else if (state.level === 4) renderLevel4();
}

/* =========================================================
 * 12. LEVEL 0 — TUTORIAL
 * ========================================================= */
function initTutorial(){
  state.discoveredNodes = new Set();
  state.discoveredEdges = new Set();

  $('#graph-level0').innerHTML = buildMainGraphSVG({
    graph: DATA.level0,
    withCost: false
  });

  $('#discovery-nodes').innerHTML = DATA.level0.nodes.map(function(n){
    return '<span class="chip" data-chip-node="' + n.id + '">◯ ' + n.id + '</span>';
  }).join('');

  $('#discovery-edges').innerHTML = DATA.level0.edges.map(function(e){
    return '<span class="chip" data-chip-edge="' + e.from + '|' + e.to + '">— ' + e.from + '–' + e.to + '</span>';
  }).join('');

  const wrap = $('#graph-level0');
  const nodeGroups = $$('.node-group', wrap);
  const edgeGroups = $$('.edge-group', wrap);

  nodeGroups.forEach(function(g){
    g.classList.add('pulse');
    g.addEventListener('click', function(){ tutorialSelectNode(g.dataset.node); });
    g.addEventListener('keydown', function(ev){
      if (ev.key === 'Enter' || ev.key === ' '){ ev.preventDefault(); tutorialSelectNode(g.dataset.node); }
    });
  });

  edgeGroups.forEach(function(g){
    g.classList.add('pulse');
    g.addEventListener('click', function(){ tutorialSelectEdge(g.dataset.edge); });
    g.addEventListener('keydown', function(ev){
      if (ev.key === 'Enter' || ev.key === ' '){ ev.preventDefault(); tutorialSelectEdge(g.dataset.edge); }
    });
  });

  updateTutorialProgress();
}

function tutorialSelectNode(id){
  const node = DATA.level0.nodes.filter(function(n){ return n.id === id; })[0];
  if (!node) return;
  beep('click');
  state.discoveredNodes.add(id);

  const g = $('.node-group[data-node="' + id + '"]', $('#graph-level0'));
  if (g){ g.classList.add('visited'); g.classList.remove('pulse'); }

  const chip = $('[data-chip-node="' + id + '"]');
  if (chip){ chip.classList.add('done'); chip.textContent = '✅ ' + id; }

  const nm = pickLang(node.name);
  $('#tutorial-info').innerHTML =
    '<p><strong>' + esc(state.lang === 'id' ? 'Simpul' : 'Vertex') + ' ' + id + '</strong> — ' + esc(nm) + '</p>' +
    '<p class="muted">' + esc(state.lang === 'id'
      ? 'Simpul (vertex) adalah titik pertemuan pada graf. Simpul ini bernama ' + nm + '.'
      : 'A vertex (simpul) is a meeting point on the graph. This vertex is named ' + nm + '.') + '</p>';

  updateTutorialProgress();
}

function tutorialSelectEdge(key){
  const parts = key.split('|');
  const edge = DATA.level0.edges.filter(function(e){
    return (e.from === parts[0] && e.to === parts[1]) || (e.from === parts[1] && e.to === parts[0]);
  })[0];
  if (!edge) return;
  beep('click');
  state.discoveredEdges.add(key);

  const g = $('.edge-group[data-edge="' + key + '"]', $('#graph-level0'));
  if (g){ g.classList.add('visited'); g.classList.remove('pulse'); }

  const chip = $('[data-chip-edge="' + key + '"]');
  if (chip){ chip.classList.add('done'); chip.textContent = '✅ ' + parts[0] + '–' + parts[1]; }

  $('#tutorial-info').innerHTML =
    '<p><strong>' + esc(state.lang === 'id' ? 'Sisi' : 'Edge') + ' ' + parts[0] + '–' + parts[1] + '</strong></p>' +
    '<p class="muted">' + esc(state.lang === 'id'
      ? 'Sisi (edge) adalah garis penghubung dua simpul. Bobot (weight) sisi ini adalah ' + edge.time + ' menit.'
      : 'An edge (sisi) is a line connecting two vertices. The weight (bobot) of this edge is ' + edge.time + ' minutes.') + '</p>' +
    '<span class="info-formula">' + edge.from + '–' + edge.to + ' = ' + edge.time + ' ' + t('minShort') + '</span>';

  updateTutorialProgress();
}

function updateTutorialProgress(){
  const totalNodes = DATA.level0.nodes.length;
  const totalEdges = DATA.level0.edges.length;
  const dn = state.discoveredNodes.size;
  const de = state.discoveredEdges.size;

  const btn = $('#btn-start');
  if (dn === totalNodes && de === totalEdges){
    btn.disabled = false;
    $('#tutorial-instruction').innerHTML =
      '<span class="ib-icon">🎉</span><span>' +
      esc(state.lang === 'id'
        ? 'Hebat! Kamu sudah mengenal semua simpul dan sisi. Klik "Mulai" untuk lanjut ke Level 1.'
        : 'Great! You have discovered every vertex and edge. Click "Mulai" to continue to Level 1.') +
      '</span>';
  } else {
    btn.disabled = true;
    $('#tutorial-instruction').innerHTML =
      '<span class="ib-icon">👉</span><span>' +
      esc(state.lang === 'id'
        ? 'Klik simpul (vertex) dan sisi (edge) untuk mengenalnya. Terkumpul: ' + dn + '/' + totalNodes + ' simpul, ' + de + '/' + totalEdges + ' sisi.'
        : 'Click the vertices and edges to learn them. Collected: ' + dn + '/' + totalNodes + ' vertices, ' + de + '/' + totalEdges + ' edges.') +
      '</span>';
  }
}

/* =========================================================
 * 13. LEVEL 1 — PILIHAN GANDA
 * ========================================================= */
function renderLevel1(){
  state.level = 1;
  updateHeader();
  updateProgress();
  showScreen('screen-level1');
  startLevelTimer();

  if (!$('#graph-level1').innerHTML){
    $('#graph-level1').innerHTML = buildMainGraphSVG({ graph: GRAPH_MAIN, withCost:true });
  }

  const i = state.idx[1];
  if (i >= DATA.level1.length){ finishLevel1(); return; }

  const item = DATA.level1[i];
  $('#l1-counter').textContent = t('questionOf').replace('{n}', i + 1).replace('{m}', DATA.level1.length);

  let html = '<p class="question-text">' + safeRich(pickLang(item.q)) + '</p>';
  html += '<div class="options" role="group">';
  item.options.forEach(function(op, k){
    html += '<button class="option-btn" data-k="' + k + '" aria-label="' +
      esc('Pilihan ' + 'ABCD'[k] + ': ' + pickLang(op)) + '">' +
      '<span class="opt-letter">' + 'ABCD'[k] + '</span>' +
      '<span class="opt-text">' + esc(pickLang(op)) + '</span></button>';
  });
  html += '</div>';

  $('#l1-body').innerHTML = html;

  $$('#l1-body .option-btn').forEach(function(btn){
    btn.addEventListener('click', function(){
      handleLevel1Answer(parseInt(btn.dataset.k, 10));
    });
  });
}

function handleLevel1Answer(k){
  const i = state.idx[1];
  const item = DATA.level1[i];
  const correct = (k === item.answer);
  const buttons = $$('#l1-body .option-btn');

  buttons.forEach(function(b){
    b.disabled = true;
    if (parseInt(b.dataset.k, 10) === item.answer) b.classList.add('is-correct');
  });
  if (!correct){
    const chosen = buttons[k];
    if (chosen){ chosen.classList.add('is-wrong', 'shake'); }
    beep('wrong');
    loseLife();
  } else {
    beep('correct');
    state.score += 10;
    state.scores[1] += 10;
  }
  updateHeader();

  state.log.push({
    level:1,
    question: pickLang(item.q),
    userAnswer: pickLang(item.options[k]),
    correctAnswer: pickLang(item.options[item.answer]),
    correct: correct,
    explain: pickLang(item.explain),
    formula: item.formula || ''
  });

  const gameOver = (state.lives <= 0);

  showFeedback({
    correct: correct,
    title: correct ? t('correctTitle') : t('wrongTitle'),
    text: pickLang(item.explain),
    formula: item.formula || '',
    onNext: function(){
      if (gameOver){ showGameOver(); return; }
      state.idx[1] += 1;
      renderLevel1();
    }
  });
}

function finishLevel1(){
  stopTimer();
  renderLevel2();
}

/* =========================================================
 * 14. LEVEL 2 — INPUT ANGKA
 * ========================================================= */
function renderLevel2(){
  state.level = 2;
  updateHeader();
  updateProgress();
  showScreen('screen-level2');
  startLevelTimer();

  if (!$('#graph-level2').innerHTML){
    $('#graph-level2').innerHTML = buildMainGraphSVG({ graph: GRAPH_MAIN, withCost:true });
  }

  const i = state.idx[2];
  if (i >= DATA.level2.length){ finishLevel2(); return; }

  const item = DATA.level2[i];
  $('#l2-counter').textContent = t('questionOf').replace('{n}', i + 1).replace('{m}', DATA.level2.length);

  let html = '<p class="question-text">' + safeRich(pickLang(item.q)) + '</p>';
  html += '<div class="route-hint">🚚 ' + esc(item.route) + '</div>';
  html += '<div class="answer-row">';
  html += '<input id="l2-input" class="answer-input" type="text" inputmode="numeric" autocomplete="off" ' +
          'placeholder="' + esc(t('inputPlaceholder')) + '" aria-label="' + esc('Jawaban angka') + '" />';
  html += '<span class="answer-unit">' + esc(item.unit === 'Rp' ? 'Rp' : t('unitMinute')) + '</span>';
  html += '<button class="btn btn-primary" id="l2-submit" aria-label="Kirim jawaban">' +
          'Kirim<br /><small>Submit</small></button>';
  html += '</div>';
  html += '<div class="keyword-hint">💡 ' + esc(state.lang === 'id'
    ? 'Tulis angkanya saja. Contoh: 17 atau 3000.'
    : 'Type the number only. Example: 17 or 3000.') + '</div>';

  $('#l2-body').innerHTML = html;

  const input = $('#l2-input');
  input.focus();
  input.addEventListener('keydown', function(ev){
    if (ev.key === 'Enter'){ ev.preventDefault(); submitLevel2(); }
  });
  $('#l2-submit').addEventListener('click', submitLevel2);
}

function submitLevel2(){
  const i = state.idx[2];
  const item = DATA.level2[i];
  const raw = $('#l2-input').value;
  const value = normalizeNumber(raw);
  const correct = (value === item.answer);

  $('#l2-input').disabled = true;
  $('#l2-submit').disabled = true;

  if (correct){
    beep('correct');
    state.score += 15;
    state.scores[2] += 15;
  } else {
    beep('wrong');
    $('#l2-input').classList.add('shake');
    loseLife();
  }
  updateHeader();

  state.log.push({
    level:2,
    question: pickLang(item.q) + ' ' + item.route,
    userAnswer: (isNaN(value) ? raw : value) + ' ' + (item.unit === 'Rp' ? 'Rp' : t('unitMinute')),
    correctAnswer: item.answer + ' ' + (item.unit === 'Rp' ? 'Rp' : t('unitMinute')),
    correct: correct,
    explain: pickLang(item.explain),
    formula: item.formula
  });

  const gameOver = (state.lives <= 0);

  showFeedback({
    correct: correct,
    title: correct ? t('correctTitle') : t('wrongTitle'),
    text: pickLang(item.explain),
    formula: item.formula,
    onNext: function(){
      if (gameOver){ showGameOver(); return; }
      state.idx[2] += 1;
      renderLevel2();
    }
  });
}

function finishLevel2(){
  stopTimer();
  renderLevel3();
}

/* =========================================================
 * 15. LEVEL 3 — PILIH RUTE TERBAIK
 * ========================================================= */
function renderLevel3(){
  state.level = 3;
  updateHeader();
  updateProgress();
  showScreen('screen-level3');
  startLevelTimer();

  if (!$('#graph-level3').innerHTML){
    $('#graph-level3').innerHTML = buildMainGraphSVG({ graph: GRAPH_MAIN, withCost:true });
  }

  const i = state.idx[3];
  if (i >= DATA.level3.length){ finishLevel3(); return; }

  const item = DATA.level3[i];
  $('#l3-counter').textContent = t('questionOf').replace('{n}', i + 1).replace('{m}', DATA.level3.length);

  let html = '<p class="question-text">' + safeRich(pickLang(item.scenario)) + '</p>';
  html += '<div class="options" role="group">';
  item.options.forEach(function(op, k){
    html += '<button class="option-btn" data-k="' + k + '" aria-label="' +
      esc('Rute ' + 'ABC'[k] + ': ' + pickLang(op)) + '">' +
      '<span class="opt-letter">' + 'ABC'[k] + '</span>' +
      '<span class="opt-text">' + esc(pickLang(op)) + '</span></button>';
  });
  html += '</div>';

  $('#l3-body').innerHTML = html;

  $$('#l3-body .option-btn').forEach(function(btn){
    btn.addEventListener('click', function(){
      handleLevel3Answer(parseInt(btn.dataset.k, 10));
    });
  });
}

function handleLevel3Answer(k){
  const i = state.idx[3];
  const item = DATA.level3[i];
  const correct = (k === item.answer);
  const buttons = $$('#l3-body .option-btn');

  buttons.forEach(function(b){
    b.disabled = true;
    if (parseInt(b.dataset.k, 10) === item.answer) b.classList.add('is-correct');
  });
  if (!correct){
    const chosen = buttons[k];
    if (chosen){ chosen.classList.add('is-wrong', 'shake'); }
    beep('wrong');
    loseLife();
  } else {
    beep('correct');
    state.score += 20;
    state.scores[3] += 20;
  }
  updateHeader();

  state.log.push({
    level:3,
    question: pickLang(item.scenario),
    userAnswer: pickLang(item.options[k]),
    correctAnswer: pickLang(item.options[item.answer]),
    correct: correct,
    explain: pickLang(item.explain),
    formula: item.formula || ''
  });

  const gameOver = (state.lives <= 0);

  showFeedback({
    correct: correct,
    title: correct ? t('correctTitle') : t('wrongTitle'),
    text: pickLang(item.explain),
    formula: item.formula || '',
    onNext: function(){
      if (gameOver){ showGameOver(); return; }
      state.idx[3] += 1;
      renderLevel3();
    }
  });
}

function finishLevel3(){
  stopTimer();
  renderLevel4();
}

/* =========================================================
 * 16. LEVEL 4 — ESAI BERALASAN
 * ========================================================= */
function renderLevel4(){
  state.level = 4;
  updateHeader();
  updateProgress();
  showScreen('screen-level4');
  startLevelTimer();

  if (!$('#graph-level4').innerHTML){
    $('#graph-level4').innerHTML = buildMainGraphSVG({ graph: GRAPH_MAIN, withCost:true });
  }

  const i = state.idx[4];
  if (i >= DATA.level4.length){ finishGame(); return; }

  const item = DATA.level4[i];
  $('#l4-counter').textContent = t('questionOf').replace('{n}', i + 1).replace('{m}', DATA.level4.length);

  let html = '<p class="question-text">' + safeRich(pickLang(item.q)) + '</p>';
  html += '<textarea id="l4-input" class="essay-area" maxlength="280" ' +
          'placeholder="' + esc(t('essayPlaceholder')) + '" aria-label="' +
          esc('Kolom jawaban esai') + '"></textarea>';
  html += '<div class="char-counter" id="l4-counter-chars">' +
          esc(t('charLeft').replace('{n}', '280')) + '</div>';
  html += '<div class="keyword-hint">💡 ' + esc(t('keywordHint')) + '</div>';
  html += '<div class="actions"><button class="btn btn-primary" id="l4-submit" aria-label="Kirim jawaban esai">' +
          'Kirim<br /><small>Submit</small></button></div>';

  $('#l4-body').innerHTML = html;

  const area = $('#l4-input');
  const counter = $('#l4-counter-chars');
  area.focus();
  area.addEventListener('input', function(){
    const left = 280 - area.value.length;
    counter.textContent = t('charLeft').replace('{n}', String(left));
    counter.classList.toggle('over', left < 0);
  });

  $('#l4-submit').addEventListener('click', submitLevel4);
}

function countNumbers(text){
  const matches = String(text).match(/\d[\d.,]*/g);
  return matches ? matches.length : 0;
}

function hasKeyword(text, keywords){
  const lower = String(text).toLowerCase();
  return keywords.some(function(kw){ return lower.indexOf(kw) !== -1; });
}

function submitLevel4(){
  const i = state.idx[4];
  const item = DATA.level4[i];
  const answer = $('#l4-input').value.trim();

  const numCount = countNumbers(answer);
  const kwOk = hasKeyword(answer, item.keywords);
  const valid = (answer.length >= 20 && numCount >= item.minNumbers && kwOk);

  if (!valid){
    beep('wrong');
    showFeedback({
      correct:false,
      title:t('essayIncomplete'),
      text:t('essayIncompleteText') + '<br /><br /><strong>' +
        esc(state.lang === 'id' ? 'Contoh jawaban:' : 'Sample answer:') + '</strong><br />' +
        esc(pickLang(item.sample)),
      formula: state.lang === 'id'
        ? 'Angka terdeteksi: ' + numCount + ' · Kata kunci: ' + (kwOk ? 'ada' : 'belum ada')
        : 'Numbers detected: ' + numCount + ' · Keyword: ' + (kwOk ? 'found' : 'not found'),
      onNext: function(){
        const area = $('#l4-input');
        if (area) area.focus();
      }
    });
    return;
  }

  beep('correct');
  state.score += 25;
  state.scores[4] += 25;
  updateHeader();

  state.log.push({
    level:4,
    question: pickLang(item.q),
    userAnswer: answer,
    correctAnswer: pickLang(item.sample),
    correct: true,
    explain: pickLang(item.explain),
    formula: state.lang === 'id' ? 'Angka terdeteksi: ' + numCount : 'Numbers detected: ' + numCount
  });

  showFeedback({
    correct:true,
    title: state.lang === 'id' ? 'Alasanmu Kuat! 💪' : 'Strong Reasoning! 💪',
    text: pickLang(item.explain),
    formula: state.lang === 'id'
      ? 'Angka terdeteksi: ' + numCount + ' · Kata kunci: ada'
      : 'Numbers detected: ' + numCount + ' · Keyword: found',
    onNext: function(){
      state.idx[4] += 1;
      renderLevel4();
    }
  });
}

/* =========================================================
 * 17. SELESAI GAME — REKAP & SERTIFIKAT
 * ========================================================= */
function finishGame(){
  stopTimer();
  state.level = TOTAL_LEVELS;
  updateProgress();

  const score = Math.max(0, state.score);
  $('#result-score').textContent = score;

  let stars = 1;
  if (score >= 200) stars = 3;
  else if (score >= 150) stars = 2;
  else if (score >= 100) stars = 1;
  else stars = 0;

  $('#result-stars').textContent = stars > 0
    ? '⭐'.repeat(stars) + '☆'.repeat(3 - stars)
    : '☆☆☆';

  const badgeList = t('badge');
  let badgeLabel = badgeList[badgeList.length - 1].label;
  for (let b = 0; b < badgeList.length; b++){
    if (score >= badgeList[b].min){ badgeLabel = badgeList[b].label; break; }
  }
  $('#result-badge').textContent = badgeLabel;

  /* Simpan skor terbaik */
  let best = 0;
  try{
    best = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10) || 0;
  } catch(err){ best = 0; }

  const isNewBest = score > best;
  if (isNewBest){
    try{ localStorage.setItem(STORAGE_KEY, String(score)); } catch(err){ /* diabaikan */ }
    best = score;
  }
  $('#result-best').textContent = (isNewBest ? t('newBest') + ' · ' : '') +
    t('bestScoreLabel') + ': ' + best + ' / ' + MAX_SCORE;

  $('#review-box').hidden = true;
  showScreen('screen-result');

  if (stars === 3) launchConfetti();
  beep('correct');
}

/* =========================================================
 * 18. PEMBAHASAN
 * ========================================================= */
function renderReview(){
  const box = $('#review-box');
  let html = '<h3>' + esc(t('reviewTitle')) + '</h3>';
  state.log.forEach(function(item, idx){
    html += '<div class="review-item ' + (item.correct ? 'ok' : 'no') + '">';
    html += '<h4>' + (item.correct ? '✅' : '❌') + ' ' +
            esc(state.lang === 'id' ? 'Level ' : 'Level ') + item.level + ' · ' +
            (state.lang === 'id' ? 'Soal ' : 'Question ') + (idx + 1) + '</h4>';
    html += '<p><span class="rv-label">' + esc(state.lang === 'id' ? 'Pertanyaan: ' : 'Question: ') + '</span>' +
            safeRich(item.question) + '</p>';
    html += '<p><span class="rv-label">' + esc(state.lang === 'id' ? 'Jawabanmu: ' : 'Your answer: ') + '</span>' +
            esc(item.userAnswer) + '</p>';
    html += '<p><span class="rv-label">' + esc(state.lang === 'id' ? 'Jawaban benar: ' : 'Correct answer: ') + '</span>' +
            esc(item.correctAnswer) + '</p>';
    html += '<p><span class="rv-label">' + esc(state.lang === 'id' ? 'Penjelasan: ' : 'Explanation: ') + '</span>' +
            esc(item.explain) + '</p>';
    if (item.formula){
      html += '<p><span class="rv-label">' + esc(state.lang === 'id' ? 'Perhitungan: ' : 'Calculation: ') + '</span>' +
              '<span class="mono">' + esc(item.formula) + '</span></p>';
    }
    html += '</div>';
  });
  box.innerHTML = html;
  box.hidden = false;
  box.scrollIntoView({ behavior:'smooth', block:'start' });
}

/* =========================================================
 * 19. SERTIFIKAT & PRINT
 * ========================================================= */
function buildCertificate(){
  const nameInput = $('#student-name');
  const name = (nameInput && nameInput.value.trim()) ? nameInput.value.trim() : '................................';
  const score = Math.max(0, state.score);

  let stars = 0;
  if (score >= 200) stars = 3;
  else if (score >= 150) stars = 2;
  else if (score >= 100) stars = 1;

  const starStr = '★'.repeat(stars) + '☆'.repeat(3 - stars);

  let tanggal = '';
  try{
    tanggal = new Date().toLocaleDateString(state.lang === 'id' ? 'id-ID' : 'en-GB', {
      day:'numeric', month:'long', year:'numeric'
    });
  } catch(err){
    tanggal = String(new Date().getFullYear());
  }

  const badgeList = t('badge');
  let badgeLabel = badgeList[badgeList.length - 1].label;
  for (let b = 0; b < badgeList.length; b++){
    if (score >= badgeList[b].min){ badgeLabel = badgeList[b].label; break; }
  }

  return '' +
  '<div class="cert-frame">' +
    '<div>' +
      '<div class="cert-logo-row">' +
        '<div class="cert-logo-mark">G</div>' +
        '<div class="cert-school">SMP NEGERI 19 KOTA BEKASI' +
          '<small>Jl. Raya Bekasi · LKPD Informatika Berpikir Komputasional</small>' +
        '</div>' +
      '</div>' +
      '<div class="cert-title">' + esc(t('certTitle')) + '</div>' +
      '<div class="cert-sub">' + esc(t('certSub')) + '</div>' +
    '</div>' +
    '<div>' +
      '<div class="cert-line">' + esc(t('certGiven')) + '</div>' +
      '<div class="cert-name">' + esc(name) + '</div>' +
      '<div class="cert-line">' + t('certLine') + '</div>' +
      '<div class="cert-score">' + esc(t('certScoreLabel')) + ': ' + score + ' / ' + MAX_SCORE + '</div>' +
      '<div class="cert-line">' + esc(t('certStars')) + ': ' + starStr + ' (' + esc(badgeLabel) + ')</div>' +
    '</div>' +
    '<div>' +
      '<div class="cert-sign-row">' +
        '<div class="cert-sign-box">' +
          '<div class="cert-sign-line"><strong>' + esc(t('certTeacher')) + '</strong></div>' +
        '</div>' +
        '<div class="cert-sign-box">' +
          '<div class="cert-sign-line"><strong>' + esc(t('certHead')) + '</strong></div>' +
        '</div>' +
      '</div>' +
      '<div class="cert-foot">' + esc(t('certPlace')) + ', ' + esc(tanggal) + ' · ' + esc(t('certFoot')) + '</div>' +
    '</div>' +
  '</div>';
}

function printCertificate(){
  $('#print-certificate').innerHTML = buildCertificate();
  window.print();
}

/* =========================================================
 * 20. CONFETTI
 * ========================================================= */
function launchConfetti(){
  const layer = $('#confetti-layer');
  layer.innerHTML = '';
  const colors = ['#0B3D91', '#1E88E5', '#F9A825', '#2E7D32', '#C62828', '#FFD54F'];
  for (let i = 0; i < 70; i++){
    const piece = document.createElement('div');
    piece.className = 'confetti';
    piece.style.left = Math.random() * 100 + '%';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDuration = (2.4 + Math.random() * 2.2) + 's';
    piece.style.animationDelay = (Math.random() * 1.1) + 's';
    piece.style.width = (6 + Math.random() * 8) + 'px';
    piece.style.height = (10 + Math.random() * 12) + 'px';
    piece.style.opacity = String(0.75 + Math.random() * 0.25);
    layer.appendChild(piece);
  }
  setTimeout(function(){ layer.innerHTML = ''; }, 6500);
}

/* =========================================================
 * 21. KALKULATOR BANTU
 * ========================================================= */
function calcEvaluate(){
  const input = $('#calc-input');
  const raw = input.value || '';
  const parts = raw.split('+');
  let total = 0;
  let valid = false;
  parts.forEach(function(p){
    const clean = p.replace(/[^\d]/g, '');
    if (clean !== ''){
      total += parseInt(clean, 10);
      valid = true;
    }
  });
  $('#calc-result').textContent = valid ? ('= ' + total.toLocaleString('id-ID')) : '= 0';
}

/* =========================================================
 * 22. GLOSARIUM
 * ========================================================= */
const GLOSSARY = [
  { en:'Graph',         id:'Graf' },
  { en:'Vertex / Node', id:'Simpul' },
  { en:'Edge',          id:'Sisi' },
  { en:'Weight',        id:'Bobot' },
  { en:'Weighted Graph',id:'Graf Berbobot' },
  { en:'Route',         id:'Rute' },
  { en:'Shortest Path', id:'Rute Terpendek' },
  { en:'Score',         id:'Skor' },
  { en:'Level',         id:'Tingkat' },
  { en:'Hint',          id:'Petunjuk' },
  { en:'Submit',        id:'Kirim' },
  { en:'Feedback',      id:'Umpan Balik' },
  { en:'Badge',         id:'Lencana' },
  { en:'Time / Minutes',id:'Waktu / Menit' },
  { en:'Cost',          id:'Biaya' }
];

function renderGlossary(){
  $('#glossary-list').innerHTML = GLOSSARY.map(function(g){
    return '<li><span class="term-en">' + esc(g.en) + '</span>' +
           '<span class="term-id">' + esc(g.id) + '</span></li>';
  }).join('');
}

/* =========================================================
 * 23. TENTANG / CARA BERMAIN
 * ========================================================= */
function renderAbout(){
  const steps = t('aboutSteps');
  $('#about-body').innerHTML = '<ol>' + steps.map(function(s){
    return '<li>' + esc(s) + '</li>';
  }).join('') + '</ol>' +
  '<p class="muted">' + esc(state.lang === 'id'
    ? 'Skor maksimal 240. Bintang: ≥200 → ⭐⭐⭐, 150–199 → ⭐⭐, 100–149 → ⭐, <100 → coba lagi.'
    : 'Maximum score 240. Stars: ≥200 → ⭐⭐⭐, 150–199 → ⭐⭐, 100–149 → ⭐, <100 → try again.') + '</p>';
}

/* =========================================================
 * 24. PANEL HELPER
 * ========================================================= */
function openGlossary(){
  $('#glossary-panel').classList.add('open');
  $('#glossary-panel').setAttribute('aria-hidden', 'false');
  $('#panel-backdrop').hidden = false;
}
function closeGlossary(){
  $('#glossary-panel').classList.remove('open');
  $('#glossary-panel').setAttribute('aria-hidden', 'true');
  $('#panel-backdrop').hidden = true;
}

/* =========================================================
 * 25. DARK MODE
 * ========================================================= */
function applyDark(){
  document.body.classList.toggle('dark', state.dark);
  $('#btn-dark').setAttribute('aria-pressed', state.dark ? 'true' : 'false');
  $('#btn-dark').textContent = state.dark ? '☀️' : '🌙';
  try{ localStorage.setItem('lkpdGrafK9_dark', state.dark ? '1' : '0'); } catch(err){ /* diabaikan */ }
}

/* =========================================================
 * 26. INISIALISASI
 * ========================================================= */
function loadPrefs(){
  try{
    const dark = localStorage.getItem('lkpdGrafK9_dark');
    if (dark === '1') state.dark = true;
    const best = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
    state.best = isNaN(best) ? 0 : best;
  } catch(err){ /* diabaikan */ }
}

function initEvents(){

  /* --- Logo fallback --- */
  const logo = $('#school-logo');
  if (logo){
    logo.addEventListener('error', function(){
      this.onerror = null;
      this.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">' +
        '<rect width="200" height="200" rx="28" fill="#0B3D91"/>' +
        '<text x="100" y="122" font-family="Poppins,Arial,sans-serif" font-size="46" ' +
        'font-weight="700" fill="#ffffff" text-anchor="middle">LOGO</text></svg>'
      );
    });
  }

  /* --- Tombol bahasa --- */
  $('#btn-lang').addEventListener('click', function(){
    state.lang = (state.lang === 'id') ? 'en' : 'id';
    beep('click');
    applyI18n();
    /* Re-render bagian yang bergantung bahasa */
    if ($('#screen-welcome').classList.contains('active')){ initTutorial(); }
    if ($('#screen-level1').classList.contains('active')){ $('#graph-level1').innerHTML=''; renderLevel1(); }
    if ($('#screen-level2').classList.contains('active')){ $('#graph-level2').innerHTML=''; renderLevel2(); }
    if ($('#screen-level3').classList.contains('active')){ $('#graph-level3').innerHTML=''; renderLevel3(); }
    if ($('#screen-level4').classList.contains('active')){ $('#graph-level4').innerHTML=''; renderLevel4(); }
    renderGlossary();
    renderAbout();
  });

  /* --- Dark mode --- */
  $('#btn-dark').addEventListener('click', function(){
    state.dark = !state.dark;
    applyDark();
    beep('click');
  });

  /* --- Suara --- */
  $('#btn-sound').addEventListener('click', function(){
    state.sound = !state.sound;
    this.textContent = state.sound ? '🔊' : '🔇';
    this.setAttribute('aria-pressed', state.sound ? 'false' : 'true');
    if (state.sound) beep('correct');
  });
  $('#btn-sound').textContent = state.sound ? '🔊' : '🔇';

  /* --- Glosarium --- */
  $('#btn-glossary').addEventListener('click', openGlossary);
  $('#glossary-close').addEventListener('click', closeGlossary);
  $('#panel-backdrop').addEventListener('click', closeGlossary);

  /* --- About --- */
  function openAbout(){
    renderAbout();
    $('#modal-about').hidden = false;
    $('#about-close').focus();
  }
  $('#btn-about').addEventListener('click', openAbout);
  $('#btn-about-2').addEventListener('click', openAbout);
  $('#about-close').addEventListener('click', function(){ $('#modal-about').hidden = true; });

  /* --- Feedback modal --- */
  $('#fb-next').addEventListener('click', function(){
    closeFeedback();
    const cb = feedbackCallback;
    feedbackCallback = null;
    if (typeof cb === 'function') cb();
  });

  /* --- Game over --- */
  $('#go-retry').addEventListener('click', function(){
    $('#modal-gameover').hidden = true;
    resetToLevel1();
  });

  /* --- Mulai --- */
  $('#btn-start').addEventListener('click', function(){
    beep('click');
    state.blitz = $('#blitz-toggle').checked;
    state.lives = MAX_LIVES;
    state.score = 0;
    state.scores = { 1:0, 2:0, 3:0, 4:0 };
    state.idx = { 1:0, 2:0, 3:0, 4:0 };
    state.log = [];
    updateHeader();
    renderLevel1();
  });

  /* --- Blitz toggle --- */
  $('#blitz-toggle').addEventListener('change', function(){
    state.blitz = this.checked;
  });

  /* --- Kalkulator --- */
  $('#btn-calc').addEventListener('click', function(){
    const panel = $('#calc-panel');
    panel.hidden = !panel.hidden;
    if (!panel.hidden){
      $('#calc-input').focus();
      calcEvaluate();
    }
  });
  $('#calc-close').addEventListener('click', function(){ $('#calc-panel').hidden = true; });
  $('#calc-input').addEventListener('input', calcEvaluate);
  $('#calc-keypad').addEventListener('click', function(ev){
    const btn = ev.target.closest('button');
    if (!btn) return;
    const k = btn.dataset.k;
    const input = $('#calc-input');
    if (k === 'C'){ input.value = ''; }
    else { input.value += k; }
    calcEvaluate();
    beep('click');
  });

  /* --- Result buttons --- */
  $('#btn-review').addEventListener('click', function(){
    const box = $('#review-box');
    if (box.hidden){ renderReview(); }
    else { box.hidden = true; }
  });

  $('#btn-cert').addEventListener('click', function(){
    printCertificate();
  });

  $('#btn-again').addEventListener('click', function(){
    state.level = 0;
    state.lives = MAX_LIVES;
    state.score = 0;
    state.scores = { 1:0, 2:0, 3:0, 4:0 };
    state.idx = { 1:0, 2:0, 3:0, 4:0 };
    state.log = [];
    state.essayTries = { 0:0, 1:0 };
    $('#blitz-toggle').checked = false;
    state.blitz = false;
    $('#graph-level1').innerHTML = '';
    $('#graph-level2').innerHTML = '';
    $('#graph-level3').innerHTML = '';
    $('#graph-level4').innerHTML = '';
    updateHeader();
    updateProgress();
    initTutorial();
    showScreen('screen-welcome');
  });

  /* --- Escape menutup modal/panel --- */
  document.addEventListener('keydown', function(ev){
    if (ev.key === 'Escape'){
      if (!$('#modal-feedback').hidden){ /* umpan balik wajib dibaca */ }
      if (!$('#modal-about').hidden){ $('#modal-about').hidden = true; }
      if (!$('#calc-panel').hidden){ $('#calc-panel').hidden = true; }
      closeGlossary();
    }
  });
}

function init(){
  loadPrefs();
  applyDark();
  applyI18n();
  renderGlossary();
  renderAbout();
  initTutorial();
  initEvents();
  calcEvaluate();

  /* Tampilkan skor terbaik sejak awal */
  if (state.best > 0){
    console.log('[Misi Kurir Muda] Skor terbaik tersimpan: ' + state.best);
  }
}

document.addEventListener('DOMContentLoaded', init);