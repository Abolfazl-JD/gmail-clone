<script lang="ts" setup>
import { computed } from 'vue'
// types
import type { Gmail } from '@/types'
// stores
import { SelectionGmail } from '../stores/EmailSelection'
import { gmailData } from '@/stores/mainData'

// register stores
const emailSelection = SelectionGmail()
const gmailBox = gmailData()

const props = defineProps<{
    gmails : Gmail[]
}>()

const someSelected = computed(() => emailSelection.gmails.size > 0 && emailSelection.gmails.size < props.gmails.length)
const allSelected = computed(() => emailSelection.gmails.size === props.gmails.length)

const bulkSelect = () => allSelected.value ? emailSelection.clear() : emailSelection.selectMultipleGmails()

const disableMarkRead = computed(() => [...emailSelection.gmails].every(email => email.read))
const disableMarkUnread = computed(() => [...emailSelection.gmails].every(email => !email.read))
const disableArchived = computed(() => [...emailSelection.gmails].every(email => email.archived))
const disableUnArchived = computed(() => [...emailSelection.gmails].every(email => !email.archived))

</script>

<template>
    <div class="max-w-1000px text-left mx-auto mb-5">
        <span class="checkbox">
            <input 
            type="checkbox"
            :checked="allSelected"
            :class="[someSelected ? 'partial-check' : '']"
            @click="bulkSelect">
        </span>
        <span class="buttons ml-2">
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
    </div>
</template>