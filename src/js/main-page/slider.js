export function initSlider() {
  const sliderBox = document.querySelector('.slider__box');
  if (!sliderBox) return;

  const originalImages = Array.from(sliderBox.children);
  const gap = 24;
  sliderBox.style.gap = gap + 'px';

  for (let i = 0; i < 2; i++) {
    originalImages.forEach(img => sliderBox.appendChild(img.cloneNode(true)));
  }

  const slideWidth = originalImages[0].offsetWidth + gap;
  const totalSlides = originalImages.length;
  const totalWidth = slideWidth * totalSlides;

  let position = 0;

  function animate() {
    position -= 1.5;
    if (Math.abs(position) >= totalWidth) {
      position += totalWidth;
    }
    sliderBox.style.transform = `translateX(${position}px)`;
    requestAnimationFrame(animate);
  }

  animate();
}
