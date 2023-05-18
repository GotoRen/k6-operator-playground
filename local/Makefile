# Docker parameters
DOCKER=docker
COMPOSE=$(DOCKER) compose
EXEC=$(COMPOSE) exec
EXECD=$(COMPOSE) exec -d
BUILD=$(COMPOSE) build
UP=$(COMPOSE) up -d
LOGS=$(COMPOSE) logs -f
STOP=$(COMPOSE) stop
RM=$(COMPOSE) rm
DOWN=$(COMPOSE) down
REMOVE=$(COMPOSE) rm -fsv
# kubectl parameters
KUBECTL=kubectl
GET=$(KUBECTL) get
DELETE=$(KUBECTL) delete
# k6 parameters
K6=k6
RUN=$(K6) run
# target
NGINX=$(EXEC) nginx
GRAFANA=$(EXEC) grafana
INFLUXDB=$(EXEC) influxdb



# all
#===============================================================
.PHONY: run
run: ## 負荷試験実行
	$(RUN) ./scenario/sample.js -u 100 --rps 100

.PHONY: run/out
run/out: ## 負荷試験を実行して、結果をinfluxdbに出力
	$(RUN) ./scenario/sample.js -u 100 --rps 100 --out influxdb=http://localhost:8086/loadtest

.PHONY: run/job
run/job: delete/job ## job を生成
	$(KUBECTL) apply -f ./scenario/custom-resource.yaml

.PHONY: delete/job
delete/job: ## job を削除
	@if $(GET) -f ./scenario/custom-resource.yaml &> /dev/null; then \
		$(DELETE) -f ./scenario/custom-resource.yaml; \
	fi



# container exec
#===============================================================
.PHONY: nginx
nginx:
	$(NGINX) bash

.PHONY: grafana
grafana:
	$(GRAFANA) bash

.PHONY: influxdb
influxdb:
	$(INFLUXDB) bash



# Makefile config
#===============================================================
help:
	echo "Usage: make [task]\n\nTasks:"
	perl -nle 'printf("    \033[33m%-30s\033[0m %s\n",$$1,$$2) if /^([a-zA-Z0-9_\/-]*?):(?:.+?## )?(.*?)$$/' $(MAKEFILE_LIST)

.SILENT: help

.PHONY: $(shell egrep -o '^(\._)?[a-z_-]+:' $(MAKEFILE_LIST) | sed 's/://')
