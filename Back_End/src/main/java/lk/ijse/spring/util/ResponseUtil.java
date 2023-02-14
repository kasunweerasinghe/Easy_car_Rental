/**
 * created by kasun weerasinghe
 * Date: 2023-02-14
 * Time: 07:47
 * Project Name: Back_End
 */

package lk.ijse.spring.util;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class ResponseUtil {
    private int code;
    private String massage;
    private Object data;
}
