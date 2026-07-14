document.addEventListener('DOMContentLoaded', () => {
  const items = Array.from(document.querySelectorAll('.faq-item'));
  const expandAllBtn = document.getElementById('expandAll');
  const collapseAllBtn = document.getElementById('collapseAll');

  function setItemState(item, open) {
    const question = item.querySelector('.faq-question');
    const wrap = item.querySelector('.faq-answer-wrap');

    item.classList.toggle('open', open);
    question.setAttribute('aria-expanded', open);

    if (open) {
      wrap.style.maxHeight = wrap.scrollHeight + 'px';
    } else {
      wrap.style.maxHeight = '0px';
    }
  }

  items.forEach((item) => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      setItemState(item, !isOpen);
    });
  });

  if (expandAllBtn) {
    expandAllBtn.addEventListener('click', () => {
      items.forEach((item) => setItemState(item, true));
    });
  }

  if (collapseAllBtn) {
    collapseAllBtn.addEventListener('click', () => {
      items.forEach((item) => setItemState(item, false));
    });
  }

  // keep open answers correctly sized if the window is resized
  // (e.g. text reflows to more/fewer lines)
  window.addEventListener('resize', () => {
    items.forEach((item) => {
      if (item.classList.contains('open')) {
        const wrap = item.querySelector('.faq-answer-wrap');
        wrap.style.maxHeight = wrap.scrollHeight + 'px';
      }
    });
  });
});
