<template>
  <div>
    <div v-if="remarkAddonVisible" class="remark-addon">
      <form v-if="remarkSaveVisible" class="remark-save form-inline">
        <button
          @click="buttonDispatch('addRemark', 'plus')"
          :disabled="remarkBodyExists || remarkTitleTopicExists || remarkIsEmpty"
          class="btn urplus-btn-primary"
          title="Add new remark"
        >
          <span class="fas fa-plus"></span>
        </button>
        <button
          @click="buttonDispatch('updateRemark', 'upload')"
          :disabled="remarkBodyCategoryExists || !remarkTitleTopicExists || remarkIsEmpty"
          class="btn urplus-btn-primary"
          title="Update existing remark"
        >
          <span class="fas fa-upload"></span>
        </button>
        <button
          @click="buttonDispatch('removeRemark', 'trash-alt')"
          :disabled="!remarkObjectExists || remarkIsEmpty"
          class="btn urplus-btn-danger"
          title="Remove existing remark"
        >
          <span class="fas fa-trash-alt"></span>
        </button>
        <input
          v-model="remark.title"
          class="form-control"
          type="text"
          placeholder="Title"
        >
        <input
          v-if="remarkType === 'comments'"
          v-model="remark.topic"
          list="comment-topics"
          class="form-control"
          type="text"
          placeholder="Topic"
        >
        <div
          v-if="remarkType === 'generalComments'"
          class="category-inputs"
        >
          <input
            v-model="remark.category"
            name="category"
            id="general-comment-passed"
            value="passed"
            type="radio"
          >
          <label for="general-comment-passed">Passed</label>
          <input
            v-model="remark.category"
            name="category"
            id="general-comment-failed"
            value="failed"
            type="radio"
          >
          <label for="general-comment-failed">Failed</label>
        </div>
      </form>
      <div v-if="!remarkSaveVisible" class="remark-search">
        <form class="form-inline">
          <input
            v-model="remarkSearchText"
            :placeholder="`Search ${remarkType}`"
            class="remark-search-input form-control"
            type="text"
          >
        </form>
        <ul>
          <li
            v-for="(remark, index) of filteredRemarks"
            :key="remark.body"
            @click="selectRemark(remark)"
            :class="[`remark-${remark.category}`]"
          >
            <span>{{ index + 1 }}</span>
            <span>{{ remark.body }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Vuex from 'vuex';

export default {
  data: () => ({
    filteredRemarks: [],
    remark: {},
    remarkAddonVisible: true,
    remarkSaveVisible: false,
    remarkSearchText: '',
    $container: null,
  }),
  computed: {
    remarkBodyExists() {
      return this.remarks.filter(remark =>
        remark.body === this.remark.body).length;
    },
    remarkBodyCategoryExists() {
      return this.remarks.filter(remark =>
        remark.body === this.remark.body &&
        remark.category === this.remark.category).length;
    },
    remarkTitleTopicExists() {
      return this.remarks.filter(remark =>
        remark.title === this.remark.title &&
        remark.topic === this.remark.topic).length;
    },
    remarkObjectExists() {
      return this.remarks.filter(remark =>
        remark.body === this.remark.body &&
        remark.category === this.remark.category &&
        remark.title === this.remark.title &&
        remark.topic === this.remark.topic).length;
    },
    remarkIsEmpty() {
      if (!this.remark.body || !this.remark.category ||
          !this.remark.title ||
          (!this.remark.topic && this.remarkType !== 'generalComments')) {
        return true;
      }
      return false;
    },
  },
  watch: {
    remarkSearchText(val) {
      if (!val) {
        this.filteredRemarks = [];
        return;
      }
      const searchPhrases = val.split(' ');
      const filteredRemarks = this.remarks.filter((remark) => {
        for (const phrase of searchPhrases) {  // eslint-disable-line
          if (!remark.body.toUpperCase().includes(phrase.toUpperCase())) {
            return false;
          }
        }
        return true;
      });
      filteredRemarks.sort((a, b) => b.retrievals - a.retrievals);
      this.filteredRemarks = filteredRemarks.slice(0, 5);
    },
  },
  methods: {
    ...Vuex.mapActions([
      'addRemark',
      'updateRemark',
      'removeRemark',
      'incrementRemark',
    ]),
    addListeners() {
      this.bodyListener();
      this.categoryListener();
      this.titleTopicListener();
      this.placeholderListener();
      this.remarkSearchListener();
    },
    bodyListener() {
      this.$container.on('input propertychange', 'textarea', (e) => {
        this.remark.body = $(e.currentTarget).val();
        this.forceRemarkUpdate();
      });
    },
    categoryListener() {
      this.$container.on('click', 'input:radio', (e) => {
        this.remark.category = $(e.currentTarget).val();
        this.remarkSaveVisible = true;
        this.forceRemarkUpdate();
      });
    },
    titleTopicListener() {
      $(this.$el).on('input', 'input', () => {
        this.forceRemarkUpdate();
      });
    },
    placeholderListener() {
      this.$container.on('keydown', 'textarea', (e) => {
        if (e.key === 'Tab') {
          e.preventDefault();
          this.selectPlaceholder();
        }
      });
    },
    remarkSearchListener() {
      $(this.$el).on('keydown', 'input.remark-search-input', (e) => {
        if (e.key === 'Enter') {
          this.selectRemark(this.filteredRemarks[0]);
        } else if (parseInt(e.key, 10) >= 1 && parseInt(e.key, 10) <= 5) {
          this.selectRemark(this.filteredRemarks[e.key - 1]);
        }
      });
    },
    forceRemarkUpdate() {
      this.remark = $.extend({}, this.remark);
    },
    selectRemark(remark) {
      this.remark = remark;
      this.forceRemarkUpdate();
      if (this.remarkType === 'generalComments') {
        if (!this.$container.find('textarea').length) {
          this.$container.find('button:contains("Edit")').click();
        }
      } else {
        this.$container.find(`input:radio[value="${this.remark.category}"]`).trigger('click');
      }
      setTimeout(() => {
        const textarea = this.$container.find('textarea')[0];
        $(textarea).val(this.remark.body);
        $(textarea).trigger('change');
        textarea.dispatchEvent(new Event('input'));
        this.selectPlaceholder();
        this.remarkSearchText = '';
      }, 50);
      this.incrementRemark({
        remark: this.remark,
        remarkType: this.remarkType,
      });
    },
    buttonDispatch(action, icon) {
      if (action === 'removeRemark') {
        const sure = confirm('Are you sure?');  // eslint-disable-line
        if (!sure) return;
      }
      const $originalSpan = $(this.$el).find(`span.fa-${icon}`);
      const $loadingSpan = $('<span class="fas fa-sync fa-spin"></span>');
      const $okSpan = $('<span class="fas fa-check"></span>').css('color', '#0f0');
      const $button = $originalSpan.parent();
      $button.addClass('disabled');
      $button.empty().append($loadingSpan);
      this[action]({
        remark: this.remark,
        remarkType: this.remarkType,
      }).then(() => {
        $button.empty().append($okSpan);
        setTimeout(() => {
          $button.empty().append($originalSpan);
          $button.removeClass('disabled');
        }, 2000);
      }, () => {
        $button.empty().append($originalSpan);
        $button.removeClass('disabled');
        alert('Sorry, something went wrong! ' +  // eslint-disable-line
              'If you think this is an error with urPlus, ' +
              'please submit a bug report.');
      });
    },
    selectPlaceholder() {
      const textarea = this.$container.find('textarea')[0];
      if (!$(textarea).val().includes('<#>')) {
        this.$container.find('button.btn-secondary').click();
      }
      const placeholderIndex = $(textarea).val().indexOf('<#>');
      $(textarea).focus();
      textarea.setSelectionRange(placeholderIndex, placeholderIndex + 3);
    },
  },
  mounted() {
    this.init();
    this.addListeners();
  },
};
</script>

<style lang="scss">
div.remark-addon {
  color: #222;
  margin-top: -1px;

  form.remark-save {
    border: 1px solid #dbe2e8;
    padding: 20px;

    div.category-inputs {
      display: inline;
      margin-left: 5px;
    }

    button, input {
      margin-right: 6px;
    }

    button {
      &.urplus-btn-primary {
        background: #3cb;
        border-radius: 2px;
        color: white;
        
        &:hover {
          filter: brightness(85%);
        }
      }

      &.urplus-btn-danger {
        background: #f55;
        border-radius: 2px;
        color: white;
        
        &:hover {
          filter: brightness(85%);
        }
      }

      span.fa {
        font-size: 18px;
        width: 18px;
      }
    }
  }

  div.remark-search {
    background: #f5f5f5;
    border: 1px solid #dbe2e8;
    padding: 20px;

    input {
      width: 100% !important;
    }

    ul {
      display: block;
      list-style: none;
      margin-bottom: 0;
      padding: 0;
      width: 100%;

      li:first-of-type {
        margin-top: 20px;
      }

      li {
        align-items: center;
        border-radius: 5px;
        color: #555;
        display: flex;
        margin-top: 5px;
        overflow: hidden;
        // text-overflow: fade(40px);
        white-space: nowrap;

        &:hover {
          cursor: pointer;
          filter: brightness(80%);
        }

        span {
          padding: 10px;

          &:first-child {
            color: #999;
          }
        }

        &.remark-critical, &.remark-failed {
          background: #fe7;
          border: 3px solid #ed6;

          span:first-child {
            border-right: 2px solid #ed6;
          }
        }

        &.remark-nitpick {
          background: #ddd;
          border: 3px solid #ccc;

          span:first-child {
            border-right: 2px solid #ccc;
          }
        }

        &.remark-awesome, &.remark-passed {
          background: #aea;
          border: 3px solid #9d9;

          span:first-child {
            border-right: 2px solid #9d9;
          }
        }
      }
    }
  }
}

.CodeMirror-code {
  div.remark-addon {
    margin-top: -5px;

    form.remark-save {
      background: white;
    }
  }
}
</style>
