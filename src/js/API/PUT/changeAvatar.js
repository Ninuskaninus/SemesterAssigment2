const base_url = "https://api.noroff.dev/api/v1/auction/profiles/";
const username = localStorage.getItem("username");
const url = base_url + username + "/media";
const accessToken = localStorage.getItem("token");






export async function changeAvatar() {
    const avatarInput = document.getElementById("changeAvatar");
    const inputValue = avatarInput.value;
    const avatarObject = {
    avatar: inputValue,
}

try {
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(avatarObject),
    });
    const data = await response.json();
    console.log(data);
    location.reload();

}
 catch (error) {
    console.error("Error", error);
    throw error;
}
}
