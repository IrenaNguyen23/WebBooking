package com.nguyenbaohoa.hotel.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nguyenbaohoa.hotel.exception.InvalidBookingRequestException;
import com.nguyenbaohoa.hotel.exception.ResourceNotFoundException;
import com.nguyenbaohoa.hotel.model.BookedRoom;
import com.nguyenbaohoa.hotel.model.Room;
import com.nguyenbaohoa.hotel.response.BookingResponse;
import com.nguyenbaohoa.hotel.response.RoomResponse;
import com.nguyenbaohoa.hotel.service.BookedRoomSerivce;
import com.nguyenbaohoa.hotel.service.RoomService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;


@RestController
@RequiredArgsConstructor
@RequestMapping("/bookings")
public class BookedRoomController {
    private final BookedRoomSerivce bookingSerivce;
    private final RoomService roomService;

    @GetMapping("/all-bookings")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<BookingResponse>> getAllBooking() {
        List<BookedRoom> bookings = bookingSerivce.getAllBookings();
        List<BookingResponse> bookingResponses = new ArrayList<>();
        for (BookedRoom booking : bookings) {
            BookingResponse bookingResponse = getBookingResponse(booking);
            bookingResponses.add(bookingResponse);
        }
        return ResponseEntity.ok(bookingResponses);
    }


    @GetMapping("/confirmation/{confirmationCode}")
    public ResponseEntity<?> getBookingByConfirmationCode(@PathVariable String confirmationCode) {
        try {
            BookedRoom booking = bookingSerivce.findByBookingConfirmationCode(confirmationCode);
            BookingResponse bookingResponse = getBookingResponse(booking);
            return ResponseEntity.ok(bookingResponse);
        } catch (ResourceNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    @GetMapping("/user/{email}/bookings")
    public ResponseEntity<List<BookingResponse>> getBookingsByUserEmail(@PathVariable String email) {
        List<BookedRoom> bookings = bookingSerivce.getBookingsByUserEmail(email);
        List<BookingResponse> bookingResponses = new ArrayList<>();
        for (BookedRoom booking : bookings) {
            BookingResponse bookingResponse = getBookingResponse(booking);
            bookingResponses.add(bookingResponse);
        }
        return ResponseEntity.ok(bookingResponses);
    }

    @PostMapping("/room/{roomId}/booking")
    public ResponseEntity<?> saveBooking(@PathVariable Long roomId,
                                        @RequestBody BookedRoom bookingRequest) {
        try {
            String confirmationCode = bookingSerivce.saveBooking(roomId,bookingRequest);
            return ResponseEntity.ok("Room booked successfully, Your booking confirmation code is :" + confirmationCode);
        } catch (InvalidBookingRequestException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/booking/{bookingId}/delete")
    public void cancelBooking(@PathVariable Long bookingId){
        bookingSerivce.cancelBooking(bookingId);
    }

    
    private BookingResponse getBookingResponse(BookedRoom booking) {
        Room theRoom = roomService.getRoomById(booking.getRoom().getId()).get();
        RoomResponse room  = new RoomResponse(
            theRoom.getId(),
            theRoom.getName(),
            theRoom.getDescription(),
            theRoom.getRoomType(),
            theRoom.getRoomPrice());
        return new BookingResponse(
            booking.getBookingId(), booking.getCheckInDate(),
            booking.getCheckOutDate(), booking.getGuestFullName(), 
            booking.getGuestEmail(), booking.getNumOfAdults(),
            booking.getNumOfChildren(), booking.getTotalNumOfGuest(), 
            booking.getBookingConfirmationCode(),room);
    }
}
