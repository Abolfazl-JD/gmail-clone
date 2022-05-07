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
    (event : 'close-modal') : void
}

const emit = defineEmits<EmitType>()


const { shift, Enter, Escape } = useMagicKeys()
whenever(Escape, () => {
  emit('close-modal')
})
whenever(Enter, () => {
  console.log('a different function')
})
</script>

<template>
    <div 
    @click.self="emit('close-modal')"
    class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div class="relative top-[60px] mx-auto p-5 border  shadow-lg rounded-md bg-white w-11/12 md:w-3/4" >
            <div class="w-full text-left mb-5">
                <button class="functional-btn" @click="gmailBox.archiveEmail(email)"> Archive (e) </button>
                <button class="functional-btn"> Mark unread </button>
                <button class="functional-btn"> Older </button>
                <button class="functional-btn"> Newer </button>
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