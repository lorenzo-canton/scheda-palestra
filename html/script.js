function getEsercizi() {
    fetch('/data')
    .then(data => data.json())
    .then(data => {
        data.forEach(element => {
            console.log(element);
            document.getElementById('main').innerHTML += element.nome;
        });
    })
}
getEsercizi()