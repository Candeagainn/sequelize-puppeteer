import { Entrenador, Equipo, Jugador, Estadio, Partido } from "./database.js";

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

async function insertMatchData(fecha, estadio, teamLocal, teamVisitante, localScore, visitanteScore) {
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
                id_equipo_visitante: idVisitante
            },
            defaults: { id_estadio: idEstadio, id_equipo_local: idLocal, id_equipo_visitante: idVisitante, score_local: localScore, score_visitante: visitanteScore }
        }); if (created) {
            console.log('Se insertó el registro del partido', partido.toJSON());
        } else {
            console.log('El registro del partido ya existe');
        }
    } catch (error) {
        console.log('No se pudo insertar el registro del partido', error);

    }
}

    async function getMatchId (fecha, nombreEstad, nombreL, nombreV) {
        let nombreEstadio = await Estadio.findOne({ where: { nombre: nombreEstad }}).then((e)=> nombreEstadio = e.id_estadio)
        let nombreLocal = await Equipo.findOne({ where: { nombre: nombreL }}).then((e)=> nombreLocal = e.id_equipo)
        let nombreVisitante = await Equipo.findOne({ where: { nombre: nombreV }}).then((e)=> nombreVisitante = e.id_equipo)
        
        let partido = await Partido.findOne(
            { 
                where: {
                    fecha: fecha,
                    id_estadio: nombreEstadio,
                    id_equipo_local: nombreLocal,
                    id_equipo_visitante: nombreVisitante
                }
            });
            return partido ? partido.id_partido : null;
    }

export { insertCoachData, insertTeamData, insertPlayerData, insertVenueData, insertMatchData, getMatchId }
