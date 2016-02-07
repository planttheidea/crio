import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

import crio from '../src/index';

//import tests from './scripts';

const tests = {
  dummy: {
    success: 0,
    untestedMethods: []
  }
};

const divStyle = {
  margin: '20px auto',
  minWidth: 500,
  width: '50%'
};
const headerStyle = {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 10
};
const untestedStyle = {
  marginTop: 10
};
const listStyle = {
  margin: 0
};






const testArray = crio([
  [1, 2, 3],
  {
    foo: 'bar'
  }
]);

testArray.log();

const popped = testArray.pop();

popped.log();

const shifted = testArray.shift();

shifted.log();

const spliced = testArray.splice(1, 1, {
  test: 'me'
});

spliced.log();

const reversed = testArray.reverse();

reversed.log();

const crazyShit = testArray
  .splice(1, 0, {
    test: 'me'
  })
  .push(1, 2, 3)
  .shift()
  .reverse()
  .filter((item) => {
    return item !== 1;
  })
  .log();

crazyShit.forEach((item) => {
  console.log(item);
});

const filled = testArray.push('test').fill('a', -3, -2).delete(0).log();

const copyWithinTest = crio([1, 2, 3, 4, 5]);

copyWithinTest.copyWithin(0, -2, -1).log();

console.log(copyWithinTest.length);

const testObject = crio({foo: 'bar'});

testObject.log();

testObject.set('foo', 'test').log();

console.log(testArray.getIn([1, 'foo']));
console.log(testArray.getIn([2, 'foo']));

const nestedObject = crio({some: {deep: {key: 'value'}}});

nestedObject.deleteIn(['some', 'deep']).log();
nestedObject.setIn(['some', 'deep'], 'shit').log();
nestedObject.merge({something: 'else'}).log();
nestedObject.mergeIn(['some', 'deep'], {thing: 'merged'}).log();

console.log(nestedObject.equals({}));
console.log(nestedObject.equals(nestedObject));
console.log(nestedObject.equals({some: {deep: {key: 'value'}}}));

const multipleProps = crio({one: 1, two: 2, three: 3});

multipleProps.filter((item, key) => {
  return item > 1 && key !== 'two';
}).log();

multipleProps.map((item, key) => {
  if (key === 'three') {
    return 7;
  }

  if (item > 1) {
    return 0;
  }

  return item;
}).log();

multipleProps.forEach((item, key) => {
  console.log(key, item);
}).log();





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