// Produktfilterung, Suche und Paginierung mit Sidebar-Filtern
document.addEventListener('DOMContentLoaded', function() {
    // AOS nur initialisieren wenn funktionale Cookies akzeptiert sind
    // WICHTIG: Produktfunktionalität darf NICHT von AOS abhängen (DSGVO-konform)
    if (window.ConsentManager && window.ConsentManager.has('functional')) {
        if (window.AOS) {
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true,
                mirror: false
            });
        }
    }
    // Falls ConsentManager noch nicht verfügbar ist, später nochmal versuchen
    else if (!window.ConsentManager) {
        setTimeout(function() {
            if (window.ConsentManager && window.ConsentManager.has('functional') && window.AOS) {
                AOS.init({
                    duration: 800,
                    easing: 'ease-in-out',
                    once: true,
                    mirror: false
                });
            }
        }, 1000);
    }
    
    // Elemente auswählen
    const searchInput = document.getElementById('product-search');
    const searchClear = document.getElementById('search-clear');
    const searchResultsCount = document.getElementById('search-results-count');
    const resultsNumber = document.getElementById('results-number');
    const totalProductsSpan = document.getElementById('total-products');
    const noResultsDiv = document.getElementById('no-results');
    
    // Filter elements
    const categoryFilters = document.querySelectorAll('.category-filter');
    const viscosityFilters = document.querySelectorAll('.viscosity-filter');
    const specFilters = document.querySelectorAll('.spec-filter');
    const resetButton = document.getElementById('reset-filters');
    
    // Toggle specs elements
    const toggleSpecsButton = document.getElementById('toggle-specs');
    const additionalSpecs = document.getElementById('additional-specs');
    const toggleSpecsText = document.getElementById('toggle-specs-text');
    const toggleSpecsIcon = document.getElementById('toggle-specs-icon');
    
    // Toggle viscosity elements
    const toggleViscosityButton = document.getElementById('toggle-viscosity');
    const additionalViscosity = document.getElementById('additional-viscosity');
    const toggleViscosityText = document.getElementById('toggle-viscosity-text');
    const toggleViscosityIcon = document.getElementById('toggle-viscosity-icon');
    
    // Paginierung elements
    const paginationDiv = document.getElementById('pagination');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const pageNumbersDiv = document.getElementById('page-numbers');
    
    // Alle Produkteinträge abrufen
    const productItems = Array.from(document.querySelectorAll('.product-item'));
    
    // Paginierungsvariablen
    const itemsPerPage = 5;
    let currentPage = 1;
    let filteredProducts = [];

    // Persist/restore filter state across navigation
    const STORAGE_KEY = 'produkteFilterState';

    function saveFilterState() {
        try {
            const selectedCategory = document.querySelector('.category-filter:checked')?.value || 'all';
            const selectedViscosities = Array.from(document.querySelectorAll('.viscosity-filter:checked')).map(cb => cb.value);
            const selectedSpecs = Array.from(document.querySelectorAll('.spec-filter:checked')).map(cb => cb.value);
            const searchQuery = searchInput ? searchInput.value : '';
            const state = { selectedCategory, selectedViscosities, selectedSpecs, searchQuery };
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (e) {
            // ignore storage errors
        }
    }

    function restoreFilterState() {
        try {
            const raw = sessionStorage.getItem(STORAGE_KEY);
            if (!raw) return;
            const state = JSON.parse(raw);
            if (state && typeof state === 'object') {
                // Restore category
                if (state.selectedCategory) {
                    const catRadio = document.querySelector(`.category-filter[value="${state.selectedCategory}"]`);
                    if (catRadio) catRadio.checked = true;
                }
                // Restore viscosities
                if (Array.isArray(state.selectedViscosities)) {
                    document.querySelectorAll('.viscosity-filter').forEach(cb => {
                        cb.checked = state.selectedViscosities.includes(cb.value);
                    });
                }
                // Restore specs
                if (Array.isArray(state.selectedSpecs)) {
                    document.querySelectorAll('.spec-filter').forEach(cb => {
                        cb.checked = state.selectedSpecs.includes(cb.value);
                    });
                }
                // Restore search
                if (searchInput && typeof state.searchQuery === 'string') {
                    searchInput.value = state.searchQuery;
                }
            }
        } catch (e) {
            // ignore parse/storage errors
        }
    }
    
    function getFilteredProducts() {
        const searchQuery = searchInput ? searchInput.value.toLowerCase() : '';
        const selectedCategory = document.querySelector('.category-filter:checked')?.value || 'all';
        const selectedViscosities = Array.from(document.querySelectorAll('.viscosity-filter:checked')).map(cb => cb.value);
        const selectedSpecs = Array.from(document.querySelectorAll('.spec-filter:checked')).map(cb => cb.value);
        
        return productItems.filter(item => {
            // Search filter
            if (searchQuery) {
                const text = item.textContent.toLowerCase();
                if (!text.includes(searchQuery)) {
                    return false;
                }
            }

            // Category filter
            if (selectedCategory !== 'all') {
                const itemCategory = item.dataset.category;
                if (itemCategory !== selectedCategory) {
                    return false;
                }
            }

            // Viscosity filter
            if (selectedViscosities.length > 0) {
                const itemViscosity = item.dataset.viscosity;
                if (!selectedViscosities.includes(itemViscosity)) {
                    return false;
                }
            }

            // Specifications filter
            if (selectedSpecs.length > 0) {
                const itemSpecs = item.dataset.specs ? item.dataset.specs.split(',') : [];
                const hasMatchingSpec = selectedSpecs.some(spec => itemSpecs.includes(spec));
                if (!hasMatchingSpec) {
                    return false;
                }
            }

            return true;
        });
    }
    
    function displayProducts() {
        // Alle Produkte zunächst verstecken
        productItems.forEach(item => {
            item.style.display = 'none';
        });
        
        // Gefilterte Produkte für aktuelle Seite anzeigen
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const productsToShow = filteredProducts.slice(startIndex, endIndex);
        
        productsToShow.forEach(item => {
            item.style.display = 'block';
        });
        
        // Produktanzahl aktualisieren
        if (totalProductsSpan) {
            totalProductsSpan.textContent = filteredProducts.length;
        }
        
        // Keine Ergebnisse Meldung
        if (noResultsDiv) {
            if (filteredProducts.length === 0) {
                noResultsDiv.classList.remove('hidden');
                paginationDiv.style.display = 'none';
            } else {
                noResultsDiv.classList.add('hidden');
                paginationDiv.style.display = 'flex';
            }
        }
        
        updatePagination();
    }
    
    function updatePagination() {
        const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
        
        // Paginierung verstecken wenn nur eine Seite oder keine Ergebnisse
        if (totalPages <= 1) {
            paginationDiv.style.display = 'none';
            return;
        } else {
            paginationDiv.style.display = 'flex';
        }
        
        // Zurück-Button
        if (prevPageBtn) {
            prevPageBtn.disabled = currentPage === 1;
        }
        
        // Weiter-Button
        if (nextPageBtn) {
            nextPageBtn.disabled = currentPage === totalPages;
        }
        
        // Seitenzahlen
        if (pageNumbersDiv) {
            pageNumbersDiv.innerHTML = '';
            // Zeige nur ein Fenster von max. 4 Seitenzahlen (Sliding Window)
            const MAX_VISIBLE_PAGES = 4;
            // Fenster beginnt bei der aktuellen Seite und zeigt bis zu 4 Seiten
            let start = currentPage;
            let end = Math.min(totalPages, start + MAX_VISIBLE_PAGES - 1);
            // Wenn am Ende weniger als 4 sichtbar wären, nach links auffüllen
            if ((end - start + 1) < MAX_VISIBLE_PAGES) {
                start = Math.max(1, end - MAX_VISIBLE_PAGES + 1);
            }

            for (let i = start; i <= end; i++) {
                const pageBtn = document.createElement('button');
                pageBtn.textContent = i;
                pageBtn.className = 'page-number';
                
                if (i === currentPage) {
                    pageBtn.classList.add('active');
                }
                
                pageBtn.addEventListener('click', function() {
                    currentPage = i;
                    displayProducts();
                    scrollToTop();
                });
                
                pageNumbersDiv.appendChild(pageBtn);
            }
        }
    }
    
    function scrollToTop() {
        const produkteSection = document.getElementById('alle-produkte');
        if (produkteSection) {
            produkteSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    function filterProducts() {
        filteredProducts = getFilteredProducts();
        currentPage = 1; // Zurück zur ersten Seite bei neuer Filterung
        displayProducts();
        // Persist state after each filter update
        saveFilterState();
        
        // Search results counter
        const searchQuery = searchInput ? searchInput.value.toLowerCase() : '';
        if (searchInput && searchQuery) {
            if (searchClear) {
                searchClear.style.opacity = '1';
                searchClear.style.pointerEvents = 'auto';
            }
            if (searchResultsCount && resultsNumber) {
                resultsNumber.textContent = filteredProducts.length;
                searchResultsCount.classList.remove('hidden');
            }
        } else {
            if (searchClear) {
                searchClear.style.opacity = '0';
                searchClear.style.pointerEvents = 'none';
            }
            if (searchResultsCount) {
                searchResultsCount.classList.add('hidden');
            }
        }
    }

    // Event listeners
    if (searchInput) {
        searchInput.addEventListener('input', filterProducts);
    }

    // Search clear button
    if (searchClear) {
        searchClear.addEventListener('click', function() {
            if (searchInput) {
                searchInput.value = '';
            }
            filterProducts();
        });
        // Initially hide clear button
        searchClear.style.opacity = '0';
        searchClear.style.pointerEvents = 'none';
    }

    // Category filter listeners
    categoryFilters.forEach(filter => {
        filter.addEventListener('change', filterProducts);
    });

    // Viscosity filter listeners
    viscosityFilters.forEach(filter => {
        filter.addEventListener('change', filterProducts);
    });

    // Specifications filter listeners
    specFilters.forEach(filter => {
        filter.addEventListener('change', filterProducts);
    });

    // Reset filters
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            // Reset search
            if (searchInput) {
                searchInput.value = '';
            }
            
            // Reset category to "all"
            const allCategoryFilter = document.querySelector('.category-filter[value="all"]');
            if (allCategoryFilter) {
                allCategoryFilter.checked = true;
            }
            
            // Uncheck all other filters
            viscosityFilters.forEach(filter => {
                filter.checked = false;
            });
            
            specFilters.forEach(filter => {
                filter.checked = false;
            });
            
            // Refresh display
            filterProducts();

            // Clear persisted state
            try { sessionStorage.removeItem(STORAGE_KEY); } catch (e) {}
        });
    }

    // Toggle specifications visibility
    if (toggleSpecsButton && additionalSpecs && toggleSpecsText && toggleSpecsIcon) {
        toggleSpecsButton.addEventListener('click', function() {
            if (additionalSpecs.classList.contains('hidden')) {
                // Show additional specs
                additionalSpecs.classList.remove('hidden');
                toggleSpecsText.textContent = 'Weniger anzeigen';
                toggleSpecsIcon.classList.remove('fa-chevron-down');
                toggleSpecsIcon.classList.add('fa-chevron-up');
            } else {
                // Hide additional specs
                additionalSpecs.classList.add('hidden');
                toggleSpecsText.textContent = 'Mehr anzeigen';
                toggleSpecsIcon.classList.remove('fa-chevron-up');
                toggleSpecsIcon.classList.add('fa-chevron-down');
            }
        });
    }

    // Toggle viscosity visibility
    if (toggleViscosityButton && additionalViscosity && toggleViscosityText && toggleViscosityIcon) {
        toggleViscosityButton.addEventListener('click', function() {
            if (additionalViscosity.classList.contains('hidden')) {
                // Show additional viscosity options
                additionalViscosity.classList.remove('hidden');
                toggleViscosityText.textContent = 'Weniger anzeigen';
                toggleViscosityIcon.classList.remove('fa-chevron-down');
                toggleViscosityIcon.classList.add('fa-chevron-up');
            } else {
                // Hide additional viscosity options
                additionalViscosity.classList.add('hidden');
                toggleViscosityText.textContent = 'Mehr anzeigen';
                toggleViscosityIcon.classList.remove('fa-chevron-up');
                toggleViscosityIcon.classList.add('fa-chevron-down');
            }
        });
    }
    
    // Paginierung Event Listeners
    if (prevPageBtn) {
        prevPageBtn.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                displayProducts();
                scrollToTop();
            }
        });
    }
    
    if (nextPageBtn) {
        nextPageBtn.addEventListener('click', function() {
            const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                displayProducts();
                scrollToTop();
            }
        });
    }

    // Initial load: restore any saved state, then apply filters
    restoreFilterState();
    filterProducts();

    // Reapply filters when returning via browser back/forward (BFCache restore)
    // Ensures the visible products match the currently selected filters
    window.addEventListener('pageshow', function(event) {
        // On BFCache restore or history navigation, ensure state is restored and applied
        restoreFilterState();
        filterProducts();
    });
});
