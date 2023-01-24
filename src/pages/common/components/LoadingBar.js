import React from 'react';
import { useSelector } from 'react-redux';
import { LoadPanel } from 'devextreme-react/load-panel';

const LoadingBar = () => {
    const loadingStatus = useSelector((state) => state.loading.loadingStatus); //전역 로딩 on off bar

    return (
        <>
            <LoadPanel
                shadingColor="rgba(0,0,0,0.4)"
                // position={{ of: '#root' }}
                // onHiding={!loadingStatus}
                visible={loadingStatus}
                showIndicator={true}
                shading={true}
                showPane={false}
                closeOnOutsideClick={false}
                indicatorSrc="images/loading_Ellipsis_ANIMATED.svg"
            />
        </>
    );
};

export default LoadingBar;
