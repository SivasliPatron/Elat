// Oil Guide JavaScript with API integration structure

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const vehicleTypeSelect = document.getElementById('vehicleType');
    const manufacturerSelect = document.getElementById('manufacturer');
    const modelSelect = document.getElementById('model');
    const yearSelect = document.getElementById('year');
    const engineTypeSelect = document.getElementById('engineType');
    const hsnInput = document.getElementById('hsn');
    const tsnInput = document.getElementById('tsn');
    const oilFinderForm = document.getElementById('oilFinderForm');
    const oilResults = document.getElementById('oilResults');
    const findOilBtn = document.getElementById('findOilBtn');
    
    // API endpoint base URL - replace with your actual API endpoint
    const API_BASE_URL = 'https://api.example.com/oil-finder';
    
    // Event Listeners
    vehicleTypeSelect.addEventListener('change', function() {
        resetSelect(manufacturerSelect, 'Bitte Hersteller wählen');
        resetSelect(modelSelect, 'Bitte zuerst Hersteller wählen', true);
        resetSelect(yearSelect, 'Bitte zuerst Modell wählen', true);
        resetSelect(engineTypeSelect, 'Bitte zuerst Baujahr wählen', true);
        
        if (this.value) {
            manufacturerSelect.disabled = false;
            fetchManufacturers(this.value);
        } else {
            manufacturerSelect.disabled = true;
        }
    });
    
    manufacturerSelect.addEventListener('change', function() {
        resetSelect(modelSelect, 'Bitte Modell wählen');
        resetSelect(yearSelect, 'Bitte zuerst Modell wählen', true);
        resetSelect(engineTypeSelect, 'Bitte zuerst Baujahr wählen', true);
        
        if (this.value) {
            modelSelect.disabled = false;
            fetchModels(vehicleTypeSelect.value, this.value);
        } else {
            modelSelect.disabled = true;
        }
    });
    
    modelSelect.addEventListener('change', function() {
        resetSelect(yearSelect, 'Bitte Baujahr wählen');
        resetSelect(engineTypeSelect, 'Bitte zuerst Baujahr wählen', true);
        
        if (this.value) {
            yearSelect.disabled = false;
            fetchYears(vehicleTypeSelect.value, manufacturerSelect.value, this.value);
        } else {
            yearSelect.disabled = true;
        }
    });
    
    yearSelect.addEventListener('change', function() {
        resetSelect(engineTypeSelect, 'Bitte Motor wählen');
        
        if (this.value) {
            engineTypeSelect.disabled = false;
            fetchEngineTypes(vehicleTypeSelect.value, manufacturerSelect.value, modelSelect.value, this.value);
        } else {
            engineTypeSelect.disabled = true;
        }
    });

    // HSN/TSN Event Listeners
    hsnInput.addEventListener('input', function() {
        // Auto-format HSN (only numbers, max 4 digits)
        this.value = this.value.replace(/[^0-9]/g, '').substring(0, 4);
        checkHsnTsnInputs();
    });

    tsnInput.addEventListener('input', function() {
        // Auto-format TSN (uppercase letters and numbers, max 3 characters)
        this.value = this.value.replace(/[^A-Z0-9]/gi, '').toUpperCase().substring(0, 3);
        checkHsnTsnInputs();
    });

    // Clear HSN/TSN when normal form is used
    [vehicleTypeSelect, manufacturerSelect, modelSelect, yearSelect, engineTypeSelect].forEach(select => {
        select.addEventListener('change', function() {
            if (this.value) {
                clearHsnTsn();
            }
        });
    });
    
    oilFinderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        findOil();
    });
    
    // API Functions
    async function fetchManufacturers(vehicleType) {
        showLoading(manufacturerSelect);
        
        try {
            // When you implement the real API, uncomment the code below
            /*
            const response = await fetch(`${API_BASE_URL}/manufacturers?vehicleType=${vehicleType}`);
            const data = await response.json();
            
            if (data.success) {
                populateSelect(manufacturerSelect, data.manufacturers);
            } else {
                showError("Fehler beim Laden der Hersteller");
            }
            */
            
            // Mock data for development - replace with actual API call
            setTimeout(() => {
                const mockManufacturers = getMockManufacturers(vehicleType);
                populateSelect(manufacturerSelect, mockManufacturers);
            }, 500);
        } catch (error) {
            console.error('Error fetching manufacturers:', error);
            showError("Fehler beim Laden der Hersteller");
        }
    }
    
    async function fetchModels(vehicleType, manufacturer) {
        showLoading(modelSelect);
        
        try {
            // When you implement the real API, uncomment the code below
            /*
            const response = await fetch(`${API_BASE_URL}/models?vehicleType=${vehicleType}&manufacturer=${manufacturer}`);
            const data = await response.json();
            
            if (data.success) {
                populateSelect(modelSelect, data.models);
            } else {
                showError("Fehler beim Laden der Modelle");
            }
            */
            
            // Mock data for development - replace with actual API call
            setTimeout(() => {
                const mockModels = getMockModels(vehicleType, manufacturer);
                populateSelect(modelSelect, mockModels);
            }, 500);
        } catch (error) {
            console.error('Error fetching models:', error);
            showError("Fehler beim Laden der Modelle");
        }
    }
    
    async function fetchYears(vehicleType, manufacturer, model) {
        showLoading(yearSelect);
        
        try {
            // When you implement the real API, uncomment the code below
            /*
            const response = await fetch(`${API_BASE_URL}/years?vehicleType=${vehicleType}&manufacturer=${manufacturer}&model=${model}`);
            const data = await response.json();
            
            if (data.success) {
                populateSelect(yearSelect, data.years);
            } else {
                showError("Fehler beim Laden der Baujahre");
            }
            */
            
            // Mock data for development - replace with actual API call
            setTimeout(() => {
                const mockYears = getMockYears(vehicleType, manufacturer, model);
                populateSelect(yearSelect, mockYears);
            }, 500);
        } catch (error) {
            console.error('Error fetching years:', error);
            showError("Fehler beim Laden der Baujahre");
        }
    }
    
    async function fetchEngineTypes(vehicleType, manufacturer, model, year) {
        showLoading(engineTypeSelect);
        
        try {
            // When you implement the real API, uncomment the code below
            /*
            const response = await fetch(`${API_BASE_URL}/engine-types?vehicleType=${vehicleType}&manufacturer=${manufacturer}&model=${model}&year=${year}`);
            const data = await response.json();
            
            if (data.success) {
                populateSelect(engineTypeSelect, data.engineTypes);
            } else {
                showError("Fehler beim Laden der Motoren");
            }
            */
            
            // Mock data for development - replace with actual API call
            setTimeout(() => {
                const mockEngineTypes = getMockEngineTypes(vehicleType, manufacturer, model, year);
                populateSelect(engineTypeSelect, mockEngineTypes);
            }, 500);
        } catch (error) {
            console.error('Error fetching engine types:', error);
            showError("Fehler beim Laden der Motoren");
        }
    }
    
    async function findOil() {
        const vehicleType = vehicleTypeSelect.value;
        const manufacturer = manufacturerSelect.value;
        const model = modelSelect.value;
        const year = yearSelect.value;
        const engineType = engineTypeSelect.value;
        const hsn = hsnInput.value.trim();
        const tsn = tsnInput.value.trim();
        
        // Check if HSN/TSN search is being used
        const isHsnTsnSearch = hsn && tsn;
        const isNormalSearch = vehicleType && manufacturer && model && year && engineType;
        
        // Validierung beibehalten, aber Ölwegweiser zeigt trotzdem alle Produkte an
        if (isHsnTsnSearch && !validateHsnTsn(hsn, tsn)) {
            return; // Fehlermeldung wird in validateHsnTsn angezeigt
        }
        
        showResultsLoading();
        
        try {
            // Produkte direkt aus produkte.html einlesen und anzeigen
            const products = await loadAllProductsFromProduktePage();
            displayOilResults(products);
        } catch (error) {
            console.error('Error finding oil:', error);
            showError("Fehler bei der Suche nach Ölempfehlungen");
        }
    }
    
    // Helper Functions
    function resetSelect(selectElement, placeholder, disabled = false) {
        selectElement.innerHTML = '';
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = placeholder;
        selectElement.appendChild(defaultOption);
        selectElement.disabled = disabled;
    }
    
    function populateSelect(selectElement, options) {
        selectElement.innerHTML = '';
        
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Bitte wählen';
        selectElement.appendChild(defaultOption);
        
        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.value || option.id || option;
            optionElement.textContent = option.label || option.name || option;
            selectElement.appendChild(optionElement);
        });
        
        selectElement.disabled = false;
    }
    
    function showLoading(selectElement) {
        resetSelect(selectElement, 'Wird geladen...');
        selectElement.disabled = true;
    }
    
    function showResultsLoading() {
        oilResults.innerHTML = `
            <div class="col-span-full flex justify-center items-center py-12">
                <div class="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                    <span class="sr-only">Lädt...</span>
                </div>
            </div>
        `;
    }
    
    function showError(message) {
        oilResults.innerHTML = `
            <div class="col-span-full text-center py-12">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto mb-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="text-lg text-gray-700">${message}</p>
            </div>
        `;
    }
    
    function displayOilResults(recommendations) {
        // Handle different response formats (array vs object with metadata)
        let oils = [];
        let vehicleInfo = null;
        let searchMethod = null;

        if (Array.isArray(recommendations)) {
            // Old format - just array of oils
            oils = recommendations;
        } else if (recommendations && recommendations.oils) {
            // New format with metadata
            oils = recommendations.oils;
            vehicleInfo = recommendations.vehicleInfo;
            searchMethod = recommendations.searchMethod;
        }

        if (!oils || oils.length === 0) {
            oilResults.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <p class="text-lg text-gray-500">Keine passenden Ölprodukte gefunden. Bitte kontaktieren Sie unseren Kundenservice für weitere Hilfe.</p>
                </div>
            `;
            return;
        }
        
        let resultsHTML = '';

        // Add vehicle info header if available (for HSN/TSN searches)
        if (vehicleInfo && searchMethod) {
            resultsHTML += `
                <div class="col-span-full mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                        </svg>
                        <div>
                            <p class="font-medium text-blue-800">Gefundenes Fahrzeug:</p>
                            <p class="text-blue-700">${vehicleInfo}</p>
                            <p class="text-xs text-blue-600 mt-1">Suche via ${searchMethod}</p>
                        </div>
                    </div>
                </div>
            `;
        }
        
        oils.forEach(oil => {
            const hasViscosity = !!oil.viscosity;
            const hasSpecification = !!oil.specification;
            const hasVolume = !!oil.volume;
            const detailsHref = oil.detailUrl || `produkte.html#${oil.id || ''}`;
            resultsHTML += `
                <div class="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 transform hover:scale-[1.02]">
                    <div class="p-4 bg-gray-50 flex items-center justify-center h-48">
                        <img src="${oil.imageUrl || '../bilder/Elat Logo.png'}" alt="${oil.name}" class="max-h-40 max-w-full object-contain">
                    </div>
                    <div class="p-5">
                        <h3 class="text-xl font-bold text-gray-800 mb-3">${oil.name}</h3>
                        <div class="space-y-2 mb-4">
                            ${hasViscosity ? `
                            <div class="flex justify-between text-sm">
                                <span class="font-medium text-gray-600">Viskosität:</span>
                                <span class="text-gray-800">${oil.viscosity}</span>
                            </div>` : ''}
                            ${hasSpecification ? `
                            <div class="flex justify-between text-sm">
                                <span class="font-medium text-gray-600">Spezifikation:</span>
                                <span class="text-gray-800">${oil.specification}</span>
                            </div>` : ''}
                            ${hasVolume ? `
                            <div class="flex justify-between text-sm">
                                <span class="font-medium text-gray-600">Füllmenge:</span>
                                <span class="text-gray-800">${oil.volume}</span>
                            </div>` : ''}
                        </div>
                        <p class="text-gray-600 mb-5 text-sm">${oil.description}</p>
                        <div class="flex justify-end items-center">
                            <button onclick="window.location.href='${'produkte.html'}'" class="bg-primary hover:bg-secondary text-white px-4 py-2 rounded transition duration-300 text-sm font-medium">
                                Details
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
        
        oilResults.innerHTML = resultsHTML;
    }
    
    // Mock Data Functions - Replace these with actual API calls when ready
    function getMockManufacturers(vehicleType) {
        const manufacturers = {
            car: ['Audi', 'BMW', 'Ford', 'Mercedes-Benz', 'Opel', 'Volkswagen'],
            truck: ['DAF', 'MAN', 'Mercedes-Benz', 'Scania', 'Volvo'],
            motorcycle: ['BMW', 'Ducati', 'Harley-Davidson', 'Honda', 'Kawasaki', 'Yamaha'],
            agriculture: ['Case IH', 'Claas', 'John Deere', 'New Holland'],
            construction: ['Caterpillar', 'JCB', 'Komatsu', 'Liebherr']
        };
        
        return manufacturers[vehicleType] || [];
    }
    
    function getMockModels(vehicleType, manufacturer) {
        // This is a simplified mock implementation
        // In a real application, models would depend on both vehicleType and manufacturer
        const models = {
            'Audi': ['A1', 'A3', 'A4', 'A6', 'Q3', 'Q5'],
            'BMW': ['1er', '3er', '5er', 'X1', 'X3', 'X5'],
            'Mercedes-Benz': ['A-Klasse', 'C-Klasse', 'E-Klasse', 'S-Klasse', 'GLA', 'GLC'],
            'Volkswagen': ['Golf', 'Passat', 'Polo', 'Tiguan', 'T-Roc', 'ID.3'],
            'DAF': ['CF', 'LF', 'XF'],
            'MAN': ['TGX', 'TGS', 'TGM', 'TGL'],
            'Ducati': ['Diavel', 'Monster', 'Panigale', 'Scrambler'],
            'Honda': ['Africa Twin', 'CB500', 'CBR1000RR', 'Gold Wing'],
            'John Deere': ['5M', '6M', '7R', '8R', '9R'],
            'Caterpillar': ['D6', 'D8', '320', '336', '950']
        };
        
        return models[manufacturer] || [];
    }
    
    function getMockYears(vehicleType, manufacturer, model) {
        // Generate years from 2010 to current year
        const currentYear = new Date().getFullYear();
        const years = [];
        
        for (let year = 2010; year <= currentYear; year++) {
            years.push(year.toString());
        }
        
        return years;
    }
    
    function getMockEngineTypes(vehicleType, manufacturer, model, year) {
        // This is a simplified mock implementation
        const engineTypes = {
            'car': ['1.0 TSI 95 PS', '1.4 TSI 125 PS', '1.6 TDI 115 PS', '2.0 TDI 150 PS', '2.0 TSI 190 PS'],
            'truck': ['MX-11 330 HP', 'MX-13 428 HP', 'D2676 510 HP', 'OM 471 530 HP'],
            'motorcycle': ['998cc 207 HP', '1103cc 162 HP', '1262cc 158 HP'],
            'agriculture': ['4.5L PowerTech 125 HP', '6.8L PowerTech 155 HP', '9.0L PowerTech 300 HP'],
            'construction': ['C9.3 340 HP', 'C13 430 HP', 'C15 580 HP']
        };
        
        return engineTypes[vehicleType] || [];
    }
    
    function getMockOilRecommendations(vehicleType, manufacturer, model, year, engineType) {
        // Nicht mehr genutzt – Empfehlungen kommen aus produkte.html
        return [];
    }

    // HSN/TSN Helper Functions
    function validateHsnTsn(hsn, tsn) {
        // Validate HSN (4 digits)
        if (!hsn || hsn.length !== 4 || !/^\d{4}$/.test(hsn)) {
            showError("HSN muss genau 4 Ziffern enthalten (z.B. 0588)");
            return false;
        }
        
        // Validate TSN (3 alphanumeric characters)
        if (!tsn || tsn.length !== 3 || !/^[A-Z0-9]{3}$/.test(tsn)) {
            showError("TSN muss genau 3 Zeichen enthalten (z.B. AAA)");
            return false;
        }
        
        return true;
    }

    function checkHsnTsnInputs() {
        const hsn = hsnInput.value.trim();
        const tsn = tsnInput.value.trim();
        
        // If HSN/TSN is being filled, disable normal form
        if (hsn || tsn) {
            disableNormalForm();
        } else {
            enableNormalForm();
        }
    }

    function disableNormalForm() {
        [vehicleTypeSelect, manufacturerSelect, modelSelect, yearSelect, engineTypeSelect].forEach(select => {
            select.disabled = true;
            select.value = '';
        });
    }

    function enableNormalForm() {
        vehicleTypeSelect.disabled = false;
        // Others will be enabled through normal flow
    }

    function clearHsnTsn() {
        hsnInput.value = '';
        tsnInput.value = '';
        enableNormalForm();
    }

    function getMockOilRecommendationsByHsnTsn(hsn, tsn) {
        // Nicht mehr genutzt – Empfehlungen kommen aus produkte.html
        return { success: true, oils: [] };
    }

    // Produkte aus produkte.html laden und in Karten umwandeln
    let __cachedAllProducts = null;
    async function loadAllProductsFromProduktePage() {
        if (__cachedAllProducts) return __cachedAllProducts;
        try {
            const response = await fetch('produkte.html', { 
                cache: 'no-store',
                headers: {
                    'Cache-Control': 'no-cache, no-store, must-revalidate'
                }
            });
            if (!response.ok) throw new Error('HTTP ' + response.status);
            const html = await response.text();
            const products = extractProductsFromHTML(html);
            __cachedAllProducts = products;
            return products;
        } catch (err) {
            console.error('Produkte konnten nicht geladen werden:', err);
            showError('Produkte konnten nicht geladen werden. Bitte versuchen Sie es später erneut.');
            return [];
        }
    }

    function extractProductsFromHTML(html) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const items = Array.from(doc.querySelectorAll('.product-item'));
        const products = items.map((el, idx) => {
            const titleLink = el.querySelector('h3 a');
            const name = titleLink ? titleLink.textContent.trim() : `Produkt ${idx + 1}`;
            const detailUrl = titleLink ? titleLink.getAttribute('href') : 'produkte.html';
            const img = el.querySelector('img');
            const imageUrl = img ? img.getAttribute('src') : '../bilder/Elat Logo.png';
            const descNode = el.querySelector('p.text-sm.text-gray-700');
            const description = descNode ? descNode.textContent.trim() : '';
            const viscosityRaw = el.getAttribute('data-viscosity') || '';
            const viscosity = viscosityRaw ? viscosityRaw.replace(/-/g, '-').toUpperCase() : '';
            const specsRaw = el.getAttribute('data-specs') || '';
            const specList = specsRaw.split(',').map(s => s.trim()).filter(Boolean).slice(0, 3);
            const specification = specList.map(s => s.toUpperCase().replace(/-/g, ' ')).join(', ');
            const id = (name || detailUrl || `prod-${idx+1}`)
                .toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^a-z0-9\-]/g, '')
                .substring(0, 50);
            return { id, name, viscosity, specification, volume: '', description, imageUrl, detailUrl };
        });
        return products;
    }
});
