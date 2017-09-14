/// <reference path="../imports/js/Sideplay.ts" />
module com.camelot.iwg {

	var CAMELOT: any    = com.camelot,
        CORE            = CAMELOT.core,
        IWG             = CAMELOT.iwg;

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
        
        /*	
		 *	name: 			getRandomNumber()
		 *	description:	return number between min and max value given
		 *	params:			min: number, max: number
		 *	returns: 		value: number
		 */
		static getRandomNumber(min:number, max:number) {
			return Math.random() * (max - min) + min;
		}
        
        /**
         *  name:           hasDuplicates()
         *  description:    returns true if a value is found twice in an array
         *  params:         array: array<any>
         *  returns:        boolean
         */
        static hasDuplicates(array): boolean {
            
            var valuesSoFar = Object.create(null);
            
            for (var i = 0; i < array.length; ++i) {
                var value = array[i];
                if (value in valuesSoFar) {
                    return value;
                }
                
                valuesSoFar[value] = true;
                
            }
            
            return false;
            
        } // end hadDuplicates
        
        /**
         *  name:           checkHasDuplicates();
         *  description:    returns true if a value is found twice in an array
         *  params:         array: array<any>, object:gameObject, prop: String 
         *  returns:        boolean
         */
        static checkHasDuplicates(array, object, prop): boolean {
            
           var valuesSoFar = [];
            
            for (var i = 0; i < array.length; i++ ) {
                
                var ele = array[i];
                
                if ( ele.hasOwnProperty( prop ) ){
                    
                    valuesSoFar.push(ele[prop]);
                   
                    for ( var j = 0; j < valuesSoFar.length; j++ ){
                       
                        var value = valuesSoFar[j];
                        
                        if ( object.hasOwnProperty(prop) ){
                            
                            if ( value === object[prop] ){
                                console.warn( "gameObject name '" + value + "' has already been used, please select alternative name" );
                                return true;
                            }
                            
                        }
                        
                    }                   
                   
                }
                
            } // end for
            
            return false;
            
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
        
        static sortNumber(a,b) {
            return a - b;
        }
        
        /**
         *  name:           getGameObject
         *  description:    retrieve gameObject from global gameObjectArray found on the namespace
         *                  com.camelot.iwg.gameObjectArray
         *  params:         name: String,
         *  returns:        object: GameObject 
         */
        static getGameObject( name ): any {
            
            var array = IWG.gameObjectsArray;
            
            for ( var i = 0; i < array.length; i++ ) {
                
                var ele = array[i];
                
                if ( name === ele.getName() ) {
                    return ele;
                }
                
            }            
            
            return false;
            
        } // end getGameObject;



	}
}
