import * as moment from "moment";

function chooseHackathonDateAndLocation(): string {
  const date = moment().add(1, "month").format("YYYY-MM-DD");
  const location = "San Francisco";

  return `The hackathon will be held in ${location} on ${date}.`;
}
