import { getListings } from "../API/GET/getListings.js";

export async function searchField() {
  const mainContainer = document.getElementById("maincontainer-index");
  const searchField = document.createElement("div");
  searchField.classList.add("searchBar");
  mainContainer.appendChild(searchField);

  const searchForm = document.createElement("form");
  searchForm.id = "search-form";
  searchField.appendChild(searchForm);

  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.id = "search";
  searchInput.placeholder = "Search for something";
  searchForm.appendChild(searchInput);

  const searchButton = document.createElement("button");
  searchButton.type = "button";
  searchButton.id = "search-button";
  searchForm.appendChild(searchButton);

  const searchIcon = document.createElement("img");
  searchIcon.src = "/src/assets/search.png";
  searchIcon.alt = "search";
  searchButton.appendChild(searchIcon);

  const searchResults = document.createElement("div");
  searchResults.id = "search-results";
  searchResults.classList.add("search-results");
  searchField.appendChild(searchResults);

  const resultTitle = document.createElement("h2");
  resultTitle.innerHTML = "Search Results";
  searchResults.appendChild(resultTitle);

  searchButton.addEventListener("click", async () => {
    const searchValue = searchInput.value;
    const allListings = await getListings();
    searchResults.innerHTML = "";
    searchResults.style.display = "block";
    
    if (Array.isArray(allListings)) {
      const searchResult = allListings.filter((listing) =>
        listing.title.toLowerCase().includes(searchValue.toLowerCase())
      );
      console.log(searchResult);

      searchResults.innerHTML = "";

      // Iterate over search results and create elements
      searchResult.forEach((listing) => {
        const searchResultItem = document.createElement("div");
        searchResultItem.classList.add("search-result-item");
        searchResults.appendChild(searchResultItem);

        const searchResultImage = document.createElement("div");
        searchResultImage.classList.add("search-result-image");
        searchResultImage.style.backgroundImage = `url(${listing.media})`;
        searchResultItem.appendChild(searchResultImage);

        const searchResultTitle = document.createElement("p");
        searchResultTitle.classList.add("search-result-title");
        searchResultTitle.innerHTML = listing.title;
        searchResultItem.appendChild(searchResultTitle);

        const searchResultBtn = document.createElement("button");
        searchResultBtn.classList.add("mainBtn", "btn");
        searchResultBtn.innerHTML = "View";
        searchResultItem.appendChild(searchResultBtn);

      });
    } else {
      console.error("Invalid data received from getListings");
    }
  });
}
