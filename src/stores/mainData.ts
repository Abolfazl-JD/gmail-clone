import { defineStore } from 'pinia'
import type { Gmail } from '../types'
import axios from 'axios'

export const gmailData = defineStore({
    id: 'gmail-data',

    state: () => ({
      gmails: [] as Gmail[],
      selectedGmails : new Set() as Set<Gmail>
    }),

    getters: {
      sortedGmails(state){
         return state.gmails.sort((e1, e2) => {
             return e1.sentAt < e2.sentAt ? 1 : -1
        })
      },

      unArchivedGmails(): Gmail[] {
        return this.sortedGmails.filter(mail => !mail.archived)
      },
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

      toggleEmailSelected(email: Gmail) {
        if (this.selectedGmails.has(email)) this.selectedGmails.delete(email)
        else this.selectedGmails.add(email)
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
