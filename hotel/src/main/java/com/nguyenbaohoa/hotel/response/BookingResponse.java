package com.nguyenbaohoa.hotel.response;
import java.time.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class BookingResponse {
 
    private Long bookingId;

    private LocalDate checkIndate;

    private LocalDate checkOutdate;

    private String guestFullname;

    private String guestEmail;

    private int NumOfAdults;
    
    private int NumOfChildren;

    private int totalNumOfGuest;

    private String bookingConfirmationCode;

    private RoomResponse room;

    public BookingResponse(Long bookingId, LocalDate checkIndate, LocalDate checkOutdate,
            String bookingConfirmationCode) {
        this.bookingId = bookingId;
        this.checkIndate = checkIndate;
        this.checkOutdate = checkOutdate;
        this.bookingConfirmationCode = bookingConfirmationCode;
    }
    
}
