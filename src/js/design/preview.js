import { getListings } from "../API/GET/getListings.js";
import { errorLoginModal } from "../design/errorLoginModal.js";

const listings = await getListings();
const currentUrl = window.location.href;
const thisID = currentUrl.split("=")[1];
const accesToken = localStorage.getItem("accessToken");

const thisListing = listings.filter((listing) => listing.id === thisID);
console.log(thisListing);
const thisBids = thisListing[0].bids;
const highestBid = thisBids.reduce((prev, current) =>
  prev.amount > current.amount ? prev : current
);
const currentPrice = highestBid.amount;
const myUsername = localStorage.getItem("username");

const thisMedia = thisListing[0].media;
console.log(thisMedia);

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
      bidItem.appendChild(bidUsername);

      const bidAmount = document.createElement("p");
      bidAmount.innerHTML = bid.amount + " credits";
      bidItem.appendChild(bidAmount);

      if (myUsername) {
        if (bid.bidderName === myUsername) {
          bidItem.classList.add("myBid");
        } else {
          bidItem.classList.remove("myBid");
        }
      }
    });
  });
}
