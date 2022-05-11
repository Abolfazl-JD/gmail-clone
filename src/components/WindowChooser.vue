<script lang="ts" setup>
import { gmailData } from '../stores/mainData'
const gmailBox = gmailData()
</script>

<template>
    <div class="flex max-w-1000px mx-auto mb-5 items-center justify-center">
        <button 
        class="functional-btn" 
        :disabled="gmailBox.windowType === 'inbox'"
        @click="gmailBox.changeStatus('inbox')">
            Inbox
        </button>
        <button 
        class="functional-btn" 
        :disabled="gmailBox.windowType === 'archived'"
        @click="gmailBox.changeStatus('archived')">
            Archived
        </button>
    </div>
</template>