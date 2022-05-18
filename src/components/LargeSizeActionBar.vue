<script setup lang="ts">
// composables
import bulkActions from '@/composables/BulkAction'
// stores
import { SelectionGmail } from '../stores/EmailSelection'
const emailSelection = SelectionGmail()

const { disableArchived , disableMarkRead , disableMarkUnread , disableUnArchived } = bulkActions()
</script>

<template>
    <span class="buttons ml-2 hidden flex-wrap gap-1 justify-center sm:flex md:block">
        <button 
        class="functional-btn" 
        @click="emailSelection.selectedOperation(e => e.read = true)"
        :disabled="disableMarkRead">
            Mark read
        </button>
        <button 
        class="functional-btn" 
        @click="emailSelection.selectedOperation(e => e.read = false)"
        :disabled="disableMarkUnread">
            Mark Unread
        </button>
        <button 
        class="functional-btn" 
        @click="emailSelection.selectedOperation(e => e.archived = true)"
        :disabled="disableArchived">
            Archive
        </button>
        <button 
        class="functional-btn" 
        @click="emailSelection.selectedOperation(e => e.archived = false)"
        :disabled="disableUnArchived">
            Unarchive
        </button>
    </span>
</template>