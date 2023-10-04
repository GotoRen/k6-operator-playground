docker buildx build --platform linux/amd64 . -t ren1007/k6-prometheus
docker image list
docker push ren1007/k6-prometheus:latest
