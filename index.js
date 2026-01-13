const express = require('express');
const cors = require('cors');

//instance
const app = express();

app.use(express.static(path.join(__dirname, "public")))

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

  updatePosition(x, y) {
    this.x = x;
    this.y = y;
  }
  asignAttacks(attacks) {
    this.attacks = attacks
  }
}
class Mokepon {
  constructor(name) {
    this.name = name;
  }
}


app.get('/join', (req, res) => {
  const id = `${Math.random()}`;
  const player = new Player(id);
  players.push(player);
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.send(id);
});

app.post('/mokepon/:playerId', (req, res) => {
  const playerId = req.params.playerId || '';
  const name = req.body.mokepon || '';
  const mokepon = new Mokepon(name);

  const playerIndex = players.findIndex((player) => playerId === player.id);

  if (playerIndex >= 0) {
    players[playerIndex].asignMokepon(mokepon);
  }
  console.log(players);
  console.log(playerId);
  res.end();
});

app.post('/mokepon/:playerId/position', (req, res) => {
  const playerId = req.params.playerId || '';
  const x = req.body.x || 0;
  const y = req.body.y || 0;

  const playerIndex = players.findIndex((player) => playerId === player.id);

  if (playerIndex >= 0) {
    players[playerIndex].updatePosition(x, y);
  }

  // const enemies = players.filter((player) => playerId !== player.id);
   const enemies = players.filter(player =>
    player.id !== playerId &&
    player.mokepon &&          // tiene mascota
    typeof player.x === 'number' &&
    typeof player.y === 'number'
  );
  res.send({
    enemies
  })
});

app.post('/mokepon/:playerId/attacks', (req, res) => {
  const playerId = req.params.playerId || '';
  const attacks = req.body.attacks || [];

  const playerIndex = players.findIndex((player) => playerId === player.id);

  if (playerIndex >= 0) {
    players[playerIndex].asignAttacks(attacks);
  }

  res.end()
});


app.get('/mokepon/:playerId/attacks', (req, res) => {
    const playerId = req.params.playerId || '';
    const player = players.find((player) => player.id === playerId)

    res.send({
      attacks: player.attacks || []
    })
})


//listen petitions
app.listen(8080, () => {
  console.log('server working');
});
