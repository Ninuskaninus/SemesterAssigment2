export function searchField() {
  const mainContainer = document.getElementById("maincontainer-index");
  const searchField = document.createElement("div");
  searchField.classList.add("searchBar");
  mainContainer.appendChild(searchField);

  const searchForm = document.createElement("form");
  searchField.appendChild(searchForm);

  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.id = "search";
  searchInput.placeholder = "Search for something";
  searchForm.appendChild(searchInput);

  const searchButton = document.createElement("button");
  searchButton.type = "submit";
  searchButton.id = "search-button";
  searchForm.appendChild(searchButton);

  const searchIcon = document.createElement("img");
  searchIcon.src = "/src/assets/search.png";
  searchIcon.alt = "search";
  searchButton.appendChild(searchIcon);
}
