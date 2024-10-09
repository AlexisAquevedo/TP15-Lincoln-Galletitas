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
Direccion varchar(30),
Telefono int(11),
Correo varchar(30)
);

create table Camion(
ID int primary key,
EmpleadoID int,
Calificacion int,
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
PuntoDeControlID int,
foreign key(ClienteID) references Cliente(ID),
foreign key(ProductoID) references Producto(ID),
foreign key(CamionID) references Camion(ID)
);

create table PuntoDeControl(
ID int primary key,
Revision varchar(50),
PedidoID int,
ClienteID int,
EmpleadoID int,
foreign key(PedidoID) references Pedido(ID),
foreign key(ClienteID) references Cliente(ID),
foreign key(EmpleadoID) references Empleado(ID)
);

create table Encuesta(
ID int primary key,
EmpleadoID int,
ClienteID int,
PedidoID int,
Satisfaccion int
);
