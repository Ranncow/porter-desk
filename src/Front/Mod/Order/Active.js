/**
 * The model to encapsulate functionality related to the active orders.
 */
export default class Porter_Desk_Front_Mod_Order_Active {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     * @param {TeqFw_Web_Api_Front_Web_Connect} api
     * @param {Porter_Desk_Shared_Web_Api_Order_Active_List} endList
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
            TeqFw_Web_Api_Front_Web_Connect$: api,
            Porter_Desk_Shared_Web_Api_Order_Active_List$: endList,
        }
    ) {
        // VARS

        // INSTANCE METHODS

        /**
         * @return {Promise<Porter_Base_Shared_Dto_Order.Dto[]>}
         */
        this.list = async function () {
            try {
                const req = endList.createReq();
                // noinspection JSValidateTypes
                /** @type {Porter_Desk_Shared_Web_Api_Order_Active_List.Response} */
                const rs = await api.send(req, endList);
                return rs?.items || [];
            } catch (e) {
                logger.exception(e);
            }
            return [];
        };
    }
}
