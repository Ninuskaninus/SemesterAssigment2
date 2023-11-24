import { sellModalTrigger } from "../modals/sellModalTrigger.js";

export function heroBanner() {
  const main = document.getElementById("indexMain");

  const hero = document.createElement("div");
  hero.classList.add("hero");
  main.appendChild(hero);

  const heroLogo = document.createElement("img");
  heroLogo.src = "/src/assets/heroLogo.png";
  heroLogo.alt = "Hero Logo";
  hero.appendChild(heroLogo);

  const heroH1 = document.createElement("h1");
  heroH1.textContent = "Auction House";
  hero.appendChild(heroH1);

  const heroH2 = document.createElement("h2");
  heroH2.textContent = "Buy and sell items";
  hero.appendChild(heroH2);

  const heroBtn = document.createElement("button");
  heroBtn.textContent = "Get Started";
  heroBtn.addEventListener("click", () => {
    sellModalTrigger();
  });
  heroBtn.classList.add("btn", "mainBtn");
  hero.appendChild(heroBtn);
}
