import React from "react";
import { Input, Menu } from "antd";
import "./AppLayout.scss";
import LogoImage from "assets/logo2.png";

function AppLayout({ children, sidebar }) {
    return (
        <div className="app">
            <div className="header">
                <h1 className="page-logo">
                    <img src={LogoImage} alt="logo" style={{marginRight:'0.5em'}} />
                    Pop-up Book
                </h1>
                <div className="search">
                    <Input.Search />
                </div>
                <div className="topnav">
                    <Menu mode="horizontal">
                        <Menu.Item>회원가입</Menu.Item>
                        <Menu.Item>Menu2</Menu.Item>
                        <Menu.Item>Menu3</Menu.Item>
                    </Menu>
                </div>
            </div>
            <div className="contents">{children}</div>
            <div className="sidebar">{sidebar}</div>
            <div className="footer">
                &copy; 2021. PlusBogi
            </div>
        </div>
    );
}

export default AppLayout;