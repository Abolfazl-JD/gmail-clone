<script setup lang="ts">
// packages
import { format } from 'date-fns'
// stores
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
            :class="['cursor-pointer', email.read ? 'bg-gray-200' : '']"
            @click="gmailBox.makeEmailRead(email)">
                <td class="table-items">
                    <input type="checkbox">
                </td>
                <td class="table-items"> {{ email.from }}</td>
                <td class="table-items">
                    <p class="overflow-y-hidden m-0 max-h-1.2em"><strong> {{ email.subject.slice(0 , 40) }} ... </strong> - {{ email.body }}</p>
                </td>
                <td class="table-items w-120px"> {{ format(new Date(email.sentAt), 'MMM do yyyy') }} </td>
                <td class="table-items">
                    <button @click="gmailBox.archiveEmail(email)">Archive</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style>
@import './assets/base.css';

</style>
