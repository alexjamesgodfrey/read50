import React, { Component } from 'react';
import Shelf from './components/Shelf.js';
import Header from './components/Header.js';
import './styles/Shelves.scss';

class Shelves extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TBR: [],
            CURR: [],
            ARL: [],
            DNF: [],
            run: 1,
            loading: true
        }
    }

    delay = ms => new Promise(res => setTimeout(res, ms));

    //updates state with user book information
    getList = async (sub, listType) => {
        const response = await fetch(`/api/booklists/${listType}/${sub}`)
        const json = await response.json();
        console.log(json);
        if (listType === 'TBR') {
            this.setState({ TBR: [...json]})
        } else if (listType === 'CURR') {
            this.setState({ CURR: [...json]})
        } else if (listType === 'ARL') {
            this.setState({ ARL: [...json]})
        } else {
            this.setState({ DNF: [...json]})
        }
        // this.setState({ listType: [response]})
    }

    render() {
        return (
            <div className="shelves">
                <div id="spacing"></div>
                <Shelf delay={this.delay} showLoading={this.showLoading} state={this.state} getList={this.getList} type={'TBR'} />
                <br />
                <Shelf delay={this.delay} showLoading={this.showLoading} state={this.state} getList={this.getList} type={'CURR'} />
                <br />
                <Shelf delay={this.delay} showLoading={this.showLoading} state={this.state} getList={this.getList} type={'ARL'} />
                <br />
                <Shelf delay={this.delay} showLoading={this.showLoading} state={this.state} getList={this.getList} type={'DNF'} />
            </div>
        )  
    }
}

export default Shelves;