echo "Building itis_discord_bot..."
docker buildx build --platform linux/arm64 --tag itis_discord_bot --load .

echo "Updating image..."
docker tag $(docker images --filter=reference=itis_discord_bot --format "{{.ID}}") 192.168.0.8:32768/itis_discord_bot:latest

echo "Pushing image..."
docker push 192.168.0.8:32768/itis_discord_bot:latest