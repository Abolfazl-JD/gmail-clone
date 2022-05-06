<script setup lang="ts">
import  { format } from 'date-fns'

interface PropsType{
    id: number
    from: string,
    subject: string,
    body: string
    sentAt: string,
    archived: boolean,
    read: boolean  
}

interface EmitType{
    (event : 'close-modal') : void
}

const props = defineProps<PropsType>()
const emit = defineEmits<EmitType>()
</script>

<template>
    <div 
    @click="emit('close-modal')"
    class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div class="relative top-[60px] mx-auto p-5 border  shadow-lg rounded-md bg-white w-11/12 md:w-3/4" >
            <div class="email-display px-10 py-5">
                <h2 class="mb-5 text-lg">
                    Subject: <strong> {{ props.subject }} </strong>
                </h2>
                <div class="mb-2">
                    <em> From {{ props.from }} on {{ format(new Date(props.sentAt), 'MMM do yyyy') }} </em>
                </div>
                <div class="text-left leading-28px"> {{ props.body }} </div>
            </div>
        </div>
    </div>
</template>