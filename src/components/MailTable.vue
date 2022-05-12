<script setup lang="ts">
import { computed, ref } from 'vue'
// packages
import { format } from 'date-fns'
// Types
import type { Gmail } from '../types'
// Components
import MailModal from './MailModal.vue'
import BulkActionBar from './BulkActionBar.vue'
import WindowChooser from './WindowChooser.vue'
// stores
import { gmailData } from '../stores/mainData'
import { SelectionGmail } from '../stores/EmailSelection'

// registering stores
const emailSelection = SelectionGmail()
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
    <div class="text-2xl mb-5 flex justify-center gap-2">
        <transition name="title-change" mode="out-in">
            <span v-if="gmailBox.windowType === 'inbox'">Vmail Inbox</span>
            <span v-else>Vmail Archived</span>
    </transition>
    </div>
    <WindowChooser />
    <BulkActionBar :gmails="gmailBox.filteredGmails" />
    <table class="max-w-1000px m-auto border-collapse border-t-2 border-black">
        <transition-group name="row" tag="tbody">
            <tr 
            class="h-14 gmail-items"
            v-for="email in gmailBox.filteredGmails"
            :key="email.id"
            :class="['cursor-pointer', email.read ? 'bg-gray-200' : '']"
            @click="changeOpenedEmail(email)">
                <td class="table-items">
                    <input 
                    type="checkbox"
                    @click.stop="emailSelection.toggle(email)"
                    :checked="emailSelection.gmails.has(email)">
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
                    @click.stop="gmailBox.toggleArchiveEmail(email, !email.archived)">
                        {{ email.archived ? 'unarchive' : 'archive' }}
                    </button>
                </td>
            </tr>
        </transition-group>
    </table>
    <MailModal 
    v-if="openedGmail"
    :email="openedGmail"
    @change-opened-email="changeOpenedEmail" />
</template>

<style>

.title-change-enter-from {
    transform: translateY(-20px);
}

.title-change-leave-to{
    transform: translateY(20px);
}

.row-leave-to,
.row-enter-from,
.title-change-enter-from,
.title-change-leave-to{
    opacity: 0;
}

.row-enter-from {
    transform: translateX(-100px);
}

.row-leave-to{
    transform: translateX(100px);
}

.row-leave-active,
.row-enter-active,
.row-move,
.title-change-enter-active,
.title-change-leave-active{
    transition: 0.3s ease all;
}

.row-leave-active{
    position: absolute
}
</style>