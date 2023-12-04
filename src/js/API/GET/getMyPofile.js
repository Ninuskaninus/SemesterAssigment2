const accessToken = localStorage.getItem("token");
const username = localStorage.getItem("username");
const base_url = "https://api.noroff.dev/api/v1/auction/profiles/";
const url = base_url + username + "?_bids=true&_listings=true";


export async function myProfile() {
  try {
    const response = await fetch(url, {
      headers: {
        authorization: `Bearer ${accessToken}`,
        method: "GET",
      },
    });
    const data = await response.json();
    const myProfileData = {
      avatar: data.avatar,
      email: data.email,
      username: data.name,
      credits: data.credits,
      listings: data._count,
      wins: data.wins,
      allListings: data.listings,
      credits: data.credits,
    };



    return myProfileData;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
}


