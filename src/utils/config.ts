
const dotenv = require('dotenv');
dotenv.config();
const r = process.env;

let ERROR_DELAY = 3000;
let TRIM_DELAY = 3000;
let MOCK_API = false;
let MOCK_DELAY = 800;
let PAGE_SIZE = 50;

if (r.ERROR_DELAY) {
    ERROR_DELAY = Number.parseInt(r.ERROR_DELAY);
}
if (r.TRIM_DELAY) {
    TRIM_DELAY = Number.parseInt(r.TRIM_DELAY);
}
if (r.MOCK_API) {
    MOCK_API = r.MOCK_API.toLowerCase() === 'true';
}
if (r.MOCK_DELAY) {
    MOCK_DELAY = Number.parseInt(r.MOCK_DELAY);
}
if (r.PAGE_SIZE) {
    PAGE_SIZE = Number.parseInt(r.PAGE_SIZE);
}

export const config = {
	ERROR_DELAY,
	TRIM_DELAY,
	MOCK_API,
	MOCK_DELAY,
	PAGE_SIZE,
}
