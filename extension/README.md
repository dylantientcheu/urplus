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
# install dependencies
cd extension
npm install

# build for production with minification
npm run build
```

Then, copy the `extension/dist` folder into `chrome://extensions/`
