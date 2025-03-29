// Navbar Fixed
window.onscroll = function () {
  const header = document.querySelector("header");
  const FixedNav = header.offsetTop;
  const toTop = document.querySelector("#to-top");

  if (window.pageYOffset > FixedNav) {
    header.classList.add("navbar-fixed");
    toTop.classList.remove("hidden");
    toTop.classList.add("flex");
  } else {
    header.classList.remove("navbar-fixed");
    toTop.classList.remove("flex");
    toTop.classList.add("hidden");
  }
};

// Hamburger Menu
const hamburger = document.querySelector("#hamburger");
const nav = document.querySelector("#nav-menu");

hamburger.addEventListener("click", function () {
  hamburger.classList.toggle("hamburger-active");
  nav.classList.toggle("hidden");
});

// Klik di luar hamburger menu
window.addEventListener("click", function (e) {
  if (e.target != hamburger && e.target != nav) {
    hamburger.classList.remove("hamburger-active");
    nav.classList.add("hidden");
  }
});

// dark mode
const darkToggle = document.querySelector("#dark-toggle");
const html = document.querySelector("html");

darkToggle.addEventListener("click", function () {
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

//Ketika tombol submit di klik
form.addEventListener("submit", (e) => {
  e.preventDefault();
  // hilangkan tombol submit dan tampilkan loading
  submit.classList.toggle("hidden");
  loading.classList.toggle("hidden");
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      console.log("Success!", response);
      // tampilkan tombol submit dan hilangkan loading
      submit.classList.toggle("hidden");
      loading.classList.toggle("hidden");
      form.reset();
      alert("Terima kasih, pesan Anda telah terkirim.");
    })
    .catch((error) => console.error("Error!", error.message));
});
