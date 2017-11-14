<template>
  <main>
    <div class="container documentation">
      <h2 id="introduction">Introduction</h2>
      <hr>
      <p>
        The Remote Assignment app provides an intuitive GUI to continuously
        assign reviews through the Udacity Submission Request API.
        The app will update your submission requests remotely on the urPlus
        servers, so you don't have to have the app open—or even have your
        computer on—to continue assigning projects.
      </p>

      <h2 id="installation">Installation</h2>
      <hr>
      <p>
        To install the Remote Assignment app (as well as the
        <router-link to="/remarks">Remark Storage</router-link> app),
        simply click the button below to install the Chrome Extension.
      </p>
      <button
        class="btn urplus-btn-primary"
        onclick="chrome.webstore.install()"
      >
        Install Chrome Extension
      </button>
      <br><br>
      <p>
        Of course, this means you will have to use Google Chrome when completing reviews.
        Other browsers are currently not supported.
      </p>

      <h2 id="tutorial">Tutorial</h2>
      <hr>
      <p>
        You can open the app by clicking the Chrome Extension icon at the top right
        corner of your Chrome browser:
        <img class="border border-dark" src="../assets/popup-icon.png">
      </p>
      <p>
        This icon will have a text badge with the number of currently assigned projects.
        Clicking the icon reveals the main GUI:
      </p>
      <img src="../assets/popup.png">
      <br><br>
      <p>
        To run the app, switch on the toggle at the top right corner of the Assignment Dashboard.
        To start assigning a specific project, simply switch on the toggle next to that project.
        While assigning, the number next to each project will display your
        position in the queue for that project.
      </p>
      <p>
        The popup data updates every 60 seconds while the popup is closed,
        and every 10 seconds while it is open. Each update involves server requests
        to both Udacity's servers and the urPlus servers, so kindly avoid leaving the
        popup open for extended periods of time :)
      </p>
      <p class="text-secondary">
        <strong>Note:</strong> You may notice some quirks while the app is open,
        such as the toggle for a project switching off immediately after you switch it on.
        This has to do with the update process; just wait a few moments and it will
        correct itself. The backend requests only update from your input,
        so there shouldn't be any issues with the actual submission requests.
      </p>
    </div>
  </main>
</template>
