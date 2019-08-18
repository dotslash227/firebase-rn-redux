import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, Container, Content} from 'native-base';
import {connect} from 'react-redux';
import HeaderBar from '../Components/Header';

class HomeScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        return(
            <Container>
                <HeaderBar {...this.props} title="Home" />
                <Content padder>
                    <Text>Hello World</Text>                    
                    <Button onPress={()=>this.drawer._root.open()}><Text>Press</Text></Button>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({

})

mapStateToProps = (state) =>{
    return{
        auth: state.auth,
        user: state.user
    }
}

mapDispatchToProps = (dispatch) =>{
    return{
        setToken: (token)=>{
            dispatch(({
                type: "SIGNIN",
                payload: token
            }))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)