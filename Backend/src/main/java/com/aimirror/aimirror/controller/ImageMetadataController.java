package com.aimirror.aimirror.controller;

import com.aimirror.aimirror.service.ImageMetadataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;

@RestController
@RequestMapping("/api/images")
public class ImageMetadataController {

    @RequestMapping("/home")
    public String Hello(){
        return "Hello World";
    }

    @Autowired
    private ImageMetadataService imageMetadataService;

    // Endpoint for uploading image
    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            // Convert MultipartFile to Blob
            byte[] blob = file.getInputStream().readAllBytes();

            // Call the service layer to save the image
            imageMetadataService.uploadImage(blob, file.getContentType());

            return ResponseEntity.status(HttpStatus.CREATED).body("Image uploaded successfully.");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload image.");
        }
    }
}
