<template>
  <div id="app" >
    <TheHeader/>
    <div class="container mt-3">
        <router-view></router-view>
    </div>
   </div>
</template>

<script>
import TheHeader from './components/TheHeader.vue'
export default {
  name: 'App',
  components: {
    TheHeader
  }
}
</script>

<style>

</style>
