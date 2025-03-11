document.addEventListener('DOMContentLoaded', function() {
    const timeline = document.getElementById('experience-timeline');
    const entries = timeline.querySelectorAll('.timeline-container');
    
    // Apply timeline classes based on entry type
    function applyTimelineClasses() {
        if (entries.length > 0) {
            const firstEntryType = entries[0].getAttribute('data-type');
            
            entries.forEach((entry, index) => {
                const entryType = entry.getAttribute('data-type');
                
                // Remove any existing left/right classes first
                entry.classList.remove('left', 'right');
                
                // Add the appropriate class
                if (window.innerWidth <= 768) {
                    // For mobile: add right to all entries
                    entry.classList.add('right');
                } else {
                    // For desktop: alternate based on type
                    if (entryType === firstEntryType) {
                        entry.classList.add('left');
                    } else {
                        entry.classList.add('right');
                    }
                }
                
                // Calculate position for gradient color (added code)
                const totalEntries = entries.length;
                const position = totalEntries > 1 ? index / (totalEntries - 1) : 0;
                
                // Get computed primary and secondary colors
                const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
                const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color').trim();
                
                // Set dot color based on position in gradient
                if (primaryColor && secondaryColor) {
                    // For browsers that support color-mix
                    if (window.CSS && CSS.supports('color', 'color-mix(in srgb, red, blue)')) {
                        entry.style.setProperty('--dot-color', 
                            `color-mix(in srgb, ${primaryColor} ${(1-position)*100}%, ${secondaryColor} ${position*100}%)`);
                    } else {
                        // Fallback for browsers without color-mix support
                        // Simple approach: use primary for first half, secondary for second half
                        entry.style.setProperty('--dot-color', 
                            position < 0.5 ? primaryColor : secondaryColor);
                    }
                }
            });
        }
    }
    
    // Initial application
    applyTimelineClasses();
    
    // Reapply on window resize
    window.addEventListener('resize', applyTimelineClasses);
    
    // Navigation smooth scrolling
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Calculate offset for home section
                let offset = 0;
                if (targetId === 'home') {
                    offset = window.innerWidth <= 768 ? 60 : 80;
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - offset,
                    behavior: 'smooth'
                });
                
                // Prevent the hash from being added to the URL
                history.pushState('', document.title, window.location.pathname + window.location.search);
            }
            
            // Close mobile navigation if applicable
            if (window.innerWidth < 992) {
                const toggler = document.querySelector('.navbar-toggler');
                if (!toggler.classList.contains('collapsed')) {
                    toggler.click();
                }
            }
        });
    });
});