import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Link } from 'react-router-dom'; // ✅ IMPORT CORRETO

export default function AppointmentsList() {
  const [apps, setApps] = useState([]);
  const [pets, setPets] = useState([]);

  const [petId, setPetId] = useState('');
  const [date, setDate] = useState('');
  const [veterinarianName, setVeterinarianName] = useState('');
  const [description, setDescription] = useState('');

  // Carrega consultas
  const loadAppointments = async () => {
    const res = await api.get('/appointments');
    setApps(res.data);
  };

  // Carrega pets
  const loadPets = async () => {
    const res = await api.get('/pets');
    setPets(res.data);
  };

  useEffect(() => {
    loadAppointments();
    loadPets();
  }, []);

  // Criar consulta
  const handleCreate = async (e) => {
    e.preventDefault();

    await api.post('/appointments', {
      pet_id: petId,
      date,
      veterinarian_name: veterinarianName,
      description,
      status: 'AGENDADA'
    });

    setPetId('');
    setDate('');
    setVeterinarianName('');
    setDescription('');

    loadAppointments();
  };

  // Atualiza status
  const updateStatus = async (id, status) => {
    await api.patch(`/appointments/${id}/status`, { status });
    loadAppointments();
  };

  // Excluir consulta
  const handleDelete = async (id) => {
    if (!window.confirm('Excluir consulta?')) return;

    await api.delete(`/appointments/${id}`);
    loadAppointments();
  };

  return (
    <div className="container">
      {/* HEADER */}
      <header>
        <h1>Clínica Veterinária</h1>
        <nav>
          <Link to="/owners">Donos</Link>
          <Link to="/pets">Pets</Link>
          <Link to="/appointments">Consultas</Link>
        </nav>
      </header>

      {/* NOVA CONSULTA */}
      <h2>Nova Consulta</h2>

      <form className="form" onSubmit={handleCreate}>
        <label>Pet</label>
        <select
          value={petId}
          onChange={e => setPetId(e.target.value)}
          required
        >
          <option value="">Selecione o pet</option>
          {pets.map(p => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <label>Data e hora</label>
        <input
          type="datetime-local"
          value={date}
          onChange={e => setDate(e.target.value)}
          required
        />

        <label>Veterinário</label>
        <input
          placeholder="Nome do veterinário"
          value={veterinarianName}
          onChange={e => setVeterinarianName(e.target.value)}
          required
        />

        <label>Descrição</label>
        <textarea
          placeholder="Descrição"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <button className="btn-primary" type="submit">
          Agendar
        </button>
      </form>

      <hr />

      {/* LISTA */}
      <h2>Consultas</h2>

      <div className="list">
        {apps.map(a => (
          <div className="list-item" key={a.id}>
            <div>
              <strong>{a.pet_name}</strong>
              <div>
                {a.veterinarian_name} — <b>{a.status}</b>
              </div>
            </div>

            <div className="actions">
              {a.status === 'AGENDADA' && (
                <>
                  <button
                    className="btn-primary"
                    onClick={() => updateStatus(a.id, 'REALIZADA')}
                  >
                    Encerrar
                  </button>

                  <button
                    className="btn-secondary"
                    onClick={() => updateStatus(a.id, 'CANCELADA')}
                  >
                    Cancelar
                  </button>
                </>
              )}

              <button
                className="btn-danger"
                onClick={() => handleDelete(a.id)}
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}