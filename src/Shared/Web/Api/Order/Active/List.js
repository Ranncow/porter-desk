/**
 * The tmp endpoint to load all active orders from the back.
 */
// MODULE'S VARS
const NS = 'Porter_Desk_Shared_Web_Api_Order_Active_List';

// MODULE'S CLASSES
/**
 * @memberOf Porter_Desk_Shared_Web_Api_Order_Active_List
 */
class Request {
    static namespace = NS;
}

/**
 * @memberOf Porter_Desk_Shared_Web_Api_Order_Active_List
 */
class Response {
    static namespace = NS;
    /** @type {Porter_Base_Shared_Dto_Order.Dto[]} */
    items;
}

/**
 * @implements TeqFw_Web_Api_Shared_Api_Endpoint
 */
export default class Porter_Desk_Shared_Web_Api_Order_Active_List {
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
         * @param {Porter_Desk_Shared_Web_Api_Order_Active_List.Request} [data]
         * @return {Porter_Desk_Shared_Web_Api_Order_Active_List.Request}
         */
        this.createReq = function (data) {
            // create new DTO
            const res = new Request();
            // cast known attributes
            return res;
        };

        /**
         * @param {Porter_Desk_Shared_Web_Api_Order_Active_List.Response} [data]
         * @returns {Porter_Desk_Shared_Web_Api_Order_Active_List.Response}
         */
        this.createRes = function (data) {
            // create new DTO
            const res = new Response();
            // cast known attributes
            res.items = cast.arrayOfObj(data?.items, dtoOrder.createDto);
            return res;
        };
    }

}
