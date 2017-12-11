/// <reference path="../../../typings/tsd.d.ts" />

module com.camelot.iwg {

	var CAMELOT: any = com.camelot,
        CORE = CAMELOT.core,
        IWG = CAMELOT.iwg;

	export class Helper {

		private static _instance: Helper = new Helper();

        constructor() {
			if (Helper._instance) {
				throw new Error("Error: Instantiation failed: Use Helper.getInstance() instead of new.");
			}
			Helper._instance = this;
        }

		public static getInstance(): Helper {
			return Helper._instance;
		}
		
		static listToMatrix(list, elementsPerSubArray) {
		    
			var matrix = [], i, k;
		    for (i = 0, k = -1; i < list.length; i++) {
		        if (i % elementsPerSubArray === 0) {
		            k++;
		            matrix[k] = [];
		        }
		        matrix[k].push(list[i]);
		    }
		    return matrix;
			
		}
		
		/*	
		 *	name: 			getRandomNumber()
		 *	description:	return number between min and max value given
		 *	params:			min: number, max: number
		 *	returns: 		value: number
		 */
		static getRandomNumber(min:number, max:number) {
			return Math.random() * (max - min) + min;
		}
        
        /*	
		 *	name: 			between()
		 *	description:	return if a number is between the min and max value
		 *	params:			x: number, min: number, max: number
		 *	returns: 		value: number
		 */
		static between(x:number, min:number, max:number) {
			return x >= min && x <= max;
		}
        
        /*
         *  name:           shuffleArray();
         *  description:    return a shuffled version of the array passed in    
         *  params:         array: array<any>
         *  returns:        array: array<any>
         */
        static shuffleArray( array : Array<any> ): Array<any> {
            var currentIndex = array.length, temporaryValue, randomIndex ;
            
            // While there remain elements to shuffle...
            while (0 !== currentIndex) {
            
                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
            
                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }
            
            return array;
        } // end shuffleArray
        
        /*
         *  name:           sortArray()
         *  description:    sorts an array numerically  
         *  param:          array : Array<number> 
         *  return:         array : Array<number>
         */
        static sortArray( array : Array<number> ) : Array<number> {
            return array.sort( function(a, b){return a-b} );
        }
        
        /*
         *  name:           isInArray()
         *  description:    sorts an array numerically  
         *  param:          array : Array<number> 
         *  return:         array : Array<number>
         */
        static isInArray(value: number, array : Array<number> ) {
            return array.indexOf(value) > -1;
        }
         
	}
}
