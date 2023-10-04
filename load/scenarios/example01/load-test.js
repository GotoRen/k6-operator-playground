import http from "k6/http";
import { check } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
  stages: [
    { target: 1000, duration: "30s" },
    { target: 2000, duration: "30s" },
  ],
};

export default function () {
  const result = http.get("http://nginx.nginx.svc.cluster.local:8081");
  check(result, {
    "http response status code is 200": result.status === 200,
  });
}

export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
  };
}
