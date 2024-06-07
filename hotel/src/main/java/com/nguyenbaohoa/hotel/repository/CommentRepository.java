package com.nguyenbaohoa.hotel.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

import com.nguyenbaohoa.hotel.model.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByRoomId(Long roomId);
}

