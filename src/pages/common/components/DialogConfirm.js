import { custom } from 'devextreme/ui/dialog';

function divArea(msg) {
    // msgArea = $content().addClass(DX_DIALOG_CONTENT_CLASSNAME).append(msg);
    const msgArea = '<div><div>' + msg + '</div></div>';
    return msgArea;
}

export function alertDialog(messageHtml, titleMsg, dragMode) {
    var title = titleMsg == null || titleMsg === undefined || titleMsg === '' ? '알림' : titleMsg;

    var options = {
        title: title,
        messageHtml: divArea(messageHtml),
        showTitle: true,
        dragEnabled: dragMode == null ? 0 : dragMode,
        width: 300,
        buttons: [
            {
                text: '확인',
                onClick: () => {
                    return true;
                },
            },
        ],
    };
    return custom(options).show();
}


export function confirmDialog(messageHtml, titleMsg, buttonsText, dragMode) {
    var title = titleMsg == null || titleMsg === undefined || titleMsg === '' ? 'Confirm' : titleMsg;
    if (buttonsText == null || buttonsText.length === undefined || buttonsText.length === 0) {
        buttonsText = ['확인', '취소'];
    }
    var options = {
        title: title,
        messageHtml: divArea(messageHtml),
        showTitle: true,
        dragEnabled: dragMode == null ? 0 : dragMode,
        width: 300,
        buttons: [
            {
                text: buttonsText[0],
                onClick: () => {
                    return true;
                },
            },
            {
                text: buttonsText[1],
                onClick: () => {
                    return false;
                },
            },
        ],
    };
    return custom(options).show();
}
