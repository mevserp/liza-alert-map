<template>
  <div class="app">
    <yandex-map
        v-if="!loading"
        :coords="coords[0]"
        :zoom="10"
    >
      <ymap-marker
          v-for="item of activeSearchList"
          :coords="item.coordinates"
          :marker-id="index"
          :balloon-template="getBalloonTemplateByActiveList(item)"
      />
    </yandex-map>
  </div>
</template>

<style>
.app {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.ymap-container {
  height: 100%;
}
</style>

<script lang="js">
export default {
  el: '#app',
  data() {
    return {
      activeSearchList: [],
      loading: true,
    }
  },
  computed: {
    coords() {
      return this.activeSearchList.map((item) => item.coordinates);
    }
  },
  methods: {
    getBalloonTemplateByActiveList(activeList) {
      console.log(activeList);
      return `
        <a href="${activeList.url}">${activeList.name}</a>
      `
    }
  },
  async mounted() {
    const response = await fetch('http://localhost:5000/activeSearchList');
    const activeSearchList = await response.json();

    this.activeSearchList = activeSearchList;
    this.loading = false;
  }
}
</script>
