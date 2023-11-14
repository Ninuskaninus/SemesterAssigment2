export function secondaryNavbar(){
    const secondaryNavbar = document.getElementById('secondaryNav');
    const secondNavContainer = document.createElement('div');
    secondNavContainer.classList.add("secondaryNavContainer");
    secondaryNavbar.appendChild(secondNavContainer);

    const usernameContainer = document.createElement('div');
    usernameContainer.classList.add("navUsernameContainer");
    secondNavContainer.appendChild(usernameContainer);

    const userAvatar = document.createElement('img');
    userAvatar.src = "/src/assets/profile_22x22.png";
    userAvatar.classList.add("navUserAvatar");
    usernameContainer.appendChild(userAvatar);

    const username = document.createElement('p');
    username.innerHTML = "Username";
    username.classList.add("navUsername");
    usernameContainer.appendChild(username);

    const navDivider = document.createElement('div');
    navDivider.classList.add("divider");
    secondNavContainer.appendChild(navDivider);

    const credit = document.createElement('p');
    credit.innerHTML = "Credit:";
    secondNavContainer.appendChild(credit);

    const creditScore = document.createElement('b');
    creditScore.innerHTML = " 7500";
    credit.appendChild(creditScore);
}