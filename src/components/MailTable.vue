<script setup lang="ts">
import { ref } from 'vue'
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

const openedGmail = ref<Gmail | null>(null)
const changeOpenedEmail = (mail : Gmail | null) => {
    if(mail) gmailBox.toggleEmailRead(mail, true)
    openedGmail.value = mail
}

</script>

<template>
    <table class="max-w-1000px m-auto border-collapse border-t-2 border-black">
        <tbody>
            <tr 
            class="h-14"
            v-for="email in gmailBox.unArchivedGmails"
            :key="email.id"
            :class="['cursor-pointer', email.read ? 'bg-gray-200' : '']"
            @click="changeOpenedEmail(email)">
                <td class="table-items">
                    <input 
                    type="checkbox"
                    @click.stop="gmailBox.toggleEmailSelected(email)"
                    :checked="gmailBox.selectedGmails.has(email)">
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
                    @click.stop="gmailBox.archiveEmail(email)">Archive</button>
                </td>
            </tr>
        </tbody>
    </table>
    <MailModal 
    v-if="openedGmail"
    :email="openedGmail"
    @change-opened-email="changeOpenedEmail" />
</template>