package com.nguyenbaohoa.hotel.controller;

import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.sql.rowset.serial.SerialBlob;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.nguyenbaohoa.hotel.exception.PhotoRetrievalException;
import com.nguyenbaohoa.hotel.exception.ResourceNotFoundException;
import com.nguyenbaohoa.hotel.model.Comment;
import com.nguyenbaohoa.hotel.model.Room;
import com.nguyenbaohoa.hotel.model.User;
import com.nguyenbaohoa.hotel.response.CommentResponse;
import com.nguyenbaohoa.hotel.response.RoomResponse;
import com.nguyenbaohoa.hotel.response.UserResponse;
import com.nguyenbaohoa.hotel.service.CommentService;
import com.nguyenbaohoa.hotel.service.RoomService;
import com.nguyenbaohoa.hotel.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    private final UserService userService;

    private final RoomService roomService;

    @PostMapping("/add-comment")
    public ResponseEntity<CommentResponse> addComment(
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam("userId") Long userId,
            @RequestParam("roomId") Long roomId,
            @RequestParam("rating") Double rating,
            @RequestParam("content") String content) throws Exception {
        if (image != null && !image.isEmpty()) {
            Comment savedComment = commentService.addNewComment(image, userId, roomId, rating, content);
            CommentResponse response = new CommentResponse(savedComment.getId(), savedComment.getUser(),
                    savedComment.getRoom(), savedComment.getContent(), savedComment.getRating());
            return ResponseEntity.ok(response);
        } else {
            Comment savedComment = commentService.addNewCommentWithoutImage(userId, roomId, rating, content);
            CommentResponse response = new CommentResponse(savedComment.getId(), savedComment.getUser(),
                    savedComment.getRoom(), savedComment.getContent(), savedComment.getRating());
            return ResponseEntity.ok(response);
        }

    }

    @GetMapping("/all-comments")
    public ResponseEntity<List<CommentResponse>> getAllComments() throws SQLException {
        List<Comment> comments = commentService.getAllComments();
        List<CommentResponse> commentResponses = new ArrayList<>();
        for (Comment comment : comments) {
            CommentResponse commentResponse = getCommentResponse(comment);
            // Kiểm tra xem bình luận có chứa ảnh không
            if (comment.getImage() != null) {
                try {
                    byte[] photoBytes = comment.getImage().getBytes(1, (int) comment.getImage().length());
                    String base64Photo = Base64.encodeBase64String(photoBytes);
                    commentResponse.setPhoto(base64Photo);
                } catch (SQLException e) {
                    // Xử lý nếu không thể lấy được ảnh
                    System.out.println("Error retrieving photo for comment with id: " + comment.getId());
                }
            }
            commentResponses.add(commentResponse);
        }
        return ResponseEntity.ok(commentResponses);
    }

    @DeleteMapping("/delete-comment/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or (hasRole('ROLE_USER') and #email == authentication.principal.username)")
    public ResponseEntity<String> deleteComment(@PathVariable("id") Long id, @RequestParam("email") String email) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String currentUserEmail = authentication.getName(); // Lấy email của người dùng hiện tại

            // Kiểm tra xem email của người dùng hiện tại có khớp với email truyền vào không
            if (!currentUserEmail.equals(email)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body("You do not have permission to delete this comment");
            }

            commentService.deleteComment(id);
            return ResponseEntity.ok("Comment deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error deleting comment: " + e.getMessage());
        }
    }

    @PutMapping("/update-comment/{id}")
    public ResponseEntity<CommentResponse> updateComment(@PathVariable Long id,
            @RequestParam(required = false) MultipartFile image,
            @RequestParam(required = false) String content,
            @RequestParam(required = false) Double rating) throws IOException, SQLException {

        byte[] photoBytes = image != null && !image.isEmpty() ? image.getBytes()
                : commentService.getCommentPhotoByRoomId(id);
        Blob photoBlob = photoBytes != null && photoBytes.length > 0 ? new SerialBlob(photoBytes) : null;
        Comment theComment = commentService.updateComment(id, content, rating, photoBytes);
        theComment.setImage(photoBlob);
        CommentResponse commentResponse = getCommentResponse(theComment);
        return ResponseEntity.ok(commentResponse);
    }

    @GetMapping("/room/{roomId}")
    public ResponseEntity<List<CommentResponse>> getCommentsByRoomId(@PathVariable Long roomId) {
        List<Comment> comments = commentService.getCommentsByRoomId(roomId);
        if (comments.isEmpty()) {
            throw new ResourceNotFoundException("Comment not found");
        }
        List<CommentResponse> commentResponses = comments.stream()
                .map(this::getCommentResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(commentResponses);
    }

    @DeleteMapping("/delete/comment/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<String> deleteComment(@PathVariable("id") Long id) {
        try {
            commentService.deleteComment(id);
            return ResponseEntity.ok("Comment deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error deleting comment: " + e.getMessage());
        }
    }

    private CommentResponse getCommentResponse(Comment comment) {
        List<Room> rooms = getRoomByRoomId(comment.getRoom().getId());
        List<RoomResponse> roomInfo = rooms
                .stream()
                .map(room -> new RoomResponse(room.getId(),
                        room.getName(), room.getDescription(),
                        room.getRoomType(), room.getRoomPrice()))
                .toList();
        List<User> users = getUserByUserId(comment.getUser().getId());
        List<UserResponse> userInfo = users
                .stream()
                .map(user -> new UserResponse(user.getId(),
                        user.getFirstName(),
                        user.getLastName(), user.getEmail()))
                .toList();

        byte[] photoBytes = null;
        Blob photoBlob = comment.getImage();
        if (photoBlob != null) {
            try {
                photoBytes = photoBlob.getBytes(1, (int) photoBlob.length());
            } catch (SQLException e) {
                throw new PhotoRetrievalException("Error retrieving photo");
            }
        }
        return new CommentResponse(comment.getId(), comment.getUser(), comment.getRoom(), comment.getContent(),
                comment.getRating(), photoBytes, comment.getCreatedDate(), roomInfo, userInfo);
    }

    private List<Room> getRoomByRoomId(Long id) {
        return roomService.getRoomByRoomId(id);
    }

    private List<User> getUserByUserId(Long id) {
        return userService.getUserByUserId(id);
    }

}
