import React from "react";
import { Drawer } from "antd";

const CategoryDrawer = (props) => {
    // console.log(props.model);
  return (
    <Drawer
      width={640}
      placement="right"
      closable={false}
      onClose={props.onClose}
      visible={props.visible}
    >
      <p
        className="site-description-item-profile-p"
        style={{ marginBottom: 24 }}
      >
        User Profile
      </p>
      <p className="site-description-item-profile-p">Personal</p>
    </Drawer>
  );
};

export default CategoryDrawer;
