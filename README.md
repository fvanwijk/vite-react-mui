# Issue with Vite, React, Typescript, vite-plugin-ssr and MaterialUI

tldr;
reproduce the issue by either running:

- `npm install && npm run build && npm run preview`.
- `npm install && npm run build && npm run server:prod`

You'll see an error in the terminal after opening http://localhost:3000.

## Repo setup

There are 3 commits:

- Scaffold the project: `git checkout HEAD^^`
- Integrating with vite-plugin-ssr: `git checkout HEAD^`
- Added readme: `git checkout master`

This is how this project was created:

### Scaffold the project

This project is initialized with `npm init vite` and the `react-ts` template. Then is added MUI with `npm install @mui/material @emotion/react @emotion/styled`.

The `<ThemeProvider>` in App.jsx defines a `primary` color override of `purple[400]` to demonstrate the issue.

So far everything works ok. Add a `<Button variant="contained">Test</Button>` to see the purple button. (`npm run dev` and open http://localhost:5173)

Build the project with `npm run build` and serve it with `npm run preview` and you'll see the app served from `dist` on http://localhost:4173 and no errors.

### Integrating vite-plugin-ssr

Next step is to integrate vite-plugin-ssr. I followed all 4 steps of the guide in [Add to existing app](https://vite-plugin-ssr.com/add) (React + TypeScript Example).

In step 2 I had to modify the server so that it works with TypeScript and ESM, and run it with `ts-node-esm` (see package.json).

Now PageShell.tsx is the root of the app, so I have to migrate the `<ThemeProvider>` from `main.ts` into `PageShell.tsx`. Now `main.tsx` and `index.html` can be deleted, because vite-plugin-ssr takes care of server side rendering.

Development still works with the built in Vite server (`npm run dev`) but also with the new Express server (`npm run server`).

Now we build the app: `npm run build`.

If we serve the built files (either `npm run preview` or `npm run server:prod`) and then open `http://localhost:3000` the following error is thrown:

```
Error [ERR_UNSUPPORTED_DIR_IMPORT]: Directory import '/Users/<project-dir>/node_modules/@mui/material/colors' is not supported resolving ES modules imported from /Users/<project-dir>/dist/server/assets/_default.page.server.93b8c381.js
Did you mean to import @mui/material/colors/index.js?
```
