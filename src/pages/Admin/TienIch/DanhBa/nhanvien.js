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
import { ManageUtilityReducer } from "./../../../../Redux/Reducer/ManageUtilityReducer";

export default function NhanVien(props) {
  let pages = 1;
  let [keyword, setKeyword] = useState("");
  console.log("keyword", keyword);
  let company_code = props.codeCompanies;
  console.log("code cong ty", company_code);
  const [pageId, setPageId] = useState();

  // console.log(codeCompany)
  useEffect(() => {
    setPageId(pages);
  }, [pages]);
  const { lstContact } = useSelector((state) => state.ManageUtilityReducer);
  console.log("data danh ba:", lstContact);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserContact(pages - 1, keyword, company_code));
  }, [pages - 1, keyword, company_code]);

  const columns1 = [
    {
      title: "Thông tin",
      dataIndex: "name_lowercase",
    },
    {
      title: "ID",
      dataIndex: "username",
    },
    {
      title: "Mã nhân viên",
      dataIndex: "ma_nv",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Điện thoại",
      dataIndex: "phone",
    },
    {
      title: "Số máy nội bộ",
      dataIndex: "home_phone",
      render: (text, item) => {
        return <Fragment>{item ? item.position.name : <>null</>}</Fragment>;
      },
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
    },
    {
      title: "Chức vụ",
      dataIndex: "position",
      render: (text, item) => {
        return <Fragment>{item.position.name}</Fragment>;
      },
    },
    {
      title: "Phòng ban",
      dataIndex: "department",
      render: (text, item) => {
        return <Fragment>{item.department.name}</Fragment>;
      },
    },
  ];

  const onSearch = (value) => {
    setKeyword(value);
    // dispatch(getUserContact(pages - 1, value, company_code));
  };

  return (
    <div>
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
          <Input.Search
            allowClear
            style={{ width: "40%" }}
            onSearch={onSearch}
            enterButton
          />
          <Table
            bordered
            dataSource={lstContact.data}
            columns={columns1}
            key=""
            pagination={{
              defaultCurrent: pageId,
              defaultPageSize: 10,
              total: `${lstContact.total_count}`,
              onChange: (page, pageSize) => {
                dispatch(getUserContact(page - 1, keyword));
                // history.replace(`/utility/contacts/${page}`)
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
