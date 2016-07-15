import test from 'ava';
import React from 'react';

import crio, {
    CrioArray,
    CrioObject,
    getNeedsReplacer,
    getRealValue,
    isCrio,
    mergeOnDeepMatch
} from '../src';

const OBJECT = {
    foo: 'bar'
};
const DEEPLY_NESTED_OBJECT = {
    some: {
        deeply: {
            nested: 'object'
        }
    }
};
const ARRAY = [
    'foo',
    'bar'
];

test('if crio returns a CrioArray or CrioObject', (t) => {
    const crioObject = crio(OBJECT);
    const crioArray = crio(ARRAY);
    const crioBoolean = crio(true);

    t.true(crioObject instanceof CrioObject);
    t.true(crioArray instanceof CrioArray);
    t.true(crioBoolean);
});

test('if isCrio determines whether object isCrio or not', (t) => {
    t.true(isCrio(crio(OBJECT)));
    t.true(isCrio(crio(ARRAY)));
    t.false(isCrio(crio(true)));
    t.false(isCrio(true));
    t.false(isCrio(crio('string')));
    t.false(isCrio('string'));
    t.false(isCrio(crio(1)));
    t.false(isCrio(1));
});

test('if deleteOnDeepMatch deletes a deep value on the object', (t) => {
    const crioToDeleteFrom = crio({
        some: {
            deeply: {
                nested: 'object'
            }
        }
    });

    t.deepEqual(crioToDeleteFrom.deleteIn(['some', 'deeply', 'nested']), {
        some: {
            deeply: {}
        }
    });
});

test('if getNeedsReplacer returns the correct value', (t) => {
    t.true(getNeedsReplacer(<div/>));
    t.true(getNeedsReplacer(null, {
        $$needsReplacer: true
    }));
    t.false(getNeedsReplacer(null));
    t.false(getNeedsReplacer(crio({})));
});

test('if getRealValue returns crioed version of value when appropriate', (t) => {
    const object = getRealValue(OBJECT);
    const array = getRealValue(ARRAY);
    const boolean = getRealValue(true);
    const string = getRealValue('string');
    const number = getRealValue(1);

    t.true(isCrio(object));
    t.true(isCrio(array));
    t.false(isCrio(boolean));
    t.false(isCrio(string));
    t.false(isCrio(number));
});

test('if mergeOnDeepMatch sets a deep value to the object', (t) => {
    const object = crio(DEEPLY_NESTED_OBJECT);

    const objectToMergeDeeply = {
        other: {
            deeply: {
                nested: 'object'
            }
        }
    };
    const deeplyNestedCrio = mergeOnDeepMatch(object, ['some', 'deeply'], [objectToMergeDeeply], CrioObject);

    t.deepEqual(deeplyNestedCrio.thaw(), {
        some: {
            deeply: {
                nested: 'object',
                other: {
                    deeply: {
                        nested: 'object'
                    }
                }
            }
        }
    })
});

test('CrioObject getters are correct values', (t) => {
    const crioObject = crio(OBJECT);

    t.is(crioObject.$$hashCode, 2196683918);
    t.is(crioObject.$$type, 'CrioObject');
    t.is(crioObject.length, 1);
});

test('CrioArray getters are correct values', (t) => {
    const crioArray = crio(ARRAY);

    t.is(crioArray.$$hashCode, 2259920920);
    t.is(crioArray.$$type, 'CrioArray');
    t.is(crioArray.length, 2);
});

