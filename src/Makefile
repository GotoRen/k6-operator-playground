# template
#===============================================================
.PHONY: template
template:
	helm template ./load-testing -f load-testing/values.yaml

.PHONY: dry-install
dry-install:
	helm install --dry-run --debug ./load-testing -f load-testing/values.yaml --generate-name

.PHONY: install
install:
	helm install --namespace monitoring ./load-testing -f load-testing/values.yaml --generate-name



# installed helm
#===============================================================
.PHONY: list
list:
	helm list --all

.PHONY: get-manifest
get-manifest:
	helm get manifest $$(helm ls | grep load-testing | awk '{print $$1}')

.PHONY: repo-list
repo-list:
	helm repo list



# service port forward
#===============================================================
.PHONY: grafana-service
grafana-service:
	kubectl port-forward svc/grafana 3000:80 -n monitoring

.PHONY: promtheus-service
promtheus-service:
	kubectl port-forward svc/prometheus-server 9090:80 -n monitoring



# Makefile config
#===============================================================
help:
	echo "Usage: make [task]\n\nTasks:"
	perl -nle 'printf("    \033[33m%-30s\033[0m %s\n",$$1,$$2) if /^([a-zA-Z0-9_\/-]*?):(?:.+?## )?(.*?)$$/' $(MAKEFILE_LIST)

.SILENT: help

.PHONY: $(shell egrep -o '^(\._)?[a-z_-]+:' $(MAKEFILE_LIST) | sed 's/://')
