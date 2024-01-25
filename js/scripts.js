document.addEventListener('DOMContentLoaded', function () {
    let listItems = document.querySelectorAll('.list-unstyled li a');
    let sections = Array.from(listItems).map(item => document.querySelector(item.getAttribute('href')));
    let isScrollingToTarget = false;
    listItems.forEach(function (item) {
        item.addEventListener('click', function (e) {
            // Remove 'active' class from all list items
            listItems.forEach(function (item) {
                item.parentElement.classList.remove('active');
            });
            // Add 'active' class to the clicked item
            this.parentElement.classList.add('active');

            // Prevent the default action
            e.preventDefault();

            // Get the target element
            let target = document.querySelector(this.getAttribute('href'));

            // Set the flag to indicate that the page is scrolling to a target element
            isScrollingToTarget = true;

            // Scroll to the target element
            window.scrollTo({
                top: target.offsetTop - navbarHeight,
                behavior: 'smooth'
            });

            // Set the flag back to false after the page has finished scrolling to the target element
            setTimeout(function () {
                isScrollingToTarget = false;
            }, 1000); // adjust this value as needed
        });
    });

    var navbar = document.querySelector('.navbar');
    var toc = document.querySelector('.position-sticky');
    var navbarHeight = navbar.getBoundingClientRect().height;

    window.addEventListener('scroll', function () {
        var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollPosition > navbarHeight) {
            toc.style.top = navbarHeight + 'px'; // adjust this value as needed
        } else {
            toc.style.top = '2rem';
        }

        // Highlight the corresponding table of contents link
        if (!isScrollingToTarget) {
            sections.forEach((section, index) => {
                let rect = section.getBoundingClientRect();
                if (rect.top <= navbarHeight + 100 && rect.bottom > navbarHeight) { // adjust this value as needed
                    listItems.forEach(item => item.parentElement.classList.remove('active'));
                    listItems[index].parentElement.classList.add('active');
                }
            });
        }
    });
});