import React, { useEffect, useReducer, useState } from "react";
import { Card, Input, message } from "antd";
import { DoubleRightOutlined, PlusCircleOutlined } from "@ant-design/icons";
import CategoryEditPanel from "./CategoryEditPanel";
import CategoryDrawer from "./CategoryDrawer";
import "./Category.css";

const CategoryBox = (props) => {
  const [data, setData] = useState(props.dataSource);

  const onSearch = (e) => {
    var filter = props.dataSource.filter(
      (data) =>
        JSON.stringify(data.title)
          .toLowerCase()
          .indexOf(e.target.value.toLowerCase()) !== -1
    );
    setData(filter);
  };

  useEffect(() => {
    setData(props.dataSource);
  }, [props.dataSource]);

  return (
    <>
      <Card
        type="inner"
        title={props.title}
        extra={
          <button
            className="category-card-button"
            onClick={() => props.drawerState(true, props.item)}
          >
            <PlusCircleOutlined /> <span> Yeni </span>
          </button>
        }
        className="category-card block mr-2"
      >
        <div className="category-card-search">
          <Input
            placeholder="Kategori adı ile arayınız"
            onChange={onSearch}
            size="small"
            className=""
          />
        </div>

        <div className="category-card-items">
          {data.map((item) => {
            return (
              <button
                className={`button-category-item ${
                  props.selectedCategory?.key === item.key ? "active" : ""
                }`}
                key={item.key}
                onClick={() => props.onSelect(item)}
              >
                {item.title}{" "}
                {item.children.length > 0 ? <DoubleRightOutlined /> : <></>}
              </button>
            );
          })}
        </div>
      </Card>
    </>
  );
};

const subCategoryReducer = (state, action) => {
  switch (action.type) {
    case "add":
      return [...state, action.item];
    case "remove":
      const update = [...state];
      return update.filter((a) => a.level < action.item.level);
    case "itemRemove":
      const _data = [...state];
      if (_data.filter((a) => a != action.item).length > 0) {
        _data.filter((a) => a != action.item).pop().children = _data
          .filter((a) => a != action.item)
          .pop()
          .children.filter((a) => a != action.item);
      }
      return _data;

    default:
      return state;
  }
};

const dataReducer = (state, action) => {
  switch (action.type) {
    case "add":
      return [...state, action.item];
    case "remove":
      const update = [...state];
      return update.filter((a) => a.key != action.item.key);
    default:
      return state;
  }
};

const CategoryComponent = ({ dataSource }) => {
  const [data, setData] = useReducer(dataReducer, dataSource);
  const [subCategory, setSubCategory] = useReducer(subCategoryReducer, []);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [editCategory, setEditCategory] = useState();

  const onSelect = (item) => {
    if (subCategory.some((a) => a.level == item.level)) {
      setSubCategory({ item, type: "remove" });
    }

    if (!subCategory.some((a) => a.key == item.key)) {
      setSubCategory({ item, type: "add" });
    }
  };

  const removeCategory = (item) => {
    setSubCategory({ item, type: "remove" });
    setSubCategory({ item, type: "itemRemove" });
    if (item.level === 1) {
      setData({ item, type: "remove" });
    }
    message.success("Kategori silindi.");
  };

  const drawerState = (state, item) => {
    setDrawerVisible(state);
    if (state) {
      console.log(item);
    }
  };

  //   const find = (array, id) => {
  //     var result;
  //     array.some((o) => (result = o.key === id ? o : find(o.children || [], id)));
  //     return result;
  //   };

  return (
    <>
      <div className="category-breadcrumb d-flex">
        <CategoryEditPanel
          dataSource={subCategory}
          removeCategory={removeCategory}
          drawerState={drawerState}
        />
      </div>
      <div className="d-flex">
        <CategoryBox
          key="0"
          dataSource={data}
          onSelect={onSelect}
          title="Kategori Seçiniz"
          selectedCategory={subCategory[subCategory.length - 1]}
          drawerState={drawerState}
        />

        {subCategory.length > 0 ? (
          <>
            {subCategory
              .filter((s) => s.children.length > 0)
              .map((s) => {
                return (
                  <CategoryBox
                    key={s.key}
                    dataSource={s.children}
                    onSelect={onSelect}
                    title={s.title}
                    item={s}
                    selectedCategory={subCategory[subCategory.length - 1]}
                    drawerState={drawerState}
                  />
                );
              })}
          </>
        ) : (
          <></>
        )}
      </div>

      <CategoryDrawer
        visible={drawerVisible}
        onClose={() => drawerState(false)}
        model={editCategory}
      />
    </>
  );
};

export default CategoryComponent;
