const { pool } = require('../db');

exports.getAll = async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM owners');
  res.json(rows);
};

exports.getById = async (req, res) => {
  const [rows] = await pool.query(
    'SELECT * FROM owners WHERE id = ?',
    [req.params.id]
  );
  if (!rows.length) return res.status(404).json({ error: 'Owner not found' });
  res.json(rows[0]);
};

exports.create = async (req, res) => {
  const { name, phone, address } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone are required' });
  }

  const [result] = await pool.query(
    'INSERT INTO owners (name, phone, address) VALUES (?, ?, ?)',
    [name, phone, address]
  );

  res.status(201).json({ id: result.insertId });
};

exports.update = async (req, res) => {
  const { name, phone, address } = req.body;

  await pool.query(
    'UPDATE owners SET name=?, phone=?, address=? WHERE id=?',
    [name, phone, address, req.params.id]
  );

  res.json({ message: 'Owner updated' });
};

exports.remove = async (req, res) => {
  try {
    await pool.query('DELETE FROM owners WHERE id=?', [req.params.id]);
    res.json({ message: 'Owner deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Owner has pets linked' });
  }
};