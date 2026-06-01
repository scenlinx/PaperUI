(function(){
  var container = document.querySelector('.hero-carousel-wrap .carousel-slides');
  if (!container) return;
  var slides = container.querySelectorAll('.carousel-slide');
  var dots = container.parentElement.querySelectorAll('.carousel-dot');
  var prevBtn = container.parentElement.querySelector('.carousel-prev');
  var nextBtn = container.parentElement.querySelector('.carousel-next');
  if (slides.length < 2) return;
  var current = 0;
  var total = slides.length;
  var intervalId;
  function goTo(idx) {
    slides[current].classList.remove('active');
    slides[current].setAttribute('aria-hidden', 'true');
    if (dots.length) {
      dots[current].classList.remove('active');
      dots[current].setAttribute('aria-selected', 'false');
    }
    current = (idx + total) % total;
    slides[current].classList.add('active');
    slides[current].removeAttribute('aria-hidden');
    if (dots.length) {
      dots[current].classList.add('active');
      dots[current].setAttribute('aria-selected', 'true');
    }
  }
  function startAutoPlay() {
    stopAutoPlay();
    intervalId = setInterval(function(){ goTo(current + 1); }, 4000);
  }
  function stopAutoPlay() {
    if (intervalId) { clearInterval(intervalId); intervalId = null; }
  }
  startAutoPlay();
  if (dots.length) {
    dots.forEach(function(dot, i) {
      dot.addEventListener('click', function(){ goTo(i); });
    });
  }
  if (prevBtn) {
    prevBtn.addEventListener('click', function(){ goTo(current - 1); });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', function(){ goTo(current + 1); });
  }
  container.addEventListener('mouseenter', stopAutoPlay);
  container.addEventListener('mouseleave', startAutoPlay);
  container.addEventListener('focusin', stopAutoPlay);
  container.addEventListener('focusout', startAutoPlay);
})();
