import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Link } from 'react-router-dom';

export default function PetsList() {
  const [pets, setPets] = useState([]);

  function loadPets() {
    api.get('/pets').then(res => setPets(res.data));
  }

  useEffect(() => {
    loadPets();
  }, []);

  async function remove(id) {
    if (!window.confirm('Deseja excluir este pet?')) return;

    try {
      await api.delete(`/pets/${id}`);
      loadPets();
    } catch (err) {
      alert('Não foi possível excluir. Este pet possui consultas cadastradas.');
    }
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
        <div className="card-header">
          <h2>Pets Cadastrados</h2>

          <Link to="/pets/new">
            <button className="btn-primary">+ Novo Pet</button>
          </Link>
        </div>

        {pets.length === 0 ? (
          <p>Nenhum pet cadastrado.</p>
        ) : (
          <ul className="list">
            {pets.map(p => (
              <li key={p.id} className="list-item">
                <div>
                  <strong>{p.name}</strong>
                  <span className="muted">
                    {' '}— {p.species}
                  </span>
                </div>

                <div className="actions">
                  <Link to={`/pets/${p.id}/edit`}>
                    <button className="btn-secondary">Editar</button>
                  </Link>

                  <button
                    className="btn-danger"
                    onClick={() => remove(p.id)}
                  >
                    Excluir
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
