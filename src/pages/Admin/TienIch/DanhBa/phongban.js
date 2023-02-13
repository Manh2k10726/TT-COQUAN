import React, { Fragment, useEffect, useState } from "react";
import { Table, Tabs, Input, Menu, Layout, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { history } from "../../../../App";
import { getContactByDepartments } from "./../../../../Redux/Action/ManageContacsAction";

export default function PhongBan(props) {
  let pages = 1;
  let keyword = "";
  let company_code = props.codeCompanies;
  console.log("code cong ty", company_code);
  const [pageId, setPageId] = useState();
  const [codeDepart, setCodeDepart] = useState("HDQT");
  console.log("check code:", codeDepart);
  useEffect(() => {
    setPageId(pages);
  }, [pages]);
  const { lstContactByDepartments } = useSelector(
    (state) => state.ManageUtilityReducer
  );
  console.log("check data phong ban:", lstContactByDepartments);
  const { lstDepartments } = useSelector((state) => state.ManageUtilityReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getContactByDepartments(pages - 1, keyword, codeDepart, company_code)
    );
  }, [pages - 1, keyword, codeDepart, company_code]);

  const columns = [
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
  const { Content, Sider } = Layout;

  function onSearchByDepartment(code) {
    console.log(code);
    setCodeDepart(code);
    dispatch(getContactByDepartments(pages - 1, keyword, code, company_code));
  }
  return (
    <div>
      <Layout>
        <Sider
          style={{
            overflow: "auto",
            position: "sticky",
            height: "100vh",
            backgroundColor: "white",
            maxHeight: "70%",
          }}
        >
          <Menu className="">
            {lstDepartments &&
              lstDepartments?.map((item) => {
                return (
                  <Menu.Item onClick={() => onSearchByDepartment(item.code)}>
                    {item.name}{" "}
                  </Menu.Item>
                );
              })}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content
            style={{
              margin: "24px 16px 0",
              overflow: "initial",
            }}
          >
            <div
              className="site-layout-background"
              style={{
                padding: 24,
                textAlign: "center",
              }}
            >
              <Table
                bordered
                dataSource={lstContactByDepartments.data}
                columns={columns}
                key=""
                pagination={{
                  defaultCurrent: pageId,
                  defaultPageSize: 10,
                  total: `${lstContactByDepartments.total_count}`,
                  onChange: (page, pageSize) => {
                    dispatch(getContactByDepartments(page - 1, keyword));
                  },
                }}
              />
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
