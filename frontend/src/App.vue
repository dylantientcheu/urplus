<template>
  <div id="app">
    <div class="container-fluid">
      <div class="row">
        <left-nav></left-nav>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import 'jquery';
import 'popper.js/dist/umd/popper';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import LeftNav from './components/LeftNav';

export default {
  name: 'app',
  components: {
    'left-nav': LeftNav,
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Nunito');

#app {
  height: 100%;

  main {
    background: #fafafa;
    bottom: 0;
    left: 300px;
    margin: auto;
    overflow-x: auto;
    overflow-y: auto;
    padding: 20px;
    position: fixed;
    right: 0;
    top: 0;

    h1, h2, h3, h4, h5, h6 {
      font-family: "Nunito", sans-serif;
    }

    div.documentation {
      h1, h2, h3 {
        padding-top: 50px;
      }

      h4, h5, h6 {
        padding-top: 20px;
      }

      & > * {
        padding-bottom: 5px;
        padding-top: 5px;
      }
    }

    button {
      &.urplus-btn-primary {
        background: #3cb;
        border-radius: 2px;
        color: white;
        cursor: pointer;
        padding: 14px 35px;
        
        &:hover {
          filter: brightness(85%);
        }
      }

      &.urplus-btn-danger {
        background: #f55;
        border-radius: 2px;
        color: white;
        cursor: pointer;
        padding: 14px 35px;
        
        &:hover {
          filter: brightness(85%);
        }
      }

      span.fa {
        font-size: 18px;
        width: 18px;
      }
    }

    .form-control {
      height: 47px;
      padding: 11px 14px;
      font-size: 14px;
      line-height: 1.7;
      color: #2e3d49;
      background-color: #fff;
      background-image: none;
      border: 1px solid #dbe2e8;
      border-radius: 2px;
      box-shadow: 0 0.25em 0.5em 0 rgba(46,61,73,.12);
      transition: box-shadow .3s ease,border .3s ease;
    }

    .code-block {
      background: rgb(235, 235, 235);
      overflow: auto;

      pre {
        display: inline-block;
        margin: 20px 30px;
      }
    }
  }
}
</style>
