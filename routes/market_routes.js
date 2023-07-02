const express = require('express');
const Market = require('../models/market.js');

const router = express.Router();

//Market Resgister
router.post('/models/market', async (req, res) => {
    try{
        const { id, logo, name, phone_number, open_monday_friday, close_monday_friday, open_saturday, close_saturday, open_sunday_holiday, close_sunday_holiday,postal_code, street_name, house_number, complement, neighborhood, city, state } = req.body;
        const market = await Market.create({ id, logo, name, phone_number, open_monday_friday, close_monday_friday, open_saturday, close_saturday, open_sunday_holiday, close_sunday_holiday,postal_code, street_name, house_number, complement, neighborhood, city, state });
        res.json(market);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao criar supermercado'});
    }
});

//Show all Markets
router.get('/models/market', async (req, res) => {
    try {
        const market = await Market.findAll();
        res.json(market);
    } catch {
        console.error(err);
        res.status(500).json({ error: 'Error ao listar todos os supermercados' });
    }
});

//Show Market by ID
router.get('/models/market/:id', async (req, res) => {
    try {
        const marketId = req.params.id;
        const market = await Market.findByPk(marketId);
        if (market) {
            res.json(market);
        } else {
            res.status(404).json({ error: 'Supermercado não encontrado' });
        }
    } catch {
        console.error(err);
        res.status(500).json({ error: 'Erro ao encontrar Supermercado' });
    }
});

// Update Market by ID
router.put('/models/market/:id', async (req, res) => {
    try {
        const marketId = req.params.id;
        const { id, logo, name, phone_number, open_monday_friday, close_monday_friday, open_saturday, close_saturday, open_sunday_holiday, close_sunday_holiday,postal_code, street_name, house_number, complement, neighborhood, city, state } = req.body;
        const [updateRowsCount] = await Market.update(
            {id, logo, name, phone_number, open_monday_friday, close_monday_friday, open_saturday, close_saturday, open_sunday_holiday, close_sunday_holiday,postal_code, street_name, house_number, complement, neighborhood, city, state },
            { where: {id: marketId}}
        );
        if (updateRowsCount === 1) {
            res.json({ message: 'Supermercado atualizado com sucesso' });
        }else {
            res.status(404).json({ error: 'Supermercado não encontrado' });
        }
    }catch {
        console.error(err);
        res.status(500).json ({ error: 'Erro ao atualizar supermercado' });
    }
});

//Delete Market by ID
router.delete('/models/market/:id', async (req, res) => {
    try {
        const marketId = req.params.id;
        const deletedRowCount = await Market.destroy({ where: { id: marketId } });
        if (deletedRowCount === 1) {
            res.json({ message: 'Supermercado excluído com sucesso' });
        } else {
            res.status(404).json({ error: 'Supermercado não encontrado' });
        }
    } catch {
        console.error(err);
        res.status(500).json({ error: 'Erro ao excluir o supermercado' });
    }
});

module.exports = router

