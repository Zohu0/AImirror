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
import java.util.HashMap;
import java.util.Map;

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
    public ResponseEntity<Map<String, String>> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            byte[] blob = file.getInputStream().readAllBytes();

            // Call the service layer to save the image
            imageMetadataService.uploadImage(blob, file.getContentType());

            // Return a JSON response
            Map<String, String> response = new HashMap<>();
            response.put("message", "Image uploaded successfully.");
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (IOException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to upload image.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

}
