import { defineStore } from 'pinia'
// types
import type { Gmail } from '../types'
// stores
import { SelectionGmail } from './EmailSelection'
import { indexedDb } from './indexedDB'

export const gmailData = defineStore({
    id: 'gmail-data',

    state: () => ({
      gmails: [] as Gmail[],
      windowType : 'inbox' as 'archived' | 'inbox',
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
      toggleEmailRead(readEmail: Gmail, read: boolean) {
        const database = indexedDb()
        readEmail.read = read
        database.saveData(readEmail)
      },

      toggleArchiveEmail(archivedEmail: Gmail, archive: boolean) {
        const gmailSelection = SelectionGmail()
        const database = indexedDb()
        
        archivedEmail.archived = archive
        database.saveData(archivedEmail)
        gmailSelection.clear()
      },
      
      changeStatus(status: 'inbox' | 'archived') {
        const gmailSelection = SelectionGmail()
        this.windowType = status
        gmailSelection.clear()
      },

      async getGmailBoxData() {
        const database = indexedDb()
        this.gmails = await database.getGmailsStore()
      }
    }
})
