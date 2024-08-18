import { Sequelize } from 'sequelize';

const sequelize = new Sequelize ('equipodefutbol', 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost',
    port: '3306',
    define: {
        freezeTableName: true,
        timestamps: false
    }
    
})
// Solo para probar que la conexión se haya establecido
// sequelize.authenticate().then(()=>{
//     console.log('Conexión establecida');
// })
// .catch((err) => {
//     console.error('No se pudo conectar a la base de datos:', err);
// })

const Entrenador = sequelize.define('entrenador', {

    // id_entrenador INT PRIMARY KEY AUTO_INCREMENT,
    // nombre VARCHAR(50) NOT NULL,
    // fecha_nacimiento DATE NOT NULL,
    // nacionalidad VARCHAR(50) NOT NULL
    // apellido VARCHAR (50) NOT NULL
    id_entrenador: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull: false
    },
    apellido: {
        type: Sequelize.STRING,
        allowNull: false
    },
    fecha_nacimiento: {
        type: Sequelize.DATE,
        allowNull: false
    },
    nacionalidad: {
        type: Sequelize.STRING,
        allowNull: false
    }
});
 export { Entrenador };

    const Equipo = sequelize.define('equipo', {
//         id_equipo INT PRIMARY KEY AUTO_INCREMENT,
//   nombre VARCHAR(50) NOT NULL,
//   ciudad VARCHAR(50) NOT NULL,
//   id_entrenador INT,
//   FOREIGN KEY (id_entrenador) REFERENCES Entrenador(id_entrenador)
        id_equipo: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        ciudad: {
            type: Sequelize.STRING,
            allowNull: false
        },
        id_entrenador: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references:{
                model: Entrenador,
                key: 'id_entrenador'
            }
        }
    }); 
    export { Equipo };

        const Jugador = sequelize.define('jugador', {
            // id_jugador INT PRIMARY KEY AUTO_INCREMENT,
            // nombre VARCHAR(50) NOT NULL,
            // fecha_nacimiento DATE NOT NULL,
            // id_equipo INT NOT NULL,
            // FOREIGN KEY (id_equipo) REFERENCES Equipo(id_equipo)

            //AGREGAR CAMPOS: APELLIDO, POSICION, FECHA DE NACIMIENTO Y NACIONALIDAD.   
            id_jugador: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nombre: {
                type: Sequelize.STRING,
                allowNull: false
            },
            apellido:{
                type: Sequelize.STRING,
                allowNull: false
            },
            fecha_nacimiento: {
                type: Sequelize.DATE,
                allowNull: false
            },
            nacionalidad: {
                type: Sequelize.STRING,
                allowNull: false
            },
            posicion: {
                type: Sequelize.STRING,
                allowNull: false
            },
            id_equipo: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references:{
                    model: Equipo,
                    key: 'id_equipo'
                }
            }
        });
        export {Jugador};

        const Estadio = sequelize.define('estadio', {
            // id_estadio INT PRIMARY KEY AUTO_INCREMENT,
            // nombre VARCHAR(50) NOT NULL,
            // ciudad VARCHAR(50) NOT NULL,
            // capacidad INT NOT NULL
            id_estadio: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nombre: {
                type: Sequelize.STRING,
                allowNull: false
            },
            ciudad: {
                type: Sequelize.STRING,
                allowNull: false
            },
            capacidad: {
                type: Sequelize.INTEGER,
                allowNull: false
            }
        })
        export {Estadio};

        const Partido = sequelize.define('partido', {
            // id_partido INT PRIMARY KEY AUTO_INCREMENT,
            // fecha DATE NOT NULL,
            // id_estadio INT NOT NULL,
            // id_equipo_local INT NOT NULL,
            // id_equipo_visitante INT NOT NULL,
            // score_local INT NOT NULL,
            // score_visitante INT NOT NULL,
            // FOREIGN KEY (id_estadio) REFERENCES Estadio(id_estadio),
            // FOREIGN KEY (id_equipo_local) REFERENCES Equipo(id_equipo),
            // FOREIGN KEY (id_equipo_visitante) REFERENCES Equipo(id_equipo)
            id_partido: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            fecha: {
                type: Sequelize.DATE,
                allowNull: false
            },
            id_estadio: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references:{
                    model: Estadio,
                    key: 'id_estadio'
                }
            },
            id_equipo_local: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references:{
                    model: Equipo,
                    key: 'id_equipo'
                }
            },
            id_equipo_visitante: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references:{
                    model: Equipo,
                    key: 'id_equipo'
                }
            },
            score_local:{
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            score_visitante:{
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
        tipo_competicion:{
            type: Sequelize.STRING,
            allowNull: false,

        }
        }, {
            indexes: [
                {
                    unique: true,
                    fields: ['fecha', 'id_estadio', 'id_equipo_local', 'id_equipo_visitante']
                }
            ]
        });
        export {Partido};

        const Tarjeta = sequelize.define('tarjeta', {
            // id_tarjeta INT PRIMARY KEY AUTO_INCREMENT,
            // tipo_tarjeta ENUM('amarilla', 'roja') NOT NULL,
            // minuto INT NOT NULL,
            // id_jugador INT NOT NULL,
            // id_partido INT NOT NULL,
            // FOREIGN KEY (id_jugador) REFERENCES Jugador(id_jugador),
            // FOREIGN KEY (id_partido) REFERENCES Partido(id_partido)
            id_tarjeta: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            tipo_tarjeta: {
                type: Sequelize.ENUM('amarilla', 'roja'),
                allowNull: false
            },
            minuto: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            id_jugador: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references:{
                    model: Jugador,
                    key: 'id_jugador'
                }
            },
            id_partido: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references:{
                    model: Partido,
                    key: 'id_partido'
                }
            }
        });
        export {Tarjeta};


        const Gol = sequelize.define('gol',{
            // id_gol INT PRIMARY KEY AUTO_INCREMENT,
            // minuto INT NOT NULL,
            // id_jugador INT NOT NULL,
            // id_partido INT NOT NULL,
            // id_equipo INT NOT NULL,
            // id_jugador_asistente INT NOT NULL,
            // FOREIGN KEY (id_jugador) REFERENCES Jugador(id_jugador),
            // FOREIGN KEY (id_partido) REFERENCES Partido(id_partido),
            // FOREIGN KEY (id_equipo) REFERENCES Equipo(id_equipo),
            // FOREIGN KEY (id_jugador_asistente) REFERENCES Jugador(id_jugador)
            id_gol: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            minuto: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            id_jugador: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references:{
                    model: Jugador,
                    key: 'id_jugador'
                }
            },
            id_partido: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references:{
                    model: Partido,
                    key: 'id_partido'
            }
            },
            id_equipo: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references:{
                    model: Equipo,
                    key: 'id_equipo'
                }
            },
            id_jugador_asistente: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references:{
                    model: Jugador,
                    key: 'id_jugador'
            }
            }
        });
        export {Gol};


           


Equipo.belongsTo(Entrenador, { foreignKey: 'id_entrenador' });
Jugador.belongsTo(Equipo, { foreignKey: 'id_equipo' });
Partido.belongsTo(Estadio, { foreignKey: 'id_estadio' });
Partido.belongsTo(Equipo, { as: 'EquipoLocal', foreignKey: 'id_equipo_local' });
Partido.belongsTo(Equipo, { as: 'EquipoVisitante', foreignKey: 'id_equipo_visitante' });
Tarjeta.belongsTo(Jugador, { foreignKey: 'id_jugador' });
Tarjeta.belongsTo(Partido, { foreignKey: 'id_partido' });
Gol.belongsTo(Jugador, { foreignKey: 'id_jugador' });
Gol.belongsTo(Partido, { foreignKey: 'id_partido' });
Gol.belongsTo(Equipo, { foreignKey: 'id_equipo' });
Gol.belongsTo(Jugador, { as: 'Asistente', foreignKey: 'id_jugador_asistente' });


            
    sequelize.sync().then(() => {
        console.log('Se sincronizó la tabla')
    })
    .catch((err) => {
        console.error('No se pudo sincronizar la tabla:', err)
    })