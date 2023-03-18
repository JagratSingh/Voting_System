import React, {Component} from "react";
import voting from "../ethereum/voting";
import web3 from "../ethereum/web3";
import Layout from "../components/Layout"
import { Image, Form, Button, Input, Message } from "semantic-ui-react";
import { Router } from "../routes";

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
                .Register(this.state.Address, this.state.Aadhaar)
                .send({
                    from: accounts[0] 
                });
            
                Router.pushRoute("/");

        } catch (err) {
            this.setState({ errorMessage: err.message})
        }
        this.setState({ loading: false });
    };

    render() {
        return (
            <div>
                <Layout>
                    <Form style={{textAlign: 'center', marginTop: '40px'}} onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                        <Image src='https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg' size="small" centered/>
                        <h2 style={{ color: 'grey' }}>Welome to Voting System</h2>

                        <div >
                            <Input 
                                type="text" 
                                placeholder="Address Key" 
                                style={{width:'16em'}}
                                onChange={(event) => this.setState({ Address: event.target.value })}
                            />
                        </div>

                        <div style={{marginTop: '10px', marginBottom: '10px'}}>
                                <Input 
                                    type="text" 
                                    placeholder="Aadhaar Number" 
                                    style={{width:'16em'}}
                                    onChange={(event) => this.setState({ Aadhaar: event.target.value})}
                                />
                        </div>

                        <Message error header='Oops!' content={this.state.errorMessage}/>
                        <Button loading={this.state.loading} positive >Register</Button>

                    </Form>
                </Layout>
            </div>
        );
    }
}

export default VotingIndex;