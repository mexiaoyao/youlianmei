<template>
  <a-layout>
    <a-layout-header>
      <router-link to="/">Home 头部</router-link>|
      <router-link to="/about">About 头部</router-link>
    </a-layout-header>
    <a-layout-content>
      <router-view />
    </a-layout-content>
    <a-layout-footer>Footer</a-layout-footer>
  </a-layout>
</template>
<script>
export default {
  name: "layouts"
};
</script>
