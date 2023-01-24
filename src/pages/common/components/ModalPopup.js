import reactDom from 'react-dom';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const ModalPortal = ({ children }) => {
    useEffect(() => {
        document.body.style.cssText = `
        position: fixed; 
        top: -${window.scrollY}px;
        overflow-y: scroll;
        width: 100%;`;
        return () => {
            const scrollY = document.body.style.top;
            document.body.style.cssText = '';
            window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
        };
    }, []);

    const el = document.getElementById('modal');
    return reactDom.createPortal(children, el);
};

const Modal = ({ isClose, onClose, children, popupWidth = '1000px', popupHeight, background = null }) => {
    return (
        <ModalPortal>
            {isClose === true ? '닫기버튼' : null}
            <div className="modal-background">
                {/* <div className="modal-content"> */}
                {background !== null ?
                <div className="modal-content" style={{ width: popupWidth, height: popupHeight, background: background }}>
                    {/* <div class="modal-content" style={{ width: '800px' }> <!---- 이 위치에 이런 식으로 width 값이 들어가야 함. */}
                    {children}
                </div>
                :
                <div className="modal-content" style={{ width: popupWidth, height: popupHeight }}>
                    {/* <div class="modal-content" style={{ width: '800px' }> <!---- 이 위치에 이런 식으로 width 값이 들어가야 함. */}
                    {children}
                </div>
                }
                
            </div>
            {/* <Background>
                <Content>{children}</Content>
            </Background> */}
        </ModalPortal>
    );
};

export default Modal;

Modal.propTypes = {
    isClose: PropTypes.bool,
    onClose: PropTypes.func,
    children: PropTypes.object,
    popupWidth: PropTypes.string,
    popupHeight: PropTypes.string,
};

//아래는 styled-components를 통한 스타일링

// const Background = styled.div`
//     // height: 100%;
//     width: 100%;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     position: fixed;
//     left: 0;
//     top: 0;
//     // text-align: center;
//     z-index: 1000;
//     background-color: rgba(0, 0, 0, 0.6);
// `;

// const Content = styled.div`
//     height: 100%;
//     width: 950px;
//     margin-top: 70px;
//     position: relative;
//     overflow: auto;
//     background-color: rgba(0, 0, 0, 0.6);
//     // background: #141414;
//     z-index: 1001;
// `;
