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
		
		public listToMatrix(list, elementsPerSubArray) {
		    
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
        
        static hasDuplicates(array) {
            var valuesSoFar = Object.create(null);
                for (var i = 0; i < array.length; ++i) {
                    var value = array[i];
                    if (value in valuesSoFar) {
                    return value;
                }
                valuesSoFar[value] = true;
            }
            return false;
        }
        
        static sortNumber(a,b) {
            return a - b;
        }
		
		
		/*	
		 *	name: 			getRandomNumber()
		 *	description:	return number between min and max value given
		 *	params:			min: number, max: number
		 *	returns: 		value: number
		 */
		public getRandomNumber(min:number, max:number) {
			return Math.random() * (max - min) + min;
		}
	}
}
