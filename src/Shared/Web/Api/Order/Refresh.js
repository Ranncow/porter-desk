/**
 * The app-dependent service to request refreshing of the data from RDB.
 */
// MODULE'S VARS
const NS = 'Porter_Base_Shared_Web_Api_App_Refresh';

// MODULE'S CLASSES
/**
 * @memberOf Porter_Base_Shared_Web_Api_App_Refresh
 */
class Request {
    static namespace = NS;
    /**
     * This is TMP property to transmit order data in demo purposes.
     * @type {Porter_Base_Shared_Dto_Order.Dto}
     */
    order;
}

/**
 * @memberOf Porter_Base_Shared_Web_Api_App_Refresh
 */
class Response {
    static namespace = NS;
    /** @type {boolean} */
    success;
}

/**
 * @implements TeqFw_Web_Api_Shared_Api_Endpoint
 */
export default class Porter_Base_Shared_Web_Api_App_Refresh {
    /**
     * @param {TeqFw_Core_Shared_Util_Cast} cast
     * @param {Porter_Base_Shared_Dto_Order} dtoOrder
     */
    constructor(
        {
            TeqFw_Core_Shared_Util_Cast$: cast,
            Porter_Base_Shared_Dto_Order$: dtoOrder,
        }
    ) {
        // INSTANCE METHODS

        /**
         * @param {Porter_Base_Shared_Web_Api_App_Refresh.Request} [data]
         * @return {Porter_Base_Shared_Web_Api_App_Refresh.Request}
         */
        this.createReq = function (data) {
            // create new DTO
            const res = new Request();
            // cast known attributes
            res.order = dtoOrder.createDto(data?.order);
            return res;
        };

        /**
         * @param {Porter_Base_Shared_Web_Api_App_Refresh.Response} [data]
         * @returns {Porter_Base_Shared_Web_Api_App_Refresh.Response}
         */
        this.createRes = function (data) {
            // create new DTO
            const res = new Response();
            // cast known attributes
            res.success = cast.boolean(data?.success);
            return res;
        };
    }

}
