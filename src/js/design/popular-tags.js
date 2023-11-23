import { tagsInfo } from "../information/tags-info.js";
const tags = tagsInfo();

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

  tags.forEach((tag) => {
    const tagsCard = document.createElement("div");
    tagsCard.classList.add("tags-card");
    popularTagsContainer.appendChild(tagsCard);

    const tagsImg = document.createElement("img");
    tagsImg.src = tag.img;
    tagsImg.alt = tag.name;
    tagsCard.appendChild(tagsImg);

    const tagsName = document.createElement("h6");
    tagsName.textContent = tag.name;
    tagsName.classList.add("tags-name");
    tagsCard.appendChild(tagsName);
  });
}
