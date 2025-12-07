
#!/bin/bash

# Fail fast if any command fails
set -e


# Move to Jenkins workspace
cd $WORKSPACE

# Load environment variables from Jenkins credentials
export MONGO_URL=$(echo $MONGO_URL)

# Optional: stop old containers
docker-compose down

# Build and start containers in detached mode
docker-compose up -d --build

# Wait a few seconds to let containers start
sleep 5

# Show running containers
docker ps

# Optional: logs (first 10 lines) to verify startup
echo "Backend logs:"
docker logs talentsync-backend --tail 10

echo "Frontend logs:"
docker logs talentsync-frontend --tail 10

echo "Docker Compose build complete!"
