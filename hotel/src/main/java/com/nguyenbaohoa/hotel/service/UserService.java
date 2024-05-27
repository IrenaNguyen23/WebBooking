package com.nguyenbaohoa.hotel.service;

import com.nguyenbaohoa.hotel.model.User;
import java.util.*;

public interface UserService {
    User registerUser(User user);
    List<User> getUsers();
    void deleteUser(String email);
    User getUser(String email);
}
