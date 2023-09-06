import { List } from "@raycast/api";
import { useFetch } from "@raycast/utils";
import GtfsRealtimeBindings from "gtfs-realtime-bindings";

export default function Command() {
  const { isLoading, data, revalidate, error } = useFetch("https://opendata.hamilton.ca/GTFS-RT/GTFS_TripUpdates.pb");

  if (isLoading) return <List isLoading={true} />;

  if (error) {
    return (
      <List>
        <List.Item title="Error" subtitle={error.message} />
      </List>
    );
  }

  // parse data into GTFS-Realtime format
  console.log(data);
  // print the data type of the data
  console.log(typeof data);
  const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(new Uint8Array(data.arrayBuffer));

  feed.entity.forEach((entity) => {
    if (entity.tripUpdate) {
      console.log(entity.tripUpdate);
    }
  });

  return (
    <List>
      <List.Item title="Item 1" />
      <List.Item title="Item 1" />
      <List.Item title="Item 1" />
    </List>
  );
}
