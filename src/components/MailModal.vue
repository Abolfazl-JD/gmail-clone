<script setup lang="ts">
// packages
import  { format } from 'date-fns'
import { useMagicKeys , whenever  } from '@vueuse/core'

interface PropsType{
    id: number
    from: string,
    subject: string,
    body: string
    sentAt: string,
    archived: boolean,
    read: boolean  
}

const props = defineProps<PropsType>()


interface EmitType{
    (event : 'close-modal') : void
}

const emit = defineEmits<EmitType>()


const { shift, space, Escape } = useMagicKeys()
whenever(Escape, () => {
  emit('close-modal')
})
</script>

<template>
    <div 
    @click.self="emit('close-modal')"
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