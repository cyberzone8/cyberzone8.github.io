let colorGlobal;

document.addEventListener('keydown', function(event) {
    const keyDiv = document.getElementById("key");

    if (event.key === 'a') {
        colorGlobal = 'pink';
        keyDiv.style.backgroundColor = colorGlobal;
    } else if (event.key === 's') {
        colorGlobal = 'orange';
        keyDiv.style.backgroundColor = colorGlobal;
    } else if (event.key === 'd') {
        colorGlobal = 'skyblue';
        keyDiv.style.backgroundColor = colorGlobal;
    } else if (event.key === 'q') {
        createDiv('purple');
    } else if (event.key === 'w') {
        createDiv('gray');
    } else if (event.key === 'e') {
        createDiv('brown');
    }
});

function createDiv(color) {
    const newDiv = document.createElement('div');
    newDiv.style.width = '200px';
    newDiv.style.height = '200px';
    newDiv.style.backgroundColor = color;
    newDiv.style.border = '1px solid black';
    document.body.appendChild(newDiv);
}
