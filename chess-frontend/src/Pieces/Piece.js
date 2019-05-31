import './Piece.css';

export default class Piece {
  constructor(player, iconUrl) {
    this.player = player;
    this.style = {backgroundImage: "url('"+iconUrl+"')"};
  }

  generateMovePath = (origin, destination, incrementor) => {
    const path = [];
    if( origin < destination && incrementor !== 0 ) {
      for(let index = origin; index < destination + 1; index += incrementor) {
        path.push(index);
      }
    } else if ( origin > destination && incrementor !== 0 ) {
      for(let index = destination; index < origin + 1; index += incrementor) {
        path.push(index);
      }
    }
    return path;
  }
}
