const { pool } = require('../db');

exports.getAll = async (req, res) => {
  const [rows] = await pool.query(`
    SELECT appointments.*, pets.name AS pet_name
    FROM appointments
    JOIN pets ON pets.id = appointments.pet_id
  `);
  res.json(rows);
};

exports.create = async (req, res) => {
  const { pet_id, date, veterinarian_name, description, status } = req.body;

  if (!pet_id || !date || !veterinarian_name) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  await pool.query(
    `INSERT INTO appointments
     (pet_id, date, veterinarian_name, description, status)
     VALUES (?, ?, ?, ?, ?)`,
    [pet_id, date, veterinarian_name, description, status]
  );

  res.status(201).json({ message: 'Appointment created' });
};

// ✅ UPDATE COMPLETO (quando editar tudo)
exports.update = async (req, res) => {
  const { date, veterinarian_name, description, status } = req.body;

  await pool.query(
    `UPDATE appointments
     SET date=?, veterinarian_name=?, description=?, status=?
     WHERE id=?`,
    [date, veterinarian_name, description, status, req.params.id]
  );

  res.json({ message: 'Appointment updated' });
};

// ✅ UPDATE APENAS STATUS (ESSA É A CHAVE)
exports.updateStatus = async (req, res) => {
  const { status } = req.body;

  await pool.query(
    `UPDATE appointments
     SET status=?
     WHERE id=?`,
    [status, req.params.id]
  );

  res.json({ message: 'Status updated' });
};

exports.remove = async (req, res) => {
  await pool.query(
    'DELETE FROM appointments WHERE id=?',
    [req.params.id]
  );
  res.json({ message: 'Appointment deleted' });
};
