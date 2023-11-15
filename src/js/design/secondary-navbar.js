import { myProfile } from "../API/GET/getMyPofile.js";
const profile = await myProfile();

export function secondaryNavbar() {
  const secondaryNavbar = document.getElementById("secondaryNav");
  const updateNavbarVisibility = () => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      setTimeout(() => {
        const secondNavContainer = document.createElement("div");
        secondNavContainer.classList.add("secondaryNavContainer");

        const usernameContainer = document.createElement("div");
        usernameContainer.classList.add("navUsernameContainer");
        secondNavContainer.appendChild(usernameContainer);

        const userAvatar = document.createElement("div");
        userAvatar.style.backgroundImage = "url(" + profile.avatar + ")";
        userAvatar.classList.add("navUserAvatar");
        usernameContainer.appendChild(userAvatar);

        const username = document.createElement("p");
        username.innerHTML = profile.username;
        username.classList.add("navUsername");
        usernameContainer.appendChild(username);

        const navDivider = document.createElement("div");
        navDivider.classList.add("divider");
        secondNavContainer.appendChild(navDivider);

        const credit = document.createElement("p");
        credit.innerHTML = "Credit: ";
        secondNavContainer.appendChild(credit);

        const creditScore = document.createElement("b");
        creditScore.innerHTML = profile.credits;
        credit.appendChild(creditScore);

        secondaryNavbar.innerHTML = "";
        secondaryNavbar.appendChild(secondNavContainer);
      }, 0);
    } else {
      secondaryNavbar.style.display = "none";
    }
  };
  updateNavbarVisibility();
  setInterval(() => {
    updateNavbarVisibility();
  }, 1000);
}
