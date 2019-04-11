import React, { useState } from 'react';
import { FancyButtons } from './components/FancyButtons';
import { Banner } from './components/Banner';
import isEqual from 'lodash/isEqual';


const items = 'code me show the'.split(' ');
const correctOrder = [2, 1, 3, 0];
const name = 'Donald R. Lilly';
const image = '/images/DonL_sq.jpg';
const github = 'https://github.com/dash61';
const resume = 'https://docs.google.com/document/d/e/2PACX-1vQlSPt8xJmitzPGt1TvOUrPrX2KXnFAbHfDnG2N0m8amzKhw_le2sjYmLZGlnITgq8gy6sj-AeNSGQK/pub';

export function App(props) {

  // Track the current indices representing the item order
  const [currentOrder, setCurrentOrder] = useState(items.map((item, index) => index));

  return (
    <div>
      <FancyButtons
        items={items}
        currentOrder={currentOrder}
        callback={setCurrentOrder}
      />
      { isEqual(currentOrder, correctOrder) && (
        <Banner
          name={name}
          image={image}
          github={github}
          resume={resume}
        />
      )}
    </div>
  );
}
