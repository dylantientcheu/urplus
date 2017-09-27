import Vue from 'vue';
import Vuex from 'vuex';
import RemarkAddonMixin from './RemarkAddonMixin';

export default Vue.extend({
  mixins: [RemarkAddonMixin],
  data() {
    return {
      remarkType: 'comments',
    };
  },
  computed: {
    ...Vuex.mapState([
      'comments',
    ]),
    remarks() {
      return this.comments;
    },
  },
  methods: {
    init() {
      this.$container = $(this.$el).parent();
      if (this.$container.find('textarea').length) {
        this.remarkAddonVisible = false;
        this.remarkSaveVisible = true;
        this.remark = this.remarks.filter(remark =>
          remark.body === this.$container.find('textarea').val())[0];
        if (this.remark === undefined) {
          this.remark = {};
          this.remark.body = this.$container.find('textarea').val();
          this.remark.category = ({
            Required: 'critical',
            Suggestion: 'nitpick',
            Awesome: 'awesome',
          })[this.$container.find('div.pill').text()];
        }
        this.observeCommentViewer();
      } else {
        $('html, body').animate({ scrollTop: this.$container.offset().top - 400 }, 300);
        setTimeout(() => {
          $(this.$el).find('input.remark-search-input').focus();
        }, 100);
      }
      this.forceRemarkUpdate();
      this.addCommentListeners();
    },
    addCommentListeners() {
      this.$container.on('click', 'input:radio', () => {
        this.observeCommentViewer();
      });
    },
    observeCommentViewer() {
      new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === 'class') {
            if (!$(mutation.target).hasClass('ng-hide')) {
              this.remarkAddonVisible = false;
            } else {
              this.remarkAddonVisible = true;
              this.$container.find('textarea').trigger('change');
            }
          }
        });
      }).observe(
        this.$container.find('div.comment-viewer')[0],
        { attributes: true, childList: true, characterData: true },
      );
    },
  },
});
