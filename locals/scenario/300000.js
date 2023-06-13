import http from "k6/http";
import { sleep } from "k6";

export let options = {
  stages: [
    { duration: "15m", target: 150000 }, // 15分間で150,000 RPSに到達
    { duration: "15m", target: 300000 }, // 残りの15分間で300,000 RPSに到達
  ],
};

export default function () {
  const res = http.get("http://localhost:8080"); // api/v1/healthz
  check(res, {
    is_status_200: (r) => r.status === 200,
  });

  sleep(0.003); // 1秒あたりのリクエスト数を0.003秒（約300,000 RPS）に設定
}
