<script lang="ts" setup>
import { computed } from 'vue'
// types
import type { Gmail } from '@/types'
// components 
import LargeSizeActionBar from './LargeSizeActionBar.vue'
import DropDown from './DropDown.vue'
// stores
import { SelectionGmail } from '../stores/EmailSelection'
const emailSelection = SelectionGmail()

const props = defineProps<{
    gmails : Gmail[]
}>()

const someSelected = computed(() => emailSelection.gmails.size > 0 && emailSelection.gmails.size < props.gmails.length)
const allSelected = computed(() => emailSelection.gmails.size === props.gmails.length)

const bulkSelect = () => allSelected.value ? emailSelection.clear() : emailSelection.selectMultipleGmails()

</script>

<template>
    <div class="max-w-1000px text-left mx-auto mb-5 mt-10 flex md:mt-0">
        <span class="checkbox">
            <input 
            type="checkbox" 
            :checked="allSelected"
            :class="[someSelected ? 'partial-check' : '']"
            @click="bulkSelect">
        </span>
        <LargeSizeActionBar />
        <DropDown/>
    </div>
</template>