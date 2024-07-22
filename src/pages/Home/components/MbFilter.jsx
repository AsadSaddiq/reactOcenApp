import React, { useState } from "react";
import { Select, AutoComplete, Slider, Divider } from "antd";

const MbFilter = ({ setHomeFilter }) => {
  const [value, setValue] = useState("");
  const [options, setOptions] = useState([]);

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const getPanelValue = (searchText) =>
    !searchText
      ? []
      : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];

  const onSelect = (data) => {
    console.log("onSelect", data);
  };

  const onChange = (data) => {
    setValue(data);
  };

  const onChangeComplete = (val) => {
    console.log("onChangeComplete: ", val);
  };

  return (
    <div className="flex w-full justify-center mt-4">
      <div className="flex flex-col w-[90vw] bg-slate-200 p-4 items-center justify-between rounded-lg">
        <div className="flex flex-col w-full mt-1">
          <span>Property Type</span>
          <Select
            defaultValue="lucy"
            style={{
              width: "100%",
              border: "none",
            }}
            onChange={handleChange}
            options={[
              { value: "jack", label: "property" },
              { value: "lucy", label: "Moter" },
              { value: "Yiminghe", label: "Bala Bala" },
            ]}
          />
        </div>
        <Divider className="my-2" />

        <div className="flex flex-col w-full ">
          <span>Price Rent</span>
          <div className="flex flex-col w-full -mt-2">
            <Slider
              range
              step={10}
              defaultValue={[0, 2000]}
              max={5000}
              onChange={onChange}
              onChangeComplete={onChangeComplete}
            />
            <div className="flex items-center justify-between -mt-3">
              <span>0</span>
              <span>5000</span>
            </div>
          </div>
        </div>
        <Divider className="my-2" />

        <div className="flex flex-col w-full ">
          <span>Location</span>
          <div className="flex w-full">
            <AutoComplete
              className="w-full"
              options={options}
              onSelect={onSelect}
              onSearch={(text) => setOptions(getPanelValue(text))}
              placeholder="UAE"
            />
          </div>
        </div>
        <Divider className="my-2" />
        <button
          className="bg-blue-200 w-full py-1 rounded-md"
          onClick={() => setHomeFilter((preVal) => !preVal)}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default MbFilter;
