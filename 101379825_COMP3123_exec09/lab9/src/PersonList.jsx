import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

class PersonList extends Component {
  state = {
    persons: []
}

componentDidMount() {
    axios.get(`https://randomuser.me/api/?results=10`)
    .then(res => {
        console.log(res.data);
        const persons = res.data.results;
        this.setState({ persons });
    })
}

render() {
  return (
    <div className="container mt-5">
      <h1 style={{ textAlign: 'center' }}>User List</h1>
      <div className="list-group">
        {this.state.persons.map(person => (
          <div className="list-group-item" style={{ backgroundColor: '#ddd', margin: 5}}>
            <div className="row align-items-center">
              <div className="col-md-2">
                <img src={person.picture.large} className="rounded-circle" alt="profile" />
              </div>
              <div className="col-md-10">
                <h4>{`${person.name.title} ${person.name.first} ${person.name.last}`}</h4>
                <p>User Name: <b>{person.login.username}</b></p>
                <p>Gender: {person.gender}</p>
                <p>Time Zone Description: {`${person.location.timezone.description}`}</p>
                <p>Address: {`${person.location.street.number} ${person.location.street.name}, ${person.location.city}, ${person.location.state}`}</p>
                <p>Email: {person.email}</p>            
                <p>Birth Date and Age: {`${person.dob.date} (${person.dob.age})`}</p>
                <p>Register Date: {person.registered.date}</p>
                <p>Phone#: {person.phone}</p>
                <p>Cell#: {person.cell}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    );
  }
}
export default PersonList;