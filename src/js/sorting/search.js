import { getListings } from "../API/GET/getListings.js";
const allListings = await getListings();

export function searchBar() {
  const listingsTags = allListings.map((listing) => listing.tags);
  const tags = listingsTags.flat();
  const uniqueTags = [...new Set(tags)];
  console.log(tags);
}
