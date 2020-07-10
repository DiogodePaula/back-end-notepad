const express = require('express');
const database = require('./database');
const server = express();
server.use(express.json());

//evitar erros de CORS
server.use((req, res, next) => {
    res.header('Access-Control-Aloow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

server.get('/', (req, res) => {
    return res.json({
        result: 'Api-Notepad'
    });
});

server.get('/notepad', async (req, res) => {
    let notepad
    await database.query(`SELECT * FROM notepad;`, 
    {type: database.QueryTypes.SELECT})
        .then(note => {
            notepad = note;
        })
        .catch(err => {
            return res.json(err);
        })

    return res.json({notepad});
})

server.get('/notepad/:id', async (req, res) => {
    const {id} = req.params;
    let note;

    await database.query(`SELECT * FROM notepad WHERE id = ${id};`, 
    {type: database.QueryTypes.SELECT})
        .then(noteResult => {
            note = noteResult;
        })
        .catch(err => {
            return res.json(err);
        })
        return res.json({note})
})

server.post('/notepad', async (req, res) => {
    let inseriu;
    const {id, title, content, date, hour} = req.body;

    await database.query(`INSERT INTO notepad VALUES(${id}, '${title}', '${content}', '${date}', '${hour}');`,
    {type: database.QueryTypes.INSERT})

})