import React from 'react';
import AppContainer from './Utils/Routes';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';

const authState = {
  token: ''
}

const userState = {
  isLoggedIn: false,
  userId: '',
  userDisplayName: '',
  userEmail: '',
  userMobile: '',
  userPic: ''
}


const userReducer = (state=userState, action) =>{
  switch(action.type){
    case "LOGIN":{
      state = {...state, userId: action.payload.userId, userDisplayName: action.payload.userDisplayName, 
      userEmail: action.payload.email, userMobile: action.payload.userMobile,
      userPic: action.payload.userPic, isLoggedIn: true
      }
    }
  }
  return state;
}


const authReducer = (state=authState, action) =>{
  switch(action.type){
      case "SIGNIN":{
          state = {
              ...state,
              token: action.payload
          };
          break;
      }
  }
  return state;
};

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer
});

const store = createStore(rootReducer);

store.subscribe(()=>{  
});

class App extends React.Component{
  render(){
    return(
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}

export default App;
