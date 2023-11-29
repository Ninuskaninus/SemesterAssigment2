import { getListings } from "../API/GET/getListings.js";
import { errorLogin } from "../modals/errorLogin.js";

const accessToken = localStorage.getItem("token");


export async function createCards(recentUploadsCard) {
  const listings = await getListings();
  listings.sort((a, b) => new Date(b.updated) - new Date(a.updated));
  const filteredListings = listings.filter((listing) => listing.title !== "tester");

  filteredListings.forEach((listing) => {
    const deadline = new Date(listing.endsAt) ;
    const deadlineFormatted = deadline.toLocaleDateString("no-NO", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
    const now = new Date();
    const nowFormatted = now.toLocaleDateString("no-NO", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

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
      cardDeadline.innerHTML = "Deadline: " + listingDeadlineFormatted;
      if (listingDeadline < now) {
        cardDeadline.innerHTML = "Ended: " + listingDeadlineFormatted;
        cardDeadline.classList.add("text-danger");
      } else {
        cardDeadline.innerHTML = "Deadline: " + listingDeadlineFormatted;
        cardDeadline.classList.add("text-success");
      }

     
      cardContent.appendChild(cardDeadline);

      const cardTitle = document.createElement("h3");
      cardTitle.innerHTML = listing.title;
      if (listing.title.length > 25) {
        cardTitle.innerHTML = listing.title.slice(0, 25) + " " + "...";
      }
      cardContent.appendChild(cardTitle);

      const cardPrice = document.createElement("h3");
      cardPrice.classList.add("text-light");
      cardPrice.innerHTML = listing._count.bids + " bids";
      cardContent.appendChild(cardPrice);

      const cardButtons = document.createElement("div");
      cardButtons.classList.add("item-btn");
      cardContentContainer.appendChild(cardButtons);

      const cardInfoLink = document.createElement("a");
      cardInfoLink.innerHTML = "Read more";
      cardInfoLink.classList.add("bidLink");
      cardInfoLink.href = "preview/index.html?id=" + listing.id;
      cardButtons.appendChild(cardInfoLink);

      const cardBidLink = document.createElement("a");
      cardBidLink.innerHTML = "Bid on this";
      cardBidLink.href = "#";
      cardBidLink.classList.add("secondaryBtn");
      cardBidLink.addEventListener("click", () => {
        if (accessToken) {
          console.log("Bid on this");
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
    }
  );
}


