/**
 * created by kasun weerasinghe
 * Date: 2023-02-13
 * Time: 19:27
 * Project Name: Back_End
 */

package lk.ijse.spring.controller;


import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.service.CustomerService;
import lk.ijse.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("api/v1/customer")
@CrossOrigin
public class CustomerController {

    @Autowired
    CustomerService service;

    @GetMapping
    public ResponseUtil getAllCustomers() {
        return new ResponseUtil(200, "Ok", service.getAllCustomers());
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public ResponseUtil saveCustomer(@RequestBody CustomerDTO dto) {
        System.out.println(dto.toString());
        service.saveCustomer(dto);
        return new ResponseUtil(200, "Saved", null);
    }

    @PutMapping
    public ResponseUtil updateCustomer(@RequestBody CustomerDTO dto) {
        System.out.println("In");
        service.updateCustomer(dto);
        return new ResponseUtil(200, "Updated", null);
    }

    @DeleteMapping(params = {"id"})
    public ResponseUtil deleteCustomer(@RequestParam String id) {
        service.deleteCustomer(id);
        return new ResponseUtil(200, "Deleted", null);
    }

    @GetMapping(path = "/{id}")
    public ResponseUtil searchCustomer(@PathVariable String id) {
        return new ResponseUtil(200, "Ok", service.searchCustomer(id));
    }

    @GetMapping(path = "/{username}/{password}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil searchCustomerByUsernameAndPassword(@PathVariable String username, @PathVariable String password) {
        if (service.findCustomerByUsername(username)) {
            if (service.findCustomerByPassword(password)) {
                return new ResponseUtil(200, "Login Successful", true);
            } else {
                return new ResponseUtil(404, "Incorrect Password", false);
            }
        } else {
            return new ResponseUtil(404, "Incorrect Username", false);
        }
    }

    @GetMapping(path = "/set/{username}/{password}")
    public ResponseUtil findCustomerByUsernameAndPassword(@PathVariable String username, @PathVariable String password) {
        return new ResponseUtil(200, "Ok", service.findCustomerByUsernameAndPassword(username, password));
    }

    @GetMapping(path = "/generateCustomerId")
    public ResponseUtil generateCustomerId() {
        return new ResponseUtil(200, "Ok", service.generateCustomerId());
    }

    @PutMapping(path = "/updateStatus/{id}")
    public ResponseUtil updateCustomerStatus(@PathVariable String id) {
        service.updateCustomerStatus(id);
        return new ResponseUtil(200, "Updated Status", null);
    }

    @GetMapping(path = "/pending")
    public ResponseUtil getAllPendingCustomers() {
        return new ResponseUtil(200, "Ok", service.getAllPendingCustomers());
    }

    @GetMapping(path = "/accepted")
    public ResponseUtil getAllAcceptedCustomers() {
        return new ResponseUtil(200, "Ok", service.getAllAcceptedCustomers());
    }

    @PutMapping(path = "/up/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseUtil uploadImagesAndPath(@RequestPart("nicf") MultipartFile nicf, @RequestPart("nicb") MultipartFile nicb, @RequestPart("licenceImg") MultipartFile licenceImg, @PathVariable String id) {
        try {
            String projectPath = String.valueOf(new File("/Users/kasunweerasinghe/Desktop/IJSE/AAD/CW/Easy_Car_Rental/Front_End/assets/savedImages"));
            File uploadsDir = new File(projectPath + "/Customers");
            uploadsDir.mkdir();

            nicf.transferTo(new File(uploadsDir.getAbsolutePath() + "//" + nicf.getOriginalFilename()));
            nicb.transferTo(new File(uploadsDir.getAbsolutePath() + "//" + nicb.getOriginalFilename()));
            licenceImg.transferTo(new File(uploadsDir.getAbsolutePath() + "//" + licenceImg.getOriginalFilename()));

            String nicfPath = projectPath + "//Customers//" + nicf.getOriginalFilename();
            String nicbPath = projectPath + "//Customers//" + nicb.getOriginalFilename();
            String licenceImgPath = projectPath + "//Customers//" + licenceImg.getOriginalFilename();

            service.uploadCustomerImages(nicfPath, nicbPath, licenceImgPath, id);

            return new ResponseUtil(200, "Uploaded", null);

        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseUtil(500, "Error", null);
        }
    }

    @GetMapping(path = "/count")
    public ResponseUtil getCountOfRegisteredCustomers() {
        return new ResponseUtil(200, "Ok", service.getCountOfCustomersRegistered());
    }

}
