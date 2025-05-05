create database ServerDatabase;
use ServerDatabase;
create table Users (
   cpf varchar(14) primary key not null,
   nome varchar(50) not null,
   sobrenome varchar(100) not null,
   idade   int not null, 
   telefone varchar(15) not null,
   email varchar(100),
    sexo ENUM('Masculino', 'Feminino', 'Outro') NOT NULL DEFAULT 'Outro'
);

drop table Users;
drop table Veiculos;
 
insert into Users(cpf,nome,sobrenome,idade,telefone,email,sexo) values ('05357517100',"Lucas", "Laguilio",16, 67999770218, "LucasLaguilio@gmail.com", "outro" );

select * from Users;
select * from Veiculos;



create table Veiculos (

  placa varchar(8) primary key not null,
  modelo varchar(100) not null,
  marca varchar(100) not null,
  ano year not null,
  cor varchar(50) not null,
  tipo_veiculo ENUM('Carro', 'Moto', 'Caminhão') NOT NULL 
);


