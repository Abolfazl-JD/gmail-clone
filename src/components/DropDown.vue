<script lang="ts" setup>
import { ref } from 'vue'

const showDropDownMenu = ref(false)
</script>

<template>
    <div class="max-w-1000 flex justify-center mx-auto mb-5 mt-10 relative sm:hidden">
        <button @click="showDropDownMenu = !showDropDownMenu" class="bg-sky-600 text-white py-1 px-8 rounded border-none cursor-pointer flex items-center disabled:opacity-40">
            <span>actions</span>
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
        </button>
        <ul class="absolute text-gray-700 z-10 top-33px rounded-tr rounded-tl border border-gray-700 border-t-0" v-if="showDropDownMenu">
            <li class="bg-white px-34px py-1 hover:bg-gray-300 cursor-pointer">Read</li>
            <li class="bg-white px-34px py-1 hover:bg-gray-300 cursor-pointer">unread</li>
            <li class="bg-white px-34px py-1 hover:bg-gray-300 cursor-pointer">archive</li>
            <li class="bg-white px-34px py-1 hover:bg-gray-300 cursor-pointer">unarchive</li>
        </ul>
    </div>
</template>