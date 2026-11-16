const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const backTop = document.getElementById("backTop");
const progressBar = document.getElementById("progressBar");
const toast = document.getElementById("toast");

const savedTheme = localStorage.getItem("theme");
if (savedTheme) root.dataset.theme = savedTheme;
updateThemeIcon();

function updateThemeIcon() {
  themeToggle.textContent = root.dataset.theme === "dark" ? "☾" : "☀︎";
}
themeToggle.addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("theme", root.dataset.theme);
  updateThemeIcon();
});

navToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = `${(window.scrollY / max) * 100}%`;
  backTop.classList.toggle("show", window.scrollY > 500);
});

backTop.addEventListener("click", () => window.scrollTo({top: 0, behavior: "smooth"}));

document.getElementById("year").textContent = new Date().getFullYear();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

document.getElementById("copyEmail").addEventListener("click", async (e) => {
  e.preventDefault();
  const email = "your-email@example.com";
  try {
    await navigator.clipboard.writeText(email);
    toast.textContent = "Email copied.";
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 1800);
  } catch {
    toast.textContent = "Replace the email address in the template.";
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2200);
  }
});
