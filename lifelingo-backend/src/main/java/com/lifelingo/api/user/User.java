package com.lifelingo.api.user;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name="users", uniqueConstraints=@UniqueConstraint(columnNames="email"))
public class User {
  @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
  private Long id;
  @Column(nullable=false, length=80) private String name;
  @Column(nullable=false, length=190) private String email;
  @Column(nullable=false, length=100) private String passwordHash;
  @Column(nullable=false) private Instant createdAt = Instant.now();
  protected User() {}
  public User(String name,String email,String passwordHash){this.name=name;this.email=email;this.passwordHash=passwordHash;}
  public Long getId(){return id;} public String getName(){return name;} public String getEmail(){return email;} public String getPasswordHash(){return passwordHash;} public Instant getCreatedAt(){return createdAt;}
  public void setName(String name){this.name=name;} public void setEmail(String email){this.email=email;} public void setPasswordHash(String passwordHash){this.passwordHash=passwordHash;}
}
