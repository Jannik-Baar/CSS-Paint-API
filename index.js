if ('paintWorklet' in CSS) {
  CSS.paintWorklet.addModule('ripple.js');
  const button = document.querySelector('#ripple');
  let start = performance.now();
  
  button?.addEventListener('click', event => {
    button.classList.add('animating');
    const rect = event.target.getBoundingClientRect();
    const [x, y] = [event.clientX - rect.left, event.clientY - rect.top];
    start = performance.now();

    function ripple(now) {
      const count = Math.floor(now - start);
      button.style.cssText = `--ripple-x: ${x}; --ripple-y: ${y}; --animation-tick: ${count};`;
      if (count > 1000) {
        button.classList.remove('animating');
        button.style.cssText = `--animation-tick: 0`;
        return;
      }
      requestAnimationFrame(ripple);
    }

    requestAnimationFrame(ripple);
  });
}
