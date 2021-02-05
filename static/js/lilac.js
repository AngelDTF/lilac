var config;
var editing = null;
var selectedItem = null;

config = fetch('../../config.json').then(d => d.json().then(json =>
{
    config = json;

    document.querySelector('link#theme').href = `../css/themes/${config.appearance.theme}.css`;
    document.querySelector('#sidebar-actions').style.display = config.appearance.useActionBar ? '' : 'none';
}));

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
        setSelected(cat);
    });
});

document.querySelectorAll('.sidebar-explorer-item').forEach(item =>
{
    item.addEventListener('click', () =>
    {
        setSelected(item);
    });
});

if (editing == null)
{
    editing = document.querySelector('.sidebar-explorer-category[editorCategory="true"]');
    if (editing)
    {
        editing = editing.querySelector('.sidebar-explorer-item');
        if (editing)
            editing.setAttribute('editing', 'true');
        else
            editing = null;
    }
    else
        editing = null;
}

function setSelected(element)
{
    selectedItem = element;
    document.querySelectorAll('.sidebar-explorer-category, .sidebar-explorer-item').forEach(item =>
    {
        if (item == selectedItem)
            item.classList.add('item-selected');
        else
            item.classList.remove('item-selected');
    });
}