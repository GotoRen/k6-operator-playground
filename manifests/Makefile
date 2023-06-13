# kubectl parameters
KUBECTL = kubectl
APPLY = $(KUBECTL) apply
GET = $(KUBECTL) get
DELETE = $(KUBECTL) delete
PORT_FORWARD = $(KUBECTL) port-forward
# k6 parameters
K6 = k6
RUN = $(K6) run
# kustomize
KUSTOMIZE = kustomize
BUILD = $(KUSTOMIZE) build
CREATE = $(KUSTOMIZE) create

BASE := ./base
OVERLAY := ./overlay

NAME ?= example01
PARAL ?= 1



# port-forward
#===============================================================
.PHONY: influx-svc
influx-svc: ## InfluxDBを公開
	$(PORT_FORWARD) --namespace k6-operator svc/influxdb 8086:8086

.PHONY: grafana-svc
grafana-svc: ## Grafanaを公開: http://localhost:3000 admin/password
	$(PORT_FORWARD) --namespace monitoring svc/grafana 3000:80


# Kustomize command
#===============================================================
.PHONY: create
create: ## kustomization 生成
	$(CREATE) --autodetect $(BASE)



# Load testing
#===============================================================
.PHONY: generate/configmap
generate/configmap: ## ConfigMapを生成
	sh ./base/load/scripts/gen-k6-scenarios-configmaps.sh
	find ./base/load/scenarios/ -type f -name "configmap.yaml" -exec $(APPLY) -f {} \;

.PHONY: run/job
run/job: delete/job ## 負荷試験実行
	sh ./base/load/scripts/run-load-testing.sh $(NAME) $(PARAL)

.PHONY: delete/job
delete/job: ## JOBを削除
	@if $(GET) -f ./base/load/k6/k6.yaml &> /dev/null; then \
		$(DELETE) -f ./base/load/k6/k6.yaml; \
	fi

.PHONY: stop/job
stop/job:  ## 負荷試験停止
	kubectl delete k6



# Makefile config
#===============================================================
help:
	echo "Usage: make [task]\n\nTasks:"
	perl -nle 'printf("    \033[33m%-30s\033[0m %s\n",$$1,$$2) if /^([a-zA-Z0-9_\/-]*?):(?:.+?## )?(.*?)$$/' $(MAKEFILE_LIST)

.SILENT: help

.PHONY: $(shell egrep -o '^(\._)?[a-z_-]+:' $(MAKEFILE_LIST) | sed 's/://')
