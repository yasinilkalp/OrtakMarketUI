import React from "react";
import CategoryComponent from "components/util-components/Category";
var originData = [
  {
    key: 1,
    title: "ANTALYA",
    level: 1,
    commissionRate: 16.5,
    termDay: 60,
    children: [
      {
        key: 2,
        title: "MURATPAŞA",
        level: 2,
        commissionRate: 16.5,
        termDay: 60,
        children: [
          {
            key: 5,
            title: "YENİGÜN",
            level: 3,
            commissionRate: 16.5,
            termDay: 60,
            children: [],
          },
          {
            key: 6,
            title: "DUDAK MAKYAJI",
            level: 3,
            commissionRate: 16.5,
            termDay: 60,
            children: [],
          },
        ],
      },
      {
        key: 3,
        title: "CİLT BAKIMI",
        level: 2,
        commissionRate: 16.5,
        termDay: 60,
        children: [
          {
            key: 7,
            title: "GÜNEŞ KREMİ",
            level: 3,
            commissionRate: 16.5,
            termDay: 60,
            children: [],
          },
          {
            key: 8,
            title: "CİLT SERUMU",
            level: 3,
            commissionRate: 16.5,
            termDay: 60,
            children: [],
          },
        ],
      },
      {
        key: 4,
        title: "SAÇ BAKIMI",
        level: 2,
        commissionRate: 16.5,
        termDay: 60,
        children: [
          {
            key: 9,
            title: "ŞAMPUAN",
            level: 3,
            commissionRate: 16.5,
            termDay: 60,
            children: [],
          },
          {
            key: 10,
            title: "SAÇ BOYASI",
            level: 3,
            commissionRate: 16.5,
            termDay: 60,
            children: [],
          },
        ],
      },
      {
        key: 991,
        level: 2,
        commissionRate: 16.5,
        termDay: 60,
        title: "DENEME",
        children: [],
      },
    ],
  },
  {
    key: 99,
    level: 1,
    commissionRate: 16.5,
    termDay: 60,
    title: "BURDUR",
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
