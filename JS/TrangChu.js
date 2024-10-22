let currentIndex = 0;
const carousel = document.querySelector('.carousel');
const items = document.querySelectorAll('.carousel-item');
const totalItems = items.length;
const itemsPerRow = 5; // Number of items per row

// Clone all items to create an infinite loop effect
items.forEach(item => {
    const clone = item.cloneNode(true);
    carousel.appendChild(clone);
});

// Function to move to the next slide
function nextItems() {
    currentIndex++;
    const translateXValue = -(currentIndex * 100 / itemsPerRow);
    carousel.style.transition = 'transform 0.5s ease-in-out';
    carousel.style.transform = `translateX(${translateXValue}%)`;

    // Reset to the first set of items without transition for infinite loop effect
    if (currentIndex >= totalItems) {
        setTimeout(() => {
            carousel.style.transition = 'none';
            currentIndex = 0;
            carousel.style.transform = `translateX(0%)`;
        }, 500); // Match the transition duration (0.5s)
    }
}

// Function to move to the previous slide
function prevItems() {
    if (currentIndex === 0) {
        carousel.style.transition = 'none';
        currentIndex = totalItems;
        const translateXValue = -(currentIndex * 100 / itemsPerRow);
        carousel.style.transform = `translateX(${translateXValue}%)`;
        setTimeout(() => {
            carousel.style.transition = 'transform 0.5s ease-in-out';
            currentIndex--;
            carousel.style.transform = `translateX(${-(currentIndex * 100 / itemsPerRow)}%)`;
        }, 20);
    } else {
        currentIndex--;
        const translateXValue = -(currentIndex * 100 / itemsPerRow);
        carousel.style.transition = 'transform 0.5s ease-in-out';
        carousel.style.transform = `translateX(${translateXValue}%)`;
    }
}

// Add event listeners for next/prev buttons
document.getElementById('next').addEventListener('click', nextItems);
document.getElementById('prev').addEventListener('click', prevItems);

// Auto-slide every 5 seconds
setInterval(nextItems, 5000);

// Initial display
carousel.style.transform = `translateX(0%)`;
