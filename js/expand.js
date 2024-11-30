// Show or hide a section within a page, when the arrow symbol is clicked
function expand(elem)
{
    arr = document.getElementById(elem + "_arr");
    elem_alt = document.getElementById(elem + "_alt");
    elem = document.getElementById(elem);

    if (elem.style.display == 'none') {
        elem_alt.style.display = 'none';
        elem.style.display = 'block';
        arr.innerHTML = "&#128316;";
    } else {
        elem_alt.style.display = 'block';
        elem.style.display = 'none';
        arr.innerHTML = "&#128317;";
    }
}