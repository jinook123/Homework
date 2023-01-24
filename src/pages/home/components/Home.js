import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from 'devextreme-react/button';
import { TextBox } from 'devextreme-react/text-box';
import List from 'devextreme-react/list';
import { useHistory } from 'react-router-dom';
import DataGrid, { Column, Scrolling, Editing } from 'devextreme-react/data-grid';
import { Cookies } from 'react-cookie';
import ModalPopup from 'pages/common/components/ModalPopup';
import { LoadPanel } from 'devextreme-react/load-panel';

import Validator, {
    RequiredRule,
    PatternRule
} from 'devextreme-react/validator';
import { alertDialog, confirmDialog } from 'pages/common/components/DialogConfirm';
import TabPanel, { Item } from 'devextreme-react/tab-panel';
import SelectBox from 'devextreme-react/select-box';

import { 
    getList
    , getCampignList
    , getUserList
    , putCampaignStatus
    , postUserCreate
    , putUserModify
    , getEmailCheck
    , getUserDetail
    , setInitSearch
    , setAfterCallApi
    , setEmailCheckCallAPi
} from 'pages/home/modules/search';
import { select } from 'redux-saga/effects';


export default function Home() {
    const history = useHistory();

    const dispatch = useDispatch();

    // store param
    const emailCheckCallApi = useSelector((state) => state.homeReducer.listReducer.emailCheckCallApi);
    const afterCallApi = useSelector((state) => state.homeReducer.listReducer.afterCallApi);
    const detailData = useSelector((state) => state.homeReducer.listReducer.detailData);
    const userList = useSelector((state) => state.homeReducer.listReducer.userList);
    
    // set function
    const setInitSearchStore = useCallback((payload) => dispatch(setInitSearch(payload)), [dispatch]);
    const setAfterCallApiStore = useCallback((payload) => dispatch(setAfterCallApi(payload)), [dispatch]);
    const setEmailCheckCallAPiStore = useCallback((payload) => dispatch(setEmailCheckCallAPi(payload)), [dispatch]);
    
    // saga function
    const goGetList = useCallback((payload) => dispatch(getList(payload)), [dispatch]);
    const goGetCampignList = useCallback((payload) => dispatch(getCampignList(payload)), [dispatch]);
    const goGetUserList = useCallback((payload) => dispatch(getUserList(payload)), [dispatch]);
    const goPostUserCreate = useCallback((payload) => dispatch(postUserCreate(payload)), [dispatch]);
    const goPutCampaignStatus = useCallback((payload) => dispatch(putCampaignStatus(payload)), [dispatch]);
    const goPutUserModify = useCallback((payload) => dispatch(putUserModify(payload)), [dispatch]);
    const goGetEmailCheck = useCallback((payload) => dispatch(getEmailCheck(payload)), [dispatch]);
    const goGetUserDetail = useCallback((payload) => dispatch(getUserDetail(payload)), [dispatch]);

    // state
    const [userPopupPrm, setUserPopupPrm] = useState({mode: 'INS', id: '', visible: false, name: '', email: '', password: '', passwordConfirm: ''});
    const [campPopupPrm, setCampPopupPrm] = useState({mode: 'INS', id: '', visible: false, status: ''});
    const [userListState, setUserListState] = useState([]);
    const [campaignListState, setCampaignListState] = useState([]);

    const [campaignList, setCampaignList] = useState([
        {key: 'WEBSITE_CONVERSIONS', value: '웹사이트 전환'},
        {key: 'WEBSITE_TRAFFIC', value: '웹사이트 트래픽'},
        {key: 'SALES', value: '판매 전환'},
        {key: 'APP_INSTALLATION', value: '앱설치 전환'},
        {key: 'LEAD', value: '리드'},
        {key: 'BRAND', value: '브랜드 인지도 및 도달 범위'},
        {key: 'VIDEO_VIEWS', value: '동영상 조회'},
    ]);

    const [enableList, setEnableList] = useState([
        {key: true, value: 'TRUE'},
        {key: false, value: 'FALSE'}
    ]);
    
    useEffect(() => {
        return () => {
            setInitSearchStore();
        };
    }, []);

    useEffect(() => {

        if(emailCheckCallApi !== undefined && emailCheckCallApi !== null && emailCheckCallApi !== ''){
            setEmailCheckCallAPiStore();
            if(emailCheckCallApi.result === true){
                if(userPopupPrm.mode === 'INS'){
                    // TO-DO : 비밀번호 암호화 후 서버로 전달
                    goPostUserCreate({
                        name: userPopupPrm.name,
                        email: userPopupPrm.email,
                        password: userPopupPrm.password,
                        repeat_password: userPopupPrm.passwordConfirm
                    });
                } else {
                    goPutUserModify({
                        id: userPopupPrm.id,
                        name: userPopupPrm.name
                    });
                }
                
            } else {
                alertDialog('이메일이 중복됩니다.', '확인');
                return false;
            }
         }

    }, [emailCheckCallApi]);

    useEffect(() => {
        if(afterCallApi !== undefined && afterCallApi !== null && afterCallApi !== ''){
            setAfterCallApiStore();
            if(afterCallApi.result === true){
                alertDialog('정상처리되었습니다.', '확인').then((result) => {
                    clearUserPopupPrm();
                });
            } else {
                alertDialog('실패했습니다.', '확인');
                return false;
            }
         }

    }, [afterCallApi]);

    useEffect(() => {
        if(userList !== undefined && userList !== null && userList?.length > 0){
            
        }
        // setUserListState([{
        //     id:1,
        //     email:"user1@wisebirds.ai",
        //     name:"사용자1",
        //     last_login_at:"2022-11-14T07:37:24.914Z"
        // }, {
        //     id:2,
        //     email:"user2@wisebirds.ai",
        //     name:"사용자2",
        //     last_login_at:"2022-11-14T07:37:24.914Z"
        // }])
    }, [userList]);

    useEffect(() => {
        if(detailData !== undefined && detailData !== null && detailData !== ''){
            // TO-DO : 비밀번호 복호화
            setUserPopupPrm(prevState => ({
                ...prevState,
                visible: true,
                mode: 'MOD',
                id: detailData.id,
                name: detailData.name, 
                email: detailData.email, 
                password: detailData.password, 
                passwordConfirm: detailData.repeat_password
            }));
        }
    }, [detailData]);
    
    
    const clearUserPopupPrm  = () => {
        setUserPopupPrm(prevState => ({
            ...prevState,
            visible: false,
            mode: 'INS',
            name: '', 
            email: '', 
            password: '', 
            passwordConfirm: ''
        }));
    }

    const onCloseUserPopup = () => {
        clearUserPopupPrm();
    }

    const onChangePassword = (e, div) => {
        const value = e.value;

        if(div === 'password'){
            setUserPopupPrm(prevState => ({
                ...prevState,
                password: value
            }));
            
        } else if(div === 'passwordConfirm'){
            setUserPopupPrm(prevState => ({
                ...prevState,
                passwordConfirm: value
            }));
        }
    }

    const onCreateUser = () => {
        if(validationCheck() === false)         return false;

        // 이메일 중복체크
        goGetEmailCheck({email: userPopupPrm.email});
    }
    
    const validationCheck = () => {
        if(userPopupPrm.password !== userPopupPrm.passwordConfirm){
            alertDialog('비밀번호를 확인해주세요.', '확인');
            return false;
        }

        return true;
    }

    const onUserRowClick = (e) => {
        goGetUserDetail({ id: e.data.id });
    }

    const onClickSearch = (e) => {
        goGetUserList({page: 1, size: 25});

        // TO-DO : 실제 테스트 시 제거
        setUserListState([{
            id:1,
            email:"user1@wisebirds.ai",
            name:"사용자1",
            last_login_at:"2022-11-14T07:37:24.914Z"
        }, {
            id:2,
            email:"user2@wisebirds.ai",
            name:"사용자2",
            last_login_at:"2022-11-14T07:37:24.914Z"
        }])
    }

    const onClickCampaignSearch = (e) => {
        goGetCampignList({page: 1, size: 25});

        // TO-DO : 실제 테스트 시 제거
        setCampaignListState([{
            id:1,
            name:"캠페인1",
            enabled:true,
            campaign_objective:"WEBSITE_TRAFFIC",
            impressions:384057,
            clicks:1974,
            ctr:0.8752,
            video_views:948,
            vtr:0.95123
        }, {
            id:2,
            name:"캠페인2",
            enabled:true,
            campaign_objective:"LEAD",
            impressions:705575,
            clicks:6726,
            ctr:0.8733,
            video_views:40,
            vtr:0.135
        }])
    }

    // enabled
    const onCellEnableRender = (rowData) => {
        return (
            <SelectBox
                placeholder={'선택'}
                showDropDownButton={true}
                displayExpr="value"
                valueExpr="key"
                noDataText=""
                value={rowData.data.enabled}
                items={enableList}
                onValueChanged={(e) => onChangeEnableData(rowData, e)}
            />
        )
    }

    // 캠페인목적
    const onCellCampObjRender = (rowData) => {
        if(rowData.data.campaign_objective !== null && rowData.data.campaign_objective !== undefined && rowData.data.campaign_objective !== '') {
            if(rowData.data.campaign_objective !== ''){
                for(const data of campaignList){
                    if(data.key === rowData.data.campaign_objective){
                        return data.value;
                    }
                }
            } else {
                return "";
            }
        } 
        return '';
    }

    const onChangeEnableData = (rowData, e) => {
        let tmpList = [...campaignListState];
        for(let data of tmpList){
            if(rowData.data.id === data.id){
                data.enabled = e.value;
            }
        }
        setCampaignListState(tmpList);
        confirmDialog('변경하시겠습니까?', '확인', ['예', '아니오']).then((confirmResult) => {
            if (confirmResult) {
                goPutCampaignStatus({id: rowData.data.id, enabled: e.value})
            } else {
                onClickCampaignSearch()
            }
        });
    }

    const renderUserPopup = () => {
        return (
            <ModalPopup popupWidth="1000px">
                <div>
                    <div className={'sub-contents-container'}>
                        <div className={'sub-header'}>
                            <div className={'left'}>
                                <h3 className={'sub-title'}>유저 생성</h3>
                            </div>
                            <div className={'right'}>
                                <Button
                                    stylingMode="contained"
                                    className={'dx-custom-button secondary-outline icon-only'}
                                    onClick={onCloseUserPopup}
                                >
                                    <i className="dx-icon dx-icon-remove"></i>
                                </Button>
                            </div>
                        </div>
                        <div className={'modal-content-body'} style={{ padding: '0px' }}>
                            <div className={'row'}>
                                <div className={'col-6'}>
                                    <div className={'form-group'}>
                                        <div className={'form-label form-required'}>
                                            <span>이름</span>
                                        </div>
                                        <div className={'form-value'}>
                                            <TextBox 
                                                placeholder={'이름을 입력하세요.'}
                                                value={userPopupPrm.name}
                                                onValueChanged={(e) => {
                                                    setUserPopupPrm(prevState => ({
                                                        ...prevState,
                                                        name: e.value
                                                    }));
                                                }} />
                                        </div>
                                    </div>
                                </div>
                                <div className={'col-6'}>
                                    <div className={'form-group'}>
                                        <div className={'form-label form-required'}>
                                            <span>이메일</span>
                                        </div>
                                        <div className={'form-value'}>
                                            <TextBox 
                                                placeholder={'이메일을 입력하세요.'}
                                                value={userPopupPrm.email}
                                                readOnly={userPopupPrm.mode === 'MOD' ? true : false}
                                                onValueChanged={(e) => {
                                                    setUserPopupPrm(prevState => ({
                                                        ...prevState,
                                                        email: e.value
                                                    }));
                                                }} >
                                                <Validator>
                                                    <RequiredRule />
                                                    <PatternRule
                                                        pattern="^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$"
                                                        message="이메일 형식이 아닙니다."
                                                    />
                                                </Validator>
                                            </TextBox>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={'row'}>
                                <div className={'col-6'}>
                                    <div className={'form-group'}>
                                        <div className={'form-label form-required'}>
                                            <span>비밀번호</span>
                                        </div>
                                        <div className={'form-value'}>
                                            <TextBox 
                                                mode="password"
                                                placeholder={'비밀번호를 입력하세요.'}
                                                readOnly={userPopupPrm.mode === 'MOD' ? true : false}
                                                value={userPopupPrm.password}
                                                onValueChanged={(e) => onChangePassword(e, 'password')} 
                                            >
                                                <Validator>
                                                    <RequiredRule />
                                                    <PatternRule
                                                        pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&.])[A-Za-z\d@$!%*#?&.]{10,20}$"
                                                        message="최소 10 자, 최대 20 자, 하나 이상의 문자, 하나 이상의 숫자, 하나 이상의 특수 문자를 포함해야 합니다."
                                                    />
                                                </Validator>
                                            </TextBox>
                                        </div>
                                    </div>
                                </div>
                                <div className={'col-6'}>
                                    <div className={'form-group'}>
                                        <div className={'form-label form-required'}>
                                            <span>비밀번호 확인</span>
                                        </div>
                                        <div className={'form-value'}>
                                            <TextBox 
                                                mode="password"
                                                placeholder={'비밀번호를 입력하세요.'}
                                                readOnly={userPopupPrm.mode === 'MOD' ? true : false}
                                                value={userPopupPrm.passwordConfirm}
                                                onValueChanged={(e) => onChangePassword(e, 'passwordConfirm')} 
                                            ></TextBox>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Button stylingMode="contained" className={'dx-custom-button primary-gradient'} onClick={onCreateUser}>
                                생성
                            </Button>
                        </div>
                    </div>
                </div>
            </ModalPopup>
        );
    }


    return (
        <>
            <div className={'main-view main-bp'}>
                
                <div className={'row mt-2'}>
                    <div className={'col-12'}>
                        <div className={'card quick-link bar-type'}>
                            <div className={'card-body'}>
                                <div className="list-container">
                                    <div className={'sub-contents-container'}>
                                    <TabPanel className={'sub-page-tabs'} swipeEnabled={false}>
                                        <Item title={'사용자'} item="USER">
                                            <div className={'sub-header'}>
                                                <div className={'left'}>
                                                    <h3 className={'sub-title'}>목록</h3>
                                                </div>
                                                <div className={'right'}>
                                                    <Button stylingMode="contained" className={'dx-custom-button primary-gradient'} onClick={onClickSearch}>
                                                        조회
                                                    </Button>
                                                    <Button stylingMode="contained" className={'dx-custom-button primary-gradient'} 
                                                    onClick={(e) => 
                                                                setUserPopupPrm(prevState => ({
                                                                ...prevState,
                                                                visible: true
                                                            }))}>
                                                        유저 생성
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className={'d-flex justify-content-between align-items-center mb-1'}>
                                                <div className={'content-txt'}>
                                                    결과
                                                    <strong>
                                                    {userListState?.length}
                                                    </strong>
                                                    건
                                                </div>
                                            </div>
                                            <DataGrid
                                                allowColumnResizing={true}
                                                allowColumnReordering={true}
                                                showBorders={true}
                                                focusedRowEnabled={true}
                                                columnAutoWidth={true}
                                                dataSource={userListState}
                                                height={670}
                                                noDataText={'데이터가 없습니다.'}
                                                onRowClick={onUserRowClick}
                                                keyExpr="id"
                                            >
                                                <Column dataField="id" visible={false} />

                                                <Column caption="이름" dataField="name" width="250" alignment="left" />
                                                <Column caption="이메일" dataField="email" width="200" alignment="left" />
                                                <Column caption="최근로그인시간" dataField="last_login_at" width="300" alignment="center" />
                                            </DataGrid>
                                        </Item>
                                        <Item title={'캠페인'} item="COMP">
                                            <div className={'sub-header'}>
                                                <div className={'left'}>
                                                    <h3 className={'sub-title'}>목록</h3>
                                                </div>
                                                <div className={'right'}>
                                                    <Button stylingMode="contained" className={'dx-custom-button primary-gradient'} onClick={onClickCampaignSearch}>
                                                        조회
                                                    </Button>
                                                    <Button stylingMode="contained" className={'dx-custom-button primary-gradient'} 
                                                    onClick={(e) => 
                                                                setUserPopupPrm(prevState => ({
                                                                ...prevState,
                                                                visible: true
                                                            }))}>
                                                        유저 생성
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className={'d-flex justify-content-between align-items-center mb-1'}>
                                                <div className={'content-txt'}>
                                                    결과
                                                    <strong>
                                                    {campaignListState?.length}
                                                    </strong>
                                                    건
                                                </div>
                                            </div>
                                            <DataGrid
                                                allowColumnResizing={true}
                                                allowColumnReordering={true}
                                                showBorders={true}
                                                focusedRowEnabled={true}
                                                columnAutoWidth={true}
                                                dataSource={campaignListState}
                                                height={670}
                                                allowReordering={true}
                                                noDataText={'데이터가 없습니다.'}
                                                keyExpr="id"
                                            >
                                                <Editing dataField='campaign_objective' mode='cell' allowUpdating={true} />
                                                <Column dataField="id" visible={false} />

                                                <Column caption="캠페인명" dataField="name" width="180" alignment="left" allowEditing={false} />
                                                <Column caption="상태" dataField="enabled" width="180" alignment="left" cellRender={onCellEnableRender} allowEditing={false}/>
                                                <Column caption="캠페인 목적" dataField="campaign_objective" width="300" alignment="center" cellRender={onCellCampObjRender} allowEditing={false}/>
                                                <Column caption="노출수" dataField="impressions" width="100" alignment="center" allowEditing={false}/>
                                                <Column caption="클릭수" dataField="clicks" width="100" alignment="center" allowEditing={false}/>
                                                <Column caption="CTR" dataField="ctr" width="100" alignment="center" allowEditing={false}/>
                                                <Column caption="비디오조회 수" dataField="video_views" width="180" alignment="center" allowEditing={false}/>
                                                <Column caption="VTR" dataField="vtr" width="100" alignment="center" allowEditing={false} />
                                            </DataGrid>
                                        </Item>
                                    </TabPanel>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            {userPopupPrm.visible === true && renderUserPopup()}
        </>
    );
}
