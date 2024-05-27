package com.nguyenbaohoa.hotel.service;

import java.util.List;

import com.nguyenbaohoa.hotel.model.Role;
import com.nguyenbaohoa.hotel.model.User;

public interface RoleService {
    List<Role> getRoles();
    Role createRole(Role theRole);

    void deleteRole(Long id);
    Role findByName(String name);

    User removeUserFromRole(Long userId, Long roleId);
    User assignRoleToUser(Long userId, Long roleId);
    Role removeAllUsersFromRole(Long roleId);
}
