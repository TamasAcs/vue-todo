<template>
  <q-page
  v-if="userDetails.userId"
  class="bg-grey-3 column">
    <q-header
    elevated
    class="column">
        <q-toolbar class="no-padding">
          <q-btn class="q-ml-md" flat @click="leftDrawerOpen = !leftDrawerOpen" round dense icon="menu" />
        </q-toolbar>
          <div class="row q-pl-lg text-h5 text-weight-bold">
          Welcome <p class="q-pl-sm text-capitalize">{{ userDetails.name }}</p></div>
          <div class="q-pl-lg q-pb-md text-subtitle2">{{ todaysDate }}</div>
      <q-input
        class="col"
        ref="input"
        v-model="newTask"
        @keyup.enter="addTask"
        label="Add task"
        label-color="white"
        filled
        clearable
        :rules="[val => val && val.length >= 3 || 'Please enter at least 3 characters']"
      >
        <template v-slot:append>
          <q-btn @click="addTask" round dense flat icon="add" color="white" />
        </template>
      </q-input>
    </q-header>
    <q-list class="bg-white" separator bordered>
      <q-item
        v-for="task in tasks"
        :key="task.title"
        :class="{ 'done bg-blue-1': task.done }"
        @click="toggleDone(task.id)"
        clickable
        v-ripple
      >
      <!-- @click="task.done = !task.done" another way to toggle-->
      <q-item-section avatar>
          <q-checkbox
            v-model="task.done"
            color="primary"
          />
        </q-item-section>
        <q-item-section>
          <q-item-label
          v-model="task.name">{{ task.title }}</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-btn
            class="absolute-right"
            @click.stop="deleteTask(task.id)"
            flat
            color="red-14"
            icon="delete"
          />
          <!-- .stop disabling parent action => toggle -->
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
        <q-scroll-area style="height: calc(100% - 192px); margin-top: 192px; border-right: 1px solid #ddd">
          <q-list
          class="q-pt-md"
          >

          <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
          />
          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top" src="../static/avatar-bg.jpg" style="height: 192px">
        <q-btn
        @click="logoutUser()"
        class="absolute-top-right q-pa-sm"
        color="white"
          flat
          dense
          no-caps
          icon="account_circle"
          label="Logout"
        />
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-lg">
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
    icon: 'checklist',
    link: ''
  },
  {
    title: 'Settings',
    icon: 'settings',
    link: '/#/settings'
  }
]
import { date, Notify } from 'quasar'
export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data () {
    return {
      newTask: '',
      tasks: [],
      user,
      leftDrawerOpen: false,
      essentialLinks: linksData,
      progress: false
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
    addTask () {
      const newTask = {
        id: Date.now(),
        title: this.newTask,
        done: false
      }
      this.$refs.input.validate()
      if (this.$refs.input.hasError) {
        this.formHasError = true
      } else {
        Notify.create({
          type: 'positive',
          color: 'positive',
          timeout: 1500,
          position: 'center',
          message: 'New task added!'
        })
        db.collection('tasks').add(newTask)
        this.tasks.push(newTask)
        this.newTask = ''
      }
    },
    deleteTask (id) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Are you sure you want to delete?',
        ok: {
          push: true
        },
        cancel: {
          push: true,
          color: 'negative'
        },
        persistent: true
      }).onOk(() => {
        const index = this.tasks.findIndex(task => task.id === id)
        db.collection('tasks').doc({ id: id }).delete()
        this.tasks.splice(index, 1)
        Notify.create({
          type: 'positive',
          color: 'negative',
          timeout: 1000,
          position: 'center',
          message: 'Task deleted!'
        })
      }).onCancel(() => {
      }).onDismiss(() => {
      })
    },
    toggleDone (id) {
      const task = this.tasks.find(task => task.id === id)
      db.collection('tasks').doc({ id: id }).update({
        done: !task.done
      })
      task.done = !task.done
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
  height: 192px;
}
.q-header::before{
  content: "";
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: rgba(0,0,0,0.5);
}
.q-header::after{
  content: "";
  top: 0;
  left: 0;
  position: absolute;
  background: url("../static/bg.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  z-index: -2;
}
.q-field__native{
  color: white !important;
}
.q-field__focusable-action {
  color: white;
}
.q-field--with-bottom {
  padding-bottom: 22px;
}
.q-field--filled .q-field__control:before {
  background: rgba(255,255,255,0.1) !important;
}
.done .q-item__label {
  color: #ccc;
  text-decoration: line-through;
}
.no-tasks {
  opacity: 0.5;
}
</style>
