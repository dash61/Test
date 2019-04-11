/*
Component to present an image followed by a name:
    image     name
This component relies on CSS grid.
The image and name will be in 2 columns of 1 row.
Images will be shown as size = 80 x 80.
*/

import React from 'react';

export default function Avatar(props) {
  return (
    <div style={{...styles.container, gridRow: props.row }}>
      <img
        src={props.image}
        alt={props.name}
        style={{...styles.image, marginLeft: props.leftmargin }}
      />
      <h1 style={styles.name}>{props.name}</h1>
    </div>
  );
}

const styles = {
  container: {
    display: 'contents', // needed for grid because this is 2 levels deep
  },
  image: {
    width: 80,
    height: 80,
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  name: {
    margin: 0,
    marginTop: 'auto',
    marginBottom: 'auto',
    gridColumn: 2,
  },
};
