import moment from 'moment';

export const getToday = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = ('0' + (1 + date.getMonth())).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    return year + '-' + month + '-' + day;
};

export const dateChange = (value) => {
    const year = value.getFullYear();
    const month = ('0' + (1 + value.getMonth())).slice(-2);
    const day = ('0' + value.getDate()).slice(-2);

    return year + '-' + month + '-' + day;
};

export const dateChangeType2 = (value) => {
    const year = value.getFullYear();
    const month = ('0' + (1 + value.getMonth())).slice(-2);
    const day = ('0' + value.getDate()).slice(-2);

    return year + month + day;
};

export const startDateChange = (value) => {
    const year = value.getFullYear();
    const month = ('0' + (1 + value.getMonth())).slice(-2);
    const day = ('0' + value.getDate()).slice(-2);

    return year + '-' + month + '-' + day;
};

export const endDateChange = (value) => {
    const year = value.getFullYear();
    const month = ('0' + (1 + value.getMonth())).slice(-2);
    const day = ('0' + value.getDate()).slice(-2);

    return year + '-' + month + '-' + day;
};

export const getTime = () => {
    const date = new Date();
    const time = ('0' + date.getMinutes()).slice(-2);
    const hour = ('0' + date.getHours()).slice(-2);
    return hour + ':' + time;
};

export const getDateYyyymmdd = (value) => {
    const year = value.getFullYear();
    const month = ('0' + (1 + value.getMonth())).slice(-2);
    const day = ('0' + value.getDate()).slice(-2);

    return year + '' + month + '' + day;
};

export const getDateFormatYyyyMmDd = (value) => {
    if (value === null || value === undefined || value === '' || isNaN(value) || value.length !== 8) {
        return null;
    }
    return value.substring(0, 4) + '-' + value.substring(4, 6) + '-' + value.substring(6, 8);
};

export const getDateFormatYyyyMm = (value) => {
    if (value === null || value === undefined || value === '' || isNaN(value) || value.length !== 6) {
        return null;
    }
    return value.substring(0, 4) + '-' + value.substring(4, 6);
};

export const typeofDate = (value) => {
    if (value === 'object' && value instanceof Date) {
        return true;
    } else {
        return false;
    }
};

export const dateFormatChange = (value, format) => {
    if (value === null || value === undefined) {
        return '';
    } else {
        return moment(value).format(format);
    }
};

export const undefinedToEmpty = (value) => {
    if (value === null || value === undefined) {
        return '';
    } else {
        return value;
    }
};

export const undefinedToNull = (value) => {
    if (value === null || value === undefined) {
        return null;
    } else {
        return value;
    }
};

export const undefinedToBlank = (value) => {
    if (value === null || value === undefined) {
        return '';
    } else {
        return value;
    }
};

/* ?????????????????? */
export const getMonthAgo = (value, month) => {
    if (value != null && value instanceof Date) {
        value.setMonth(value.getMonth() - month);
        return value;
    } else {
        return value;
    }
};

/* ?????????????????? */
export const getMonthAfter = (value, month) => {
    if (value != null && value instanceof Date) {
        value.setMonth(value.getMonth() + month);
        return value;
    } else {
        return value;
    }
};

/* ??????/?????? ??? ????????? */
export const getDateAgoAfter = (value, day) => {
    if (value != null && value instanceof Date && isNaN(day) === false) {
        value = new Date(value.setDate(value.getDate() + day));
        return value;
    } else {
        return value;
    }
};

export const procRowSpan = (className) => {
    let tds = document.getElementsByClassName(className);
    if (tds == null) {
        return;
    }
    for (let i = 0; i < tds.length; i++) {
        const curr = tds.item(i).textContent;
        const rows = Array.prototype.filter.call(tds, function (row) {
            return row.textContent === curr;
        });

        if (rows.length > 1) {
            rows[0].setAttribute('rowspan', rows.length);
            for (let j = 1; j < rows.length; j++) {
                rows[j].remove();
            }
        }
    }
};

// ?????? TR ?????? ?????????
export const removeTr = (className) => {
    let tds = document.getElementsByClassName(className);
    if (tds == null) {
        return;
    }
    for (let i = 0; i < tds.length; i++) {
        tds[i].remove();
    }
};

// ?????? ?????? ?????????
export const weekNumberByMonth = (dateFormat) => {
    const inputDate = new Date(dateFormat);

    // ????????? ???, ???
    let year = inputDate.getFullYear();
    let month = inputDate.getMonth() + 1;

    // ????????? ?????? ?????? ?????????
    const weekNumberByThurFnc = (paramDate) => {
        const year = paramDate.getFullYear();
        const month = paramDate.getMonth();
        const date = paramDate.getDate();

        // ????????? ?????? ??? ?????? ????????? ?????? ??????
        const firstDate = new Date(year, month, 1);
        const lastDate = new Date(year, month + 1, 0);
        const firstDayOfWeek = firstDate.getDay() === 0 ? 7 : firstDate.getDay();
        const lastDayOfweek = lastDate.getDay();

        // ????????? ?????? ????????? ???
        const lastDay = lastDate.getDate();

        // ??? ?????? ????????? ???, ???, ????????? ????????? true
        const firstWeekCheck = firstDayOfWeek === 5 || firstDayOfWeek === 6 || firstDayOfWeek === 7;
        // ????????? ?????? ????????? ???, ???, ????????? true
        const lastWeekCheck = lastDayOfweek === 1 || lastDayOfweek === 2 || lastDayOfweek === 3;

        // ?????? ?????? ??? ???????????? ?????????
        const lastWeekNo = Math.ceil((firstDayOfWeek - 1 + lastDay) / 7);

        // ?????? ???????????? ????????? ??????
        let weekNo = Math.ceil((firstDayOfWeek - 1 + date) / 7);

        // ????????? ????????? ??? ?????? ?????? ??? ?????? ???, ???, ?????? ??????????????? 'prev'(?????? ????????? ???)
        if (weekNo === 1 && firstWeekCheck) weekNo = 'prev';
        // ????????? ????????? ????????? ?????? ?????? ????????? ?????? ???, ???, ?????? ???????????? 'next'(????????? ??? ???)
        else if (weekNo === lastWeekNo && lastWeekCheck) weekNo = 'next';
        // ????????? ????????? ??? ?????? ???????????? ????????? ???, ??? ?????? ???????????? -1;
        else if (firstWeekCheck) weekNo = weekNo - 1;

        return weekNo;
    };

    // ????????? ????????? ??????
    let weekNo = weekNumberByThurFnc(inputDate);

    // ???????????? ????????? ????????? ???
    if (weekNo === 'prev') {
        // ?????? ?????? ????????????
        const afterDate = new Date(year, month - 1, 0);
        year = month === 1 ? year - 1 : year;
        month = month === 1 ? 12 : month - 1;
        weekNo = weekNumberByThurFnc(afterDate);
    }
    // ???????????? ??? ????????? ???
    if (weekNo === 'next') {
        year = month === 12 ? year + 1 : year;
        month = month === 12 ? 1 : month + 1;
        weekNo = 1;
    }

    return { year, month, weekNo };
};

// ????????? ?????? ??????
export const formatComma = (value) => {
    const reg = /(^[+-]?\d+)(\d{3})/; // ?????????
    value += ''; // ????????? ???????????? ??????
    value = value.replace(/[a-zA-Z]/gi, '');
    while (reg.test(value)) {
        value = value.replace(reg, '$1' + ',' + '$2');
    }
    return value;
};

// ????????? ??????(\r\n => <br>)
export const replaceBr = (value) => {
    if (value == null || value === undefined || value === '') {
        return value;
    }

    const strArr = value.split('\r\n');
    return (
        <>
            {strArr != null &&
                strArr.length > 0 &&
                strArr.map((data, index) => (
                    <>
                        {data}
                        {/* <span key={index}>{data}</span> */}
                        <br />{' '}
                    </>
                ))}
        </>
    );
};

// ?????? ?????? ??????
export const getDayOfWeek = (value) => {
    const week = ['???', '???', '???', '???', '???', '???', '???'];
    const dayOfWeekNo = new Date(value).getDay();
    const dayOfWeek = week[dayOfWeekNo];
    return { dayOfWeek, dayOfWeekNo };
};

