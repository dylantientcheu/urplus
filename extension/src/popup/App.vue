<template>
  <div id="app">
    <h3>Income</h3>
    <p><strong>Today:</strong> ${{ dailyIncome }}</p>
    <p><strong>This month:</strong> ${{ monthlyIncome }}</p>
    <hr>
    <h3>First Active Review</h3>
    <div v-if="activeReview">
      <p><strong>Project name:</strong> {{ activeReview.project.name }}</p>
      <p><strong>Submission ID:</strong> {{ activeReview.id }}</p>
      <p><strong>Assigned at:</strong> {{ (new Date(activeReview.assigned_at)).toLocaleTimeString() }}</p>
      <p><strong>Price:</strong> ${{ activeReview.price }}</p>
      <p><a :href="`https://review.udacity.com/#!/submissions/${activeReview.id}`" target="_blank">Resume review</a></p>
    </div>
    <div v-else>
      <p>No currently assigned reviews.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data: () => ({
    activeReview: null,
    dailyIncome: 0,
    monthlyIncome: 0,
  }),
  methods: {
    load() {
      this.runRecurring();
      this.updatePopup();
    },
    runRecurring() {
      chrome.runtime.sendMessage({ func: 'runRecurring' });
      setTimeout(this.runRecurring, 10000);
    },
    updatePopup() {
      chrome.storage.local.get('dailyIncome', (data) => {
        if ('dailyIncome' in data) {
          this.dailyIncome = data.dailyIncome;
        }
      });
      chrome.storage.local.get('monthlyIncome', (data) => {
        if ('monthlyIncome' in data) {
          this.monthlyIncome = data.monthlyIncome;
        }
      });
      chrome.storage.local.get('activeReview', (data) => {
        if ('activeReview' in data) {
          this.activeReview = data.activeReview;
        }
      });
      setTimeout(this.updatePopup, 100);
    },
  },
  mounted() {
    this.load();
  },
};
</script>

<style lang="scss">
#app {
  background: rgb(242, 242, 242);
  font-size: 16px;
  height: 400px;
  padding: 10px;
  width: 400px;
}
</style>
