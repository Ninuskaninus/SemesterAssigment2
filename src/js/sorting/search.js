import { getListings } from "../API/GET/getListings.js";
const allListings = await getListings();

let searchResult = [];

export function searchBar(searchForm) {
  
    const listingsTags = allListings.map((listing) => listing.tags);
    const tags = listingsTags.flat();
    const uniqueTags = [...new Set(tags)];

    const searchInput = document.getElementById("search");
    const searchButton = document.getElementById("search-button");



}


