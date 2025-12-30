function upperCase() {
    var input = document.getElementById("latin").innerHTML;
    input = input.toUpperCase();
    document.getElementById("latin").innerHTML = input;
    document.getElementById("latin").style.color = '#088030ff';
}