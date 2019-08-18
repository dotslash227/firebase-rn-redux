import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Container, Content, Input, Form, Label, Button, Item, Row, Col, Spinner} from 'native-base';
import { connect } from 'react-redux';
import fb from '../Utils/fbconfig';
import SpinnerScreen from '../Components/Spinner';

class LoginScreen extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            loading: false
        }
        this.fb = fb.auth()
    }

    static navigationOptions = {
        header: null
    }

    componentWillMount(){
        if (this.props.auth.token != ""){
            this.props.navigation.navigation("HomeScreen");
        }
    }

    handleEmail(text){
        this.setState({email:text});
    }

    handlePassword(text){
        this.setState({password:text});
    }

    handleLogin(){
        console.log(this.state);
        this.setState({loading:true});
        this.fb.signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(()=>{
            this.fb.onAuthStateChanged((user)=>{
                if(user){                    
                    data = {
                        userId: user.uid,
                        userDisplayName: user.displayName,
                        userEmail: user.email,
                        userMobile: user.mobile,
                        userPic: user.photoURL
                    };
                    console.log("changing screens");
                    this.props.userLogIn(data);
                    this.setState({loading:false});
                    this.props.navigation.navigate("HomeScreen");
                } else alert("no user exists");
            })
        })
        .catch((error)=>{
            this.setState({loading:false});
            alert(error.message);
        })        
    }

    render(){

        if(this.state.loading) return <SpinnerScreen />
        else return(
            <Container>
                <Content padder style={styles.loginScreen}>
                    <View style={styles.introText}>
                        <Text>Our app requires you to login or signup, before you can connect with our private business network and enjoy other features.</Text>
                    </View>
                    <Form>
                        <Item floatingLabel>
                            <Label>Email Address</Label>
                            <Input onChangeText={(text)=>this.handleEmail(text)} autoCorrect={false} autoCapitalize="none" />
                        </Item>
                        <Item floatingLabel>
                            <Label>Password</Label>
                            <Input secureTextEntry onChangeText={(text)=>this.handlePassword(text)} autoCorrect={false} autoCapitalize="none" />
                        </Item>                        
                    </Form>

                    <Row style={{marginTop: 50}}>
                        <Col>
                            <Button onPress={()=>this.handleLogin()} bordered style={styles.button}><Text style={styles.buttonText}>Login</Text></Button>
                        </Col>
                        <Col>
                            <Button onPress={()=>this.props.navigation.navigate("SignupScreen")} bordered dark style={styles.button}><Text style={styles.buttonText}>Signup</Text></Button>
                        </Col>
                    </Row>

                    <View padder style={[styles.introText, {marginTop:50}]}>
                        <Text>By loggin in, you agree to our terms and conditions.</Text>
                    </View>                                                

                </Content>
            </Container>
        )
    }

}

const styles=StyleSheet.create({
    button:{
        maxWidth: "95%",
        justifyContent: "center"
    },
    loginButton:{
        backgroundColor: "green",
        borderRightColor: "white",        
    },
    buttonText:{
        color:"#212F3D",
        textAlign: "center"        
    },
    loginScreen:{
        backgroundColor: "#F0F3F4",
        paddingTop: "40%"
    },
    introText:{
        padding: 15
    }
})

const mapStateToProps = (state) =>{
    return{        
        auth: state.auth,
        user: state.user        
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        setToken: (token) => {
            dispatch({
                type: "SIGNIN",
                payload: token
            })
        },
        userLogIn: (data) =>{
            dispatch({
                type: "LOGIN",
                payload: data
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)