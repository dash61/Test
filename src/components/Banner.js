/*
This component will display a white-ish banner on a blue-ish background:
  image   person's name
  Github  github-url
  Resume  resume-url
*/

import React from 'react';
import LabeledUrl from './LabeledUrl';
import Avatar from './Avatar';

const LEFTMARGIN = 18;

export function Banner(props) {
  return (
    <div style={styles.container} className="banner-bkgnd">
      <div style={styles.frame}>
        <Avatar
          {...props}
          row={1}
          leftmargin={LEFTMARGIN}
        />
        <LabeledUrl
          row={2}
          label="Github"
          url={props.github}
          shorturl="dash61"
          leftmargin={LEFTMARGIN}
        />
        <LabeledUrl
          row={3}
          label="Resume"
          url={props.resume}
          leftmargin={LEFTMARGIN}
        />
      </div>
    </div>
  );
}

const styles = {
  container: {
    margin: 20,
    height: 217,
    position: 'relative',
  },
  frame: {
    position: 'absolute',
    backgroundColor: '#f0f0f0',
    left: 9,
    right: 9,
    top: 9,
    bottom: 9,
    borderRadius: 3,
    display: 'grid',
    gridGap: 4,
    gridTemplateColumns: '120px auto',
    gridTemplateRows: '104px 28px 30px',
  },
};
