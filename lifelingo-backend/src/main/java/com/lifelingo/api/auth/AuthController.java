package com.lifelingo.api.auth;

import com.lifelingo.api.progress.Progress;
import com.lifelingo.api.progress.ProgressRepository;
import com.lifelingo.api.security.JwtService;
import com.lifelingo.api.user.User;
import com.lifelingo.api.user.UserRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
  private final UserRepository users; private final ProgressRepository progress; private final PasswordEncoder encoder; private final JwtService jwt;
  public AuthController(UserRepository users,ProgressRepository progress,PasswordEncoder encoder,JwtService jwt){this.users=users;this.progress=progress;this.encoder=encoder;this.jwt=jwt;}
  public record Signup(@NotBlank @Size(max=80) String name,@Email @NotBlank String email,@NotBlank @Size(min=6,max=72) String password){}
  public record Login(@Email @NotBlank String email,@NotBlank String password){}
  public record AuthResponse(String token,Long id,String name,String email){}
  @PostMapping("/signup") @ResponseStatus(HttpStatus.CREATED)
  public AuthResponse signup(@Valid @RequestBody Signup r){String email=r.email().trim().toLowerCase();if(users.existsByEmailIgnoreCase(email))throw new ResponseStatusException(HttpStatus.CONFLICT,"Email already exists");User u=users.save(new User(r.name().trim(),email,encoder.encode(r.password())));progress.save(new Progress(u));return out(u);}
  @PostMapping("/login")
  public AuthResponse login(@Valid @RequestBody Login r){User u=users.findByEmailIgnoreCase(r.email().trim()).orElseThrow(()->new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Invalid email or password"));if(!encoder.matches(r.password(),u.getPasswordHash()))throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Invalid email or password");return out(u);}
  private AuthResponse out(User u){return new AuthResponse(jwt.create(u.getId(),u.getEmail()),u.getId(),u.getName(),u.getEmail());}
}
