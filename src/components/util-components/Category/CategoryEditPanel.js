import React from "react";
import { Popconfirm, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const CategoryEditPanel = (props) => {
  var editModel = props.dataSource[props.dataSource.length - 1];
  return (
    <>
      {props.dataSource.length > 0 ? (
        <>
          <div className="category-edit-menu">
            <Tooltip title="Düzenle">
              <button onClick={() => props.drawerState(true, 'edit', editModel)}>
                <EditOutlined />
              </button>
            </Tooltip>
            <Popconfirm
              placement="bottom"
              okText="Evet"
              cancelText="Hayır"
              title="Emin misin?"
              onConfirm={() =>
                props.removeCategory(
                  props.dataSource[props.dataSource.length - 1]
                )
              }
            >
              <Tooltip title="Sil">
                <button>
                  <DeleteOutlined />
                </button>
              </Tooltip>
            </Popconfirm>
          </div>
          <span>{props.dataSource.map((item) => item.title).join(" > ")} </span>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default CategoryEditPanel;
