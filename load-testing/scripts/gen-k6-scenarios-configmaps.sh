#!/usr/bin/env bash

set -o errexit
set -o nounset
set -o pipefail

generate_configmap() {
  local scenario_dir=$1
  local configmap_name="k6-operator-$(basename "$scenario_dir")"
  local scenario_file="${scenario_dir}/load-test.js"

  if kubectl get configmap "${configmap_name}" >/dev/null 2>&1; then
    kubectl delete configmap "${configmap_name}"
  fi

  kubectl create configmap "${configmap_name}" --from-file="${scenario_file}" --dry-run=client -o yaml \
    >"${scenario_dir}/configmap.yaml"
}

generate_recursive_configmaps() {
  local base_dir=$1

  for scenario_dir in "${base_dir}"/*/; do
    generate_configmap "${scenario_dir}"
  done
}

SCENARIOS_DIR=$(dirname "$0")/../scenarios
generate_recursive_configmaps "${SCENARIOS_DIR}"
