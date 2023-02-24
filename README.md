# Plantilla de Backend
    La siguiente plantilla consta de un backend con:
        Nodejs, Expressjs, Sequelize como ORM, Base de datos como Postgres o Mysql (dependiendo de la que quieras utilizar), Passportjs y JWT

# Instalación de Dependencias con NPM
    Ejecutamos el siguiente comando
        npm install

# Ejecutar Docker
En nuestro archivo docker-compose tenemos 4 imágenes:
    1. postgres (base de datos)
    2. pgadmin (visualizador de bd para postgres)
    3. mysql (base de datos)
    4. phpmyadmin (visualizador de bd para mysql)

    En la seccion de environment de cada imagen se debe modificar su correspondiente información:
        El nombre de la base de datos, el usuario y su clave para las base de datos
        El usuario y su respectiva contraseña para los visualizadores de bd

    Creamos las respectivas carpetas de los volumes para cada imagen
        Ej. Para la imagen postgres debemos crear la siguiente carpeta:
            /postgres_data
        Ej. Para la imagen mysql debemos crear la siguiente carpeta:
            /mysql_data

    Luego, se ejecuta el siguiente comando para correr docker y sus imágenes.

        docker-compose up -d

# Revisar el funcionamiento de la bd y su visualizador
    Si estamos en local, acceder al siguiente enlace para visualizar nuestra database
        http://localhost:5055/

    Ingresamos el email o username y su respectiva password
        Email/username  -> root@root.com
        Password        -> root

    Registramos el servidor
        Clic derecho en "Servers"
        Register -> Server
            name                    my_store (cualquier nombre)
            Hostnanme/address       postgres
            Port                    5432
            Maintenance database    postgres
            Username                root
            Password                root
        Creamos la base de datos
            Clic derecho en "my_store" (El nombre que le hayas puesto al servidor)
            Create -> Database
                Database            my_store_2

# Migraciones
    Corremos las migraciones con el siguiente comando y revisar con el visualizador que todas las tablas se hayan creado
        npm run migrations:run
    Obviar el siguiente error: "ERROR: column "role" of relation "users" already exists"

# Ejecutamos el servicio 
    Para correr el servicio ejecutamos el siguiente comando
        npm run dev
