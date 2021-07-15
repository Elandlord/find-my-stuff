<template>
  <div class="min-h-screen flex flex-col bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="container mx-auto">
      <div class="flex-1 min-w-0 mt-8">
        <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate ">
          Settings
        </h2>
      </div>

        <div class="w-full lg:w-1/3 bg-white shadow-md rounded px-8 pt-6 pb-8 mt-8">
          <p class="mb-4">Update your profile settings below</p>
          <form @submit.prevent>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
                  Name
                </label>
                <input v-model.trim="name" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" :placeholder="userProfile.name">
              </div>
              <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="title">
                  Job title
                </label>
                <input v-model.trim="title" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" :placeholder="userProfile.title">
              </div>
              <button  @click="updateProfile()" :disabled="name === '' || title === ''" type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                  Update profile
              </button>
          </form>
      </div>

      <transition name="fade">
        <p v-if="showSuccess" class="success">Profile updated</p>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {

  data() {
    return {
      name: '',
      title: '',
      showSuccess: false
    }
  },

  computed: {
    ...mapState(['userProfile'])
  },
  
  methods: {
    updateProfile() {
        this.$store.dispatch('updateProfile', {
          name: this.name !== '' ? this.name : this.userProfile.name,
          title: this.title !== '' ? this.title : this.userProfile.title
        })

        this.name = ''
        this.title = ''

        this.showSuccess = true

        setTimeout(() => {
          this.showSuccess = false
        }, 2000)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>