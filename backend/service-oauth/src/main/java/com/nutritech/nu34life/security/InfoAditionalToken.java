package com.nutritech.nu34life.security;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.TokenEnhancer;
import org.springframework.stereotype.Component;

import com.nutritech.nu34life.model.entity.Account;
import com.nutritech.nu34life.service.UserService;

@Component
public class InfoAditionalToken  implements TokenEnhancer{


	@Autowired
	private UserService userService;
	
	@Override
	public OAuth2AccessToken enhance(OAuth2AccessToken accessToken, OAuth2Authentication authentication) {
		Map<String, Object> info = new HashMap<String, Object>();
		
		Account user = userService.findByUsername(authentication.getName());
		info.put("email", user.getEmail());
		// ingrese cualquier atributo mas para mostrar en el token
		((DefaultOAuth2AccessToken) accessToken).setAdditionalInformation(info);
		
		return accessToken;
	}

}