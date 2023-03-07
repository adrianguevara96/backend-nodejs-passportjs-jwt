# Plantilla de Backend
    La siguiente plantilla consta de un backend desarrollado a través de Nodejs, Expressjs,
    Sequelize como ORM, Base de datos como Postgres o Mysql (dependiendo de la que quieras utilizar
    a través de Docker), Passportjs y JWT.

# Instalación

## Clonar el proyecto
    * git clone https://github.com/adrianguevara96/backend-nodejs-passportjs-jwt.git
## Ingresamos a la carpeta del proyecto
    * cd backend-nodejs-passportjs-jwt
## Instalación de Dependencias con NPM
    Ejecutamos el siguiente comando **npm install**

## Renombrar el archivo .env.example a .env
    Una vez hayas renombrado el archivo, se deben cambiar los valores de las varaibles
    con sus correspondientes valores

## Ejecutar Docker
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

        **docker-compose up -d**

## Revisar el funcionamiento de la bd y su visualizador
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

## Migraciones (migrations)
    Ejecutamos las migraciones con el siguiente comando y revisamos con el visualizador que todas
    las tablas se hayan creado
        **npm run migrations:run**

## Semillas (seeders)
    Ejecutamos las semilas con el siguiente comando y revisamos con el visualizador la tabla users
    y podemos ver que tenemos a un usuario administrador creado
        **npm run seeds:run**

## Ejecutamos el servicio 
    Para correr el servicio ejecutamos el siguiente comando
        npm run dev
    El servicio correrá por defecto en el puerto 3000

## Estructura del proyecto

    src
    ├── config              # Environment variables config
    ├── db                  # DB related files like models, migrations & seeders
    │   ├── migrations
    │   ├── models
    │   ├── seeders
    ├── libs                # DB connection
    ├── middlewares         # Middlewares & handlers (Auth, Error, Validator)
    ├── routes              # Application routes / endpoints
    ├── schemas             # Application Joi schemas
    ├── services            # Services for all the endpoints of the app
    ├── utils               # Utilities
    │   ├── auth            
    │   │   ├── strategies  # Passport strategies (jwt, local)
    ├── index.js            # Application entry point
    ├── package.json        # Scripts and dependencies
    ├── package-lock.json 
    └── .gitignore

###
