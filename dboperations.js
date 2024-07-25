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

        const jugador = await Jugador.findOrCreate({
            where: { nombre: nombre, apellido: apellido },
            defaults: { fecha_nacimiento: fechaNacimiento, nacionalidad: nacionalidad, posicion: posicion, id_equipo: idEquipo }

        })
        console.log('Se insertó el registro del jugador', jugador.toJSON());
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

async function insertMatchData(fecha, estadio, teamLocal, teamVisitante) {
    try {
        const buscarIdEstadio = await Estadio.findOne({
            where: { nombre: estadio } 
        })
        const idEstadio = buscarIdEstadio.id_estadio;

        const buscarIdLocal = await Equipo.findOne({ 
            where: {nombre: teamLocal}
            })
        const idLocal = buscarIdLocal.id_equipo;

        const buscarIdVisitante = await Equipo.findOne({
            where: {nombre: teamVisitante}
        })
        const idVisitante = buscarIdVisitante.id_equipo;

        const partido = await Partido.findOrCreate({
            where: { fecha: fecha },
            defaults: { id_estadio: idEstadio, id_equipo_local: idLocal, id_equipo_visitante: idVisitante }
        });
        console.log('Se insertó el registro del partido', partido.toJSON());
    } catch (error) {
        console.log('No se pudo insertar el registro del partido', error);

    }

}
export { insertCoachData, insertTeamData, insertPlayerData, insertVenueData, insertMatchData }
