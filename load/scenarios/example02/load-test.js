import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  stages: [
    { target: 100000, duration: "30s" },
    { target: 200000, duration: "30s" },
  ],
};

export default function () {
  const result = http.get("http://nginx.nginx.svc.cluster.local:8081");
  check(result, {
    "http response status code is 200": result.status === 200,
  });

  sleep(0.99);
}
