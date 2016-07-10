import React from 'react';
import {
    render
} from 'react-dom';

import crio from '../src';

let index = -1,
    items = [];

while (++index < 10) {
    items.push({
        id: index
    });
}

const crioItems = crio(items);

const App = () => {
    const elements = crioItems.map((item) => {
        return (
          <div key={item.id}>
              This is for item with id {item.id}.
          </div>
        )
    });

    return (
        <div>
            <h1>
                App
            </h1>

            <div>
                {elements}
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
