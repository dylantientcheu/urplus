# urPlus Extension

Chrome extension for urPlus

## Build locally

``` bash
# clone root repo and cd into it
git clone https://github.com/michaelhays/urplus.git
cd urplus

# create local Postgres database
createdb urplus

# create .env file
nano backend/.env
```

In the `.env` file you just created, add the following:

```
DATABASE_URL=postgres://<username>:<password>@localhost:5432/urplus
DJANGO_ALLOWED_HOSTS=*
DJANGO_DEBUG=TRUE
DJANGO_SECRET_KEY=dev
```

Remember to replace `<username>` and `<password>` above with your local Postgres credentials.

``` bash
# point outgoing requests to localhost
nano extension/src/background.js
```

In `background.js`, replace `baseURL: 'https://urplus.herokuapp.com/api/v1/',` with `baseURL: 'https://localhost:8000/api/v1/',` so that it sends requests to `localhost`.

``` bash
# install extension dependencies
cd extension
npm install

# build for production with minification
npm run build
```

Copy the `extension/dist` folder into `chrome://extensions/`

``` bash
# create Python virtual environment
cd ../backend
conda create -n urplus python=3
source activate urplus
pip install -r requirements.txt

# migrate local database
python manage.py makemigrations
python manage.py migrate

# run local server
python manage.py runserver_plus --cert /tmp/cert
```

**Note** you may have to add a chrome experimental flag that allows using invalid SSL certificates over `localhost`. Open `chrome://flags/` in your browser and enable "Allow invalid certificates for resources loaded from localhost". Then, restart your browser.
