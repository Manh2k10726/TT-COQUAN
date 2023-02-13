import React, { Fragment, useEffect, useState } from "react";
import { Table, Tabs, Input, Menu, Layout, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { history } from "../../../../App";
import {
  getCompanies,
  getUserContact,
  getDepartments,
} from "./../../../../Redux/Action/ManageContacsAction";
import NhanVien from "./nhanvien";
import PhongBan from "./phongban";

export default function DanhBa(props) {
  const { lstCompany } = useSelector((state) => state.ManageUtilityReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCompanies());
  }, []);
  const [code_depart, setCode] = useState("CPN7451091748209");
  const handleChange = (value) => {
    setCode(value);
    dispatch(getDepartments(value));
  };
  return (
    <div>
      <div
        style={{
          margin: "5px",
          width: "full",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Select
          defaultValue="Tổng công ty Hàng hải Việt Nam"
          onChange={handleChange}
          style={{ width: "20%" }}
        >
          {" "}
          {lstCompany?.map((item) => {
            return <Select.Option value={item.code}>{item.name}</Select.Option>;
          })}
        </Select>
      </div>
      <div
        className="Contacts-container"
        style={{
          backgroundColor: "white",
          margin: "20px",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        <div className="Contact-header">
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Nhân viên" key="1">
              <NhanVien codeCompanies={code_depart} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Phòng ban" key="2">
              <PhongBan codeCompanies={code_depart} />
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
