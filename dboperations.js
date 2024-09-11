import { Sequelize, Op } from 'sequelize';
import { Entrenador, Equipo, Jugador, Estadio, Partido, Tarjeta, Gol } from "./database.js";

async function insertCoachData(nombre, apellido, fechaNacimiento, nacionalidad) {

    try {
        const entrenador = await Entrenador.findOrCreate({
            where: { nombre: nombre, apellido: apellido },
            defaults: { fecha_nacimiento: fechaNacimiento, nacionalidad: nacionalidad }
        });
        console.log('Se insertó el registro del entrenador', entrenador.toJSON());
    } catch (error) {
        console.log('No se pudo insertar el registro del entrenador', error);
    }
}

async function insertTeamData(nombre, ciudad) {
    try {
        const equipo = await Equipo.findOrCreate({
            where: { nombre: nombre },
            defaults: { ciudad: ciudad, id_entrenador: null }

        })
        console.log("se insertó el registro del equipo", equipo.toJSON());
    } catch (error) {
        console.log('No se pudo insertar el registro del equipo', error);
    }
}



async function insertPlayerData(nombre, apellido, fechaNacimiento, nacionalidad, posicion, nombreEquipo) {

    try {
        const buscarId = await Equipo.findOne({ where: { nombre: nombreEquipo } })
        const idEquipo = buscarId.id_equipo;

        const [jugador, created]= await Jugador.findOrCreate({
            where: { nombre: nombre, apellido: apellido },
            defaults: { fecha_nacimiento: fechaNacimiento, nacionalidad: nacionalidad, posicion: posicion, id_equipo: idEquipo }

        });
        if (created) {
        console.log('Se insertó el registro del jugador', jugador.toJSON());
        } else {
            console.log('El registro del jugador ya existe');
        }
    } catch (error) {
        console.log('No se pudo insertar el registro del jugador', error);
    }
}

async function insertVenueData(nombre, ciudad, capacidad) {
    try {
        const [venue, created] = await Estadio.findOrCreate({
            where: { nombre: nombre },
            defaults: { ciudad: ciudad, capacidad: capacidad }
        });
        if (created) {
            console.log('Se insertó el registro del estadio', venue.toJSON());
        } else {
            console.log('El registro del estadio ya existe');
        }
    } catch (error) {
        console.log('No se pudo insertar el registro del estadio', error);
    }
}

