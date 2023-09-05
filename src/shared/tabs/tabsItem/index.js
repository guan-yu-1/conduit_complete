import React from "react";
import classNames from "classnames";

export default class TabsItem extends React.Component {
  render() {
    // active: 布尔类型, 是否为当前组件添加 active 类名
    // onClick: 函数类型, 点击按钮时执行的动作
    // children: 接收按钮中显示的内容
    const { active, onClick, children } = this.props;
    return (
      <li className="nav-item">
        <a onClick={onClick} className={classNames("nav-link", { active })}>
          {children}
        </a>
      </li>
    );
  }
}
