import React from 'react';

export default function Form(props) {
  return <div>
      <h1>PhoneBook</h1>
      <input placeholder='Search' value={props.searchValue} onChange={props.handleSearch}/>
 <form onSubmit={props.addContact} style={{margin: '1%'}}>
        <input value={props.value} onChange={props.handleFormChange} placeholder={props.placeholder} />
        <input   onChange={props.handleNumberChange} placeholder='Enter Number' />

        <button type="submit" disabled={props.disabledValue}>save</button>
      </form> 
   
  </div>;
}
