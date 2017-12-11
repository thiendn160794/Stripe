import React, { Component } from 'react'
import _ from 'lodash'

export default class componentName extends Component {
    constructor(props){
        super(props);
        this.state = {
            lastCharge : 'none'
        }
        this.createCharge = this.createCharge.bind(this)
    }
    createCharge(){
        const key = "pk_test_UfxTBEB9CgHFH8bGLjKY1MZ3"
        const secretKey = "sk_test_BLeESU86au7t5nz68ypTZAba"

        const request = (route, key, method, postData) => {
            const dataStr = (method === 'GET') ? null : _.toPairs(postData).map((a) => {
                return `${a[0]} = ${a[1]}`;
            }).join
        }

        this.setState({
            lastCharge : "Creating token..."
        }, () => {
            fetch(`https://api.stripe.com/v1/tokens`, {
                method : 'POST',
                headers : {
                     'Accept': "application/json",
                     'Authorization': `Bearer ${key}`,
                     'Content-Type' : 'application/x-www-form-urlencoded'
                },
                body : 'card[number]=4242424242424242&card[exp_month]=02&card[exp_year]=2018'
            })
            .then((data) => data.json())
            .then((json) => {
                this.setState({
                    lastCharge : "Creating charge..."
                }, () => {
                    fetch(`https://api.stripe.com/v1/charges`, {
                        method : 'POST',
                        headers : {
                             'Accept': "application/json",
                             'Authorization': `Bearer ${secretKey}`,
                             'Content-Type' : 'application/x-www-form-urlencoded'
                        },
                        body : `amount=2000&currency=usd&description=test&source=${json.id}`
                    })
                    .then((data) => data.json())
                    .then((json) => {
                        this.setState({
                            lastCharge : json.id
                        })
                    })
                })
            })
        })
    }
    render() {
        return (
            <div>
                <h1>Checkout</h1>
                <button onClick = {this.createCharge}>Charge</button>
                <p>{this.state.lastCharge}</p> 
            </div>
        )
    }
}
