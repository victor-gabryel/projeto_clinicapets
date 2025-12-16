import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';

export default function OwnerForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: ''
  });

  const isEdit = !!id;

  useEffect(() => {
    if (isEdit) {
      api.get(`/owners/${id}`).then(res => setForm(res.data));
    }
  }, [id, isEdit]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submit(e) {
    e.preventDefault();

    if (!form.name || !form.phone) {
      alert('Nome e telefone são obrigatórios');
      return;
    }

    if (isEdit) {
      await api.put(`/owners/${id}`, form);
    } else {
      await api.post('/owners', form);
    }

    navigate('/owners');
  }

  return (
    <div className="container">
      <header>
        <h1>Clínica Veterinária</h1>
        <nav>
          <button onClick={() => navigate('/owners')}>
            Voltar
          </button>
        </nav>
      </header>

      <div className="card">
        <h2>{isEdit ? 'Editar Dono' : 'Novo Dono'}</h2>

        <form className="form" onSubmit={submit}>
          <label>Nome</label>
          <input
            name="name"
            placeholder="Nome do dono"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label>Telefone</label>
          <input
            name="phone"
            placeholder="Telefone"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <label>Endereço</label>
          <input
            name="address"
            placeholder="Endereço"
            value={form.address}
            onChange={handleChange}
          />

          <div className="actions">
            <button className="btn-primary" type="submit">
              Salvar
            </button>

            <button
              className="btn-secondary"
              type="button"
              onClick={() => navigate('/owners')}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
