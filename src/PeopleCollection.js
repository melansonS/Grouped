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

  render() {
    let sortedPeople = this.state.people.sort((a, b) =>
      a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1
    );
    let peopleElems = sortedPeople.map(person => {
      return <PersonCard data={person} key={person.id} />;
    });
    return (
      <div className="people_container">
        <div className="people_container_header">
          <h1>People</h1>

          <div
            onClick={() => {
              this.setState({ showForm: true });
            }}
            className="add_icon"
          >
            Add a new Person!
          </div>

          {this.state.showForm && (
            <div
              className="modal"
              onClick={e => {
                if (e.target.getAttribute("class") === "modal") {
                  this.setState({ showForm: false });
                }
              }}
            >
              <NewPersonForm />
            </div>
          )}
        </div>

        <div className="people_collection">
          <div className="collection_headers">
            <div className="header_name">Name</div>
            <div className="header_group">Group</div>
          </div>
          {peopleElems}
        </div>
      </div>
    );
  }
}

export default PeopleCollection;
