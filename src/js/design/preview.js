import { getListings } from "../API/GET/getListings.js";
import { errorLoginModal } from "../design/errorLoginModal.js";
import { bidModalTrigger } from "../modals/bidModalTrigger.js";
import { bidModalPreview } from "../design/bidModalPreview.js";

const currentUrl = new URL(window.location.href);
const thisID = currentUrl.searchParams.get("id");
const accessToken = localStorage.getItem("token");
const username = localStorage.getItem("username");

let thisListing;
let thisBids;
let currentPrice = 0;


try {
  const listings = await getListings();
  thisListing = listings.find((listing) => listing.id === thisID);

  if (thisListing) {
    thisBids = thisListing.bids;
    thisBids.sort((a, b) => b.amount - a.amount);
    currentPrice = thisBids.length > 0
      ? Math.max(...thisBids.map((bid) => bid.amount), 0)
      : 0;
  } else {
    console.log("Listing not found");
  }
} catch (error) {
  console.error("Error fetching listings:", error);
}

const thisMedia = thisListing?.media || "https://propertywiselaunceston.com.au/wp-content/themes/property-wise/images/no-image@2x.png";
const deadlineDate = new Date(thisListing?.endsAt);
const deadlineDateFormatted = deadlineDate.toLocaleDateString("no-NO", {
  day: "2-digit",
  month: "2-digit",
  year: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
});

export function previewListings() {
  const bidBtn = document.getElementById("bidOnThis");

  bidBtn.addEventListener("click", () => {
    if (!accessToken) {
      errorLoginModal();
    } else {
      bidModalTrigger(thisListing);
    }
  });

  const previewMain = document.getElementById("previewImageMain");
  const previewGallery = document.getElementById("previewImageNav");
  
  // Assuming thisListing?.media is an array
  if (thisListing?.media && thisListing.media.length > 0) {
    thisListing.media.forEach((media, index) => {
      const previewGalleryItem = document.createElement("div");
      previewGalleryItem.classList.add("gallery-nav-item");
      previewGalleryItem.style.backgroundImage = `url(${media})`;
  
      previewGalleryItem.addEventListener("click", () => {
        previewMain.style.backgroundImage = `url(${media})`;
        previewMain.scrollIntoView({ behavior: "smooth" });
      });
  
      previewGallery.appendChild(previewGalleryItem);
      if (index === 0) {
        previewMain.style.backgroundImage = `url(${media})`;
      }
    });
  
    if (thisListing.media.length === 1) {
      previewGallery.style.display = "none";
    }
  } else {
    previewGallery.style.display = "none";
  }
  

  if (!thisListing) return;

  const sellerAvatar = document.getElementById("sellerAvatar");
  sellerAvatar.style.backgroundImage = `url(${thisListing.seller?.avatar})`;

  const sellerName = document.getElementById("sellerName");
  sellerName.innerHTML = thisListing.seller?.name;

  const sellerEmail = document.getElementById("sellerEmail");
  sellerEmail.innerHTML = thisListing.seller?.email;

  const deadlineElement = document.getElementById("deadline");
  deadlineElement.innerHTML = deadlineDateFormatted;

  const titleElement = document.getElementById("title");
  titleElement.innerHTML = thisListing.title;

  const descriptionElement = document.getElementById("description");
  descriptionElement.innerHTML = thisListing.description;

  const highestBidElement = document.getElementById("credit");
  highestBidElement.innerHTML = `${currentPrice} credits`;

  const bidListElement = document.getElementById("bidlist");

  const bidDivider = document.createElement("div");
  bidDivider.classList.add("whiteDivider");
  bidListElement.appendChild(bidDivider);

  thisBids.forEach((bid) => {
    const bidItem = document.createElement("div");
    bidItem.classList.add("bid");
    bidListElement.appendChild(bidItem);

    const bidUsername = document.createElement("p");
    bidUsername.innerHTML = bid.bidderName === username ? "You" : bid.bidderName;
    bidUsername.style.color = bid.bidderName === username ? "green" : "";

    bidItem.appendChild(bidUsername);

    const bidAmount = document.createElement("p");
    bidAmount.innerHTML = `${bid.amount} credits`;
    bidItem.appendChild(bidAmount);

    if (username && bid.bidderName === username) {
      bidItem.classList.add("myBid");
    } else {
      bidItem.classList.remove("myBid");
    }
  });

  bidModalPreview(thisListing);

}

