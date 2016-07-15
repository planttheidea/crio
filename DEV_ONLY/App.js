import React from 'react';
import {
  render
} from 'react-dom';

import crio from '../src';

let index = -1,
    items = [];

while (++index < 100) {
  items.push({
    some: {
      deeply: {
        nested: 'object'
      }
    }
  });
}

let crioItems = crio(items);

const App = () => {
  console.time('crio');

  crioItems = crioItems.map((item) => {
    return item.setIn(['some', 'deeply', 'nested'], 'thing');
  });

  // crioItems.forEach((item, index) => {
  //   crioItems = crioItems.setIn([index, 'some', 'deeply', 'nested'], 'thing');
  // });
  
  console.timeEnd('crio');

  console.log(crioItems);

  console.time('native');

  // items.forEach((item, index) => {
  //   items[index].some.deeply.nested = <div/>;
  // });

  items = items.map((item) => {
    return item.some.deeply.nested = 'thing';
  });

  console.timeEnd('native');

  return (
    <div>
      <h1>
        App
      </h1>

      {crioItems.map((item, index) => {
        return (
          <div key={`item-${index}`}>
            {item.toString()}
          </div>
        );
      })}
    </div>
  );
};

const div = document.createElement('div');

div.id = 'app-container';

render((
  <App/>
), div);

document.body.appendChild(div);
