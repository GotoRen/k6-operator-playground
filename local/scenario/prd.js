import http from "k6/http";
import { sleep, check } from "k6";
import { Trend } from "k6/metrics";

const trends = {
  scenario1: new Trend("scenario1) Response time", true),
  scenario2: new Trend("scenario2) Response time", true),
};

const VUS = 1;
const DURATION = "10s";

export const options = {
  scenarios: {
    scenario1: {
      executor: "constant-vus",
      exec: "scenarioFunc",
      vus: VUS,
      duration: DURATION,
      env: {
        SCENARIO_ID: "1",
      },
    },
    scenario2: {
      executor: "constant-vus",
      exec: "scenarioFunc",
      vus: VUS,
      duration: DURATION,
      env: {
        SCENARIO_ID: "2",
      },
    },
  },
};

export function setup() {
  const url = ""; // tokenの取得先
  const params = {
    headers: {
      Authorization: "Bearer XXX",
    },
  };
  const res = http.get(url, params);
  const token = JSON.parse(res.body).account.token;

  return token;
}

export function scenarioFunc(token) {
  const scenarioUrl = ""; // 実行するAPI先
  const scenario = http.get(scenarioUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  __ENV.SCENARIO_ID === "1"
    ? trends.scenario1.add(scenario.timings.duration)
    : trends.scenario2.add(scenario.timings.duration);

  check(scenario, {
    "scenario status is 200": (res) => res.status === 200,
  });

  sleep(1);
}
