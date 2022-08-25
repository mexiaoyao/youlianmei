import Mock from "mockjs";

import "./finance";

//指定被拦截的 请求的响应时间，单位是毫秒
Mock.setup({
    timeout: "300-600"
});
