import React from 'react';


class Square extends React.Component {
    getSvg(){
        let val = this.props.value;
        if (val === 'X') {
            return  <svg height="30" width="30">
                <line x1="6" y1="8" x2="24" y2="25" stroke="black" strokeWidth="2"/>
                <line x1="6" y1="25" x2="24" y2="8" stroke="black" strokeWidth="2"/>
                </svg>
        } else if (val === 'O') {
            return <svg height="30" width="30"> <circle cx='15' cy='16' r='10' fill='none' strokeWidth='2' stroke="#FFF" /></svg>
        } else {
            return <svg height="30" width="30"></svg>;
        }
    }

    render() {
        
        return (
            <button className="square"
                id ={this.props.id}
                onClick={() => this.props.onClick(this.props.id)}
                style={{
                    background: this.props.opacity
                }}>
                {this.getSvg()}
            </button>
        );
    }
}

export default Square;
