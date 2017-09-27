<template>
  <main>
    <div class="container documentation">
      <h2 id="introduction">Introduction</h2>
      <hr>
      <p>
        The Remark Storage app provides an integrated and efficient means of
        storing and retrieving your created review <i>remarks</i>
        (Code Review comments, Project Review critiques, and Additional Reviewer Comments).
      </p>
      <p>
        If you've been a project reviewer with Udacity for a while,
        I'm sure you've realized the value of keeping your most
        frequently used remarks handy for quick retrieval.
        You may already have a method of storing and retrieving your remarks.
        Remark Storage brings this functionality to the review interface,
        so that you can access your saved remarks without managing another page or app.
      </p>
      <p>
        It also adds the following conveniences to the review interface:
      </p>
      <ul>
        <li>Displays current submission price</li>
        <li>Expands <code>&lt;textarea&gt;</code> when composing remark</li>
      </ul>
      <p>
        It is highly recommended that you complete the short
        tutorial below before using the Remark Storage app.
        I've tried to make it as concise and painless as possible, while still
        covering all of the essentials.
      </p>

      <h2 id="installation">Installation</h2>
      <hr>
      <p>
        To install the Remark Storage app (as well as the <router-link to="/assign">Remote Assignment</router-link> app),
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
      <h4><strong>Naming conventions</strong></h4>
      <p>
        A <b>remark</b> is one of three things:
      </p>
      <ul>
        <li>Comment &ndash; made in the Code Review</li>
        <li>Critique &ndash; made in the bulk of the Project Review, one for each rubric criterion</li>
        <li>General Comment &ndash; made in the "Additional Reviewer Comments" section at the bottom of the Project Review</li>
      </ul>
      <p>
        Each of these has their own interface for remark storage and retrieval,
        with slight differences from each other.
      </p>
      <p>
        A <b>comment</b> is stored as an object with four fields:
      </p>
      <ol>
        <li>Body &ndash; the value of the <code>&lt;textarea&gt;</code>, the text that the student sees</li>
        <li>Category &ndash; the type of comment, i.e.
          <span class="text-success">awesome</span>,
          <span class="text-secondary">nitpick</span>, or
          <span class="text-warning">critical</span>
        </li>
        <li>Title &ndash; a short description of the comment</li>
        <li>Topic &ndash; the general topic that the comment fits in, usually (but not necessarily) one of the rubric criteria</li>
      </ol>
      <p>
        A <b>critique</b> is stored as an object with three fields
        (topic is automatically set to the rubric criteria):
      </p>
      <ol>
        <li>Body &ndash; the value of the <code>&lt;textarea&gt;</code>, the text that the student sees</li>
        <li>Category &ndash; the result of the criteria, i.e.
          <span class="text-success">passed</span> or
          <span class="text-warning">failed</span>
        </li>
        <li>Title &ndash; a short description of the critique</li>
      </ol>
      <p>
        A <b>general comment</b> is stored as an object with three fields (topic doesn't exist):
      </p>
      <ol>
        <li>Body &ndash; the value of the <code>&lt;textarea&gt;</code>, the text that the student sees</li>
        <li>Category &ndash; the result of the project, i.e.
          <span class="text-success">passed</span> or
          <span class="text-warning">failed</span>
        </li>
        <li>Title &ndash; a short description of the general comment</li>
      </ol>
      <p class="text-secondary">
        <strong>Note</strong>: The category field for general comments has no effect
        on what the student sees. It's just a helpful way to distinguish general comments
        when retrieving them, as you'll see below.
      </p>
      <p>
        A remark is identified by its <b>title-topic pair</b>. So, once you have created a remark
        with title A and topic B, you can create a second remark with title A, or topic B,
        but not both title A and topic B. Since the topic for critiques is equal to
        the criteria, you cannot repeat titles for critiques of the same criterion,
        though you can repeat titles across critieria. For general comments, there is no topic,
        so you cannot repeat titles. I will use the term <i>title-topic pair</i> to refer to
        the identifying field for each remark type for the rest of this tutorial.
      </p>
      <p>
        Keep in mind that for each remark type (comments, critiques, and general comments),
        the body and category are fields that the student will see (the remark content),
        and the title and topic are fields that only you will see (the remark identification).
      </p>
      <p>
        Remarks are automatically separated by <em>project</em>. So, remarks created for the
        Online Resume project will not be accessible when reviewing an Article to Mockup
        submission, and vice versa.
      </p>

      <h4><strong>Addon Interface</strong></h4>
      <p>
        When performing reviews, each area for editing remarks will have an addon for the
        Remarks Storage app. This addon comes in two forms&mdash;remark storage and
        remark retrieval&mdash;with the visibility of each depending on the context.
      </p>
      <p>
        The remark storage interface:
      </p>
      <div class="remark-addon">
        <div class="remark-save form-inline">
          <button title="Add new remark" class="btn urplus-btn-primary">
            <span class="fa fa-plus"></span>
          </button>
          <button title="Update existing remark" class="btn urplus-btn-primary">
            <span class="fa fa-upload"></span>
          </button>
          <button title="Remove existing remark" class="btn urplus-btn-danger">
            <span class="fa fa-trash"></span>
          </button>
          <input type="text" placeholder="Title" class="form-control">
          <input list="comment-topics" type="text" placeholder="Topic" class="form-control">
          <datalist id="comment-topics">
            <option value="Topic1"></option>
            <option value="Topic2"></option>
            <option value="Topic3"></option>
          </datalist>
        </div>
      </div>
      <br>
      <p>
        And the remark retrieval interface:
      </p>
      <div class="remark-addon">
        <div class="remark-search">
          <div class="form-inline">
            <input
              v-model="remarkSearchText"
              :placeholder="`Search comments`"
              class="remark-search-input form-control"
              type="text"
            >
          </div>
        </div>
      </div>
      <br>

      <h4><strong>Remark Storage</strong></h4>
      <h5>Adding a Remark</h5>
      <p>
        To store a remark, simply compose a remark as you normally would by choosing the
        category and writing the body. Then, provide the remark identification by
        entering the title field and (if necessary) topic field.
        Lastly, store the comment in the Udacity Review Plus database by clicking the <i>Add new remark</i> button:
      </p>
      <p>
        <button class="btn urplus-btn-primary" title="Add new remark"><span class="fa fa-plus"></span></button>
      </p>
      <p>
        Check out the video demo below. A student has made a <span class="text-warning">critical</span> mistake.
        They have manually appended each element of the <code>bio.skills</code> array;
        however, it is a rubric requirement to iterate over the <code>bio.skills</code>
        array with a <code>for</code> or <code>forEach</code> loop. This is a common mistake
        in Online Resume submissions, so let's create a comment that we can reuse later.
      </p>
      <iframe class="tutorial-video" src="https://www.youtube.com/embed/iVFRN_hY4Hc?rel=0&VQ=HD1080" frameborder="0" allowfullscreen></iframe>
      <p>
        As you can see, we start by composing the comment as we normally do.
        We click the <i>Required</i> radio button to define the category as
        <span class="text-warning">critical</span> and fill out the
        <code>&lt;textarea&gt;</code> with the desired content to populate the body.
        Then, we enter <code>bio.skills forEach</code> for the title and <code>Display</code> for the topic.
        Once our four comment fields are entered, we click the <i>Add new remark</i> button
        and our comment is stored in the Udacity Review Plus database.
      </p>
      <p>
        The process is the same for storing critiques and general comments,
        with the exception that there is no topic field for either of those remark types.
      </p>
      <p>
        The <i>Add new remark</i> button is disabled if at least one of three things is true:
      </p>
      <ul>
        <li>The content in the <code>&lt;textarea&gt;</code> is identical to the body of an existing remark</li>
        <li>The title-topic pair is identical to the title-topic pair of an existing remark</li>
        <li>Any field of the remark is empty</li>
      </ul>
      <h5>Updating a remark</h5>
      <p>
        To update a remark, simply change the body and/or the category of an existing
        remark and click the <i>Update existing remark</i> button:
      </p>
      <p>
        <button class="btn urplus-btn-primary" title="Update existing remark"><span class="fa fa-upload"></span></button>
      </p>
      <p>
        As mentioned, each remark is identified by its title-topic pair. So, you can't update
        the title field or the topic field for a remark; that would require deleting the existing remark
        and creating a new remark with the new title-topic pair.
      </p>
      <p>
        The <i>Update existing remark</i> button is disabled if at least one of three things is true:
      </p>
      <ul>
        <li>The content in the <code>&lt;textarea&gt;</code> is identical to the body of an existing remark
          <em>and</em> the selected category is identical to the category for that remark</li>
        <li>The title-topic pair is <em>not</em> identical to the title-topic pair of an existing remark</li>
        <li>Any field of the remark is empty</li>
      </ul>
      <h5>Deleting a remark</h5>
      <p>
        To delete a remark, click the <i>Delete existing remark</i> button:
      </p>
      <p>
        <button class="btn urplus-btn-danger" title="Delete existing remark"><span class="fa fa-trash"></span></button>
      </p>
      <p>
        The <i>Delete existing remark</i> button is disabled if at least one of three things is true:
      </p>
      <ul>
        <li>Not all of the fields (body, category, title, or topic) are identical to an existing remark</li>
        <li>Any field of the remark is empty</li>
      </ul>
      <p>
        Note that you can only delete a remark if <em>all</em> of the fields are identical
        to the existing remark. This is to ensure that you intend to delete a remark, which
        removes the count of retrievals for that remark (more on that below).
      </p>
      
      <h4><strong>Remark Retrieval</strong></h4>
      <p>
        Once you have created some remarks, you can quickly retrieve and submit them in
        other reviews through the remark retrieval interface. The core is in the
        <i>Remark search bar</i>:
      </p>
      <div class="remark-addon">
        <div class="remark-search">
          <div class="form-inline">
            <input
              v-model="remarkSearchText"
              :placeholder="`Search comments`"
              class="remark-search-input form-control"
              type="text"
            >
          </div>
          <ul>
            <li
              v-for="(remark, index) of filteredRemarks"
              :key="remark.body"
              :class="[`remark-${remark.category}`]"
            >
              <span>{{ index + 1 }}</span>
              <span>{{ remark.body }}</span>
            </li>
          </ul>
        </div>
      </div>
      <br>
      <p>
        This retrieval addon above is semi-functioning &ndash; type <i>element</i>
        in the search bar and see how the stored comments are filtered!
      </p>
      <p>
        Text entered in this box will search through the <em>bodies</em> of all
        existing remarks for that project to find a match. For critiques, that search
        will be restricted to each respective criterion.
      </p>
      <p>
        The search text matches each individual word, separated by spaces.
        So, searching "dog jumps quick" will match a remark with the body
        "The quick brown fox jumps over the lazy dog". The search is case-insensitive.
      </p>
      <p>
        You can load a remark into the actual Udacity input area in one of three ways:
      </p>
      <ul>
        <li>Press Enter to load the first remark</li>
        <li>Press one of the keys 1-5 to load the respective numbered remark</li>
        <li>Click the remark</li>
      </ul>
      <p>
        Check out this short video demo. A student has appended one string to two different
        selectors on two lines of code. This can be simplified using jQuery's multiple selectors.
      </p>
      <iframe class="tutorial-video" src="https://www.youtube.com/embed/OVsoeDXZsBk?rel=0&VQ=HD1080" frameborder="0" allowfullscreen></iframe>
      <p>
        As you can see, this process can be incredibly efficient. To submit the comment to the student,
        we simply type "mul sel" to match "multiple" and "selectors" in the comment body,
        press Enter to load the first remark, and the comment is automatically submitted.
        That's a mouse click and 8 keystrokes to type a thorough and specific comment. Pretty good!
      </p>
      <p>
        Each remark has an additional field called <i>retrievals</i>, which is incremented
        each time the remark is selected. The filtered remarks are sorted by descending
        <i>retrievals</i>, so that your most frequently used remarks show up first.
        Updating a remark does not reset the retrieval count, but deleting a remark
        deletes the retrieval count with it.
      </p>

      <h4><strong>Placeholder text</strong></h4>
      <p>
        Often times, we have a frequently used comment in which the bulk of the body
        is the same, but a phrase or variable will be specific to each submission.
      </p>
      <p>
        <strong>The purpose of the Remarks Storage app is to <em>optimize</em>, not <em>generalize</em>.</strong>
      </p>
      <p>
        Remarks Storage identifies <code>&lt;#&gt;</code> as a
        placeholder phrase that can be used to mark an area that needs to be
        tailored to each submission. For instance, let's say that we have a comment
        that describes how to use a <code>forEach</code> loop in a certain context,
        but the variable name of the array varies with each submission. We can
        use <code>&lt;#&gt;</code> in place of the variable name, like so:
      </p>
      <pre>
        &lt;#&gt;.forEach(function(&lt;#&gt;) {
          // format and append each element
        });</pre>
      <p>
        When we select this comment from the remark retrieval interface,
        instead of instantly submitting that comment, the first instance of
        <code>&lt;#&gt;</code> will be highlighted, ready to be immediately
        replaced with the submission-specific phrase. Then, pressing
        <code>ctrl+Enter</code> highlights the next instance of <code>&lt;#&gt;</code>
      </p>
      <p class="text-secondary">
        <strong>Note</strong>: <code>ctrl+Enter</code> always highlights the <i>first</i>
        instance of <code>&lt;#&gt;</code> in a remark. Once you have replaced the first
        <code>&lt;#&gt;</code>, the next instance just becomes the first.
      </p>
      <p>
        If there are no instances of <code>&lt;#&gt;</code> remaining,
        <code>ctrl+Enter</code> submits the remark to the review.
      </p>
      <p>
        So, after replacing all instances of <code>&lt;#&gt;</code>, we press
         <code>ctrl+Enter</code> to submit the comment:
      </p>
      <pre>
        work.jobs.forEach(function(job) {
          // format and append each element
        });</pre>

      <h2 id="authentication">Authentication</h2>
      <hr>
      <p>
        The Remarks Storage app is authenticated with your Udacity
        <a href="https://jwt.io/" target="_blank">JSON Web Token</a>.
        This is how your personal remarks that you create and store are
        separated from remarks that another Udacity reviewer creates &ndash;
        all without having to create a separate account.
        This means that as long as you are using a browser on which you
        have installed the Udacity Review Plus Chrome Extension,
        you will have access to all of your remarks.
      </p>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      filteredRemarks: [],
      remarks: [
        {
          body: 'Nice job customizing the CSS.',
          category: 'awesome',
          retrievals: 22,
        },
        {
          body: 'Great use of multiple selectors, and multiple arguments to `.append()`!',
          category: 'awesome',
          retrievals: 11,
        },
        {
          body: 'You can simplify this code with [multiple selectors](https://api.jquery.com/multiple-selector/), ' +
            'like so:\n\n```js\n$(\'#topContacts, #footerContacts\').append(...);',
          category: 'nitpick',
          retrievals: 26,
        },
        {
          body: 'A cleaner way to append multiple elements like this is to include all of the elements as arguments ' +
            'to a single `.append()` call, like so:',
          category: 'nitpick',
          retrievals: 10,
        },
        {
          body: 'This property name should be `majors` (**note**: plural).',
          category: 'critical',
          retrievals: 5,
        },
        {
          body: 'This property name should be `contacts` (**note**: plural).\n\nLook at the `locationFinder` function in `helper.js`.',
          category: 'critical',
          retrievals: 13,
        },
      ],
      remarkSearchText: '',
      remarkType: 'comments',
    };
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
};
</script>

<style lang="scss">
main {
  iframe.tutorial-video {
    height: 32vw;
    max-width: 100%;
    width: 60vw;
  }

  div.remark-addon {
    color: #222;

    div.remark-save {
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
        span.fa {
          width: 13px;
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
}
</style>
