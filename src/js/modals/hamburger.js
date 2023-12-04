export function triggerHamburger(mainNav) {
    const hamburgerContent = document.getElementById('hamburgerContent');
    const hamburgerUl = document.querySelector('#hamburgerContent ul');

    if (hamburgerContent.style.height === "0px" || hamburgerContent.style.height === "") {
        hamburgerUl.style.display = "flex";
        hamburgerContent.style.display = "block";
        hamburgerContent.style.height = "auto";
        hamburgerContent.style.borderBottom = "1px solid #6B65AD";
    } else {
        hamburgerContent.style.height = "0";
        hamburgerContent.style.display = "none";
        hamburgerUl.style.display = "none";
        hamburgerContent.style.border = "none";
    }
}

window.addEventListener("resize", function () {
    const hamburgerContent = document.getElementById('hamburgerContent');
    const hamburgerUl = document.querySelector('#hamburgerContent ul');

    if (window.innerWidth > 670) {
        hamburgerContent.style.height = "0";
        hamburgerContent.style.display = "none";
        hamburgerUl.style.display = "none";
        hamburgerContent.style.border = "none";
    }
});
