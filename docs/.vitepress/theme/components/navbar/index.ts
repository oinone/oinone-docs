import { defineAsyncComponent } from 'vue';

export const Navbar = defineAsyncComponent(() => import('./Navbar.vue'));

export const InternalNavbar = defineAsyncComponent(() => import('./InternalNavbar.vue'));
