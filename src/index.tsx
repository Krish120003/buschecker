import { List } from "@raycast/api";
import { useFetch } from "@raycast/utils";
import GtfsRealtimeBindings from "gtfs-realtime-bindings";
import { useEffect } from "react";
import { LocalStorage } from "@raycast/api";

/*
export async function SaveLocation() {
  await LocalStorage.setItem("JHE", "jhe localation");
  await LocalStorage.setItem("PG", "pg localation");
  await LocalStorage.setItem("MDCL", "mdcl localation");
  const item = await LocalStorage.getItem<string>("favorite-fruit");
  console.log(item);
}*/

export default function Command() {
  const location = useFetch(`https://nominatim.openstreetmap.org/search?q=125 Emerson St, Hamilton&format=json`);
  console.log(location);
  console.log("g\n\n");
  const transitInfo = useFetch(
    "https://external.transitapp.com/v3/otp/plan?fromPlace=" + 43.260903 + ",-79.920013&toPlace=43.253864, -79.921328"
  );
  console.log(transitInfo);

  //https://external.transitapp.com/v3/otp/plan?fromPlace=43.260903, -79.920013&toPlace=43.253864, -79.921328

  const { isLoading, data, revalidate, error } = useFetch("https://opendata.hamilton.ca/GTFS-RT/GTFS_TripUpdates.pb");

  if (isLoading) return <List isLoading={true} />;

  if (error) {
    return (
      <List>
        <List.Item title="Error" subtitle={error.message} />
      </List>
    );
  }

  /*
  // parse data into GTFS-Realtime format
  console.log(data);
  // print the data type of the data
  console.log(typeof data);
  const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(new Uint8Array(data.arrayBuffer));

  feed.entity.forEach((entity) => {
    if (entity.tripUpdate) {
      console.log(entity.tripUpdate);
    }
  });*/

  return (
    <List>
      <List.Item title="Item 1" />
      <List.Item title="Item 1" />
      <List.Item title="Item 1" />
    </List>
  );
}

function str2ab(str: string) {
  var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
  var bufView = new Uint16Array(buf);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}
