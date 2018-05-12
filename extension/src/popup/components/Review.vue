<template>
  <div id="review-box" class="box">
    <h3 class="box-title">Reviews</h3>
    <div v-if="activeReview">
      <table id="review-table">
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
          <td>${{ parseFloat(activeReview.price).toFixed(2) }}</td>
        </tr>
      </table>
      <span>
        <a :href="`https://review.udacity.com/#!/submissions/${activeReview.id}`" target="_blank"
          class="button"
        >Resume review</a>
      </span>
    </div>
    <div v-else>
      <span class="text-no-review">No currently assigned reviews.</span>
    </div>
  </div>
</template>

<script>
import Vuex from 'vuex';
import moment from 'moment';

export default {
  computed: {
    ...Vuex.mapState(['activeReview']),
    // Get the time elapsed since review assignment
    timeElapsed() {
      return moment(new Date(this.activeReview.assigned_at)).fromNow();
    },
  },
};
</script>

<style lang="scss">
#review-box {
  margin-top: 5px;

  #review-table {
    background-color: white;
    border: 1px dashed rgba(0, 0, 0, 0.1);
    border-radius: 0.25rem;
    box-shadow: 0 20px 40px -14px rgba(0, 0, 0, 0.25);
    overflow: hidden;
    transition: box-shadow 0.5s;
    width: 100%;

    &:hover {
      box-shadow: 4px 15px 15px -14px rgba(0, 0, 0, 0.2);
    }

    .table-header {
      color: rgb(105, 105, 105);
      font-size: 0.8rem;
      font-weight: 400;
      letter-spacing: 1px;
      text-align: left;
      text-transform: uppercase;
    }

    .table-row {
      color: rgb(155, 86, 239);
      font-size: 1rem;
      font-weight: 500;
    }

    td, th {
      padding: 10px;
    }
  }

  .button {
    align-items: center;
    background-color: rgb(52, 37, 175);
    border: 0 none;
    border-radius: 0 0 10px 10px;
    box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.2);
    color: #fff;
    cursor: pointer;
    display: flex;
    flex: 0 0 160px;
    font-size: 15px;
    font-weight: 600;
    justify-content: center;
    letter-spacing: 2px;
    line-height: 1.3;
    overflow: hidden;
    padding: 12px 12px;
    text-align: center;
    text-decoration: none !important;
    text-transform: capitalize;
    transition: background-color 500ms linear;
    user-select: none;
    white-space: nowrap;

    &:hover {
      background-color: rgb(53, 66, 207);
      box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.2);
    }

    &:active {
      background-color: rgb(197, 108, 214);
    }

    &:focus {
      outline: 1px dotted rgb(149, 149, 149);
      outline-offset: -4px;
    }
  }

  .text-no-review {
    color: #807e81;
    flex: 1 1 auto;
    font-size: 1.25rem;
    font-weight: 400;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
}
</style>