export const getDayOfWeekByNumber = (value) => {
    const week = ['???', '???', '???', '???', '???', '???', '???'];
    const dayOfWeek = week[value];
    return dayOfWeek;
};

export const getMonthDay = (value) => {
    const date = new Date(value);
    //  let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    return month + '??? ' + day + '???';
};

export const bytesToSize = (bytes) => {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Bytes';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
};

// ?????? ????????? ????????? ??????
export const getAuthUpperBplc = (authAllBplc, bplcList) => {
    // console.log('authAllBplc');
    // console.log(authAllBplc);
    let upperBplcList = [];
    let lowerBplcList = [];

    if (authAllBplc !== undefined && authAllBplc.length > 0) {
        let dupAuthUpperBplcList = []; // header??? ????????? ?????? ???????????? ?????? ?????????(?????? ??????)
        let dupAuthBplcList = []; // header??? ????????? ?????? ???????????? ?????? ?????????(?????? ??????)
        authAllBplc.forEach((bplc) => {
            dupAuthUpperBplcList.push(bplc.uprBplcId);
            dupAuthBplcList.push(bplc.bplcId);
        });
        let authUpperBplcList = [...new Set(dupAuthUpperBplcList)]; // header??? ????????? ?????? ???????????? ?????? ?????????(?????? ??????)
        let authBplcList = [...new Set(dupAuthBplcList)]; // header??? ????????? ?????? ???????????? ?????? ?????????(?????? ??????)

        authUpperBplcList.forEach((data) => {
            const bplcId = bplcList.filter((bplc) => bplc.bplcId === data);
            upperBplcList.push(...bplcId);
        });

        authBplcList.forEach((data) => {
            const bplcId = bplcList.filter((bplc) => bplc.bplcId === data);
            lowerBplcList.push(...bplcId);
        });
    }

    return { upperBplcList, lowerBplcList };
};

// ?????? ????????? ????????? ??????(Auth????????? ??????)
export const getAuthUpperBplcChange = (authAllBplc, authSelectedBplc) => {
    let dupUpperBplcList = [];
    let upperBplcList = [];
    let lowerBplcList = [];

    if (authAllBplc !== undefined && authAllBplc.length > 0) {
        let dupAuthUpperBplcList = []; // header??? ????????? ?????? ???????????? ?????? ?????????(?????? ??????)
        let dupAuthBplcList = []; // header??? ????????? ?????? ???????????? ?????? ?????????(?????? ??????)
        authAllBplc.forEach((bplc) => {
            dupAuthUpperBplcList.push(bplc.uprBplcId);
            dupAuthBplcList.push(bplc.bplcId);
        });
        let authUpperBplcList = [...new Set(dupAuthUpperBplcList)]; // header??? ????????? ?????? ???????????? ?????? ?????????(?????? ??????)
        let authBplcList = [...new Set(dupAuthBplcList)]; // header??? ????????? ?????? ???????????? ?????? ?????????(?????? ??????)

        authUpperBplcList.forEach((data) => {
            const bplcId = authAllBplc.filter((bplc) => bplc.uprBplcId === data);

            if (bplcId !== null && bplcId !== undefined && bplcId.length > 0) {
                bplcId.forEach((bplc) => {
                    dupUpperBplcList.push({ uprBplcId: '', uprBplcNm: '', bplcId: bplc.uprBplcId, bplcNm: bplc.uprBplcNm });
                });
            }
        });
        upperBplcList = [...new Set(dupUpperBplcList.map(JSON.stringify))].map(JSON.parse);
        authBplcList.forEach((data) => {
            const bplcId = authAllBplc.filter((bplc) => bplc.bplcId === data);
            lowerBplcList.push(...bplcId);
        });
    }

    return { upperBplcList, lowerBplcList };
};

/* ?????????(???)??? ?????????(???) ????????? 
   bplcId : ?????????(???)
   bplcList : ????????? List
*/
export const getUpperBplc = (bplcId, bplcList) => {
    let uprBplcId = '';
    if (bplcList != null && bplcList.length > 0) {
        if (undefinedToEmpty(bplcId) !== '') {
            const bplcInf = bplcList.filter((bplc) => bplc.bplcId === bplcId);
            uprBplcId = bplcInf.uprBplcId;
        }
    }

    return uprBplcId;
};

export const phoneFormatter = (num, type) => {
    var formatNum = '';
    if (num === null || num === undefined) {
        return '';
    }
    if (num.length == 11) {
        if (type == 0) {
            formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-****-$3');
        } else if (type == 1) {
            formatNum = num.substring(0, 3) + '-' + num.substring(3, 7) + '-' + num.substring(7, 11);
        } else {
            formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
        }
    } else if (num.length == 8) {
        formatNum = num.replace(/(\d{4})(\d{4})/, '$1-$2');
    } else {
        if (num.indexOf('02') == 0) {
            if (type == 0) {
                formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, '$1-****-$3');
            } else {
                formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
            }
        } else {
            if (type == 0) {
                formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, '$1-***-$3');
            } else {
                formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
            }
        }
    }
    return formatNum;
};

/*????????? ?????? ?????? */
export const addOrgInfo = (safeckChrgrOrgNm) => {
    if (undefinedToEmpty(safeckChrgrOrgNm) !== '') {
        return '(' + safeckChrgrOrgNm + ')';
    } else {
        return '';
    }
};

// ?????? ????????????
export const handleFileDownload = (attachFile) => {
    const bytes = base64toBlob(attachFile.atchdFileByte, attachFile.atchdFileMimeType);
    const fileNm = attachFile.atchdFileOrglNm + '.' + attachFile.atchdFileTypNm;
    const file = new File([bytes], fileNm, { type: attachFile.atchdFileMimeType });
    const blob = new Blob([file], { type: attachFile.atchdFileMimeType });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = fileNm;
    document.body.appendChild(a);
    a.click();

    setTimeout((_) => {
        window.URL.revokeObjectURL(url);
    });
    a.remove();
};

// ?????? appoint file sample ?????? ????????????
export const handleAppointFileDownload = (attachFile) => {
    const bytes = base64toBlob(attachFile.atchdFileByte, attachFile.atchdFileMimeType);
    const fileNm = attachFile.atchdFileOrglNm;
    const file = new File([bytes], fileNm, { type: attachFile.atchdFileMimeType });
    const blob = new Blob([file], { type: attachFile.atchdFileMimeType });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = fileNm;
    document.body.appendChild(a);
    a.click();

    setTimeout((_) => {
        window.URL.revokeObjectURL(url);
    });
    a.remove();
};

// ?????? appoint ?????? ?????? ????????????
export const handleDutyFileDownload = (attachFile) => {
    const bytes = base64toBlob(attachFile.fileByte, attachFile.fileType);
    const fileNm = attachFile.fileNm;
    const file = new File([bytes], fileNm, { type: attachFile.fileType });
    const blob = new Blob([file], { type: attachFile.fileType });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = fileNm;
    document.body.appendChild(a);
    a.click();

    setTimeout((_) => {
        window.URL.revokeObjectURL(url);
    });
    a.remove();
};

export const base64toBlob = (base64Data, contentType) => {
    var sliceSize = 1024;
    var byteCharacters = atob(base64Data);
    var bytesLength = byteCharacters.length;
    var slicesCount = Math.ceil(bytesLength / sliceSize);
    var byteArrays = new Array(slicesCount);
    for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
        var begin = sliceIndex * sliceSize;
        var end = Math.min(begin + sliceSize, bytesLength);
        var bytes = new Array(end - begin);
        for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
            bytes[i] = byteCharacters[offset].charCodeAt(0);
        }
        byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
};

