import http from "k6/http";
import { sleep } from "k6";
import { check } from "k6";

export const options = {
  scenarios: {
    scenario1: {
      executor: "shared-iterations",
      vus: 1,
      iterations: 120,
      startTime: "0s",
    },
  },
};

export default function () {
  const res = http.get("https://stg-apiv5-internal.openrec.tv/api/v1/health");
  check(res, {
    is_status_200: (r) => r.status === 200,
  });

  sleep(0.99);
}