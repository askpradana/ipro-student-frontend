<template>
  <div class="mx-auto p-4 bg-slate-200">
    <router-link
      to="/admin/dashboard"
      class="block my-4 bg-red-400 text-white px-4 py-2 rounded-lg transition duration-150 hover:bg-red-500 size-fit"
      >Back to Dashboard</router-link
    >

    <div class="bg-white rounded-lg shadow-lg p-6">
      <div class="bg-gradient-to-r from-slate-600 to-emerald-700-500 text-white rounded-t-lg p-4">
        <div class="h-8 min-w-[150px] rounded-md bg-slate-50 animate-pulse"></div>
        <div class="mt-2 h-4 min-w-[200px] bg-slate-50 rounded-md animate-pulse"></div>
      </div>

      <div class="bg-white p-4 rounded-b-lg">
        <div
          class="text-center text-slate-700 text-sm mb-8 mt-4 flex justify-center items-center gap-2"
        >
          <div class="bg-slate-200 w-[100px] h-4 rounded-md animate-pulse"></div>
          <div class="bg-slate-200 w-[100px] h-4 rounded-md animate-pulse"></div>
          <div class="bg-slate-200 w-[100px] h-4 rounded-md animate-pulse"></div>
          <div class="bg-slate-200 w-[100px] h-4 rounded-md animate-pulse"></div>
          <div class="bg-slate-200 w-[100px] h-4 rounded-md animate-pulse"></div>
        </div>

        <!-- Loading Skeleton -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div
            v-for="index in 6"
            :key="index"
            class="bg-slate-200 p-6 rounded-lg shadow animate-pulse"
          >
            <h3 class="font-bold text-slate-600 h-4 bg-slate-300 rounded w-1/2 mb-2"></h3>
            <div class="h-2 w-1/2 bg-slate-200 rounded mb-2"></div>
            <div class="h-10 w-full bg-slate-300 rounded"></div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 mt-8">
          <div
            v-for="index in 6"
            :key="index"
            class="bg-slate-200 p-6 rounded-lg shadow animate-pulse"
          >
            <h3 class="font-bold text-slate-600 h-4 bg-slate-300 rounded w-1/2 mb-2"></h3>
            <div class="h-2 w-1/2 bg-slate-200 rounded mb-2"></div>
            <div class="h-10 w-full bg-slate-300 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
