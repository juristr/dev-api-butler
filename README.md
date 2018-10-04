## Dev API Butler

Simple Http "proxy" that you can place between your frontend and real backend API server when in **development mode(!)**.

> **ATTENTION: WORK IN PROGRESS...**

## Use Case

When you develop on the frontend, you most always integrate with some backend API. Modern frontend tooling automatically refreshes the browser as you change files in your dev environment. That's super nice, but can get a little slow sometimes as the browser continuously keeps fetching the data from the API.

Dev API Butler is meant to be a **development only utility** that can be placed in between your frontend dev server (i.e. Webpack dev server) and your backend API. It tries to cache URLs as you call them, so if you call them again, it will simply respond from a memory cache instead of calling the API.

## TODOs

- [ ] Create small frontend that shows cached entries / runtime logs
- [ ] Allow to clear cache via frontend UI
- [ ] Allow to single cache entries via frontend UI
- [ ] Allow to dynamically add new URL regex that should be cached via frontend UI
- [ ] Specify invalidation chains, i.e. if POST/PUT/DELETE request of certain pattern comes in, invalidate X,Y,Z patterns in cache
- [ ] ... [ideas?](https://github.com/juristr/dev-api-butler/issues)
