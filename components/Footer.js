import React from "react";
import { Icon, Container } from "semantic-ui-react";

const customsytle = {
    position: 'fixed', 
    bottom: '0', 
    left: '0', 
    width: '100%', 
    textAlign: 'center'
}

const Footer = () => {
    return (
        <Container>
            <span style={customsytle}>Made with <Icon name="heart" color="red"/> by Jagrat</span>
        </Container>
    );
};

export default Footer; 