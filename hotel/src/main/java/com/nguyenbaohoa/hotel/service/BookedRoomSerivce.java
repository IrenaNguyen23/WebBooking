package com.nguyenbaohoa.hotel.service;

import java.util.*;

import com.nguyenbaohoa.hotel.model.BookedRoom;

public interface BookedRoomSerivce {

    void cancelBooking(Long bookingId);

    String saveBooking(Long roomId, BookedRoom bookingRequest);
    
    List<BookedRoom> getAllBookings();
    
    BookedRoom findByBookingConfirmationCode(String confirmationCode);

    List<BookedRoom> getBookingsByUserEmail(String email);

}
