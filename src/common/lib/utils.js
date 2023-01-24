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

/* 이전월구하기 */
export const getMonthAgo = (value, month) => {
    if (value != null && value instanceof Date) {
        value.setMonth(value.getMonth() - month);
        return value;
    } else {
        return value;
    }
};

/* 이후월구하기 */
export const getMonthAfter = (value, month) => {
    if (value != null && value instanceof Date) {
        value.setMonth(value.getMonth() + month);
        return value;
    } else {
        return value;
    }
};

/* 이전/이후 일 구하기 */
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

// 기존 TR 목록 지우기
export const removeTr = (className) => {
    let tds = document.getElementsByClassName(className);
    if (tds == null) {
        return;
    }
    for (let i = 0; i < tds.length; i++) {
        tds[i].remove();
    }
};

// 월별 주차 구하기
export const weekNumberByMonth = (dateFormat) => {
    const inputDate = new Date(dateFormat);

    // 인풋의 년, 월
    let year = inputDate.getFullYear();
    let month = inputDate.getMonth() + 1;

    // 목요일 기준 주차 구하기
    const weekNumberByThurFnc = (paramDate) => {
        const year = paramDate.getFullYear();
        const month = paramDate.getMonth();
        const date = paramDate.getDate();

        // 인풋한 달의 첫 날과 마지막 날의 요일
        const firstDate = new Date(year, month, 1);
        const lastDate = new Date(year, month + 1, 0);
        const firstDayOfWeek = firstDate.getDay() === 0 ? 7 : firstDate.getDay();
        const lastDayOfweek = lastDate.getDay();

        // 인풋한 달의 마지막 일
        const lastDay = lastDate.getDate();

        // 첫 날의 요일이 금, 토, 일요일 이라면 true
        const firstWeekCheck = firstDayOfWeek === 5 || firstDayOfWeek === 6 || firstDayOfWeek === 7;
        // 마지막 날의 요일이 월, 화, 수라면 true
        const lastWeekCheck = lastDayOfweek === 1 || lastDayOfweek === 2 || lastDayOfweek === 3;

        // 해당 달이 총 몇주까지 있는지
        const lastWeekNo = Math.ceil((firstDayOfWeek - 1 + lastDay) / 7);

        // 날짜 기준으로 몇주차 인지
        let weekNo = Math.ceil((firstDayOfWeek - 1 + date) / 7);

        // 인풋한 날짜가 첫 주에 있고 첫 날이 월, 화, 수로 시작한다면 'prev'(전달 마지막 주)
        if (weekNo === 1 && firstWeekCheck) weekNo = 'prev';
        // 인풋한 날짜가 마지막 주에 있고 마지막 날이 월, 화, 수로 끝난다면 'next'(다음달 첫 주)
        else if (weekNo === lastWeekNo && lastWeekCheck) weekNo = 'next';
        // 인풋한 날짜의 첫 주는 아니지만 첫날이 월, 화 수로 시작하면 -1;
        else if (firstWeekCheck) weekNo = weekNo - 1;

        return weekNo;
    };

    // 목요일 기준의 주차
    let weekNo = weekNumberByThurFnc(inputDate);

    // 이전달의 마지막 주차일 떄
    if (weekNo === 'prev') {
        // 이전 달의 마지막날
        const afterDate = new Date(year, month - 1, 0);
        year = month === 1 ? year - 1 : year;
        month = month === 1 ? 12 : month - 1;
        weekNo = weekNumberByThurFnc(afterDate);
    }
    // 다음달의 첫 주차일 때
    if (weekNo === 'next') {
        year = month === 12 ? year + 1 : year;
        month = month === 12 ? 1 : month + 1;
        weekNo = 1;
    }

    return { year, month, weekNo };
};

// 숫자에 컴마 붙임
export const formatComma = (value) => {
    const reg = /(^[+-]?\d+)(\d{3})/; // 정규식
    value += ''; // 숫자를 문자열로 변환
    value = value.replace(/[a-zA-Z]/gi, '');
    while (reg.test(value)) {
        value = value.replace(reg, '$1' + ',' + '$2');
    }
    return value;
};

// 줄부꿈 처리(\r\n => <br>)
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

// 날짜 기준 요일
export const getDayOfWeek = (value) => {
    const week = ['일', '월', '화', '수', '목', '금', '토'];
    const dayOfWeekNo = new Date(value).getDay();
    const dayOfWeek = week[dayOfWeekNo];
    return { dayOfWeek, dayOfWeekNo };
};

export const getDayOfWeekByNumber = (value) => {
    const week = ['일', '월', '화', '수', '목', '금', '토'];
    const dayOfWeek = week[value];
    return dayOfWeek;
};

