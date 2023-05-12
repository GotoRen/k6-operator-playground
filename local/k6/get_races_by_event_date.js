import { check, sleep } from "k6";
import grpc from "k6/net/grpc";

const client = new grpc.Client();
client.load(["../../tmp", "../../api/tipstar-proto/tipstar-gt"], "gt.proto");

export default () => {
  client.connect("localhost:3000", {
    plaintext: true,
  });

  const data = { event_date: "2021-03-18" };
  const response = client.invoke("gt.TipstarGTRace/GetRaces", data);

  check(response, {
    "status is OK": (r) => r && r.status === grpc.StatusOK,
    "race.id is not empty": (r) =>
      r.message.races.length > 0 &&
      r.message.races.every((race) => race.id || "" !== ""),
  });

  client.close();
  sleep(Math.random() + 0.5);
};
