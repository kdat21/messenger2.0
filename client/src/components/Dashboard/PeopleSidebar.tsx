import { useContext, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { AuthContext } from "../../contexts/authContext";
import { PeopleContext } from "../../contexts/peopleContext";
import {
  SContainer,
  SConversationSelect as SPeopleSelect,
  SHeader,
} from "../../styles/Dashboard/SecondSiderbar";
import { AuthStateType, PeopleStateType } from "../../types";
import PersonSelect from "./PersonSelect";

const PeopleSidebar = () => {
  // Context
  const {
    peopleState: { people, peopleLoading },
  } = useContext(PeopleContext) as PeopleStateType;

  const {authState: {user}} = useContext(AuthContext) as AuthStateType

  let body;

  if (peopleLoading)
    body = (
      <div className="d-flex justify-content-center mt-2">
        <Spinner animation="border" variant="info" />
      </div>
    );
  else {
    const filteredPeople = people.filter(person => person._id !== user?._id)

    body = (
      <SPeopleSelect>
        {filteredPeople.map((person) => (
          <PersonSelect key={person._id} person={person} />
        ))}
      </SPeopleSelect>
    );
  }

  return (
    <SContainer>
      <SHeader>People</SHeader>
      {body}
    </SContainer>
  );
};

export default PeopleSidebar;
