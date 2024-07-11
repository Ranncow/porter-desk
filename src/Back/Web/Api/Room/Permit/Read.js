/**
 * The endpoint to read one registration permit entity.
 *
 * @implements TeqFw_Web_Api_Back_Api_Service
 */
export default class Porter_Desk_Back_Web_Api_Room_Permit_Read {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     * @param {Porter_Desk_Shared_Web_Api_Room_Permit_Read} endpoint
     * @param {TeqFw_Db_Back_RDb_IConnect} conn
     * @param {Porter_Base_Back_Act_Room_Permit_Read} actRead
     * @param {Porter_Desk_Back_Convert_Room_Permit} convPermit
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
            Porter_Desk_Shared_Web_Api_Room_Permit_Read$: endpoint,
            TeqFw_Db_Back_RDb_IConnect$: conn,
            Porter_Base_Back_Act_Room_Permit_Read$: actRead,
            Porter_Desk_Back_Convert_Room_Permit$: convPermit,
        }
    ) {
        // INSTANCE METHODS

        this.getEndpoint = () => endpoint;

        this.init = async function () { };

        /**
         * @param {Porter_Desk_Shared_Web_Api_Room_Permit_Read.Request} req
         * @param {Porter_Desk_Shared_Web_Api_Room_Permit_Read.Response} res
         * @param {TeqFw_Web_Api_Back_Api_Service_Context} context
         * @returns {Promise<void>}
         */
        this.process = async function (req, res, context) {
            const rs = endpoint.createRes();
            const trx = await conn.startTransaction();
            try {
                const {dbPermit, dbRoom} = await actRead.act({trx, id: req.id});
                if (dbPermit.id) {
                    rs.entity = convPermit.rdb2share({dbPermit, dbRoom});
                    rs.success = true;
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
