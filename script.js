// EFECTO TYPEWRITER CON ETIQUETAS HTML
function typeEffectHTML(element, html, speed, callback) {
  element.innerHTML = "";
  let i = 0;
  let isTag = false;
  let text = "";
  function type() {
    if (i < html.length) {
      let char = html[i];
      text += char;
      element.innerHTML = text;
      i++;
      if (char === "<") isTag = true;
      if (char === ">") isTag = false;
      setTimeout(type, isTag ? 0 : speed);
    } else if (callback) {
      callback();
    }
  }
  type();
}

window.addEventListener('DOMContentLoaded', () => {
  const line1 = document.querySelector('.typewriter-line1');
  const line2 = document.querySelector('.typewriter-line2');
  const text1 = line1.dataset.en;
  const text2 = line2.dataset.en;

  typeEffectHTML(line1, text1, 125, () => {
    line2.style.visibility = "visible";
    typeEffectHTML(line2, text2, 125);
  });
});

// ANIMACIÓN DE APARICIÓN DE SECCIONES CON SCROLL
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, {
      threshold: 0.2 // Más sensible para Safari
    });

    sections.forEach(section => observer.observe(section));
  } else {
    // Fallback para navegadores sin IntersectionObserver (Safari viejo, etc.)
    sections.forEach(section => section.classList.add("visible"));
  }

  // Parche para Safari moderno con bugs de scroll-snap
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  if (isSafari) {
    document.querySelector(".projects")?.classList.add("visible");
  }
});

// MENÚ ACTIVO SEGÚN SCROLL
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".navbar a");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        const id = entry.target.getAttribute("id");
        const navLink = document.querySelector(`.navbar a[href="#${id}"]`);

        if (entry.isIntersecting) {
          navLinks.forEach(link => link.classList.remove("active"));
          if (navLink) navLink.classList.add("active");
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(section => observer.observe(section));
});

// TOGGLE DE MODO OSCURO/CLARO
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("theme-toggle");
  const icon = toggle.querySelector("i");

  toggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    if (document.body.classList.contains("light-mode")) {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    } else {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
    }
  });
});

// TOGGLE DE IDIOMA
document.addEventListener("DOMContentLoaded", () => {
  const langBtn = document.getElementById("lang-toggle");
  let currentLang = "en";

  langBtn.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "es" : "en";
    langBtn.textContent = currentLang.toUpperCase();

    document.querySelectorAll(".lang").forEach(el => {
      const newText = el.dataset[currentLang];

      if (newText) {
        if (el.hasAttribute("placeholder")) {
          el.setAttribute("placeholder", newText);
        } else if (el.tagName === "INPUT" && el.type === "submit") {
          el.value = newText;
        } else {
          el.innerHTML = newText.replace(/\n\n/g, "<br><br>");
        }
      }
    });
  });
});
