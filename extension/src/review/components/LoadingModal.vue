<template>
  <div id="loading-modal">
    <modal name="loading" :clickToClose="false">
      <div class="loading-wrapper">
        <h1>Loading urPlus</h1>
        <img src="/assets/images/loading.gif">
      </div>
    </modal>
  </div>
</template>

<script>
import Vue from 'vue';
import VModal from 'vue-js-modal';

Vue.use(VModal);

export default {
  mounted() {
    this.$modal.show('loading');
  },
};
</script>

<style lang="scss">
div#loading-modal {
  div.loading-wrapper {
    align-items: center;
    display: flex;
    flex-flow: column;
    height: 100%;
    justify-content: center;
    text-align: center;
    width: 100%;
  }
}
</style>
