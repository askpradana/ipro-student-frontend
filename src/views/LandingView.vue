<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-slate-800">
    <!-- Header Section -->
    <header class="max-w-6xl mx-auto p-4 sm:p-6">
      <div class="flex justify-between items-center mb-8 sm:mb-16">
        <img src="/assets/iradat-konsultan.png" height="80" width="80" alt="company-profile" />
        <RouterLink
          to="/login"
          class="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all duration-300 shadow-lg hover:shadow-teal-500/25 text-sm sm:text-base"
        >
          Masuk
        </RouterLink>
      </div>

      <!-- Hero Section -->
      <div class="text-center mb-16 sm:mb-24 animate-slide-up">
        <h1
          class="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-teal-600 via-emerald-600 to-green-600 bg-clip-text text-transparent"
        >
          I-PRO Student
        </h1>
        <p class="text-lg sm:text-xl mb-8 sm:mb-12 text-slate-600 max-w-2xl mx-auto px-4">
          Aplikasi profiling potensi diri didesain khusus bagi pelajar. Kenali potensi kecerdasan,
          sikap dan cara kerja dan kepribadianmu melalui aplikasi digital yang moderen dan
          terpercaya
        </p>
        <RouterLink to="/login">
          <button
            class="px-6 sm:px-8 py-3 sm:py-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-teal-500/25"
          >
            Mulai Tes
          </button>
        </RouterLink>
      </div>
    </header>

    <!-- Features Grid -->
    <section class="max-w-6xl mx-auto mb-16 sm:mb-24 px-4 md:px-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <div
          class="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
        >
          <div class="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
            <span class="text-2xl text-teal-600">🧠</span>
          </div>
          <h3 class="text-xl font-semibold mb-3">Kemampuan Berfikir</h3>
          <p class="text-slate-600">Kenali potensi kemampuanmu memecahkan masalah.</p>
        </div>
        <div
          class="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
        >
          <div class="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
            <span class="text-2xl text-emerald-600">📚</span>
          </div>
          <h3 class="text-xl font-semibold mb-3">Sikap Kerja</h3>
          <p class="text-slate-600">Kenali kecenderungan sikap atau caramu menyelesaikan tugas.</p>
        </div>
        <div
          class="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
        >
          <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <span class="text-2xl text-green-600">🎯</span>
          </div>
          <h3 class="text-xl font-semibold mb-3">Kepribadian</h3>
          <p class="text-slate-600">
            Kenali kecenderunganmu dalam berinteraksi dengan orang lain, motivasi diri dan
            menyesuaikan diri.
          </p>
        </div>
      </div>
    </section>

    <!-- Statistics Section -->
    <section class="bg-white py-12 sm:py-16 mb-16 sm:mb-24">
      <div class="max-w-6xl mx-auto px-4 md:px-6">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div class="text-center">
            <p class="text-4xl font-bold text-teal-600 mb-2">50,000+</p>
            <p class="text-slate-600">Students Tested</p>
          </div>
          <div class="text-center">
            <p class="text-4xl font-bold text-emerald-600 mb-2">95%</p>
            <p class="text-slate-600">Accuracy Rate</p>
          </div>
          <div class="text-center">
            <p class="text-4xl font-bold text-green-600 mb-2">200+</p>
            <p class="text-slate-600">Partner Schools</p>
          </div>
          <div class="text-center">
            <p class="text-4xl font-bold text-teal-600 mb-2">15+</p>
            <p class="text-slate-600">Test Categories</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="max-w-6xl mx-auto mb-16 sm:mb-24 px-4 md:px-6">
      <h2 class="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">
        Bagaimana Cara Kerjanya?
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
        <!-- Step 1 -->
        <div
          class="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
        >
          <div
            class="w-48 h-48 sm:w-56 sm:h-56 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <img
              src="/assets/landing/1.png"
              alt="Ikuti Tes - Ikon tes online"
              class="w-full h-full object-cover"
            />
          </div>
          <h3 class="text-xl font-semibold mb-3">Ikuti Tes-nya</h3>
          <p class="text-slate-600">Kerjakan tes ini dengan mudah dan nyaman secara online</p>
        </div>

        <!-- Step 2 -->
        <div
          class="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
        >
          <div
            class="w-48 h-48 sm:w-56 sm:h-56 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <img
              src="/assets/landing/2.png"
              alt="Hasil Tes - Ikon analisis hasil"
              class="w-full h-full object-cover"
            />
          </div>
          <h3 class="text-xl font-semibold mb-3">Dapatkan Hasil</h3>
          <p class="text-slate-600">
            Temukan sisi unik kepribadian kamu yang mungkin belum kamu sadari
          </p>
        </div>

        <!-- Step 3 -->
        <div
          class="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
        >
          <div
            class="w-48 h-48 sm:w-56 sm:h-56 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <img
              src="/assets/landing/3.png"
              alt="Panduan Personal - Ikon rekomendasi"
              class="w-full h-full object-cover"
            />
          </div>
          <h3 class="text-xl font-semibold mb-3">Panduan Personal</h3>
          <p class="text-slate-600">Dapatkan panduan yang disesuaikan dengan potensi dan minatmu</p>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="max-w-6xl mx-auto mb-16 sm:mb-24 px-4 md:px-6">
      <div
        class="bg-gradient-to-br from-teal-600 to-emerald-600 rounded-2xl p-8 sm:p-12 text-center text-white"
      >
        <h2 class="text-3xl font-bold mb-6">Siap Menggali Potensimu?</h2>
        <p class="text-lg mb-8 max-w-2xl mx-auto">
          Bergabunglah dengan ribuan pelajar yang telah menemukan kekuatan akademis dan arah karier
          mereka melalui tes ini.
        </p>
        <RouterLink to="/login">
          <button
            class="px-8 py-4 bg-white text-teal-600 rounded-lg hover:bg-slate-100 transition-all"
          >
            Mulai Tes
          </button>
        </RouterLink>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-white">
      <div class="mx-auto max-w-screen-xl px-4 pb-6 pt-16 sm:px-6 lg:px-8 lg:pt-24">
        <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <img
              src="/assets/iradat-konsultan.png"
              height="80"
              width="80"
              alt="company-profile"
              class="select-none"
            />

            <p
              class="mt-6 max-w-md text-center leading-relaxed text-gray-500 sm:max-w-xs sm:text-left"
            >
              PT Iradat, konsultan SDM berpengalaman lebih dari 40 tahun, terus berinovasi dengan
              menghadirkan solusi yang relevan dan berkelanjutan dalam pengembangan Sumber Daya
              Manusia. Menjawab kebutuhan industri yang makin berkembang, kami telah mengembangkan
              layanan psikotes online yang praktis, fleksibel, dan tetap menjunjung tinggi etika
              profesi psikologi. Dalam industri pendidikan, PT Iradat mengembangkan IPro Student,
              layanan psikotes berbasis online yang membantu mengenali potensi siswa secara
              menyeluruh, termasuk kapasitas berpikir, kepribadian, yang mendukung pengembangan diri
              yang optimal untuk masa depan
            </p>

            <ul class="mt-8 flex justify-center gap-6 sm:justify-start md:gap-8">
              <li>
                <a
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                  class="text-teal-700 transition hover:text-teal-700/75"
                >
                  <span class="sr-only">Facebook</span>
                  <svg class="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fill-rule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href="https://www.instagram.com/iradat.konsultan/"
                  rel="noreferrer"
                  target="_blank"
                  class="text-teal-700 transition hover:text-teal-700/75"
                >
                  <span class="sr-only">Instagram</span>
                  <svg class="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fill-rule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                  class="text-teal-700 transition hover:text-teal-700/75"
                >
                  <span class="sr-only">Twitter</span>
                  <svg class="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
                    />
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href="https://iradatkonsultan.com"
                  rel="noreferrer"
                  target="_blank"
                  class="text-teal-700 transition hover:text-teal-700/75"
                >
                  <span class="sr-only">Website</span>
                  <svg
                    class="size-6"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#0e766e"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M20.501 6.028V6h-.02A10.28 10.28 0 0 0 4.519 6H4.5v.028a10.262 10.262 0 0 0 0 12.944V19h.02a10.28 10.28 0 0 0 15.962 0h.021v-.028a10.262 10.262 0 0 0 0-12.944zM13 6V3.272A4.533 4.533 0 0 1 15.54 6zm2.935 1a16.827 16.827 0 0 1 .853 5H13V7zM12 3.272V6H9.46A4.533 4.533 0 0 1 12 3.272zM12 7v5H8.212a16.827 16.827 0 0 1 .853-5zm-4.787 5H3.226a9.234 9.234 0 0 1 1.792-5h2.984a17.952 17.952 0 0 0-.79 5zm0 1a17.952 17.952 0 0 0 .789 5H5.018a9.234 9.234 0 0 1-1.792-5zm1 0H12v5H9.065a16.827 16.827 0 0 1-.853-5zM12 19v2.728A4.533 4.533 0 0 1 9.46 19zm1 2.728V19h2.54A4.533 4.533 0 0 1 13 21.728zM13 18v-5h3.788a16.827 16.827 0 0 1-.853 5zm4.787-5h3.987a9.234 9.234 0 0 1-1.792 5h-2.984a17.952 17.952 0 0 0 .79-5zm0-1a17.952 17.952 0 0 0-.789-5h2.984a9.234 9.234 0 0 1 1.792 5zm1.352-6h-2.501a8.524 8.524 0 0 0-1.441-2.398A9.306 9.306 0 0 1 19.139 6zM9.803 3.602A8.524 8.524 0 0 0 8.363 6H5.86a9.306 9.306 0 0 1 3.942-2.398zM5.861 19h2.501a8.524 8.524 0 0 0 1.441 2.398A9.306 9.306 0 0 1 5.861 19zm9.336 2.398A8.524 8.524 0 0 0 16.637 19h2.502a9.306 9.306 0 0 1-3.942 2.398z"
                      ></path>
                      <path fill="none" d="M0 0h24v24H0z"></path>
                    </g>
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                  class="text-teal-700 transition hover:text-teal-700/75"
                >
                  <span class="sr-only">Dribbble</span>
                  <svg class="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fill-rule="evenodd"
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:col-span-2">
            <div class="text-center sm:text-left">
              <p class="text-lg font-medium text-gray-900">About Us</p>

              <ul class="mt-8 space-y-4 text-sm">
                <li>
                  <a class="text-gray-700 transition hover:text-gray-700/75" href="#">
                    Company History
                  </a>
                </li>

                <li>
                  <a class="text-gray-700 transition hover:text-gray-700/75" href="#">
                    Meet the Team
                  </a>
                </li>

                <li>
                  <a class="text-gray-700 transition hover:text-gray-700/75" href="#">
                    Employee Handbook
                  </a>
                </li>

                <li>
                  <a class="text-gray-700 transition hover:text-gray-700/75" href="#"> Careers </a>
                </li>
              </ul>
            </div>

            <div class="text-center sm:text-left">
              <p class="text-lg font-medium text-gray-900">Our Services</p>

              <ul class="mt-8 space-y-4 text-sm">
                <li>
                  <a class="text-gray-700 transition hover:text-gray-700/75" href="#">
                    Web Development
                  </a>
                </li>

                <li>
                  <a class="text-gray-700 transition hover:text-gray-700/75" href="#">
                    Web Design
                  </a>
                </li>

                <li>
                  <a class="text-gray-700 transition hover:text-gray-700/75" href="#">
                    Marketing
                  </a>
                </li>

                <li>
                  <a class="text-gray-700 transition hover:text-gray-700/75" href="#">
                    Google Ads
                  </a>
                </li>
              </ul>
            </div>

            <div class="text-center sm:text-left">
              <p class="text-lg font-medium text-gray-900">Helpful Links</p>

              <ul class="mt-8 space-y-4 text-sm">
                <li>
                  <a class="text-gray-700 transition hover:text-gray-700/75" href="#"> FAQs </a>
                </li>

                <li>
                  <a class="text-gray-700 transition hover:text-gray-700/75" href="#"> Support </a>
                </li>
              </ul>
            </div>

            <div class="text-center sm:text-left">
              <p class="text-lg font-medium text-gray-900">Hubungi Kami</p>

              <ul class="mt-8 space-y-4 text-sm">
                <li>
                  <a
                    class="flex items-center justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
                    href="mailto:support-ipro@iradatkonsultan.co"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="size-5 shrink-0 text-gray-900"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>

                    <span class="flex-1 text-gray-700">ipro@iradat.com</span>
                  </a>
                </li>

                <li>
                  <a
                    class="flex items-center justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
                    href="#"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="size-5 shrink-0 text-gray-900"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>

                    <span class="flex-1 text-gray-700">+62-123456789</span>
                  </a>
                </li>

                <li
                  class="flex items-start justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="size-5 shrink-0 text-gray-900"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>

                  <address class="-mt-0.5 flex-1 not-italic text-gray-700">
                    Gedung Vinilon lt 3, Suite 3-5 Jl. Raden Saleh No 13-17 Jakarta10430
                  </address>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="mt-12 border-t border-gray-100 pt-6">
          <div class="text-center sm:flex sm:justify-between sm:text-left">
            <p class="text-sm text-gray-500">
              <span class="block sm:inline">All rights reserved.</span>

              <a
                class="inline-block text-teal-600 underline transition hover:text-teal-600/75"
                href="#"
              >
                Terms & Conditions
              </a>

              <span>&middot;</span>

              <a
                class="inline-block text-teal-600 underline transition hover:text-teal-600/75"
                href="#"
              >
                Privacy Policy
              </a>
            </p>

            <p class="mt-4 text-sm text-gray-500 sm:order-first sm:mt-0">
              &copy; 2025 Iradat Konsultan
            </p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
<script setup lang="ts"></script>
