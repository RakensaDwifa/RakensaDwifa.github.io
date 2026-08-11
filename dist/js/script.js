// Navbar Fixed
const header = document.querySelector("header");
const toTop = document.querySelector("#to-top");
const navOffset = header.offsetTop;

document.addEventListener(
  "scroll",
  function () {
    if (window.pageYOffset > navOffset) {
      header.classList.add("navbar-fixed");
      toTop.classList.remove("hidden");
      toTop.classList.add("flex");
    } else {
      header.classList.remove("navbar-fixed");
      toTop.classList.remove("flex");
      toTop.classList.add("hidden");
    }
  },
  { passive: true }
);

// Hamburger Menu
const hamburger = document.querySelector("#hamburger");
const nav = document.querySelector("#nav-menu");

hamburger.addEventListener("click", function () {
  hamburger.classList.toggle("hamburger-active");
  nav.classList.toggle("hidden");
});

// Klik di luar hamburger menu
document.addEventListener("click", function (e) {
  if (nav.classList.contains("hidden")) return;
  if (!hamburger.contains(e.target) && !nav.contains(e.target)) {
    hamburger.classList.remove("hamburger-active");
    nav.classList.add("hidden");
  }
});

// Tutup menu saat link navigasi diklik (mobile)
nav.addEventListener("click", function (e) {
  if (e.target.tagName === "A") {
    hamburger.classList.remove("hamburger-active");
    nav.classList.add("hidden");
  }
});

// dark mode
const darkToggle = document.querySelector("#dark-toggle");
const html = document.querySelector("html");

darkToggle.addEventListener("change", function () {
  if (darkToggle.checked) {
    html.classList.add("dark");
    localStorage.theme = "dark";
  } else {
    html.classList.remove("dark");
    localStorage.theme = "light";
  }
});

// Toggle sesuai mode
if (
  localStorage.theme === "dark" ||
  (!("theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  darkToggle.checked = true;
} else {
  darkToggle.checked = false;
}

// Running Contact Form
const scriptURL =
  "https://script.google.com/macros/s/AKfycbxEhL5rjWpdiTQaJrn2PAuJSgpEmhvkkLY-UkhlyP1z-LsBPrQk943tlwudvix1MO98/exec";
const form = document.forms["contact-form"];
const submit = document.querySelector("#submit");
const loading = document.querySelector("#loading");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  submit.classList.toggle("hidden");
  loading.classList.toggle("hidden");
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok");
      submit.classList.toggle("hidden");
      loading.classList.toggle("hidden");
      form.reset();
      alert("Terima kasih, pesan Anda telah terkirim.");
    })
    .catch((error) => {
      console.error("Error!", error.message);
      submit.classList.toggle("hidden");
      loading.classList.toggle("hidden");
      alert(
        "Maaf, pesan Anda gagal terkirim. Silakan coba lagi atau hubungi lewat email rakensadwifa@gmail.com"
      );
    });
});

// AOS
AOS.init({
  duration: 1000,
  once: true,
  mirror: false,
  easing: "ease-in-out",
  offset: 200,
  delay: 0,
  refreshOnResize: true,
  anchorPlacement: "top-bottom",
});
AOS.refresh();
