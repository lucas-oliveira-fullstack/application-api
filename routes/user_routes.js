const express = require('express');
const User = require('../models/user.js');
const router = express.Router();

// User Register
router.post('/models/user/register', async (req, res) => {
  try {
    const {
      id,
      CPF,
      mail,
      name,
      cell_phone,
      birth_date,
      age,
      gender,
      photo,
      postal_code,
      street_name,
      house_number,
      complement,
      neighborhood,
      city,
      state,
      password_18
    } = req.body;

    const user = await User.create({
      id,
      CPF,
      mail,
      name,
      cell_phone,
      birth_date,
      age,
      gender,
      photo,
      postal_code,
      street_name,
      house_number,
      complement,
      neighborhood,
      city,
      state,
      password_18
    });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
});

// Show all Users
router.get('/models/user/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao listar todos os usuários' });
  }
});

// Show User by ID
router.get('/models/user/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao encontrar Usuário' });
  }
});

// Update User by ID
router.put('/models/user/update/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, birth_date, cell_phone, password_18 } = req.body;

    const [updateRowsCount] = await User.update(
      { name, birth_date, cell_phone, password_18 },
      { where: { id: userId } }
    );

    if (updateRowsCount === 1) {
      res.json({ message: 'Usuário atualizado com sucesso' });
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
});

// Delete User by ID
router.delete('/models/user/delete/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedRowCount = await User.destroy({ where: { id: userId } });

    if (deletedRowCount === 1) {
      res.json({ message: 'Usuário excluído com sucesso' });
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao excluir o usuário' });
  }
});

module.exports = router;
