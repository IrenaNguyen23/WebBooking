package com.nguyenbaohoa.hotel.service;

import com.nguyenbaohoa.hotel.model.Gallery;
import com.nguyenbaohoa.hotel.response.GalleryResponse;

import java.sql.SQLException;
import java.util.*;


import org.springframework.web.multipart.MultipartFile;

public interface GalleryService {
    public List<GalleryResponse> createGallery(List<MultipartFile> images, Long roomId) throws Exception;
    public List<Gallery> getAllGalleries();
    public void deleteGallery(Long galleryId);
    public byte[] getGalleriesByRoomId(Long id)throws SQLException;
    public Gallery updateGallery(Long id, byte[] photoBytes);
    List<Gallery> getAllGalleriesByRoomId(Long roomId);
}
