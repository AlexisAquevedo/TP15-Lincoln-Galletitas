drop database if exists Galletitas;
CREATE DATABASE Galletitas;
USE Galletitas;

CREATE TABLE Empleado (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    NombreCompleto VARCHAR(50),
    Rol VARCHAR(50),
    Telefono VARCHAR(20), 
    Correo VARCHAR(100)
);

CREATE TABLE Conductor (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    EmpleadoID INT,
    Calificacion ENUM('1','2','3','4','5','6','7','8','9','10','No Registrada'),
    FOREIGN KEY (EmpleadoID) REFERENCES Empleado(ID)
);

CREATE TABLE Cliente (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    NombreCompleto VARCHAR(50),
    Direccion VARCHAR(100),
    Telefono VARCHAR(20),
    Correo VARCHAR(100)
);

CREATE TABLE Producto (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Precio DECIMAL(10,2),
    Paquete ENUM("Pequeño","Mediano","Grande"),
    CantidadDisponible INT
);



CREATE TABLE Pedido (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    ClienteID INT,
    ProductoID INT,
    CantidadVendida INT,
    Fecha DATE,
    ConductorID INT,
    Estado VARCHAR(30),
    FOREIGN KEY (ClienteID) REFERENCES Cliente(ID),
    FOREIGN KEY (ProductoID) REFERENCES Producto(ID),
    FOREIGN KEY (ConductorID) REFERENCES Conductor(ID)
);

CREATE TABLE PuntoDeControl (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Direccion VARCHAR(100)
);

CREATE TABLE Encuesta (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    PedidoID INT,
    PuntoDeControlID INT,
    FechaHoraInspeccion DATETIME,
    EstadoMercancia ENUM('En buen estado', 'Dañado', 'Faltante', 'Caducado', 'Otro'),
    Observaciones TEXT,
    Satisfaccion int,
    FOREIGN KEY (PedidoID) REFERENCES Pedido(ID),
    FOREIGN KEY (PuntoDeControlID) REFERENCES PuntoDeControl(ID)
);



-- Inserciones para la tabla Empleado
INSERT INTO Empleado (NombreCompleto, Rol, Telefono, Correo) VALUES
('Juan Pérez', 'Conductor', '123-456-7890', 'juan@galletitas.com'),
('María García', 'Vendedor', '987-654-3210', 'maria@galletitas.com'),
('Carlos Rodríguez', 'Supervisor', '555-666-7777', 'carlos@galletitas.com'),
('Ana López', 'Conductor', '111-222-3333', 'ana@galletitas.com'),
('Luis Martínez', 'Vendedor', '444-555-6666', 'luis@galletitas.com');

-- Inserciones para la tabla Conductor
INSERT INTO Conductor (EmpleadoID, Calificacion) VALUES
(1, '8'),
(4, '7'),
(3, '9'),
(2, '6'),
(5, 'No Registrada');

-- Inserciones para la tabla Cliente
INSERT INTO Cliente (NombreCompleto, Direccion, Telefono, Correo) VALUES
('Elena Martínez', 'Calle 123, Ciudad A', '111-222-3333', 'elena@email.com'),
('Pedro Sánchez', 'Avenida 456, Ciudad B', '444-555-6666', 'pedro@email.com'),
('Laura López', 'Plaza 789, Ciudad C', '777-888-9999', 'laura@email.com'),
('Carlos Gómez', 'Calle 321, Ciudad D', '999-888-7777', 'carlos@email.com'),
('Sofia Rodríguez', 'Avenida 654, Ciudad E', '666-555-4444', 'sofia@email.com');

INSERT INTO Producto (Precio, Paquete, CantidadDisponible) VALUES
(1000.00 ,'Pequeño', 680),
(2800.00 , 'Mediano', 800),
(3500.00 , 'Grande', 500);

-- Inserciones para la tabla PuntoDeControl
INSERT INTO PuntoDeControl (Direccion) VALUES
('Punto de control A, Ciudad X'),
('Punto de control B, Ciudad Y'),
('Punto de control C, Ciudad Z'),
('Punto de control D, Ciudad W'),
('Punto de control E, Ciudad V');

-- Inserciones para la tabla Pedido
INSERT INTO Pedido (ClienteID, ProductoID, CantidadVendida, Fecha, ConductorID, Estado) VALUES
(1, 1, 50, CURDATE(), 1, 'Entregado'),
(2, 2, 30, CURDATE(), 2, 'En proceso'),
(3, 3, 20, CURDATE(), 3, 'Pendiente'),
(4, 1, 40, CURDATE(), 4, 'Entregado'),
(5, 2, 25, CURDATE(), 5, 'En proceso');

-- Inserciones para la tabla Encuesta
INSERT INTO Encuesta (PedidoID, PuntoDeControlID, FechaHoraInspeccion, EstadoMercancia, Observaciones, Satisfaccion) VALUES
(1, 1, NOW(), 'En buen estado', 'Entrega realizada sin problemas', 5),
(2, 2, NOW(), 'En buen estado', 'Cliente satisfecho con el producto', 4),
(3, 3, NOW(), 'Dañado', 'Se detectaron algunos paquetes dañados', 2),
(4, 4, NOW(), 'En buen estado', 'Entrega puntual y en perfectas condiciones', 5),
(5, 5, NOW(), 'Faltante', 'Faltan 2 unidades del pedido', 3);
