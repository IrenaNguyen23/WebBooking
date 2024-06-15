package com.nguyenbaohoa.hotel.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nguyenbaohoa.hotel.exception.InvalidBookingRequestException;
import com.nguyenbaohoa.hotel.exception.ResourceNotFoundException;
import com.nguyenbaohoa.hotel.model.BookedRoom;
import com.nguyenbaohoa.hotel.model.Room;
import com.nguyenbaohoa.hotel.repository.BookedRoomRepository;
import com.nguyenbaohoa.hotel.service.BookedRoomSerivce;
import com.nguyenbaohoa.hotel.service.RoomService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookedRoomServiceImpl implements BookedRoomSerivce{

    private final BookedRoomRepository bookingRepository;

    private final RoomService roomService;

    @Override
    public List<BookedRoom> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Override
    public List<BookedRoom> getBookingsByUserEmail(String email) {
        return bookingRepository.findByGuestEmail(email);
    }

    @Override
    public void cancelBooking(Long bookingId) {
        bookingRepository.deleteById(bookingId);
    }


    public List<BookedRoom> getAllBookingsByRoomId(Long roomId) {

       return bookingRepository.findByRoomId(roomId);
    }


    @Override
    public String saveBooking(Long roomId, BookedRoom bookingRequest) {
        if(bookingRequest.getCheckOutDate().isBefore(bookingRequest.getCheckInDate())){
            throw new InvalidBookingRequestException("Check-in Date must come before check-out Date");
        }
        Room room = roomService.getRoomById(roomId).get();
        List<BookedRoom> existingBookings = room.getBookings();
        boolean roomIsAvailable = roomIsAvailable(bookingRequest,existingBookings);
        if(roomIsAvailable){
            room.addBooking(bookingRequest);
            bookingRepository.save(bookingRequest);
        }else{
            throw new InvalidBookingRequestException("Sorry, This room is not available for the selected Dates;");
        }
       return bookingRequest.getBookingConfirmationCode();
    }

    @Override
    public BookedRoom findByBookingConfirmationCode(String confirmationCode) {
       return bookingRepository.findByBookingConfirmationCode(confirmationCode)
            .orElseThrow(() -> new ResourceNotFoundException("Not Found Booking with confirmation code:" +confirmationCode));
    }
    
    private boolean roomIsAvailable(BookedRoom bookingRequest, List<BookedRoom> existingBookings) {
        return existingBookings.stream().noneMatch(existingBooking ->
            // Kiểm tra xem có sự chồng lấp giữa khoảng thời gian của bookingRequest và existingBooking không
            (bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckOutDate()) &&
             bookingRequest.getCheckOutDate().isAfter(existingBooking.getCheckInDate()))
        );
    }
    
}
