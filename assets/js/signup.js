function submit(){

}

// Prevent the form from submitting
$('#form').submit(function (e) {
    e.preventDefault();
    submit();
});