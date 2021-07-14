<template>
  <div id="dashboard">
    <section>
      <div class="col1">
        <div class="profile">
          <h5>{{ userProfile.name }}</h5>
          <p>{{ userProfile.title }}</p>
          <div class="create-post">
            <p>Create item you want to find again</p>
            <form @submit.prevent>
              <label>Name</label>
              <input v-model.trim="item.name" placeholder="Hedge trimmers (with blades)" />
              <label>Location</label>
              <input v-model.trim="item.location" placeholder="Backyard shed" />
              <button @click="createItem()" :disabled="item.location === '' || item.name === ''" class="button">Create</button>
            </form>
          </div>
        </div>
      </div>
      <div class="col2">
        <div v-if="items.length">
            <div v-for="item in items" :key="item.id" class="post">
              <h5>{{ item.location }}</h5>
              <p>{{ item.name }}</p>
              <p>{{ item.createdOn | formatDate }}</p>
            </div>
        </div>
        <div v-else>
          <p class="no-results">There are currently no items.</p>
        </div>
      </div>
    </section>
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
        }
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
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>