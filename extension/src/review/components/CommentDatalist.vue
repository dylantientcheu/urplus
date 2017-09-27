<template>
  <datalist id="comment-topics">
    <option
      v-for="topic of topics"
      :key="topic"
      :value="topic"
    >
  </datalist>
</template>

<script>
import Vuex from 'vuex';

export default {
  computed: {
    ...Vuex.mapState([
      'comments',
    ]),
    topics() {
      return this.comments.map(comment => comment.topic)
        .filter((comment, index, self) => self.indexOf(comment) === index)
        .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    },
  },
};
</script>
