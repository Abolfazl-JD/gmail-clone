<script setup lang="ts">
import { ref } from 'vue'
// packages
import { format } from 'date-fns'
// Types
import type { Gmail } from '../types'
// Components
import MailModal from './MailModal.vue'
import BulkActionBar from './BulkActionBar.vue'
import WindowChooser from './WindowChooser.vue'
import DropDown from './DropDown.vue'
// stores
import { gmailData } from '../stores/mainData'
import { SelectionGmail } from '../stores/EmailSelection'

// registering stores
const emailSelection = SelectionGmail()
const gmailBox = gmailData()

// get data from database 
await gmailBox.getGmailBoxData()

const openedGmail = ref<Gmail | null>(null)
const changeOpenedEmail = (mail : Gmail | null) => {
    if(mail) gmailBox.toggleEmailRead(mail, true)
    openedGmail.value = mail
}

</script>

<template>
    <div class="px-2 md:px-0">
        <div class="text-2xl mb-5 flex justify-center gap-2">
            <transition name="title-change" mode="out-in">
                <span v-if="gmailBox.windowType === 'inbox'">Vmail Inbox</span>
                <span v-else>Vmail Archived</span>
            </transition>
        </div>
        <WindowChooser />
        <BulkActionBar :gmails="gmailBox.filteredGmails" />
        <DropDown />
        <transition-group class="max-w-1000px m-auto border-collapse border-t-2 border-black" name="row" tag="div">
            <div 
            class="md:grid grid-cols-12 border-b border-gray-700 py-2 px-1 w-full"
            v-for="email in gmailBox.filteredGmails"
            :key="email.id"
            :class="['cursor-pointer', email.read ? 'bg-gray-200' : '']"
            @click="changeOpenedEmail(email)">
                <div class="col-span-3 text-left space-x-3 flex">
                    <input 
                    type="checkbox"
                    @click.stop="emailSelection.toggle(email)"
                    :checked="emailSelection.gmails.has(email)">
                    <span class="overflow-hidden whitespace-nowrap overflow-ellipsis"> {{ email.from }}</span>
                </div>
                <div class="col-span-6 h-full flex items-center text-left overflow-hidden whitespace-nowrap overflow-ellipsis text-sm mt-2 md:(text-15px mt-0)">
                    <strong> {{ email.subject }}</strong>
                    <span class="hidden md:inline-block overflow-hidden whitespace-nowrap overflow-ellipsis"> - {{ email.body }}</span>
                </div>
                <div class="md:hidden pt-1 space-x-3 overflow-hidden whitespace-nowrap overflow-ellipsis text-left w-full flex justify-between items-center">
                    <span class="text-sm overflow-hidden whitespace-nowrap overflow-ellipsis"> {{ email.body }} </span>
                    <span class="text-xs text-red-800"> {{ format(new Date(email.sentAt), 'MMM do yyyy') }} </span>
                </div>
                <div class="col-span-2 tex-center hidden md:block"> {{ format(new Date(email.sentAt), 'MMM do yyyy') }} </div>
                <div>
                    <button 
                    class="bg-gray-500 px-2 py-1 hidden md:block text-white col-span-1"
                    @click.stop="gmailBox.toggleArchiveEmail(email, !email.archived)">
                        {{ email.archived ? 'unarchive' : 'archive' }}
                    </button>
                </div>
            </div>
        </transition-group>
    </div>
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