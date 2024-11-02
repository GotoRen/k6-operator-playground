#!/usr/bin/env bash

set -o errexit
set -o nounset
set -o pipefail

echo "PROJECT: ${PROJECT}"
echo "SCRIPT: ${SCRIPT}"
echo "PARAL: ${PARAL}"
echo "ADDITIONAL_ARGS: ${ADDITIONAL_ARGS}"

ARGS="--tag project=${PROJECT} --tag script=${SCRIPT}"
if [ -n "${ADDITIONAL_ARGS}" ]; then
  ARGS+=" ${ADDITIONAL_ARGS}"
fi
if [ -z "${PARAL}" ]; then
  PARAL=1
fi

yq ea '
  .spec.parallelism = '${PARAL}' |
  .spec.script.volumeClaim.file = "root/REPOSITORY_NAME/project-scenarios/'"${PROJECT}"'/'"${SCRIPT}"'" |
  .spec.arguments = "'"${ARGS}"'"
' "k8s/resources/${PROJECT}/k6/k6.yaml" | kubectl apply -f -
echo "Applied TestRun CR"

kubectl get k6 "$(yq ea '.metadata.name' k8s/resources/${PROJECT}/k6/k6.yaml)" -n "${PROJECT}" -o yaml
