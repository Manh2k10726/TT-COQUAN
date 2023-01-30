import { baseService } from './baseService';

class ManageUserService extends baseService {

    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    }

    login = (data) => {
        return this.post(`auth/realms/VIMC/protocol/openid-connect/token`,(data))
    }

}


export const manageUserService = new ManageUserService();