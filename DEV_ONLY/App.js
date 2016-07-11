import React from 'react';
import {
  render
} from 'react-dom';

import crio from '../src';

let index = -1,
    items = [];

while (++index < 100) {
  items.push({
    id: index
  });
}

const crioItems = crio(items);

const App = () => {
  console.time('createElements');

  const elements = crioItems.map((item) => {
    return (
      <div key={item.id}>
        This is for item with id {item.id}.
      </div>
    );
  });
  
  console.timeEnd('createElements');

  const thawedItems = crioItems.thaw();

  console.time('createThawedElements');

  const thawedElements = thawedItems.map((item) => {
    return (
      <div key={item.id}>
        This is for item with id {item.id}.
      </div>
    );
  });

  console.timeEnd('createThawedElements');

  return (
    <div>
      <h1>
        App
      </h1>

      <div>
        {elements}
      </div>

      <div>
        {thawedElements}
      </div>
    </div>
  );
};

const div = document.createElement('div');

div.id = 'app-container';

render((
  <App/>
), div);

document.body.appendChild(div);
