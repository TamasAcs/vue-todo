<template>
  <q-page
  v-if="userDetails.userId"
    class="flex column q-ma-md">
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
        class="absolute-top-right q-pr-md q-pt-sm"
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
    <p class="text-center">Settings page</p>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro cumque optio delectus nobis ad corporis eligendi. Voluptatum maiores ipsa perferendis necessitatibus, nisi eaque tempore, veniam qui accusantium architecto commodi? Porro vitae iste maxime ut laboriosam. Iusto totam eum expedita saepe sunt, sequi facere cumque? Obcaecati unde dolor perferendis ratione molestiae!</p>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur quod recusandae quisquam nihil, corrupti minus possimus unde alias? Magnam deserunt sapiente voluptates quos error, officia magni porro rem blanditiis suscipit perspiciatis, eaque ducimus cupiditate, facilis quam sit consequuntur dicta. Aperiam cupiditate recusandae quos. Nesciunt deserunt cumque eaque nam provident quia vel incidunt dolore, consequuntur natus pariatur quae, iure laudantium, consectetur nisi magnam repellendus nemo distinctio! Vel quae enim cum. Ex?</p>
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut ea perferendis corrupti aperiam minima nihil aliquid rerum earum at, illum nam fuga cum voluptatum non praesentium? Corrupti assumenda recusandae harum tempora optio suscipit quo neque quas autem nisi! Suscipit, corporis!</p>
    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam reprehenderit suscipit quisquam a esse eos placeat sed facere quae vel, soluta nesciunt doloribus distinctio atque ipsam odio corrupti at alias ipsa repudiandae, aspernatur repellat quia sint. Quasi voluptatibus optio quas repellendus dicta incidunt, quod corrupti, praesentium, velit aut consequatur. Et beatae eaque tempore illo ducimus sit exercitationem atque, pariatur ea modi aspernatur dolorem, temporibus, esse cum illum odit obcaecati excepturi minima? Blanditiis, dignissimos quisquam. Culpa doloribus illo ab corrupti totam fuga! Aliquid nisi omnis saepe magnam ad necessitatibus doloremque voluptas!</p>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import EssentialLink from 'components/EssentialLink.vue'
const user = [{
  id: {},
  name: {}
}
]
const linksData = [
  {
    title: 'Todo',
    icon: 'list',
    link: '/#/home'
  },
  {
    title: 'Settings',
    icon: 'settings',
    link: '/#/settings'
  }
]

export default {
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
    ...mapState('store', ['userDetails'])
  },
  methods: {
    ...mapActions('store', ['logoutUser'])
  }
}

</script>
