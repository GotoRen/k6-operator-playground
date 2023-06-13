import http from "k6/http";
import { check } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
  stages: [
    { target: 1000, duration: "3m" },
    { target: 2000, duration: "3m" },
  ],
};

export default function () {
  const result = http.get(
    "https://stg-apiv5-internal.openrec.tv/api/v1/health"
  );
  check(result, {
    "http response status code is 200": result.status === 200,
  });
}

export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
  };
}
