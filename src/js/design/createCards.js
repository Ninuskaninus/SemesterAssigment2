import { getListings } from "../API/GET/getListings.js";
const listings = await getListings();
console.log(listings);

export function createCards(recentUploadsCard) {
  listings.forEach((listing) => {
    const card = document.createElement("div");
    card.classList.add("item-card");
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

    const cardContent = document.createElement("div");
    cardContent.classList.add("item-info");
    card.appendChild(cardContent);

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
    card.appendChild(cardButtons);

    const cardInfoLink = document.createElement("a");
    cardInfoLink.innerHTML = "Read more";
    cardInfoLink.href = "#";
    cardButtons.appendChild(cardInfoLink);

    const cardBidLink = document.createElement("a");
    cardBidLink.innerHTML = "Bid on this";
    cardBidLink.href = "#";
    cardBidLink.classList.add("secondaryBtn");
    cardButtons.appendChild(cardBidLink);
  });
}
