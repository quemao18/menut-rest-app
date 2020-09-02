
$(document).on('click', '.update, .logo', function() {
    console.log('reload');
    // window.location.reload(true);
    window.location.href = window.location.href;      
});