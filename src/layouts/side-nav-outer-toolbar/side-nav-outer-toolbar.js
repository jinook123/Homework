import React from 'react';
import './side-nav-outer-toolbar.scss';
import Home from 'pages/home/components/Home';

export default function SideNavOuterToolbar({ title, children }) {
    
    return (
        <div className={'warpper'}>
            
            {/* 본분 영역 */}
            <div className={'contents-body'}>
                <div className={'contents-container'}>
                    <div className={'container'}>
                        <div className={'content'}>
                            {/* {React.Children.map(children, (item) => {
                                return item.type !== item;
                            })} */}
                            <Home />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
