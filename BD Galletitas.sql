create database Galletitas;
use Galletitas;

Create table Empleado(
ID int primary key,
NombreCompleto varchar(30),
Rol varchar(30),
Telefono int,
Correo varchar(30)
);

create table Cliente(
ID int primary key,
NombreCompleto varchar(30),
Telefono int,
Correo varchar(30)
);

create table Camion(
ID int primary key,
EmpleadoID int,
foreign key (EmpleadoID) references Empleado(ID)
);

create table Producto(
ID int primary key,
Precio decimal
);

create table Pedido(
ID int primary key,
ClienteID int,
ProductoID int,
Estado varchar(30),
Cantidad varchar(30),
Fecha date,
CalificacionCliente varchar(30),
CamionID int,
foreign key(ClienteID) references Cliente(ID),
foreign key(ProductoID) references Producto(ID),
foreign key(CamionID) references Camion(ID)
);

create table Encuesta(
ID int primary key,
EmpleadoID int,
ClienteID int,
PedidoID int,
Satisfaccion int
);