import {myProfile} from "../API/GET/getMyPofile.js";
import {getMyBids} from "../information/getMyBids.js";
import { deletePostModal } from "../modals/deletePost.js";
import { getListings } from "../API/GET/getListings.js";
import {getMyListings} from "../API/GET/getMyListings.js";


const myListings = await getMyListings();
const myBids = getMyBids();
const allBids = myBids.flatMap(listing => listing.bids);
const username = localStorage.getItem("username");

console.log(myListings);


export function createProfileCards(){
    const cardsContainer = document.getElementById("cardsContainer");;

    myListings.forEach(listing => {
    const listingID = listing.id;

        const linkContainer = document.createElement("a");
        linkContainer.href = "/preview/index.html?id=" + listingID;
        cardsContainer.appendChild(linkContainer);

        const card = document.createElement("div");
        card.classList.add("mysales-card");
        card.id = listing.id;
        linkContainer.appendChild(card);

        const cardImage = document.createElement("div");
        cardImage.classList.add("mysales-img");
        cardImage.style.backgroundImage = "url(" + listing.media[0] + ")";
        card.appendChild(cardImage);

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("deleteBtn");
        deleteBtn.id = listingID;
        deleteBtn.addEventListener("click", (e) => {
            e.preventDefault();
            deletePostModal(listingID);
        });
        card.appendChild(deleteBtn);

        const deleteBtnIcon = document.createElement("img");
        deleteBtnIcon.src = "/src/assets/delete.png";
        deleteBtn.appendChild(deleteBtnIcon);

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
        timeLeft.classList.add("text-light");
        const deadline = listing.endsAt;
        const deadlineDate = new Date(deadline);
        const deadlineDateFormatted = deadlineDate.toLocaleDateString("no-NO", {
              day: "2-digit",
                month: "2-digit",
                year: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
            });

            const now = new Date();
            if(deadlineDate < now){
                timeLeft.innerHTML = "Ended: " + deadlineDateFormatted;
                timeLeft.classList.add("text-danger");
            } else {
                timeLeft.innerHTML = "Deadline: " + deadlineDateFormatted;
                timeLeft.classList.add("text-success");
            }
            cardContent.appendChild(timeLeft);
    });

        const bidsContainer = document.getElementById("bidsContainer");

        
        myBids.forEach(bid => {
            const sortedBids = bid.bids.sort((a, b) => b.amount - a.amount);
        
            const bidCard = document.createElement("a");
            bidCard.classList.add("bidContainer", "container");
            bidCard.href = "/preview/index.html?id=" + bid.id;
            bidsContainer.appendChild(bidCard);
        
            const bidTitle = document.createElement("div");
            bidTitle.classList.add("bidTitle", "col-sm");
            bidCard.appendChild(bidTitle);
            const bidTitleText = document.createElement("p");
            bidTitleText.innerHTML = bid.title;
            if (bid.title.length > 50) {
                bidTitleText.innerHTML = bid.title.slice(0, 50) + " " + "...";
            }
            bidTitle.appendChild(bidTitleText);
        
            const latestBid = document.createElement("div");
            latestBid.classList.add("latestBid", "col-sm");
            bidCard.appendChild(latestBid);
        
            const latestBidText = document.createElement("p");
            latestBidText.innerHTML = sortedBids[0].bidderName + ": " + "<br>";
            const latestBidPrice = document.createElement("span");
            latestBidPrice.innerHTML = sortedBids[0].amount + " credits";
            latestBidText.appendChild(latestBidPrice);
        
            if (sortedBids[0].bidderName === username) {
                latestBidText.classList.add("text-light");
            } else {
                latestBidText.classList.add("otherBid");
            }
            latestBid.appendChild(latestBidText);
        
            const deadline = bid.endsAt;
            const deadlineDate = new Date(deadline);
            const deadlineDateFormatted = deadlineDate.toLocaleDateString("no-NO", {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
            });
        
            const timeLeft = document.createElement("p");
            timeLeft.innerHTML = deadlineDateFormatted;
            timeLeft.classList.add("col-sm");
            if (bid.endsAt === "Ended") {
                timeLeft.style.color = "red";
                timeLeft.innerHTML = "Ended";
            }
            bidCard.appendChild(timeLeft);
        }); 
         



    }   