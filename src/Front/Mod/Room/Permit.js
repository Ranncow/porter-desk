/**
 * The model to encapsulate functionality related to the registration permits.
 * @implements Porter_Base_Front_Api_Model
 */
export default class Porter_Desk_Front_Mod_Room_Permit {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     * @param {TeqFw_Web_Api_Front_Web_Connect} api
     * @param {Porter_Desk_Shared_Web_Api_Room_Permit_Create} endCreate
     * @param {Porter_Desk_Shared_Dto_Room_Permit} dtoPermit
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
            TeqFw_Web_Api_Front_Web_Connect$: api,
            Porter_Desk_Shared_Web_Api_Room_Permit_Create$: endCreate,
            Porter_Desk_Shared_Dto_Room_Permit$: dtoPermit,
        }
    ) {
        // VARS

        // INSTANCE METHODS

        /**
         * @type {function(Porter_Desk_Shared_Dto_Room_Permit.Dto=): Porter_Desk_Shared_Dto_Room_Permit.Dto}
         */
        this.composeEntity = dtoPermit.createDto;

        this.composeItem = (data) => {throw new Error('Is not implemented yet.');};

        /**
         * @param {Porter_Desk_Shared_Dto_Room_Permit.Dto} entity
         * @return {Promise<Porter_Desk_Shared_Dto_Room_Permit.Dto>}
         */
        this.create = async function ({entity}) {
            try {
                const req = endCreate.createReq({entity});
                // noinspection JSValidateTypes
                /** @type {Porter_Desk_Shared_Web_Api_Room_Permit_Create.Response} */
                const rs = await api.send(req, endCreate);
                return rs?.entity;
            } catch (e) {
                logger.exception(e);
            }
            return undefined;
        };
    }


}
