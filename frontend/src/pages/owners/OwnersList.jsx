import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Link } from 'react-router-dom';

export default function OwnersList() {
  const [owners, setOwners] = useState([]);

  function load() {
    api.get('/owners').then(res => setOwners(res.data));
  }

  useEffect(() => {
    load();
  }, []);

  async function remove(id) {
    if (!window.confirm('Tem certeza que deseja excluir este dono?')) return;

    try {
      await api.delete(`/owners/${id}`);
      load();
    } catch (err) {
      alert('Não foi possível excluir. O dono possui pets cadastrados.');
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
        <h2>Donos</h2>

        <Link to="/owners/new">
          <button className="btn-primary">Novo Dono</button>
        </Link>

        <div className="list">
          {owners.map(o => (
            <div className="list-item" key={o.id}>
              <div className="list-info">
                <strong>{o.name}</strong>
                <span>{o.phone}</span>
              </div>

              <div className="actions">
                <Link to={`/owners/${o.id}/edit`}>
                  <button className="btn-secondary">Editar</button>
                </Link>

                <button
                  className="btn-danger"
                  onClick={() => remove(o.id)}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
