<template>
  <q-layout view="lHh Lpr lFf" class="layout-background">
    <!-- Header with Green Background -->
    <q-header elevated class="bg-green-5">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          MindMeal Admin
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <!-- Drawer (Side Menu) -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label header>
          Izbornik
        </q-item-label>

        <q-item
          v-for="link in linksList"
          :key="link.title"
          clickable
          tag="router-link"
          :to="link.to"
        >
          <q-item-section avatar>
            <q-icon :name="link.icon" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ link.title }}</q-item-label>
            <q-item-label caption>{{ link.caption }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- Page Content -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, computed } from 'vue'

defineOptions({
  name: 'AdminLayout'
})

let title = computed(() => {
  return "MindMeal admin"
})

const linksList = [
  {
    title: 'Admin',
    caption: 'Admin',
    icon: 'home',
    to: '/admin'
  },
  {
    title: 'Korisnici',
    caption: 'Upravljanje korisnicima',
    icon: 'accessibility',
    to: '/admin/korisnici'
  },
  {
    title: 'Planovi prehrane',
    caption: 'Upravljanje planovima prehrane',
    icon: 'assignment',
    to: '/admin/narudzbe'
  },
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<style scoped>
.layout-background {
  background-color: #4caf50; /* Set very light green background for the whole layout */
}

* {
  color: #3E6F52; /* Apply the text color to all text elements */
}

/* Specific adjustments for individual elements if needed */
q-toolbar-title, q-item-label, q-btn {
  color: #4caf50; /* Make sure titles and labels also have this text color */
}
</style>
