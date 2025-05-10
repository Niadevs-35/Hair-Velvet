document.addEventListener("DOMContentLoaded", function () {
    // Select all text-containing elements
    const content = document.getElementById('main-content');
    
    // Replace occurrences of the word 'cannot get' with an empty string
    content.innerHTML = content.innerHTML.replace(/cannot get/g, '');
});

