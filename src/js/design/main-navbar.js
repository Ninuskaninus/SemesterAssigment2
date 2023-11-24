import { triggerHamburger } from "../modals/hamburger.js";
import { errorLogin } from "../modals/errorLogin.js";
import { createUser } from "../modals/createUser.js";
import { sellModalTrigger } from "../modals/sellModalTrigger.js";

export function mainNavbar() {
  const mainNav = document.getElementById("mainNav");
  const accessToken = localStorage.getItem("token");

  const navLeft = document.createElement("div");
  navLeft.classList.add("nav-container-left", "row-md");
  mainNav.appendChild(navLeft);

  const brandLogo = document.createElement("a");
  brandLogo.href = "/index.html";
  navLeft.appendChild(brandLogo);

  const brandLogoImg = document.createElement("img");
  brandLogoImg.classList.add("headLogo");
  brandLogoImg.src = "/src/assets/navLogo.png";
  brandLogoImg.alt = "Logo";
  brandLogo.appendChild(brandLogoImg);

  const sellNowBtn = document.createElement("button");
  sellNowBtn.classList.add("mainBtn", "ml-2");
  sellNowBtn.textContent = "Sell something!";
  sellNowBtn.addEventListener("click", () => {
    sellModalTrigger();
  });
  navLeft.appendChild(sellNowBtn);

  const navRight = document.createElement("div");
  navRight.classList.add("nav-container-right", "row-md");
  mainNav.appendChild(navRight);

  const loginBtn = document.createElement("button");
  loginBtn.classList.add("mainBtnWhite");
  if (!accessToken) {
    loginBtn.textContent = "Login";
    loginBtn.id = "loginBtn";
    loginBtn.addEventListener("click", () => {
      errorLogin();
    });
  } else {
    loginBtn.textContent = "Logout";
    loginBtn.id = "logoutBtn";
    loginBtn.addEventListener("click", () => {
      localStorage.clear();
      window.location.reload();
    });
  }

  navRight.appendChild(loginBtn);

  const registerBtn = document.createElement("button");
  registerBtn.classList.add("mainBtn");
  const registerBtnIcon = document.createElement("img");
  registerBtnIcon.src = "/src/assets/profile_22x22.png";
  registerBtnIcon.alt = "Profile";
  const registerBtnText = document.createElement("span");
  if (!accessToken) {
    registerBtnText.textContent = "Register";
    registerBtn.addEventListener("click", () => {
      createUser();
    });
  } else {
    registerBtnText.textContent = "Profile";
    registerBtn.addEventListener("click", () => {
      window.location.href = "/profile/index.html";
    });
  }
  registerBtn.appendChild(registerBtnIcon);
  registerBtn.appendChild(registerBtnText);
  navRight.appendChild(registerBtn);

  const hamburgerBtb = document.createElement("div");
  hamburgerBtb.classList.add("nav-container-hamburger");
  hamburgerBtb.id = "hamburgerTrigger";
  mainNav.appendChild(hamburgerBtb);

  const hamburgerSpan1 = document.createElement("span");
  const hamburgerSpan2 = document.createElement("span");
  const hamburgerSpan3 = document.createElement("span");
  hamburgerBtb.appendChild(hamburgerSpan1);
  hamburgerBtb.appendChild(hamburgerSpan2);
  hamburgerBtb.appendChild(hamburgerSpan3);

  hamburgerBtb.addEventListener("click", () => {
    triggerHamburger(mainNav);
  });

  const hamburgerContent = document.getElementById("hamburgerContent");
  const hamburgerUl = document.createElement("ul");
  hamburgerContent.appendChild(hamburgerUl);

  const hamburgerLi1 = document.createElement("li");
  hamburgerLi1.textContent = "Home";
  const hamburgerLi2 = document.createElement("li");
  hamburgerLi2.textContent = "Sell something!";
  hamburgerLi2.addEventListener("click", () => {
    sellModalTrigger();
  });
  const hamburgerLi3 = document.createElement("li");
  if (!accessToken) {
    hamburgerLi3.textContent = "Login";
  } else {
    hamburgerLi3.textContent = "Logout";
    hamburgerLi3.addEventListener("click", () => {
      localStorage.clear();
      window.location.reload();
    });
  }
  hamburgerLi3.textContent = "Login";
  hamburgerLi3.addEventListener("click", () => {
    errorLogin();
  });
  const hamburgerLi4 = document.createElement("li");
  if (!accessToken) {
    hamburgerLi4.textContent = "Register";
  } else {
    hamburgerLi4.textContent = "Profile";
  }
  hamburgerLi4.textContent = "Register";
  hamburgerLi4.addEventListener("click", () => {
    if (!accessToken) {
      createUser();
    } else {
      window.location.href = "/profile/index.html";
    }
  });


  hamburgerUl.appendChild(hamburgerLi1);
  hamburgerUl.appendChild(hamburgerLi2);
  hamburgerUl.appendChild(hamburgerLi3);
  hamburgerUl.appendChild(hamburgerLi4);
}
