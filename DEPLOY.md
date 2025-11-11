# Deployment notes

This project can be run in two common modes:

1. Separate frontend (nginx) and backend containers — frontend serves static files from `client/build`, backend only provides API.
2. Single backend container that also serves frontend static files — requires `client/build` copied into `server/build` before building the backend image.

If you see errors like `Error: ENOENT: no such file or directory, stat '/app/build/index.html'`, it means the backend expects `server/build/index.html` to exist but it doesn't.

Quick fixes

- Quick manual (recommended for testing on EC2):

```sh
# from project root
# 1) Build the client and copy build to server/build
./scripts/prepare_build.sh

# 2) Rebuild and restart your compose stack (production compose):
docker-compose down
docker-compose up -d --build

# 3) Tail logs
docker-compose logs -f
```

- Alternative: Use the `docker-compose.yml` that runs a separate frontend container (nginx) which serves `client/build`. In that case you must ensure `client/build` exists (build it first) and that the frontend container is used.

Long-term/CI fixes

- CI (Jenkins): ensure the pipeline builds the client and copies the build artifacts to `server/build` (or build docker images that include the frontend). The `Jenkinsfile` included in this repo already builds the client during the pipeline.

- Or change the deployment pattern so the frontend is always served by a dedicated nginx container and backend does not attempt to serve static files (backend already now checks for `server/build` before serving statics).

If you want, I can:
- Update your production `docker-compose.yml` to ensure the frontend container is used (and not require copying into server/build).
- Modify the Jenkins pipeline to copy `client/build` into `server/build` before building the backend image.
- Convert the backend Dockerfile to perform a multi-stage build that builds the frontend and copies the artifacts into the final image.

*** End of notes
