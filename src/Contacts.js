import React from 'react';

 function Contacts(props) {
  
return (

<div>
   <h1>Numbers</h1>
    <ul>
     {props.contacts.map(person=><li style={{listStyleType: 'none'}} key={person.id}>Name: {person.name}, Number: {person.number} </li>)}
     </ul>
 </div>)


  
    
  
        
}

export default Contacts