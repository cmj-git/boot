import React from 'react';
import GetField from '@/components/GetField';
import NamedLayout from '@/components/NamedLayout';
import NamedList from '@/components/NamedList';
const AutoComponent = require('@/AutoComponent');

export default function Demo(props) {

  // AutoLoadList
  // return <NamedList name="LoadMoreList" API="/api/adm/stat/meta/template/table">
  //   <NamedLayout name="Align" props={{ align: 'rightAndLastCenter' }}>
  //     <GetField dataField="data">
  //       <Test />
  //     </GetField>
  //   </NamedLayout>
  // </NamedList>
  return <AutoComponent />
}

function Test() {
  return <h2 style={{ width: 200, border: '1px solid', margin: 8 }}>Demo</h2>
}