test('CrioObject methods', (t) => {
    const crioObject = crio(OBJECT);
    const deepCrioObject = crio(DEEPLY_NESTED_OBJECT);

    t.deepEqual(deepCrioObject.delete('some').thaw(), {});
    t.deepEqual(deepCrioObject.deleteIn(['some', 'deeply', 'nested']).thaw(), {
        some: {
            deeply: {}
        }
    });

    t.deepEqual(crioObject.entries(), [['foo', 'bar']]);
    t.true(crioObject.equals(crio(OBJECT)));
    t.is(crioObject.get('foo'), 'bar');

    t.is(deepCrioObject.getIn(['some', 'deeply', 'nested']), 'object');

    const forEachObject = crio({
        foo: 'bar',
        bar: 'baz'
    });

    let total = 0;

    forEachObject.forEach((value, key) => {
        if (key === 'foo') {
            total += 1;
        }

        if (value === 'bar' || key === 'bar') {
           total += 4;
        }

        if (value === 'baz') {
           total += 17;
        }
    });

    t.is(total, 26);

    t.true(crioObject.has('foo'));
    t.false(crioObject.has('bar'));

    t.true(crioObject.hasOwnProperty('foo'));
    t.is(crioObject.isPrototypeOf(CrioObject), OBJECT.isPrototypeOf(CrioObject));
    t.deepEqual(crioObject.keys(), ['foo']);

    const mergedObject = crioObject.merge({
        foo: 'baz'
    });

    t.deepEqual(mergedObject.thaw(), {
        foo: 'baz'
    });

    const deeplyMergedObject = deepCrioObject.mergeIn(['some', 'deeply'], {
        sanctimonious: 'candidate'
    });

    t.deepEqual(deeplyMergedObject.thaw(), {
        some: {
            deeply: {
                nested: 'object',
                sanctimonious: 'candidate'
            }
        }
    });

    const mutatedObject = crioObject.mutate(({foo}) => {
        return foo;
    });

    t.is(mutatedObject, 'bar');
    t.true(crioObject.propertyIsEnumerable('foo'));

    const setObject = crioObject.set('foo', 'baz');

    t.deepEqual(setObject.thaw(), {
        foo: 'baz'
    });

    const deeplySetObject = deepCrioObject.setIn(['some', 'deeply', 'nested'], 'thing');

    t.deepEqual(deeplySetObject.thaw(), {
       some: {
           deeply: {
               nested: 'thing'
           }
       }
    });

    t.deepEqual(crioObject.thaw(), OBJECT);

    const string =
`CrioObject{
  foo: "bar"
}`;

    t.is(crioObject.toLocaleString(), string);
    t.is(crioObject.toString(), string);

    t.deepEqual(deeplySetObject.toArray(), [{
        deeply: {
            nested: 'thing'
        }
    }]);

    t.deepEqual(crioObject.valueOf(), OBJECT);
    t.deepEqual(crioObject.values(), ['bar']);

    for (let value of crioObject) {
        t.is(value, 'bar');
    }

    const objectToMap = crio({
        foo: 'bar',
        bar: 'baz'
    });
    const mappedObject = objectToMap.map(() => {
        return 'new stuff';
    });

    t.deepEqual(mappedObject, {foo: 'new stuff', bar: 'new stuff'});

    const filteredObject = objectToMap.filter((value, key) => {
        return key !== 'foo';
    });

    t.deepEqual(filteredObject, {bar: 'baz'});

    t.deepEqual(objectToMap.clear(), {});
});

