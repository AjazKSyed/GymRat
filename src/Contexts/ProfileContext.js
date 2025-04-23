import React, { createContext, useReducer, useContext } from 'react';


// creating the obj that holds init state
const initial_state = {
    id: 0,
    url: "",
    firstName: "",
    lastName: "",
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
    profileImgPath: "",
    generalImgPath_0: "",
    generalImgPath_1: "",
    generalImgPath_2: "",
    generalImgPath_3: "",
    profileImgId: 0,
    generalImgId1: 0,
    generalImgId2: 0,
    generalImgId3: 0,
    generalImgId4: 0,
    imgPaths: [],
    interests: [],
};

function ProfileReducer(state, action) {
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
const ProfileStateContext = createContext();
export const useProfileState = () => useContext(ProfileStateContext);


// context for dispatch function
const ProfileDispatchContext = createContext();
export const useProfileDispatch = () => useContext(ProfileDispatchContext);

export function ProfileContextProvider({ children }) {
  const [state, dispatch] = useReducer(ProfileReducer, initial_state);
  return (
    <ProfileDispatchContext.Provider value={dispatch}>
      <ProfileStateContext.Provider value={state}>
        {children}
      </ProfileStateContext.Provider>
    </ProfileDispatchContext.Provider>
  );
}


