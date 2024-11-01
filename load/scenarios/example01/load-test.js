import http from "k6/http";
import { check } from "k6";

export const options = {
  stages: [
    { target: 100, duration: "1m30s" },
    { target: 200, duration: "1m30s" },
    { target: 300, duration: "1m30s" },
    { target: 400, duration: "1m30s" },
  ],
};

export default function () {
  const result = http.get("http://nginx.nginx.svc.cluster.local:8081");
  check(result, {
    "http response status code is 200": result.status === 200,
  });
}
