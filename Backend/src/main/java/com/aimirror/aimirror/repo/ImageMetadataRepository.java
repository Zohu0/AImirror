package com.aimirror.aimirror.repo;

import com.aimirror.aimirror.model.ImageMetadata;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageMetadataRepository extends JpaRepository<ImageMetadata, Long> {
    // You can add custom query methods here if needed in the future
}
