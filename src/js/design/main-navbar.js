import {triggerHamburger} from '../modals/hamburger.js';

export function mainNavbar(){
    const mainNav = document.getElementById('mainNav');

    const navLeft = document.createElement('div');
    navLeft.classList.add('nav-container-left', "row-md");
    mainNav.appendChild(navLeft);

    const brandLogo = document.createElement('a');
    brandLogo.href = "/index.html";
    navLeft.appendChild(brandLogo);

    const brandLogoImg = document.createElement('img');
    brandLogoImg.classList.add('headLogo');
    brandLogoImg.src = "/src/assets/navLogo.png";
    brandLogoImg.alt = "Logo";
    brandLogo.appendChild(brandLogoImg);

    const sellNowBtn = document.createElement('button');
    sellNowBtn.classList.add('mainBtn', "ml-2");
    sellNowBtn.textContent = "Sell something!";
    navLeft.appendChild(sellNowBtn);

    const navRight = document.createElement('div');
    navRight.classList.add('nav-container-right', "row-md");
    mainNav.appendChild(navRight);

    const loginBtn = document.createElement('button');
    loginBtn.classList.add('mainBtnWhite');
    loginBtn.textContent = "Login";
    navRight.appendChild(loginBtn);

    const registerBtn = document.createElement('button');
    registerBtn.classList.add('mainBtn');
    const registerBtnIcon = document.createElement('img');
    registerBtnIcon.src = "/src/assets/profile_22x22.png";
    registerBtnIcon.alt = "Profile";
    const registerBtnText = document.createElement('span');
    registerBtnText.textContent = "Register";
    registerBtn.appendChild(registerBtnIcon);
    registerBtn.appendChild(registerBtnText);
    navRight.appendChild(registerBtn);

    const hamburgerBtb = document.createElement('div');
    hamburgerBtb.classList.add('nav-container-hamburger');
    hamburgerBtb.id = "hamburgerTrigger";
    mainNav.appendChild(hamburgerBtb);

    const hamburgerSpan1 = document.createElement('span');
    const hamburgerSpan2 = document.createElement('span');
    const hamburgerSpan3 = document.createElement('span');
    hamburgerBtb.appendChild(hamburgerSpan1);
    hamburgerBtb.appendChild(hamburgerSpan2);
    hamburgerBtb.appendChild(hamburgerSpan3);

    hamburgerBtb.addEventListener('click', () => {
        triggerHamburger(mainNav);
    });

    const hamburgerContent = document.getElementById('hamburgerContent');
    const hamburgerUl = document.createElement('ul');
    hamburgerContent.appendChild(hamburgerUl);

    const hamburgerLi1 = document.createElement('li');
    hamburgerLi1.textContent = "Home";
    const hamburgerLi2 = document.createElement('li');
    hamburgerLi2.textContent = "Sell something!";
    const hamburgerLi3 = document.createElement('li');
    hamburgerLi3.textContent = "Login";
    const hamburgerLi4 = document.createElement('li');
    hamburgerLi4.textContent = "Register";
    const hamburgerLi5 = document.createElement('li');
    hamburgerLi5.textContent = "Profile";

    hamburgerUl.appendChild(hamburgerLi1);
    hamburgerUl.appendChild(hamburgerLi2);
    hamburgerUl.appendChild(hamburgerLi3);
    hamburgerUl.appendChild(hamburgerLi4);
    hamburgerUl.appendChild(hamburgerLi5);
}