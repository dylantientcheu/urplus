# urPlus

**If you have any questions about how to use this locally, create a new [issue](https://github.com/michaelhays/urplus/issues)**

Remember that all of you have write access to this repo, so if you'd like to make a change for yourself, I'd suggest forking this repo.

### Run locally

**Note**: You need Python 3 with [Pipenv](https://github.com/pypa/pipenv) installed globally. It's not too hard to figure out Pipenv if you're not familiar with it. `pip install pipenv` should be enough.

#### Set up the project backend

Run the following from a terminal:
``` bash
# clone the repo
git clone git@github.com:michaelhays/urplus.git

# change directory
cd urplus

# install Python dependencies (this creates a virtual environment for the project, which is a good thing)
pipenv install --dev

# change directory
cd backend

# migrate local database (this creates a urplus.sqlite3 file in the backend directory, which stores your remarks)
pipenv run python manage.py migrate
```

#### Install the Chrome extension locally

Open `chrome://extensions` in a Chrome browser window. Click the "Load unpacked extension..." button at the top left corner of the page, then navigate to the `urplus/extension` directory. Select the `dist` folder and submit.

You'll need to set a Chrome flag in order for localhost to serve over HTTPS without a valid SSL certificate. Go to `chrome://flags`, search for "localhost", and set **Allow invalid certificates for resources loaded from localhost** to **Enabled**. Relaunch Chrome to make the changes take effect.

#### Run the backend

Whenever you are reviewing projects, keep this running from a terminal:
``` bash
# run the Django development server
pipenv run python manage.py runserver_plus --cert /tmp/cert
```

### Bulk remark loading

If you have [downloaded your remarks](https://urplus.herokuapp.com/remarks#download-remarks) and would like to load these locally, there is a helper [`load_remarks` function](https://github.com/michaelhays/urplus/blob/master/backend/remarks/utils.py#L4) that you can use like so:

``` bash
# run Python shell
pipenv run python manage.py shell

# from inside Python shell
from remarks.utils import load_remarks
remarks = { ... }  # Paste the entire remark dictionary here
load_remarks(remarks)
```

Do this for all of the projects that you'd like to load in bulk.
