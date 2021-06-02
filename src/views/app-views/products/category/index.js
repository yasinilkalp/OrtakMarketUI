import React, { useEffect, useReducer, useState } from "react";
import { Card, Input } from "antd";
import { DoubleRightOutlined } from "@ant-design/icons";
var originData = [
  {
    key: 1,
    title: "KOZMETİK",
    level: 1,
    children: [
      {
        key: 2,
        title: "MAKYAJ",
        level: 2,
        children: [
          {
            key: 5,
            title: "GÖZ MAKYAJI",
            level: 3,
            children: [],
          },
          {
            key: 6,
            title: "DUDAK MAKYAJI",
            level: 3,
            children: [],
          },
        ],
      },
      {
        key: 3,
        title: "CİLT BAKIMI",
        level: 2,
        children: [
          {
            key: 7,
            title: "GÜNEŞ KREMİ",
            level: 3,
            children: [],
          },
          {
            key: 8,
            title: "CİLT SERUMU",
            level: 3,
            children: [],
          },
        ],
      },
      {
        key: 4,
        title: "SAÇ BAKIMI",
        level: 2,
        children: [
          {
            key: 9,
            title: "ŞAMPUAN",
            level: 3,
            children: [],
          },
          {
            key: 10,
            title: "SAÇ BOYASI",
            level: 3,
            children: [],
          },
        ],
      },
    ],
  },
  {
    key: 99,
    level: 1,
    title: "DENEME",
    children: [],
  },
];

const { Search } = Input;

const CategoryBox = (props) => {
  const onSearch = () => {};

  return (
    <>
      <Card type="inner" title={props.title} className="block mr-4">
        <Search
          placeholder="Kategori adını yazınız"
          onSearch={onSearch}
          size="small"
        />
        {props.dataSource.map((item) => {
          return (
            <button
              style={{ display: "block" }}
              key={item.key}
              onClick={() => props.onSelect(item)}
            >
              {item.title}{" "}
              {item.children.length > 0 ? <DoubleRightOutlined /> : <></>}
            </button>
          );
        })}
      </Card>
    </>
  );
};

const CategoryBreadCrumb = (props) => {
  return props.isLastCategory ? <>{props.dataSource.map(item=> item.title).join(" > ")}</> : <></>;
};

const categoryReducer = (state, action) => {
  switch (action.type) {
    case "add":
      return [...state, action.item];
    case "remove":
      const update = [...state];
      return update.filter((a) => a.level < action.item.level);
    default:
      return state;
  }
};

const Categories = () => {
  const [data, setData] = useState([]);
  const [subCategory, setSubCategory] = useReducer(categoryReducer, []);
  const [isLastCategory, setIsLastCategory] = useState(false);

  useEffect(() => {
    setData(originData);
  }, []);

  const onSelect = (item) => {
    if (subCategory.some((a) => a.level == item.level)) {
      setSubCategory({ item, type: "remove" });
    }

    if (!subCategory.some((a) => a.key == item.key)) {
      setSubCategory({ item, type: "add" });
    }

    setIsLastCategory(item.children.length === 0);
  };

  return (
    <>
      <div className="d-flex">
        <CategoryBox
          key="0"
          dataSource={data}
          onSelect={onSelect}
          title="Kategori Seçiniz"
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
                  />
                );
              })}
          </>
        ) : (
          <></>
        )}

        <CategoryBreadCrumb
          dataSource={subCategory}
          isLastCategory={isLastCategory}
        />
      </div>
    </>
  );
};

export default Categories;
