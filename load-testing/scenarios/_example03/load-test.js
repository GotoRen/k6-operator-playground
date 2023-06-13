import http from "k6/http";
import { sleep } from "k6";

export let options = {
  stages: [{ duration: "2m", target: 1 }],
};

export default function () {
  const res = http.get("https://stg-apiv5-internal.openrec.tv/api/v1/health");
  check(res, {
    is_status_200: (r) => r.status === 200,
  });

  sleep(3);
}
