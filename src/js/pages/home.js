import { mainNavbar } from "../design/main-navbar.js";
import { secondaryNavbar } from "../design/secondary-navbar.js";
import { heroBanner } from "../design/hero.js";
import { popularTags } from "../design/popular-tags.js";
import { searchField } from "../design/searchfield.js";
import { recentUploads } from "../design/recent-uploads.js";
import { errorLoginModal } from "../design/errorLoginModal.js";
import { createUserModal } from "../design/createUserModal.js";
import { sellModal } from "../design/sellModal.js";

export function htmlDesign() {
  secondaryNavbar();
  mainNavbar();
  heroBanner();
  popularTags();
  searchField();
  recentUploads();
  errorLoginModal();
  createUserModal();
  sellModal();
}
