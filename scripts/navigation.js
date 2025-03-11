document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                let offset = targetId === 'home' ? (window.innerWidth <= 768 ? 60 : 80) : 0;

                window.scrollTo({
                    top: targetElement.offsetTop - offset,
                    behavior: 'smooth'
                });

                // Prevent the hash from appearing in the URL
                history.pushState('', document.title, window.location.pathname + window.location.search);
            }

            // Close mobile navbar if open
            if (window.innerWidth < 992) {
                const toggler = document.querySelector('.navbar-toggler');
                if (toggler && !toggler.classList.contains('collapsed')) {
                    toggler.click();
                }
            }
        });
    });
});
