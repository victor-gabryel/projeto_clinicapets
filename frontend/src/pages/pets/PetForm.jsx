import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { useNavigate, useParams, Link } from 'react-router-dom';

export default function PetForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [owners, setOwners] = useState([]);
  const [form, setForm] = useState({
    name: '',
    species: '',
    breed: '',
    owner_id: ''
  });

  // Carrega donos
  useEffect(() => {
    api.get('/owners').then(res => setOwners(res.data));
  }, []);

  // Carrega pet ao editar
  useEffect(() => {
    if (isEdit) {
      api.get(`/pets/${id}`).then(res => {
        setForm({
          name: res.data.name,
          species: res.data.species,
          breed: res.data.breed || '',
          owner_id: res.data.owner_id
        });
      });
    }
  }, [id, isEdit]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.name || !form.species || !form.owner_id) {
      alert('Preencha os campos obrigatórios');
      return;
    }

    if (isEdit) {
      await api.put(`/pets/${id}`, form);
    } else {
      await api.post('/pets', form);
    }

    navigate('/pets');
  }

  return (
    <div className="container">
      <header>
        <h1>Clínica Veterinária</h1>
        <nav>
          <Link to="/owners">Donos</Link>
          <Link to="/pets">Pets</Link>
          <Link to="/appointments">Consultas</Link>
        </nav>
      </header>

      <div className="card">
        <h2>{isEdit ? 'Editar Pet' : 'Novo Pet'}</h2>

        <form onSubmit={handleSubmit} className="form">
          <label>
            Nome do Pet *
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Ex: Rex"
              required
            />
          </label>

          <label>
            Espécie *
            <input
              name="species"
              value={form.species}
              onChange={handleChange}
              placeholder="Ex: Cachorro"
              required
            />
          </label>

          <label>
            Raça
            <input
              name="breed"
              value={form.breed}
              onChange={handleChange}
              placeholder="Ex: Labrador"
            />
          </label>

          <label>
            Dono *
            <select
              name="owner_id"
              value={form.owner_id}
              onChange={handleChange}
              required
            >
              <option value="">Selecione o dono</option>
              {owners.map(o => (
                <option key={o.id} value={o.id}>
                  {o.name}
                </option>
              ))}
            </select>
          </label>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              Salvar
            </button>

            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate('/pets')}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
