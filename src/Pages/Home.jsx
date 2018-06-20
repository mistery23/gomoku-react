import React, { Component} from 'react';
import { Row, Col, Input, Button } from 'react-materialize';
import Header from './../Components/Header';
import {Redirect} from 'react-router';
import { connect } from 'react-redux';
import store from 'store';

import { addPlayers } from './../actions/addPlayer';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            players: {
                player_First: '',
                player_Second: '',
            },
            fireRedirect: false,
            validation: false
        }
    }
    
    handleChange = (e) => {
        let { players } = this.state;
        players[e.target.name] = e.target.value;

        this.setState({
            players: players
        });
    }

    onSubmit = (e) => {
        e.preventDefault();

        let { players } = this.state;
        if (players.player_First === '' || players.player_Second === '' ) {
            this.setState({
                validation: true
            })
            return false
        } else {

            let playersArr = Object.keys(players).map(function (key) { return players[key]; });
            store.set('players', playersArr)
            
            this.props.dispatch(addPlayers(playersArr))
            this.setState({ fireRedirect: true, validation: false })
        }
    }

    render(){
        const { fireRedirect, validation } = this.state;

        return(
            <div>
               <Header/>
                <Row>
                    <Col s={10} offset='s1' style={{ paddingTop: 65 }}>
                        <div className="pt40 pb40">
                            <div className="pt40 pb40 card">
                                <form onSubmit={this.onSubmit}>
                                    <h5 className="text-center">Введите имена игроков</h5>
                                    <Row>
                                        <Input name="player_First" s={6} label="Игрок 'X'" validate onChange={(e) => this.handleChange(e)} />
                                        <Input name="player_Second" s={6} label="Игрок 'O'" validate onChange={(e) => this.handleChange(e)} />
                                        <div className="text-center">
                                            {validation && <p style={{color: 'red', textAlign: 'center'}}>Введите имена игроков </p>
                                            }
                                            <Button  waves='light'> Начать игру </Button>
                                        </div>
                                    </Row>
                                </form>
                                {fireRedirect && (
                                    <Redirect to={'/game'} />
                                )}
                            </div>
                        </div>
                    </Col>

                </Row>
            </div>
        )
    }
}

function mapStateToProps(state) {

    return {
        players: state.players.players
    }
}

function mapDispatchToProps(dispatch) {

    return {
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);


