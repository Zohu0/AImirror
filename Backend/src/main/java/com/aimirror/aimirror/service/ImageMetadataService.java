package com.aimirror.aimirror.service;

import com.aimirror.aimirror.model.ImageMetadata;
import com.aimirror.aimirror.repo.ImageMetadataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;

@Service
public class ImageMetadataService {

    @Autowired
    private ImageMetadataRepository imageMetadataRepository;

    // Method to save image to database
    public ImageMetadata uploadImage(byte[] imageData, String imageType) throws IOException {
        ImageMetadata imageMetadata = new ImageMetadata();
        imageMetadata.setType(imageType);
        imageMetadata.setData(imageData);
        imageMetadata.setUploadedAt(LocalDateTime.now());

        return imageMetadataRepository.save(imageMetadata);
    }

    // Additional business logic can be added as needed
}
