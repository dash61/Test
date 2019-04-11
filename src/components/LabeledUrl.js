/*
Component to present a label followed by a URL:
    label     URL
where the URL can be the actual URL or a shortcut name for it.
This component relies on CSS grid.
The label and URL will be in 2 columns of 1 row.
Long URLs will get truncated and end with ellipsis.
*/

import React from 'react';

export default function LabeledUrl(props) {
  const shortUrl = props.shorturl || props.url;
  return (
    <div style={{...styles.container, gridRow: props.row }}>
      <p style={{...styles.label, marginLeft: props.leftmargin }}>{props.label}</p>
      <a style={styles.link} href={props.url}>{shortUrl}</a>
    </div>
  );
}

const styles = {
  container: {
    display: 'contents', // needed for grid because this is 2 levels deep
  },
  label: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  link: {
    gridColumn: 2,
    marginTop: 'auto',
    marginBottom: 'auto',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
};
