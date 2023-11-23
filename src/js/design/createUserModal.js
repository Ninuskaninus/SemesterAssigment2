import { register } from "../API/POST/register.js";

export function createUserModal() {
const mainContainer = document.getElementById("registerModal");


const fullScreenModal = document.createElement("div");
fullScreenModal.classList.add("fullscreenModal");
fullScreenModal.id = "fullscreenModalRegister";
fullScreenModal.style.top = "85px";
mainContainer.appendChild(fullScreenModal);

const xout = document.createElement("p");
xout.classList.add("x-out");
xout.innerText = "Close";
mainContainer.appendChild(xout);
xout.addEventListener("click", () => {
  mainContainer.remove();
});

const modal = document.createElement("div");
modal.classList.add("fullscreenModalContent");
mainContainer.appendChild(modal);

const fullscreenForm = document.createElement("form");
fullscreenForm.classList.add("fullscreenForm");
fullscreenForm.id = "registerForm";
modal.appendChild(fullscreenForm);

const logo = document.createElement("img");
logo.src = "/src/assets/heroLogo.png";
fullscreenForm.appendChild(logo);

const errorText = document.createElement("h2");
errorText.id = "registerErrorText";
errorText.innerText = "Register";
fullscreenForm.appendChild(errorText);

const inputContainer = document.createElement("div");
inputContainer.classList.add("fullscreenInputContainer");
fullscreenForm.appendChild(inputContainer);

const formFloat1 = document.createElement("div");
formFloat1.classList.add("form-floating");
inputContainer.appendChild(formFloat1);

const username = document.createElement("input");
username.type = "text";
username.id = "registerUsername";
username.placeholder = "Username";
username.classList.add("form-control");
formFloat1.appendChild(username);

const usernameLabel = document.createElement("label");
usernameLabel.htmlFor = "registerUsername";
usernameLabel.innerText = "Username";
formFloat1.appendChild(usernameLabel);

const formFloat2 = document.createElement("div");
formFloat2.classList.add("form-floating");
inputContainer.appendChild(formFloat2);

const email = document.createElement("input");
email.type = "text";
email.id = "registerEmail";
email.placeholder = "Email";
email.classList.add("form-control");
formFloat2.appendChild(email);

const emailLabel = document.createElement("label");
emailLabel.htmlFor = "registerEmail";
emailLabel.innerText = "Email";
formFloat2.appendChild(emailLabel);

const formFloat3 = document.createElement("div");
formFloat3.classList.add("form-floating");
inputContainer.appendChild(formFloat3);

const password = document.createElement("input");
password.type = "password";
password.id = "registerPassword";
password.placeholder = "Password";
password.classList.add("form-control");
formFloat3.appendChild(password);

const passwordLabel = document.createElement("label");
passwordLabel.htmlFor = "registerPassword";
passwordLabel.innerText = "Password";
formFloat3.appendChild(passwordLabel);

const formFloat4 = document.createElement("div");
formFloat4.classList.add("form-floating");
inputContainer.appendChild(formFloat4);

const avatar = document.createElement("input");
avatar.type = "text";
avatar.id = "registerAvatar";
avatar.placeholder = "Avatar";
avatar.classList.add("form-control");
formFloat4.appendChild(avatar);

const avatarLabel = document.createElement("label");
avatarLabel.htmlFor = "registerAvatar";
avatarLabel.innerText = "Avatar url";
formFloat4.appendChild(avatarLabel);

const registerBtnContainer = document.createElement("div");
registerBtnContainer.classList.add("fullScreenModalBtn");
fullscreenForm.appendChild(registerBtnContainer);

const registerBtn = document.createElement("button");
registerBtn.type = "submit";
registerBtn.innerText = "Register";
registerBtn.classList.add("btn", "mainBtn");
registerBtnContainer.addEventListener("click", (e) => {
  e.preventDefault();
  register();
  setTimeout(() => {
    window.location.reload();
  }, 1000);
});
registerBtnContainer.appendChild(registerBtn);

const dividerBtn = document.createElement("p");
dividerBtn.innerText = "or";
registerBtnContainer.appendChild(dividerBtn);

const backBtn = document.createElement("button");
backBtn.type = "button";
backBtn.innerText = "Close";
backBtn.classList.add("btn", "mainBtnWhite");
backBtn.addEventListener("click", () => {
  mainContainer.remove();

});
registerBtnContainer.appendChild(backBtn);

}
