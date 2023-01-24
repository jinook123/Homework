const host = '';

export const getListApi = host + '/api/auth/me';
export const getCampignListApi = host + '/api/campaigns';
export const getUserListApi = host + '/api/users';
export const getEmailCheckApi = host + '/api/users/${email}/exists';
export const getUserDetailApi = host + '/api/users/';

export const putCampignStatusApi = host + '/api/campaigns/';
export const putUserModifyApi = host + '/api/users/';

export const postUserApi = host + '/api/users';

