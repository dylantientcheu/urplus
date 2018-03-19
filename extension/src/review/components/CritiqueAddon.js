import Vue from 'vue';
import Vuex from 'vuex';
import RemarkAddonMixin from './RemarkAddonMixin';

export default Vue.extend({
  mixins: [RemarkAddonMixin],
  data() {
    return {
      remarkType: 'critiques',
      topic: '',
    };
  },
  computed: {
    ...Vuex.mapState([
      'critiques',
      'submissionCritiques',
    ]),
    remarks() {
      return this.critiques.filter(critique =>
        critique.topic === this.topic);
    },
  },
  methods: {
    init() {
      this.$container = $(this.$el).prev();
      $('div[ng-repeat="critique in critiques"]').each((index) => {
        if ($('div[ng-repeat="critique in critiques"]')[index] === $(this.$el).prev()[0]) {
          this.topic = this.submissionCritiques[index].rubric_item.criteria;
          this.position = index;
        }
      });
      const observation = this.submissionCritiques[this.position].observation;
      if (observation || this.$container.find('span.result-icon').length) {
        this.remarkAddonVisible = false;
        this.remarkSaveVisible = true;
        this.remark = this.remarks.filter(remark =>
          remark.body === observation)[0];
        if (this.remark === undefined) {
          this.remark = { topic: this.topic };
          this.remark.body = observation;
          if (this.$container.find('span.result-icon').hasClass('passed')) {
            this.remark.category = 'passed';
          } else if (this.$container.find('span.result-icon').hasClass('failed')) {
            this.remark.category = 'failed';
          }
        }
      } else {
        this.remark = { topic: this.topic };
      }
      this.forceRemarkUpdate();
      this.addCritiqueListeners();
    },
    addCritiqueListeners() {
      this.$container[0].arrive('textarea', () => {
        this.remarkAddonVisible = true;
        this.remarkSaveVisible = true;
        this.$container.find('textarea').trigger('change');
      });

      this.$container[0].leave('textarea', () => {
        if (this.$container.find('span.result-icon').length) {
          this.remarkAddonVisible = false;
        } else {
          this.remark = { topic: this.topic };
          this.remarkSaveVisible = false;
        }
      });
      this.$container.on('click', 'input:radio', () => {
        this.remarkSaveVisible = true;
      });

      // Help add remarks to an element with previous reviews
      if (this.$container.find('[ng-if="!!critique.prev_observation"]').length) {
        this.remarkAddonVisible = true;
        this.remarkSaveVisible = false;
      }
    },
  },
});
