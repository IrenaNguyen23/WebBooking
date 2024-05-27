package com.nguyenbaohoa.hotel.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nguyenbaohoa.hotel.model.Role;
import java.util.*;

public interface RoleRepository extends JpaRepository<Role,Long>{

    Optional<Role> findByName(String role);

    boolean existsByName(String roleName);

}
