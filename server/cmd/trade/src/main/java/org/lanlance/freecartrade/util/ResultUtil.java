package org.lanlance.freecartrade.util;

import org.lanlance.freecartrade.model.resp.Result;

public class ResultUtil {

    // 成功状态码
    public static final Integer SUCCESS = 0;
    // 失败状态码
    public static final Integer SERVER_INTERNAL_ERROR = 1;
    public static final Integer UNAUTHORIZED = 401;

    // 成功，带数据
    public static <T> Result<T> success(T data) {
        return new Result<>(SUCCESS, "ok", data);
    }

    // 成功，不带数据
    public static <T> Result<T> success() {
        return success(null);
    }

    // 成功，自定义消息，带数据
    public static <T> Result<T> success(String msg, T data) {
        return new Result<>(SUCCESS, msg, data);
    }

    // 失败，带错误信息
    public static <T> Result<T> error(String msg) {
        return new Result<>(SERVER_INTERNAL_ERROR, msg, null);
    }

    // 失败，自定义错误码和错误信息
    public static <T> Result<T> error(Integer code, String msg) {
        return new Result<>(code, msg, null);
    }
}