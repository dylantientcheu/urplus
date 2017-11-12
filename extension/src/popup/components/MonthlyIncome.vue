<template>
  <section class="panel">
    <div>
      <span><strong>Income this month:</strong> ${{ monthlyIncome }}</span>
    </div>
  </section>
</template>

<script>
export default {
  data: () => ({
    monthlyIncome: 0,
  }),
  mounted() {
    this.load();
  },
  methods: {
    load() {
      this.getMonthlyIncome();
      setTimeout(this.load, 1000);
    },
    getMonthlyIncome() {
      chrome.storage.local.get('monthlyIncome', (data) => {
        if ('monthlyIncome' in data) {
          this.monthlyIncome = data.monthlyIncome;
        }
      });
    },
  },
};
</script>
