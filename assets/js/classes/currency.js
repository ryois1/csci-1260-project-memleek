'use strict';

import { ECurrency }  from '../enums/Currency.js' ;

class Currency {
    constructor(code, name) {
        this.code = code;
        this.name = name;
    }
}

export { Currency };