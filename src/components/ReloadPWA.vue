<script setup lang="ts">
import { useRegisterSW } from "virtual:pwa-register/vue"

const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW()
const close = async () => {
    offlineReady.value = false
    needRefresh.value = false
}

const updateSW = async () => {
    await updateServiceWorker()
}
</script>

<template>
    <div 
    v-if="offlineReady || needRefresh" 
    class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-end">
        <div class="relative bottom-[60px] mx-auto sm:p-5 py-2 border  shadow-lg rounded-md bg-white w-11/12 md:w-3/4">
            <div
            class="
            flex flex-wrap
            md:flex-nowrap
            text-gray-900
            px-6
            pt-2
            pb-3
            justify-between
            items-center
            align-middle
            "
            role="alert"
        >
            <div class="message mt-1">
            <span v-if="offlineReady"> App ready to work offline </span>
            <span v-else>
                New content available, click on reload button to update.
            </span>
            </div>
            <div class="buttons flex align-middle mt-2 md:mt-0">
            <button
                v-if="needRefresh"
                @click="updateSW()"
                class="
                w-full
                px-4
                py-2
                text-sm 
                leading-none
                transition-colors
                duration-150
                border
                border-gray-900
                rounded
                sm:w-auto
                focus:outline-none focus:shadow-outline-purple
                mr-4
                "
            >
                Reload
            </button>
            <button
                @click="close"
                class="
                w-full
                px-4
                py-2
                text-sm 
                leading-none
                transition-colors
                duration-150
                border
                border-gray-900 
                rounded
                sm:w-auto
                focus:outline-none focus:shadow-outline-purple
                "
            >
                Close
            </button>
            </div>
            </div>
        </div>
    </div>
    
</template>