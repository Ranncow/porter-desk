/**
 * Get the list of all rooms from the backend.
 */
// MODULE'S VARS
const NS = 'Porter_Desk_Shared_Web_Api_Room_List';

// MODULE'S CLASSES
/**
 * @memberOf Porter_Desk_Shared_Web_Api_Room_List
 */
class Request {
    static namespace = NS;
}

/**
 * @memberOf Porter_Desk_Shared_Web_Api_Room_List
 */
class Response {
    static namespace = NS;
    /**
     * @type {Porter_Desk_Shared_Dto_Room_List_Item.Dto[]}
     */
    items;
}

/**
 * @implements TeqFw_Web_Api_Shared_Api_Endpoint
 */
export default class Porter_Desk_Shared_Web_Api_Room_List {
    /**
     * @param {TeqFw_Core_Shared_Util_Cast} cast
     * @param {Porter_Desk_Shared_Dto_Room_List_Item} dtoItem
     */
    constructor(
        {
            TeqFw_Core_Shared_Util_Cast$: cast,
            Porter_Desk_Shared_Dto_Room_List_Item$: dtoItem,
        }
    ) {
        // INSTANCE METHODS

        /**
         * @param {Porter_Desk_Shared_Web_Api_Room_List.Request} [data]
         * @return {Porter_Desk_Shared_Web_Api_Room_List.Request}
         */
        this.createReq = function (data) {
            // create new DTO
            const res = new Request();
            // cast known attributes
            return res;
        };

        /**
         * @param {Porter_Desk_Shared_Web_Api_Room_List.Response} [data]
         * @returns {Porter_Desk_Shared_Web_Api_Room_List.Response}
         */
        this.createRes = function (data) {
            // create new DTO
            const res = new Response();
            // cast known attributes
            res.items = cast.arrayOfObj(data?.items, dtoItem.createDto);
            return res;
        };
    }

}
