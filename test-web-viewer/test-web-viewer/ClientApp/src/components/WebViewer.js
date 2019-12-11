import React, { Component } from 'react';
import './WebViewer.css';
import SplitPane from 'react-split-pane';
import Tree from 'react-ui-tree';

export class WebViewer extends Component {

    static displayName = WebViewer.name;

    constructor(props) {
        super(props);
        this.state = {
            tree: { module: "img", children: [] },
            directories: {},
            direction: "vertical"
        };
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
        this.populateDirectoriesData();
        window.addEventListener('resize', this.updateDimensions());
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions());
    }

    renderNode = node => {
        return (
            <span className="folderName"
                style={(node.children && node.children.length > 0) ? { fontWeight: 'bold' } : { fontWeight: 'normal' }}
            >
                {node.module}
            </span>
        );
    };


    render() {
        return (
            <SplitPane
                split={this.state.direction}
                defaultSize={200} primary="first"
            >
                <div id="sidebar">
                   <Tree
                        paddingLeft={20}              // left padding for children nodes in pixels
                        tree={this.state.tree}        // tree object
                        renderNode={this.renderNode}  // renderNode(node) return react element
                    />
                </div>
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

    convertToTree(data) {
        // data
        //{
        //    "directoryName1": {
        //        "path": "directory1FullPath",
        //        "children": {
        //            "directoryName2": { ... }
        //            "directoryName3": { ... }
        //        }
        //    }
        //}

        // result
        //{
        //    "module": "directoryName1",
        //    "path": 
        //    "children": [{
        //            "module": "directoryName2",
        //            "children": [{
        //                "module": "..."
        //            }]
        //        },
        //        {
        //            "module": "directoryName2",
        //            "children": [{
        //                "module": "..."
        //            }]
        //        }
        //    ]
        //}
        let tree = [];
        for (let property in data) {
            if (data.hasOwnProperty(property)) {
                let node = {
                    module: property,
                    path: data[property].path
                };
                if (data[property].children) {
                    node.children = this.convertToTree(data[property].children);
                }
                tree.push(node);
            }
        }
        return tree;
    }

    async populateDirectoriesData() {
        const response = await fetch('api/getdirectoriestree');
        const data = await response.json();
        console.log(data);
        const children = this.convertToTree(data);
        console.log(children);
        let tree = this.state.tree;
        tree.children = children;
        this.setState({ tree: tree, directories: data });
    }
}
