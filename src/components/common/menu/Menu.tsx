// components/common/Menu.tsx
"use client";

import React, { useState } from "react";
import { Menu as AntMenu } from "antd";
import type { MenuProps } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import styles from './menu.module.scss'
import classNames from "classnames/bind";

const cx = classNames.bind(styles)

type MenuItem = {
  name: string;
  action: () => void;
};

type MenuComponentProps = {
  menuItems: MenuItem[];
};

const Menu: React.FC<MenuComponentProps> = ({ menuItems }) => {
  const [menuState, setMenuState] = useState<boolean>(false)
  const items: MenuProps['items'] = menuItems.map((item, index) => ({
    key: index.toString(),
    label: item.name,
    onClick: item.action,
  }));
  const showMenu = () => {
    setMenuState((prev) => !prev)
  }
  return <div className={cx("menu-wrapper")} onClick={(e) => e.stopPropagation()}>
    {menuState ? <AntMenu items={items} className={cx("menu-body")}/> : null}
    <FontAwesomeIcon icon={faEllipsis} onClick={showMenu} className={cx("menu")}>
      
    </FontAwesomeIcon>
  </div>
};

export default Menu;
