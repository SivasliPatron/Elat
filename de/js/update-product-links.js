(function(){
  function updateProductLinks(){
    try {
      // Placeholder to avoid 404s and provide a hook for future link normalization.
      // Intentionally no DOM changes to preserve current behavior.
    } catch (e) {
      console.warn('[update-product-links] error', e);
    }
  }

  // Expose as a global in case other scripts want to call it.
  if (typeof window !== 'undefined') {
    window.updateProductLinks = updateProductLinks;
  }

  // Run once on load without altering existing logic.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateProductLinks, { once: true });
  } else {
    updateProductLinks();
  }

  try { console.debug('[update-product-links] initialized'); } catch(_) {}
})();
