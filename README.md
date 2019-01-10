## Dev API Butler

Simple Http "proxy" that you can place between your frontend and real backend API server when in **development mode(!)**.

> **ATTENTION: WORK IN PROGRESS...**

## Use Case

When you develop on the frontend, you most always integrate with some backend API. Modern frontend tooling automatically refreshes the browser as you change files in your dev environment. That's super nice, but can get a little slow sometimes as the browser continuously keeps fetching the data from the API.

Dev API Butler is meant to be a **development only utility** that can be placed in between your frontend dev server (i.e. Webpack dev server) and your backend API. It tries to cache URLs as you call them, so if you call them again, it will simply respond from a memory cache instead of calling the API.

## Usage

First clone and run the "proxy" server.

```
$ git clone git@github.com:juristr/dev-api-butler.git
$ cd dev-api-butler
$ npm install
```

Then run the server with

```
$ npm run start:server
```

Then create a [proxy configuration](https://webpack.js.org/configuration/dev-server/) for your webpack dev server. If you wanna see how to do it with the Angular CLI [check out my blog post here](https://juristr.com/blog/2016/11/configure-proxy-api-angular-cli/).

> **WARNING:** Right now the URLs which should be cached as well as the API url where to forward the requests is hard-coded [here](https://github.com/juristr/dev-api-butler/blob/master/src/cache.service.ts). Check out the Todos.

If you also want to **start the UI client** to see which URLs are cached or to clear the case, run

```
$ npm start
```

## Wanna contribute? Here are my current Todos.

Please open up an issue to start discussions :smiley:.

- [ ] Make the regex patterns and API server forward URL configurable (via JSON)
- [ ] Create small frontend that shows cached entries / runtime logs
- [ ] Allow to clear cache via frontend UI
- [ ] Allow to single cache entries via frontend UI
- [ ] Allow to dynamically add new URL regex that should be cached via frontend UI
- [ ] Specify invalidation chains, i.e. if POST/PUT/DELETE request of certain pattern comes in, invalidate X,Y,Z patterns in cache
- [ ] ... [ideas?](https://github.com/juristr/dev-api-butler/issues)