export const fileExtCheck = (fileObj, dvsn = 'all', MbScale = 20) => {
    // MbScale ????????? 20Mb;
    // var fileSize = Number(MbScale) * 1024 * 1024;

    // if (fileSize * 1 < fileObj.size * 1) {
    //     console.log('?????? ?????? ??????');
    //     return 'sizeFail';
    // }

    var ext = fileObj.name;
    ext = ext.slice(ext.lastIndexOf('.') + 1).toLowerCase();
    //gif, png, jpg, jpeg,doc,docx,xls,xlsx,hwp,pdf,zip,txt
    var checkExtArray;

    if (fileObj.size * 1 === 0) {
        console.log('?????? ?????? 0');
        return 'sizeZero';
    }

    if (dvsn === 'pic') {
        checkExtArray = ['bmp', 'gif', 'png', 'jpg', 'jpeg'];
        var fileSize = Number(MbScale) * 1024 * 1024;

        if (fileSize * 1 < fileObj.size * 1) {
            console.log('?????? ?????? ??????');
            return 'sizeFail';
        }
    } else if (dvsn === 'picpdf') {
        checkExtArray = ['bmp', 'gif', 'png', 'jpg', 'jpeg', 'pdf'];
        var fileSizepicpdf = Number(MbScale) * 1024 * 1024;

        if (fileSizepicpdf * 1 < fileObj.size * 1) {
            console.log('?????? ?????? ??????');
            return 'sizeFail';
        }
    } else if (dvsn === 'dataroom') {
        //???????????? ?????? ?????? 200MB??? ????????? ?????????.
        checkExtArray = ['bmp', 'gif', 'png', 'jpg', 'jpeg', 'doc', 'docx', 'xls', 'xlsx', 'hwp', 'pdf', 'zip', 'txt', 'ppt', 'pptx'];
        var fileSizeDataroom = 200 * 1024 * 1024;

        if (fileSizeDataroom * 1 < fileObj.size * 1) {
            console.log('?????? ?????? ??????');
            return 'sizeFail';
        }
    } else if (dvsn === 'safetyDataroom') {
        //???????????? ???????????? ?????? ?????? 800MB??? ????????? ?????????.
        checkExtArray = ['bmp', 'gif', 'png', 'jpg', 'jpeg', 'doc', 'docx', 'xls', 'xlsx', 'hwp', 'pdf', 'zip', 'txt', 'ppt', 'pptx'];
        var fileSizeDataroom = 800 * 1024 * 1024;

        if (fileSizeDataroom * 1 < fileObj.size * 1) {
            console.log('?????? ?????? ??????');
            return 'sizeFail';
        }
    } else if (dvsn === 'excel') {
        checkExtArray = ['xls', 'xlsx'];
        var fileSizepicpdf = Number(MbScale) * 1024 * 1024;

        if (fileSizepicpdf * 1 < fileObj.size * 1) {
            console.log('?????? ?????? ??????');
            return 'sizeFail';
        }
    } else if (dvsn === 'html') {
        checkExtArray = ['html'];
        var fileSizepicpdf = Number(MbScale) * 1024 * 1024;

        if (fileSizepicpdf * 1 < fileObj.size * 1) {
            console.log('?????? ?????? ??????');
            return 'sizeFail';
        }
    } else {
        checkExtArray = ['bmp', 'gif', 'png', 'jpg', 'jpeg', 'doc', 'docx', 'xls', 'xlsx', 'hwp', 'pdf', 'zip', 'txt', 'ppt', 'pptx'];
        var fileSizeOther = Number(MbScale) * 1024 * 1024;

        if (fileSizeOther * 1 < fileObj.size * 1) {
            console.log('?????? ?????? ??????');
            return 'sizeFail';
        }
    }

    if (checkExtArray.includes(ext)) {
        console.log('??????????????? ?????????');
        return 'pass';
    } else {
        console.log('??????????????? ?????????');
        return 'extFail';
    }
};

export const changeComcode = (codeList, changeCodeValue) => {
    let tmpCode = [];
    if (codeList !== null && codeList !== undefined && codeList.length > 0) {
        if (changeCodeValue !== null && changeCodeValue !== undefined && changeCodeValue.length > 0) {
            codeList.forEach((code) => {
                changeCodeValue.forEach((change) => {
                    if (code.comCd === change.comCd) {
                        tmpCode.push(change);
                    } else {
                        tmpCode.push(code);
                    }
                });
            });
        }
    }
    return tmpCode;
};

export const fontValues = [
    '??????',
    '??????',
    '??????',
    '?????? ??????',
    '??????',
    'Arial',
    'Courier New',
    'Georgia',
    'Impact',
    'Lucida Console',
    'Tahoma',
    'Times New Roman',
    'Verdana',
];

export const sizeValues = ['8pt', '10pt', '12pt', '14pt', '18pt', '24pt', '36pt'];
export const headerValues = [false, 1, 2, 3, 4, 5];

export const checkStringLength = (value, limitLength) => {
    let chek = false;
    if (undefinedToEmpty(value) === '') {
        chek = true;
    }
    // ?????? ????????? ?????? ??????
    else if (limitLength == null || isNaN(limitLength) === true) {
        chek = false;
    } else {
        //console.log(value.length);
        if (value.length <= limitLength) {
            chek = true; // ????????? ?????????
        }
    }

    return chek;
};

export const setDate = (type, n) => {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth();

    if (type === 'day') {
        date.setDate(day - n);
    } else if (type === 'month') {
        date.setMonth(month - n);
    }

    return dateFormatChange(date, 'YYYYMMDD');
};

export const getCurrentDate = () => {
    let date = new Date();

    // ???
    let year = date.getFullYear().toString();

    // ???
    let month = date.getMonth() + 1;
    month = month < 10 ? '0' + month.toString() : month.toString();

    // ???
    let day = date.getDate();
    day = day < 10 ? '0' + day.toString() : day.toString();

    // ???
    let hour = date.getHours();
    hour = hour < 10 ? '0' + hour.toString() : hour.toString();

    // ???
    let minites = date.getMinutes();
    minites = minites < 10 ? '0' + minites.toString() : minites.toString();

    // ???
    let seconds = date.getSeconds();
    seconds = seconds < 10 ? '0' + seconds.toString() : seconds.toString();

    return year + month + day + hour + minites + seconds;
};

const groupData = (checklistData) => {
    let grouping = [];
    let beforeRsamDivId = '';
    let beforeSpaRskCld = '';

    if (checklistData !== undefined && checklistData !== null && checklistData.length > 0) {
        for (let i = 0; i < checklistData.length; i++) {
            const data = Object.assign({}, checklistData[i]);
            if (data['rowDeleteYn'] === 'N') {
                if (beforeRsamDivId === '' && beforeSpaRskCld === '') {
                    // ????????? ??????
                    beforeRsamDivId = data['rsamDivId'];
                    beforeSpaRskCld = data['spaRskClId'];
                    grouping.push(data);
                } else {
                    // ?????????/???????????? ?????? ???
                    if (beforeRsamDivId !== data['rsamDivId'] || beforeSpaRskCld !== data['spaRskClId']) {
                        grouping.push(data);
                    }
                }
                beforeRsamDivId = data['rsamDivId'];
                beforeSpaRskCld = data['spaRskClId'];
            }
        }
    }
    return grouping;
};

export const mergeChecklist = (checklistData) => {
    let grouping = groupData(checklistData);
    let calChecklist = [];

    if (checklistData !== undefined && checklistData !== null && checklistData.length > 0) {
        checklistData.forEach((checklist) => {
            if (grouping.length > 0) {
                grouping.forEach((data) => {
                    if (checklist.evluCklstSeq === data.evluCklstSeq) {
                        const spaRskClNm = data.spaRskClNm === null || data.spaRskClNm === undefined ? '' : data.spaRskClNm;
                        calChecklist.push({ ...data, title: true, text: `?????????: ${data.rsamCklstDivNm} \t\t\t\t ?????????: ${spaRskClNm}` });
                    }
                });
            }
            calChecklist.push(checklist);
        });
    }

    return calChecklist;
};

