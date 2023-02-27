/**
 * created by kasun weerasinghe
 * Date: 2023-02-13
 * Time: 19:28
 * Project Name: Back_End
 */

package lk.ijse.spring.controller;

import lk.ijse.spring.dto.MaintenanceDTO;
import lk.ijse.spring.service.MaintenanceService;
import lk.ijse.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/maintenance")
@CrossOrigin
public class MaintenanceController {
    @Autowired
    MaintenanceService service;

    @GetMapping
    public ResponseUtil getAllMaintenance() {
        return new ResponseUtil(200, "Ok", service.getAllMaintenances());
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public ResponseUtil addMaintenance(@RequestBody MaintenanceDTO dto) {
        System.out.println(dto.toString());
        service.addMaintenance(dto);
        return new ResponseUtil(200, "Saved", null);
    }

    @PutMapping
    public ResponseUtil updateMaintenance(@RequestBody MaintenanceDTO dto) {
        service.updateMaintenance(dto);
        return new ResponseUtil(200, "Updated", null);
    }

    @DeleteMapping(params = {"maintenanceId"})
    public ResponseUtil deleteMaintenance(@RequestParam String maintenanceId) {
        service.deleteMaintenance(maintenanceId);
        return new ResponseUtil(200, "Deleted", null);
    }

    @GetMapping(path = "/{maintenanceId}")
    public ResponseUtil searchMaintenance(@PathVariable String maintenanceId) {
        return new ResponseUtil(200, "Ok", service.searchMaintenance(maintenanceId));
    }

    @GetMapping(path = "/generateMaintenanceId")
    public ResponseUtil generateMaintenanceId() {
        return new ResponseUtil(200, "Ok", service.generateMaintenanceId());
    }

    @PutMapping(path = "/{maintenanceId}/{cost}")
    public ResponseUtil updateMaintenanceCost(@PathVariable String maintenanceId, @PathVariable double cost) {
        service.updateMaintenanceCost(maintenanceId, cost);
        return new ResponseUtil(200, "Updated", null);
    }

    @GetMapping(path = "/underMaintenances")
    public ResponseUtil getAllUnderMaintenances() {
        return new ResponseUtil(200, "Ok", service.getAllUnderMaintenances());
    }

    @GetMapping(path = "/getAll/{fromDate}/{toDate}")
    public ResponseUtil getAllMaintenancesByDateRange(@PathVariable String fromDate, @PathVariable String toDate) {
        return new ResponseUtil(200, "Ok", service.getAllMaintenancesByDateRange(fromDate, toDate));
    }

    @GetMapping(path = "/sum/{fromDate}/{toDate}")
    public ResponseUtil getSumOfMaintenanceAmount(@PathVariable String fromDate, @PathVariable String toDate) {
        return new ResponseUtil(200, "Ok", service.getSumOfMaintenanceAmount(fromDate, toDate));
    }
}
