<template>
  <div class="home" @click="test">这是home</div>
</template>

<script>
// @ is an alias to /src
import { testGet } from '@/network/api';
export default {
  name: 'Home',
  methods: {
    test () {
      testGet().then((res) => {
        console.log(111);
        console.log(res);
      });
    }
  }
};
</script>
