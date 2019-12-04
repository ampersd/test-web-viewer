import React, { Component } from 'react';
import './WebViewer.css';
import SplitPane from 'react-split-pane';

export class WebViewer extends Component {

    static displayName = WebViewer.name;

    constructor(props) {
        super(props);
        this.state = { direction: "vertical" };
    }

    updateDimensions() {
        return () => {
            let width = window.innerWidth;
            if (width < 600) {
                this.setState({ direction: "horizontal" });
            } else {
                this.setState({ direction: "vertical" });
            }
        }
    };

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions());
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions());
    }

    render() {
        return (
            <SplitPane
                split={this.state.direction}
                defaultSize={200} primary="first"
            >
                <div id="sidebar"></div>
                <div id="viewer">
                    <SplitPane
                        split="horizontal"
                        defaultSize={200} primary="first"
                    >
                        <div id="top"></div>
                        <div id="bottom"></div>
                    </SplitPane>
                </div>
            </SplitPane>
        );
    }
}
