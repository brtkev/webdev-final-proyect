import { ref, computed } from 'vue';

const windowAutoCollapseWidth = 768;

/** MANEJA EL ESTADO DE LA SIDEBAR */
export const collapsed = ref(window.innerWidth <= windowAutoCollapseWidth);
export const toggleSidebar = () => { 
  collapsed.value = !collapsed.value;
}

/** MANEJA EL ESTADO DE LA SIDEBAR AL CAMBIAR EL TAMAÑO DE LA PANTALLA */
window.addEventListener("resize", (e) => {
  
  collapsed.value = e.target.innerWidth <= windowAutoCollapseWidth;
  
});

export const SIDEBAR_WIDTH = 180;
export const SIDEBAR_WIDTH_COLLAPSED = 38;
export const sidebarWidth = computed(() => 
    `${collapsed.value ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH}px`
);