const accessToken = localStorage.getItem("token");
const username = localStorage.getItem("username");
const base_url = "https://api.noroff.dev/api/v1/auction/profiles/";
const url = base_url + username;

export function myProfile() {
  return fetch(url, {
    headers: {
      authorization: `Bearer ${accessToken}`,
      method: "GET",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const myProfileData = {
        avatar: data.avatar,
        email: data.email,
        username: data.name,
        credits: data.credits,
        listings: data._count,
        wins: data.wins,
      };
      return myProfileData;
    })
    .catch((error) => {
      console.error("Error fetching profile:", error);
      throw error;
    });
}
