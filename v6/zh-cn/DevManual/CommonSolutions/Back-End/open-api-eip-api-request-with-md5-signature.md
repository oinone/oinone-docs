---
title: 开放接口：EIP开放接口使用MD5验签发起请求
index: true
category:
  - 常见解决方案
order: 19
---
# 一、验签工具类

:::warning 提示

该验签方法仅在pamirs-core的5.0.16版本以上可正常使用

:::

```java
public class EipSignUtils {

    public static final String SIGN_METHOD_MD5 = "md5";

    private static final String SIGN_METHOD_HMAC = "hmac";

    private static final String SECRET_KEY_ALGORITHM = "HmacMD5";

    private static final String MESSAGE_DIGEST_MD5 = "MD5";

    public static String signTopRequest(Map<String, String> params, String secret, String signMethod) throws IOException {
        // 第一步：检查参数是否已经排序
        String[] keys = params.keySet().toArray(new String[0]);
        Arrays.sort(keys);

        // 第二步：把所有参数名和参数值串在一起
        StringBuilder query = new StringBuilder();
        if (SIGN_METHOD_MD5.equals(signMethod)) {
            query.append(secret);
        }
        for (String key : keys) {
            String value = params.get(key);
            if (StringUtils.isNoneBlank(key, value)) {
                query.append(key).append(value);
            }
        }

        // 第三步：使用MD5/HMAC加密
        byte[] bytes;
        if (SIGN_METHOD_HMAC.equals(signMethod)) {
            bytes = encryptHMAC(query.toString(), secret);
        } else {
            query.append(secret);
            bytes = encryptMD5(query.toString());
        }

        // 第四步：把二进制转化为大写的十六进制(正确签名应该为32大写字符串，此方法需要时使用)
        return byte2hex(bytes);
    }

    private static byte[] encryptHMAC(String data, String secret) throws IOException {
        byte[] bytes;
        try {
            SecretKey secretKey = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), SECRET_KEY_ALGORITHM);
            Mac mac = Mac.getInstance(secretKey.getAlgorithm());
            mac.init(secretKey);
            bytes = mac.doFinal(data.getBytes(StandardCharsets.UTF_8));
        } catch (GeneralSecurityException e) {
            throw new IOException(e.toString(), e);
        }
        return bytes;
    }

    private static byte[] encryptMD5(String data) throws IOException {
        return encryptMD5(data.getBytes(StandardCharsets.UTF_8));
    }

    private static byte[] encryptMD5(byte[] data) throws IOException {
        try {
            MessageDigest md = MessageDigest.getInstance(MESSAGE_DIGEST_MD5);
            return md.digest(data);
        } catch (NoSuchAlgorithmException e) {
            throw new IOException(e.toString(), e);
        }
    }

    private static String byte2hex(byte[] bytes) {
        StringBuilder sign = new StringBuilder();
        for (byte aByte : bytes) {
            String hex = Integer.toHexString(aByte & 0xFF);
            if (hex.length() == 1) {
                sign.append("0");
            }
            sign.append(hex.toUpperCase());
        }
        return sign.toString();
    }
}
```

