IMAGE_NAME=ren1007/k6:latest
SCRIPT_PATH=scenario/sample.js
INFLUXDB_HOST_PATH=http://host.docker.internal:8086



ifneq (,$(wildcard .env))
    include .env
    export
endif



# Load testing
#===============================================================
.PHONY: run
run: ## 負荷試験実行
	k6 run ./scenario/sample.js -u 100 --rps 100



# Load testing: Results are managed by InfluxDB
#===============================================================
.PHONY: build/influxdb
build/influxdb: ## カスタムK6イメージをビルド
	docker build -t $(IMAGE_NAME) ./.docker/xk6

.PHONY: run/influxdb
run/influxdb: ## カスタムK6イメージを使用して負荷試験を実行
	docker run --rm -v $$(pwd):/home/k6 \
	  -e K6_INFLUXDB_ORGANIZATION=$(K6_INFLUXDB_ORGANIZATION) \
	  -e K6_INFLUXDB_BUCKET=$(K6_INFLUXDB_BUCKET) \
	  -e K6_INFLUXDB_TOKEN=$(K6_INFLUXDB_TOKEN) \
	  $(IMAGE_NAME) run -o xk6-influxdb='${INFLUXDB_HOST_PATH}?bucket=$(K6_INFLUXDB_BUCKET)&org=$(K6_INFLUXDB_ORGANIZATION)&token=$(K6_INFLUXDB_TOKEN)' /home/k6/$(SCRIPT_PATH)

.PHONY: run/influxdb-out
run/influxdb-out: build/influxdb run/influxdb ## 負荷試験を実行して InfluxDB へメトリクス出力



# Load testing: Results are managed by Prometheus
#===============================================================
.PHONY: run/prometheus-out
run/prometheus-out: ## 負荷試験を実行して Prometheus へメトリクス出力
	@export K6_PROMETHEUS_RW_SERVER_URL=http://localhost:9090/api/v1/write
	@echo ${K6_PROMETHEUS_RW_SERVER_URL}
	k6 run ./scenario/sample.js -u 100 --rps 100 -o experimental-prometheus-rw



# Makefile config
#===============================================================
help: ## Display this help screen
	@echo "Usage: make [task]\n\nTasks:"
	@perl -nle 'printf("    \033[33m%-30s\033[0m %s\n",$$1,$$2) if /^([a-zA-Z0-9_\/-]*?):(?:.+?## )?(.*?)$$/' $(MAKEFILE_LIST)
