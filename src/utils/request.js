/**
 * 网络请求工具函数
 * 基于 uni.request 封装
 */
const BASE_URL = "http://localhost:8080/api";

// 请求超时时间
const TIMEOUT = 10000;

/**
 * 请求拦截器 - 添加token等公共参数
 */
const requestInterceptor = (config) => {
  // 从本地存储获取token
  const token = uni.getStorageSync("token");

  // 添加token到请求头
  if (token) {
    config.header = {
      ...config.header,
      Authorization: `Bearer ${token}`,
    };
  }

  // 添加公共请求头
  config.header = {
    "Content-Type": "application/json",
    ...config.header,
  };

  return config;
};

/**
 * 响应拦截器 - 统一处理响应数据
 */
const responseInterceptor = (response) => {
  const { data, statusCode } = response;

  // HTTP状态码判断
  if (statusCode === 200) {
    // 根据后端返回的数据结构调整
    if (data.code === 0 || data.code === 200) {
      return data.data || data;
    } else {
      // 业务错误
      uni.showToast({
        title: data.message || data.msg || "请求失败",
        icon: "none",
        duration: 2000,
      });
      return Promise.reject(data);
    }
  } else if (statusCode === 401) {
    // token过期或未登录
    uni.showToast({
      title: "请先登录",
      icon: "none",
    });
    // 跳转到登录页
    setTimeout(() => {
      uni.navigateTo({
        url: "/pages/login/login",
      });
    }, 1500);
    return Promise.reject(response);
  } else {
    // 其他HTTP错误
    uni.showToast({
      title: `请求错误(${statusCode})`,
      icon: "none",
    });
    return Promise.reject(response);
  }
};

/**
 * 核心请求函数
 */
const request = (options = {}) => {
  return new Promise((resolve, reject) => {
    // 合并配置
    let config = {
      url: BASE_URL + options.url,
      method: options.method || "GET",
      data: options.data || {},
      header: options.header || {},
      timeout: options.timeout || TIMEOUT,
    };

    // 请求拦截
    config = requestInterceptor(config);

    // 显示loading
    if (options.loading !== false) {
      uni.showLoading({
        title: options.loadingText || "加载中...",
        mask: true,
      });
    }

    // 发起请求
    uni.request({
      ...config,
      success: (response) => {
        // 响应拦截
        responseInterceptor(response)
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      },
      fail: (error) => {
        uni.showToast({
          title: "网络请求失败",
          icon: "none",
        });
        reject(error);
      },
      complete: () => {
        // 隐藏loading
        if (options.loading !== false) {
          uni.hideLoading();
        }
      },
    });
  });
};

/**
 * GET 请求
 * @param {String} url 请求地址
 * @param {Object} data 请求参数
 * @param {Object} options 其他配置
 */
export const get = (url, data = {}, options = {}) => {
  return request({
    url,
    method: "GET",
    data,
    ...options,
  });
};

/**
 * POST 请求
 * @param {String} url 请求地址
 * @param {Object} data 请求参数
 * @param {Object} options 其他配置
 */
export const post = (url, data = {}, options = {}) => {
  return request({
    url,
    method: "POST",
    data,
    ...options,
  });
};

/**
 * PUT 请求
 * @param {String} url 请求地址
 * @param {Object} data 请求参数
 * @param {Object} options 其他配置
 */
export const put = (url, data = {}, options = {}) => {
  return request({
    url,
    method: "PUT",
    data,
    ...options,
  });
};

/**
 * DELETE 请求
 * @param {String} url 请求地址
 * @param {Object} data 请求参数
 * @param {Object} options 其他配置
 */
export const del = (url, data = {}, options = {}) => {
  return request({
    url,
    method: "DELETE",
    data,
    ...options,
  });
};

/**
 * 文件上传
 * @param {String} url 上传地址
 * @param {String} filePath 文件路径
 * @param {Object} formData 额外的表单数据
 * @param {Object} options 其他配置
 */
export const upload = (url, filePath, formData = {}, options = {}) => {
  return new Promise((resolve, reject) => {
    const token = uni.getStorageSync("token");

    // 显示loading
    if (options.loading !== false) {
      uni.showLoading({
        title: "上传中...",
        mask: true,
      });
    }

    uni.uploadFile({
      url: BASE_URL + url,
      filePath: filePath,
      name: options.name || "file",
      formData: formData,
      header: {
        Authorization: token ? `Bearer ${token}` : "",
        ...options.header,
      },
      success: (response) => {
        const data = JSON.parse(response.data);
        if (data.code === 0 || data.code === 200) {
          resolve(data.data || data);
        } else {
          uni.showToast({
            title: data.message || "上传失败",
            icon: "none",
          });
          reject(data);
        }
      },
      fail: (error) => {
        uni.showToast({
          title: "上传失败",
          icon: "none",
        });
        reject(error);
      },
      complete: () => {
        if (options.loading !== false) {
          uni.hideLoading();
        }
      },
    });
  });
};

/**
 * 文件下载
 * @param {String} url 下载地址
 * @param {Object} options 其他配置
 */
export const download = (url, options = {}) => {
  return new Promise((resolve, reject) => {
    const token = uni.getStorageSync("token");

    // 显示loading
    if (options.loading !== false) {
      uni.showLoading({
        title: "下载中...",
        mask: true,
      });
    }

    uni.downloadFile({
      url: BASE_URL + url,
      header: {
        Authorization: token ? `Bearer ${token}` : "",
        ...options.header,
      },
      success: (response) => {
        if (response.statusCode === 200) {
          resolve(response.tempFilePath);
        } else {
          uni.showToast({
            title: "下载失败",
            icon: "none",
          });
          reject(response);
        }
      },
      fail: (error) => {
        uni.showToast({
          title: "下载失败",
          icon: "none",
        });
        reject(error);
      },
      complete: () => {
        if (options.loading !== false) {
          uni.hideLoading();
        }
      },
    });
  });
};

// 默认导出
export default {
  request,
  get,
  post,
  put,
  del,
  upload,
  download,
};
