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
    const text1 = 'Hi, It\'s <span class="span">Kevin</span>';
    const text2 = 'I\'m a <span class="span">Student</span>';

    typeEffectHTML(line1, text1, 125, () => {
        line2.style.visibility = "visible"; // Mostrar h3 justo antes de escribir
        typeEffectHTML(line2, text2, 125);
    });
});

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, 200);
      }
    });
  }, {
    threshold: 0.5
  });

  sections.forEach(section => observer.observe(section));
});

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
    { threshold: 0.6 }
  );

  sections.forEach(section => observer.observe(section));
});

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
        }
        else if (el.tagName === "INPUT" && el.type === "submit") {
          el.value = newText;
        }
        else {
          el.innerHTML = newText.replace(/\n\n/g, "<br><br>");
        }
      }
    });
  });
});