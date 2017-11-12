<template>
  <div id="app">
    <div class="container-fluid full-height">
      <div class="row full-height">
        <div class="col col-flex full-height">
          <current-submission></current-submission>
          <monthly-income></monthly-income>
        </div>
        <div class="col-7 col-flex full-height">
          <assignment-dashboard></assignment-dashboard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'jquery';
import 'popper.js/dist/umd/popper';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import AssignmentDashboard from './components/AssignmentDashboard';
import CurrentSubmission from './components/CurrentSubmission';
import MonthlyIncome from './components/MonthlyIncome';

export default {
  name: 'app',
  components: {
    'assignment-dashboard': AssignmentDashboard,
    'current-submission': CurrentSubmission,
    'monthly-income': MonthlyIncome,
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      chrome.runtime.sendMessage({ func: 'runRecurring' });
      setTimeout(this.load, 5000);
    },
  },
};
</script>

<style lang="scss">
#app {
  background: #eee;
  height: 500px;
  padding: 10px;
  width: 800px;

  div.col-flex {
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    section.panel {
      background: white;
      border-radius: 5px;
      box-shadow: 2px 2px 12px rgba(46, 61, 73, 0.2);
      margin: 10px 0;

      div.panel-heading {
        border-bottom: 1px solid #eee;
        height: 46px;
      }

      & > * {
        padding: 10px;
      }

      &:first-child {
        flex-grow: 1;
      }
    }
  }

  .full-height {
    height: 100%;
  }
}
</style>
