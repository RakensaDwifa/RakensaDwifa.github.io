// prefers-reduced-motion
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

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

// Typing Effect
const typedText = document.querySelector("#typed-text");
const phrases = ["Web Developer", "Problem Solver", "Tech Enthusiast"];
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function type() {
  if (!typedText || prefersReducedMotion) return;
  const current = phrases[phraseIndex];
  if (deleting) {
    typedText.textContent = current.slice(0, charIndex - 1);
    charIndex--;
  } else {
    typedText.textContent = current.slice(0, charIndex + 1);
    charIndex++;
  }
  let delay = deleting ? 40 : 90;
  if (!deleting && charIndex === current.length) {
    delay = 2000;
    deleting = true;
  } else if (deleting && charIndex === 0) {
    deleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    delay = 400;
  }
  setTimeout(type, delay);
}
type();

// Copy Email
const copyBtn = document.querySelector("#copy-email");
const copyFeedback = document.querySelector("#copy-feedback");
const EMAIL = "rakensadwifa@gmail.com";

copyBtn.addEventListener("click", function () {
  function showFeedback() {
    copyFeedback.classList.remove("hidden");
    setTimeout(function () {
      copyFeedback.classList.add("hidden");
    }, 2000);
  }
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(EMAIL).then(showFeedback);
  } else {
    const ta = document.createElement("textarea");
    ta.value = EMAIL;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      showFeedback();
    } catch (err) {
      console.error("Copy failed", err);
    }
    document.body.removeChild(ta);
  }
});

// Running Contact Form
const scriptURL =
  "https://script.google.com/macros/s/AKfycbxEhL5rjWpdiTQaJrn2PAuJSgpEmhvkkLY-UkhlyP1z-LsBPrQk943tlwudvix1MO98/exec";
const form = document.forms["contact-form"];
const submit = document.querySelector("#submit");
const loading = document.querySelector("#loading");

// Validasi inline
const fields = {
  Nama: {
    id: "name-error",
    validate: (v) => (v.trim() ? "" : "Please enter your name."),
  },
  Email: {
    id: "email-error",
    validate: (v) => {
      if (!v.trim()) return "Please enter your email.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()))
        return "Please enter a valid email address.";
      return "";
    },
  },
  Pesan: {
    id: "message-error",
    validate: (v) => {
      if (!v.trim()) return "Please write a message.";
      if (v.trim().length < 10)
        return "Message should be at least 10 characters.";
      return "";
    },
  },
};

function setFieldError(input, message) {
  const errorEl = document.getElementById(fields[input.name].id);
  const inputEl = form.elements[input.name];
  if (message) {
    inputEl.classList.add("input-error");
    errorEl.textContent = message;
    errorEl.classList.remove("hidden");
  } else {
    inputEl.classList.remove("input-error");
    errorEl.textContent = "";
    errorEl.classList.add("hidden");
  }
}

Object.keys(fields).forEach((name) => {
  form.elements[name].addEventListener("input", function () {
    setFieldError(this, fields[name].validate(this.value));
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Honeypot: jika terisi, anggap sukses tanpa kirim
  if (form.elements["website"] && form.elements["website"].value !== "") {
    form.reset();
    return;
  }

  // Validasi
  let valid = true;
  Object.keys(fields).forEach((name) => {
    const error = fields[name].validate(form.elements[name].value);
    setFieldError(form.elements[name], error);
    if (error) valid = false;
  });
  if (!valid) return;

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
if (!prefersReducedMotion) {
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
}
