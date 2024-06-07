package com.nguyenbaohoa.hotel.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nguyenbaohoa.hotel.model.User;
import java.util.*;
import java.util.List;


public interface UserRepository extends JpaRepository<User, Long>{

    boolean existsByEmail(String email);

    void deleteByEmail(String email);

    Optional<User> findByEmail(String email);

    List<User> findUserById(Long id);
    
}
