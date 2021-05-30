import React, { useState } from "react";
import CityTables from "./CityTables";
import DistrictTables from "../districts/districtTables";

const Cities = () => {
  const [districtIsOpenModal, setdistrictIsOpenModal] = useState(false);
  const [cityId, setCityId] = useState(false);

  const modalState = async (value, id) => {
    setdistrictIsOpenModal(value);
    setCityId(id);
  };

  return (
    <>
      <CityTables districtModal={(id) => modalState(true, id)} />
      <DistrictTables
        visible={districtIsOpenModal}
        cityId={cityId}
        onCancel={() => modalState(false, 0)}
      />
    </>
  );
};

export default Cities;
