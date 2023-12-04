import { getListings } from "../API/GET/getListings.js";
import { bidModalTrigger } from "../modals/bidModalTrigger.js";
import { errorLogin } from "../modals/errorLogin.js";
import {searchBar} from "../sorting/search.js";

const accessToken = localStorage.getItem("token");

export async function createCards(recentUploadsCard) {
  const listings = await getListings();
  listings.sort((a, b) => new Date(b.updated) - new Date(a.updated));
  
  const searchResults = searchBar();
  const selectedListing = searchResults > 0 ? searchResults : listings;

  selectedListing.forEach((listing) => {
    createCards(recentUploadsCard, listing);
  }
  );

  console.log(selectedListing);

  function createCards(recentUploadsCard, listing) {
    const deadline = new Date(listing.endsAt);
    const now = new Date();

    const listingDeadline = new Date(listing.endsAt);
    const listingDeadlineFormatted = listingDeadline.toLocaleDateString(
      "no-NO",
      {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }
    );

    const card = document.createElement("div");
    card.classList.add("item-card");
    recentUploadsCard.appendChild(card);

    const yourUploadContainer = document.createElement("div");
    yourUploadContainer.classList.add("yourUploadContainer");
    card.appendChild(yourUploadContainer);

    const yourUpload = document.createElement("p");
    yourUpload.classList.add("yourUpload");
    yourUpload.innerHTML = "Your listing";
    yourUploadContainer.appendChild(yourUpload);

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
    cardDeadline.innerHTML = "Deadline: " + listingDeadlineFormatted;
    if (listingDeadline < now) {
      cardDeadline.innerHTML = "Ended: " + listingDeadlineFormatted;
      cardDeadline.classList.add("text-danger", "mb-4");
    } else {
      cardDeadline.innerHTML = "Deadline: " + listingDeadlineFormatted;
      cardDeadline.classList.add("text-light", "mb-4");
    }

    cardContent.appendChild(cardDeadline);

    const cardTitle = document.createElement("h3");
    cardTitle.innerHTML = listing.title;
    cardTitle.style.textOverflow = "ellipsis";
    if (listing.title.length > 25) {
      cardTitle.innerHTML = listing.title.slice(0, 25) + " " + "...";
    }
    cardContent.appendChild(cardTitle);

    const cardPrice = document.createElement("h3");
    cardPrice.classList.add("text-light");

    const bids = listing.bids;
    const bidsArray = Object.values(bids);
    const bidsArraySorted = [...bidsArray].sort(
      (a, b) => (b.amount || 0) - (a.amount || 0)
    );
    const highestBid = bidsArraySorted[0] && bidsArraySorted[0].amount;

    if (bidsArray.length === 0 || highestBid === undefined) {
      cardPrice.innerHTML = "0 Credit";
    } else {
      cardPrice.innerHTML = highestBid + " Credit";
    }

    cardContent.appendChild(cardPrice);

    const cardButtons = document.createElement("div");
    cardButtons.classList.add("item-btn");
    cardContentContainer.appendChild(cardButtons);

    const cardInfoLink = document.createElement("a");
    cardInfoLink.innerHTML = "Read more";
    cardInfoLink.classList.add("bidLink");
    cardInfoLink.href = "preview/index.html?id=" + listing.id;
    cardButtons.appendChild(cardInfoLink);

    const cardBidLink = document.createElement("button");

    cardBidLink.dataset.id = listing.id;
    if (listing.seller.name === localStorage.getItem("username")) {
      cardBidLink.style.display = "none";
      card.style.border = "2px solid #f0ad4e";
      yourUploadContainer.style.display = "block";
    } else {
      cardBidLink.innerHTML = "Bid on this";
      cardBidLink.disabled = false;
    }

    cardBidLink.classList.add("secondaryBtn", "biddingBtn");
    cardBidLink.addEventListener("click", () => {
      if (accessToken) {
        bidModalTrigger();
      } else {
        errorLogin();
      }
    });

    cardButtons.appendChild(cardBidLink);

    function updateCardLayout() {
      const windowWidth = window.innerWidth;
      if (windowWidth < 1025) {
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
  };
}
