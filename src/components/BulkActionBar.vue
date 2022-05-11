<script lang="ts" setup>
import { computed } from 'vue'
// types
import type { Gmail } from '@/types'
// stores
import { gmailData } from '../stores/mainData'
const gmailBox = gmailData()

const props = defineProps<{
    gmails : Gmail[]
}>()

const someSelected = computed(() => gmailBox.selectedGmails.size > 0 && gmailBox.selectedGmails.size < props.gmails.length)
const allSelected = computed(() => gmailBox.selectedGmails.size === props.gmails.length)

const bulkSelect = () => allSelected.value ? gmailBox.unSelectGmails() : gmailBox.selectMultipleGmails()

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
            <button class="functional-btn" @click="gmailBox.selectedOperation(e => e.read = true)">Mark read</button>
            <button class="functional-btn" @click="gmailBox.selectedOperation(e => e.read = false)">Mark Unread</button>
            <button class="functional-btn" @click="gmailBox.selectedOperation(e => e.archived = true)">Archive</button>
        </span>
    </div>
</template>