import React, { useState, useEffect } from 'react';

import { NamedLayout, NamedCart } from "@/components";

import { PlainList } from "@/components/list";
import { GateWay, GetField } from '@/components/gateway';
import { Divider } from '@/components/seperator';


const { UserItem } = require('@/composition/Demo');
const { Seperator } = require('@/presenter')

const useUaasTestUser = require('@/pages/TestUserSelectionDemo/hooks/useUaasTestUser');
const promiseAjax = require('@/utils/request');


/**
 * hook callback 参考
 * https://stackoverflow.com/questions/54954091/how-to-use-callback-with-usestate-hook-in-react
 * 
 * 注意: callback 函数需要在调用 hook 函数前 声明, 否则会报错
 */

export default function TestUserSelection(props) {

    const { onItemClickHandle } = props;

    // const endpoint = 'http://192.168.3.236:8888';
    // const accountToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJvcmdJZCI6IjEwMDAwMDAwMDAwMDAwMDAxMCIsInVzZXJJZCI6Ijg3NjcwODA4MjQzNzE5NzgzMCIsInVzZXJUeXBlIjoxMDEsImJVc2VyVHlwZSI6IlNZU1RFTSIsInRlbmFudE9yZ0lkIjoxMDAwMDAwMDAwMDAwMDAwMTAsImFjY291bnQiOiJhZG1pbiIsImV4dHJhVXNlclR5cGUiOjAsImlhdCI6MTYwNzMwNjU3MywianRpIjoiODc2NzA4MDgyNDM3MTk3ODMwIiwic3ViIjoiYWRtaW4iLCJleHAiOjE2MDc1NjU3NzN9.6J1ozLxN4PO6TpbGPb1-Y77-AyLxWbGY4kmheDiWkksI0w7SyotNSc7rD358bRk9I7pbpCizyBlVbUDbzcIxwQ';

    const callBack = (data) => {
        console.log('token = ', data.token)
        console.log('permissions = ', data.permissions)
    }

    // const [users, changeUser] = useUaasTestUser({ endpoint, accountToken }, callBack);

    const [userList, setUserList] = useState([]);

    function handleQuery(API, queryData) {
        return promiseAjax(API, queryData).then(response => {
            if (response && response.code === 200) {
                setUserList(response.data);
            }
        });
    }

    useEffect(_ => {
        handleQuery('/api/adm/users/testUserList');
    }, []);

    //Cart HoverShadowCart
    const config = {
        items: userList.length > 0 ? userList : [],
        layout: {
            name: 'Flexbox',
            props: {
                align: 'start',
                direction: 'column',
                line: {
                    Seperator: Divider,
                    props:{
                        lineType:'solid'
                    }
                },
                itemStyle:{
                    itemWidth:'width-100'
                }
            },
        },
        cart: {
            name: 'Cart',
            props: {
                corner:'',
                margin:'',
                stroke:''
            },
        },
    };

    const onClick = (item) => {
        // changeUser(item.id)
        console.log(item)
        onItemClickHandle();
    }

    return (
        <PlainList {...config} onItemClick={onClick}>
            <NamedLayout>
                <GetField dataField="cart">
                    <NamedCart> 
                        <UserItem />
                    </NamedCart>
                </GetField>
            </NamedLayout>
        </PlainList>
    )

}