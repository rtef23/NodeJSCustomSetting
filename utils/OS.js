var Promise = require('bluebird');
var os = require('os');

//return server ip address
exports.getIP = function(mode){
	return new Promise(function(resolved, rejected){
		if(!mode)
			return rejected('invalid mode');
		if(typeof mode != 'string')
			return rejected('invalid mode');
		switch(mode.toLowerCase()){
			case 'ipv4':
			{
				var ifaces = os.networkInterfaces();
				for(var i in ifaces){
					ifaces[i].forEach(function(det){
						if(det.family == 'IPv4' && det.internal === false){
							return resolved(det.address);
						}
					});
				}
			}
			break;
			case 'ipv6':
			{
				var ifaces = os.networkInterfaces();
				for(var i in ifaces){
					ifaces[i].forEach(function(det){
						if(det.family == 'IPv6' && det.internal === false){
							return resolved(det.address);
						}
					});
				}
			}
			break;
			default :
			{
				return rejected('unsupported mode');
			}
			break;
		}
	});
};
