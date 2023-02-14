/**
 * created by kasun weerasinghe
 * Date: 2023-02-13
 * Time: 19:26
 * Project Name: Back_End
 */

package lk.ijse.spring.controller;

import lk.ijse.spring.dto.AdminDTO;
import lk.ijse.spring.service.AdminService;
import lk.ijse.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/admin")
@CrossOrigin
public class AdminController {

    @Autowired
    AdminService service;

    @GetMapping
    public ResponseUtil getAllAdmins() {
        return new ResponseUtil(200, "Ok", service.getAllAdmins());
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public ResponseUtil saveAdmin(@RequestBody AdminDTO dto) {
//        System.out.println(dto.toString());
        service.saveAdmin(dto);
        return new ResponseUtil(200, "Saved", null);
    }

    @PutMapping
    public ResponseUtil updateAdmin(@RequestBody AdminDTO dto) {
        service.updateAdmin(dto);
        return new ResponseUtil(200, "Updated", null);
    }

    @DeleteMapping(params = {"id"})
    public ResponseUtil deleteAdmin(@RequestParam String id) {
        service.deleteAdmin(id);
        return new ResponseUtil(200, "Deleted", null);
    }

    @GetMapping(path = "/{username}/{password}")
    public ResponseUtil searchAdminByUsernameAndPassword(@PathVariable String username, @PathVariable String password) {
        if (service.findAdminByUserName(username)) {
            if (service.findAdminByPassWord(password)) {
                return new ResponseUtil(200, "Login Successful", true);
            } else {
                return new ResponseUtil(404, "Incorrect Password", false);
            }
        } else {
            return new ResponseUtil(404, "Incorrect Username", false);
        }
    }

    @GetMapping(path = "/generateAdminID")
    public ResponseUtil generateAdminId() {
        return new ResponseUtil(200, "Ok", service.generateAdminId());
    }



}
