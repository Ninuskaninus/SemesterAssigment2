import { login } from "../API/POST/login.js";
import { secondaryNavbar } from "./secondary-navbar.js";
import { createUser } from "../modals/createUser.js";

const accessToken = localStorage.getItem("token");

export function errorLoginModal() {
  const mainContainer = document.getElementById("loginModal");
  mainContainer.addEventListener("click", (e) => {
    if (e.target.id === "loginModal") {
      mainContainer.style.display = "none";
    }
  });

  const fullScreenModal = document.createElement("div");
  fullScreenModal.classList.add("fullscreenModal");
  fullScreenModal.id = "fullscreenModal";


  mainContainer.appendChild(fullScreenModal);

  const xout = document.createElement("p");
  xout.classList.add("x-out");
  xout.innerText = "Close";
  mainContainer.appendChild(xout);
  xout.addEventListener("click", () => {
    mainContainer.style.display = "none";
  });

  const modal = document.createElement("div");
  modal.classList.add("fullscreenModalContent");
  mainContainer.appendChild(modal);

  const fullscreenForm = document.createElement("form");
  fullscreenForm.classList.add("fullscreenForm");
  fullscreenForm.id = "loginForm";
  modal.appendChild(fullscreenForm);

  const logo = document.createElement("img");
  logo.src = "/src/assets/heroLogo.png";
  fullscreenForm.appendChild(logo);

  const errorText = document.createElement("h2");
  errorText.id = "loginErrorText";

  errorText.innerText = "You have to be logged in to make a bid or sell an item!";
  fullscreenForm.appendChild(errorText);

  const inputContainer = document.createElement("div");
  inputContainer.classList.add("fullscreenInputContainer");
  fullscreenForm.appendChild(inputContainer);

  const formFloat1 = document.createElement("div");
  formFloat1.classList.add("form-floating");
  inputContainer.appendChild(formFloat1);

  const email = document.createElement("input");
  email.type = "text";
  email.id = "email";
  email.placeholder = "Email";
  email.classList.add("form-control");
  formFloat1.appendChild(email);

  const usernameLabel = document.createElement("label");
  usernameLabel.htmlFor = "email";
  usernameLabel.innerText = "Email";
  formFloat1.appendChild(usernameLabel);

  const formFloat2 = document.createElement("div");
  formFloat2.classList.add("form-floating");
  inputContainer.appendChild(formFloat2);

  const passwordInput = document.createElement("input");
  passwordInput.type = "password";
  passwordInput.id = "password";
  passwordInput.placeholder = "Password";
  passwordInput.classList.add("form-control");
  formFloat2.appendChild(passwordInput);

  const passwordLabel = document.createElement("label");
  passwordLabel.htmlFor = "password";
  passwordLabel.innerText = "Password";
  formFloat2.appendChild(passwordLabel);

  const loginBtnContainer = document.createElement("div");
  loginBtnContainer.classList.add("fullScreenModalBtn");
  fullscreenForm.appendChild(loginBtnContainer);

  const loginBtn = document.createElement("button");
  loginBtn.type = "submit";
  loginBtn.innerText = "Login";
  loginBtn.classList.add("btn", "mainBtn");
  loginBtnContainer.appendChild(loginBtn);
  loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    login();
    setInterval(() => {
      window.location.reload();
    }, 1000);
  });

  const dividerBtn = document.createElement("p");
  dividerBtn.innerText = "or";
  loginBtnContainer.appendChild(dividerBtn);

  const registerBtn = document.createElement("button");
  registerBtn.type = "button";
  registerBtn.innerText = "Register";
  registerBtn.classList.add("btn", "mainBtnWhite");
  registerBtn.addEventListener("click", () => {
    mainContainer.remove();
    createUser();

  });
  loginBtnContainer.appendChild(registerBtn);
}
