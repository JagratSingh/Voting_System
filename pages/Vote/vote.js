import React, {Component} from "react";
import { Button, Message, Table, TableBody } from "semantic-ui-react";
import Layout from "../../components/Layout";
import voting from "../../ethereum/voting";
import web3 from "../../ethereum/web3";

class Vote extends Component {
    state = {
        winner : "",
        errorMessage : "",
        disable: false,
        BJPloading: false,
        BSPloading: false,
        AAPloading: false,
        INCloading: false,
        winnerLoading: false
    };

    BJP = async () => {
        alert("You are going to vote to BJP");
        this.setState({ BJPloading: true, errorMessage: "" });
        
        try {
            const accounts = await web3.eth.getAccounts();
            await voting.methods.VoteTo("BJP").send({ from: accounts[0]} );
            this.setState({ disable: true});      
        } catch (err) {
            this.setState({ errorMessage: err.message });
        }
        this.setState({ BJPloading: false });
    };

    BSP = async () => {
        alert("You are going to vote to BSP");
        this.setState({ BSPloading: true, errorMessage: "" });
        
        try {
            const accounts = await web3.eth.getAccounts();
            await voting.methods.VoteTo("BSP").send({ from: accounts[0]} );      
            this.setState({ disable: true});
        } catch (err) {
            this.setState({ errorMessage: err.message });
        }
        this.setState({ BSPloading: false });
    };

    AAP = async () => {
        alert("You are going to vote to AAP");
        this.setState({ AAPloading: true, errorMessage: "" });
        
        try {
            const accounts = await web3.eth.getAccounts();
            await voting.methods.VoteTo("AAP").send({ from: accounts[0]} );  
            this.setState({ disable: true});    
        } catch (err) {
            this.setState({ errorMessage: err.message });
        }
        this.setState({ AAPloading: false });
    };
    
    INC = async () => {
        alert("You are going to vote to INC");
        this.setState({ INCloading: true, errorMessage: "" });
        
        try {
            const accounts = await web3.eth.getAccounts();
            await voting.methods.VoteTo("INC").send({ from: accounts[0]} );
            this.setState({ disable: true});      
        } catch (err) {
            this.setState({ errorMessage: err.message });
        }
        this.setState({ INCloading: false });
    };

    manager = async () => {
        alert("Only a manager can pick a winner");
        this.setState({ winnerLoading: true, winner: "", errorMessage: "" });

        try {
            const accounts = await web3.eth.getAccounts();
            const winner = await voting.methods.PickWinner().call({ from: accounts[0]});
            this.setState({ winner: winner});
        }
        catch(err){
            this.setState({ errorMessage: err.message });
        }
        this.setState({ winnerLoading: false });
    };


    render () {
        return (
            <Layout>
                <Table>
                    <Table.Header>
                        <Table.HeaderCell>Election Symbol</Table.HeaderCell>
                        <Table.HeaderCell>Party</Table.HeaderCell>
                        <Table.HeaderCell>Candidate Name</Table.HeaderCell>
                        <Table.HeaderCell>Vote</Table.HeaderCell>
                    </Table.Header>

                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>
                                <img 
                                    src="https://upload.wikimedia.org/wikipedia/commons/1/1e/Bharatiya_Janata_Party_logo.svg"
                                    height='100px'
                                    width='100px'></img>
                            </Table.Cell>
                            <Table.Cell>
                                <label>Bharatiya Janata Party (BJP)</label>
                            </Table.Cell>
                            <Table.Cell>
                                <label>Jagrat Singh</label>
                            </Table.Cell>
                            <Table.Cell>
                                <Button primary onClick={this.BJP} loading={this.state.BJPloading} disabled={this.state.disable}>Vote</Button>
                            </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                            <Table.Cell>
                                <img 
                                    src="https://upload.wikimedia.org/wikipedia/commons/d/d2/Elephant_Bahujan_Samaj_Party.svg" 
                                    height='100px'
                                    width='100px'></img>
                            </Table.Cell>
                            <Table.Cell>
                                <label>Bahujan Samaj Party (BSP)</label>
                            </Table.Cell>
                            <Table.Cell>
                                <label>Harsh Kumar</label>
                            </Table.Cell>
                            <Table.Cell>
                                <Button primary onClick={this.BSP} loading={this.state.BSPloading} disabled={this.state.disable}>Vote</Button>
                            </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                            <Table.Cell>
                                <img 
                                    src="https://upload.wikimedia.org/wikipedia/commons/f/fc/Aam_Aadmi_Party_Flag.svg"
                                    height='100px'
                                    width='100px'></img>
                            </Table.Cell>
                            <Table.Cell>
                                <label>Aam Aadmi Party (AAP)</label>
                            </Table.Cell>
                            <Table.Cell>
                                <label>Badal Kumar</label>
                            </Table.Cell>
                            <Table.Cell>
                                <Button primary onClick={this.AAP} loading={this.state.AAPloading} disabled={this.state.disable}>Vote</Button>
                            </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                            <Table.Cell>
                                <img 
                                    src="https://upload.wikimedia.org/wikipedia/commons/a/ad/INC_Logo.png"
                                    height='100px'
                                    width='100px'></img>
                            </Table.Cell>
                            <Table.Cell>
                                <label>Indian Natinal Congress (INC)</label>
                            </Table.Cell>
                            <Table.Cell>
                                <label>Sagar Singh</label>
                            </Table.Cell>
                            <Table.Cell>
                                <Button primary onClick={this.INC} loading={this.state.INCloading} disabled={this.state.disable}>Vote</Button>
                            </Table.Cell>
                        </Table.Row>

                    </Table.Body>
                </Table>
                <Message hidden={!this.state.errorMessage} header="Oops!" content={this.state.errorMessage} negative/>
                <Message hidden={!this.state.winner} header="Congratulations!" content={this.state.winner} positive/>
                <Button positive onClick={this.manager} loading={this.state.winnerLoading} hidden>Pick Winner</Button>
            </Layout>
        );
    }
}

export default Vote