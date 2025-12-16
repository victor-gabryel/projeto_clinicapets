import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import OwnersList from './pages/owners/OwnersList';
import OwnerForm from './pages/owners/OwnerForm';

import PetsList from './pages/pets/PetsList';
import PetForm from './pages/pets/PetForm';

import AppointmentsList from './pages/appointments/AppointmentsList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota inicial */}
        <Route path="/" element={<Navigate to="/owners" />} />

        {/* Donos */}
        <Route path="/owners" element={<OwnersList />} />
        <Route path="/owners/new" element={<OwnerForm />} />
        <Route path="/owners/:id/edit" element={<OwnerForm />} />

        {/* Pets */}
        <Route path="/pets" element={<PetsList />} />
        <Route path="/pets/new" element={<PetForm />} />
        <Route path="/pets/:id/edit" element={<PetForm />} />

        {/* Consultas */}
        <Route path="/appointments" element={<AppointmentsList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
