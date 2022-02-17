import React, { Component } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { RiNodeTree } from "react-icons/ri";
import { IoCloudDoneSharp, IoCloudOfflineSharp } from "react-icons/io5";
import { loadingSVG } from "../helper/helper";
import { Routes, Route, Link } from "react-router-dom";
import "./dashboard.css";
import NodeExplorer from "./nodeExplore";
class Dashboard extends Component {
  state = {
    nodesInfo: { nodes: [], node_details: [{ id: "" }], total: 0 },
    open: false,
  };
  async componentDidMount() {
    const n = await this.props.RMaker.nodes;
    this.setState({ nodesInfo: n });
  }

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => this.setState({ open: false });

  render() {
    return (
      <React.Fragment>
        <h2>Dashboard</h2>
        <div className="dashboard-container">
          <div className="dashboard-sidebar">
            <ProSidebar>
              <Menu iconShape="circle">
                <SubMenu title="Nodes" defaultOpen={true} icon={<RiNodeTree />}>
                  {this.state.nodesInfo.total > 0
                    ? this.state.nodesInfo.node_details.map((node) => {
                        return node.status.connectivity.connected ? (
                          <MenuItem
                            color="#6adc39"
                            key={"menuItem" + node.id}
                            icon={<IoCloudDoneSharp color="#6adc39" />}
                          >
                            {node.id}
                            <Link to={node.id} key={"menu" + node.id} />
                          </MenuItem>
                        ) : (
                          <MenuItem
                            key={"menuItem" + node.id}
                            icon={<IoCloudOfflineSharp />}
                          >
                            {node.id}
                            <Link to={node.id} key={"menu" + node.id} />
                          </MenuItem>
                        );
                      })
                    : loadingSVG}
                </SubMenu>
              </Menu>
            </ProSidebar>
          </div>
          <div className="dasboard-content">
            {this.state.nodesInfo.total > 0 ? (
              <Routes>
                {this.state.nodesInfo.node_details.map((node) => {
                  return (
                    <Route
                      path={node.id}
                      exact
                      key={"route" + node.id}
                      element={NodeExplorer(node)}
                    />
                  );
                })}
              </Routes>
            ) : (
              loadingSVG
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Dashboard;
