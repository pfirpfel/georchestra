Ext.namespace("GEOR");

//TODO a supprimer lorsque la nouvelle gestion du loin par header sera mise en place par geobuilder
/*
GEOR.geobuilder_connection = function (mapPanel, idProfil, isReconnect) {
	console.log('Login with profile %s', idProfil)
	// Connect to geobuilder server and create session + token for authentication
    Ext.Ajax.request
    ({
        url: GEOR.config.GEOBUILDER_URL + "cfm/q_gentoken.cfm",
    	method: 'GET',
        params: {
        	login: 'lud',
        	password: 'lud',
        	site: '1'
        },
        success: function(response)
        {
        	var data = Ext.util.JSON.decode(response.responseText);
        	if (data && data.data && data.data.token) {
	        	var token = data.data.token;
	        	var url = GEOR.config.GEOBUILDER_URL + GEOR.config.GEOBUILDER_CFM_LOGIN;
	        	
	        	var params = {token: token};
	        	
	        	if (idProfil) {  
	        		//On passe unqiuement le trigramme a geobuilder
	        		var profils = idProfil.split(GEOR.config.GEOBUILDER_GROUPE_LDAP);
	        		if (profils.length === 2) {
	        			params.propro = profils[1];
	        		}
	        	}
	        	
	            Ext.Ajax.request
	            ({
	                url: url,
	                method: 'GET',
	                params: params,
	                success: function (response) {
	                	
	                	//Si on se reconnecte, il faut supprimer le menu geobuilder et le tab panel geobuilder
	                	if (isReconnect) {
	                		GEOR.geobuilder_destroyMenu(mapPanel);
	                		GEOR.geobuilder_destroyGeobuilderTab();
	                	}
	                	
	                    // Appel de la fonction d'init du menu geobuilder dans la toolbar
	                    GEOR.geobuilder_initMenu(mapPanel);
	                    
	                    //Dans le cas d'une reconnexion, on ne rappelle pas la liste des modules et le chargement des iframes
	                    if (!isReconnect) {
		                    // Appel de la fonction d'init de la liste des modules geobuilder dans la toolbar
		                    GEOR.geobuilder_initListeModule(mapPanel);
		
		                	// Load all 5 IFRAMEs for geobuilder to use
		                	GEOR.geobuilder_loadIFRAMES();
	                    }
	                	return true;
	                },
	                failure: function (response) {
	                	console.log(response.responseText);
	                	return false;
	                }
	            });
	            
        	} else {
        		console.log(tr("Aucune réponse lors de l'appel de la génération du token"));
        	}
        },
        failure: function(response)
        {
            console.log(response.responseText);
            return false;
        }
    });
	
};
*/

//TODO a mettre à place de l'autre méthode lorsque la nouvelle gestion du loin par header sera mise en place par geobuilder
GEOR.geobuilder_connection = function (mapPanel, idProfil, isReconnect) {
	// Connect to geobuilder server and create session 
    var url = GEOR.config.GEOBUILDER_URL + GEOR.config.GEOBUILDER_CFM_LOGIN;
	
	var params = {site: 1};
	
	if (idProfil) {  
		//On passe unqiuement le trigramme a geobuilder
		var profils = idProfil.split(GEOR.config.GEOBUILDER_GROUPE_LDAP);
		if (profils.length === 2) {
			params.idPro = profils[1];
		}
	}
	
    Ext.Ajax.request
    ({
        url: url,
        method: 'GET',
        params: params,
        headers: {
        	Accept: 'application/json'
        },
        success: function (response) {
        	
        	//Si on se reconnecte, il faut supprimer le menu geobuilder et le tab panel geobuilder
        	if (isReconnect) {
        		GEOR.geobuilder_destroyMenu(mapPanel);
        		GEOR.geobuilder_destroyGeobuilderTab();
        	}
        	
            // Appel de la fonction d'init du menu geobuilder dans la toolbar
            GEOR.geobuilder_initMenu(mapPanel);
            
            //Dans le cas d'une reconnexion, on ne rappelle pas la liste des modules et le chargement des iframes
            if (!isReconnect) {
                // Appel de la fonction d'init de la liste des modules geobuilder dans la toolbar
                GEOR.geobuilder_initListeModule(mapPanel);

            	// Load all 5 IFRAMEs for geobuilder to use
            	GEOR.geobuilder_loadIFRAMES();
            }
        	return true;
        },
        failure: function (response) {
        	console.log(response.responseText);
        	return false;
        }
    });
	
};