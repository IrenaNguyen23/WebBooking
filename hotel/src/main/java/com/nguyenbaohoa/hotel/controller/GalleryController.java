package com.nguyenbaohoa.hotel.controller;

import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.sql.rowset.serial.SerialBlob;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.nguyenbaohoa.hotel.exception.PhotoRetrievalException;
import com.nguyenbaohoa.hotel.model.Gallery;
import com.nguyenbaohoa.hotel.response.GalleryResponse;
import com.nguyenbaohoa.hotel.service.GalleryService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/galleries")
public class GalleryController {
    private final GalleryService galleryService;

    @PostMapping("/add/gallery")
    //@PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<GalleryResponse>> createGallery(
            @RequestParam("images") List<MultipartFile> images,
            @RequestParam("roomId") Long roomId) throws Exception {

        List<GalleryResponse> responses = galleryService.createGallery(images, roomId);
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/all-galleries")
    public ResponseEntity<List<GalleryResponse>> getAllGalleries() throws SQLException {
        List<Gallery> galleries = galleryService.getAllGalleries();
        List<GalleryResponse> galleryResponses = new ArrayList<>();
        for (Gallery gallery : galleries) {
            byte[] photoBytes = galleryService.getGalleriesByRoomId(gallery.getId());
            if (photoBytes != null && photoBytes.length > 0) {
                String base64Photo = Base64.encodeBase64String(photoBytes);
                GalleryResponse galleryResponse = getGalleryResponse(gallery);
                galleryResponse.setImage(base64Photo);
                galleryResponses.add(galleryResponse);
            }
        }
        return ResponseEntity.ok(galleryResponses);
    }

    @PutMapping("/update/gallery/{id}")
    //@PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<GalleryResponse> updateGallery(
            @PathVariable Long id,
            @RequestParam(required = false) MultipartFile image) throws Exception {
        byte[] photoBytes = image != null && !image.isEmpty() ? image.getBytes()
                : galleryService.getGalleriesByRoomId(id);
        Blob photoBlob = photoBytes != null && photoBytes.length > 0 ? new SerialBlob(photoBytes) : null;
        Gallery theGallery = galleryService.updateGallery(id, photoBytes);
        theGallery.setImage(photoBlob);
        GalleryResponse galleryResponse = getGalleryResponse(theGallery);
        return ResponseEntity.ok(galleryResponse);
    }

    @DeleteMapping("/delete/gallery/{id}")
    //@PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Void> deleteGallery(@PathVariable Long id) {
        galleryService.deleteGallery(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    private GalleryResponse getGalleryResponse(Gallery gallery) {
        byte[] photoBytes = null;
        Blob photoBlob = gallery.getImage();
        if (photoBlob != null) {
            try {
                photoBytes = photoBlob.getBytes(1, (int) photoBlob.length());
            } catch (SQLException e) {
                throw new PhotoRetrievalException("Error retrieving photo");
            }
        }
        return new GalleryResponse(gallery.getId(), photoBytes, gallery.getRoom());
    }
}
