<template>
  <div id="app">
    <income-box class="box"/>
    <review-box class="box"/>
  </div>
</template>

<script>
import Income from './components/Income';
import Review from './components/Review';

export default {
  name: 'app',
  components: {
    'income-box': Income,
    'review-box': Review,
  },
  methods: {
    runRecurring() {
      chrome.runtime.sendMessage({ func: 'runRecurring' });
      setTimeout(this.runRecurring, 10000);
    },
    updatePopup() {
      chrome.storage.local.get('dailyUSDIncome', (data) => {
        if ('dailyUSDIncome' in data) {
          this.$store.commit('updateProperty', {
            property: 'dailyUSDIncome',
            value: data.dailyUSDIncome,
          });
        }
      });
      chrome.storage.local.get('monthlyUSDIncome', (data) => {
        if ('monthlyUSDIncome' in data) {
          this.$store.commit('updateProperty', {
            property: 'monthlyUSDIncome',
            value: data.monthlyUSDIncome,
          });
          this.monthlyUSDIncome = data.monthlyUSDIncome;
        }
      });
      chrome.storage.local.get('activeReview', (data) => {
        if ('activeReview' in data) {
          this.$store.commit('updateProperty', {
            property: 'activeReview',
            value: data.activeReview,
          });
        }
      });
      setTimeout(this.updatePopup, 100);
    },
  },
  beforeCreate() {
    fetch('https://api.fixer.io/latest?base=USD')
      .then(response => response.json())
      .then((json) => {
        this.$store.commit('updateRates', { newRates: json.rates });
      });
  },
  mounted() {
    this.runRecurring();
    this.updatePopup();
  },
};
</script>

<style lang="scss">
body {
  margin: 0 !important;

  #app {
    background: rgb(242, 242, 242);
    font-size: 16px;
    height: auto;
    width: 500px;

    .box {
      background-color: white;
      border-radius: 10px;
      box-shadow: 2px 4px 4px -4px rgba(0, 0, 0, 0.68);
      padding: 10px;

      .box-title {
        display: inline-block;
        font-size: 1.25rem;
        font-weight: 500;
        letter-spacing: 2px;
        margin-top: 0px;
        text-transform: uppercase;
      }
    }
  }
}
</style>
