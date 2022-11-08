import { useTheme } from "@mui/material/styles";
import { Spinner } from "react-bootstrap";
import { selectAuth } from "../../store/features/auth/authSlice";
import { selectPeople } from "../../store/features/people/peopleSlice";
import { useAppSelector } from "../../store/hooks";
import {
  SContainer,
  SConversationSelect as SPeopleSelect,
  SHeader,
} from "../../styles/Dashboard/SecondSiderbar";
import { AuthStateType, PeopleStateType } from "../../types";
import PersonSelect from "./PersonSelect";

const PeopleSidebar = () => {
  // State
  const { people, peopleLoading } = useAppSelector(selectPeople)
  const {user} = useAppSelector(selectAuth)
  const theme  = useTheme()

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
    <SContainer $borderColor={theme.palette.divider}>
      <SHeader>People</SHeader>
      {body}
    </SContainer>
  );
};

export default PeopleSidebar;
