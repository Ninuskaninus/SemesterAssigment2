import { changeAvatar } from "../API/PUT/changeAvatar.js";

/**
 * Opens the avatar modal and handles its functionality.
 */
export function avatarModal(){
    const avatarModal = document.getElementById("avatarModal");
    avatarModal.style.display = "flex";

    const closeBtn = document.getElementById("cancelBtn");
    closeBtn.addEventListener("click", function(){
        avatarModal.style.display = "none";
    });

    const submitBtn = document.getElementById("submitBtn");

    submitBtn.addEventListener("click", function(){
        changeAvatar();
    });
}