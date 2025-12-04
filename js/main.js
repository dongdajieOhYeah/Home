$(document).ready(function() {
    // Stop modal from triggering when clicking the App Store button on the card.
    $('.card .appstore-button').on('click', function(event) {
        event.stopPropagation();
    });
});
