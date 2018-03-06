<template>
  <div id="app">
    <div class="income-box" id="income-box">
      <div class="income-title-bar">
        <h3 class="box-title">Income</h3>
        <select id="currency" v-model="currency">
          <option>USD</option>
          <option>EUR</option>
          <option>JPY</option>
          <option>GBP</option>
          <option>AUD</option>
          <option>CAD</option>
          <option>INR</option>
        </select>
      </div>

      <table class="cards">
        <li class="cards-item">
          <div class="income-card">
            <div class="card-content">
              <div class="card-title">Today</div>
              <p class="card-text">{{ convertCurrency(dailyUSDIncome) }} {{ currency }}</p>
            </div>
          </div>
        </li>

        <li class="cards-item">
          <div class="income-card">
            <div class="card-content">
              <div class="card-title">This Month</div>
              <p class="card-text">{{ convertCurrency(monthlyUSDIncome) }} {{ currency }}</p>
            </div>
          </div>
        </li>
    </div>

    <div class="reviews-box" id="reviews-box">
      <h3 class="box-title">Reviews</h3>
      <div class="active-review-box" v-if="activeReview">

        <table class="review-table">
          <tr class="table-header">
            <th>Name</th>
            <th>Id</th>
            <th>Time</th>
            <th>Price</th>
          </tr>
          <tr class="table-row">
            <td> {{ activeReview.project.name }}</td>
            <td>{{ activeReview.id }}</td>
            <td>{{ timeElapsed }}</td>
            <td>${{ activeReview.price }}</td>
          </tr>
        </table>

        <span>
          <a class="button -regular" :href="`https://review.udacity.com/#!/submissions/${activeReview.id}`" target="_blank">Resume review</a>
        </span>
      </div>
      <div v-else>
        <span class="text-no-review">No currently assigned reviews.</span>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "app",
  data: () => ({
    activeReview: null,
    currency: "USD",
    dailyUSDIncome: 0,
    monthlyUSDIncome: 0,
    rates: {
      USD: 1
    }
  }),
  computed: {
    timeElapsed: function() {
      return moment(
        new Date(this.activeReview.assigned_at).toLocaleTimeString(),
        "h:mm:ss a"
      ).fromNow();
    }
  },

  methods: {
    load() {
      this.runRecurring();
      this.updatePopup();
    },
    runRecurring() {
      chrome.runtime.sendMessage({ func: "runRecurring" });
      setTimeout(this.runRecurring, 10000);
    },
    updatePopup() {
      chrome.storage.local.get("dailyUSDIncome", data => {
        if ("dailyUSDIncome" in data) {
          this.dailyUSDIncome = data.dailyUSDIncome;
        }
      });
      chrome.storage.local.get("monthlyUSDIncome", data => {
        if ("monthlyUSDIncome" in data) {
          this.monthlyUSDIncome = data.monthlyUSDIncome;
        }
      });
      chrome.storage.local.get("activeReview", data => {
        if ("activeReview" in data) {
          this.activeReview = data.activeReview;
        }
      });
      setTimeout(this.updatePopup, 100);
    },
    convertCurrency(value) {
      return (value * this.rates[this.currency]).toFixed(2);
    }
  },
  beforeCreate() {
    fetch("https://api.fixer.io/latest?base=USD")
      .then(response => response.json())
      .then(json => {
        this.rates = Object.assign({}, this.rates, json.rates);
      });
  },
  mounted() {
    this.load();
  }
};
</script>

<style lang="scss">
/* To remove the default chrome extension borders */
/*----------------------------------*/
body {
  margin: 0 !important;
}
#app {
  background: rgb(242, 242, 242);
  font-size: 16px;
  height: auto;
  width: 500px;

  .reviews-box {
    margin-top: 5px;
    padding: 10px;
    box-shadow: 2px 4px 4px -4px rgba(0, 0, 0, 0.68);
    background-color: #fff;
    border-radius: 10px;
  }

  .income-box {
    padding: 10px;
    box-shadow: 2px 4px 4px -4px rgba(0, 0, 0, 0.68);
    background-color: #fff;
    border-radius: 10px;
  }
  .box-title {
    font-size: 1.25rem;
    letter-spacing: 2px;
    text-transform: uppercase;
    display: inline-block;
    margin-top: 0px;
    font-weight: 500;
  }

  select {
    letter-spacing: 2px;
    color: #9b56ef;
    float: right;
    border: 0;
    border-bottom: 2px solid currentcolor;
    font-weight: bold;
    border-radius: 0;
    letter-spacing: 2px;
    &:focus,
    &:active {
      outline: 0;
      border-bottom-color: red;
    }
    td,
    th {
      padding: 5px;
    }
  }

  /* Income Cards */
  /*----------------------------------------*/
  .cards {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .card-title {
    color: #696969;
    font-size: 1rem;
    font-weight: 400;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .card-text {
    color: #9b56ef;
    font-size: 1.25rem;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    font-size: 1rem;
  }

  .cards-item {
    display: flex;
    padding: 0.2rem;
    flex-grow: 1;
    flex-basis: 0;
    justify-content: space-evenly;
  }

  .income-card {
    width: 100%;
    background-color: white;
    border-radius: 0.25rem;
    box-shadow: 0 20px 40px -14px rgba(0, 0, 0, 0.25);
    transition: box-shadow 0.5s;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border: 1px dashed rgba(0, 0, 0, 0.1);
    &:hover {
      box-shadow: 4px 15px 15px -14px rgba(0, 0, 0, 0.2);
    }
  }

  .card-content {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    padding: 1rem;
  }

  .text-no-review {
    color: #807e81;
    font-size: 1.25rem;
    font-weight: 400;
    letter-spacing: 1px;
    text-transform: uppercase;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    font-size: 1rem;
  }

  .button {
    display: flex;
    overflow: hidden;

    padding: 12px 12px;

    cursor: pointer;
    user-select: none;
    transition: all 150ms linear;
    text-align: center;
    white-space: nowrap;
    text-decoration: none !important;
    text-transform: none;
    text-transform: capitalize;

    color: #fff;
    border: 0 none;
    border-radius: 0 0 10px 10px;

    font-size: 15px;
    font-weight: 600;
    letter-spacing: 2px;
    line-height: 1.3;

    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    justify-content: center;
    align-items: center;
    flex: 0 0 160px;

    box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.25);

    &:hover {
      transition: all 150ms linear;
      background-color: rgb(44, 42, 124);
      opacity: 0.85;
    }

    &:active {
      transition: all 150ms linear;
      opacity: 0.75;
    }

    &:focus {
      outline: 1px dotted #959595;
      outline-offset: -4px;
    }
  }

  .button.-regular {
    transition: background-color 500ms linear;
    background-color: #3425af;
    box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.2);

    &:hover {
      background-color: #3542cf;
      opacity: 1;
    }

    &:active {
      background-color: #c56cd6;
      opacity: 1;
    }
  }

  .review-table {
    width: 100%;
    background-color: white;
    border-radius: 0.25rem;
    box-shadow: 0 20px 40px -14px rgba(0, 0, 0, 0.25);
    transition: box-shadow 0.5s;
    overflow: hidden;
    border: 1px dashed rgba(0, 0, 0, 0.1);
    &:hover {
      box-shadow: 4px 15px 15px -14px rgba(0, 0, 0, 0.2);
    }

    .table-header {
      color: #696969;
      font-size: 0.8rem;
      font-weight: 400;
      text-align: left;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
    .table-row {
      color: #9b56ef;
      font-size: 1rem;
      font-weight: 500;
    }

    td,
    th {
      padding: 10px;
    }
  }
}
</style>
