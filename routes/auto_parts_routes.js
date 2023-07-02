const express = require('express');
const AutoPart = require('../models/auto_parts.js');

const router = express.Router();

// Criação de uma auto peça
router.post('/', async (req, res) => {
  try {
    const autoPart = await AutoPart.create(req.body);
    res.json(autoPart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar auto peça' });
  }
});

// Listagem de todas as auto peças
router.get('/', async (req, res) => {
  try {
    const autoParts = await AutoPart.findAll();
    res.json(autoParts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao listar todas as auto peças' });
  }
});

// Detalhes de uma auto peça por ID
router.get('/:id', async (req, res) => {
  try {
    const autoPartId = req.params.id;
    const autoPart = await AutoPart.findByPk(autoPartId);
    if (autoPart) {
      res.json(autoPart);
    } else {
      res.status(404).json({ error: 'Auto peça não encontrada' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao encontrar Auto Peça' });
  }
});

// Atualização de uma auto peça por ID
router.put('/:id', async (req, res) => {
  try {
    const autoPartId = req.params.id;
    const [updateRowsCount] = await AutoPart.update(req.body, { where: { id: autoPartId } });
    if (updateRowsCount === 1) {
      res.json({ message: 'Auto Peça atualizada com sucesso' });
    } else {
      res.status(404).json({ error: 'Auto Peça não encontrada' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar auto peça' });
  }
});

// Exclusão de uma auto peça por ID
router.delete('/:id', async (req, res) => {
  try {
    const autoPartId = req.params.id;
    const deletedRowCount = await AutoPart.destroy({ where: { id: autoPartId } });
    if (deletedRowCount === 1) {
      res.json({ message: 'Auto Peça excluída com sucesso' });
    } else {
      res.status(404).json({ error: 'Auto Peça não encontrada' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao excluir a auto peça' });
  }
});

module.exports = router;
