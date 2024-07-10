/**
 * The endpoint to load the list of rooms from the back.
 */
// MODULE'S CLASSES
/**
 * @implements TeqFw_Web_Api_Back_Api_Service
 */
export default class Porter_Desk_Back_Web_Api_Room_List {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     * @param {Porter_Desk_Shared_Web_Api_Room_List} endpoint
     * @param {TeqFw_Db_Back_RDb_IConnect} conn
     * @param {TeqFw_Db_Back_Api_RDb_CrudEngine} crud
     * @param {Porter_Base_Back_Store_RDb_Schema_Room} rdbRoom
     * @param {Porter_Desk_Shared_Dto_Room_List_Item} dtoItem
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
            Porter_Desk_Shared_Web_Api_Room_List$: endpoint,
            TeqFw_Db_Back_RDb_IConnect$: conn,
            TeqFw_Db_Back_Api_RDb_CrudEngine$: crud,
            Porter_Base_Back_Store_RDb_Schema_Room$: rdbRoom,
            Porter_Desk_Shared_Dto_Room_List_Item$: dtoItem,
        }
    ) {

        // INSTANCE METHODS

        this.getEndpoint = () => endpoint;

        this.init = async function () { };

        /**
         * @param {Porter_Desk_Shared_Web_Api_Room_List.Request} req
         * @param {Porter_Desk_Shared_Web_Api_Room_List.Response} res
         * @param {TeqFw_Web_Api_Back_Api_Service_Context} context
         * @returns {Promise<void>}
         */
        this.process = async function (req, res, context) {
            const rs = endpoint.createRes();
            const trx = await conn.startTransaction();
            try {
                // we have the same structure for list item and the stored entity
                const all = await crud.readSet(trx, rdbRoom);
                rs.items = [];
                for (const one of all) {
                    rs.items.push(dtoItem.createDto(one));
                }
                await trx.commit();
                Object.assign(res, rs); // compose the response after the commit
            } catch (error) {
                logger.exception(error);
                await trx.rollback();
            }
        };
    }

}
