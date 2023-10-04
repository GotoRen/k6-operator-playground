KUBECTL = kubectl
APPLY = $(KUBECTL) apply
GET = $(KUBECTL) get
DELETE = $(KUBECTL) delete


NAME ?= example01
PARAL ?= 1



# Load testing
#===============================================================
.PHONY: generate/configmap
generate/configmap: ## シナリオを追加
	sh ./load/scripts/gen-k6-scenarios-configmaps.sh
	find ./load/scenarios/ -type f -name "configmap.yaml" -exec $(APPLY) -f {} \;

.PHONY: run/job
run/job: stop/job ## 負荷試験を実行
	sh ./load/scripts/run-load-testing.sh $(NAME) $(PARAL)

.PHONY: stop/job
stop/job: ## 負荷試験を停止
	@if $(GET) -f ./load/k6/k6.yaml &> /dev/null; then \
		$(DELETE) -f ./load/k6/k6.yaml; \
	fi



# Makefile config
#===============================================================
help:
	echo "Usage: make [task]\n\nTasks:"
	perl -nle 'printf("    \033[33m%-30s\033[0m %s\n",$$1,$$2) if /^([a-zA-Z0-9_\/-]*?):(?:.+?## )?(.*?)$$/' $(MAKEFILE_LIST)

.SILENT: help

.PHONY: $(shell egrep -o '^(\._)?[a-z_-]+:' $(MAKEFILE_LIST) | sed 's/://')
