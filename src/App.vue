<script setup lang="ts">
import { computed } from 'vue'
// components
import MailTable from './components/MailTable.vue'
import SkeletonMailTable from './components/SkeletonMailTable.vue'
// stores
import { gmailData } from './stores/mainData'
const gmailBox = gmailData()

const pluralSelected = computed(() => gmailBox.selectedGmails.length === 1 ? 'email' : 'emails')
</script>

<template>
    <h1 class="text-2xl mb-5">Vmail box</h1>
    <h2 class="text-xl mb-5"> {{ gmailBox.selectedGmails.length }} {{ pluralSelected }} selected </h2>
    <Suspense>
        <template #default>
            <MailTable />
        </template>
        <template #fallback>
            <SkeletonMailTable />
        </template>
    </Suspense>
    
</template>

<style>
@import './assets/base.css';

</style>
