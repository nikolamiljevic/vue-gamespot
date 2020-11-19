<template>
  <div>
    <comp-header/>
      <router-view/>
    <comp-footer/>
  </div>
</template>

<script>

import compHeader from './components/header-footer/Header'
import compFooter from './components/header-footer/Footer'

export default {

  components:{
    compHeader,
    compFooter
  }

}
</script>

<style>
  @import './assets/style.css'
</style>
