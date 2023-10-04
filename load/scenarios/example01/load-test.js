import http from "k6/http";
import { check } from "k6";

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