export const getMonthDay = (value) => {
    const date = new Date(value);
    //  let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    return month + '월 ' + day + '일';
};

export const bytesToSize = (bytes) => {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Bytes';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
};

// 본인 소속된 사업장 조회
export const getAuthUpperBplc = (authAllBplc, bplcList) => {
    // console.log('authAllBplc');
    // console.log(authAllBplc);
    let upperBplcList = [];
    let lowerBplcList = [];

    if (authAllBplc !== undefined && authAllBplc.length > 0) {
        let dupAuthUpperBplcList = []; // header에 셋팅된 상위 사업장의 전체 리스트(중복 포함)
        let dupAuthBplcList = []; // header에 셋팅된 하위 사업장의 전체 리스트(중복 포함)
        authAllBplc.forEach((bplc) => {
            dupAuthUpperBplcList.push(bplc.uprBplcId);
            dupAuthBplcList.push(bplc.bplcId);
        });
        let authUpperBplcList = [...new Set(dupAuthUpperBplcList)]; // header에 셋팅된 상위 사업장의 전체 리스트(중복 제거)
        let authBplcList = [...new Set(dupAuthBplcList)]; // header에 셋팅된 하위 사업장의 전체 리스트(중복 제거)

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

// 본인 소속된 사업장 조회(Auth정보로 변경)
export const getAuthUpperBplcChange = (authAllBplc, authSelectedBplc) => {
    let dupUpperBplcList = [];
    let upperBplcList = [];
    let lowerBplcList = [];

    if (authAllBplc !== undefined && authAllBplc.length > 0) {
        let dupAuthUpperBplcList = []; // header에 셋팅된 상위 사업장의 전체 리스트(중복 포함)
        let dupAuthBplcList = []; // header에 셋팅된 하위 사업장의 전체 리스트(중복 포함)
        authAllBplc.forEach((bplc) => {
            dupAuthUpperBplcList.push(bplc.uprBplcId);
            dupAuthBplcList.push(bplc.bplcId);
        });
        let authUpperBplcList = [...new Set(dupAuthUpperBplcList)]; // header에 셋팅된 상위 사업장의 전체 리스트(중복 제거)
        let authBplcList = [...new Set(dupAuthBplcList)]; // header에 셋팅된 하위 사업장의 전체 리스트(중복 제거)

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

/* 사업장(소)의 사업장(대) 구하기 
   bplcId : 사업장(소)
   bplcList : 사업장 List
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

/*사용자 조직 정보 */
export const addOrgInfo = (safeckChrgrOrgNm) => {
    if (undefinedToEmpty(safeckChrgrOrgNm) !== '') {
        return '(' + safeckChrgrOrgNm + ')';
    } else {
        return '';
    }
};

// 첨부 다운로드
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

// 포탈 appoint file sample 첨부 다운로드
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

// 포탈 appoint 결과 첨부 다운로드
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
    // MbScale 기본값 20Mb;
    // var fileSize = Number(MbScale) * 1024 * 1024;

    // if (fileSize * 1 < fileObj.size * 1) {
    //     console.log('파일 용량 초과');
    //     return 'sizeFail';
    // }

    var ext = fileObj.name;
    ext = ext.slice(ext.lastIndexOf('.') + 1).toLowerCase();
    //gif, png, jpg, jpeg,doc,docx,xls,xlsx,hwp,pdf,zip,txt
    var checkExtArray;

    if (fileObj.size * 1 === 0) {
        console.log('파일 용량 0');
        return 'sizeZero';
    }

    if (dvsn === 'pic') {
        checkExtArray = ['bmp', 'gif', 'png', 'jpg', 'jpeg'];
        var fileSize = Number(MbScale) * 1024 * 1024;

        if (fileSize * 1 < fileObj.size * 1) {
            console.log('파일 용량 초과');
            return 'sizeFail';
        }
    } else if (dvsn === 'picpdf') {
        checkExtArray = ['bmp', 'gif', 'png', 'jpg', 'jpeg', 'pdf'];
        var fileSizepicpdf = Number(MbScale) * 1024 * 1024;

        if (fileSizepicpdf * 1 < fileObj.size * 1) {
            console.log('파일 용량 초과');
            return 'sizeFail';
        }
    } else if (dvsn === 'dataroom') {
        //자료실의 경우 합산 200MB의 제한을 갖는다.
        checkExtArray = ['bmp', 'gif', 'png', 'jpg', 'jpeg', 'doc', 'docx', 'xls', 'xlsx', 'hwp', 'pdf', 'zip', 'txt', 'ppt', 'pptx'];
        var fileSizeDataroom = 200 * 1024 * 1024;

        if (fileSizeDataroom * 1 < fileObj.size * 1) {
            console.log('파일 용량 초과');
            return 'sizeFail';
        }
    } else if (dvsn === 'safetyDataroom') {
        //안전관리 자료실의 경우 합산 800MB의 제한을 갖는다.
        checkExtArray = ['bmp', 'gif', 'png', 'jpg', 'jpeg', 'doc', 'docx', 'xls', 'xlsx', 'hwp', 'pdf', 'zip', 'txt', 'ppt', 'pptx'];
        var fileSizeDataroom = 800 * 1024 * 1024;

        if (fileSizeDataroom * 1 < fileObj.size * 1) {
            console.log('파일 용량 초과');
            return 'sizeFail';
        }
    } else if (dvsn === 'excel') {
        checkExtArray = ['xls', 'xlsx'];
        var fileSizepicpdf = Number(MbScale) * 1024 * 1024;

        if (fileSizepicpdf * 1 < fileObj.size * 1) {
            console.log('파일 용량 초과');
            return 'sizeFail';
        }
    } else if (dvsn === 'html') {
        checkExtArray = ['html'];
        var fileSizepicpdf = Number(MbScale) * 1024 * 1024;

        if (fileSizepicpdf * 1 < fileObj.size * 1) {
            console.log('파일 용량 초과');
            return 'sizeFail';
        }
    } else {
        checkExtArray = ['bmp', 'gif', 'png', 'jpg', 'jpeg', 'doc', 'docx', 'xls', 'xlsx', 'hwp', 'pdf', 'zip', 'txt', 'ppt', 'pptx'];
        var fileSizeOther = Number(MbScale) * 1024 * 1024;

        if (fileSizeOther * 1 < fileObj.size * 1) {
            console.log('파일 용량 초과');
            return 'sizeFail';
        }
    }

    if (checkExtArray.includes(ext)) {
        console.log('허용가능한 확장자');
        return 'pass';
    } else {
        console.log('허용불가능 확장자');
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
    '굴림',
    '궁서',
    '돋움',
    '맑은 고딕',
    '바탕',
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
    // 제한 글자수 없는 경우
    else if (limitLength == null || isNaN(limitLength) === true) {
        chek = false;
    } else {
        //console.log(value.length);
        if (value.length <= limitLength) {
            chek = true; // 글자수 범위내
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

    // 년
    let year = date.getFullYear().toString();

    // 월
    let month = date.getMonth() + 1;
    month = month < 10 ? '0' + month.toString() : month.toString();

    // 일
    let day = date.getDate();
    day = day < 10 ? '0' + day.toString() : day.toString();

    // 시
    let hour = date.getHours();
    hour = hour < 10 ? '0' + hour.toString() : hour.toString();

    // 분
    let minites = date.getMinutes();
    minites = minites < 10 ? '0' + minites.toString() : minites.toString();

    // 초
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
                    // 첫번째 체크
                    beforeRsamDivId = data['rsamDivId'];
                    beforeSpaRskCld = data['spaRskClId'];
                    grouping.push(data);
                } else {
                    // 대분류/중분류가 다를 때
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
                        calChecklist.push({ ...data, title: true, text: `대분류: ${data.rsamCklstDivNm} \t\t\t\t 중분류: ${spaRskClNm}` });
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
                calChecklist.push({ ...data, title: true, text: `대분류: ${data.rsamCklstDivNm} \t\t\t\t 중분류: ${spaRskClNm}` });

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

// 대분류/소분류 항목 가져오기를 이용하거나 엑셀 업로드를 사용했을 때
export const mergeChecklistByCb = (callBackList, tmpChecklist, gb) => {
    // 1. 팝업에서 내린 데이터를 기존 항목 사이에 넣을 index를 가공한 데이터
    const rfctrListByIndex = [];
    let chkIndex = 0;
    if (tmpChecklist !== null && tmpChecklist !== undefined && tmpChecklist.length > 0) {
        for (let i = 0; i < tmpChecklist.length; i++) {
            const data = tmpChecklist[i];
            if (data['rowDeleteYn'] === 'N') {
                // 현재 추가한 대분류/중분류의 타이틀이면 index를 찾는다
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

    // 2. 1번에서 가공한 데이터를 기존 체크리스트에 넣기
    if (tmpChecklist !== undefined && tmpChecklist !== null && tmpChecklist.length > 0) {
        // index가 존재하면 해당 위치에 넣기
        for (let j = 0; j < rfctrListByIndex.length; j++) {
            if (rfctrListByIndex[j].index !== undefined && rfctrListByIndex[j].index !== null && rfctrListByIndex[j].index > -1) {
                tmpChecklist.splice(rfctrListByIndex[j].index + 1, 0, rfctrListByIndex[j]);
            }
        }
    }

    // 3. index가 없으면 상단에 타이틀 생성해서 넣기
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
        const changeCheckList = mergeChecklist(rfctrList); // 엑셀
        // return changeCheckList.concat(tmpChecklist);
        return tmpChecklist.concat(changeCheckList);
    } else {
        const changeCheckList = mergeChecklistById(rfctrList); // 팝업
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
                    // 첫번째 체크
                    beforeCklstDivId = data['cklstDivId'];
                    beforeCklstDetlClId = data['cklstDetlClId'];
                    grouping.push(data);
                } else {
                    // 대분류/중분류가 다를 때
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


// 이행점검
export const mergeImpleInspCkList = (checklistData) => {
    let grouping = groupImpleInspCkData(checklistData);
    let calChecklist = [];

    if (checklistData !== undefined && checklistData !== null && checklistData.length > 0) {
        checklistData.forEach((checklist) => {
            if (grouping.length > 0) {
                grouping.forEach((data) => {
                    if (checklist.evluCklstSeq === data.evluCklstSeq) {
                        if(data.cklstDetlClNm === null || data.cklstDetlClNm === undefined){
                            calChecklist.push({ ...data, title: true, text: `대분류: ${data.cklstDivNm}` });
                        } else {
                            calChecklist.push({ ...data, title: true, text: `대분류: ${data.cklstDivNm} \t\t\t\t 중분류: ${data.cklstDetlClNm}` });
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
                    calChecklist.push({ ...data, title: true, text: `대분류: ${data.cklstDivNm}` });
                } else {
                    calChecklist.push({ ...data, title: true, text: `대분류: ${data.cklstDivNm} \t\t\t\t 중분류: ${data.cklstDetlClNm}` });
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

// 이행점검 : 대분류/소분류 항목 가져오기를 이용하거나 엑셀 업로드를 사용했을 때
export const mergeImpleInspCkListByCb = (callBackList, tmpChecklist, gb) => {
    // 1. 팝업에서 내린 데이터를 기존 항목 사이에 넣을 index를 가공한 데이터
    const listByIndex = [];
    let chkIndex = 0;
    if (tmpChecklist !== null && tmpChecklist !== undefined && tmpChecklist.length > 0) {
        for (let i = 0; i < tmpChecklist.length; i++) {
            const data = tmpChecklist[i];
            if (data['rowDeleteYn'] === 'N') {
                // 현재 추가한 대분류/중분류의 타이틀이면 index를 찾는다
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

    // 2. 1번에서 가공한 데이터를 기존 체크리스트에 넣기
    if (tmpChecklist !== undefined && tmpChecklist !== null && tmpChecklist.length > 0) {
        // index가 존재하면 해당 위치에 넣기
        for (let j = 0; j < listByIndex.length; j++) {
            if (listByIndex[j].index !== undefined && listByIndex[j].index !== null && listByIndex[j].index > -1) {
                tmpChecklist.splice(listByIndex[j].index + 1, 0, listByIndex[j]);
            }
        }
    }

    // 3. index가 없으면 상단에 타이틀 생성해서 넣기
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
        const changeCheckList = mergeImpleInspCkList(checkList); // 엑셀
        // return changeCheckList.concat(tmpChecklist);
        return tmpChecklist.concat(changeCheckList);
    } else {
        const changeCheckList = mergeImpleInspCkListById(checkList); // 팝업
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
                    text: `대분류: ${checklist.cklstDivNm}`,
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

// 대분류 항목 가져오기를 이용하거나 엑셀 업로드를 사용했을 때
export const mergeInspChecklistByCb = (callBackList, tmpChecklist, gb) => {
    // 1. 팝업에서 내린 데이터를 기존 항목 사이에 넣을 index를 가공한 데이터
    const itmCttListByIndex = [];
    let chkIndex = 0;
    if (tmpChecklist !== null && tmpChecklist !== undefined && tmpChecklist.length > 0) {
        for (let i = 0; i < tmpChecklist.length; i++) {
            const data = tmpChecklist[i];
            if (data['rowDeleteYn'] === 'N') {
                // 현재 추가한 대분류의 타이틀이면 index를 찾는다
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

    // 2. 1번에서 가공한 데이터를 기존 체크리스트에 넣기
    if (tmpChecklist !== undefined && tmpChecklist !== null && tmpChecklist.length > 0) {
        // index가 존재하면 해당 위치에 넣기
        for (let j = 0; j < itmCttListByIndex.length; j++) {
            if (itmCttListByIndex[j].index !== undefined && itmCttListByIndex[j].index !== null && itmCttListByIndex[j].index > -1) {
                tmpChecklist.splice(itmCttListByIndex[j].index + 1, 0, itmCttListByIndex[j]);
            }
        }
    }
    console.log(tmpChecklist);

    // 3. index가 없으면 상단에 타이틀 생성해서 넣기
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
        const changeCheckList = mergeInspChecklist(rfctrList); // 엑셀
        return tmpChecklist.concat(changeCheckList);
    } else {
        const changeCheckList = mergeInspChecklistById(rfctrList); // 팝업
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
                    // 첫번째 체크
                    beforeCklstDivId = data['cklstDivId'];
                    grouping.push(data);
                } else {
                    // 대분류가 다를 때
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
                calChecklist.push({ ...data, title: true, text: `대분류: ${data.cklstDivNm}` });
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

// 화면에서 페이징 처리
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

// 2분할 화면에서 화면 넘어가는 경우 및 200px 이하로 남은경우 lastchild의 width값을 다시 주는 함수
export const reTwoSplitPane = (lastChildPx = 800) => {
    let devSplitClass = document.getElementsByClassName('css-glamorous-div--jgd0xx');
    // console.log(devSplitClass[0]);
    // console.log(devSplitClass[0].lastChild);
    if (devSplitClass && devSplitClass.length !== 0 && devSplitClass.length === 1 && devSplitClass[0].lastChild) {
        let rightPortionWidth = devSplitClass[0].lastChild.style.width;
        if (rightPortionWidth) {
            let NumRightPortionWidth = Number(rightPortionWidth.replace('px', '')); //px단어 있는경우 ''빈문자열로
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
            let NumRightPortionWidth = Number(rightPortionWidth.replace('px', '')); //px단어 있는경우 ''빈문자열로
            // var widthParam = 800;
            if (NumRightPortionWidth < 200) {
                devSplitClass[1].lastChild.style.width = lastChildPx + 'px';
            }
            if (NumRightPortionWidth > 200 && lastChildPx < 100) {
                devSplitClass[1].lastChild.style.width = lastChildPx + 'px';
            }
        }
    }
    let stgPrdSplitClass = document.getElementsByClassName('css-1ndrsdj'); //build로 프로젝트를 만든경우
    // console.log(stgPrdSplitClass);
    // console.log(stgPrdSplitClass[0]);
    // console.log(stgPrdSplitClass[0].lastChild);
    if (stgPrdSplitClass && stgPrdSplitClass.length !== 0 && stgPrdSplitClass.length === 1 && stgPrdSplitClass[0].lastChild) {
        let rightPortionWidth = stgPrdSplitClass[0].lastChild.style.width;
        if (rightPortionWidth) {
            let NumRightPortionWidth = Number(rightPortionWidth.replace('px', '')); //px단어 있는경우 ''빈문자열로
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
            let NumRightPortionWidth = Number(rightPortionWidth.replace('px', '')); //px단어 있는경우 ''빈문자열로
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
    //파초노주빨 파초노주빨 순서 흐려짐
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
//     //파초노주빨 파초노주빨 순서 흐려짐
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
    //파파파파파 초초초초초 순서
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
    //파초노주빨 파초노주빨 순서 흐려짐
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
//     //파초노주빨 파초노주빨 순서 흐려짐
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

//line은 찾아봐야된다.
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

// 통계 달력 날짜 계산
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
 
// 통계 일/월/년 날짜타입 변환
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

// 통계 사업장 외 x건
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
        // 상위 사업장 전체 = 모든 하위 사업장
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
            // 하위 사업장 선택
            searchBplcNm = bplcNmTmp;
            searchBplcId = bplcId;
        } else {
            // 하위 사업장 전체
            searchBplcNm = filterAllBplcNm.join(',');
            searchBplcId = filterAllBplcId.join(',');
        }
    }

    let bplcNm = "";
    if(totlaBplcCnt > MAX_VIEW){
        bplcNm = searchBplcNm + ' 외 ' + (totlaBplcCnt-MAX_VIEW) + '개';
    } else {
        bplcNm = searchBplcNm;
    }

    return { bplcNm, searchBplcId};
}

// 통계 달력 validation 체크
export const statisticsDayValidation = (startDate, endDate, statisticsType) => {
    const dayType = 'D';
    const monthType = 'M';
    const yearType = 'Y';
    // 분기, 반기
    
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

// 대시보드 차트 컬러
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

// 대시보드 차트 가로 스크롤 제어
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
