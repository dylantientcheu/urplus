<template>
  <div id="income-box">
    <h3 class="box-title">Income</h3>
    <select id="currency" :value="currency" @input="updateCurrency">
      <option>USD</option>
      <option>EUR</option>
      <option>JPY</option>
      <option>GBP</option>
      <option>AUD</option>
      <option>CAD</option>
      <option>INR</option>
    </select>
    <table class="cards">
      <li class="card-item">
        <div class="card-title">Today</div>
        <p class="card-text">{{ convertCurrency(dailyUSDIncome) }} {{ currency }}</p>
      </li>
      <li class="card-item">
        <div class="card-title">This Month</div>
        <p class="card-text">{{ convertCurrency(monthlyUSDIncome) }} {{ currency }}</p>
      </li>
    </table>
  </div>
</template>

<script>
import Vuex from 'vuex';

export default {
  computed: {
    ...Vuex.mapState(['currency', 'dailyUSDIncome', 'monthlyUSDIncome', 'rates']),
  },
  methods: {
    updateCurrency(e) {
      this.$store.commit('updateProperty', { property: 'currency', value: e.target.value });
    },
    convertCurrency(value) {
      return (value * this.rates[this.currency]).toFixed(2);
    },
  },
};
</script>

<style lang="scss">
#income-box {
  #currency {
    letter-spacing: 2px;
    color: rgb(155, 86, 239);
    float: right;
    border: 0;
    border-bottom: 2px solid currentcolor;
    font-weight: bold;
    border-radius: 0;
    letter-spacing: 2px;

    &:focus, &:active {
      outline: 0;
      border-bottom-color: red;
    }

    td, th {
      padding: 5px;
    }
  }

  .cards {
    display: flex;

    .card-item {
      background-color: white;
      border: 1px dashed rgba(0, 0, 0, 0.1);
      border-radius: 0.25rem;
      box-shadow: 0 20px 40px -14px rgba(0, 0, 0, 0.25);
      display: flex;
      flex: 1 1 auto;
      flex-direction: column;
      margin: 5px;
      overflow: hidden;
      padding: 1.2rem;
      transition: box-shadow 0.5s;
      width: 100%;

      &:hover {
        box-shadow: 4px 15px 15px -14px rgba(0, 0, 0, 0.2);
      }

      .card-title {
        color: rgb(105, 105, 105);
        font-size: 1rem;
        font-weight: 400;
        letter-spacing: 1px;
        text-transform: uppercase;
      }

      .card-text {
        color: rgb(155, 86, 239);
        flex: 1 1 auto;
        font-size: 1.25rem;
        font-weight: 600;
        letter-spacing: 2px;
        text-transform: uppercase;
      }
    }
  }
}
</style>
