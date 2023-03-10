/**
 * created by kasun weerasinghe
 * Date: 2023-02-13
 * Time: 18:26
 * Project Name: Back_End
 */

package lk.ijse.spring.config;

import lk.ijse.spring.service.impl.AdminServiceImpl;
import lk.ijse.spring.service.impl.CustomerServiceImpl;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import({JPAConfig.class})
public class WebRootConfig {

}
