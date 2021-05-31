import React, { useEffect, useState } from "react";
import { Tree, Input } from "antd";
const { Search } = Input;

var originData = [
  {
    key: 1,
    title: "KOZMETİK",
    children: [
      {
        key: 2,
        title: "MAKYAJ",
        children: [
          {
            key: 5,
            title: "GÖZ MAKYAJI",
            children: [],
          },
          {
            key: 6,
            title: "DUDAK MAKYAJI",
            children: [],
          },
        ],
      },
      {
        key: 3,
        title: "CİLT BAKIMI",
        children: [
          {
            key: 7,
            title: "GÜNEŞ KREMİ",
            children: [],
          },
          {
            key: 8,
            title: "CİLT SERUMU",
            children: [],
          },
        ],
      },
      {
        key: 4,
        title: "SAÇ BAKIMI",
        children: [
          {
            key: 9,
            title: "ŞAMPUAN",
            children: [],
          },
          {
            key: 10,
            title: "SAÇ BOYASI",
            children: [],
          },
        ],
      },
    ],
  },
  {
    key: 99,
    title: "DENEME",
  },
];

const Categories = () => {
  const [data, setData] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [searchValue, setSearchValue] = useState();
  const [autoExpandParent, setAutoExpandParent] = useState();

  const onExpand = (expandedKeys) => {
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  };

 

  const getParentKey = (key, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.children) {
        if (node.children.some((item) => item.key === key)) {
          parentKey = node.key;
        } else if (getParentKey(key, node.children)) {
          parentKey = getParentKey(key, node.children);
        }
      }
    }
    return parentKey;
  };

  useEffect(() => {
    setData(originData);
    setSearchValue("");
    setAutoExpandParent(true);
  }, []);

  const loop = (data) =>
    data.map((item) => {
      const index = item.title.indexOf(searchValue);
      const beforeStr = item.title.substr(0, index);
      const afterStr = item.title.substr(index + searchValue.length);
      const title =
        index > -1 ? (
          <span>
            {beforeStr}
            <span className="site-tree-search-value">{searchValue}</span>
            {afterStr}
          </span>
        ) : (
          <span>{item.title}</span>
        );
      if (item.children) {
        return { title, key: item.key, children: loop(item.children) };
      }

      return {
        title,
        key: item.key,
      };
    });

  return (
    <>
      <div>
        <Search
          style={{ marginBottom: 8 }}
          placeholder="Search" 
        />
        <Tree
          onExpand={onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          treeData={loop(data)}
        />
      </div>
    </>
  );
};

export default Categories;
