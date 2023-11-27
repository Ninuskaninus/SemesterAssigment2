import { createCards } from "./createCards.js";
import { removeEnded } from "../modals/removeEnded.js";
export function recentUploads() {
  const mainContainer = document.getElementById("maincontainer-index");
  const recentUploads = document.createElement("div");
  recentUploads.classList.add("recentUpload");
  mainContainer.appendChild(recentUploads);

  const recentUploadsHeader = document.createElement("h2");
  recentUploadsHeader.innerText = "Recent Uploads";
  recentUploads.appendChild(recentUploadsHeader);

  const recentUploadsButton = document.createElement("button");
  recentUploadsButton.classList.add("mainBtn", "btn");
  recentUploadsButton.textContent = "Remove ended auctions";
  recentUploadsButton.addEventListener("click", () => {
    removeEnded();
  });
  recentUploads.appendChild(recentUploadsButton);

  const recentUploadsContainer = document.createElement("div");
  recentUploadsContainer.classList.add("cardsContainer");
  recentUploads.appendChild(recentUploadsContainer);

  createCards(recentUploadsContainer);
}
