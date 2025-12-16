const { pool } = require('../db');

exports.getAll = async (req, res) => {
  const [rows] = await pool.query(`
    SELECT pets.*, owners.name AS owner_name
    FROM pets
    JOIN owners ON owners.id = pets.owner_id
  `);
  res.json(rows);
};

exports.getById = async (req, res) => {
  const [rows] = await pool.query(
    'SELECT * FROM pets WHERE id=?',
    [req.params.id]
  );
  if (!rows.length) return res.status(404).json({ error: 'Pet not found' });
  res.json(rows[0]);
};

exports.create = async (req, res) => {
  const { name, species, breed, birthdate, owner_id } = req.body;

  if (!name || !species || !owner_id) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const [[owner]] = await pool.query(
    'SELECT id FROM owners WHERE id=?',
    [owner_id]
  );

  if (!owner) {
    return res.status(400).json({ error: 'Owner does not exist' });
  }

  const [result] = await pool.query(
    `INSERT INTO pets (name, species, breed, birthdate, owner_id)
     VALUES (?, ?, ?, ?, ?)`,
    [name, species, breed, birthdate, owner_id]
  );

  res.status(201).json({ id: result.insertId });
};

exports.update = async (req, res) => {
  const { name, species, breed, birthdate } = req.body;

  await pool.query(
    `UPDATE pets SET name=?, species=?, breed=?, birthdate=? WHERE id=?`,
    [name, species, breed, birthdate, req.params.id]
  );

  res.json({ message: 'Pet updated' });
};

exports.remove = async (req, res) => {
  try {
    await pool.query('DELETE FROM pets WHERE id=?', [req.params.id]);
    res.json({ message: 'Pet deleted' });
  } catch {
    res.status(400).json({ error: 'Pet has appointments linked' });
  }
};