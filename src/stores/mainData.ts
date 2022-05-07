import { defineStore } from 'pinia'
import type { Gmail } from '../types'
import axios from 'axios'

export const gmailData = defineStore({
    id: 'gmail-data',

    state: () => ({
      gmails: [] as Gmail[],
    }),

    getters: {
      
    },

    actions: {
      toggleEmailRead(readEmail: Gmail, read : boolean) {
        readEmail.read = read
        this.updateGmailData(readEmail)
      },

      archiveEmail(archivedEmail: Gmail) {
        archivedEmail.archived = true
        this.updateGmailData(archivedEmail)
      },

      async getGmailData() {
        await axios.get('http://localhost:3000/emails').then(res => {
          this.gmails = res.data
        })
      },

       updateGmailData(updatedEmail : Gmail) {
         axios.put(`http://localhost:3000/emails/${updatedEmail.id}`, updatedEmail)
      }
    }
})
