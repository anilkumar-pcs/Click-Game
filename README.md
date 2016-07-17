# Click-Game
Multiplayer game implemented using the following technologies : 

### Client side

* HTML5, CSS3, <a href="http://getbootstrap.com/" target="_blank">Twitter bootstrap</a> and <a href="http://fortawesome.github.io/Font-Awesome/" target="_blank">Font awesome</a> to make a nice looking UI
* <a href="http://jquery.com/" target="_blank">JQuery</a> for client side logic
* <a href="http://socket.io/" target="_blank">Socket.io</a> client to make real time gaming possible

### Server side

* <a href="http://nodejs.org/" target="_blank">Node JS</a> as web server
* <a href="http://expressjs.com/" target="_blank">Express JS</a> as web framework
* <a href="http://socket.io/" target="_blank">Socket.io</a> server to make real time gaming possible
* <a href="http://handlebarsjs.com/" target="_blank">Handlebars.js</a> to easily render HTML templates

#Application Flow
* Player can either create/join a game.
* To join a game a <b>token</b> is required.(Available readily at the creator/host of the game)
* Once player joined the game he need to wait until game creator/host starts the game.
* As the game is started, once can click a cell to acquire it --- Need to be fast to win the game.
* When all the cells are acquired then game is completed and winners are declared.

#Game - Instructions
- On the home page players should be able to start a game or join current games.
- Each player is assigned a random color, when he/she joins the game.
- A board of configurable dimension will be shown to all the players.
- Player who created can start the game.
- Each player can hover over the board and squares will light up with their assigned color
- Player can select the square by clicking it
- A player can acquire the square by clicking it
- Once a square is acquired it gets filled with the player's color
- An acquired square cannot be taken by any other player and its color will not change on hovering
- Once a square is selected by a player, all players are blocked for x seconds to do anything
- After x seconds, board becomes available again for all the players
- Game ends when all squares are colored and players with maximum squared colored wins.

### Build and Run the application

#### Prerequisites

* Node JS

#### Run the application

```
$> npm install
$> node app.js
```

Browse the following address: `http://localhost:8000`
