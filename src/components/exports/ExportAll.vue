<script setup lang="ts">
import { ref } from 'vue'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { type PsikogramExportDataInterface } from '@/types/calculateTypes'
import { getExportAll } from '@/api/getExportAll'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { getXPosValue, page2Content, getEmotResult, getEmoticon } from '@/lib/exportAllStyle'
import sadEmot from '/assets/emoji/sad.png'
import netralEmot from '/assets/emoji/netral.png'
import smileEmot from '/assets/emoji/smile.png'
import shyEmot from '/assets/emoji/shy.png'
import starEmot from '/assets/emoji/star.png'
import studentImage from '/assets/student.png'
import logoIradat from '/assets/iradat-konsultan.png'
import {
  aspekKemampuanBerpikirEmoji,
  aspekKepribadianEmoji,
  aspekSikapKerjaEmoji,
} from './exportAspekEmoji'
import Kerahasiaan from '/assets/instruction-header/kerahasiaan.png'
import CetakHasilTes from '/assets/instruction-header/cetak-hasil-tes.png'
import PotensiPrestasi from '/assets/instruction-header/potensi-vs-prestasi.png'
import Tujuan from '/assets/instruction-header/tujuan.png'
import OptimalkanInformasi from '/assets/instruction-header/optimalkan-informasi.png'

const dataNilaiSiswa = ref<PsikogramExportDataInterface>()
const isLoading = ref(false)

