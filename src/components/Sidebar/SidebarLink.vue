<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { collapsed } from './state';

export default {
  props: {
    to: { type: String, required: true },
    icon: { type: String, required: true },
  },
  setup(props){
    const route = useRoute();
    const isActive = computed(() => {
      return route.path === props.to;
    });

    return { isActive, collapsed };
  }
}
</script>

<template>
    <router-link :to="to" class="link" :class="{ active: isActive, collapsed: collapsed }" exact-active-class="active" exact-active-style="background-color: var(--sidebar-item-active)">
        <i class="icon" :class="icon" ></i>
        <transition name="fade">
            <span v-if="!collapsed">
                <slot ></slot>
            </span>
        </transition>
    </router-link>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.1s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0;
}

.link{
    display: flex;
    align-items: center;

    cursor: pointer;
    position: relative;
    font-weight: 400;
    user-select: none;

    margin: 0.2em 0;
    padding: 1em;
    border-radius: 0.25em;
    height: 1.5em;

    color: white;
    text-decoration: none;

    transition: 0.3s ease;
}

.link:hover{
    background-color: var(--sidebar-item-hover);
    transform: scale(1.2);
}

.link.active{
    background-color: var(--sidebar-item-active);
}

.link.collapsed{
    padding: 0;
    padding-right: 1.5em;
    margin: 0.4em 0;
}

.link .icon{
    flex-shrink: 0;
    width: 25px;
    margin-right: 10px;
}


</style>