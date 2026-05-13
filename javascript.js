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
window.addEventListener('scroll', () => {
  const heroHeight = document.getElementById('hero').offsetHeight;
  const nav = document.querySelector('.pc-horizontal-nav');

  if (window.scrollY > heroHeight) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
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