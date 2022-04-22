import React from 'react'
import ReactLoading from 'react-loading';
import { Section, Article, list } from "./SpinerGen";
export const Spinner =({ bars, red })=>  {
 
    return (
      <div>
        <div className="spinner-wrapper">
          <div className="donut"> <Section>
    {list.map(l => (
      <Article key={l.prop}>
        <ReactLoading type={l.prop} color="pink" />
      </Article>
    ))}
  </Section></div>
        </div>
      </div>
    )
  
}

export default Spinner
