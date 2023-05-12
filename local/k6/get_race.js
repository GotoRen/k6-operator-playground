import { check, sleep } from "k6";
import grpc from "k6/net/grpc";

const client = new grpc.Client();
client.load(["../../tmp", "../../api/tipstar-proto/tipstar-gt"], "gt.proto");

export default () => {
  client.connect("localhost:3000", {
    plaintext: true,
  });

  const data = { race_id: "PS-2022-03-18_35_01" };
  const response = client.invoke("gt.TipstarGTRace/GetRace", data);

  check(response, {
    "status is OK": (r) => r && r.status === grpc.StatusOK,
    "race.id is not empty": (r) =>
      r.message.race.id !== null &&
      r.message.race.id !== undefined &&
      r.message.race.id !== "",
  });

  client.close();
  sleep(Math.random() + 0.5);
};
