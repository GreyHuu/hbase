<template >
    <router-view/>
</template>

<script>

  import Vue from "vue";
  import {ACCESS_TOKEN, CURRENT_USER} from "@/store/mutation-types";
  import {getCurrentUser} from "@/api/userApi";

  export default {
    name: 'BlankLayout',
  }
</script>

<style scoped>

</style>
