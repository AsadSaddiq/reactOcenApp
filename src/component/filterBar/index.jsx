import React from "react";
import { Select, Space } from "antd";

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

const Filter = () => {
  return (
    <div className="flex w-full h-12 justify-center mt-4">
      <div className="flex w-[90vw] border items-center justify-between rounded-lg border-gray-400">
        <div className="flex w-[15vw]  border-r border-gray-400">
          <Select
            defaultValue="lucy"
            style={{
              width: "100%",
              border: "none",
              paddingLeft: "6px",
              paddingRight: "6px",
            }}
            onChange={handleChange}
            options={[
              { value: "jack", label: "Jack" },
              { value: "lucy", label: "Lucy" },
              { value: "Yiminghe", label: "yiminghe" },
              { value: "disabled", label: "Disabled", disabled: true },
            ]}
          />
        </div>
        <div className="flex w-[20vw] border-r border-gray-400">location</div>
        <div className="flex w-[15vw] border-r border-gray-400">
          property type
        </div>
        <div className="flex w-[15vw] border-r border-gray-400">categories</div>
        <div className="flex w-[15vw] border-r border-gray-400">price rent</div>
        <div className="flex w-[15vw] mr-2">filters</div>
      </div>
    </div>
  );
};

export default Filter;
