# Load testing
#===============================================================
.PHONY: run
run: ## 負荷試験実行
	k6 run ./scenario/sample.js -u 100 --rps 100

.PHONY: run/influxdb-out
run/influxdb-out: ## 負荷試験を実行してInfluxDBへメトリクス出力
	k6 run ./scenario/sample.js -u 100 --rps 100 --out influxdb=http://localhost:8086/loadtest

.PHONY: run/prometheus-out
run/prometheus-out: ## 負荷試験を実行してPrometheusへメトリクス出力
	@export K6_PROMETHEUS_RW_SERVER_URL=http://localhost:9090/api/v1/write
	@echo ${K6_PROMETHEUS_RW_SERVER_URL}
	k6 run ./scenario/sample.js -u 100 --rps 100 -o experimental-prometheus-rw



# Makefile config
#===============================================================
help:
	echo "Usage: make [task]\n\nTasks:"
	perl -nle 'printf("    \033[33m%-30s\033[0m %s\n",$$1,$$2) if /^([a-zA-Z0-9_\/-]*?):(?:.+?## )?(.*?)$$/' $(MAKEFILE_LIST)

.SILENT: help

.PHONY: $(shell egrep -o '^(\._)?[a-z_-]+:' $(MAKEFILE_LIST) | sed 's/://')
