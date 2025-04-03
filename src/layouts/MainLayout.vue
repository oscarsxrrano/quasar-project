<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goTo(path) {
  router.push(path)
}
</script>

<template>
  <q-layout view="hHh lpR fFf" class="bg-orange-4">

    <q-header elevated class="bg-red-10 text-white shadow-2">
      <q-toolbar class="q-px-md">
        <q-toolbar-title class="cursor-pointer text-h5 text-bold" @click="goTo('/')">
          Rick & Morty Explorer!
        </q-toolbar-title>
        <q-btn flat label="About" class="text-white" @click="goTo('/about')" />
      </q-toolbar>
    </q-header>


    <q-page-container>

      <router-view />

    </q-page-container>

    <q-footer class="bg-grey-10 text-grey-8 text-center">
      <div class="q-pa-sm">
        © 2025 Rick & Morty App. From Institut Tecnologic Barcelona
      </div>
    </q-footer>
  </q-layout>
</template>