export const mergeChecklistById = (checklistData) => {
    let grouping = groupData(checklistData);
    let calChecklist = [];
    console.log(grouping);

    if (checklistData !== undefined && checklistData !== null && checklistData.length > 0) {
        if (grouping.length > 0) {
            grouping.forEach((data) => {
                const spaRskClNm = data.spaRskClNm === null || data.spaRskClNm === undefined ? '' : data.spaRskClNm;
                calChecklist.push({ ...data, title: true, text: `?????????: ${data.rsamCklstDivNm} \t\t\t\t ?????????: ${spaRskClNm}` });

                checklistData.forEach((checklist) => {
                    if (checklist.rsamDivId === data.rsamDivId && checklist.spaRskClId === data.spaRskClId) {
                        // calChecklist.push(checklist);
                        calChecklist.push({ ...checklist, newRow: true });
                    }
                });
            });
        }
    }

    return calChecklist;
};

// ?????????/????????? ?????? ??????????????? ??????????????? ?????? ???????????? ???????????? ???
export const mergeChecklistByCb = (callBackList, tmpChecklist, gb) => {
    // 1. ???????????? ?????? ???????????? ?????? ?????? ????????? ?????? index??? ????????? ?????????
    const rfctrListByIndex = [];
    let chkIndex = 0;
    if (tmpChecklist !== null && tmpChecklist !== undefined && tmpChecklist.length > 0) {
        for (let i = 0; i < tmpChecklist.length; i++) {
            const data = tmpChecklist[i];
            if (data['rowDeleteYn'] === 'N') {
                // ?????? ????????? ?????????/???????????? ??????????????? index??? ?????????
                for (let r = 0; r < callBackList.length; r++) {
                    const rfctr = callBackList[r];
                    if (data['text'] !== undefined && data['rsamDivId'] === rfctr['rsamDivId'] && data['spaRskClId'] === rfctr['spaRskClId']) {
                        const temp = { ...rfctr, checkFlag: true, index: i + chkIndex, newRow: true };
                        chkIndex++;
                        rfctrListByIndex.push(temp);
                    }
                }
            }
        }
    }

    // 2. 1????????? ????????? ???????????? ?????? ?????????????????? ??????
    if (tmpChecklist !== undefined && tmpChecklist !== null && tmpChecklist.length > 0) {
        // index??? ???????????? ?????? ????????? ??????
        for (let j = 0; j < rfctrListByIndex.length; j++) {
            if (rfctrListByIndex[j].index !== undefined && rfctrListByIndex[j].index !== null && rfctrListByIndex[j].index > -1) {
                tmpChecklist.splice(rfctrListByIndex[j].index + 1, 0, rfctrListByIndex[j]);
            }
        }
    }

    // 3. index??? ????????? ????????? ????????? ???????????? ??????
    const rfctrList = [];
    for (let r = 0; r < callBackList.length; r++) {
        const callBack = callBackList[r];
        const temp = { ...callBack };
        for (let i = 0; i < rfctrListByIndex.length; i++) {
            if (
                rfctrListByIndex[i].checkFlag === true &&
                temp['rsamDivId'] === rfctrListByIndex[i].rsamDivId &&
                temp['spaRskClId'] === rfctrListByIndex[i].spaRskClId
            ) {
                temp['checkFlag'] = rfctrListByIndex[i].checkFlag;
                break;
            } else {
                temp['newRow'] = true;
            }
        }
        if (temp['checkFlag'] !== true) {
            rfctrList.push(temp);
        }
    }

    if (gb === 'excel') {
        const changeCheckList = mergeChecklist(rfctrList); // ??????
        // return changeCheckList.concat(tmpChecklist);
        return tmpChecklist.concat(changeCheckList);
    } else {
        const changeCheckList = mergeChecklistById(rfctrList); // ??????
        // return changeCheckList.concat(tmpChecklist);
        return tmpChecklist.concat(changeCheckList);
    }
};


const groupImpleInspCkData = (checklistData) => {
    let grouping = [];
    let beforeCklstDivId = '';
    let beforeCklstDetlClId = '';

    if (checklistData !== undefined && checklistData !== null && checklistData.length > 0) {
        for (let i = 0; i < checklistData.length; i++) {
            const data = Object.assign({}, checklistData[i]);
            if (data['rowDeleteYn'] === 'N') {
                if (beforeCklstDivId === '' && beforeCklstDetlClId === '') {
                    // ????????? ??????
                    beforeCklstDivId = data['cklstDivId'];
                    beforeCklstDetlClId = data['cklstDetlClId'];
                    grouping.push(data);
                } else {
                    // ?????????/???????????? ?????? ???
                    if (beforeCklstDivId !== data['cklstDivId'] || beforeCklstDetlClId !== data['cklstDetlClId']) {
                        grouping.push(data);
                    }
                }
                beforeCklstDivId = data['cklstDivId'];
                beforeCklstDetlClId = data['cklstDetlClId'];
            }
        }
    }
    return grouping;
};


// ????????????
export const mergeImpleInspCkList = (checklistData) => {
    let grouping = groupImpleInspCkData(checklistData);
    let calChecklist = [];

    if (checklistData !== undefined && checklistData !== null && checklistData.length > 0) {
        checklistData.forEach((checklist) => {
            if (grouping.length > 0) {
                grouping.forEach((data) => {
                    if (checklist.evluCklstSeq === data.evluCklstSeq) {
                        if(data.cklstDetlClNm === null || data.cklstDetlClNm === undefined){
                            calChecklist.push({ ...data, title: true, text: `?????????: ${data.cklstDivNm}` });
                        } else {
                            calChecklist.push({ ...data, title: true, text: `?????????: ${data.cklstDivNm} \t\t\t\t ?????????: ${data.cklstDetlClNm}` });
                        }
                    }
                });
            }
            calChecklist.push(checklist);
        });
    }

    return calChecklist;
};

export const mergeImpleInspCkListById = (checklistData) => {
    let grouping = groupImpleInspCkData(checklistData);
    let calChecklist = [];
    console.log(grouping);

    if (checklistData !== undefined && checklistData !== null && checklistData.length > 0) {
        if (grouping.length > 0) {
            grouping.forEach((data) => {
                
                if(data.cklstDetlClNm === null || data.cklstDetlClNm === undefined){
                    calChecklist.push({ ...data, title: true, text: `?????????: ${data.cklstDivNm}` });
                } else {
                    calChecklist.push({ ...data, title: true, text: `?????????: ${data.cklstDivNm} \t\t\t\t ?????????: ${data.cklstDetlClNm}` });
                }
                
                checklistData.forEach((checklist) => {
                    if (checklist.cklstDivId === data.cklstDivId && checklist.cklstDetlClId === data.cklstDetlClId) {
                        calChecklist.push({ ...checklist, newRow: true });
                    }
                });
            });
        }
    }

    return calChecklist;
};

// ???????????? : ?????????/????????? ?????? ??????????????? ??????????????? ?????? ???????????? ???????????? ???
export const mergeImpleInspCkListByCb = (callBackList, tmpChecklist, gb) => {
    // 1. ???????????? ?????? ???????????? ?????? ?????? ????????? ?????? index??? ????????? ?????????
    const listByIndex = [];
    let chkIndex = 0;
    if (tmpChecklist !== null && tmpChecklist !== undefined && tmpChecklist.length > 0) {
        for (let i = 0; i < tmpChecklist.length; i++) {
            const data = tmpChecklist[i];
            if (data['rowDeleteYn'] === 'N') {
                // ?????? ????????? ?????????/???????????? ??????????????? index??? ?????????
                for (let r = 0; r < callBackList.length; r++) {
                    const itmCtt  = callBackList[r];
                    if (data['text'] !== undefined && data['cklstDivId'] === itmCtt['cklstDivId'] && data['cklstDetlClId'] === itmCtt['cklstDetlClId']) {
                        const temp = { ...itmCtt , checkFlag: true, index: i + chkIndex, newRow: true };
                        chkIndex++;
                        listByIndex.push(temp);
                    }
                }
            }
        }
    }

    // 2. 1????????? ????????? ???????????? ?????? ?????????????????? ??????
    if (tmpChecklist !== undefined && tmpChecklist !== null && tmpChecklist.length > 0) {
        // index??? ???????????? ?????? ????????? ??????
        for (let j = 0; j < listByIndex.length; j++) {
            if (listByIndex[j].index !== undefined && listByIndex[j].index !== null && listByIndex[j].index > -1) {
                tmpChecklist.splice(listByIndex[j].index + 1, 0, listByIndex[j]);
            }
        }
    }

    // 3. index??? ????????? ????????? ????????? ???????????? ??????
    const checkList = [];
    for (let r = 0; r < callBackList.length; r++) {
        const callBack = callBackList[r];
        const temp = { ...callBack };
        for (let i = 0; i < listByIndex.length; i++) {
            if (
                listByIndex[i].checkFlag === true &&
                temp['cklstDivId'] === listByIndex[i].cklstDivId &&
                temp['cklstDetlClId'] === listByIndex[i].cklstDetlClId
            ) {
                temp['checkFlag'] = listByIndex[i].checkFlag;
                break;
            } else {
                temp['newRow'] = true;
            }
        }
        if (temp['checkFlag'] !== true) {
            checkList.push(temp);
        }
    }

    if (gb === 'excel') {
        const changeCheckList = mergeImpleInspCkList(checkList); // ??????
        // return changeCheckList.concat(tmpChecklist);
        return tmpChecklist.concat(changeCheckList);
    } else {
        const changeCheckList = mergeImpleInspCkListById(checkList); // ??????
        // return changeCheckList.concat(tmpChecklist);
        return tmpChecklist.concat(changeCheckList);
    }

};