async function insertMatchData(fecha, estadio, teamLocal, teamVisitante, localScore, visitanteScore, competicion) {
    try {
        let idEstadio = null;
        let idLocal = null;
        let idVisitante = null;

        const buscarIdEstadio = await Estadio.findOne({ where: { nombre: estadio } })
        if(buscarIdEstadio){
        idEstadio = buscarIdEstadio.id_estadio
    }

        const buscarIdLocal = await Equipo.findOne({ where: {nombre: teamLocal} })
        if(buscarIdLocal){
        idLocal = buscarIdLocal.id_equipo
        }

        const buscarIdVisitante = await Equipo.findOne({ where: {nombre: teamVisitante} })
        if(buscarIdVisitante){
        idVisitante = buscarIdVisitante.id_equipo
        }

        const [partido, created] = await Partido.findOrCreate({
             where: {
                fecha: fecha,
                id_estadio: idEstadio,
                id_equipo_local: idLocal,
                id_equipo_visitante: idVisitante,
                tipo_competicion: competicion
            },
            defaults: { id_estadio: idEstadio, id_equipo_local: idLocal, id_equipo_visitante: idVisitante, score_local: localScore, score_visitante: visitanteScore }
        }); 
        
        if (created) {
            console.log('Se insertó el registro del partido', partido.toJSON());
        } else {
            console.log('El registro del partido ya existe');
        }
    } catch (error) {
        console.log('No se pudo insertar el registro del partido', error);

    }
}

    async function getMatchId (fecha, nombreL, nombreV) {
        let nombreLocal = await Equipo.findOne({ where: { nombre: nombreL }}).then(e => e ? e.id_equipo : null);
        let nombreVisitante = await Equipo.findOne({ where: { nombre: nombreV }}).then(e => e ? e.id_equipo : null);
        
        let partido = await Partido.findOne(
            { 
                where: {
                    [Op.and]: [
                        Sequelize.where(Sequelize.fn('DATE', Sequelize.col('fecha')), fecha),
                        { id_equipo_local: nombreLocal },
                        { id_equipo_visitante: nombreVisitante }
                    ]
                }
            });
            return partido ? partido.id_partido : null;
    }

    async function insertGoalData (idPartido, minuto, idEquipo, idJugador, idJugadorAsistente) {

        if (!idJugador || !idJugadorAsistente) {
            console.log('Faltan datos del jugador o asistente para insertar el gol' + idJugador + idJugadorAsistente);
        }
            /////////////////////////////////////////////
        try {

            let [nombreInicialJugador, apellidoJugador] = idJugador.split(' ');
            let inicialJugador = nombreInicialJugador[0];

            let [nombreInicialJAsistente, apellidoJAsistente] = idJugadorAsistente.split(' ');
            let inicialJAsistente = nombreInicialJAsistente[0];
                /////////////////////////////////////////////

            let equipo = await Equipo.findOne({ where: { nombre: idEquipo }});
            let equipoId = equipo ? equipo.id_equipo : null;
    
            
            let jugador = await Jugador.findOne({ 
                where: { 
                    apellido: apellidoJugador, 
                    nombre: { 
                        [Op.like]: `${inicialJugador}%` } 
                    }});
            let jugadorId = jugador ? jugador.id_jugador : null;
    

            let jugadorAsistente = await Jugador.findOne({ 
                where: { 
                    apellido: apellidoJAsistente, 
                    nombre: { 
                        [Op.like]: `${inicialJAsistente}%` } 
                    }});
            let jugadorAsistenteId = jugadorAsistente ? jugadorAsistente.id_jugador : null;
    
            // Verifica si los IDs fueron encontrados
            if (!equipoId || !jugadorId || !jugadorAsistenteId) {
                console.log('No se encontraron los IDs necesarios para insertar el gol.');
                console.log('Detalles:', { equipoId, jugadorId, jugadorAsistenteId });
            }
            const [goal, created] = await Gol.findOrCreate({
                where: { 
                    id_partido: idPartido,
                    minuto: minuto,
                    id_equipo: equipoId,
                    id_jugador: jugadorId,
                    id_jugador_asistente: jugadorAsistenteId 
                }
            });
    
            if (created) {
                console.log('Se insertó el registro del gol', goal.toJSON());
            } else {
                console.log('El gol ya existe en la base de datos.');
            }
        } catch (error) {
            console.log('No se pudo insertar el registro del gol', error);
        }
    }

        async function insertCardData (idPartido, minuto, idEquipo, idJugador, tipoTarjeta) {
            try{
                let [nombreInicialJugador, apellidoJugador] = idJugador.split(' ');
                let inicialJugador = nombreInicialJugador[0];
    
                let equipo = await Equipo.findOne({ where: { nombre: idEquipo }});
                let equipoId = equipo ? equipo.id_equipo : null;
        
                
                let jugador = await Jugador.findOne({ 
                    where: { 
                        apellido: apellidoJugador, 
                        nombre: { 
                            [Op.like]: `${inicialJugador}%` } 
                        }});
                let jugadorId = jugador ? jugador.id_jugador : null;
        
                // Verifica si los IDs fueron encontrados
                if (!equipoId || !jugadorId) {
                    console.log('No se encontraron los IDs necesarios para insertar la tarjeta.' + equipoId + jugadorId);
                    return;
                }
        
                const [card, created] = await Tarjeta.findOrCreate({
                    where: { 
                        minuto: minuto,
                        id_jugador: jugadorId,
                        id_partido: idPartido,
                        id_equipo: equipoId,
                        tipo_tarjeta: tipoTarjeta 
                    }
                });
        
                if (created) {
                    console.log('Se insertó el registro de la tarjeta', card.toJSON());
                } else {
                    console.log('La tarjeta ya existe en la base de datos.');
                }
            } catch(error) {
                console.log('No se pudo insertar el registro de la tarjeta', error);

            }
        }

export { insertCoachData, insertTeamData, insertPlayerData, insertVenueData, insertMatchData, getMatchId, insertGoalData, insertCardData}
