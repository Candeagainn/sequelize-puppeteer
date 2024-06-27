import { Entrenador } from "./database.js";

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
    
async function insertPlayerData(){
    
}
export {insertCoachData}
