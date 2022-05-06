<script setup lang="ts">
import { computed, ref } from 'vue'
// packages
import { format } from 'date-fns'
// Types
import type { Gmail } from '../types'
// Components
import MailModal from './MailModal.vue'
// stores
import { gmailData } from '../stores/mainData'
const gmailBox = gmailData()

// get data from database 
await gmailBox.getGmailData()

const sortedGmails = computed(() => {
    return gmailBox.gmails.sort((e1, e2) => {
        return e1.sentAt < e2.sentAt ? 1 : -1
    })
})
const unArchivedGmails = computed(() => sortedGmails.value.filter(mail => !mail.archived))

const openedGmail = ref<Gmail | null>(null)
const openMail = (mail : Gmail) => {
    openedGmail.value = mail
    gmailBox.makeEmailRead(mail)
}
</script>

<template>
    <table class="max-w-1000px m-auto border-collapse border-t-2 border-black">
        <tbody>
            <tr 
            class="h-14"
            v-for="email in unArchivedGmails"
            :key="email.id"
            :class="['cursor-pointer', email.read ? 'bg-gray-200' : '']"
            @click="openMail(email)">
                <td class="table-items">
                    <input type="checkbox">
                </td>
                <td class="table-items"> {{ email.from }}</td>
                <td class="table-items">
                    <p class="overflow-y-hidden m-0 max-h-1.2em">
                        <strong> {{ email.subject.slice(0 , 40) }} ... </strong> - {{ email.body }}
                    </p>
                </td>
                <td class="table-items w-120px"> {{ format(new Date(email.sentAt), 'MMM do yyyy') }} </td>
                <td class="table-items">
                    <button 
                    class="bg-gray-500 px-2 py-1 text-white"
                    @click="gmailBox.archiveEmail(email)">Archive</button>
                </td>
            </tr>
        </tbody>
    </table>
    <MailModal 
    v-if="openedGmail"
    v-bind="openedGmail"
    @close-modal="openedGmail = null" />
</template>