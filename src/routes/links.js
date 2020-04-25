const express = require('express');
const router = express.Router();

const pool    = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/add', isLoggedIn, (req, res) => {
    res.render('links/add');
});

// INSERT DATA en la Base de Datos

router.post('/add', isLoggedIn, async (req, res) => {
    //console.log(req.body);

    const { title, url, description } = req.body;
    const newLink = {
        title,
        url,
        description,
        user_id: req.user.id
    };

    //console.log(newLink);
    
    await pool.query('INSERT INTO links set ?', [newLink]);  
    req.flash('success', 'Link guardado exitosamente!');
    res.redirect('/links');
    //res.send('Received');
});

// LISTAR DATA en la Base de Datos

router.get('/', isLoggedIn, async (req, res) => {
    const links = await pool.query('SELECT * FROM links WHERE user_id = ?', [req.user.id]); 
    //console.log(links);
    //res.send('Listas Iran aqui.')
    console.log(links);
    res.render('links/list', { links });
});

// BORRAR DATA en la base de datos

router.get('/delete/:id', isLoggedIn, async (req, res) => {
    //console.log(req.params.id);
    //res.send('Eliminado !');
    const { id } = req.params;
    await pool.query('DELETE FROM links WHERE ID = ?', [id]);
    req.flash('success', 'Link borrado satisfactoriamente !');
    res.redirect('/links');
});

router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    //console.log(id);
    //res.send('Received !');
    const links = await pool.query('SELECT * FROM links WHERE id = ?', [id]);
    //console.log(links[0]);
    res.render('links/edit', {link: links[0]});
});

router.post('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const { title, url, description } = req.body;
    const newLink = {
        title,
        url,
        description
    };
    req.flash('success', 'Link Actualizado Satisfactoriamente')
    //console.log(newLink);
    //res.send('Updated !');
    await pool.query('UPDATE links SET ? WHERE id = ?', [newLink, id]);
    res.redirect('/links');
});


module.exports = router;


