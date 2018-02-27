<template>
  <div id="app">
    <h3 style="display: inline-block">Income</h3>
    <select id="currency" v-model="currency">
      <option>USD</option>
      <option>EUR</option>
      <option>JPY</option>
      <option>GBP</option>
      <option>AUD</option>
      <option>CAD</option>
      <option>INR</option>
    </select><br>
    <span><strong>Today:</strong> {{ convertCurrency(dailyUSDIncome) }} {{ currency }}</span><br>
    <span><strong>This month:</strong> {{ convertCurrency(monthlyUSDIncome) }} {{ currency }}</span>
    <hr>
    <h3>First Active Review</h3>
    <div v-if="activeReview">
      <span><strong>Project name:</strong> {{ activeReview.project.name }}</span><br>
      <span><strong>Submission ID:</strong> {{ activeReview.id }}</span><br>
      <span><strong>Assigned at:</strong> {{ (new Date(activeReview.assigned_at)).toLocaleTimeString() }}</span><br>
      <span><strong>Price:</strong> ${{ activeReview.price }}</span><br>
      <span><a :href="`https://review.udacity.com/#!/submissions/${activeReview.id}`" target="_blank">Resume review</a></span>
    </div>
    <div v-else>
      <span>No currently assigned reviews.</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data: () => ({
    activeReview: null,
    currency: 'USD',
    dailyUSDIncome: 0,
    monthlyUSDIncome: 0,
    rates: {
      USD: 1,
    },
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
      chrome.storage.local.get('dailyUSDIncome', (data) => {
        if ('dailyUSDIncome' in data) {
          this.dailyUSDIncome = data.dailyUSDIncome;
        }
      });
      chrome.storage.local.get('monthlyUSDIncome', (data) => {
        if ('monthlyUSDIncome' in data) {
          this.monthlyUSDIncome = data.monthlyUSDIncome;
        }
      });
      chrome.storage.local.get('activeReview', (data) => {
        if ('activeReview' in data) {
          this.activeReview = data.activeReview;
        }
      });
      setTimeout(this.updatePopup, 100);
    },
    convertCurrency(value) {
      return (value * this.rates[this.currency]).toFixed(2);
    },
  },
  beforeCreate() {
    fetch('https://api.fixer.io/latest?base=USD')
      .then(response => response.json())
      .then((json) => { this.rates = Object.assign({}, this.rates, json.rates); });
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
  line-height: 1.5;
  padding: 10px;
  width: 400px;
}
</style>
