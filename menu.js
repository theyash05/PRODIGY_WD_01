// menu.js: Interactive navigation menu with dynamic section add and color selection
window.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const navMenu = document.getElementById('nav-menu');
    const addBtn = document.getElementById('add-btn');
    const sectionInput = document.getElementById('section-input');
    const colorSelect = document.getElementById('color-select');

    // Load menu from localStorage
    function loadMenu() {
        const menuData = JSON.parse(localStorage.getItem('customMenu')) || [];
        menuData.forEach(item => {
            addMenuItem(item.name, item.color);
        });
    }

    // Add menu item with custom hover color and close icon
    function addMenuItem(name, color) {
        const li = document.createElement('li');
        li.className = 'nav-item';
        // Create a span for the text to allow spacing
        const textSpan = document.createElement('span');
        textSpan.textContent = name;
        textSpan.style.paddingRight = '22px'; // Add space for close icon
        li.appendChild(textSpan);
        li.setAttribute('data-hover-color', color);
        // Make menu item clickable and update URL hash
        li.addEventListener('click', function(e) {
            if (e.target.classList.contains('close-icon')) return;
            window.location.hash = name.toLowerCase().replace(/\s+/g, '-');
            window.location.reload();
        });
        // Create close icon
        const closeBtn = document.createElement('span');
        closeBtn.className = 'close-icon';
        closeBtn.innerHTML = '&times;';
        closeBtn.title = 'Remove section';
        closeBtn.style.display = 'none';
        closeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            removeMenuItem(name);
        });
        li.appendChild(closeBtn);
        // Show close icon on hover
        li.addEventListener('mouseenter', function() {
            li.style.background = color;
            li.style.color = '#fff';
            closeBtn.style.display = 'inline';
        });
        li.addEventListener('mouseleave', function() {
            li.style.background = '';
            li.style.color = '';
            closeBtn.style.display = 'none';
        });
        navMenu.appendChild(li);
    }

    // Remove menu item and update localStorage
    function removeMenuItem(name) {
        let menuData = JSON.parse(localStorage.getItem('customMenu')) || [];
        menuData = menuData.filter(item => item.name !== name);
        localStorage.setItem('customMenu', JSON.stringify(menuData));
        window.location.reload();
    }

    // Save menu to localStorage
    function saveMenu(menuData) {
        localStorage.setItem('customMenu', JSON.stringify(menuData));
    }

    // Handle Add button click
    if (addBtn) {
        addBtn.addEventListener('click', function() {
            const name = sectionInput.value.trim();
            const color = colorSelect.value;
            if (!name) return;
            // Save to localStorage
            const menuData = JSON.parse(localStorage.getItem('customMenu')) || [];
            menuData.push({ name, color });
            saveMenu(menuData);
            window.location.reload();
        });
    }

    // On page load, load custom menu
    loadMenu();

    // Navbar scroll effect (changes style when scrolled)
    window.addEventListener('scroll', function() {
        if (window.scrollY > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Add hover effect for default nav items (not custom)
    document.querySelectorAll('.nav-item').forEach(function(item) {
        if (!item.hasAttribute('data-hover-color')) {
            item.addEventListener('mouseenter', function() {
                item.style.background = '#fff';
                item.style.color = '#1e3c72';
            });
            item.addEventListener('mouseleave', function() {
                item.style.background = '';
                item.style.color = '';
            });
        }
    });

    // Make default nav items interactive
    document.querySelectorAll('.nav-item').forEach(function(item) {
        if (!item.hasAttribute('data-hover-color')) {
            item.addEventListener('click', function(e) {
                if (e.target.classList.contains('close-icon')) return;
                const name = item.textContent.trim();
                window.location.hash = name.toLowerCase().replace(/\s+/g, '-');
                window.location.reload();
            });
        }
    });
});
