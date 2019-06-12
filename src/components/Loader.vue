<template>
  <div v-if="visible" class="row">
    <div class="col-md-12 center mt-5">
      <div id="loading" class="green">

        <svg width="202px" height="230px" viewBox="0 0 202 230" version="1.1"
             xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <title>Artboard 11</title>
          <desc>Created with Sketch.</desc>
          <defs></defs>
          <g id="CRYPTO-TASK" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="Artboard-11" stroke-width="3">
              <polygon class="path" id="Fill-1" stroke="#3DA2DD"
                       points="99.8195484 2 2 56.7852987 2 170.222614 62.3870968 207 62.3870968
                       182.757952 22.7580645 158.623713 22.7580645 68.886892 98.2419355 26.6112322
                       98.2419355 34.819155 98.2419355 67.4195573 118.370968 78.6354847
                       118.370968 172.719152 120.344242 172.719152 139.129032 161.935088
                       139.129032 90.2024191 158 100.716959 158 77.0183453 119 55.2885045
                       119 53.6976906 119 19.1529602 119 13.2002574"></polygon>
              <polygon class="path" id="Fill-3" stroke="#5ED170"
                       points="137.394422 46.5789434 178.701841 69.2009179 178.701841
                       160.777438 100.755315 204.158992 99.314741 203.31132 99.314741
                       160.56878 59.2988048 137.610842 59.2988048 91.1192936 84.4701195
                       76.7833904 84.4701195 52.9690861 38 79.4357033 38 149.250962 77.3692271
                       171.837539 78.0159363 171.611493 78.0159363 172.2089 78.0159363 206.265442
                       78.0159363 214.803641 100.455841 228 200 172.597649 200 57.2850716
                       137.394422 23"></polygon>
            </g>
          </g>
        </svg>
        <h3>Loading...</h3>
      </div>
    </div>
  </div>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
export default {
  name: 'Loader',
  computed: {
    visible() {
      return this.$store.state.ui.mainLoader;
    },
  },
};
</script>
