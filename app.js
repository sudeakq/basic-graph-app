const express = require('express');
const neo4j = require('neo4j-driver');
const cors = require('cors');



const app = express();
const port = 3000;


app.use(cors({
    origin: 'http://127.0.0.1:5500'
}));



// Neo4j Driver Ayarları
const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', 'asdfasdf'));
const session = driver.session();

app.use(express.json());

// CRUD İşlemleri

// Create
app.post('/create', async (req, res) => {
    const {
        Perpetrator,
        PerpHouse,
        Victim,
        VictimHouse,
        Betrayal,
        Relationship,
        ImmediateConsequence,
        Geography
    } = req.body;
    try {
        const result = await session.run(
            `
            MERGE (perp:Character{name: $Perpetrator, house: $PerpHouse})
            MERGE (victim:Character{name: $Victim, house: $VictimHouse})
            MERGE (perp)-[b:Betrayal{
                Betrayal_Description: $Betrayal, 
                Relationship_perp_victim: $Relationship, 
                Immediate_Consequence: COALESCE($ImmediateConsequence, ''),
                Location: COALESCE($Geography, '')
            }]->(victim)
            RETURN perp, victim, b
            `, {
                Perpetrator,
                PerpHouse,
                Victim,
                VictimHouse,
                Betrayal,
                Relationship,
                ImmediateConsequence,
                Geography
            }
        );
        res.status(201).send(result.records[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


// Read
app.get('/read', async (req, res) => {
    try {
        const result = await session.run(`MATCH (p)-[r:Betrayal]->(v) RETURN p, r, v LIMIT 10000`);
        res.send(result.records);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Update
app.put('/update', async (req, res) => {
    const {
        Perpetrator,
        Victim,
        Betrayal,
        NewDescription
    } = req.body;
    try {
        const result = await session.run(
            `MATCH (perp:Character{name: $Perpetrator})-[betrayal:Betrayal]->
            (victim:Character{name: $Victim})
      WHERE betrayal.Betrayal_Description = $Betrayal
      SET betrayal.Betrayal_Description = $NewDescription
      RETURN perp, victim, betrayal`, {
                Perpetrator,
                Victim,
                Betrayal,
                NewDescription
            }
        );
        res.send(result.records[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Delete
app.delete('/delete', async (req, res) => {
    const {
        Perpetrator,
        Victim,
        Betrayal
    } = req.body;
    try {
        const result = await session.run(
            `   MATCH (perp:Character{name: $Perpetrator})-[betrayal:Betrayal]->
            (victim:Character{name: $Victim})
      WHERE betrayal.Betrayal_Description = $Betrayal
      DELETE betrayal`, {
                Perpetrator,
                Victim,
                Betrayal
            }
        );
        res.send(result.records[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});