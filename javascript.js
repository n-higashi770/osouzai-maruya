/* =========================
  スライドショー（そのまま）
========================= */
const slides = document.querySelectorAll('.slide-wrap');
let index = 0;

function showSlide(i) {
  slides.forEach(s => s.classList.remove('active'));
  slides[i].classList.add('active');
}

showSlide(index);

setInterval(() => {
  index = (index + 1) % slides.length;
  showSlide(index);
}, 4000);


/* フェードイン */

document.addEventListener("DOMContentLoaded", () => {
    const targets = document.querySelectorAll(".fadein");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target); // 一度だけ発火
            }
        });
    }, {
        threshold: 0.1
    });

    targets.forEach(target => observer.observe(target));
});



/* ハンバーガー */
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.global-nav');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  nav.classList.toggle('open');
});

/* メニュー押したら閉じる */
document.querySelectorAll('.global-nav a').forEach(link=>{
  link.addEventListener('click',()=>{
    hamburger.classList.remove('active');
    nav.classList.remove('open');
  });
});

/* navスクロール */

window.addEventListener("scroll", () => {
  const nav = document.querySelector(".pc-vertical-nav");
  const hero = document.getElementById("hero");
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".pc-vertical-nav li");

  /* hero外で色変更 */
  if (window.scrollY > hero.offsetHeight) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }

  /* 初期化 */
  navItems.forEach(li => {
    li.classList.remove("active");
    li.style.setProperty("--progress", 0);
  });

  const viewportPoint = window.scrollY + window.innerHeight * 0.35;
  const pageBottom =
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 2;

  sections.forEach((section, index) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const bottom = top + height;
    const isLast = index === sections.length - 1;

    /* 今見てるsection */
    if (viewportPoint >= top && viewportPoint < bottom) {
      const link = document.querySelector(
        `.pc-vertical-nav a[href="#${section.id}"]`
      );

      if (!link) return;

      const li = link.closest("li");
      li.classList.add("active");

      let progress;

      /* 最後のsectionだけ補正 */
      if (isLast) {
        const range =
          document.documentElement.scrollHeight -
          window.innerHeight -
          top;

        progress = (window.scrollY - top) / range;
      } else {
        progress = (viewportPoint - top) / height;
      }

      progress = Math.max(0, Math.min(1, progress));

      li.style.setProperty("--progress", progress);
    }

    /* 最下部まで来たら最後の線100% */
    if (isLast && pageBottom) {
      const link = document.querySelector(
        `.pc-vertical-nav a[href="#${section.id}"]`
      );

      if (!link) return;

      const li = link.closest("li");
      li.classList.add("active");
      li.style.setProperty("--progress", 1);
    }
  });
});

/* スワイパー */
const menuSlider = new Swiper('.menu-slider', {
  loop: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  speed: 900,

  autoplay: {
    delay: 3200,
    disableOnInteraction: false,
  },

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  breakpoints: {
    0: {
      spaceBetween: 16
    },
    768: {
      spaceBetween: 20
    },
    1200: {
      spaceBetween: 24
    }
  },

  allowTouchMove: true,
  simulateTouch: true,
  touchRatio: 1,

  observer: true,
  observeParents: true
});