
<script setup>
import DefaultTheme from 'vitepress/theme'
import MyNavbar from './components/MyNavbar.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #nav-bar-content-before>
      <MyNavbar />
    </template>
  </Layout>
</template>
