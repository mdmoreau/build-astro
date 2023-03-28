const targets = document.querySelectorAll('[data-expand]');

const reflow = () => document.documentElement.scrollTop;

const expanded = (target) => target.getAttribute('aria-expanded') === 'true';

const update = (target) => {
  const next = target.nextElementSibling;

  if (next.hasAttribute('data-expand-height')) {
    const current = next.offsetHeight;
    let height;

    next.style.setProperty('--height', 'auto');
    height = next.offsetHeight;
    next.style.setProperty('--height', `${current}px`);
    reflow();

    if (expanded(target)) {
      next.style.setProperty('--height', '0');
    } else {
      next.style.setProperty('--height', `${height}px`);
    }
  }
};

for (const target of targets) {
  const type = target.getAttribute('data-expand');
  const next = target.nextElementSibling;
  const height = next.hasAttribute('data-expand-height');

  if (!target.hasAttribute('aria-expanded')) {
    target.setAttribute('aria-expanded', false);
  }

  if (type === 'group') {
    const root = target.closest('[data-expand-group]');
    const items = root.querySelectorAll('[data-expand="group"]');
    const group = [...items].filter((item) => item.closest('[data-expand-group]') === root);

    target.addEventListener('click', () => {
      for (const item of group) {
        if ((expanded(item) && item !== target) || (!expanded(item) && item === target)) {
          update(item);
          item.setAttribute('aria-expanded', item === target);
        }
      }
    });
  } else {
    target.addEventListener('click', () => {
      update(target);
      target.setAttribute('aria-expanded', !expanded(target));
    });
  }

  if (type === 'popup') {
    document.addEventListener('click', (e) => {
      if (expanded(target) && !target.contains(e.target) && !next.contains(e.target)) {
        update(target);
        target.setAttribute('aria-expanded', false);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (expanded(target) && e.key === 'Escape') {
        update(target);
        target.setAttribute('aria-expanded', false);
      }
    });
  }

  if (height) {
    next.addEventListener('transitionend', (e) => {
      if (e.propertyName === 'height') {
        next.style.removeProperty('--height');
      }
    });
  }
}
