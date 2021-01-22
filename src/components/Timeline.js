import { useState } from 'react'

export const Year = ({ children }) => (
  <div className="flex items-center my-4">
    <p className="text-lg font-bold dark:text-white">{children}</p>
    <div className="flex-1 h-px ml-4 bg-gray-200 dark:bg-gray-600" />
  </div>
)

export const Step = ({ title, children }) => (
  <li className="flex">
    <div className="flex mt-1 text-green-700 dark:text-green-300">
      <svg className="mr-2 w-4 h-4" viewBox="0 0 24 24">
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
          <path d="M22 4L12 14.01l-3-3" />
        </g>
      </svg>
    </div>

    <div className="mb-4">
      <p className="font-medium text-gray-900 mb-2 dark:text-white">{title}</p>
      <p className="text-gray-700 dark:text-gray-200">{children}</p>
    </div>
  </li>
)

const FullTimeline = () => (
  <>
    <Year>2018</Year>
    <ul>
      <Step title="Perkenalan Dengan React &amp; Node.js">
        Saya belajar menggunakan React &amp; Node.js untuk membangun FreedomLife
        juga sebagai tantangan utama saya selama masa internship untuk membantu
        perusahaan mengembangkan produk menggunakan React &amp; Node.js.
      </Step>
      <Step title="Mentoring LKS - Web Design">
        Saya dipercayakan menjadi mentor untuk adik kelas saya yang akan
        mengikuti LKS - Web Design.
      </Step>
      <Step title="Memulai FreedomLife">
        Saya memulai membuat aplikasi panduan baca Alkitab setahun berbasis web
        bernama{' '}
        <a
          href="https://freedomlife.id"
          target="_blank"
          rel="noreferrer"
          className="text-green-600 dark:text-green-400"
        >
          FreedomLife
        </a>
        . Ditahap awal ini saya memulai dengan melakukan riset terhadap calon
        pengguna apa saja yang mereka butuhkan dalam aplikasi ini.
      </Step>
      <Step title="Frontend Engineer - Internship">
        Karena saya masuk di SMK 4 tahun, tahun terakhir di SMK ini digunakan
        untuk melakukan internship pekerjaan penuh waktu. Saya mengambil
        internship selama 1 tahun di Docotel Group sebagai Frontend Engineer.
      </Step>
    </ul>
    <Year>2017</Year>
    <ul>
      <Step title="Runner-Up LKS - Web Design 🥳">
        Puji Tuhan setelah perjalanan panjang selama 2 tahun saya berhasil
        mendapatkan posisi juara kedua di Lomba Kompetensi Siswa tingkat
        Provinsi Daerah Istimewa Yogyakarta.
      </Step>
      <Step title="LKS - Web Design II">
        Puji Tuhan untuk kedua kalinya saya lolos seleksi tingkat sekolah, dan
        melanjutkan untuk Lomba Kompetensi Siswa tingkat Provinsi Daerah
        Istimewa Yogyakarta.
      </Step>
      <Step title="Seleksi LKS - Web Design II">
        Saya kembali lagi mengikuti seleksi Lomba Kompetensi Siswa di bidang
        lomba web design tingkat sekolah, dengan persiapan yang lebih matang.
      </Step>
      <Step title="Mentoring PHP Khusus">
        Saya mengikuti mentoring khusus untuk bahasa pemrograman PHP. Mentor
        saya waktu itu mas{' '}
        <a
          href="https://twitter.com/therusetiawan"
          target="_blank"
          rel="nooopener noreferrer"
          className="text-green-600 dark:text-green-400"
        >
          Heru Setiawan
        </a>
        . Di sesi mentoring ini juga membahas apa yang membuat saya gagal di
        seleksi LKS tahun lalu.
      </Step>
    </ul>
    <Year>2016</Year>
    <ul>
      <Step title="Gagal LKS - Web Design 🥲">
        Saya kalah di tingkat provinsi. Saya merasa sedih, namun juga ada rasa
        semangat untuk belajar agar lebih baik lagi di tahun depan.
      </Step>
      <Step title="LKS - Web Design">
        Puji Tuhan saya lolos seleksi di tingkat sekolah, akhirnya saya naik ke
        Lomba Kompetensi Siswa tingkat Provinsi Daerah Istimewa Yogyakarta.
      </Step>
      <Step title="Seleksi LKS - Web Design">
        Setelah selesai pelatihan, saya mengikuti seleksi Lomba Kompetensi Siswa
        di bidang lomba web design tingkat sekolah.
      </Step>
      <Step title="Pelatihan LKS - Web Design">
        Saya mengikuti pelatihan web design untuk mempersiapkan seleksi Lomba
        Kompetensi Siswa pada tingkat sekolah.
      </Step>
      <Step title="Menjadi Asisten Guru Untuk Mengajar Web Development">
        Saya dipercayakan untuk mengajar teman-teman sekelas dalam pelajaran web
        development. Pelajaran waktu itu menggunakan PHP Native, HTML, CSS untuk
        membuat sebuah aplikasi CRUD sederhana.
      </Step>
    </ul>
    <Year>2015</Year>
    <ul>
      <Step title="Masuk SMK Jurusan Komputer &amp; Jaringan 🤓">
        Ketertarikan saya terhadap dunia teknologi yang semakin berkembang
        membuat saya tertarik untuk menekuninya dengan masuk ke SMK.
      </Step>
    </ul>
    <Year>2013</Year>
    <ul>
      <Step title="Belajar Web Development II (JavaScript)">
        Selanjutnya saya belajar sendiri lewat internet untuk mengenal apa itu
        JavaScript dan bagaimana cara kerjanya.
      </Step>
      <Step title="Belajar Web Development I (HTML & CSS)">
        Ayah saya membelikan buku tentang web development dasar, lalu saya mulai
        membacanya dan mempraktekannya. Saat itu saya belajar apa itu HTML &amp;
        CSS dan bagaimana cara mereka bekerja.
      </Step>
      <Step title="Belajar Apa Itu Internet">
        Saya mulai belajar tentang apa itu internet dan apa saja yang tersedia
        di dalamnya, selain game.
      </Step>
      <Step title="Komputer Pertama Saya">
        Komputer yang pertama kali saya gunakan adalah komputer ayah saya. Dulu
        saya memakainya untuk bermain game web-flash Facebook, seperti
        Restaurant City, Farmville, dan Ninja Saga.
      </Step>
    </ul>
    <Year>2000</Year>
    <ul>
      <Step title="Lahir Ke Dunia 🧑🏻‍🍼"></Step>
    </ul>
  </>
)

