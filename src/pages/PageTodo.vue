<template>
  <q-page
  v-if="userDetails.userId"
  class="bg-grey-3 column">
    <q-header elevated class="row">

<div class="q-px-lg q-pt-xl q-mb-md">
          <div class="text-h4">Welcome to your Todo App</div>
          <div class="text-subtitle2">{{ todaysDate }}</div>
        </div>
    </q-header>
    <div class="row q-pa-sm bg-primary">
      <q-input
        class="col"
        v-model="newTask"
        @keyup.enter="addTask"
        placeholder="Add task"
        bg-color="white"
        square
        filled
      >
        <!-- hitting enter same as pressing add button -->
        <template v-slot:append>
          <q-btn @click="addTask" round dense flat icon="add" />
        </template>
      </q-input>
    </div>
    <q-list class="bg-white" separator bordered>
      <q-item
        v-for="task in tasks"
        :key="task.title"
        :class="{ 'done bg-blue-1': task.done }"
        @click="toggleDone(task.id)"
        clickable
        v-ripple
      >
        <!-- with onclick and clickable makes it available to check or uncheck -->
        <q-item-section avatar>
          <q-checkbox
            v-model="task.done"
            class="no-pointer-events"
            color="primary"
          />
          <!-- disables checkbox click -->
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ task.title }}</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-btn
            class="absolute-right"
            @click.stop="deleteTask(task.id)"
            flat
            color="black"
            icon="delete"
          />
        </q-item-section>
      </q-item>
    </q-list>
    <div v-if="!tasks.length" class="no-tasks absolute-center">
      <q-icon name="check" size="100px" color="primary" />
      <div class="text-h5 text-primary text-center">
        No tasks
      </div>
    </div>

    <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        :width="250"
        :breakpoint="600"
      >
        <q-scroll-area style="height: calc(100% - 176px); margin-top: 176px; border-right: 1px solid #ddd">
          <q-list padding>

            <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 176px">
        <q-btn
        @click="logoutUser()"
        class="absolute-top-right q-pr-sm"
          flat
          dense
          no-caps
          icon="account_circle"
          label="Logout"
        />
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <div class="text-weight-bold">{{ userDetails.name }}</div>
            <div>{{ userDetails.email }}</div>
          </div>
        </q-img>
      </q-drawer>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import EssentialLink from 'components/EssentialLink.vue'
import Localbase from 'localbase'

const db = new Localbase('db')

const user = [{
  id: {},
  name: {}
}
]
const linksData = [
  {
    title: 'Todo',
    icon: 'list',
    link: '/'
  },
  {
    title: 'Settings',
    icon: 'settings',
    link: '/#/settings'
  }
]
import { date } from 'quasar'
export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data () {
    return {
      newTask: '',
      tasks: [],
      user,
      leftDrawerOpen: false,
      essentialLinks: linksData
    }
  },
  computed: {
    ...mapState('store', ['userDetails']),
    todaysDate () {
      const timeStamp = Date.now()
      return date.formatDate(timeStamp, 'dddd D MMMM')
    }
  },
  methods: {
    toggleDone (id) {
      const task = this.tasks.find(task => task.id === id)
      db.collection('tasks').doc({ id: id }).update({
        done: !task.done
      })
      task.done = !task.done
    },
    deleteTask (id) {
      const index = this.tasks.findIndex(task => task.id === id)
      db.collection('tasks').doc({ id: id }).delete()
      this.tasks.splice(index, 1)
    },
    addTask () {
      const newTask = {
        id: Date.now(),
        title: this.newTask,
        done: false
      }
      db.collection('tasks').add(newTask)
      this.tasks.push(newTask)
      this.newTask = ''
      // after adding task clears input
    },
    ...mapActions('store', ['logoutUser']),
    getTasks () {
      db.collection('tasks').get().then(tasks => {
        this.tasks = tasks
      })
    }
  },
  created () {
    this.getTasks()
  }
}
</script>

<style lang="css">
.q-header{
  height: 176px;
}
.done .q-item__label {
  color: #ccc;
  text-decoration: line-through;
}
.no-tasks {
  opacity: 0.5;
}
</style>
