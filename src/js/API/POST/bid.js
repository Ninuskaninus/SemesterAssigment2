const base_url = "https://api.noroff.dev/api/v1/auction/";
const accessToken = localStorage.getItem("token");


export function placeBid(itemId, bidAmount) {
    const bidForm = document.getElementById("bidForm");
    const bidUrl = "listings/" + itemId + "/bids";
    const url = base_url + bidUrl;

    const bid = {
        amount: parseFloat(bidAmount)
    }

    console.log(bid)

    try {
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(bid),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          bidForm.reset();
        })
        .catch((error) => {
          console.error("Error:", error);
          throw error;
        });
    } catch (error) {
      console.error("Unexpected error:", error);
    
    }
  }