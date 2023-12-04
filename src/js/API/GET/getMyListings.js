const base_url = "https://api.noroff.dev/api/v1/auction/profiles/";
const username = localStorage.getItem("username");
const listing_url = "/listings?_active=true&_seller=true&_bids=true";
const url = base_url + username + listing_url;
const accessToken = localStorage.getItem("token");

export async function getMyListings() {
    try {
      const response = await fetch(url, {
        headers: {
          authorization: `Bearer ${accessToken}`,
          method: "GET",
        },
      });
  
      const data = await response.json();
      if (Array.isArray(data)) {
        const myListings = data.map(listing => ({
          bids: listing.bids,
          created: listing.created,
          description: listing.description,
          endsAt: listing.endsAt,
          id: listing.id,
          media: listing.media,
          seller: listing.seller,
          tags: listing.tags,
          title: listing.title,
          bidsCount: listing._count,
        }));
  
        console.log(myListings);
        return myListings;
      } else {
        console.error("API response is not an array:", data);
        return [];
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      throw error;
    }
  }
  