import Paciente from "./Paciente"

function ListadoPacientes({pacientes, setPacienteToEdit, eliminarPaciente}) {
  return (
    <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll">
      
      { pacientes && pacientes.length ? 
      (<>
        <h2 className="font-black text-3xl text-center">Listado Pacientes</h2>
        <p className="text-xl mt-5 mb-10 text-center">
          Administra tus {''}
          <span className="text-indigo-600 ">Pacientes y citas</span>
        </p>
      </>) 
      :
      (<>
        <h2 className="font-black text-3xl text-center">No hay pacientes</h2>
        <p className="text-xl mt-5 mb-10 text-center">
          Comienza agregando pacientes {''}
          <span className="text-indigo-600 ">y apareceran en este lugar</span>
        </p>
      </>)}
      
      

      { pacientes.map( (paciente, index) => 
        <Paciente 
          key={paciente.id}
          paciente={paciente} 
          setPacienteToEdit={setPacienteToEdit}
          eliminarPaciente={eliminarPaciente}
        /> 
      )}
      

    </div>
  )
}

export default ListadoPacientes