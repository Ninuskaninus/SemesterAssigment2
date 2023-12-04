import { deleteListing } from "../API/DELETE/deleteListing.js"

export function deletePostModal(listingId){
    const card = document.getElementById(listingId);

    if (card) {
      const deleteModal = document.createElement("div");
      deleteModal.classList.add("deleteModal");
      card.appendChild(deleteModal);
        
        const deleteModalContent = document.createElement("div");
        deleteModalContent.classList.add("deleteModalContent");
        deleteModal.appendChild(deleteModalContent);

        const deleteModalHeader = document.createElement("h6");
        deleteModalHeader.classList.add("deleteModalHeader");
        deleteModalHeader.innerHTML = "Are you sure you want to delete this listing?";
        deleteModalContent.appendChild(deleteModalHeader);

        const deleteModalBtnContainer = document.createElement("div");
        deleteModalBtnContainer.classList.add("deleteModalBtnContainer");
        deleteModalContent.appendChild(deleteModalBtnContainer);

        const confirmBtn = document.createElement("button");
        confirmBtn.classList.add("confirmBtn");
        confirmBtn.innerHTML = "Delete";
        confirmBtn.addEventListener("click", () => {
            deleteListing(listingId);
            deleteModal.style.display = "none";
            card.remove(); 
        });
        deleteModalBtnContainer.appendChild(confirmBtn);

        const cancelBtn = document.createElement("button");
        cancelBtn.classList.add("cancelBtn");
        cancelBtn.innerHTML = "Cancel";
        cancelBtn.addEventListener("click", () => {
            deleteModal.style.display = "none";
        });

        deleteModalBtnContainer.appendChild(cancelBtn);
    }
}