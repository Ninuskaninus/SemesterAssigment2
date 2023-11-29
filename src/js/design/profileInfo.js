import {myProfile} from "../API/GET/getMyPofile.js";
import { createProfileCards } from "./createProfileCards.js";
import {avatarModal} from "../modals/changeAvatar.js";
const myProfileData = await myProfile();


export function myProfileInfo(){
    const profileCredit = document.getElementById("userCredit");
    profileCredit.innerHTML = myProfileData.credits;

    const profileUsername = document.getElementById("userName");
    profileUsername.innerHTML = myProfileData.username;

    const userAvatar = document.getElementById("userAvatar");
    userAvatar.style.backgroundImage = "url(" + myProfileData.avatar+")";

    const avatarBtn = document.getElementById("avatarBtn");
    avatarBtn.addEventListener("click", (e) => {
        e.preventDefault();
        avatarModal();
    });
    
    createProfileCards();

}