/**
 * The app-dependent service to request refreshing of the data from RDB.
 */
import assert from 'assert';
import {config as cfgTest, container} from '@teqfw/test';
import {describe, it} from 'mocha';

// SETUP ENV

/** @type {TeqFw_Core_Back_Config} */
const config = await container.get('TeqFw_Core_Back_Config$');
config.init(cfgTest.pathToRoot, 'test');
const cfgDb = config.getLocal('@teqfw/db');

/**
 * Framework wide RDB connection from DI. This connection is used by event listeners.
 * @type {TeqFw_Db_Back_RDb_Connect}
 */
const connFw = await container.get('TeqFw_Db_Back_RDb_IConnect$');
/** @type {TeqFw_Core_Back_Mod_App_Uuid} */
const modBackUuid = await container.get('TeqFw_Core_Back_Mod_App_Uuid$');
await modBackUuid.init();

// GET OBJECT FROM CONTAINER AND RUN TESTS
/** @type {Porter_Base_Back_Web_Api_App_Refresh} */
const handler = await container.get('Porter_Base_Back_Web_Api_App_Refresh$');
/** @type {Porter_Base_Shared_Web_Api_App_Refresh} */
const dtoEnd = await container.get('Porter_Base_Shared_Web_Api_App_Refresh$');
/** @type {Porter_Base_Shared_Dto_Order} */
const dtoOrder = await container.get('Porter_Base_Shared_Dto_Order$');
/** @type {typeof TeqFw_Web_Api_Back_Api_Service_Context} */
const Context = await container.get('TeqFw_Web_Api_Back_Api_Service_Context#');
/** @type {Porter_Desk_Back_Defaults} */
const DEF = await container.get('Porter_Desk_Back_Defaults$');

await handler.init();

describe('Porter_Base_Back_Web_Api_App_Refresh', function () {
    it('can be instantiated', async () => {
        assert(typeof handler === 'object');
    });

    it('has right endpoint', async () => {
        const endpoint = handler.getEndpoint();
        assert(endpoint.constructor.name === 'Porter_Base_Shared_Web_Api_App_Refresh');
    });

    describe('can process requests', function () {

        it('the simple request', async () => {
            await connFw.init(cfgDb);
            try {
                const req = dtoEnd.createReq();
                const res = dtoEnd.createRes();
                const context = new Context();
                //req.order = dtoOrder.createDto();
                req.order.type = 'test';
                req.order.uuid = 'v4';
                await handler.process(req, res, context);
                assert(res.success);
            } finally {
                await connFw.disconnect();
            }
        });

    });

});