test('CrioArray methods', (t) => {
    const crioArray = crio(ARRAY);

    t.deepEqual(crioArray.thaw(), ARRAY);

    const concattedArray = crioArray.concat(['baz']);

    t.deepEqual(concattedArray.thaw(), ['foo', 'bar', 'baz']);

    const numericArray = crio([1, 2, 3, 4, 5]);
    const copyWithinArray = numericArray.copyWithin(0, 3);

    t.deepEqual(copyWithinArray.thaw(), [4, 5, 3, 4, 5]);

    t.deepEqual(crioArray.delete(0).thaw(), ['bar']);

    const deeplyNestedCrioArray = crio([{
        some: {
            really: {
                deep: 'object'
            }
        },
        another: {
            untouched: {
                deep: 'object'
            }
        }
    }]);

    t.deepEqual(deeplyNestedCrioArray.deleteIn([0, 'some', 'really', 'deep']).thaw(), [{
        some: {
            really: {}
        },
        another: {
            untouched: {
                deep: 'object'
            }
        }
    }]);

    t.deepEqual(crioArray.entries(), [['0', 'foo'], ['1', 'bar']]);

    t.true(crioArray.equals(crio(ARRAY)));
    t.true(crioArray.every((value) => {
        return ARRAY.indexOf(value) !== -1;
    }));

    const filledArray = crioArray.fill('blah');

    t.deepEqual(filledArray.thaw(), ['blah', 'blah']);

    const filteredArray = crioArray.filter((value) => {
        return value === 'foo';
    });

    t.deepEqual(filteredArray.thaw(), ['foo']);

    const foundItem = crioArray.find((value, index) => {
        return index === 1;
    });

    t.is(foundItem, 'bar');

    const foundIndex = crioArray.findIndex((value) => {
        return value === 'bar';
    });

    t.is(foundIndex, 1);

    let counter = 0;

    crioArray.forEach(() => {
        counter++;
    });

    t.is(counter, 2);
    t.is(crioArray.get(0), 'foo');

    const deeplyNestedArray = crio([{
        foo: 'bar'
    }]);

    t.is(deeplyNestedArray.getIn([0, 'foo']), 'bar');

    t.true(crioArray.has(0));
    t.false(crioArray.has(2));

    t.true(crioArray.includes('bar'));
    t.false(crioArray.includes('baz'));

    t.is(crioArray.indexOf('foo'), 0);
    t.is(crioArray.indexOf('baz'), -1);

    t.is(crioArray.join(), 'foo,bar');
    t.is(crioArray.join('|'), 'foo|bar');

    t.deepEqual(crioArray.keys(), ['0', '1']);

    t.is(crioArray.lastIndexOf('bar'), 1);
    t.is(crioArray.lastIndexOf('baz'), -1);

    t.deepEqual(crioArray.map(() => {
        return true;
    }), [true, true]);

    t.deepEqual(crioArray.merge(['baz']).thaw(), ['baz', 'bar']);

    const crazyNestedArray = crio([{
        some: {
            deeply: {
                nested: 'array'
            }
        }
    }]);

    t.deepEqual(crazyNestedArray.mergeIn([0, 'some', 'deeply'], {
        disturbed: 'man'
    }).thaw(), [{
        some: {
            deeply: {
                disturbed: 'man',
                nested: 'array'
            }
        }
    }]);

    t.true(crioArray.mutate(() => {
        return true;
    }));

    t.deepEqual(crioArray.pop().thaw(), ['foo']);
    t.deepEqual(crioArray.push('baz').thaw(), ['foo', 'bar', 'baz']);

    t.deepEqual(crioArray.reduce((array, item) => {
        return [
            ...array,
            `${item}BLAH`
        ];
    }, []), ['fooBLAH', 'barBLAH']);

    t.deepEqual(crioArray.reduceRight((array, item) => {
        return [
            ...array,
            `${item}BLAH`
        ];
    }, []), ['barBLAH', 'fooBLAH']);

    t.deepEqual(crioArray.reverse().thaw(), ['bar', 'foo']);

    t.deepEqual(crioArray.set(0, 'baz').thaw(), ['baz', 'bar']);
    t.deepEqual(deeplyNestedArray.setIn([0, 'foo'], 'baz').thaw(), [{
        foo: 'baz'
    }]);

    t.deepEqual(crioArray.shift().thaw(), ['bar']);
    t.true(crioArray.some((value) => {
        return value === 'foo';
    }));
    t.deepEqual(crioArray.sort().thaw(), ['bar', 'foo']);
    t.deepEqual(crioArray.splice(0, 1).thaw(), ['bar']);

    const arrayToString =
`CrioArray{
  "0": "foo",
  "1": "bar"
}`;

    t.is(crioArray.toLocaleString(), arrayToString);
    t.is(crioArray.toString(), arrayToString);

    t.deepEqual(crioArray.toObject(), {
        '0': 'foo',
        '1': 'bar'
    });

    t.deepEqual(crioArray.unshift('baz').thaw(), ['baz', 'foo', 'bar']);

    t.deepEqual(crioArray.values(), ['foo', 'bar']);

    const arrayWithFalsyValues = crio([0, 'blah', undefined, false, {}, [], '']);

    t.deepEqual(arrayWithFalsyValues.compact(), ['blah', {}, []]);

    const arrayWithDuplicateValues = crio(['same', 'same', 'different', 'same', 'also different']);

    t.deepEqual(arrayWithDuplicateValues.unique().thaw(), ['same', 'different', 'also different']);

    const collection = crio([
        'bar',
        {foo: 'bar'},
        null,
        1,
        true,
        {foo: 'baz'}
    ]);

    t.deepEqual(collection.pluck('foo').thaw(), [undefined, 'bar', undefined, undefined, undefined, 'baz']);

    t.deepEqual(collection.clear().thaw(), []);

    t.deepEqual(collection.first(2), ['bar', {foo: 'bar'}]);
    t.deepEqual(collection.last(3), [1, true, {foo: 'baz'}]);
});
