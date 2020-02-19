import './Piece.css';
import React from 'react';

export default class Piece extends React.Component {
  constructor(player, iconUrl) {
    super();
    this.player = player;
    this.style = { backgroundImage: "url('" + iconUrl + "')" };
  }

  generateMovePath = (origin, destination, incrementor) => {
    const path = [];
    if (origin < destination && incrementor !== 0) {
      for (let index = origin; index < destination + 1; index += incrementor) {
        path.push(index);
      }
    } else if (origin > destination && incrementor !== 0) {
      for (let index = destination; index < origin + 1; index += incrementor) {
        path.push(index);
      }
    }
    return path;
  };
}
