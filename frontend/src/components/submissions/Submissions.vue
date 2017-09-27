<template>
  <main>
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <router-link
          class="nav-link"
          :class="{ active: this.$route.path === '/submissions/introduction' }"
          to="/submissions/introduction"
        >Introduction</router-link>
      </li>
      <li class="nav-item">
        <router-link
          class="nav-link"
          :class="{ active: this.$route.path === '/submissions/all-projects' }"
          to="/submissions/all-projects"
        >All Projects</router-link>
      </li>
      <li class="nav-item">
        <router-link
          class="nav-link"
          :class="{ active: this.$route.path === '/submissions/select-projects' }"
          to="/submissions/select-projects"
        >Select Projects</router-link>
      </li>
    </ul>
    <div class="container submissions-section">
      <router-view></router-view>
    </div>
  </main>
</template>

<script>

</script>

<style lang="scss">
main {
  div.submissions-section {
    padding-top: 50px;
  }
}
</style>
