const navLinks = Array.from(document.querySelectorAll("nav a"));
const sections = navLinks.map((link) => document.querySelector(link.hash));
let scheduled = false;
function updateNavigation() {
  const marker = Math.min(window.innerHeight * 0.42, 360);
  let active = sections[0];
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= marker) active = section;
  }
  if (
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight - 2
  ) {
    active = sections[sections.length - 1];
  }
  for (const link of navLinks) {
    if (link.hash === "#" + active.id)
      link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  }
  scheduled = false;
}
function scheduleUpdate() {
  if (!scheduled) {
    scheduled = true;
    requestAnimationFrame(updateNavigation);
  }
}
window.addEventListener("scroll", scheduleUpdate, { passive: true });
window.addEventListener("resize", scheduleUpdate);
updateNavigation();
