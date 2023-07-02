const express = require('express');
const Market = require('../models/market.js');

const router = express.Router();

// Criação de um supermercado
router.post('/', async (req, res) => {
  try {
    const market = await Market.create(req.body);
    res.json(market);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar supermercado' });
  }
});

// Listagem de todos os supermercados
router.get('/', async (req, res) => {
  try {
    const markets = await Market.findAll();
    res.json(markets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao listar todos os supermercados' });
  }
});

// Detalhes de um supermercado por ID
router.get('/:id', async (req, res) => {
  try {
    const marketId = req.params.id;
    const market = await Market.findByPk(marketId);
    if (market) {
      res.json(market);
    } else {
      res.status(404).json({ error: 'Supermercado não encontrado' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao encontrar Supermercado' });
  }
});

// Atualização de um supermercado por ID
router.put('/:id', async (req, res) => {
  try {
    const marketId = req.params.id;
    const [updateRowsCount] = await Market.update(req.body, { where: { id: marketId } });
    if (updateRowsCount === 1) {
      res.json({ message: 'Supermercado atualizado com sucesso' });
    } else {
      res.status(404).json({ error: 'Supermercado não encontrado' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar supermercado' });
  }
});

// Exclusão de um supermercado por ID
router.delete('/:id', async (req, res) => {
  try {
    const marketId = req.params.id;
    const deletedRowCount = await Market.destroy({ where: { id: marketId } });
    if (deletedRowCount === 1) {
      res.json({ message: 'Supermercado excluído com sucesso' });
    } else {
      res.status(404).json({ error: 'Supermercado não encontrado' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao excluir o supermercado' });
  }
});

module.exports = router;