export const mergeInspChecklist = (checklistData) => {
    let calChecklist = [];
    let beforeCklstDivId = '';
    if (checklistData !== undefined && checklistData !== null && checklistData.length > 0) {
        let flagIndex = -1;
        let titleCnt = 0;
        checklistData.forEach((checklist, index) => {
            if (beforeCklstDivId === '' || beforeCklstDivId !== checklist.cklstDivId) {
                let title = {
                    rowDeleteYn: 'N',
                    cklstDivId: checklist.cklstDivId,
                    cklstItmSrno: checklist.cklstItmSrno,
                    cklstDivNm: checklist.cklstDivNm,
                    text: `?????????: ${checklist.cklstDivNm}`,
                };
                flagIndex = index;
                calChecklist.splice(flagIndex + titleCnt, 0, title);
                titleCnt++;
            }

            calChecklist.push(checklist);
            beforeCklstDivId = checklist.cklstDivId;
        });
    }
    return calChecklist;
};

// ????????? ?????? ??????????????? ??????????????? ?????? ???????????? ???????????? ???
export const mergeInspChecklistByCb = (callBackList, tmpChecklist, gb) => {
    // 1. ???????????? ?????? ???????????? ?????? ?????? ????????? ?????? index??? ????????? ?????????
    const itmCttListByIndex = [];
    let chkIndex = 0;
    if (tmpChecklist !== null && tmpChecklist !== undefined && tmpChecklist.length > 0) {
        for (let i = 0; i < tmpChecklist.length; i++) {
            const data = tmpChecklist[i];
            if (data['rowDeleteYn'] === 'N') {
                // ?????? ????????? ???????????? ??????????????? index??? ?????????
                for (let r = 0; r < callBackList.length; r++) {
                    const itmCtt = callBackList[r];
                    if (data['text'] !== undefined && data['cklstDivId'] === itmCtt['cklstDivId']) {
                        //  && data['cklstItmSrno'] === itmCtt['cklstItmSrno'])
                        const temp = { ...itmCtt, checkFlag: true, index: i + chkIndex, newRow: true };
                        chkIndex++;
                        itmCttListByIndex.push(temp);
                    }
                }
            }
        }
    }
    console.log(itmCttListByIndex);

    // 2. 1????????? ????????? ???????????? ?????? ?????????????????? ??????
    if (tmpChecklist !== undefined && tmpChecklist !== null && tmpChecklist.length > 0) {
        // index??? ???????????? ?????? ????????? ??????
        for (let j = 0; j < itmCttListByIndex.length; j++) {
            if (itmCttListByIndex[j].index !== undefined && itmCttListByIndex[j].index !== null && itmCttListByIndex[j].index > -1) {
                tmpChecklist.splice(itmCttListByIndex[j].index + 1, 0, itmCttListByIndex[j]);
            }
        }
    }
    console.log(tmpChecklist);

    // 3. index??? ????????? ????????? ????????? ???????????? ??????
    const rfctrList = [];
    for (let r = 0; r < callBackList.length; r++) {
        const callBack = callBackList[r];
        const temp = { ...callBack };
        for (let i = 0; i < itmCttListByIndex.length; i++) {
            if (itmCttListByIndex[i].checkFlag === true && temp['cklstDivId'] === itmCttListByIndex[i].cklstDivId) {
                // && temp['cklstItmSrno'] === itmCttListByIndex[i].cklstItmSrno
                temp['checkFlag'] = itmCttListByIndex[i].checkFlag;
                break;
            } else {
                temp['newRow'] = true;
            }
        }
        if (temp['checkFlag'] !== true) {
            rfctrList.push(temp);
        }
    }
    console.log(rfctrList);
    if (gb === 'excel') {
        const changeCheckList = mergeInspChecklist(rfctrList); // ??????
        return tmpChecklist.concat(changeCheckList);
    } else {
        const changeCheckList = mergeInspChecklistById(rfctrList); // ??????
        return tmpChecklist.concat(changeCheckList);
    }
};

const inspGroupData = (checklistData) => {
    // console.log(checklistData);
    let grouping = [];
    let beforeCklstDivId = '';

    if (checklistData !== undefined && checklistData !== null && checklistData.length > 0) {
        for (let i = 0; i < checklistData.length; i++) {
            const data = Object.assign({}, checklistData[i]);
            if (data['rowDeleteYn'] === 'N') {
                if (beforeCklstDivId === '') {
                    // ????????? ??????
                    beforeCklstDivId = data['cklstDivId'];
                    grouping.push(data);
                } else {
                    // ???????????? ?????? ???
                    if (beforeCklstDivId !== data['cklstDivId']) {
                        grouping.push(data);
                    }
                }
                beforeCklstDivId = data['cklstDivId'];
            }
        }
    }
    return grouping;
};

export const mergeInspChecklistById = (checklistData) => {
    let grouping = inspGroupData(checklistData);
    let calChecklist = [];

    if (checklistData !== undefined && checklistData !== null && checklistData.length > 0) {
        if (grouping.length > 0) {
            grouping.forEach((data) => {
                calChecklist.push({ ...data, title: true, text: `?????????: ${data.cklstDivNm}` });
                checklistData.forEach((checklist) => {
                    if (data.cklstDivId === checklist.cklstDivId) {
                        calChecklist.push({ ...checklist, newRow: true });
                    }
                });
            });
        }
    }

    return calChecklist;
};

// ???????????? ????????? ??????
export const makePageInfo = (totalCnt, pageSize, pageNo, rowPerPage) => {
    let tmpPagerInfo = {};
    if (totalCnt === 0) {
        tmpPagerInfo = {
            pageSize: pageSize,
            pageNo: 0,
            rowPerPage: rowPerPage,
            totalCnt: 0,
            totalPage: 0,
            firstRow: 0,
            lastRow: 0,
            startPageNo: 0,
            endPageNo: 0,
        };
        return tmpPagerInfo;
    }

    let tmpPageNo = pageNo;
    let tmpRowPerPage = rowPerPage;

    let totalPage = parseInt(totalCnt / tmpRowPerPage + 0.9);
    let firstRow = (tmpPageNo - 1) * tmpRowPerPage;
    let lastRow = tmpPageNo * tmpRowPerPage;
    let pageGroup = parseInt(tmpPageNo % pageSize);
    let startPageNo = (parseInt(tmpPageNo / pageSize) - (pageGroup === 0 ? 1 : 0)) * pageSize + 1;
    let endPageNo = parseInt(startPageNo + pageSize - 1) > totalPage ? totalPage : startPageNo + pageSize - 1;

    tmpPagerInfo.pageSize = pageSize;
    tmpPagerInfo.pageNo = tmpPageNo;
    tmpPagerInfo.rowPerPage = tmpRowPerPage;
    tmpPagerInfo.totalCnt = totalCnt;
    tmpPagerInfo.totalPage = totalPage;
    tmpPagerInfo.firstRow = firstRow;
    tmpPagerInfo.lastRow = lastRow;
    tmpPagerInfo.startPageNo = startPageNo;
    tmpPagerInfo.endPageNo = endPageNo;

    return tmpPagerInfo;
};

