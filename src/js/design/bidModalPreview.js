
import {placeBid} from "../API/POST/bid.js";


export function bidModalPreview(thisListing){
    const bidModal = document.getElementById("bidModal");
    bidModal.innerHTML = "";
    bidModal.addEventListener("click", (e) => {
        if (e.target.id === "bidModal") {
            bidModal.style.display = "none";
        }
    });

    const listing = thisListing;
    console.log(listing);


    const xOut = document.createElement("p");
    xOut.classList.add("x-out");
    xOut.innerText = "Close";
    xOut.addEventListener("click", () => {
        bidModal.style.display = "none";
    });
    bidModal.appendChild(xOut);

    const modalContent = document.createElement("div");
    modalContent.classList.add("fullscreenModalContent");
    modalContent.id = listing.id;
    bidModal.appendChild(modalContent);

    const fullscreenForm = document.createElement("form");
    fullscreenForm.classList.add("fullscreenForm", "bidForm");
    fullscreenForm.id = "bidForm";
    modalContent.appendChild(fullscreenForm);

    const itemTitle = document.createElement("h1");
    itemTitle.innerHTML = listing.title + "<br>";
    itemTitle.id = "itemTitle";
    fullscreenForm.appendChild(itemTitle);

    const itemId = document.createElement("p");
    itemId.innerHTML = "Item ID: " + listing.id ;
    itemId.id = "itemId";
    itemId.classList.add("text-id");
    itemTitle.appendChild(itemId);

    const itemImg = document.createElement("div");
    itemImg.classList.add("itemImg");
    itemImg.style.backgroundImage = `url(${listing.media})`;
    fullscreenForm.appendChild(itemImg);

    const itemPrice = document.createElement("p");
    itemPrice.innerHTML = "Current price: " + "<br>";
    itemPrice.id = "itemPrice";
    fullscreenForm.appendChild(itemPrice);

    const bidsArray = listing.bids;
    const bidsArraySorted = [...bidsArray].sort((a, b) => (b.amount || 0) - (a.amount || 0));
    const highestBid = bidsArraySorted[0] && bidsArraySorted[0].amount;
    
    const itemCurrentPrice = document.createElement("span");
    if (highestBid === undefined || highestBid === 0) {
        itemCurrentPrice.innerHTML = "No bids yet";
    } else {
        itemCurrentPrice.innerHTML = highestBid + " credits";
    }
    

    itemCurrentPrice.id = "itemCurrentPrice";
    itemPrice.appendChild(itemCurrentPrice);

    const itemBidContainer = document.createElement("div");
    itemBidContainer.classList.add("itemBidContainer");
    fullscreenForm.appendChild(itemBidContainer);

    const itemBidHeader = document.createElement("p");
    itemBidHeader.innerHTML = "Place your bid:";
    itemBidHeader.id = "itemBidHeader";
    itemBidContainer.appendChild(itemBidHeader);

    const bidInput = document.createElement("input");
    bidInput.type = "number";
    bidInput.placeholder = "Enter your bid";
    bidInput.id = "bidInput";
    bidInput.required = true;
    itemBidContainer.appendChild(bidInput);

    const itemBtnContainer = document.createElement("div");
    itemBtnContainer.classList.add("itemBtnContainer");
    fullscreenForm.appendChild(itemBtnContainer);

    const itemBtn = document.createElement("button");
    itemBtn.innerHTML = "Place bid!";
    itemBtn.id = "itemBtn";
    itemBtn.type = "button";
    itemBtn.classList.add("mainBtn", "btn");
    itemBtnContainer.appendChild(itemBtn);

    itemBtn.addEventListener("click", (e) => {
        const bidAmount = bidInput.value;
        const itemId = listing.id;

        if (bidAmount < highestBid) {
            itemBidHeader.innerHTML = "Bid must be higher than current price";
            itemBidHeader.classList.add("text-danger");
        } else {
            e.preventDefault();
            placeBid(itemId, bidAmount);
            setTimeout(() => {
                itemBtn.innerHTML = "Bid placed!";
                itemBtn.style.backgroundColor = "green";
                modalContent.style.border = "2px solid green";

            }, 1000);
            setInterval(() => {
                window.location.reload();
            }, 2000);
        }
    });











}