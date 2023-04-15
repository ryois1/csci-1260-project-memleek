'use strict';



class algortithms extends prestige{
//This is basically just Compressor Upgrades, they boost certain production values of the previous layer's miners
id;
//ID of the algorithm
name;
//Name of the algorithm
description;
//Description of the algorithm
cost;
//Cost of the algorithm (in compression points)

    constructor(_id,_name,_description,_cost){
    super();
    this.id = _id;
    this.name = _name;
    this.description = _description;
    this.cost = _cost;



    }
//I was hoping the buying function would be easier to write, but unfortunately its gonna be shit
/*
buy(){
    if(globalCompressionPoints >= this.cost){
        globalCompressionPoints -= this.cost;
        switch(this.id){
            case '1':
                



        }


        


    }






}
*/
// ¯\_(ツ)_/¯ wanted to do something, but I think itll just be MORE CLASSES
}
export {algorithms}

