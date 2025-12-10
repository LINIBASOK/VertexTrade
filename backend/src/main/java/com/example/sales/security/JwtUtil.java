package com.example.sales.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    // Use Key object, not String
    private final Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    // Generate JWT token
    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 hours
                .signWith(SECRET_KEY) // pass Key, not String
                .compact();
    }

    // Extract username from token
    public String getUsernameFromToken(String token) {
        return extractClaims(token).getSubject();
    }

    // Validate token expiration
    public boolean validateToken(String token) {
        return !extractClaims(token).getExpiration().before(new Date());
    }

    // Extract all claims
    private Claims extractClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY) // Key object
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
