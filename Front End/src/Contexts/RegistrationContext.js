import React, { createContext, useReducer, useContext } from 'react';

interestSet = new Set();

// creating the obj that holds init state
const initial_state = {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    age: 0,
    city: "",
    _state: "",
    longitude: 0.0,
    latitude: 0.0,
    gym: "",
    bio: "",
    spotify: "",
    instagram: "",
    tiktok: "",
    facebook: "",
    questionOne : 0,
    q1text: "",
    answerOne: "",
    questionTwo: 0,
    q2text: "",
    answerTwo: "",
    questionThree: 0,
    q3text: "",
    answerThree: "",
    profileImgPath: "",
    generalImgPath_0: "",
    generalImgPath_1: "",
    generalImgPath_2: "",
    generalImgPath_3: "",
    interests: interestSet,
};

function RegistrationReducer(state, action) {
  switch (action.type) {
    case "update": {
      return {
        ...state,
        [action.value]: action.data,
      };
    }
    case "profileReplace": {
      console.log(state.profileImgPath);
      return {
        ...state,
        profileImgPath: state.profileImgPath.replace(state.profileImgPath, action.uri),
      };
    }

    case "addInterest": {
      state.interests.add(action.interest);
      return {
        ...state,
      };
    }
    case "removeInterest": {
      state.interests.delete(action.interest);
      return {
        ...state,
      };
    }
    /*
    case "delete": {
      return {
        ...state,
        [action.value]: action.data,
      };
    }
    */
  }
}


// context for state
const RegistrationStateContext = createContext();
export const useRegistrationState = () => useContext(RegistrationStateContext);


// context for dispatch function
const RegistrationDispatchContext = createContext();
export const useRegistrationDispatch = () => useContext(RegistrationDispatchContext);

export function RegistrationContextProvider({ children }) {
  const [state, dispatch] = useReducer(RegistrationReducer, initial_state);
  return (
    <RegistrationDispatchContext.Provider value={dispatch}>
      <RegistrationStateContext.Provider value={state}>
        {children}
      </RegistrationStateContext.Provider>
    </RegistrationDispatchContext.Provider>
  );
}


