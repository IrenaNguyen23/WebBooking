package com.nguyenbaohoa.hotel.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nguyenbaohoa.hotel.model.User;
import java.util.*;

public interface UserRepository extends JpaRepository<User, Long>{

    boolean existsByEmail(String email);

    void deleteByEmail(String email);

    Optional<User> findByEmail(String email);
    
}
