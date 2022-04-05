create table esercizio (
    id int auto_increment primary key,
    nome varchar(100) default '',
    descrizione varchar(1000)
);
create table serie (
    id int auto_increment primary key,
    esercizio int not null,
    numero int,
    foreign key (esercizio) references esercizio(id)
);
create table punto (
    serie int references serie(id),
    numero int,
    primary key(serie, numero)
);