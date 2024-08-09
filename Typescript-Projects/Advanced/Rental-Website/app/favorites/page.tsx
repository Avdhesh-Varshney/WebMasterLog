import EmptyState from "../components/EmptyState";

import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavoriteListings";
import FavoritesClient from "./FavoritesClient";

const ListingPage = async () => {
  const favoriteListings = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if (favoriteListings.length === 0) {
    return (
      <EmptyState
        title="No favorites found"
        subtitle="Looks like you have not added anything in the favorites"
      />
    );
  }

  return <FavoritesClient listings={favoriteListings} currentUser={currentUser} />;
};

export default ListingPage;
