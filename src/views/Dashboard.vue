<template>
  <div class="min-h-screen flex flex-col bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="container mx-auto">
      <!-- This example requires Tailwind CSS v2.0+ -->
      <div class="flex flex-col lg:flex-row my-8">
        <div class="lg:mr-10">
          <div class="flex-1 min-w-0">
            <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              {{ this.userProfile.name }}
            </h2>
            <div class="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
              <div class="mt-2 flex items-center text-sm text-gray-500">
                <!-- Heroicon name: solid/briefcase -->
                <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd" />
                  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                </svg>
                {{ this.userProfile.title }}
              </div>
            </div>
          </div>
        </div>

        <div class="w-full lg:w-1/3 bg-white shadow-md rounded px-8 pt-6 pb-8">
            <p class="mb-4">Remind your future self of an item you might <span class="text-green-600 font-bold">lose</span></p>
            <form @submit.prevent>
              <div class="mb-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
                    Iten name
                  </label>
                  <input v-model.trim="item.name" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Item name">
                </div>
                <div class="mb-6">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="location">
                    Location
                  </label>
                  <input v-model.trim="item.location" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="location" type="text" placeholder="Location">
                </div>
                <button  @click="createItem()" :disabled="item.location === '' || item.name === ''" type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                    Create item
                </button>
            </form>
        </div>
      </div>


      <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table v-if="items.length > 0" class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Item
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" class="relative px-6 py-3">
                      <span class="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="item in items" :key="item.id">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                          <img class="h-10 w-10 rounded-full" :src="'https://via.placeholder.com/150?text=' + item.name" alt="">
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">
                            {{ item.name }}
                          </div>
                          <div class="text-sm text-gray-500">
                            -
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">{{ item.location }}</div>
                      <div class="text-sm text-gray-500">-</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a href="#" class="text-indigo-600 hover:text-indigo-900" @click="loadItemForEdit(item)">Edit</a>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="bg-white py-8 text-center" v-else>
                <p class="font-bold">No items found.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="editMode" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="w-full">
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <form @submit.prevent>
                    <div class="mb-4">
                      <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
                        Iten name
                      </label>
                      <input v-model.trim="itemToUpdate.name" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Item name">
                    </div>
                    <div class="mb-6">
                      <label class="block text-gray-700 text-sm font-bold mb-2" for="location">
                        Location
                      </label>
                      <input v-model.trim="itemToUpdate.location" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="location" type="text" placeholder="Location">
                    </div>
                </form>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button  @click="updateItem()" :disabled="itemToUpdate.location === '' || itemToUpdate.name === ''" type="submit" class="group relative w-full sm:w-auto ml-2 inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                Update item
            </button>
            <button @click="toggleEditMode" type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import moment from 'moment'

  export default {
    data() {
      return {
        item: {
          location: '',
          name: '',
        },
        itemToUpdate: {
          id: '',
          location: '',
          name: '',         
        },
        editMode: false,
      }
    },

    filters: {
      formatDate(val) {
        if (!val) { return '-' }
        
        let date = val.toDate()
        return moment(date).fromNow()
      },

      trimLength(val) {
        if (val.length < 200) { return val }
        return `${val.substring(0, 200)}...`
      }
    },

    computed: {
      ...mapState(['userProfile', 'items'])
    },

    methods: {
      createItem() {
        this.$store.dispatch('createItem', { 
          location: this.item.location,
          name: this.item.name,
        })
        this.item.location = ''
        this.item.name = ''
      },

      updateItem() {
        if (this.itemToUpdate.id === '') {
          return
        }

        this.$store.dispatch('updateItem', { 
          id: this.itemToUpdate.id,
          location: this.itemToUpdate.location,
          name: this.itemToUpdate.name,
        })

        this.itemToUpdate.id = ''
        this.itemToUpdate.location = ''
        this.itemToUpdate.name = ''

        this.toggleEditMode()
      },

      loadItemForEdit(item) {
        let foundItem = this.items.find(arrayItem => arrayItem.id === item.id)

        if (foundItem === undefined) {
          return
        }

        this.itemToUpdate.id = foundItem.id
        this.itemToUpdate.location = foundItem.location
        this.itemToUpdate.name = foundItem.name

        this.toggleEditMode()
      },

      toggleEditMode() {
        this.editMode = !this.editMode
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>