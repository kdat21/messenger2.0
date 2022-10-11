import axios from "axios";
import { createContext, FC, useReducer } from "react";
import peopleReducer from "../reducers/peopleReducer";
import { PeopleState, PeopleStateType, Props } from "../types";
import { apiUrl, GET_PEOPLE } from "./constants";

const initialState: PeopleState = {
  peopleLoading: true,
  people: []
};

export const PeopleContext = createContext<PeopleStateType | null>(null);

const PeopleContextProvider: FC<Props> = ({ children }) => {
  const [peopleState, dispatch] = useReducer(peopleReducer, initialState);

  // Get all users
  const getPeople = async () => {
    try {
      const response = await axios.get(`${apiUrl}/user`);
      if (response.data.success) {
        dispatch({
          type: GET_PEOPLE,
          payload: { people: response.data.people},
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Find user
  const findPerson = async (userId: string) => {
    try {
      const response = await axios.get(`${apiUrl}/user/${userId}`)

        return response.data
    } catch (error) {
      return { success: false, message: error };
    }
  }

  return (
    <PeopleContext.Provider value={{ peopleState, getPeople, findPerson }}>
      {children}
    </PeopleContext.Provider>
  );
};

export default PeopleContextProvider;
