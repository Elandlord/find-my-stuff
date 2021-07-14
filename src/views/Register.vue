<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-xl font-extrabold text-gray-900">
          Register your free <span class="text-green-600">Find My Stuff</span> account
        </h2>

      </div>
      <div>
        <form class="mt-8 space-y-6" @submit.prevent>
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="name" class="sr-only">Name</label>
              <input id="name" v-model.trim="signupForm.name" name="name" type="text" autocomplete="name" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm" placeholder="Full name">
            </div>
            <div>
              <label for="title" class="sr-only">Title</label>
              <input id="title" v-model.trim="signupForm.title" name="title" type="text" autocomplete="title" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm" placeholder="Job Title">
            </div>
            <div class="my-8">
              <label for="email-address" class="sr-only">Email address</label>
              <input id="email-address" v-model.trim="signupForm.email" name="email" type="email" autocomplete="email" required class="appearance-none rounded-none relative block w-full mt-4 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm" placeholder="Email address">
            </div>
            <div>
              <label for="password" class="sr-only">Password</label>
              <input id="password" v-model.trim="signupForm.password" name="password" type="password" autocomplete="current-password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm" placeholder="Password">
            </div>
          </div>

          <div>
              <button @click="register()" type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                  <!-- Heroicon name: solid/lock-closed -->
                  <svg class="h-5 w-5 text-green-500 group-hover:text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                  </svg>
                </span>
                Register
              </button>
              <router-link to="/login">
                <p class="text-center mt-4 text-green-500">Back to login</p>
              </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
       data() {
           return {
                signupForm: {
                    name: '',
                    title: '',
                    email: '',
                    password: ''
                },
           }
       },

       methods: {
            register() {
                if( this.signupForm.email === '' || this.signupForm.password === '' || this.signupForm.name === '' || this.signupForm.title === '') {
                  return
                }

                this.$store.dispatch('signup', {
                  email: this.signupForm.email,
                  password: this.signupForm.password,
                  name: this.signupForm.name,
                  title: this.signupForm.title
                })
            }
       }
    }
</script>