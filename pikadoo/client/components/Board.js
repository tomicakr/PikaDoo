import React from 'react';

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedField : null
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
            this.setState({selectedField : null});
            return;
        }

        if(distanceFromCenterSquared < BullseyeRadius * BullseyeRadius) {
            this.setState({selectedField : "Bullseye aka Pikadoo"});
            return;
        }

        let angle = Math.atan2(-yFromCenter, xFromCenter) * 180 / Math.PI;
        if (angle < 0) {
            angle += 360;
        }

        let values = [6, 13, 4, 18, 1, 20, 5, 12, 9, 14, 11, 8, 16, 7, 19, 3, 17, 2, 15, 10, 6];
        const index = Math.ceil((angle + 9) / 18 - 1);
        this.setState({selectedField : values[index]});

    }

    render() {
        const selected = (this.state.selectedField == null) ? "Nothing selected" : this.state.selectedField;
        return (
            <div>
                <img src={require('../../res/papikado.png')} onClick={this.onClick.bind(this)} />
                <p>{selected}</p>
            </div>
        );
    }
}

export default Board;
