import { defineStore } from 'pinia'
import type { Gmail } from '../types'
import axios from 'axios'

export const gmailData = defineStore({
    id: 'gmail-data',

    state: () => ({
      gmails: [] as Gmail[],
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

      selectedGmails(state) {
        return state.gmails.filter(mail => mail.selected)
      }
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

      toggleSelectEmail(selectedMail: Gmail) {
        selectedMail.selected = !selectedMail.selected
        this.updateGmailData(selectedMail)
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
