package com.nguyenbaohoa.hotel.repository;

import java.util.*;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nguyenbaohoa.hotel.model.BookedRoom;


public interface BookedRoomRepository extends JpaRepository<BookedRoom, Long> {

    Optional<BookedRoom> findByBookingConfirmationCode(String confirmationCode);

    List<BookedRoom> findByRoomId(Long roomId);

    List<BookedRoom> findByGuestEmail(String email);

}
