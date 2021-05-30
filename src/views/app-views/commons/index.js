import React, { Component } from "react";
import { GoldOutlined, BankOutlined, FileOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import InnerAppLayout from "layouts/inner-app-layout";
import Banks from "./banks";
import Documents from "./documents";
import Cities from "./cities";

const SettingOption = ({ match, location }) => {
  return (
    <Menu
      defaultSelectedKeys={`${match.url}/banks`}
      mode="inline"
      selectedKeys={[location.pathname]}
    >
      <Menu.Item key={`${match.url}/banks`}>
        <BankOutlined />
        <span>Bankalar</span>
        <Link to={"banks"} />
      </Menu.Item>
      <Menu.Item key={`${match.url}/documents`}>
        <FileOutlined />
        <span>Dökümanlar</span>
        <Link to={"documents"} />
      </Menu.Item>
      <Menu.Item key={`${match.url}/cities`}>
        <GoldOutlined />
        <span>Şehir - İlçe - Vergi Dairesi</span>
        <Link to={"cities"} />
      </Menu.Item>
    </Menu>
  );
};

const SettingContent = ({ match }) => {
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/banks`} />
      <Route path={`${match.url}/banks`} component={Banks} />
      <Route path={`${match.url}/documents`} component={Documents} />
      <Route path={`${match.url}/cities`} component={Cities} />
    </Switch>
  );
};

export class Commons extends Component {
  render() {
    return (
      <InnerAppLayout
        sideContentWidth={320}
        className="kod-box"
        sideContent={<SettingOption {...this.props} />}
        mainContent={<SettingContent {...this.props} />}
      />
    );
  }
}

export default Commons;
