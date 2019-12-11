import React, { Component } from "react";
import "./WebViewer.scss";
import SplitPane from "react-split-pane";
import { Tree } from "./Tree";

export class WebViewer extends Component {
    static displayName = WebViewer.name;

    state = {
        direction: "vertical",
        expanded: []
    };
    updateDimensions() {
        return () => {
            let width = window.innerWidth;
            if (width < 600) {
                this.setState({ direction: "horizontal" });
            } else {
                this.setState({ direction: "vertical" });
            }
        };
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions());
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions());
    }
    render() {
        return (
            <SplitPane split={this.state.direction} defaultSize={200} primary="first">
                <div id="sidebar">
                    <Tree />
                </div>
                <div id="viewer">
                    <SplitPane split="horizontal" defaultSize={200} primary="first">
                        <div id="top" />
                        <div id="bottom" />
                    </SplitPane>
                </div>
            </SplitPane>
        );
    }
}
