const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const knex = require('knex')( {
        client: "mysql2",
        connection: {
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: 'root',
            database: 'plant_db'
        }
});

app.listen(3000, () => {console.log('Listening on port 3000')})

app.listen(3000, () => {
    console.log('SERVER is running on port 3000');
    knex.raw('SELECT 1;')
        .then(() => {
            console.log("Connexion ok")
        })
        .catch((err) => {
            console.error("Connexion échoué", err);
        });
        
});
// app.get('/plants', (req, res) => {});  Liste des plantes
app.get('/plants', async (req, res) => {
    try {
        // SELECT * FROM plants;
        const plants = await knex('plants').select(); 
        
        res.status(200).json(plants);
    } catch (error) {
        res.status(500).json(error);
    }});
