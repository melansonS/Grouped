import React, { Component } from "react";
import firebase from "./firebaseConfig";
import PersonCard from "./PersonCard";
import NewPersonForm from "./NewPersonForm";

class PeopleCollection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unsub: undefined,
      people: [],
      showForm: false
    };
  }

  componentDidMount() {
    let query = firebase.firestore().collection("people");
    let unsubcribe = query.onSnapshot(snapshot => {
      let updatedCollection = snapshot.docs.map(doc => {
        return { ...doc.data(), id: doc.id };
      });
      this.setState({ people: updatedCollection });
    });

    this.setState({ unsub: unsubcribe });
  }
  componentWillUnmount() {
    this.state.unsub();
    this.setState({ unsub: undefined });
  }

  handleAddPerson = () => {
    console.log("add person");
    this.setState({ showForm: !this.state.showForm });
  };

  render() {
    let peopleElems = this.state.people.map(person => {
      return <PersonCard data={person} key={person.id} />;
    });
    return (
      <div className="people_collection">
        <h1>People</h1>
        <span onClick={this.handleAddPerson}>+</span>
        {this.state.showForm && <NewPersonForm />}
        {peopleElems}
      </div>
    );
  }
}

export default PeopleCollection;
