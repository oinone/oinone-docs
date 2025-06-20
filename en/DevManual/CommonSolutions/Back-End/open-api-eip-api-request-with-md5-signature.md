---
title: Open Interface：EIP Open Interface Request with MD5 Signature
index: true
category:
  - Common Solutions
order: 19
---

# 1. Signature Utility Class

:::warning Tip

This signature method is only available in pamirs-core version 5.0.16 and above.

:::

```java
public class EipSignUtils {

    public static final String SIGN_METHOD_MD5 = "md5";

    private static final String SIGN_METHOD_HMAC = "hmac";

    private static final String SECRET_KEY_ALGORITHM = "HmacMD5";

    private static final String MESSAGE_DIGEST_MD5 = "MD5";

    public static String signTopRequest(Map<String, String> params, String secret, String signMethod) throws IOException {
        // Step 1: Check if parameters are sorted
        String[] keys = params.keySet().toArray(new String[0]);
        Arrays.sort(keys);

        // Step 2: Concatenate all parameter names and values
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

        // Step 3: Encrypt with MD5/HMAC
        byte[] bytes;
        if (SIGN_METHOD_HMAC.equals(signMethod)) {
            bytes = encryptHMAC(query.toString(), secret);
        } else {
            query.append(secret);
            bytes = encryptMD5(query.toString());
        }

        // Step 4: Convert binary to uppercase hexadecimal (correct signature should be 32 uppercase characters, use this method when needed)
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