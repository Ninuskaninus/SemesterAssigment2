import { getListings } from "../API/GET/getListings.js";
import { errorLogin } from "../modals/errorLogin.js";

const accessToken = localStorage.getItem("accessToken");

const listings = await getListings();

export function createCards(recentUploadsCard) {
  listings.forEach((listing) => {
    const card = document.createElement("div");
    card.classList.add("item-card");
    card.id = listing.id;
    recentUploadsCard.appendChild(card);

    const cardImage = document.createElement("div");
    cardImage.classList.add("item-img");
    if (!listing.media || listing.media === " ") {
      cardImage.style.backgroundImage =
        "url(https://propertywiselaunceston.com.au/wp-content/themes/property-wise/images/no-image@2x.png)";
    } else {
      const img = new Image();
      img.src = listing.media;

      img.onload = function () {
        cardImage.style.backgroundImage = "url(" + listing.media + ")";
      };
      img.onerror = function () {
        cardImage.style.backgroundImage =
          "url(https://propertywiselaunceston.com.au/wp-content/themes/property-wise/images/no-image@2x.png)";
      };
    }
    card.appendChild(cardImage);

    const cardContentContainer = document.createElement("div");
    cardContentContainer.classList.add("item-content-container");
    card.appendChild(cardContentContainer);

    const cardContent = document.createElement("div");
    cardContent.classList.add("item-info");
    cardContentContainer.appendChild(cardContent);

    const cardDeadline = document.createElement("p");
    cardDeadline.innerHTML = "Deadline: " + listing.endsAt;
    cardContent.appendChild(cardDeadline);

    const cardTitle = document.createElement("h3");
    cardTitle.innerHTML = listing.title;
    cardContent.appendChild(cardTitle);

    const cardPrice = document.createElement("h3");
    cardPrice.classList.add("text-light");
    cardPrice.innerHTML = listing._count.bids + " credit";
    cardContent.appendChild(cardPrice);

    const cardButtons = document.createElement("div");
    cardButtons.classList.add("item-btn");
    cardContentContainer.appendChild(cardButtons);

    const cardInfoLink = document.createElement("a");
    cardInfoLink.innerHTML = "Read more";
    cardInfoLink.href = "preview/index.html?id=" + listing.id;
    cardButtons.appendChild(cardInfoLink);

    const cardBidLink = document.createElement("a");
    cardBidLink.innerHTML = "Bid on this";
    cardBidLink.href = "#";
    cardBidLink.classList.add("secondaryBtn");
    cardBidLink.addEventListener("click", () => {
      if (!accessToken) {
        errorLogin();
      } else {
        console.log("Bid on this");
      }
    });

    cardButtons.appendChild(cardBidLink);

    function updateCardLayout() {
      const windowWidth = window.innerWidth;
      if (windowWidth < 1024) {
        card.classList.add("item-card-mobile");
        cardImage.classList.add("item-img-mobile");
        cardContent.classList.add("item-info-mobile");
        cardButtons.classList.add("item-btn-mobile");
      } else {
        card.classList.remove("item-card-mobile");
        cardImage.classList.remove("item-img-mobile");
        cardContent.classList.remove("item-info-mobile");
        cardButtons.classList.remove("item-btn-mobile");
      }
    }

    updateCardLayout();
    window.addEventListener("resize", updateCardLayout);
  });
}
