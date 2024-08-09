import EmptyState from "../components/EmptyState";

import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";
import PropertiesClient from "./PropertiesClient";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthoprised" subtitle="Please login" />;
  }

  const listings = await getListings({ userId: currentUser.id });

  if (listings.length === 0) {
    return <EmptyState title="No properties found" subtitle="Seems like you have no properties" />;
  }

  return <PropertiesClient listings={listings} currentUser={currentUser} />;
};

export default TripsPage;
