<template>
  <div class="app">
    <yandex-map
        v-if="!loading"
        :coords="averageCoords"
        :zoom="10"
    >
      <ymap-marker
          v-for="item of activeSearchList"
          :coords="item.coordinates"
          :marker-id="index"
          :icon="getIconBySearchState(item.state)"
          :balloon-template="getBalloonTemplateByActiveSearch(item)"
      />
    </yandex-map>
  </div>
</template>

<style>
* {
  margin: 0;
}

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
const markerPathByState = {
  Dead: 'grey-marker.svg',
  Alive: 'green-marker.svg',
  Lost: 'red-marker.svg',
}

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
    },
    averageCoords() {
      const getAveragePoint = (extractPoint) => this.coords.map(extractPoint).reduce((amount, current) => amount + current, 0) / this.coords.length;
      return [getAveragePoint(item => item[0]), getAveragePoint(item => item[1])]
    }
  },
  methods: {
    getBalloonTemplateByActiveSearch(activeSearch) {
      console.log(activeSearch);
      return `
        <a href="${activeSearch.url}">${activeSearch.name}</a>
      `
    },
    getIconBySearchState(state) {
      console.log(state)
      return {
        layout: 'default#image',
        imageHref: markerPathByState?.[state] ?? state.Lost,
        imageSize: [30, 40],
        imageOffset: [-15, -35]
      }
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
