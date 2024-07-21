import { Entrenador, Equipo, Jugador } from "./database.js";

async function insertCoachData(nombre, apellido, fechaNacimiento, nacionalidad){
    
        try{
            const entrenador = await Entrenador.create({
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
            const equipo = await Equipo.create({
                nombre, 
                ciudad,
                id_entrenador: null
            })
            console.log("se insertó el registro del equipo", equipo.toJSON());
        } catch (error){
            console.log('No se pudo insertar el registro del equipo', error);
        }
}


    
async function insertPlayerData(nombre, apellido, fechaNacimiento, nacionalidad, posicion){
    try {
        const jugador = await Jugador.create({
            nombre,
            apellido,
            fecha_nacimiento: fechaNacimiento,
            nacionalidad,
            posicion,
            id_equipo: async function(equipo){
                const equipo = await Equipo.findOne({
                    where:{nombre: equipo }
                })
            }
        });
        console.log('Se insertó el registro del jugador', jugador.toJSON());
    } catch (error){
        console.log('No se pudo insertar el registro del jugador', error);
    }

}
export {insertCoachData, insertTeamData}