const Timeline = () => {
  const [isFullTimeline, setFullTimeline] = useState(false)

  return (
    <>
      <Year>2020</Year>
      <ul>
        <Step title="FreedomLife 2 Ribu Pengguna 🔥">
          FreedomLife menyentuh dua ribu pengguna di akhir tahun 2020. Membuat
          saya yakin bahwa masih banyak orang yang ingin mengerti hati seorang
          Bapa bagi anak-anakNya.
        </Step>
        <Step title="Menjadi Principal Frontend Engineer 👨🏻‍💻">
          Di awal 2020 saya dipercayakan berpindah peran menjadi manager dan
          mentor tim frontend engineer di PrivyID.
        </Step>
        <Step title="Merilis FreedomLife 🚀">
          Setelah satu tahun lebih dibuat, akhirnya saya merilis aplikasi
          panduan baca Alkitab setahun,{' '}
          <a
            href="https://freedomlife.id"
            target="_blank"
            rel="noreferrer"
            className="text-green-600 dark:text-green-400"
          >
            FreedomLife
          </a>
          .
        </Step>
        <Step title="Frontend Engineer - Full-time II">
          Setelah waktu peristirahatan saya, saya kembali lagi bekerja di
          PrivyID sebagai Frontend Engineer.
        </Step>
      </ul>
      <Year>2019</Year>
      <ul>
        <Step title="Istirahat Dari Dunia Kerja">
          Di akhir tahun 2019, saya memutuskan untuk istirahat dari dunia kerja
          selama 1 bulan untuk membuat pikiran dan mental saya kembali normal
          setelah hampir 2 tahun bekerja.
        </Step>
        <Step title="Testing FreedomLife Beta">
          Melakukan test awal aplikasi{' '}
          <a
            href="https://freedomlife.id"
            target="_blank"
            rel="noreferrer"
            className="text-green-600 dark:text-green-400"
          >
            FreedomLife
          </a>{' '}
          kepada pengguna yang merupakan responden riset sebelumnya, untuk
          menyempurnakan aplikasi tersebut.
        </Step>
        <Step title="Bekerja Dengan Orang Luar Negeri">
          Di Skyshi saya mendapatkan kesempatan untuk bekerja di perusahaan
          multinasional, GetCraft. Saya bekerja dengan orang-orang dari
          Singapore, US, Australia, dan Bulgaria. Saya banyak mendapatkan
          pengetahuan baru, juga pandangan baru dari orang-orang yang ada di
          luar sana.
        </Step>
        <Step title="Frontend Engineer - Full-time I">
          Akhirnya setelah saya lulus dan setelah berakhir masa internship saya,
          saya mendapatkan pekerjaan full-time di Skyshi Digital Indonesia
          sebagai Frontend Engineer.
        </Step>
        <Step title="Lulus SMK 🎓">
          Sebuah pencapaian yang menurut saya luar biasa. Akhirnya setelah 4
          tahun, selesai juga semua perjuangan saya di SMK.
        </Step>
        <Step title="Mulai Mendesain FreedomLife">
          Setelah melakukan riset, saya mulai melakukan desain kerangka awal
          aplikasi{' '}
          <a
            href="https://freedomlife.id"
            target="_blank"
            rel="noreferrer"
            className="text-green-600 dark:text-green-400"
          >
            FreedomLife
          </a>
          , dimulai dari desain UI dan UX, kemudian desain data dan arsitektur
          kode.
        </Step>
      </ul>

      {isFullTimeline && <FullTimeline />}

      <div
        aria-label={`Read ${isFullTimeline ? 'Less' : 'More'}`}
        role="button"
        tabIndex="0"
        className="flex items-center mt-8 focus:outline-none"
        onClick={() => setFullTimeline(!isFullTimeline)}
        onKeyDown={() => undefined}
      >
        <div className="flex-1 h-px mr-4 bg-gray-200 dark:bg-gray-600" />
        <p className="flex items-center font-medium dark:text-white">
          {isFullTimeline ? (
            <>
              Lihat Lebih Sedikit{' '}
              <svg
                className="h-4 w-4 ml-1"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </>
          ) : (
            <>
              Lihat Lebih Banyak{' '}
              <svg
                className="h-4 w-4 ml-1"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </>
          )}
        </p>
        <div className="flex-1 h-px ml-4 bg-gray-200 dark:bg-gray-600" />
      </div>
    </>
  )
}

export default Timeline
