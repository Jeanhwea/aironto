import React from 'react';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class TopMenu extends React.Component {

  handleClick = (e) => {
    console.log(e)
  }

  render() {
    return (
      <div>
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.props.current]}
          theme="dark"
          mode="horizontal"
        >
          <Menu.Item key="dash">
            <a href="/main">主面板</a>
          </Menu.Item>
          <Menu.Item key="concepts">
            <a href="/concepts" rel="noopener noreferrer">概念列表</a>
          </Menu.Item>
          <SubMenu title={<span><Icon type="setting" />设置</span>}>
            <MenuItemGroup title="Item 1">
              <Menu.Item key="setting:1">Option 1</Menu.Item>
              <Menu.Item key="setting:2">Option 2</Menu.Item>
            </MenuItemGroup>
            <MenuItemGroup title="Item 2">
              <Menu.Item key="setting:3">Option 3</Menu.Item>
              <Menu.Item key="setting:4">Option 4</Menu.Item>
            </MenuItemGroup>
          </SubMenu>
        </Menu>
      </div>
    );
  }

}

export default TopMenu
