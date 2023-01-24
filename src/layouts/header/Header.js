import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';

import ReactTooltip from 'react-tooltip';

import Toolbar, { Item } from 'devextreme-react/toolbar';
import Button from 'devextreme-react/button';
// import UserPanel from '../user-panel/user-panel';
import './header.scss';
import { Template } from 'devextreme-react/core/template';
import { SelectBox } from 'devextreme-react/select-box';
import themes from 'devextreme/ui/themes';

import { useSelector, useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getMyMenu, deleteMyMenu, postMyMenu } from 'pages/home/modules/myMenu';
import { alertDialog, confirmDialog } from 'pages/common/components/DialogConfirm';

const deepCopy = (o) => {
    var result = {};
    if (typeof o === 'object' && o !== null) {
        for (var i in o) {
            result[i] = deepCopy(o[i]);
        }
    } else {
        result = o;
    }
    return result;
};

const Header = ({ menuToggleEnabled, title, toggleMenu, selectedItemChanged }) => {
    const dispatch = useDispatch();
  

    const [headerNormalMenu, setHeaderNormalMenu] = useState(); // 메뉴를 state변수로 사용
    const [adminMenu, setAdminMenu] = useState(); // 메뉴를 state변수로 사용


    useEffect(() => {
        
    }, []);

    const [isClickAdminMenu, setIsClickAdminMenu] = useState(false);
   

    const toggleAdminMenu = () => {
        setIsClickAdminMenu((prev) => !prev);
    };

    return (
        <>
            <div className={'header'}>
                <header className={'header-component top'}>
                    <div className={'header-top'}>
                        <div className={'contents-container'}>
                            <Toolbar className={'location-select'}>
                                <Item
                                    location={'before'}
                                    cssClass={'header-title'}
                                >
                                    <Link to="/home">
                                        <img alt={''} src={'images/img_logo.png'} width={200} />
                                    </Link>
                                </Item>
                                <Item location={'after'}></Item>
                                <Item
                                    location={'after'}
                                    // text={"버튼"}
                                    locateInMenu={'auto'}
                                    menuItemTemplate={'buttonTemplate'}
                                >
                                    <div className={'header-icon-group'}>
                                        <div className={`icon-item ${isClickAdminMenu ? 'active' : ''}`}>
                                            <i
                                                data-tip
                                                data-for="icon-setting"
                                                className={'dx-icon dx-icon-preferences'}
                                                onClick={toggleAdminMenu}
                                            ></i>
                                            <ReactTooltip id="icon-setting" place="bottom" type="dark" effect="float">
                                                <span>Admin메뉴전환</span>
                                            </ReactTooltip>
                                        </div>
                                        <div className={'icon-item'}>
                                            <Link to="/" data-tip data-for="icon-chard">
                                                <i className={'dx-icon dx-icon-chart'}></i>
                                            </Link>
                                            <ReactTooltip id="icon-chard" place="bottom" type="dark" effect="float">
                                                <span>안전관리상황판</span>
                                            </ReactTooltip>
                                        </div>

                                     
                                        <div className={'icon-item'}>
                                            <FontAwesomeIcon
                                                icon="fa-solid fa-power-off"
                                                data-tip
                                                data-for="icon-logout"
                                                className={'dx-icon'}
                                                onClick={(e) => {console.log("LogOut")}}
                                            />
                                            <ReactTooltip id="icon-logout" place="bottom" type="dark" effect="float">
                                                <span>로그아웃</span>
                                            </ReactTooltip>
                                        </div>
                                    </div>
                                </Item>
                                <Item location={'after'}>
                                    <ReactTooltip id="icon-user" place="bottom" type="dark" effect="float">
                                        <span>내 정보</span>
                                    </ReactTooltip>
                                </Item>
                                <Template name={'buttonTemplate'}>
                                    <ul className={'drop-list'}>
                                        <li>
                                            <button className={`drop-list-item ${isClickAdminMenu ? 'active' : ''}`} onClick={toggleAdminMenu}>
                                                <i className={'dx-icon dx-icon-preferences'}></i>
                                                ADMIN
                                            </button>
                                        </li>
                                        <li>
                                            <Link to="/" className={'drop-list-item'}>
                                                <i className={'dx-icon dx-icon-chart'}></i>
                                                안전관리상황판
                                            </Link>
                                        </li>
                                        
                                        <li>
                                            <button className={'drop-list-item'} onClick={(e) => {console.log("LogOut")}}>
                                                <FontAwesomeIcon icon="fa-solid fa-power-off" />
                                                로그아웃
                                            </button>
                                        </li>
                                    </ul>
                                </Template>
                            </Toolbar>
                        </div>
                    </div>
                </header>
            </div>
        </>
    );
};

export default Header;