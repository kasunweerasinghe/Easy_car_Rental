/**
 * created by kasun weerasinghe
 * Date: 2023-02-13
 * Time: 19:26
 * Project Name: Back_End
 */

package lk.ijse.spring.controller;

import lk.ijse.spring.dto.CarDTO;
import lk.ijse.spring.service.CarService;
import lk.ijse.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("api/v1/car")
@CrossOrigin
public class CarController {

    @Autowired
    CarService service;

    @GetMapping
    public ResponseUtil getAllCars() {
        return new ResponseUtil(200, "Ok", service.getAllCars());
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public ResponseUtil saveCar(@RequestBody CarDTO dto) {
        service.saveCar(dto);
        return new ResponseUtil(200, "Saved", null);
    }

    @PutMapping
    public ResponseUtil updateCar(@RequestBody CarDTO dto) {
        service.updateCar(dto);
        return new ResponseUtil(200, "Updated", null);
    }

    @DeleteMapping(params = {"registrationNo"})
    public ResponseUtil deleteCar(@RequestParam String registrationNo) {
        service.deleteCar(registrationNo);
        return new ResponseUtil(200, "deleted", null);
    }

    @GetMapping(path = "/{registrationNo}")
    public ResponseUtil searchCar(@PathVariable String registrationNo) {
        return new ResponseUtil(200, "Ok", service.searchCar(registrationNo));
    }

    @PutMapping(path = "/updateCarStatus/{registrationNO}/{status}")
    public ResponseUtil updateCarStatus(@PathVariable String registrationNO, @PathVariable String status) {
        service.updateCarStatus(registrationNO, status);
        return new ResponseUtil(200, "Ok", null);
    }

    @GetMapping(path = "/getByStatus/{status}")
    public ResponseUtil getAllCarsByStatus(@PathVariable String status) {
        return new ResponseUtil(200, "Ok", service.getAllCarsByStatus(status));
    }

    @GetMapping(path = "/count/{status}")
    public ResponseUtil getCountOfCarsByStatus(@PathVariable String status) {
        return new ResponseUtil(200, "Ok", service.getCountOfCarsByStatus(status));
    }

    @PutMapping(path = "/up/{registrationID}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseUtil uploadImagesAndPath(@RequestPart("frontImg") MultipartFile frontImg, @RequestPart("backImg") MultipartFile backImg, @RequestPart("interImg") MultipartFile interImg, @RequestPart("sideImg") MultipartFile sideImg, @PathVariable String registrationID) {
        try {

            String projectPath = String.valueOf(new File("/Users/kasunweerasinghe/Desktop/IJSE/AAD/CW/Easy_Car_Rental/Front_End/assets/savedImages"));
            File uploadsDir = new File(projectPath + "/Cars");
            uploadsDir.mkdir();


            frontImg.transferTo(new File(uploadsDir.getAbsolutePath() + "//" + frontImg.getOriginalFilename()));
            backImg.transferTo(new File(uploadsDir.getAbsolutePath() + "//" + backImg.getOriginalFilename()));
            interImg.transferTo(new File(uploadsDir.getAbsolutePath() + "//" + interImg.getOriginalFilename()));
            sideImg.transferTo(new File(uploadsDir.getAbsolutePath() + "//" + sideImg.getOriginalFilename()));


            String frontImgPath = projectPath + "//Cars//" + frontImg.getOriginalFilename();
            String backImgPath = projectPath + "//Cars//" + backImg.getOriginalFilename();
            String interImgPath = projectPath + "//Cars//" + interImg.getOriginalFilename();
            String sideImgPath = projectPath + "//Cars//" + sideImg.getOriginalFilename();


            service.updateCarFilePaths(frontImgPath, backImgPath, interImgPath, sideImgPath, registrationID);

            return new ResponseUtil(200, "Uploaded", null);

        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseUtil(500, "Error", null);
        }
    }

    @GetMapping(path = "/getRegNo/{type}")
    public ResponseUtil getCarRegistrationNoByType(@PathVariable String type) {
        return new ResponseUtil(200, "Ok", service.getCarRegistrationNumbersByType(type));
    }

}
