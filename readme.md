# Trivoga
> A fast-paced real-time 1v1 customizable trivia game.

Making this game was really fun. This was the first time I used Redux for a personal project of my own. It makes
everything easier to work with and will be definitally using it in the future with more projects.

## Server
The server was written in Node.JS with Socket.IO to communicate with the connected clients. The server's primary action is to store the game data along with distribute it to the players when it is updated, while the client does minor logic before sending the action to the server.

## Built With
- React
- Redux
- Chartkick with Chart.js
- Material UI
- [Dave's Fullstack System](https://github.com/imdaveead/fullstack-system/)
- Node.JS

## Roadmap
- Find some workaround if you run out of questions. Instead of not continuing when there isn't a question, make end the game.
- Dark theme?
