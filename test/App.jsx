

import React from 'react';
import ReactDOM from 'react-dom';

import crio from '../src/index';







//const test1 = {
//    foo:'bar',
//    blah:'dee'
//};
//const test2 = [
//    'foo',
//    'bar',
//    2,
//    function() {
//        alert('y');
//    },
//    {
//        some:'obj'
//    },
//    [
//        'some',
//        'array'
//    ]
//];

//console.log(crio);

//const crio1 = crio(test1);
//const crio2 = crio(test2);

//console.log(crio2);
//console.log(crio2.thaw());

//console.log(crio1);
//console.log(crio2);

//console.log(crio1.get('foo'));

//const crio4 = crio1.set({
//    foo:'test',
//    nw:'blah',
//    deep:{
//        nested:'stuff'
//    }
//});
//
//const crio5 = crio2.set({
//    0:'test',
//    1:'test again',
//    10:'wild shit'
//});
//
//const crio2Filtered = crio2.filter((value, key, values) => {
//    return Object.prototype.toString.call(value) === '[object String]';
//});

//console.log(crio2Filtered);

//const crio3 = crio2.push('test', 'multiple');

//console.log(crio4.keys());
//console.log(crio4.values());

//const crio6 = crio4.delete('foo');

//console.log(crio6);

//const crio8 = crio6.set('blah', 'dee');

//console.log(crio8);

//console.log(crio6 === crio8);

//const crio9 = crio3.splice(1);

//console.log(crio1);
//console.log(crio3);
//console.log(crio9);
//
//const crio10 = crio9.sort();
//
//console.log(crio10);
//console.log(crio9.hashCode);
//
//const crio11 = crio9.sort();
//
//console.log(crio11);
//
//console.log(crio10 === crio11);
//console.log(crio10.equals(crio11));
//
//let thawedcrio = crio.thaw(crio11);
//
//console.log(thawedcrio);
//
//thawedcrio[0] = 10;
//
//console.log(thawedcrio);
//
//const crio12 = crio5.map((value) => {
//    console.log(value);
//});
//
//console.log(crio12);
//console.log(crio5.object);
//
//console.log(crio5.indexOf('bar'));
//
//console.log(crio4);
//console.log(crio4.getIn(['deep', 0]));
//
//console.log(crio4.get('deep'));

let crio1 = crio([]);

crio1 = crio1.push(1,2,3,4,5);
const crio1Clone = crio([1,2,3,4,5]);

console.log(crio1);
console.log(crio1Clone);

const crio6 = crio1.setIn([0], 10);

console.log(crio6);

const crioReduced = crio1.reduceRight((previousValue, currentValue, index) => {
    previousValue[currentValue] = index * index;

    return previousValue;
}, {});

console.log(crioReduced);
console.log(crio1.join(' | '));

crio1 = crio1.splice(0);

console.log(crio1);

const crioArray = crio1.merge(['testMerge']);

console.log(crioArray);

const crio4 = crio({
    simple:'test',
    deeper:{
        prevent:'overwrite'
    }
});

console.log(crio4);

const crio12 = crio4.merge({
    simple:'merge',
    deeper:{
        complex:'merge'
    }
});

console.log(crio12);

const crioCircular = crio12.merge({
    circular:crio12
});

console.log(crioCircular);

console.log(crioCircular.merge({
    circular:crioCircular
}));

const crioValues = crio12.values();

console.log(crioValues);

const dupCrio = crio.list.of(1,2,2,2,3,4,5,5,5,5,5,4,4,3,3,2,1,1,3,2,4);

console.log(dupCrio);

const uniqCrio = dupCrio.unique();

console.log(uniqCrio);

const sortedCrio = dupCrio.sort();

console.log(sortedCrio);

const filledCrio = dupCrio.fill('a', 4, 7);

console.log(filledCrio);

console.log(filledCrio.first());
console.log(filledCrio.last());
console.log(filledCrio.get(4));
console.log(filledCrio.get(4, 6, 9, 15, 50));

const mutatedCrio = filledCrio.mutate((mutable) => {
    mutable = 'blah';

    return mutable;
});

console.log(mutatedCrio);
console.log(filledCrio);


class App extends React.Component {
    displayName = 'App';

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                Test
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('app-container'));