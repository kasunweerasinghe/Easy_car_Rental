/**
 * created by kasun weerasinghe
 * Date: 2023-02-13
 * Time: 18:42
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
public class Customer {
    @Id
    private String customerId;
    private String name;
    private String address;
    private int contactNo;
    private String email;
    private String nicNo;
    private String nicFrontImg;
    private String nicBackImg;
    private String licenceNo;
    private String licenceImg;
    private String username;
    private String password;
    private String status;

}
