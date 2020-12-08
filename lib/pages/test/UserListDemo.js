function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState, useEffect } from 'react';
import PlainList from "../../components/NamedList/PlainList";
import NamedLayout from "../../components/NamedLayout";
import NamedCart from "../../components/NamedCart";

const {
  UserItem
} = require("../../components/Composition");

import listData from "./data/UserListData";

const useUaasTestUser = require("../../utils/useUaasTestUser");

export default function UserListDemo(props) {
  const endpoint = 'http://192.168.3.236:8888';
  const accountToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJvcmdJZCI6IjEwMDAwMDAwMDAwMDAwMDAxMCIsInVzZXJJZCI6Ijg3NjcwODA4MjQzNzE5NzgzMCIsInVzZXJUeXBlIjoxMDEsImJVc2VyVHlwZSI6IlNZU1RFTSIsInRlbmFudE9yZ0lkIjoxMDAwMDAwMDAwMDAwMDAwMTAsImFjY291bnQiOiJhZG1pbiIsImV4dHJhVXNlclR5cGUiOjAsImlhdCI6MTYwNzMwNjU3MywianRpIjoiODc2NzA4MDgyNDM3MTk3ODMwIiwic3ViIjoiYWRtaW4iLCJleHAiOjE2MDc1NjU3NzN9.6J1ozLxN4PO6TpbGPb1-Y77-AyLxWbGY4kmheDiWkksI0w7SyotNSc7rD358bRk9I7pbpCizyBlVbUDbzcIxwQ'; ///

  const [users, token, permissions, changeUser] = useUaasTestUser({
    endpoint,
    accountToken
  });
  const [nToken, setToken] = useState('');
  const [nPermissions, setPermissions] = useState([]);
  useEffect(() => {
    console.log('demo token = ', token);
    console.log('demo permissions = ', permissions);
  }, [token, permissions]);
  const config = {
    items: users.length > 0 ? users : listData.data,
    layout: {
      name: 'Box',
      props: {
        align: 'start',
        direction: 'column'
      }
    },
    cart: {
      name: 'Cart',
      props: {
        margin: '0px'
      }
    }
  };

  const onClick = item => {
    changeUser(item.id);
  };

  return /*#__PURE__*/React.createElement(PlainList, _extends({}, config, {
    onItemClick: onClick
  }), /*#__PURE__*/React.createElement(NamedLayout, null, /*#__PURE__*/React.createElement(NamedCart, null, /*#__PURE__*/React.createElement(UserItem, null))));
}