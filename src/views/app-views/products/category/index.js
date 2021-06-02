import React, { useEffect, useState } from "react";
import { Card } from "antd";

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
  },
];

const CategoryBox = ({ dataSource, selected, onSelect }) => {
  return (
    <>
      <Card
        title={selected?.title ?? "Kategori Seçiniz"}
        className="block mr-4"
      >
        {dataSource.map((item) => {
          return (
            <button
              style={{ display: "block" }}
              key={item.key}
              onClick={() => onSelect(item)}
            >
              {item.title}
            </button>
          );
        })}
      </Card>
    </>
  );
};

const Categories = () => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    setData(originData);
  }, []);

  const onSelect = (item) => {
    if ((item.children ?? []).length > 0) {
      
      var maxLevel = Math.max.apply(
        Math,
        selected.map(function (o) {
          return o.level;
        })
      );

      setSelected(selected.filter((a) => a.level < maxLevel));

      if (!selected.some((a) => a.key == item.key)) {
        setSelected([...selected, item]);
      }
    }
  };

  return (
    <>
      <div className="d-flex">
        <CategoryBox
          key="0"
          dataSource={data}
          onSelect={(item) => onSelect(item)}
          selected={selected}
        />

        {selected.length === 0 ? (
          <></>
        ) : (
          <>
            {selected.map((s) => {
              return (
                <CategoryBox
                  key={s.key}
                  dataSource={s.children}
                  onSelect={(item) => onSelect(item)}
                  selected={selected}
                />
              );
            })}
          </>
        )}
      </div>
    </>
  );
};

export default Categories;
