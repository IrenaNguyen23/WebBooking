package com.nguyenbaohoa.hotel.service.impl;

import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.sql.rowset.serial.SerialBlob;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.nguyenbaohoa.hotel.exception.InternalServerException;
import com.nguyenbaohoa.hotel.exception.ResourceNotFoundException;
import com.nguyenbaohoa.hotel.model.Gallery;
import com.nguyenbaohoa.hotel.model.Room;
import com.nguyenbaohoa.hotel.repository.GalleryRepository;
import com.nguyenbaohoa.hotel.repository.RoomRepository;
import com.nguyenbaohoa.hotel.response.GalleryResponse;
import com.nguyenbaohoa.hotel.service.GalleryService;



import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class GalleryServiceImpl implements GalleryService {

    private final GalleryRepository galleryRepository;

    private final RoomRepository roomRepository;

    @Override
    public List<Gallery> getAllGalleries() {
        return galleryRepository.findAll();
    }

    @Override
    public void deleteGallery(Long galleryId) {
        Optional<Gallery> theGalley = galleryRepository.findById(galleryId);
        if(theGalley.isPresent()){
            galleryRepository.deleteById(galleryId);
        }
    }

    @Override
    public List<GalleryResponse> createGallery(List<MultipartFile> images, Long roomId) throws Exception {
        Room room = roomRepository.findById(roomId).orElseThrow(() -> new Exception("Room not found"));
        List<GalleryResponse> responses = new ArrayList<>();

        for (MultipartFile image : images) {
            Gallery gallery = new Gallery();
            gallery.setRoom(room);
            if (!image.isEmpty()) {
                byte[] photoBytes = image.getBytes();
                Blob photoBlob = new SerialBlob(photoBytes);
                gallery.setImage(photoBlob);
            }
            Gallery savedGallery = galleryRepository.save(gallery);
            responses.add(new GalleryResponse(savedGallery.getId(), savedGallery.getRoom()));
        }
        return responses;
    }

    @Override
    public byte[] getGalleriesByRoomId(Long id) throws SQLException {
        Optional<Gallery> theGallery = galleryRepository.findById(id);
        if(theGallery.isEmpty()){
            throw new ResourceNotFoundException("Sorry, Gallery not found!");
        }
        Blob photoBlob = theGallery.get().getImage();
        if(photoBlob != null)
        {
            return photoBlob.getBytes(1,(int)photoBlob.length());
        }
        return null;
    }

    @Override
    public Gallery updateGallery(Long id, byte[] photoBytes) {
        Gallery gallery = galleryRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Gallery not found"));
        if(photoBytes != null && photoBytes.length >0){
            try {
                gallery.setImage(new SerialBlob(photoBytes));
            } catch (SQLException ex) {
                throw new InternalServerException("Error updating gallery");
            }
        }
        return galleryRepository.save(gallery);
    }

    @Override
    public List<Gallery> getAllGalleriesByRoomId(Long roomId) {
        return galleryRepository.findByRoomId(roomId);
    }

}
