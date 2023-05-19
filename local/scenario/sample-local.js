import http from "k6/http";
import { check } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
  stages: [
    { target: 100, duration: "10s" },
    { target: 200, duration: "10s" },
  ],
};

export default function () {
  const result = http.get("http://localhost:8080");
  check(result, {
    "http response status code is 200": result.status === 200,
  });
}

// レポート出力設定
export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
  };
}
