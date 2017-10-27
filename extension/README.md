# Udacity Review Plus Extension

Chrome extension for Udacity Review Plus

## Build locally

``` bash
# clone root repo
git clone git@github.com:michaelhays/urplus.git

# create local database and .env file
createdb urplus
nano backend/.env
```

```
DATABASE_URL=postgres://<username>:<password>@localhost:5432/urplus
DJANGO_ALLOWED_HOSTS=*
DJANGO_DEBUG=TRUE
DJANGO_SECRET_KEY=dev
```

``` bash
# point outgoing requests to localhost
nano extension/src/background.js
```

Replace `baseURL: 'https://urplus.herokuapp.com/api/v1/',` with `baseURL: 'https://localhost:8000/api/v1/',`

``` bash
# install dependencies
cd extension
npm install

# build for production with minification
npm run build
```

Copy the `extension/dist` folder into `chrome://extensions/`

``` bash
# run local server
cd ../backend
python manage.py runserver_plus --cert /tmp/cert
```

**Note** you may have to add a chrome experimental flag that allows using invalid SSL certificates over `localhost`. Open `chrome://flags/` in your browser and enable "Allow invalid certificates for resources loaded from localhost". Then, restart your browser.
