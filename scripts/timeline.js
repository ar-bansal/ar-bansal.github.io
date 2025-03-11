document.addEventListener('DOMContentLoaded', function() {
    const timeline = document.getElementById('experience-timeline');
    const entries = timeline.querySelectorAll('.timeline-container');

    function applyTimelineClasses() {
        if (entries.length > 0) {
            const firstEntryType = entries[0].getAttribute('data-type');

            entries.forEach((entry, index) => {
                const entryType = entry.getAttribute('data-type');

                // Remove any existing left/right classes
                entry.classList.remove('left', 'right');

                // Add the appropriate class based on screen size
                if (window.innerWidth <= 768) {
                    entry.classList.add('right');
                } else {
                    entry.classList.add(entryType === firstEntryType ? 'left' : 'right');
                }

                // Gradient color calculation
                const totalEntries = entries.length;
                const position = totalEntries > 1 ? index / (totalEntries - 1) : 0;

                // Get computed primary and secondary colors
                const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
                const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color').trim();

                if (primaryColor && secondaryColor) {
                    if (window.CSS && CSS.supports('color', 'color-mix(in srgb, red, blue)')) {
                        entry.style.setProperty('--dot-color', 
                            `color-mix(in srgb, ${primaryColor} ${(1 - position) * 100}%, ${secondaryColor} ${position * 100}%)`);
                    } else {
                        entry.style.setProperty('--dot-color', 
                            position < 0.5 ? primaryColor : secondaryColor);
                    }
                }
            });
        }
    }

    // Initial execution & reapply on resize
    applyTimelineClasses();
    window.addEventListener('resize', applyTimelineClasses);
});
