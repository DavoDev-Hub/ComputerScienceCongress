var express = require('express');
var router = express.Router();

let actividades = [
    { id: 1, nombre: 'Taller de React', tipo: 'academico' },
    { id: 2, nombre: 'Torneo de Smash', tipo: 'recreativo' }
];

router.get('/', function(req, res) {
    res.json(actividades);
});

router.get('/:id', function(req, res) {
    const actividad = actividades.find((a) => a.id === parseInt(req.params.id));
    if (actividad) {
        res.json(actividad);
    } else {
        res.status(404).send('User not found');
    }
});

router.post('/', function(req, res) {
    const nuevaActividad = {
        id: actividades.length + 1,
        nombre: req.body.nombre,
        tipo: req.body.tipo
    };

    actividades.push(nuevaActividad);
    res.status(201).json(nuevaActividad);
});

router.put('/:id', function(req, res) {
    const id = parseInt(req.params.id);
    const index = actividades.findIndex(a => a.id === id);
    if (index === -1) return res.status(404).json({ mensaje: 'No encontrada' });

    actividades[index].nombre = req.body.nombre;
    actividades[index].tipo = req.body.tipo;

    res.json(actividades[index]);

});

module.exports = router;