const exportToPDF = async () => {
  isLoading.value = true

  try {
    const response = await getExportAll()
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

      // === PAGE 1 - Cover ===
      doc.setFontSize(20)
      doc.setFont('helvetica', 'bold')
      doc.addImage(logoIradat, 'PNG', 20, 20, 35, 15)
      doc.text('Laporan Psikogram Siswa', 105, 80, { align: 'center' })

      doc.addImage(studentImage, 'PNG', 65, 100, 80, 50)

      doc.setFontSize(16)
      doc.setFont('helvetica', 'normal')
      doc.text(`${student?.name.toUpperCase() || '-'}`, 105, 200, { align: 'center' })
      doc.text(`${dataNilaiSiswa.value.data.school.toUpperCase()}`, 105, 210, { align: 'center' })
      doc.text(`KELAS ${student?.grade || '-'}`, 105, 220, { align: 'center' })
      doc.text(`JURUSAN ${student?.jurusan?.toUpperCase() || '-'}`, 105, 230, { align: 'center' })
      // doc.text(` ${student?.phone_number || '-'}`, 105, 120, { align: 'center' })
      // doc.text(`${student?.email || '-'}`, 105, 130, { align: 'center' })

      // === PAGE 2 - Cara Menguakan ===
      doc.addPage()
      let yPosition = 20 // Posisi Y awal

      page2Content.forEach((content) => {
        if (content.style == 'title') {
          doc.setFont('helvetica', 'bold')
          doc.setFontSize(16)
          doc.text(content.text, 210 / 2, 27, { align: 'center' })
          yPosition += 28
        } else if (content.style == 'subtitle') {
          doc.setFont('helvetica', 'bold')
          doc.setFontSize(14)
          let header = ''
          if (content.text.includes('KERAHASIAAN')) header = Kerahasiaan
          if (content.text.includes('MENYELURUH')) header = Tujuan
          if (content.text.includes('POTENSI')) header = PotensiPrestasi
          if (content.text.includes('OPTIMALKAN')) header = OptimalkanInformasi
          if (content.text.includes('HASIL')) header = CetakHasilTes

          doc.addImage(header, 'PNG', 210 / 2 - 34, yPosition - 5, 64, 12)
          // doc.text(content.text, 210 / 2, yPosition, { align: 'center' })
          yPosition += 14
        } else if (content.style == 'disclaimer') {
          doc.setFontSize(10)
          doc.setFont('helvetica', 'bold')
          doc.text(content.text, 210 / 2, yPosition - 1, { align: 'center' })
          yPosition += 10
        } else if (content.style == 'paragraph-disclaimer') {
          doc.setFont('helvetica', 'normal')
          doc.setFontSize(12)

          // TODO => pakai gambar terbaru

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

          yPosition += textLines.length + 5 // +5 untuk jarak ekstra
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

          yPosition += textLines.length + 5 // +5 untuk jarak ekstra
        }
      })

      // === PAGE 3 - Tabel Psikogram ===
      doc.addPage()
      doc.setFontSize(14)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(255, 255, 255)
      doc.setFillColor(51, 171, 161)
      doc.rect(20, 20, doc.internal.pageSize.getWidth() - 40, 17, 'F')
      doc.text('Tabel Psikogram Murid', 22, 27)

      doc.setFontSize(10)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(255, 255, 255)
      doc.text(
        `${student?.name?.toUpperCase() || 'NAMA TIDAK TERSEDIA'} - Kelas ${student?.grade || 'N/A'} - ${student?.jurusan || '-'} - ${student?.phone_number || 'No. Telp Tidak Tersedia'}`,
        22,
        33,
      )

      let startY = 40

      autoTable(doc, {
        head: [['No', 'Kemampuan Berpikir', '1', '2', '3', '4', '5']],
        body: student.result
          .slice(0, 5)
          .map((item, i) => [i + 1, item.aspek, '', '', '', '', '', '']),
        startY,
        margin: { vertical: 20, horizontal: 20 },
        theme: 'grid',
        headStyles: {
          fillColor: '#51A2FF',
          textColor: '#fff',
          fontStyle: 'bold',
          halign: 'center',
          valign: 'middle',
          lineColor: '#000',
          lineWidth: 0.1,
        },
        styles: {
          fontSize: 12,
          cellPadding: 2,
          textColor: '#000',
          valign: 'middle',
          lineColor: '#000',
        },
        columnStyles: {
          0: { halign: 'center', cellWidth: 20 },
          1: { textColor: '#000', cellWidth: 70 },
        },
      })

      student.result.slice(0, 5).forEach((item, i) => {
        const emoticon = getEmoticon(item.skor)
        const xPos = getXPosValue(item.skor)
        const rowHeight = 9
        const yPos = startY + (i + 1.1) * rowHeight
        doc.addImage(emoticon, 'PNG', xPos as number, yPos, 6, 6)
      })

      startY = (doc as any).lastAutoTable.finalY + 4

      autoTable(doc, {
        head: [['No', '   Sikap Kerja    ', '1', '2', '3', '4', '5']],
        body: student.result.slice(5, 8).map((item, i) => [i + 1, item.aspek, '', '', '', '', '']),
        startY,
        margin: { vertical: 20, horizontal: 20 },
        theme: 'grid',
        headStyles: {
          fillColor: '#05DF72',
          textColor: '#fff',
          fontStyle: 'bold',
          halign: 'center',
          valign: 'middle',
          lineColor: '#000',
          lineWidth: 0.1,
        },
        styles: {
          fontSize: 12,
          cellPadding: 2,
          textColor: '#000',
          valign: 'middle',
          lineColor: '#000',
        },
        columnStyles: {
          0: { halign: 'center', cellWidth: 20 },
          1: { textColor: '#000', cellWidth: 70 },
        },
      })

      student.result.slice(5, 8).forEach((item, i) => {
        const emoticon = getEmoticon(item.skor)
        const xPos = getXPosValue(item.skor)
        const rowHeight = 9
        const yPos = startY + (i + 1.1) * rowHeight
        doc.addImage(emoticon, 'PNG', xPos as number, yPos, 6, 6)
      })

      startY = (doc as any).lastAutoTable.finalY + 4

      autoTable(doc, {
        head: [['No', 'Kepribadian', '1', '2', '3', '4', '5']],
        body: student.result.slice(8, 12).map((item, i) => [i + 1, item.aspek, '', '', '', '', '']),
        startY,
        margin: { vertical: 20, horizontal: 20 },
        theme: 'grid',
        headStyles: {
          fillColor: '#FF8904',
          textColor: '#fff',
          fontStyle: 'bold',
          halign: 'center',
          valign: 'middle',
          lineColor: '#000',
          lineWidth: 0.1,
        },
        styles: {
          fontSize: 12,
          cellPadding: 2,
          textColor: '#000',
          valign: 'middle',
          lineColor: '#000',
        },
        columnStyles: {
          0: { halign: 'center', cellWidth: 20 },
          1: { textColor: '#000', cellWidth: 70 },
        },
      })

      student.result.slice(8, 12).forEach((item, i) => {
        const emoticon = getEmoticon(item.skor)
        const xPos = getXPosValue(item.skor)
        const rowHeight = 9
        const yPos = startY + (i + 1.1) * rowHeight
        doc.addImage(emoticon, 'PNG', xPos as number, yPos, 6, 6)
      })

      doc.setFontSize(12)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor('#000')

      doc.addImage(sadEmot, 'PNG', 26, 200, 9, 9)
      doc.text('Perlu Penguatan', 40, 206)
      doc.addImage(netralEmot, 'PNG', 26, 210, 9, 9)
      doc.text('Perlu Perhatian', 40, 216)
      doc.addImage(smileEmot, 'PNG', 26, 220, 9, 9)
      doc.text('Cukup Berkembang', 40, 226)
      doc.addImage(shyEmot, 'PNG', 26, 230, 9, 9)
      doc.text('Unggul', 40, 236)
      doc.addImage(starEmot, 'PNG', 26, 240, 9, 9)
      doc.text('Sangat Unggul', 40, 246)

      // ==== HALAMAN 4 TABEL HASIL ASPEK KEMAMPUAN BERPIKIR ====
      doc.addPage()
      doc.setFontSize(14)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(255, 255, 255)
      doc.setFillColor(51, 171, 161)
      doc.rect(20, 20, doc.internal.pageSize.getWidth() - 40, 17, 'F')
      doc.text('Tabel Kemampuan Berpikir', 210 / 2, 28, { align: 'center' })
      startY = 32

      const rowData: { y: number; height: number }[] = []
      autoTable(doc, {
        head: [['Aspek', 'Definisi Aspek', 'Nilai', ' Deskripsi Nilai']],
        body: student.result
          .slice(0, 5)
          .map((item) => [item.aspek, item.definisi_aspek, '', item.hasil]),
        startY,
        margin: { vertical: 20, horizontal: 20 },
        theme: 'striped',
        headStyles: {
          fillColor: '#51A2FF',
          textColor: '#fff',
          fontStyle: 'bold',
          halign: 'center',
          valign: 'middle',
          lineColor: '#000',
        },
        styles: {
          fontSize: 12,
          cellPadding: 2,
          textColor: '#000',
          valign: 'middle',
          lineColor: '#000',
        },
        columnStyles: {
          0: { halign: 'center', valign: 'middle', fontStyle: 'bold', cellWidth: 32 },
          1: { textColor: '#000', fontSize: 11, cellWidth: 50, valign: 'top' },
          2: { textColor: '#000', cellWidth: 30 },
          3: { textColor: '#000', fontSize: 11, valign: 'top' },
        },
        didDrawCell: (data) => {
          // Store row position and height for body rows
          if (data.section === 'body' && data.column.index === 0) {
            rowData[data.row.index] = {
              y: data.cell.y,
              height: data.cell.height,
            }
          }
        },
      })

      // Place emojis using dynamic row data
      aspekKemampuanBerpikirEmoji.forEach((item, i) => {
        const emoticon = item
        const xPos = 34 // Fixed horizontal position
        // Center the emoji vertically: row's y position + half the row height - half the emoji height
        const yPos = rowData[i].y + rowData[i].height / 2 - 14 // Emoji height is 6, so half is 3
        doc.addImage(emoticon, 'PNG', xPos, yPos, 6, 6)
      })

      student.result.slice(0, 5).forEach((item, i) => {
        const emoticon = getEmotResult(item.skor)
        const xPos = item.skor > 1 ? 110 : 111
        // Center the emoji vertically: row's y position + half the row height - half the emoji height
        const yPos = rowData[i].y + rowData[i].height / 2 - (item.skor > 1 ? 7.5 : 6) // Emoji height is 15 or 12
        doc.addImage(emoticon, 'PNG', xPos, yPos, item.skor > 1 ? 15 : 12, item.skor > 1 ? 15 : 12)
      })

      // ==== HALAMAN 5 TABEL HASIL ASPEK SIKAP KERJA ====
      doc.addPage()
      doc.setFontSize(14)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(255, 255, 255)
      doc.setFillColor(51, 171, 161)
      doc.rect(20, 20, doc.internal.pageSize.getWidth() - 40, 17, 'F')
      doc.text('Tabel Sikap Kerja', 210 / 2, 28, { align: 'center' })
      startY = 32

      autoTable(doc, {
        head: [['Aspek', 'Definisi Aspek', 'Nilai', ' Deskripsi Nilai']],
        body: student.result
          .slice(5, 8)
          .map((item) => [item.aspek, item.definisi_aspek, '', item.hasil]),
        startY,
        margin: { vertical: 20, horizontal: 20 },
        theme: 'striped',
        headStyles: {
          fillColor: '#05DF72',
          textColor: '#fff',
          fontStyle: 'bold',
          halign: 'center',
          valign: 'middle',
          lineColor: '#000',
        },
        styles: {
          fontSize: 12,
          cellPadding: 2,
          textColor: '#000',
          valign: 'middle',
          lineColor: '#000',
        },
        columnStyles: {
          0: { halign: 'center', valign: 'middle', fontStyle: 'bold', cellWidth: 32 },
          1: { textColor: '#000', fontSize: 11, cellWidth: 50, valign: 'top' },
          2: { textColor: '#000', cellWidth: 30 },
          3: { textColor: '#000', fontSize: 11, valign: 'top' },
        },
        didDrawCell: (data) => {
          // Store row position and height for body rows
          if (data.section === 'body' && data.column.index === 0) {
            rowData[data.row.index] = {
              y: data.cell.y,
              height: data.cell.height,
            }
          }
        },
      })

      aspekSikapKerjaEmoji.forEach((item, i) => {
        const emoticon = item
        const xPos = 34 // Fixed horizontal position
        // Center the emoji vertically: row's y position + half the row height - half the emoji height
        const yPos = rowData[i].y + rowData[i].height / 2 - 14 // Emoji height is 6, so half is 3
        doc.addImage(emoticon, 'PNG', xPos, yPos, 6, 6)
      })

      student.result.slice(5, 8).forEach((item, i) => {
        const emoticon = getEmotResult(item.skor)
        const xPos = item.skor > 1 ? 110 : 111
        // Center the emoji vertically: row's y position + half the row height - half the emoji height
        const yPos = rowData[i].y + rowData[i].height / 2 - (item.skor > 1 ? 7.5 : 6) // Emoji height is 15 or 12
        doc.addImage(emoticon, 'PNG', xPos, yPos, item.skor > 1 ? 15 : 12, item.skor > 1 ? 15 : 12)
      })

      // ==== HALAMAN 6 TABEL HASIL ASPEK KEPRIBADIAN ====
      doc.addPage()
      doc.setFontSize(14)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(255, 255, 255)
      doc.setFillColor(51, 171, 161)
      doc.rect(20, 20, doc.internal.pageSize.getWidth() - 40, 17, 'F')
      doc.text('Tabel Kepribadian', 210 / 2, 28, { align: 'center' })
      startY = 32

      autoTable(doc, {
        head: [['Aspek', 'Definisi Aspek', 'Nilai', ' Deskripsi Nilai']],
        body: student.result
          .slice(8, 12)
          .map((item) => [item.aspek, item.definisi_aspek, '', item.hasil]),
        startY,
        margin: { vertical: 20, horizontal: 20 },
        theme: 'striped',
        headStyles: {
          fillColor: '#FF8904',
          textColor: '#fff',
          fontStyle: 'bold',
          halign: 'center',
          valign: 'middle',
          lineColor: '#000',
        },
        styles: {
          fontSize: 12,
          cellPadding: 2,
          textColor: '#000',
          valign: 'middle',
          lineColor: '#000',
        },
        columnStyles: {
          0: { halign: 'center', valign: 'middle', fontStyle: 'bold', cellWidth: 32 },
          1: { textColor: '#000', fontSize: 11, cellWidth: 50, valign: 'top' },
          2: { textColor: '#000', cellWidth: 30 },
          3: { textColor: '#000', fontSize: 11, valign: 'top' },
        },
        didDrawCell: (data) => {
          // Store row position and height for body rows
          if (data.section === 'body' && data.column.index === 0) {
            rowData[data.row.index] = {
              y: data.cell.y,
              height: data.cell.height,
            }
          }
        },
      })

      aspekKepribadianEmoji.forEach((item, i) => {
        const emoticon = item
        const xPos = 34 // Fixed horizontal position
        // Center the emoji vertically: row's y position + half the row height - half the emoji height
        const yPos = rowData[i].y + rowData[i].height / 2 - 14 // Emoji height is 6, so half is 3
        doc.addImage(emoticon, 'PNG', xPos, yPos, 6, 6)
      })

      student.result.slice(8, 12).forEach((item, i) => {
        const emoticon = getEmotResult(item.skor)
        const xPos = item.skor > 1 ? 110 : 111
        // Center the emoji vertically: row's y position + half the row height - half the emoji height
        const yPos = rowData[i].y + rowData[i].height / 2 - (item.skor > 1 ? 7.5 : 6) // Emoji height is 15 or 12
        doc.addImage(emoticon, 'PNG', xPos, yPos, item.skor > 1 ? 15 : 12, item.skor > 1 ? 15 : 12)
      })

      const pdfBlob = doc.output('blob')
      const filename = `Psikogram-${student.name?.replace(/\s+/g, '_') || 'Siswa'}.pdf`
      zip.file(filename, pdfBlob)
    }

    zip.generateAsync({ type: 'blob' }).then((content) => {
      saveAs(content, 'Laporan-Psikogram-Siswa.zip')
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
    class="bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-2 px-4 rounded-md mb-4 block ml-auto"
    :disabled="isLoading"
  >
    {{ isLoading ? 'Membuat PDF...' : 'Export Data' }}
  </button>
</template>
