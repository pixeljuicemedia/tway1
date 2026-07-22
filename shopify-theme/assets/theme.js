/* Tway Motorsports — theme.js
 * Mobile menu toggle, cart drawer, AJAX add-to-cart, cart drawer open on add.
 * Vanilla JS — no build step, runs directly in Shopify.
 */
(function () {
  'use strict';

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  /* ---------- Mobile menu ---------- */
  const burger = $('[data-mobile-burger]');
  const mobileMenu = $('[data-mobile-menu]');
  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      const open = mobileMenu.getAttribute('data-open') === 'true';
      mobileMenu.setAttribute('data-open', open ? 'false' : 'true');
      burger.setAttribute('aria-expanded', open ? 'false' : 'true');
    });
    $$('a', mobileMenu).forEach((a) => {
      a.addEventListener('click', () => mobileMenu.setAttribute('data-open', 'false'));
    });
  }

  /* ---------- Cart drawer ---------- */
  const drawer = $('[data-cart-drawer]');
  const drawerBody = $('[data-cart-drawer-body]');
  const drawerFoot = $('[data-cart-drawer-foot]');
  const drawerCount = $$('[data-cart-count]');

  function openDrawer() {
    if (!drawer) return;
    drawer.setAttribute('data-open', 'true');
    document.body.classList.add('overflow-lock');
    refreshCart();
  }
  function closeDrawer() {
    if (!drawer) return;
    drawer.setAttribute('data-open', 'false');
    document.body.classList.remove('overflow-lock');
  }

  $$('[data-cart-open]').forEach((b) => b.addEventListener('click', (e) => { e.preventDefault(); openDrawer(); }));
  $$('[data-cart-close]').forEach((b) => b.addEventListener('click', closeDrawer));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDrawer(); });

  window.TwayCart = { open: openDrawer, close: closeDrawer, refresh: refreshCart };

  function formatMoney(cents, currency) {
    try {
      return new Intl.NumberFormat(document.documentElement.lang || 'en-US', {
        style: 'currency',
        currency: currency || (window.Shopify && Shopify.currency && Shopify.currency.active) || 'USD',
      }).format((cents || 0) / 100);
    } catch (e) {
      return '$' + ((cents || 0) / 100).toFixed(2);
    }
  }

  function renderCart(cart) {
    if (!drawerBody) return;
    // Count
    drawerCount.forEach((el) => {
      el.textContent = cart.item_count;
      el.setAttribute('data-count', cart.item_count);
    });

    if (!cart.items || cart.items.length === 0) {
      drawerBody.innerHTML =
        '<div class="cart-drawer__empty">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>' +
        '<p>Your cart is empty</p></div>';
      if (drawerFoot) drawerFoot.style.display = 'none';
      return;
    }

    if (drawerFoot) drawerFoot.style.display = '';

    const rows = cart.items
      .map((item) => {
        const img = item.featured_image && item.featured_image.url ? item.featured_image.url : (item.image || '');
        const options = (item.options_with_values || [])
          .filter((o) => o.value && o.value !== 'Default Title')
          .map((o) => o.value)
          .join(' • ');
        return (
          '<div class="cart-item" data-line-key="' + item.key + '">' +
          '<div class="cart-item__img">' + (img ? '<img src="' + img + '" alt="' + (item.product_title || '') + '">' : '') + '</div>' +
          '<div class="cart-item__body">' +
          '<div class="cart-item__title">' + item.product_title + '</div>' +
          (options ? '<div class="cart-item__variant">' + options + '</div>' : '') +
          '<div class="cart-item__price">' + formatMoney(item.final_line_price, cart.currency) + '</div>' +
          '</div>' +
          '<div class="cart-item__side">' +
          '<button class="cart-item__remove" data-remove aria-label="Remove"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-2 14a2 2 0 01-2 2H9a2 2 0 01-2-2L5 6"/></svg></button>' +
          '<div class="cart-item__qty">' +
          '<button data-qty="-1" aria-label="Decrease"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg></button>' +
          '<span>' + item.quantity + '</span>' +
          '<button data-qty="1" aria-label="Increase"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></button>' +
          '</div>' +
          '</div>' +
          '</div>'
        );
      })
      .join('');

    drawerBody.innerHTML = rows;

    const totalEl = $('[data-cart-total]');
    if (totalEl) totalEl.textContent = formatMoney(cart.total_price, cart.currency);

    // Bind row events
    $$('.cart-item', drawerBody).forEach((row) => {
      const key = row.getAttribute('data-line-key');
      const qty = parseInt(row.querySelector('.cart-item__qty span').textContent, 10);
      row.querySelector('[data-qty="-1"]').addEventListener('click', () => updateLine(key, Math.max(0, qty - 1)));
      row.querySelector('[data-qty="1"]').addEventListener('click', () => updateLine(key, qty + 1));
      row.querySelector('[data-remove]').addEventListener('click', () => updateLine(key, 0));
    });
  }

  async function refreshCart() {
    try {
      const res = await fetch('/cart.js', { headers: { Accept: 'application/json' } });
      const cart = await res.json();
      renderCart(cart);
    } catch (err) { console.error('Cart fetch failed', err); }
  }

  async function updateLine(key, quantity) {
    try {
      const res = await fetch('/cart/change.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ id: key, quantity: quantity }),
      });
      const cart = await res.json();
      renderCart(cart);
    } catch (err) { console.error('Cart update failed', err); }
  }

  window.TwayCart.updateLine = updateLine;

  /* ---------- AJAX add-to-cart ---------- */
  document.addEventListener('submit', async (e) => {
    const form = e.target;
    if (!form.matches('form[action*="/cart/add"]')) return;
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    const original = btn ? btn.innerHTML : '';
    if (btn) { btn.disabled = true; btn.setAttribute('data-adding', 'true'); }
    try {
      const fd = new FormData(form);
      const res = await fetch('/cart/add.js', { method: 'POST', body: fd, headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error('add failed');
      if (btn) {
        btn.setAttribute('data-added', 'true');
        btn.innerHTML = '✓ ' + (btn.getAttribute('data-added-label') || 'Added to Cart');
        setTimeout(() => {
          btn.innerHTML = original;
          btn.removeAttribute('data-added');
          btn.removeAttribute('data-adding');
          btn.disabled = false;
        }, 1600);
      }
      await refreshCart();
      openDrawer();
    } catch (err) {
      console.error(err);
      if (btn) { btn.disabled = false; btn.innerHTML = original; }
    }
  });

  /* Initial cart count on page load */
  refreshCart();
})();