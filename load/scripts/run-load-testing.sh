#!/usr/bin/env bash

set -o errexit
set -o nounset
set -o pipefail

SCENARIOS_DIR=$(dirname "$0")/../

NAME=k6-operator-$1
PARAL=$2

if [ -z "${NAME}" ]; then
  NAME=k6-operator-no-name
fi

if [ -z "${PARAL}" ]; then
  PARAL=1
fi

yq ea '
  .metadata.name = "'"${NAME}"'" |
  .spec.parallelism = '${PARAL}' |
  .spec.script.configMap.name = "'"${NAME}"'"
' "${SCENARIOS_DIR}/k6/base.yaml" >"${SCENARIOS_DIR}/k6/k6.yaml"

kubectl apply -f "${SCENARIOS_DIR}/k6/k6.yaml"

echo "Applied TestRun CR"
