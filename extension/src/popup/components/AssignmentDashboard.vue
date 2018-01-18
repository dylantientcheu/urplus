<template>
  <section id="assignment-dashboard" class="panel">
    <div class="panel-heading">
      <h5>Assignment Dashboard</h5>
      <label class="switch float-right">
        <input
          v-model="assignRunnerActive"
          @click="toggleAssignRunner"
          type="checkbox"
        >
        <span class="slider-round"></span>
      </label>
    </div>
    <div id="cert-area">
      <div
        v-for="(cert, index) of certs"
        :key="cert.project_id"
        class="cert"
      >
        <div class="row">
          <div class="col-2">
            <label class="switch">
              <input
                v-model="cert.assigning"
                @click="updateProjects"
                type="checkbox"
              >
              <span class="slider-round"></span>
            </label>
          </div>
          <div class="col-10 project-name">
            <span>{{ cert.project.name }}</span>
          </div>
        </div>
      </div>
      <button
        @click="refreshCerts"
        id="refresh-certs"
        class="btn btn-light float-right"
      >Refresh Certifications</button>
    </div>
  </section>
</template>

<script>
export default {
  data: () => ({
    assignRunnerActive: false,
    certs: [],
  }),
  computed: {
    projects() {
      const projects = [];
      this.certs.forEach((cert) => {
        if (cert.assigning) {
          const project = {
            language: 'en',
            project_id: cert.project_id,
          };
          projects.push(project);
        }
      });
      return projects;
    },
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      this.getAssignRunnerStatus();
      this.getCerts();
      setTimeout(this.load, 1000);
    },
    getAssignRunnerStatus() {
      chrome.storage.local.get('assignRunnerActive', (data) => {
        if ('assignRunnerActive' in data) {
          this.assignRunnerActive = data.assignRunnerActive;
        }
      });
    },
    getCerts() {
      chrome.storage.local.get('certs', (data) => {
        if ('certs' in data) {
          this.certs = data.certs;
        } else {
          this.refreshCerts();
        }
      });
    },
    refreshCerts() {
      $('button#refresh-certs')
        .prepend('<span class="fa fa-refresh fa-spin mr-2"></span>');
      chrome.runtime.sendMessage({
        func: 'refreshCerts',
      }, () => {
        $('button#refresh-certs').find('span.fa-refresh').remove();
      });
    },
    toggleAssignRunner() {
      if (this.assignRunnerActive) {
        chrome.storage.local.set({ assignRunnerActive: true });
        chrome.runtime.sendMessage({
          func: 'assignStart',
          data: { projects: this.projects },
        });
      } else {
        chrome.storage.local.set({ assignRunnerActive: false });
        chrome.runtime.sendMessage({ func: 'assignStop' });
      }
    },
    updateProjects() {
      chrome.storage.local.set({ certs: this.certs });
      chrome.runtime.sendMessage({
        func: 'updateProjects',
        data: { projects: this.projects },
      });
    },
  },
};
</script>

<style lang="scss">
section#assignment-dashboard {
  display: flex;
  flex-direction: column;

  div.panel-heading {
    display: flex;
    justify-content: space-between;
  }

  div#cert-area {
    overflow-x: hidden;
    overflow-y: auto;

    div.project-name {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  label.switch {
    display: inline-block;
    height: 24px;
    position: relative;
    width: 40px;

    input {
      display: none;

      &:checked {
        + span.slider-round {
          background-color: #2196F3;

          &:before {
            transform: translateX(16px);
          }
        }
      }
    }

    span.slider-round {
      background-color: #ccc;
      border-radius: 24px;
      bottom: 0;
      cursor: pointer;
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
      transition: 0.4s;

      &:before {
        background-color: white;
        border-radius: 50%;
        bottom: 4px;
        content: '';
        height: 16px;
        left: 4px;
        position: absolute;
        transition: 0.4s;
        width: 16px;
      }
    }
  }
}
</style>
