/**
 * created by kasun weerasinghe
 * Date: 2023-02-13
 * Time: 19:23
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
public class MaintenanceDTO {
    private String maintenanceId;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private String date;
    private String details;
    private CarDTO car;
    private double cost;
}
