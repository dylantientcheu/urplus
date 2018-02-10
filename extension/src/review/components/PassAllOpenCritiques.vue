<template>
  <button
    @click="passAllOpenCritiques"
    class="btn urplus-btn-passed"
  >
    Pass All Open Critiques
  </button>
</template>

<script>
export default {
  methods: {
    passAllOpenCritiques() {
      $('input:radio[value="passed"]').click();
      setTimeout(() => {
        $('.critique-container').each(function () {  // eslint-disable-line
          $(this).find('button.btn-secondary').click();
        });
        $(this.$el)
          .empty()
          .append($('<span class="fas fa-check"></span>'));
        setTimeout(() => {
          $(this.$el)
          .text('Pass All Open Critiques');
        }, 2000);
      }, 50);
    },
  },
};
</script>

<style lang="scss">
button.urplus-btn-passed {
  background: #15c26b;
  border-radius: 2px;
  color: white !important;

  &:hover {
    filter: brightness(85%);
  }
}
</style>
