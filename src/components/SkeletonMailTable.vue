<script setup lang="ts"></script>

<template>
<!-- <div class="px-2 md:px-0">
        <div class="max-w-1000px m-auto border-collapse border-t-2 border-black">
            <div 
            class="md:grid grid-cols-12 border-b border-gray-700 py-2 px-1 w-full">
                <div class="col-span-3 text-left space-x-3 flex">
                    <input 
                    type="checkbox">
                    <span class="overflow-hidden whitespace-nowrap overflow-ellipsis"> email.from</span>
                </div>
                <div class="col-span-6 h-full flex items-center text-left overflow-hidden whitespace-nowrap overflow-ellipsis text-sm mt-2 md:(text-15px mt-0)">
                    <strong> email.subject</strong>
                    <span class="hidden md:inline-block overflow-hidden whitespace-nowrap overflow-ellipsis"> - email.body</span>
                </div>
                <div class="md:hidden pt-1 space-x-3 overflow-hidden whitespace-nowrap overflow-ellipsis text-left w-full flex justify-between items-center">
                    <span class="text-sm overflow-hidden whitespace-nowrap overflow-ellipsis"> email.body </span>
                    <span class="text-xs text-red-800"> email.sentAt</span>
                </div>
                <div class="col-span-2 tex-center hidden md:block">email.sentAt </div>
                <div>
                    <button 
                    class="bg-gray-500 px-2 py-1 hidden md:block text-white col-span-1">
                        archive
                    </button>
                </div>
            </div>
        </div>
    </div> -->
    <h1 class="skeleton w-24 h-5 rounded-lg mb-5 block mx-auto"></h1>
    <div class="max-w-1000px flex mx-auto items-center justify-center gap-2 mb-5">
        <p class="skeleton w-16 h-7 rounded-sm"></p>
        <p class="skeleton w-16 h-7 rounded-sm"></p>
    </div>
    <div class="max-w-1000px text-left mx-auto mb-5 flex mt-10 pl-1 md:mt-0">
        <p class="input-skeleton border-6 border-solid w-7 h-7 rounded-sm"></p>
        <div class="buttons ml-2 flex flex-wrap gap-4 justify-center">
            <p class="skeleton w-20 h-8 rounded-sm"></p>
            <p class="skeleton w-20 h-8 rounded-sm"></p>
            <p class="skeleton w-20 h-8 rounded-sm"></p>
            <p class="skeleton w-20 h-8 rounded-sm"></p>
        </div>
    </div>
    <div class="max-w-1000px m-auto border-collapse border-t-2 border-black">
            <div 
            class="md:grid md:space-x-4 grid-cols-12 border-b border-gray-700 py-3 px-1 w-full"
            v-for="index of 9" :key="index">
                <div class="col-span-3 text-left space-x-3 flex items-center justify-start">
                    <p class="w-7 h-7 input-skeleton border-6 border-solid h-7 rounded-sm"></p>
                    <p class="w-full skeleton h-5 rounded-lg"></p>
                </div>
                <div class="col-span-6 h-full flex items-center text-left mt-2 md:mt-0">
                    <p class="w-full skeleton h-4 rounded-lg"></p>
                </div>
                <div class="md:hidden pt-3 space-x-3 text-left w-full flex justify-between items-center">
                    <p class="w-3/5 skeleton h-3 rounded-lg"></p>
                    <p class="w-1/5 skeleton h-2 rounded-lg"></p>
                </div>
                <div class="col-span-2 tex-center hidden items-center md:flex">
                    <p class="w-full skeleton h-4 rounded-lg"></p>
                </div>
                <div class=" hidden md:block col-span-1">
                    <p class="w-full skeleton h-7 rounded-sm"></p>
                </div>
            </div>
    </div>
</template>

<style>
.skeleton {
  animation: skeleton-loading 0.5s linear infinite alternate;
}

.input-skeleton {
    animation: input-loading 0.5s linear infinite alternate;
}

@keyframes skeleton-loading {
  0% {
    background-color: hsl(200, 20%, 75%);
  }

  100% {
    background-color: hsl(200, 20%, 85%);
  }
}

@keyframes input-loading {
  0% {
    border-color: hsl(200, 20%, 75%);
  }

  100% {
    border-color: hsl(200, 20%, 85%);
  }
}
</style>