<template>
  <section class="panel">
    <div class="panel-heading">
      <h5>Current Submission</h5>
    </div>
    <div v-if="currentSubmission">
      <p><strong>Project name:</strong> {{ currentSubmission.project.name }}</p>
      <p><strong>Price:</strong> ${{ currentSubmission.price }}</p>
      <p><strong>Submission ID:</strong> {{ currentSubmission.id }}</p>
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
