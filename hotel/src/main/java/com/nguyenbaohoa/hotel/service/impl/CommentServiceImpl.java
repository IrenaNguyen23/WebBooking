package com.nguyenbaohoa.hotel.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.nguyenbaohoa.hotel.exception.InternalServerException;
import com.nguyenbaohoa.hotel.exception.ResourceNotFoundException;
import com.nguyenbaohoa.hotel.model.Comment;
import com.nguyenbaohoa.hotel.model.Room;
import com.nguyenbaohoa.hotel.model.User;
import com.nguyenbaohoa.hotel.repository.CommentRepository;
import com.nguyenbaohoa.hotel.repository.RoomRepository;
import com.nguyenbaohoa.hotel.repository.UserRepository;
import com.nguyenbaohoa.hotel.service.CommentService;


import javax.sql.rowset.serial.SerialBlob;
import lombok.RequiredArgsConstructor;

import java.sql.Blob;
import java.sql.SQLException;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService{
    
    private final CommentRepository commentRepository;

    private final UserRepository userRepository;

    private final RoomRepository roomRepository;

    @Override
    public Comment addNewComment(MultipartFile image, Long userId, Long roomId, Double rating, String content) throws Exception {
        Comment comment = new Comment();

        User user = userRepository.findById(userId).orElseThrow(() -> new Exception("User not found"));
        Room room = roomRepository.findById(roomId).orElseThrow(() -> new Exception("Room not found"));

        comment.setUser(user);
        comment.setRoom(room);
        comment.setRating(rating);
        comment.setContent(content);
        if (!image.isEmpty()) {
            byte[] photoBytes = image.getBytes();
            Blob photoBlob = new SerialBlob(photoBytes);
            comment.setImage(photoBlob);
        }
        return commentRepository.save(comment);
    }

    @Override
    public Comment addNewCommentWithoutImage(Long userId, Long roomId, Double rating, String content) throws Exception {
        Comment comment = new Comment();

        User user = userRepository.findById(userId).orElseThrow(() -> new Exception("User not found"));
        Room room = roomRepository.findById(roomId).orElseThrow(() -> new Exception("Room not found"));

        comment.setUser(user);
        comment.setRoom(room);
        comment.setRating(rating);
        comment.setContent(content);
        return commentRepository.save(comment);
    }

    @Override
    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }

    @Override
    public byte[] getCommentPhotoByRoomId(Long id) throws SQLException {
        Optional<Comment> theComment = commentRepository.findById(id);
        if(theComment.isEmpty()){
            throw new ResourceNotFoundException("Sorry, Comment not found!");
        }
        Blob photoBlob = theComment.get().getImage();
        if(photoBlob != null)
        {
            return photoBlob.getBytes(1,(int)photoBlob.length());
        }
        return null;
    }

    @Override
    public void deleteComment(Long id) {
        Optional<Comment> theComment = commentRepository.findById(id);
        if(theComment.isPresent()){
            commentRepository.deleteById(id);
        }
    }

    @Override
    public Comment updateComment(Long id, String content, Double rating, byte[] photoBytes) {
        Comment comment = commentRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Comment not found"));
        if(content != null) comment.setContent(content);
        if(rating != null) comment.setRating(rating);
        if(photoBytes != null && photoBytes.length >0){
            try {
                comment.setImage(new SerialBlob(photoBytes));
            } catch (SQLException ex) {
                throw new InternalServerException("Error updating comment");
            }
        }
        return commentRepository.save(comment);
    }

    @Override
    public List<Comment> getCommentsByRoomId(Long roomId) {
        return commentRepository.findByRoomId(roomId);
    }

    @Override
    public Comment findById(Long id) {
        return commentRepository.findById(id).orElse(null);
    }
    
}
