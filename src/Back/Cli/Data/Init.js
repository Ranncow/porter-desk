/**
 * Init the demo/dev data in empty RDB.
 *
 * @namespace Porter_Desk_Back_Cli_Data_Init
 */
// MODULE'S VARS
const NS = 'Porter_Desk_Back_Cli_Data_Init';

// MODULE'S FUNCTIONS
/**
 * Factory to create CLI command.
 *
 * @param {Porter_Desk_Back_Defaults} DEF
 * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
 * @param {TeqFw_Core_Back_Api_Dto_Command.Factory} fCommand
 * @param {TeqFw_Core_Back_App} app
 * @param {TeqFw_Db_Back_RDb_IConnect} conn
 * @param {TeqFw_Db_Back_Api_RDb_CrudEngine} crud
 * @param {Porter_Base_Back_Store_RDb_Schema_Room} rdbRoom
 * @param {typeof Porter_Base_Shared_Enum_Room_State} STATE
 *
 * @returns {TeqFw_Core_Back_Api_Dto_Command}
 *
 * @memberOf Porter_Desk_Back_Cli_Data_Init
 */
export default function Factory(
    {
        Porter_Desk_Back_Defaults$: DEF,
        TeqFw_Core_Shared_Api_Logger$$: logger,
        'TeqFw_Core_Back_Api_Dto_Command.Factory$': fCommand,
        TeqFw_Core_Back_App$: app,
        TeqFw_Db_Back_RDb_IConnect$: conn,
        TeqFw_Db_Back_Api_RDb_CrudEngine$: crud,
        Porter_Base_Back_Store_RDb_Schema_Room$: rdbRoom,
        Porter_Base_Shared_Enum_Room_State$: STATE,
    }) {

    // FUNCS
    /**
     * Command action.
     * @returns {Promise<void>}
     * @memberOf Porter_Desk_Back_Cli_Data_Init
     */
    async function action() {
        // FUNCS
        /**
         * @param {TeqFw_Db_Back_RDb_ITrans} trx
         * @return {Promise<void>}
         */
        async function initRooms(trx) {
            // VARS
            const data = [
                [101, STATE.OCCUPIED], [102, STATE.READY], [103, STATE.READY], [104, STATE.READY], [105, STATE.READY],
                [201, STATE.READY], [202, STATE.OCCUPIED], [203, STATE.READY], [204, STATE.READY], [205, STATE.READY],
                [301, STATE.READY], [302, STATE.READY], [303, STATE.OCCUPIED], [304, STATE.READY], [305, STATE.READY],
                [401, STATE.READY], [402, STATE.READY], [403, STATE.READY], [404, STATE.OCCUPIED], [405, STATE.READY],
            ];
            // MAIN
            for (const one of data) {
                const dto = rdbRoom.createDto();
                dto.number = one[0];
                dto.state = one[1];
                await crud.create(trx, rdbRoom, dto);
            }
            logger.info(`Total '${data.length}' room records are inserted into the RDB.`);
        }

        // MAIN
        const trx = await conn.startTransaction();
        try {
            await initRooms(trx);
            await trx.commit();
            logger.info('The demo/dev data is inserted.');
        } catch (e) {
            logger.exception(e);
            await trx.rollback();
        }
        await app.stop();
    }

    Object.defineProperty(action, 'namespace', {value: NS});

    // MAIN
    const res = fCommand.create();
    res.realm = DEF.CLI_PREFIX;
    res.name = 'data-init';
    res.desc = 'init the demo/dev data in empty RDB';
    res.action = action;
    return res;
}
