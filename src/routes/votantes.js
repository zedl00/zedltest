const express = require('express');
const router = express.Router();

const pool    = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/add', isLoggedIn, (req, res) => {
    res.render('votantes/add');
});

// INSERT DATA en la Base de Datos

router.post('/add', isLoggedIn, async (req, res) => {
    //console.log(req.body);

    const { 
        nombre, 
        apellido, 
        cedula,
        celular,
        telefono,
        direccion,
        colegio_id,
        mesa_id,
        comentario
    } = req.body;

    const newLink = {
        nombre, 
        apellido,
        cedula,
        celular,
        telefono,
        direccion,
        colegio_id,
        mesa_id,
        comentario,
        user_id: req.user.id
    };

    //console.log(newLink);
    
    await pool.query('INSERT INTO votantes set ?', [newLink]);  
    req.flash('success', 'Votante guardado exitosamente!');
    res.redirect('/votantes');
    //res.send('Received');
});

// LISTAR DATA en la Base de Datos

router.get('/', isLoggedIn, async (req, res) => {
    const votantes = await pool.query('SELECT * FROM votantes WHERE user_id = ?', [req.user.id]); 
    //res.send('Listas Iran aqui.')
    
    //console.log(votantes);
    
    res.render('votantes/list', { votantes });
});

// LISTAR DATA Horizontal

router.get('/listado', isLoggedIn, async (req, res) => {
    const votantes = await pool.query('SELECT * FROM votantes WHERE user_id = ?', [req.user.id]); 
    //res.send('Listas Iran aqui.')
    
    //console.log(votantes);
    
    res.render('votantes/listh', { votantes });
});

// BORRAR DATA en la base de datos

router.get('/delete/:id', isLoggedIn, async (req, res) => {
    //console.log(req.params.id);
    //res.send('Eliminado !');
    const { id } = req.params;
    await pool.query('DELETE FROM votantes WHERE ID = ?', [id]);
    req.flash('success', 'Votante borrado satisfactoriamente !');
    res.redirect('/votantes');
});

router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    //console.log(id);
    //res.send('Received !');
    const votantes = await pool.query('SELECT * FROM votantes WHERE id = ?', [id]);
    //console.log(links[0]);
    res.render('votantes/edit', {votante: votantes[0]});
});

router.post('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const { 
        nombre, 
        apellido, 
        cedula,
        celular,
        telefono,
        direccion,
        colegio_id,
        mesa_id,
        comentario
     } = req.body;

    const newLink = {
        nombre, 
        apellido, 
        cedula,
        celular,
        telefono,
        direccion,
        colegio_id,
        mesa_id,
        comentario
    };
    req.flash('success', 'Votante Actualizado Satisfactoriamente');
    //console.log(newLink);
    //res.send('Updated !');
    await pool.query('UPDATE votantes SET ? WHERE id = ?', [newLink, id]);
    res.redirect('/votantes');
});


module.exports = router;
