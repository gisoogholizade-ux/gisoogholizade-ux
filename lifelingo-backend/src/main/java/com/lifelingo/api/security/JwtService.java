package com.lifelingo.api.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;

@Service
public class JwtService {
  private final SecretKey key;
  public JwtService(@Value("${lifelingo.jwt-secret}") String secret){this.key=Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));}
  public String create(Long userId,String email){Instant now=Instant.now();return Jwts.builder().subject(String.valueOf(userId)).claim("email",email).issuedAt(Date.from(now)).expiration(Date.from(now.plusSeconds(60L*60*24*30))).signWith(key).compact();}
  public Long userId(String token){return Long.valueOf(Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload().getSubject());}
}
