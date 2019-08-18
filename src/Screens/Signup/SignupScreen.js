import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Form, Input, Label, Item, Container, Content, Button, Row, Col} from 'native-base';
import fb from '../../Utils/fbconfig';
import {connect} from 'react-redux';
import SpinnerScreen from '../../Components/Spinner';

class SignupScreen extends React.Component{

    constructor(props){        
        super(props);        
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            mobile: '',
            reCheck: false,
            flag: false,
            loading: false
        }

    }        

    static navigationOptions = {
        title: "Signup for NDRT 24"
    }        

    componentDidMount(){
        if (this.props.auth == "" || this.props.auth == null) this.props.navigation.navigate("LoginScreen")
    }

    checkFlag(text){
        if (this.state.firstName != "" && this.state.lastName != "" && this.state.email != "" && this.state.mobile != "" && this.state.mobile != "" && this.state.reCheck){
            this.setState({flag:true});
        } else this.setState({flag:false})
        if (text == "") this.setState({flag:false})
    }


    handleFirstName(text){
        this.setState({firstName: text});
        this.checkFlag(text);
    }

    handleLastName(text){
        this.setState({lastName:text});        
        this.checkFlag(text);
    }

    handleEmail(text){
        this.setState({email:text})
        this.checkFlag(text);
    }

    handlePassword(text){
        this.setState({password:text})
        this.checkFlag(text);
    }

    checkPassword(text){
        this.checkFlag(text);
        if(text === this.state.password && text != "") this.setState({reCheck:true})        
        else this.setState({reCheck: false})                
    }

    handleMobile(text){
        this.setState({mobile:text})
        this.checkFlag(text);
    }

    handleSubmit(){
        this.setState({loading:true})
        fb.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)        
        .catch(function(error){            
            alert(error.message);
        })
        fb.auth().onAuthStateChanged((user)=>{
            if (user){                
                this.props.setToken(user.uid);
                user.updateProfile({
                    displayName: this.state.firstName + " " + this.state.lastName,
                    photoURL: "https://www.thesun.co.uk/wp-content/uploads/2016/04/1353525.main_image.jpg",
                    mobile: this.state.mobile                    
                }).then(()=>{
                    console.log("user profile updated on fb");
                    this.setState({loading:false});
                    this.props.navigation.navigate("BusinessScreen", {user:user});
                })
                .catch((error)=>console.log(error))
            } else console.log("no user created");
        });

    }


    render(){

        if (this.state.loading) return <SpinnerScreen />
        else return(
            <Container style={styles.signupScreen}>                
                <Content padder>                    
                    <Form>
                        <Row>
                            <Col>
                                <Item floatingLabel>
                                    <Label>First Name</Label>
                                    <Input autoCorrect={false} autoCapitalize={"none"} onChangeText={(text)=>this.handleFirstName(text)} />
                                </Item>
                            </Col>
                            <Col>
                                <Item floatingLabel>
                                    <Label>Last Name</Label>
                                    <Input autoCorrect={false} autoCapitalize={"none"} onChangeText={(text)=>this.handleLastName(text)} />
                                </Item>
                            </Col>
                        </Row>
                        <Item floatingLabel>
                            <Label>Enter Password</Label>
                            <Input secureTextEntry autoCorrect={false} autoCapitalize={"none"} onChangeText={(text)=>this.handlePassword(text)} />
                        </Item>
                        <Item floatingLabel style={!(this.state.reCheck)?styles.redBox:styles.normal}>
                            {(this.state.reCheck)?<Label><Text style={{color:"green"}}>Passwords Match</Text></Label>:<Label style={{color:"red"}}>Confirm password : Passwords do not match</Label>}
                            <Input secureTextEntry autoCorrect={false} onChangeText={(text)=>this.checkPassword(text)} autoCapitalize={"none"} />
                        </Item>                  
                        <Item floatingLabel>
                            <Label>Mobile Number</Label>
                            <Input  onChangeText={(text)=>this.handleMobile(text)} />
                        </Item>
                        <Item floatingLabel>
                            <Label>Email Address</Label>
                            <Input autoCorrect={false} autoCapitalize={"none"} onChangeText={(text)=>this.handleEmail(text)} />
                        </Item>
                        <Button onPress={()=>this.handleSubmit()} style={styles.nextButton} full disabled={!this.state.flag}><Text style={styles.buttonText}>Next</Text></Button>
                        
                        <View style={styles.infoText}>
                            <Text>By clicking on Next, you will agree to our terms and conditions. You will be asked about your business details to complete the signup process.</Text>
                        </View>                        
                    </Form>
                </Content>
            </Container>
        )
    }

}

const styles = StyleSheet.create({
    redCheck:{
        color: "red"
    },
    infoText:{
        marginTop: 10,
        padding: 5
    },
    nextButton:{
        marginTop:30
    },
    signupScreen:{
        backgroundColor: "#F0F3F4"
    },
    buttonText: {
        color:"white"
    }
})

const mapStateToProps = (state) =>{
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        setToken: (token)=>{
            dispatch({
                type: "SIGNIN",
                payload: token
            })
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignupScreen)