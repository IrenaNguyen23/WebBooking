package com.nguyenbaohoa.hotel.service;

import java.sql.SQLException;
import java.util.*;

import org.springframework.web.multipart.MultipartFile;

import com.nguyenbaohoa.hotel.model.Comment;


public interface CommentService {

    Comment addNewComment(MultipartFile image, Long userId, Long roomId, Double rating, String content) throws Exception;

    Comment addNewCommentWithoutImage(Long userId, Long roomId, Double rating, String content) throws Exception;

    List<Comment> getCommentsByRoomId(Long roomId);

    List<Comment> getAllComments();

    byte[] getCommentPhotoByRoomId(Long id) throws SQLException;

    void deleteComment(Long id);

    Comment updateComment(Long id, String content, Double rating, byte[] photoBytes);

    Comment findById(Long id);
    
}
