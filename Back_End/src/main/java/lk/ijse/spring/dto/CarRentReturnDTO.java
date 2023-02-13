/**
 * created by kasun weerasinghe
 * Date: 2023-02-13
 * Time: 19:22
 * Project Name: Back_End
 */

package lk.ijse.spring.dto;

import com.fasterxml.jackson.annotation.JsonFormat;

public class CarRentReturnDTO {
    private String returnId;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private String date;
    private double noOfKm;
    private CarRentDTO rental;
    private PaymentDTO payment;
}
