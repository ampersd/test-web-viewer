import React, { Component } from "react";
import RCTree, { TreeNode } from "rc-tree";

import "rc-tree/assets/index.css";
import "./Tree.scss";

export class Tree extends Component {
  state = {
    tree: undefined,
    expanded: []
  };

  componentDidMount() {
    // загружаем данные дерева
    this.populateDirectoriesData();
  }

  onExpand = (...args) => {
    console.log("onExpand", ...args);
  };

  onCheck = (checkedKeys, info) => {
    console.log("onCheck", checkedKeys, info);
  };

  switcherIcon = obj => {
    if (obj.isLeaf === true) return "";
    if (obj.expanded === true) return "▽";
    return "▷";
  };

    convertToTree(data, parentKeyStr) {
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

        //[
        //    {
        //        key: "0-0",
        //        title: "parent 1",
        //        children: [
        //            {
        //                key: "0-0-0",
        //                title: "parent 1-1",
        //                children: [{ key: "0-0-0-0", title: "parent 1-1-0" }]
        //            },
        //            {
        //                key: "0-0-1",
        //                title: "parent 1-2",
        //                children: [
        //                    {
        //                        key: "0-0-1-0",
        //                        title: "parent 1-2-0"
        //                    },
        //                    { key: "0-0-1-1", title: "parent 1-2-1" }
        //                ]
        //            }
        //        ]
        //    }
        //]
    if (parentKeyStr === undefined) parentKeyStr = "";
    let tree = [];
    let index = 0;
    for (let directoryNameProperty in data) {
      if (data.hasOwnProperty(directoryNameProperty)) {
        let key = parentKeyStr + "-" + index;
        let node = {
          title: directoryNameProperty,
          path: data[directoryNameProperty].path,
          key: key
        };
        if (data[directoryNameProperty].children) {
          node.children = this.convertToTree(
            data[directoryNameProperty].children,
            key
          );
        }
        tree.push(node);
        index++;
      }
    }
    return tree;
  }

  async populateDirectoriesData() {
    const response = await fetch(
      "api/getdirectoriestree"
    );
    const data = await response.json();
    console.log(data);
    // тут преобразуем в тот формат который тебе нужен
    const children = this.convertToTree(data);
    // ставим в стейт
    this.setState({ tree: children });
  }

  buildTree = data => {
    return data.map(item => {
        if (item.children && item.children.length > 0) {
        // console.log(item.children);
        return (
          <TreeNode
            title={item.title}
            key={item.key}
            // className="node"
            style={{
              fontWeight: "bold",
              color: "#a9a9a9"
            }}
          >
            {this.buildTree(item.children)}
          </TreeNode>
        );
      }
      console.log(item);
      return (
        <TreeNode
          title={item.title}
          key={item.key}
          isLeaf={item.isLeaf}
          disabled={item.key === "0-0-0"}
          style={{ fontWeight: "normal" }}
        />
      );
    });
  };

  render() {
    const { tree } = this.state;

    // если дерева пока нет, ничего не рендерим
    if (!tree) {
      return null;
    }

    // если есть строим дерево и рендерим его

    const treeNodes = this.buildTree(tree);

    return (
      <RCTree
        defaultExpandAll
        onExpand={this.onExpand}
        onSelect={this.onSelect}
        onCheck={this.onCheck}
        switcherIcon={this.switcherIcon}
        showIcon={false}
      >
        {treeNodes}
      </RCTree>
    );
  }
}
