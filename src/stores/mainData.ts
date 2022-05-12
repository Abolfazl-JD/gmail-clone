import { defineStore } from 'pinia'
// types
import type { Gmail } from '../types'
// stores
import { SelectionGmail } from './EmailSelection'
// packages
import axios from 'axios'

export const gmailData = defineStore({
    id: 'gmail-data',

    state: () => ({
      gmails: [] as Gmail[],
      windowType : 'inbox' as 'archived' | 'inbox'
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

      archivedGmails(): Gmail[] {
        return this.sortedGmails.filter(mail => mail.archived)
      },

      filteredGmails(state) : Gmail[] {
        return state.windowType === 'inbox' ? this.unArchivedGmails : this.archivedGmails
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
      
      changeStatus(status: 'inbox' | 'archived') {
        const gmailSelection = SelectionGmail()
        this.windowType = status
        gmailSelection.clear()
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
