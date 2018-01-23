import React from "react"
import { Menu, Icon } from "antd"

const SubMenu = Menu.SubMenu
const MenuItem = Menu.Item
const MenuItemGroup = Menu.ItemGroup

class TopMenu extends React.Component {

  constructor(props) {
    super(props)
    const data = this.props.data || {}
    this.state = {
      current: this.props.current
    }
  }

  handleClick = (e) => {
    // console.log(e)
  }

  render() {
    return (
      <div>
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          theme="dark"
          mode="horizontal"
        >
          <MenuItem key="dash">
            <a href="/main">主面板</a>
          </MenuItem>
          <MenuItem key="concepts">
            <a href="/concepts" rel="noopener noreferrer">概念列表</a>
          </MenuItem>
          <MenuItem key="templates">
            <a href="/templates" rel="noopener noreferrer">句式列表</a>
          </MenuItem>
          <MenuItem key="projects">
            <a href="/projects" rel="noopener noreferrer">项目列表</a>
          </MenuItem>
          <SubMenu title={<span><Icon type="plus-circle-o" />新增元素</span>}>
            <MenuItemGroup title="本体相关">
              <MenuItem key="new:concept">
                <a href="/concepts/new" rel="noopener noreferrer">概念</a>
              </MenuItem>
            </MenuItemGroup>
            <MenuItemGroup title="需求相关">
              <MenuItem key="new:project">
                <a href="/projects/new" rel="noopener noreferrer">RUCM工程</a>
              </MenuItem>
              <MenuItem key="new:usecase">
                <a href="/usecases/new" rel="noopener noreferrer">RUCM用例</a>
              </MenuItem>
            </MenuItemGroup>
          </SubMenu>
        </Menu>
      </div>
    )
  }

}

export default TopMenu
