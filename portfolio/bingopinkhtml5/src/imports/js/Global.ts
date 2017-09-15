/// <reference path="../../../../typings/tsd.d.ts" />

module com.camelot.iwg {
     
    export class Global {
        
        private static _instance: Global = new Global();
        private _globals: any = [];
        
        constructor() {

            if (Global._instance) {
                throw new Error("Error: Instantiation failed: Use Global.getInstance() instead of new.");
            }
            Global._instance = this;
            
        } 
        
        // singleton pattern
        public static getInstance(): Global {
            return Global._instance; 
        }
        
        /*
         *  name:           addToGlobal
         *  description:    add whatever to globals array
         *  params:         name: string, item: any
         *  returns:        null
         */
        public addToGlobal(name, item): void {
            
            // loop through all globals to check if we allready have a global with that name
            for (var i = 0; i < this._globals.length; i++) {
                var global = this._globals[i];
                if ( global.name === name ) {
                    global.item = item;
                    return
                }
            }
            
            // otherwise make an object and push into globals array
            var globalObject = {
                name: name,
                item: item
            };
            
            this._globals.push(globalObject);
            
        }
        
         /*
         *  name:           getFromGlobal
         *  description:    add whatever to globals array
         *  params:         name: string
         *  returns:        item: any
         */
        public getFromGlobal(name): any {
            
            for ( var i = 0; i < this._globals.length; i++ ){
                
                var g = this._globals[i];
                
                if ( g.name === name ) {
                    
                    return g.item;
                    
                }
            
            }
            
        }
       
    }
}