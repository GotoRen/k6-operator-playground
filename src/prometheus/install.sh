#!/bin/bash

# kubectl create namespace monitoring
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
helm upgrade prometheus prometheus-community/prometheus \
  --install \
  --namespace monitoring \
  --values=./values.yaml \
  ;
