

import React from 'react';
import ReactDOM from 'react-dom';

import crio from '../src/index';

import tests from './scripts';

const divStyle = {
    margin:'20px auto',
    minWidth:500,
    width:'50%'
};
const headerStyle = {
    fontSize:18,
    fontWeight:'bold',
    marginBottom:10
};

class App extends React.Component {
    displayName = 'App';

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {Object.keys(tests).map((key, i) => {
                    return (
                        <div
                            key={i}
                            style={divStyle}>
                            <div style={headerStyle}>
                                {key}
                            </div>

                            <div>
                                {`${tests[key].success} ${key} tests passed.`}
                            </div>

                            <div>
                                {`${tests[key].untested} ${key} tests were unable to be run.`}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('app-container'));