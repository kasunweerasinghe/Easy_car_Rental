/**
 * created by kasun weerasinghe
 * Date: 2023-02-13
 * Time: 19:28
 * Project Name: Back_End
 */

package lk.ijse.spring.controller;

import lk.ijse.spring.dto.PaymentDTO;
import lk.ijse.spring.service.PaymentService;
import lk.ijse.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/payment")
@CrossOrigin
public class PaymentController {
    @Autowired
    PaymentService service;

    @GetMapping
    public ResponseUtil getAllPayments() {
        return new ResponseUtil(200, "Ok", service.getAllPayments());
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public ResponseUtil savePayment(@RequestBody PaymentDTO dto) {
        System.out.println(dto.toString());
        service.savePayment(dto);
        return new ResponseUtil(200, "Saved", null);
    }

    @PutMapping
    public ResponseUtil updatePayment(@RequestBody PaymentDTO dto) {
        service.updatePayment(dto);
        return new ResponseUtil(200, "Updated", null);
    }

    @DeleteMapping(params = {"paymentId"})
    public ResponseUtil deletePayment(@RequestParam String paymentId) {
        service.deletePayment(paymentId);
        return new ResponseUtil(200, "Deleted", null);
    }

    @GetMapping(path = "/{paymentId}")
    public ResponseUtil searchPayment(@PathVariable String paymentId) {
        return new ResponseUtil(200, "Ok", service.searchPayment(paymentId));
    }

    @GetMapping(path = "/{fromDate}/{toDate}")
    public ResponseUtil getAllPaymentsByDateRange(@PathVariable String fromDate, @PathVariable String toDate) {
        System.out.println(fromDate + "/" + toDate);
        return new ResponseUtil(200, "Ok", service.getAllPaymentsByDateRange(fromDate, toDate));
    }

    @GetMapping(path = "/getAll/{customerId}")
    public ResponseUtil getAllPaymentsByCustomerId(@PathVariable String customerId) {
        return new ResponseUtil(200, "Ok", service.getAllPaymentsByCustomerId(customerId));
    }

    @GetMapping(path = "/generatePaymentId")
    public ResponseUtil generatePaymentId() {
        return new ResponseUtil(200, "Ok", service.generatePaymentId());
    }

    @DeleteMapping(path = "/delete/{rentId}")
    public ResponseUtil deletePaymentByRentId(@PathVariable String rentId) {
        service.deletePaymentByRentId(rentId);
        return new ResponseUtil(200, "deleted", null);
    }

    @GetMapping(path = "/calculatePaidPayment/{rentId}")
    public ResponseUtil calculatePaidPayment(@PathVariable String rentId) {
        return new ResponseUtil(200, "Ok", service.calculatePaidPayments(rentId));
    }

    @GetMapping(path = "/getSum/{fromDate}/{toDate}")
    public ResponseUtil getSumOfPaymentsCost(@PathVariable String fromDate, @PathVariable String toDate) {
        return new ResponseUtil(200, "Ok", service.getSumOfPaymentsByDateRange(fromDate, toDate));
    }
}
