import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  darkMode: 'class',
    theme: {},
    shortcuts: {
      'table-items': 'p-5px text-left border-b border-black',
      'functional-btn' : 'bg-gray-100 border-2 text-sm border-gray-800 px-2 py-1 mr-3  disabled:(opacity-70 text-gray-500 border-gray-500)',
      'list-items': 'bg-white px-17px text-center py-1 hover:bg-gray-300 cursor-pointer',
      'disable-li' : 'bg-gray-200 hover:bg-gray-200 text-gray-400 cursor-not-allowed'
    },
  plugins: [],
})