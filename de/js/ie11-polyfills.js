/* ==============================================
   IE11 Compatibility Polyfills and Fixes
   JavaScript fixes for features that CSS can't handle
   ============================================== */

(function() {
    'use strict';

    // Check if we're in IE11
    var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
    
    if (!isIE11) {
        return; // Exit if not IE11
    }

    // Add IE11 class to body for CSS targeting
    document.documentElement.classList.add('ie11');

    // Object.assign polyfill for IE11
    if (typeof Object.assign !== 'function') {
        Object.assign = function(target) {
            if (target == null) {
                throw new TypeError('Cannot convert undefined or null to object');
            }
            var to = Object(target);
            for (var index = 1; index < arguments.length; index++) {
                var nextSource = arguments[index];
                if (nextSource != null) {
                    for (var nextKey in nextSource) {
                        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
            }
            return to;
        };
    }

    // classList polyfill for IE11 (basic implementation)
    if (!Element.prototype.classList) {
        Element.prototype.classList = {
            add: function(className) {
                if (this.className.indexOf(className) === -1) {
                    this.className += ' ' + className;
                }
            },
            remove: function(className) {
                this.className = this.className.replace(new RegExp('\\b' + className + '\\b', 'g'), '');
            },
            contains: function(className) {
                return this.className.indexOf(className) !== -1;
            },
            toggle: function(className) {
                if (this.contains(className)) {
                    this.remove(className);
                } else {
                    this.add(className);
                }
            }
        };
    }

    // Smooth scrolling polyfill for IE11
    function smoothScrollTo(element, to, duration) {
        if (duration <= 0) return;
        var difference = to - element.scrollTop;
        var perTick = difference / duration * 10;

        setTimeout(function() {
            element.scrollTop = element.scrollTop + perTick;
            if (element.scrollTop === to) return;
            smoothScrollTo(element, to, duration - 10);
        }, 10);
    }

    // Override smooth scroll behavior
    if (typeof Element.prototype.scrollIntoView === 'function') {
        var originalScrollIntoView = Element.prototype.scrollIntoView;
        Element.prototype.scrollIntoView = function(options) {
            if (typeof options === 'object' && options.behavior === 'smooth') {
                var targetTop = this.offsetTop;
                smoothScrollTo(document.documentElement, targetTop, 500);
            } else {
                originalScrollIntoView.call(this, options);
            }
        };
    }

    // Sticky position polyfill for IE11
    function applyStickyPolyfill() {
        var stickyElements = document.querySelectorAll('.sticky, [style*="position: sticky"]');
        
        for (var i = 0; i < stickyElements.length; i++) {
            var element = stickyElements[i];
            var rect = element.getBoundingClientRect();
            var top = parseInt(getComputedStyle(element).top) || 0;
            
            if (rect.top <= top && !element.classList.contains('ie11-sticky-active')) {
                element.style.position = 'fixed';
                element.style.top = top + 'px';
                element.style.left = rect.left + 'px';
                element.style.width = rect.width + 'px';
                element.classList.add('ie11-sticky-active');
            } else if (rect.top > top && element.classList.contains('ie11-sticky-active')) {
                element.style.position = '';
                element.style.top = '';
                element.style.left = '';
                element.style.width = '';
                element.classList.remove('ie11-sticky-active');
            }
        }
    }

    // Object-fit polyfill for IE11
    function applyObjectFitPolyfill() {
        var images = document.querySelectorAll('img[class*="object-"]');
        
        for (var i = 0; i < images.length; i++) {
            var img = images[i];
            var parent = img.parentNode;
            
            if (img.classList.contains('object-cover') || img.classList.contains('object-contain')) {
                // Create a wrapper div
                var wrapper = document.createElement('div');
                wrapper.style.width = '100%';
                wrapper.style.height = '100%';
                wrapper.style.backgroundImage = 'url(' + img.src + ')';
                wrapper.style.backgroundSize = img.classList.contains('object-cover') ? 'cover' : 'contain';
                wrapper.style.backgroundPosition = 'center';
                wrapper.style.backgroundRepeat = 'no-repeat';
                
                // Hide the original image and insert wrapper
                img.style.display = 'none';
                parent.insertBefore(wrapper, img);
            }
        }
    }

    // CSS Grid fallback for IE11
    function applyGridFallback() {
        var gridContainers = document.querySelectorAll('.grid, .products-grid');
        
        for (var i = 0; i < gridContainers.length; i++) {
            var container = gridContainers[i];
            var children = container.children;
            
            // Add flexbox fallback
            container.style.display = 'flex';
            container.style.flexWrap = 'wrap';
            
            // Calculate item width based on grid columns
            var columns = 1;
            if (window.innerWidth >= 1024) {
                columns = container.classList.contains('grid-cols-4') ? 4 :
                         container.classList.contains('grid-cols-3') ? 3 : 2;
            } else if (window.innerWidth >= 768) {
                columns = container.classList.contains('grid-cols-1') ? 1 : 2;
            }
            
            var itemWidth = (100 / columns) + '%';
            
            for (var j = 0; j < children.length; j++) {
                children[j].style.width = 'calc(' + itemWidth + ' - 1rem)';
                children[j].style.margin = '0.5rem';
            }
        }
    }

    // Gap property fallback for IE11 flexbox
    function applyGapFallback() {
        var flexContainers = document.querySelectorAll('.flex[class*="gap-"], .flex .gap-');
        
        for (var i = 0; i < flexContainers.length; i++) {
            var container = flexContainers[i];
            var children = container.children;
            var gapClass = container.className.match(/gap-(\d+)/);
            
            if (gapClass) {
                var gap = parseInt(gapClass[1]) * 0.25; // Convert to rem
                
                for (var j = 0; j < children.length; j++) {
                    if (j > 0) {
                        children[j].style.marginLeft = gap + 'rem';
                    }
                }
            }
        }
    }

    // Initialize polyfills when DOM is ready
    function initializeIE11Polyfills() {
        applyStickyPolyfill();
        applyObjectFitPolyfill();
        applyGridFallback();
        applyGapFallback();
        
        // Add body padding for fixed header
        document.body.style.paddingTop = '80px';
    }

    // Event listeners
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeIE11Polyfills);
    } else {
        initializeIE11Polyfills();
    }

    // Re-apply on scroll for sticky elements
    window.addEventListener('scroll', applyStickyPolyfill);
    
    // Re-apply on resize for responsive grid
    window.addEventListener('resize', function() {
        applyGridFallback();
        applyGapFallback();
    });

    // Console polyfill for IE11 (basic)
    if (!window.console) {
        window.console = {
            log: function() {},
            warn: function() {},
            error: function() {},
            info: function() {}
        };
    }

    // CustomEvent polyfill for IE11
    if (typeof window.CustomEvent !== 'function') {
        function CustomEvent(event, params) {
            params = params || { bubbles: false, cancelable: false, detail: undefined };
            var evt = document.createEvent('CustomEvent');
            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
            return evt;
        }
        CustomEvent.prototype = window.Event.prototype;
        window.CustomEvent = CustomEvent;
    }

    // Add CSS for IE11 specific fixes
    var ieStyle = document.createElement('style');
    ieStyle.textContent = `
        /* IE11 specific fixes */
        .ie11 .grid {
            display: flex !important;
            flex-wrap: wrap;
        }
        
        .ie11 .backdrop-filter,
        .ie11 header {
            background-color: rgba(255, 255, 255, 0.95) !important;
        }
        
        .ie11 .glass-effect {
            background-color: rgba(255, 255, 255, 0.9) !important;
        }
        
        .ie11 .text-gradient {
            color: var(--primary-color) !important;
            background: none !important;
        }
        
        .ie11 .consent-modal {
            transform: scale(0.8) !important;
        }
        
        .ie11 .w-fit {
            width: auto !important;
        }
        
        .ie11 .sticky {
            position: relative !important;
        }
        
        .ie11 .ie11-sticky-active {
            position: fixed !important;
            z-index: 1000 !important;
        }
    `;
    document.head.appendChild(ieStyle);

})();
