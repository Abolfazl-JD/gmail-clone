<script lang="ts" setup>
import { ref } from 'vue'
// composables
import bulkActions from '@/composables/BulkAction'
// stores
import { SelectionGmail } from '../stores/EmailSelection'
const emailSelection = SelectionGmail()

const { disableArchived , disableMarkRead , disableMarkUnread , disableUnArchived } = bulkActions()

const showDropDownMenu = ref(false)
</script>

<template>
    <div class="buttons ml-2 flex-wrap gap-1 justify-center flex pl-5 sm:hidden">
        <button 
        @click="showDropDownMenu = !showDropDownMenu" 
        class="bg-sky-600 text-white py-1 px-4 rounded border-none cursor-pointer flex items-center 
        disabled:(opacity-30 cursor-not-allowed)"
        :disabled="!emailSelection.gmails.size">
            <span>actions</span>
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
        </button>
        <ul 
        :class="['absolute', 'text-gray-700', 'z-10', 'top-33px', 'rounded-tr', 'rounded-tl', 'border', 'border-gray-700', 'border-t-0' ,
        {'hidden' : !emailSelection.gmails.size}]" 
        v-if="showDropDownMenu">
            <li :class="['list-items', {'disable-li' : disableMarkRead}]">Read</li>
            <li class="list-items">unread</li>
            <li class="list-items">archive</li>
            <li class="list-items">unarchive</li>
        </ul>
    </div>
</template>