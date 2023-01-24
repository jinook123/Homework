//한국어+글자수(3글자 이상,10글자 이하)
const REGEX_SAMPLE = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{3,10}$/;

//email형식
const REGEX_EMAIL = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;

//최소 10 자, 최대 20 자, 하나 이상의 문자, 하나 이상의 숫자, 하나 이상의 특수 문자를 포함한 정규 표현식
const REGEX_PASSWORD = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&.])[A-Za-z\d@$!%*#?&.]{10,20}$/;

const REGEX_PHONE_NUMBER2 = /^[\d]{3,4}$/;
const REGEX_PHONE_NUMBER3 = /^[\d]{4}$/;

// URL 형식
const REGEX_URL = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

const REGEX_NUMBER = /^[\d]+$/;

const regexp = { REGEX_SAMPLE, REGEX_EMAIL, REGEX_PASSWORD, REGEX_PHONE_NUMBER2, REGEX_PHONE_NUMBER3, REGEX_URL, REGEX_NUMBER };
export default regexp;
