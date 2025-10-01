// Zusätzliches JavaScript für die Toggle-Funktionalität der Filter
document.addEventListener('DOMContentLoaded', function() {
    // Toggle für Viskositäten
    const toggleViscosityButton = document.getElementById('toggle-viscosity');
    const additionalViscosity = document.getElementById('additional-viscosity');
    const toggleViscosityText = document.getElementById('toggle-viscosity-text');
    const toggleViscosityIcon = document.getElementById('toggle-viscosity-icon');
    
    if (toggleViscosityButton && additionalViscosity && toggleViscosityText && toggleViscosityIcon) {
        toggleViscosityButton.addEventListener('click', function() {
            if (additionalViscosity.classList.contains('hidden')) {
                // Mehr anzeigen
                additionalViscosity.classList.remove('hidden');
                toggleViscosityText.textContent = 'Weniger anzeigen';
                toggleViscosityIcon.classList.remove('fa-chevron-down');
                toggleViscosityIcon.classList.add('fa-chevron-up');
            } else {
                // Weniger anzeigen
                additionalViscosity.classList.add('hidden');
                toggleViscosityText.textContent = 'Mehr anzeigen';
                toggleViscosityIcon.classList.remove('fa-chevron-up');
                toggleViscosityIcon.classList.add('fa-chevron-down');
            }
        });
    }
    
    // Toggle für Spezifikationen
    const toggleSpecsButton = document.getElementById('toggle-specs');
    const additionalSpecs = document.getElementById('additional-specs');
    const toggleSpecsText = document.getElementById('toggle-specs-text');
    const toggleSpecsIcon = document.getElementById('toggle-specs-icon');
    
    if (toggleSpecsButton && additionalSpecs && toggleSpecsText && toggleSpecsIcon) {
        toggleSpecsButton.addEventListener('click', function() {
            if (additionalSpecs.classList.contains('hidden')) {
                // Mehr anzeigen
                additionalSpecs.classList.remove('hidden');
                toggleSpecsText.textContent = 'Weniger anzeigen';
                toggleSpecsIcon.classList.remove('fa-chevron-down');
                toggleSpecsIcon.classList.add('fa-chevron-up');
            } else {
                // Weniger anzeigen
                additionalSpecs.classList.add('hidden');
                toggleSpecsText.textContent = 'Mehr anzeigen';
                toggleSpecsIcon.classList.remove('fa-chevron-up');
                toggleSpecsIcon.classList.add('fa-chevron-down');
            }
        });
    }
});
