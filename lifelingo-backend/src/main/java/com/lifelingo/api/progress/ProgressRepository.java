package com.lifelingo.api.progress;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ProgressRepository extends JpaRepository<Progress,Long>{
  Optional<Progress> findByUserId(Long userId);
}
