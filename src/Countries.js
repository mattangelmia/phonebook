import React from 'react';

export default function Countries(props) {
    return (
        <div style={{marginTop: '5vh'}}>
         
            <ul>
             {props.countries.map(country=><li style={{listStyleType: 'none'}} key={country.name.official}>{country.name.official}</li>)}
             </ul>
         </div>)
}
