<script lang="ts" setup>

const props = defineProps<{
    windowType : 'inbox' | 'archived'
}>()

const emit = defineEmits<{
    (event : 'change-window-status' , status : 'inbox' | 'archived') : void
}>()

</script>

<template>
    <div class="flex max-w-1000px mx-auto mb-5 items-center justify-center">
        <button 
        class="functional-btn" 
        :disabled="windowType === 'inbox'"
        @click="emit('change-window-status' , 'inbox')">
            Inbox
        </button>
        <button 
        class="functional-btn" 
        :disabled="windowType === 'archived'"
        @click="emit('change-window-status' , 'archived')">
            Archived
        </button>
    </div>
</template>