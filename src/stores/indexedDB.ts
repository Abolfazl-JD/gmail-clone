import { defineStore } from "pinia"
import type { Gmail } from '../types'

export const indexedDb = defineStore({
    id: "database",
    
    state: () => ({
        database: null as null | IDBDatabase,
    }),
    
    actions: {
        async getDatabase() : Promise<IDBDatabase> {
            return new Promise((resolve, reject) => { 
                setTimeout(() => {
                    if (this.database) {
                        resolve(this.database)
                    }
    
                    let request = window.indexedDB.open('gmailBox', 1)
                    request.onerror = event => {
                        console.error('ERROR: unable to open the database', event)
                        reject('ERROR')
                    }
                    request.onsuccess = () => {
                        this.database = request.result
                        resolve(this.database)
                    }
      
                    request.onupgradeneeded = () => {
                        let database = request.result
                        database.createObjectStore('gmailBox', {
                            autoIncrement: true,
                            keyPath : 'id'
                        })
                    }
                }, 5000)
            })
        },

        async getGmailsStore() : Promise<Gmail[]>{
            this.database = await this.getDatabase()
            return new Promise((resolve, reject) => {
                if (this.database) {
                    const transaction = this.database.transaction('gmailBox', 'readonly')
                    const store = transaction.objectStore('gmailBox')
  
                    let gmailBox : Gmail[] = [] 
                    store.openCursor().onsuccess = (event: any) => {
                        const cursor = event.target.result
                        if (cursor) {
                            const gmail : Gmail = cursor.value
                            gmailBox.push(gmail)
                            cursor.continue()
                        }
                    }
  
                    transaction.oncomplete = () => {
                        resolve(gmailBox)
                    }
                    transaction.onerror = (event) => {
                        reject(event)
                    }
                }
            })
        },
  
        async saveData(gmail : Gmail) {
            this.database = await this.getDatabase()
            return new Promise((resolve, reject) => {
                if (this.database) {
                    const transaction = this.database.transaction('gmailBox', 'readwrite')
                    const store = transaction.objectStore('gmailBox')
                    store.put({...gmail})
  
                    transaction.oncomplete = () => {
                        resolve('item has been successfully saved')
                    }
                    transaction.onerror = (event) => {
                        reject(event)
                    }
                }
            })
        }
    }
})