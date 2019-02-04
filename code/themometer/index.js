import React from 'react';
import ReactDOM from 'react-dom';
import TemperatureInput from './TemperatureInput.js';

function calculate(temperature, currScale, toScale) {
    if (currScale === toScale)
        return temperature;
    if (currScale === 1)  //convert C to F
        return 1.8 * temperature + 32;
    return (temperature - 32) / 1.8;
}

class Thermometer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            temperature: 0,
            currScale: 1,
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(t, scale) {
        this.setState({
            temperature: t,
            currScale: scale,
        });
    }
    render() {
        const { temperature, currScale } = this.state;
        let waterState = "The water will ";
        if (calculate(temperature, currScale, 1) < 100)
            waterState += "not ";
        waterState += "boil";
        if (calculate(temperature, currScale, 1) <= 0)
            waterState += ", but freeze";
        waterState += ".";
        return (
            <React.Fragment>
                <h1>
                    Temperature Converter:
                </h1>
                <TemperatureInput
                    scale={1}
                    temperatureValue={calculate(temperature, currScale, 1)}
                    temperatureChange={(t) => (this.handleChange(t, 1))}
                />
                <br />
                <br />
                <TemperatureInput
                    scale={2}
                    temperatureValue={calculate(temperature, currScale, 2)}
                    temperatureChange={(t) => (this.handleChange(t, 2))}
                />
                <br />
                <br />
                <label>
                    {waterState}
                </label>
            </React.Fragment>
        );
    }
}

ReactDOM.render(<Thermometer />, document.getElementById('root'));