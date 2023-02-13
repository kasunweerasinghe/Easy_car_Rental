/**
 * created by kasun weerasinghe
 * Date: 2023-02-13
 * Time: 19:23
 * Project Name: Back_End
 */

package lk.ijse.spring.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class LoginDTO {
    private String loginId;
    private String username;
    private String password;
    private String role;
}
