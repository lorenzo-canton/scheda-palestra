create table esercizio (
    id int auto_increment primary key,
    nome varchar(100) default '',
    descrizione varchar(1000)
);
create table serie (
    id int auto_increment primary key,
    esercizio int not null,
    numero varchar(100) not null,
    cedimento int,
    foreign key (esercizio) references esercizio(id)
);