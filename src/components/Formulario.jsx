import {useState, useEffect } from 'react'; 
import Error from './Error';

function Formulario({pacienteToEdit, setPacienteToEdit, pacientes, setPacientes}) {

  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');
  const [error, setError] = useState(false);

  // Effect usado cuando el objeto pacienteToEdit cambia
  // Verifica internamente que las propiedades existan y asigna
  // los valores a las propiedades del formulario
  useEffect(() => {
    if(Object.keys(pacienteToEdit).length > 0){
      setNombre(pacienteToEdit.nombre)
      setPropietario(pacienteToEdit.propietario)
      setEmail(pacienteToEdit.email)
      setFecha(pacienteToEdit.fecha)
      setSintomas(pacienteToEdit.sintomas)
    }
  }, [pacienteToEdit]);


  // Funcion que genera un random string para hacer de id
  const generarId = () => {
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36);

    return random + fecha;
  }

  // Evento que se llama al enviar el formulario.
  // 1. Verifica que las propiedades no esten vacias, sino error.

  const handleSubmit = (e) => {
    e.preventDefault();

    if([nombre, propietario, email, fecha, sintomas].includes('')){
      setError(true);
      return;
    }

    setError(false);
    const objetoPaciente = {nombre, propietario, email, fecha, sintomas}
    if(pacienteToEdit.id){
      // Actualizar paciente
      objetoPaciente.id = pacienteToEdit.id;
      
      const pacientesActualizados = pacientes.map( 
        pacienteState => pacienteState.id === pacienteToEdit.id ? objetoPaciente : pacienteState)

        console.log(pacientesActualizados)

      setPacientes(pacientesActualizados)
      setPacienteToEdit({})

    } else {
      // Nuevo Registro
      objetoPaciente.id = generarId();
      setPacientes([...pacientes, objetoPaciente]);
    }
    

    //Reiniciar el form
    setNombre('');
    setEmail('');
    setPropietario('');
    setFecha('');
    setSintomas('');

    console.log("Enviando formulario")
  }

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento pacientes</h2>

      <p className="text-lg mt-5 mb-10 text-center">
        Añade pacientes y {''}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form 
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded py-10 px-5">

        { error && <Error mensaje='Todos los campos son obligatorios' />}

        <div className="mb-5">
          <label 
            htmlFor="mascota"
            className="block text-gray-700 uppercase font-bold">
              Nombre mascota
          </label>
          <input 
            id="mascota"
            type="text" 
            placeholder="Nombre de la mascota" 
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label 
            htmlFor="propietario"
            className="block text-gray-700 uppercase font-bold">
              Nombre propietario
          </label>
          <input 
            id="propietario"
            type="text" 
            placeholder="Nombre del propietario" 
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label 
            htmlFor="email"
            className="block text-gray-700 uppercase font-bold">
              Email
          </label>
          <input 
            id="email"
            type="email" 
            placeholder="Email de contacto" 
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label 
            htmlFor="fechaIngreso"
            className="block text-gray-700 uppercase font-bold">
              Fecha ingreso
          </label>
          <input 
            id="fechaIngreso"
            type="date" 
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label 
            htmlFor="sintomas"
            className="block text-gray-700 uppercase font-bold">
              Sintomas
          </label>
          <textarea 
            id="sintomas"
            placeholder="Describe los sintomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          />
        </div>

        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold 
            hover:bg-indigo-700 cursor-pointer transition-colors"
          value={pacienteToEdit.id ? "Editar paciente": "Agregar paciente"}
        />

      </form>
    </div>
  )
}

export default Formulario