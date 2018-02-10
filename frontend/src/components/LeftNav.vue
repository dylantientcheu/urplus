<template>
  <nav id="left-nav">
    <div class="nav-header text-center">
      <router-link to="/">ur<strong>Plus</strong></router-link>
    </div>
    <ul class="nav nav-pills flex-column">
      <li class="nav-item remarks">
        <router-link class="nav-link" to="/remarks">Remark Storage</router-link>
      </li>
      <div
        v-if="this.$route.path === '/remarks'"
        class="nav-item-child-group"
      >
        <li class="nav-item remarks">
          <a class="nav-link" href="#introduction">Introduction</a>
        </li>
        <li class="nav-item remarks">
          <a class="nav-link" href="#installation">Installation</a>
        </li>
        <li class="nav-item remarks">
          <a class="nav-link" href="#tutorial">Tutorial</a>
        </li>
        <li class="nav-item remarks">
          <a class="nav-link" href="#authentication">Authentication</a>
        </li>
        <li class="nav-item remarks">
          <a class="nav-link" href="#download-remarks">Download Remarks</a>
        </li>
      </div>
    </ul>
    <div class="nav-footer">
      <span>Created by Michael Hays</span>
      <span class="footer-icons">
        <a href="https://github.com/michaelhays" target="_blank"><span class="fa fa-lg fa-github"></span></a>
        <a href="https://twitter.com/michaelhays64" target="_blank"><span class="fa fa-lg fa-twitter"></span></a>
      </span>
    </div>
  </nav>
</template>

<style lang="scss">
#left-nav {
  background: #ddd;
  bottom: 0;
  color: white;
  font-family: "Nunito", sans-serif;
  left: 0;
  position: fixed;
  top: 0;
  width: 300px;

  div.nav-header {
    background: #222;
    cursor: default;
    font-size: 30px;
    padding: 10px;

    a {
      color: inherit;
      text-decoration: none;
      
      strong {
        color: #3cb;
      }
    }
  }

  ul.nav {
    div.nav-item-child-group {
      li.nav-item {
        font-size: 16px;
        font-weight: inherit;
        padding-left: 20px;
      }
    }

    li.nav-item {
      font-size: 20px;
      font-weight: bold;

      &.remarks {
        background: #26c;
      }

      &.assign {
        background: #2b5;
      }

      &.submissions {
        background: #d34;
      }

      &:hover {
        filter: brightness(85%);
      }

      a.nav-link {
        border-radius: 0;
        color: white;
      }
    }
  }

  div.nav-footer {
    background-color: #222;
    bottom: 0;
    left: 0;
    padding: 10px;
    position: fixed;
    width: 300px;

    span.footer-icons {
      float: right;

      a {
        color: inherit;
        padding: 5px;
        text-decoration: none;
      }
    }
  }
}
</style>
