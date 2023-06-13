#!/bin/bash

helm uninstall prometheus -n monitoring
helm repo remove prometheus-community
kubectl delete namespace monitoring
