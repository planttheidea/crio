

/**
 * @todo Add tests for lodash and moment
 */

import constructorTests from './constructor';
import crioCollectionTests from './CrioCollection';
import crioDateTest from './CrioDate';
import crioListTests from './CrioList';
import crioMapTests from './CrioMap';

export default {
    constructor: constructorTests,
    CrioCollection: crioCollectionTests,
    CrioDate: crioDateTest,
    CrioList: crioListTests,
    CrioMap: crioMapTests
};