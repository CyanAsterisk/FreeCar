package org.lanlance.freecartrade.interceptor;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bouncycastle.asn1.x509.AlgorithmIdentifier;
import org.bouncycastle.asn1.x509.SubjectPublicKeyInfo;
import org.bouncycastle.internal.asn1.edec.EdECObjectIdentifiers;
import org.bouncycastle.openssl.PEMParser;
import org.bouncycastle.openssl.jcajce.JcaPEMKeyConverter;
import org.lanlance.freecartrade.config.PasetoConfig;
import org.lanlance.freecartrade.util.CalcUtil;

import org.paseto4j.version4.PasetoPublic;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.paseto4j.commons.PublicKey;
import org.paseto4j.commons.Version;

import java.io.Reader;
import java.io.StringReader;
import java.util.Base64;

@Slf4j
@Component
@RequiredArgsConstructor
public class PasetoAuthInterceptor implements HandlerInterceptor {

    private final PasetoConfig pasetoConfig;

    private static final String AUTHORIZATION_HEADER = "authorization";
    private static final String TOKEN_PREFIX = "Bearer ";
    public static final String ACCOUNT_ID = "accountId";

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        try {
            // Get Authorization header
            String authHeader = request.getHeader(AUTHORIZATION_HEADER);
            if (authHeader == null || !authHeader.startsWith(TOKEN_PREFIX)) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return false;
            }
            String token = authHeader.substring(TOKEN_PREFIX.length());

            // Parse Token
            byte[] publicKeyBytes = CalcUtil.hexStringToByteArray(pasetoConfig.getPubKey());
            AlgorithmIdentifier algorithmIdentifier = new AlgorithmIdentifier(EdECObjectIdentifiers.id_Ed25519);
            SubjectPublicKeyInfo spki = new SubjectPublicKeyInfo(algorithmIdentifier, publicKeyBytes);
            String publicKeyPem = "-----BEGIN PUBLIC KEY-----\n" + Base64.getEncoder().encodeToString(spki.getEncoded()) + "\n-----END PUBLIC KEY-----";
            Reader rdr = new StringReader(publicKeyPem);
            Object parsed = new PEMParser(rdr).readObject();
            var edPublicKey = new JcaPEMKeyConverter().getPublicKey((SubjectPublicKeyInfo) parsed);
            var publicKey = new PublicKey(edPublicKey, Version.V4);
            String payload = PasetoPublic.parse(publicKey, token, "", pasetoConfig.getImplicit());

            // Get and set Id
            ObjectMapper objectMapper = new ObjectMapper();
            String userId = objectMapper.readTree(payload).get("id").asText();
            request.setAttribute(ACCOUNT_ID, userId);
            return true;
        } catch (Exception e) {
            log.error("PasetoAuthInterceptor#preHandle# parse token failed: ", e);
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return false;
        }
    }
}
