import { changeAvatar } from "../API/PUT/changeAvatar.js";

export function avatarModal(){
    const avatarModal = document.getElementById("avatarModal");
    const avatarBtn = document.getElementById("avatarBtn");
    avatarBtn.addEventListener("click", function(){
        avatarModal.style.display = "flex";
    });

    const closeBtn = document.getElementById("cancelBtn");
    closeBtn.addEventListener("click", function(){
        avatarModal.style.display = "none";
    });

    const submitBtn = document.getElementById("submitBtn");

    submitBtn.addEventListener("click", function(){
        changeAvatar();
    });
}