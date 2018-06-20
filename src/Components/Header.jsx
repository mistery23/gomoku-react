import React, { Component } from 'react'
import { Row, Col, Navbar, Button } from 'react-materialize';
import { Redirect } from 'react-router'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fireRedirect: false
        }
    }


    onModalConfirm = () => {
        confirmAlert({
            title: '  Вы уверены, что хотите это сделать?',
            message: 'Игровой процес будет утерян',
            buttons: [
                {
                    label: 'Перейти на главную',
                    onClick: () => {
                        this.setState({ fireRedirect: true })
                    }
                },
                {
                    label: 'Продолжить игру',
                    onClick: () =>{}
                }
            ]
        })
    }

    render() {
        const { path } = this.props;
        const { fireRedirect } = this.state;
        
        return (
            <header className="fixed">
                <Row style={{marginBottom: 0}}>
                    <Col s={12} className="p0" >
                                <Navbar brand='GOMOKU' right>
                                    {(path === "/game" ? <div>
                                        <Button onClick={this.onModalConfirm}>На главную</Button>
                                        {fireRedirect && (
                                            <Redirect to={'/'} />
                                        )}
                                    </div>
                            : null )}
                                </Navbar>
                    </Col>
                </Row>
            </header>
        )
    }
}

export default Header;