// 2?????? ???????????? ?????? ???????????? ?????? ??? 200px ????????? ???????????? lastchild??? width?????? ?????? ?????? ??????
export const reTwoSplitPane = (lastChildPx = 800) => {
    let devSplitClass = document.getElementsByClassName('css-glamorous-div--jgd0xx');
    // console.log(devSplitClass[0]);
    // console.log(devSplitClass[0].lastChild);
    if (devSplitClass && devSplitClass.length !== 0 && devSplitClass.length === 1 && devSplitClass[0].lastChild) {
        let rightPortionWidth = devSplitClass[0].lastChild.style.width;
        if (rightPortionWidth) {
            let NumRightPortionWidth = Number(rightPortionWidth.replace('px', '')); //px?????? ???????????? ''???????????????
            // var widthParam = 800;
            if (NumRightPortionWidth < 200) {
                devSplitClass[0].lastChild.style.width = lastChildPx + 'px';
            }
            if (NumRightPortionWidth > 200 && lastChildPx < 100) {
                devSplitClass[0].lastChild.style.width = lastChildPx + 'px';
            }
        }
    } else if (devSplitClass && devSplitClass.length !== 0 && devSplitClass.length === 2 && devSplitClass[1].lastChild) {
        let rightPortionWidth = devSplitClass[1].lastChild.style.width;
        if (rightPortionWidth) {
            let NumRightPortionWidth = Number(rightPortionWidth.replace('px', '')); //px?????? ???????????? ''???????????????
            // var widthParam = 800;
            if (NumRightPortionWidth < 200) {
                devSplitClass[1].lastChild.style.width = lastChildPx + 'px';
            }
            if (NumRightPortionWidth > 200 && lastChildPx < 100) {
                devSplitClass[1].lastChild.style.width = lastChildPx + 'px';
            }
        }
    }
    let stgPrdSplitClass = document.getElementsByClassName('css-1ndrsdj'); //build??? ??????????????? ????????????
    // console.log(stgPrdSplitClass);
    // console.log(stgPrdSplitClass[0]);
    // console.log(stgPrdSplitClass[0].lastChild);
    if (stgPrdSplitClass && stgPrdSplitClass.length !== 0 && stgPrdSplitClass.length === 1 && stgPrdSplitClass[0].lastChild) {
        let rightPortionWidth = stgPrdSplitClass[0].lastChild.style.width;
        if (rightPortionWidth) {
            let NumRightPortionWidth = Number(rightPortionWidth.replace('px', '')); //px?????? ???????????? ''???????????????
            // var widthParam = 800;
            if (NumRightPortionWidth < 200) {
                stgPrdSplitClass[0].lastChild.style.width = lastChildPx + 'px';
            }
            if (NumRightPortionWidth > 200 && lastChildPx < 100) {
                stgPrdSplitClass[0].lastChild.style.width = lastChildPx + 'px';
            }
        }
    } else if (stgPrdSplitClass && stgPrdSplitClass.length !== 0 && stgPrdSplitClass.length === 2 && stgPrdSplitClass[1].lastChild) {
        let rightPortionWidth = stgPrdSplitClass[1].lastChild.style.width;
        if (rightPortionWidth) {
            let NumRightPortionWidth = Number(rightPortionWidth.replace('px', '')); //px?????? ???????????? ''???????????????
            // var widthParam = 800;
            if (NumRightPortionWidth < 200) {
                stgPrdSplitClass[1].lastChild.style.width = lastChildPx + 'px';
            }
            if (NumRightPortionWidth > 200 && lastChildPx < 100) {
                stgPrdSplitClass[1].lastChild.style.width = lastChildPx + 'px';
            }
        }
    }
};

export const CustomPointPieShuffle = (pointInfo) => {
    //??????????????? ??????????????? ?????? ?????????
    // console.log(pointInfo);
    // console.log(pointInfo.value);
    if (pointInfo.index === 16) {
        return { color: '#021CA7' };
    } else if (pointInfo.index === 17) {
        return { color: '#105353' };
    } else if (pointInfo.index === 18) {
        return { color: '#A64E01' };
    } else if (pointInfo.index === 19) {
        return { color: '#8E0E02' };
    } else if (pointInfo.index === 8) {
        return { color: '#384DBE' };
    } else if (pointInfo.index === 9) {
        return { color: '#0A8A8A' };
    } else if (pointInfo.index === 10) {
        return { color: '#FF7800' };
    } else if (pointInfo.index === 11) {
        return { color: '#EA1401' };
    } else if (pointInfo.index === 0) {
        return { color: '#5E75F2' };
    } else if (pointInfo.index === 1) {
        return { color: '#2ABFBF' };
    } else if (pointInfo.index === 2) {
        return { color: '#F29441' };
    } else if (pointInfo.index === 3) {
        return { color: '#F86B5E' };
    } else if (pointInfo.index === 4) {
        return { color: '#95A3EF' };
    } else if (pointInfo.index === 5) {
        return { color: '#9EDEDE' };
    } else if (pointInfo.index === 6) {
        return { color: '#FCC18D' };
    } else if (pointInfo.index === 7) {
        return { color: '#F3A7A0' };
    } else if (pointInfo.index === 12) {
        return { color: '#BABED3' };
    } else if (pointInfo.index === 13) {
        return { color: '#BDE1E1' };
    } else if (pointInfo.index === 14) {
        return { color: '#FFEBDA' };
    } else if (pointInfo.index === 15) {
        return { color: '#FFE2DF' };
    }
};

// export const CustomPointPieShuffle = (pointInfo) => {
//     //??????????????? ??????????????? ?????? ?????????
//     // console.log(pointInfo);
//     // console.log(pointInfo.value);
//     if (pointInfo.index === 20) {
//         return { color: '#021CA7' };
//     } else if (pointInfo.index === 21) {
//         return { color: '#105353' };
//     } else if (pointInfo.index === 22) {
//         return { color: '#877D04' };
//     } else if (pointInfo.index === 23) {
//         return { color: '#A64E01' };
//     } else if (pointInfo.index === 24) {
//         return { color: '#8E0E02' };
//     } else if (pointInfo.index === 10) {
//         return { color: '#384DBE' };
//     } else if (pointInfo.index === 11) {
//         return { color: '#0A8A8A' };
//     } else if (pointInfo.index === 12) {
//         return { color: '#CFC113' };
//     } else if (pointInfo.index === 13) {
//         return { color: '#FF7800' };
//     } else if (pointInfo.index === 14) {
//         return { color: '#EA1401' };
//     } else if (pointInfo.index === 0) {
//         return { color: '#5E75F2' };
//     } else if (pointInfo.index === 1) {
//         return { color: '#2ABFBF' };
//     } else if (pointInfo.index === 2) {
//         return { color: '#F5EE92' };
//     } else if (pointInfo.index === 3) {
//         return { color: '#F29441' };
//     } else if (pointInfo.index === 4) {
//         return { color: '#F86B5E' };
//     } else if (pointInfo.index === 5) {
//         return { color: '#95A3EF' };
//     } else if (pointInfo.index === 6) {
//         return { color: '#9EDEDE' };
//     } else if (pointInfo.index === 7) {
//         return { color: '#F9F5C5' };
//     } else if (pointInfo.index === 8) {
//         return { color: '#FCC18D' };
//     } else if (pointInfo.index === 9) {
//         return { color: '#F3A7A0' };
//     } else if (pointInfo.index === 15) {
//         return { color: '#BABED3' };
//     } else if (pointInfo.index === 16) {
//         return { color: '#BDE1E1' };
//     } else if (pointInfo.index === 17) {
//         return { color: '#F2F0D8' };
//     } else if (pointInfo.index === 18) {
//         return { color: '#FFEBDA' };
//     } else if (pointInfo.index === 19) {
//         return { color: '#FFE2DF' };
//     }
// };

