/**
 * created by kasun weerasinghe
 * Date: 2023-02-13
 * Time: 19:22
 * Project Name: Back_End
 */

package lk.ijse.spring.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class CarRentDTO {
    private String rentId;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private String date;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private String pickUpDate;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private String returnDate;
    private String status;
    private CustomerDTO customer;
    private CarDTO car;
    private DriverDTO driver;
}
