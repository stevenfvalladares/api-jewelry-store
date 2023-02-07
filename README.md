Script de instrucciones SQL
===========================

*   Paso 1: crear la base de datos "joyas".  

    ```
        CREATE DATABASE joyas;
        \c joyas
    ```
*   Paso 2: crear una tabla llamada "inventario" con las siguientes columnas:  
    
    ```
        CREATE TABLE inventario (id SERIAL, nombre VARCHAR(50), categoria VARCHAR(50), metal VARCHAR(50), precio INT, stock INT);
    ```
*   Paso 3: insertar los siguientes datos a la tabla inventario:

     ```
        INSERT INTO inventario values
        (DEFAULT, 'Collar Heart', 'collar', 'oro', 20000 , 2),
        (DEFAULT, 'Collar History', 'collar', 'plata', 15000 , 5),
        (DEFAULT, 'Aros Berry', 'aros', 'oro', 12000 , 10),
        (DEFAULT, 'Aros Hook Blue', 'aros', 'oro', 25000 , 4),
        (DEFAULT, 'Anillo Wish', 'aros', 'plata', 30000 , 4),
        (DEFAULT, 'Anillo Cuarzo Greece', 'anillo', 'oro', 40000 , 2);
    ```
