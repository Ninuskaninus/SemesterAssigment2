import { getListings } from "../API/GET/getListings.js";
import { errorLoginModal } from "../design/errorLoginModal.js";

const listings = await getListings();
const currentUrl = window.location.href;
const thisID = currentUrl.split("=")[1];
const accesToken = localStorage.getItem("accessToken");
const username = localStorage.getItem("username");

const thisListing = listings.filter((listing) => listing.id === thisID);
const thisBids = thisListing[0].bids;
const highestBid = thisBids.reduce((prev, current) =>
  prev.amount > current.amount ? prev : current
);
const currentPrice = highestBid.amount;
const thisMedia = thisListing[0].media;

export function previewListings() {
  const bidBtn = document.getElementById("bidOnThis");
  bidBtn.addEventListener("click", () => {
    if (!accesToken) {
      errorLoginModal();
    } else {
      console.log("bid");
    }
  });
  const previewTrack = document.getElementById("previewImageMain");

  const previewImage = document.createElement("div");
  previewImage.classList.add("previewImg");
  previewImage.style.backgroundImage = "url(" + thisMedia + ")";
  if (thisMedia === " " || thisMedia === null) {
    previewImage.style.backgroundImage = "url(https://propertywiselaunceston.com.au/wp-content/themes/property-wise/images/no-image@2x.png)";
  }
  previewTrack.appendChild(previewImage);

  thisListing.forEach((listing) => {
    const sellerAvatar = document.getElementById("sellerAvatar");
    sellerAvatar.style.backgroundImage =
      "url(" + thisListing[0].seller.avatar + ")";
    const sellerName = document.getElementById("sellerName");
    sellerName.innerHTML = thisListing[0].seller.name;

    const sellerEmail = document.getElementById("sellerEmail");
    sellerEmail.innerHTML = thisListing[0].seller.email;

    const deadline = document.getElementById("deadline");
    deadline.innerHTML = thisListing[0].endsAt;

    const title = document.getElementById("title");
    title.innerHTML = thisListing[0].title;

    const description = document.getElementById("description");
    description.innerHTML = thisListing[0].description;

    const highestBid = document.getElementById("credit");
    highestBid.innerHTML = currentPrice + " credits";

    const bidlist = document.getElementById("bidlist");

    const bidHeading = document.createElement("h5");
    bidHeading.innerHTML = "Latest bids";
    bidlist.appendChild(bidHeading);

    const bidDivider = document.createElement("div");
    bidDivider.classList.add("whiteDivider");
    bidlist.appendChild(bidDivider);

    thisBids.forEach((bid) => {
      const bidItem = document.createElement("div");
      bidItem.classList.add("bid");
      bidlist.appendChild(bidItem);

      const bidUsername = document.createElement("p");
      bidUsername.innerHTML = bid.bidderName;
      if (bid.bidderName === username) {
        bidUsername.innerHTML = "You";
        bidUsername.style.color = "green"
      }
      bidItem.appendChild(bidUsername);

      const bidAmount = document.createElement("p");
      bidAmount.innerHTML = bid.amount + " credits";
      bidItem.appendChild(bidAmount);

      if (username) {
        if (bid.bidderName === username) {
          bidItem.classList.add("myBid");
        } else {
          bidItem.classList.remove("myBid");
        }
      }
    });
  });
}
