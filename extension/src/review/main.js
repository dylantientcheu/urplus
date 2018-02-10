/* eslint-disable no-new */
import 'jquery';
import 'arrive';
import Vue from 'vue';
import store from './store';
import CommentAddon from './components/CommentAddon';
import CommentDatalist from './components/CommentDatalist';
import CritiqueAddon from './components/CritiqueAddon';
import GeneralCommentAddon from './components/GeneralCommentAddon';
import LoadingModal from './components/LoadingModal';
import PassAllOpenCritiques from './components/PassAllOpenCritiques';
import './style.css';

function VueTemplate(component, el) {
  new Vue({
    el,
    store,
    render: h => h(component),
  });
}

function addCommentListener() {
  $(document)[0].arrive('.CodeMirror-code .comment-container', (element) => {
    const $el = $('<div class="urplus-comment"></div>')
      .insertAfter($(element));
    setTimeout(() => {
      VueTemplate(CommentAddon, $el[0]);
    }, 50);
  });
}

function appendLoadingModal() {
  const $el = $('<div id="loading-modal"></div>').appendTo('body');
  VueTemplate(LoadingModal, $el[0]);
}

function appendCommentDatalist() {
  const $el = $('<div id="comment-topics"></div>').appendTo('body');
  VueTemplate(CommentDatalist, $el[0]);
}

function appendPassAllCritiques() {
  const $el = $('<div id="pass-all-critiques"></div>')
    .insertBefore($('div[state="critiquesState"]'));
  VueTemplate(PassAllOpenCritiques, $el[0]);
}

function appendCritiqueAddons() {
  const $els = $('<div class="urplus-critique"></div>')
    .insertAfter($('div[ng-repeat="critique in critiques"]'));
  setTimeout(() => {
    $els.each(function () {  // eslint-disable-line
      VueTemplate(CritiqueAddon, this);
    });
  }, 50);
}

function appendGeneralCommentAddon() {
  const $el = $('<div class="urplus-general-comment"></div>')
    .insertAfter($('div#generalComment').closest('div.row'));
  setTimeout(() => {
    VueTemplate(GeneralCommentAddon, $el[0]);
  }, 50);
}

function init() {
  if ($(document).find($('div#loading-modal').length)) {
    $('div#loading-modal').remove();
  }
  $('<link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet">')
    .appendTo('head');
  const submissionId = parseInt(window.location.href.match(/\d+/), 10);
  if (!submissionId || !window.location.href.includes('submissions')) return;
  appendLoadingModal();
  store.dispatch('init', { submissionId })
    .then(() => {
      $(`<span>$${store.state.price}</span>`).insertAfter('h1.h-slim');
      appendCommentDatalist();
      appendPassAllCritiques();
      appendCritiqueAddons();
      appendGeneralCommentAddon();
      $('div#loading-modal').remove();
    })
    .catch(() => {
      alert('Sorry, something went wrong while loading urPlus. ' +  // eslint-disable-line
            'If you think this is an error with urPlus, ' +
            'please submit a bug report.');
      $('div#loading-modal').remove();
    });
}

$(() => {
  init();
});

$(window).on('hashchange', () => {
  init();
});

$(document).on('submit', 'form', () => false);

$(document).on('input change', 'textarea', function () {  // eslint-disable-line
  this.setAttribute('style', `height: ${this.scrollHeight}px; overflow-y: hidden;`);
  this.style.height = 'auto';
  this.style.height = `${this.scrollHeight}px`;
});

addCommentListener();
