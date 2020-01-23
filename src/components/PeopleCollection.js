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
    //set up query
    let query = firebase.firestore().collection("people");
    //set up unsubscribe
    let unsubcribe = query.onSnapshot(snapshot => {
      //pull data and id from each document
      let updatedCollection = snapshot.docs.map(doc => {
        return { ...doc.data(), id: doc.id };
      });
      //stash people in the state
      this.setState({ people: updatedCollection });
    });

    this.setState({ unsub: unsubcribe });
  }
  componentWillUnmount() {
    this.state.unsub();
    this.setState({ unsub: undefined });
  }

  render() {
    //sort people alphabetically based on their name, regardless of capitalization
    let sortedPeople = this.state.people.sort((a, b) =>
      a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1
    );
    //generate a dom element (PersonCard) for each person
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

          {/* If we're showing the new person form: */}
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
