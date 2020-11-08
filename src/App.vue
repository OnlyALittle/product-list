<template>
    <router-view></router-view>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
* {
  -webkit-tap-highlight-color: transparent;
}
html {
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC","Helvetica Neue",STHeiti,"Microsoft Yahei",Tahoma,Simsun,sans-serif;
}
body {
  margin: 0;
  padding: 0%;
  background-color: #f2f2f2;
}

#app {
  min-height: 100vh;
}

p {
  margin: 0;
  padding: 0%;
}
</style>
