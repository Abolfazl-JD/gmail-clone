<script lang="ts" setup>
import { computed } from 'vue'
// stores
import { gmailData } from '../stores/mainData'
const gmailBox = gmailData()

const someSelected = computed(() => gmailBox.selectedGmails.size > 0 && gmailBox.selectedGmails.size < gmailBox.gmails.length)
const allSelected = computed(() => gmailBox.selectedGmails.size === gmailBox.gmails.length)
const bulkSelect = () => allSelected.value ? gmailBox.unSelectGmails() : gmailBox.selectMultipleGmails()
</script>

<template>
    <div class="bulk-action-bar mb-5">
        <input 
        type="checkbox"
        :checked="allSelected"
        :class="[someSelected ? 'partial-check' : '']"
        @click="bulkSelect">
    </div>
</template>