export const CustomPointPie = (pointInfo) => {
    //??????????????? ??????????????? ??????
    // console.log(pointInfo);
    // console.log(pointInfo.value);
    if (pointInfo.index === 4) {
        return { color: '#021CA7' };
    } else if (pointInfo.index === 9) {
        return { color: '#105353' };
    } else if (pointInfo.index === 14) {
        return { color: '#877D04' };
    } else if (pointInfo.index === 19) {
        return { color: '#A64E01' };
    } else if (pointInfo.index === 24) {
        return { color: '#8E0E02' };
    } else if (pointInfo.index === 2) {
        return { color: '#384DBE' };
    } else if (pointInfo.index === 7) {
        return { color: '#0A8A8A' };
    } else if (pointInfo.index === 12) {
        return { color: '#CFC113' };
    } else if (pointInfo.index === 17) {
        return { color: '#FF7800' };
    } else if (pointInfo.index === 22) {
        return { color: '#EA1401' };
    } else if (pointInfo.index === 0) {
        return { color: '#5E75F2' };
    } else if (pointInfo.index === 5) {
        return { color: '#2ABFBF' };
    } else if (pointInfo.index === 10) {
        return { color: '#F5EE92' };
    } else if (pointInfo.index === 15) {
        return { color: '#F29441' };
    } else if (pointInfo.index === 20) {
        return { color: '#F86B5E' };
    } else if (pointInfo.index === 1) {
        return { color: '#95A3EF' };
    } else if (pointInfo.index === 6) {
        return { color: '#9EDEDE' };
    } else if (pointInfo.index === 11) {
        return { color: '#F9F5C5' };
    } else if (pointInfo.index === 16) {
        return { color: '#FCC18D' };
    } else if (pointInfo.index === 21) {
        return { color: '#F3A7A0' };
    } else if (pointInfo.index === 3) {
        return { color: '#BABED3' };
    } else if (pointInfo.index === 8) {
        return { color: '#BDE1E1' };
    } else if (pointInfo.index === 13) {
        return { color: '#F2F0D8' };
    } else if (pointInfo.index === 18) {
        return { color: '#FFEBDA' };
    } else if (pointInfo.index === 23) {
        return { color: '#FFE2DF' };
    }
};
export const CustomPointPieSeries = (index) => {
    if (index === 4) {
        return '#021CA7';
    } else if (index === 9) {
        return '#105353';
    } else if (index === 14) {
        return '#877D04';
    } else if (index === 19) {
        return '#A64E01';
    } else if (index === 24) {
        return '#8E0E02';
    } else if (index === 2) {
        return '#384DBE';
    } else if (index === 7) {
        return '#0A8A8A';
    } else if (index === 12) {
        return '#CFC113';
    } else if (index === 17) {
        return '#FF7800';
    } else if (index === 22) {
        return '#EA1401';
    } else if (index === 0) {
        return '#5E75F2';
    } else if (index === 5) {
        return '#2ABFBF';
    } else if (index === 10) {
        return '#F5EE92';
    } else if (index === 15) {
        return '#F29441';
    } else if (index === 20) {
        return '#F86B5E';
    } else if (index === 1) {
        return '#95A3EF';
    } else if (index === 6) {
        return '#9EDEDE';
    } else if (index === 11) {
        return '#F9F5C5';
    } else if (index === 16) {
        return '#FCC18D';
    } else if (index === 21) {
        return '#F3A7A0';
    } else if (index === 3) {
        return '#BABED3';
    } else if (index === 8) {
        return '#BDE1E1';
    } else if (index === 13) {
        return '#F2F0D8';
    } else if (index === 18) {
        return '#FFEBDA';
    } else if (index === 23) {
        return '#FFE2DF';
    }
};
export const CustomPointBarShuffle = (pointInfo) => {
    //??????????????? ??????????????? ?????? ?????????
    // console.log(pointInfo);
    // console.log(pointInfo.value);
    if (pointInfo.index === 16) {
        return { color: '#021CA7' };
    } else if (pointInfo.index === 17) {
        return { color: '#105353' };
    } else if (pointInfo.index === 18) {
        return { color: '#A64E01' };
    } else if (pointInfo.index === 19) {
        return { color: '#8E0E02' };
    } else if (pointInfo.index === 8) {
        return { color: '#384DBE' };
    } else if (pointInfo.index === 9) {
        return { color: '#0A8A8A' };
    } else if (pointInfo.index === 10) {
        return { color: '#FF7800' };
    } else if (pointInfo.index === 11) {
        return { color: '#EA1401' };
    } else if (pointInfo.index === 0) {
        return { color: '#5E75F2' };
    } else if (pointInfo.index === 1) {
        return { color: '#2ABFBF' };
    } else if (pointInfo.index === 2) {
        return { color: '#F29441' };
    } else if (pointInfo.index === 3) {
        return { color: '#F86B5E' };
    } else if (pointInfo.index === 4) {
        return { color: '#95A3EF' };
    } else if (pointInfo.index === 5) {
        return { color: '#9EDEDE' };
    } else if (pointInfo.index === 6) {
        return { color: '#FCC18D' };
    } else if (pointInfo.index === 7) {
        return { color: '#F3A7A0' };
    } else if (pointInfo.index === 12) {
        return { color: '#BABED3' };
    } else if (pointInfo.index === 13) {
        return { color: '#BDE1E1' };
    } else if (pointInfo.index === 14) {
        return { color: '#FFEBDA' };
    } else if (pointInfo.index === 15) {
        return { color: '#FFE2DF' };
    }
};
// export const CustomPointBarShuffle = (pointInfo) => {
//     //??????????????? ??????????????? ?????? ?????????
//     // console.log(pointInfo);
//     // console.log(pointInfo.value);
//     if (pointInfo.index === 20) {
//         return { color: '#021CA7' };
//     } else if (pointInfo.index === 21) {
//         return { color: '#105353' };
//     } else if (pointInfo.index === 22) {
//         return { color: '#877D04' };
//     } else if (pointInfo.index === 23) {
//         return { color: '#A64E01' };
//     } else if (pointInfo.index === 24) {
//         return { color: '#8E0E02' };
//     } else if (pointInfo.index === 10) {
//         return { color: '#384DBE' };
//     } else if (pointInfo.index === 11) {
//         return { color: '#0A8A8A' };
//     } else if (pointInfo.index === 12) {
//         return { color: '#CFC113' };
//     } else if (pointInfo.index === 13) {
//         return { color: '#FF7800' };
//     } else if (pointInfo.index === 14) {
//         return { color: '#EA1401' };
//     } else if (pointInfo.index === 0) {
//         return { color: '#5E75F2' };
//     } else if (pointInfo.index === 1) {
//         return { color: '#2ABFBF' };
//     } else if (pointInfo.index === 2) {
//         return { color: '#F5EE92' };
//     } else if (pointInfo.index === 3) {
//         return { color: '#F29441' };
//     } else if (pointInfo.index === 4) {
//         return { color: '#F86B5E' };
//     } else if (pointInfo.index === 5) {
//         return { color: '#95A3EF' };
//     } else if (pointInfo.index === 6) {
//         return { color: '#9EDEDE' };
//     } else if (pointInfo.index === 7) {
//         return { color: '#F9F5C5' };
//     } else if (pointInfo.index === 8) {
//         return { color: '#FCC18D' };
//     } else if (pointInfo.index === 9) {
//         return { color: '#F3A7A0' };
//     } else if (pointInfo.index === 15) {
//         return { color: '#BABED3' };
//     } else if (pointInfo.index === 16) {
//         return { color: '#BDE1E1' };
//     } else if (pointInfo.index === 17) {
//         return { color: '#F2F0D8' };
//     } else if (pointInfo.index === 18) {
//         return { color: '#FFEBDA' };
//     } else if (pointInfo.index === 19) {
//         return { color: '#FFE2DF' };
//     }
// };

