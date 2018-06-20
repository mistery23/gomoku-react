import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './../Components/Header';
import Gameboard from "./../Components/Gameboard";
import { Row, Col, CardPanel, Button } from 'react-materialize';
import { confirmAlert } from 'react-confirm-alert';
import store from 'store';

class GamePage extends Component {
    constructor(props) {
        super(props);
        this.state= {
            turn: 0
        }
       
    }

    turnPlayer = (turn) => {
        this.setState({
            turn: turn
        })
    }

    playerList =() => {
        let self = this;
        let players = store.get('players')
        return players.map(function (player, index) {
            let classes = index === self.state.turn ? 'active' : '';
            return <p key={index + player} className={classes} > Игрок {(index + 1) === 1 ? 'X' : 'O'}: <b> {player}</b> </p>
        });
    }

    resetGame = () => {
        confirmAlert({
            title: '  Вы уверены, что хотите это сделать?',
            message: 'Игровой процес будет утерян',
            buttons: [
                {
                    label: 'Сбросить',
                    onClick: () => {
                        this.setState({ resetGame: true },()=>{
                            this.setState({ resetGame: false })
                        })
                    }
                },
                {
                    label: 'Продолжить игру',
                    onClick: () => { }
                }
            ]
        })
    }
    render() {
        return (
            <div>
                <Header 
                    path={this.props.location.pathname}
                />
                <Row>
                   
                    <Col m={12} className='fixed p0' style={{ top: 64 }}>
                        <CardPanel className="teal lighten-4 black-text d-flex content-beetwen" >
                            <div className="playerList">
                                {this.playerList()}
                            </div>
                            <Button onClick={this.resetGame}>Сбросить игру</Button>
                        </CardPanel>
                    </Col>
                    <Col m={12} style={{paddingTop: 140}}>
                    <div>
                        <Gameboard
                            size={15}
                            fetchTurn={this.turnPlayer}
                            players={this.props.players.players}
                            resetGame = {this.state.resetGame}
                        />
                        </div>
                    </Col>
                </Row>

            </div>
        )
    }
}

function mapStateToProps(state) {

    return {
      ...state
    }
}

export default connect(mapStateToProps)(GamePage);