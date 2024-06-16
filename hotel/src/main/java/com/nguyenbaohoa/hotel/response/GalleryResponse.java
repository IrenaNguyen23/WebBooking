package com.nguyenbaohoa.hotel.response;


import org.apache.tomcat.util.codec.binary.Base64;

import com.nguyenbaohoa.hotel.model.Room;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@NoArgsConstructor
public class GalleryResponse {
    private Long id;

    private String image;

    private Long roomId;

    public GalleryResponse(Long id, Room room ){
        this.id = id;
        this.roomId = room.getId();
    }

    public GalleryResponse(Long id, byte[] photoBytes, Room room ){
        this.id = id;
        this.image = photoBytes != null ? Base64.encodeBase64String(photoBytes) : null;
        this.roomId = room.getId();
    }

}
