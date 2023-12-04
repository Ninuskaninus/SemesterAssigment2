import { getListings } from "../API/GET/getListings.js";
import { placeBid } from "../API/POST/bid.js";


document.addEventListener("click", async (e) => {
    if (e.target.classList.contains("biddingBtn")) {
      const listingId = e.target.dataset.id;
      const listingData = await getListings(); 
      const selectedListing = listingData.find((item) => item.id == listingId);

        const bids = selectedListing.bids;
        const bidsArray = Object.values(bids);
        const bidsArraySorted = [...bidsArray].sort((a, b) => b.amount - a.amount);
        const highestBid = bidsArraySorted.length > 0 ? bidsArraySorted[0].amount : 0;
        
    bidModal(selectedListing);
    const modal = document.getElementById("bidModal");
    modal.addEventListener("click", (e) => {
        if (e.target.id === "bidModal") {
            modal.style.display = "none";
        }
    });
    modal.innerHTML = "";
    modal.addEventListener("click", (e) => {
        if (e.target.id === "bidModal") {
            modal.style.display = "none";
        }
    });

    const xOut = document.createElement("p");
    xOut.classList.add("x-out");
    xOut.innerText = "Close";
    modal.appendChild(xOut);
    xOut.addEventListener("click", () => {
        modal.style.display = "none";
    });

    const modalContent = document.createElement("div");
    modalContent.classList.add("fullscreenModalContent");
    modalContent.id = selectedListing.id;
    modal.appendChild(modalContent);

    const fullscreenForm = document.createElement("form");
    fullscreenForm.classList.add("fullscreenForm", "bidForm");
    fullscreenForm.id = "bidForm";
    modalContent.appendChild(fullscreenForm);

    const itemTitle = document.createElement("h1");
    itemTitle.innerHTML = selectedListing.title + "<br>";
    itemTitle.id = "itemTitle";
    fullscreenForm.appendChild(itemTitle);

    const itemId = document.createElement("p");
    itemId.innerHTML = "Item ID: " + selectedListing.id ;
    itemId.id = "itemId";
    itemId.classList.add("text-id");
    itemTitle.appendChild(itemId);

    const itemImg = document.createElement("div");
    itemImg.classList.add("itemImg");
    itemImg.style.backgroundImage = `url(${selectedListing.media})`;
    fullscreenForm.appendChild(itemImg);

    const itemPrice = document.createElement("p");
    itemPrice.innerHTML = "Current price: " + "<br>";
    itemPrice.id = "itemPrice";
    fullscreenForm.appendChild(itemPrice);

    const itemCurrentPrice = document.createElement("span");
    itemCurrentPrice.innerHTML = highestBid + " credits";
    itemCurrentPrice.id = "itemCurrentPrice";
    itemPrice.appendChild(itemCurrentPrice);

    const itemBidContainer = document.createElement("div");
    itemBidContainer.classList.add("itemBidContainer");
    fullscreenForm.appendChild(itemBidContainer);

    const itemBidHead = document.createElement("p");
    itemBidHead.innerHTML = "Place your bid";
    itemBidContainer.appendChild(itemBidHead);

    const itemBidInput = document.createElement("input");
    itemBidInput.type = "number";
    itemBidInput.id = "itemBidInput";
    itemBidInput.placeholder = "Place your bid";
    itemBidContainer.appendChild(itemBidInput);



    const itemBtnContainer = document.createElement("div");
    itemBtnContainer.classList.add("itemBtnContainer");
    fullscreenForm.appendChild(itemBtnContainer);

    const itemBtn = document.createElement("button");
    itemBtn.innerHTML = "Place bid!";
    itemBtn.id = "bidBtn";
    itemBtn.type = "button";
    itemBtn.classList.add("mainBtn", "btn");
    itemBtn.addEventListener("click", () => {
        if (itemBidInput.value < highestBid) {
            itemBidHead.classList.add("text-danger");
            itemBidHead.innerHTML = "Bid must be higher than current price";
            modalContent.style.border = "2px solid red";
        } else {
            e.preventDefault();
            const bidAmount = itemBidInput.value;
            placeBid(selectedListing.id, bidAmount);
            setInterval(() => {
                itemBtn.innerHTML = "Bid placed!";
                itemBtn.style.backgroundColor = "green";
                modalContent.style.border = "2px solid green";
            }, 1000);
            setInterval(() => {
                window.location.reload();
            }, 2000);
        }

    });

    itemBtnContainer.appendChild(itemBtn);
    }
  });


export function bidModal() {
    

}