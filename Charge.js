import React, { Component } from 'react'

export default class componentName extends Component {

    constructor(props){
        super()
        this.state = {
            loading : false,
            data : []
        }
    }

    componentWillMount(props){
        let secretKey = "sk_test_BLeESU86au7t5nz68ypTZAba"
        this.setState({
            loading : true
        }, () => {
            fetch("https://api.stripe.com/v1/charges", {
                method: 'GET',
                headers: {
                    'Accept': "application/json",
                    'Authorization': `Bearer ${secretKey}`,
                    'Content-Type' : 'application/x-www-form-urlencoded'
                }
              })
            .then((data) => data.json())
            .then((json) => {
                this.setState ({
                    loading : false,
                    data : json.data
                })
            })
        })
    }

    render() {
        let datas;
        if (!this.state.loading){
            datas = this.state.data.map((column) => {
                return (<h6>ID: {column.id}  Amount: {column.amount}usd  Description: {column.description}</h6>)
            })
        }
        return (
            <div>
                {datas}
            </div>
        )
    }
}
