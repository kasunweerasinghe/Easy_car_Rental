/**
 * created by kasun weerasinghe
 * Date: 2023-02-13
 * Time: 18:39
 * Project Name: Back_End
 */

package lk.ijse.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
@Entity
public class CarRent {

    @Id
    private String rentId;

    private String date;
    private String pickUpDate;
    private String returnDate;
    private String status;
}
