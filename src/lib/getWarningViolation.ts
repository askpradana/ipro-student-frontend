export const getViolationWarning = (violationType: string) => {
  // Customize message based on violation type
  switch (violationType) {
    case 'Tab switching detected':
      return 'Anda berpindah tab! Tindakan ini dicatat dan dapat mempengaruhi nilai Anda.'
    case 'Window focus lost':
      return 'Anda beralih ke aplikasi lain! Tindakan ini dicatat dan dapat mempengaruhi nilai Anda.'
    case 'Exited fullscreen mode':
      return 'Anda keluar dari mode layar penuh! Tindakan ini dicatat dan dapat mempengaruhi nilai Anda.'
    case 'Right-click detected':
      return 'Klik kanan tidak diizinkan selama ujian! Tindakan ini dicatat dan dapat mempengaruhi nilai Anda.'
    case 'Mouse left browser window':
      return 'Gerakan mouse mencurigakan terdeteksi! Tindakan ini dicatat dan dapat mempengaruhi nilai Anda.'
    default:
      if (violationType.includes('Keyboard shortcut detected')) {
        return 'Penggunaan shortcut keyboard terdeteksi! Tindakan ini dicatat dan dapat mempengaruhi nilai Anda.'
      } else {
        return 'Tindakan mencurigakan terdeteksi! Tindakan ini dicatat dan dapat mempengaruhi nilai Anda.'
      }
  }
}
