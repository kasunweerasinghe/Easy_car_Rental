/**
 * created by kasun weerasinghe
 * Date: 2023-02-13
 * Time: 19:28
 * Project Name: Back_End
 */

package lk.ijse.spring.controller;

import lk.ijse.spring.dto.LoginDTO;
import lk.ijse.spring.service.LoginService;
import lk.ijse.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/login")
@CrossOrigin
public class LoginController {
    @Autowired
    LoginService service;

    @GetMapping(path = "/getLastLogin")
    public ResponseUtil getLastLoginId(){
        LoginDTO dto = service.searchLogin(service.getLastLoginId());
        return new ResponseUtil(200,"done",dto);
    }

    @PostMapping
    public ResponseUtil saveLogin(@RequestBody LoginDTO dto){
        service.saveLogData(dto);
        return new ResponseUtil(200,"saved",null);
    }

    @GetMapping(path = "/generateLogId")
    public ResponseUtil generateLogId(){
        return new ResponseUtil(200,"ok",service.generateLoginId());
    }
}
