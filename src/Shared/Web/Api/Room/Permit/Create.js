/**
 * Create new permit to register a visit.
 */
// MODULE'S VARS
const NS = 'Porter_Desk_Shared_Web_Api_Room_Permit_Create';

// MODULE'S CLASSES
/**
 * @memberOf Porter_Desk_Shared_Web_Api_Room_Permit_Create
 */
class Request {
    static namespace = NS;
    /**
     * @type {Porter_Desk_Shared_Dto_Room_Permit.Dto}
     */
    entity;
}

/**
 * @memberOf Porter_Desk_Shared_Web_Api_Room_Permit_Create
 */
class Response {
    static namespace = NS;
    /**
     * @type {Porter_Desk_Shared_Dto_Room_Permit.Dto}
     */
    entity;
    /**
     * @type {boolean}
     */
    success;
}

/**
 * @implements TeqFw_Web_Api_Shared_Api_Endpoint
 */
export default class Porter_Desk_Shared_Web_Api_Room_Permit_Create {
    /**
     * @param {TeqFw_Core_Shared_Util_Cast} cast
     * @param {Porter_Desk_Shared_Dto_Room_Permit} dtoEntity
     */
    constructor(
        {
            TeqFw_Core_Shared_Util_Cast$: cast,
            Porter_Desk_Shared_Dto_Room_Permit$: dtoEntity,
        }
    ) {
        // INSTANCE METHODS

        /**
         * @param {Porter_Desk_Shared_Web_Api_Room_Permit_Create.Request} [data]
         * @return {Porter_Desk_Shared_Web_Api_Room_Permit_Create.Request}
         */
        this.createReq = function (data) {
            // create new DTO
            const res = new Request();
            // cast known attributes
            res.entity = dtoEntity.createDto(data?.entity);
            return res;
        };

        /**
         * @param {Porter_Desk_Shared_Web_Api_Room_Permit_Create.Response} [data]
         * @returns {Porter_Desk_Shared_Web_Api_Room_Permit_Create.Response}
         */
        this.createRes = function (data) {
            // create new DTO
            const res = new Response();
            // cast known attributes
            res.entity = dtoEntity.createDto(data?.entity);
            res.success = cast.boolean(data?.success);
            return res;
        };
    }

}
