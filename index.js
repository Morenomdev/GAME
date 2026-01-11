const express = require('express');
const cors = require('cors');

//instance
const app = express();

//disable error with cors
app.use(cors());
//enable json
app.use(express.json());

const players = [];

class Player {
  constructor(id) {
    this.id = id;
  }

  asignMokepon(mokepon) {
    this.mokepon = mokepon;
  }
}

app.get('/join', (req, res) => {
  const id = `${Math.random()}`;
  const player = new Player(id);
  players.push(player);
  res.send(id);
});

app.post('/mokepon/:playerId', (req, res) => {
  const playerId = req.params.playerId || '';
  const name = req.body.mokepon || '';
  const mokepon = new Mokepon(name);
  
  const playerIndex = players.findIndex((player) => playerId === player.id)

  if (playerIndex >= 0) {
    players[playerIndex].asignMokepon(mokepon)
  }
  console.log(players);
  console.log(playerId);
  res.end();
});

class Mokepon {
  constructor(name) {
    this.name = name;
  }
}

//listen petitions
app.listen(8080, () => {
  console.log('server working');
});
