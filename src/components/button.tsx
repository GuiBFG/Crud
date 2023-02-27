import React from 'react';

export const button = (props: any) => {
  return (
    <>
      <button className={props.class} onClick={props.action}>
        {props.children}
      </button>
    </>
  );
};

export default button;
