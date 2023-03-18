import React, {Component} from "react";
import voting from "../ethereum/voting";
import web3 from "../ethereum/web3";
import Layout from "../components/Layout"
import { Image, Form, Button, Input, Message } from "semantic-ui-react";
import { Router,Link } from "../routes";

class VotingIndex extends Component {
    state = {
        Address: "",
        Aadhaar: "",
        errorMessage: "",
        loading: false
    };

    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({ loading: true, errorMessage: "" });

        try {
            const accounts = await web3.eth.getAccounts();
            await voting.methods
                .Login(this.state.Address, this.state.Aadhaar)
                .send({
                    from: accounts[0] 
                });
            
                Router.pushRoute(`/voting-sytem/${this.state.Address}`);

        } catch (err) {
            this.setState({ errorMessage: err.message})
        }
        this.setState({ loading: false });
    };

    render() {
        return (
                <Layout>
                    <Form style={{textAlign: 'center', marginTop: '25px'}} onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                        <Image src='https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg' size="small" centered/>
                        <h2 style={{ color: 'grey' }}>Welome to Voting System</h2>

                        <Form.Field >
                            <Input 
                                type="text" 
                                placeholder="Address Key" 
                                style={{width:'16em'}}
                                onChange={(event) => this.setState({ Address: event.target.value })}
                            />
                        </Form.Field>

                        <Form.Field style={{marginTop: '10px', marginBottom: '10px'}}>
                                <Input 
                                    type="text" 
                                    placeholder="Aadhaar Number" 
                                    style={{width:'16em'}}
                                    onChange={(event) => this.setState({ Aadhaar: event.target.value})}
                                />
                        </Form.Field>

                        <Message error header='Oops!' content={this.state.errorMessage}/>
                        <Button loading={this.state.loading} style={{width:'16em', marginLeft:'5px'}} primary >Log in</Button>
                        
                        <Form.Field style={{marginTop: '10px', marginBottom: '10px'}}>
                            <Link route="/voting-system/registration" style={{color:"#4CAF50",fontWeight:"bold"}}>
                                <p >Not Registered ?</p>
                            </Link>
                        </Form.Field>

                    </Form>
                </Layout>   
        );
    }
}

export default VotingIndex;