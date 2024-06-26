package com.nguyenbaohoa.hotel.service.impl;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import javax.sql.rowset.serial.SerialBlob;
import javax.sql.rowset.serial.SerialException;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.nguyenbaohoa.hotel.exception.InternalServerException;
import com.nguyenbaohoa.hotel.exception.ResourceNotFoundException;
import com.nguyenbaohoa.hotel.model.Room;
import com.nguyenbaohoa.hotel.repository.RoomRepository;
import com.nguyenbaohoa.hotel.service.RoomService;

import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {
    private final RoomRepository roomRepository;

    @Override
    public Room addNewRoom(MultipartFile file, String roomType, BigDecimal roomPrice, String name, String description) throws IOException, SerialException, SQLException {
        Room room = new Room();
        room.setRoomType(roomType);
        room.setRoomPrice(roomPrice);
        room.setName(name);
        room.setDescription(description);
        if (!file.isEmpty()) {
            byte[] photoBytes = file.getBytes();
            Blob photoBlob = new SerialBlob(photoBytes);
            room.setPhoto(photoBlob);
        }
        return roomRepository.save(room);
    }

    @Override
    public List<String> getAllRoomTypes() {
       return roomRepository.findDistinctRoomTypes();
    }

    @Override
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    @Override
    public byte[] getRoomPhotoByRoomId(Long roomId) throws SQLException {
        Optional<Room> theRoom = roomRepository.findById(roomId);
        if(theRoom.isEmpty()){
            throw new ResourceNotFoundException("Sorry, Room not found!");
        }
        Blob photoBlob = theRoom.get().getPhoto();
        if(photoBlob != null)
        {
            return photoBlob.getBytes(1,(int)photoBlob.length());
        }
        return null;
    }

    @Override
    public void deleteRoom(Long roomId) {
        Optional<Room> theRoom = roomRepository.findById(roomId);
        if(theRoom.isPresent()){
            roomRepository.deleteById(roomId);
        }
    }

    @Override
    public Room updateRoom(Long roomId, String name, String description, String roomType, BigDecimal roomPrice, byte[] photoBytes) {
        Room room = roomRepository.findById(roomId).orElseThrow(()-> new ResourceNotFoundException("Room not found"));
        if(name != null) room.setName(name);
        if(description != null) room.setDescription(description);
        if(roomType != null) room.setRoomType(roomType);
        if(roomPrice != null) room.setRoomPrice(roomPrice);
        if(photoBytes != null && photoBytes.length >0){
            try {
                room.setPhoto(new SerialBlob(photoBytes));
            } catch (SQLException ex) {
                throw new InternalServerException("Error updating room");
            }
        }
        return roomRepository.save(room);
    }

    @Override
    public Optional<Room> getRoomById(Long roomId) {
        return Optional.of(roomRepository.findById(roomId).get());
    }

    @Override
    public List<Room> getAvailableRooms(LocalDate checkInDate, LocalDate checkOutDate, String roomType) {
       return roomRepository.findAvailableRoomsByDatesAndType(checkInDate,checkOutDate,roomType);
    }

    @Override
    public Room findById(Long id) {
        Optional<Room> room = roomRepository.findById(id);
        return room.orElseThrow(() -> new RuntimeException("Room not found with id: " + id));
    }

    @Override
    public List<Room> getRoomByRoomId(Long id) {
        return roomRepository.findRoomById(id);
    }
}
