<script setup lang="ts">
// packages
import  { format } from 'date-fns'
import { useMagicKeys , whenever  } from '@vueuse/core'
// stores
import { gmailData } from '../stores/mainData'
const gmailBox = gmailData()

interface propsItems{
    id: number
    from: string,
    subject: string,
    body: string
    sentAt: string,
    archived: boolean,
    read: boolean  
}

interface propsType{
    email : propsItems
}

const props = defineProps<propsType>()


interface EmitType{
    (event : 'change-opened-email' , mailValue : propsItems | null) : void
}

const emit = defineEmits<EmitType>()

const archiveMail = () => {
    gmailBox.archiveEmail(props.email)
    emit('change-opened-email' , null)
}

const changeOpenedMail = (condition : 'pre' | 'next') => {
    const emailIndex = gmailBox.gmails.indexOf(props.email)
    // email that should be replaced with openedGmail
    let sentMail : propsItems | null = null
    // If it's pre, check that current openedMail isn't the first one
    if(condition === 'pre' && emailIndex) sentMail = gmailBox.gmails[emailIndex - 1] 
    // It it's next, check that current openedMail isn't the last one
    else if(condition === 'next' && emailIndex !== gmailBox.gmails.length - 1) sentMail = gmailBox.gmails[emailIndex + 1] 
    emit('change-opened-email', sentMail)
}

const { e, r, k, Escape, j } = useMagicKeys()

whenever(Escape, () => {
    emit('change-opened-email' , null)
})

whenever(e, () => archiveMail())
whenever(r, () => gmailBox.toggleEmailRead(props.email, !props.email.read))
whenever(k, () => changeOpenedMail('next'))
whenever(j, () => changeOpenedMail('pre'))

</script>

<template>
    <div 
    @click.self="emit('change-opened-email' , null)"
    class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div class="relative top-[60px] mx-auto p-5 border  shadow-lg rounded-md bg-white w-11/12 md:w-3/4" >
            <div class="w-full text-left mb-5">
                <button class="functional-btn" @click="archiveMail"> Archive (e) </button>
                <button class="functional-btn" @click="gmailBox.toggleEmailRead(email, !email.read)">
                    {{ email.read ? 'Mark unread' : 'Mark read' }} (r) 
                </button>
                <button class="functional-btn"  @click="changeOpenedMail('pre')"> Older (j) </button>
                <button class="functional-btn" @click="changeOpenedMail('next')"> Newer (k)</button>
            </div>
            <div class="email-display px-10 py-5">
                <h2 class="mb-5 text-lg">
                    Subject: <strong> {{ email.subject }} </strong>
                </h2>
                <div class="mb-2">
                    <em> From {{ email.from }} on {{ format(new Date(email.sentAt), 'MMM do yyyy') }} </em>
                </div>
                <div class="text-left leading-28px"> {{ email.body }} </div>
            </div>
        </div>
    </div>
</template>