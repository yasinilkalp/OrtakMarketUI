import React from "react"; 
import CategoryComponent from "components/util-components/Category";
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
      {
        key: 991,
        level: 2,
        title: "DENEME",
        children: [],
      },
      {
        key: 992,
        level: 2,
        title: "DENEME",
        children: [],
      },
      {
        key: 993,
        level: 2,
        title: "DENEME",
        children: [],
      },
      {
        key: 994,
        level: 2,
        title: "DENEME",
        children: [],
      },
      {
        key: 995,
        level: 2,
        title: "DENEME",
        children: [],
      },
      {
        key: 996,
        level: 2,
        title: "DENEME",
        children: [],
      },
      {
        key: 997,
        level: 2,
        title: "DENEME",
        children: [],
      },
      {
        key: 998,
        level: 2,
        title: "DENEME",
        children: [],
      },
      {
        key: 999,
        level: 2,
        title: "DENEME",
        children: [],
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

const Categories = () => {
   
  return (
    <>
       <CategoryComponent dataSource={originData} />
    </>
  );
};

export default Categories;
