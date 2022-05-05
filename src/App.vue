<script setup lang="ts">
// components
import MailTable from './components/MailTable.vue'
import SkeletonMailTable from './components/SkeletonMailTable.vue'
</script>

<template>
    <h1 class="text-2xl mb-5">Vmail box</h1>
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
