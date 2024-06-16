package com.nguyenbaohoa.hotel.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nguyenbaohoa.hotel.model.Gallery;

public interface GalleryRepository extends JpaRepository<Gallery, Long> {

    List<Gallery> findByRoomId(Long roomId);
}
