#!/bin/bash

helm uninstall grafana -n monitoring
helm repo remove grafana
kubectl delete namespace monitoring
