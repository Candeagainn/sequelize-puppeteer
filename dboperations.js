import { Entrenador, Equipo, Jugador } from "./database.js";

async function insertCoachData(nombre, apellido, fechaNacimiento, nacionalidad){
    
        try{
            const entrenador = await Entrenador.findOrCreate({
                nombre,
                apellido,
                fecha_nacimiento: fechaNacimiento,
                nacionalidad
            });
            console.log('Se insertó el registro del entrenador', entrenador.toJSON());
        } catch (error){
        console.log('No se pudo insertar el registro del entrenador', error);
    }
}
 
async function insertTeamData(nombre, ciudad){
        try {
            const equipo = await Equipo.findOrCreate({
                nombre, 
                ciudad,
                id_entrenador: null
            })
            console.log("se insertó el registro del equipo", equipo.toJSON());
        } catch (error){
            console.log('No se pudo insertar el registro del equipo', error);
        }
}


    
async function insertPlayerData(nombre, apellido, fechaNacimiento, nacionalidad, posicion, nombreEquipo){

    try {
        const buscarId = await Equipo.findOne({where:{nombre: nombreEquipo} })
        const id_equipo = buscarId.id_equipo;

        const jugador = await Jugador.findOrCreate({
            nombre,
            apellido,
            fecha_nacimiento: fechaNacimiento,
            nacionalidad,
            posicion,
            id_equipo
            })
            console.log('Se insertó el registro del jugador', jugador.toJSON());
        } catch (error){
        console.log('No se pudo insertar el registro del jugador', error);
    }
}

async function insertVenueData(nombre, ciudad, capacidad){
    try {
        const venue = await Estadio.findOrCreate({
            nombre,
            ciudad,
            capacidad
        })
        console.log("se insertó el registro del estadio", venue.toJSON());
    } catch (error){
        console.log('No se pudo insertar el registro del estadio', error);
    }
}
export {insertCoachData, insertTeamData, insertPlayerData, insertVenueData}
