var express = require('express');
var router = express.Router();

router.get('/:id', function(req, res) {

    const actividades = [
        { id: 1, name: 'Actividad1', descripcion: 'ActividadesCentro', imagen: 'imagen', horaInicio: '1', horaFin: '2', cupo: '20' },
    ];

    const actividad = actividades.find((a) => a.id === parseInt(req.params.id));
    if (actividad) {
        res.json(actividad);
    } else {
        res.status(404).send('User not found');
    }
});

router.post('/')

module.exports = router;
