import React from 'react';
import { map } from 'lodash';
import { renderHTML } from 'utils';

const P = ({ text, id, className }) => {
  const listP = (text || '').split('\n');
  return map(listP, (p, index) => (
    <p
      className={`text-break ${className || ''}`}
      dangerouslySetInnerHTML={{ __html: renderHTML(p) }}
      key={`list_paragraph_${id}_item__${index.toString()}`}></p>
  ));
};
P.defaultProps = {
  text: '',
  id: 'detail',
};
export default P;
