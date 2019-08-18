import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Container, Content, Form, Input, Label, Button, Item, Picker, Icon, Row, Col, Textarea, Footer, FooterTab} from 'native-base';
import fb from '../../Utils/fbconfig';
import SpinnerScreen from '../../Components/Spinner';

class Business extends React.Component{
    
    constructor(props){
        super(props);        
        this.state = {
            uid: this.props.navigation.getParam("user").uid,
            bCategory: '',
            bName: '',
            bAddress: '',
            bEstablished: '',
            bPhone: '',
            bDescription: '',
            flag: false,
            loading: false
        }
        this.fb = fb.firestore();
    }    

    static navigationOptions = {
        title: "Enter Business Details",
        headerLeft: null
    }

    checkFlag(text){
        if (this.state.bCategory != "" && this.state.bName != "" && this.state.bAddress != "" && this.state.bEstablished != "" && this.state.bPhone != ""){
            this.setState({flag:true});
        } else this.setState({flag:false})
        if (text=="") this.setState({flag:false});
    }

    changeBusinessCategory(text){
        this.setState({bCategory:text});        
    }
    
    handleName(text){
        this.setState({bName:text});
        this.checkFlag(text);
    }

    handleAddress(text){
        this.setState({bAddress:text});
        this.checkFlag(text);
    }

    handleEstablished(text){
        this.setState({bEstablished:text});
        this.checkFlag(text);
    }

    handlePhone(text){
        this.setState({bPhone:text});
        this.checkFlag(text);
    }

    handleDescription(text){
        this.setState({bDescription:text});        
        this.checkFlag(text);
    }

    handleSubmit(){              
        console.log(this.state);
        this.setState({loading:true})
        this.fb.collection("businessDetails").add({
            category: this.state.bCategory,
            description: this.state.bDescription,
            name: this.state.bName,
            since: this.state.bEstablished,
            phone: this.state.bPhone,
            uid: this.state.uid
        })
        .then(()=>{            
            alert("Record submitted");
            this.props.navigation.navigate("HomeScreen");            
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    render(){
        if (this.state.loading) return <SpinnerScreen />        
        else return(
            <Container style={styles.businessScreen}>
                <Content padder>
                    <Form>
                        <Item stackedLabel>
                            <Label>Enter Business Name</Label>
                            <Input autoCorrect={false} onChangeText={(text)=>this.handleName(text)} />
                        </Item>
                        <Item stackedLabel>
                            <Label>Enter full Business Address</Label>
                            <Input autoCorrect={false} onChangeText={(text)=>this.handleAddress(text)}  />
                        </Item>
                        <Item stackedLabel>
                            <Label>Established Since</Label>
                            <Input autoCorrect={false} onChangeText={(text)=>this.handleEstablished(text)}  />
                        </Item>
                        <Item stackedLabel>
                            <Label>Enter work Phone Number</Label>                            
                            <Input autoCorrect={false} onChangeText={(text)=>this.handlePhone(text)}  />
                        </Item>     
                        <Row>
                            <Col>
                                <Text style={{marginTop:12}}>Business Category</Text>
                            </Col>                            
                            <Col size={2}>
                                <Item picker>                            
                                    <Picker mode="dropdown"
                                    style={{width:"95%"}}
                                    placeholder="Choose business category"
                                    placeholderStyle={{color:"black", fontWeight:"200"}}
                                    iosIcon={<Icon name="arrow-down" />}
                                    selectedValue={this.state.bCategory}
                                    onValueChange={(value)=>this.changeBusinessCategory(value)}
                                    >
                                        <Picker.Item label="Shoe Manufacturing" value="shoe-manufacturing" />
                                        <Picker.Item label="Paper Wholesale" value="paper-wholesale" />
                                    </Picker>
                                </Item>                   
                            </Col>
                        </Row>  
                        <Item stackedLabel>
                            <Label>Enter business description</Label>
                            <Textarea onChangeText={(text)=>this.handleDescription(text)} style={{width:"100%"}} bordered />
                        </Item>                        
                    </Form>                    
                </Content>
                <Footer>
                    <FooterTab>
                        <Button onPress={()=>this.handleSubmit()} 
                            disabled={!this.state.flag} full 
                            style={(this.state.flag)?styles.submitButton:[]}
                        >
                            <Text style={styles.buttonText}>Submit and Signup</Text>
                        </Button>
                    </FooterTab>                        
                </Footer>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    submitButton:{
        backgroundColor: "green"
    },
    buttonText: {
        color:"white"
    },
    businessScreen:{
        backgroundColor: "#F0F3F4"
    }
})

export default Business