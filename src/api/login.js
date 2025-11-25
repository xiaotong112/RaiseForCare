import { get, post, put, del, upload } from "../utils/request";

/**
 * 微信登录
 * @param {Object} data - 登录数据
 * @param {string} data.code - 微信登录凭证
 */
export const login = (data) => {
  return post("/user/login", data);
};

/**
 * 退出登录
 */
export const logout = () => {
  return post("/user/logout");
};

/**
 * 新增用户信息
 * @param {Object} data - 用户信息请求参数
 * @param {string} data.birthday - 用户生日
 * @param {number} data.deposit - 用户当前存款
 * @param {number} [data.id] - 用户ID（修改时必填，新增时不传）
 * @param {number} data.monthIncome - 用户月净收入
 * @param {number} data.retireAge - 用户退休年龄
 * @param {number} data.retireDeposit - 用户目标退休存款金
 * @param {string} data.sex - 用户性别
 * @param {string} data.username - 用户昵称
 * @returns {Promise} 返回用户信息的Promise对象
 */
export const getUserInfo = (data) => {
  return post("/user/info", data);
};

/**
 * 刷新token
 */
export const refreshToken = () => {
  return post("/user/refresh-token");
};

export default {
  login,
  logout,
  getUserInfo,
  refreshToken,
};
