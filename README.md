# Cryptotask

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Deploys on staging or production
You need aws cli and need to be logged in
```
yarn deploy:staging
```
or
```
yarn deploy:production
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Run your end-to-end tests
```
yarn run test:e2e
```

### Run your unit tests
```
yarn run test:unit
```

### Customize configuration

Copy example.env file to .env or .env.local and set configuration.
After each configuration change compilation must be restarted.

### Running in Docker container

Customize configuration as it is described above and just run:
 `docker build -t frontend . && docker run -itp 8080:8080 frontend`

