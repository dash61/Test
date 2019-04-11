// Inspired By: https://codesandbox.io/embed/r5qmj8m6lq
import React from 'react';
import clamp from 'lodash/clamp';
import swap from 'lodash-move';
import '../index.css';
import { useGesture } from 'react-with-gesture';
import { useSprings, animated, interpolate } from 'react-spring';

// Returns fitting styles for dragged/idle items
const getItemStyles = (order, down, originalIndex, curIndex, y) => index => {
  return down && index === originalIndex // if mouse down and current item
    ? { y: curIndex * 100 + y, scale: 1.1, zIndex: '1', shadow: 15, immediate: n => n === 'y' || n === 'zIndex' }
    : { y: order.indexOf(index) * 100, scale: 1, zIndex: '0', shadow: 1, immediate: false };
};

export function FancyButtons(props) {
  const { items, currentOrder, callback } = props;

  // Create springs, each corresponds to an item, controlling its transform, scale, etc.
  const [springs, setSprings] = useSprings(items.length, getItemStyles(currentOrder));

  // Store current order indices as a mutable array, to assist with animating without causing unnecessary re-renders
  let tempOrder = currentOrder;

  const bind = useGesture(({ down, delta, args }) => {
    const [originalIndex] = args;
    const [, y] = delta;
    const curIndex = tempOrder.indexOf(originalIndex);
    const curRow = clamp(Math.round((curIndex * 100 + y) / 100), 0, items.length - 1);
    const newOrder = swap(tempOrder, curIndex, curRow);
    // Feed springs new style data
    setSprings(getItemStyles(newOrder, down, originalIndex, curIndex, y));
    if (!down) {
      tempOrder = newOrder;
      callback(newOrder);
    }
  });


  return (
    <div style={styles.container}>
      <div style={{ ...styles.list, height: items.length * 100 }} className="content">
        {springs.map(({ zIndex, shadow, y, scale }, i) => {
          return (
            <animated.div
              key={i}
              {...bind(i)}
              style={{
                ...styles.item,
                zIndex,
                boxShadow: shadow.interpolate(s => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`),
                transform: interpolate([y, scale], (y, s) => `translate3d(0,${y}px,0) scale(${s})`),
              }}
              children={items[i]}
            />
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 20,
  },
  list: {
    position: 'relative',
    width: 320,
    height: 240,
  },
  item: {
    position: 'absolute',
    width: 320,
    height: 90,
    overflow: 'visible',
    pointerEvents: 'auto',
    transformOrigin: '50% 50% 0px',
    borderRadius: 5,
    color: '#FFF',
    fontWeight: 600,
    lineHeight: '90px',
    fontSize: 14.5,
    textTransform: 'uppercase',
    textAlign: 'center',
    letterSpacing: 2,
  },
};
