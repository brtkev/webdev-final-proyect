<script>

import Sidebar from './components/Sidebar/Sidebar.vue';
import { RouterLink, RouterView } from 'vue-router'
import { sidebarWidth } from './components/Sidebar/state';
export default {
  components: {
    Sidebar,
  },
  setup(){

    return { sidebarWidth}
  }
}
</script>

<template>
  <Sidebar />
  <div class="route-container" >
    <router-view />
  </div>

</template>


<style>
.view-title {
  margin-bottom: 1em;
}
</style>

<style scoped>

.route-container {
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* border: 1 solid blue; */
  /* background-color: blue; */
  /* width: 999px; */
}


</style>
