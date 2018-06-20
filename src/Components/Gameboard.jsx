
import React from 'react';
import Square from './Square.jsx';
import { confirmAlert } from 'react-confirm-alert';
import { Redirect } from 'react-router';
import store from 'store';

class Gameboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      turn : 0,
      row: -1,
      col: -1,
      gameOver: false,
      fireRedirect: false,
      symbol: 'X',

    }
    this.matrix = this.createMatrix(this.props.size);
    

    // initialize matrix board
    this.props = props;

    this.players = props.players
    this.matrixLength = props.size
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.resetGame ){
      this.resetGame()
    }
  }

  //create board matrix
  createMatrix(count){
    const matrix = [];
    for (let i = 0; i < count; i++) {
      const row = [];
      for (let y = 0; y < count; y++) {
        row.push(
          <Square
          id={i + '-' + y}
          opacity={this.getOpacity(i, y)}
          value={''}
          key={i * this.props.size + y}
          onClick={this.onClick}/>
        );
      }


      matrix.push(row);

    }
    return matrix;
  }

  //expanding Matrix
  expandMatrix(step) {
    for (let i = 0; i < step; i++) {
      const row = [];
      for (let y = 0; y < this.matrixLength; y++) {
        row.push( <Square
          id={`${i + this.matrixLength}-${y}`}
          opacity={this.getOpacity(i, y)}
          value={''}
          key={i * this.matrixLength + '-' + y }
          onClick={this.onClick} />
        );
      }

      this.matrix.push(row);
    }
    for (let i = 0; i < this.matrix.length; i++) {
      const col = [];
      for (let y = 0; y < step; y++) {

        col.push(
          <Square
            id={`${i}-${y + this.matrixLength}`}
            opacity={this.getOpacity(i, y)}
            value={''}
            key={i * y + this.matrixLength + '-'+y}
            onClick={this.onClick}  />
        );
      }
      this.matrix[i].push(...col);
    }
    this.matrixLength += step;
  }

 //switch Player
  toggleTurnPlayer = () => {
    this.setState( {
      turn: this.state.turn === 0 ? 1 : 0,
      symbol: this.state.symbol === 'X' ? 'O' : 'X',
    }, ()=>{
      this.props.fetchTurn(this.state.turn)
    })
  }

  // event click on cell
  onClick = (id) => {
    const [row, col] = id.split('-');
    if(this.state.gameOver){ return false }
    this.setState({row:row, col:col})
    if (this.matrix[row][col].props.value === ''){

      if (+row === (this.matrixLength - 1) || +col === (this.matrixLength - 1)) {
        this.expandMatrix(1);
       // setTimeout(() => {
       //   document.querySelector(".boardWrap >div ").scrollTo(
       //     document.querySelector(".boardWrap >div").scrollWidth,
       //     document.querySelector(".boardWrap >div").scrollHeight);
      //  }, 500);
      }
      window.requestAnimationFrame(() => { this.update(row, col)});
    }
  }

  // functions checks game logic
  checkHorizontal(row, coll, way = 1, count = 1 ) {
    let i = coll + way ;
    for (; i <= this.matrix[row].length;) {
      if (this.matrix[row][i] && this.matrix[row][i].props.value === this.state.symbol) {
        count++;
        i = i + way;
      } else {
        return (way === -1) ? null : this.checkHorizontal(+row, +coll, -1, count);
      }
      if (count === 5) {

        return count;
      }
    }
    return false;
  }

  checkVertical(row, cell, way = 1, count = 1) {
    let i = row + way;
    for (; i <= this.matrix.length;) {
      if (this.matrix[i] && this.matrix[i][cell].props.value === this.state.symbol) {
        count++;
        i = i + way;
      } else {
        return (way === -1) ? null : this.checkVertical(+row, +cell, -1, count);
      }
      if (count === 5) {
        return count;
      }
    }
    return false;
  }

  checkDiagonalLeft_Right(row, cell, way = 1, count = 1) {
    let i = row + way;
    let cellI = cell + (way === 1 ? 1 : -1);
    for (; i <= this.matrix.length;) {
      if (this.matrix[i] && this.matrix[i][cellI] && this.matrix[i][cellI].props.value === this.state.symbol) {
        if (way === -1) {
          i--;
          cellI--;
        } else {
          i++;
          cellI++;
        }
        count++;
      } else {
        return way === 1 ? null : this.checkDiagonalLeft_Right(+row, +cell, 1, count);
      }
      if (count === 5) {
        return count;
      }
    }
    return false;
  }

  checkDiagonalRight_Left(row, cell, way = 1, count = 1) {
    let i = row + way;
    let cellI = cell + (way === 1 ? -1 : 1);
    for (; i <= this.matrix.length;) {
      if (this.matrix[i] && this.matrix[i][cellI] && this.matrix[i][cellI].props.value === this.state.symbol) {
        if (way === -1) {
          i--;
          cellI++;
        } else {
          i++;
          cellI--;
        }
        count++;
      } else {
        return (way === 1) ? null : this.checkDiagonalRight_Left(+row, +cell, 1, count);
      }
      if (count === 5) {
        return count;
      }
    }
    return false;
  }

  // function check game winner
  checkWinner = (symbol) => {

    this.setState({
      gameOver: true
    })

    let players = store.get('players');
    let winner;

    symbol === 'X' ? winner = players[0] : winner = players[1];

    confirmAlert({
      title: 'Игра закончера!',
      message: `Победил: ${winner}`,
      buttons: [
        {
          label: 'Начать сначала',
          onClick: () => {
            this.resetGame()
          }
        },
        {
          label: 'Закончить игру',
          onClick: () => {
             this.setState({ fireRedirect: true })
           }
        }
      ]
    })
  }
  // reset game
  resetGame = () => {
    this.setState({
      gameOver: false,
      turn: 0,
      row: -1,
      col: -1,
      symbol: 'X',
    })
    this.matrix = this.createMatrix(this.props.size);
    this.matrixLength = this.props.size
  }

  // updates game process
  update(row, col) {
    let { symbol } = this.state;
    if (row >= 0 && col >= 0) {
      this.matrix[row][col] = (
        <Square
        id={row + '-' + col}
        opacity={this.getOpacity(row, col)}
        value={symbol}
        key={row * this.props.size + col}
        onClick={this.onClick}   />
      );
    }

    if (
      this.checkHorizontal(+row, +col) ||
      this.checkVertical(+row, +col) ||
      this.checkDiagonalRight_Left(+row, +col, -1) ||
      this.checkDiagonalLeft_Right(+row, +col, -1)
    ){
      this.checkWinner(symbol)
    } else {
      this.toggleTurnPlayer()
    }
  }

  getOpacity(row, col) {
    if (this.state != null && row === this.state.row && col === this.state.col) {
      return '#e84248';
    } else {
      return '#ee6e73';
    }
  }


  render() {
    let { fireRedirect } = this.state;

    let rows = this.matrix.map(function (item, i) {
      return (
        <div className="board-row" key={i}>
          {item}
        </div>
      );
    });
   
    return(
      <div className="boardWrap">
          <div className="board">
            {rows}
          </div>
        {fireRedirect && (
          <Redirect to={'/'} />
        )}
      </div>
    );
  }
}

export default Gameboard;