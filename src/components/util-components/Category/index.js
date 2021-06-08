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
            onClick={() => props.drawerState(true, "new", props.item)}
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
                {item.title} ({item.commissionRate}% - {item.termDay} gün)
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
  const _data = [...state];

  switch (action.type) {
    case "add":
      return [...state, action.item];
    case "remove":
      return _data.filter((a) => a.level < action.item.level);
    case "itemRemove":
      if (_data.filter((a) => a != action.item).length > 0) {
        _data.filter((a) => a != action.item).pop().children = _data
          .filter((a) => a != action.item)
          .pop()
          .children.filter((a) => a != action.item);
      }
      return _data;
    case "itemUpdate":
      if (_data.filter((a) => a != action.item).length > 0) {
        _data[_data.length - 1] = action.item;
        var m = _data
          .filter((a) => a != action.item)
          .pop()
          .children.filter((a) => a.key == action.item.key)[0];
        m.title = action.item.title;
        m.commissionRate = action.item.commissionRate;
        m.termDay = action.item.termDay;
      }
      return _data;
    case "itemInsert":
      console.log(action.item);
      return _data;
    default:
      return _data;
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
  const [drawerCategory, setDrawerCategory] = useState();

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

  const saveCategory = (item) => {
    if (item.action.action == "edit") {
      // Kategori Düzenleme
      setSubCategory({ item, type: "itemUpdate" });
      message.success("Kategori düzenlendi.");
    } else if (item.action.action == "new" && item.action.item === undefined) {
      // Ana Kategori
      item.key = data.length + 1;
      setData({ item, type: "add" });
    } else if (item.action.action == "new" && item.action.item !== undefined) {
      // Alt Kategori
      setSubCategory({ item, type: "itemInsert" });
      console.log("alt kategori eklenecek.");
    }
    drawerState(false);
  };

  const drawerState = (state, action, item) => {
    setDrawerCategory({ state, action: action ?? "", item });
  };

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
        onClose={() => drawerState(false)}
        model={drawerCategory}
        onFinish={saveCategory}
      />
    </>
  );
};

export default CategoryComponent;
