<script setup lang="ts">
// components
import MailTable from './components/MailTable.vue'
import SkeletonMailTable from './components/SkeletonMailTable.vue'
import BulkActionBar from './components/BulkActionBar.vue'
// stores
import { gmailData } from './stores/mainData'
const gmailBox = gmailData()
</script>

<template>
    <h1 class="text-2xl mb-5">Vmail box</h1>
    <h2 class="text-xl mb-5"> {{ gmailBox.selectedGmails.size }} email selected </h2>
    <BulkActionBar :gmails="gmailBox.gmails" />
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
