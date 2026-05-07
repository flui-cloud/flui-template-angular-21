# Flui Template — Angular 21

A minimal demo application built with **Angular 21** (standalone components + signals) and ready to deploy on [Flui](https://flui.cloud).

Includes:

- Angular 21 with standalone components
- Signals-based reactivity, no NgModules
- nginx `/health` endpoint
- Local item list with add/remove
- Multi-stage `#flui-managed` Dockerfile
- Production build served via nginx

## Local development

```bash
npm install
npm start
```

App runs on http://localhost:4200

## Build with Docker

```bash
docker build -t flui-demo-angular .
docker run -p 8080:80 flui-demo-angular
```

Then visit:

- http://localhost:8080 — homepage
- http://localhost:8080/health — health check (nginx)

## Environment variables

This is a frontend-only application. There are no runtime environment variables — for build-time configuration, edit `src/environments/`.

## Deploy with Flui

This repo ships with a [`flui.yaml`](./flui.yaml) manifest describing the build strategy, port, healthcheck and resource profile.

From the CLI, with `flui` installed and authenticated against your cluster:

```bash
flui deploy ./flui.yaml
```

The CLI reads the manifest, triggers a build via GitHub Actions and rolls out the workload.

From the UI:

1. Click **Use this template** on GitHub.
2. Connect the new repository to Flui.
3. Click **Deploy**.

Built for [Flui](https://github.com/flui-cloud/flui.api) — see the main repo for cluster setup and CLI installation.

## License

MIT
