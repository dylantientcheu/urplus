import Vue from 'vue';
import Vuex from 'vuex';
import RemarkAddonMixin from './RemarkAddonMixin';

export default Vue.extend({
  mixins: [RemarkAddonMixin],
  data() {
    return {
      remarkType: 'generalComments',
    };
  },
  computed: {
    ...Vuex.mapState([
      'generalComment',
      'generalComments',
    ]),
    remarks() {
      return this.generalComments;
    },
  },
  methods: {
    init() {
      this.$container = $(this.$el).prev();
      if (this.generalComment) {
        this.remarkAddonVisible = false;
        this.remarkSaveVisible = true;
        this.remark = this.remarks.filter(remark =>
          remark.body === this.generalComment)[0];
        if (this.remark === undefined) {
          this.remark = {
            topic: undefined,
          };
          this.remark.body = this.generalComment;
        }
      } else {
        this.remark = {
          topic: undefined,
        };
      }
      this.forceRemarkUpdate();
      this.addGeneralCommentListeners();
      if (this.$container.find('textarea').length) {
        this.observeTextarea();
      }
    },
    addGeneralCommentListeners() {
      this.$container[0].arrive('textarea', () => {
        this.remarkAddonVisible = true;
        this.remarkSaveVisible = true;
        this.$container.find('textarea').trigger('change');
        this.observeTextarea();
      });
      this.$container[0].leave('textarea', () => {
        this.remarkAddonVisible = false;
      });
      this.$container.on('input propertychange', 'textarea', () => {
        if (this.$container.find('textarea').val()) {
          this.remarkSaveVisible = true;
        } else {
          this.remarkSaveVisible = false;
        }
      });
      $(this.$el).on('click', 'input:radio', (e) => {
        this.remark.category = $(e.currentTarget).val();
        this.remarkSaveVisible = true;
        this.forceRemarkUpdate();
      });
    },
    observeTextarea() {
      new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          this.remark.body = $(mutation.target).val();
          if (this.$container.find('textarea').val()) {
            this.remarkSaveVisible = true;
          } else {
            this.remarkSaveVisible = false;
          }
        });
      }).observe(
        this.$container.find('textarea')[0],
        { attributes: true, childList: true, characterData: true },
      );
    },
  },
});
