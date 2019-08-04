import React from 'react';

class TemperatureInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.temperatureChange(event.target.value);
    }

    render() {
        return (
            <React.Fragment>
                <input
                    type="text"
                    value={this.props.temperatureValue}
                    onChange={this.handleChange}
                />
                <label>
                    {this.props.scale === 1 ? "C" : "F"}
                </label>
            </React.Fragment>
        );
    }
}

export default TemperatureInput;