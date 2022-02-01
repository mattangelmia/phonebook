import React from 'react';

export default function SearchCountry(props) {
  return <div style={{marginTop: '20vh'}}>
      <form>
          <h4>Find Countries</h4>
          <input type="text" value={props.value} onChange={props.filterCountries}/>
      </form>
  </div>;
}
