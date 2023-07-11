const express = require('express');
const Pharmacy = require('../models/Pharmacies');

const router = express.Router();

// Criação de uma farmácia
router.post('/', async (req, res) => {
  try {
    const pharmacy = await Pharmacy.create(req.body);
    res.json(pharmacy);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar farmácia' });
  }
});

// Listagem de todas as farmácias
router.get('/', async (req, res) => {
  try {
    const pharmacies = await Pharmacy.findAll();
    res.json(pharmacies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao listar todas as farmácias' });
  }
});

// Detalhes de uma farmácia por ID
router.get('/:id', async (req, res) => {
  try {
    const pharmacyId = req.params.id;
    const pharmacy = await Pharmacy.findByPk(pharmacyId);
    if (pharmacy) {
      res.json(pharmacy);
    } else {
      res.status(404).json({ error: 'Farmácia não encontrada' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao encontrar Farmácia' });
  }
});

// Atualização de uma farmácia por ID
router.put('/:id', async (req, res) => {
  try {
    const pharmacyId = req.params.id;
    const [updateRowsCount] = await Pharmacy.update(req.body, { where: { id: pharmacyId } });
    if (updateRowsCount === 1) {
      res.json({ message: 'Farmácia atualizada com sucesso' });
    } else {
      res.status(404).json({ error: 'Farmácia não encontrada' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar farmácia' });
  }
});

// Exclusão de uma farmácia por ID
router.delete('/:id', async (req, res) => {
  try {
    const pharmacyId = req.params.id;
    const deletedRowCount = await Pharmacy.destroy({ where: { id: pharmacyId } });
    if (deletedRowCount === 1) {
      res.json({ message: 'Farmácia excluída com sucesso' });
    } else {
      res.status(404).json({ error: 'Farmácia não encontrada' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao excluir a farmácia' });
  }
});

module.exports = router;
