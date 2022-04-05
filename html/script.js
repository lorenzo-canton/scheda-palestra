const template_esercizio = document.getElementById('tema')

function getEsercizi() {
    fetch('/esercizi')
    .then(data => data.json())
    .then(data => {
        data.forEach(esercizio => {
            let html = '<fieldset id="tema">' +
                            '<legend id="nome">' + esercizio.nome + '</legend>' +
                            '<p>' + esercizio.descrizione + '</p>' +
                            '<table>' +
                                '<tr>' +
                                    '<th>' +
                                        'Num' +
                                    '</th>' +
                                    '<th>' +
                                        'Cedimento' +
                                    '</th>' +
                                '</tr>';
            fetch('/serie?id=' + esercizio.id)
            .then(data => data.json())
            .then(data => {
                data.forEach(serie => {
                    html += '<tr>' +
                                '<td>' + serie.numero + '</td>' +
                                '<td>' + (serie.cedimento ? serie.cedimento : '') + '</td>' +
                            '</tr>'
                })
                html += '</table>' +'</fieldset>';
                document.getElementById('main').innerHTML += html;
            })
        });
    })
}

getEsercizi()