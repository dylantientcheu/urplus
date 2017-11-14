<template>
  <section class="panel">
    <div class="panel-heading">
      <h5>Current Submission</h5>
    </div>
    <div v-if="currentSubmission">
      <p><strong>Project name:</strong> {{ currentSubmission.project.name }}</p>
      <p><strong>Submission ID:</strong> {{ currentSubmission.id }}</p>
      <p><strong>Time assigned:</strong> {{ currentSubmission.assigned_at.substring(11, 16) }} UTC</p>
      <p><strong>Price:</strong> ${{ currentSubmission.price }}</p>
      <p><a :href="'https://review.udacity.com/#!/submissions/' + String(currentSubmission.id)" target="_blank">Resume review</a></p>
    </div>
    <div v-else>
      <p>No currently assigned submissions.</p>
    </div>
  </section>
</template>

<script>
export default {
  data: () => ({
    currentSubmission: null,
  }),
  mounted() {
    this.load();
  },
  methods: {
    load() {
      this.getCurrentSubmission();
      setTimeout(this.load, 1000);
    },
    getCurrentSubmission() {
      chrome.storage.local.get('currentSubmission', (data) => {
        if ('currentSubmission' in data) {
          this.currentSubmission = data.currentSubmission;
        }
      });
    },
  },
};
</script>
