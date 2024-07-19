import { Entrenador, Equipo } from "./database.js";

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
                ciudad
            })
            console.log("se insertó el registro del equipo", equipo.toJSON());
        } catch (error){
            console.log('No se pudo insertar el registro del equipo', error);
        }
}

async function insertPlayerData(){
    
}
export {insertCoachData, insertTeamData}
