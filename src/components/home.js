import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';


export default class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: '',
            password: ''
        }
    }


    checkPassword(input) {
        if (input !== '' && input !== undefined && input.length < 9) {
            this.setState({ error: "Password must be at least 9 characters." });
        }
        else {
            this.setState({ error: '', password: input });
        }

    }

    render() {

        return (

            <Card style={{ width: '60%' }}>

                <CardHeader title="Create New Wallet" />

                <TextField
                    style={{ width: 300 }}
                    type="password"
                    hintText="Enter a password (don't forget to save it!)"
                    errorText={this.state.error}
                    onChange={(event, value) => this.checkPassword(value)}
                />

            </Card>
        )
    }
}
