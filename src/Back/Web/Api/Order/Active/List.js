/**
 * The tmp endpoint to load all active orders from the back.
 */
// MODULE'S CLASSES
/**
 * @implements TeqFw_Web_Api_Back_Api_Service
 */
export default class Porter_Desk_Back_Web_Api_Order_Active_List {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     * @param {Porter_Desk_Shared_Web_Api_Order_Active_List} endpoint
     * @param {Porter_Base_Back_Store_Mem_Order} storeOrder
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
            Porter_Desk_Shared_Web_Api_Order_Active_List$: endpoint,
            Porter_Base_Back_Store_Mem_Order$: storeOrder,
        }
    ) {

        // INSTANCE METHODS

        this.getEndpoint = () => endpoint;

        this.init = async function () { };

        /**
         * @param {Porter_Desk_Shared_Web_Api_Order_Active_List.Request} req
         * @param {Porter_Desk_Shared_Web_Api_Order_Active_List.Response} res
         * @param {TeqFw_Web_Api_Back_Api_Service_Context} context
         * @returns {Promise<void>}
         */
        this.process = async function (req, res, context) {
            const rs = endpoint.createRes();
            try {
                rs.items = storeOrder.list();
                Object.assign(res, rs);
            } catch (error) {
                logger.exception(error);
            }
        };
    }

}
