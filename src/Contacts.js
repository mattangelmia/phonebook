import React from "react";

function Contacts(props) {
  const label = props.label ? "make not important" : "make important";

  return (
    <div>
      <h1>Numbers</h1>
      <ul>
        {props.contacts.map((person) => (
          <div
            style={{
              border: "2px solid grey",
              margin: "3%",
              padding: "2%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <li style={{ listStyleType: "none" }} key={person.id}>
              Name: {person.name}, Number: {person.number}{" "}
            </li>
            <button onClick={() => props.removeContact(person)}>x</button>
            <button onClick={() => props.toggleImportance(person)}>
              {person.important ? "make not important" : "make important"}
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Contacts;
