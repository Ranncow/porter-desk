/**
 * The endpoint to create a new permit on the back.
 */
// MODULE'S IMPORTS
import {randomUUID} from 'node:crypto';

// MODULE'S CLASSES
/**
 * @implements TeqFw_Web_Api_Back_Api_Service
 */
export default class Porter_Desk_Back_Web_Api_Room_Permit_Create {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     * @param {Porter_Desk_Shared_Web_Api_Room_Permit_Create} endpoint
     * @param {TeqFw_Db_Back_RDb_IConnect} conn
     * @param {TeqFw_Db_Back_Api_RDb_CrudEngine} crud
     * @param {Porter_Base_Back_Store_RDb_Schema_Room_Permit} rdbPermit
     * @param {Porter_Desk_Back_Convert_Room_Permit} convPermit
     * @param {Porter_Desk_Shared_Dto_Room_Permit} dtoPermit
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
            Porter_Desk_Shared_Web_Api_Room_Permit_Create$: endpoint,
            TeqFw_Db_Back_RDb_IConnect$: conn,
            TeqFw_Db_Back_Api_RDb_CrudEngine$: crud,
            Porter_Base_Back_Store_RDb_Schema_Room_Permit$: rdbPermit,
            Porter_Desk_Back_Convert_Room_Permit$: convPermit,
            Porter_Desk_Shared_Dto_Room_Permit$: dtoPermit,
        }
    ) {
        // VARS
        const A_PERMIT = rdbPermit.getAttributes();

        // INSTANCE METHODS

        this.getEndpoint = () => endpoint;

        this.init = async function () { };

        /**
         * @param {Porter_Desk_Shared_Web_Api_Room_Permit_Create.Request} req
         * @param {Porter_Desk_Shared_Web_Api_Room_Permit_Create.Response} res
         * @param {TeqFw_Web_Api_Back_Api_Service_Context} context
         * @returns {Promise<void>}
         */
        this.process = async function (req, res, context) {
            // FUNCS
            /**
             * Generate unique PIN in the (100000..999999) range.
             * @param {TeqFw_Db_Back_RDb_ITrans} trx
             * @return {Promise<number>}
             */
            async function generatePin(trx) {
                // FUNCS
                function getRandomNumber() {
                    const min = 100000;
                    const max = 999999;
                    return Math.floor(Math.random() * (max - min + 1)) + min;
                }

                // MAIN
                let res, found;
                do {
                    res = getRandomNumber();
                    const key = {[A_PERMIT.PIN]: res};
                    found = await crud.readOne(trx, rdbPermit, key);
                } while (found);
                return res;
            }

            // MAIN
            const rs = endpoint.createRes();
            const trx = await conn.startTransaction();
            try {
                const {dbPermit} = convPermit.share2rdb({permit: req.entity});
                dbPermit.pin = await generatePin(trx);
                dbPermit.uuid = randomUUID();
                const {[A_PERMIT.ID]: permitRef} = await crud.create(trx, rdbPermit, dbPermit);
                const found = await crud.readOne(trx, rdbPermit, permitRef);
                if (found) {
                    rs.entity = convPermit.rdb2share({dbPermit: found});
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
