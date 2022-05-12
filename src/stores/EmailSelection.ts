import { defineStore } from 'pinia'
// types
import type { Gmail } from '../types'
// stores
import { gmailData } from './mainData'

export const SelectionGmail = defineStore({
    id: 'gmail-selection',

    state: () => ({
        gmails: new Set() as Set<Gmail>,
        gmailBox : gmailData()
    }),

    getters: {
      
    },

    actions: {
        toggle(email: Gmail) {
            if (this.gmails.has(email)) this.gmails.delete(email)
            else this.gmails.add(email)
        },

        clear() {
            this.gmails.clear()
        },

        selectMultipleGmails() {
            for (const gmail of this.gmailBox.filteredGmails) {
                this.gmails.add(gmail)
            }
        },

        selectedOperation(fn : (e : Gmail) => void) {
            for (const gmail of this.gmails) {
                fn(gmail)
                this.gmailBox.updateGmailData(gmail)
            }
            this.clear()
        },
    }
})