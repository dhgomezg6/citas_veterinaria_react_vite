import { useState, useEffect } from 'react'
import Formulario from "./components/Formulario"
import Header from "./components/Header"
import ListadoPacientes from "./components/ListadoPacientes"

function App() {
  
  const pacientesAlmacenados = JSON.parse(localStorage.getItem('pacientes')) ?? [];
  const [pacientes, setPacientes] = useState(pacientesAlmacenados)
  const [pacienteToEdit, setPacienteToEdit] = useState({})

  // Funcion que elimina el paciente por id usando un filter
  const eliminarPaciente = (id) => {
    const pacientesActualizados = pacientes.filter(paciente => paciente.id !== id);
    setPacientes(pacientesActualizados);
  }

  // Cuando cambie la lista de pacientes se actualiza en LocalStorage
  useEffect(() => {
    localStorage.setItem('pacientes', JSON.stringify(pacientes))
    console.log("Cambio la lista de pacientes", pacientes)
  }, [pacientes]);

  

  return (
    <div className="container mx-auto mt-20">
      <Header />

      <div className="mt-12 md:flex">
        <Formulario
          pacientes={pacientes}
          setPacientes={setPacientes}
          setPacienteToEdit={setPacienteToEdit}
          pacienteToEdit={pacienteToEdit}
        />
        <ListadoPacientes
          pacientes={pacientes} 
          setPacienteToEdit={setPacienteToEdit}
          eliminarPaciente={eliminarPaciente}
        />
      </div>
    </div>
  )
}

export default App
