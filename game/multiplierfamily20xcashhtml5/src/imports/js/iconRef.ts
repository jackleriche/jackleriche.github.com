/// <reference path="../../../../typings/tsd.d.ts" />

module com.camelot.iwg {
     
    export class IconRef {
        
        private static _instance: IconRef = new IconRef();
        constructor() {

            if (IconRef._instance) {
                throw new Error("Error: Instantiation failed: Use IconRef.getInstance() instead of new.");
            }
            IconRef._instance = this;
            
        } 
        
        // singleton pattern
        public static getInstance(): IconRef {
            return IconRef._instance; 
        }
        
        public iconRefs = [    
                { "num": 0,     "name": "arrow",        "frameName": "" },
                { "num": 1,     "name": "trap",         "frameName": "symbol_trap" },
                { "num": 2,     "name": "spanner",      "frameName": "symbol_spanner" },
                { "num": 3,     "name": "cheese",       "frameName": "symbol_cheese" },
                { "num": 4,     "name": "egg",          "frameName": "symbol_egg" },
                { "num": 5,     "name": "bottle",       "frameName": "symbol_bottle" },

                { "num": 6,     "name": "slide",        "frameName": "symbol_slide" },
                { "num": 7,     "name": "boot",         "frameName": "symbol_boot" },
                { "num": 8,     "name": "cat",          "frameName": "symbol_cat" },

                { "num": 9,     "name": "rollagain",    "frameName": "rollagain" },

                { "num": 10,    "name": "iw2",         "frameName": "iw2", "value": 2 },
                { "num": 11,    "name": "iw5",         "frameName": "iw5", "value": 5 },
                { "num": 12,    "name": "iw50",        "frameName": "iw50", "value": 50 }
            ]
    }
}