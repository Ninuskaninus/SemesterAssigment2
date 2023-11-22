export function createUserModal() {
  const loginContainer = document.getElementById("errorLoginModal");
  loginContainer.style.display = "none";

  const mainContainer = document.getElementById("indexMain");
  const fullScreenModal = document.createElement("div");
  fullScreenModal.classList.add("fullscreenModal");
  fullScreenModal.id = "fullscreenModalRegister";
  fullScreenModal.style.top = "85px";
  mainContainer.appendChild(fullScreenModal);

  const xout = document.createElement("div");
  xout.classList.add("x-out");
  fullScreenModal.appendChild(xout);
  xout.addEventListener("click", () => {
    fullScreenModal.style.display = "none";
  });

  const modal = document.createElement("div");
  modal.classList.add("fullscreenModalContent");
  fullScreenModal.appendChild(modal);

  const fullscreenForm = document.createElement("form");
  fullscreenForm.classList.add("fullscreenForm");
  fullscreenForm.id = "registerForm";
  modal.appendChild(fullscreenForm);

  const logo = document.createElement("img");
  logo.src = "/src/assets/heroLogo.png";
  fullscreenForm.appendChild(logo);
}
