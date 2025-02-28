export const getViolationWarning = (violationType: string) => {
  // Customize message based on violation type
  switch (violationType) {
    case 'Tab switching detected':
      return 'Warning: Anda berpindah tab! Tindakan ini dicatat dan dapat mempengaruhi nilai Anda.'
    case 'Window focus lost':
      return 'Warning: Anda beralih ke aplikasi lain! Tindakan ini dicatat dan dapat mempengaruhi nilai Anda.'
    case 'Exited fullscreen mode':
      return 'Warning: Anda keluar dari mode layar penuh! Tindakan ini dicatat dan dapat mempengaruhi nilai Anda.'
    case 'Right-click detected':
      return 'Warning: Klik kanan tidak diizinkan selama ujian! Tindakan ini dicatat dan dapat mempengaruhi nilai Anda.'
    case 'Mouse left browser window':
      return 'Warning: Gerakan mouse mencurigakan terdeteksi! Tindakan ini dicatat dan dapat mempengaruhi nilai Anda.'
    default:
      if (violationType.includes('Keyboard shortcut detected')) {
        return 'Warning: Penggunaan shortcut keyboard terdeteksi! Tindakan ini dicatat dan dapat mempengaruhi nilai Anda.'
      } else {
        return 'Warning: Tindakan mencurigakan terdeteksi! Tindakan ini dicatat dan dapat mempengaruhi nilai Anda.'
      }
  }
}
