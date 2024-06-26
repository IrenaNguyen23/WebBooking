package com.nguyenbaohoa.hotel.response;

import java.math.*;
import java.util.*;

import org.apache.tomcat.util.codec.binary.Base64;


import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RoomResponse {
    private Long id;
    private String name;
    private String description;
    private String roomType;
    private BigDecimal roomPrice;
    private boolean isBooked;
    private String photo;
    private List<BookingResponse>bookings;
    private List<GalleryResponse>galleries;

    public RoomResponse(Long id, String name, String description, String roomType, BigDecimal roomPrice) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.roomType = roomType;
        this.roomPrice = roomPrice;
    }

    public RoomResponse(Long id, String name, String description, String roomType, BigDecimal roomPrice, boolean isBooked,
                        byte[] photoBytes ,List<GalleryResponse>galleries, List<BookingResponse> bookings) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.roomType = roomType;
        this.roomPrice = roomPrice;
        this.isBooked = isBooked;
        this.photo = photoBytes != null ? Base64.encodeBase64String(photoBytes) : null;
        this.galleries = galleries;
        this.bookings = bookings;
    }

}
