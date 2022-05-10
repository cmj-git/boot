import React, { useState, useEffect } from 'react';
import { ChakraProvider, Box, VStack, Spinner, Switch, FormControl, FormLabel, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

import { AutoLayout } from '@/components';
const promiseAjax = require('@/components/utils/request');

import layout from './layout';

require('./index.less')

const categoryData = [
    {id:'1', title:'分类1'},
    {id:'2', title:'分类2'}
]

export default function Index(props) {

    const { } = props;

    const [navCateListData, setNavCateListData] = useState([])
    const [listData, setListData] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [switchStatus, setSwitchStatus] = useState(false)
    const [tabIndex, setTabIndex] = useState(0)

    let navListApi = '/api/data/services/navigation';
    let navApi = '/api/data/services/navCategory';

    useEffect(() => {
        console.log('首次加载')
        fetchNavCategoryData(navApi, {})
    }, []);

    let layoutData = '';
    const layoutJsonPath = '';
    const localLayoutJson = layout;

    if (layoutJsonPath) {
        layoutData = { path: layoutJsonPath };
    } else {
        layoutData = localLayoutJson;
    }
    const config = {
        items: listData,
        layout: layoutData
    };

    //获取分类列表信息
    const fetchNavCategoryData = (api, queryData) => {
        setLoading(true)
        return promiseAjax(api, queryData).then(resp => {
            if (resp && resp.code === 200) {
                const list = resp.data.records;
                setNavCateListData(list);
                setLoading(false)
            } else {
                console.error('获取列表数据失败 ==', resp)
            }
        }).finally(_=>{
            setLoading(false)
            fetchData(navListApi, {})
        });
    }

    //获取列表信息
    const fetchData = (api, queryData) => {
        setLoading(true)
        return promiseAjax(api, queryData).then(resp => {
            if (resp && resp.code === 200) {
                const list = resp.data.records;
                setListData(list);
                setLoading(false)
            } else {
                console.error('获取列表数据失败 ==', resp)
            }
        }).finally(_=>{
            setLoading(false)
        });
    }

    const onNavItemClick = (item) => {
        const id = item.id;
        console.log('id = ', id)
        alert(`选择的用户id为: ${id}`)
    }

    //回调函数
    const callback = (value) => {

        console.log('item1111111 = ', value)
        if (value) {
            fetchData(navListApi, {})
        }
    }

    const handleChange = () => {
        const status = !switchStatus;
        setSwitchStatus(status)
    }

    //tab切换
    const switchTab = (item, index) => {
        console.log('item === ', item)
        if(index != tabIndex){
            setTabIndex(index)
            const queryData = {}
            fetchData(navListApi, queryData)
        }
    }

    return (
        <ChakraProvider>

            <div style={{ maxWidth: '600px' }}>
                <VStack align='stretch' spacing='-2'>
                    <Box style={{ margin: '10px 10px 30px 10px', paddingLeft: '8px' }}>
                        <FormControl display='flex' alignItems='center'>
                            <FormLabel htmlFor='email-alerts' mb='0'>
                                编辑开关：
                            </FormLabel>
                            <Switch isFocusable size='lg' onChange={() => handleChange()} isChecked={switchStatus} />
                        </FormControl>

                    </Box>
                    
                    { navCateListData && navCateListData.length > 0 ? (
                        <Box>
                            <Tabs variant='enclosed' style={{width:'900px'}} defaultIndex={tabIndex}>
                                <TabList>
                                    { navCateListData.map((item, index) => (
                                        <Tab key={`${index}_tab`} onClick={() => switchTab(item, index)}>{item.name}</Tab>
                                    ))}
                                </TabList>
                                <TabPanels>
                                    { navCateListData.map((item, index) => (
                                        <TabPanel  key={`${index}_tabPanel`} >
                                            {isLoading ? (
                                                <Spinner />
                                            ) : (
                                                <Box>
                                                    <AutoLayout {...config} onItemClick={onNavItemClick} cb={callback} isSwtich={switchStatus} />
                                                </Box>
                                            )}
                                        </TabPanel>
                                    ))}
                                    
                                </TabPanels>
                            </Tabs>
                        </Box>
                    ):null}
                    
                    
                </VStack>
            </div>

        </ChakraProvider>
    )

}