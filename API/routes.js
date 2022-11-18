const express = require('express')
const routes = express.Router()

routes.get('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM titulares', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.post('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO titulares SET ?;', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('book added!')
        })
    })
})

routes.delete('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM titulares WHERE id = ?', [req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('book excluded!')
        })
    })
})

routes.put('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE titulares set ? WHERE id = ?', [req.body, req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('book updated!')
        })
    })
})

// MIS RUTAS

routes.get('/usuario/:usuario/:rol/:patente', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT Usuario,Patente,Rol FROM usuarios WHERE Usuario=? AND Rol=? AND Patente=?',[req.params.usuario, req.params.rol, req.params.patente], (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.get('/encargado/:usuario/:contrasena', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT Usuario,Contraseña FROM usuarios WHERE Usuario=? AND Contraseña=?',[req.params.usuario, req.params.contrasena], (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })  
})


routes.get('/usuariologin/:patente', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM datosusuarios WHERE Patente=?',[req.params.patente], (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.post('/crearinvitado', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO datosinvitado SET ?;', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('invitado creado')
        })
    })
})

routes.get('/datosinvitado', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM datosinvitado WHERE ID=(SELECT MAX(ID) FROM datosinvitado)', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.get('/nopagoinvitado', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM datosinvitado WHERE Estado="No Pago"', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.get('/nopagoinvitadomenu/:patente', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM datosinvitado WHERE Patente=? AND Estado="No pago"',[req.params.patente], (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.get('/seleccionarplaza', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT Identificador FROM plazas WHERE Estado="Libre" AND Habilitado="Si" ORDER BY ID LIMIT 1', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.put('/plazainvitado/:plaza/:patente', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE datosinvitado SET Plaza=? WHERE Patente=?', [req.params.plaza, req.params.patente], (err, rows)=>{
            if(err) return res.send(err)

            res.send('patente insertada')
        })
    })
});

routes.put('/actualizarplaza/:estado/:identificador', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE plazas SET Estado=? WHERE Identificador=?', [req.params.estado, req.params.identificador], (err, rows)=>{
            if(err) return res.send(err)

            res.send('plaza actualizada')
        })
    })
})

routes.put('/actualizarestadoinvitado/:estado/:patente', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE datosinvitado SET Estado=? WHERE Patente=? AND Estado="No pago"', [req.params.estado, req.params.patente], (err, rows)=>{
            if(err) return res.send(err)

            res.send('estado actualizado')
        })
    })
})

routes.put('/actualizarestadousuario/:estado/:patente', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE datosusuarios SET Estado=? WHERE Patente=? AND Estado="No pago"', [req.params.estado, req.params.patente], (err, rows)=>{
            if(err) return res.send(err)

            res.send('estado actualizado')
        })
    })
})

routes.post('/postusuario', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO datosusuarios SET ?;', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('invitado creado')
        })
    })
})

routes.get('/listapatentes', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT Patente FROM datosusuarios', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.get('/estadodelpago/:patente', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT Estado FROM datosusuarios WHERE Patente=?',[req.params.patente], (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.post('/anadirvisita', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO visitas SET ?;', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('visita creada')
        })
    })
})

routes.get('/nopagousuariomenu/:patente', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT Patente,Plaza,Estado FROM datosusuarios WHERE Patente=? AND Estado="No pago"',[req.params.patente], (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.get('/nopagousuario', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT Patente,Plaza,Estado FROM datosusuarios WHERE Estado="No Pago"', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.get('/listadevisitas', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM visitas',[req.params.patente], (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.delete('/borrarusuario/:patente', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM datosusuarios WHERE Patente=?', [req.params.patente], (err, rows)=>{
            if(err) return res.send(err)

            res.send('jugador borrado')
        })
    })
})

routes.get('/listadni', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT DNI FROM usuarios', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.post('/postencargado', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO usuarios SET ?;', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('usuario creado')
        })
    })
})

routes.get('/habilitaciones/:piso', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT Habilitado FROM plazas WHERE Piso=? LIMIT 1',[req.params.piso], (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.get('/plazasocupadas/:piso', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT Estado FROM plazas WHERE Piso=?',[req.params.piso], (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.put('/habilitarpiso/:bool/:piso', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE plazas SET Habilitado=? WHERE Piso=?', [req.params.bool, req.params.piso], (err, rows)=>{
            if(err) return res.send(err)

            res.send('estado actualizado')
        })
    })
})

routes.get('/gananciasdiarias', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT Dia,Mes,Año,SUM(TOTAL) As Ganancia from datosinvitado GROUP BY DIA', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.get('/gananciasmensuales', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT Mes,Año,SUM(TOTAL) As Ganancia from datosinvitado GROUP BY MES', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.get('/visitasdiarias', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT Dia,Mes,Año,COUNT(*) AS Visitas from visitas GROUP BY DIA', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.get('/visitasmensuales', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT Mes,Año,COUNT(*) AS Visitas from visitas GROUP BY MES', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.get('/morosos', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * from datosusuarios WHERE Estado="No pago"', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.put('/precioinvitado/:precio', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE precios set Precioinvitado=?', [req.params.precio], (err, rows)=>{
            if(err) return res.send(err)

            res.send('precio actualizado')
        })
    })
})

routes.put('/mensualidad/:precio', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE precios set Mensualidad=?', [req.params.precio], (err, rows)=>{
            if(err) return res.send(err)

            res.send('precio actualizado')
        })
    })
})

routes.get('/getprecioinvitado', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT Precioinvitado from precios', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.get('/getmensualidad', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT Mensualidad from precios', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

module.exports = routes