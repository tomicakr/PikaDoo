import React from 'react';

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedField : null,
            quantifier : 1,
            index : null
        }
    }

    onClick(evt) {
        evt.preventDefault();
        const x = evt.nativeEvent.offsetX;
        const y = evt.nativeEvent.offsetY;

        //@Matija: Valja dobiti nekako dimenzije slike, ovo privremeno
        const centerX = 325 / 2;
        const centerY = 325 / 2;
        const BullseyeRadius = 12;
        const PapikadoRadius= 139;
        const xFromCenter = x - centerX;
        const yFromCenter = y - centerY;
        const distanceFromCenterSquared = xFromCenter * xFromCenter + yFromCenter * yFromCenter;

        if(distanceFromCenterSquared > PapikadoRadius * PapikadoRadius) {
            this.setState({selectedField : 0});
            return;
        }

        if(distanceFromCenterSquared < BullseyeRadius * BullseyeRadius) {
            if(this.state.quantifier == 3) {
                this.state.quantifier = 1;
            }
            this.setState({selectedField : 25});
            return;
        }

        let angle = Math.atan2(-yFromCenter, xFromCenter) * 180 / Math.PI;
        if (angle < 0) {
            angle += 360;
        }

        let values = [6, 13, 4, 18, 1, 20, 5, 12, 9, 14, 11, 8, 16, 7, 19, 3, 17, 2, 15, 10, 6];
        const index = Math.ceil((angle + 9) / 18 - 1);
        this.setState({selectedField : values[index], index});

    }

/*

    <svg width="325" height="325" version="1.1">
        <image src={require('../../res/papikado.png')} onClick={this.onClick.bind(this)}
         x="0" y="0" height="325" width="325"/>
         <polygon points="175 160 291 141 292 151 292 170 291 183 175 164"
            stroke="black" fillOpacity="0.5" />
    </svg>
    <img src={require('../../res/papikado.png')} onClick={this.onClick.bind(this)} />
*/

    render() {
        const selected = (this.state.selectedField == null) ? "Nothing selected" : this.state.selectedField * this.state.quantifier;
        const rotation = "rotate(" + -this.state.index * 18 + ", 162.5, 162.5)";
        let drawSelectedField = "";
        if (this.state.selectedField === 25) {
            drawSelectedField = (
                <circle cx="162.5" cy="162.5" r="13" fillOpacity="0.5" fill="yellow" />
            );
        } else if (this.state.selectedField !== null && this.state.selectedField !== 0){
            drawSelectedField = (
                    <polygon points="176 160 299 140 300 149 301 162 300 175 299 184 176 165"
                        fill="yellow" fillOpacity="0.5" transform={rotation}/>
                );
           }
        return (
            <div className='container-fluid'>
            <svg height="325" width="325" transform="scale(1, 1)">
                <image href={require('../../res/papikado.png')} height="325" width="325" onClick={this.onClick.bind(this)}/>
                {drawSelectedField}
            </svg>

                <br />
                <div className="btn-group">
                  <button type="button" className={this.state.quantifier===1 ? "btn btn-default active" : "btn btn-default"}
                    onClick={() => this.setState({quantifier : 1})}>Single</button>
                  <button type="button" className={this.state.quantifier===2 ? "btn btn-default active" : "btn btn-default"}
                    onClick={() => this.setState({quantifier : 2})}>Double</button>
                  <button type="button" className={this.state.quantifier===3 ? "btn btn-default active" : "btn btn-default"}
                    onClick={() => this.setState({quantifier : 3})}
                    disabled={this.state.selectedField == 25}>Triple</button>
                </div>
                <p>SELECTED: {selected}</p>
                <button type="button" className="btn btn-primary" onClick={() => {
                    this.props.onSelectPoints({points : selected, quantifier : this.state.quantifier});
                    this.setState({selectedField : null, quantifier : 1});
                }}
                    disabled={isNaN(parseFloat(selected))}> Select </button>
            </div>
        );
    }
}

export default Board;