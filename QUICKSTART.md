# Quick Start Guide for TalentSync

## Recommended Setup: Nginx Frontend + Node.js Backend

This is now the **default and simplest approach**. When you run `docker-compose up`, here's what happens automatically:

### Architecture
```
┌─────────────────────────────────────────┐
│  Your EC2 or Local Machine              │
├─────────────────────────────────────────┤
│                                         │
│  nginx:80 (frontend)                    │
│  ├─ Serves: ./client/build (built app) │
│  ├─ Proxies /api/* → backend:5000      │
│  │                                     │
│  Node.js:5000 (backend API)             │
│  ├─ Mounts: ./server code              │
│  ├─ Installs npm deps                  │
│  ├─ Runs: npm start                    │
│                                         │
└─────────────────────────────────────────┘
```

### What Happens When You Run docker-compose up

1. **Frontend Builder (Ephemeral Container)**
   - Runs Node image
   - Mounts `./client` code
   - Runs `npm install` + `npm run build`
   - Outputs to `./client/build`
   - Exits (container exits after build completes)

2. **Backend Container (Persistent)**
   - Runs Node:20-slim image
   - Mounts `./server` code
   - Runs `npm install` + `npm start`
   - Listens on port 5000
   - Stays running (restart: unless-stopped)

3. **Frontend Container (Persistent)**
   - Runs nginx:stable-alpine image
   - Mounts `./client/build` (read-only)
   - Mounts `./client/nginx/default.conf` for proxy rules
   - Listens on port 80
   - Forwards `/api/*` requests to backend:5000
   - Stays running (restart: unless-stopped)

### To Run It

1. **On EC2 or local, set the environment variable or create `.env` file**:
```bash
# Option A: Create .env file in project root
echo "MONGO_URL=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<dbname>" > .env

# Option B: Export in shell before running docker-compose
export MONGO_URL="mongodb+srv://..."
```

2. **Start the stack**:
```bash
docker-compose up -d
```

3. **View logs** (optional):
```bash
docker-compose logs -f backend
docker-compose logs -f frontend
```

4. **Access the app**:
- **Frontend**: http://localhost (or http://<your-ec2-ip>)
- **API**: http://localhost:5000 (or http://<your-ec2-ip>:5000)

### To Stop the Stack
```bash
docker-compose down
```

### To Rebuild (e.g., after pulling new code)
```bash
docker-compose up -d --build
```

## What You Don't Need to Do Anymore

❌ **No manual `prepare_build.sh`** — the compose file handles it.  
❌ **No copying files between containers** — volumes handle it.  
❌ **No `server/build` folder needed** — backend doesn't serve static files.  

## If You Need to Rebuild Just the Frontend

The `frontend-builder` service exits after build. To rebuild the frontend after code changes:

```bash
# Re-run the builder and replace the frontend container
docker-compose up -d frontend-builder frontend
```

## If You Need to Change Environment

Edit `.env` or export `MONGO_URL`, then:

```bash
docker-compose down
docker-compose up -d
```

## Troubleshooting

**Error: "Cannot find module"?**
- Containers are installing dependencies automatically. Wait a few moments and check logs: `docker-compose logs backend`

**Error: "Error connecting to MongoDB"?**
- Ensure `.env` exists with a valid `MONGO_URL` that starts with `mongodb://` or `mongodb+srv://`
- Check logs: `docker-compose logs backend`

**Port 80 already in use?**
- Edit `docker-compose.yml`, change `ports: - "80:80"` to `- "8080:80"`
- Then access frontend at http://localhost:8080

**Need to enter a container?**
- Backend: `docker exec -it talentsync-server sh`
- Frontend: `docker exec -it talentsync-client sh`

## Jenkins Pipeline

The `Jenkinsfile` in the repo will also use this compose setup. Jenkins will:
1. Create `.env` from a Jenkins secret credential (ID: `MONGO_URL`)
2. Run `docker-compose up -d --build`

No special steps needed on your end — just set up the Jenkins credential with your MongoDB URL.

---

**That's it! Just run `docker-compose up -d` and your app is live.** 🚀
