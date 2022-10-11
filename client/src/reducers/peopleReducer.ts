import { GET_PEOPLE } from "../contexts/constants";
import { PeopleAction, PeopleState } from "../types";

const peopleReducer = (state: PeopleState, action: PeopleAction) => {
  const {
    type,
    payload: { people },
  } = action;
  switch (type) {
    case GET_PEOPLE:
      return {
        ...state,
        peopleLoading: false,
        people,
      };

    default:
      return state;
  }
};

export default peopleReducer;
