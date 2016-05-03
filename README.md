# Demo Server Express

Demo setup of [ExpressJS](http://expressjs.com/) server ([Node.js](https://nodejs.org/en/))
with module structure and [demo viewer](https://github.com/voorhoede/demo-viewer).


## Purpose

This project aims to be a reference (not a boilerplate) for a simple front-end server setup using ExpressJS.

The server handles routing, API requests for data and template rendering.
The server application is composed out of small single-purpose modules.
It is bundled with a [demo viewer](https://github.com/voorhoede/demo-viewer) which allows you to view & develop modules in isolation.


## Module structure

The application is composed out of small single-purpose modules (e.g. *app-header*, *blog-comment*, *pagination*).
Each module consists of its own template (`module.html`) and a demo for variations of this template (`module.demo.html`).
In addition a module can have its own presentation (`module.css`), behaviour (`module.js`)  and other module files.
The modules are grouped into areas (*blog*, *core*, *gallery*, ...).
Each area has it's own routes (`area/router.js`), views (`area/*.html`) and can have its own assets and other specific files.
Finally the entire server is configured in `/index.js`.

Resulting in the following structure:

```
index.js                                <-- express app
src/
    ├── index.html                      <-- home page template
    |
    └── area-name/                      <-- eg. blog, core, gallery
        ├── router.js                   <-- express routes for area
        ├── index.html                  <-- area overview template
        ├── item.html                   <-- item template
        |
        └── module-name/
            ├── module-name.html        <-- module template
            ├── module-name.demo.html   <-- demos of template variations
            ├── module-name.(css|js|..) <-- other module specific files
            └── README.md               <-- documentation with instructions
```


## Start the server

This project requires [Node.js](http://nodejs.org/) and [npm](https://npmjs.org/).

After installing dependencies using `npm install` the following scripts are available:

`npm run ...` | Description
---|---
`start` | Alias for `start:dev`.
`start:dev` | Starts a development server on `http://localhost:9777` ("xprs" in T9)
              and `http://localhost:9778` with live reload and synced interaction.
`start:prod` | Starts a production server on `http://localhost:9777`.

### Development server

* has caching disabled.
* auto-restarts server on server file changes.
* auto-reloads browser on browser file changes.
* has a demo viewer on `http://localhost:9777/demo/`.
* has an *annotate* button in the bottom right of the page to highlight the modules a view is composed of.
Clicking on an annotation brings you to the demo of that module.

### Production server

* has caching enabled.
* has no auto-reload.
* has no annotations.
* has no demo viewer.