import React from 'react';
import {createSwitchNavigator, createStackNavigator, createDrawerNavigator, createAppContainer} from 'react-navigation';
import LoginScreen from '../Screens/LoginScreen';
import SignupScreen from '../Screens/Signup/SignupScreen';
import Business from '../Screens/Signup/Business';
import HomeScreen from '../Screens/HomeScreen';

const AuthStack = createStackNavigator({
    LoginScreen: LoginScreen,
    SignupScreen: SignupScreen,
    BusinessScreen: Business
},{
    initialRouteName: "LoginScreen"
})

const AppStack = createDrawerNavigator({
    Home: HomeScreen
},{
    initialRouteName: "Home"
})

const switchNavigator = createSwitchNavigator({
    AuthStack: AuthStack,
    AppStack: AppStack   
},{
    initialRouteName: "AppStack"
})

const AppContainer = createAppContainer(switchNavigator)

export default AppContainer;