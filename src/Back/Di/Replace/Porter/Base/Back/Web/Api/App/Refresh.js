/**
 * The app-dependent service to request refreshing of the data from RDB.
 */
// MODULE'S CLASSES
/**
 * @implements TeqFw_Web_Api_Back_Api_Service
 */
export default class Porter_Desk_Back_Di_Replace_Porter_Base_Back_Web_Api_App_Refresh {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     * @param {Porter_Base_Shared_Web_Api_App_Refresh} endpoint
     * @param {Porter_Base_Back_Store_Mem_Order} storeOrder
     * @param {Porter_Base_Back_Store_Mem_ServerEvent_Stream} storeStream
     * @param {typeof Porter_Desk_Shared_Enum_App_ServerEvent_Type} SSE
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
            Porter_Base_Shared_Web_Api_App_Refresh$: endpoint,
            Porter_Base_Back_Store_Mem_Order$: storeOrder,
            Porter_Base_Back_Store_Mem_ServerEvent_Stream$: storeStream,
            Porter_Desk_Shared_Enum_App_ServerEvent_Type$: SSE,
        }
    ) {

        // INSTANCE METHODS

        this.getEndpoint = () => endpoint;

        this.init = async function () { };

        /**
         * @param {Porter_Base_Shared_Web_Api_App_Refresh.Request} req
         * @param {Porter_Base_Shared_Web_Api_App_Refresh.Response} res
         * @param {TeqFw_Web_Api_Back_Api_Service_Context} context
         * @returns {Promise<void>}
         */
        this.process = async function (req, res, context) {
            const rs = endpoint.createRes();
            try {
                const order = req.order;
                order.dateCreated = new Date();
                logger.info(`The new order is created: ${JSON.stringify(order)}`);
                // store the incoming order in memory
                storeOrder.add({order});
                // push the new order into all connected employees
                const all = storeStream.all();
                for (const one of all) {
                    one.write(order, SSE.REFRESH);
                }
                // respond to the callee
                rs.success = true;
                Object.assign(res, rs);
            } catch (error) {
                logger.exception(error);
            }
        };
    }

}
