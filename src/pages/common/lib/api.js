export const getFileDownloadApi = '/business-service/file/download';
export const getPortalFileDownloadApi = '/portal-service/file/download';
export const getSampleFileDownloadApi = '/business-service/excel/download/sample';
export const postMenuLog = 'common-service/history/menu/';
export const getExcelBatchFileDownloadApi = '/business-service/excel/getExcelBatchFile';
export const getCheckExcelBatchFileApi = '/business-service/excel/checkExcelJobStat';
export const getFileDownloadByFileInfoApi = '/business-service/excel/getFileDownByFileInfo';
export const getAppointSampleFileDownloadApi = '/portal-service/excel/download/sample';
export const getAppointFileDownloadByFileInfoApi = '/portal-service/excel/getFileDownByFileInfo';
export const getDutyListExcel = '/portal-service/duty/status/export'; // 직무현황 엑셀다운로드
export const getPdfFileDownload = '/portal-service/duty/export/pdf';

export const getSKTPeopleForAutoComplete = '/common-service/popup/user/approval/people'; //skt인원 검색 회원가입승인 api를 같이 사용
export const getBpPeopleForAutoComplete = '/common-service/common/popup/bp/allmember/';

export const getExcelBatchFileDownloadPortalApi = '/common-service/excel/getExcelBatchFile';
export const getCheckExcelBatchFilePortalApi = '/common-service/excel/checkExcelJobStat';

// export const getBpUserPopupList = '/common-service/common/popup/bp/member/';
// /common-service/popup/bplc-role/onlyusers/list
// /common-service/common/popup/bp/onlyusers/list
// 임시파일 저장
export const temporarilyFileUpload = '/business-service/file/tempFileUpload/';

// 메세지 전송
export const postMessageApi = '/common-service/common/system/mms/send/users';
export const postEmailApi = '/common-service/common/system/email/send/users';
export const postEmailTmpltApi = '/common-service/common/system/email/send/users/template';
export const postEmailTmpltNewApi = '/common-service/common/system/email/send/users/template/new';
export const postConfRsltTreatment = '/business-service/conference/inspection/treatment/';

export const getBpReviewerApi = '/common-service/popup/user/bp/reviewer';
export const getSystemManagerList = '/portal-service/users/info/system-manager';

export const getAllUserApi = '/business-service/common/user';
export const getAllOrgApi = '/business-service/common/orgInfo';
export const getAllBpApi = '/business-service/common/bp';
export const getAllApi = '/business-service/common/all';

export const getBpExcelFileDownload = '/portal-service/org/bp/getFileDownByFileInfo'; //bp 협력사 엑셀 다운로드
export const getBpSampleFileDownload = '/portal-service/excel/download/bpRegSample';
export const getBpFileDownloadByFileInfo = '/portal-service/excel/getFileDownByFileInfo';

export const postNtatcCurstApi = '/business-service/ntatc/';
