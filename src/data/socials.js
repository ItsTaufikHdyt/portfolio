import { medium } from "./medium.js";

// Entries without a url are hidden until filled in.
export const socials = [
  { name: "GitHub", url: "https://github.com/ItsTaufikHdyt", icon: "logo-github" },
  { name: "LinkedIn", url: null /* [TODO: LinkedIn profile URL] */, icon: "logo-linkedin" },
  { name: "Medium", url: medium.profileUrl, icon: "logo-medium" },
  { name: "Telegram", url: "https://t.me/ItsTaufikHdyt", icon: "paper-plane" },
  { name: "Twitter", url: "https://twitter.com/Itstaufikhdyt", icon: "logo-twitter" },
  { name: "Instagram", url: "https://www.instagram.com/itstaufikhdyt", icon: "logo-instagram" }
].filter((social) => social.url);
