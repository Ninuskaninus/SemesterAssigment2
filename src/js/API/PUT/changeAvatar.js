const base_url = "https://api.noroff.dev/api/v1/auction/profiles/";
const username = localStorage.getItem("username");
const url = base_url + username + "/media";
const avatarInput = document.getElementById("changeAvatar");
const accessToken = localStorage.getItem("token");

const avatarObject = {
    avatar: avatarInput.value,
}

export async function changeAvatar() {
    try {
        const response = await fetch(url, {
        method: "PUT",
        headers: {
            authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(avatarObject),
        });
        const data = await response.json();

        if (response.ok) {
            console.log("Avatar changed");
            console.log(data);
        } else {
            throw new Error(json.error);
        }

        return data;

    
    } catch (error) {
        console.error("Error fetching profile:", error);
        throw error;
    }

}

