<script setup lang="ts">
import { gmailData } from './stores/mainData'
const gmailBox = gmailData()

</script>

<template>
    <h1 class="text-2xl mb-5">Vmail box</h1>

    <table class="max-w-1000px m-auto border-collapse border-t-2 border-black">
        <tbody>
            <tr 
            class="h-10"
            v-for="email in gmailBox.gmails"
            :key="email.id"
            :class="['cursor-pointer', email.read ? 'bg-gray-300' : '']"
            @click="email.read = true">
                <td class="table-items">
                    <input type="checkbox">
                </td>
                <td class="table-items"> {{ email.from }}</td>
                <td class="table-items">
                    <p class="overflow-y-hidden m-0 max-h-1.2em"><strong> {{ email.subject.slice(0 , 40) }} ... </strong> - {{ email.body }}</p>
                </td>
                <td class="table-items"> {{ email.sentAt }} </td>
                <td class="table-items w-120px">
                    <button @click="email.archived = true">Archive</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style>
@import './assets/base.css';

</style>
