import React from 'react';
import {Text} from 'react-native';
import {Header, Body, Left, Right, Icon, Button} from 'native-base';

class HeaderBar extends React.Component {

    constructor(props){
        super(props);        
    }    

    render(){
        return(
            <Header>
                <Left>                    
                    <Icon onPress={()=>this.props.navigation.openDrawer()} name="menu" />
                </Left>
                <Body>
                    <Text>{this.props.title}</Text>
                </Body>
                <Right>
                    {(this.props.right)?<Icon name="arrow-back" />:null}
                </Right>
            </Header>
        )
    }
}

export default HeaderBar;