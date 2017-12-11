//import liraries
import React, { Component } from 'react';
import './App.css';
import _ from "lodash"

// create a component
export class TabList extends Component {
    constructor(props){
        super();
        let defaultTab =  React.Children.toArray(props.children).map((child) => child.props.name)[0];
        React.Children.forEach(props.children, (child) => {
            if (child.props.default)
            defaultTab = child.props.name;
        })
        this.state = {
            selected : defaultTab
        }
        this.select = this.select.bind(this)
    }
    select(item){
        this.setState({
            selected : item
        })
    }
    render() {
        let tabs = React.Children.map(this.props.children, (child) => {
            let tabName = child.props.name;
            let className = (this.state.selected === tabName) ? "selected" : "unselected";
            return (
                <div><h1 onClick = {(e) => this.select(tabName)} className = {className}>{tabName}</h1></div>
            )
        })
        let body;
        React.Children.forEach (this.props.children, (child) => {
            if (child.props.name === this.state.selected)
            body = child
        })
        return (
            <div className = "holder">
                <div className = "tabs">
                    {tabs}
                </div>
                <div className = "body">
                    {body}
                </div>
            </div>
        );
    }
}

// create a component
export class Tab extends Component {
    render() {
        return this.props.children
    }
}

