import { mainNavbar } from "./main-navbar.js";
import { secondaryNavbar } from "./secondary-navbar.js";
import { heroBanner } from "./hero.js";
import { popularTags } from "./popular-tags.js";
import { searchField } from "./searchfield.js";
import { recentUploads } from "./recent-uploads.js";
import { errorLoginModal } from "./errorLoginModal.js";

export function htmlDesign() {
  secondaryNavbar();
  mainNavbar();

  heroBanner();
  popularTags();
  searchField();
  recentUploads();
  errorLoginModal();
}
