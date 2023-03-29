import focusLock from 'dom-focus-lock';

const root = document.documentElement;
const targets = document.querySelectorAll('[data-expand]');

const reflow = () => root.scrollTop;

const expanded = (target) => target.getAttribute('aria-expanded') === 'true';

const update = (target) => {
  const next = target.nextElementSibling;

  if (next.hasAttribute('data-expand-height')) {
    const current = next.offsetHeight;
    next.style.setProperty('--height', 'auto');
    const height = next.offsetHeight;
    next.style.setProperty('--height', `${current}px`);
    reflow();

    if (expanded(target)) {
      next.style.setProperty('--height', '0');
    } else {
      next.style.setProperty('--height', `${height}px`);
    }
  }
};

const modal = (target) => {
  const toggle = target.getAttribute('data-expand-toggle');
  const next = target.nextElementSibling;

  if (expanded(target)) {
    focusLock.on(next);
    toggle && root.setAttribute(toggle, '');
  } else {
    focusLock.off(next);
    toggle && root.removeAttribute(toggle);
  }
};

for (const target of targets) {
  const type = target.getAttribute('data-expand');
  const next = target.nextElementSibling;
  const height = next.hasAttribute('data-expand-height');

  !target.hasAttribute('aria-expanded') && target.setAttribute('aria-expanded', false);

  if (type === 'tab') {
    const container = target.closest('[data-expand-tabs]');
    let tabs = container.querySelectorAll('[data-expand="tab"]');
    tabs = [...tabs].filter((tab) => tab.closest('[data-expand-tabs]') === container);

    target.addEventListener('click', () => {
      for (const tab of tabs) {
        if ((expanded(tab) && tab !== target) || (!expanded(tab) && tab === target)) {
          update(tab);
          tab.setAttribute('aria-expanded', tab === target);
        }
      }
    });
  } else {
    target.addEventListener('click', () => {
      update(target);
      target.setAttribute('aria-expanded', !expanded(target));
      type === 'modal' && modal(target);
    });
  }

  if (type === 'modal') {
    const close = () => {
      update(target);
      target.setAttribute('aria-expanded', false);
      modal(target);
    };

    document.addEventListener('click', (e) => {
      if (expanded(target) && !target.contains(e.target) && !next.contains(e.target)) {
        close();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (expanded(target) && e.key === 'Escape') {
        close();
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
