// src/composables/useQuizSecurity.ts
import { onMounted, onUnmounted, ref } from 'vue'
import { useQuizStore } from '@/stores/quizStore'

// Opsi konfigurasi untuk fitur keamanan
interface SecurityOptions {
  preventRightClick: boolean
  preventKeyboardShortcuts: boolean
  enforceFullscreen: boolean
  detectTabChange: boolean
  detectMouseLeave: boolean
  addWatermark: boolean
  warningCallback?: (type: string) => void
}

export function useQuizSecurity(
  options: SecurityOptions = {
    preventRightClick: true,
    preventKeyboardShortcuts: true,
    enforceFullscreen: false,
    detectTabChange: true,
    detectMouseLeave: true,
    addWatermark: false,
  },
) {
  const quizStore = useQuizStore()
  const isFullscreen = ref(!!document.fullscreenElement)

  // Fungsi untuk mencatat pelanggaran
  const logViolation = (type: string) => {
    // console.log(`Security violation detected: ${type}`)

    quizStore.recordViolation({
      type,
      timestamp: new Date().toISOString(),
      questionIndex: quizStore.currentQuestionIndex,
    })

    // Panggil callback untuk menampilkan peringatan jika ada
    if (options.warningCallback) {
      options.warningCallback(type)
    }
  }

  // 1. Deteksi Tab/Window Change
  const handleVisibilityChange = () => {
    if (document.hidden && options.detectTabChange) {
      logViolation('Tab switching detected')
    }
  }

  const handleWindowBlur = () => {
    if (options.detectTabChange) {
      logViolation('Window focus lost')
    }
  }

  // 2. Deteksi Fullscreen
  const enterFullscreen = () => {
    if (options.enforceFullscreen && !document.fullscreenElement) {
      const elem = document.documentElement
      if (elem.requestFullscreen) {
        elem
          .requestFullscreen()
          .then(() => {
            isFullscreen.value = true
          })
          .catch((err) => {
            console.error(`Error attempting to enable fullscreen: ${err.message}`)
          })
      }
    }
  }

  const exitFullscreen = () => {
    if (document.fullscreenElement) {
      document
        .exitFullscreen()
        .then(() => {
          isFullscreen.value = false
        })
        .catch((err) => {
          console.error(`Error attempting to exit fullscreen: ${err.message}`)
        })
    }
  }

  const handleFullscreenChange = () => {
    isFullscreen.value = !!document.fullscreenElement

    if (options.enforceFullscreen && !document.fullscreenElement) {
      logViolation('Exited fullscreen mode')
      // Opsional: kembali ke fullscreen setelah delay
      setTimeout(enterFullscreen, 1000)
    }
  }

  // 3. Deteksi Klik Kanan
  const handleContextMenu = (e: Event) => {
    if (options.preventRightClick) {
      e.preventDefault()
      logViolation('Right-click detected')
      return false
    }
  }

  // 4. Deteksi Keyboard Shortcut
  const handleKeyDown = (e: KeyboardEvent) => {
    if (!options.preventKeyboardShortcuts) return

    // Deteksi kombinasi tombol yang dicurigai
    if (
      (e.ctrlKey && (e.key === 'c' || e.key === 'v' || e.key === 'a')) ||
      (e.altKey && e.key === 'Tab') ||
      e.key === 'F12' ||
      (e.ctrlKey && e.shiftKey && e.key === 'i') ||
      (e.ctrlKey && e.shiftKey && e.key === 'c')
    ) {
      e.preventDefault()
      logViolation(
        `Keyboard shortcut detected: ${e.ctrlKey ? 'Ctrl+' : ''}${e.shiftKey ? 'Shift+' : ''}${e.altKey ? 'Alt+' : ''}${e.key}`,
      )
      return false
    }
  }

  // 5. Watermark untuk screenshot
  const addWatermark = (username: string) => {
    if (!options.addWatermark) return

    // Hapus watermark yang ada jika ada
    removeWatermark()

    // Buat konten watermark dengan username dan timestamp
    const watermark = document.createElement('div')
    watermark.id = 'quiz-watermark'
    watermark.style.position = 'fixed'
    watermark.style.top = '0'
    watermark.style.left = '0'
    watermark.style.width = '100%'
    watermark.style.height = '100%'
    watermark.style.opacity = '0.08'
    watermark.style.pointerEvents = 'none'
    watermark.style.zIndex = '1000'
    watermark.style.overflow = 'hidden'
    watermark.style.transform = 'rotate(-30deg)'
    watermark.style.userSelect = 'none'

    // Buat pola diagonal dari teks
    let watermarkHTML = ''
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        watermarkHTML += `<div style="margin: 50px">${username} - ${new Date().toLocaleString()}</div>`
      }
    }

    watermark.innerHTML = watermarkHTML
    document.body.appendChild(watermark)
  }

  const removeWatermark = () => {
    const existingWatermark = document.getElementById('quiz-watermark')
    if (existingWatermark) {
      document.body.removeChild(existingWatermark)
    }
  }

  // 6. Deteksi Mouse Leave
  const handleMouseLeave = (e: MouseEvent) => {
    if (options.detectMouseLeave) {
      // Hanya catat jika mouse benar-benar keluar dari jendela browser
      if (
        e.clientY <= 0 ||
        e.clientX <= 0 ||
        e.clientX >= window.innerWidth ||
        e.clientY >= window.innerHeight
      ) {
        logViolation('Mouse left browser window')
      }
    }
  }

  // Setup event listeners
  onMounted(() => {
    if (options.detectTabChange) {
      document.addEventListener('visibilitychange', handleVisibilityChange)
      window.addEventListener('blur', handleWindowBlur)
    }

    if (options.enforceFullscreen) {
      document.addEventListener('fullscreenchange', handleFullscreenChange)
      enterFullscreen()
    }

    if (options.preventRightClick) {
      document.addEventListener('contextmenu', handleContextMenu)
    }

    if (options.preventKeyboardShortcuts) {
      document.addEventListener('keydown', handleKeyDown)
    }

    if (options.detectMouseLeave) {
      document.addEventListener('mouseleave', handleMouseLeave)
    }
  })

  // Clean up event listeners
  onUnmounted(() => {
    document.removeEventListener('visibilitychange', handleVisibilityChange)
    window.removeEventListener('blur', handleWindowBlur)
    document.removeEventListener('fullscreenchange', handleFullscreenChange)
    document.removeEventListener('contextmenu', handleContextMenu)
    document.removeEventListener('keydown', handleKeyDown)
    document.removeEventListener('mouseleave', handleMouseLeave)

    // Hapus watermark jika ada
    removeWatermark()

    // Keluar dari fullscreen jika masih aktif
    if (document.fullscreenElement) {
      exitFullscreen()
    }
  })

  return {
    enterFullscreen,
    exitFullscreen,
    isFullscreen,
    addWatermark,
    removeWatermark,
    logViolation,
  }
}
