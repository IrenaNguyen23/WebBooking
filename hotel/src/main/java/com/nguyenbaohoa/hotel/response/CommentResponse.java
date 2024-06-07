package com.nguyenbaohoa.hotel.response;

import java.util.List;
import java.util.Date;

import org.apache.tomcat.util.codec.binary.Base64;

import com.nguyenbaohoa.hotel.model.Room;
import com.nguyenbaohoa.hotel.model.User;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@NoArgsConstructor
public class CommentResponse {
    private Long id;
    private Long userId;
    private Long roomId;
    private String content;
    private Double rating;
    private String photo; // Trường photo để lưu ảnh của người dùng bình luận
    private Date createdDate;
    private List<RoomResponse> roomInfo;
    private List<UserResponse> userInfo;

    public CommentResponse(Long id, User user, Room room, String content, Double rating) {
        this.id = id;
        this.userId = user.getId();
        this.roomId = room.getId();
        this.content = content;
        this.rating = rating;
    }

    public CommentResponse(Long id, User user, Room room, String content, Double rating, byte[] photoBytes, Date createdDate, List<RoomResponse> roomInfo, List<UserResponse> userInfo) {
        this.id = id;
        this.userId = user.getId();
        this.roomId = room.getId();
        this.content = content;
        this.rating = rating;
        this.photo = photoBytes != null ? Base64.encodeBase64String(photoBytes) : null;
        this.createdDate = createdDate;
        this.roomInfo = roomInfo;
        this.userInfo = userInfo;
    }

}

