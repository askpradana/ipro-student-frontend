<script setup lang="ts">
import { ref } from 'vue'
import jsPDF from 'jspdf'
import { type RiasecDataInterface } from '@/types/riasecTypes'
import { getExportRiasec } from '@/api/getExportRiasec'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { page2RiasecContent } from '@/lib/exportAllStyle'
import logoIradat from '/assets/iradat-konsultan.png'
import riasecImg from '/assets/riasec-cover.png'
import Kerahasiaan from '/assets/instruction-header/kerahasiaan.png'
import CetakHasilTes from '/assets/instruction-header/cetak-hasil-tes.png'
import Tujuan from '/assets/instruction-header/tujuan.png'
import OptimalkanInformasi from '/assets/instruction-header/optimalkan-informasi.png'

const dataNilaiSiswa = ref<RiasecDataInterface>()
const isLoading = ref(false)

const exportToPDF = async () => {
  isLoading.value = true

  try {
    const response = await getExportRiasec()
    dataNilaiSiswa.value = response

    if (!dataNilaiSiswa.value?.data?.person_data.length) {
      alert('Tidak ada data untuk diexport')
      return
    }

    const zip = new JSZip()

    for (const student of dataNilaiSiswa.value.data.person_data) {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      })

      // Ukuran halaman A4 dan margin
      const pageWidth = 210 // Lebar A4 dalam mm
      // const pageHeight = 297 // Tinggi A4 dalam mm
      const margin = 20 // Margin di setiap sisi
      const availableWidth = pageWidth - 2 * margin // 170 mm
      // const availableHeight = pageHeight - 2 * margin // 257 mm

      // === PAGE 1 - Cover ===
      doc.setFontSize(32)
      doc.setFont('helvetica', 'bold')
      // doc.addImage(logoIradat, 'PNG', 150, 26, 35, 15)
      doc.addImage(logoIradat, 'PNG', 20, 20, 35, 15)
      doc.text('Profil Minat Siswa', 105, 65, { align: 'center' })

      // Center the image horizontally (A4 width is 210mm, image width is 120mm)
      doc.addImage(riasecImg, 'PNG', (210 - 100) / 2, 85, 100, 100)

      doc.setFontSize(16)
      doc.setFont('helvetica', 'normal')

      // Build student info dynamically, excluding empty fields
      let yPos = 200
      doc.text(`${student?.name.toUpperCase() || '-'}`, 105, yPos, { align: 'center' })
      yPos += 10

      doc.text(`KELAS ${student?.grade || '-'}`, 105, yPos, { align: 'center' })
      yPos += 10

      // Only show school if it's not empty or '-'
      if (dataNilaiSiswa.value.data.school && dataNilaiSiswa.value.data.school !== '-') {
        doc.text(`${dataNilaiSiswa.value.data.school.toUpperCase()}`, 105, yPos, { align: 'center' })
        yPos += 10
      }

      // Only show jurusan if it's not empty or '-'
      if (student?.jurusan && student.jurusan !== '-') {
        doc.text(`JURUSAN ${student.jurusan.toUpperCase()}`, 105, yPos, { align: 'center' })
      }

      // === PAGE 2 - Cara Menguakan ===
      doc.addPage()
      // doc.addImage(logoIradat, 'PNG', 16, 5, 30, 12)
      let yPosition = 24 // Posisi Y awal

      page2RiasecContent.forEach((content) => {
        if (content.style == 'title') {
          doc.setFont('helvetica', 'bold')
          doc.setFontSize(16)
          doc.text(content.text, 210 / 2, 27, { align: 'center' })
          yPosition += 24
        } else if (content.style == 'subtitle') {
          doc.setFont('helvetica', 'bold')
          doc.setFontSize(14)
          let header = ''
          if (content.text.includes('KERAHASIAAN')) header = Kerahasiaan
          if (content.text.includes('MENYELURUH')) header = Tujuan
          // if (content.text.includes('POTENSI')) header = PotensiPrestasi
          if (content.text.includes('OPTIMALKAN')) header = OptimalkanInformasi
          if (content.text.includes('HASIL')) header = CetakHasilTes

          if (content.text.includes('OPTIMALKAN')) {
            doc.addImage(header, 'PNG', 210 / 2 - 34, yPosition - 8, 64, 12)
          } else {
            doc.addImage(header, 'PNG', 210 / 2 - 34, yPosition - 5, 64, 12)
          }
          // doc.text(content.text, 210 / 2, yPosition, { align: 'center' })
          yPosition += 18
        } else if (content.style == 'disclaimer') {
          doc.setFontSize(10)
          doc.setFont('helvetica', 'bold')
          doc.text(content.text, 210 / 2, yPosition - 1, { align: 'center' })
          yPosition += 10
        } else if (content.style == 'paragraph-disclaimer') {
          doc.setFontSize(10)
          doc.setFont('helvetica', 'italic')

          // Margin kiri dan kanan
          const leftMargin = 20
          const rightMargin = 20

          // Lebar area teks yang digunakan
          const pageWidth = 210 // A4 width in mm
          const textWidth = pageWidth - leftMargin - rightMargin

          // Split teks menjadi beberapa baris berdasarkan lebar halaman
          const textLines = doc.splitTextToSize(content.text, textWidth)

          // Loop untuk menambahkan setiap baris ke dokumen
          textLines.forEach((line: string) => {
            doc.text(line, pageWidth / 2, yPosition, { align: 'center' })
            yPosition += 6 // yPosition untuk setiap baris, sesuaikan ukuran ini sesuai kebutuhan
          })

          yPosition += textLines.length + 7 // +5 untuk jarak ekstra
          
        } else if (content.style == 'paragraph') {
          doc.setFont('helvetica', 'normal')
          doc.setFontSize(12)

          // Margin kiri dan kanan
          const leftMargin = 20
          const rightMargin = 20

          // Lebar area teks yang digunakan
          const pageWidth = 210 // A4 width in mm
          const textWidth = pageWidth - leftMargin - rightMargin

          // Split teks menjadi beberapa baris berdasarkan lebar halaman
          const textLines = doc.splitTextToSize(content.text, textWidth)

          // Loop untuk menambahkan setiap baris ke dokumen
          textLines.forEach((line: string) => {
            doc.text(line, leftMargin, yPosition, { align: 'justify' })
            yPosition += 6 // yPosition untuk setiap baris, sesuaikan ukuran ini sesuai kebutuhan
          })

          yPosition += textLines.length + 7 // +5 untuk jarak ekstra
        }
      })

      // === PAGE 3 - Hasil Riasec ===
      const addWrappedText = (
        doc: jsPDF,
        text: string,
        x: number,
        y: number,
        maxWidth: number,
        fontSize: number,
        lineHeight: number,
      ) => {
        doc.setFontSize(fontSize)
        doc.setFont('helvetica', 'normal')
        const splitText = doc.splitTextToSize(text, maxWidth)
        splitText.forEach((line: string, index: number) => {
          doc.text(line, x, y + index * lineHeight)
        })
        return splitText.length * lineHeight // Mengembalikan tinggi total teks untuk posisi berikutnya
      }

      const maxWidth = pageWidth - margin * 2

      doc.addPage()
      // tambah garis tepi
      // doc.setLineWidth(0.5)
      // doc.setDrawColor(0, 0, 0) // Warna garis tepi: hitam
      // doc.rect(16, 20, availableWidth + 6, availableHeight, 'S') // Gambar persegi panjang sebagai garis tepi

      doc.setFontSize(28)
      doc.setFont('helvetica', 'bold')
      // doc.addImage(logoIradat, 'PNG', 16, 5, 30, 12)
      doc.text('Profil Minat Siswa', 105, 33, { align: 'center' })

      // GRAFIK
      // Data dari grafik
      
      const categories = [
        'Realistic',
        'Investigative',
        'Artistic',
        'Social',
        'Enterprising',
        'Conventional',
      ]

      const values = [
        student.result.scores.realistic,
        student.result.scores.investigative,
        student.result.scores.artistic,
        student.result.scores.social,
        student.result.scores.enterprising,
        student.result.scores.conventional,
      ]

      const colors = [
        [255, 165, 0],
        [255, 215, 0],
        [0, 128, 0],
        [255, 0, 0],
        [0, 191, 255],
        [128, 0, 128],
      ]

      // Parameter grafik
      const barWidth = 20
      const gap = 5
      const maxHeight = 55 // Tinggi maksimum batang
      const maxValue = 50 // Nilai maksimum pada sumbu Y
      const chartWidth = barWidth * categories.length + gap * (categories.length - 1) // Lebar grafik: 120 mm

      // Hitung posisi tengah
      const startX = margin + (availableWidth - chartWidth) / 2 + gap // 45 mm
      const startY = 60 // Sekitar 78.5 mm, kita gunakan 80

      // Judul grafik
      doc.setFontSize(16)
      doc.text('GRAFIK MINAT RIASEC', 70, 55)

      // Gambar sumbu
      doc.setLineWidth(0.5)
      doc.line(startX, startY, startX, startY + maxHeight) // Sumbu Y
      doc.line(startX, startY + maxHeight, startX + chartWidth, startY + maxHeight) // Sumbu X

      // Gambar skala pada sumbu Y
      for (let i = 0; i <= maxValue; i += 5) {
        const y = startY + maxHeight - (i / maxValue) * maxHeight
        doc.line(startX - 3, y, startX, y) // Tanda skala
        doc.setFontSize(10)
        doc.text(`${i}`, startX - 10, y + 1)
      }
      // doc.text('Skor 1-10', startX - 15, startY - 5)

      // Gambar batang dan label
      values.forEach((value, index) => {
        const x = startX + index * (barWidth + gap)
        const barHeight = (value / maxValue) * maxHeight
        const y = startY + maxHeight - barHeight

        // Atur warna batang
        const [r, g, b] = colors[index]
        doc.setFillColor(r, g, b)
        doc.rect(x, y, barWidth - 2, barHeight, 'F') // Gambar batang

        // Tambahkan nilai di atas batang
        doc.setFontSize(10)
        doc.setTextColor(0, 0, 0)
        doc.text(`${value}`, x + barWidth / 2 - 2, y - 5)

        // Tambahkan label kategori di bawah sumbu X

        doc.text(categories[index], x + barWidth / 2, startY + maxHeight + 5, {
          align: 'center',
        })
      })

      //CONTENT
      doc.setFontSize(20)
      doc.text(`TIPE : ${student.result.top_three.toUpperCase()}`, 105, 135, { align: 'center' })

      // Gambaran Kepribadian
      doc.setFontSize(16)
      doc.setFont('helvetica', 'bold')
      doc.text('GAMBARAN KEPRIBADIAN', 20, 150, { align: 'left' })
      yPosition = 160

      yPosition += addWrappedText(
        doc,
        student.result.kepribadian,
        margin,
        yPosition,
        maxWidth,
        12,
        7,
      )

      // Bidang Karier
      doc.setFontSize(16)
      doc.setFont('helvetica', 'bold')
      doc.text('BIDANG KARIER YANG COCOK', 20, yPosition + 5, { align: 'left' })
      yPosition += 15 // Tambah jarak untuk judul dan teks
      yPosition += addWrappedText(doc, student.result.karir, margin, yPosition, maxWidth, 12, 7)

      // Jurusan Pendidikan
      doc.setFontSize(16)
      doc.setFont('helvetica', 'bold')
      doc.text('JURUSAN PENDIDIKAN YANG DISARANKAN', 20, yPosition + 5, { align: 'left' })
      yPosition += 15
      yPosition += addWrappedText(
        doc,
        student.result.pendidikan,
        margin,
        yPosition,
        maxWidth,
        12,
        7,
      )

      // Saran Pengembangan Potensi
      doc.setFontSize(16)
      doc.setFont('helvetica', 'bold')
      doc.text('SARAN PENGEMBANGAN POTENSI SISWA', 20, yPosition + 5, { align: 'left' })
      yPosition += 15
      addWrappedText(doc, student.result.potensi, margin, yPosition, maxWidth, 12, 7)

      const pdfBlob = doc.output('blob')
      const filename = `Riasec-${student.name?.replace(/\s+/g, '_') || 'Siswa'}.pdf`
      zip.file(filename, pdfBlob)
    }

    zip.generateAsync({ type: 'blob' }).then((content) => {
      saveAs(content, 'Laporan-Riasec-Siswa.zip')
    })
  } catch (err) {
    console.error(err)
    alert('Gagal export PDF!')
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <button
    @click="exportToPDF"
    class="bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-2 px-4 rounded-md mb-4 block"
    :disabled="isLoading"
  >
    {{ isLoading ? 'Membuat PDF...' : 'Export Riasec' }}
  </button>
</template>
