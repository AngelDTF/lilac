function parseBool(string)
{
    if (string == 'false')
        return false;
    else if (string == 'true')
        return true;
    else
        throw 'Error: Can not parse invalid string as bool.';

}

document.querySelectorAll('.sidebar-explorer-category').forEach(cat =>
{
    cat.querySelector('.category-title').addEventListener('click', () =>
    {
        cat.setAttribute('collapsed', !parseBool(cat.getAttribute('collapsed')));
        cat.querySelector('.category-title .material-icons').innerText = parseBool(cat.getAttribute('collapsed')) ? 'chevron_right' : 'expand_more';
    });
});