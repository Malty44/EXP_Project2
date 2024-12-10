window.addEventListener('scroll', function() {
    const nextButton = document.querySelector('.next_button');
    
    // Check if scrolled to the bottom of the page
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        nextButton.style.display = 'block';
    } else {
        nextButton.style.display = 'none';
    }
});