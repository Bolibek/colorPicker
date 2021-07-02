import React, {Component} from 'react';
import ColorBox from "./ColorBox.js";
import "./Palette.css";

// import seedColors from "./colorPicker/seedColors"

class Palette extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const colorBoxes = this.props.colors.map(c=>(<ColorBox background={c.color}  name={c.name} />)
            
        );
        return (
            
            <div className="Palette">
                <div className="Palette-color">{colorBoxes}</div>
            </div>
        )
    }
}



export default Palette;
