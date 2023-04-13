'use strict';
class compressors extends miners{
//These are the miners of this prestige layer, they boost the production of the previous layer's miners

    
    constructor(...args){
        super(...args);
        this.compressor = new compressor();
    }
    
    
    
}