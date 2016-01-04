

import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

import crio from '../src/index';

import tests from './scripts';
//
//const tests = {
//    dummy:{
//        success:0,
//        untestedMethods:[]
//    }
//};

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
const untestedStyle = {
    marginTop:10
};
const listStyle = {
    margin:0
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
                                {`${tests[key].untestedMethods.length} ${key} methods were not tested.`}
                            </div>

                            {!!tests[key].untestedMethods.length && (
                                <div style={untestedStyle}>
                                    <div>
                                        The following methods were not tested:
                                    </div>

                                    <ul style={listStyle}>
                                        {tests[key].untestedMethods.map((method, j) => {
                                            return (
                                                <li key={j}>
                                                    {method}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('app-container'));