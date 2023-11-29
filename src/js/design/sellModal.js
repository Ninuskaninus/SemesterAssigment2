import { addListing } from "../API/POST/addListing.js";


export function sellModal(){
    const maincontainer = document.getElementById("sellModal");
    maincontainer.addEventListener("click", (e) => {
        if (e.target.id === "sellModal") {
            maincontainer.style.display = "none";
        }
    }
    );
    
    const fullScreenModal = document.createElement("div");
    fullScreenModal.classList.add("fullscreenModal");
    fullScreenModal.id = "fullscreenModal";


    maincontainer.appendChild(fullScreenModal);

    const xout = document.createElement("p");
    xout.classList.add("x-out");
    xout.innerText = "Close";
    xout.addEventListener("click", () => {
        maincontainer.style.display = "none";
    });
    maincontainer.appendChild(xout);

    const modal = document.createElement("div");
    modal.classList.add("fullscreenModalContent");
    maincontainer.appendChild(modal);

    const fullscreenForm = document.createElement("form");
    fullscreenForm.classList.add("fullscreenForm");
    fullscreenForm.id = "sellForm";
    modal.appendChild(fullscreenForm);

    const logo = document.createElement("img");
    logo.src = "/src/assets/heroLogo.png";
    fullscreenForm.appendChild(logo);

    const errorText = document.createElement("h2");
    errorText.id = "sellErrorText";
    errorText.innerText = "Sell an item";
    fullscreenForm.appendChild(errorText);

    const inputContainer = document.createElement("div");
    inputContainer.classList.add("fullscreenInputContainer");
    fullscreenForm.appendChild(inputContainer);

    const formFloat1 = document.createElement("div");
    formFloat1.classList.add("form-floating");
    inputContainer.appendChild(formFloat1);

    const title = document.createElement("input");
    title.type = "text";
    title.id = "sellTitle";
    title.placeholder = "Title";
    title.classList.add("form-control");
    formFloat1.appendChild(title);

    const titleLabel = document.createElement("label");
    titleLabel.htmlFor = "sellTitle";
    titleLabel.innerText = "Title";
    formFloat1.appendChild(titleLabel);

    const formFloat2 = document.createElement("div");
    formFloat2.classList.add("form-floating");
    inputContainer.appendChild(formFloat2);

    const description = document.createElement("textarea");
    description.id = "sellDescription";
    description.placeholder = "Description";
    description.classList.add("form-control");
    formFloat2.appendChild(description);

    const descriptionLabel = document.createElement("label");
    descriptionLabel.htmlFor = "sellDescription";
    descriptionLabel.innerText = "Description";
    formFloat2.appendChild(descriptionLabel);

    const formFloat3 = document.createElement("div");
    formFloat3.classList.add("form-floating", "tags");
    inputContainer.appendChild(formFloat3);

    const tags = document.createElement("input");
tags.type = "text";
tags.id = "sellTags";
tags.placeholder = "Tags";
tags.classList.add("form-control");
formFloat3.appendChild(tags);

const tagsLabel = document.createElement("label");
tagsLabel.htmlFor = "sellTags";
tagsLabel.innerText = "Tags";
formFloat3.appendChild(tagsLabel);

const addTagBtn = document.createElement("button");
addTagBtn.classList.add("tagBtn");
addTagBtn.innerText = "+";
addTagBtn.type = "button";
formFloat3.appendChild(addTagBtn);

const tagsInput = [];

addTagBtn.addEventListener("click", () => {
  const tagValue = tags.value.trim();
  if (tagValue !== "") {
    tagsInput.push(tagValue);
    tags.value = "";
    updateTagContainer();
  }
});

const tagContainer = document.createElement("div");
tagContainer.classList.add("tagContainer");
tagContainer.id = "tagContainer";

inputContainer.appendChild(tagContainer);

function updateTagContainer() {
  tagContainer.innerHTML = "";
    tagContainer.style.display = "flex";

  tagsInput.forEach((tag, index) => {
    const tagElement = document.createElement("p");
    tagElement.classList.add("tagElement");
    tagElement.innerText = tag;
    tagContainer.appendChild(tagElement);

    const deleteTag = document.createElement("button");
    deleteTag.classList.add("removeTag");
    deleteTag.innerText = "x";
    deleteTag.type = "button";
    tagElement.appendChild(deleteTag);

    deleteTag.addEventListener("click", () => {
      tagsInput.splice(index, 1);
      updateTagContainer();
    });
  });
}

const formFloat4 = document.createElement("div");
formFloat4.classList.add("form-floating");
inputContainer.appendChild(formFloat4);

const deadline = document.createElement("input");
deadline.type = "datetime-local";
deadline.id = "sellDeadline";
deadline.placeholder = "Deadline";
deadline.classList.add("form-control");

formFloat4.appendChild(deadline);

const deadlineLabel = document.createElement("label");
deadlineLabel.htmlFor = "sellDeadline";
deadlineLabel.innerText = "Deadline";
formFloat4.appendChild(deadlineLabel);

const formFloat5 = document.createElement("div");
formFloat5.classList.add("form-floating", "tags");
inputContainer.appendChild(formFloat5);

const imageUrl = document.createElement("input");
imageUrl.type = "text";
imageUrl.id = "sellImageUrl";
imageUrl.placeholder = "Image URL";
imageUrl.classList.add("form-control");
formFloat5.appendChild(imageUrl);

const imageUrlLabel = document.createElement("label");
imageUrlLabel.htmlFor = "sellImageUrl";
imageUrlLabel.innerText = "Image URL";
formFloat5.appendChild(imageUrlLabel);

const addImageBtn = document.createElement("button");
addImageBtn.classList.add("tagBtn");
addImageBtn.innerText = "+";
addImageBtn.type = "button";
formFloat5.appendChild(addImageBtn);

const imageUrlsInput = [];

addImageBtn.addEventListener("click", () => {
  const imageUrlValue = imageUrl.value.trim();
  if (imageUrlValue !== "") {
    imageUrlsInput.push(imageUrlValue);
    imageUrl.value = "";
    updateImageUrlsContainer();
  }
});

const imageUrlsContainer = document.createElement("div");
imageUrlsContainer.classList.add("imageUrlsContainer");
imageUrlsContainer.id = "imageUrlsContainer";



inputContainer.appendChild(imageUrlsContainer);

function updateImageUrlsContainer() {
  imageUrlsContainer.style.display = "flex";
    imageUrlsContainer.innerHTML = "";

  imageUrlsInput.forEach((imageUrl, index)=>{
    const imagePreview = document.createElement("div");
    imagePreview.classList.add("imagePreview");
    imagePreview.style.backgroundImage = `url(${imageUrl})`;
    imageUrlsContainer.appendChild(imagePreview);

    const deleteImage = document.createElement("button");
    deleteImage.classList.add("removeImage");
    deleteImage.innerText = "x";
    deleteImage.type = "button";

    deleteImage.addEventListener("click", () => {
        imageUrlsInput.splice(index, 1);
        updateImageUrlsContainer();
        });

    imagePreview.appendChild(deleteImage);
  })

}

const buttonContainer = document.createElement("div");
buttonContainer.classList.add("fullScreenModalBtn");
fullscreenForm.appendChild(buttonContainer);

const sellBtn = document.createElement("button");
sellBtn.type = "button";
sellBtn.innerText = "Publish listing";
sellBtn.classList.add("btn", "mainBtn");
buttonContainer.appendChild(sellBtn);

sellBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addListing();
    setInterval(() => {
        sellBtn.style.backgroundColor = "green";
        sellBtn.innerText = "Listing added!";
        setTimeout(() => {
            maincontainer.style.display = "none";
        }, 1000);

    }, 1000);
});   

}







