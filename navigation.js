// 滚动时更新导航下划线；即使关闭 JavaScript，所有链接仍可使用。
(() => {
  const links = [...document.querySelectorAll('.navigation a[href^="#"]')];
  const sections = links.map(link => document.querySelector(link.getAttribute('href')));
  let scheduled = false;
  const update = () => {
    const threshold = window.innerHeight * 0.3;
    let active = 0;
    sections.forEach((section, index) => {
      if (section.getBoundingClientRect().top <= threshold) active = index;
    });
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 3) active = sections.length - 1;
    links.forEach((link, index) => {
      if (index === active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    scheduled = false;
  };
  const schedule = () => {
    if (!scheduled) { scheduled = true; requestAnimationFrame(update); }
  };
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  window.addEventListener('load', update);
  update();
})();
