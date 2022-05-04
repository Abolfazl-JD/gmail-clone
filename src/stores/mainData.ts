import { defineStore } from 'pinia'
import { useStorage } from "@vueuse/core"
import type { Gmail } from '../types'

export const gmailData = defineStore({
    id: 'gmail-data',

    state: () => ({
      gmails: useStorage<Gmail[]>("gmails", []),
    }),

    getters: {
      
    },

    actions: {
      makeEmailRead(readEmail: Gmail) {
          readEmail.read = true
      },

      archiveEmail(archivedEmail: Gmail) {
        archivedEmail.archived = true
    }
    }
})
