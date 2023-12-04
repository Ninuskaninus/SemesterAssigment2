import { tagsInfo } from "../information/tags-info.js";
import allVehicleTags from "../information/vehiclesTags.js";
import allElectronicsTags from "../information/electronicsTags.js";
import allHousingTags from '../information/housingTags.js';
import {getListings} from "../API/GET/getListings.js";

const tags = tagsInfo();
const listings = await getListings();


/**
 * Renders the popular tags section on the page.
 */
export function popularTags() {
  const mainContainer = document.getElementById("maincontainer-index");
  const popularTags = document.createElement("div");
  popularTags.classList.add("popularTags");
  mainContainer.appendChild(popularTags);

  const popularTagsH2 = document.createElement("h3");
  popularTagsH2.textContent = "Popular Tags";
  popularTags.appendChild(popularTagsH2);

  const popularTagsContainer = document.createElement("div");
  popularTagsContainer.classList.add("tags-container");
  popularTags.appendChild(popularTagsContainer);

  const tagsSearchContainer = document.createElement("div");
  tagsSearchContainer.classList.add("tags-search-container");
  mainContainer.appendChild(tagsSearchContainer);

  tags.forEach((tag) => {
    const tagsCard = document.createElement("div");
    tagsCard.classList.add("tags-card");
    tagsCard.id = tag.id;
    popularTagsContainer.appendChild(tagsCard);

    const tagsImg = document.createElement("img");
    tagsImg.src = tag.img;
    tagsImg.alt = tag.name;
    tagsCard.appendChild(tagsImg);

    const tagsName = document.createElement("h6");
    tagsName.textContent = tag.name;
    tagsName.classList.add("tags-name");
    tagsCard.appendChild(tagsName);

    tagsCard.addEventListener("click", () => {
      const filteredListings = filterListingsByTag(tag.id);
      displayFilteredListings(filteredListings);
    });
  });

  let selectedTags = [];

  /**
   * Filters listings based on the provided tag ID.
   * If the tag ID is already selected, clears the selected tags and returns an empty array.
   * If the tag ID is 'vehicles', selects all vehicle tags.
   * If the tag ID is 'electronics', selects all electronics tags.
   * If the tag ID is 'housing', selects all housing tags.
   * Filters the listings based on the selected tags and returns the filtered listings.
   *
   * @param {string} tagId - The ID of the tag to filter by.
   * @returns {Array} - The filtered listings.
   */
  function filterListingsByTag(tagId) {
    // Check if the button was clicked again
    if (selectedTags.includes(tagId)) {
      // Clear the selected tags and return an empty array
      selectedTags = [];
      return [];
    }
  
    if (tagId === 'vehicles') {
      selectedTags = allVehicleTags;
    } else if (tagId === 'electronics') {
      selectedTags = allElectronicsTags;
    } else if (tagId === 'housing') {
      selectedTags = allHousingTags;
    }
  
    const filteredListings = listings.filter((listing) =>
      listing.tags.some((listingTag) => selectedTags.includes(listingTag))
    );
  
    return filteredListings;
  }
  

  /**
   * Displays the filtered listings on the page.
   * 
   * @param {Array} filteredListings - The array of filtered listings to display.
   * @returns {void}
   */
  let isListingsVisible = false;
  function displayFilteredListings(filteredListings) {
    tagsSearchContainer.innerHTML = "";

    if (filteredListings.length > 0) {
      filteredListings.forEach((listing) => {
        const listingItem = document.createElement("a");
        listingItem.classList.add("search-result-item");
        tagsSearchContainer.appendChild(listingItem);
        
        const listingImage = document.createElement("div");
        listingImage.classList.add("search-result-image");
        listingImage.style.backgroundImage = `url(${listing.media})`;
        listingItem.appendChild(listingImage);

        const listingTitle = document.createElement("p");
        listingTitle.classList.add("search-result-title");
        listingTitle.innerHTML = listing.title;
        listingItem.appendChild(listingTitle);

        listingItem.addEventListener("click", () => {
          window.location.href = `/preview/index.html?id=${listing.id}`;
        });
      });

      if (isListingsVisible) {
        tagsSearchContainer.innerHTML = "";
        isListingsVisible = false;
      } else {
        isListingsVisible = true;
      }

    } else {
      const noResult = document.createElement("div");
     noResult.classList.add("no-result");
      tagsSearchContainer.appendChild(noResult);

      const noResultText = document.createElement("p");
      noResultText.innerHTML = "No results found";
      noResult.appendChild(noResultText);
    }
  }
}
