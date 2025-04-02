<script setup lang="ts">
import { ref } from 'vue'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { type PsikogramExportDataInterface } from '@/types/calculateTypes'
import { getExportAll } from '@/api/getExportAll'
import sadEmot from '/assets/emoji/sad.png'
import netralEmot from '/assets/emoji/netral.png'
import smileEmot from '/assets/emoji/smile.png'
import shyEmot from '/assets/emoji/shy.png'
import starEmot from '/assets/emoji/star.png'

const dataNilaiSiswa = ref<PsikogramExportDataInterface>()
const isLoading = ref(false)

const getEmoticon = (skor: number) => {
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

const exportToPDF = async () => {
  isLoading.value = true

  try {
    const response = await getExportAll()
    dataNilaiSiswa.value = response

    if (!dataNilaiSiswa.value?.data?.length) {
      console.error('Tidak ada data untuk diexport')
      alert('Tidak ada data untuk diexport')
      return
    }

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    })

    const aspekKemampuanBerpikir = [
      'Kecerdasan Umum',
      'Penalaran Numerik',
      'Penalaran Verbal',
      'Penalaran Non Verbal',
      'Kecepatan Perseptual',
    ]

    const aspekSikapKerja = ['Ketelitian Kerja', 'Sistematik Kerja', 'Ketangguhan']

    const aspekKepribadian = [
      'Penyesuaian Diri',
      'Hubungan Interpersonal',
      'Motivasi Berprestasi',
      'Kemandirian',
    ]

    dataNilaiSiswa.value.data.forEach((student, index) => {
      if (index > 0) {
        doc.addPage()
      }

      // Add header
      doc.setFontSize(14)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(255, 255, 255)
      doc.setFillColor(51, 171, 161)
      doc.rect(20, 20, doc.internal.pageSize.getWidth() - 40, 17, 'F')
      doc.text('Tabel Psikogram Murid', 22, 27)

      doc.setFontSize(10)
      doc.setFont('helvetica', 'normal')
      doc.addFont('/assets/fonts/DejaVuSans.ttf', 'DejaVu', 'normal')
      doc.setFont('DejaVu')

      doc.text(
        `${student?.name ? student.name.toUpperCase() : 'NAMA TIDAK TERSEDIA 😊 🙂 😐 🥺 🌟'} - Kelas ${student?.grade || 'N/A'} - ${student?.phone_number || 'No. Telp Tidak Tersedia'}`,
        22,
        33,
      )

      // Pastikan result ada dan jumlahnya sesuai
      if (!student?.result || !Array.isArray(student.result)) {
        console.error('Data result tidak valid', student)
        return
      }

      // Start position for first table
      let startY = 38

      // 1. Table Kemampuan Berpikir
      autoTable(doc, {
        head: [['Kemampuan Berpikir', 'Analisa', 'Nilai']],
        body: student.result
          .slice(0, 5)
          .map((item, i) => [aspekKemampuanBerpikir[i], item?.deskripsi, '']),
        startY,
        margin: { vertical: 20, horizontal: 20 },
        theme: 'striped', // Tambahkan tema untuk tampilan lebih rapi
        tableWidth: 'auto',
        headStyles: {
          fontSize: 10,
          fillColor: '#51A2FF',
          textColor: '#fff',
          fontStyle: 'bold',
          halign: 'center',
          lineColor: '#000',
        },
        styles: {
          fontSize: 10,
          cellPadding: 2,
          textColor: '#000',
          valign: 'middle',
        },
        columnStyles: {
          0: { cellWidth: 'auto', fontStyle: 'bold' },
          1: { cellWidth: 'auto', halign: 'justify', overflow: 'linebreak' },
          2: { cellWidth: 'auto', halign: 'center', valign: 'middle', font: 'DejaVu' },
        },
      })

      student.result.slice(0, 5).forEach((item, i) => {
        const emoticon = getEmoticon(item.skor)
        const xPos = 181 // Geser kanan kiri semakin besar semakin ke kanan
        const rowHeight = 16 // Tinggi per baris dalam tabel (jarak antar emoji)
        const yPos = startY + (i + 1.2) * rowHeight - 0 // Perbaiki posisi vertikal
        doc.addImage(emoticon, 'PNG', xPos, yPos, 6, 6)
      })

      startY = (doc as any).lastAutoTable.finalY

      // 2. Table Sikap Kerja
      autoTable(doc, {
        head: [['Sikap Kerja', 'Analisa', 'Nilai']],
        body: student.result
          .slice(5, 8)
          .map((item, i) => [aspekSikapKerja[i], item?.deskripsi, '']),
        startY,
        margin: { vertical: 20, horizontal: 20 },
        tableWidth: 'auto',
        headStyles: {
          fontSize: 10,
          fillColor: '#05DF72',
          textColor: '#fff',
          fontStyle: 'bold',
          halign: 'center',
          lineColor: '#000',
        },
        styles: {
          fontSize: 10,
          cellPadding: 2,
          textColor: '#000',
          valign: 'middle',
        },
        columnStyles: {
          0: { cellWidth: 'auto', fontStyle: 'bold' },
          1: { cellWidth: 'auto', halign: 'justify', overflow: 'linebreak' },
          2: { cellWidth: 'auto', halign: 'center', valign: 'middle' },
        },
      })

      student.result.slice(5, 8).forEach((item, i) => {
        const emoticon = getEmoticon(item.skor)
        const xPos = 181 // Geser kanan kiri semakin besar semakin ke kanan
        const rowHeight = 16 // Tinggi per baris dalam tabel (jarak antar emoji)
        const yPos = startY + (i + 0.8) * rowHeight - 0 // Perbaiki posisi vertikal
        doc.addImage(emoticon, 'PNG', xPos, yPos, 6, 6)
      })

      startY = (doc as any).lastAutoTable.finalY

      // 3. Table Kepribadian
      autoTable(doc, {
        head: [['Kepribadian', 'Analisa', 'Nilai']],
        body: student.result
          .slice(8, 12)
          .map((item, i) => [aspekKepribadian[i], item?.deskripsi, '']),
        startY,
        margin: { left: 20, right: 20 },
        tableWidth: 'auto',
        headStyles: {
          fontSize: 10,
          fillColor: 'FF8904',
          textColor: '#fff',
          fontStyle: 'bold',
          halign: 'center',
          lineColor: '#000',
        },
        styles: {
          fontSize: 10,
          cellPadding: 2,
          textColor: '#000',
          valign: 'middle',
        },
        columnStyles: {
          0: { cellWidth: 'auto', fontStyle: 'bold' },
          1: { cellWidth: 'auto', halign: 'justify', overflow: 'linebreak' },
          2: { cellWidth: 'auto', halign: 'center', valign: 'middle' },
        },
      })

      student.result.slice(8, 12).forEach((item, i) => {
        const emoticon = getEmoticon(item.skor)
        const xPos = 181 // Geser kanan kiri semakin besar semakin ke kanan
        const rowHeight = 16 // Tinggi per baris dalam tabel (jarak antar emoji)
        const yPos = startY + (i + 1) * rowHeight - 0 // Perbaiki posisi vertikal
        doc.addImage(emoticon, 'PNG', xPos, yPos, 6, 6)
      })
    })

    doc.save('Laporan-Psikogram-Siswa.pdf')
  } catch (error) {
    console.error('Gagal export PDF:', error)
    alert('Gagal export PDF, mohon ulangi sekali lagi')
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
