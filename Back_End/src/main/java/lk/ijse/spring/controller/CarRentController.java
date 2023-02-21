/**
 * created by kasun weerasinghe
 * Date: 2023-02-13
 * Time: 19:27
 * Project Name: Back_End
 */

package lk.ijse.spring.controller;

import lk.ijse.spring.dto.CarRentDTO;
import lk.ijse.spring.service.CarRentService;
import lk.ijse.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/CarRent")
@CrossOrigin
public class CarRentController {
    @Autowired
    CarRentService service;

    @GetMapping
    public ResponseUtil getAllCarRents() {
        return new ResponseUtil(200, "Ok", service.getAllCarRents());
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public ResponseUtil addCarRent(@RequestBody CarRentDTO dto) {
        System.out.println(dto.toString());
        service.addCarRent(dto);
        return new ResponseUtil(200, "Saved", null);
    }

    @PutMapping
    public ResponseUtil updateCarRent(@RequestBody CarRentDTO dto) {
        service.updateCarRent(dto);
        return new ResponseUtil(200, "Updated", null);
    }

    @DeleteMapping(params = {"rentId"})
    public ResponseUtil deleteCarRent(@RequestParam String rentId) {
        service.deleteCarRent(rentId);
        return new ResponseUtil(200, "Deleted", null);
    }

    @GetMapping(path = "/{rentId}")
    public ResponseUtil searchCarRent(@PathVariable String rentId) {
        return new ResponseUtil(200, "Ok", service.searchCarRent(rentId));
    }

    @PutMapping(path = "/{rentId}/{status}")
    public ResponseUtil updateCarRentStatus(@PathVariable String rentId, @PathVariable String status) {
        service.updateCarRentStatus(rentId, status);
        return new ResponseUtil(200, "Ok", null);
    }

    @GetMapping(path = "/get/{status}")
    public ResponseUtil getAllCarRentsByStatus(@PathVariable String status) {
        return new ResponseUtil(200, "Ok", service.getCarRentsByStatus(status));
    }

    @GetMapping(path = "/getCarRents/{status}/{licenceNo}")
    public ResponseUtil getAllCarRentsByDrivingLicence(@PathVariable String status, @PathVariable String licenceNo) {
        return new ResponseUtil(200, "Ok", service.getCarRentsByDrivingLicenceNo(status, licenceNo));
    }

    @GetMapping(path = "/generateRentId")
    public ResponseUtil generateRentId() {
        return new ResponseUtil(200, "Ok", service.generateRentId());
    }

    @GetMapping(path = "/countTodayBookings/{today}")
    public ResponseUtil getTodayBookingCount(@PathVariable String today) {
        System.out.println(today);
        return new ResponseUtil(200, "Ok", service.getTodayBookingCount(today));
    }

    @GetMapping(path = "/getTodayBookings/{today}")
    public ResponseUtil getTodayBookings(@PathVariable String today) {
        return new ResponseUtil(200, "Ok", service.getTodayBookings(today));
    }

    @GetMapping(path = "/getMyCarRents/{customerId}")
    public ResponseUtil getMyCarRents(@PathVariable String customerId) {
        return new ResponseUtil(200, "Ok", service.getCarRentsByCustomerId(customerId));
    }
}
