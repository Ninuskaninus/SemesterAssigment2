import { changeAvatar } from "../API/PUT/changeAvatar.js";

export function avatarModal(){
    const avatarModal = document.getElementById("avatarModal");
    avatarModal.style.display = "flex";

    avatarModal.addEventListener("click", (e) => {
        if (e.target.id === "avatarModal") {
            avatarModal.style.display = "none";
        }
    }
    );

    const closeBtn = document.getElementById("cancelBtn");
    closeBtn.addEventListener("click", function(){
        avatarModal.style.display = "none";
    });

    const submitBtn = document.getElementById("submitBtn");

    submitBtn.addEventListener("click", function(){
        changeAvatar();
    });
}