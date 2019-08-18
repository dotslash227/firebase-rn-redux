import React from 'react';
import {Container, Content, Spinner} from 'native-base';

class SpinnerScreen extends React.Component{
    render(){
        return(
            <Container>
                <Content>
                    <Spinner color="green" />
                </Content>
            </Container>
        )
    }
}

export default SpinnerScreen;