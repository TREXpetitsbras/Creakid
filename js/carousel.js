(function () {
  'use strict';

  function initCarousel(el) {
    var track  = el.querySelector('.carousel-track');
    var slides = el.querySelectorAll('.carousel-slide');
    var dots   = el.querySelectorAll('.carousel-dot');
    var prev   = el.querySelector('.carousel-prev');
    var next   = el.querySelector('.carousel-next');
    var total  = slides.length;
    var cur    = 0;
    var touchX = 0;
    var touchD = 0;

    function goTo(idx) {
      idx = ((idx % total) + total) % total;
      slides[cur].setAttribute('aria-hidden', 'true');
      dots[cur].classList.remove('active');
      dots[cur].setAttribute('aria-selected', 'false');

      cur = idx;
      track.style.transform = 'translateX(-' + (cur * 100) + '%)';

      slides[cur].setAttribute('aria-hidden', 'false');
      dots[cur].classList.add('active');
      dots[cur].setAttribute('aria-selected', 'true');
    }

    if (prev) prev.addEventListener('click', function () { goTo(cur - 1); });
    if (next) next.addEventListener('click', function () { goTo(cur + 1); });

    dots.forEach(function (d, i) {
      d.addEventListener('click', function () { goTo(i); });
    });

    el.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft')  { goTo(cur - 1); e.preventDefault(); }
      if (e.key === 'ArrowRight') { goTo(cur + 1); e.preventDefault(); }
    });

    el.addEventListener('touchstart', function (e) {
      touchX = e.touches[0].clientX;
      touchD = 0;
    }, { passive: true });

    el.addEventListener('touchmove', function (e) {
      touchD = e.touches[0].clientX - touchX;
    }, { passive: true });

    el.addEventListener('touchend', function () {
      if (Math.abs(touchD) > 40) goTo(touchD < 0 ? cur + 1 : cur - 1);
    });
  }

  document.querySelectorAll('.carousel').forEach(initCarousel);
}());
