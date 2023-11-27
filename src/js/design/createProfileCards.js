import {myProfile} from "../API/GET/getMyPofile.js";
import {getMyBids} from "../information/getMyBids.js";

const myProfileData = await myProfile();
const myListings = myProfileData.allListings;
const myBids = getMyBids();
const allBids = myBids.flatMap(listing => listing.bids);
const username = localStorage.getItem("username");

export function createProfileCards(){
    const cardsContainer = document.getElementById("cardsContainer");

    myListings.forEach(listing => {
        const card = document.createElement("div");
        card.classList.add("mysales-card");
        card.id = listing.id;
        cardsContainer.appendChild(card);

        const cardImage = document.createElement("div");
        cardImage.classList.add("mysales-img");
        cardImage.style.backgroundImage = "url(" + listing.media[0] + ")";
        card.appendChild(cardImage);

        const cardContentContainer = document.createElement("div");
        cardContentContainer.classList.add("mysale-info-container");
        card.appendChild(cardContentContainer);

        const cardContent = document.createElement("div");
        cardContent.classList.add("mysale-info");
        cardContentContainer.appendChild(cardContent);

        const cardTitle = document.createElement("h4");
        cardTitle.innerHTML = listing.title;
        cardContent.appendChild(cardTitle);

        const timeLeft = document.createElement("p");
        timeLeft.innerHTML = "Time left: " + listing.endsAt;
        cardContent.appendChild(timeLeft);

        const seeMoreBtn = document.createElement("button");
        seeMoreBtn.classList.add("secondaryBtn", "btnBlue");
        seeMoreBtn.innerHTML = "See more";
        seeMoreBtn.addEventListener("click", function () {
            window.location.href = "/preview/index.html?id=" + listing.id;
        });
        cardContent.appendChild(seeMoreBtn);
    });

        const bidsContainer = document.getElementById("bidsContainer");
        
        myBids.forEach(bid => {
            const bidCard = document.createElement("a");
            bidCard.classList.add("bidContainer");
            bidCard.href = "/preview/index.html?id=" + bid.id;
            bidsContainer.appendChild(bidCard);

            const bidTitle = document.createElement("div");
            bidTitle.classList.add("bidTitle");
            bidCard.appendChild(bidTitle);
            const bidTitleText = document.createElement("p");
            bidTitleText.innerHTML = bid.title;
            bidTitle.appendChild(bidTitleText);

            const latestBid = document.createElement("div");
            latestBid.classList.add("latestBid");
            bidCard.appendChild(latestBid);

            const latestBidText = document.createElement("p");
            latestBidText.innerHTML = bid.bids[0].bidderName + ": ";
            const latestBidPrice = document.createElement("span");
            latestBidPrice.innerHTML = bid.bids[0].amount + " credits";
            latestBidText.appendChild(latestBidPrice);
            if(bid.bids[0].bidderName === username){
                latestBidText.classList.add("myBid");
            } else {
                latestBidText.classList.add("otherBid");
            }
            latestBid.appendChild(latestBidText);

            const timeLeft = document.createElement("p");
            timeLeft.innerHTML = "Ends at: " + bid.endsAt;
            if(bid.endsAt === "Ended"){
                timeLeft.style.color = "red";
                timeLeft.innerHTML = "Ended";
            }
            bidCard.appendChild(timeLeft);

            
        });



    }   