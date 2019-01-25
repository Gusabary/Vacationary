import React from 'react';

class FilterBox extends React.Component {
    render() {
        return (
            <React.Fragment>
                <input
                    type="checkbox"
                    onChange={() => this.props.onChange(1)} />
                <label>
                    Show Important Only
                </label>

                <input
                    type="checkbox"
                    onChange={() => this.props.onChange(2)} />
                <label>
                    Show Unfinished Only
                </label>
            </React.Fragment>
        );
    }
}

export default FilterBox;