export const CustomPointSeries = (mapIdx) => {
    if (mapIdx === 16) {
        return '#021CA7';
    } else if (mapIdx === 17) {
        return '#105353';
    } else if (mapIdx === 18) {
        return '#A64E01';
    } else if (mapIdx === 19) {
        return '#8E0E02';
    } else if (mapIdx === 8) {
        return '#384DBE';
    } else if (mapIdx === 9) {
        return '#0A8A8A';
    } else if (mapIdx === 10) {
        return '#FF7800';
    } else if (mapIdx === 11) {
        return '#EA1401';
    } else if (mapIdx === 0) {
        return '#5E75F2';
    } else if (mapIdx === 1) {
        return '#2ABFBF';
    } else if (mapIdx === 2) {
        return '#F29441';
    } else if (mapIdx === 3) {
        return '#F86B5E';
    } else if (mapIdx === 4) {
        return '#95A3EF';
    } else if (mapIdx === 5) {
        return '#9EDEDE';
    } else if (mapIdx === 6) {
        return '#FCC18D';
    } else if (mapIdx === 7) {
        return '#F3A7A0';
    } else if (mapIdx === 12) {
        return '#BABED3';
    } else if (mapIdx === 13) {
        return '#BDE1E1';
    } else if (mapIdx === 14) {
        return '#FFEBDA';
    } else if (mapIdx === 15) {
        return '#FFE2DF';
    }
};

export const CustomPointStackBar = (pointInfo) => {
    // console.log(pointInfo);
    // console.log(pointInfo.value);

    if (pointInfo.series.index === 0) {
        return { color: '#5581fc' };
    } else if (pointInfo.series.index === 1) {
        return { color: '#8861f8' };
    } else if (pointInfo.series.index === 2) {
        return { color: '#ed87f4' };
    } else if (pointInfo.series.index === 3) {
        return { color: '#e7a83b' };
    }
};

//line??? ??????????????????.
export const CustomPointLine = (pointInfo) => {
    // console.log(pointInfo);
    // console.log(pointInfo.value);

    if (pointInfo.series.index === 0) {
        return { color: '#5581fc' };
    } else if (pointInfo.series.index === 1) {
        return { color: '#8861f8' };
    } else if (pointInfo.series.index === 2) {
        return { color: '#ed87f4' };
    } else if (pointInfo.series.index === 3) {
        return { color: '#e7a83b' };
    }
};

export const CustomPointDanger = (pointInfo) => {
    let tmpIndex = pointInfo.index % 10;
    
    if (tmpIndex === 0) {
        return { color: '#da3715' };
    } else if (tmpIndex === 1) {
        return { color: '#de632a' };
    } else if (tmpIndex === 2) {
        return { color: '#ea7f39' };
    } else if (tmpIndex === 3) {
        return { color: '#e6a93e' };
    } else if (tmpIndex === 4) {
        return { color: '#eddb7d' };
    } else if (tmpIndex === 5) {
        return { color: '#e7a83b' };
    } else if (tmpIndex === 6) {
        return { color: '#ec8f42' };
    } else if (tmpIndex === 7) {
        return { color: '#de6229' };
    } else if (tmpIndex === 8) {
        return { color: '#ed87f4' };
    } else if (tmpIndex === 9) {
        return { color: '#cf76f8' };
    }
};

// ?????? ?????? ?????? ??????
export const statisticsSetDate = (type, n) => {
    let date = getDateAgoAfter(new Date(), -1);
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    if (type === 'day') {
        day = day - n;
    } else if (type === 'month') {
        month = month - n;
    }
    else if (type === 'year') {
        year = year - n;
    }
    
    date = new Date(year, month, day)

    return dateFormatChange(date, 'YYYYMMDD');
};
 
// ?????? ???/???/??? ???????????? ??????
export const onDatetRender = (tmpData) => {
    if (tmpData === null || tmpData === undefined) {
        return ;
    }
    else if (tmpData.length === 8) {
        return getDateFormatYyyyMmDd(tmpData);
    } else if (tmpData.length === 6) {
        return getDateFormatYyyyMm(tmpData);
    }
    else {
        return tmpData;
    }
};

// ?????? ????????? ??? x???
export const bplcNameList = (uprBplcId, authUserAllBusinessPlace, searchData) => {
    let searchBplcId = '';
    let searchBplcNm = '';
    let filterAllBplcNm = [];
    let filterAllBplcId = [];
    let count = 0;
    let totlaBplcCnt = 0;
    let MAX_VIEW = 5; 

    authUserAllBusinessPlace.forEach(bplc => {
        if(uprBplcId === bplc.uprBplcId || uprBplcId === "") {
            if(Number(count) < Number(MAX_VIEW)){
                filterAllBplcNm.push(bplc.bplcNm);
                count++;
            }
            filterAllBplcId.push(bplc.bplcId);
            totlaBplcCnt++;
        }
    });

    if(uprBplcId === '' || uprBplcId === undefined || uprBplcId === null) {
        // ?????? ????????? ?????? = ?????? ?????? ?????????
        searchBplcNm = filterAllBplcNm.join(',');
        searchBplcId = filterAllBplcId.join(',');
    } else {
        const stateBplcId = searchData.bplcId;  
             
        let filterBplcNm = [];
        let filterBplcId = [];

        if (stateBplcId != null && stateBplcId !== undefined && stateBplcId.length > 0) {
               
            count = 0;
            totlaBplcCnt = 0;
            stateBplcId.forEach((data) => {
                if(Number(count) < Number(MAX_VIEW)){
                    filterBplcNm.push(data.bplcNm);
                    count++;
                } 
                filterBplcId.push(data.bplcId);
                totlaBplcCnt++;
            });
        } 
        
        const bplcNmTmp = filterBplcNm.join(',');
        const bplcId = filterBplcId.join(',');
        if(bplcNmTmp.length > 0) {
            // ?????? ????????? ??????
            searchBplcNm = bplcNmTmp;
            searchBplcId = bplcId;
        } else {
            // ?????? ????????? ??????
            searchBplcNm = filterAllBplcNm.join(',');
            searchBplcId = filterAllBplcId.join(',');
        }
    }

    let bplcNm = "";
    if(totlaBplcCnt > MAX_VIEW){
        bplcNm = searchBplcNm + ' ??? ' + (totlaBplcCnt-MAX_VIEW) + '???';
    } else {
        bplcNm = searchBplcNm;
    }

    return { bplcNm, searchBplcId};
}

// ?????? ?????? validation ??????
export const statisticsDayValidation = (startDate, endDate, statisticsType) => {
    const dayType = 'D';
    const monthType = 'M';
    const yearType = 'Y';
    // ??????, ??????
    
    if (startDate != null && startDate !== '' && endDate != null && endDate !== '') {
        let dateChk = true;
        if (statisticsType === dayType && startDate > endDate) {
            dateChk = false;
        }
        else if (statisticsType === monthType && startDate.slice(0, 6) > endDate.slice(0, 6)) {
            dateChk = false;
        }
        else if (statisticsType === yearType && startDate.slice(0, 4) > endDate.slice(0, 4)) {
            dateChk = false;
        }

        return dateChk;
    }
}

// ???????????? ?????? ??????
export const chartSeriesColor = (index) =>  {
    if (index === 0) {
        return '#5581fc';
    } else if (index === 1) {
        return '#3ecee8';
    } else if (index === 2) {
        return '#49b6fb';
    } else if (index === 3) {
        return '#8861f8'
    } else if (index === 4) {
        return '#a976f7';
    } else if (index === 5) {
        return '#cf76f8';
    } else if (index === 6) {
        return '#ed87f4';
    } else if (index === 7) {
        return '#de6229';
    } else if (index === 8) {
        return '#ec8f42';
    } else if (index === 9) {
        return '#e7a83b';
    }
}

// ???????????? ?????? ?????? ????????? ??????
export const setRange = (e, visualRange) => {
    if (e.fullName === 'argumentAxis.visualRange') {
        if(visualRange.startValue !== undefined && visualRange.startValue !== '') {
            const stateStart = visualRange.startValue;
            const currentStart = e.value.startValue;
            if (stateStart.valueOf() !== currentStart.valueOf()) {
                return e.value;
            } else {
                return ''
            }
        }
    }
}

export const chartFontSize = () => {
    return '1rem';
}

export const dashBoardChartFontSize = () => {
    return '0.75rem';
}
