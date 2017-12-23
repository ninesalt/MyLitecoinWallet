import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar';

export default class Bar extends Component {
    render() {
        return (
            <AppBar
                title="MyLitecoinWallet"
                style={{ backgroundColor: '#3F51B5' }}
            />
        )
    }
}
