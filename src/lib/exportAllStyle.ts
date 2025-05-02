import poin2 from '/assets/poin/poin-2.png'
import poin3 from '/assets/poin/poin-3.png'
import poin4 from '/assets/poin/poin-4.png'
import poin5 from '/assets/poin/poin-5.png'

import sadEmot from '/assets/emoji/sad.png'
import netralEmot from '/assets/emoji/netral.png'
import smileEmot from '/assets/emoji/smile.png'
import shyEmot from '/assets/emoji/shy.png'
import starEmot from '/assets/emoji/star.png'

export const page2Content = [
  {
    text: 'CARA MENGGUNAKAN LAPORAN',
    style: 'title',
    pageBreak: 'after',
  },
  {
    text: 'JAGA KERAHASIAAN',
    style: 'subtitle',
  },
  {
    text: 'Mohon untuk menjaga kerahasiaan laporan ini. Pemberian laporan ditujukan bagi pihak yang memiliki tanggung jawab untuk pengambilan keputusan.',
    style: 'paragraph',
  },
  {
    text: 'TINJAUAN MENYELURUH',
    style: 'subtitle',
  },
  {
    text: 'Tinjaulah laporan ini secara keseluruhan. Hindari untuk fokus pada salah satu aspek kelebihan dan kekurangan siswa. Pertimbangkan kesesuaian hasil laporan ini dengan tuntutan sebagai siswa pada umumnya.',
    style: 'paragraph',
  },
  {
    text: 'POTENSI VS PRESTASI SEKOLAH',
    style: 'subtitle',
  },
  {
    text: 'Pertimbangkan gambaran potensi psikologis siswa terhadap prestasi sekolah yang ditampilkan siswa. Hasil tes ini tidak melibatkan latar belakang keluarga siswa, pelatihan, kursus, bimbingan belajar yang diikuti maupun ketrampilan yang dimiliki siswa.',
    style: 'paragraph',
  },
  {
    text: 'OPTIMALKAN SUMBER INFORMASI LAIN',
    style: 'subtitle',
  },
  {
    text: 'Untuk mendapatkan gambaran siswa yang lebih utuh, padukan isi laporan ini dengan informasi dari berbagai sumber (seperti: wawancara, latar belakang siswa, minat dan bakat, dan lainnya).',
    style: 'paragraph',
  },
  {
    text: 'CEK HASIL BERKALA',
    style: 'subtitle',
  },
  {
    text: 'Pastikan untuk selalu cek validitas hasil tes ini secara berkala. Hal ini akan memberikan gambaran siswa yang lebih obyektif mengikuti perubahan yang terjadi dalam kehidupannya.',
    style: 'paragraph',
  },
  {
    text: 'DISCLAIMER',
    style: 'disclaimer',
  },
  {
    text: 'I-Pro Student ini ditujukan untuk siswa kelas 9 SLTP hingga 12 SLTA/sederajat\ndan membantu siswa mengenali potensi psikologi dan pengembangan diri.\nLaporan ini dihasilkan secara otomatis menggunakan komputer. Jika tidak ada pengawasan saat proses pengisian tes, \nkami tidak dapat menjamin kesesuaian identitas dari responden yang mengisi.',
    style: 'paragraph-disclaimer',
  },
]

export const page2RiasecContent = [
  {
    text: 'CARA MENGGUNAKAN LAPORAN',
    style: 'title',
    pageBreak: 'after',
  },
  {
    text: 'JAGA KERAHASIAAN',
    style: 'subtitle',
  },
  {
    text: 'Mohon untuk menjaga kerahasiaan laporan ini. Pemberian laporan ditujukan bagi pihak yang memiliki tanggung jawab untuk pengambilan keputusan.',
    style: 'paragraph',
  },
  {
    text: 'TINJAUAN MENYELURUH',
    style: 'subtitle',
  },
  {
    text: 'Hindari untuk fokus pada salah satu kelebihan atau kekurangan yang tampil dalam laporan profil minat siswa. Pertimbangkan kesesuaian antara gambaran profil minat dengan gambaran potensi  psikologis siswa (intelektual, sikap kerja, kepribadian) dan prestasi akademik atau keterampilan lain yang dimiliki siswa  yang dapat memengaruhi ketepatan pemilihan jurusan pendidikan.',
    style: 'paragraph',
  },
  // {
  //   text: 'POTENSI VS PRESTASI SEKOLAH',
  //   style: 'subtitle',
  // },
  // {
  //   text: 'Padukan berbagai sumber informasi lainnya dengan laporan profil minat siswa, agar diperoleh gambaran yang lebih utuh untuk mendukung pengambilan keputusan pemilihan jurusan dan pengembangan diri yang lebih optimal.',
  //   style: 'paragraph',
  // },
  {
    text: 'OPTIMALKAN SUMBER INFORMASI LAIN',
    style: 'subtitle',
  },
  {
    text: 'Padukan berbagai sumber informasi lainnya dengan laporan profil minat siswa, agar diperoleh gambaran yang lebih utuh untuk mendukung pengambilan keputusan pemilihan jurusan dan pengembangan diri yang lebih optimal.',
    style: 'paragraph',
  },
  {
    text: 'CEK HASIL BERKALA',
    style: 'subtitle',
  },
  {
    text: 'Pastikan untuk selalu mengecek validitas hasil tes ini secara berkala. Hal ini akan memberikan gambaran siswa yang lebih obyektif mengikuti perubahan yang terjadi dalam kehidupannya.',
    style: 'paragraph',
  },
  {
    text: 'DISCLAIMER',
    style: '',
  },
  {
    text: 'Disclaimer: Tes ini bertujuan membantu siswa mengenali profil minatnya, namun bukan satu-satunya penentu untuk pemilihan jurusan atau pendidikan lanjutan. Laporan ini dihasilkan secara otomatis dan validitas hasil bergantung pada kejujuran siswa saat mengerjakan tes.',
    style: 'paragraph',
  },
]

export const getXPosValue = (skor: number) => {
  let xPos = 0
  if (skor == 1) {
    xPos = 115
  } else if (skor == 2) {
    xPos = 131
  } else if (skor == 3) {
    xPos = 147
  } else if (skor == 4) {
    xPos = 163
  } else if (skor == 5) {
    xPos = 179.3
  }

  return xPos
}

export const getEmoticon = (skor: number) => {
  switch (skor) {
    case 1:
      return sadEmot
    case 2:
      return netralEmot
    case 3:
      return smileEmot
    case 4:
      return shyEmot
    case 5:
      return starEmot
    default:
      return netralEmot
  }
}

export const getEmotResult = (skor: number) => {
  switch (skor) {
    case 1:
      return sadEmot
    case 2:
      return poin2
    case 3:
      return poin3
    case 4:
      return poin4
    case 5:
      return poin5
    default:
      return netralEmot
  }
}
