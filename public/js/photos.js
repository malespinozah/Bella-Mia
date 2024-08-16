window.onload = function () {

    // Array of image URLs
    var images = [
        'url(/images/necklaceGold1.jpg)',
        'url(/images/necklacePearl1.jpg)',
        'url(/images/necklacePearl2.jpg)',
        'url(/images/necklaceGold2.jpg)',
        'url(/images/earringsGold1.jpg)',
        'url(/images/earringsGold2.jpg)',
        'url(/images/earringsPearl.jpg)',
        'url(/images/earringsGold3.jpg)',
        'url(/images/ringGold1.jpg)',
        'url(/images/ringPearl.jpg)',
        'url(/images/ringGold2.jpg)',
        'url(/images/ringGold3.jpg)',
        'url(/images/ankletPearl.jpg)',
        'url(/images/ankletGold1.jpg)',
        'url(/images/ankletGold2.jpg)',
        'url(/images/ankletGold3.jpg)',   
        'url(/images/necklacePearlNew.jpg)',  
    ];
            
    // Selecting all elements with the class name 'item-img'
    var cImages = document.getElementsByClassName('item-img');
    
    // Looping through each element and assign a background image from the array
    for (var i = 0; i < cImages.length; i++) {
        // Make sure the index is within the bounds of the images array
        if (i < images.length) {
            cImages[i].style.backgroundImage = images[i];
        }
    }
};
