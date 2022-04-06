const template_esercizio = document.getElementById('tema')

function getEsercizi() {
    fetch('/esercizi')
    .then(data => data.json())
    .then(data => {
        data.forEach(esercizio => {
            let html = '<fieldset id="tema">' +
                            '<legend id="nome">' + esercizio.nome + '</legend>' +
                            '<p>' + esercizio.descrizione + '</p>' +
                            '<form action="/addserie" method="POST">' +
                                '<input type="hidden" name="esercizio" value="' + esercizio.id + '">' +
                                '<label>Peso </label><input type="number" name="peso">' +
                                '<label> Rep </label><input type="number" name="numero">' +
                                '<input type="submit" value="Invia">' +
                            '</form>' +
                            '<table>' +
                                '<tr>' +
                                    '<th>' +
                                        'Kg' +
                                    '</th>' +
                                    '<th>' +
                                        'Rep' +
                                    '</th>' +
                                    '<th>' +
                                        'Failure' +
                                    '</th>' +
                                '</tr>';
            fetch('/serie?id=' + esercizio.id)
            .then(data => data.json())
            .then(data => {
                data.forEach(serie => {
                    html += '<tr>' +
                                '<td>' + serie.peso + '</td>' +
                                '<td>' + serie.numero + '</td>' +
                                '<td>' + (serie.cedimento ? serie.cedimento : '') + '</td>' +
                                '<td><form action="/addfail" method="POST">' +
                                '<input type="hidden" name="id" value="' + serie.id + '">' +
                                '<input type="number" name="fail"><input type="submit" value="set"></form></td>' +
                            '</tr>'
                })
                html += '</table>' +'</fieldset>';
                document.getElementById('main').innerHTML += html;
            })
        });
    })
}

getEsercizi()