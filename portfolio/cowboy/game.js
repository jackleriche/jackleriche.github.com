// Copyright 2013 Basarat Ali Syed. All Rights Reserved.
//
// Licensed under MIT open source license http://opensource.org/licenses/MIT
//
// Orginal javascript code was by Mauricio Santos
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * @namespace Top level namespace for collections, a TypeScript data structure library.
 */
var collections;
(function (collections) {
    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    var has = function (obj, prop) {
        return _hasOwnProperty.call(obj, prop);
    };
    /**
     * Default function to compare element order.
     * @function
     */
    function defaultCompare(a, b) {
        if (a < b) {
            return -1;
        }
        else if (a === b) {
            return 0;
        }
        else {
            return 1;
        }
    }
    collections.defaultCompare = defaultCompare;
    /**
     * Default function to test equality.
     * @function
     */
    function defaultEquals(a, b) {
        return a === b;
    }
    collections.defaultEquals = defaultEquals;
    /**
     * Default function to convert an object to a string.
     * @function
     */
    function defaultToString(item) {
        if (item === null) {
            return 'COLLECTION_NULL';
        }
        else if (collections.isUndefined(item)) {
            return 'COLLECTION_UNDEFINED';
        }
        else if (collections.isString(item)) {
            return '$s' + item;
        }
        else {
            return '$o' + item.toString();
        }
    }
    collections.defaultToString = defaultToString;
    /**
    * Joins all the properies of the object using the provided join string
    */
    function makeString(item, join) {
        if (join === void 0) { join = ","; }
        if (item === null) {
            return 'COLLECTION_NULL';
        }
        else if (collections.isUndefined(item)) {
            return 'COLLECTION_UNDEFINED';
        }
        else if (collections.isString(item)) {
            return item.toString();
        }
        else {
            var toret = "{";
            var first = true;
            for (var prop in item) {
                if (has(item, prop)) {
                    if (first)
                        first = false;
                    else
                        toret = toret + join;
                    toret = toret + prop + ":" + item[prop];
                }
            }
            return toret + "}";
        }
    }
    collections.makeString = makeString;
    /**
     * Checks if the given argument is a function.
     * @function
     */
    function isFunction(func) {
        return (typeof func) === 'function';
    }
    collections.isFunction = isFunction;
    /**
     * Checks if the given argument is undefined.
     * @function
     */
    function isUndefined(obj) {
        return (typeof obj) === 'undefined';
    }
    collections.isUndefined = isUndefined;
    /**
     * Checks if the given argument is a string.
     * @function
     */
    function isString(obj) {
        return Object.prototype.toString.call(obj) === '[object String]';
    }
    collections.isString = isString;
    /**
     * Reverses a compare function.
     * @function
     */
    function reverseCompareFunction(compareFunction) {
        if (!collections.isFunction(compareFunction)) {
            return function (a, b) {
                if (a < b) {
                    return 1;
                }
                else if (a === b) {
                    return 0;
                }
                else {
                    return -1;
                }
            };
        }
        else {
            return function (d, v) {
                return compareFunction(d, v) * -1;
            };
        }
    }
    collections.reverseCompareFunction = reverseCompareFunction;
    /**
     * Returns an equal function given a compare function.
     * @function
     */
    function compareToEquals(compareFunction) {
        return function (a, b) {
            return compareFunction(a, b) === 0;
        };
    }
    collections.compareToEquals = compareToEquals;
    /**
     * @namespace Contains various functions for manipulating arrays.
     */
    var arrays;
    (function (arrays) {
        /**
         * Returns the position of the first occurrence of the specified item
         * within the specified array.
         * @param {*} array the array in which to search the element.
         * @param {Object} item the element to search.
         * @param {function(Object,Object):boolean=} equalsFunction optional function used to
         * check equality between 2 elements.
         * @return {number} the position of the first occurrence of the specified element
         * within the specified array, or -1 if not found.
         */
        function indexOf(array, item, equalsFunction) {
            var equals = equalsFunction || collections.defaultEquals;
            var length = array.length;
            for (var i = 0; i < length; i++) {
                if (equals(array[i], item)) {
                    return i;
                }
            }
            return -1;
        }
        arrays.indexOf = indexOf;
        /**
         * Returns the position of the last occurrence of the specified element
         * within the specified array.
         * @param {*} array the array in which to search the element.
         * @param {Object} item the element to search.
         * @param {function(Object,Object):boolean=} equalsFunction optional function used to
         * check equality between 2 elements.
         * @return {number} the position of the last occurrence of the specified element
         * within the specified array or -1 if not found.
         */
        function lastIndexOf(array, item, equalsFunction) {
            var equals = equalsFunction || collections.defaultEquals;
            var length = array.length;
            for (var i = length - 1; i >= 0; i--) {
                if (equals(array[i], item)) {
                    return i;
                }
            }
            return -1;
        }
        arrays.lastIndexOf = lastIndexOf;
        /**
         * Returns true if the specified array contains the specified element.
         * @param {*} array the array in which to search the element.
         * @param {Object} item the element to search.
         * @param {function(Object,Object):boolean=} equalsFunction optional function to
         * check equality between 2 elements.
         * @return {boolean} true if the specified array contains the specified element.
         */
        function contains(array, item, equalsFunction) {
            return arrays.indexOf(array, item, equalsFunction) >= 0;
        }
        arrays.contains = contains;
        /**
         * Removes the first ocurrence of the specified element from the specified array.
         * @param {*} array the array in which to search element.
         * @param {Object} item the element to search.
         * @param {function(Object,Object):boolean=} equalsFunction optional function to
         * check equality between 2 elements.
         * @return {boolean} true if the array changed after this call.
         */
        function remove(array, item, equalsFunction) {
            var index = arrays.indexOf(array, item, equalsFunction);
            if (index < 0) {
                return false;
            }
            array.splice(index, 1);
            return true;
        }
        arrays.remove = remove;
        /**
         * Returns the number of elements in the specified array equal
         * to the specified object.
         * @param {Array} array the array in which to determine the frequency of the element.
         * @param {Object} item the element whose frequency is to be determined.
         * @param {function(Object,Object):boolean=} equalsFunction optional function used to
         * check equality between 2 elements.
         * @return {number} the number of elements in the specified array
         * equal to the specified object.
         */
        function frequency(array, item, equalsFunction) {
            var equals = equalsFunction || collections.defaultEquals;
            var length = array.length;
            var freq = 0;
            for (var i = 0; i < length; i++) {
                if (equals(array[i], item)) {
                    freq++;
                }
            }
            return freq;
        }
        arrays.frequency = frequency;
        /**
         * Returns true if the two specified arrays are equal to one another.
         * Two arrays are considered equal if both arrays contain the same number
         * of elements, and all corresponding pairs of elements in the two
         * arrays are equal and are in the same order.
         * @param {Array} array1 one array to be tested for equality.
         * @param {Array} array2 the other array to be tested for equality.
         * @param {function(Object,Object):boolean=} equalsFunction optional function used to
         * check equality between elemements in the arrays.
         * @return {boolean} true if the two arrays are equal
         */
        function equals(array1, array2, equalsFunction) {
            var equals = equalsFunction || collections.defaultEquals;
            if (array1.length !== array2.length) {
                return false;
            }
            var length = array1.length;
            for (var i = 0; i < length; i++) {
                if (!equals(array1[i], array2[i])) {
                    return false;
                }
            }
            return true;
        }
        arrays.equals = equals;
        /**
         * Returns shallow a copy of the specified array.
         * @param {*} array the array to copy.
         * @return {Array} a copy of the specified array
         */
        function copy(array) {
            return array.concat();
        }
        arrays.copy = copy;
        /**
         * Swaps the elements at the specified positions in the specified array.
         * @param {Array} array The array in which to swap elements.
         * @param {number} i the index of one element to be swapped.
         * @param {number} j the index of the other element to be swapped.
         * @return {boolean} true if the array is defined and the indexes are valid.
         */
        function swap(array, i, j) {
            if (i < 0 || i >= array.length || j < 0 || j >= array.length) {
                return false;
            }
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
            return true;
        }
        arrays.swap = swap;
        function toString(array) {
            return '[' + array.toString() + ']';
        }
        arrays.toString = toString;
        /**
         * Executes the provided function once for each element present in this array
         * starting from index 0 to length - 1.
         * @param {Array} array The array in which to iterate.
         * @param {function(Object):*} callback function to execute, it is
         * invoked with one argument: the element value, to break the iteration you can
         * optionally return false.
         */
        function forEach(array, callback) {
            var lenght = array.length;
            for (var i = 0; i < lenght; i++) {
                if (callback(array[i]) === false) {
                    return;
                }
            }
        }
        arrays.forEach = forEach;
    })(arrays = collections.arrays || (collections.arrays = {}));
    var LinkedList = (function () {
        /**
        * Creates an empty Linked List.
        * @class A linked list is a data structure consisting of a group of nodes
        * which together represent a sequence.
        * @constructor
        */
        function LinkedList() {
            /**
            * First node in the list
            * @type {Object}
            * @private
            */
            this.firstNode = null;
            /**
            * Last node in the list
            * @type {Object}
            * @private
            */
            this.lastNode = null;
            /**
            * Number of elements in the list
            * @type {number}
            * @private
            */
            this.nElements = 0;
        }
        /**
        * Adds an element to this list.
        * @param {Object} item element to be added.
        * @param {number=} index optional index to add the element. If no index is specified
        * the element is added to the end of this list.
        * @return {boolean} true if the element was added or false if the index is invalid
        * or if the element is undefined.
        */
        LinkedList.prototype.add = function (item, index) {
            if (collections.isUndefined(index)) {
                index = this.nElements;
            }
            if (index < 0 || index > this.nElements || collections.isUndefined(item)) {
                return false;
            }
            var newNode = this.createNode(item);
            if (this.nElements === 0) {
                // First node in the list.
                this.firstNode = newNode;
                this.lastNode = newNode;
            }
            else if (index === this.nElements) {
                // Insert at the end.
                this.lastNode.next = newNode;
                this.lastNode = newNode;
            }
            else if (index === 0) {
                // Change first node.
                newNode.next = this.firstNode;
                this.firstNode = newNode;
            }
            else {
                var prev = this.nodeAtIndex(index - 1);
                newNode.next = prev.next;
                prev.next = newNode;
            }
            this.nElements++;
            return true;
        };
        /**
        * Returns the first element in this list.
        * @return {*} the first element of the list or undefined if the list is
        * empty.
        */
        LinkedList.prototype.first = function () {
            if (this.firstNode !== null) {
                return this.firstNode.element;
            }
            return undefined;
        };
        /**
        * Returns the last element in this list.
        * @return {*} the last element in the list or undefined if the list is
        * empty.
        */
        LinkedList.prototype.last = function () {
            if (this.lastNode !== null) {
                return this.lastNode.element;
            }
            return undefined;
        };
        /**
         * Returns the element at the specified position in this list.
         * @param {number} index desired index.
         * @return {*} the element at the given index or undefined if the index is
         * out of bounds.
         */
        LinkedList.prototype.elementAtIndex = function (index) {
            var node = this.nodeAtIndex(index);
            if (node === null) {
                return undefined;
            }
            return node.element;
        };
        /**
         * Returns the index in this list of the first occurrence of the
         * specified element, or -1 if the List does not contain this element.
         * <p>If the elements inside this list are
         * not comparable with the === operator a custom equals function should be
         * provided to perform searches, the function must receive two arguments and
         * return true if they are equal, false otherwise. Example:</p>
         *
         * <pre>
         * var petsAreEqualByName = function(pet1, pet2) {
         *  return pet1.name === pet2.name;
         * }
         * </pre>
         * @param {Object} item element to search for.
         * @param {function(Object,Object):boolean=} equalsFunction Optional
         * function used to check if two elements are equal.
         * @return {number} the index in this list of the first occurrence
         * of the specified element, or -1 if this list does not contain the
         * element.
         */
        LinkedList.prototype.indexOf = function (item, equalsFunction) {
            var equalsF = equalsFunction || collections.defaultEquals;
            if (collections.isUndefined(item)) {
                return -1;
            }
            var currentNode = this.firstNode;
            var index = 0;
            while (currentNode !== null) {
                if (equalsF(currentNode.element, item)) {
                    return index;
                }
                index++;
                currentNode = currentNode.next;
            }
            return -1;
        };
        /**
           * Returns true if this list contains the specified element.
           * <p>If the elements inside the list are
           * not comparable with the === operator a custom equals function should be
           * provided to perform searches, the function must receive two arguments and
           * return true if they are equal, false otherwise. Example:</p>
           *
           * <pre>
           * var petsAreEqualByName = function(pet1, pet2) {
           *  return pet1.name === pet2.name;
           * }
           * </pre>
           * @param {Object} item element to search for.
           * @param {function(Object,Object):boolean=} equalsFunction Optional
           * function used to check if two elements are equal.
           * @return {boolean} true if this list contains the specified element, false
           * otherwise.
           */
        LinkedList.prototype.contains = function (item, equalsFunction) {
            return (this.indexOf(item, equalsFunction) >= 0);
        };
        /**
         * Removes the first occurrence of the specified element in this list.
         * <p>If the elements inside the list are
         * not comparable with the === operator a custom equals function should be
         * provided to perform searches, the function must receive two arguments and
         * return true if they are equal, false otherwise. Example:</p>
         *
         * <pre>
         * var petsAreEqualByName = function(pet1, pet2) {
         *  return pet1.name === pet2.name;
         * }
         * </pre>
         * @param {Object} item element to be removed from this list, if present.
         * @return {boolean} true if the list contained the specified element.
         */
        LinkedList.prototype.remove = function (item, equalsFunction) {
            var equalsF = equalsFunction || collections.defaultEquals;
            if (this.nElements < 1 || collections.isUndefined(item)) {
                return false;
            }
            var previous = null;
            var currentNode = this.firstNode;
            while (currentNode !== null) {
                if (equalsF(currentNode.element, item)) {
                    if (currentNode === this.firstNode) {
                        this.firstNode = this.firstNode.next;
                        if (currentNode === this.lastNode) {
                            this.lastNode = null;
                        }
                    }
                    else if (currentNode === this.lastNode) {
                        this.lastNode = previous;
                        previous.next = currentNode.next;
                        currentNode.next = null;
                    }
                    else {
                        previous.next = currentNode.next;
                        currentNode.next = null;
                    }
                    this.nElements--;
                    return true;
                }
                previous = currentNode;
                currentNode = currentNode.next;
            }
            return false;
        };
        /**
         * Removes all of the elements from this list.
         */
        LinkedList.prototype.clear = function () {
            this.firstNode = null;
            this.lastNode = null;
            this.nElements = 0;
        };
        /**
         * Returns true if this list is equal to the given list.
         * Two lists are equal if they have the same elements in the same order.
         * @param {LinkedList} other the other list.
         * @param {function(Object,Object):boolean=} equalsFunction optional
         * function used to check if two elements are equal. If the elements in the lists
         * are custom objects you should provide a function, otherwise
         * the === operator is used to check equality between elements.
         * @return {boolean} true if this list is equal to the given list.
         */
        LinkedList.prototype.equals = function (other, equalsFunction) {
            var eqF = equalsFunction || collections.defaultEquals;
            if (!(other instanceof collections.LinkedList)) {
                return false;
            }
            if (this.size() !== other.size()) {
                return false;
            }
            return this.equalsAux(this.firstNode, other.firstNode, eqF);
        };
        /**
        * @private
        */
        LinkedList.prototype.equalsAux = function (n1, n2, eqF) {
            while (n1 !== null) {
                if (!eqF(n1.element, n2.element)) {
                    return false;
                }
                n1 = n1.next;
                n2 = n2.next;
            }
            return true;
        };
        /**
         * Removes the element at the specified position in this list.
         * @param {number} index given index.
         * @return {*} removed element or undefined if the index is out of bounds.
         */
        LinkedList.prototype.removeElementAtIndex = function (index) {
            if (index < 0 || index >= this.nElements) {
                return undefined;
            }
            var element;
            if (this.nElements === 1) {
                //First node in the list.
                element = this.firstNode.element;
                this.firstNode = null;
                this.lastNode = null;
            }
            else {
                var previous = this.nodeAtIndex(index - 1);
                if (previous === null) {
                    element = this.firstNode.element;
                    this.firstNode = this.firstNode.next;
                }
                else if (previous.next === this.lastNode) {
                    element = this.lastNode.element;
                    this.lastNode = previous;
                }
                if (previous !== null) {
                    element = previous.next.element;
                    previous.next = previous.next.next;
                }
            }
            this.nElements--;
            return element;
        };
        /**
         * Executes the provided function once for each element present in this list in order.
         * @param {function(Object):*} callback function to execute, it is
         * invoked with one argument: the element value, to break the iteration you can
         * optionally return false.
         */
        LinkedList.prototype.forEach = function (callback) {
            var currentNode = this.firstNode;
            while (currentNode !== null) {
                if (callback(currentNode.element) === false) {
                    break;
                }
                currentNode = currentNode.next;
            }
        };
        /**
         * Reverses the order of the elements in this linked list (makes the last
         * element first, and the first element last).
         */
        LinkedList.prototype.reverse = function () {
            var previous = null;
            var current = this.firstNode;
            var temp = null;
            while (current !== null) {
                temp = current.next;
                current.next = previous;
                previous = current;
                current = temp;
            }
            temp = this.firstNode;
            this.firstNode = this.lastNode;
            this.lastNode = temp;
        };
        /**
         * Returns an array containing all of the elements in this list in proper
         * sequence.
         * @return {Array.<*>} an array containing all of the elements in this list,
         * in proper sequence.
         */
        LinkedList.prototype.toArray = function () {
            var array = [];
            var currentNode = this.firstNode;
            while (currentNode !== null) {
                array.push(currentNode.element);
                currentNode = currentNode.next;
            }
            return array;
        };
        /**
         * Returns the number of elements in this list.
         * @return {number} the number of elements in this list.
         */
        LinkedList.prototype.size = function () {
            return this.nElements;
        };
        /**
         * Returns true if this list contains no elements.
         * @return {boolean} true if this list contains no elements.
         */
        LinkedList.prototype.isEmpty = function () {
            return this.nElements <= 0;
        };
        LinkedList.prototype.toString = function () {
            return collections.arrays.toString(this.toArray());
        };
        /**
         * @private
         */
        LinkedList.prototype.nodeAtIndex = function (index) {
            if (index < 0 || index >= this.nElements) {
                return null;
            }
            if (index === (this.nElements - 1)) {
                return this.lastNode;
            }
            var node = this.firstNode;
            for (var i = 0; i < index; i++) {
                node = node.next;
            }
            return node;
        };
        /**
         * @private
         */
        LinkedList.prototype.createNode = function (item) {
            return {
                element: item,
                next: null
            };
        };
        return LinkedList;
    })();
    collections.LinkedList = LinkedList; // End of linked list 
    var Dictionary = (function () {
        /**
         * Creates an empty dictionary.
         * @class <p>Dictionaries map keys to values; each key can map to at most one value.
         * This implementation accepts any kind of objects as keys.</p>
         *
         * <p>If the keys are custom objects a function which converts keys to unique
         * strings must be provided. Example:</p>
         * <pre>
         * function petToString(pet) {
         *  return pet.name;
         * }
         * </pre>
         * @constructor
         * @param {function(Object):string=} toStrFunction optional function used
         * to convert keys to strings. If the keys aren't strings or if toString()
         * is not appropriate, a custom function which receives a key and returns a
         * unique string must be provided.
         */
        function Dictionary(toStrFunction) {
            this.table = {};
            this.nElements = 0;
            this.toStr = toStrFunction || collections.defaultToString;
        }
        /**
         * Returns the value to which this dictionary maps the specified key.
         * Returns undefined if this dictionary contains no mapping for this key.
         * @param {Object} key key whose associated value is to be returned.
         * @return {*} the value to which this dictionary maps the specified key or
         * undefined if the map contains no mapping for this key.
         */
        Dictionary.prototype.getValue = function (key) {
            var pair = this.table['$' + this.toStr(key)];
            if (collections.isUndefined(pair)) {
                return undefined;
            }
            return pair.value;
        };
        /**
         * Associates the specified value with the specified key in this dictionary.
         * If the dictionary previously contained a mapping for this key, the old
         * value is replaced by the specified value.
         * @param {Object} key key with which the specified value is to be
         * associated.
         * @param {Object} value value to be associated with the specified key.
         * @return {*} previous value associated with the specified key, or undefined if
         * there was no mapping for the key or if the key/value are undefined.
         */
        Dictionary.prototype.setValue = function (key, value) {
            if (collections.isUndefined(key) || collections.isUndefined(value)) {
                return undefined;
            }
            var ret;
            var k = '$' + this.toStr(key);
            var previousElement = this.table[k];
            if (collections.isUndefined(previousElement)) {
                this.nElements++;
                ret = undefined;
            }
            else {
                ret = previousElement.value;
            }
            this.table[k] = {
                key: key,
                value: value
            };
            return ret;
        };
        /**
         * Removes the mapping for this key from this dictionary if it is present.
         * @param {Object} key key whose mapping is to be removed from the
         * dictionary.
         * @return {*} previous value associated with specified key, or undefined if
         * there was no mapping for key.
         */
        Dictionary.prototype.remove = function (key) {
            var k = '$' + this.toStr(key);
            var previousElement = this.table[k];
            if (!collections.isUndefined(previousElement)) {
                delete this.table[k];
                this.nElements--;
                return previousElement.value;
            }
            return undefined;
        };
        /**
         * Returns an array containing all of the keys in this dictionary.
         * @return {Array} an array containing all of the keys in this dictionary.
         */
        Dictionary.prototype.keys = function () {
            var array = [];
            for (var name in this.table) {
                if (has(this.table, name)) {
                    var pair = this.table[name];
                    array.push(pair.key);
                }
            }
            return array;
        };
        /**
         * Returns an array containing all of the values in this dictionary.
         * @return {Array} an array containing all of the values in this dictionary.
         */
        Dictionary.prototype.values = function () {
            var array = [];
            for (var name in this.table) {
                if (has(this.table, name)) {
                    var pair = this.table[name];
                    array.push(pair.value);
                }
            }
            return array;
        };
        /**
        * Executes the provided function once for each key-value pair
        * present in this dictionary.
        * @param {function(Object,Object):*} callback function to execute, it is
        * invoked with two arguments: key and value. To break the iteration you can
        * optionally return false.
        */
        Dictionary.prototype.forEach = function (callback) {
            for (var name in this.table) {
                if (has(this.table, name)) {
                    var pair = this.table[name];
                    var ret = callback(pair.key, pair.value);
                    if (ret === false) {
                        return;
                    }
                }
            }
        };
        /**
         * Returns true if this dictionary contains a mapping for the specified key.
         * @param {Object} key key whose presence in this dictionary is to be
         * tested.
         * @return {boolean} true if this dictionary contains a mapping for the
         * specified key.
         */
        Dictionary.prototype.containsKey = function (key) {
            return !collections.isUndefined(this.getValue(key));
        };
        /**
        * Removes all mappings from this dictionary.
        * @this {collections.Dictionary}
        */
        Dictionary.prototype.clear = function () {
            this.table = {};
            this.nElements = 0;
        };
        /**
         * Returns the number of keys in this dictionary.
         * @return {number} the number of key-value mappings in this dictionary.
         */
        Dictionary.prototype.size = function () {
            return this.nElements;
        };
        /**
         * Returns true if this dictionary contains no mappings.
         * @return {boolean} true if this dictionary contains no mappings.
         */
        Dictionary.prototype.isEmpty = function () {
            return this.nElements <= 0;
        };
        Dictionary.prototype.toString = function () {
            var toret = "{";
            this.forEach(function (k, v) {
                toret = toret + "\n\t" + k.toString() + " : " + v.toString();
            });
            return toret + "\n}";
        };
        return Dictionary;
    })();
    collections.Dictionary = Dictionary; // End of dictionary
    /**
     * This class is used by the LinkedDictionary Internally
     * Has to be a class, not an interface, because it needs to have
     * the 'unlink' function defined.
     */
    var LinkedDictionaryPair = (function () {
        function LinkedDictionaryPair(key, value) {
            this.key = key;
            this.value = value;
        }
        LinkedDictionaryPair.prototype.unlink = function () {
            this.prev.next = this.next;
            this.next.prev = this.prev;
        };
        return LinkedDictionaryPair;
    })();
    var LinkedDictionary = (function (_super) {
        __extends(LinkedDictionary, _super);
        function LinkedDictionary(toStrFunction) {
            _super.call(this, toStrFunction);
            this.head = new LinkedDictionaryPair(null, null);
            this.tail = new LinkedDictionaryPair(null, null);
            this.head.next = this.tail;
            this.tail.prev = this.head;
        }
        /**
         * Inserts the new node to the 'tail' of the list, updating the
         * neighbors, and moving 'this.tail' (the End of List indicator) that
         * to the end.
         */
        LinkedDictionary.prototype.appendToTail = function (entry) {
            var lastNode = this.tail.prev;
            lastNode.next = entry;
            entry.prev = lastNode;
            entry.next = this.tail;
            this.tail.prev = entry;
        };
        /**
         * Retrieves a linked dictionary from the table internally
         */
        LinkedDictionary.prototype.getLinkedDictionaryPair = function (key) {
            if (collections.isUndefined(key)) {
                return undefined;
            }
            var k = '$' + this.toStr(key);
            var pair = (this.table[k]);
            return pair;
        };
        /**
         * Returns the value to which this dictionary maps the specified key.
         * Returns undefined if this dictionary contains no mapping for this key.
         * @param {Object} key key whose associated value is to be returned.
         * @return {*} the value to which this dictionary maps the specified key or
         * undefined if the map contains no mapping for this key.
         */
        LinkedDictionary.prototype.getValue = function (key) {
            var pair = this.getLinkedDictionaryPair(key);
            if (!collections.isUndefined(pair)) {
                return pair.value;
            }
            return undefined;
        };
        /**
         * Removes the mapping for this key from this dictionary if it is present.
         * Also, if a value is present for this key, the entry is removed from the
         * insertion ordering.
         * @param {Object} key key whose mapping is to be removed from the
         * dictionary.
         * @return {*} previous value associated with specified key, or undefined if
         * there was no mapping for key.
         */
        LinkedDictionary.prototype.remove = function (key) {
            var pair = this.getLinkedDictionaryPair(key);
            if (!collections.isUndefined(pair)) {
                _super.prototype.remove.call(this, key); // This will remove it from the table
                pair.unlink(); // This will unlink it from the chain
                return pair.value;
            }
            return undefined;
        };
        /**
        * Removes all mappings from this LinkedDictionary.
        * @this {collections.LinkedDictionary}
        */
        LinkedDictionary.prototype.clear = function () {
            _super.prototype.clear.call(this);
            this.head.next = this.tail;
            this.tail.prev = this.head;
        };
        /**
         * Internal function used when updating an existing KeyValue pair.
         * It places the new value indexed by key into the table, but maintains
         * its place in the linked ordering.
         */
        LinkedDictionary.prototype.replace = function (oldPair, newPair) {
            var k = '$' + this.toStr(newPair.key);
            // set the new Pair's links to existingPair's links
            newPair.next = oldPair.next;
            newPair.prev = oldPair.prev;
            // Delete Existing Pair from the table, unlink it from chain.
            // As a result, the nElements gets decremented by this operation
            this.remove(oldPair.key);
            // Link new Pair in place of where oldPair was,
            // by pointing the old pair's neighbors to it.
            newPair.prev.next = newPair;
            newPair.next.prev = newPair;
            this.table[k] = newPair;
            // To make up for the fact that the number of elements was decremented,
            // We need to increase it by one.
            ++this.nElements;
        };
        /**
         * Associates the specified value with the specified key in this dictionary.
         * If the dictionary previously contained a mapping for this key, the old
         * value is replaced by the specified value.
         * Updating of a key that already exists maintains its place in the
         * insertion order into the map.
         * @param {Object} key key with which the specified value is to be
         * associated.
         * @param {Object} value value to be associated with the specified key.
         * @return {*} previous value associated with the specified key, or undefined if
         * there was no mapping for the key or if the key/value are undefined.
         */
        LinkedDictionary.prototype.setValue = function (key, value) {
            if (collections.isUndefined(key) || collections.isUndefined(value)) {
                return undefined;
            }
            var existingPair = this.getLinkedDictionaryPair(key);
            var newPair = new LinkedDictionaryPair(key, value);
            var k = '$' + this.toStr(key);
            // If there is already an element for that key, we 
            // keep it's place in the LinkedList
            if (!collections.isUndefined(existingPair)) {
                this.replace(existingPair, newPair);
                return existingPair.value;
            }
            else {
                this.appendToTail(newPair);
                this.table[k] = newPair;
                ++this.nElements;
                return undefined;
            }
        };
        /**
         * Returns an array containing all of the keys in this LinkedDictionary, ordered
         * by insertion order.
         * @return {Array} an array containing all of the keys in this LinkedDictionary,
         * ordered by insertion order.
         */
        LinkedDictionary.prototype.keys = function () {
            var array = [];
            this.forEach(function (key, value) {
                array.push(key);
            });
            return array;
        };
        /**
         * Returns an array containing all of the values in this LinkedDictionary, ordered by
         * insertion order.
         * @return {Array} an array containing all of the values in this LinkedDictionary,
         * ordered by insertion order.
         */
        LinkedDictionary.prototype.values = function () {
            var array = [];
            this.forEach(function (key, value) {
                array.push(value);
            });
            return array;
        };
        /**
        * Executes the provided function once for each key-value pair
        * present in this LinkedDictionary. It is done in the order of insertion
        * into the LinkedDictionary
        * @param {function(Object,Object):*} callback function to execute, it is
        * invoked with two arguments: key and value. To break the iteration you can
        * optionally return false.
        */
        LinkedDictionary.prototype.forEach = function (callback) {
            var crawlNode = this.head.next;
            while (crawlNode.next != null) {
                var ret = callback(crawlNode.key, crawlNode.value);
                if (ret === false) {
                    return;
                }
                crawlNode = crawlNode.next;
            }
        };
        return LinkedDictionary;
    })(Dictionary);
    collections.LinkedDictionary = LinkedDictionary; // End of LinkedDictionary
    // /**
    //  * Returns true if this dictionary is equal to the given dictionary.
    //  * Two dictionaries are equal if they contain the same mappings.
    //  * @param {collections.Dictionary} other the other dictionary.
    //  * @param {function(Object,Object):boolean=} valuesEqualFunction optional
    //  * function used to check if two values are equal.
    //  * @return {boolean} true if this dictionary is equal to the given dictionary.
    //  */
    // collections.Dictionary.prototype.equals = function(other,valuesEqualFunction) {
    // 	var eqF = valuesEqualFunction || collections.defaultEquals;
    // 	if(!(other instanceof collections.Dictionary)){
    // 		return false;
    // 	}
    // 	if(this.size() !== other.size()){
    // 		return false;
    // 	}
    // 	return this.equalsAux(this.firstNode,other.firstNode,eqF);
    // }
    var MultiDictionary = (function () {
        /**
         * Creates an empty multi dictionary.
         * @class <p>A multi dictionary is a special kind of dictionary that holds
         * multiple values against each key. Setting a value into the dictionary will
         * add the value to an array at that key. Getting a key will return an array,
         * holding all the values set to that key.
         * You can configure to allow duplicates in the values.
         * This implementation accepts any kind of objects as keys.</p>
         *
         * <p>If the keys are custom objects a function which converts keys to strings must be
         * provided. Example:</p>
         *
         * <pre>
         * function petToString(pet) {
           *  return pet.name;
           * }
         * </pre>
         * <p>If the values are custom objects a function to check equality between values
         * must be provided. Example:</p>
         *
         * <pre>
         * function petsAreEqualByAge(pet1,pet2) {
           *  return pet1.age===pet2.age;
           * }
         * </pre>
         * @constructor
         * @param {function(Object):string=} toStrFunction optional function
         * to convert keys to strings. If the keys aren't strings or if toString()
         * is not appropriate, a custom function which receives a key and returns a
         * unique string must be provided.
         * @param {function(Object,Object):boolean=} valuesEqualsFunction optional
         * function to check if two values are equal.
         *
         * @param allowDuplicateValues
         */
        function MultiDictionary(toStrFunction, valuesEqualsFunction, allowDuplicateValues) {
            if (allowDuplicateValues === void 0) { allowDuplicateValues = false; }
            this.dict = new Dictionary(toStrFunction);
            this.equalsF = valuesEqualsFunction || collections.defaultEquals;
            this.allowDuplicate = allowDuplicateValues;
        }
        /**
        * Returns an array holding the values to which this dictionary maps
        * the specified key.
        * Returns an empty array if this dictionary contains no mappings for this key.
        * @param {Object} key key whose associated values are to be returned.
        * @return {Array} an array holding the values to which this dictionary maps
        * the specified key.
        */
        MultiDictionary.prototype.getValue = function (key) {
            var values = this.dict.getValue(key);
            if (collections.isUndefined(values)) {
                return [];
            }
            return collections.arrays.copy(values);
        };
        /**
         * Adds the value to the array associated with the specified key, if
         * it is not already present.
         * @param {Object} key key with which the specified value is to be
         * associated.
         * @param {Object} value the value to add to the array at the key
         * @return {boolean} true if the value was not already associated with that key.
         */
        MultiDictionary.prototype.setValue = function (key, value) {
            if (collections.isUndefined(key) || collections.isUndefined(value)) {
                return false;
            }
            if (!this.containsKey(key)) {
                this.dict.setValue(key, [value]);
                return true;
            }
            var array = this.dict.getValue(key);
            if (!this.allowDuplicate) {
                if (collections.arrays.contains(array, value, this.equalsF)) {
                    return false;
                }
            }
            array.push(value);
            return true;
        };
        /**
         * Removes the specified values from the array of values associated with the
         * specified key. If a value isn't given, all values associated with the specified
         * key are removed.
         * @param {Object} key key whose mapping is to be removed from the
         * dictionary.
         * @param {Object=} value optional argument to specify the value to remove
         * from the array associated with the specified key.
         * @return {*} true if the dictionary changed, false if the key doesn't exist or
         * if the specified value isn't associated with the specified key.
         */
        MultiDictionary.prototype.remove = function (key, value) {
            if (collections.isUndefined(value)) {
                var v = this.dict.remove(key);
                return !collections.isUndefined(v);
            }
            var array = this.dict.getValue(key);
            if (collections.arrays.remove(array, value, this.equalsF)) {
                if (array.length === 0) {
                    this.dict.remove(key);
                }
                return true;
            }
            return false;
        };
        /**
         * Returns an array containing all of the keys in this dictionary.
         * @return {Array} an array containing all of the keys in this dictionary.
         */
        MultiDictionary.prototype.keys = function () {
            return this.dict.keys();
        };
        /**
         * Returns an array containing all of the values in this dictionary.
         * @return {Array} an array containing all of the values in this dictionary.
         */
        MultiDictionary.prototype.values = function () {
            var values = this.dict.values();
            var array = [];
            for (var i = 0; i < values.length; i++) {
                var v = values[i];
                for (var j = 0; j < v.length; j++) {
                    array.push(v[j]);
                }
            }
            return array;
        };
        /**
         * Returns true if this dictionary at least one value associatted the specified key.
         * @param {Object} key key whose presence in this dictionary is to be
         * tested.
         * @return {boolean} true if this dictionary at least one value associatted
         * the specified key.
         */
        MultiDictionary.prototype.containsKey = function (key) {
            return this.dict.containsKey(key);
        };
        /**
         * Removes all mappings from this dictionary.
         */
        MultiDictionary.prototype.clear = function () {
            this.dict.clear();
        };
        /**
         * Returns the number of keys in this dictionary.
         * @return {number} the number of key-value mappings in this dictionary.
         */
        MultiDictionary.prototype.size = function () {
            return this.dict.size();
        };
        /**
         * Returns true if this dictionary contains no mappings.
         * @return {boolean} true if this dictionary contains no mappings.
         */
        MultiDictionary.prototype.isEmpty = function () {
            return this.dict.isEmpty();
        };
        return MultiDictionary;
    })();
    collections.MultiDictionary = MultiDictionary; // end of multi dictionary 
    var Heap = (function () {
        /**
         * Creates an empty Heap.
         * @class
         * <p>A heap is a binary tree, where the nodes maintain the heap property:
         * each node is smaller than each of its children and therefore a MinHeap
         * This implementation uses an array to store elements.</p>
         * <p>If the inserted elements are custom objects a compare function must be provided,
         *  at construction time, otherwise the <=, === and >= operators are
         * used to compare elements. Example:</p>
         *
         * <pre>
         * function compare(a, b) {
         *  if (a is less than b by some ordering criterion) {
         *     return -1;
         *  } if (a is greater than b by the ordering criterion) {
         *     return 1;
         *  }
         *  // a must be equal to b
         *  return 0;
         * }
         * </pre>
         *
         * <p>If a Max-Heap is wanted (greater elements on top) you can a provide a
         * reverse compare function to accomplish that behavior. Example:</p>
         *
         * <pre>
         * function reverseCompare(a, b) {
         *  if (a is less than b by some ordering criterion) {
         *     return 1;
         *  } if (a is greater than b by the ordering criterion) {
         *     return -1;
         *  }
         *  // a must be equal to b
         *  return 0;
         * }
         * </pre>
         *
         * @constructor
         * @param {function(Object,Object):number=} compareFunction optional
         * function used to compare two elements. Must return a negative integer,
         * zero, or a positive integer as the first argument is less than, equal to,
         * or greater than the second.
         */
        function Heap(compareFunction) {
            /**
             * Array used to store the elements od the heap.
             * @type {Array.<Object>}
             * @private
             */
            this.data = [];
            this.compare = compareFunction || collections.defaultCompare;
        }
        /**
         * Returns the index of the left child of the node at the given index.
         * @param {number} nodeIndex The index of the node to get the left child
         * for.
         * @return {number} The index of the left child.
         * @private
         */
        Heap.prototype.leftChildIndex = function (nodeIndex) {
            return (2 * nodeIndex) + 1;
        };
        /**
         * Returns the index of the right child of the node at the given index.
         * @param {number} nodeIndex The index of the node to get the right child
         * for.
         * @return {number} The index of the right child.
         * @private
         */
        Heap.prototype.rightChildIndex = function (nodeIndex) {
            return (2 * nodeIndex) + 2;
        };
        /**
         * Returns the index of the parent of the node at the given index.
         * @param {number} nodeIndex The index of the node to get the parent for.
         * @return {number} The index of the parent.
         * @private
         */
        Heap.prototype.parentIndex = function (nodeIndex) {
            return Math.floor((nodeIndex - 1) / 2);
        };
        /**
         * Returns the index of the smaller child node (if it exists).
         * @param {number} leftChild left child index.
         * @param {number} rightChild right child index.
         * @return {number} the index with the minimum value or -1 if it doesn't
         * exists.
         * @private
         */
        Heap.prototype.minIndex = function (leftChild, rightChild) {
            if (rightChild >= this.data.length) {
                if (leftChild >= this.data.length) {
                    return -1;
                }
                else {
                    return leftChild;
                }
            }
            else {
                if (this.compare(this.data[leftChild], this.data[rightChild]) <= 0) {
                    return leftChild;
                }
                else {
                    return rightChild;
                }
            }
        };
        /**
         * Moves the node at the given index up to its proper place in the heap.
         * @param {number} index The index of the node to move up.
         * @private
         */
        Heap.prototype.siftUp = function (index) {
            var parent = this.parentIndex(index);
            while (index > 0 && this.compare(this.data[parent], this.data[index]) > 0) {
                collections.arrays.swap(this.data, parent, index);
                index = parent;
                parent = this.parentIndex(index);
            }
        };
        /**
         * Moves the node at the given index down to its proper place in the heap.
         * @param {number} nodeIndex The index of the node to move down.
         * @private
         */
        Heap.prototype.siftDown = function (nodeIndex) {
            //smaller child index
            var min = this.minIndex(this.leftChildIndex(nodeIndex), this.rightChildIndex(nodeIndex));
            while (min >= 0 && this.compare(this.data[nodeIndex], this.data[min]) > 0) {
                collections.arrays.swap(this.data, min, nodeIndex);
                nodeIndex = min;
                min = this.minIndex(this.leftChildIndex(nodeIndex), this.rightChildIndex(nodeIndex));
            }
        };
        /**
         * Retrieves but does not remove the root element of this heap.
         * @return {*} The value at the root of the heap. Returns undefined if the
         * heap is empty.
         */
        Heap.prototype.peek = function () {
            if (this.data.length > 0) {
                return this.data[0];
            }
            else {
                return undefined;
            }
        };
        /**
         * Adds the given element into the heap.
         * @param {*} element the element.
         * @return true if the element was added or fals if it is undefined.
         */
        Heap.prototype.add = function (element) {
            if (collections.isUndefined(element)) {
                return undefined;
            }
            this.data.push(element);
            this.siftUp(this.data.length - 1);
            return true;
        };
        /**
         * Retrieves and removes the root element of this heap.
         * @return {*} The value removed from the root of the heap. Returns
         * undefined if the heap is empty.
         */
        Heap.prototype.removeRoot = function () {
            if (this.data.length > 0) {
                var obj = this.data[0];
                this.data[0] = this.data[this.data.length - 1];
                this.data.splice(this.data.length - 1, 1);
                if (this.data.length > 0) {
                    this.siftDown(0);
                }
                return obj;
            }
            return undefined;
        };
        /**
         * Returns true if this heap contains the specified element.
         * @param {Object} element element to search for.
         * @return {boolean} true if this Heap contains the specified element, false
         * otherwise.
         */
        Heap.prototype.contains = function (element) {
            var equF = collections.compareToEquals(this.compare);
            return collections.arrays.contains(this.data, element, equF);
        };
        /**
         * Returns the number of elements in this heap.
         * @return {number} the number of elements in this heap.
         */
        Heap.prototype.size = function () {
            return this.data.length;
        };
        /**
         * Checks if this heap is empty.
         * @return {boolean} true if and only if this heap contains no items; false
         * otherwise.
         */
        Heap.prototype.isEmpty = function () {
            return this.data.length <= 0;
        };
        /**
         * Removes all of the elements from this heap.
         */
        Heap.prototype.clear = function () {
            this.data.length = 0;
        };
        /**
         * Executes the provided function once for each element present in this heap in
         * no particular order.
         * @param {function(Object):*} callback function to execute, it is
         * invoked with one argument: the element value, to break the iteration you can
         * optionally return false.
         */
        Heap.prototype.forEach = function (callback) {
            collections.arrays.forEach(this.data, callback);
        };
        return Heap;
    })();
    collections.Heap = Heap;
    var Stack = (function () {
        /**
         * Creates an empty Stack.
         * @class A Stack is a Last-In-First-Out (LIFO) data structure, the last
         * element added to the stack will be the first one to be removed. This
         * implementation uses a linked list as a container.
         * @constructor
         */
        function Stack() {
            this.list = new LinkedList();
        }
        /**
         * Pushes an item onto the top of this stack.
         * @param {Object} elem the element to be pushed onto this stack.
         * @return {boolean} true if the element was pushed or false if it is undefined.
         */
        Stack.prototype.push = function (elem) {
            return this.list.add(elem, 0);
        };
        /**
         * Pushes an item onto the top of this stack.
         * @param {Object} elem the element to be pushed onto this stack.
         * @return {boolean} true if the element was pushed or false if it is undefined.
         */
        Stack.prototype.add = function (elem) {
            return this.list.add(elem, 0);
        };
        /**
         * Removes the object at the top of this stack and returns that object.
         * @return {*} the object at the top of this stack or undefined if the
         * stack is empty.
         */
        Stack.prototype.pop = function () {
            return this.list.removeElementAtIndex(0);
        };
        /**
         * Looks at the object at the top of this stack without removing it from the
         * stack.
         * @return {*} the object at the top of this stack or undefined if the
         * stack is empty.
         */
        Stack.prototype.peek = function () {
            return this.list.first();
        };
        /**
         * Returns the number of elements in this stack.
         * @return {number} the number of elements in this stack.
         */
        Stack.prototype.size = function () {
            return this.list.size();
        };
        /**
         * Returns true if this stack contains the specified element.
         * <p>If the elements inside this stack are
         * not comparable with the === operator, a custom equals function should be
         * provided to perform searches, the function must receive two arguments and
         * return true if they are equal, false otherwise. Example:</p>
         *
         * <pre>
         * var petsAreEqualByName (pet1, pet2) {
         *  return pet1.name === pet2.name;
         * }
         * </pre>
         * @param {Object} elem element to search for.
         * @param {function(Object,Object):boolean=} equalsFunction optional
         * function to check if two elements are equal.
         * @return {boolean} true if this stack contains the specified element,
         * false otherwise.
         */
        Stack.prototype.contains = function (elem, equalsFunction) {
            return this.list.contains(elem, equalsFunction);
        };
        /**
         * Checks if this stack is empty.
         * @return {boolean} true if and only if this stack contains no items; false
         * otherwise.
         */
        Stack.prototype.isEmpty = function () {
            return this.list.isEmpty();
        };
        /**
         * Removes all of the elements from this stack.
         */
        Stack.prototype.clear = function () {
            this.list.clear();
        };
        /**
         * Executes the provided function once for each element present in this stack in
         * LIFO order.
         * @param {function(Object):*} callback function to execute, it is
         * invoked with one argument: the element value, to break the iteration you can
         * optionally return false.
         */
        Stack.prototype.forEach = function (callback) {
            this.list.forEach(callback);
        };
        return Stack;
    })();
    collections.Stack = Stack; // End of stack 
    var Queue = (function () {
        /**
         * Creates an empty queue.
         * @class A queue is a First-In-First-Out (FIFO) data structure, the first
         * element added to the queue will be the first one to be removed. This
         * implementation uses a linked list as a container.
         * @constructor
         */
        function Queue() {
            this.list = new LinkedList();
        }
        /**
         * Inserts the specified element into the end of this queue.
         * @param {Object} elem the element to insert.
         * @return {boolean} true if the element was inserted, or false if it is undefined.
         */
        Queue.prototype.enqueue = function (elem) {
            return this.list.add(elem);
        };
        /**
         * Inserts the specified element into the end of this queue.
         * @param {Object} elem the element to insert.
         * @return {boolean} true if the element was inserted, or false if it is undefined.
         */
        Queue.prototype.add = function (elem) {
            return this.list.add(elem);
        };
        /**
         * Retrieves and removes the head of this queue.
         * @return {*} the head of this queue, or undefined if this queue is empty.
         */
        Queue.prototype.dequeue = function () {
            if (this.list.size() !== 0) {
                var el = this.list.first();
                this.list.removeElementAtIndex(0);
                return el;
            }
            return undefined;
        };
        /**
         * Retrieves, but does not remove, the head of this queue.
         * @return {*} the head of this queue, or undefined if this queue is empty.
         */
        Queue.prototype.peek = function () {
            if (this.list.size() !== 0) {
                return this.list.first();
            }
            return undefined;
        };
        /**
         * Returns the number of elements in this queue.
         * @return {number} the number of elements in this queue.
         */
        Queue.prototype.size = function () {
            return this.list.size();
        };
        /**
         * Returns true if this queue contains the specified element.
         * <p>If the elements inside this stack are
         * not comparable with the === operator, a custom equals function should be
         * provided to perform searches, the function must receive two arguments and
         * return true if they are equal, false otherwise. Example:</p>
         *
         * <pre>
         * var petsAreEqualByName (pet1, pet2) {
         *  return pet1.name === pet2.name;
         * }
         * </pre>
         * @param {Object} elem element to search for.
         * @param {function(Object,Object):boolean=} equalsFunction optional
         * function to check if two elements are equal.
         * @return {boolean} true if this queue contains the specified element,
         * false otherwise.
         */
        Queue.prototype.contains = function (elem, equalsFunction) {
            return this.list.contains(elem, equalsFunction);
        };
        /**
         * Checks if this queue is empty.
         * @return {boolean} true if and only if this queue contains no items; false
         * otherwise.
         */
        Queue.prototype.isEmpty = function () {
            return this.list.size() <= 0;
        };
        /**
         * Removes all of the elements from this queue.
         */
        Queue.prototype.clear = function () {
            this.list.clear();
        };
        /**
         * Executes the provided function once for each element present in this queue in
         * FIFO order.
         * @param {function(Object):*} callback function to execute, it is
         * invoked with one argument: the element value, to break the iteration you can
         * optionally return false.
         */
        Queue.prototype.forEach = function (callback) {
            this.list.forEach(callback);
        };
        return Queue;
    })();
    collections.Queue = Queue; // End of queue
    var PriorityQueue = (function () {
        /**
         * Creates an empty priority queue.
         * @class <p>In a priority queue each element is associated with a "priority",
         * elements are dequeued in highest-priority-first order (the elements with the
         * highest priority are dequeued first). Priority Queues are implemented as heaps.
         * If the inserted elements are custom objects a compare function must be provided,
         * otherwise the <=, === and >= operators are used to compare object priority.</p>
         * <pre>
         * function compare(a, b) {
         *  if (a is less than b by some ordering criterion) {
         *     return -1;
         *  } if (a is greater than b by the ordering criterion) {
         *     return 1;
         *  }
         *  // a must be equal to b
         *  return 0;
         * }
         * </pre>
         * @constructor
         * @param {function(Object,Object):number=} compareFunction optional
         * function used to compare two element priorities. Must return a negative integer,
         * zero, or a positive integer as the first argument is less than, equal to,
         * or greater than the second.
         */
        function PriorityQueue(compareFunction) {
            this.heap = new Heap(collections.reverseCompareFunction(compareFunction));
        }
        /**
         * Inserts the specified element into this priority queue.
         * @param {Object} element the element to insert.
         * @return {boolean} true if the element was inserted, or false if it is undefined.
         */
        PriorityQueue.prototype.enqueue = function (element) {
            return this.heap.add(element);
        };
        /**
         * Inserts the specified element into this priority queue.
         * @param {Object} element the element to insert.
         * @return {boolean} true if the element was inserted, or false if it is undefined.
         */
        PriorityQueue.prototype.add = function (element) {
            return this.heap.add(element);
        };
        /**
         * Retrieves and removes the highest priority element of this queue.
         * @return {*} the the highest priority element of this queue,
         *  or undefined if this queue is empty.
         */
        PriorityQueue.prototype.dequeue = function () {
            if (this.heap.size() !== 0) {
                var el = this.heap.peek();
                this.heap.removeRoot();
                return el;
            }
            return undefined;
        };
        /**
         * Retrieves, but does not remove, the highest priority element of this queue.
         * @return {*} the highest priority element of this queue, or undefined if this queue is empty.
         */
        PriorityQueue.prototype.peek = function () {
            return this.heap.peek();
        };
        /**
         * Returns true if this priority queue contains the specified element.
         * @param {Object} element element to search for.
         * @return {boolean} true if this priority queue contains the specified element,
         * false otherwise.
         */
        PriorityQueue.prototype.contains = function (element) {
            return this.heap.contains(element);
        };
        /**
         * Checks if this priority queue is empty.
         * @return {boolean} true if and only if this priority queue contains no items; false
         * otherwise.
         */
        PriorityQueue.prototype.isEmpty = function () {
            return this.heap.isEmpty();
        };
        /**
         * Returns the number of elements in this priority queue.
         * @return {number} the number of elements in this priority queue.
         */
        PriorityQueue.prototype.size = function () {
            return this.heap.size();
        };
        /**
         * Removes all of the elements from this priority queue.
         */
        PriorityQueue.prototype.clear = function () {
            this.heap.clear();
        };
        /**
         * Executes the provided function once for each element present in this queue in
         * no particular order.
         * @param {function(Object):*} callback function to execute, it is
         * invoked with one argument: the element value, to break the iteration you can
         * optionally return false.
         */
        PriorityQueue.prototype.forEach = function (callback) {
            this.heap.forEach(callback);
        };
        return PriorityQueue;
    })();
    collections.PriorityQueue = PriorityQueue; // end of priority queue
    var Set = (function () {
        /**
         * Creates an empty set.
         * @class <p>A set is a data structure that contains no duplicate items.</p>
         * <p>If the inserted elements are custom objects a function
         * which converts elements to strings must be provided. Example:</p>
         *
         * <pre>
         * function petToString(pet) {
         *  return pet.name;
         * }
         * </pre>
         *
         * @constructor
         * @param {function(Object):string=} toStringFunction optional function used
         * to convert elements to strings. If the elements aren't strings or if toString()
         * is not appropriate, a custom function which receives a onject and returns a
         * unique string must be provided.
         */
        function Set(toStringFunction) {
            this.dictionary = new Dictionary(toStringFunction);
        }
        /**
         * Returns true if this set contains the specified element.
         * @param {Object} element element to search for.
         * @return {boolean} true if this set contains the specified element,
         * false otherwise.
         */
        Set.prototype.contains = function (element) {
            return this.dictionary.containsKey(element);
        };
        /**
         * Adds the specified element to this set if it is not already present.
         * @param {Object} element the element to insert.
         * @return {boolean} true if this set did not already contain the specified element.
         */
        Set.prototype.add = function (element) {
            if (this.contains(element) || collections.isUndefined(element)) {
                return false;
            }
            else {
                this.dictionary.setValue(element, element);
                return true;
            }
        };
        /**
         * Performs an intersecion between this an another set.
         * Removes all values that are not present this set and the given set.
         * @param {collections.Set} otherSet other set.
         */
        Set.prototype.intersection = function (otherSet) {
            var set = this;
            this.forEach(function (element) {
                if (!otherSet.contains(element)) {
                    set.remove(element);
                }
                return true;
            });
        };
        /**
         * Performs a union between this an another set.
         * Adds all values from the given set to this set.
         * @param {collections.Set} otherSet other set.
         */
        Set.prototype.union = function (otherSet) {
            var set = this;
            otherSet.forEach(function (element) {
                set.add(element);
                return true;
            });
        };
        /**
         * Performs a difference between this an another set.
         * Removes from this set all the values that are present in the given set.
         * @param {collections.Set} otherSet other set.
         */
        Set.prototype.difference = function (otherSet) {
            var set = this;
            otherSet.forEach(function (element) {
                set.remove(element);
                return true;
            });
        };
        /**
         * Checks whether the given set contains all the elements in this set.
         * @param {collections.Set} otherSet other set.
         * @return {boolean} true if this set is a subset of the given set.
         */
        Set.prototype.isSubsetOf = function (otherSet) {
            if (this.size() > otherSet.size()) {
                return false;
            }
            var isSub = true;
            this.forEach(function (element) {
                if (!otherSet.contains(element)) {
                    isSub = false;
                    return false;
                }
                return true;
            });
            return isSub;
        };
        /**
         * Removes the specified element from this set if it is present.
         * @return {boolean} true if this set contained the specified element.
         */
        Set.prototype.remove = function (element) {
            if (!this.contains(element)) {
                return false;
            }
            else {
                this.dictionary.remove(element);
                return true;
            }
        };
        /**
         * Executes the provided function once for each element
         * present in this set.
         * @param {function(Object):*} callback function to execute, it is
         * invoked with one arguments: the element. To break the iteration you can
         * optionally return false.
         */
        Set.prototype.forEach = function (callback) {
            this.dictionary.forEach(function (k, v) {
                return callback(v);
            });
        };
        /**
         * Returns an array containing all of the elements in this set in arbitrary order.
         * @return {Array} an array containing all of the elements in this set.
         */
        Set.prototype.toArray = function () {
            return this.dictionary.values();
        };
        /**
         * Returns true if this set contains no elements.
         * @return {boolean} true if this set contains no elements.
         */
        Set.prototype.isEmpty = function () {
            return this.dictionary.isEmpty();
        };
        /**
         * Returns the number of elements in this set.
         * @return {number} the number of elements in this set.
         */
        Set.prototype.size = function () {
            return this.dictionary.size();
        };
        /**
         * Removes all of the elements from this set.
         */
        Set.prototype.clear = function () {
            this.dictionary.clear();
        };
        /*
        * Provides a string representation for display
        */
        Set.prototype.toString = function () {
            return collections.arrays.toString(this.toArray());
        };
        return Set;
    })();
    collections.Set = Set; // end of Set
    var Bag = (function () {
        /**
         * Creates an empty bag.
         * @class <p>A bag is a special kind of set in which members are
         * allowed to appear more than once.</p>
         * <p>If the inserted elements are custom objects a function
         * which converts elements to unique strings must be provided. Example:</p>
         *
         * <pre>
         * function petToString(pet) {
         *  return pet.name;
         * }
         * </pre>
         *
         * @constructor
         * @param {function(Object):string=} toStrFunction optional function used
         * to convert elements to strings. If the elements aren't strings or if toString()
         * is not appropriate, a custom function which receives an object and returns a
         * unique string must be provided.
         */
        function Bag(toStrFunction) {
            this.toStrF = toStrFunction || collections.defaultToString;
            this.dictionary = new Dictionary(this.toStrF);
            this.nElements = 0;
        }
        /**
        * Adds nCopies of the specified object to this bag.
        * @param {Object} element element to add.
        * @param {number=} nCopies the number of copies to add, if this argument is
        * undefined 1 copy is added.
        * @return {boolean} true unless element is undefined.
        */
        Bag.prototype.add = function (element, nCopies) {
            if (nCopies === void 0) { nCopies = 1; }
            if (collections.isUndefined(element) || nCopies <= 0) {
                return false;
            }
            if (!this.contains(element)) {
                var node = {
                    value: element,
                    copies: nCopies
                };
                this.dictionary.setValue(element, node);
            }
            else {
                this.dictionary.getValue(element).copies += nCopies;
            }
            this.nElements += nCopies;
            return true;
        };
        /**
        * Counts the number of copies of the specified object in this bag.
        * @param {Object} element the object to search for..
        * @return {number} the number of copies of the object, 0 if not found
        */
        Bag.prototype.count = function (element) {
            if (!this.contains(element)) {
                return 0;
            }
            else {
                return this.dictionary.getValue(element).copies;
            }
        };
        /**
         * Returns true if this bag contains the specified element.
         * @param {Object} element element to search for.
         * @return {boolean} true if this bag contains the specified element,
         * false otherwise.
         */
        Bag.prototype.contains = function (element) {
            return this.dictionary.containsKey(element);
        };
        /**
        * Removes nCopies of the specified object to this bag.
        * If the number of copies to remove is greater than the actual number
        * of copies in the Bag, all copies are removed.
        * @param {Object} element element to remove.
        * @param {number=} nCopies the number of copies to remove, if this argument is
        * undefined 1 copy is removed.
        * @return {boolean} true if at least 1 element was removed.
        */
        Bag.prototype.remove = function (element, nCopies) {
            if (nCopies === void 0) { nCopies = 1; }
            if (collections.isUndefined(element) || nCopies <= 0) {
                return false;
            }
            if (!this.contains(element)) {
                return false;
            }
            else {
                var node = this.dictionary.getValue(element);
                if (nCopies > node.copies) {
                    this.nElements -= node.copies;
                }
                else {
                    this.nElements -= nCopies;
                }
                node.copies -= nCopies;
                if (node.copies <= 0) {
                    this.dictionary.remove(element);
                }
                return true;
            }
        };
        /**
         * Returns an array containing all of the elements in this big in arbitrary order,
         * including multiple copies.
         * @return {Array} an array containing all of the elements in this bag.
         */
        Bag.prototype.toArray = function () {
            var a = [];
            var values = this.dictionary.values();
            var vl = values.length;
            for (var i = 0; i < vl; i++) {
                var node = values[i];
                var element = node.value;
                var copies = node.copies;
                for (var j = 0; j < copies; j++) {
                    a.push(element);
                }
            }
            return a;
        };
        /**
         * Returns a set of unique elements in this bag.
         * @return {collections.Set<T>} a set of unique elements in this bag.
         */
        Bag.prototype.toSet = function () {
            var toret = new Set(this.toStrF);
            var elements = this.dictionary.values();
            var l = elements.length;
            for (var i = 0; i < l; i++) {
                var value = elements[i].value;
                toret.add(value);
            }
            return toret;
        };
        /**
         * Executes the provided function once for each element
         * present in this bag, including multiple copies.
         * @param {function(Object):*} callback function to execute, it is
         * invoked with one argument: the element. To break the iteration you can
         * optionally return false.
         */
        Bag.prototype.forEach = function (callback) {
            this.dictionary.forEach(function (k, v) {
                var value = v.value;
                var copies = v.copies;
                for (var i = 0; i < copies; i++) {
                    if (callback(value) === false) {
                        return false;
                    }
                }
                return true;
            });
        };
        /**
         * Returns the number of elements in this bag.
         * @return {number} the number of elements in this bag.
         */
        Bag.prototype.size = function () {
            return this.nElements;
        };
        /**
         * Returns true if this bag contains no elements.
         * @return {boolean} true if this bag contains no elements.
         */
        Bag.prototype.isEmpty = function () {
            return this.nElements === 0;
        };
        /**
         * Removes all of the elements from this bag.
         */
        Bag.prototype.clear = function () {
            this.nElements = 0;
            this.dictionary.clear();
        };
        return Bag;
    })();
    collections.Bag = Bag; // End of bag 
    var BSTree = (function () {
        /**
         * Creates an empty binary search tree.
         * @class <p>A binary search tree is a binary tree in which each
         * internal node stores an element such that the elements stored in the
         * left subtree are less than it and the elements
         * stored in the right subtree are greater.</p>
         * <p>Formally, a binary search tree is a node-based binary tree data structure which
         * has the following properties:</p>
         * <ul>
         * <li>The left subtree of a node contains only nodes with elements less
         * than the node's element</li>
         * <li>The right subtree of a node contains only nodes with elements greater
         * than the node's element</li>
         * <li>Both the left and right subtrees must also be binary search trees.</li>
         * </ul>
         * <p>If the inserted elements are custom objects a compare function must
         * be provided at construction time, otherwise the <=, === and >= operators are
         * used to compare elements. Example:</p>
         * <pre>
         * function compare(a, b) {
         *  if (a is less than b by some ordering criterion) {
         *     return -1;
         *  } if (a is greater than b by the ordering criterion) {
         *     return 1;
         *  }
         *  // a must be equal to b
         *  return 0;
         * }
         * </pre>
         * @constructor
         * @param {function(Object,Object):number=} compareFunction optional
         * function used to compare two elements. Must return a negative integer,
         * zero, or a positive integer as the first argument is less than, equal to,
         * or greater than the second.
         */
        function BSTree(compareFunction) {
            this.root = null;
            this.compare = compareFunction || collections.defaultCompare;
            this.nElements = 0;
        }
        /**
         * Adds the specified element to this tree if it is not already present.
         * @param {Object} element the element to insert.
         * @return {boolean} true if this tree did not already contain the specified element.
         */
        BSTree.prototype.add = function (element) {
            if (collections.isUndefined(element)) {
                return false;
            }
            if (this.insertNode(this.createNode(element)) !== null) {
                this.nElements++;
                return true;
            }
            return false;
        };
        /**
         * Removes all of the elements from this tree.
         */
        BSTree.prototype.clear = function () {
            this.root = null;
            this.nElements = 0;
        };
        /**
         * Returns true if this tree contains no elements.
         * @return {boolean} true if this tree contains no elements.
         */
        BSTree.prototype.isEmpty = function () {
            return this.nElements === 0;
        };
        /**
         * Returns the number of elements in this tree.
         * @return {number} the number of elements in this tree.
         */
        BSTree.prototype.size = function () {
            return this.nElements;
        };
        /**
         * Returns true if this tree contains the specified element.
         * @param {Object} element element to search for.
         * @return {boolean} true if this tree contains the specified element,
         * false otherwise.
         */
        BSTree.prototype.contains = function (element) {
            if (collections.isUndefined(element)) {
                return false;
            }
            return this.searchNode(this.root, element) !== null;
        };
        /**
         * Removes the specified element from this tree if it is present.
         * @return {boolean} true if this tree contained the specified element.
         */
        BSTree.prototype.remove = function (element) {
            var node = this.searchNode(this.root, element);
            if (node === null) {
                return false;
            }
            this.removeNode(node);
            this.nElements--;
            return true;
        };
        /**
         * Executes the provided function once for each element present in this tree in
         * in-order.
         * @param {function(Object):*} callback function to execute, it is invoked with one
         * argument: the element value, to break the iteration you can optionally return false.
         */
        BSTree.prototype.inorderTraversal = function (callback) {
            this.inorderTraversalAux(this.root, callback, {
                stop: false
            });
        };
        /**
         * Executes the provided function once for each element present in this tree in pre-order.
         * @param {function(Object):*} callback function to execute, it is invoked with one
         * argument: the element value, to break the iteration you can optionally return false.
         */
        BSTree.prototype.preorderTraversal = function (callback) {
            this.preorderTraversalAux(this.root, callback, {
                stop: false
            });
        };
        /**
         * Executes the provided function once for each element present in this tree in post-order.
         * @param {function(Object):*} callback function to execute, it is invoked with one
         * argument: the element value, to break the iteration you can optionally return false.
         */
        BSTree.prototype.postorderTraversal = function (callback) {
            this.postorderTraversalAux(this.root, callback, {
                stop: false
            });
        };
        /**
         * Executes the provided function once for each element present in this tree in
         * level-order.
         * @param {function(Object):*} callback function to execute, it is invoked with one
         * argument: the element value, to break the iteration you can optionally return false.
         */
        BSTree.prototype.levelTraversal = function (callback) {
            this.levelTraversalAux(this.root, callback);
        };
        /**
         * Returns the minimum element of this tree.
         * @return {*} the minimum element of this tree or undefined if this tree is
         * is empty.
         */
        BSTree.prototype.minimum = function () {
            if (this.isEmpty()) {
                return undefined;
            }
            return this.minimumAux(this.root).element;
        };
        /**
         * Returns the maximum element of this tree.
         * @return {*} the maximum element of this tree or undefined if this tree is
         * is empty.
         */
        BSTree.prototype.maximum = function () {
            if (this.isEmpty()) {
                return undefined;
            }
            return this.maximumAux(this.root).element;
        };
        /**
         * Executes the provided function once for each element present in this tree in inorder.
         * Equivalent to inorderTraversal.
         * @param {function(Object):*} callback function to execute, it is
         * invoked with one argument: the element value, to break the iteration you can
         * optionally return false.
         */
        BSTree.prototype.forEach = function (callback) {
            this.inorderTraversal(callback);
        };
        /**
         * Returns an array containing all of the elements in this tree in in-order.
         * @return {Array} an array containing all of the elements in this tree in in-order.
         */
        BSTree.prototype.toArray = function () {
            var array = [];
            this.inorderTraversal(function (element) {
                array.push(element);
                return true;
            });
            return array;
        };
        /**
         * Returns the height of this tree.
         * @return {number} the height of this tree or -1 if is empty.
         */
        BSTree.prototype.height = function () {
            return this.heightAux(this.root);
        };
        /**
        * @private
        */
        BSTree.prototype.searchNode = function (node, element) {
            var cmp = null;
            while (node !== null && cmp !== 0) {
                cmp = this.compare(element, node.element);
                if (cmp < 0) {
                    node = node.leftCh;
                }
                else if (cmp > 0) {
                    node = node.rightCh;
                }
            }
            return node;
        };
        /**
        * @private
        */
        BSTree.prototype.transplant = function (n1, n2) {
            if (n1.parent === null) {
                this.root = n2;
            }
            else if (n1 === n1.parent.leftCh) {
                n1.parent.leftCh = n2;
            }
            else {
                n1.parent.rightCh = n2;
            }
            if (n2 !== null) {
                n2.parent = n1.parent;
            }
        };
        /**
        * @private
        */
        BSTree.prototype.removeNode = function (node) {
            if (node.leftCh === null) {
                this.transplant(node, node.rightCh);
            }
            else if (node.rightCh === null) {
                this.transplant(node, node.leftCh);
            }
            else {
                var y = this.minimumAux(node.rightCh);
                if (y.parent !== node) {
                    this.transplant(y, y.rightCh);
                    y.rightCh = node.rightCh;
                    y.rightCh.parent = y;
                }
                this.transplant(node, y);
                y.leftCh = node.leftCh;
                y.leftCh.parent = y;
            }
        };
        /**
        * @private
        */
        BSTree.prototype.inorderTraversalAux = function (node, callback, signal) {
            if (node === null || signal.stop) {
                return;
            }
            this.inorderTraversalAux(node.leftCh, callback, signal);
            if (signal.stop) {
                return;
            }
            signal.stop = callback(node.element) === false;
            if (signal.stop) {
                return;
            }
            this.inorderTraversalAux(node.rightCh, callback, signal);
        };
        /**
        * @private
        */
        BSTree.prototype.levelTraversalAux = function (node, callback) {
            var queue = new Queue();
            if (node !== null) {
                queue.enqueue(node);
            }
            while (!queue.isEmpty()) {
                node = queue.dequeue();
                if (callback(node.element) === false) {
                    return;
                }
                if (node.leftCh !== null) {
                    queue.enqueue(node.leftCh);
                }
                if (node.rightCh !== null) {
                    queue.enqueue(node.rightCh);
                }
            }
        };
        /**
        * @private
        */
        BSTree.prototype.preorderTraversalAux = function (node, callback, signal) {
            if (node === null || signal.stop) {
                return;
            }
            signal.stop = callback(node.element) === false;
            if (signal.stop) {
                return;
            }
            this.preorderTraversalAux(node.leftCh, callback, signal);
            if (signal.stop) {
                return;
            }
            this.preorderTraversalAux(node.rightCh, callback, signal);
        };
        /**
        * @private
        */
        BSTree.prototype.postorderTraversalAux = function (node, callback, signal) {
            if (node === null || signal.stop) {
                return;
            }
            this.postorderTraversalAux(node.leftCh, callback, signal);
            if (signal.stop) {
                return;
            }
            this.postorderTraversalAux(node.rightCh, callback, signal);
            if (signal.stop) {
                return;
            }
            signal.stop = callback(node.element) === false;
        };
        /**
        * @private
        */
        BSTree.prototype.minimumAux = function (node) {
            while (node.leftCh !== null) {
                node = node.leftCh;
            }
            return node;
        };
        /**
        * @private
        */
        BSTree.prototype.maximumAux = function (node) {
            while (node.rightCh !== null) {
                node = node.rightCh;
            }
            return node;
        };
        /**
          * @private
          */
        BSTree.prototype.heightAux = function (node) {
            if (node === null) {
                return -1;
            }
            return Math.max(this.heightAux(node.leftCh), this.heightAux(node.rightCh)) + 1;
        };
        /*
        * @private
        */
        BSTree.prototype.insertNode = function (node) {
            var parent = null;
            var position = this.root;
            var cmp = null;
            while (position !== null) {
                cmp = this.compare(node.element, position.element);
                if (cmp === 0) {
                    return null;
                }
                else if (cmp < 0) {
                    parent = position;
                    position = position.leftCh;
                }
                else {
                    parent = position;
                    position = position.rightCh;
                }
            }
            node.parent = parent;
            if (parent === null) {
                // tree is empty
                this.root = node;
            }
            else if (this.compare(node.element, parent.element) < 0) {
                parent.leftCh = node;
            }
            else {
                parent.rightCh = node;
            }
            return node;
        };
        /**
        * @private
        */
        BSTree.prototype.createNode = function (element) {
            return {
                element: element,
                leftCh: null,
                rightCh: null,
                parent: null
            };
        };
        return BSTree;
    })();
    collections.BSTree = BSTree; // end of BSTree
})(collections || (collections = {})); // End of module 
//# sourceMappingURL=collections.js.map
/* Phaser v2.4.7 - http://phaser.io - @photonstorm - (c) 2016 Photon Storm Ltd. */

(function(){var a=this,b=b||{};return b.game=null,b.WEBGL_RENDERER=0,b.CANVAS_RENDERER=1,b.VERSION="v2.2.9",b._UID=0,"undefined"!=typeof Float32Array?(b.Float32Array=Float32Array,b.Uint16Array=Uint16Array,b.Uint32Array=Uint32Array,b.ArrayBuffer=ArrayBuffer):(b.Float32Array=Array,b.Uint16Array=Array),b.PI_2=2*Math.PI,b.RAD_TO_DEG=180/Math.PI,b.DEG_TO_RAD=Math.PI/180,b.RETINA_PREFIX="@2x",b.DisplayObject=function(){this.position=new b.Point(0,0),this.scale=new b.Point(1,1),this.pivot=new b.Point(0,0),this.rotation=0,this.alpha=1,this.visible=!0,this.hitArea=null,this.renderable=!1,this.parent=null,this.stage=null,this.worldAlpha=1,this.worldTransform=new b.Matrix,this.worldPosition=new b.Point(0,0),this.worldScale=new b.Point(1,1),this.worldRotation=0,this._sr=0,this._cr=1,this.filterArea=null,this._bounds=new b.Rectangle(0,0,1,1),this._currentBounds=null,this._mask=null,this._cacheAsBitmap=!1,this._cacheIsDirty=!1},b.DisplayObject.prototype.constructor=b.DisplayObject,b.DisplayObject.prototype.destroy=function(){if(this.children){for(var a=this.children.length;a--;)this.children[a].destroy();this.children=[]}this.hitArea=null,this.parent=null,this.stage=null,this.worldTransform=null,this.filterArea=null,this._bounds=null,this._currentBounds=null,this._mask=null,this.renderable=!1,this._destroyCachedSprite()},Object.defineProperty(b.DisplayObject.prototype,"worldVisible",{get:function(){var a=this;do{if(!a.visible)return!1;a=a.parent}while(a);return!0}}),Object.defineProperty(b.DisplayObject.prototype,"mask",{get:function(){return this._mask},set:function(a){this._mask&&(this._mask.isMask=!1),this._mask=a,this._mask&&(this._mask.isMask=!0)}}),Object.defineProperty(b.DisplayObject.prototype,"filters",{get:function(){return this._filters},set:function(a){if(a){for(var c=[],d=0;d<a.length;d++)for(var e=a[d].passes,f=0;f<e.length;f++)c.push(e[f]);this._filterBlock={target:this,filterPasses:c}}this._filters=a,this.blendMode&&this.blendMode===b.blendModes.MULTIPLY&&(this.blendMode=b.blendModes.NORMAL)}}),Object.defineProperty(b.DisplayObject.prototype,"cacheAsBitmap",{get:function(){return this._cacheAsBitmap},set:function(a){this._cacheAsBitmap!==a&&(a?this._generateCachedSprite():this._destroyCachedSprite(),this._cacheAsBitmap=a)}}),b.DisplayObject.prototype.updateTransform=function(a){if(a||this.parent||this.game){var c=this.parent;a?c=a:this.parent||(c=this.game.world);var d,e,f,g,h,i,j=c.worldTransform,k=this.worldTransform;this.rotation%b.PI_2?(this.rotation!==this.rotationCache&&(this.rotationCache=this.rotation,this._sr=Math.sin(this.rotation),this._cr=Math.cos(this.rotation)),d=this._cr*this.scale.x,e=this._sr*this.scale.x,f=-this._sr*this.scale.y,g=this._cr*this.scale.y,h=this.position.x,i=this.position.y,(this.pivot.x||this.pivot.y)&&(h-=this.pivot.x*d+this.pivot.y*f,i-=this.pivot.x*e+this.pivot.y*g),k.a=d*j.a+e*j.c,k.b=d*j.b+e*j.d,k.c=f*j.a+g*j.c,k.d=f*j.b+g*j.d,k.tx=h*j.a+i*j.c+j.tx,k.ty=h*j.b+i*j.d+j.ty):(d=this.scale.x,g=this.scale.y,h=this.position.x-this.pivot.x*d,i=this.position.y-this.pivot.y*g,k.a=d*j.a,k.b=d*j.b,k.c=g*j.c,k.d=g*j.d,k.tx=h*j.a+i*j.c+j.tx,k.ty=h*j.b+i*j.d+j.ty),this.worldAlpha=this.alpha*c.worldAlpha,this.worldPosition.set(k.tx,k.ty),this.worldScale.set(Math.sqrt(k.a*k.a+k.b*k.b),Math.sqrt(k.c*k.c+k.d*k.d)),this.worldRotation=Math.atan2(-k.c,k.d),this._currentBounds=null,this.transformCallback&&this.transformCallback.call(this.transformCallbackContext,k,j)}},b.DisplayObject.prototype.displayObjectUpdateTransform=b.DisplayObject.prototype.updateTransform,b.DisplayObject.prototype.getBounds=function(a){return a=a,b.EmptyRectangle},b.DisplayObject.prototype.getLocalBounds=function(){return this.getBounds(b.identityMatrix)},b.DisplayObject.prototype.setStageReference=function(a){this.stage=a},b.DisplayObject.prototype.preUpdate=function(){},b.DisplayObject.prototype.generateTexture=function(a,c,d){var e=this.getLocalBounds(),f=new b.RenderTexture(0|e.width,0|e.height,d,c,a);return b.DisplayObject._tempMatrix.tx=-e.x,b.DisplayObject._tempMatrix.ty=-e.y,f.render(this,b.DisplayObject._tempMatrix),f},b.DisplayObject.prototype.updateCache=function(){this._generateCachedSprite()},b.DisplayObject.prototype.toGlobal=function(a){return this.displayObjectUpdateTransform(),this.worldTransform.apply(a)},b.DisplayObject.prototype.toLocal=function(a,b){return b&&(a=b.toGlobal(a)),this.displayObjectUpdateTransform(),this.worldTransform.applyInverse(a)},b.DisplayObject.prototype._renderCachedSprite=function(a){this._cachedSprite.worldAlpha=this.worldAlpha,a.gl?b.Sprite.prototype._renderWebGL.call(this._cachedSprite,a):b.Sprite.prototype._renderCanvas.call(this._cachedSprite,a)},b.DisplayObject.prototype._generateCachedSprite=function(){this._cacheAsBitmap=!1;var a=this.getLocalBounds();if(a.width=Math.max(1,Math.ceil(a.width)),a.height=Math.max(1,Math.ceil(a.height)),this.updateTransform(),this._cachedSprite)this._cachedSprite.texture.resize(a.width,a.height);else{var c=new b.RenderTexture(a.width,a.height);this._cachedSprite=new b.Sprite(c),this._cachedSprite.worldTransform=this.worldTransform}var d=this._filters;this._filters=null,this._cachedSprite.filters=d,b.DisplayObject._tempMatrix.tx=-a.x,b.DisplayObject._tempMatrix.ty=-a.y,this._cachedSprite.texture.render(this,b.DisplayObject._tempMatrix,!0),this._cachedSprite.anchor.x=-(a.x/a.width),this._cachedSprite.anchor.y=-(a.y/a.height),this._filters=d,this._cacheAsBitmap=!0},b.DisplayObject.prototype._destroyCachedSprite=function(){this._cachedSprite&&(this._cachedSprite.texture.destroy(!0),this._cachedSprite=null)},b.DisplayObject.prototype._renderWebGL=function(a){a=a},b.DisplayObject.prototype._renderCanvas=function(a){a=a},Object.defineProperty(b.DisplayObject.prototype,"x",{get:function(){return this.position.x},set:function(a){this.position.x=a}}),Object.defineProperty(b.DisplayObject.prototype,"y",{get:function(){return this.position.y},set:function(a){this.position.y=a}}),b.DisplayObjectContainer=function(){b.DisplayObject.call(this),this.children=[]},b.DisplayObjectContainer.prototype=Object.create(b.DisplayObject.prototype),b.DisplayObjectContainer.prototype.constructor=b.DisplayObjectContainer,Object.defineProperty(b.DisplayObjectContainer.prototype,"width",{get:function(){return this.scale.x*this.getLocalBounds().width},set:function(a){var b=this.getLocalBounds().width;0!==b?this.scale.x=a/b:this.scale.x=1,this._width=a}}),Object.defineProperty(b.DisplayObjectContainer.prototype,"height",{get:function(){return this.scale.y*this.getLocalBounds().height},set:function(a){var b=this.getLocalBounds().height;0!==b?this.scale.y=a/b:this.scale.y=1,this._height=a}}),b.DisplayObjectContainer.prototype.addChild=function(a){return this.addChildAt(a,this.children.length)},b.DisplayObjectContainer.prototype.addChildAt=function(a,b){if(b>=0&&b<=this.children.length)return a.parent&&a.parent.removeChild(a),a.parent=this,this.children.splice(b,0,a),this.stage&&a.setStageReference(this.stage),a;throw new Error(a+"addChildAt: The index "+b+" supplied is out of bounds "+this.children.length)},b.DisplayObjectContainer.prototype.swapChildren=function(a,b){if(a!==b){var c=this.getChildIndex(a),d=this.getChildIndex(b);if(0>c||0>d)throw new Error("swapChildren: Both the supplied DisplayObjects must be a child of the caller.");this.children[c]=b,this.children[d]=a}},b.DisplayObjectContainer.prototype.getChildIndex=function(a){var b=this.children.indexOf(a);if(-1===b)throw new Error("The supplied DisplayObject must be a child of the caller");return b},b.DisplayObjectContainer.prototype.setChildIndex=function(a,b){if(0>b||b>=this.children.length)throw new Error("The supplied index is out of bounds");var c=this.getChildIndex(a);this.children.splice(c,1),this.children.splice(b,0,a)},b.DisplayObjectContainer.prototype.getChildAt=function(a){if(0>a||a>=this.children.length)throw new Error("getChildAt: Supplied index "+a+" does not exist in the child list, or the supplied DisplayObject must be a child of the caller");return this.children[a]},b.DisplayObjectContainer.prototype.removeChild=function(a){var b=this.children.indexOf(a);if(-1!==b)return this.removeChildAt(b)},b.DisplayObjectContainer.prototype.removeChildAt=function(a){var b=this.getChildAt(a);return this.stage&&b.removeStageReference(),b.parent=void 0,this.children.splice(a,1),b},b.DisplayObjectContainer.prototype.removeChildren=function(a,b){var c=a||0,d="number"==typeof b?b:this.children.length,e=d-c;if(e>0&&d>=e){for(var f=this.children.splice(c,e),g=0;g<f.length;g++){var h=f[g];this.stage&&h.removeStageReference(),h.parent=void 0}return f}if(0===e&&0===this.children.length)return[];throw new Error("removeChildren: Range Error, numeric values are outside the acceptable range")},b.DisplayObjectContainer.prototype.updateTransform=function(){if(this.visible&&(this.displayObjectUpdateTransform(),!this._cacheAsBitmap))for(var a=0;a<this.children.length;a++)this.children[a].updateTransform()},b.DisplayObjectContainer.prototype.displayObjectContainerUpdateTransform=b.DisplayObjectContainer.prototype.updateTransform,b.DisplayObjectContainer.prototype.getBounds=function(){if(0===this.children.length)return b.EmptyRectangle;for(var a,c,d,e=1/0,f=1/0,g=-(1/0),h=-(1/0),i=!1,j=0;j<this.children.length;j++){var k=this.children[j];k.visible&&(i=!0,a=this.children[j].getBounds(),e=e<a.x?e:a.x,f=f<a.y?f:a.y,c=a.width+a.x,d=a.height+a.y,g=g>c?g:c,h=h>d?h:d)}if(!i)return b.EmptyRectangle;var l=this._bounds;return l.x=e,l.y=f,l.width=g-e,l.height=h-f,l},b.DisplayObjectContainer.prototype.getLocalBounds=function(){var a=this.worldTransform;this.worldTransform=b.identityMatrix;for(var c=0;c<this.children.length;c++)this.children[c].updateTransform();var d=this.getBounds();for(this.worldTransform=a,c=0;c<this.children.length;c++)this.children[c].updateTransform();return d},b.DisplayObjectContainer.prototype.setStageReference=function(a){this.stage=a;for(var b=0;b<this.children.length;b++)this.children[b].setStageReference(a)},b.DisplayObjectContainer.prototype.removeStageReference=function(){for(var a=0;a<this.children.length;a++)this.children[a].removeStageReference();this.stage=null},b.DisplayObjectContainer.prototype._renderWebGL=function(a){if(this.visible&&!(this.alpha<=0)){if(this._cacheAsBitmap)return void this._renderCachedSprite(a);var b;if(this._mask||this._filters){for(this._filters&&(a.spriteBatch.flush(),a.filterManager.pushFilter(this._filterBlock)),this._mask&&(a.spriteBatch.stop(),a.maskManager.pushMask(this.mask,a),a.spriteBatch.start()),b=0;b<this.children.length;b++)this.children[b]._renderWebGL(a);a.spriteBatch.stop(),this._mask&&a.maskManager.popMask(this._mask,a),this._filters&&a.filterManager.popFilter(),a.spriteBatch.start()}else for(b=0;b<this.children.length;b++)this.children[b]._renderWebGL(a)}},b.DisplayObjectContainer.prototype._renderCanvas=function(a){if(this.visible!==!1&&0!==this.alpha){if(this._cacheAsBitmap)return void this._renderCachedSprite(a);this._mask&&a.maskManager.pushMask(this._mask,a);for(var b=0;b<this.children.length;b++)this.children[b]._renderCanvas(a);this._mask&&a.maskManager.popMask(a)}},b.Sprite=function(a){b.DisplayObjectContainer.call(this),this.anchor=new b.Point,this.texture=a||b.Texture.emptyTexture,this._width=0,this._height=0,this.tint=16777215,this.cachedTint=-1,this.tintedTexture=null,this.blendMode=b.blendModes.NORMAL,this.shader=null,this.texture.baseTexture.hasLoaded&&this.onTextureUpdate(),this.renderable=!0},b.Sprite.prototype=Object.create(b.DisplayObjectContainer.prototype),b.Sprite.prototype.constructor=b.Sprite,Object.defineProperty(b.Sprite.prototype,"width",{get:function(){return this.scale.x*this.texture.frame.width},set:function(a){this.scale.x=a/this.texture.frame.width,this._width=a}}),Object.defineProperty(b.Sprite.prototype,"height",{get:function(){return this.scale.y*this.texture.frame.height},set:function(a){this.scale.y=a/this.texture.frame.height,this._height=a}}),b.Sprite.prototype.setTexture=function(a,b){void 0!==b&&this.texture.baseTexture.destroy(),this.texture.baseTexture.skipRender=!1,this.texture=a,this.texture.valid=!0,this.cachedTint=-1},b.Sprite.prototype.onTextureUpdate=function(){this._width&&(this.scale.x=this._width/this.texture.frame.width),this._height&&(this.scale.y=this._height/this.texture.frame.height)},b.Sprite.prototype.getBounds=function(a){var b=this.texture.frame.width,c=this.texture.frame.height,d=b*(1-this.anchor.x),e=b*-this.anchor.x,f=c*(1-this.anchor.y),g=c*-this.anchor.y,h=a||this.worldTransform,i=h.a,j=h.b,k=h.c,l=h.d,m=h.tx,n=h.ty,o=-(1/0),p=-(1/0),q=1/0,r=1/0;if(0===j&&0===k){if(0>i){i*=-1;var s=d;d=-e,e=-s}if(0>l){l*=-1;var s=f;f=-g,g=-s}q=i*e+m,o=i*d+m,r=l*g+n,p=l*f+n}else{var t=i*e+k*g+m,u=l*g+j*e+n,v=i*d+k*g+m,w=l*g+j*d+n,x=i*d+k*f+m,y=l*f+j*d+n,z=i*e+k*f+m,A=l*f+j*e+n;q=q>t?t:q,q=q>v?v:q,q=q>x?x:q,q=q>z?z:q,r=r>u?u:r,r=r>w?w:r,r=r>y?y:r,r=r>A?A:r,o=t>o?t:o,o=v>o?v:o,o=x>o?x:o,o=z>o?z:o,p=u>p?u:p,p=w>p?w:p,p=y>p?y:p,p=A>p?A:p}var B=this._bounds;return B.x=q,B.width=o-q,B.y=r,B.height=p-r,this._currentBounds=B,B},b.Sprite.prototype._renderWebGL=function(a,b){if(this.visible&&!(this.alpha<=0)&&this.renderable){var c=this.worldTransform;if(b&&(c=b),this._mask||this._filters){var d=a.spriteBatch;this._filters&&(d.flush(),a.filterManager.pushFilter(this._filterBlock)),this._mask&&(d.stop(),a.maskManager.pushMask(this.mask,a),d.start()),d.render(this);for(var e=0;e<this.children.length;e++)this.children[e]._renderWebGL(a);d.stop(),this._mask&&a.maskManager.popMask(this._mask,a),this._filters&&a.filterManager.popFilter(),d.start()}else{a.spriteBatch.render(this);for(var e=0;e<this.children.length;e++)this.children[e]._renderWebGL(a,c)}}},b.Sprite.prototype._renderCanvas=function(a,c){if(!(!this.visible||0===this.alpha||!this.renderable||this.texture.crop.width<=0||this.texture.crop.height<=0)){var d=this.worldTransform;if(c&&(d=c),this.blendMode!==a.currentBlendMode&&(a.currentBlendMode=this.blendMode,a.context.globalCompositeOperation=b.blendModesCanvas[a.currentBlendMode]),this._mask&&a.maskManager.pushMask(this._mask,a),this.texture.valid){var e=this.texture.baseTexture.resolution/a.resolution;a.context.globalAlpha=this.worldAlpha,a.smoothProperty&&a.scaleMode!==this.texture.baseTexture.scaleMode&&(a.scaleMode=this.texture.baseTexture.scaleMode,a.context[a.smoothProperty]=a.scaleMode===b.scaleModes.LINEAR);var f=this.texture.trim?this.texture.trim.x-this.anchor.x*this.texture.trim.width:this.anchor.x*-this.texture.frame.width,g=this.texture.trim?this.texture.trim.y-this.anchor.y*this.texture.trim.height:this.anchor.y*-this.texture.frame.height,h=d.tx*a.resolution+a.shakeX,i=d.ty*a.resolution+a.shakeY;a.roundPixels?(a.context.setTransform(d.a,d.b,d.c,d.d,0|h,0|i),f|=0,g|=0):a.context.setTransform(d.a,d.b,d.c,d.d,h,i);var j=this.texture.crop.width,k=this.texture.crop.height;if(f/=e,g/=e,16777215!==this.tint)(this.texture.requiresReTint||this.cachedTint!==this.tint)&&(this.tintedTexture=b.CanvasTinter.getTintedTexture(this,this.tint),this.cachedTint=this.tint),a.context.drawImage(this.tintedTexture,0,0,j,k,f,g,j/e,k/e);else{var l=this.texture.crop.x,m=this.texture.crop.y;a.context.drawImage(this.texture.baseTexture.source,l,m,j,k,f,g,j/e,k/e)}}for(var n=0;n<this.children.length;n++)this.children[n]._renderCanvas(a);this._mask&&a.maskManager.popMask(a)}},b.Sprite.fromFrame=function(a){var c=b.TextureCache[a];if(!c)throw new Error('The frameId "'+a+'" does not exist in the texture cache'+this);return new b.Sprite(c)},b.Sprite.fromImage=function(a,c,d){var e=b.Texture.fromImage(a,c,d);return new b.Sprite(e)},b.SpriteBatch=function(a){b.DisplayObjectContainer.call(this),this.textureThing=a,this.ready=!1},b.SpriteBatch.prototype=Object.create(b.DisplayObjectContainer.prototype),b.SpriteBatch.prototype.constructor=b.SpriteBatch,b.SpriteBatch.prototype.initWebGL=function(a){this.fastSpriteBatch=new b.WebGLFastSpriteBatch(a),this.ready=!0},b.SpriteBatch.prototype.updateTransform=function(){this.displayObjectUpdateTransform()},b.SpriteBatch.prototype._renderWebGL=function(a){!this.visible||this.alpha<=0||!this.children.length||(this.ready||this.initWebGL(a.gl),this.fastSpriteBatch.gl!==a.gl&&this.fastSpriteBatch.setContext(a.gl),a.spriteBatch.stop(),a.shaderManager.setShader(a.shaderManager.fastShader),this.fastSpriteBatch.begin(this,a),this.fastSpriteBatch.render(this),a.spriteBatch.start())},b.SpriteBatch.prototype._renderCanvas=function(a){if(this.visible&&!(this.alpha<=0)&&this.children.length){var b=a.context;b.globalAlpha=this.worldAlpha,this.displayObjectUpdateTransform();for(var c=this.worldTransform,d=!0,e=0;e<this.children.length;e++){var f=this.children[e];if(f.visible){var g=f.texture,h=g.frame;if(b.globalAlpha=this.worldAlpha*f.alpha,f.rotation%(2*Math.PI)===0)d&&(b.setTransform(c.a,c.b,c.c,c.d,c.tx,c.ty),d=!1),b.drawImage(g.baseTexture.source,h.x,h.y,h.width,h.height,f.anchor.x*(-h.width*f.scale.x)+f.position.x+.5+a.shakeX|0,f.anchor.y*(-h.height*f.scale.y)+f.position.y+.5+a.shakeY|0,h.width*f.scale.x,h.height*f.scale.y);else{d||(d=!0),f.displayObjectUpdateTransform();var i=f.worldTransform,j=i.tx*a.resolution+a.shakeX,k=i.ty*a.resolution+a.shakeY;a.roundPixels?b.setTransform(i.a,i.b,i.c,i.d,0|j,0|k):b.setTransform(i.a,i.b,i.c,i.d,j,k),b.drawImage(g.baseTexture.source,h.x,h.y,h.width,h.height,f.anchor.x*-h.width+.5|0,f.anchor.y*-h.height+.5|0,h.width,h.height)}}}}},b.hex2rgb=function(a){return[(a>>16&255)/255,(a>>8&255)/255,(255&a)/255]},b.rgb2hex=function(a){return(255*a[0]<<16)+(255*a[1]<<8)+255*a[2]},b.canUseNewCanvasBlendModes=function(){if(void 0===document)return!1;var a="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAABAQMAAADD8p2OAAAAA1BMVEX/",c="AAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==",d=new Image;d.src=a+"AP804Oa6"+c;var e=new Image;e.src=a+"/wCKxvRF"+c;var f=b.CanvasPool.create(this,6,1),g=f.getContext("2d");if(g.globalCompositeOperation="multiply",g.drawImage(d,0,0),g.drawImage(e,2,0),!g.getImageData(2,0,1,1))return!1;var h=g.getImageData(2,0,1,1).data;return b.CanvasPool.remove(this),255===h[0]&&0===h[1]&&0===h[2]},b.getNextPowerOfTwo=function(a){if(a>0&&0===(a&a-1))return a;for(var b=1;a>b;)b<<=1;return b},b.isPowerOfTwo=function(a,b){return a>0&&0===(a&a-1)&&b>0&&0===(b&b-1)},b.CanvasPool={create:function(a,c,d){var e,f=b.CanvasPool.getFirst();if(-1===f){var g={parent:a,canvas:document.createElement("canvas")};b.CanvasPool.pool.push(g),e=g.canvas}else b.CanvasPool.pool[f].parent=a,e=b.CanvasPool.pool[f].canvas;return void 0!==c&&(e.width=c,e.height=d),e},getFirst:function(){for(var a=b.CanvasPool.pool,c=0;c<a.length;c++)if(null===a[c].parent)return c;return-1},remove:function(a){for(var c=b.CanvasPool.pool,d=0;d<c.length;d++)c[d].parent===a&&(c[d].parent=null)},removeByCanvas:function(a){for(var c=b.CanvasPool.pool,d=0;d<c.length;d++)c[d].canvas===a&&(c[d].parent=null)},getTotal:function(){for(var a=b.CanvasPool.pool,c=0,d=0;d<a.length;d++)null!==a[d].parent&&c++;return c},getFree:function(){for(var a=b.CanvasPool.pool,c=0,d=0;d<a.length;d++)null===a[d].parent&&c++;return c}},b.CanvasPool.pool=[],b.initDefaultShaders=function(){},b.CompileVertexShader=function(a,c){return b._CompileShader(a,c,a.VERTEX_SHADER)},b.CompileFragmentShader=function(a,c){return b._CompileShader(a,c,a.FRAGMENT_SHADER)},b._CompileShader=function(a,b,c){var d=b;Array.isArray(b)&&(d=b.join("\n"));var e=a.createShader(c);return a.shaderSource(e,d),a.compileShader(e),a.getShaderParameter(e,a.COMPILE_STATUS)?e:(window.console.log(a.getShaderInfoLog(e)),null)},b.compileProgram=function(a,c,d){var e=b.CompileFragmentShader(a,d),f=b.CompileVertexShader(a,c),g=a.createProgram();return a.attachShader(g,f),a.attachShader(g,e),a.linkProgram(g),a.getProgramParameter(g,a.LINK_STATUS)||window.console.log("Could not initialise shaders"),g},b.PixiShader=function(a){this._UID=b._UID++,this.gl=a,this.program=null,this.fragmentSrc=["precision lowp float;","varying vec2 vTextureCoord;","varying vec4 vColor;","uniform sampler2D uSampler;","void main(void) {","   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor ;","}"],this.textureCount=0,this.firstRun=!0,this.dirty=!0,this.attributes=[],this.init()},b.PixiShader.prototype.constructor=b.PixiShader,b.PixiShader.prototype.init=function(){var a=this.gl,c=b.compileProgram(a,this.vertexSrc||b.PixiShader.defaultVertexSrc,this.fragmentSrc);a.useProgram(c),this.uSampler=a.getUniformLocation(c,"uSampler"),this.projectionVector=a.getUniformLocation(c,"projectionVector"),this.offsetVector=a.getUniformLocation(c,"offsetVector"),this.dimensions=a.getUniformLocation(c,"dimensions"),this.aVertexPosition=a.getAttribLocation(c,"aVertexPosition"),this.aTextureCoord=a.getAttribLocation(c,"aTextureCoord"),this.colorAttribute=a.getAttribLocation(c,"aColor"),-1===this.colorAttribute&&(this.colorAttribute=2),this.attributes=[this.aVertexPosition,this.aTextureCoord,this.colorAttribute];for(var d in this.uniforms)this.uniforms[d].uniformLocation=a.getUniformLocation(c,d);this.initUniforms(),this.program=c},b.PixiShader.prototype.initUniforms=function(){this.textureCount=1;var a,b=this.gl;for(var c in this.uniforms){a=this.uniforms[c];var d=a.type;"sampler2D"===d?(a._init=!1,null!==a.value&&this.initSampler2D(a)):"mat2"===d||"mat3"===d||"mat4"===d?(a.glMatrix=!0,a.glValueLength=1,"mat2"===d?a.glFunc=b.uniformMatrix2fv:"mat3"===d?a.glFunc=b.uniformMatrix3fv:"mat4"===d&&(a.glFunc=b.uniformMatrix4fv)):(a.glFunc=b["uniform"+d],"2f"===d||"2i"===d?a.glValueLength=2:"3f"===d||"3i"===d?a.glValueLength=3:"4f"===d||"4i"===d?a.glValueLength=4:a.glValueLength=1)}},b.PixiShader.prototype.initSampler2D=function(a){if(a.value&&a.value.baseTexture&&a.value.baseTexture.hasLoaded){var b=this.gl;if(b.activeTexture(b["TEXTURE"+this.textureCount]),b.bindTexture(b.TEXTURE_2D,a.value.baseTexture._glTextures[b.id]),a.textureData){var c=a.textureData,d=c.magFilter?c.magFilter:b.LINEAR,e=c.minFilter?c.minFilter:b.LINEAR,f=c.wrapS?c.wrapS:b.CLAMP_TO_EDGE,g=c.wrapT?c.wrapT:b.CLAMP_TO_EDGE,h=c.luminance?b.LUMINANCE:b.RGBA;if(c.repeat&&(f=b.REPEAT,g=b.REPEAT),b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL,!!c.flipY),c.width){var i=c.width?c.width:512,j=c.height?c.height:2,k=c.border?c.border:0;b.texImage2D(b.TEXTURE_2D,0,h,i,j,k,h,b.UNSIGNED_BYTE,null)}else b.texImage2D(b.TEXTURE_2D,0,h,b.RGBA,b.UNSIGNED_BYTE,a.value.baseTexture.source);b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MAG_FILTER,d),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MIN_FILTER,e),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_WRAP_S,f),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_WRAP_T,g)}b.uniform1i(a.uniformLocation,this.textureCount),a._init=!0,this.textureCount++}},b.PixiShader.prototype.syncUniforms=function(){this.textureCount=1;var a,c=this.gl;for(var d in this.uniforms)a=this.uniforms[d],1===a.glValueLength?a.glMatrix===!0?a.glFunc.call(c,a.uniformLocation,a.transpose,a.value):a.glFunc.call(c,a.uniformLocation,a.value):2===a.glValueLength?a.glFunc.call(c,a.uniformLocation,a.value.x,a.value.y):3===a.glValueLength?a.glFunc.call(c,a.uniformLocation,a.value.x,a.value.y,a.value.z):4===a.glValueLength?a.glFunc.call(c,a.uniformLocation,a.value.x,a.value.y,a.value.z,a.value.w):"sampler2D"===a.type&&(a._init?(c.activeTexture(c["TEXTURE"+this.textureCount]),a.value.baseTexture._dirty[c.id]?b.instances[c.id].updateTexture(a.value.baseTexture):c.bindTexture(c.TEXTURE_2D,a.value.baseTexture._glTextures[c.id]),c.uniform1i(a.uniformLocation,this.textureCount),this.textureCount++):this.initSampler2D(a))},b.PixiShader.prototype.destroy=function(){this.gl.deleteProgram(this.program),this.uniforms=null,this.gl=null,this.attributes=null},b.PixiShader.defaultVertexSrc=["attribute vec2 aVertexPosition;","attribute vec2 aTextureCoord;","attribute vec4 aColor;","uniform vec2 projectionVector;","uniform vec2 offsetVector;","varying vec2 vTextureCoord;","varying vec4 vColor;","const vec2 center = vec2(-1.0, 1.0);","void main(void) {","   gl_Position = vec4( ((aVertexPosition + offsetVector) / projectionVector) + center , 0.0, 1.0);","   vTextureCoord = aTextureCoord;","   vColor = vec4(aColor.rgb * aColor.a, aColor.a);","}"],b.PixiFastShader=function(a){this._UID=b._UID++,this.gl=a,this.program=null,this.fragmentSrc=["precision lowp float;","varying vec2 vTextureCoord;","varying float vColor;","uniform sampler2D uSampler;","void main(void) {","   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor ;","}"],this.vertexSrc=["attribute vec2 aVertexPosition;","attribute vec2 aPositionCoord;","attribute vec2 aScale;","attribute float aRotation;","attribute vec2 aTextureCoord;","attribute float aColor;","uniform vec2 projectionVector;","uniform vec2 offsetVector;","uniform mat3 uMatrix;","varying vec2 vTextureCoord;","varying float vColor;","const vec2 center = vec2(-1.0, 1.0);","void main(void) {","   vec2 v;","   vec2 sv = aVertexPosition * aScale;","   v.x = (sv.x) * cos(aRotation) - (sv.y) * sin(aRotation);","   v.y = (sv.x) * sin(aRotation) + (sv.y) * cos(aRotation);","   v = ( uMatrix * vec3(v + aPositionCoord , 1.0) ).xy ;","   gl_Position = vec4( ( v / projectionVector) + center , 0.0, 1.0);","   vTextureCoord = aTextureCoord;","   vColor = aColor;","}"],this.textureCount=0,this.init()},b.PixiFastShader.prototype.constructor=b.PixiFastShader,b.PixiFastShader.prototype.init=function(){var a=this.gl,c=b.compileProgram(a,this.vertexSrc,this.fragmentSrc);a.useProgram(c),this.uSampler=a.getUniformLocation(c,"uSampler"),this.projectionVector=a.getUniformLocation(c,"projectionVector"),this.offsetVector=a.getUniformLocation(c,"offsetVector"),this.dimensions=a.getUniformLocation(c,"dimensions"),this.uMatrix=a.getUniformLocation(c,"uMatrix"),this.aVertexPosition=a.getAttribLocation(c,"aVertexPosition"),this.aPositionCoord=a.getAttribLocation(c,"aPositionCoord"),this.aScale=a.getAttribLocation(c,"aScale"),this.aRotation=a.getAttribLocation(c,"aRotation"),this.aTextureCoord=a.getAttribLocation(c,"aTextureCoord"),this.colorAttribute=a.getAttribLocation(c,"aColor"),-1===this.colorAttribute&&(this.colorAttribute=2),this.attributes=[this.aVertexPosition,this.aPositionCoord,this.aScale,this.aRotation,this.aTextureCoord,this.colorAttribute],this.program=c},b.PixiFastShader.prototype.destroy=function(){this.gl.deleteProgram(this.program),this.uniforms=null,this.gl=null,this.attributes=null},b.StripShader=function(a){this._UID=b._UID++,this.gl=a,this.program=null,this.fragmentSrc=["precision mediump float;","varying vec2 vTextureCoord;","uniform float alpha;","uniform sampler2D uSampler;","void main(void) {","   gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y)) * alpha;","}"],this.vertexSrc=["attribute vec2 aVertexPosition;","attribute vec2 aTextureCoord;","uniform mat3 translationMatrix;","uniform vec2 projectionVector;","uniform vec2 offsetVector;","varying vec2 vTextureCoord;","void main(void) {","   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);","   v -= offsetVector.xyx;","   gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / -projectionVector.y + 1.0 , 0.0, 1.0);","   vTextureCoord = aTextureCoord;","}"],this.init()},b.StripShader.prototype.constructor=b.StripShader,b.StripShader.prototype.init=function(){var a=this.gl,c=b.compileProgram(a,this.vertexSrc,this.fragmentSrc);a.useProgram(c),this.uSampler=a.getUniformLocation(c,"uSampler"),this.projectionVector=a.getUniformLocation(c,"projectionVector"),this.offsetVector=a.getUniformLocation(c,"offsetVector"),this.colorAttribute=a.getAttribLocation(c,"aColor"),this.aVertexPosition=a.getAttribLocation(c,"aVertexPosition"),this.aTextureCoord=a.getAttribLocation(c,"aTextureCoord"),this.attributes=[this.aVertexPosition,this.aTextureCoord],this.translationMatrix=a.getUniformLocation(c,"translationMatrix"),this.alpha=a.getUniformLocation(c,"alpha"),this.program=c},b.StripShader.prototype.destroy=function(){this.gl.deleteProgram(this.program),this.uniforms=null,this.gl=null,this.attribute=null},b.PrimitiveShader=function(a){this._UID=b._UID++,this.gl=a,this.program=null,this.fragmentSrc=["precision mediump float;","varying vec4 vColor;","void main(void) {","   gl_FragColor = vColor;","}"],this.vertexSrc=["attribute vec2 aVertexPosition;","attribute vec4 aColor;","uniform mat3 translationMatrix;","uniform vec2 projectionVector;","uniform vec2 offsetVector;","uniform float alpha;","uniform float flipY;","uniform vec3 tint;","varying vec4 vColor;","void main(void) {","   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);","   v -= offsetVector.xyx;","   gl_Position = vec4( v.x / projectionVector.x -1.0, (v.y / projectionVector.y * -flipY) + flipY , 0.0, 1.0);","   vColor = aColor * vec4(tint * alpha, alpha);","}"],this.init()},b.PrimitiveShader.prototype.constructor=b.PrimitiveShader,b.PrimitiveShader.prototype.init=function(){var a=this.gl,c=b.compileProgram(a,this.vertexSrc,this.fragmentSrc);a.useProgram(c),this.projectionVector=a.getUniformLocation(c,"projectionVector"),this.offsetVector=a.getUniformLocation(c,"offsetVector"),this.tintColor=a.getUniformLocation(c,"tint"),this.flipY=a.getUniformLocation(c,"flipY"),this.aVertexPosition=a.getAttribLocation(c,"aVertexPosition"),this.colorAttribute=a.getAttribLocation(c,"aColor"),this.attributes=[this.aVertexPosition,this.colorAttribute],this.translationMatrix=a.getUniformLocation(c,"translationMatrix"),this.alpha=a.getUniformLocation(c,"alpha"),this.program=c},b.PrimitiveShader.prototype.destroy=function(){this.gl.deleteProgram(this.program),this.uniforms=null,this.gl=null,this.attributes=null},b.ComplexPrimitiveShader=function(a){this._UID=b._UID++,this.gl=a,this.program=null,this.fragmentSrc=["precision mediump float;","varying vec4 vColor;","void main(void) {","   gl_FragColor = vColor;","}"],this.vertexSrc=["attribute vec2 aVertexPosition;","uniform mat3 translationMatrix;","uniform vec2 projectionVector;","uniform vec2 offsetVector;","uniform vec3 tint;","uniform float alpha;","uniform vec3 color;","uniform float flipY;","varying vec4 vColor;","void main(void) {","   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);","   v -= offsetVector.xyx;","   gl_Position = vec4( v.x / projectionVector.x -1.0, (v.y / projectionVector.y * -flipY) + flipY , 0.0, 1.0);","   vColor = vec4(color * alpha * tint, alpha);","}"],this.init()},b.ComplexPrimitiveShader.prototype.constructor=b.ComplexPrimitiveShader,b.ComplexPrimitiveShader.prototype.init=function(){var a=this.gl,c=b.compileProgram(a,this.vertexSrc,this.fragmentSrc);a.useProgram(c),this.projectionVector=a.getUniformLocation(c,"projectionVector"),this.offsetVector=a.getUniformLocation(c,"offsetVector"),this.tintColor=a.getUniformLocation(c,"tint"),this.color=a.getUniformLocation(c,"color"),this.flipY=a.getUniformLocation(c,"flipY"),this.aVertexPosition=a.getAttribLocation(c,"aVertexPosition"),this.attributes=[this.aVertexPosition,this.colorAttribute],this.translationMatrix=a.getUniformLocation(c,"translationMatrix"),this.alpha=a.getUniformLocation(c,"alpha"),this.program=c},b.ComplexPrimitiveShader.prototype.destroy=function(){this.gl.deleteProgram(this.program),this.uniforms=null,this.gl=null,this.attribute=null},b.glContexts=[],b.instances=[],b.WebGLRenderer=function(a){this.game=a,b.defaultRenderer||(b.defaultRenderer=this),this.type=b.WEBGL_RENDERER,this.resolution=a.resolution,this.transparent=a.transparent,this.autoResize=!1,this.preserveDrawingBuffer=a.preserveDrawingBuffer,this.clearBeforeRender=a.clearBeforeRender,this.width=a.width,this.height=a.height,this.view=a.canvas,this._contextOptions={alpha:this.transparent,antialias:a.antialias,premultipliedAlpha:this.transparent&&"notMultiplied"!==this.transparent,stencil:!0,preserveDrawingBuffer:this.preserveDrawingBuffer},this.projection=new b.Point,this.offset=new b.Point,this.shaderManager=new b.WebGLShaderManager,this.spriteBatch=new b.WebGLSpriteBatch,this.maskManager=new b.WebGLMaskManager,this.filterManager=new b.WebGLFilterManager,this.stencilManager=new b.WebGLStencilManager,this.blendModeManager=new b.WebGLBlendModeManager,this.renderSession={},
this.renderSession.game=this.game,this.renderSession.gl=this.gl,this.renderSession.drawCount=0,this.renderSession.shaderManager=this.shaderManager,this.renderSession.maskManager=this.maskManager,this.renderSession.filterManager=this.filterManager,this.renderSession.blendModeManager=this.blendModeManager,this.renderSession.spriteBatch=this.spriteBatch,this.renderSession.stencilManager=this.stencilManager,this.renderSession.renderer=this,this.renderSession.resolution=this.resolution,this.initContext(),this.mapBlendModes()},b.WebGLRenderer.prototype.constructor=b.WebGLRenderer,b.WebGLRenderer.prototype.initContext=function(){var a=this.view.getContext("webgl",this._contextOptions)||this.view.getContext("experimental-webgl",this._contextOptions);if(this.gl=a,!a)throw new Error("This browser does not support webGL. Try using the canvas renderer");this.glContextId=a.id=b.WebGLRenderer.glContextId++,b.glContexts[this.glContextId]=a,b.instances[this.glContextId]=this,a.disable(a.DEPTH_TEST),a.disable(a.CULL_FACE),a.enable(a.BLEND),this.shaderManager.setContext(a),this.spriteBatch.setContext(a),this.maskManager.setContext(a),this.filterManager.setContext(a),this.blendModeManager.setContext(a),this.stencilManager.setContext(a),this.renderSession.gl=this.gl,this.resize(this.width,this.height)},b.WebGLRenderer.prototype.render=function(a){if(!this.contextLost){a.updateTransform();var b=this.gl;b.viewport(0,0,this.width,this.height),b.bindFramebuffer(b.FRAMEBUFFER,null),this.game.clearBeforeRender&&(b.clearColor(a._bgColor.r,a._bgColor.g,a._bgColor.b,a._bgColor.a),b.clear(b.COLOR_BUFFER_BIT)),this.offset.x=this.game.camera._shake.x,this.offset.y=this.game.camera._shake.y,this.renderDisplayObject(a,this.projection)}},b.WebGLRenderer.prototype.renderDisplayObject=function(a,c,d,e){this.renderSession.blendModeManager.setBlendMode(b.blendModes.NORMAL),this.renderSession.drawCount=0,this.renderSession.flipY=d?-1:1,this.renderSession.projection=c,this.renderSession.offset=this.offset,this.spriteBatch.begin(this.renderSession),this.filterManager.begin(this.renderSession,d),a._renderWebGL(this.renderSession,e),this.spriteBatch.end()},b.WebGLRenderer.prototype.resize=function(a,b){this.width=a*this.resolution,this.height=b*this.resolution,this.view.width=this.width,this.view.height=this.height,this.autoResize&&(this.view.style.width=this.width/this.resolution+"px",this.view.style.height=this.height/this.resolution+"px"),this.gl.viewport(0,0,this.width,this.height),this.projection.x=this.width/2/this.resolution,this.projection.y=-this.height/2/this.resolution},b.WebGLRenderer.prototype.updateTexture=function(a){if(!a.hasLoaded)return!1;var c=this.gl;return a._glTextures[c.id]||(a._glTextures[c.id]=c.createTexture()),c.bindTexture(c.TEXTURE_2D,a._glTextures[c.id]),c.pixelStorei(c.UNPACK_PREMULTIPLY_ALPHA_WEBGL,a.premultipliedAlpha),c.texImage2D(c.TEXTURE_2D,0,c.RGBA,c.RGBA,c.UNSIGNED_BYTE,a.source),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_MAG_FILTER,a.scaleMode===b.scaleModes.LINEAR?c.LINEAR:c.NEAREST),a.mipmap&&b.isPowerOfTwo(a.width,a.height)?(c.texParameteri(c.TEXTURE_2D,c.TEXTURE_MIN_FILTER,a.scaleMode===b.scaleModes.LINEAR?c.LINEAR_MIPMAP_LINEAR:c.NEAREST_MIPMAP_NEAREST),c.generateMipmap(c.TEXTURE_2D)):c.texParameteri(c.TEXTURE_2D,c.TEXTURE_MIN_FILTER,a.scaleMode===b.scaleModes.LINEAR?c.LINEAR:c.NEAREST),a._powerOf2?(c.texParameteri(c.TEXTURE_2D,c.TEXTURE_WRAP_S,c.REPEAT),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_WRAP_T,c.REPEAT)):(c.texParameteri(c.TEXTURE_2D,c.TEXTURE_WRAP_S,c.CLAMP_TO_EDGE),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_WRAP_T,c.CLAMP_TO_EDGE)),a._dirty[c.id]=!1,!0},b.WebGLRenderer.prototype.destroy=function(){b.glContexts[this.glContextId]=null,this.projection=null,this.offset=null,this.shaderManager.destroy(),this.spriteBatch.destroy(),this.maskManager.destroy(),this.filterManager.destroy(),this.shaderManager=null,this.spriteBatch=null,this.maskManager=null,this.filterManager=null,this.gl=null,this.renderSession=null,b.CanvasPool.remove(this),b.instances[this.glContextId]=null,b.WebGLRenderer.glContextId--},b.WebGLRenderer.prototype.mapBlendModes=function(){var a=this.gl;if(!b.blendModesWebGL){var c=[],d=b.blendModes;c[d.NORMAL]=[a.ONE,a.ONE_MINUS_SRC_ALPHA],c[d.ADD]=[a.SRC_ALPHA,a.DST_ALPHA],c[d.MULTIPLY]=[a.DST_COLOR,a.ONE_MINUS_SRC_ALPHA],c[d.SCREEN]=[a.SRC_ALPHA,a.ONE],c[d.OVERLAY]=[a.ONE,a.ONE_MINUS_SRC_ALPHA],c[d.DARKEN]=[a.ONE,a.ONE_MINUS_SRC_ALPHA],c[d.LIGHTEN]=[a.ONE,a.ONE_MINUS_SRC_ALPHA],c[d.COLOR_DODGE]=[a.ONE,a.ONE_MINUS_SRC_ALPHA],c[d.COLOR_BURN]=[a.ONE,a.ONE_MINUS_SRC_ALPHA],c[d.HARD_LIGHT]=[a.ONE,a.ONE_MINUS_SRC_ALPHA],c[d.SOFT_LIGHT]=[a.ONE,a.ONE_MINUS_SRC_ALPHA],c[d.DIFFERENCE]=[a.ONE,a.ONE_MINUS_SRC_ALPHA],c[d.EXCLUSION]=[a.ONE,a.ONE_MINUS_SRC_ALPHA],c[d.HUE]=[a.ONE,a.ONE_MINUS_SRC_ALPHA],c[d.SATURATION]=[a.ONE,a.ONE_MINUS_SRC_ALPHA],c[d.COLOR]=[a.ONE,a.ONE_MINUS_SRC_ALPHA],c[d.LUMINOSITY]=[a.ONE,a.ONE_MINUS_SRC_ALPHA],b.blendModesWebGL=c}},b.WebGLRenderer.glContextId=0,b.WebGLBlendModeManager=function(){this.currentBlendMode=99999},b.WebGLBlendModeManager.prototype.constructor=b.WebGLBlendModeManager,b.WebGLBlendModeManager.prototype.setContext=function(a){this.gl=a},b.WebGLBlendModeManager.prototype.setBlendMode=function(a){if(this.currentBlendMode===a)return!1;this.currentBlendMode=a;var c=b.blendModesWebGL[this.currentBlendMode];return c&&this.gl.blendFunc(c[0],c[1]),!0},b.WebGLBlendModeManager.prototype.destroy=function(){this.gl=null},b.WebGLMaskManager=function(){},b.WebGLMaskManager.prototype.constructor=b.WebGLMaskManager,b.WebGLMaskManager.prototype.setContext=function(a){this.gl=a},b.WebGLMaskManager.prototype.pushMask=function(a,c){var d=c.gl;a.dirty&&b.WebGLGraphics.updateGraphics(a,d),void 0!==a._webGL[d.id]&&void 0!==a._webGL[d.id].data&&0!==a._webGL[d.id].data.length&&c.stencilManager.pushStencil(a,a._webGL[d.id].data[0],c)},b.WebGLMaskManager.prototype.popMask=function(a,b){var c=this.gl;void 0!==a._webGL[c.id]&&void 0!==a._webGL[c.id].data&&0!==a._webGL[c.id].data.length&&b.stencilManager.popStencil(a,a._webGL[c.id].data[0],b)},b.WebGLMaskManager.prototype.destroy=function(){this.gl=null},b.WebGLStencilManager=function(){this.stencilStack=[],this.reverse=!0,this.count=0},b.WebGLStencilManager.prototype.setContext=function(a){this.gl=a},b.WebGLStencilManager.prototype.pushStencil=function(a,b,c){var d=this.gl;this.bindGraphics(a,b,c),0===this.stencilStack.length&&(d.enable(d.STENCIL_TEST),d.clear(d.STENCIL_BUFFER_BIT),this.reverse=!0,this.count=0),this.stencilStack.push(b);var e=this.count;d.colorMask(!1,!1,!1,!1),d.stencilFunc(d.ALWAYS,0,255),d.stencilOp(d.KEEP,d.KEEP,d.INVERT),1===b.mode?(d.drawElements(d.TRIANGLE_FAN,b.indices.length-4,d.UNSIGNED_SHORT,0),this.reverse?(d.stencilFunc(d.EQUAL,255-e,255),d.stencilOp(d.KEEP,d.KEEP,d.DECR)):(d.stencilFunc(d.EQUAL,e,255),d.stencilOp(d.KEEP,d.KEEP,d.INCR)),d.drawElements(d.TRIANGLE_FAN,4,d.UNSIGNED_SHORT,2*(b.indices.length-4)),this.reverse?d.stencilFunc(d.EQUAL,255-(e+1),255):d.stencilFunc(d.EQUAL,e+1,255),this.reverse=!this.reverse):(this.reverse?(d.stencilFunc(d.EQUAL,e,255),d.stencilOp(d.KEEP,d.KEEP,d.INCR)):(d.stencilFunc(d.EQUAL,255-e,255),d.stencilOp(d.KEEP,d.KEEP,d.DECR)),d.drawElements(d.TRIANGLE_STRIP,b.indices.length,d.UNSIGNED_SHORT,0),this.reverse?d.stencilFunc(d.EQUAL,e+1,255):d.stencilFunc(d.EQUAL,255-(e+1),255)),d.colorMask(!0,!0,!0,!0),d.stencilOp(d.KEEP,d.KEEP,d.KEEP),this.count++},b.WebGLStencilManager.prototype.bindGraphics=function(a,c,d){this._currentGraphics=a;var e,f=this.gl,g=d.projection,h=d.offset;1===c.mode?(e=d.shaderManager.complexPrimitiveShader,d.shaderManager.setShader(e),f.uniform1f(e.flipY,d.flipY),f.uniformMatrix3fv(e.translationMatrix,!1,a.worldTransform.toArray(!0)),f.uniform2f(e.projectionVector,g.x,-g.y),f.uniform2f(e.offsetVector,-h.x,-h.y),f.uniform3fv(e.tintColor,b.hex2rgb(a.tint)),f.uniform3fv(e.color,c.color),f.uniform1f(e.alpha,a.worldAlpha*c.alpha),f.bindBuffer(f.ARRAY_BUFFER,c.buffer),f.vertexAttribPointer(e.aVertexPosition,2,f.FLOAT,!1,8,0),f.bindBuffer(f.ELEMENT_ARRAY_BUFFER,c.indexBuffer)):(e=d.shaderManager.primitiveShader,d.shaderManager.setShader(e),f.uniformMatrix3fv(e.translationMatrix,!1,a.worldTransform.toArray(!0)),f.uniform1f(e.flipY,d.flipY),f.uniform2f(e.projectionVector,g.x,-g.y),f.uniform2f(e.offsetVector,-h.x,-h.y),f.uniform3fv(e.tintColor,b.hex2rgb(a.tint)),f.uniform1f(e.alpha,a.worldAlpha),f.bindBuffer(f.ARRAY_BUFFER,c.buffer),f.vertexAttribPointer(e.aVertexPosition,2,f.FLOAT,!1,24,0),f.vertexAttribPointer(e.colorAttribute,4,f.FLOAT,!1,24,8),f.bindBuffer(f.ELEMENT_ARRAY_BUFFER,c.indexBuffer))},b.WebGLStencilManager.prototype.popStencil=function(a,b,c){var d=this.gl;if(this.stencilStack.pop(),this.count--,0===this.stencilStack.length)d.disable(d.STENCIL_TEST);else{var e=this.count;this.bindGraphics(a,b,c),d.colorMask(!1,!1,!1,!1),1===b.mode?(this.reverse=!this.reverse,this.reverse?(d.stencilFunc(d.EQUAL,255-(e+1),255),d.stencilOp(d.KEEP,d.KEEP,d.INCR)):(d.stencilFunc(d.EQUAL,e+1,255),d.stencilOp(d.KEEP,d.KEEP,d.DECR)),d.drawElements(d.TRIANGLE_FAN,4,d.UNSIGNED_SHORT,2*(b.indices.length-4)),d.stencilFunc(d.ALWAYS,0,255),d.stencilOp(d.KEEP,d.KEEP,d.INVERT),d.drawElements(d.TRIANGLE_FAN,b.indices.length-4,d.UNSIGNED_SHORT,0),this.reverse?d.stencilFunc(d.EQUAL,e,255):d.stencilFunc(d.EQUAL,255-e,255)):(this.reverse?(d.stencilFunc(d.EQUAL,e+1,255),d.stencilOp(d.KEEP,d.KEEP,d.DECR)):(d.stencilFunc(d.EQUAL,255-(e+1),255),d.stencilOp(d.KEEP,d.KEEP,d.INCR)),d.drawElements(d.TRIANGLE_STRIP,b.indices.length,d.UNSIGNED_SHORT,0),this.reverse?d.stencilFunc(d.EQUAL,e,255):d.stencilFunc(d.EQUAL,255-e,255)),d.colorMask(!0,!0,!0,!0),d.stencilOp(d.KEEP,d.KEEP,d.KEEP)}},b.WebGLStencilManager.prototype.destroy=function(){this.stencilStack=null,this.gl=null},b.WebGLShaderManager=function(){this.maxAttibs=10,this.attribState=[],this.tempAttribState=[];for(var a=0;a<this.maxAttibs;a++)this.attribState[a]=!1;this.stack=[]},b.WebGLShaderManager.prototype.constructor=b.WebGLShaderManager,b.WebGLShaderManager.prototype.setContext=function(a){this.gl=a,this.primitiveShader=new b.PrimitiveShader(a),this.complexPrimitiveShader=new b.ComplexPrimitiveShader(a),this.defaultShader=new b.PixiShader(a),this.fastShader=new b.PixiFastShader(a),this.stripShader=new b.StripShader(a),this.setShader(this.defaultShader)},b.WebGLShaderManager.prototype.setAttribs=function(a){var b;for(b=0;b<this.tempAttribState.length;b++)this.tempAttribState[b]=!1;for(b=0;b<a.length;b++){var c=a[b];this.tempAttribState[c]=!0}var d=this.gl;for(b=0;b<this.attribState.length;b++)this.attribState[b]!==this.tempAttribState[b]&&(this.attribState[b]=this.tempAttribState[b],this.tempAttribState[b]?d.enableVertexAttribArray(b):d.disableVertexAttribArray(b))},b.WebGLShaderManager.prototype.setShader=function(a){return this._currentId===a._UID?!1:(this._currentId=a._UID,this.currentShader=a,this.gl.useProgram(a.program),this.setAttribs(a.attributes),!0)},b.WebGLShaderManager.prototype.destroy=function(){this.attribState=null,this.tempAttribState=null,this.primitiveShader.destroy(),this.complexPrimitiveShader.destroy(),this.defaultShader.destroy(),this.fastShader.destroy(),this.stripShader.destroy(),this.gl=null},b.WebGLSpriteBatch=function(){this.vertSize=5,this.size=2e3;var a=4*this.size*4*this.vertSize,c=6*this.size;this.vertices=new b.ArrayBuffer(a),this.positions=new b.Float32Array(this.vertices),this.colors=new b.Uint32Array(this.vertices),this.indices=new b.Uint16Array(c),this.lastIndexCount=0;for(var d=0,e=0;c>d;d+=6,e+=4)this.indices[d+0]=e+0,this.indices[d+1]=e+1,this.indices[d+2]=e+2,this.indices[d+3]=e+0,this.indices[d+4]=e+2,this.indices[d+5]=e+3;this.drawing=!1,this.currentBatchSize=0,this.currentBaseTexture=null,this.dirty=!0,this.textures=[],this.blendModes=[],this.shaders=[],this.sprites=[],this.defaultShader=new b.AbstractFilter(["precision lowp float;","varying vec2 vTextureCoord;","varying vec4 vColor;","uniform sampler2D uSampler;","void main(void) {","   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor ;","}"])},b.WebGLSpriteBatch.prototype.setContext=function(a){this.gl=a,this.vertexBuffer=a.createBuffer(),this.indexBuffer=a.createBuffer(),a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,this.indexBuffer),a.bufferData(a.ELEMENT_ARRAY_BUFFER,this.indices,a.STATIC_DRAW),a.bindBuffer(a.ARRAY_BUFFER,this.vertexBuffer),a.bufferData(a.ARRAY_BUFFER,this.vertices,a.DYNAMIC_DRAW),this.currentBlendMode=99999;var c=new b.PixiShader(a);c.fragmentSrc=this.defaultShader.fragmentSrc,c.uniforms={},c.init(),this.defaultShader.shaders[a.id]=c},b.WebGLSpriteBatch.prototype.begin=function(a){this.renderSession=a,this.shader=this.renderSession.shaderManager.defaultShader,this.start()},b.WebGLSpriteBatch.prototype.end=function(){this.flush()},b.WebGLSpriteBatch.prototype.render=function(a,b){var c=a.texture,d=a.worldTransform;b&&(d=b),this.currentBatchSize>=this.size&&(this.flush(),this.currentBaseTexture=c.baseTexture);var e=c._uvs;if(e){var f,g,h,i,j=a.anchor.x,k=a.anchor.y;if(c.trim){var l=c.trim;g=l.x-j*l.width,f=g+c.crop.width,i=l.y-k*l.height,h=i+c.crop.height}else f=c.frame.width*(1-j),g=c.frame.width*-j,h=c.frame.height*(1-k),i=c.frame.height*-k;var m=4*this.currentBatchSize*this.vertSize,n=c.baseTexture.resolution,o=d.a/n,p=d.b/n,q=d.c/n,r=d.d/n,s=d.tx,t=d.ty,u=this.colors,v=this.positions;this.renderSession.roundPixels?(v[m]=o*g+q*i+s|0,v[m+1]=r*i+p*g+t|0,v[m+5]=o*f+q*i+s|0,v[m+6]=r*i+p*f+t|0,v[m+10]=o*f+q*h+s|0,v[m+11]=r*h+p*f+t|0,v[m+15]=o*g+q*h+s|0,v[m+16]=r*h+p*g+t|0):(v[m]=o*g+q*i+s,v[m+1]=r*i+p*g+t,v[m+5]=o*f+q*i+s,v[m+6]=r*i+p*f+t,v[m+10]=o*f+q*h+s,v[m+11]=r*h+p*f+t,v[m+15]=o*g+q*h+s,v[m+16]=r*h+p*g+t),v[m+2]=e.x0,v[m+3]=e.y0,v[m+7]=e.x1,v[m+8]=e.y1,v[m+12]=e.x2,v[m+13]=e.y2,v[m+17]=e.x3,v[m+18]=e.y3;var w=a.tint;u[m+4]=u[m+9]=u[m+14]=u[m+19]=(w>>16)+(65280&w)+((255&w)<<16)+(255*a.worldAlpha<<24),this.sprites[this.currentBatchSize++]=a}},b.WebGLSpriteBatch.prototype.renderTilingSprite=function(a){var c=a.tilingTexture;this.currentBatchSize>=this.size&&(this.flush(),this.currentBaseTexture=c.baseTexture),a._uvs||(a._uvs=new b.TextureUvs);var d=a._uvs,e=c.baseTexture.width,f=c.baseTexture.height;a.tilePosition.x%=e*a.tileScaleOffset.x,a.tilePosition.y%=f*a.tileScaleOffset.y;var g=a.tilePosition.x/(e*a.tileScaleOffset.x),h=a.tilePosition.y/(f*a.tileScaleOffset.y),i=a.width/e/(a.tileScale.x*a.tileScaleOffset.x),j=a.height/f/(a.tileScale.y*a.tileScaleOffset.y);d.x0=0-g,d.y0=0-h,d.x1=1*i-g,d.y1=0-h,d.x2=1*i-g,d.y2=1*j-h,d.x3=0-g,d.y3=1*j-h;var k=a.tint,l=(k>>16)+(65280&k)+((255&k)<<16)+(255*a.worldAlpha<<24),m=this.positions,n=this.colors,o=a.width,p=a.height,q=a.anchor.x,r=a.anchor.y,s=o*(1-q),t=o*-q,u=p*(1-r),v=p*-r,w=4*this.currentBatchSize*this.vertSize,x=c.baseTexture.resolution,y=a.worldTransform,z=y.a/x,A=y.b/x,B=y.c/x,C=y.d/x,D=y.tx,E=y.ty;m[w++]=z*t+B*v+D,m[w++]=C*v+A*t+E,m[w++]=d.x0,m[w++]=d.y0,n[w++]=l,m[w++]=z*s+B*v+D,m[w++]=C*v+A*s+E,m[w++]=d.x1,m[w++]=d.y1,n[w++]=l,m[w++]=z*s+B*u+D,m[w++]=C*u+A*s+E,m[w++]=d.x2,m[w++]=d.y2,n[w++]=l,m[w++]=z*t+B*u+D,m[w++]=C*u+A*t+E,m[w++]=d.x3,m[w++]=d.y3,n[w++]=l,this.sprites[this.currentBatchSize++]=a},b.WebGLSpriteBatch.prototype.flush=function(){if(0!==this.currentBatchSize){var a,c=this.gl;if(this.dirty){this.dirty=!1,c.activeTexture(c.TEXTURE0),c.bindBuffer(c.ARRAY_BUFFER,this.vertexBuffer),c.bindBuffer(c.ELEMENT_ARRAY_BUFFER,this.indexBuffer),a=this.defaultShader.shaders[c.id];var d=4*this.vertSize;c.vertexAttribPointer(a.aVertexPosition,2,c.FLOAT,!1,d,0),c.vertexAttribPointer(a.aTextureCoord,2,c.FLOAT,!1,d,8),c.vertexAttribPointer(a.colorAttribute,4,c.UNSIGNED_BYTE,!0,d,16)}if(this.currentBatchSize>.5*this.size)c.bufferSubData(c.ARRAY_BUFFER,0,this.vertices);else{var e=this.positions.subarray(0,4*this.currentBatchSize*this.vertSize);c.bufferSubData(c.ARRAY_BUFFER,0,e)}for(var f,g,h,i,j=0,k=0,l=null,m=this.renderSession.blendModeManager.currentBlendMode,n=null,o=!1,p=!1,q=0,r=this.currentBatchSize;r>q;q++){i=this.sprites[q],f=i.tilingTexture?i.tilingTexture.baseTexture:i.texture.baseTexture,g=i.blendMode,h=i.shader||this.defaultShader,o=m!==g,p=n!==h;var s=f.skipRender;if(s&&i.children.length>0&&(s=!1),(l!==f&&!s||o||p)&&(this.renderBatch(l,j,k),k=q,j=0,l=f,o&&(m=g,this.renderSession.blendModeManager.setBlendMode(m)),p)){n=h,a=n.shaders[c.id],a||(a=new b.PixiShader(c),a.fragmentSrc=n.fragmentSrc,a.uniforms=n.uniforms,a.init(),n.shaders[c.id]=a),this.renderSession.shaderManager.setShader(a),a.dirty&&a.syncUniforms();var t=this.renderSession.projection;c.uniform2f(a.projectionVector,t.x,t.y);var u=this.renderSession.offset;c.uniform2f(a.offsetVector,u.x,u.y)}j++}this.renderBatch(l,j,k),this.currentBatchSize=0}},b.WebGLSpriteBatch.prototype.renderBatch=function(a,b,c){if(0!==b){var d=this.gl;if(a._dirty[d.id]){if(!this.renderSession.renderer.updateTexture(a))return}else d.bindTexture(d.TEXTURE_2D,a._glTextures[d.id]);d.drawElements(d.TRIANGLES,6*b,d.UNSIGNED_SHORT,6*c*2),this.renderSession.drawCount++}},b.WebGLSpriteBatch.prototype.stop=function(){this.flush(),this.dirty=!0},b.WebGLSpriteBatch.prototype.start=function(){this.dirty=!0},b.WebGLSpriteBatch.prototype.destroy=function(){this.vertices=null,this.indices=null,this.gl.deleteBuffer(this.vertexBuffer),this.gl.deleteBuffer(this.indexBuffer),this.currentBaseTexture=null,this.gl=null},b.WebGLFastSpriteBatch=function(a){this.vertSize=10,this.maxSize=6e3,this.size=this.maxSize;var c=4*this.size*this.vertSize,d=6*this.maxSize;this.vertices=new b.Float32Array(c),this.indices=new b.Uint16Array(d),this.vertexBuffer=null,this.indexBuffer=null,this.lastIndexCount=0;for(var e=0,f=0;d>e;e+=6,f+=4)this.indices[e+0]=f+0,this.indices[e+1]=f+1,this.indices[e+2]=f+2,this.indices[e+3]=f+0,this.indices[e+4]=f+2,this.indices[e+5]=f+3;this.drawing=!1,this.currentBatchSize=0,this.currentBaseTexture=null,this.currentBlendMode=0,this.renderSession=null,this.shader=null,this.matrix=null,this.setContext(a)},b.WebGLFastSpriteBatch.prototype.constructor=b.WebGLFastSpriteBatch,b.WebGLFastSpriteBatch.prototype.setContext=function(a){this.gl=a,this.vertexBuffer=a.createBuffer(),this.indexBuffer=a.createBuffer(),a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,this.indexBuffer),a.bufferData(a.ELEMENT_ARRAY_BUFFER,this.indices,a.STATIC_DRAW),a.bindBuffer(a.ARRAY_BUFFER,this.vertexBuffer),a.bufferData(a.ARRAY_BUFFER,this.vertices,a.DYNAMIC_DRAW)},b.WebGLFastSpriteBatch.prototype.begin=function(a,b){this.renderSession=b,this.shader=this.renderSession.shaderManager.fastShader,this.matrix=a.worldTransform.toArray(!0),this.start()},b.WebGLFastSpriteBatch.prototype.end=function(){this.flush()},b.WebGLFastSpriteBatch.prototype.render=function(a){var b=a.children,c=b[0];if(c.texture._uvs){this.currentBaseTexture=c.texture.baseTexture,c.blendMode!==this.renderSession.blendModeManager.currentBlendMode&&(this.flush(),this.renderSession.blendModeManager.setBlendMode(c.blendMode));for(var d=0,e=b.length;e>d;d++)this.renderSprite(b[d]);this.flush()}},b.WebGLFastSpriteBatch.prototype.renderSprite=function(a){if(a.visible&&(a.texture.baseTexture===this.currentBaseTexture||a.texture.baseTexture.skipRender||(this.flush(),this.currentBaseTexture=a.texture.baseTexture,a.texture._uvs))){var b,c,d,e,f,g,h,i,j=this.vertices;if(b=a.texture._uvs,c=a.texture.frame.width,d=a.texture.frame.height,a.texture.trim){var k=a.texture.trim;f=k.x-a.anchor.x*k.width,e=f+a.texture.crop.width,h=k.y-a.anchor.y*k.height,g=h+a.texture.crop.height}else e=a.texture.frame.width*(1-a.anchor.x),f=a.texture.frame.width*-a.anchor.x,g=a.texture.frame.height*(1-a.anchor.y),h=a.texture.frame.height*-a.anchor.y;i=4*this.currentBatchSize*this.vertSize,j[i++]=f,j[i++]=h,j[i++]=a.position.x,j[i++]=a.position.y,j[i++]=a.scale.x,j[i++]=a.scale.y,j[i++]=a.rotation,j[i++]=b.x0,j[i++]=b.y1,j[i++]=a.alpha,j[i++]=e,j[i++]=h,j[i++]=a.position.x,j[i++]=a.position.y,j[i++]=a.scale.x,j[i++]=a.scale.y,j[i++]=a.rotation,j[i++]=b.x1,j[i++]=b.y1,j[i++]=a.alpha,j[i++]=e,j[i++]=g,j[i++]=a.position.x,j[i++]=a.position.y,j[i++]=a.scale.x,j[i++]=a.scale.y,j[i++]=a.rotation,j[i++]=b.x2,j[i++]=b.y2,j[i++]=a.alpha,j[i++]=f,j[i++]=g,j[i++]=a.position.x,j[i++]=a.position.y,j[i++]=a.scale.x,j[i++]=a.scale.y,j[i++]=a.rotation,j[i++]=b.x3,j[i++]=b.y3,j[i++]=a.alpha,this.currentBatchSize++,this.currentBatchSize>=this.size&&this.flush()}},b.WebGLFastSpriteBatch.prototype.flush=function(){if(0!==this.currentBatchSize){var a=this.gl;if(this.currentBaseTexture._glTextures[a.id]||this.renderSession.renderer.updateTexture(this.currentBaseTexture,a),a.bindTexture(a.TEXTURE_2D,this.currentBaseTexture._glTextures[a.id]),this.currentBatchSize>.5*this.size)a.bufferSubData(a.ARRAY_BUFFER,0,this.vertices);else{var b=this.vertices.subarray(0,4*this.currentBatchSize*this.vertSize);a.bufferSubData(a.ARRAY_BUFFER,0,b)}a.drawElements(a.TRIANGLES,6*this.currentBatchSize,a.UNSIGNED_SHORT,0),this.currentBatchSize=0,this.renderSession.drawCount++}},b.WebGLFastSpriteBatch.prototype.stop=function(){this.flush()},b.WebGLFastSpriteBatch.prototype.start=function(){var a=this.gl;a.activeTexture(a.TEXTURE0),a.bindBuffer(a.ARRAY_BUFFER,this.vertexBuffer),a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,this.indexBuffer);var b=this.renderSession.projection;a.uniform2f(this.shader.projectionVector,b.x,b.y),a.uniformMatrix3fv(this.shader.uMatrix,!1,this.matrix);var c=4*this.vertSize;a.vertexAttribPointer(this.shader.aVertexPosition,2,a.FLOAT,!1,c,0),a.vertexAttribPointer(this.shader.aPositionCoord,2,a.FLOAT,!1,c,8),a.vertexAttribPointer(this.shader.aScale,2,a.FLOAT,!1,c,16),a.vertexAttribPointer(this.shader.aRotation,1,a.FLOAT,!1,c,24),a.vertexAttribPointer(this.shader.aTextureCoord,2,a.FLOAT,!1,c,28),a.vertexAttribPointer(this.shader.colorAttribute,1,a.FLOAT,!1,c,36)},b.WebGLFilterManager=function(){this.filterStack=[],this.offsetX=0,this.offsetY=0},b.WebGLFilterManager.prototype.constructor=b.WebGLFilterManager,b.WebGLFilterManager.prototype.setContext=function(a){this.gl=a,this.texturePool=[],this.initShaderBuffers()},b.WebGLFilterManager.prototype.begin=function(a,b){this.renderSession=a,this.defaultShader=a.shaderManager.defaultShader;var c=this.renderSession.projection;this.width=2*c.x,this.height=2*-c.y,this.buffer=b},b.WebGLFilterManager.prototype.pushFilter=function(a){var c=this.gl,d=this.renderSession.projection,e=this.renderSession.offset;a._filterArea=a.target.filterArea||a.target.getBounds(),a._previous_stencil_mgr=this.renderSession.stencilManager,this.renderSession.stencilManager=new b.WebGLStencilManager,this.renderSession.stencilManager.setContext(c),c.disable(c.STENCIL_TEST),this.filterStack.push(a);var f=a.filterPasses[0];this.offsetX+=a._filterArea.x,this.offsetY+=a._filterArea.y;var g=this.texturePool.pop();g?g.resize(this.width*this.renderSession.resolution,this.height*this.renderSession.resolution):g=new b.FilterTexture(this.gl,this.width*this.renderSession.resolution,this.height*this.renderSession.resolution),c.bindTexture(c.TEXTURE_2D,g.texture);var h=a._filterArea,i=f.padding;h.x-=i,h.y-=i,h.width+=2*i,h.height+=2*i,h.x<0&&(h.x=0),h.width>this.width&&(h.width=this.width),h.y<0&&(h.y=0),h.height>this.height&&(h.height=this.height),c.bindFramebuffer(c.FRAMEBUFFER,g.frameBuffer),c.viewport(0,0,h.width*this.renderSession.resolution,h.height*this.renderSession.resolution),d.x=h.width/2,d.y=-h.height/2,e.x=-h.x,e.y=-h.y,c.colorMask(!0,!0,!0,!0),c.clearColor(0,0,0,0),c.clear(c.COLOR_BUFFER_BIT),a._glFilterTexture=g},b.WebGLFilterManager.prototype.popFilter=function(){var a=this.gl,c=this.filterStack.pop(),d=c._filterArea,e=c._glFilterTexture,f=this.renderSession.projection,g=this.renderSession.offset;if(c.filterPasses.length>1){a.viewport(0,0,d.width*this.renderSession.resolution,d.height*this.renderSession.resolution),a.bindBuffer(a.ARRAY_BUFFER,this.vertexBuffer),this.vertexArray[0]=0,this.vertexArray[1]=d.height,this.vertexArray[2]=d.width,this.vertexArray[3]=d.height,this.vertexArray[4]=0,this.vertexArray[5]=0,this.vertexArray[6]=d.width,this.vertexArray[7]=0,a.bufferSubData(a.ARRAY_BUFFER,0,this.vertexArray),a.bindBuffer(a.ARRAY_BUFFER,this.uvBuffer),this.uvArray[2]=d.width/this.width,this.uvArray[5]=d.height/this.height,this.uvArray[6]=d.width/this.width,this.uvArray[7]=d.height/this.height,a.bufferSubData(a.ARRAY_BUFFER,0,this.uvArray);var h=e,i=this.texturePool.pop();i||(i=new b.FilterTexture(this.gl,this.width*this.renderSession.resolution,this.height*this.renderSession.resolution)),i.resize(this.width*this.renderSession.resolution,this.height*this.renderSession.resolution),a.bindFramebuffer(a.FRAMEBUFFER,i.frameBuffer),a.clear(a.COLOR_BUFFER_BIT),a.disable(a.BLEND);for(var j=0;j<c.filterPasses.length-1;j++){var k=c.filterPasses[j];a.bindFramebuffer(a.FRAMEBUFFER,i.frameBuffer),a.activeTexture(a.TEXTURE0),a.bindTexture(a.TEXTURE_2D,h.texture),this.applyFilterPass(k,d,d.width,d.height);var l=h;h=i,i=l}a.enable(a.BLEND),e=h,this.texturePool.push(i)}var m=c.filterPasses[c.filterPasses.length-1];this.offsetX-=d.x,this.offsetY-=d.y;var n=this.width,o=this.height,p=0,q=0,r=this.buffer;if(0===this.filterStack.length)a.colorMask(!0,!0,!0,!0);else{var s=this.filterStack[this.filterStack.length-1];d=s._filterArea,n=d.width,o=d.height,p=d.x,q=d.y,r=s._glFilterTexture.frameBuffer}f.x=n/2,f.y=-o/2,g.x=p,g.y=q,d=c._filterArea;var t=d.x-p,u=d.y-q;a.bindBuffer(a.ARRAY_BUFFER,this.vertexBuffer),this.vertexArray[0]=t,this.vertexArray[1]=u+d.height,this.vertexArray[2]=t+d.width,this.vertexArray[3]=u+d.height,this.vertexArray[4]=t,this.vertexArray[5]=u,this.vertexArray[6]=t+d.width,this.vertexArray[7]=u,a.bufferSubData(a.ARRAY_BUFFER,0,this.vertexArray),a.bindBuffer(a.ARRAY_BUFFER,this.uvBuffer),this.uvArray[2]=d.width/this.width,this.uvArray[5]=d.height/this.height,this.uvArray[6]=d.width/this.width,this.uvArray[7]=d.height/this.height,a.bufferSubData(a.ARRAY_BUFFER,0,this.uvArray),a.viewport(0,0,n*this.renderSession.resolution,o*this.renderSession.resolution),a.bindFramebuffer(a.FRAMEBUFFER,r),a.activeTexture(a.TEXTURE0),a.bindTexture(a.TEXTURE_2D,e.texture),this.renderSession.stencilManager&&this.renderSession.stencilManager.destroy(),this.renderSession.stencilManager=c._previous_stencil_mgr,c._previous_stencil_mgr=null,this.renderSession.stencilManager.count>0?a.enable(a.STENCIL_TEST):a.disable(a.STENCIL_TEST),this.applyFilterPass(m,d,n,o),this.texturePool.push(e),c._glFilterTexture=null},b.WebGLFilterManager.prototype.applyFilterPass=function(a,c,d,e){var f=this.gl,g=a.shaders[f.id];g||(g=new b.PixiShader(f),g.fragmentSrc=a.fragmentSrc,g.uniforms=a.uniforms,g.init(),a.shaders[f.id]=g),this.renderSession.shaderManager.setShader(g),f.uniform2f(g.projectionVector,d/2,-e/2),f.uniform2f(g.offsetVector,0,0),a.uniforms.dimensions&&(a.uniforms.dimensions.value[0]=this.width,a.uniforms.dimensions.value[1]=this.height,a.uniforms.dimensions.value[2]=this.vertexArray[0],a.uniforms.dimensions.value[3]=this.vertexArray[5]),g.syncUniforms(),f.bindBuffer(f.ARRAY_BUFFER,this.vertexBuffer),f.vertexAttribPointer(g.aVertexPosition,2,f.FLOAT,!1,0,0),f.bindBuffer(f.ARRAY_BUFFER,this.uvBuffer),f.vertexAttribPointer(g.aTextureCoord,2,f.FLOAT,!1,0,0),f.bindBuffer(f.ARRAY_BUFFER,this.colorBuffer),f.vertexAttribPointer(g.colorAttribute,2,f.FLOAT,!1,0,0),f.bindBuffer(f.ELEMENT_ARRAY_BUFFER,this.indexBuffer),f.drawElements(f.TRIANGLES,6,f.UNSIGNED_SHORT,0),this.renderSession.drawCount++},b.WebGLFilterManager.prototype.initShaderBuffers=function(){var a=this.gl;this.vertexBuffer=a.createBuffer(),this.uvBuffer=a.createBuffer(),this.colorBuffer=a.createBuffer(),this.indexBuffer=a.createBuffer(),this.vertexArray=new b.Float32Array([0,0,1,0,0,1,1,1]),a.bindBuffer(a.ARRAY_BUFFER,this.vertexBuffer),a.bufferData(a.ARRAY_BUFFER,this.vertexArray,a.STATIC_DRAW),this.uvArray=new b.Float32Array([0,0,1,0,0,1,1,1]),a.bindBuffer(a.ARRAY_BUFFER,this.uvBuffer),a.bufferData(a.ARRAY_BUFFER,this.uvArray,a.STATIC_DRAW),this.colorArray=new b.Float32Array([1,16777215,1,16777215,1,16777215,1,16777215]),a.bindBuffer(a.ARRAY_BUFFER,this.colorBuffer),a.bufferData(a.ARRAY_BUFFER,this.colorArray,a.STATIC_DRAW),a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,this.indexBuffer),a.bufferData(a.ELEMENT_ARRAY_BUFFER,new Uint16Array([0,1,2,1,3,2]),a.STATIC_DRAW)},b.WebGLFilterManager.prototype.destroy=function(){var a=this.gl;this.filterStack=null,this.offsetX=0,this.offsetY=0;for(var b=0;b<this.texturePool.length;b++)this.texturePool[b].destroy();this.texturePool=null,a.deleteBuffer(this.vertexBuffer),a.deleteBuffer(this.uvBuffer),a.deleteBuffer(this.colorBuffer),a.deleteBuffer(this.indexBuffer)},b.FilterTexture=function(a,c,d,e){this.gl=a,this.frameBuffer=a.createFramebuffer(),this.texture=a.createTexture(),e=e||b.scaleModes.DEFAULT,a.bindTexture(a.TEXTURE_2D,this.texture),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,e===b.scaleModes.LINEAR?a.LINEAR:a.NEAREST),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,e===b.scaleModes.LINEAR?a.LINEAR:a.NEAREST),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE),a.bindFramebuffer(a.FRAMEBUFFER,this.frameBuffer),a.bindFramebuffer(a.FRAMEBUFFER,this.frameBuffer),a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,this.texture,0),this.renderBuffer=a.createRenderbuffer(),a.bindRenderbuffer(a.RENDERBUFFER,this.renderBuffer),a.framebufferRenderbuffer(a.FRAMEBUFFER,a.DEPTH_STENCIL_ATTACHMENT,a.RENDERBUFFER,this.renderBuffer),this.resize(c,d)},b.FilterTexture.prototype.constructor=b.FilterTexture,b.FilterTexture.prototype.clear=function(){var a=this.gl;a.clearColor(0,0,0,0),a.clear(a.COLOR_BUFFER_BIT)},b.FilterTexture.prototype.resize=function(a,b){if(this.width!==a||this.height!==b){this.width=a,this.height=b;var c=this.gl;c.bindTexture(c.TEXTURE_2D,this.texture),c.texImage2D(c.TEXTURE_2D,0,c.RGBA,a,b,0,c.RGBA,c.UNSIGNED_BYTE,null),c.bindRenderbuffer(c.RENDERBUFFER,this.renderBuffer),c.renderbufferStorage(c.RENDERBUFFER,c.DEPTH_STENCIL,a,b)}},b.FilterTexture.prototype.destroy=function(){var a=this.gl;a.deleteFramebuffer(this.frameBuffer),a.deleteTexture(this.texture),this.frameBuffer=null,this.texture=null},b.CanvasBuffer=function(a,c){this.width=a,this.height=c,this.canvas=b.CanvasPool.create(this,this.width,this.height),this.context=this.canvas.getContext("2d"),this.canvas.width=a,this.canvas.height=c},b.CanvasBuffer.prototype.constructor=b.CanvasBuffer,b.CanvasBuffer.prototype.clear=function(){this.context.setTransform(1,0,0,1,0,0),this.context.clearRect(0,0,this.width,this.height)},b.CanvasBuffer.prototype.resize=function(a,b){this.width=this.canvas.width=a,this.height=this.canvas.height=b},b.CanvasBuffer.prototype.destroy=function(){b.CanvasPool.remove(this)},b.CanvasMaskManager=function(){},b.CanvasMaskManager.prototype.constructor=b.CanvasMaskManager,b.CanvasMaskManager.prototype.pushMask=function(a,c){var d=c.context;d.save();var e=a.alpha,f=a.worldTransform,g=c.resolution;d.setTransform(f.a*g,f.b*g,f.c*g,f.d*g,f.tx*g,f.ty*g),b.CanvasGraphics.renderGraphicsMask(a,d),d.clip(),a.worldAlpha=e},b.CanvasMaskManager.prototype.popMask=function(a){a.context.restore()},b.CanvasTinter=function(){},b.CanvasTinter.getTintedTexture=function(a,c){var d=a.tintedTexture||b.CanvasPool.create(this);return b.CanvasTinter.tintMethod(a.texture,c,d),d},b.CanvasTinter.tintWithMultiply=function(a,b,c){var d=c.getContext("2d"),e=a.crop;(c.width!==e.width||c.height!==e.height)&&(c.width=e.width,c.height=e.height),d.clearRect(0,0,e.width,e.height),d.fillStyle="#"+("00000"+(0|b).toString(16)).substr(-6),d.fillRect(0,0,e.width,e.height),d.globalCompositeOperation="multiply",d.drawImage(a.baseTexture.source,e.x,e.y,e.width,e.height,0,0,e.width,e.height),d.globalCompositeOperation="destination-atop",d.drawImage(a.baseTexture.source,e.x,e.y,e.width,e.height,0,0,e.width,e.height)},b.CanvasTinter.tintWithPerPixel=function(a,c,d){var e=d.getContext("2d"),f=a.crop;d.width=f.width,d.height=f.height,e.globalCompositeOperation="copy",e.drawImage(a.baseTexture.source,f.x,f.y,f.width,f.height,0,0,f.width,f.height);for(var g=b.hex2rgb(c),h=g[0],i=g[1],j=g[2],k=e.getImageData(0,0,f.width,f.height),l=k.data,m=0;m<l.length;m+=4)if(l[m+0]*=h,
l[m+1]*=i,l[m+2]*=j,!b.CanvasTinter.canHandleAlpha){var n=l[m+3];l[m+0]/=255/n,l[m+1]/=255/n,l[m+2]/=255/n}e.putImageData(k,0,0)},b.CanvasTinter.checkInverseAlpha=function(){var a=new b.CanvasBuffer(2,1);a.context.fillStyle="rgba(10, 20, 30, 0.5)",a.context.fillRect(0,0,1,1);var c=a.context.getImageData(0,0,1,1);if(null===c)return!1;a.context.putImageData(c,1,0);var d=a.context.getImageData(1,0,1,1);return d.data[0]===c.data[0]&&d.data[1]===c.data[1]&&d.data[2]===c.data[2]&&d.data[3]===c.data[3]},b.CanvasTinter.canHandleAlpha=b.CanvasTinter.checkInverseAlpha(),b.CanvasTinter.canUseMultiply=b.canUseNewCanvasBlendModes(),b.CanvasTinter.tintMethod=b.CanvasTinter.canUseMultiply?b.CanvasTinter.tintWithMultiply:b.CanvasTinter.tintWithPerPixel,b.CanvasRenderer=function(a){this.game=a,b.defaultRenderer||(b.defaultRenderer=this),this.type=b.CANVAS_RENDERER,this.resolution=a.resolution,this.clearBeforeRender=a.clearBeforeRender,this.transparent=a.transparent,this.autoResize=!1,this.width=a.width*this.resolution,this.height=a.height*this.resolution,this.view=a.canvas,this.context=this.view.getContext("2d",{alpha:this.transparent}),this.refresh=!0,this.count=0,this.maskManager=new b.CanvasMaskManager,this.renderSession={context:this.context,maskManager:this.maskManager,scaleMode:null,smoothProperty:Phaser.Canvas.getSmoothingPrefix(this.context),roundPixels:!1},this.mapBlendModes(),this.resize(this.width,this.height)},b.CanvasRenderer.prototype.constructor=b.CanvasRenderer,b.CanvasRenderer.prototype.render=function(a){a.updateTransform(),this.context.setTransform(1,0,0,1,0,0),this.context.globalAlpha=1,this.renderSession.currentBlendMode=0,this.renderSession.shakeX=this.game.camera._shake.x,this.renderSession.shakeY=this.game.camera._shake.y,this.context.globalCompositeOperation="source-over",navigator.isCocoonJS&&this.view.screencanvas&&(this.context.fillStyle="black",this.context.clear()),this.clearBeforeRender&&(this.transparent?this.context.clearRect(0,0,this.width,this.height):(this.context.fillStyle=a._bgColor.rgba,this.context.fillRect(0,0,this.width,this.height))),this.renderDisplayObject(a)},b.CanvasRenderer.prototype.destroy=function(a){void 0===a&&(a=!0),a&&this.view.parent&&this.view.parent.removeChild(this.view),this.view=null,this.context=null,this.maskManager=null,this.renderSession=null},b.CanvasRenderer.prototype.resize=function(a,c){this.width=a*this.resolution,this.height=c*this.resolution,this.view.width=this.width,this.view.height=this.height,this.autoResize&&(this.view.style.width=this.width/this.resolution+"px",this.view.style.height=this.height/this.resolution+"px"),this.renderSession.smoothProperty&&(this.context[this.renderSession.smoothProperty]=this.renderSession.scaleMode===b.scaleModes.LINEAR)},b.CanvasRenderer.prototype.renderDisplayObject=function(a,b,c){this.renderSession.context=b||this.context,this.renderSession.resolution=this.resolution,a._renderCanvas(this.renderSession,c)},b.CanvasRenderer.prototype.mapBlendModes=function(){if(!b.blendModesCanvas){var a=[],c=b.blendModes,d=b.canUseNewCanvasBlendModes();a[c.NORMAL]="source-over",a[c.ADD]="lighter",a[c.MULTIPLY]=d?"multiply":"source-over",a[c.SCREEN]=d?"screen":"source-over",a[c.OVERLAY]=d?"overlay":"source-over",a[c.DARKEN]=d?"darken":"source-over",a[c.LIGHTEN]=d?"lighten":"source-over",a[c.COLOR_DODGE]=d?"color-dodge":"source-over",a[c.COLOR_BURN]=d?"color-burn":"source-over",a[c.HARD_LIGHT]=d?"hard-light":"source-over",a[c.SOFT_LIGHT]=d?"soft-light":"source-over",a[c.DIFFERENCE]=d?"difference":"source-over",a[c.EXCLUSION]=d?"exclusion":"source-over",a[c.HUE]=d?"hue":"source-over",a[c.SATURATION]=d?"saturation":"source-over",a[c.COLOR]=d?"color":"source-over",a[c.LUMINOSITY]=d?"luminosity":"source-over",b.blendModesCanvas=a}},b.BaseTextureCache={},b.BaseTextureCacheIdGenerator=0,b.BaseTexture=function(a,c){this.resolution=1,this.width=100,this.height=100,this.scaleMode=c||b.scaleModes.DEFAULT,this.hasLoaded=!1,this.source=a,this._UID=b._UID++,this.premultipliedAlpha=!0,this._glTextures=[],this.mipmap=!1,this._dirty=[!0,!0,!0,!0],a&&((this.source.complete||this.source.getContext)&&this.source.width&&this.source.height&&(this.hasLoaded=!0,this.width=this.source.naturalWidth||this.source.width,this.height=this.source.naturalHeight||this.source.height,this.dirty()),this.skipRender=!1,this.imageUrl=null,this._powerOf2=!1)},b.BaseTexture.prototype.constructor=b.BaseTexture,b.BaseTexture.prototype.forceLoaded=function(a,b){this.hasLoaded=!0,this.width=a,this.height=b,this.dirty()},b.BaseTexture.prototype.destroy=function(){this.imageUrl?(delete b.BaseTextureCache[this.imageUrl],delete b.TextureCache[this.imageUrl],this.imageUrl=null,navigator.isCocoonJS||(this.source.src="")):this.source&&(b.CanvasPool.removeByCanvas(this.source),this.source._pixiId&&delete b.BaseTextureCache[this.source._pixiId]),this.source=null,this.unloadFromGPU()},b.BaseTexture.prototype.updateSourceImage=function(a){this.hasLoaded=!1,this.source.src=null,this.source.src=a},b.BaseTexture.prototype.dirty=function(){for(var a=0;a<this._glTextures.length;a++)this._dirty[a]=!0},b.BaseTexture.prototype.unloadFromGPU=function(){this.dirty();for(var a=this._glTextures.length-1;a>=0;a--){var c=this._glTextures[a],d=b.glContexts[a];d&&c&&d.deleteTexture(c)}this._glTextures.length=0,this.dirty()},b.BaseTexture.fromImage=function(a,c,d){var e=b.BaseTextureCache[a];if(void 0===c&&-1===a.indexOf("data:")&&(c=!0),!e){var f=new Image;c&&(f.crossOrigin=""),f.src=a,e=new b.BaseTexture(f,d),e.imageUrl=a,b.BaseTextureCache[a]=e,-1!==a.indexOf(b.RETINA_PREFIX+".")&&(e.resolution=2)}return e},b.BaseTexture.fromCanvas=function(a,c){a._pixiId||(a._pixiId="canvas_"+b.TextureCacheIdGenerator++),0===a.width&&(a.width=1),0===a.height&&(a.height=1);var d=b.BaseTextureCache[a._pixiId];return d||(d=new b.BaseTexture(a,c),b.BaseTextureCache[a._pixiId]=d),d},b.TextureCache={},b.FrameCache={},b.TextureSilentFail=!1,b.TextureCacheIdGenerator=0,b.Texture=function(a,c,d,e){this.noFrame=!1,c||(this.noFrame=!0,c=new b.Rectangle(0,0,1,1)),a instanceof b.Texture&&(a=a.baseTexture),this.baseTexture=a,this.frame=c,this.trim=e,this.valid=!1,this.isTiling=!1,this.requiresUpdate=!1,this.requiresReTint=!1,this._uvs=null,this.width=0,this.height=0,this.crop=d||new b.Rectangle(0,0,1,1),a.hasLoaded&&(this.noFrame&&(c=new b.Rectangle(0,0,a.width,a.height)),this.setFrame(c))},b.Texture.prototype.constructor=b.Texture,b.Texture.prototype.onBaseTextureLoaded=function(){var a=this.baseTexture;this.noFrame&&(this.frame=new b.Rectangle(0,0,a.width,a.height)),this.setFrame(this.frame)},b.Texture.prototype.destroy=function(a){a&&this.baseTexture.destroy(),this.valid=!1},b.Texture.prototype.setFrame=function(a){if(this.noFrame=!1,this.frame=a,this.width=a.width,this.height=a.height,this.crop.x=a.x,this.crop.y=a.y,this.crop.width=a.width,this.crop.height=a.height,!this.trim&&(a.x+a.width>this.baseTexture.width||a.y+a.height>this.baseTexture.height)){if(!b.TextureSilentFail)throw new Error("Texture Error: frame does not fit inside the base Texture dimensions "+this);return void(this.valid=!1)}this.valid=a&&a.width&&a.height&&this.baseTexture.source&&this.baseTexture.hasLoaded,this.trim&&(this.width=this.trim.width,this.height=this.trim.height,this.frame.width=this.trim.width,this.frame.height=this.trim.height),this.valid&&this._updateUvs()},b.Texture.prototype._updateUvs=function(){this._uvs||(this._uvs=new b.TextureUvs);var a=this.crop,c=this.baseTexture.width,d=this.baseTexture.height;this._uvs.x0=a.x/c,this._uvs.y0=a.y/d,this._uvs.x1=(a.x+a.width)/c,this._uvs.y1=a.y/d,this._uvs.x2=(a.x+a.width)/c,this._uvs.y2=(a.y+a.height)/d,this._uvs.x3=a.x/c,this._uvs.y3=(a.y+a.height)/d},b.Texture.fromImage=function(a,c,d){var e=b.TextureCache[a];return e||(e=new b.Texture(b.BaseTexture.fromImage(a,c,d)),b.TextureCache[a]=e),e},b.Texture.fromFrame=function(a){var c=b.TextureCache[a];if(!c)throw new Error('The frameId "'+a+'" does not exist in the texture cache ');return c},b.Texture.fromCanvas=function(a,c){var d=b.BaseTexture.fromCanvas(a,c);return new b.Texture(d)},b.Texture.addTextureToCache=function(a,c){b.TextureCache[c]=a},b.Texture.removeTextureFromCache=function(a){var c=b.TextureCache[a];return delete b.TextureCache[a],delete b.BaseTextureCache[a],c},b.TextureUvs=function(){this.x0=0,this.y0=0,this.x1=0,this.y1=0,this.x2=0,this.y2=0,this.x3=0,this.y3=0},b.RenderTexture=function(a,c,d,e,f){if(this.width=a||100,this.height=c||100,this.resolution=f||1,this.frame=new b.Rectangle(0,0,this.width*this.resolution,this.height*this.resolution),this.crop=new b.Rectangle(0,0,this.width*this.resolution,this.height*this.resolution),this.baseTexture=new b.BaseTexture,this.baseTexture.width=this.width*this.resolution,this.baseTexture.height=this.height*this.resolution,this.baseTexture._glTextures=[],this.baseTexture.resolution=this.resolution,this.baseTexture.scaleMode=e||b.scaleModes.DEFAULT,this.baseTexture.hasLoaded=!0,b.Texture.call(this,this.baseTexture,new b.Rectangle(0,0,this.width*this.resolution,this.height*this.resolution)),this.renderer=d||b.defaultRenderer,this.renderer.type===b.WEBGL_RENDERER){var g=this.renderer.gl;this.baseTexture._dirty[g.id]=!1,this.textureBuffer=new b.FilterTexture(g,this.width,this.height,this.baseTexture.scaleMode),this.baseTexture._glTextures[g.id]=this.textureBuffer.texture,this.render=this.renderWebGL,this.projection=new b.Point(.5*this.width,.5*-this.height)}else this.render=this.renderCanvas,this.textureBuffer=new b.CanvasBuffer(this.width*this.resolution,this.height*this.resolution),this.baseTexture.source=this.textureBuffer.canvas;this.valid=!0,this.tempMatrix=new Phaser.Matrix,this._updateUvs()},b.RenderTexture.prototype=Object.create(b.Texture.prototype),b.RenderTexture.prototype.constructor=b.RenderTexture,b.RenderTexture.prototype.resize=function(a,c,d){(a!==this.width||c!==this.height)&&(this.valid=a>0&&c>0,this.width=a,this.height=c,this.frame.width=this.crop.width=a*this.resolution,this.frame.height=this.crop.height=c*this.resolution,d&&(this.baseTexture.width=this.width*this.resolution,this.baseTexture.height=this.height*this.resolution),this.renderer.type===b.WEBGL_RENDERER&&(this.projection.x=this.width/2,this.projection.y=-this.height/2),this.valid&&this.textureBuffer.resize(this.width,this.height))},b.RenderTexture.prototype.clear=function(){this.valid&&(this.renderer.type===b.WEBGL_RENDERER&&this.renderer.gl.bindFramebuffer(this.renderer.gl.FRAMEBUFFER,this.textureBuffer.frameBuffer),this.textureBuffer.clear())},b.RenderTexture.prototype.renderWebGL=function(a,b,c){if(this.valid&&0!==a.alpha){var d=a.worldTransform;d.identity(),d.translate(0,2*this.projection.y),b&&d.append(b),d.scale(1,-1);for(var e=0;e<a.children.length;e++)a.children[e].updateTransform();var f=this.renderer.gl;f.viewport(0,0,this.width*this.resolution,this.height*this.resolution),f.bindFramebuffer(f.FRAMEBUFFER,this.textureBuffer.frameBuffer),c&&this.textureBuffer.clear(),this.renderer.spriteBatch.dirty=!0,this.renderer.renderDisplayObject(a,this.projection,this.textureBuffer.frameBuffer,b),this.renderer.spriteBatch.dirty=!0}},b.RenderTexture.prototype.renderCanvas=function(a,b,c){if(this.valid&&0!==a.alpha){var d=a.worldTransform;d.identity(),b&&d.append(b);for(var e=0;e<a.children.length;e++)a.children[e].updateTransform();c&&this.textureBuffer.clear();var f=this.renderer.resolution;this.renderer.resolution=this.resolution,this.renderer.renderDisplayObject(a,this.textureBuffer.context,b),this.renderer.resolution=f}},b.RenderTexture.prototype.getImage=function(){var a=new Image;return a.src=this.getBase64(),a},b.RenderTexture.prototype.getBase64=function(){return this.getCanvas().toDataURL()},b.RenderTexture.prototype.getCanvas=function(){if(this.renderer.type===b.WEBGL_RENDERER){var a=this.renderer.gl,c=this.textureBuffer.width,d=this.textureBuffer.height,e=new Uint8Array(4*c*d);a.bindFramebuffer(a.FRAMEBUFFER,this.textureBuffer.frameBuffer),a.readPixels(0,0,c,d,a.RGBA,a.UNSIGNED_BYTE,e),a.bindFramebuffer(a.FRAMEBUFFER,null);var f=new b.CanvasBuffer(c,d),g=f.context.getImageData(0,0,c,d);return g.data.set(e),f.context.putImageData(g,0,0),f.canvas}return this.textureBuffer.canvas},b.AbstractFilter=function(a,b){this.passes=[this],this.shaders=[],this.dirty=!0,this.padding=0,this.uniforms=b||{},this.fragmentSrc=a||[]},b.AbstractFilter.prototype.constructor=b.AbstractFilter,b.AbstractFilter.prototype.syncUniforms=function(){for(var a=0,b=this.shaders.length;b>a;a++)this.shaders[a].dirty=!0},b.Strip=function(a){b.DisplayObjectContainer.call(this),this.texture=a,this.uvs=new b.Float32Array([0,1,1,1,1,0,0,1]),this.vertices=new b.Float32Array([0,0,100,0,100,100,0,100]),this.colors=new b.Float32Array([1,1,1,1]),this.indices=new b.Uint16Array([0,1,2,3]),this.dirty=!0,this.blendMode=b.blendModes.NORMAL,this.canvasPadding=0,this.drawMode=b.Strip.DrawModes.TRIANGLE_STRIP},b.Strip.prototype=Object.create(b.DisplayObjectContainer.prototype),b.Strip.prototype.constructor=b.Strip,b.Strip.prototype._renderWebGL=function(a){!this.visible||this.alpha<=0||(a.spriteBatch.stop(),this._vertexBuffer||this._initWebGL(a),a.shaderManager.setShader(a.shaderManager.stripShader),this._renderStrip(a),a.spriteBatch.start())},b.Strip.prototype._initWebGL=function(a){var b=a.gl;this._vertexBuffer=b.createBuffer(),this._indexBuffer=b.createBuffer(),this._uvBuffer=b.createBuffer(),this._colorBuffer=b.createBuffer(),b.bindBuffer(b.ARRAY_BUFFER,this._vertexBuffer),b.bufferData(b.ARRAY_BUFFER,this.vertices,b.DYNAMIC_DRAW),b.bindBuffer(b.ARRAY_BUFFER,this._uvBuffer),b.bufferData(b.ARRAY_BUFFER,this.uvs,b.STATIC_DRAW),b.bindBuffer(b.ARRAY_BUFFER,this._colorBuffer),b.bufferData(b.ARRAY_BUFFER,this.colors,b.STATIC_DRAW),b.bindBuffer(b.ELEMENT_ARRAY_BUFFER,this._indexBuffer),b.bufferData(b.ELEMENT_ARRAY_BUFFER,this.indices,b.STATIC_DRAW)},b.Strip.prototype._renderStrip=function(a){var c=a.gl,d=a.projection,e=a.offset,f=a.shaderManager.stripShader,g=this.drawMode===b.Strip.DrawModes.TRIANGLE_STRIP?c.TRIANGLE_STRIP:c.TRIANGLES;a.blendModeManager.setBlendMode(this.blendMode),c.uniformMatrix3fv(f.translationMatrix,!1,this.worldTransform.toArray(!0)),c.uniform2f(f.projectionVector,d.x,-d.y),c.uniform2f(f.offsetVector,-e.x,-e.y),c.uniform1f(f.alpha,this.worldAlpha),this.dirty?(this.dirty=!1,c.bindBuffer(c.ARRAY_BUFFER,this._vertexBuffer),c.bufferData(c.ARRAY_BUFFER,this.vertices,c.STATIC_DRAW),c.vertexAttribPointer(f.aVertexPosition,2,c.FLOAT,!1,0,0),c.bindBuffer(c.ARRAY_BUFFER,this._uvBuffer),c.bufferData(c.ARRAY_BUFFER,this.uvs,c.STATIC_DRAW),c.vertexAttribPointer(f.aTextureCoord,2,c.FLOAT,!1,0,0),c.activeTexture(c.TEXTURE0),this.texture.baseTexture._dirty[c.id]?a.renderer.updateTexture(this.texture.baseTexture):c.bindTexture(c.TEXTURE_2D,this.texture.baseTexture._glTextures[c.id]),c.bindBuffer(c.ELEMENT_ARRAY_BUFFER,this._indexBuffer),c.bufferData(c.ELEMENT_ARRAY_BUFFER,this.indices,c.STATIC_DRAW)):(c.bindBuffer(c.ARRAY_BUFFER,this._vertexBuffer),c.bufferSubData(c.ARRAY_BUFFER,0,this.vertices),c.vertexAttribPointer(f.aVertexPosition,2,c.FLOAT,!1,0,0),c.bindBuffer(c.ARRAY_BUFFER,this._uvBuffer),c.vertexAttribPointer(f.aTextureCoord,2,c.FLOAT,!1,0,0),c.activeTexture(c.TEXTURE0),this.texture.baseTexture._dirty[c.id]?a.renderer.updateTexture(this.texture.baseTexture):c.bindTexture(c.TEXTURE_2D,this.texture.baseTexture._glTextures[c.id]),c.bindBuffer(c.ELEMENT_ARRAY_BUFFER,this._indexBuffer)),c.drawElements(g,this.indices.length,c.UNSIGNED_SHORT,0)},b.Strip.prototype._renderCanvas=function(a){var c=a.context,d=this.worldTransform,e=d.tx*a.resolution+a.shakeX,f=d.ty*a.resolution+a.shakeY;a.roundPixels?c.setTransform(d.a,d.b,d.c,d.d,0|e,0|f):c.setTransform(d.a,d.b,d.c,d.d,e,f),this.drawMode===b.Strip.DrawModes.TRIANGLE_STRIP?this._renderCanvasTriangleStrip(c):this._renderCanvasTriangles(c)},b.Strip.prototype._renderCanvasTriangleStrip=function(a){var b=this.vertices,c=this.uvs,d=b.length/2;this.count++;for(var e=0;d-2>e;e++){var f=2*e;this._renderCanvasDrawTriangle(a,b,c,f,f+2,f+4)}},b.Strip.prototype._renderCanvasTriangles=function(a){var b=this.vertices,c=this.uvs,d=this.indices,e=d.length;this.count++;for(var f=0;e>f;f+=3){var g=2*d[f],h=2*d[f+1],i=2*d[f+2];this._renderCanvasDrawTriangle(a,b,c,g,h,i)}},b.Strip.prototype._renderCanvasDrawTriangle=function(a,b,c,d,e,f){var g=this.texture.baseTexture.source,h=this.texture.width,i=this.texture.height,j=b[d],k=b[e],l=b[f],m=b[d+1],n=b[e+1],o=b[f+1],p=c[d]*h,q=c[e]*h,r=c[f]*h,s=c[d+1]*i,t=c[e+1]*i,u=c[f+1]*i;if(this.canvasPadding>0){var v=this.canvasPadding/this.worldTransform.a,w=this.canvasPadding/this.worldTransform.d,x=(j+k+l)/3,y=(m+n+o)/3,z=j-x,A=m-y,B=Math.sqrt(z*z+A*A);j=x+z/B*(B+v),m=y+A/B*(B+w),z=k-x,A=n-y,B=Math.sqrt(z*z+A*A),k=x+z/B*(B+v),n=y+A/B*(B+w),z=l-x,A=o-y,B=Math.sqrt(z*z+A*A),l=x+z/B*(B+v),o=y+A/B*(B+w)}a.save(),a.beginPath(),a.moveTo(j,m),a.lineTo(k,n),a.lineTo(l,o),a.closePath(),a.clip();var C=p*t+s*r+q*u-t*r-s*q-p*u,D=j*t+s*l+k*u-t*l-s*k-j*u,E=p*k+j*r+q*l-k*r-j*q-p*l,F=p*t*l+s*k*r+j*q*u-j*t*r-s*q*l-p*k*u,G=m*t+s*o+n*u-t*o-s*n-m*u,H=p*n+m*r+q*o-n*r-m*q-p*o,I=p*t*o+s*n*r+m*q*u-m*t*r-s*q*o-p*n*u;a.transform(D/C,G/C,E/C,H/C,F/C,I/C),a.drawImage(g,0,0),a.restore()},b.Strip.prototype.renderStripFlat=function(a){var b=this.context,c=a.vertices,d=c.length/2;this.count++,b.beginPath();for(var e=1;d-2>e;e++){var f=2*e,g=c[f],h=c[f+2],i=c[f+4],j=c[f+1],k=c[f+3],l=c[f+5];b.moveTo(g,j),b.lineTo(h,k),b.lineTo(i,l)}b.fillStyle="#FF0000",b.fill(),b.closePath()},b.Strip.prototype.onTextureUpdate=function(){this.updateFrame=!0},b.Strip.prototype.getBounds=function(a){for(var c=a||this.worldTransform,d=c.a,e=c.b,f=c.c,g=c.d,h=c.tx,i=c.ty,j=-(1/0),k=-(1/0),l=1/0,m=1/0,n=this.vertices,o=0,p=n.length;p>o;o+=2){var q=n[o],r=n[o+1],s=d*q+f*r+h,t=g*r+e*q+i;l=l>s?s:l,m=m>t?t:m,j=s>j?s:j,k=t>k?t:k}if(l===-(1/0)||k===1/0)return b.EmptyRectangle;var u=this._bounds;return u.x=l,u.width=j-l,u.y=m,u.height=k-m,this._currentBounds=u,u},b.Strip.DrawModes={TRIANGLE_STRIP:0,TRIANGLES:1},b.Rope=function(a,c){b.Strip.call(this,a),this.points=c,this.vertices=new b.Float32Array(4*c.length),this.uvs=new b.Float32Array(4*c.length),this.colors=new b.Float32Array(2*c.length),this.indices=new b.Uint16Array(2*c.length),this.refresh()},b.Rope.prototype=Object.create(b.Strip.prototype),b.Rope.prototype.constructor=b.Rope,b.Rope.prototype.refresh=function(){var a=this.points;if(!(a.length<1)){var b=this.uvs,c=a[0],d=this.indices,e=this.colors;this.count-=.2,b[0]=0,b[1]=0,b[2]=0,b[3]=1,e[0]=1,e[1]=1,d[0]=0,d[1]=1;for(var f,g,h,i=a.length,j=1;i>j;j++)f=a[j],g=4*j,h=j/(i-1),j%2?(b[g]=h,b[g+1]=0,b[g+2]=h,b[g+3]=1):(b[g]=h,b[g+1]=0,b[g+2]=h,b[g+3]=1),g=2*j,e[g]=1,e[g+1]=1,g=2*j,d[g]=g,d[g+1]=g+1,c=f}},b.Rope.prototype.updateTransform=function(){var a=this.points;if(!(a.length<1)){var c,d=a[0],e={x:0,y:0};this.count-=.2;for(var f,g,h,i,j,k=this.vertices,l=a.length,m=0;l>m;m++)f=a[m],g=4*m,c=m<a.length-1?a[m+1]:f,e.y=-(c.x-d.x),e.x=c.y-d.y,h=10*(1-m/(l-1)),h>1&&(h=1),i=Math.sqrt(e.x*e.x+e.y*e.y),j=this.texture.height/2,e.x/=i,e.y/=i,e.x*=j,e.y*=j,k[g]=f.x+e.x,k[g+1]=f.y+e.y,k[g+2]=f.x-e.x,k[g+3]=f.y-e.y,d=f;b.DisplayObjectContainer.prototype.updateTransform.call(this)}},b.Rope.prototype.setTexture=function(a){this.texture=a},b.TilingSprite=function(a,c,d){b.Sprite.call(this,a),this._width=c||128,this._height=d||128,this.tileScale=new b.Point(1,1),this.tileScaleOffset=new b.Point(1,1),this.tilePosition=new b.Point,this.renderable=!0,this.tint=16777215,this.textureDebug=!1,this.blendMode=b.blendModes.NORMAL,this.canvasBuffer=null,this.tilingTexture=null,this.tilePattern=null,this.refreshTexture=!0,this.frameWidth=0,this.frameHeight=0},b.TilingSprite.prototype=Object.create(b.Sprite.prototype),b.TilingSprite.prototype.constructor=b.TilingSprite,b.TilingSprite.prototype.setTexture=function(a){this.texture!==a&&(this.texture=a,this.refreshTexture=!0,this.cachedTint=16777215)},b.TilingSprite.prototype._renderWebGL=function(a){if(this.visible&&this.renderable&&0!==this.alpha){if(this._mask&&(a.spriteBatch.stop(),a.maskManager.pushMask(this.mask,a),a.spriteBatch.start()),this._filters&&(a.spriteBatch.flush(),a.filterManager.pushFilter(this._filterBlock)),this.refreshTexture){if(this.generateTilingTexture(!0,a),!this.tilingTexture)return;this.tilingTexture.needsUpdate&&(a.renderer.updateTexture(this.tilingTexture.baseTexture),this.tilingTexture.needsUpdate=!1)}a.spriteBatch.renderTilingSprite(this);for(var b=0;b<this.children.length;b++)this.children[b]._renderWebGL(a);a.spriteBatch.stop(),this._filters&&a.filterManager.popFilter(),this._mask&&a.maskManager.popMask(this._mask,a),a.spriteBatch.start()}},b.TilingSprite.prototype._renderCanvas=function(a){if(this.visible&&this.renderable&&0!==this.alpha){var c=a.context;this._mask&&a.maskManager.pushMask(this._mask,a),c.globalAlpha=this.worldAlpha;var d=this.worldTransform,e=a.resolution,f=d.tx*e+a.shakeX,g=d.ty*e+a.shakeY;if(c.setTransform(d.a*e,d.b*e,d.c*e,d.d*e,f,g),this.refreshTexture){if(this.generateTilingTexture(!1,a),!this.tilingTexture)return;this.tilePattern=c.createPattern(this.tilingTexture.baseTexture.source,"repeat")}var h=a.currentBlendMode;this.blendMode!==a.currentBlendMode&&(a.currentBlendMode=this.blendMode,c.globalCompositeOperation=b.blendModesCanvas[a.currentBlendMode]);var i=this.tilePosition,j=this.tileScale;i.x%=this.tilingTexture.baseTexture.width,i.y%=this.tilingTexture.baseTexture.height,c.scale(j.x,j.y),c.translate(i.x+this.anchor.x*-this._width,i.y+this.anchor.y*-this._height),c.fillStyle=this.tilePattern;var f=-i.x,g=-i.y,k=this._width/j.x,l=this._height/j.y;a.roundPixels&&(f|=0,g|=0,k|=0,l|=0),c.fillRect(f,g,k,l),c.scale(1/j.x,1/j.y),c.translate(-i.x+this.anchor.x*this._width,-i.y+this.anchor.y*this._height),this._mask&&a.maskManager.popMask(a);for(var m=0;m<this.children.length;m++)this.children[m]._renderCanvas(a);h!==this.blendMode&&(a.currentBlendMode=h,c.globalCompositeOperation=b.blendModesCanvas[h])}},b.TilingSprite.prototype.onTextureUpdate=function(){},b.TilingSprite.prototype.generateTilingTexture=function(a,c){if(this.texture.baseTexture.hasLoaded){var d=this.texture,e=d.frame,f=this._frame.sourceSizeW||this._frame.width,g=this._frame.sourceSizeH||this._frame.height,h=0,i=0;this._frame.trimmed&&(h=this._frame.spriteSourceSizeX,i=this._frame.spriteSourceSizeY),a&&(f=b.getNextPowerOfTwo(f),g=b.getNextPowerOfTwo(g)),this.canvasBuffer?(this.canvasBuffer.resize(f,g),this.tilingTexture.baseTexture.width=f,this.tilingTexture.baseTexture.height=g,this.tilingTexture.needsUpdate=!0):(this.canvasBuffer=new b.CanvasBuffer(f,g),this.tilingTexture=b.Texture.fromCanvas(this.canvasBuffer.canvas),this.tilingTexture.isTiling=!0,this.tilingTexture.needsUpdate=!0),this.textureDebug&&(this.canvasBuffer.context.strokeStyle="#00ff00",this.canvasBuffer.context.strokeRect(0,0,f,g));var j=d.crop.width,k=d.crop.height;(j!==f||k!==g)&&(j=f,k=g),this.canvasBuffer.context.drawImage(d.baseTexture.source,d.crop.x,d.crop.y,d.crop.width,d.crop.height,h,i,j,k),this.tileScaleOffset.x=e.width/f,this.tileScaleOffset.y=e.height/g,this.refreshTexture=!1,this.tilingTexture.baseTexture._powerOf2=!0}},b.TilingSprite.prototype.getBounds=function(){var a=this._width,b=this._height,c=a*(1-this.anchor.x),d=a*-this.anchor.x,e=b*(1-this.anchor.y),f=b*-this.anchor.y,g=this.worldTransform,h=g.a,i=g.b,j=g.c,k=g.d,l=g.tx,m=g.ty,n=h*d+j*f+l,o=k*f+i*d+m,p=h*c+j*f+l,q=k*f+i*c+m,r=h*c+j*e+l,s=k*e+i*c+m,t=h*d+j*e+l,u=k*e+i*d+m,v=-(1/0),w=-(1/0),x=1/0,y=1/0;x=x>n?n:x,x=x>p?p:x,x=x>r?r:x,x=x>t?t:x,y=y>o?o:y,y=y>q?q:y,y=y>s?s:y,y=y>u?u:y,v=n>v?n:v,v=p>v?p:v,v=r>v?r:v,v=t>v?t:v,w=o>w?o:w,w=q>w?q:w,w=s>w?s:w,w=u>w?u:w;var z=this._bounds;return z.x=x,z.width=v-x,z.y=y,z.height=w-y,this._currentBounds=z,z},b.TilingSprite.prototype.destroy=function(){b.Sprite.prototype.destroy.call(this),this.canvasBuffer&&(this.canvasBuffer.destroy(),this.canvasBuffer=null),this.tileScale=null,this.tileScaleOffset=null,this.tilePosition=null,this.tilingTexture&&(this.tilingTexture.destroy(!0),this.tilingTexture=null)},Object.defineProperty(b.TilingSprite.prototype,"width",{get:function(){return this._width},set:function(a){this._width=a}}),Object.defineProperty(b.TilingSprite.prototype,"height",{get:function(){return this._height},set:function(a){this._height=a}}),"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=b),exports.PIXI=b):"undefined"!=typeof define&&define.amd?define("PIXI",function(){return a.PIXI=b}()):a.PIXI=b,b}).call(this),function(){function a(a,b){this._scaleFactor=a,this._deltaMode=b,this.originalEvent=null}var b=this,c=c||{VERSION:"2.4.7",GAMES:[],AUTO:0,CANVAS:1,WEBGL:2,HEADLESS:3,NONE:0,LEFT:1,RIGHT:2,UP:3,DOWN:4,SPRITE:0,BUTTON:1,IMAGE:2,GRAPHICS:3,TEXT:4,TILESPRITE:5,BITMAPTEXT:6,GROUP:7,RENDERTEXTURE:8,TILEMAP:9,TILEMAPLAYER:10,EMITTER:11,POLYGON:12,BITMAPDATA:13,CANVAS_FILTER:14,WEBGL_FILTER:15,ELLIPSE:16,SPRITEBATCH:17,RETROFONT:18,POINTER:19,ROPE:20,CIRCLE:21,RECTANGLE:22,LINE:23,MATRIX:24,POINT:25,ROUNDEDRECTANGLE:26,CREATURE:27,VIDEO:28,PENDING_ATLAS:-1,blendModes:{NORMAL:0,ADD:1,MULTIPLY:2,SCREEN:3,OVERLAY:4,DARKEN:5,LIGHTEN:6,COLOR_DODGE:7,COLOR_BURN:8,HARD_LIGHT:9,SOFT_LIGHT:10,DIFFERENCE:11,EXCLUSION:12,HUE:13,SATURATION:14,COLOR:15,LUMINOSITY:16},scaleModes:{DEFAULT:0,LINEAR:0,NEAREST:1},PIXI:PIXI||{}};if(Math.trunc||(Math.trunc=function(a){return 0>a?Math.ceil(a):Math.floor(a)}),Function.prototype.bind||(Function.prototype.bind=function(){var a=Array.prototype.slice;return function(b){function c(){var f=e.concat(a.call(arguments));d.apply(this instanceof c?this:b,f)}var d=this,e=a.call(arguments,1);if("function"!=typeof d)throw new TypeError;return c.prototype=function f(a){return a&&(f.prototype=a),this instanceof f?void 0:new f}(d.prototype),c}}()),Array.isArray||(Array.isArray=function(a){return"[object Array]"==Object.prototype.toString.call(a)}),Array.prototype.forEach||(Array.prototype.forEach=function(a){"use strict";if(void 0===this||null===this)throw new TypeError;var b=Object(this),c=b.length>>>0;if("function"!=typeof a)throw new TypeError;for(var d=arguments.length>=2?arguments[1]:void 0,e=0;c>e;e++)e in b&&a.call(d,b[e],e,b)}),"function"!=typeof window.Uint32Array&&"object"!=typeof window.Uint32Array){var d=function(a){var b=new Array;window[a]=function(a){if("number"==typeof a){Array.call(this,a),this.length=a;for(var b=0;b<this.length;b++)this[b]=0}else{Array.call(this,a.length),this.length=a.length;for(var b=0;b<this.length;b++)this[b]=a[b]}},window[a].prototype=b,window[a].constructor=window[a]};d("Uint32Array"),d("Int16Array")}window.console||(window.console={},window.console.log=window.console.assert=function(){},window.console.warn=window.console.assert=function(){}),c.Utils={getProperty:function(a,b){for(var c=b.split("."),d=c.pop(),e=c.length,f=1,g=c[0];e>f&&(a=a[g]);)g=c[f],f++;return a?a[d]:null},setProperty:function(a,b,c){for(var d=b.split("."),e=d.pop(),f=d.length,g=1,h=d[0];f>g&&(a=a[h]);)h=d[g],g++;return a&&(a[e]=c),a},chanceRoll:function(a){return void 0===a&&(a=50),a>0&&100*Math.random()<=a},randomChoice:function(a,b){return Math.random()<.5?a:b},parseDimension:function(a,b){var c=0,d=0;return"string"==typeof a?"%"===a.substr(-1)?(c=parseInt(a,10)/100,d=0===b?window.innerWidth*c:window.innerHeight*c):d=parseInt(a,10):d=a,d},pad:function(a,b,c,d){if(void 0===b)var b=0;if(void 0===c)var c=" ";if(void 0===d)var d=3;var e=0;if(b+1>=a.length)switch(d){case 1:a=new Array(b+1-a.length).join(c)+a;break;case 3:var f=Math.ceil((e=b-a.length)/2),g=e-f;a=new Array(g+1).join(c)+a+new Array(f+1).join(c);break;default:a+=new Array(b+1-a.length).join(c)}return a},isPlainObject:function(a){if("object"!=typeof a||a.nodeType||a===a.window)return!1;try{if(a.constructor&&!{}.hasOwnProperty.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(b){return!1}return!0},extend:function(){var a,b,d,e,f,g,h=arguments[0]||{},i=1,j=arguments.length,k=!1;for("boolean"==typeof h&&(k=h,h=arguments[1]||{},i=2),j===i&&(h=this,--i);j>i;i++)if(null!=(a=arguments[i]))for(b in a)d=h[b],e=a[b],h!==e&&(k&&e&&(c.Utils.isPlainObject(e)||(f=Array.isArray(e)))?(f?(f=!1,g=d&&Array.isArray(d)?d:[]):g=d&&c.Utils.isPlainObject(d)?d:{},h[b]=c.Utils.extend(k,g,e)):void 0!==e&&(h[b]=e));return h},mixinPrototype:function(a,b,c){void 0===c&&(c=!1);for(var d=Object.keys(b),e=0;e<d.length;e++){var f=d[e],g=b[f];!c&&f in a||(!g||"function"!=typeof g.get&&"function"!=typeof g.set?a[f]=g:"function"==typeof g.clone?a[f]=g.clone():Object.defineProperty(a,f,g))}},mixin:function(a,b){if(!a||"object"!=typeof a)return b;for(var d in a){var e=a[d];if(!e.childNodes&&!e.cloneNode){var f=typeof a[d];a[d]&&"object"===f?typeof b[d]===f?b[d]=c.Utils.mixin(a[d],b[d]):b[d]=c.Utils.mixin(a[d],new e.constructor):b[d]=a[d]}}return b}},c.Circle=function(a,b,d){a=a||0,b=b||0,d=d||0,this.x=a,this.y=b,this._diameter=d,this._radius=0,d>0&&(this._radius=.5*d),this.type=c.CIRCLE},c.Circle.prototype={circumference:function(){return 2*(Math.PI*this._radius)},random:function(a){void 0===a&&(a=new c.Point);var b=2*Math.PI*Math.random(),d=Math.random()+Math.random(),e=d>1?2-d:d,f=e*Math.cos(b),g=e*Math.sin(b);return a.x=this.x+f*this.radius,a.y=this.y+g*this.radius,a},getBounds:function(){return new c.Rectangle(this.x-this.radius,this.y-this.radius,this.diameter,this.diameter)},setTo:function(a,b,c){return this.x=a,this.y=b,this._diameter=c,this._radius=.5*c,this},copyFrom:function(a){return this.setTo(a.x,a.y,a.diameter)},copyTo:function(a){return a.x=this.x,a.y=this.y,a.diameter=this._diameter,a},distance:function(a,b){var d=c.Math.distance(this.x,this.y,a.x,a.y);return b?Math.round(d):d},clone:function(a){return void 0===a||null===a?a=new c.Circle(this.x,this.y,this.diameter):a.setTo(this.x,this.y,this.diameter),a},contains:function(a,b){return c.Circle.contains(this,a,b)},circumferencePoint:function(a,b,d){return c.Circle.circumferencePoint(this,a,b,d)},offset:function(a,b){return this.x+=a,this.y+=b,this},offsetPoint:function(a){return this.offset(a.x,a.y)},toString:function(){return"[{Phaser.Circle (x="+this.x+" y="+this.y+" diameter="+this.diameter+" radius="+this.radius+")}]"}},c.Circle.prototype.constructor=c.Circle,Object.defineProperty(c.Circle.prototype,"diameter",{get:function(){return this._diameter},set:function(a){a>0&&(this._diameter=a,this._radius=.5*a)}}),Object.defineProperty(c.Circle.prototype,"radius",{get:function(){return this._radius},set:function(a){a>0&&(this._radius=a,this._diameter=2*a)}}),Object.defineProperty(c.Circle.prototype,"left",{get:function(){return this.x-this._radius},set:function(a){a>this.x?(this._radius=0,this._diameter=0):this.radius=this.x-a}}),Object.defineProperty(c.Circle.prototype,"right",{get:function(){return this.x+this._radius},set:function(a){a<this.x?(this._radius=0,this._diameter=0):this.radius=a-this.x}}),Object.defineProperty(c.Circle.prototype,"top",{get:function(){return this.y-this._radius},set:function(a){a>this.y?(this._radius=0,this._diameter=0):this.radius=this.y-a}}),Object.defineProperty(c.Circle.prototype,"bottom",{get:function(){return this.y+this._radius},set:function(a){a<this.y?(this._radius=0,this._diameter=0):this.radius=a-this.y}}),Object.defineProperty(c.Circle.prototype,"area",{get:function(){return this._radius>0?Math.PI*this._radius*this._radius:0}}),Object.defineProperty(c.Circle.prototype,"empty",{get:function(){return 0===this._diameter},set:function(a){a===!0&&this.setTo(0,0,0)}}),c.Circle.contains=function(a,b,c){if(a.radius>0&&b>=a.left&&b<=a.right&&c>=a.top&&c<=a.bottom){var d=(a.x-b)*(a.x-b),e=(a.y-c)*(a.y-c);return d+e<=a.radius*a.radius}return!1},c.Circle.equals=function(a,b){return a.x==b.x&&a.y==b.y&&a.diameter==b.diameter},c.Circle.intersects=function(a,b){return c.Math.distance(a.x,a.y,b.x,b.y)<=a.radius+b.radius},c.Circle.circumferencePoint=function(a,b,d,e){return void 0===d&&(d=!1),void 0===e&&(e=new c.Point),d===!0&&(b=c.Math.degToRad(b)),e.x=a.x+a.radius*Math.cos(b),e.y=a.y+a.radius*Math.sin(b),e},
c.Circle.intersectsRectangle=function(a,b){var c=Math.abs(a.x-b.x-b.halfWidth),d=b.halfWidth+a.radius;if(c>d)return!1;var e=Math.abs(a.y-b.y-b.halfHeight),f=b.halfHeight+a.radius;if(e>f)return!1;if(c<=b.halfWidth||e<=b.halfHeight)return!0;var g=c-b.halfWidth,h=e-b.halfHeight,i=g*g,j=h*h,k=a.radius*a.radius;return k>=i+j},PIXI.Circle=c.Circle,c.Ellipse=function(a,b,d,e){a=a||0,b=b||0,d=d||0,e=e||0,this.x=a,this.y=b,this.width=d,this.height=e,this.type=c.ELLIPSE},c.Ellipse.prototype={setTo:function(a,b,c,d){return this.x=a,this.y=b,this.width=c,this.height=d,this},getBounds:function(){return new c.Rectangle(this.x-this.width,this.y-this.height,this.width,this.height)},copyFrom:function(a){return this.setTo(a.x,a.y,a.width,a.height)},copyTo:function(a){return a.x=this.x,a.y=this.y,a.width=this.width,a.height=this.height,a},clone:function(a){return void 0===a||null===a?a=new c.Ellipse(this.x,this.y,this.width,this.height):a.setTo(this.x,this.y,this.width,this.height),a},contains:function(a,b){return c.Ellipse.contains(this,a,b)},random:function(a){void 0===a&&(a=new c.Point);var b=Math.random()*Math.PI*2,d=Math.random();return a.x=Math.sqrt(d)*Math.cos(b),a.y=Math.sqrt(d)*Math.sin(b),a.x=this.x+a.x*this.width/2,a.y=this.y+a.y*this.height/2,a},toString:function(){return"[{Phaser.Ellipse (x="+this.x+" y="+this.y+" width="+this.width+" height="+this.height+")}]"}},c.Ellipse.prototype.constructor=c.Ellipse,Object.defineProperty(c.Ellipse.prototype,"left",{get:function(){return this.x},set:function(a){this.x=a}}),Object.defineProperty(c.Ellipse.prototype,"right",{get:function(){return this.x+this.width},set:function(a){a<this.x?this.width=0:this.width=a-this.x}}),Object.defineProperty(c.Ellipse.prototype,"top",{get:function(){return this.y},set:function(a){this.y=a}}),Object.defineProperty(c.Ellipse.prototype,"bottom",{get:function(){return this.y+this.height},set:function(a){a<this.y?this.height=0:this.height=a-this.y}}),Object.defineProperty(c.Ellipse.prototype,"empty",{get:function(){return 0===this.width||0===this.height},set:function(a){a===!0&&this.setTo(0,0,0,0)}}),c.Ellipse.contains=function(a,b,c){if(a.width<=0||a.height<=0)return!1;var d=(b-a.x)/a.width-.5,e=(c-a.y)/a.height-.5;return d*=d,e*=e,.25>d+e},PIXI.Ellipse=c.Ellipse,c.Line=function(a,b,d,e){a=a||0,b=b||0,d=d||0,e=e||0,this.start=new c.Point(a,b),this.end=new c.Point(d,e),this.type=c.LINE},c.Line.prototype={setTo:function(a,b,c,d){return this.start.setTo(a,b),this.end.setTo(c,d),this},fromSprite:function(a,b,c){return void 0===c&&(c=!1),c?this.setTo(a.center.x,a.center.y,b.center.x,b.center.y):this.setTo(a.x,a.y,b.x,b.y)},fromAngle:function(a,b,c,d){return this.start.setTo(a,b),this.end.setTo(a+Math.cos(c)*d,b+Math.sin(c)*d),this},rotate:function(a,b){var c=(this.start.x+this.end.x)/2,d=(this.start.y+this.end.y)/2;return this.start.rotate(c,d,a,b),this.end.rotate(c,d,a,b),this},rotateAround:function(a,b,c,d){return this.start.rotate(a,b,c,d),this.end.rotate(a,b,c,d),this},intersects:function(a,b,d){return c.Line.intersectsPoints(this.start,this.end,a.start,a.end,b,d)},reflect:function(a){return c.Line.reflect(this,a)},midPoint:function(a){return void 0===a&&(a=new c.Point),a.x=(this.start.x+this.end.x)/2,a.y=(this.start.y+this.end.y)/2,a},centerOn:function(a,b){var c=(this.start.x+this.end.x)/2,d=(this.start.y+this.end.y)/2,e=a-c,f=b-d;this.start.add(e,f),this.end.add(e,f)},pointOnLine:function(a,b){return(a-this.start.x)*(this.end.y-this.start.y)===(this.end.x-this.start.x)*(b-this.start.y)},pointOnSegment:function(a,b){var c=Math.min(this.start.x,this.end.x),d=Math.max(this.start.x,this.end.x),e=Math.min(this.start.y,this.end.y),f=Math.max(this.start.y,this.end.y);return this.pointOnLine(a,b)&&a>=c&&d>=a&&b>=e&&f>=b},random:function(a){void 0===a&&(a=new c.Point);var b=Math.random();return a.x=this.start.x+b*(this.end.x-this.start.x),a.y=this.start.y+b*(this.end.y-this.start.y),a},coordinatesOnLine:function(a,b){void 0===a&&(a=1),void 0===b&&(b=[]);var c=Math.round(this.start.x),d=Math.round(this.start.y),e=Math.round(this.end.x),f=Math.round(this.end.y),g=Math.abs(e-c),h=Math.abs(f-d),i=e>c?1:-1,j=f>d?1:-1,k=g-h;b.push([c,d]);for(var l=1;c!=e||d!=f;){var m=k<<1;m>-h&&(k-=h,c+=i),g>m&&(k+=g,d+=j),l%a===0&&b.push([c,d]),l++}return b},clone:function(a){return void 0===a||null===a?a=new c.Line(this.start.x,this.start.y,this.end.x,this.end.y):a.setTo(this.start.x,this.start.y,this.end.x,this.end.y),a}},Object.defineProperty(c.Line.prototype,"length",{get:function(){return Math.sqrt((this.end.x-this.start.x)*(this.end.x-this.start.x)+(this.end.y-this.start.y)*(this.end.y-this.start.y))}}),Object.defineProperty(c.Line.prototype,"angle",{get:function(){return Math.atan2(this.end.y-this.start.y,this.end.x-this.start.x)}}),Object.defineProperty(c.Line.prototype,"slope",{get:function(){return(this.end.y-this.start.y)/(this.end.x-this.start.x)}}),Object.defineProperty(c.Line.prototype,"perpSlope",{get:function(){return-((this.end.x-this.start.x)/(this.end.y-this.start.y))}}),Object.defineProperty(c.Line.prototype,"x",{get:function(){return Math.min(this.start.x,this.end.x)}}),Object.defineProperty(c.Line.prototype,"y",{get:function(){return Math.min(this.start.y,this.end.y)}}),Object.defineProperty(c.Line.prototype,"left",{get:function(){return Math.min(this.start.x,this.end.x)}}),Object.defineProperty(c.Line.prototype,"right",{get:function(){return Math.max(this.start.x,this.end.x)}}),Object.defineProperty(c.Line.prototype,"top",{get:function(){return Math.min(this.start.y,this.end.y)}}),Object.defineProperty(c.Line.prototype,"bottom",{get:function(){return Math.max(this.start.y,this.end.y)}}),Object.defineProperty(c.Line.prototype,"width",{get:function(){return Math.abs(this.start.x-this.end.x)}}),Object.defineProperty(c.Line.prototype,"height",{get:function(){return Math.abs(this.start.y-this.end.y)}}),Object.defineProperty(c.Line.prototype,"normalX",{get:function(){return Math.cos(this.angle-1.5707963267948966)}}),Object.defineProperty(c.Line.prototype,"normalY",{get:function(){return Math.sin(this.angle-1.5707963267948966)}}),Object.defineProperty(c.Line.prototype,"normalAngle",{get:function(){return c.Math.wrap(this.angle-1.5707963267948966,-Math.PI,Math.PI)}}),c.Line.intersectsPoints=function(a,b,d,e,f,g){void 0===f&&(f=!0),void 0===g&&(g=new c.Point);var h=b.y-a.y,i=e.y-d.y,j=a.x-b.x,k=d.x-e.x,l=b.x*a.y-a.x*b.y,m=e.x*d.y-d.x*e.y,n=h*k-i*j;if(0===n)return null;if(g.x=(j*m-k*l)/n,g.y=(i*l-h*m)/n,f){var o=(e.y-d.y)*(b.x-a.x)-(e.x-d.x)*(b.y-a.y),p=((e.x-d.x)*(a.y-d.y)-(e.y-d.y)*(a.x-d.x))/o,q=((b.x-a.x)*(a.y-d.y)-(b.y-a.y)*(a.x-d.x))/o;return p>=0&&1>=p&&q>=0&&1>=q?g:null}return g},c.Line.intersects=function(a,b,d,e){return c.Line.intersectsPoints(a.start,a.end,b.start,b.end,d,e)},c.Line.reflect=function(a,b){return 2*b.normalAngle-3.141592653589793-a.angle},c.Matrix=function(a,b,d,e,f,g){a=a||1,b=b||0,d=d||0,e=e||1,f=f||0,g=g||0,this.a=a,this.b=b,this.c=d,this.d=e,this.tx=f,this.ty=g,this.type=c.MATRIX},c.Matrix.prototype={fromArray:function(a){return this.setTo(a[0],a[1],a[3],a[4],a[2],a[5])},setTo:function(a,b,c,d,e,f){return this.a=a,this.b=b,this.c=c,this.d=d,this.tx=e,this.ty=f,this},clone:function(a){return void 0===a||null===a?a=new c.Matrix(this.a,this.b,this.c,this.d,this.tx,this.ty):(a.a=this.a,a.b=this.b,a.c=this.c,a.d=this.d,a.tx=this.tx,a.ty=this.ty),a},copyTo:function(a){return a.copyFrom(this),a},copyFrom:function(a){return this.a=a.a,this.b=a.b,this.c=a.c,this.d=a.d,this.tx=a.tx,this.ty=a.ty,this},toArray:function(a,b){return void 0===b&&(b=new PIXI.Float32Array(9)),a?(b[0]=this.a,b[1]=this.b,b[2]=0,b[3]=this.c,b[4]=this.d,b[5]=0,b[6]=this.tx,b[7]=this.ty,b[8]=1):(b[0]=this.a,b[1]=this.c,b[2]=this.tx,b[3]=this.b,b[4]=this.d,b[5]=this.ty,b[6]=0,b[7]=0,b[8]=1),b},apply:function(a,b){return void 0===b&&(b=new c.Point),b.x=this.a*a.x+this.c*a.y+this.tx,b.y=this.b*a.x+this.d*a.y+this.ty,b},applyInverse:function(a,b){void 0===b&&(b=new c.Point);var d=1/(this.a*this.d+this.c*-this.b),e=a.x,f=a.y;return b.x=this.d*d*e+-this.c*d*f+(this.ty*this.c-this.tx*this.d)*d,b.y=this.a*d*f+-this.b*d*e+(-this.ty*this.a+this.tx*this.b)*d,b},translate:function(a,b){return this.tx+=a,this.ty+=b,this},scale:function(a,b){return this.a*=a,this.d*=b,this.c*=a,this.b*=b,this.tx*=a,this.ty*=b,this},rotate:function(a){var b=Math.cos(a),c=Math.sin(a),d=this.a,e=this.c,f=this.tx;return this.a=d*b-this.b*c,this.b=d*c+this.b*b,this.c=e*b-this.d*c,this.d=e*c+this.d*b,this.tx=f*b-this.ty*c,this.ty=f*c+this.ty*b,this},append:function(a){var b=this.a,c=this.b,d=this.c,e=this.d;return this.a=a.a*b+a.b*d,this.b=a.a*c+a.b*e,this.c=a.c*b+a.d*d,this.d=a.c*c+a.d*e,this.tx=a.tx*b+a.ty*d+this.tx,this.ty=a.tx*c+a.ty*e+this.ty,this},identity:function(){return this.setTo(1,0,0,1,0,0)}},c.identityMatrix=new c.Matrix,PIXI.Matrix=c.Matrix,PIXI.identityMatrix=c.identityMatrix,c.Point=function(a,b){a=a||0,b=b||0,this.x=a,this.y=b,this.type=c.POINT},c.Point.prototype={copyFrom:function(a){return this.setTo(a.x,a.y)},invert:function(){return this.setTo(this.y,this.x)},setTo:function(a,b){return this.x=a||0,this.y=b||(0!==b?this.x:0),this},set:function(a,b){return this.x=a||0,this.y=b||(0!==b?this.x:0),this},add:function(a,b){return this.x+=a,this.y+=b,this},subtract:function(a,b){return this.x-=a,this.y-=b,this},multiply:function(a,b){return this.x*=a,this.y*=b,this},divide:function(a,b){return this.x/=a,this.y/=b,this},clampX:function(a,b){return this.x=c.Math.clamp(this.x,a,b),this},clampY:function(a,b){return this.y=c.Math.clamp(this.y,a,b),this},clamp:function(a,b){return this.x=c.Math.clamp(this.x,a,b),this.y=c.Math.clamp(this.y,a,b),this},clone:function(a){return void 0===a||null===a?a=new c.Point(this.x,this.y):a.setTo(this.x,this.y),a},copyTo:function(a){return a.x=this.x,a.y=this.y,a},distance:function(a,b){return c.Point.distance(this,a,b)},equals:function(a){return a.x===this.x&&a.y===this.y},angle:function(a,b){return void 0===b&&(b=!1),b?c.Math.radToDeg(Math.atan2(a.y-this.y,a.x-this.x)):Math.atan2(a.y-this.y,a.x-this.x)},rotate:function(a,b,d,e,f){return c.Point.rotate(this,a,b,d,e,f)},getMagnitude:function(){return Math.sqrt(this.x*this.x+this.y*this.y)},getMagnitudeSq:function(){return this.x*this.x+this.y*this.y},setMagnitude:function(a){return this.normalize().multiply(a,a)},normalize:function(){if(!this.isZero()){var a=this.getMagnitude();this.x/=a,this.y/=a}return this},isZero:function(){return 0===this.x&&0===this.y},dot:function(a){return this.x*a.x+this.y*a.y},cross:function(a){return this.x*a.y-this.y*a.x},perp:function(){return this.setTo(-this.y,this.x)},rperp:function(){return this.setTo(this.y,-this.x)},normalRightHand:function(){return this.setTo(-1*this.y,this.x)},floor:function(){return this.setTo(Math.floor(this.x),Math.floor(this.y))},ceil:function(){return this.setTo(Math.ceil(this.x),Math.ceil(this.y))},toString:function(){return"[{Point (x="+this.x+" y="+this.y+")}]"}},c.Point.prototype.constructor=c.Point,c.Point.add=function(a,b,d){return void 0===d&&(d=new c.Point),d.x=a.x+b.x,d.y=a.y+b.y,d},c.Point.subtract=function(a,b,d){return void 0===d&&(d=new c.Point),d.x=a.x-b.x,d.y=a.y-b.y,d},c.Point.multiply=function(a,b,d){return void 0===d&&(d=new c.Point),d.x=a.x*b.x,d.y=a.y*b.y,d},c.Point.divide=function(a,b,d){return void 0===d&&(d=new c.Point),d.x=a.x/b.x,d.y=a.y/b.y,d},c.Point.equals=function(a,b){return a.x===b.x&&a.y===b.y},c.Point.angle=function(a,b){return Math.atan2(a.y-b.y,a.x-b.x)},c.Point.negative=function(a,b){return void 0===b&&(b=new c.Point),b.setTo(-a.x,-a.y)},c.Point.multiplyAdd=function(a,b,d,e){return void 0===e&&(e=new c.Point),e.setTo(a.x+b.x*d,a.y+b.y*d)},c.Point.interpolate=function(a,b,d,e){return void 0===e&&(e=new c.Point),e.setTo(a.x+(b.x-a.x)*d,a.y+(b.y-a.y)*d)},c.Point.perp=function(a,b){return void 0===b&&(b=new c.Point),b.setTo(-a.y,a.x)},c.Point.rperp=function(a,b){return void 0===b&&(b=new c.Point),b.setTo(a.y,-a.x)},c.Point.distance=function(a,b,d){var e=c.Math.distance(a.x,a.y,b.x,b.y);return d?Math.round(e):e},c.Point.project=function(a,b,d){void 0===d&&(d=new c.Point);var e=a.dot(b)/b.getMagnitudeSq();return 0!==e&&d.setTo(e*b.x,e*b.y),d},c.Point.projectUnit=function(a,b,d){void 0===d&&(d=new c.Point);var e=a.dot(b);return 0!==e&&d.setTo(e*b.x,e*b.y),d},c.Point.normalRightHand=function(a,b){return void 0===b&&(b=new c.Point),b.setTo(-1*a.y,a.x)},c.Point.normalize=function(a,b){void 0===b&&(b=new c.Point);var d=a.getMagnitude();return 0!==d&&b.setTo(a.x/d,a.y/d),b},c.Point.rotate=function(a,b,d,e,f,g){if(f&&(e=c.Math.degToRad(e)),void 0===g){a.subtract(b,d);var h=Math.sin(e),i=Math.cos(e),j=i*a.x-h*a.y,k=h*a.x+i*a.y;a.x=j+b,a.y=k+d}else{var l=e+Math.atan2(a.y-d,a.x-b);a.x=b+g*Math.cos(l),a.y=d+g*Math.sin(l)}return a},c.Point.centroid=function(a,b){if(void 0===b&&(b=new c.Point),"[object Array]"!==Object.prototype.toString.call(a))throw new Error("Phaser.Point. Parameter 'points' must be an array");var d=a.length;if(1>d)throw new Error("Phaser.Point. Parameter 'points' array must not be empty");if(1===d)return b.copyFrom(a[0]),b;for(var e=0;d>e;e++)c.Point.add(b,a[e],b);return b.divide(d,d),b},c.Point.parse=function(a,b,d){b=b||"x",d=d||"y";var e=new c.Point;return a[b]&&(e.x=parseInt(a[b],10)),a[d]&&(e.y=parseInt(a[d],10)),e},PIXI.Point=c.Point,c.Polygon=function(){this.area=0,this._points=[],arguments.length>0&&this.setTo.apply(this,arguments),this.closed=!0,this.type=c.POLYGON},c.Polygon.prototype={toNumberArray:function(a){void 0===a&&(a=[]);for(var b=0;b<this._points.length;b++)"number"==typeof this._points[b]?(a.push(this._points[b]),a.push(this._points[b+1]),b++):(a.push(this._points[b].x),a.push(this._points[b].y));return a},flatten:function(){return this._points=this.toNumberArray(),this},clone:function(a){var b=this._points.slice();return void 0===a||null===a?a=new c.Polygon(b):a.setTo(b),a},contains:function(a,b){for(var c=this._points.length,d=!1,e=-1,f=c-1;++e<c;f=e){var g=this._points[e].x,h=this._points[e].y,i=this._points[f].x,j=this._points[f].y;(b>=h&&j>b||b>=j&&h>b)&&(i-g)*(b-h)/(j-h)+g>a&&(d=!d)}return d},setTo:function(a){if(this.area=0,this._points=[],arguments.length>0){Array.isArray(a)||(a=Array.prototype.slice.call(arguments));for(var b=Number.MAX_VALUE,c=0,d=a.length;d>c;c++){if("number"==typeof a[c]){var e=new PIXI.Point(a[c],a[c+1]);c++}else if(Array.isArray(a[c]))var e=new PIXI.Point(a[c][0],a[c][1]);else var e=new PIXI.Point(a[c].x,a[c].y);this._points.push(e),e.y<b&&(b=e.y)}this.calculateArea(b)}return this},calculateArea:function(a){for(var b,c,d,e,f=0,g=this._points.length;g>f;f++)b=this._points[f],c=f===g-1?this._points[0]:this._points[f+1],d=(b.y-a+(c.y-a))/2,e=b.x-c.x,this.area+=d*e;return this.area}},c.Polygon.prototype.constructor=c.Polygon,Object.defineProperty(c.Polygon.prototype,"points",{get:function(){return this._points},set:function(a){null!=a?this.setTo(a):this.setTo()}}),PIXI.Polygon=c.Polygon,c.Rectangle=function(a,b,d,e){a=a||0,b=b||0,d=d||0,e=e||0,this.x=a,this.y=b,this.width=d,this.height=e,this.type=c.RECTANGLE},c.Rectangle.prototype={offset:function(a,b){return this.x+=a,this.y+=b,this},offsetPoint:function(a){return this.offset(a.x,a.y)},setTo:function(a,b,c,d){return this.x=a,this.y=b,this.width=c,this.height=d,this},scale:function(a,b){return void 0===b&&(b=a),this.width*=a,this.height*=b,this},centerOn:function(a,b){return this.centerX=a,this.centerY=b,this},floor:function(){this.x=Math.floor(this.x),this.y=Math.floor(this.y)},floorAll:function(){this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.width=Math.floor(this.width),this.height=Math.floor(this.height)},ceil:function(){this.x=Math.ceil(this.x),this.y=Math.ceil(this.y)},ceilAll:function(){this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.width=Math.ceil(this.width),this.height=Math.ceil(this.height)},copyFrom:function(a){return this.setTo(a.x,a.y,a.width,a.height)},copyTo:function(a){return a.x=this.x,a.y=this.y,a.width=this.width,a.height=this.height,a},inflate:function(a,b){return c.Rectangle.inflate(this,a,b)},size:function(a){return c.Rectangle.size(this,a)},resize:function(a,b){return this.width=a,this.height=b,this},clone:function(a){return c.Rectangle.clone(this,a)},contains:function(a,b){return c.Rectangle.contains(this,a,b)},containsRect:function(a){return c.Rectangle.containsRect(a,this)},equals:function(a){return c.Rectangle.equals(this,a)},intersection:function(a,b){return c.Rectangle.intersection(this,a,b)},intersects:function(a){return c.Rectangle.intersects(this,a)},intersectsRaw:function(a,b,d,e,f){return c.Rectangle.intersectsRaw(this,a,b,d,e,f)},union:function(a,b){return c.Rectangle.union(this,a,b)},random:function(a){return void 0===a&&(a=new c.Point),a.x=this.randomX,a.y=this.randomY,a},toString:function(){return"[{Rectangle (x="+this.x+" y="+this.y+" width="+this.width+" height="+this.height+" empty="+this.empty+")}]"}},Object.defineProperty(c.Rectangle.prototype,"halfWidth",{get:function(){return Math.round(this.width/2)}}),Object.defineProperty(c.Rectangle.prototype,"halfHeight",{get:function(){return Math.round(this.height/2)}}),Object.defineProperty(c.Rectangle.prototype,"bottom",{get:function(){return this.y+this.height},set:function(a){a<=this.y?this.height=0:this.height=a-this.y}}),Object.defineProperty(c.Rectangle.prototype,"bottomLeft",{get:function(){return new c.Point(this.x,this.bottom)},set:function(a){this.x=a.x,this.bottom=a.y}}),Object.defineProperty(c.Rectangle.prototype,"bottomRight",{get:function(){return new c.Point(this.right,this.bottom)},set:function(a){this.right=a.x,this.bottom=a.y}}),Object.defineProperty(c.Rectangle.prototype,"left",{get:function(){return this.x},set:function(a){a>=this.right?this.width=0:this.width=this.right-a,this.x=a}}),Object.defineProperty(c.Rectangle.prototype,"right",{get:function(){return this.x+this.width},set:function(a){a<=this.x?this.width=0:this.width=a-this.x}}),Object.defineProperty(c.Rectangle.prototype,"volume",{get:function(){return this.width*this.height}}),Object.defineProperty(c.Rectangle.prototype,"perimeter",{get:function(){return 2*this.width+2*this.height}}),Object.defineProperty(c.Rectangle.prototype,"centerX",{get:function(){return this.x+this.halfWidth},set:function(a){this.x=a-this.halfWidth}}),Object.defineProperty(c.Rectangle.prototype,"centerY",{get:function(){return this.y+this.halfHeight},set:function(a){this.y=a-this.halfHeight}}),Object.defineProperty(c.Rectangle.prototype,"randomX",{get:function(){return this.x+Math.random()*this.width}}),Object.defineProperty(c.Rectangle.prototype,"randomY",{get:function(){return this.y+Math.random()*this.height}}),Object.defineProperty(c.Rectangle.prototype,"top",{get:function(){return this.y},set:function(a){a>=this.bottom?(this.height=0,this.y=a):this.height=this.bottom-a}}),Object.defineProperty(c.Rectangle.prototype,"topLeft",{get:function(){return new c.Point(this.x,this.y)},set:function(a){this.x=a.x,this.y=a.y}}),Object.defineProperty(c.Rectangle.prototype,"topRight",{get:function(){return new c.Point(this.x+this.width,this.y)},set:function(a){this.right=a.x,this.y=a.y}}),Object.defineProperty(c.Rectangle.prototype,"empty",{get:function(){return!this.width||!this.height},set:function(a){a===!0&&this.setTo(0,0,0,0)}}),c.Rectangle.prototype.constructor=c.Rectangle,c.Rectangle.inflate=function(a,b,c){return a.x-=b,a.width+=2*b,a.y-=c,a.height+=2*c,a},c.Rectangle.inflatePoint=function(a,b){return c.Rectangle.inflate(a,b.x,b.y)},c.Rectangle.size=function(a,b){return void 0===b||null===b?b=new c.Point(a.width,a.height):b.setTo(a.width,a.height),b},c.Rectangle.clone=function(a,b){return void 0===b||null===b?b=new c.Rectangle(a.x,a.y,a.width,a.height):b.setTo(a.x,a.y,a.width,a.height),b},c.Rectangle.contains=function(a,b,c){return a.width<=0||a.height<=0?!1:b>=a.x&&b<a.right&&c>=a.y&&c<a.bottom},c.Rectangle.containsRaw=function(a,b,c,d,e,f){return e>=a&&a+c>e&&f>=b&&b+d>f},c.Rectangle.containsPoint=function(a,b){return c.Rectangle.contains(a,b.x,b.y)},c.Rectangle.containsRect=function(a,b){return a.volume>b.volume?!1:a.x>=b.x&&a.y>=b.y&&a.right<b.right&&a.bottom<b.bottom},c.Rectangle.equals=function(a,b){return a.x==b.x&&a.y==b.y&&a.width==b.width&&a.height==b.height},c.Rectangle.sameDimensions=function(a,b){return a.width===b.width&&a.height===b.height},c.Rectangle.intersection=function(a,b,d){return void 0===d&&(d=new c.Rectangle),c.Rectangle.intersects(a,b)&&(d.x=Math.max(a.x,b.x),d.y=Math.max(a.y,b.y),d.width=Math.min(a.right,b.right)-d.x,d.height=Math.min(a.bottom,b.bottom)-d.y),d},c.Rectangle.intersects=function(a,b){return a.width<=0||a.height<=0||b.width<=0||b.height<=0?!1:!(a.right<b.x||a.bottom<b.y||a.x>b.right||a.y>b.bottom)},c.Rectangle.intersectsRaw=function(a,b,c,d,e,f){return void 0===f&&(f=0),!(b>a.right+f||c<a.left-f||d>a.bottom+f||e<a.top-f)},c.Rectangle.union=function(a,b,d){return void 0===d&&(d=new c.Rectangle),d.setTo(Math.min(a.x,b.x),Math.min(a.y,b.y),Math.max(a.right,b.right)-Math.min(a.left,b.left),Math.max(a.bottom,b.bottom)-Math.min(a.top,b.top))},c.Rectangle.aabb=function(a,b){void 0===b&&(b=new c.Rectangle);var d=Number.MIN_VALUE,e=Number.MAX_VALUE,f=Number.MIN_VALUE,g=Number.MAX_VALUE;return a.forEach(function(a){a.x>d&&(d=a.x),a.x<e&&(e=a.x),a.y>f&&(f=a.y),a.y<g&&(g=a.y)}),b.setTo(e,g,d-e,f-g),b},PIXI.Rectangle=c.Rectangle,PIXI.EmptyRectangle=new c.Rectangle(0,0,0,0),c.RoundedRectangle=function(a,b,d,e,f){void 0===a&&(a=0),void 0===b&&(b=0),void 0===d&&(d=0),void 0===e&&(e=0),void 0===f&&(f=20),this.x=a,this.y=b,this.width=d,this.height=e,this.radius=f||20,this.type=c.ROUNDEDRECTANGLE},c.RoundedRectangle.prototype={clone:function(){return new c.RoundedRectangle(this.x,this.y,this.width,this.height,this.radius)},contains:function(a,b){if(this.width<=0||this.height<=0)return!1;var c=this.x;if(a>=c&&a<=c+this.width){var d=this.y;if(b>=d&&b<=d+this.height)return!0}return!1}},c.RoundedRectangle.prototype.constructor=c.RoundedRectangle,PIXI.RoundedRectangle=c.RoundedRectangle,c.Camera=function(a,b,d,e,f,g){this.game=a,this.world=a.world,this.id=0,this.view=new c.Rectangle(d,e,f,g),this.bounds=new c.Rectangle(d,e,f,g),this.deadzone=null,this.visible=!0,this.roundPx=!0,this.atLimit={x:!1,y:!1},this.target=null,this.displayObject=null,this.scale=null,this.totalInView=0,this.lerp=new c.Point(1,1),this.onShakeComplete=new c.Signal,this.onFlashComplete=new c.Signal,this.onFadeComplete=new c.Signal,this.fx=null,this._targetPosition=new c.Point,this._edge=0,this._position=new c.Point,this._shake={intensity:0,duration:0,horizontal:!1,vertical:!1,shakeBounds:!0,x:0,y:0},this._fxDuration=0,this._fxType=0},c.Camera.FOLLOW_LOCKON=0,c.Camera.FOLLOW_PLATFORMER=1,c.Camera.FOLLOW_TOPDOWN=2,c.Camera.FOLLOW_TOPDOWN_TIGHT=3,c.Camera.SHAKE_BOTH=4,c.Camera.SHAKE_HORIZONTAL=5,c.Camera.SHAKE_VERTICAL=6,c.Camera.ENABLE_FX=!0,c.Camera.prototype={boot:function(){this.displayObject=this.game.world,this.scale=this.game.world.scale,this.game.camera=this,c.Graphics&&c.Camera.ENABLE_FX&&(this.fx=new c.Graphics(this.game),this.game.stage.addChild(this.fx))},preUpdate:function(){this.totalInView=0},follow:function(a,b,d,e){void 0===b&&(b=c.Camera.FOLLOW_LOCKON),void 0===d&&(d=1),void 0===e&&(e=1),this.target=a,this.lerp.set(d,e);var f;switch(b){case c.Camera.FOLLOW_PLATFORMER:var g=this.width/8,h=this.height/3;this.deadzone=new c.Rectangle((this.width-g)/2,(this.height-h)/2-.25*h,g,h);break;case c.Camera.FOLLOW_TOPDOWN:f=Math.max(this.width,this.height)/4,this.deadzone=new c.Rectangle((this.width-f)/2,(this.height-f)/2,f,f);break;case c.Camera.FOLLOW_TOPDOWN_TIGHT:f=Math.max(this.width,this.height)/8,this.deadzone=new c.Rectangle((this.width-f)/2,(this.height-f)/2,f,f);break;case c.Camera.FOLLOW_LOCKON:this.deadzone=null;break;default:this.deadzone=null}},unfollow:function(){this.target=null},focusOn:function(a){this.setPosition(Math.round(a.x-this.view.halfWidth),Math.round(a.y-this.view.halfHeight))},focusOnXY:function(a,b){this.setPosition(Math.round(a-this.view.halfWidth),Math.round(b-this.view.halfHeight))},shake:function(a,b,d,e,f){return void 0===a&&(a=.05),void 0===b&&(b=500),void 0===d&&(d=!0),void 0===e&&(e=c.Camera.SHAKE_BOTH),void 0===f&&(f=!0),!d&&this._shake.duration>0?!1:(this._shake.intensity=a,this._shake.duration=b,this._shake.shakeBounds=f,this._shake.x=0,this._shake.y=0,this._shake.horizontal=e===c.Camera.SHAKE_BOTH||e===c.Camera.SHAKE_HORIZONTAL,this._shake.vertical=e===c.Camera.SHAKE_BOTH||e===c.Camera.SHAKE_VERTICAL,!0)},flash:function(a,b,c){return void 0===a&&(a=16777215),void 0===b&&(b=500),void 0===c&&(c=!1),!this.fx||!c&&this._fxDuration>0?!1:(this.fx.clear(),this.fx.beginFill(a),this.fx.drawRect(0,0,this.width,this.height),this.fx.endFill(),this.fx.alpha=1,this._fxDuration=b,this._fxType=0,!0)},fade:function(a,b,c){return void 0===a&&(a=0),void 0===b&&(b=500),void 0===c&&(c=!1),!this.fx||!c&&this._fxDuration>0?!1:(this.fx.clear(),this.fx.beginFill(a),this.fx.drawRect(0,0,this.width,this.height),this.fx.endFill(),this.fx.alpha=0,this._fxDuration=b,this._fxType=1,!0)},update:function(){this._fxDuration>0&&this.updateFX(),this.target&&this.updateTarget(),this._shake.duration>0&&this.updateShake(),this.bounds&&this.checkBounds(),this.roundPx&&(this.view.floor(),this._shake.x=Math.floor(this._shake.x),this._shake.y=Math.floor(this._shake.y)),this.displayObject.position.x=-this.view.x,this.displayObject.position.y=-this.view.y},updateFX:function(){0===this._fxType?(this.fx.alpha-=this.game.time.elapsedMS/this._fxDuration,this.fx.alpha<=0&&(this._fxDuration=0,this.fx.alpha=0,this.onFlashComplete.dispatch())):(this.fx.alpha+=this.game.time.elapsedMS/this._fxDuration,this.fx.alpha>=1&&(this._fxDuration=0,this.fx.alpha=1,this.onFadeComplete.dispatch()))},updateShake:function(){this._shake.duration-=this.game.time.elapsedMS,this._shake.duration<=0?(this.onShakeComplete.dispatch(),this._shake.x=0,this._shake.y=0):(this._shake.horizontal&&(this._shake.x=this.game.rnd.frac()*this._shake.intensity*this.view.width*2-this._shake.intensity*this.view.width),this._shake.vertical&&(this._shake.y=this.game.rnd.frac()*this._shake.intensity*this.view.height*2-this._shake.intensity*this.view.height))},updateTarget:function(){this._targetPosition.copyFrom(this.target.world),this.deadzone?(this._edge=this._targetPosition.x-this.view.x,this._edge<this.deadzone.left?this.view.x=this.game.math.linear(this.view.x,this._targetPosition.x-this.deadzone.left,this.lerp.x):this._edge>this.deadzone.right&&(this.view.x=this.game.math.linear(this.view.x,this._targetPosition.x-this.deadzone.right,this.lerp.x)),this._edge=this._targetPosition.y-this.view.y,this._edge<this.deadzone.top?this.view.y=this.game.math.linear(this.view.y,this._targetPosition.y-this.deadzone.top,this.lerp.y):this._edge>this.deadzone.bottom&&(this.view.y=this.game.math.linear(this.view.y,this._targetPosition.y-this.deadzone.bottom,this.lerp.y))):(this.view.x=this.game.math.linear(this.view.x,this._targetPosition.x-this.view.halfWidth,this.lerp.x),this.view.y=this.game.math.linear(this.view.y,this._targetPosition.y-this.view.halfHeight,this.lerp.y))},setBoundsToWorld:function(){this.bounds&&this.bounds.copyFrom(this.game.world.bounds)},checkBounds:function(){this.atLimit.x=!1,this.atLimit.y=!1;var a=this.view.x+this._shake.x,b=this.view.right+this._shake.x,c=this.view.y+this._shake.y,d=this.view.bottom+this._shake.y;a<=this.bounds.x*this.scale.x&&(this.atLimit.x=!0,this.view.x=this.bounds.x*this.scale.x,this._shake.shakeBounds||(this._shake.x=0)),b>=this.bounds.right*this.scale.x&&(this.atLimit.x=!0,this.view.x=this.bounds.right*this.scale.x-this.width,this._shake.shakeBounds||(this._shake.x=0)),c<=this.bounds.top*this.scale.y&&(this.atLimit.y=!0,this.view.y=this.bounds.top*this.scale.y,this._shake.shakeBounds||(this._shake.y=0)),d>=this.bounds.bottom*this.scale.y&&(this.atLimit.y=!0,this.view.y=this.bounds.bottom*this.scale.y-this.height,this._shake.shakeBounds||(this._shake.y=0))},setPosition:function(a,b){this.view.x=a,this.view.y=b,this.bounds&&this.checkBounds()},setSize:function(a,b){this.view.width=a,this.view.height=b},reset:function(){this.target=null,this.view.x=0,this.view.y=0,this._shake.duration=0,this.resetFX()},resetFX:function(){this.fx.clear(),this.fx.alpha=0,this._fxDuration=0}},c.Camera.prototype.constructor=c.Camera,Object.defineProperty(c.Camera.prototype,"x",{get:function(){return this.view.x},set:function(a){this.view.x=a,this.bounds&&this.checkBounds()}}),Object.defineProperty(c.Camera.prototype,"y",{get:function(){return this.view.y},set:function(a){this.view.y=a,this.bounds&&this.checkBounds()}}),Object.defineProperty(c.Camera.prototype,"position",{get:function(){return this._position.set(this.view.x,this.view.y),this._position},set:function(a){"undefined"!=typeof a.x&&(this.view.x=a.x),"undefined"!=typeof a.y&&(this.view.y=a.y),this.bounds&&this.checkBounds()}}),Object.defineProperty(c.Camera.prototype,"width",{get:function(){return this.view.width},set:function(a){this.view.width=a}}),Object.defineProperty(c.Camera.prototype,"height",{get:function(){return this.view.height},set:function(a){this.view.height=a}}),c.State=function(){this.game=null,this.key="",this.add=null,this.make=null,this.camera=null,this.cache=null,this.input=null,this.load=null,this.math=null,this.sound=null,this.scale=null,this.stage=null,this.time=null,this.tweens=null,this.world=null,this.particles=null,this.physics=null,this.rnd=null},c.State.prototype={init:function(){},preload:function(){},loadUpdate:function(){},loadRender:function(){},create:function(){},update:function(){},preRender:function(){},render:function(){},resize:function(){},paused:function(){},resumed:function(){},pauseUpdate:function(){},shutdown:function(){}},c.State.prototype.constructor=c.State,c.StateManager=function(a,b){this.game=a,this.states={},this._pendingState=null,"undefined"!=typeof b&&null!==b&&(this._pendingState=b),this._clearWorld=!1,this._clearCache=!1,this._created=!1,this._args=[],this.current="",this.onStateChange=new c.Signal,this.onInitCallback=null,this.onPreloadCallback=null,this.onCreateCallback=null,this.onUpdateCallback=null,this.onRenderCallback=null,this.onResizeCallback=null,this.onPreRenderCallback=null,this.onLoadUpdateCallback=null,this.onLoadRenderCallback=null,this.onPausedCallback=null,this.onResumedCallback=null,this.onPauseUpdateCallback=null,this.onShutDownCallback=null},c.StateManager.prototype={boot:function(){this.game.onPause.add(this.pause,this),this.game.onResume.add(this.resume,this),null!==this._pendingState&&"string"!=typeof this._pendingState&&this.add("default",this._pendingState,!0)},add:function(a,b,d){void 0===d&&(d=!1);var e;return b instanceof c.State?e=b:"object"==typeof b?(e=b,e.game=this.game):"function"==typeof b&&(e=new b(this.game)),this.states[a]=e,d&&(this.game.isBooted?this.start(a):this._pendingState=a),e},remove:function(a){this.current===a&&(this.callbackContext=null,this.onInitCallback=null,this.onShutDownCallback=null,this.onPreloadCallback=null,this.onLoadRenderCallback=null,this.onLoadUpdateCallback=null,this.onCreateCallback=null,this.onUpdateCallback=null,this.onPreRenderCallback=null,this.onRenderCallback=null,this.onResizeCallback=null,this.onPausedCallback=null,this.onResumedCallback=null,this.onPauseUpdateCallback=null),delete this.states[a]},start:function(a,b,c){void 0===b&&(b=!0),void 0===c&&(c=!1),this.checkState(a)&&(this._pendingState=a,this._clearWorld=b,this._clearCache=c,arguments.length>3&&(this._args=Array.prototype.splice.call(arguments,3)))},restart:function(a,b){void 0===a&&(a=!0),void 0===b&&(b=!1),this._pendingState=this.current,this._clearWorld=a,this._clearCache=b,arguments.length>2&&(this._args=Array.prototype.slice.call(arguments,2))},dummy:function(){},preUpdate:function(){if(this._pendingState&&this.game.isBooted){var a=this.current;if(this.clearCurrentState(),this.setCurrentState(this._pendingState),this.onStateChange.dispatch(this.current,a),this.current!==this._pendingState)return;this._pendingState=null,this.onPreloadCallback?(this.game.load.reset(!0),
this.onPreloadCallback.call(this.callbackContext,this.game),0===this.game.load.totalQueuedFiles()&&0===this.game.load.totalQueuedPacks()?this.loadComplete():this.game.load.start()):this.loadComplete()}},clearCurrentState:function(){this.current&&(this.onShutDownCallback&&this.onShutDownCallback.call(this.callbackContext,this.game),this.game.tweens.removeAll(),this.game.camera.reset(),this.game.input.reset(!0),this.game.physics.clear(),this.game.time.removeAll(),this.game.scale.reset(this._clearWorld),this.game.debug&&this.game.debug.reset(),this._clearWorld&&(this.game.world.shutdown(),this._clearCache&&this.game.cache.destroy()))},checkState:function(a){return this.states[a]?this.states[a].preload||this.states[a].create||this.states[a].update||this.states[a].render?!0:(console.warn("Invalid Phaser State object given. Must contain at least a one of the required functions: preload, create, update or render"),!1):(console.warn("Phaser.StateManager - No state found with the key: "+a),!1)},link:function(a){this.states[a].game=this.game,this.states[a].add=this.game.add,this.states[a].make=this.game.make,this.states[a].camera=this.game.camera,this.states[a].cache=this.game.cache,this.states[a].input=this.game.input,this.states[a].load=this.game.load,this.states[a].math=this.game.math,this.states[a].sound=this.game.sound,this.states[a].scale=this.game.scale,this.states[a].state=this,this.states[a].stage=this.game.stage,this.states[a].time=this.game.time,this.states[a].tweens=this.game.tweens,this.states[a].world=this.game.world,this.states[a].particles=this.game.particles,this.states[a].rnd=this.game.rnd,this.states[a].physics=this.game.physics,this.states[a].key=a},unlink:function(a){this.states[a]&&(this.states[a].game=null,this.states[a].add=null,this.states[a].make=null,this.states[a].camera=null,this.states[a].cache=null,this.states[a].input=null,this.states[a].load=null,this.states[a].math=null,this.states[a].sound=null,this.states[a].scale=null,this.states[a].state=null,this.states[a].stage=null,this.states[a].time=null,this.states[a].tweens=null,this.states[a].world=null,this.states[a].particles=null,this.states[a].rnd=null,this.states[a].physics=null)},setCurrentState:function(a){this.callbackContext=this.states[a],this.link(a),this.onInitCallback=this.states[a].init||this.dummy,this.onPreloadCallback=this.states[a].preload||null,this.onLoadRenderCallback=this.states[a].loadRender||null,this.onLoadUpdateCallback=this.states[a].loadUpdate||null,this.onCreateCallback=this.states[a].create||null,this.onUpdateCallback=this.states[a].update||null,this.onPreRenderCallback=this.states[a].preRender||null,this.onRenderCallback=this.states[a].render||null,this.onResizeCallback=this.states[a].resize||null,this.onPausedCallback=this.states[a].paused||null,this.onResumedCallback=this.states[a].resumed||null,this.onPauseUpdateCallback=this.states[a].pauseUpdate||null,this.onShutDownCallback=this.states[a].shutdown||this.dummy,""!==this.current&&this.game.physics.reset(),this.current=a,this._created=!1,this.onInitCallback.apply(this.callbackContext,this._args),a===this._pendingState&&(this._args=[]),this.game._kickstart=!0},getCurrentState:function(){return this.states[this.current]},loadComplete:function(){this._created===!1&&this.onLoadUpdateCallback&&this.onLoadUpdateCallback.call(this.callbackContext,this.game),this._created===!1&&this.onCreateCallback?(this._created=!0,this.onCreateCallback.call(this.callbackContext,this.game)):this._created=!0},pause:function(){this._created&&this.onPausedCallback&&this.onPausedCallback.call(this.callbackContext,this.game)},resume:function(){this._created&&this.onResumedCallback&&this.onResumedCallback.call(this.callbackContext,this.game)},update:function(){this._created?this.onUpdateCallback&&this.onUpdateCallback.call(this.callbackContext,this.game):this.onLoadUpdateCallback&&this.onLoadUpdateCallback.call(this.callbackContext,this.game)},pauseUpdate:function(){this._created?this.onPauseUpdateCallback&&this.onPauseUpdateCallback.call(this.callbackContext,this.game):this.onLoadUpdateCallback&&this.onLoadUpdateCallback.call(this.callbackContext,this.game)},preRender:function(a){this._created&&this.onPreRenderCallback&&this.onPreRenderCallback.call(this.callbackContext,this.game,a)},resize:function(a,b){this.onResizeCallback&&this.onResizeCallback.call(this.callbackContext,a,b)},render:function(){this._created?this.onRenderCallback&&(this.game.renderType===c.CANVAS?(this.game.context.save(),this.game.context.setTransform(1,0,0,1,0,0),this.onRenderCallback.call(this.callbackContext,this.game),this.game.context.restore()):this.onRenderCallback.call(this.callbackContext,this.game)):this.onLoadRenderCallback&&this.onLoadRenderCallback.call(this.callbackContext,this.game)},destroy:function(){this._clearWorld=!0,this._clearCache=!0,this.clearCurrentState(),this.callbackContext=null,this.onInitCallback=null,this.onShutDownCallback=null,this.onPreloadCallback=null,this.onLoadRenderCallback=null,this.onLoadUpdateCallback=null,this.onCreateCallback=null,this.onUpdateCallback=null,this.onRenderCallback=null,this.onPausedCallback=null,this.onResumedCallback=null,this.onPauseUpdateCallback=null,this.game=null,this.states={},this._pendingState=null,this.current=""}},c.StateManager.prototype.constructor=c.StateManager,Object.defineProperty(c.StateManager.prototype,"created",{get:function(){return this._created}}),c.Signal=function(){},c.Signal.prototype={_bindings:null,_prevParams:null,memorize:!1,_shouldPropagate:!0,active:!0,_boundDispatch:!1,validateListener:function(a,b){if("function"!=typeof a)throw new Error("Phaser.Signal: listener is a required param of {fn}() and should be a Function.".replace("{fn}",b))},_registerListener:function(a,b,d,e,f){var g,h=this._indexOfListener(a,d);if(-1!==h){if(g=this._bindings[h],g.isOnce()!==b)throw new Error("You cannot add"+(b?"":"Once")+"() then add"+(b?"Once":"")+"() the same listener without removing the relationship first.")}else g=new c.SignalBinding(this,a,b,d,e,f),this._addBinding(g);return this.memorize&&this._prevParams&&g.execute(this._prevParams),g},_addBinding:function(a){this._bindings||(this._bindings=[]);var b=this._bindings.length;do b--;while(this._bindings[b]&&a._priority<=this._bindings[b]._priority);this._bindings.splice(b+1,0,a)},_indexOfListener:function(a,b){if(!this._bindings)return-1;void 0===b&&(b=null);for(var c,d=this._bindings.length;d--;)if(c=this._bindings[d],c._listener===a&&c.context===b)return d;return-1},has:function(a,b){return-1!==this._indexOfListener(a,b)},add:function(a,b,c){this.validateListener(a,"add");var d=[];if(arguments.length>3)for(var e=3;e<arguments.length;e++)d.push(arguments[e]);return this._registerListener(a,!1,b,c,d)},addOnce:function(a,b,c){this.validateListener(a,"addOnce");var d=[];if(arguments.length>3)for(var e=3;e<arguments.length;e++)d.push(arguments[e]);return this._registerListener(a,!0,b,c,d)},remove:function(a,b){this.validateListener(a,"remove");var c=this._indexOfListener(a,b);return-1!==c&&(this._bindings[c]._destroy(),this._bindings.splice(c,1)),a},removeAll:function(a){if(void 0===a&&(a=null),this._bindings){for(var b=this._bindings.length;b--;)a?this._bindings[b].context===a&&(this._bindings[b]._destroy(),this._bindings.splice(b,1)):this._bindings[b]._destroy();a||(this._bindings.length=0)}},getNumListeners:function(){return this._bindings?this._bindings.length:0},halt:function(){this._shouldPropagate=!1},dispatch:function(){if(this.active&&this._bindings){var a,b=Array.prototype.slice.call(arguments),c=this._bindings.length;if(this.memorize&&(this._prevParams=b),c){a=this._bindings.slice(),this._shouldPropagate=!0;do c--;while(a[c]&&this._shouldPropagate&&a[c].execute(b)!==!1)}}},forget:function(){this._prevParams&&(this._prevParams=null)},dispose:function(){this.removeAll(),this._bindings=null,this._prevParams&&(this._prevParams=null)},toString:function(){return"[Phaser.Signal active:"+this.active+" numListeners:"+this.getNumListeners()+"]"}},Object.defineProperty(c.Signal.prototype,"boundDispatch",{get:function(){var a=this;return this._boundDispatch||(this._boundDispatch=function(){return a.dispatch.apply(a,arguments)})}}),c.Signal.prototype.constructor=c.Signal,c.SignalBinding=function(a,b,c,d,e,f){this._listener=b,c&&(this._isOnce=!0),null!=d&&(this.context=d),this._signal=a,e&&(this._priority=e),f&&f.length&&(this._args=f)},c.SignalBinding.prototype={context:null,_isOnce:!1,_priority:0,_args:null,callCount:0,active:!0,params:null,execute:function(a){var b,c;return this.active&&this._listener&&(c=this.params?this.params.concat(a):a,this._args&&(c=c.concat(this._args)),b=this._listener.apply(this.context,c),this.callCount++,this._isOnce&&this.detach()),b},detach:function(){return this.isBound()?this._signal.remove(this._listener,this.context):null},isBound:function(){return!!this._signal&&!!this._listener},isOnce:function(){return this._isOnce},getListener:function(){return this._listener},getSignal:function(){return this._signal},_destroy:function(){delete this._signal,delete this._listener,delete this.context},toString:function(){return"[Phaser.SignalBinding isOnce:"+this._isOnce+", isBound:"+this.isBound()+", active:"+this.active+"]"}},c.SignalBinding.prototype.constructor=c.SignalBinding,c.Filter=function(a,b,d){this.game=a,this.type=c.WEBGL_FILTER,this.passes=[this],this.shaders=[],this.dirty=!0,this.padding=0,this.prevPoint=new c.Point;var e=new Date;if(this.uniforms={resolution:{type:"2f",value:{x:256,y:256}},time:{type:"1f",value:0},mouse:{type:"2f",value:{x:0,y:0}},date:{type:"4fv",value:[e.getFullYear(),e.getMonth(),e.getDate(),60*e.getHours()*60+60*e.getMinutes()+e.getSeconds()]},sampleRate:{type:"1f",value:44100},iChannel0:{type:"sampler2D",value:null,textureData:{repeat:!0}},iChannel1:{type:"sampler2D",value:null,textureData:{repeat:!0}},iChannel2:{type:"sampler2D",value:null,textureData:{repeat:!0}},iChannel3:{type:"sampler2D",value:null,textureData:{repeat:!0}}},b)for(var f in b)this.uniforms[f]=b[f];this.fragmentSrc=d||""},c.Filter.prototype={init:function(){},setResolution:function(a,b){this.uniforms.resolution.value.x=a,this.uniforms.resolution.value.y=b},update:function(a){if("undefined"!=typeof a){var b=a.x/this.game.width,c=1-a.y/this.game.height;(b!==this.prevPoint.x||c!==this.prevPoint.y)&&(this.uniforms.mouse.value.x=b.toFixed(2),this.uniforms.mouse.value.y=c.toFixed(2),this.prevPoint.set(b,c))}this.uniforms.time.value=this.game.time.totalElapsedSeconds()},addToWorld:function(a,b,c,d,e,f){void 0===e&&(e=0),void 0===f&&(f=0),void 0!==c&&null!==c?this.width=c:c=this.width,void 0!==d&&null!==d?this.height=d:d=this.height;var g=this.game.add.image(a,b,"__default");return g.width=c,g.height=d,g.anchor.set(e,f),g.filters=[this],g},destroy:function(){this.game=null}},c.Filter.prototype.constructor=c.Filter,Object.defineProperty(c.Filter.prototype,"width",{get:function(){return this.uniforms.resolution.value.x},set:function(a){this.uniforms.resolution.value.x=a}}),Object.defineProperty(c.Filter.prototype,"height",{get:function(){return this.uniforms.resolution.value.y},set:function(a){this.uniforms.resolution.value.y=a}}),c.Plugin=function(a,b){void 0===b&&(b=null),this.game=a,this.parent=b,this.active=!1,this.visible=!1,this.hasPreUpdate=!1,this.hasUpdate=!1,this.hasPostUpdate=!1,this.hasRender=!1,this.hasPostRender=!1},c.Plugin.prototype={preUpdate:function(){},update:function(){},render:function(){},postRender:function(){},destroy:function(){this.game=null,this.parent=null,this.active=!1,this.visible=!1}},c.Plugin.prototype.constructor=c.Plugin,c.PluginManager=function(a){this.game=a,this.plugins=[],this._len=0,this._i=0},c.PluginManager.prototype={add:function(a){var b=Array.prototype.slice.call(arguments,1),c=!1;return"function"==typeof a?a=new a(this.game,this):(a.game=this.game,a.parent=this),"function"==typeof a.preUpdate&&(a.hasPreUpdate=!0,c=!0),"function"==typeof a.update&&(a.hasUpdate=!0,c=!0),"function"==typeof a.postUpdate&&(a.hasPostUpdate=!0,c=!0),"function"==typeof a.render&&(a.hasRender=!0,c=!0),"function"==typeof a.postRender&&(a.hasPostRender=!0,c=!0),c?((a.hasPreUpdate||a.hasUpdate||a.hasPostUpdate)&&(a.active=!0),(a.hasRender||a.hasPostRender)&&(a.visible=!0),this._len=this.plugins.push(a),"function"==typeof a.init&&a.init.apply(a,b),a):null},remove:function(a){for(this._i=this._len;this._i--;)if(this.plugins[this._i]===a)return a.destroy(),this.plugins.splice(this._i,1),void this._len--},removeAll:function(){for(this._i=this._len;this._i--;)this.plugins[this._i].destroy();this.plugins.length=0,this._len=0},preUpdate:function(){for(this._i=this._len;this._i--;)this.plugins[this._i].active&&this.plugins[this._i].hasPreUpdate&&this.plugins[this._i].preUpdate()},update:function(){for(this._i=this._len;this._i--;)this.plugins[this._i].active&&this.plugins[this._i].hasUpdate&&this.plugins[this._i].update()},postUpdate:function(){for(this._i=this._len;this._i--;)this.plugins[this._i].active&&this.plugins[this._i].hasPostUpdate&&this.plugins[this._i].postUpdate()},render:function(){for(this._i=this._len;this._i--;)this.plugins[this._i].visible&&this.plugins[this._i].hasRender&&this.plugins[this._i].render()},postRender:function(){for(this._i=this._len;this._i--;)this.plugins[this._i].visible&&this.plugins[this._i].hasPostRender&&this.plugins[this._i].postRender()},destroy:function(){this.removeAll(),this.game=null}},c.PluginManager.prototype.constructor=c.PluginManager,c.Stage=function(a){this.game=a,PIXI.DisplayObjectContainer.call(this),this.name="_stage_root",this.disableVisibilityChange=!1,this.exists=!0,this.worldTransform=new PIXI.Matrix,this.stage=this,this.currentRenderOrderID=0,this._hiddenVar="hidden",this._onChange=null,this._bgColor={r:0,g:0,b:0,a:0,color:0,rgba:"#000000"},this.game.transparent||(this._bgColor.a=1),a.config&&this.parseConfig(a.config)},c.Stage.prototype=Object.create(PIXI.DisplayObjectContainer.prototype),c.Stage.prototype.constructor=c.Stage,c.Stage.prototype.parseConfig=function(a){a.disableVisibilityChange&&(this.disableVisibilityChange=a.disableVisibilityChange),a.backgroundColor&&this.setBackgroundColor(a.backgroundColor)},c.Stage.prototype.boot=function(){c.DOM.getOffset(this.game.canvas,this.offset),c.Canvas.setUserSelect(this.game.canvas,"none"),c.Canvas.setTouchAction(this.game.canvas,"none"),this.checkVisibility()},c.Stage.prototype.preUpdate=function(){this.currentRenderOrderID=0;for(var a=0;a<this.children.length;a++)this.children[a].preUpdate()},c.Stage.prototype.update=function(){for(var a=this.children.length;a--;)this.children[a].update()},c.Stage.prototype.postUpdate=function(){if(this.game.world.camera.target){this.game.world.camera.target.postUpdate(),this.game.world.camera.update();for(var a=this.children.length;a--;)this.children[a]!==this.game.world.camera.target&&this.children[a].postUpdate()}else{this.game.world.camera.update();for(var a=this.children.length;a--;)this.children[a].postUpdate()}},c.Stage.prototype.updateTransform=function(){this.worldAlpha=1;for(var a=0;a<this.children.length;a++)this.children[a].updateTransform()},c.Stage.prototype.checkVisibility=function(){void 0!==document.webkitHidden?this._hiddenVar="webkitvisibilitychange":void 0!==document.mozHidden?this._hiddenVar="mozvisibilitychange":void 0!==document.msHidden?this._hiddenVar="msvisibilitychange":void 0!==document.hidden?this._hiddenVar="visibilitychange":this._hiddenVar=null;var a=this;this._onChange=function(b){return a.visibilityChange(b)},this._hiddenVar&&document.addEventListener(this._hiddenVar,this._onChange,!1),window.onblur=this._onChange,window.onfocus=this._onChange,window.onpagehide=this._onChange,window.onpageshow=this._onChange,this.game.device.cocoonJSApp&&(CocoonJS.App.onSuspended.addEventListener(function(){c.Stage.prototype.visibilityChange.call(a,{type:"pause"})}),CocoonJS.App.onActivated.addEventListener(function(){c.Stage.prototype.visibilityChange.call(a,{type:"resume"})}))},c.Stage.prototype.visibilityChange=function(a){return"pagehide"===a.type||"blur"===a.type||"pageshow"===a.type||"focus"===a.type?void("pagehide"===a.type||"blur"===a.type?this.game.focusLoss(a):("pageshow"===a.type||"focus"===a.type)&&this.game.focusGain(a)):void(this.disableVisibilityChange||(document.hidden||document.mozHidden||document.msHidden||document.webkitHidden||"pause"===a.type?this.game.gamePaused(a):this.game.gameResumed(a)))},c.Stage.prototype.setBackgroundColor=function(a){this.game.transparent||(c.Color.valueToColor(a,this._bgColor),c.Color.updateColor(this._bgColor),this._bgColor.r/=255,this._bgColor.g/=255,this._bgColor.b/=255,this._bgColor.a=1)},c.Stage.prototype.destroy=function(){this._hiddenVar&&document.removeEventListener(this._hiddenVar,this._onChange,!1),window.onpagehide=null,window.onpageshow=null,window.onblur=null,window.onfocus=null},Object.defineProperty(c.Stage.prototype,"backgroundColor",{get:function(){return this._bgColor.color},set:function(a){this.setBackgroundColor(a)}}),Object.defineProperty(c.Stage.prototype,"smoothed",{get:function(){return PIXI.scaleModes.DEFAULT===PIXI.scaleModes.LINEAR},set:function(a){a?PIXI.scaleModes.DEFAULT=PIXI.scaleModes.LINEAR:PIXI.scaleModes.DEFAULT=PIXI.scaleModes.NEAREST}}),c.Group=function(a,b,d,e,f,g){void 0===e&&(e=!1),void 0===f&&(f=!1),void 0===g&&(g=c.Physics.ARCADE),this.game=a,void 0===b&&(b=a.world),this.name=d||"group",this.z=0,PIXI.DisplayObjectContainer.call(this),e?(this.game.stage.addChild(this),this.z=this.game.stage.children.length):b&&(b.addChild(this),this.z=b.children.length),this.type=c.GROUP,this.physicsType=c.GROUP,this.alive=!0,this.exists=!0,this.ignoreDestroy=!1,this.pendingDestroy=!1,this.classType=c.Sprite,this.cursor=null,this.enableBody=f,this.enableBodyDebug=!1,this.physicsBodyType=g,this.physicsSortDirection=null,this.onDestroy=new c.Signal,this.cursorIndex=0,this.fixedToCamera=!1,this.cameraOffset=new c.Point,this.hash=[],this._sortProperty="z"},c.Group.prototype=Object.create(PIXI.DisplayObjectContainer.prototype),c.Group.prototype.constructor=c.Group,c.Group.RETURN_NONE=0,c.Group.RETURN_TOTAL=1,c.Group.RETURN_CHILD=2,c.Group.SORT_ASCENDING=-1,c.Group.SORT_DESCENDING=1,c.Group.prototype.add=function(a,b){return void 0===b&&(b=!1),a.parent!==this&&(a.body&&a.parent&&a.parent.hash&&a.parent.removeFromHash(a),a.z=this.children.length,this.addChild(a),this.enableBody&&null===a.body?this.game.physics.enable(a,this.physicsBodyType):a.body&&this.addToHash(a),!b&&a.events&&a.events.onAddedToGroup$dispatch(a,this),null===this.cursor&&(this.cursor=a)),a},c.Group.prototype.addToHash=function(a){if(a.parent===this){var b=this.hash.indexOf(a);if(-1===b)return this.hash.push(a),!0}return!1},c.Group.prototype.removeFromHash=function(a){if(a){var b=this.hash.indexOf(a);if(-1!==b)return this.hash.splice(b,1),!0}return!1},c.Group.prototype.addMultiple=function(a,b){if(a instanceof c.Group)a.moveAll(this,b);else if(Array.isArray(a))for(var d=0;d<a.length;d++)this.add(a[d],b);return a},c.Group.prototype.addAt=function(a,b,c){return void 0===c&&(c=!1),a.parent!==this&&(a.body&&a.parent&&a.parent.removeFromHash(a),this.addChildAt(a,b),this.updateZ(),this.enableBody&&null===a.body?this.game.physics.enable(a,this.physicsBodyType):a.body&&this.addToHash(a),!c&&a.events&&a.events.onAddedToGroup$dispatch(a,this),null===this.cursor&&(this.cursor=a)),a},c.Group.prototype.getAt=function(a){return 0>a||a>=this.children.length?-1:this.getChildAt(a)},c.Group.prototype.create=function(a,b,c,d,e){void 0===e&&(e=!0);var f=new this.classType(this.game,a,b,c,d);return f.exists=e,f.visible=e,f.alive=e,f.z=this.children.length,this.addChild(f),this.enableBody&&this.game.physics.enable(f,this.physicsBodyType,this.enableBodyDebug),f.events&&f.events.onAddedToGroup$dispatch(f,this),null===this.cursor&&(this.cursor=f),f},c.Group.prototype.createMultiple=function(a,b,c,d){void 0===d&&(d=!1);for(var e=0;a>e;e++)this.create(0,0,b,c,d)},c.Group.prototype.updateZ=function(){for(var a=this.children.length;a--;)this.children[a].z=a},c.Group.prototype.resetCursor=function(a){return void 0===a&&(a=0),a>this.children.length-1&&(a=0),this.cursor?(this.cursorIndex=a,this.cursor=this.children[this.cursorIndex],this.cursor):void 0},c.Group.prototype.next=function(){return this.cursor?(this.cursorIndex>=this.children.length-1?this.cursorIndex=0:this.cursorIndex++,this.cursor=this.children[this.cursorIndex],this.cursor):void 0},c.Group.prototype.previous=function(){return this.cursor?(0===this.cursorIndex?this.cursorIndex=this.children.length-1:this.cursorIndex--,this.cursor=this.children[this.cursorIndex],this.cursor):void 0},c.Group.prototype.swap=function(a,b){this.swapChildren(a,b),this.updateZ()},c.Group.prototype.bringToTop=function(a){return a.parent===this&&this.getIndex(a)<this.children.length&&(this.remove(a,!1,!0),this.add(a,!0)),a},c.Group.prototype.sendToBack=function(a){return a.parent===this&&this.getIndex(a)>0&&(this.remove(a,!1,!0),this.addAt(a,0,!0)),a},c.Group.prototype.moveUp=function(a){if(a.parent===this&&this.getIndex(a)<this.children.length-1){var b=this.getIndex(a),c=this.getAt(b+1);c&&this.swap(a,c)}return a},c.Group.prototype.moveDown=function(a){if(a.parent===this&&this.getIndex(a)>0){var b=this.getIndex(a),c=this.getAt(b-1);c&&this.swap(a,c)}return a},c.Group.prototype.xy=function(a,b,c){return 0>a||a>this.children.length?-1:(this.getChildAt(a).x=b,void(this.getChildAt(a).y=c))},c.Group.prototype.reverse=function(){this.children.reverse(),this.updateZ()},c.Group.prototype.getIndex=function(a){return this.children.indexOf(a)},c.Group.prototype.getByName=function(a){for(var b=0;b<this.children.length;b++)if(this.children[b].name===a)return this.children[b];return null},c.Group.prototype.replace=function(a,b){var d=this.getIndex(a);return-1!==d?(b.parent&&(b.parent instanceof c.Group?b.parent.remove(b):b.parent.removeChild(b)),this.remove(a),this.addAt(b,d),a):void 0},c.Group.prototype.hasProperty=function(a,b){var c=b.length;return 1===c&&b[0]in a?!0:2===c&&b[0]in a&&b[1]in a[b[0]]?!0:3===c&&b[0]in a&&b[1]in a[b[0]]&&b[2]in a[b[0]][b[1]]?!0:4===c&&b[0]in a&&b[1]in a[b[0]]&&b[2]in a[b[0]][b[1]]&&b[3]in a[b[0]][b[1]][b[2]]?!0:!1},c.Group.prototype.setProperty=function(a,b,c,d,e){if(void 0===e&&(e=!1),d=d||0,!this.hasProperty(a,b)&&(!e||d>0))return!1;var f=b.length;return 1===f?0===d?a[b[0]]=c:1==d?a[b[0]]+=c:2==d?a[b[0]]-=c:3==d?a[b[0]]*=c:4==d&&(a[b[0]]/=c):2===f?0===d?a[b[0]][b[1]]=c:1==d?a[b[0]][b[1]]+=c:2==d?a[b[0]][b[1]]-=c:3==d?a[b[0]][b[1]]*=c:4==d&&(a[b[0]][b[1]]/=c):3===f?0===d?a[b[0]][b[1]][b[2]]=c:1==d?a[b[0]][b[1]][b[2]]+=c:2==d?a[b[0]][b[1]][b[2]]-=c:3==d?a[b[0]][b[1]][b[2]]*=c:4==d&&(a[b[0]][b[1]][b[2]]/=c):4===f&&(0===d?a[b[0]][b[1]][b[2]][b[3]]=c:1==d?a[b[0]][b[1]][b[2]][b[3]]+=c:2==d?a[b[0]][b[1]][b[2]][b[3]]-=c:3==d?a[b[0]][b[1]][b[2]][b[3]]*=c:4==d&&(a[b[0]][b[1]][b[2]][b[3]]/=c)),!0},c.Group.prototype.checkProperty=function(a,b,d,e){return void 0===e&&(e=!1),!c.Utils.getProperty(a,b)&&e?!1:c.Utils.getProperty(a,b)!==d?!1:!0},c.Group.prototype.set=function(a,b,c,d,e,f,g){return void 0===g&&(g=!1),b=b.split("."),void 0===d&&(d=!1),void 0===e&&(e=!1),(d===!1||d&&a.alive)&&(e===!1||e&&a.visible)?this.setProperty(a,b,c,f,g):void 0},c.Group.prototype.setAll=function(a,b,c,d,e,f){void 0===c&&(c=!1),void 0===d&&(d=!1),void 0===f&&(f=!1),a=a.split("."),e=e||0;for(var g=0;g<this.children.length;g++)(!c||c&&this.children[g].alive)&&(!d||d&&this.children[g].visible)&&this.setProperty(this.children[g],a,b,e,f)},c.Group.prototype.setAllChildren=function(a,b,d,e,f,g){void 0===d&&(d=!1),void 0===e&&(e=!1),void 0===g&&(g=!1),f=f||0;for(var h=0;h<this.children.length;h++)(!d||d&&this.children[h].alive)&&(!e||e&&this.children[h].visible)&&(this.children[h]instanceof c.Group?this.children[h].setAllChildren(a,b,d,e,f,g):this.setProperty(this.children[h],a.split("."),b,f,g))},c.Group.prototype.checkAll=function(a,b,c,d,e){void 0===c&&(c=!1),void 0===d&&(d=!1),void 0===e&&(e=!1);for(var f=0;f<this.children.length;f++)if((!c||c&&this.children[f].alive)&&(!d||d&&this.children[f].visible)&&!this.checkProperty(this.children[f],a,b,e))return!1;return!0},c.Group.prototype.addAll=function(a,b,c,d){this.setAll(a,b,c,d,1)},c.Group.prototype.subAll=function(a,b,c,d){this.setAll(a,b,c,d,2)},c.Group.prototype.multiplyAll=function(a,b,c,d){this.setAll(a,b,c,d,3)},c.Group.prototype.divideAll=function(a,b,c,d){this.setAll(a,b,c,d,4)},c.Group.prototype.callAllExists=function(a,b){var c;if(arguments.length>2){c=[];for(var d=2;d<arguments.length;d++)c.push(arguments[d])}for(var d=0;d<this.children.length;d++)this.children[d].exists===b&&this.children[d][a]&&this.children[d][a].apply(this.children[d],c)},c.Group.prototype.callbackFromArray=function(a,b,c){if(1==c){if(a[b[0]])return a[b[0]]}else if(2==c){if(a[b[0]][b[1]])return a[b[0]][b[1]]}else if(3==c){if(a[b[0]][b[1]][b[2]])return a[b[0]][b[1]][b[2]]}else if(4==c){if(a[b[0]][b[1]][b[2]][b[3]])return a[b[0]][b[1]][b[2]][b[3]]}else if(a[b])return a[b];return!1},c.Group.prototype.callAll=function(a,b){if(void 0!==a){a=a.split(".");var c=a.length;if(void 0===b||null===b||""===b)b=null;else if("string"==typeof b){b=b.split(".");var d=b.length}var e;if(arguments.length>2){e=[];for(var f=2;f<arguments.length;f++)e.push(arguments[f])}for(var g=null,h=null,f=0;f<this.children.length;f++)g=this.callbackFromArray(this.children[f],a,c),b&&g?(h=this.callbackFromArray(this.children[f],b,d),g&&g.apply(h,e)):g&&g.apply(this.children[f],e)}},c.Group.prototype.preUpdate=function(){if(this.pendingDestroy)return this.destroy(),!1;if(!this.exists||!this.parent.exists)return this.renderOrderID=-1,!1;for(var a=this.children.length;a--;)this.children[a].preUpdate();return!0},c.Group.prototype.update=function(){for(var a=this.children.length;a--;)this.children[a].update()},c.Group.prototype.postUpdate=function(){this.fixedToCamera&&(this.x=this.game.camera.view.x+this.cameraOffset.x,this.y=this.game.camera.view.y+this.cameraOffset.y);for(var a=this.children.length;a--;)this.children[a].postUpdate()},c.Group.prototype.filter=function(a,b){for(var d=-1,e=this.children.length,f=[];++d<e;){var g=this.children[d];(!b||b&&g.exists)&&a(g,d,this.children)&&f.push(g)}return new c.ArraySet(f)},c.Group.prototype.forEach=function(a,b,c){if(void 0===c&&(c=!1),arguments.length<=3)for(var d=0;d<this.children.length;d++)(!c||c&&this.children[d].exists)&&a.call(b,this.children[d]);else{for(var e=[null],d=3;d<arguments.length;d++)e.push(arguments[d]);for(var d=0;d<this.children.length;d++)(!c||c&&this.children[d].exists)&&(e[0]=this.children[d],a.apply(b,e))}},c.Group.prototype.forEachExists=function(a,b){var d;if(arguments.length>2){d=[null];for(var e=2;e<arguments.length;e++)d.push(arguments[e])}this.iterate("exists",!0,c.Group.RETURN_TOTAL,a,b,d)},c.Group.prototype.forEachAlive=function(a,b){var d;if(arguments.length>2){d=[null];for(var e=2;e<arguments.length;e++)d.push(arguments[e])}this.iterate("alive",!0,c.Group.RETURN_TOTAL,a,b,d)},c.Group.prototype.forEachDead=function(a,b){var d;if(arguments.length>2){d=[null];for(var e=2;e<arguments.length;e++)d.push(arguments[e])}this.iterate("alive",!1,c.Group.RETURN_TOTAL,a,b,d)},c.Group.prototype.sort=function(a,b){this.children.length<2||(void 0===a&&(a="z"),void 0===b&&(b=c.Group.SORT_ASCENDING),this._sortProperty=a,b===c.Group.SORT_ASCENDING?this.children.sort(this.ascendingSortHandler.bind(this)):this.children.sort(this.descendingSortHandler.bind(this)),this.updateZ())},c.Group.prototype.customSort=function(a,b){this.children.length<2||(this.children.sort(a.bind(b)),this.updateZ())},c.Group.prototype.ascendingSortHandler=function(a,b){return a[this._sortProperty]<b[this._sortProperty]?-1:a[this._sortProperty]>b[this._sortProperty]?1:a.z<b.z?-1:1},c.Group.prototype.descendingSortHandler=function(a,b){return a[this._sortProperty]<b[this._sortProperty]?1:a[this._sortProperty]>b[this._sortProperty]?-1:0},c.Group.prototype.iterate=function(a,b,d,e,f,g){if(d===c.Group.RETURN_TOTAL&&0===this.children.length)return 0;for(var h=0,i=0;i<this.children.length;i++)if(this.children[i][a]===b&&(h++,e&&(g?(g[0]=this.children[i],e.apply(f,g)):e.call(f,this.children[i])),d===c.Group.RETURN_CHILD))return this.children[i];return d===c.Group.RETURN_TOTAL?h:null},c.Group.prototype.getFirstExists=function(a,b,d,e,f,g){void 0===b&&(b=!1),"boolean"!=typeof a&&(a=!0);var h=this.iterate("exists",a,c.Group.RETURN_CHILD);return null===h&&b?this.create(d,e,f,g):this.resetChild(h,d,e,f,g)},c.Group.prototype.getFirstAlive=function(a,b,d,e,f){void 0===a&&(a=!1);var g=this.iterate("alive",!0,c.Group.RETURN_CHILD);return null===g&&a?this.create(b,d,e,f):this.resetChild(g,b,d,e,f)},c.Group.prototype.getFirstDead=function(a,b,d,e,f){void 0===a&&(a=!1);var g=this.iterate("alive",!1,c.Group.RETURN_CHILD);return null===g&&a?this.create(b,d,e,f):this.resetChild(g,b,d,e,f)},c.Group.prototype.resetChild=function(a,b,c,d,e){return null===a?null:(void 0===b&&(b=null),void 0===c&&(c=null),null!==b&&null!==c&&a.reset(b,c),void 0!==d&&a.loadTexture(d,e),a)},c.Group.prototype.getTop=function(){return this.children.length>0?this.children[this.children.length-1]:void 0},c.Group.prototype.getBottom=function(){return this.children.length>0?this.children[0]:void 0},c.Group.prototype.countLiving=function(){return this.iterate("alive",!0,c.Group.RETURN_TOTAL)},c.Group.prototype.countDead=function(){return this.iterate("alive",!1,c.Group.RETURN_TOTAL)},c.Group.prototype.getRandom=function(a,b){return 0===this.children.length?null:(a=a||0,b=b||this.children.length,c.ArrayUtils.getRandomItem(this.children,a,b))},c.Group.prototype.remove=function(a,b,c){if(void 0===b&&(b=!1),void 0===c&&(c=!1),0===this.children.length||-1===this.children.indexOf(a))return!1;c||!a.events||a.destroyPhase||a.events.onRemovedFromGroup$dispatch(a,this);var d=this.removeChild(a);return this.removeFromHash(a),this.updateZ(),this.cursor===a&&this.next(),b&&d&&d.destroy(!0),!0},c.Group.prototype.moveAll=function(a,b){if(void 0===b&&(b=!1),this.children.length>0&&a instanceof c.Group){do a.add(this.children[0],b);while(this.children.length>0);this.hash=[],this.cursor=null}return a},c.Group.prototype.removeAll=function(a,b){if(void 0===a&&(a=!1),void 0===b&&(b=!1),0!==this.children.length){do{!b&&this.children[0].events&&this.children[0].events.onRemovedFromGroup$dispatch(this.children[0],this);var c=this.removeChild(this.children[0]);this.removeFromHash(c),a&&c&&c.destroy(!0)}while(this.children.length>0);this.hash=[],this.cursor=null}},c.Group.prototype.removeBetween=function(a,b,c,d){if(void 0===b&&(b=this.children.length-1),void 0===c&&(c=!1),void 0===d&&(d=!1),0!==this.children.length){if(a>b||0>a||b>this.children.length)return!1;for(var e=b;e>=a;){!d&&this.children[e].events&&this.children[e].events.onRemovedFromGroup$dispatch(this.children[e],this);var f=this.removeChild(this.children[e]);this.removeFromHash(f),c&&f&&f.destroy(!0),this.cursor===this.children[e]&&(this.cursor=null),e--}this.updateZ()}},c.Group.prototype.destroy=function(a,b){null===this.game||this.ignoreDestroy||(void 0===a&&(a=!0),void 0===b&&(b=!1),this.onDestroy.dispatch(this,a,b),this.removeAll(a),this.cursor=null,this.filters=null,this.pendingDestroy=!1,b||(this.parent&&this.parent.removeChild(this),this.game=null,this.exists=!1))},Object.defineProperty(c.Group.prototype,"total",{get:function(){return this.iterate("exists",!0,c.Group.RETURN_TOTAL)}}),Object.defineProperty(c.Group.prototype,"length",{get:function(){return this.children.length}}),Object.defineProperty(c.Group.prototype,"angle",{get:function(){return c.Math.radToDeg(this.rotation)},set:function(a){this.rotation=c.Math.degToRad(a)}}),c.World=function(a){c.Group.call(this,a,null,"__world",!1),this.bounds=new c.Rectangle(0,0,a.width,a.height),this.camera=null,this._definedSize=!1,this._width=a.width,this._height=a.height,this.game.state.onStateChange.add(this.stateChange,this)},c.World.prototype=Object.create(c.Group.prototype),c.World.prototype.constructor=c.World,
c.World.prototype.boot=function(){this.camera=new c.Camera(this.game,0,0,0,this.game.width,this.game.height),this.game.stage.addChild(this),this.camera.boot()},c.World.prototype.stateChange=function(){this.x=0,this.y=0,this.camera.reset()},c.World.prototype.setBounds=function(a,b,c,d){this._definedSize=!0,this._width=c,this._height=d,this.bounds.setTo(a,b,c,d),this.x=a,this.y=b,this.camera.bounds&&this.camera.bounds.setTo(a,b,Math.max(c,this.game.width),Math.max(d,this.game.height)),this.game.physics.setBoundsToWorld()},c.World.prototype.resize=function(a,b){this._definedSize&&(a<this._width&&(a=this._width),b<this._height&&(b=this._height)),this.bounds.width=a,this.bounds.height=b,this.game.camera.setBoundsToWorld(),this.game.physics.setBoundsToWorld()},c.World.prototype.shutdown=function(){this.destroy(!0,!0)},c.World.prototype.wrap=function(a,b,c,d,e){void 0===b&&(b=0),void 0===c&&(c=!1),void 0===d&&(d=!0),void 0===e&&(e=!0),c?(a.getBounds(),d&&(a.x+a._currentBounds.width<this.bounds.x?a.x=this.bounds.right:a.x>this.bounds.right&&(a.x=this.bounds.left)),e&&(a.y+a._currentBounds.height<this.bounds.top?a.y=this.bounds.bottom:a.y>this.bounds.bottom&&(a.y=this.bounds.top))):(d&&a.x+b<this.bounds.x?a.x=this.bounds.right+b:d&&a.x-b>this.bounds.right&&(a.x=this.bounds.left-b),e&&a.y+b<this.bounds.top?a.y=this.bounds.bottom+b:e&&a.y-b>this.bounds.bottom&&(a.y=this.bounds.top-b))},Object.defineProperty(c.World.prototype,"width",{get:function(){return this.bounds.width},set:function(a){a<this.game.width&&(a=this.game.width),this.bounds.width=a,this._width=a,this._definedSize=!0}}),Object.defineProperty(c.World.prototype,"height",{get:function(){return this.bounds.height},set:function(a){a<this.game.height&&(a=this.game.height),this.bounds.height=a,this._height=a,this._definedSize=!0}}),Object.defineProperty(c.World.prototype,"centerX",{get:function(){return this.bounds.halfWidth+this.bounds.x}}),Object.defineProperty(c.World.prototype,"centerY",{get:function(){return this.bounds.halfHeight+this.bounds.y}}),Object.defineProperty(c.World.prototype,"randomX",{get:function(){return this.bounds.x<0?this.game.rnd.between(this.bounds.x,this.bounds.width-Math.abs(this.bounds.x)):this.game.rnd.between(this.bounds.x,this.bounds.width)}}),Object.defineProperty(c.World.prototype,"randomY",{get:function(){return this.bounds.y<0?this.game.rnd.between(this.bounds.y,this.bounds.height-Math.abs(this.bounds.y)):this.game.rnd.between(this.bounds.y,this.bounds.height)}}),c.Game=function(a,b,d,e,f,g,h,i){return this.id=c.GAMES.push(this)-1,this.config=null,this.physicsConfig=i,this.parent="",this.width=800,this.height=600,this.resolution=1,this._width=800,this._height=600,this.transparent=!1,this.antialias=!0,this.preserveDrawingBuffer=!1,this.clearBeforeRender=!0,this.renderer=null,this.renderType=c.AUTO,this.state=null,this.isBooted=!1,this.isRunning=!1,this.raf=null,this.add=null,this.make=null,this.cache=null,this.input=null,this.load=null,this.math=null,this.net=null,this.scale=null,this.sound=null,this.stage=null,this.time=null,this.tweens=null,this.world=null,this.physics=null,this.plugins=null,this.rnd=null,this.device=c.Device,this.camera=null,this.canvas=null,this.context=null,this.debug=null,this.particles=null,this.create=null,this.lockRender=!1,this.stepping=!1,this.pendingStep=!1,this.stepCount=0,this.onPause=null,this.onResume=null,this.onBlur=null,this.onFocus=null,this._paused=!1,this._codePaused=!1,this.currentUpdateID=0,this.updatesThisFrame=1,this._deltaTime=0,this._lastCount=0,this._spiraling=0,this._kickstart=!0,this.fpsProblemNotifier=new c.Signal,this.forceSingleUpdate=!0,this._nextFpsNotification=0,1===arguments.length&&"object"==typeof arguments[0]?this.parseConfig(arguments[0]):(this.config={enableDebug:!0},"undefined"!=typeof a&&(this._width=a),"undefined"!=typeof b&&(this._height=b),"undefined"!=typeof d&&(this.renderType=d),"undefined"!=typeof e&&(this.parent=e),"undefined"!=typeof g&&(this.transparent=g),"undefined"!=typeof h&&(this.antialias=h),this.rnd=new c.RandomDataGenerator([(Date.now()*Math.random()).toString()]),this.state=new c.StateManager(this,f)),this.device.whenReady(this.boot,this),this},c.Game.prototype={parseConfig:function(a){this.config=a,void 0===a.enableDebug&&(this.config.enableDebug=!0),a.width&&(this._width=a.width),a.height&&(this._height=a.height),a.renderer&&(this.renderType=a.renderer),a.parent&&(this.parent=a.parent),void 0!==a.transparent&&(this.transparent=a.transparent),void 0!==a.antialias&&(this.antialias=a.antialias),a.resolution&&(this.resolution=a.resolution),void 0!==a.preserveDrawingBuffer&&(this.preserveDrawingBuffer=a.preserveDrawingBuffer),a.physicsConfig&&(this.physicsConfig=a.physicsConfig);var b=[(Date.now()*Math.random()).toString()];a.seed&&(b=a.seed),this.rnd=new c.RandomDataGenerator(b);var d=null;a.state&&(d=a.state),this.state=new c.StateManager(this,d)},boot:function(){this.isBooted||(this.onPause=new c.Signal,this.onResume=new c.Signal,this.onBlur=new c.Signal,this.onFocus=new c.Signal,this.isBooted=!0,PIXI.game=this,this.math=c.Math,this.scale=new c.ScaleManager(this,this._width,this._height),this.stage=new c.Stage(this),this.setUpRenderer(),this.world=new c.World(this),this.add=new c.GameObjectFactory(this),this.make=new c.GameObjectCreator(this),this.cache=new c.Cache(this),this.load=new c.Loader(this),this.time=new c.Time(this),this.tweens=new c.TweenManager(this),this.input=new c.Input(this),this.sound=new c.SoundManager(this),this.physics=new c.Physics(this,this.physicsConfig),this.particles=new c.Particles(this),this.create=new c.Create(this),this.plugins=new c.PluginManager(this),this.net=new c.Net(this),this.time.boot(),this.stage.boot(),this.world.boot(),this.scale.boot(),this.input.boot(),this.sound.boot(),this.state.boot(),this.config.enableDebug?(this.debug=new c.Utils.Debug(this),this.debug.boot()):this.debug={preUpdate:function(){},update:function(){},reset:function(){}},this.showDebugHeader(),this.isRunning=!0,this.config&&this.config.forceSetTimeOut?this.raf=new c.RequestAnimationFrame(this,this.config.forceSetTimeOut):this.raf=new c.RequestAnimationFrame(this,!1),this._kickstart=!0,window.focus&&(!window.PhaserGlobal||window.PhaserGlobal&&!window.PhaserGlobal.stopFocus)&&window.focus(),this.raf.start())},showDebugHeader:function(){if(!window.PhaserGlobal||!window.PhaserGlobal.hideBanner){var a=c.VERSION,b="Canvas",d="HTML Audio",e=1;if(this.renderType===c.WEBGL?(b="WebGL",e++):this.renderType==c.HEADLESS&&(b="Headless"),this.device.webAudio&&(d="WebAudio",e++),this.device.chrome){for(var f=["%c %c %c Phaser v"+a+" | Pixi.js "+PIXI.VERSION+" | "+b+" | "+d+"  %c %c %c http://phaser.io %c♥%c♥%c♥","background: #9854d8","background: #6c2ca7","color: #ffffff; background: #450f78;","background: #6c2ca7","background: #9854d8","background: #ffffff"],g=0;3>g;g++)e>g?f.push("color: #ff2424; background: #fff"):f.push("color: #959595; background: #fff");console.log.apply(console,f)}else window.console&&console.log("Phaser v"+a+" | Pixi.js "+PIXI.VERSION+" | "+b+" | "+d+" | http://phaser.io")}},setUpRenderer:function(){if(this.config.canvas?this.canvas=this.config.canvas:this.canvas=c.Canvas.create(this,this.width,this.height,this.config.canvasID,!0),this.config.canvasStyle?this.canvas.style=this.config.canvasStyle:this.canvas.style["-webkit-full-screen"]="width: 100%; height: 100%",this.renderType===c.HEADLESS||this.renderType===c.CANVAS||this.renderType===c.AUTO&&!this.device.webGL){if(!this.device.canvas)throw new Error("Phaser.Game - Cannot create Canvas or WebGL context, aborting.");this.renderType=c.CANVAS,this.renderer=new PIXI.CanvasRenderer(this),this.context=this.renderer.context}else this.renderType=c.WEBGL,this.renderer=new PIXI.WebGLRenderer(this),this.context=null,this.canvas.addEventListener("webglcontextlost",this.contextLost.bind(this),!1),this.canvas.addEventListener("webglcontextrestored",this.contextRestored.bind(this),!1);this.device.cocoonJS&&(this.canvas.screencanvas=this.renderType===c.CANVAS?!0:!1),this.renderType!==c.HEADLESS&&(this.stage.smoothed=this.antialias,c.Canvas.addToDOM(this.canvas,this.parent,!1),c.Canvas.setTouchAction(this.canvas))},contextLost:function(a){a.preventDefault(),this.renderer.contextLost=!0},contextRestored:function(){this.renderer.initContext(),this.cache.clearGLTextures(),this.renderer.contextLost=!1},update:function(a){if(this.time.update(a),this._kickstart)return this.updateLogic(this.time.desiredFpsMult),this.stage.updateTransform(),this.updateRender(this.time.slowMotion*this.time.desiredFps),void(this._kickstart=!1);if(this._spiraling>1&&!this.forceSingleUpdate)this.time.time>this._nextFpsNotification&&(this._nextFpsNotification=this.time.time+1e4,this.fpsProblemNotifier.dispatch()),this._deltaTime=0,this._spiraling=0,this.updateRender(this.time.slowMotion*this.time.desiredFps);else{var b=1e3*this.time.slowMotion/this.time.desiredFps;this._deltaTime+=Math.max(Math.min(3*b,this.time.elapsed),0);var c=0;for(this.updatesThisFrame=Math.floor(this._deltaTime/b),this.forceSingleUpdate&&(this.updatesThisFrame=Math.min(1,this.updatesThisFrame));this._deltaTime>=b&&(this._deltaTime-=b,this.currentUpdateID=c,this.updateLogic(this.time.desiredFpsMult),this.stage.updateTransform(),c++,!this.forceSingleUpdate||1!==c);)this.time.refresh();c>this._lastCount?this._spiraling++:c<this._lastCount&&(this._spiraling=0),this._lastCount=c,this.updateRender(this._deltaTime/b)}},updateLogic:function(a){this._paused||this.pendingStep?(this.scale.pauseUpdate(),this.state.pauseUpdate(),this.debug.preUpdate()):(this.stepping&&(this.pendingStep=!0),this.scale.preUpdate(),this.debug.preUpdate(),this.world.camera.preUpdate(),this.physics.preUpdate(),this.state.preUpdate(a),this.plugins.preUpdate(a),this.stage.preUpdate(),this.state.update(),this.stage.update(),this.tweens.update(),this.sound.update(),this.input.update(),this.physics.update(),this.particles.update(),this.plugins.update(),this.stage.postUpdate(),this.plugins.postUpdate())},updateRender:function(a){this.lockRender||(this.state.preRender(a),this.renderer.render(this.stage),this.plugins.render(a),this.state.render(a),this.plugins.postRender(a))},enableStep:function(){this.stepping=!0,this.pendingStep=!1,this.stepCount=0},disableStep:function(){this.stepping=!1,this.pendingStep=!1},step:function(){this.pendingStep=!1,this.stepCount++},destroy:function(){this.raf.stop(),this.state.destroy(),this.sound.destroy(),this.scale.destroy(),this.stage.destroy(),this.input.destroy(),this.physics.destroy(),this.plugins.destroy(),this.state=null,this.sound=null,this.scale=null,this.stage=null,this.input=null,this.physics=null,this.plugins=null,this.cache=null,this.load=null,this.time=null,this.world=null,this.isBooted=!1,this.renderer.destroy(!1),c.Canvas.removeFromDOM(this.canvas),c.GAMES[this.id]=null},gamePaused:function(a){this._paused||(this._paused=!0,this.time.gamePaused(),this.sound.muteOnPause&&this.sound.setMute(),this.onPause.dispatch(a),this.device.cordova&&this.device.iOS&&(this.lockRender=!0))},gameResumed:function(a){this._paused&&!this._codePaused&&(this._paused=!1,this.time.gameResumed(),this.input.reset(),this.sound.muteOnPause&&this.sound.unsetMute(),this.onResume.dispatch(a),this.device.cordova&&this.device.iOS&&(this.lockRender=!1))},focusLoss:function(a){this.onBlur.dispatch(a),this.stage.disableVisibilityChange||this.gamePaused(a)},focusGain:function(a){this.onFocus.dispatch(a),this.stage.disableVisibilityChange||this.gameResumed(a)}},c.Game.prototype.constructor=c.Game,Object.defineProperty(c.Game.prototype,"paused",{get:function(){return this._paused},set:function(a){a===!0?(this._paused===!1&&(this._paused=!0,this.sound.setMute(),this.time.gamePaused(),this.onPause.dispatch(this)),this._codePaused=!0):(this._paused&&(this._paused=!1,this.input.reset(),this.sound.unsetMute(),this.time.gameResumed(),this.onResume.dispatch(this)),this._codePaused=!1)}}),c.Input=function(a){this.game=a,this.hitCanvas=null,this.hitContext=null,this.moveCallbacks=[],this.pollRate=0,this.enabled=!0,this.multiInputOverride=c.Input.MOUSE_TOUCH_COMBINE,this.position=null,this.speed=null,this.circle=null,this.scale=null,this.maxPointers=-1,this.tapRate=200,this.doubleTapRate=300,this.holdRate=2e3,this.justPressedRate=200,this.justReleasedRate=200,this.recordPointerHistory=!1,this.recordRate=100,this.recordLimit=100,this.pointer1=null,this.pointer2=null,this.pointer3=null,this.pointer4=null,this.pointer5=null,this.pointer6=null,this.pointer7=null,this.pointer8=null,this.pointer9=null,this.pointer10=null,this.pointers=[],this.activePointer=null,this.mousePointer=null,this.mouse=null,this.keyboard=null,this.touch=null,this.mspointer=null,this.gamepad=null,this.resetLocked=!1,this.onDown=null,this.onUp=null,this.onTap=null,this.onHold=null,this.minPriorityID=0,this.interactiveItems=new c.ArraySet,this._localPoint=new c.Point,this._pollCounter=0,this._oldPosition=null,this._x=0,this._y=0},c.Input.MOUSE_OVERRIDES_TOUCH=0,c.Input.TOUCH_OVERRIDES_MOUSE=1,c.Input.MOUSE_TOUCH_COMBINE=2,c.Input.MAX_POINTERS=10,c.Input.prototype={boot:function(){this.mousePointer=new c.Pointer(this.game,0,c.PointerMode.CURSOR),this.addPointer(),this.addPointer(),this.mouse=new c.Mouse(this.game),this.touch=new c.Touch(this.game),this.mspointer=new c.MSPointer(this.game),c.Keyboard&&(this.keyboard=new c.Keyboard(this.game)),c.Gamepad&&(this.gamepad=new c.Gamepad(this.game)),this.onDown=new c.Signal,this.onUp=new c.Signal,this.onTap=new c.Signal,this.onHold=new c.Signal,this.scale=new c.Point(1,1),this.speed=new c.Point,this.position=new c.Point,this._oldPosition=new c.Point,this.circle=new c.Circle(0,0,44),this.activePointer=this.mousePointer,this.hitCanvas=PIXI.CanvasPool.create(this,1,1),this.hitContext=this.hitCanvas.getContext("2d"),this.mouse.start(),this.touch.start(),this.mspointer.start(),this.mousePointer.active=!0,this.keyboard&&this.keyboard.start();var a=this;this._onClickTrampoline=function(b){a.onClickTrampoline(b)},this.game.canvas.addEventListener("click",this._onClickTrampoline,!1)},destroy:function(){this.mouse.stop(),this.touch.stop(),this.mspointer.stop(),this.keyboard&&this.keyboard.stop(),this.gamepad&&this.gamepad.stop(),this.moveCallbacks=[],PIXI.CanvasPool.remove(this),this.game.canvas.removeEventListener("click",this._onClickTrampoline)},addMoveCallback:function(a,b){this.moveCallbacks.push({callback:a,context:b})},deleteMoveCallback:function(a,b){for(var c=this.moveCallbacks.length;c--;)if(this.moveCallbacks[c].callback===a&&this.moveCallbacks[c].context===b)return void this.moveCallbacks.splice(c,1)},addPointer:function(){if(this.pointers.length>=c.Input.MAX_POINTERS)return console.warn("Phaser.Input.addPointer: Maximum limit of "+c.Input.MAX_POINTERS+" pointers reached."),null;var a=this.pointers.length+1,b=new c.Pointer(this.game,a,c.PointerMode.TOUCH);return this.pointers.push(b),this["pointer"+a]=b,b},update:function(){if(this.keyboard&&this.keyboard.update(),this.pollRate>0&&this._pollCounter<this.pollRate)return void this._pollCounter++;this.speed.x=this.position.x-this._oldPosition.x,this.speed.y=this.position.y-this._oldPosition.y,this._oldPosition.copyFrom(this.position),this.mousePointer.update(),this.gamepad&&this.gamepad.active&&this.gamepad.update();for(var a=0;a<this.pointers.length;a++)this.pointers[a].update();this._pollCounter=0},reset:function(a){if(this.game.isBooted&&!this.resetLocked){void 0===a&&(a=!1),this.mousePointer.reset(),this.keyboard&&this.keyboard.reset(a),this.gamepad&&this.gamepad.reset();for(var b=0;b<this.pointers.length;b++)this.pointers[b].reset();"none"!==this.game.canvas.style.cursor&&(this.game.canvas.style.cursor="inherit"),a&&(this.onDown.dispose(),this.onUp.dispose(),this.onTap.dispose(),this.onHold.dispose(),this.onDown=new c.Signal,this.onUp=new c.Signal,this.onTap=new c.Signal,this.onHold=new c.Signal,this.moveCallbacks=[]),this._pollCounter=0}},resetSpeed:function(a,b){this._oldPosition.setTo(a,b),this.speed.setTo(0,0)},startPointer:function(a){if(this.maxPointers>=0&&this.countActivePointers(this.maxPointers)>=this.maxPointers)return null;if(!this.pointer1.active)return this.pointer1.start(a);if(!this.pointer2.active)return this.pointer2.start(a);for(var b=2;b<this.pointers.length;b++){var c=this.pointers[b];if(!c.active)return c.start(a)}return null},updatePointer:function(a){if(this.pointer1.active&&this.pointer1.identifier===a.identifier)return this.pointer1.move(a);if(this.pointer2.active&&this.pointer2.identifier===a.identifier)return this.pointer2.move(a);for(var b=2;b<this.pointers.length;b++){var c=this.pointers[b];if(c.active&&c.identifier===a.identifier)return c.move(a)}return null},stopPointer:function(a){if(this.pointer1.active&&this.pointer1.identifier===a.identifier)return this.pointer1.stop(a);if(this.pointer2.active&&this.pointer2.identifier===a.identifier)return this.pointer2.stop(a);for(var b=2;b<this.pointers.length;b++){var c=this.pointers[b];if(c.active&&c.identifier===a.identifier)return c.stop(a)}return null},countActivePointers:function(a){void 0===a&&(a=this.pointers.length);for(var b=a,c=0;c<this.pointers.length&&b>0;c++){var d=this.pointers[c];d.active&&b--}return a-b},getPointer:function(a){void 0===a&&(a=!1);for(var b=0;b<this.pointers.length;b++){var c=this.pointers[b];if(c.active===a)return c}return null},getPointerFromIdentifier:function(a){for(var b=0;b<this.pointers.length;b++){var c=this.pointers[b];if(c.identifier===a)return c}return null},getPointerFromId:function(a){for(var b=0;b<this.pointers.length;b++){var c=this.pointers[b];if(c.pointerId===a)return c}return null},getLocalPosition:function(a,b,d){void 0===d&&(d=new c.Point);var e=a.worldTransform,f=1/(e.a*e.d+e.c*-e.b);return d.setTo(e.d*f*b.x+-e.c*f*b.y+(e.ty*e.c-e.tx*e.d)*f,e.a*f*b.y+-e.b*f*b.x+(-e.ty*e.a+e.tx*e.b)*f)},hitTest:function(a,b,d){if(!a.worldVisible)return!1;if(this.getLocalPosition(a,b,this._localPoint),d.copyFrom(this._localPoint),a.hitArea&&a.hitArea.contains)return a.hitArea.contains(this._localPoint.x,this._localPoint.y);if(a instanceof c.TileSprite){var e=a.width,f=a.height,g=-e*a.anchor.x;if(this._localPoint.x>=g&&this._localPoint.x<g+e){var h=-f*a.anchor.y;if(this._localPoint.y>=h&&this._localPoint.y<h+f)return!0}}else if(a instanceof PIXI.Sprite){var e=a.texture.frame.width,f=a.texture.frame.height,g=-e*a.anchor.x;if(this._localPoint.x>=g&&this._localPoint.x<g+e){var h=-f*a.anchor.y;if(this._localPoint.y>=h&&this._localPoint.y<h+f)return!0}}else if(a instanceof c.Graphics)for(var i=0;i<a.graphicsData.length;i++){var j=a.graphicsData[i];if(j.fill&&j.shape&&j.shape.contains(this._localPoint.x,this._localPoint.y))return!0}for(var i=0,k=a.children.length;k>i;i++)if(this.hitTest(a.children[i],b,d))return!0;return!1},onClickTrampoline:function(){this.activePointer.processClickTrampolines()}},c.Input.prototype.constructor=c.Input,Object.defineProperty(c.Input.prototype,"x",{get:function(){return this._x},set:function(a){this._x=Math.floor(a)}}),Object.defineProperty(c.Input.prototype,"y",{get:function(){return this._y},set:function(a){this._y=Math.floor(a)}}),Object.defineProperty(c.Input.prototype,"pollLocked",{get:function(){return this.pollRate>0&&this._pollCounter<this.pollRate}}),Object.defineProperty(c.Input.prototype,"totalInactivePointers",{get:function(){return this.pointers.length-this.countActivePointers()}}),Object.defineProperty(c.Input.prototype,"totalActivePointers",{get:function(){return this.countActivePointers()}}),Object.defineProperty(c.Input.prototype,"worldX",{get:function(){return this.game.camera.view.x+this.x}}),Object.defineProperty(c.Input.prototype,"worldY",{get:function(){return this.game.camera.view.y+this.y}}),c.Mouse=function(a){this.game=a,this.input=a.input,this.callbackContext=this.game,this.mouseDownCallback=null,this.mouseUpCallback=null,this.mouseOutCallback=null,this.mouseOverCallback=null,this.mouseWheelCallback=null,this.capture=!1,this.button=-1,this.wheelDelta=0,this.enabled=!0,this.locked=!1,this.stopOnGameOut=!1,this.pointerLock=new c.Signal,this.event=null,this._onMouseDown=null,this._onMouseMove=null,this._onMouseUp=null,this._onMouseOut=null,this._onMouseOver=null,this._onMouseWheel=null,this._wheelEvent=null},c.Mouse.NO_BUTTON=-1,c.Mouse.LEFT_BUTTON=0,c.Mouse.MIDDLE_BUTTON=1,c.Mouse.RIGHT_BUTTON=2,c.Mouse.BACK_BUTTON=3,c.Mouse.FORWARD_BUTTON=4,c.Mouse.WHEEL_UP=1,c.Mouse.WHEEL_DOWN=-1,c.Mouse.prototype={start:function(){if((!this.game.device.android||this.game.device.chrome!==!1)&&null===this._onMouseDown){var b=this;this._onMouseDown=function(a){return b.onMouseDown(a)},this._onMouseMove=function(a){return b.onMouseMove(a)},this._onMouseUp=function(a){return b.onMouseUp(a)},this._onMouseUpGlobal=function(a){return b.onMouseUpGlobal(a)},this._onMouseOutGlobal=function(a){return b.onMouseOutGlobal(a)},this._onMouseOut=function(a){return b.onMouseOut(a)},this._onMouseOver=function(a){return b.onMouseOver(a)},this._onMouseWheel=function(a){return b.onMouseWheel(a)};var c=this.game.canvas;c.addEventListener("mousedown",this._onMouseDown,!0),c.addEventListener("mousemove",this._onMouseMove,!0),c.addEventListener("mouseup",this._onMouseUp,!0),this.game.device.cocoonJS||(window.addEventListener("mouseup",this._onMouseUpGlobal,!0),window.addEventListener("mouseout",this._onMouseOutGlobal,!0),c.addEventListener("mouseover",this._onMouseOver,!0),c.addEventListener("mouseout",this._onMouseOut,!0));var d=this.game.device.wheelEvent;d&&(c.addEventListener(d,this._onMouseWheel,!0),"mousewheel"===d?this._wheelEvent=new a(-1/40,1):"DOMMouseScroll"===d&&(this._wheelEvent=new a(1,1)))}},onMouseDown:function(a){this.event=a,this.capture&&a.preventDefault(),this.mouseDownCallback&&this.mouseDownCallback.call(this.callbackContext,a),this.input.enabled&&this.enabled&&(a.identifier=0,this.input.mousePointer.start(a))},onMouseMove:function(a){this.event=a,this.capture&&a.preventDefault(),this.mouseMoveCallback&&this.mouseMoveCallback.call(this.callbackContext,a),this.input.enabled&&this.enabled&&(a.identifier=0,this.input.mousePointer.move(a))},onMouseUp:function(a){this.event=a,this.capture&&a.preventDefault(),this.mouseUpCallback&&this.mouseUpCallback.call(this.callbackContext,a),this.input.enabled&&this.enabled&&(a.identifier=0,this.input.mousePointer.stop(a))},onMouseUpGlobal:function(a){this.input.mousePointer.withinGame||(this.mouseUpCallback&&this.mouseUpCallback.call(this.callbackContext,a),a.identifier=0,this.input.mousePointer.stop(a))},onMouseOutGlobal:function(a){this.event=a,this.capture&&a.preventDefault(),this.input.mousePointer.withinGame=!1,this.input.enabled&&this.enabled&&(this.input.mousePointer.stop(a),this.input.mousePointer.leftButton.stop(a),this.input.mousePointer.rightButton.stop(a))},onMouseOut:function(a){this.event=a,this.capture&&a.preventDefault(),this.input.mousePointer.withinGame=!1,this.mouseOutCallback&&this.mouseOutCallback.call(this.callbackContext,a),this.input.enabled&&this.enabled&&this.stopOnGameOut&&(a.identifier=0,this.input.mousePointer.stop(a))},onMouseOver:function(a){this.event=a,this.capture&&a.preventDefault(),this.input.mousePointer.withinGame=!0,this.mouseOverCallback&&this.mouseOverCallback.call(this.callbackContext,a)},onMouseWheel:function(a){this._wheelEvent&&(a=this._wheelEvent.bindEvent(a)),this.event=a,this.capture&&a.preventDefault(),this.wheelDelta=c.Math.clamp(-a.deltaY,-1,1),this.mouseWheelCallback&&this.mouseWheelCallback.call(this.callbackContext,a)},requestPointerLock:function(){if(this.game.device.pointerLock){var a=this.game.canvas;a.requestPointerLock=a.requestPointerLock||a.mozRequestPointerLock||a.webkitRequestPointerLock,a.requestPointerLock();var b=this;this._pointerLockChange=function(a){return b.pointerLockChange(a)},document.addEventListener("pointerlockchange",this._pointerLockChange,!0),document.addEventListener("mozpointerlockchange",this._pointerLockChange,!0),document.addEventListener("webkitpointerlockchange",this._pointerLockChange,!0)}},pointerLockChange:function(a){var b=this.game.canvas;document.pointerLockElement===b||document.mozPointerLockElement===b||document.webkitPointerLockElement===b?(this.locked=!0,this.pointerLock.dispatch(!0,a)):(this.locked=!1,this.pointerLock.dispatch(!1,a))},releasePointerLock:function(){document.exitPointerLock=document.exitPointerLock||document.mozExitPointerLock||document.webkitExitPointerLock,document.exitPointerLock(),document.removeEventListener("pointerlockchange",this._pointerLockChange,!0),document.removeEventListener("mozpointerlockchange",this._pointerLockChange,!0),document.removeEventListener("webkitpointerlockchange",this._pointerLockChange,!0)},stop:function(){var a=this.game.canvas;a.removeEventListener("mousedown",this._onMouseDown,!0),a.removeEventListener("mousemove",this._onMouseMove,!0),a.removeEventListener("mouseup",this._onMouseUp,!0),a.removeEventListener("mouseover",this._onMouseOver,!0),a.removeEventListener("mouseout",this._onMouseOut,!0);var b=this.game.device.wheelEvent;b&&a.removeEventListener(b,this._onMouseWheel,!0),window.removeEventListener("mouseup",this._onMouseUpGlobal,!0),window.removeEventListener("mouseout",this._onMouseOutGlobal,!0),document.removeEventListener("pointerlockchange",this._pointerLockChange,!0),document.removeEventListener("mozpointerlockchange",this._pointerLockChange,!0),document.removeEventListener("webkitpointerlockchange",this._pointerLockChange,!0)}},c.Mouse.prototype.constructor=c.Mouse,a.prototype={},a.prototype.constructor=a,a.prototype.bindEvent=function(b){if(!a._stubsGenerated&&b){var c=function(a){return function(){var b=this.originalEvent[a];return"function"!=typeof b?b:b.bind(this.originalEvent)}};for(var d in b)d in a.prototype||Object.defineProperty(a.prototype,d,{get:c(d)});a._stubsGenerated=!0}return this.originalEvent=b,this},Object.defineProperties(a.prototype,{type:{value:"wheel"},deltaMode:{get:function(){return this._deltaMode}},deltaY:{get:function(){return this._scaleFactor*(this.originalEvent.wheelDelta||this.originalEvent.detail)||0}},deltaX:{get:function(){return this._scaleFactor*this.originalEvent.wheelDeltaX||0}},deltaZ:{value:0}}),c.MSPointer=function(a){this.game=a,this.input=a.input,this.callbackContext=this.game,this.pointerDownCallback=null,this.pointerMoveCallback=null,this.pointerUpCallback=null,this.capture=!0,this.button=-1,this.event=null,this.enabled=!0,this._onMSPointerDown=null,this._onMSPointerMove=null,this._onMSPointerUp=null,this._onMSPointerUpGlobal=null,this._onMSPointerOut=null,this._onMSPointerOver=null},c.MSPointer.prototype={start:function(){if(null===this._onMSPointerDown){var a=this;if(this.game.device.mspointer){this._onMSPointerDown=function(b){return a.onPointerDown(b)},this._onMSPointerMove=function(b){return a.onPointerMove(b)},this._onMSPointerUp=function(b){return a.onPointerUp(b)},this._onMSPointerUpGlobal=function(b){return a.onPointerUpGlobal(b)},this._onMSPointerOut=function(b){return a.onPointerOut(b)},this._onMSPointerOver=function(b){return a.onPointerOver(b)};var b=this.game.canvas;b.addEventListener("MSPointerDown",this._onMSPointerDown,!1),b.addEventListener("MSPointerMove",this._onMSPointerMove,!1),b.addEventListener("MSPointerUp",this._onMSPointerUp,!1),b.addEventListener("pointerdown",this._onMSPointerDown,!1),b.addEventListener("pointermove",this._onMSPointerMove,!1),b.addEventListener("pointerup",this._onMSPointerUp,!1),b.style["-ms-content-zooming"]="none",b.style["-ms-touch-action"]="none",this.game.device.cocoonJS||(window.addEventListener("MSPointerUp",this._onMSPointerUpGlobal,!0),b.addEventListener("MSPointerOver",this._onMSPointerOver,!0),b.addEventListener("MSPointerOut",this._onMSPointerOut,!0),window.addEventListener("pointerup",this._onMSPointerUpGlobal,!0),b.addEventListener("pointerover",this._onMSPointerOver,!0),b.addEventListener("pointerout",this._onMSPointerOut,!0))}}},onPointerDown:function(a){this.event=a,this.capture&&a.preventDefault(),this.pointerDownCallback&&this.pointerDownCallback.call(this.callbackContext,a),this.input.enabled&&this.enabled&&(a.identifier=a.pointerId,"mouse"===a.pointerType||4===a.pointerType?this.input.mousePointer.start(a):this.input.startPointer(a))},onPointerMove:function(a){this.event=a,this.capture&&a.preventDefault(),this.pointerMoveCallback&&this.pointerMoveCallback.call(this.callbackContext,a),this.input.enabled&&this.enabled&&(a.identifier=a.pointerId,"mouse"===a.pointerType||4===a.pointerType?this.input.mousePointer.move(a):this.input.updatePointer(a))},onPointerUp:function(a){this.event=a,this.capture&&a.preventDefault(),this.pointerUpCallback&&this.pointerUpCallback.call(this.callbackContext,a),this.input.enabled&&this.enabled&&(a.identifier=a.pointerId,"mouse"===a.pointerType||4===a.pointerType?this.input.mousePointer.stop(a):this.input.stopPointer(a))},onPointerUpGlobal:function(a){if("mouse"!==a.pointerType&&4!==a.pointerType||this.input.mousePointer.withinGame){var b=this.input.getPointerFromIdentifier(a.identifier);b&&b.withinGame&&this.onPointerUp(a)}else this.onPointerUp(a)},onPointerOut:function(a){if(this.event=a,this.capture&&a.preventDefault(),"mouse"===a.pointerType||4===a.pointerType)this.input.mousePointer.withinGame=!1;else{var b=this.input.getPointerFromIdentifier(a.identifier);b&&(b.withinGame=!1)}this.input.mouse.mouseOutCallback&&this.input.mouse.mouseOutCallback.call(this.input.mouse.callbackContext,a),this.input.enabled&&this.enabled&&this.input.mouse.stopOnGameOut&&(a.identifier=0,b?b.stop(a):this.input.mousePointer.stop(a))},onPointerOver:function(a){if(this.event=a,this.capture&&a.preventDefault(),"mouse"===a.pointerType||4===a.pointerType)this.input.mousePointer.withinGame=!0;else{var b=this.input.getPointerFromIdentifier(a.identifier);b&&(b.withinGame=!0)}this.input.mouse.mouseOverCallback&&this.input.mouse.mouseOverCallback.call(this.input.mouse.callbackContext,a)},stop:function(){var a=this.game.canvas;a.removeEventListener("MSPointerDown",this._onMSPointerDown,!1),a.removeEventListener("MSPointerMove",this._onMSPointerMove,!1),a.removeEventListener("MSPointerUp",this._onMSPointerUp,!1),a.removeEventListener("pointerdown",this._onMSPointerDown,!1),a.removeEventListener("pointermove",this._onMSPointerMove,!1),a.removeEventListener("pointerup",this._onMSPointerUp,!1),window.removeEventListener("MSPointerUp",this._onMSPointerUpGlobal,!0),a.removeEventListener("MSPointerOver",this._onMSPointerOver,!0),a.removeEventListener("MSPointerOut",this._onMSPointerOut,!0),window.removeEventListener("pointerup",this._onMSPointerUpGlobal,!0),a.removeEventListener("pointerover",this._onMSPointerOver,!0),a.removeEventListener("pointerout",this._onMSPointerOut,!0)}},c.MSPointer.prototype.constructor=c.MSPointer,c.DeviceButton=function(a,b){this.parent=a,this.game=a.game,this.event=null,this.isDown=!1,this.isUp=!0,this.timeDown=0,this.timeUp=0,this.repeats=0,this.altKey=!1,this.shiftKey=!1,this.ctrlKey=!1,this.value=0,this.buttonCode=b,this.onDown=new c.Signal,this.onUp=new c.Signal,this.onFloat=new c.Signal},c.DeviceButton.prototype={start:function(a,b){this.isDown||(this.isDown=!0,this.isUp=!1,this.timeDown=this.game.time.time,this.repeats=0,this.event=a,this.value=b,a&&(this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.ctrlKey=a.ctrlKey),this.onDown.dispatch(this,b))},stop:function(a,b){this.isUp||(this.isDown=!1,this.isUp=!0,this.timeUp=this.game.time.time,this.event=a,this.value=b,a&&(this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.ctrlKey=a.ctrlKey),this.onUp.dispatch(this,b))},padFloat:function(a){this.value=a,this.onFloat.dispatch(this,a)},justPressed:function(a){return a=a||250,this.isDown&&this.timeDown+a>this.game.time.time},justReleased:function(a){return a=a||250,this.isUp&&this.timeUp+a>this.game.time.time},reset:function(){this.isDown=!1,this.isUp=!0,this.timeDown=this.game.time.time,this.repeats=0,this.altKey=!1,this.shiftKey=!1,this.ctrlKey=!1},destroy:function(){this.onDown.dispose(),this.onUp.dispose(),this.onFloat.dispose(),this.parent=null,
this.game=null}},c.DeviceButton.prototype.constructor=c.DeviceButton,Object.defineProperty(c.DeviceButton.prototype,"duration",{get:function(){return this.isUp?-1:this.game.time.time-this.timeDown}}),c.Pointer=function(a,b,d){this.game=a,this.id=b,this.type=c.POINTER,this.exists=!0,this.identifier=0,this.pointerId=null,this.pointerMode=d||c.PointerMode.CURSOR|c.PointerMode.CONTACT,this.target=null,this.button=null,this.leftButton=new c.DeviceButton(this,c.Pointer.LEFT_BUTTON),this.middleButton=new c.DeviceButton(this,c.Pointer.MIDDLE_BUTTON),this.rightButton=new c.DeviceButton(this,c.Pointer.RIGHT_BUTTON),this.backButton=new c.DeviceButton(this,c.Pointer.BACK_BUTTON),this.forwardButton=new c.DeviceButton(this,c.Pointer.FORWARD_BUTTON),this.eraserButton=new c.DeviceButton(this,c.Pointer.ERASER_BUTTON),this._holdSent=!1,this._history=[],this._nextDrop=0,this._stateReset=!1,this.withinGame=!1,this.clientX=-1,this.clientY=-1,this.pageX=-1,this.pageY=-1,this.screenX=-1,this.screenY=-1,this.rawMovementX=0,this.rawMovementY=0,this.movementX=0,this.movementY=0,this.x=-1,this.y=-1,this.isMouse=0===b,this.isDown=!1,this.isUp=!0,this.timeDown=0,this.timeUp=0,this.previousTapTime=0,this.totalTouches=0,this.msSinceLastClick=Number.MAX_VALUE,this.targetObject=null,this.active=!1,this.dirty=!1,this.position=new c.Point,this.positionDown=new c.Point,this.positionUp=new c.Point,this.circle=new c.Circle(0,0,44),this._clickTrampolines=null,this._trampolineTargetObject=null},c.Pointer.NO_BUTTON=0,c.Pointer.LEFT_BUTTON=1,c.Pointer.RIGHT_BUTTON=2,c.Pointer.MIDDLE_BUTTON=4,c.Pointer.BACK_BUTTON=8,c.Pointer.FORWARD_BUTTON=16,c.Pointer.ERASER_BUTTON=32,c.Pointer.prototype={resetButtons:function(){this.isDown=!1,this.isUp=!0,this.isMouse&&(this.leftButton.reset(),this.middleButton.reset(),this.rightButton.reset(),this.backButton.reset(),this.forwardButton.reset(),this.eraserButton.reset())},processButtonsDown:function(a,b){c.Pointer.LEFT_BUTTON&a&&this.leftButton.start(b),c.Pointer.RIGHT_BUTTON&a&&this.rightButton.start(b),c.Pointer.MIDDLE_BUTTON&a&&this.middleButton.start(b),c.Pointer.BACK_BUTTON&a&&this.backButton.start(b),c.Pointer.FORWARD_BUTTON&a&&this.forwardButton.start(b),c.Pointer.ERASER_BUTTON&a&&this.eraserButton.start(b)},processButtonsUp:function(a,b){a===c.Mouse.LEFT_BUTTON&&this.leftButton.stop(b),a===c.Mouse.RIGHT_BUTTON&&this.rightButton.stop(b),a===c.Mouse.MIDDLE_BUTTON&&this.middleButton.stop(b),a===c.Mouse.BACK_BUTTON&&this.backButton.stop(b),a===c.Mouse.FORWARD_BUTTON&&this.forwardButton.stop(b),5===a&&this.eraserButton.stop(b)},updateButtons:function(a){this.button=a.button;var b="down"===a.type.toLowerCase().substr(-4);void 0!==a.buttons?b?this.processButtonsDown(a.buttons,a):this.processButtonsUp(a.button,a):b?this.leftButton.start(a):(this.leftButton.stop(a),this.rightButton.stop(a)),1===a.buttons&&a.ctrlKey&&this.leftButton.isDown&&(this.leftButton.stop(a),this.rightButton.start(a)),this.isUp=!0,this.isDown=!1,(this.leftButton.isDown||this.rightButton.isDown||this.middleButton.isDown||this.backButton.isDown||this.forwardButton.isDown||this.eraserButton.isDown)&&(this.isUp=!1,this.isDown=!0)},start:function(a){var b=this.game.input;return a.pointerId&&(this.pointerId=a.pointerId),this.identifier=a.identifier,this.target=a.target,this.isMouse?this.updateButtons(a):(this.isDown=!0,this.isUp=!1),this.active=!0,this.withinGame=!0,this.dirty=!1,this._history=[],this._clickTrampolines=null,this._trampolineTargetObject=null,this.msSinceLastClick=this.game.time.time-this.timeDown,this.timeDown=this.game.time.time,this._holdSent=!1,this.move(a,!0),this.positionDown.setTo(this.x,this.y),(b.multiInputOverride===c.Input.MOUSE_OVERRIDES_TOUCH||b.multiInputOverride===c.Input.MOUSE_TOUCH_COMBINE||b.multiInputOverride===c.Input.TOUCH_OVERRIDES_MOUSE&&0===b.totalActivePointers)&&(b.x=this.x,b.y=this.y,b.position.setTo(this.x,this.y),b.onDown.dispatch(this,a),b.resetSpeed(this.x,this.y)),this._stateReset=!1,this.totalTouches++,null!==this.targetObject&&this.targetObject._touchedHandler(this),this},update:function(){var a=this.game.input;this.active&&(this.dirty&&(a.interactiveItems.total>0&&this.processInteractiveObjects(!1),this.dirty=!1),this._holdSent===!1&&this.duration>=a.holdRate&&((a.multiInputOverride===c.Input.MOUSE_OVERRIDES_TOUCH||a.multiInputOverride===c.Input.MOUSE_TOUCH_COMBINE||a.multiInputOverride===c.Input.TOUCH_OVERRIDES_MOUSE&&0===a.totalActivePointers)&&a.onHold.dispatch(this),this._holdSent=!0),a.recordPointerHistory&&this.game.time.time>=this._nextDrop&&(this._nextDrop=this.game.time.time+a.recordRate,this._history.push({x:this.position.x,y:this.position.y}),this._history.length>a.recordLimit&&this._history.shift()))},move:function(a,b){var d=this.game.input;if(!d.pollLocked){if(void 0===b&&(b=!1),void 0!==a.button&&(this.button=a.button),b&&this.isMouse&&this.updateButtons(a),this.clientX=a.clientX,this.clientY=a.clientY,this.pageX=a.pageX,this.pageY=a.pageY,this.screenX=a.screenX,this.screenY=a.screenY,this.isMouse&&d.mouse.locked&&!b&&(this.rawMovementX=a.movementX||a.mozMovementX||a.webkitMovementX||0,this.rawMovementY=a.movementY||a.mozMovementY||a.webkitMovementY||0,this.movementX+=this.rawMovementX,this.movementY+=this.rawMovementY),this.x=(this.pageX-this.game.scale.offset.x)*d.scale.x,this.y=(this.pageY-this.game.scale.offset.y)*d.scale.y,this.position.setTo(this.x,this.y),this.circle.x=this.x,this.circle.y=this.y,(d.multiInputOverride===c.Input.MOUSE_OVERRIDES_TOUCH||d.multiInputOverride===c.Input.MOUSE_TOUCH_COMBINE||d.multiInputOverride===c.Input.TOUCH_OVERRIDES_MOUSE&&0===d.totalActivePointers)&&(d.activePointer=this,d.x=this.x,d.y=this.y,d.position.setTo(d.x,d.y),d.circle.x=d.x,d.circle.y=d.y),this.withinGame=this.game.scale.bounds.contains(this.pageX,this.pageY),this.game.paused)return this;for(var e=d.moveCallbacks.length;e--;)d.moveCallbacks[e].callback.call(d.moveCallbacks[e].context,this,this.x,this.y,b);return null!==this.targetObject&&this.targetObject.isDragged===!0?this.targetObject.update(this)===!1&&(this.targetObject=null):d.interactiveItems.total>0&&this.processInteractiveObjects(b),this}},processInteractiveObjects:function(a){for(var b=Number.MAX_VALUE,c=-1,d=null,e=this.game.input.interactiveItems.first;e;)e.checked=!1,e.validForInput(c,b,!1)&&(e.checked=!0,(a&&e.checkPointerDown(this,!0)||!a&&e.checkPointerOver(this,!0))&&(b=e.sprite.renderOrderID,c=e.priorityID,d=e)),e=this.game.input.interactiveItems.next;for(var e=this.game.input.interactiveItems.first;e;)!e.checked&&e.validForInput(c,b,!0)&&(a&&e.checkPointerDown(this,!1)||!a&&e.checkPointerOver(this,!1))&&(b=e.sprite.renderOrderID,c=e.priorityID,d=e),e=this.game.input.interactiveItems.next;return null===d?this.targetObject&&(this.targetObject._pointerOutHandler(this),this.targetObject=null):null===this.targetObject?(this.targetObject=d,d._pointerOverHandler(this)):this.targetObject===d?d.update(this)===!1&&(this.targetObject=null):(this.targetObject._pointerOutHandler(this),this.targetObject=d,this.targetObject._pointerOverHandler(this)),null!==this.targetObject},leave:function(a){this.withinGame=!1,this.move(a,!1)},stop:function(a){var b=this.game.input;return this._stateReset&&this.withinGame?void a.preventDefault():(this.timeUp=this.game.time.time,(b.multiInputOverride===c.Input.MOUSE_OVERRIDES_TOUCH||b.multiInputOverride===c.Input.MOUSE_TOUCH_COMBINE||b.multiInputOverride===c.Input.TOUCH_OVERRIDES_MOUSE&&0===b.totalActivePointers)&&(b.onUp.dispatch(this,a),this.duration>=0&&this.duration<=b.tapRate&&(this.timeUp-this.previousTapTime<b.doubleTapRate?b.onTap.dispatch(this,!0):b.onTap.dispatch(this,!1),this.previousTapTime=this.timeUp)),this.isMouse?this.updateButtons(a):(this.isDown=!1,this.isUp=!0),this.id>0&&(this.active=!1),this.withinGame=this.game.scale.bounds.contains(a.pageX,a.pageY),this.pointerId=null,this.identifier=null,this.positionUp.setTo(this.x,this.y),this.isMouse===!1&&b.currentPointers--,b.interactiveItems.callAll("_releasedHandler",this),this._clickTrampolines&&(this._trampolineTargetObject=this.targetObject),this.targetObject=null,this)},justPressed:function(a){return a=a||this.game.input.justPressedRate,this.isDown===!0&&this.timeDown+a>this.game.time.time},justReleased:function(a){return a=a||this.game.input.justReleasedRate,this.isUp&&this.timeUp+a>this.game.time.time},addClickTrampoline:function(a,b,c,d){if(this.isDown){for(var e=this._clickTrampolines=this._clickTrampolines||[],f=0;f<e.length;f++)if(e[f].name===a){e.splice(f,1);break}e.push({name:a,targetObject:this.targetObject,callback:b,callbackContext:c,callbackArgs:d})}},processClickTrampolines:function(){var a=this._clickTrampolines;if(a){for(var b=0;b<a.length;b++){var c=a[b];c.targetObject===this._trampolineTargetObject&&c.callback.apply(c.callbackContext,c.callbackArgs)}this._clickTrampolines=null,this._trampolineTargetObject=null}},reset:function(){this.isMouse===!1&&(this.active=!1),this.pointerId=null,this.identifier=null,this.dirty=!1,this.totalTouches=0,this._holdSent=!1,this._history.length=0,this._stateReset=!0,this.resetButtons(),this.targetObject&&this.targetObject._releasedHandler(this),this.targetObject=null},resetMovement:function(){this.movementX=0,this.movementY=0}},c.Pointer.prototype.constructor=c.Pointer,Object.defineProperty(c.Pointer.prototype,"duration",{get:function(){return this.isUp?-1:this.game.time.time-this.timeDown}}),Object.defineProperty(c.Pointer.prototype,"worldX",{get:function(){return this.game.world.camera.x+this.x}}),Object.defineProperty(c.Pointer.prototype,"worldY",{get:function(){return this.game.world.camera.y+this.y}}),c.PointerMode={CURSOR:1,CONTACT:2},c.Touch=function(a){this.game=a,this.enabled=!0,this.touchLockCallbacks=[],this.callbackContext=this.game,this.touchStartCallback=null,this.touchMoveCallback=null,this.touchEndCallback=null,this.touchEnterCallback=null,this.touchLeaveCallback=null,this.touchCancelCallback=null,this.preventDefault=!0,this.event=null,this._onTouchStart=null,this._onTouchMove=null,this._onTouchEnd=null,this._onTouchEnter=null,this._onTouchLeave=null,this._onTouchCancel=null,this._onTouchMove=null},c.Touch.prototype={start:function(){if(null===this._onTouchStart){var a=this;this.game.device.touch&&(this._onTouchStart=function(b){return a.onTouchStart(b)},this._onTouchMove=function(b){return a.onTouchMove(b)},this._onTouchEnd=function(b){return a.onTouchEnd(b)},this._onTouchEnter=function(b){return a.onTouchEnter(b)},this._onTouchLeave=function(b){return a.onTouchLeave(b)},this._onTouchCancel=function(b){return a.onTouchCancel(b)},this.game.canvas.addEventListener("touchstart",this._onTouchStart,!1),this.game.canvas.addEventListener("touchmove",this._onTouchMove,!1),this.game.canvas.addEventListener("touchend",this._onTouchEnd,!1),this.game.canvas.addEventListener("touchcancel",this._onTouchCancel,!1),this.game.device.cocoonJS||(this.game.canvas.addEventListener("touchenter",this._onTouchEnter,!1),this.game.canvas.addEventListener("touchleave",this._onTouchLeave,!1)))}},consumeDocumentTouches:function(){this._documentTouchMove=function(a){a.preventDefault()},document.addEventListener("touchmove",this._documentTouchMove,!1)},addTouchLockCallback:function(a,b,c){void 0===c&&(c=!1),this.touchLockCallbacks.push({callback:a,context:b,onEnd:c})},removeTouchLockCallback:function(a,b){for(var c=this.touchLockCallbacks.length;c--;)if(this.touchLockCallbacks[c].callback===a&&this.touchLockCallbacks[c].context===b)return this.touchLockCallbacks.splice(c,1),!0;return!1},onTouchStart:function(a){for(var b=this.touchLockCallbacks.length;b--;){var c=this.touchLockCallbacks[b];!c.onEnd&&c.callback.call(c.context,this,a)&&this.touchLockCallbacks.splice(b,1)}if(this.event=a,this.game.input.enabled&&this.enabled){this.touchStartCallback&&this.touchStartCallback.call(this.callbackContext,a),this.preventDefault&&a.preventDefault();for(var b=0;b<a.changedTouches.length;b++)this.game.input.startPointer(a.changedTouches[b])}},onTouchCancel:function(a){if(this.event=a,this.touchCancelCallback&&this.touchCancelCallback.call(this.callbackContext,a),this.game.input.enabled&&this.enabled){this.preventDefault&&a.preventDefault();for(var b=0;b<a.changedTouches.length;b++)this.game.input.stopPointer(a.changedTouches[b])}},onTouchEnter:function(a){this.event=a,this.touchEnterCallback&&this.touchEnterCallback.call(this.callbackContext,a),this.game.input.enabled&&this.enabled&&this.preventDefault&&a.preventDefault()},onTouchLeave:function(a){this.event=a,this.touchLeaveCallback&&this.touchLeaveCallback.call(this.callbackContext,a),this.preventDefault&&a.preventDefault()},onTouchMove:function(a){this.event=a,this.touchMoveCallback&&this.touchMoveCallback.call(this.callbackContext,a),this.preventDefault&&a.preventDefault();for(var b=0;b<a.changedTouches.length;b++)this.game.input.updatePointer(a.changedTouches[b])},onTouchEnd:function(a){for(var b=this.touchLockCallbacks.length;b--;){var c=this.touchLockCallbacks[b];c.onEnd&&c.callback.call(c.context,this,a)&&this.touchLockCallbacks.splice(b,1)}this.event=a,this.touchEndCallback&&this.touchEndCallback.call(this.callbackContext,a),this.preventDefault&&a.preventDefault();for(var b=0;b<a.changedTouches.length;b++)this.game.input.stopPointer(a.changedTouches[b])},stop:function(){this.game.device.touch&&(this.game.canvas.removeEventListener("touchstart",this._onTouchStart),this.game.canvas.removeEventListener("touchmove",this._onTouchMove),this.game.canvas.removeEventListener("touchend",this._onTouchEnd),this.game.canvas.removeEventListener("touchenter",this._onTouchEnter),this.game.canvas.removeEventListener("touchleave",this._onTouchLeave),this.game.canvas.removeEventListener("touchcancel",this._onTouchCancel))}},c.Touch.prototype.constructor=c.Touch,c.InputHandler=function(a){this.sprite=a,this.game=a.game,this.enabled=!1,this.checked=!1,this.priorityID=0,this.useHandCursor=!1,this._setHandCursor=!1,this.isDragged=!1,this.allowHorizontalDrag=!0,this.allowVerticalDrag=!0,this.bringToTop=!1,this.snapOffset=null,this.snapOnDrag=!1,this.snapOnRelease=!1,this.snapX=0,this.snapY=0,this.snapOffsetX=0,this.snapOffsetY=0,this.pixelPerfectOver=!1,this.pixelPerfectClick=!1,this.pixelPerfectAlpha=255,this.draggable=!1,this.boundsRect=null,this.boundsSprite=null,this.scaleLayer=!1,this.dragOffset=new c.Point,this.dragFromCenter=!1,this.dragStartPoint=new c.Point,this.snapPoint=new c.Point,this._dragPoint=new c.Point,this._dragPhase=!1,this._wasEnabled=!1,this._tempPoint=new c.Point,this._pointerData=[],this._pointerData.push({id:0,x:0,y:0,camX:0,camY:0,isDown:!1,isUp:!1,isOver:!1,isOut:!1,timeOver:0,timeOut:0,timeDown:0,timeUp:0,downDuration:0,isDragged:!1})},c.InputHandler.prototype={start:function(a,b){if(a=a||0,void 0===b&&(b=!1),this.enabled===!1){this.game.input.interactiveItems.add(this),this.useHandCursor=b,this.priorityID=a;for(var d=0;10>d;d++)this._pointerData[d]={id:d,x:0,y:0,isDown:!1,isUp:!1,isOver:!1,isOut:!1,timeOver:0,timeOut:0,timeDown:0,timeUp:0,downDuration:0,isDragged:!1};this.snapOffset=new c.Point,this.enabled=!0,this._wasEnabled=!0}return this.sprite.events.onAddedToGroup.add(this.addedToGroup,this),this.sprite.events.onRemovedFromGroup.add(this.removedFromGroup,this),this.flagged=!1,this.sprite},addedToGroup:function(){this._dragPhase||this._wasEnabled&&!this.enabled&&this.start()},removedFromGroup:function(){this._dragPhase||(this.enabled?(this._wasEnabled=!0,this.stop()):this._wasEnabled=!1)},reset:function(){this.enabled=!1,this.flagged=!1;for(var a=0;10>a;a++)this._pointerData[a]={id:a,x:0,y:0,isDown:!1,isUp:!1,isOver:!1,isOut:!1,timeOver:0,timeOut:0,timeDown:0,timeUp:0,downDuration:0,isDragged:!1}},stop:function(){this.enabled!==!1&&(this.enabled=!1,this.game.input.interactiveItems.remove(this))},destroy:function(){this.sprite&&(this._setHandCursor&&(this.game.canvas.style.cursor="default",this._setHandCursor=!1),this.enabled=!1,this.game.input.interactiveItems.remove(this),this._pointerData.length=0,this.boundsRect=null,this.boundsSprite=null,this.sprite=null)},validForInput:function(a,b,c){return void 0===c&&(c=!0),!this.enabled||0===this.sprite.scale.x||0===this.sprite.scale.y||this.priorityID<this.game.input.minPriorityID?!1:(c||!this.pixelPerfectClick&&!this.pixelPerfectOver)&&(this.priorityID>a||this.priorityID===a&&this.sprite.renderOrderID<b)?!0:!1},isPixelPerfect:function(){return this.pixelPerfectClick||this.pixelPerfectOver},pointerX:function(a){return a=a||0,this._pointerData[a].x},pointerY:function(a){return a=a||0,this._pointerData[a].y},pointerDown:function(a){return a=a||0,this._pointerData[a].isDown},pointerUp:function(a){return a=a||0,this._pointerData[a].isUp},pointerTimeDown:function(a){return a=a||0,this._pointerData[a].timeDown},pointerTimeUp:function(a){return a=a||0,this._pointerData[a].timeUp},pointerOver:function(a){if(!this.enabled)return!1;if(void 0===a){for(var b=0;10>b;b++)if(this._pointerData[b].isOver)return!0;return!1}return this._pointerData[a].isOver},pointerOut:function(a){if(!this.enabled)return!1;if(void 0!==a)return this._pointerData[a].isOut;for(var b=0;10>b;b++)if(this._pointerData[b].isOut)return!0},pointerTimeOver:function(a){return a=a||0,this._pointerData[a].timeOver},pointerTimeOut:function(a){return a=a||0,this._pointerData[a].timeOut},pointerDragged:function(a){return a=a||0,this._pointerData[a].isDragged},checkPointerDown:function(a,b){return a.isDown&&this.enabled&&this.sprite&&this.sprite.parent&&this.sprite.visible&&this.sprite.parent.visible&&this.game.input.hitTest(this.sprite,a,this._tempPoint)?(void 0===b&&(b=!1),!b&&this.pixelPerfectClick?this.checkPixel(this._tempPoint.x,this._tempPoint.y):!0):!1},checkPointerOver:function(a,b){return this.enabled&&this.sprite&&this.sprite.parent&&this.sprite.visible&&this.sprite.parent.visible&&this.game.input.hitTest(this.sprite,a,this._tempPoint)?(void 0===b&&(b=!1),!b&&this.pixelPerfectOver?this.checkPixel(this._tempPoint.x,this._tempPoint.y):!0):!1},checkPixel:function(a,b,c){if(this.sprite.texture.baseTexture.source){if(null===a&&null===b){this.game.input.getLocalPosition(this.sprite,c,this._tempPoint);var a=this._tempPoint.x,b=this._tempPoint.y}if(0!==this.sprite.anchor.x&&(a-=-this.sprite.texture.frame.width*this.sprite.anchor.x),0!==this.sprite.anchor.y&&(b-=-this.sprite.texture.frame.height*this.sprite.anchor.y),a+=this.sprite.texture.frame.x,b+=this.sprite.texture.frame.y,this.sprite.texture.trim&&(a-=this.sprite.texture.trim.x,b-=this.sprite.texture.trim.y,a<this.sprite.texture.crop.x||a>this.sprite.texture.crop.right||b<this.sprite.texture.crop.y||b>this.sprite.texture.crop.bottom))return this._dx=a,this._dy=b,!1;this._dx=a,this._dy=b,this.game.input.hitContext.clearRect(0,0,1,1),this.game.input.hitContext.drawImage(this.sprite.texture.baseTexture.source,a,b,1,1,0,0,1,1);var d=this.game.input.hitContext.getImageData(0,0,1,1);if(d.data[3]>=this.pixelPerfectAlpha)return!0}return!1},update:function(a){return null!==this.sprite&&void 0!==this.sprite.parent?this.enabled&&this.sprite.visible&&this.sprite.parent.visible?this.draggable&&this._draggedPointerID===a.id?this.updateDrag(a):this._pointerData[a.id].isOver?this.checkPointerOver(a)?(this._pointerData[a.id].x=a.x-this.sprite.x,this._pointerData[a.id].y=a.y-this.sprite.y,!0):(this._pointerOutHandler(a),!1):void 0:(this._pointerOutHandler(a),!1):void 0},_pointerOverHandler:function(a){if(null!==this.sprite){var b=this._pointerData[a.id];if(b.isOver===!1||a.dirty){var c=b.isOver===!1;b.isOver=!0,b.isOut=!1,b.timeOver=this.game.time.time,b.x=a.x-this.sprite.x,b.y=a.y-this.sprite.y,this.useHandCursor&&b.isDragged===!1&&(this.game.canvas.style.cursor="pointer",this._setHandCursor=!0),c&&this.sprite&&this.sprite.events&&this.sprite.events.onInputOver$dispatch(this.sprite,a)}}},_pointerOutHandler:function(a){if(null!==this.sprite){var b=this._pointerData[a.id];b.isOver=!1,b.isOut=!0,b.timeOut=this.game.time.time,this.useHandCursor&&b.isDragged===!1&&(this.game.canvas.style.cursor="default",this._setHandCursor=!1),this.sprite&&this.sprite.events&&this.sprite.events.onInputOut$dispatch(this.sprite,a)}},_touchedHandler:function(a){if(null!==this.sprite){var b=this._pointerData[a.id];if(!b.isDown&&b.isOver){if(this.pixelPerfectClick&&!this.checkPixel(null,null,a))return;if(b.isDown=!0,b.isUp=!1,b.timeDown=this.game.time.time,a.dirty=!0,this.sprite&&this.sprite.events&&(this.sprite.events.onInputDown$dispatch(this.sprite,a),null===this.sprite))return;this.draggable&&this.isDragged===!1&&this.startDrag(a),this.bringToTop&&this.sprite.bringToTop()}}},_releasedHandler:function(a){if(null!==this.sprite){var b=this._pointerData[a.id];if(b.isDown&&a.isUp){b.isDown=!1,b.isUp=!0,b.timeUp=this.game.time.time,b.downDuration=b.timeUp-b.timeDown;var c=this.checkPointerOver(a);this.sprite&&this.sprite.events&&(this.sprite.events.onInputUp$dispatch(this.sprite,a,c),c&&(c=this.checkPointerOver(a))),b.isOver=c,!c&&this.useHandCursor&&(this.game.canvas.style.cursor="default",this._setHandCursor=!1),a.dirty=!0,this.draggable&&this.isDragged&&this._draggedPointerID===a.id&&this.stopDrag(a)}}},updateDrag:function(a,b){if(a.isUp)return this.stopDrag(a),!1;void 0===b&&(b=!1);var c=this.globalToLocalX(a.x)+this._dragPoint.x+this.dragOffset.x,d=this.globalToLocalY(a.y)+this._dragPoint.y+this.dragOffset.y;if(this.sprite.fixedToCamera)this.allowHorizontalDrag&&(this.sprite.cameraOffset.x=c),this.allowVerticalDrag&&(this.sprite.cameraOffset.y=d),this.boundsRect&&this.checkBoundsRect(),this.boundsSprite&&this.checkBoundsSprite(),this.snapOnDrag&&(this.sprite.cameraOffset.x=Math.round((this.sprite.cameraOffset.x-this.snapOffsetX%this.snapX)/this.snapX)*this.snapX+this.snapOffsetX%this.snapX,this.sprite.cameraOffset.y=Math.round((this.sprite.cameraOffset.y-this.snapOffsetY%this.snapY)/this.snapY)*this.snapY+this.snapOffsetY%this.snapY,this.snapPoint.set(this.sprite.cameraOffset.x,this.sprite.cameraOffset.y));else{var e=this.game.camera.x-this._pointerData[a.id].camX,f=this.game.camera.y-this._pointerData[a.id].camY;this.allowHorizontalDrag&&(this.sprite.x=c+e),this.allowVerticalDrag&&(this.sprite.y=d+f),this.boundsRect&&this.checkBoundsRect(),this.boundsSprite&&this.checkBoundsSprite(),this.snapOnDrag&&(this.sprite.x=Math.round((this.sprite.x-this.snapOffsetX%this.snapX)/this.snapX)*this.snapX+this.snapOffsetX%this.snapX,this.sprite.y=Math.round((this.sprite.y-this.snapOffsetY%this.snapY)/this.snapY)*this.snapY+this.snapOffsetY%this.snapY,this.snapPoint.set(this.sprite.x,this.sprite.y))}return this.sprite.events.onDragUpdate.dispatch(this.sprite,a,c,d,this.snapPoint,b),!0},justOver:function(a,b){return a=a||0,b=b||500,this._pointerData[a].isOver&&this.overDuration(a)<b},justOut:function(a,b){return a=a||0,b=b||500,this._pointerData[a].isOut&&this.game.time.time-this._pointerData[a].timeOut<b},justPressed:function(a,b){return a=a||0,b=b||500,this._pointerData[a].isDown&&this.downDuration(a)<b},justReleased:function(a,b){return a=a||0,b=b||500,this._pointerData[a].isUp&&this.game.time.time-this._pointerData[a].timeUp<b},overDuration:function(a){return a=a||0,this._pointerData[a].isOver?this.game.time.time-this._pointerData[a].timeOver:-1},downDuration:function(a){return a=a||0,this._pointerData[a].isDown?this.game.time.time-this._pointerData[a].timeDown:-1},enableDrag:function(a,b,d,e,f,g){void 0===a&&(a=!1),void 0===b&&(b=!1),void 0===d&&(d=!1),void 0===e&&(e=255),void 0===f&&(f=null),void 0===g&&(g=null),this._dragPoint=new c.Point,this.draggable=!0,this.bringToTop=b,this.dragOffset=new c.Point,this.dragFromCenter=a,this.pixelPerfectClick=d,this.pixelPerfectAlpha=e,f&&(this.boundsRect=f),g&&(this.boundsSprite=g)},disableDrag:function(){if(this._pointerData)for(var a=0;10>a;a++)this._pointerData[a].isDragged=!1;this.draggable=!1,this.isDragged=!1,this._draggedPointerID=-1},startDrag:function(a){var b=this.sprite.x,c=this.sprite.y;if(this.isDragged=!0,this._draggedPointerID=a.id,this._pointerData[a.id].camX=this.game.camera.x,this._pointerData[a.id].camY=this.game.camera.y,this._pointerData[a.id].isDragged=!0,this.sprite.fixedToCamera){if(this.dragFromCenter){var d=this.sprite.getBounds();this.sprite.cameraOffset.x=this.globalToLocalX(a.x)+(this.sprite.cameraOffset.x-d.centerX),this.sprite.cameraOffset.y=this.globalToLocalY(a.y)+(this.sprite.cameraOffset.y-d.centerY)}this._dragPoint.setTo(this.sprite.cameraOffset.x-a.x,this.sprite.cameraOffset.y-a.y)}else{if(this.dragFromCenter){var d=this.sprite.getBounds();this.sprite.x=this.globalToLocalX(a.x)+(this.sprite.x-d.centerX),this.sprite.y=this.globalToLocalY(a.y)+(this.sprite.y-d.centerY)}this._dragPoint.setTo(this.sprite.x-this.globalToLocalX(a.x),this.sprite.y-this.globalToLocalY(a.y))}this.updateDrag(a,!0),this.bringToTop&&(this._dragPhase=!0,this.sprite.bringToTop()),this.dragStartPoint.set(b,c),this.sprite.events.onDragStart$dispatch(this.sprite,a,b,c)},globalToLocalX:function(a){return this.scaleLayer&&(a-=this.game.scale.grid.boundsFluid.x,a*=this.game.scale.grid.scaleFluidInversed.x),a},globalToLocalY:function(a){return this.scaleLayer&&(a-=this.game.scale.grid.boundsFluid.y,a*=this.game.scale.grid.scaleFluidInversed.y),a},stopDrag:function(a){this.isDragged=!1,this._draggedPointerID=-1,this._pointerData[a.id].isDragged=!1,this._dragPhase=!1,this.snapOnRelease&&(this.sprite.fixedToCamera?(this.sprite.cameraOffset.x=Math.round((this.sprite.cameraOffset.x-this.snapOffsetX%this.snapX)/this.snapX)*this.snapX+this.snapOffsetX%this.snapX,this.sprite.cameraOffset.y=Math.round((this.sprite.cameraOffset.y-this.snapOffsetY%this.snapY)/this.snapY)*this.snapY+this.snapOffsetY%this.snapY):(this.sprite.x=Math.round((this.sprite.x-this.snapOffsetX%this.snapX)/this.snapX)*this.snapX+this.snapOffsetX%this.snapX,this.sprite.y=Math.round((this.sprite.y-this.snapOffsetY%this.snapY)/this.snapY)*this.snapY+this.snapOffsetY%this.snapY)),this.sprite.events.onDragStop$dispatch(this.sprite,a),this.checkPointerOver(a)===!1&&this._pointerOutHandler(a)},setDragLock:function(a,b){void 0===a&&(a=!0),void 0===b&&(b=!0),this.allowHorizontalDrag=a,this.allowVerticalDrag=b},enableSnap:function(a,b,c,d,e,f){void 0===c&&(c=!0),void 0===d&&(d=!1),void 0===e&&(e=0),void 0===f&&(f=0),this.snapX=a,this.snapY=b,this.snapOffsetX=e,this.snapOffsetY=f,this.snapOnDrag=c,this.snapOnRelease=d},disableSnap:function(){this.snapOnDrag=!1,this.snapOnRelease=!1},checkBoundsRect:function(){this.sprite.fixedToCamera?(this.sprite.cameraOffset.x<this.boundsRect.left?this.sprite.cameraOffset.x=this.boundsRect.left:this.sprite.cameraOffset.x+this.sprite.width>this.boundsRect.right&&(this.sprite.cameraOffset.x=this.boundsRect.right-this.sprite.width),this.sprite.cameraOffset.y<this.boundsRect.top?this.sprite.cameraOffset.y=this.boundsRect.top:this.sprite.cameraOffset.y+this.sprite.height>this.boundsRect.bottom&&(this.sprite.cameraOffset.y=this.boundsRect.bottom-this.sprite.height)):(this.sprite.left<this.boundsRect.left?this.sprite.x=this.boundsRect.x+this.sprite.offsetX:this.sprite.right>this.boundsRect.right&&(this.sprite.x=this.boundsRect.right-(this.sprite.width-this.sprite.offsetX)),this.sprite.top<this.boundsRect.top?this.sprite.y=this.boundsRect.top+this.sprite.offsetY:this.sprite.bottom>this.boundsRect.bottom&&(this.sprite.y=this.boundsRect.bottom-(this.sprite.height-this.sprite.offsetY)))},checkBoundsSprite:function(){this.sprite.fixedToCamera&&this.boundsSprite.fixedToCamera?(this.sprite.cameraOffset.x<this.boundsSprite.cameraOffset.x?this.sprite.cameraOffset.x=this.boundsSprite.cameraOffset.x:this.sprite.cameraOffset.x+this.sprite.width>this.boundsSprite.cameraOffset.x+this.boundsSprite.width&&(this.sprite.cameraOffset.x=this.boundsSprite.cameraOffset.x+this.boundsSprite.width-this.sprite.width),this.sprite.cameraOffset.y<this.boundsSprite.cameraOffset.y?this.sprite.cameraOffset.y=this.boundsSprite.cameraOffset.y:this.sprite.cameraOffset.y+this.sprite.height>this.boundsSprite.cameraOffset.y+this.boundsSprite.height&&(this.sprite.cameraOffset.y=this.boundsSprite.cameraOffset.y+this.boundsSprite.height-this.sprite.height)):(this.sprite.left<this.boundsSprite.left?this.sprite.x=this.boundsSprite.left+this.sprite.offsetX:this.sprite.right>this.boundsSprite.right&&(this.sprite.x=this.boundsSprite.right-(this.sprite.width-this.sprite.offsetX)),this.sprite.top<this.boundsSprite.top?this.sprite.y=this.boundsSprite.top+this.sprite.offsetY:this.sprite.bottom>this.boundsSprite.bottom&&(this.sprite.y=this.boundsSprite.bottom-(this.sprite.height-this.sprite.offsetY)))}},c.InputHandler.prototype.constructor=c.InputHandler,c.Gamepad=function(a){this.game=a,this._gamepadIndexMap={},this._rawPads=[],this._active=!1,this.enabled=!0,this._gamepadSupportAvailable=!!navigator.webkitGetGamepads||!!navigator.webkitGamepads||-1!=navigator.userAgent.indexOf("Firefox/")||!!navigator.getGamepads,this._prevRawGamepadTypes=[],this._prevTimestamps=[],this.callbackContext=this,this.onConnectCallback=null,this.onDisconnectCallback=null,this.onDownCallback=null,this.onUpCallback=null,this.onAxisCallback=null,this.onFloatCallback=null,this._ongamepadconnected=null,this._gamepaddisconnected=null,this._gamepads=[new c.SinglePad(a,this),new c.SinglePad(a,this),new c.SinglePad(a,this),new c.SinglePad(a,this)]},c.Gamepad.prototype={addCallbacks:function(a,b){"undefined"!=typeof b&&(this.onConnectCallback="function"==typeof b.onConnect?b.onConnect:this.onConnectCallback,this.onDisconnectCallback="function"==typeof b.onDisconnect?b.onDisconnect:this.onDisconnectCallback,this.onDownCallback="function"==typeof b.onDown?b.onDown:this.onDownCallback,this.onUpCallback="function"==typeof b.onUp?b.onUp:this.onUpCallback,this.onAxisCallback="function"==typeof b.onAxis?b.onAxis:this.onAxisCallback,this.onFloatCallback="function"==typeof b.onFloat?b.onFloat:this.onFloatCallback,this.callbackContext=a)},start:function(){if(!this._active){this._active=!0;var a=this;this._onGamepadConnected=function(b){return a.onGamepadConnected(b)},this._onGamepadDisconnected=function(b){return a.onGamepadDisconnected(b)},window.addEventListener("gamepadconnected",this._onGamepadConnected,!1),window.addEventListener("gamepaddisconnected",this._onGamepadDisconnected,!1)}},onGamepadConnected:function(a){var b=a.gamepad;this._rawPads.push(b),this._gamepads[b.index].connect(b)},onGamepadDisconnected:function(a){var b=a.gamepad;for(var c in this._rawPads)this._rawPads[c].index===b.index&&this._rawPads.splice(c,1);this._gamepads[b.index].disconnect()},update:function(){this._pollGamepads(),this.pad1.pollStatus(),this.pad2.pollStatus(),this.pad3.pollStatus(),this.pad4.pollStatus()},_pollGamepads:function(){if(navigator.getGamepads)var a=navigator.getGamepads();else if(navigator.webkitGetGamepads)var a=navigator.webkitGetGamepads();else if(navigator.webkitGamepads)var a=navigator.webkitGamepads();if(a){this._rawPads=[];for(var b=!1,c=0;c<a.length&&(typeof a[c]!==this._prevRawGamepadTypes[c]&&(b=!0,this._prevRawGamepadTypes[c]=typeof a[c]),a[c]&&this._rawPads.push(a[c]),3!==c);c++);if(b){for(var d,e={rawIndices:{},padIndices:{}},f=0;f<this._gamepads.length;f++)if(d=this._gamepads[f],d.connected)for(var g=0;g<this._rawPads.length;g++)this._rawPads[g].index===d.index&&(e.rawIndices[d.index]=!0,e.padIndices[f]=!0);for(var h=0;h<this._gamepads.length;h++)if(d=this._gamepads[h],!e.padIndices[h]){this._rawPads.length<1&&d.disconnect();for(var i=0;i<this._rawPads.length&&!e.padIndices[h];i++){var j=this._rawPads[i];if(j){if(e.rawIndices[j.index]){d.disconnect();continue}d.connect(j),e.rawIndices[j.index]=!0,e.padIndices[h]=!0}else d.disconnect()}}}}},setDeadZones:function(a){for(var b=0;b<this._gamepads.length;b++)this._gamepads[b].deadZone=a},stop:function(){this._active=!1,window.removeEventListener("gamepadconnected",this._onGamepadConnected),window.removeEventListener("gamepaddisconnected",this._onGamepadDisconnected)},reset:function(){this.update();for(var a=0;a<this._gamepads.length;a++)this._gamepads[a].reset()},justPressed:function(a,b){for(var c=0;c<this._gamepads.length;c++)if(this._gamepads[c].justPressed(a,b)===!0)return!0;
return!1},justReleased:function(a,b){for(var c=0;c<this._gamepads.length;c++)if(this._gamepads[c].justReleased(a,b)===!0)return!0;return!1},isDown:function(a){for(var b=0;b<this._gamepads.length;b++)if(this._gamepads[b].isDown(a)===!0)return!0;return!1},destroy:function(){this.stop();for(var a=0;a<this._gamepads.length;a++)this._gamepads[a].destroy()}},c.Gamepad.prototype.constructor=c.Gamepad,Object.defineProperty(c.Gamepad.prototype,"active",{get:function(){return this._active}}),Object.defineProperty(c.Gamepad.prototype,"supported",{get:function(){return this._gamepadSupportAvailable}}),Object.defineProperty(c.Gamepad.prototype,"padsConnected",{get:function(){return this._rawPads.length}}),Object.defineProperty(c.Gamepad.prototype,"pad1",{get:function(){return this._gamepads[0]}}),Object.defineProperty(c.Gamepad.prototype,"pad2",{get:function(){return this._gamepads[1]}}),Object.defineProperty(c.Gamepad.prototype,"pad3",{get:function(){return this._gamepads[2]}}),Object.defineProperty(c.Gamepad.prototype,"pad4",{get:function(){return this._gamepads[3]}}),c.Gamepad.BUTTON_0=0,c.Gamepad.BUTTON_1=1,c.Gamepad.BUTTON_2=2,c.Gamepad.BUTTON_3=3,c.Gamepad.BUTTON_4=4,c.Gamepad.BUTTON_5=5,c.Gamepad.BUTTON_6=6,c.Gamepad.BUTTON_7=7,c.Gamepad.BUTTON_8=8,c.Gamepad.BUTTON_9=9,c.Gamepad.BUTTON_10=10,c.Gamepad.BUTTON_11=11,c.Gamepad.BUTTON_12=12,c.Gamepad.BUTTON_13=13,c.Gamepad.BUTTON_14=14,c.Gamepad.BUTTON_15=15,c.Gamepad.AXIS_0=0,c.Gamepad.AXIS_1=1,c.Gamepad.AXIS_2=2,c.Gamepad.AXIS_3=3,c.Gamepad.AXIS_4=4,c.Gamepad.AXIS_5=5,c.Gamepad.AXIS_6=6,c.Gamepad.AXIS_7=7,c.Gamepad.AXIS_8=8,c.Gamepad.AXIS_9=9,c.Gamepad.XBOX360_A=0,c.Gamepad.XBOX360_B=1,c.Gamepad.XBOX360_X=2,c.Gamepad.XBOX360_Y=3,c.Gamepad.XBOX360_LEFT_BUMPER=4,c.Gamepad.XBOX360_RIGHT_BUMPER=5,c.Gamepad.XBOX360_LEFT_TRIGGER=6,c.Gamepad.XBOX360_RIGHT_TRIGGER=7,c.Gamepad.XBOX360_BACK=8,c.Gamepad.XBOX360_START=9,c.Gamepad.XBOX360_STICK_LEFT_BUTTON=10,c.Gamepad.XBOX360_STICK_RIGHT_BUTTON=11,c.Gamepad.XBOX360_DPAD_LEFT=14,c.Gamepad.XBOX360_DPAD_RIGHT=15,c.Gamepad.XBOX360_DPAD_UP=12,c.Gamepad.XBOX360_DPAD_DOWN=13,c.Gamepad.XBOX360_STICK_LEFT_X=0,c.Gamepad.XBOX360_STICK_LEFT_Y=1,c.Gamepad.XBOX360_STICK_RIGHT_X=2,c.Gamepad.XBOX360_STICK_RIGHT_Y=3,c.Gamepad.PS3XC_X=0,c.Gamepad.PS3XC_CIRCLE=1,c.Gamepad.PS3XC_SQUARE=2,c.Gamepad.PS3XC_TRIANGLE=3,c.Gamepad.PS3XC_L1=4,c.Gamepad.PS3XC_R1=5,c.Gamepad.PS3XC_L2=6,c.Gamepad.PS3XC_R2=7,c.Gamepad.PS3XC_SELECT=8,c.Gamepad.PS3XC_START=9,c.Gamepad.PS3XC_STICK_LEFT_BUTTON=10,c.Gamepad.PS3XC_STICK_RIGHT_BUTTON=11,c.Gamepad.PS3XC_DPAD_UP=12,c.Gamepad.PS3XC_DPAD_DOWN=13,c.Gamepad.PS3XC_DPAD_LEFT=14,c.Gamepad.PS3XC_DPAD_RIGHT=15,c.Gamepad.PS3XC_STICK_LEFT_X=0,c.Gamepad.PS3XC_STICK_LEFT_Y=1,c.Gamepad.PS3XC_STICK_RIGHT_X=2,c.Gamepad.PS3XC_STICK_RIGHT_Y=3,c.SinglePad=function(a,b){this.game=a,this.index=null,this.connected=!1,this.callbackContext=this,this.onConnectCallback=null,this.onDisconnectCallback=null,this.onDownCallback=null,this.onUpCallback=null,this.onAxisCallback=null,this.onFloatCallback=null,this.deadZone=.26,this._padParent=b,this._rawPad=null,this._prevTimestamp=null,this._buttons=[],this._buttonsLen=0,this._axes=[],this._axesLen=0},c.SinglePad.prototype={addCallbacks:function(a,b){"undefined"!=typeof b&&(this.onConnectCallback="function"==typeof b.onConnect?b.onConnect:this.onConnectCallback,this.onDisconnectCallback="function"==typeof b.onDisconnect?b.onDisconnect:this.onDisconnectCallback,this.onDownCallback="function"==typeof b.onDown?b.onDown:this.onDownCallback,this.onUpCallback="function"==typeof b.onUp?b.onUp:this.onUpCallback,this.onAxisCallback="function"==typeof b.onAxis?b.onAxis:this.onAxisCallback,this.onFloatCallback="function"==typeof b.onFloat?b.onFloat:this.onFloatCallback,this.callbackContext=a)},getButton:function(a){return this._buttons[a]?this._buttons[a]:null},pollStatus:function(){if(this.connected&&this.game.input.enabled&&this.game.input.gamepad.enabled&&(!this._rawPad.timestamp||this._rawPad.timestamp!==this._prevTimestamp)){for(var a=0;a<this._buttonsLen;a++){var b=isNaN(this._rawPad.buttons[a])?this._rawPad.buttons[a].value:this._rawPad.buttons[a];b!==this._buttons[a].value&&(1===b?this.processButtonDown(a,b):0===b?this.processButtonUp(a,b):this.processButtonFloat(a,b))}for(var c=0;c<this._axesLen;c++){var d=this._rawPad.axes[c];d>0&&d>this.deadZone||0>d&&d<-this.deadZone?this.processAxisChange(c,d):this.processAxisChange(c,0)}this._prevTimestamp=this._rawPad.timestamp}},connect:function(a){var b=!this.connected;this.connected=!0,this.index=a.index,this._rawPad=a,this._buttons=[],this._buttonsLen=a.buttons.length,this._axes=[],this._axesLen=a.axes.length;for(var d=0;d<this._axesLen;d++)this._axes[d]=a.axes[d];for(var e in a.buttons)e=parseInt(e,10),this._buttons[e]=new c.DeviceButton(this,e);b&&this._padParent.onConnectCallback&&this._padParent.onConnectCallback.call(this._padParent.callbackContext,this.index),b&&this.onConnectCallback&&this.onConnectCallback.call(this.callbackContext)},disconnect:function(){var a=this.connected,b=this.index;this.connected=!1,this.index=null,this._rawPad=void 0;for(var c=0;c<this._buttonsLen;c++)this._buttons[c].destroy();this._buttons=[],this._buttonsLen=0,this._axes=[],this._axesLen=0,a&&this._padParent.onDisconnectCallback&&this._padParent.onDisconnectCallback.call(this._padParent.callbackContext,b),a&&this.onDisconnectCallback&&this.onDisconnectCallback.call(this.callbackContext)},destroy:function(){this._rawPad=void 0;for(var a=0;a<this._buttonsLen;a++)this._buttons[a].destroy();this._buttons=[],this._buttonsLen=0,this._axes=[],this._axesLen=0,this.onConnectCallback=null,this.onDisconnectCallback=null,this.onDownCallback=null,this.onUpCallback=null,this.onAxisCallback=null,this.onFloatCallback=null},processAxisChange:function(a,b){this._axes[a]!==b&&(this._axes[a]=b,this._padParent.onAxisCallback&&this._padParent.onAxisCallback.call(this._padParent.callbackContext,this,a,b),this.onAxisCallback&&this.onAxisCallback.call(this.callbackContext,this,a,b))},processButtonDown:function(a,b){this._buttons[a]&&this._buttons[a].start(null,b),this._padParent.onDownCallback&&this._padParent.onDownCallback.call(this._padParent.callbackContext,a,b,this.index),this.onDownCallback&&this.onDownCallback.call(this.callbackContext,a,b)},processButtonUp:function(a,b){this._padParent.onUpCallback&&this._padParent.onUpCallback.call(this._padParent.callbackContext,a,b,this.index),this.onUpCallback&&this.onUpCallback.call(this.callbackContext,a,b),this._buttons[a]&&this._buttons[a].stop(null,b)},processButtonFloat:function(a,b){this._padParent.onFloatCallback&&this._padParent.onFloatCallback.call(this._padParent.callbackContext,a,b,this.index),this.onFloatCallback&&this.onFloatCallback.call(this.callbackContext,a,b),this._buttons[a]&&this._buttons[a].padFloat(b)},axis:function(a){return this._axes[a]?this._axes[a]:!1},isDown:function(a){return this._buttons[a]?this._buttons[a].isDown:!1},isUp:function(a){return this._buttons[a]?this._buttons[a].isUp:!1},justReleased:function(a,b){return this._buttons[a]?this._buttons[a].justReleased(b):void 0},justPressed:function(a,b){return this._buttons[a]?this._buttons[a].justPressed(b):void 0},buttonValue:function(a){return this._buttons[a]?this._buttons[a].value:null},reset:function(){for(var a=0;a<this._axes.length;a++)this._axes[a]=0}},c.SinglePad.prototype.constructor=c.SinglePad,c.Key=function(a,b){this.game=a,this._enabled=!0,this.event=null,this.isDown=!1,this.isUp=!0,this.altKey=!1,this.ctrlKey=!1,this.shiftKey=!1,this.timeDown=0,this.duration=0,this.timeUp=-2500,this.repeats=0,this.keyCode=b,this.onDown=new c.Signal,this.onHoldCallback=null,this.onHoldContext=null,this.onUp=new c.Signal,this._justDown=!1,this._justUp=!1},c.Key.prototype={update:function(){this._enabled&&this.isDown&&(this.duration=this.game.time.time-this.timeDown,this.repeats++,this.onHoldCallback&&this.onHoldCallback.call(this.onHoldContext,this))},processKeyDown:function(a){this._enabled&&(this.event=a,this.isDown||(this.altKey=a.altKey,this.ctrlKey=a.ctrlKey,this.shiftKey=a.shiftKey,this.isDown=!0,this.isUp=!1,this.timeDown=this.game.time.time,this.duration=0,this.repeats=0,this._justDown=!0,this.onDown.dispatch(this)))},processKeyUp:function(a){this._enabled&&(this.event=a,this.isUp||(this.isDown=!1,this.isUp=!0,this.timeUp=this.game.time.time,this.duration=this.game.time.time-this.timeDown,this._justUp=!0,this.onUp.dispatch(this)))},reset:function(a){void 0===a&&(a=!0),this.isDown=!1,this.isUp=!0,this.timeUp=this.game.time.time,this.duration=0,this._enabled=!0,this._justDown=!1,this._justUp=!1,a&&(this.onDown.removeAll(),this.onUp.removeAll(),this.onHoldCallback=null,this.onHoldContext=null)},downDuration:function(a){return void 0===a&&(a=50),this.isDown&&this.duration<a},upDuration:function(a){return void 0===a&&(a=50),!this.isDown&&this.game.time.time-this.timeUp<a}},Object.defineProperty(c.Key.prototype,"justDown",{get:function(){var a=this._justDown;return this._justDown=!1,a}}),Object.defineProperty(c.Key.prototype,"justUp",{get:function(){var a=this._justUp;return this._justUp=!1,a}}),Object.defineProperty(c.Key.prototype,"enabled",{get:function(){return this._enabled},set:function(a){a=!!a,a!==this._enabled&&(a||this.reset(!1),this._enabled=a)}}),c.Key.prototype.constructor=c.Key,c.Keyboard=function(a){this.game=a,this.enabled=!0,this.event=null,this.pressEvent=null,this.callbackContext=this,this.onDownCallback=null,this.onPressCallback=null,this.onUpCallback=null,this._keys=[],this._capture=[],this._onKeyDown=null,this._onKeyPress=null,this._onKeyUp=null,this._i=0,this._k=0},c.Keyboard.prototype={addCallbacks:function(a,b,c,d){this.callbackContext=a,void 0!==b&&null!==b&&(this.onDownCallback=b),void 0!==c&&null!==c&&(this.onUpCallback=c),void 0!==d&&null!==d&&(this.onPressCallback=d)},addKey:function(a){return this._keys[a]||(this._keys[a]=new c.Key(this.game,a),this.addKeyCapture(a)),this._keys[a]},addKeys:function(a){var b={};for(var c in a)b[c]=this.addKey(a[c]);return b},removeKey:function(a){this._keys[a]&&(this._keys[a]=null,this.removeKeyCapture(a))},createCursorKeys:function(){return this.addKeys({up:c.KeyCode.UP,down:c.KeyCode.DOWN,left:c.KeyCode.LEFT,right:c.KeyCode.RIGHT})},start:function(){if(!this.game.device.cocoonJS&&null===this._onKeyDown){var a=this;this._onKeyDown=function(b){return a.processKeyDown(b)},this._onKeyUp=function(b){return a.processKeyUp(b)},this._onKeyPress=function(b){return a.processKeyPress(b)},window.addEventListener("keydown",this._onKeyDown,!1),window.addEventListener("keyup",this._onKeyUp,!1),window.addEventListener("keypress",this._onKeyPress,!1)}},stop:function(){window.removeEventListener("keydown",this._onKeyDown),window.removeEventListener("keyup",this._onKeyUp),window.removeEventListener("keypress",this._onKeyPress),this._onKeyDown=null,this._onKeyUp=null,this._onKeyPress=null},destroy:function(){this.stop(),this.clearCaptures(),this._keys.length=0,this._i=0},addKeyCapture:function(a){if("object"==typeof a)for(var b in a)this._capture[a[b]]=!0;else this._capture[a]=!0},removeKeyCapture:function(a){delete this._capture[a]},clearCaptures:function(){this._capture={}},update:function(){for(this._i=this._keys.length;this._i--;)this._keys[this._i]&&this._keys[this._i].update()},processKeyDown:function(a){this.event=a,this.game.input.enabled&&this.enabled&&(this._capture[a.keyCode]&&a.preventDefault(),this._keys[a.keyCode]||(this._keys[a.keyCode]=new c.Key(this.game,a.keyCode)),this._keys[a.keyCode].processKeyDown(a),this._k=a.keyCode,this.onDownCallback&&this.onDownCallback.call(this.callbackContext,a))},processKeyPress:function(a){this.pressEvent=a,this.game.input.enabled&&this.enabled&&this.onPressCallback&&this.onPressCallback.call(this.callbackContext,String.fromCharCode(a.charCode),a)},processKeyUp:function(a){this.event=a,this.game.input.enabled&&this.enabled&&(this._capture[a.keyCode]&&a.preventDefault(),this._keys[a.keyCode]||(this._keys[a.keyCode]=new c.Key(this.game,a.keyCode)),this._keys[a.keyCode].processKeyUp(a),this.onUpCallback&&this.onUpCallback.call(this.callbackContext,a))},reset:function(a){void 0===a&&(a=!0),this.event=null;for(var b=this._keys.length;b--;)this._keys[b]&&this._keys[b].reset(a)},downDuration:function(a,b){return this._keys[a]?this._keys[a].downDuration(b):null},upDuration:function(a,b){return this._keys[a]?this._keys[a].upDuration(b):null},isDown:function(a){return this._keys[a]?this._keys[a].isDown:null}},Object.defineProperty(c.Keyboard.prototype,"lastChar",{get:function(){return 32===this.event.charCode?"":String.fromCharCode(this.pressEvent.charCode)}}),Object.defineProperty(c.Keyboard.prototype,"lastKey",{get:function(){return this._keys[this._k]}}),c.Keyboard.prototype.constructor=c.Keyboard,c.KeyCode={A:"A".charCodeAt(0),B:"B".charCodeAt(0),C:"C".charCodeAt(0),D:"D".charCodeAt(0),E:"E".charCodeAt(0),F:"F".charCodeAt(0),G:"G".charCodeAt(0),H:"H".charCodeAt(0),I:"I".charCodeAt(0),J:"J".charCodeAt(0),K:"K".charCodeAt(0),L:"L".charCodeAt(0),M:"M".charCodeAt(0),N:"N".charCodeAt(0),O:"O".charCodeAt(0),P:"P".charCodeAt(0),Q:"Q".charCodeAt(0),R:"R".charCodeAt(0),S:"S".charCodeAt(0),T:"T".charCodeAt(0),U:"U".charCodeAt(0),V:"V".charCodeAt(0),W:"W".charCodeAt(0),X:"X".charCodeAt(0),Y:"Y".charCodeAt(0),Z:"Z".charCodeAt(0),ZERO:"0".charCodeAt(0),ONE:"1".charCodeAt(0),TWO:"2".charCodeAt(0),THREE:"3".charCodeAt(0),FOUR:"4".charCodeAt(0),FIVE:"5".charCodeAt(0),SIX:"6".charCodeAt(0),SEVEN:"7".charCodeAt(0),EIGHT:"8".charCodeAt(0),NINE:"9".charCodeAt(0),NUMPAD_0:96,NUMPAD_1:97,NUMPAD_2:98,NUMPAD_3:99,NUMPAD_4:100,NUMPAD_5:101,NUMPAD_6:102,NUMPAD_7:103,NUMPAD_8:104,NUMPAD_9:105,NUMPAD_MULTIPLY:106,NUMPAD_ADD:107,NUMPAD_ENTER:108,NUMPAD_SUBTRACT:109,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,F13:124,F14:125,F15:126,COLON:186,EQUALS:187,COMMA:188,UNDERSCORE:189,PERIOD:190,QUESTION_MARK:191,TILDE:192,OPEN_BRACKET:219,BACKWARD_SLASH:220,CLOSED_BRACKET:221,QUOTES:222,BACKSPACE:8,TAB:9,CLEAR:12,ENTER:13,SHIFT:16,CONTROL:17,ALT:18,CAPS_LOCK:20,ESC:27,SPACEBAR:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40,PLUS:43,MINUS:44,INSERT:45,DELETE:46,HELP:47,NUM_LOCK:144};for(var e in c.KeyCode)c.KeyCode.hasOwnProperty(e)&&!e.match(/[a-z]/)&&(c.Keyboard[e]=c.KeyCode[e]);c.Component=function(){},c.Component.Angle=function(){},c.Component.Angle.prototype={angle:{get:function(){return c.Math.wrapAngle(c.Math.radToDeg(this.rotation))},set:function(a){this.rotation=c.Math.degToRad(c.Math.wrapAngle(a))}}},c.Component.Animation=function(){},c.Component.Animation.prototype={play:function(a,b,c,d){return this.animations?this.animations.play(a,b,c,d):void 0}},c.Component.AutoCull=function(){},c.Component.AutoCull.prototype={autoCull:!1,inCamera:{get:function(){return this.autoCull||this.checkWorldBounds||(this._bounds.copyFrom(this.getBounds()),this._bounds.x+=this.game.camera.view.x,this._bounds.y+=this.game.camera.view.y),this.game.world.camera.view.intersects(this._bounds)}}},c.Component.Bounds=function(){},c.Component.Bounds.prototype={offsetX:{get:function(){return this.anchor.x*this.width}},offsetY:{get:function(){return this.anchor.y*this.height}},left:{get:function(){return this.x-this.offsetX}},right:{get:function(){return this.x+this.width-this.offsetX}},top:{get:function(){return this.y-this.offsetY}},bottom:{get:function(){return this.y+this.height-this.offsetY}}},c.Component.BringToTop=function(){},c.Component.BringToTop.prototype.bringToTop=function(){return this.parent&&this.parent.bringToTop(this),this},c.Component.BringToTop.prototype.sendToBack=function(){return this.parent&&this.parent.sendToBack(this),this},c.Component.BringToTop.prototype.moveUp=function(){return this.parent&&this.parent.moveUp(this),this},c.Component.BringToTop.prototype.moveDown=function(){return this.parent&&this.parent.moveDown(this),this},c.Component.Core=function(){},c.Component.Core.install=function(a){c.Utils.mixinPrototype(this,c.Component.Core.prototype),this.components={};for(var b=0;b<a.length;b++){var d=a[b],e=!1;"Destroy"===d&&(e=!0),c.Utils.mixinPrototype(this,c.Component[d].prototype,e),this.components[d]=!0}},c.Component.Core.init=function(a,b,d,e,f){this.game=a,this.key=e,this.position.set(b,d),this.world=new c.Point(b,d),this.previousPosition=new c.Point(b,d),this.events=new c.Events(this),this._bounds=new c.Rectangle,this.components.PhysicsBody&&(this.body=this.body),this.components.Animation&&(this.animations=new c.AnimationManager(this)),this.components.LoadTexture&&null!==e&&this.loadTexture(e,f),this.components.FixedToCamera&&(this.cameraOffset=new c.Point(b,d))},c.Component.Core.preUpdate=function(){if(this.pendingDestroy)return void this.destroy();if(this.previousPosition.set(this.world.x,this.world.y),this.previousRotation=this.rotation,!this.exists||!this.parent.exists)return this.renderOrderID=-1,!1;this.world.setTo(this.game.camera.x+this.worldTransform.tx,this.game.camera.y+this.worldTransform.ty),this.visible&&(this.renderOrderID=this.game.stage.currentRenderOrderID++),this.texture&&(this.texture.requiresReTint=!1),this.animations&&this.animations.update(),this.body&&this.body.preUpdate();for(var a=0;a<this.children.length;a++)this.children[a].preUpdate();return!0},c.Component.Core.prototype={game:null,name:"",components:{},z:0,events:void 0,animations:void 0,key:"",world:null,debug:!1,previousPosition:null,previousRotation:0,renderOrderID:0,fresh:!0,pendingDestroy:!1,_bounds:null,_exists:!0,exists:{get:function(){return this._exists},set:function(a){a?(this._exists=!0,this.body&&this.body.type===c.Physics.P2JS&&this.body.addToWorld(),this.visible=!0):(this._exists=!1,this.body&&this.body.type===c.Physics.P2JS&&this.body.removeFromWorld(),this.visible=!1)}},update:function(){},postUpdate:function(){this.customRender&&this.key.render(),this.components.PhysicsBody&&c.Component.PhysicsBody.postUpdate.call(this),this.components.FixedToCamera&&c.Component.FixedToCamera.postUpdate.call(this);for(var a=0;a<this.children.length;a++)this.children[a].postUpdate()}},c.Component.Crop=function(){},c.Component.Crop.prototype={cropRect:null,_crop:null,crop:function(a,b){void 0===b&&(b=!1),a?(b&&null!==this.cropRect?this.cropRect.setTo(a.x,a.y,a.width,a.height):b&&null===this.cropRect?this.cropRect=new c.Rectangle(a.x,a.y,a.width,a.height):this.cropRect=a,this.updateCrop()):(this._crop=null,this.cropRect=null,this.resetFrame())},updateCrop:function(){if(this.cropRect){this._crop=c.Rectangle.clone(this.cropRect,this._crop),this._crop.x+=this._frame.x,this._crop.y+=this._frame.y;var a=Math.max(this._frame.x,this._crop.x),b=Math.max(this._frame.y,this._crop.y),d=Math.min(this._frame.right,this._crop.right)-a,e=Math.min(this._frame.bottom,this._crop.bottom)-b;this.texture.crop.x=a,this.texture.crop.y=b,this.texture.crop.width=d,this.texture.crop.height=e,this.texture.frame.width=Math.min(d,this.cropRect.width),this.texture.frame.height=Math.min(e,this.cropRect.height),this.texture.width=this.texture.frame.width,this.texture.height=this.texture.frame.height,this.texture._updateUvs()}}},c.Component.Delta=function(){},c.Component.Delta.prototype={deltaX:{get:function(){return this.world.x-this.previousPosition.x}},deltaY:{get:function(){return this.world.y-this.previousPosition.y}},deltaZ:{get:function(){return this.rotation-this.previousRotation}}},c.Component.Destroy=function(){},c.Component.Destroy.prototype={destroyPhase:!1,destroy:function(a,b){if(null!==this.game&&!this.destroyPhase){void 0===a&&(a=!0),void 0===b&&(b=!1),this.destroyPhase=!0,this.events&&this.events.onDestroy$dispatch(this),this.parent&&(this.parent instanceof c.Group?this.parent.remove(this):this.parent.removeChild(this)),this.input&&this.input.destroy(),this.animations&&this.animations.destroy(),this.body&&this.body.destroy(),this.events&&this.events.destroy(),this.game.tweens.removeFrom(this);var d=this.children.length;if(a)for(;d--;)this.children[d].destroy(a);else for(;d--;)this.removeChild(this.children[d]);this._crop&&(this._crop=null),this._frame&&(this._frame=null),c.Video&&this.key instanceof c.Video&&this.key.onChangeSource.remove(this.resizeFrame,this),c.BitmapText&&this._glyphs&&(this._glyphs=[]),this.alive=!1,this.exists=!1,this.visible=!1,this.filters=null,this.mask=null,this.game=null,this.renderable=!1,this.transformCallback&&(this.transformCallback=null,this.transformCallbackContext=null),this.hitArea=null,this.parent=null,this.stage=null,this.worldTransform=null,this.filterArea=null,this._bounds=null,this._currentBounds=null,this._mask=null,this._destroyCachedSprite(),b&&this.texture.destroy(!0),this.destroyPhase=!1,this.pendingDestroy=!1}}},c.Events=function(a){this.parent=a},c.Events.prototype={destroy:function(){this._parent=null,this._onDestroy&&this._onDestroy.dispose(),this._onAddedToGroup&&this._onAddedToGroup.dispose(),this._onRemovedFromGroup&&this._onRemovedFromGroup.dispose(),this._onRemovedFromWorld&&this._onRemovedFromWorld.dispose(),this._onKilled&&this._onKilled.dispose(),this._onRevived&&this._onRevived.dispose(),this._onEnterBounds&&this._onEnterBounds.dispose(),this._onOutOfBounds&&this._onOutOfBounds.dispose(),this._onInputOver&&this._onInputOver.dispose(),this._onInputOut&&this._onInputOut.dispose(),this._onInputDown&&this._onInputDown.dispose(),this._onInputUp&&this._onInputUp.dispose(),this._onDragStart&&this._onDragStart.dispose(),this._onDragUpdate&&this._onDragUpdate.dispose(),this._onDragStop&&this._onDragStop.dispose(),this._onAnimationStart&&this._onAnimationStart.dispose(),this._onAnimationComplete&&this._onAnimationComplete.dispose(),this._onAnimationLoop&&this._onAnimationLoop.dispose()},onAddedToGroup:null,onRemovedFromGroup:null,onRemovedFromWorld:null,onDestroy:null,onKilled:null,onRevived:null,onOutOfBounds:null,onEnterBounds:null,onInputOver:null,onInputOut:null,onInputDown:null,onInputUp:null,onDragStart:null,onDragUpdate:null,onDragStop:null,onAnimationStart:null,onAnimationComplete:null,onAnimationLoop:null},c.Events.prototype.constructor=c.Events;for(var f in c.Events.prototype)c.Events.prototype.hasOwnProperty(f)&&0===f.indexOf("on")&&null===c.Events.prototype[f]&&!function(a,b){"use strict";Object.defineProperty(c.Events.prototype,a,{get:function(){return this[b]||(this[b]=new c.Signal)}}),c.Events.prototype[a+"$dispatch"]=function(){return this[b]?this[b].dispatch.apply(this[b],arguments):null}}(f,"_"+f);c.Component.FixedToCamera=function(){},c.Component.FixedToCamera.postUpdate=function(){this.fixedToCamera&&(this.position.x=(this.game.camera.view.x+this.cameraOffset.x)/this.game.camera.scale.x,this.position.y=(this.game.camera.view.y+this.cameraOffset.y)/this.game.camera.scale.y)},c.Component.FixedToCamera.prototype={_fixedToCamera:!1,fixedToCamera:{get:function(){return this._fixedToCamera},set:function(a){a?(this._fixedToCamera=!0,this.cameraOffset.set(this.x,this.y)):this._fixedToCamera=!1}},cameraOffset:new c.Point},c.Component.Health=function(){},c.Component.Health.prototype={health:1,maxHealth:100,damage:function(a){return this.alive&&(this.health-=a,this.health<=0&&this.kill()),this},setHealth:function(a){return this.health=a,this.health>this.maxHealth&&(this.health=this.maxHealth),this},heal:function(a){return this.alive&&(this.health+=a,this.health>this.maxHealth&&(this.health=this.maxHealth)),this}},c.Component.InCamera=function(){},c.Component.InCamera.prototype={inCamera:{get:function(){return this.game.world.camera.view.intersects(this._bounds)}}},c.Component.InputEnabled=function(){},c.Component.InputEnabled.prototype={input:null,inputEnabled:{get:function(){return this.input&&this.input.enabled},set:function(a){a?null===this.input?(this.input=new c.InputHandler(this),this.input.start()):this.input&&!this.input.enabled&&this.input.start():this.input&&this.input.enabled&&this.input.stop()}}},c.Component.InWorld=function(){},c.Component.InWorld.preUpdate=function(){if(this.autoCull||this.checkWorldBounds){if(this._bounds.copyFrom(this.getBounds()),this._bounds.x+=this.game.camera.view.x,this._bounds.y+=this.game.camera.view.y,this.autoCull)if(this.game.world.camera.view.intersects(this._bounds))this.renderable=!0,this.game.world.camera.totalInView++;else if(this.renderable=!1,this.outOfCameraBoundsKill)return this.kill(),!1;if(this.checkWorldBounds)if(this._outOfBoundsFired&&this.game.world.bounds.intersects(this._bounds))this._outOfBoundsFired=!1,this.events.onEnterBounds$dispatch(this);else if(!this._outOfBoundsFired&&!this.game.world.bounds.intersects(this._bounds)&&(this._outOfBoundsFired=!0,this.events.onOutOfBounds$dispatch(this),this.outOfBoundsKill))return this.kill(),!1}return!0},c.Component.InWorld.prototype={checkWorldBounds:!1,outOfBoundsKill:!1,outOfCameraBoundsKill:!1,_outOfBoundsFired:!1,inWorld:{get:function(){return this.game.world.bounds.intersects(this.getBounds())}}},c.Component.LifeSpan=function(){},c.Component.LifeSpan.preUpdate=function(){return this.lifespan>0&&(this.lifespan-=this.game.time.physicsElapsedMS,this.lifespan<=0)?(this.kill(),!1):!0},c.Component.LifeSpan.prototype={alive:!0,lifespan:0,revive:function(a){return void 0===a&&(a=100),this.alive=!0,this.exists=!0,this.visible=!0,"function"==typeof this.setHealth&&this.setHealth(a),this.events&&this.events.onRevived$dispatch(this),this},kill:function(){return this.alive=!1,this.exists=!1,this.visible=!1,this.events&&this.events.onKilled$dispatch(this),this}},c.Component.LoadTexture=function(){},c.Component.LoadTexture.prototype={customRender:!1,_frame:null,loadTexture:function(a,b,d){a===c.PENDING_ATLAS?(a=b,b=0):b=b||0,(d||void 0===d)&&this.animations&&this.animations.stop(),this.key=a,this.customRender=!1;var e=this.game.cache,f=!0,g=!this.texture.baseTexture.scaleMode;if(c.RenderTexture&&a instanceof c.RenderTexture)this.key=a.key,this.setTexture(a);else if(c.BitmapData&&a instanceof c.BitmapData)this.customRender=!0,this.setTexture(a.texture),f=e.hasFrameData(a.key,c.Cache.BITMAPDATA)?!this.animations.loadFrameData(e.getFrameData(a.key,c.Cache.BITMAPDATA),b):!this.animations.loadFrameData(a.frameData,0);else if(c.Video&&a instanceof c.Video){this.customRender=!0;var h=a.texture.valid;this.setTexture(a.texture),this.setFrame(a.texture.frame.clone()),a.onChangeSource.add(this.resizeFrame,this),this.texture.valid=h}else if(c.Tilemap&&a instanceof c.TilemapLayer)this.setTexture(PIXI.Texture.fromCanvas(a.canvas));else if(a instanceof PIXI.Texture)this.setTexture(a);else{var i=e.getImage(a,!0);this.key=i.key,this.setTexture(new PIXI.Texture(i.base)),"__default"===a?this.texture.baseTexture.skipRender=!0:this.texture.baseTexture.skipRender=!1,f=!this.animations.loadFrameData(i.frameData,b)}f&&(this._frame=c.Rectangle.clone(this.texture.frame)),g||(this.texture.baseTexture.scaleMode=1)},setFrame:function(a){this._frame=a,this.texture.frame.x=a.x,this.texture.frame.y=a.y,this.texture.frame.width=a.width,this.texture.frame.height=a.height,this.texture.crop.x=a.x,this.texture.crop.y=a.y,this.texture.crop.width=a.width,this.texture.crop.height=a.height,a.trimmed?(this.texture.trim?(this.texture.trim.x=a.spriteSourceSizeX,this.texture.trim.y=a.spriteSourceSizeY,this.texture.trim.width=a.sourceSizeW,this.texture.trim.height=a.sourceSizeH):this.texture.trim={x:a.spriteSourceSizeX,y:a.spriteSourceSizeY,width:a.sourceSizeW,height:a.sourceSizeH},this.texture.width=a.sourceSizeW,this.texture.height=a.sourceSizeH,this.texture.frame.width=a.sourceSizeW,this.texture.frame.height=a.sourceSizeH):!a.trimmed&&this.texture.trim&&(this.texture.trim=null),this.cropRect&&this.updateCrop(),this.texture.requiresReTint=!0,this.texture._updateUvs(),this.tilingTexture&&(this.refreshTexture=!0)},resizeFrame:function(a,b,c){this.texture.frame.resize(b,c),this.texture.setFrame(this.texture.frame)},resetFrame:function(){this._frame&&this.setFrame(this._frame)},frame:{get:function(){return this.animations.frame},set:function(a){this.animations.frame=a}},frameName:{get:function(){return this.animations.frameName},set:function(a){this.animations.frameName=a}}},c.Component.Overlap=function(){},c.Component.Overlap.prototype={overlap:function(a){return c.Rectangle.intersects(this.getBounds(),a.getBounds())}},c.Component.PhysicsBody=function(){},c.Component.PhysicsBody.preUpdate=function(){return this.fresh&&this.exists?(this.world.setTo(this.parent.position.x+this.position.x,this.parent.position.y+this.position.y),this.worldTransform.tx=this.world.x,this.worldTransform.ty=this.world.y,this.previousPosition.set(this.world.x,this.world.y),this.previousRotation=this.rotation,this.body&&this.body.preUpdate(),this.fresh=!1,!1):(this.previousPosition.set(this.world.x,this.world.y),this.previousRotation=this.rotation,this._exists&&this.parent.exists?!0:(this.renderOrderID=-1,!1))},c.Component.PhysicsBody.postUpdate=function(){this.exists&&this.body&&this.body.postUpdate()},c.Component.PhysicsBody.prototype={body:null,x:{get:function(){return this.position.x},set:function(a){this.position.x=a,this.body&&!this.body.dirty&&(this.body._reset=!0)}},y:{get:function(){return this.position.y},set:function(a){this.position.y=a,this.body&&!this.body.dirty&&(this.body._reset=!0)}}},c.Component.Reset=function(){},c.Component.Reset.prototype.reset=function(a,b,c){return void 0===c&&(c=1),this.world.set(a,b),this.position.set(a,b),this.fresh=!0,this.exists=!0,this.visible=!0,this.renderable=!0,this.components.InWorld&&(this._outOfBoundsFired=!1),this.components.LifeSpan&&(this.alive=!0,this.health=c),this.components.PhysicsBody&&this.body&&this.body.reset(a,b,!1,!1),this},c.Component.ScaleMinMax=function(){},c.Component.ScaleMinMax.prototype={transformCallback:null,transformCallbackContext:this,scaleMin:null,scaleMax:null,checkTransform:function(a){this.scaleMin&&(a.a<this.scaleMin.x&&(a.a=this.scaleMin.x),a.d<this.scaleMin.y&&(a.d=this.scaleMin.y)),this.scaleMax&&(a.a>this.scaleMax.x&&(a.a=this.scaleMax.x),a.d>this.scaleMax.y&&(a.d=this.scaleMax.y))},setScaleMinMax:function(a,b,d,e){void 0===b?b=d=e=a:void 0===d&&(d=e=b,b=a),null===a?this.scaleMin=null:this.scaleMin?this.scaleMin.set(a,b):this.scaleMin=new c.Point(a,b),null===d?this.scaleMax=null:this.scaleMax?this.scaleMax.set(d,e):this.scaleMax=new c.Point(d,e),null===this.scaleMin?this.transformCallback=null:(this.transformCallback=this.checkTransform,this.transformCallbackContext=this)}},c.Component.Smoothed=function(){},c.Component.Smoothed.prototype={smoothed:{get:function(){return!this.texture.baseTexture.scaleMode},set:function(a){a?this.texture&&(this.texture.baseTexture.scaleMode=0):this.texture&&(this.texture.baseTexture.scaleMode=1)}}},c.GameObjectFactory=function(a){this.game=a,this.world=this.game.world},c.GameObjectFactory.prototype={existing:function(a){return this.world.add(a)},image:function(a,b,d,e,f){return void 0===f&&(f=this.world),f.add(new c.Image(this.game,a,b,d,e))},sprite:function(a,b,c,d,e){return void 0===e&&(e=this.world),e.create(a,b,c,d)},creature:function(a,b,d,e,f){void 0===f&&(f=this.world);var g=new c.Creature(this.game,a,b,d,e);return f.add(g),g},tween:function(a){return this.game.tweens.create(a)},group:function(a,b,d,e,f){return new c.Group(this.game,a,b,d,e,f)},physicsGroup:function(a,b,d,e){return new c.Group(this.game,b,d,e,!0,a)},spriteBatch:function(a,b,d){return void 0===a&&(a=null),void 0===b&&(b="group"),void 0===d&&(d=!1),new c.SpriteBatch(this.game,a,b,d)},audio:function(a,b,c,d){return this.game.sound.add(a,b,c,d)},sound:function(a,b,c,d){return this.game.sound.add(a,b,c,d)},audioSprite:function(a){return this.game.sound.addSprite(a)},tileSprite:function(a,b,d,e,f,g,h){return void 0===h&&(h=this.world),h.add(new c.TileSprite(this.game,a,b,d,e,f,g))},rope:function(a,b,d,e,f,g){return void 0===g&&(g=this.world),g.add(new c.Rope(this.game,a,b,d,e,f))},text:function(a,b,d,e,f){return void 0===f&&(f=this.world),f.add(new c.Text(this.game,a,b,d,e))},button:function(a,b,d,e,f,g,h,i,j,k){return void 0===k&&(k=this.world),k.add(new c.Button(this.game,a,b,d,e,f,g,h,i,j));
},graphics:function(a,b,d){return void 0===d&&(d=this.world),d.add(new c.Graphics(this.game,a,b))},emitter:function(a,b,d){return this.game.particles.add(new c.Particles.Arcade.Emitter(this.game,a,b,d))},retroFont:function(a,b,d,e,f,g,h,i,j){return new c.RetroFont(this.game,a,b,d,e,f,g,h,i,j)},bitmapText:function(a,b,d,e,f,g){return void 0===g&&(g=this.world),g.add(new c.BitmapText(this.game,a,b,d,e,f))},tilemap:function(a,b,d,e,f){return new c.Tilemap(this.game,a,b,d,e,f)},renderTexture:function(a,b,d,e){(void 0===d||""===d)&&(d=this.game.rnd.uuid()),void 0===e&&(e=!1);var f=new c.RenderTexture(this.game,a,b,d);return e&&this.game.cache.addRenderTexture(d,f),f},video:function(a,b){return new c.Video(this.game,a,b)},bitmapData:function(a,b,d,e){void 0===e&&(e=!1),(void 0===d||""===d)&&(d=this.game.rnd.uuid());var f=new c.BitmapData(this.game,d,a,b);return e&&this.game.cache.addBitmapData(d,f),f},filter:function(a){var b=Array.prototype.slice.call(arguments,1),a=new c.Filter[a](this.game);return a.init.apply(a,b),a},plugin:function(a){return this.game.plugins.add(a)}},c.GameObjectFactory.prototype.constructor=c.GameObjectFactory,c.GameObjectCreator=function(a){this.game=a,this.world=this.game.world},c.GameObjectCreator.prototype={image:function(a,b,d,e){return new c.Image(this.game,a,b,d,e)},sprite:function(a,b,d,e){return new c.Sprite(this.game,a,b,d,e)},tween:function(a){return new c.Tween(a,this.game,this.game.tweens)},group:function(a,b,d,e,f){return new c.Group(this.game,a,b,d,e,f)},spriteBatch:function(a,b,d){return void 0===b&&(b="group"),void 0===d&&(d=!1),new c.SpriteBatch(this.game,a,b,d)},audio:function(a,b,c,d){return this.game.sound.add(a,b,c,d)},audioSprite:function(a){return this.game.sound.addSprite(a)},sound:function(a,b,c,d){return this.game.sound.add(a,b,c,d)},tileSprite:function(a,b,d,e,f,g){return new c.TileSprite(this.game,a,b,d,e,f,g)},rope:function(a,b,d,e,f){return new c.Rope(this.game,a,b,d,e,f)},text:function(a,b,d,e){return new c.Text(this.game,a,b,d,e)},button:function(a,b,d,e,f,g,h,i,j){return new c.Button(this.game,a,b,d,e,f,g,h,i,j)},graphics:function(a,b){return new c.Graphics(this.game,a,b)},emitter:function(a,b,d){return new c.Particles.Arcade.Emitter(this.game,a,b,d)},retroFont:function(a,b,d,e,f,g,h,i,j){return new c.RetroFont(this.game,a,b,d,e,f,g,h,i,j)},bitmapText:function(a,b,d,e,f,g){return new c.BitmapText(this.game,a,b,d,e,f,g)},tilemap:function(a,b,d,e,f){return new c.Tilemap(this.game,a,b,d,e,f)},renderTexture:function(a,b,d,e){(void 0===d||""===d)&&(d=this.game.rnd.uuid()),void 0===e&&(e=!1);var f=new c.RenderTexture(this.game,a,b,d);return e&&this.game.cache.addRenderTexture(d,f),f},bitmapData:function(a,b,d,e){void 0===e&&(e=!1),(void 0===d||""===d)&&(d=this.game.rnd.uuid());var f=new c.BitmapData(this.game,d,a,b);return e&&this.game.cache.addBitmapData(d,f),f},filter:function(a){var b=Array.prototype.slice.call(arguments,1),a=new c.Filter[a](this.game);return a.init.apply(a,b),a}},c.GameObjectCreator.prototype.constructor=c.GameObjectCreator,c.Sprite=function(a,b,d,e,f){b=b||0,d=d||0,e=e||null,f=f||null,this.type=c.SPRITE,this.physicsType=c.SPRITE,PIXI.Sprite.call(this,PIXI.TextureCache.__default),c.Component.Core.init.call(this,a,b,d,e,f)},c.Sprite.prototype=Object.create(PIXI.Sprite.prototype),c.Sprite.prototype.constructor=c.Sprite,c.Component.Core.install.call(c.Sprite.prototype,["Angle","Animation","AutoCull","Bounds","BringToTop","Crop","Delta","Destroy","FixedToCamera","Health","InCamera","InputEnabled","InWorld","LifeSpan","LoadTexture","Overlap","PhysicsBody","Reset","ScaleMinMax","Smoothed"]),c.Sprite.prototype.preUpdatePhysics=c.Component.PhysicsBody.preUpdate,c.Sprite.prototype.preUpdateLifeSpan=c.Component.LifeSpan.preUpdate,c.Sprite.prototype.preUpdateInWorld=c.Component.InWorld.preUpdate,c.Sprite.prototype.preUpdateCore=c.Component.Core.preUpdate,c.Sprite.prototype.preUpdate=function(){return this.preUpdatePhysics()&&this.preUpdateLifeSpan()&&this.preUpdateInWorld()?this.preUpdateCore():!1},c.Image=function(a,b,d,e,f){b=b||0,d=d||0,e=e||null,f=f||null,this.type=c.IMAGE,PIXI.Sprite.call(this,PIXI.TextureCache.__default),c.Component.Core.init.call(this,a,b,d,e,f)},c.Image.prototype=Object.create(PIXI.Sprite.prototype),c.Image.prototype.constructor=c.Image,c.Component.Core.install.call(c.Image.prototype,["Angle","Animation","AutoCull","Bounds","BringToTop","Crop","Destroy","FixedToCamera","InputEnabled","LifeSpan","LoadTexture","Overlap","Reset","Smoothed"]),c.Image.prototype.preUpdateInWorld=c.Component.InWorld.preUpdate,c.Image.prototype.preUpdateCore=c.Component.Core.preUpdate,c.Image.prototype.preUpdate=function(){return this.preUpdateInWorld()?this.preUpdateCore():!1},c.Button=function(a,b,d,e,f,g,h,i,j,k){b=b||0,d=d||0,e=e||null,f=f||null,g=g||this,c.Image.call(this,a,b,d,e,i),this.type=c.BUTTON,this.physicsType=c.SPRITE,this._onOverFrame=null,this._onOutFrame=null,this._onDownFrame=null,this._onUpFrame=null,this.onOverSound=null,this.onOutSound=null,this.onDownSound=null,this.onUpSound=null,this.onOverSoundMarker="",this.onOutSoundMarker="",this.onDownSoundMarker="",this.onUpSoundMarker="",this.onInputOver=new c.Signal,this.onInputOut=new c.Signal,this.onInputDown=new c.Signal,this.onInputUp=new c.Signal,this.onOverMouseOnly=!0,this.justReleasedPreventsOver=c.PointerMode.TOUCH,this.freezeFrames=!1,this.forceOut=!1,this.inputEnabled=!0,this.input.start(0,!0),this.input.useHandCursor=!0,this.setFrames(h,i,j,k),null!==f&&this.onInputUp.add(f,g),this.events.onInputOver.add(this.onInputOverHandler,this),this.events.onInputOut.add(this.onInputOutHandler,this),this.events.onInputDown.add(this.onInputDownHandler,this),this.events.onInputUp.add(this.onInputUpHandler,this),this.events.onRemovedFromWorld.add(this.removedFromWorld,this)},c.Button.prototype=Object.create(c.Image.prototype),c.Button.prototype.constructor=c.Button;var g="Over",h="Out",i="Down",j="Up";c.Button.prototype.clearFrames=function(){this.setFrames(null,null,null,null)},c.Button.prototype.removedFromWorld=function(){this.inputEnabled=!1},c.Button.prototype.setStateFrame=function(a,b,c){var d="_on"+a+"Frame";null!==b?(this[d]=b,c&&this.changeStateFrame(a)):this[d]=null},c.Button.prototype.changeStateFrame=function(a){if(this.freezeFrames)return!1;var b="_on"+a+"Frame",c=this[b];return"string"==typeof c?(this.frameName=c,!0):"number"==typeof c?(this.frame=c,!0):!1},c.Button.prototype.setFrames=function(a,b,c,d){this.setStateFrame(g,a,this.input.pointerOver()),this.setStateFrame(h,b,!this.input.pointerOver()),this.setStateFrame(i,c,this.input.pointerDown()),this.setStateFrame(j,d,this.input.pointerUp())},c.Button.prototype.setStateSound=function(a,b,d){var e="on"+a+"Sound",f="on"+a+"SoundMarker";b instanceof c.Sound||b instanceof c.AudioSprite?(this[e]=b,this[f]="string"==typeof d?d:""):(this[e]=null,this[f]="")},c.Button.prototype.playStateSound=function(a){var b="on"+a+"Sound",c=this[b];if(c){var d="on"+a+"SoundMarker",e=this[d];return c.play(e),!0}return!1},c.Button.prototype.setSounds=function(a,b,c,d,e,f,k,l){this.setStateSound(g,a,b),this.setStateSound(h,e,f),this.setStateSound(i,c,d),this.setStateSound(j,k,l)},c.Button.prototype.setOverSound=function(a,b){this.setStateSound(g,a,b)},c.Button.prototype.setOutSound=function(a,b){this.setStateSound(h,a,b)},c.Button.prototype.setDownSound=function(a,b){this.setStateSound(i,a,b)},c.Button.prototype.setUpSound=function(a,b){this.setStateSound(j,a,b)},c.Button.prototype.onInputOverHandler=function(a,b){b.justReleased()&&(this.justReleasedPreventsOver&b.pointerMode)===b.pointerMode||(this.changeStateFrame(g),(!this.onOverMouseOnly||b.isMouse)&&(this.playStateSound(g),this.onInputOver&&this.onInputOver.dispatch(this,b)))},c.Button.prototype.onInputOutHandler=function(a,b){this.changeStateFrame(h),this.playStateSound(h),this.onInputOut&&this.onInputOut.dispatch(this,b)},c.Button.prototype.onInputDownHandler=function(a,b){this.changeStateFrame(i),this.playStateSound(i),this.onInputDown&&this.onInputDown.dispatch(this,b)},c.Button.prototype.onInputUpHandler=function(a,b,c){if(this.playStateSound(j),this.onInputUp&&this.onInputUp.dispatch(this,b,c),!this.freezeFrames)if(this.forceOut===!0||(this.forceOut&b.pointerMode)===b.pointerMode)this.changeStateFrame(h);else{var d=this.changeStateFrame(j);d||(c?this.changeStateFrame(g):this.changeStateFrame(h))}},c.SpriteBatch=function(a,b,d,e){(void 0===b||null===b)&&(b=a.world),PIXI.SpriteBatch.call(this),c.Group.call(this,a,b,d,e),this.type=c.SPRITEBATCH},c.SpriteBatch.prototype=c.Utils.extend(!0,c.SpriteBatch.prototype,PIXI.SpriteBatch.prototype,c.Group.prototype),c.SpriteBatch.prototype.constructor=c.SpriteBatch,c.BitmapData=function(a,b,d,e){(void 0===d||0===d)&&(d=256),(void 0===e||0===e)&&(e=256),this.game=a,this.key=b,this.width=d,this.height=e,this.canvas=PIXI.CanvasPool.create(this,d,e),this.context=this.canvas.getContext("2d",{alpha:!0}),this.ctx=this.context,this.imageData=this.context.getImageData(0,0,d,e),this.data=null,this.imageData&&(this.data=this.imageData.data),this.pixels=null,this.data&&(this.imageData.data.buffer?(this.buffer=this.imageData.data.buffer,this.pixels=new Uint32Array(this.buffer)):window.ArrayBuffer?(this.buffer=new ArrayBuffer(this.imageData.data.length),this.pixels=new Uint32Array(this.buffer)):this.pixels=this.imageData.data),this.baseTexture=new PIXI.BaseTexture(this.canvas),this.texture=new PIXI.Texture(this.baseTexture),this.frameData=new c.FrameData,this.textureFrame=this.frameData.addFrame(new c.Frame(0,0,0,d,e,"bitmapData")),this.texture.frame=this.textureFrame,this.type=c.BITMAPDATA,this.disableTextureUpload=!1,this.dirty=!1,this.cls=this.clear,this._image=null,this._pos=new c.Point,this._size=new c.Point,this._scale=new c.Point,this._rotate=0,this._alpha={prev:1,current:1},this._anchor=new c.Point,this._tempR=0,this._tempG=0,this._tempB=0,this._circle=new c.Circle,this._swapCanvas=void 0},c.BitmapData.prototype={move:function(a,b,c){return 0!==a&&this.moveH(a,c),0!==b&&this.moveV(b,c),this},moveH:function(a,b){void 0===b&&(b=!0),void 0===this._swapCanvas&&(this._swapCanvas=PIXI.CanvasPool.create(this,this.width,this.height));var c=this._swapCanvas,d=c.getContext("2d"),e=this.height,f=this.canvas;if(d.clearRect(0,0,this.width,this.height),0>a){a=Math.abs(a);var g=this.width-a;b&&d.drawImage(f,0,0,a,e,g,0,a,e),d.drawImage(f,a,0,g,e,0,0,g,e)}else{var g=this.width-a;b&&d.drawImage(f,g,0,a,e,0,0,a,e),d.drawImage(f,0,0,g,e,a,0,g,e)}return this.clear(),this.copy(this._swapCanvas)},moveV:function(a,b){void 0===b&&(b=!0),void 0===this._swapCanvas&&(this._swapCanvas=PIXI.CanvasPool.create(this,this.width,this.height));var c=this._swapCanvas,d=c.getContext("2d"),e=this.width,f=this.canvas;if(d.clearRect(0,0,this.width,this.height),0>a){a=Math.abs(a);var g=this.height-a;b&&d.drawImage(f,0,0,e,a,0,g,e,a),d.drawImage(f,0,a,e,g,0,0,e,g)}else{var g=this.height-a;b&&d.drawImage(f,0,g,e,a,0,0,e,a),d.drawImage(f,0,0,e,g,0,a,e,g)}return this.clear(),this.copy(this._swapCanvas)},add:function(a){if(Array.isArray(a))for(var b=0;b<a.length;b++)a[b].loadTexture&&a[b].loadTexture(this);else a.loadTexture(this);return this},load:function(a){return"string"==typeof a&&(a=this.game.cache.getImage(a)),a?(this.resize(a.width,a.height),this.cls(),this.draw(a),this.update(),this):void 0},clear:function(a,b,c,d){return void 0===a&&(a=0),void 0===b&&(b=0),void 0===c&&(c=this.width),void 0===d&&(d=this.height),this.context.clearRect(a,b,c,d),this.dirty=!0,this},fill:function(a,b,c,d){return void 0===d&&(d=1),this.context.fillStyle="rgba("+a+","+b+","+c+","+d+")",this.context.fillRect(0,0,this.width,this.height),this.dirty=!0,this},generateTexture:function(a){var b=new Image;b.src=this.canvas.toDataURL("image/png");var c=this.game.cache.addImage(a,"",b);return new PIXI.Texture(c.base)},resize:function(a,b){return(a!==this.width||b!==this.height)&&(this.width=a,this.height=b,this.canvas.width=a,this.canvas.height=b,void 0!==this._swapCanvas&&(this._swapCanvas.width=a,this._swapCanvas.height=b),this.baseTexture.width=a,this.baseTexture.height=b,this.textureFrame.width=a,this.textureFrame.height=b,this.texture.width=a,this.texture.height=b,this.texture.crop.width=a,this.texture.crop.height=b,this.update(),this.dirty=!0),this},update:function(a,b,c,d){return void 0===a&&(a=0),void 0===b&&(b=0),void 0===c&&(c=Math.max(1,this.width)),void 0===d&&(d=Math.max(1,this.height)),this.imageData=this.context.getImageData(a,b,c,d),this.data=this.imageData.data,this.imageData.data.buffer?(this.buffer=this.imageData.data.buffer,this.pixels=new Uint32Array(this.buffer)):window.ArrayBuffer?(this.buffer=new ArrayBuffer(this.imageData.data.length),this.pixels=new Uint32Array(this.buffer)):this.pixels=this.imageData.data,this},processPixelRGB:function(a,b,d,e,f,g){void 0===d&&(d=0),void 0===e&&(e=0),void 0===f&&(f=this.width),void 0===g&&(g=this.height);for(var h=d+f,i=e+g,j=c.Color.createColor(),k={r:0,g:0,b:0,a:0},l=!1,m=e;i>m;m++)for(var n=d;h>n;n++)c.Color.unpackPixel(this.getPixel32(n,m),j),k=a.call(b,j,n,m),k!==!1&&null!==k&&void 0!==k&&(this.setPixel32(n,m,k.r,k.g,k.b,k.a,!1),l=!0);return l&&(this.context.putImageData(this.imageData,0,0),this.dirty=!0),this},processPixel:function(a,b,c,d,e,f){void 0===c&&(c=0),void 0===d&&(d=0),void 0===e&&(e=this.width),void 0===f&&(f=this.height);for(var g=c+e,h=d+f,i=0,j=0,k=!1,l=d;h>l;l++)for(var m=c;g>m;m++)i=this.getPixel32(m,l),j=a.call(b,i,m,l),j!==i&&(this.pixels[l*this.width+m]=j,k=!0);return k&&(this.context.putImageData(this.imageData,0,0),this.dirty=!0),this},replaceRGB:function(a,b,d,e,f,g,h,i,j){var k=0,l=0,m=this.width,n=this.height,o=c.Color.packPixel(a,b,d,e);void 0!==j&&j instanceof c.Rectangle&&(k=j.x,l=j.y,m=j.width,n=j.height);for(var p=0;n>p;p++)for(var q=0;m>q;q++)this.getPixel32(k+q,l+p)===o&&this.setPixel32(k+q,l+p,f,g,h,i,!1);return this.context.putImageData(this.imageData,0,0),this.dirty=!0,this},setHSL:function(a,b,d,e){var f=a||0===a,g=b||0===b,h=d||0===d;if(f||g||h){void 0===e&&(e=new c.Rectangle(0,0,this.width,this.height));for(var i=c.Color.createColor(),j=e.y;j<e.bottom;j++)for(var k=e.x;k<e.right;k++)c.Color.unpackPixel(this.getPixel32(k,j),i,!0),f&&(i.h=a),g&&(i.s=b),h&&(i.l=d),c.Color.HSLtoRGB(i.h,i.s,i.l,i),this.setPixel32(k,j,i.r,i.g,i.b,i.a,!1);return this.context.putImageData(this.imageData,0,0),this.dirty=!0,this}},shiftHSL:function(a,b,d,e){if((void 0===a||null===a)&&(a=!1),(void 0===b||null===b)&&(b=!1),(void 0===d||null===d)&&(d=!1),a||b||d){void 0===e&&(e=new c.Rectangle(0,0,this.width,this.height));for(var f=c.Color.createColor(),g=e.y;g<e.bottom;g++)for(var h=e.x;h<e.right;h++)c.Color.unpackPixel(this.getPixel32(h,g),f,!0),a&&(f.h=this.game.math.wrap(f.h+a,0,1)),b&&(f.s=this.game.math.clamp(f.s+b,0,1)),d&&(f.l=this.game.math.clamp(f.l+d,0,1)),c.Color.HSLtoRGB(f.h,f.s,f.l,f),this.setPixel32(h,g,f.r,f.g,f.b,f.a,!1);return this.context.putImageData(this.imageData,0,0),this.dirty=!0,this}},setPixel32:function(a,b,d,e,f,g,h){return void 0===h&&(h=!0),a>=0&&a<=this.width&&b>=0&&b<=this.height&&(c.Device.LITTLE_ENDIAN?this.pixels[b*this.width+a]=g<<24|f<<16|e<<8|d:this.pixels[b*this.width+a]=d<<24|e<<16|f<<8|g,h&&(this.context.putImageData(this.imageData,0,0),this.dirty=!0)),this},setPixel:function(a,b,c,d,e,f){return this.setPixel32(a,b,c,d,e,255,f)},getPixel:function(a,b,d){d||(d=c.Color.createColor());var e=~~(a+b*this.width);return e*=4,d.r=this.data[e],d.g=this.data[++e],d.b=this.data[++e],d.a=this.data[++e],d},getPixel32:function(a,b){return a>=0&&a<=this.width&&b>=0&&b<=this.height?this.pixels[b*this.width+a]:void 0},getPixelRGB:function(a,b,d,e,f){return c.Color.unpackPixel(this.getPixel32(a,b),d,e,f)},getPixels:function(a){return this.context.getImageData(a.x,a.y,a.width,a.height)},getFirstPixel:function(a){void 0===a&&(a=0);var b=c.Color.createColor(),d=0,e=0,f=1,g=!1;1===a?(f=-1,e=this.height):3===a&&(f=-1,d=this.width);do c.Color.unpackPixel(this.getPixel32(d,e),b),0===a||1===a?(d++,d===this.width&&(d=0,e+=f,(e>=this.height||0>=e)&&(g=!0))):(2===a||3===a)&&(e++,e===this.height&&(e=0,d+=f,(d>=this.width||0>=d)&&(g=!0)));while(0===b.a&&!g);return b.x=d,b.y=e,b},getBounds:function(a){return void 0===a&&(a=new c.Rectangle),a.x=this.getFirstPixel(2).x,a.x===this.width?a.setTo(0,0,0,0):(a.y=this.getFirstPixel(0).y,a.width=this.getFirstPixel(3).x-a.x+1,a.height=this.getFirstPixel(1).y-a.y+1,a)},addToWorld:function(a,b,c,d,e,f){e=e||1,f=f||1;var g=this.game.add.image(a,b,this);return g.anchor.set(c,d),g.scale.set(e,f),g},copy:function(a,b,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r){if((void 0===a||null===a)&&(a=this),this._image=a,a instanceof c.Sprite||a instanceof c.Image||a instanceof c.Text||a instanceof PIXI.Sprite)this._pos.set(a.texture.crop.x,a.texture.crop.y),this._size.set(a.texture.crop.width,a.texture.crop.height),this._scale.set(a.scale.x,a.scale.y),this._anchor.set(a.anchor.x,a.anchor.y),this._rotate=a.rotation,this._alpha.current=a.alpha,this._image=a.texture.baseTexture.source,(void 0===g||null===g)&&(g=a.x),(void 0===h||null===h)&&(h=a.y),a.texture.trim&&(g+=a.texture.trim.x-a.anchor.x*a.texture.trim.width,h+=a.texture.trim.y-a.anchor.y*a.texture.trim.height),16777215!==a.tint&&(a.cachedTint!==a.tint&&(a.cachedTint=a.tint,a.tintedTexture=PIXI.CanvasTinter.getTintedTexture(a,a.tint)),this._image=a.tintedTexture,this._pos.set(0));else{if(this._pos.set(0),this._scale.set(1),this._anchor.set(0),this._rotate=0,this._alpha.current=1,a instanceof c.BitmapData)this._image=a.canvas;else if("string"==typeof a){if(a=this.game.cache.getImage(a),null===a)return;this._image=a}this._size.set(this._image.width,this._image.height)}if((void 0===b||null===b)&&(b=0),(void 0===d||null===d)&&(d=0),e&&(this._size.x=e),f&&(this._size.y=f),(void 0===g||null===g)&&(g=b),(void 0===h||null===h)&&(h=d),(void 0===i||null===i)&&(i=this._size.x),(void 0===j||null===j)&&(j=this._size.y),"number"==typeof k&&(this._rotate=k),"number"==typeof l&&(this._anchor.x=l),"number"==typeof m&&(this._anchor.y=m),"number"==typeof n&&(this._scale.x=n),"number"==typeof o&&(this._scale.y=o),"number"==typeof p&&(this._alpha.current=p),void 0===q&&(q=null),void 0===r&&(r=!1),!(this._alpha.current<=0||0===this._scale.x||0===this._scale.y||0===this._size.x||0===this._size.y)){var s=this.context;return this._alpha.prev=s.globalAlpha,s.save(),s.globalAlpha=this._alpha.current,q&&(this.op=q),r&&(g|=0,h|=0),s.translate(g,h),s.scale(this._scale.x,this._scale.y),s.rotate(this._rotate),s.drawImage(this._image,this._pos.x+b,this._pos.y+d,this._size.x,this._size.y,-i*this._anchor.x,-j*this._anchor.y,i,j),s.restore(),s.globalAlpha=this._alpha.prev,this.dirty=!0,this}},copyRect:function(a,b,c,d,e,f,g){return this.copy(a,b.x,b.y,b.width,b.height,c,d,b.width,b.height,0,0,0,1,1,e,f,g)},draw:function(a,b,c,d,e,f,g){return this.copy(a,null,null,null,null,b,c,d,e,null,null,null,null,null,null,f,g)},drawGroup:function(a,b,c){return a.total>0&&a.forEachExists(this.drawGroupProxy,this,b,c),this},drawGroupProxy:function(a,b,d){if(a.type===c.EMITTER||a.type===c.BITMAPTEXT)for(var e=0;e<a.children.length;e++)this.copy(a.children[e],null,null,null,null,null,null,null,null,null,null,null,null,null,null,b,d);else this.copy(a,null,null,null,null,null,null,null,null,null,null,null,null,null,null,b,d)},drawFull:function(a,b,d){if(a.worldVisible===!1||0===a.worldAlpha||a.hasOwnProperty("exists")&&a.exists===!1)return this;if(a.type!==c.GROUP&&a.type!==c.EMITTER&&a.type!==c.BITMAPTEXT)if(a.type===c.GRAPHICS){var e=a.getBounds();this.ctx.save(),this.ctx.translate(e.x,e.y),PIXI.CanvasGraphics.renderGraphics(a,this.ctx),this.ctx.restore()}else this.copy(a,null,null,null,null,a.worldPosition.x,a.worldPosition.y,null,null,a.worldRotation,null,null,a.worldScale.x,a.worldScale.y,a.worldAlpha,b,d);if(a.children)for(var f=0;f<a.children.length;f++)this.drawFull(a.children[f],b,d);return this},shadow:function(a,b,c,d){var e=this.context;void 0===a||null===a?e.shadowColor="rgba(0,0,0,0)":(e.shadowColor=a,e.shadowBlur=b||5,e.shadowOffsetX=c||10,e.shadowOffsetY=d||10)},alphaMask:function(a,b,c,d){return void 0===d||null===d?this.draw(b).blendSourceAtop():this.draw(b,d.x,d.y,d.width,d.height).blendSourceAtop(),void 0===c||null===c?this.draw(a).blendReset():this.draw(a,c.x,c.y,c.width,c.height).blendReset(),this},extract:function(a,b,c,d,e,f,g,h,i){return void 0===e&&(e=255),void 0===f&&(f=!1),void 0===g&&(g=b),void 0===h&&(h=c),void 0===i&&(i=d),f&&a.resize(this.width,this.height),this.processPixelRGB(function(f,j,k){return f.r===b&&f.g===c&&f.b===d&&a.setPixel32(j,k,g,h,i,e,!1),!1},this),a.context.putImageData(a.imageData,0,0),a.dirty=!0,a},rect:function(a,b,c,d,e){return"undefined"!=typeof e&&(this.context.fillStyle=e),this.context.fillRect(a,b,c,d),this},text:function(a,b,c,d,e,f){void 0===b&&(b=0),void 0===c&&(c=0),void 0===d&&(d="14px Courier"),void 0===e&&(e="rgb(255,255,255)"),void 0===f&&(f=!0);var g=this.context,h=g.font;g.font=d,f&&(g.fillStyle="rgb(0,0,0)",g.fillText(a,b+1,c+1)),g.fillStyle=e,g.fillText(a,b,c),g.font=h},circle:function(a,b,c,d){var e=this.context;return void 0!==d&&(e.fillStyle=d),e.beginPath(),e.arc(a,b,c,0,2*Math.PI,!1),e.closePath(),e.fill(),this},line:function(a,b,c,d,e,f){void 0===e&&(e="#fff"),void 0===f&&(f=1);var g=this.context;return g.beginPath(),g.moveTo(a,b),g.lineTo(c,d),g.lineWidth=f,g.strokeStyle=e,g.stroke(),g.closePath(),this},textureLine:function(a,b,d){if(void 0===d&&(d="repeat-x"),"string"!=typeof b||(b=this.game.cache.getImage(b))){var e=a.length;"no-repeat"===d&&e>b.width&&(e=b.width);var f=this.context;return f.fillStyle=f.createPattern(b,d),this._circle=new c.Circle(a.start.x,a.start.y,b.height),this._circle.circumferencePoint(a.angle-1.5707963267948966,!1,this._pos),f.save(),f.translate(this._pos.x,this._pos.y),f.rotate(a.angle),f.fillRect(0,0,e,b.height),f.restore(),this.dirty=!0,this}},render:function(){return!this.disableTextureUpload&&this.dirty&&(this.baseTexture.dirty(),this.dirty=!1),this},destroy:function(){this.frameData.destroy(),this.texture.destroy(!0),PIXI.CanvasPool.remove(this)},blendReset:function(){return this.op="source-over",this},blendSourceOver:function(){return this.op="source-over",this},blendSourceIn:function(){return this.op="source-in",this},blendSourceOut:function(){return this.op="source-out",this},blendSourceAtop:function(){return this.op="source-atop",this},blendDestinationOver:function(){return this.op="destination-over",this},blendDestinationIn:function(){return this.op="destination-in",this},blendDestinationOut:function(){return this.op="destination-out",this},blendDestinationAtop:function(){return this.op="destination-atop",this},blendXor:function(){return this.op="xor",this},blendAdd:function(){return this.op="lighter",this},blendMultiply:function(){return this.op="multiply",this},blendScreen:function(){return this.op="screen",this},blendOverlay:function(){return this.op="overlay",this},blendDarken:function(){return this.op="darken",this},blendLighten:function(){return this.op="lighten",this},blendColorDodge:function(){return this.op="color-dodge",this},blendColorBurn:function(){return this.op="color-burn",this},blendHardLight:function(){return this.op="hard-light",this},blendSoftLight:function(){return this.op="soft-light",this},blendDifference:function(){return this.op="difference",this},blendExclusion:function(){return this.op="exclusion",this},blendHue:function(){return this.op="hue",this},blendSaturation:function(){return this.op="saturation",this},blendColor:function(){return this.op="color",this},blendLuminosity:function(){return this.op="luminosity",this}},Object.defineProperty(c.BitmapData.prototype,"smoothed",{get:function(){c.Canvas.getSmoothingEnabled(this.context)},set:function(a){c.Canvas.setSmoothingEnabled(this.context,a)}}),Object.defineProperty(c.BitmapData.prototype,"op",{get:function(){return this.context.globalCompositeOperation},set:function(a){this.context.globalCompositeOperation=a}}),c.BitmapData.getTransform=function(a,b,c,d,e,f){return"number"!=typeof a&&(a=0),"number"!=typeof b&&(b=0),"number"!=typeof c&&(c=1),"number"!=typeof d&&(d=1),"number"!=typeof e&&(e=0),"number"!=typeof f&&(f=0),{sx:c,sy:d,scaleX:c,scaleY:d,skewX:e,skewY:f,translateX:a,translateY:b,tx:a,ty:b}},c.BitmapData.prototype.constructor=c.BitmapData,PIXI.Graphics=function(){PIXI.DisplayObjectContainer.call(this),this.renderable=!0,this.fillAlpha=1,this.lineWidth=0,this.lineColor=0,this.graphicsData=[],this.tint=16777215,this.blendMode=PIXI.blendModes.NORMAL,this.currentPath=null,this._webGL=[],this.isMask=!1,this.boundsPadding=0,this._localBounds=new PIXI.Rectangle(0,0,1,1),this.dirty=!0,this.webGLDirty=!1,this.cachedSpriteDirty=!1},PIXI.Graphics.prototype=Object.create(PIXI.DisplayObjectContainer.prototype),PIXI.Graphics.prototype.constructor=PIXI.Graphics,PIXI.Graphics.prototype.lineStyle=function(a,b,c){return this.lineWidth=a||0,this.lineColor=b||0,this.lineAlpha=void 0===c?1:c,this.currentPath&&(this.currentPath.shape.points.length?this.drawShape(new PIXI.Polygon(this.currentPath.shape.points.slice(-2))):(this.currentPath.lineWidth=this.lineWidth,this.currentPath.lineColor=this.lineColor,this.currentPath.lineAlpha=this.lineAlpha)),this},PIXI.Graphics.prototype.moveTo=function(a,b){return this.drawShape(new PIXI.Polygon([a,b])),this},PIXI.Graphics.prototype.lineTo=function(a,b){return this.currentPath||this.moveTo(0,0),this.currentPath.shape.points.push(a,b),this.dirty=!0,this},PIXI.Graphics.prototype.quadraticCurveTo=function(a,b,c,d){this.currentPath?0===this.currentPath.shape.points.length&&(this.currentPath.shape.points=[0,0]):this.moveTo(0,0);var e,f,g=20,h=this.currentPath.shape.points;0===h.length&&this.moveTo(0,0);for(var i=h[h.length-2],j=h[h.length-1],k=0,l=1;g>=l;++l)k=l/g,e=i+(a-i)*k,f=j+(b-j)*k,h.push(e+(a+(c-a)*k-e)*k,f+(b+(d-b)*k-f)*k);return this.dirty=!0,this},PIXI.Graphics.prototype.bezierCurveTo=function(a,b,c,d,e,f){this.currentPath?0===this.currentPath.shape.points.length&&(this.currentPath.shape.points=[0,0]):this.moveTo(0,0);for(var g,h,i,j,k,l=20,m=this.currentPath.shape.points,n=m[m.length-2],o=m[m.length-1],p=0,q=1;l>=q;++q)p=q/l,g=1-p,h=g*g,i=h*g,j=p*p,k=j*p,m.push(i*n+3*h*p*a+3*g*j*c+k*e,i*o+3*h*p*b+3*g*j*d+k*f);return this.dirty=!0,this},PIXI.Graphics.prototype.arcTo=function(a,b,c,d,e){this.currentPath?0===this.currentPath.shape.points.length&&this.currentPath.shape.points.push(a,b):this.moveTo(a,b);var f=this.currentPath.shape.points,g=f[f.length-2],h=f[f.length-1],i=h-b,j=g-a,k=d-b,l=c-a,m=Math.abs(i*l-j*k);if(1e-8>m||0===e)(f[f.length-2]!==a||f[f.length-1]!==b)&&f.push(a,b);else{var n=i*i+j*j,o=k*k+l*l,p=i*k+j*l,q=e*Math.sqrt(n)/m,r=e*Math.sqrt(o)/m,s=q*p/n,t=r*p/o,u=q*l+r*j,v=q*k+r*i,w=j*(r+s),x=i*(r+s),y=l*(q+t),z=k*(q+t),A=Math.atan2(x-v,w-u),B=Math.atan2(z-v,y-u);this.arc(u+a,v+b,e,A,B,j*k>l*i)}return this.dirty=!0,this},PIXI.Graphics.prototype.arc=function(a,b,c,d,e,f,g){if(d===e)return this;void 0===f&&(f=!1),void 0===g&&(g=40),!f&&d>=e?e+=2*Math.PI:f&&e>=d&&(d+=2*Math.PI);var h=f?-1*(d-e):e-d,i=Math.ceil(Math.abs(h)/(2*Math.PI))*g;if(0===h)return this;var j=a+Math.cos(d)*c,k=b+Math.sin(d)*c;f&&this.filling?this.moveTo(a,b):this.moveTo(j,k);for(var l=this.currentPath.shape.points,m=h/(2*i),n=2*m,o=Math.cos(m),p=Math.sin(m),q=i-1,r=q%1/q,s=0;q>=s;s++){var t=s+r*s,u=m+d+n*t,v=Math.cos(u),w=-Math.sin(u);l.push((o*v+p*w)*c+a,(o*-w+p*v)*c+b)}return this.dirty=!0,this},PIXI.Graphics.prototype.beginFill=function(a,b){return this.filling=!0,this.fillColor=a||0,this.fillAlpha=void 0===b?1:b,this.currentPath&&this.currentPath.shape.points.length<=2&&(this.currentPath.fill=this.filling,this.currentPath.fillColor=this.fillColor,this.currentPath.fillAlpha=this.fillAlpha),this},PIXI.Graphics.prototype.endFill=function(){return this.filling=!1,this.fillColor=null,this.fillAlpha=1,this},PIXI.Graphics.prototype.drawRect=function(a,b,c,d){return this.drawShape(new PIXI.Rectangle(a,b,c,d)),this},PIXI.Graphics.prototype.drawRoundedRect=function(a,b,c,d,e){return this.drawShape(new PIXI.RoundedRectangle(a,b,c,d,e)),this},PIXI.Graphics.prototype.drawCircle=function(a,b,c){return this.drawShape(new PIXI.Circle(a,b,c)),this},PIXI.Graphics.prototype.drawEllipse=function(a,b,c,d){return this.drawShape(new PIXI.Ellipse(a,b,c,d)),this},PIXI.Graphics.prototype.drawPolygon=function(a){(a instanceof c.Polygon||a instanceof PIXI.Polygon)&&(a=a.points);var b=a;if(!Array.isArray(b)){b=new Array(arguments.length);for(var d=0;d<b.length;++d)b[d]=arguments[d]}return this.drawShape(new c.Polygon(b)),this},PIXI.Graphics.prototype.clear=function(){return this.lineWidth=0,this.filling=!1,this.dirty=!0,this.clearDirty=!0,this.graphicsData=[],this},PIXI.Graphics.prototype.generateTexture=function(a,b,c){void 0===a&&(a=1),void 0===b&&(b=PIXI.scaleModes.DEFAULT),void 0===c&&(c=0);var d=this.getBounds();d.width+=c,d.height+=c;var e=new PIXI.CanvasBuffer(d.width*a,d.height*a),f=PIXI.Texture.fromCanvas(e.canvas,b);return f.baseTexture.resolution=a,e.context.scale(a,a),e.context.translate(-d.x,-d.y),PIXI.CanvasGraphics.renderGraphics(this,e.context),f},PIXI.Graphics.prototype._renderWebGL=function(a){if(this.visible!==!1&&0!==this.alpha&&this.isMask!==!0){if(this._cacheAsBitmap)return(this.dirty||this.cachedSpriteDirty)&&(this._generateCachedSprite(),this.updateCachedSpriteTexture(),this.cachedSpriteDirty=!1,this.dirty=!1),this._cachedSprite.worldAlpha=this.worldAlpha,void PIXI.Sprite.prototype._renderWebGL.call(this._cachedSprite,a);if(a.spriteBatch.stop(),a.blendModeManager.setBlendMode(this.blendMode),this._mask&&a.maskManager.pushMask(this._mask,a),this._filters&&a.filterManager.pushFilter(this._filterBlock),this.blendMode!==a.spriteBatch.currentBlendMode){a.spriteBatch.currentBlendMode=this.blendMode;var b=PIXI.blendModesWebGL[a.spriteBatch.currentBlendMode];a.spriteBatch.gl.blendFunc(b[0],b[1])}if(this.webGLDirty&&(this.dirty=!0,this.webGLDirty=!1),PIXI.WebGLGraphics.renderGraphics(this,a),this.children.length){a.spriteBatch.start();for(var c=0;c<this.children.length;c++)this.children[c]._renderWebGL(a);a.spriteBatch.stop()}this._filters&&a.filterManager.popFilter(),this._mask&&a.maskManager.popMask(this.mask,a),a.drawCount++,a.spriteBatch.start()}},PIXI.Graphics.prototype._renderCanvas=function(a){if(this.visible!==!1&&0!==this.alpha&&this.isMask!==!0){if(this._prevTint!==this.tint&&(this.dirty=!0,this._prevTint=this.tint),this._cacheAsBitmap)return(this.dirty||this.cachedSpriteDirty)&&(this._generateCachedSprite(),this.updateCachedSpriteTexture(),this.cachedSpriteDirty=!1,this.dirty=!1),this._cachedSprite.alpha=this.alpha,void PIXI.Sprite.prototype._renderCanvas.call(this._cachedSprite,a);var b=a.context,c=this.worldTransform;this.blendMode!==a.currentBlendMode&&(a.currentBlendMode=this.blendMode,b.globalCompositeOperation=PIXI.blendModesCanvas[a.currentBlendMode]),this._mask&&a.maskManager.pushMask(this._mask,a);var d=a.resolution,e=c.tx*a.resolution+a.shakeX,f=c.ty*a.resolution+a.shakeY;b.setTransform(c.a*d,c.b*d,c.c*d,c.d*d,e,f),PIXI.CanvasGraphics.renderGraphics(this,b);for(var g=0;g<this.children.length;g++)this.children[g]._renderCanvas(a);this._mask&&a.maskManager.popMask(a)}},PIXI.Graphics.prototype.getBounds=function(a){if(!this._currentBounds){if(!this.renderable)return PIXI.EmptyRectangle;this.dirty&&(this.updateLocalBounds(),this.webGLDirty=!0,this.cachedSpriteDirty=!0,this.dirty=!1);var b=this._localBounds,c=b.x,d=b.width+b.x,e=b.y,f=b.height+b.y,g=a||this.worldTransform,h=g.a,i=g.b,j=g.c,k=g.d,l=g.tx,m=g.ty,n=h*d+j*f+l,o=k*f+i*d+m,p=h*c+j*f+l,q=k*f+i*c+m,r=h*c+j*e+l,s=k*e+i*c+m,t=h*d+j*e+l,u=k*e+i*d+m,v=n,w=o,x=n,y=o;x=x>p?p:x,x=x>r?r:x,x=x>t?t:x,y=y>q?q:y,y=y>s?s:y,y=y>u?u:y,v=p>v?p:v,v=r>v?r:v,v=t>v?t:v,w=q>w?q:w,w=s>w?s:w,w=u>w?u:w,this._bounds.x=x,this._bounds.width=v-x,this._bounds.y=y,this._bounds.height=w-y,this._currentBounds=this._bounds}return this._currentBounds},PIXI.Graphics.prototype.containsPoint=function(a){this.worldTransform.applyInverse(a,tempPoint);for(var b=this.graphicsData,c=0;c<b.length;c++){
var d=b[c];if(d.fill&&d.shape&&d.shape.contains(tempPoint.x,tempPoint.y))return!0}return!1},PIXI.Graphics.prototype.updateLocalBounds=function(){var a=1/0,b=-(1/0),d=1/0,e=-(1/0);if(this.graphicsData.length)for(var f,g,h,i,j,k,l=0;l<this.graphicsData.length;l++){var m=this.graphicsData[l],n=m.type,o=m.lineWidth;if(f=m.shape,n===PIXI.Graphics.RECT||n===PIXI.Graphics.RREC)h=f.x-o/2,i=f.y-o/2,j=f.width+o,k=f.height+o,a=a>h?h:a,b=h+j>b?h+j:b,d=d>i?i:d,e=i+k>e?i+k:e;else if(n===PIXI.Graphics.CIRC)h=f.x,i=f.y,j=f.radius+o/2,k=f.radius+o/2,a=a>h-j?h-j:a,b=h+j>b?h+j:b,d=d>i-k?i-k:d,e=i+k>e?i+k:e;else if(n===PIXI.Graphics.ELIP)h=f.x,i=f.y,j=f.width+o/2,k=f.height+o/2,a=a>h-j?h-j:a,b=h+j>b?h+j:b,d=d>i-k?i-k:d,e=i+k>e?i+k:e;else{g=f.points;for(var p=0;p<g.length;p++)g[p]instanceof c.Point?(h=g[p].x,i=g[p].y):(h=g[p],i=g[p+1],p<g.length-1&&p++),a=a>h-o?h-o:a,b=h+o>b?h+o:b,d=d>i-o?i-o:d,e=i+o>e?i+o:e}}else a=0,b=0,d=0,e=0;var q=this.boundsPadding;this._localBounds.x=a-q,this._localBounds.width=b-a+2*q,this._localBounds.y=d-q,this._localBounds.height=e-d+2*q},PIXI.Graphics.prototype._generateCachedSprite=function(){var a=this.getLocalBounds();if(this._cachedSprite)this._cachedSprite.buffer.resize(a.width,a.height);else{var b=new PIXI.CanvasBuffer(a.width,a.height),c=PIXI.Texture.fromCanvas(b.canvas);this._cachedSprite=new PIXI.Sprite(c),this._cachedSprite.buffer=b,this._cachedSprite.worldTransform=this.worldTransform}this._cachedSprite.anchor.x=-(a.x/a.width),this._cachedSprite.anchor.y=-(a.y/a.height),this._cachedSprite.buffer.context.translate(-a.x,-a.y),this.worldAlpha=1,PIXI.CanvasGraphics.renderGraphics(this,this._cachedSprite.buffer.context),this._cachedSprite.alpha=this.alpha},PIXI.Graphics.prototype.updateCachedSpriteTexture=function(){var a=this._cachedSprite,b=a.texture,c=a.buffer.canvas;b.baseTexture.width=c.width,b.baseTexture.height=c.height,b.crop.width=b.frame.width=c.width,b.crop.height=b.frame.height=c.height,a._width=c.width,a._height=c.height,b.baseTexture.dirty()},PIXI.Graphics.prototype.destroyCachedSprite=function(){this._cachedSprite.texture.destroy(!0),this._cachedSprite=null},PIXI.Graphics.prototype.drawShape=function(a){this.currentPath&&this.currentPath.shape.points.length<=2&&this.graphicsData.pop(),this.currentPath=null,a instanceof c.Polygon&&(a=a.clone(),a.flatten());var b=new PIXI.GraphicsData(this.lineWidth,this.lineColor,this.lineAlpha,this.fillColor,this.fillAlpha,this.filling,a);return this.graphicsData.push(b),b.type===PIXI.Graphics.POLY&&(b.shape.closed=this.filling,this.currentPath=b),this.dirty=!0,b},Object.defineProperty(PIXI.Graphics.prototype,"cacheAsBitmap",{get:function(){return this._cacheAsBitmap},set:function(a){this._cacheAsBitmap=a,this._cacheAsBitmap?this._generateCachedSprite():this.destroyCachedSprite(),this.dirty=!0,this.webGLDirty=!0}}),PIXI.GraphicsData=function(a,b,c,d,e,f,g){this.lineWidth=a,this.lineColor=b,this.lineAlpha=c,this._lineTint=b,this.fillColor=d,this.fillAlpha=e,this._fillTint=d,this.fill=f,this.shape=g,this.type=g.type},PIXI.GraphicsData.prototype.constructor=PIXI.GraphicsData,PIXI.GraphicsData.prototype.clone=function(){return new GraphicsData(this.lineWidth,this.lineColor,this.lineAlpha,this.fillColor,this.fillAlpha,this.fill,this.shape)},PIXI.PolyK={},PIXI.PolyK.Triangulate=function(a){var b=!0,c=a.length>>1;if(3>c)return[];for(var d=[],e=[],f=0;c>f;f++)e.push(f);f=0;for(var g=c;g>3;){var h=e[(f+0)%g],i=e[(f+1)%g],j=e[(f+2)%g],k=a[2*h],l=a[2*h+1],m=a[2*i],n=a[2*i+1],o=a[2*j],p=a[2*j+1],q=!1;if(PIXI.PolyK._convex(k,l,m,n,o,p,b)){q=!0;for(var r=0;g>r;r++){var s=e[r];if(s!==h&&s!==i&&s!==j&&PIXI.PolyK._PointInTriangle(a[2*s],a[2*s+1],k,l,m,n,o,p)){q=!1;break}}}if(q)d.push(h,i,j),e.splice((f+1)%g,1),g--,f=0;else if(f++>3*g){if(!b)return null;for(d=[],e=[],f=0;c>f;f++)e.push(f);f=0,g=c,b=!1}}return d.push(e[0],e[1],e[2]),d},PIXI.PolyK._PointInTriangle=function(a,b,c,d,e,f,g,h){var i=g-c,j=h-d,k=e-c,l=f-d,m=a-c,n=b-d,o=i*i+j*j,p=i*k+j*l,q=i*m+j*n,r=k*k+l*l,s=k*m+l*n,t=1/(o*r-p*p),u=(r*q-p*s)*t,v=(o*s-p*q)*t;return u>=0&&v>=0&&1>u+v},PIXI.PolyK._convex=function(a,b,c,d,e,f,g){return(b-d)*(e-c)+(c-a)*(f-d)>=0===g},PIXI.EarCut={},PIXI.EarCut.Triangulate=function(a,b,c){c=c||2;var d=b&&b.length,e=d?b[0]*c:a.length,f=PIXI.EarCut.linkedList(a,0,e,c,!0),g=[];if(!f)return g;var h,i,j,k,l,m,n;if(d&&(f=PIXI.EarCut.eliminateHoles(a,b,f,c)),a.length>80*c){h=j=a[0],i=k=a[1];for(var o=c;e>o;o+=c)l=a[o],m=a[o+1],h>l&&(h=l),i>m&&(i=m),l>j&&(j=l),m>k&&(k=m);n=Math.max(j-h,k-i)}return PIXI.EarCut.earcutLinked(f,g,c,h,i,n),g},PIXI.EarCut.linkedList=function(a,b,c,d,e){var f,g,h,i=0;for(f=b,g=c-d;c>f;f+=d)i+=(a[g]-a[f])*(a[f+1]+a[g+1]),g=f;if(e===i>0)for(f=b;c>f;f+=d)h=PIXI.EarCut.insertNode(f,a[f],a[f+1],h);else for(f=c-d;f>=b;f-=d)h=PIXI.EarCut.insertNode(f,a[f],a[f+1],h);return h},PIXI.EarCut.filterPoints=function(a,b){if(!a)return a;b||(b=a);var c,d=a;do if(c=!1,d.steiner||!PIXI.EarCut.equals(d,d.next)&&0!==PIXI.EarCut.area(d.prev,d,d.next))d=d.next;else{if(PIXI.EarCut.removeNode(d),d=b=d.prev,d===d.next)return null;c=!0}while(c||d!==b);return b},PIXI.EarCut.earcutLinked=function(a,b,c,d,e,f,g){if(a){!g&&f&&PIXI.EarCut.indexCurve(a,d,e,f);for(var h,i,j=a;a.prev!==a.next;)if(h=a.prev,i=a.next,f?PIXI.EarCut.isEarHashed(a,d,e,f):PIXI.EarCut.isEar(a))b.push(h.i/c),b.push(a.i/c),b.push(i.i/c),PIXI.EarCut.removeNode(a),a=i.next,j=i.next;else if(a=i,a===j){g?1===g?(a=PIXI.EarCut.cureLocalIntersections(a,b,c),PIXI.EarCut.earcutLinked(a,b,c,d,e,f,2)):2===g&&PIXI.EarCut.splitEarcut(a,b,c,d,e,f):PIXI.EarCut.earcutLinked(PIXI.EarCut.filterPoints(a),b,c,d,e,f,1);break}}},PIXI.EarCut.isEar=function(a){var b=a.prev,c=a,d=a.next;if(PIXI.EarCut.area(b,c,d)>=0)return!1;for(var e=a.next.next;e!==a.prev;){if(PIXI.EarCut.pointInTriangle(b.x,b.y,c.x,c.y,d.x,d.y,e.x,e.y)&&PIXI.EarCut.area(e.prev,e,e.next)>=0)return!1;e=e.next}return!0},PIXI.EarCut.isEarHashed=function(a,b,c,d){var e=a.prev,f=a,g=a.next;if(PIXI.EarCut.area(e,f,g)>=0)return!1;for(var h=e.x<f.x?e.x<g.x?e.x:g.x:f.x<g.x?f.x:g.x,i=e.y<f.y?e.y<g.y?e.y:g.y:f.y<g.y?f.y:g.y,j=e.x>f.x?e.x>g.x?e.x:g.x:f.x>g.x?f.x:g.x,k=e.y>f.y?e.y>g.y?e.y:g.y:f.y>g.y?f.y:g.y,l=PIXI.EarCut.zOrder(h,i,b,c,d),m=PIXI.EarCut.zOrder(j,k,b,c,d),n=a.nextZ;n&&n.z<=m;){if(n!==a.prev&&n!==a.next&&PIXI.EarCut.pointInTriangle(e.x,e.y,f.x,f.y,g.x,g.y,n.x,n.y)&&PIXI.EarCut.area(n.prev,n,n.next)>=0)return!1;n=n.nextZ}for(n=a.prevZ;n&&n.z>=l;){if(n!==a.prev&&n!==a.next&&PIXI.EarCut.pointInTriangle(e.x,e.y,f.x,f.y,g.x,g.y,n.x,n.y)&&PIXI.EarCut.area(n.prev,n,n.next)>=0)return!1;n=n.prevZ}return!0},PIXI.EarCut.cureLocalIntersections=function(a,b,c){var d=a;do{var e=d.prev,f=d.next.next;PIXI.EarCut.intersects(e,d,d.next,f)&&PIXI.EarCut.locallyInside(e,f)&&PIXI.EarCut.locallyInside(f,e)&&(b.push(e.i/c),b.push(d.i/c),b.push(f.i/c),PIXI.EarCut.removeNode(d),PIXI.EarCut.removeNode(d.next),d=a=f),d=d.next}while(d!==a);return d},PIXI.EarCut.splitEarcut=function(a,b,c,d,e,f){var g=a;do{for(var h=g.next.next;h!==g.prev;){if(g.i!==h.i&&PIXI.EarCut.isValidDiagonal(g,h)){var i=PIXI.EarCut.splitPolygon(g,h);return g=PIXI.EarCut.filterPoints(g,g.next),i=PIXI.EarCut.filterPoints(i,i.next),PIXI.EarCut.earcutLinked(g,b,c,d,e,f),void PIXI.EarCut.earcutLinked(i,b,c,d,e,f)}h=h.next}g=g.next}while(g!==a)},PIXI.EarCut.eliminateHoles=function(a,b,c,d){var e,f,g,h,i,j=[];for(e=0,f=b.length;f>e;e++)g=b[e]*d,h=f-1>e?b[e+1]*d:a.length,i=PIXI.EarCut.linkedList(a,g,h,d,!1),i===i.next&&(i.steiner=!0),j.push(PIXI.EarCut.getLeftmost(i));for(j.sort(compareX),e=0;e<j.length;e++)PIXI.EarCut.eliminateHole(j[e],c),c=PIXI.EarCut.filterPoints(c,c.next);return c},PIXI.EarCut.compareX=function(a,b){return a.x-b.x},PIXI.EarCut.eliminateHole=function(a,b){if(b=PIXI.EarCut.findHoleBridge(a,b)){var c=PIXI.EarCut.splitPolygon(b,a);PIXI.EarCut.filterPoints(c,c.next)}},PIXI.EarCut.findHoleBridge=function(a,b){var c,d=b,e=a.x,f=a.y,g=-(1/0);do{if(f<=d.y&&f>=d.next.y){var h=d.x+(f-d.y)*(d.next.x-d.x)/(d.next.y-d.y);e>=h&&h>g&&(g=h,c=d.x<d.next.x?d:d.next)}d=d.next}while(d!==b);if(!c)return null;if(a.x===c.x)return c.prev;var i,j=c,k=1/0;for(d=c.next;d!==j;)e>=d.x&&d.x>=c.x&&PIXI.EarCut.pointInTriangle(f<c.y?e:g,f,c.x,c.y,f<c.y?g:e,f,d.x,d.y)&&(i=Math.abs(f-d.y)/(e-d.x),(k>i||i===k&&d.x>c.x)&&PIXI.EarCut.locallyInside(d,a)&&(c=d,k=i)),d=d.next;return c},PIXI.EarCut.indexCurve=function(a,b,c,d){var e=a;do null===e.z&&(e.z=PIXI.EarCut.zOrder(e.x,e.y,b,c,d)),e.prevZ=e.prev,e.nextZ=e.next,e=e.next;while(e!==a);e.prevZ.nextZ=null,e.prevZ=null,PIXI.EarCut.sortLinked(e)},PIXI.EarCut.sortLinked=function(a){var b,c,d,e,f,g,h,i,j=1;do{for(c=a,a=null,f=null,g=0;c;){for(g++,d=c,h=0,b=0;j>b&&(h++,d=d.nextZ,d);b++);for(i=j;h>0||i>0&&d;)0===h?(e=d,d=d.nextZ,i--):0!==i&&d?c.z<=d.z?(e=c,c=c.nextZ,h--):(e=d,d=d.nextZ,i--):(e=c,c=c.nextZ,h--),f?f.nextZ=e:a=e,e.prevZ=f,f=e;c=d}f.nextZ=null,j*=2}while(g>1);return a},PIXI.EarCut.zOrder=function(a,b,c,d,e){return a=32767*(a-c)/e,b=32767*(b-d)/e,a=16711935&(a|a<<8),a=252645135&(a|a<<4),a=858993459&(a|a<<2),a=1431655765&(a|a<<1),b=16711935&(b|b<<8),b=252645135&(b|b<<4),b=858993459&(b|b<<2),b=1431655765&(b|b<<1),a|b<<1},PIXI.EarCut.getLeftmost=function(a){var b=a,c=a;do b.x<c.x&&(c=b),b=b.next;while(b!==a);return c},PIXI.EarCut.pointInTriangle=function(a,b,c,d,e,f,g,h){return(e-g)*(b-h)-(a-g)*(f-h)>=0&&(a-g)*(d-h)-(c-g)*(b-h)>=0&&(c-g)*(f-h)-(e-g)*(d-h)>=0},PIXI.EarCut.isValidDiagonal=function(a,b){return PIXI.EarCut.equals(a,b)||a.next.i!==b.i&&a.prev.i!==b.i&&!PIXI.EarCut.intersectsPolygon(a,b)&&PIXI.EarCut.locallyInside(a,b)&&PIXI.EarCut.locallyInside(b,a)&&PIXI.EarCut.middleInside(a,b)},PIXI.EarCut.area=function(a,b,c){return(b.y-a.y)*(c.x-b.x)-(b.x-a.x)*(c.y-b.y)},PIXI.EarCut.equals=function(a,b){return a.x===b.x&&a.y===b.y},PIXI.EarCut.intersects=function(a,b,c,d){return PIXI.EarCut.area(a,b,c)>0!=PIXI.EarCut.area(a,b,d)>0&&PIXI.EarCut.area(c,d,a)>0!=PIXI.EarCut.area(c,d,b)>0},PIXI.EarCut.intersectsPolygon=function(a,b){var c=a;do{if(c.i!==a.i&&c.next.i!==a.i&&c.i!==b.i&&c.next.i!==b.i&&PIXI.EarCut.intersects(c,c.next,a,b))return!0;c=c.next}while(c!==a);return!1},PIXI.EarCut.locallyInside=function(a,b){return PIXI.EarCut.area(a.prev,a,a.next)<0?PIXI.EarCut.area(a,b,a.next)>=0&&PIXI.EarCut.area(a,a.prev,b)>=0:PIXI.EarCut.area(a,b,a.prev)<0||PIXI.EarCut.area(a,a.next,b)<0},PIXI.EarCut.middleInside=function(a,b){var c=a,d=!1,e=(a.x+b.x)/2,f=(a.y+b.y)/2;do c.y>f!=c.next.y>f&&e<(c.next.x-c.x)*(f-c.y)/(c.next.y-c.y)+c.x&&(d=!d),c=c.next;while(c!==a);return d},PIXI.EarCut.splitPolygon=function(a,b){var c=new PIXI.EarCut.Node(a.i,a.x,a.y),d=new PIXI.EarCut.Node(b.i,b.x,b.y),e=a.next,f=b.prev;return a.next=b,b.prev=a,c.next=e,e.prev=c,d.next=c,c.prev=d,f.next=d,d.prev=f,d},PIXI.EarCut.insertNode=function(a,b,c,d){var e=new PIXI.EarCut.Node(a,b,c);return d?(e.next=d.next,e.prev=d,d.next.prev=e,d.next=e):(e.prev=e,e.next=e),e},PIXI.EarCut.removeNode=function(a){a.next.prev=a.prev,a.prev.next=a.next,a.prevZ&&(a.prevZ.nextZ=a.nextZ),a.nextZ&&(a.nextZ.prevZ=a.prevZ)},PIXI.EarCut.Node=function(a,b,c){this.i=a,this.x=b,this.y=c,this.prev=null,this.next=null,this.z=null,this.prevZ=null,this.nextZ=null,this.steiner=!1},PIXI.WebGLGraphics=function(){},PIXI.WebGLGraphics.stencilBufferLimit=6,PIXI.WebGLGraphics.renderGraphics=function(a,b){var c,d=b.gl,e=b.projection,f=b.offset,g=b.shaderManager.primitiveShader;a.dirty&&PIXI.WebGLGraphics.updateGraphics(a,d);for(var h=a._webGL[d.id],i=0;i<h.data.length;i++)1===h.data[i].mode?(c=h.data[i],b.stencilManager.pushStencil(a,c,b),d.drawElements(d.TRIANGLE_FAN,4,d.UNSIGNED_SHORT,2*(c.indices.length-4)),b.stencilManager.popStencil(a,c,b)):(c=h.data[i],b.shaderManager.setShader(g),g=b.shaderManager.primitiveShader,d.uniformMatrix3fv(g.translationMatrix,!1,a.worldTransform.toArray(!0)),d.uniform1f(g.flipY,1),d.uniform2f(g.projectionVector,e.x,-e.y),d.uniform2f(g.offsetVector,-f.x,-f.y),d.uniform3fv(g.tintColor,PIXI.hex2rgb(a.tint)),d.uniform1f(g.alpha,a.worldAlpha),d.bindBuffer(d.ARRAY_BUFFER,c.buffer),d.vertexAttribPointer(g.aVertexPosition,2,d.FLOAT,!1,24,0),d.vertexAttribPointer(g.colorAttribute,4,d.FLOAT,!1,24,8),d.bindBuffer(d.ELEMENT_ARRAY_BUFFER,c.indexBuffer),d.drawElements(d.TRIANGLE_STRIP,c.indices.length,d.UNSIGNED_SHORT,0))},PIXI.WebGLGraphics.updateGraphics=function(a,b){var c=a._webGL[b.id];c||(c=a._webGL[b.id]={lastIndex:0,data:[],gl:b}),a.dirty=!1;var d;if(a.clearDirty){for(a.clearDirty=!1,d=0;d<c.data.length;d++){var e=c.data[d];e.reset(),PIXI.WebGLGraphics.graphicsDataPool.push(e)}c.data=[],c.lastIndex=0}var f;for(d=c.lastIndex;d<a.graphicsData.length;d++){var g=a.graphicsData[d];if(g.type===PIXI.Graphics.POLY){if(g.points=g.shape.points.slice(),g.shape.closed&&(g.points[0]!==g.points[g.points.length-2]||g.points[1]!==g.points[g.points.length-1])&&g.points.push(g.points[0],g.points[1]),g.fill&&g.points.length>=PIXI.WebGLGraphics.stencilBufferLimit)if(g.points.length<2*PIXI.WebGLGraphics.stencilBufferLimit){f=PIXI.WebGLGraphics.switchMode(c,0);var h=PIXI.WebGLGraphics.buildPoly(g,f);h||(f=PIXI.WebGLGraphics.switchMode(c,1),PIXI.WebGLGraphics.buildComplexPoly(g,f))}else f=PIXI.WebGLGraphics.switchMode(c,1),PIXI.WebGLGraphics.buildComplexPoly(g,f);g.lineWidth>0&&(f=PIXI.WebGLGraphics.switchMode(c,0),PIXI.WebGLGraphics.buildLine(g,f))}else f=PIXI.WebGLGraphics.switchMode(c,0),g.type===PIXI.Graphics.RECT?PIXI.WebGLGraphics.buildRectangle(g,f):g.type===PIXI.Graphics.CIRC||g.type===PIXI.Graphics.ELIP?PIXI.WebGLGraphics.buildCircle(g,f):g.type===PIXI.Graphics.RREC&&PIXI.WebGLGraphics.buildRoundedRectangle(g,f);c.lastIndex++}for(d=0;d<c.data.length;d++)f=c.data[d],f.dirty&&f.upload()},PIXI.WebGLGraphics.switchMode=function(a,b){var c;return a.data.length?(c=a.data[a.data.length-1],(c.mode!==b||1===b)&&(c=PIXI.WebGLGraphics.graphicsDataPool.pop()||new PIXI.WebGLGraphicsData(a.gl),c.mode=b,a.data.push(c))):(c=PIXI.WebGLGraphics.graphicsDataPool.pop()||new PIXI.WebGLGraphicsData(a.gl),c.mode=b,a.data.push(c)),c.dirty=!0,c},PIXI.WebGLGraphics.buildRectangle=function(a,b){var c=a.shape,d=c.x,e=c.y,f=c.width,g=c.height;if(a.fill){var h=PIXI.hex2rgb(a.fillColor),i=a.fillAlpha,j=h[0]*i,k=h[1]*i,l=h[2]*i,m=b.points,n=b.indices,o=m.length/6;m.push(d,e),m.push(j,k,l,i),m.push(d+f,e),m.push(j,k,l,i),m.push(d,e+g),m.push(j,k,l,i),m.push(d+f,e+g),m.push(j,k,l,i),n.push(o,o,o+1,o+2,o+3,o+3)}if(a.lineWidth){var p=a.points;a.points=[d,e,d+f,e,d+f,e+g,d,e+g,d,e],PIXI.WebGLGraphics.buildLine(a,b),a.points=p}},PIXI.WebGLGraphics.buildRoundedRectangle=function(a,b){var c=a.shape,d=c.x,e=c.y,f=c.width,g=c.height,h=c.radius,i=[];if(i.push(d,e+h),i=i.concat(PIXI.WebGLGraphics.quadraticBezierCurve(d,e+g-h,d,e+g,d+h,e+g)),i=i.concat(PIXI.WebGLGraphics.quadraticBezierCurve(d+f-h,e+g,d+f,e+g,d+f,e+g-h)),i=i.concat(PIXI.WebGLGraphics.quadraticBezierCurve(d+f,e+h,d+f,e,d+f-h,e)),i=i.concat(PIXI.WebGLGraphics.quadraticBezierCurve(d+h,e,d,e,d,e+h)),a.fill){var j=PIXI.hex2rgb(a.fillColor),k=a.fillAlpha,l=j[0]*k,m=j[1]*k,n=j[2]*k,o=b.points,p=b.indices,q=o.length/6,r=PIXI.EarCut.Triangulate(i,null,2),s=0;for(s=0;s<r.length;s+=3)p.push(r[s]+q),p.push(r[s]+q),p.push(r[s+1]+q),p.push(r[s+2]+q),p.push(r[s+2]+q);for(s=0;s<i.length;s++)o.push(i[s],i[++s],l,m,n,k)}if(a.lineWidth){var t=a.points;a.points=i,PIXI.WebGLGraphics.buildLine(a,b),a.points=t}},PIXI.WebGLGraphics.quadraticBezierCurve=function(a,b,c,d,e,f){function g(a,b,c){var d=b-a;return a+d*c}for(var h,i,j,k,l,m,n=20,o=[],p=0,q=0;n>=q;q++)p=q/n,h=g(a,c,p),i=g(b,d,p),j=g(c,e,p),k=g(d,f,p),l=g(h,j,p),m=g(i,k,p),o.push(l,m);return o},PIXI.WebGLGraphics.buildCircle=function(a,b){var c,d,e=a.shape,f=e.x,g=e.y;a.type===PIXI.Graphics.CIRC?(c=e.radius,d=e.radius):(c=e.width,d=e.height);var h=40,i=2*Math.PI/h,j=0;if(a.fill){var k=PIXI.hex2rgb(a.fillColor),l=a.fillAlpha,m=k[0]*l,n=k[1]*l,o=k[2]*l,p=b.points,q=b.indices,r=p.length/6;for(q.push(r),j=0;h+1>j;j++)p.push(f,g,m,n,o,l),p.push(f+Math.sin(i*j)*c,g+Math.cos(i*j)*d,m,n,o,l),q.push(r++,r++);q.push(r-1)}if(a.lineWidth){var s=a.points;for(a.points=[],j=0;h+1>j;j++)a.points.push(f+Math.sin(i*j)*c,g+Math.cos(i*j)*d);PIXI.WebGLGraphics.buildLine(a,b),a.points=s}},PIXI.WebGLGraphics.buildLine=function(a,b){var c=0,d=a.points;if(0!==d.length){if(a.lineWidth%2)for(c=0;c<d.length;c++)d[c]+=.5;var e=new PIXI.Point(d[0],d[1]),f=new PIXI.Point(d[d.length-2],d[d.length-1]);if(e.x===f.x&&e.y===f.y){d=d.slice(),d.pop(),d.pop(),f=new PIXI.Point(d[d.length-2],d[d.length-1]);var g=f.x+.5*(e.x-f.x),h=f.y+.5*(e.y-f.y);d.unshift(g,h),d.push(g,h)}var i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F=b.points,G=b.indices,H=d.length/2,I=d.length,J=F.length/6,K=a.lineWidth/2,L=PIXI.hex2rgb(a.lineColor),M=a.lineAlpha,N=L[0]*M,O=L[1]*M,P=L[2]*M;for(k=d[0],l=d[1],m=d[2],n=d[3],q=-(l-n),r=k-m,E=Math.sqrt(q*q+r*r),q/=E,r/=E,q*=K,r*=K,F.push(k-q,l-r,N,O,P,M),F.push(k+q,l+r,N,O,P,M),c=1;H-1>c;c++)k=d[2*(c-1)],l=d[2*(c-1)+1],m=d[2*c],n=d[2*c+1],o=d[2*(c+1)],p=d[2*(c+1)+1],q=-(l-n),r=k-m,E=Math.sqrt(q*q+r*r),q/=E,r/=E,q*=K,r*=K,s=-(n-p),t=m-o,E=Math.sqrt(s*s+t*t),s/=E,t/=E,s*=K,t*=K,w=-r+l-(-r+n),x=-q+m-(-q+k),y=(-q+k)*(-r+n)-(-q+m)*(-r+l),z=-t+p-(-t+n),A=-s+m-(-s+o),B=(-s+o)*(-t+n)-(-s+m)*(-t+p),C=w*A-z*x,Math.abs(C)<.1?(C+=10.1,F.push(m-q,n-r,N,O,P,M),F.push(m+q,n+r,N,O,P,M)):(i=(x*B-A*y)/C,j=(z*y-w*B)/C,D=(i-m)*(i-m)+(j-n)+(j-n),D>19600?(u=q-s,v=r-t,E=Math.sqrt(u*u+v*v),u/=E,v/=E,u*=K,v*=K,F.push(m-u,n-v),F.push(N,O,P,M),F.push(m+u,n+v),F.push(N,O,P,M),F.push(m-u,n-v),F.push(N,O,P,M),I++):(F.push(i,j),F.push(N,O,P,M),F.push(m-(i-m),n-(j-n)),F.push(N,O,P,M)));for(k=d[2*(H-2)],l=d[2*(H-2)+1],m=d[2*(H-1)],n=d[2*(H-1)+1],q=-(l-n),r=k-m,E=Math.sqrt(q*q+r*r),q/=E,r/=E,q*=K,r*=K,F.push(m-q,n-r),F.push(N,O,P,M),F.push(m+q,n+r),F.push(N,O,P,M),G.push(J),c=0;I>c;c++)G.push(J++);G.push(J-1)}},PIXI.WebGLGraphics.buildComplexPoly=function(a,b){var c=a.points.slice();if(!(c.length<6)){var d=b.indices;b.points=c,b.alpha=a.fillAlpha,b.color=PIXI.hex2rgb(a.fillColor);for(var e,f,g=1/0,h=-(1/0),i=1/0,j=-(1/0),k=0;k<c.length;k+=2)e=c[k],f=c[k+1],g=g>e?e:g,h=e>h?e:h,i=i>f?f:i,j=f>j?f:j;c.push(g,i,h,i,h,j,g,j);var l=c.length/2;for(k=0;l>k;k++)d.push(k)}},PIXI.WebGLGraphics.buildPoly=function(a,b){var c=a.points;if(!(c.length<6)){var d=b.points,e=b.indices,f=c.length/2,g=PIXI.hex2rgb(a.fillColor),h=a.fillAlpha,i=g[0]*h,j=g[1]*h,k=g[2]*h,l=PIXI.EarCut.Triangulate(c,null,2);if(!l)return!1;var m=d.length/6,n=0;for(n=0;n<l.length;n+=3)e.push(l[n]+m),e.push(l[n]+m),e.push(l[n+1]+m),e.push(l[n+2]+m),e.push(l[n+2]+m);for(n=0;f>n;n++)d.push(c[2*n],c[2*n+1],i,j,k,h);return!0}},PIXI.WebGLGraphics.graphicsDataPool=[],PIXI.WebGLGraphicsData=function(a){this.gl=a,this.color=[0,0,0],this.points=[],this.indices=[],this.buffer=a.createBuffer(),this.indexBuffer=a.createBuffer(),this.mode=1,this.alpha=1,this.dirty=!0},PIXI.WebGLGraphicsData.prototype.reset=function(){this.points=[],this.indices=[]},PIXI.WebGLGraphicsData.prototype.upload=function(){var a=this.gl;this.glPoints=new PIXI.Float32Array(this.points),a.bindBuffer(a.ARRAY_BUFFER,this.buffer),a.bufferData(a.ARRAY_BUFFER,this.glPoints,a.STATIC_DRAW),this.glIndicies=new PIXI.Uint16Array(this.indices),a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,this.indexBuffer),a.bufferData(a.ELEMENT_ARRAY_BUFFER,this.glIndicies,a.STATIC_DRAW),this.dirty=!1},PIXI.CanvasGraphics=function(){},PIXI.CanvasGraphics.renderGraphics=function(a,b){var c=a.worldAlpha;a.dirty&&(this.updateGraphicsTint(a),a.dirty=!1);for(var d=0;d<a.graphicsData.length;d++){var e=a.graphicsData[d],f=e.shape,g=e._fillTint,h=e._lineTint;if(b.lineWidth=e.lineWidth,e.type===PIXI.Graphics.POLY){b.beginPath();var i=f.points;b.moveTo(i[0],i[1]);for(var j=1;j<i.length/2;j++)b.lineTo(i[2*j],i[2*j+1]);f.closed&&b.lineTo(i[0],i[1]),i[0]===i[i.length-2]&&i[1]===i[i.length-1]&&b.closePath(),e.fill&&(b.globalAlpha=e.fillAlpha*c,b.fillStyle="#"+("00000"+(0|g).toString(16)).substr(-6),b.fill()),e.lineWidth&&(b.globalAlpha=e.lineAlpha*c,b.strokeStyle="#"+("00000"+(0|h).toString(16)).substr(-6),b.stroke())}else if(e.type===PIXI.Graphics.RECT)(e.fillColor||0===e.fillColor)&&(b.globalAlpha=e.fillAlpha*c,b.fillStyle="#"+("00000"+(0|g).toString(16)).substr(-6),b.fillRect(f.x,f.y,f.width,f.height)),e.lineWidth&&(b.globalAlpha=e.lineAlpha*c,b.strokeStyle="#"+("00000"+(0|h).toString(16)).substr(-6),b.strokeRect(f.x,f.y,f.width,f.height));else if(e.type===PIXI.Graphics.CIRC)b.beginPath(),b.arc(f.x,f.y,f.radius,0,2*Math.PI),b.closePath(),e.fill&&(b.globalAlpha=e.fillAlpha*c,b.fillStyle="#"+("00000"+(0|g).toString(16)).substr(-6),b.fill()),e.lineWidth&&(b.globalAlpha=e.lineAlpha*c,b.strokeStyle="#"+("00000"+(0|h).toString(16)).substr(-6),b.stroke());else if(e.type===PIXI.Graphics.ELIP){var k=2*f.width,l=2*f.height,m=f.x-k/2,n=f.y-l/2;b.beginPath();var o=.5522848,p=k/2*o,q=l/2*o,r=m+k,s=n+l,t=m+k/2,u=n+l/2;b.moveTo(m,u),b.bezierCurveTo(m,u-q,t-p,n,t,n),b.bezierCurveTo(t+p,n,r,u-q,r,u),b.bezierCurveTo(r,u+q,t+p,s,t,s),b.bezierCurveTo(t-p,s,m,u+q,m,u),b.closePath(),e.fill&&(b.globalAlpha=e.fillAlpha*c,b.fillStyle="#"+("00000"+(0|g).toString(16)).substr(-6),b.fill()),e.lineWidth&&(b.globalAlpha=e.lineAlpha*c,b.strokeStyle="#"+("00000"+(0|h).toString(16)).substr(-6),b.stroke())}else if(e.type===PIXI.Graphics.RREC){var v=f.x,w=f.y,x=f.width,y=f.height,z=f.radius,A=Math.min(x,y)/2|0;z=z>A?A:z,b.beginPath(),b.moveTo(v,w+z),b.lineTo(v,w+y-z),b.quadraticCurveTo(v,w+y,v+z,w+y),b.lineTo(v+x-z,w+y),b.quadraticCurveTo(v+x,w+y,v+x,w+y-z),b.lineTo(v+x,w+z),b.quadraticCurveTo(v+x,w,v+x-z,w),b.lineTo(v+z,w),b.quadraticCurveTo(v,w,v,w+z),b.closePath(),(e.fillColor||0===e.fillColor)&&(b.globalAlpha=e.fillAlpha*c,b.fillStyle="#"+("00000"+(0|g).toString(16)).substr(-6),b.fill()),e.lineWidth&&(b.globalAlpha=e.lineAlpha*c,b.strokeStyle="#"+("00000"+(0|h).toString(16)).substr(-6),b.stroke())}}},PIXI.CanvasGraphics.renderGraphicsMask=function(a,b){var c=a.graphicsData.length;if(0!==c){b.beginPath();for(var d=0;c>d;d++){var e=a.graphicsData[d],f=e.shape;if(e.type===PIXI.Graphics.POLY){var g=f.points;b.moveTo(g[0],g[1]);for(var h=1;h<g.length/2;h++)b.lineTo(g[2*h],g[2*h+1]);g[0]===g[g.length-2]&&g[1]===g[g.length-1]&&b.closePath()}else if(e.type===PIXI.Graphics.RECT)b.rect(f.x,f.y,f.width,f.height),b.closePath();else if(e.type===PIXI.Graphics.CIRC)b.arc(f.x,f.y,f.radius,0,2*Math.PI),b.closePath();else if(e.type===PIXI.Graphics.ELIP){var i=2*f.width,j=2*f.height,k=f.x-i/2,l=f.y-j/2,m=.5522848,n=i/2*m,o=j/2*m,p=k+i,q=l+j,r=k+i/2,s=l+j/2;b.moveTo(k,s),b.bezierCurveTo(k,s-o,r-n,l,r,l),b.bezierCurveTo(r+n,l,p,s-o,p,s),b.bezierCurveTo(p,s+o,r+n,q,r,q),b.bezierCurveTo(r-n,q,k,s+o,k,s),b.closePath()}else if(e.type===PIXI.Graphics.RREC){var t=f.x,u=f.y,v=f.width,w=f.height,x=f.radius,y=Math.min(v,w)/2|0;x=x>y?y:x,b.moveTo(t,u+x),b.lineTo(t,u+w-x),b.quadraticCurveTo(t,u+w,t+x,u+w),b.lineTo(t+v-x,u+w),b.quadraticCurveTo(t+v,u+w,t+v,u+w-x),b.lineTo(t+v,u+x),b.quadraticCurveTo(t+v,u,t+v-x,u),b.lineTo(t+x,u),b.quadraticCurveTo(t,u,t,u+x),b.closePath()}}}},PIXI.CanvasGraphics.updateGraphicsTint=function(a){if(16777215!==a.tint)for(var b=(a.tint>>16&255)/255,c=(a.tint>>8&255)/255,d=(255&a.tint)/255,e=0;e<a.graphicsData.length;e++){var f=a.graphicsData[e],g=0|f.fillColor,h=0|f.lineColor;f._fillTint=((g>>16&255)/255*b*255<<16)+((g>>8&255)/255*c*255<<8)+(255&g)/255*d*255,f._lineTint=((h>>16&255)/255*b*255<<16)+((h>>8&255)/255*c*255<<8)+(255&h)/255*d*255}},c.Graphics=function(a,b,d){void 0===b&&(b=0),void 0===d&&(d=0),this.type=c.GRAPHICS,this.physicsType=c.SPRITE,this.anchor=new c.Point,PIXI.Graphics.call(this),c.Component.Core.init.call(this,a,b,d,"",null)},c.Graphics.prototype=Object.create(PIXI.Graphics.prototype),c.Graphics.prototype.constructor=c.Graphics,c.Component.Core.install.call(c.Graphics.prototype,["Angle","AutoCull","Bounds","Destroy","FixedToCamera","InputEnabled","InWorld","LifeSpan","PhysicsBody","Reset"]),c.Graphics.prototype.preUpdatePhysics=c.Component.PhysicsBody.preUpdate,c.Graphics.prototype.preUpdateLifeSpan=c.Component.LifeSpan.preUpdate,c.Graphics.prototype.preUpdateInWorld=c.Component.InWorld.preUpdate,c.Graphics.prototype.preUpdateCore=c.Component.Core.preUpdate,c.Graphics.prototype.preUpdate=function(){return this.preUpdatePhysics()&&this.preUpdateLifeSpan()&&this.preUpdateInWorld()?this.preUpdateCore():!1},c.Graphics.prototype.destroy=function(a){this.clear(),c.Component.Destroy.prototype.destroy.call(this,a)},c.Graphics.prototype.drawTriangle=function(a,b){void 0===b&&(b=!1);var d=new c.Polygon(a);if(b){var e=new c.Point(this.game.camera.x-a[0].x,this.game.camera.y-a[0].y),f=new c.Point(a[1].x-a[0].x,a[1].y-a[0].y),g=new c.Point(a[1].x-a[2].x,a[1].y-a[2].y),h=g.cross(f);e.dot(h)>0&&this.drawPolygon(d)}else this.drawPolygon(d)},c.Graphics.prototype.drawTriangles=function(a,b,d){void 0===d&&(d=!1);var e,f=new c.Point,g=new c.Point,h=new c.Point,i=[];if(b)if(a[0]instanceof c.Point)for(e=0;e<b.length/3;e++)i.push(a[b[3*e]]),i.push(a[b[3*e+1]]),i.push(a[b[3*e+2]]),3===i.length&&(this.drawTriangle(i,d),i=[]);else for(e=0;e<b.length;e++)f.x=a[2*b[e]],f.y=a[2*b[e]+1],i.push(f.copyTo({})),3===i.length&&(this.drawTriangle(i,d),i=[]);else if(a[0]instanceof c.Point)for(e=0;e<a.length/3;e++)this.drawTriangle([a[3*e],a[3*e+1],a[3*e+2]],d);else for(e=0;e<a.length/6;e++)f.x=a[6*e+0],f.y=a[6*e+1],g.x=a[6*e+2],g.y=a[6*e+3],h.x=a[6*e+4],h.y=a[6*e+5],this.drawTriangle([f,g,h],d)},c.RenderTexture=function(a,b,d,e,f,g){void 0===e&&(e=""),void 0===f&&(f=c.scaleModes.DEFAULT),void 0===g&&(g=1),this.game=a,this.key=e,this.type=c.RENDERTEXTURE,this._tempMatrix=new PIXI.Matrix,PIXI.RenderTexture.call(this,b,d,this.game.renderer,f,g),this.render=c.RenderTexture.prototype.render},c.RenderTexture.prototype=Object.create(PIXI.RenderTexture.prototype),c.RenderTexture.prototype.constructor=c.RenderTexture,c.RenderTexture.prototype.renderXY=function(a,b,c,d){a.updateTransform(),this._tempMatrix.copyFrom(a.worldTransform),this._tempMatrix.tx=b,this._tempMatrix.ty=c,this.renderer.type===PIXI.WEBGL_RENDERER?this.renderWebGL(a,this._tempMatrix,d):this.renderCanvas(a,this._tempMatrix,d)},c.RenderTexture.prototype.renderRawXY=function(a,b,c,d){this._tempMatrix.identity().translate(b,c),this.renderer.type===PIXI.WEBGL_RENDERER?this.renderWebGL(a,this._tempMatrix,d):this.renderCanvas(a,this._tempMatrix,d)},c.RenderTexture.prototype.render=function(a,b,c){void 0===b||null===b?this._tempMatrix.copyFrom(a.worldTransform):this._tempMatrix.copyFrom(b),this.renderer.type===PIXI.WEBGL_RENDERER?this.renderWebGL(a,this._tempMatrix,c):this.renderCanvas(a,this._tempMatrix,c)},c.Text=function(a,b,d,e,f){b=b||0,d=d||0,e=void 0===e||null===e?"":e.toString(),f=c.Utils.extend({},f),this.type=c.TEXT,this.physicsType=c.SPRITE,this.padding=new c.Point,this.textBounds=null,this.canvas=PIXI.CanvasPool.create(this),this.context=this.canvas.getContext("2d"),this.colors=[],this.strokeColors=[],this.fontStyles=[],this.fontWeights=[],this.autoRound=!1,this.useAdvancedWrap=!1,this._res=a.renderer.resolution,this._text=e,this._fontComponents=null,this._lineSpacing=0,this._charCount=0,this._width=0,this._height=0,c.Sprite.call(this,a,b,d,PIXI.Texture.fromCanvas(this.canvas)),this.setStyle(f),""!==e&&this.updateText()},c.Text.prototype=Object.create(c.Sprite.prototype),c.Text.prototype.constructor=c.Text,c.Text.prototype.preUpdate=function(){return this.preUpdatePhysics()&&this.preUpdateLifeSpan()&&this.preUpdateInWorld()?this.preUpdateCore():!1},c.Text.prototype.update=function(){},c.Text.prototype.destroy=function(a){this.texture.destroy(!0),PIXI.CanvasPool.remove(this),c.Component.Destroy.prototype.destroy.call(this,a)},c.Text.prototype.setShadow=function(a,b,c,d,e,f){return void 0===a&&(a=0),void 0===b&&(b=0),void 0===c&&(c="rgba(0, 0, 0, 1)"),void 0===d&&(d=0),void 0===e&&(e=!0),void 0===f&&(f=!0),this.style.shadowOffsetX=a,this.style.shadowOffsetY=b,this.style.shadowColor=c,this.style.shadowBlur=d,this.style.shadowStroke=e,this.style.shadowFill=f,this.dirty=!0,this},c.Text.prototype.setStyle=function(a){a=a||{},a.font=a.font||"bold 20pt Arial",a.backgroundColor=a.backgroundColor||null,a.fill=a.fill||"black",a.align=a.align||"left",a.boundsAlignH=a.boundsAlignH||"left",a.boundsAlignV=a.boundsAlignV||"top",a.stroke=a.stroke||"black",a.strokeThickness=a.strokeThickness||0,a.wordWrap=a.wordWrap||!1,a.wordWrapWidth=a.wordWrapWidth||100,a.maxLines=a.maxLines||0,a.shadowOffsetX=a.shadowOffsetX||0,a.shadowOffsetY=a.shadowOffsetY||0,a.shadowColor=a.shadowColor||"rgba(0,0,0,0)",a.shadowBlur=a.shadowBlur||0,a.tabs=a.tabs||0;var b=this.fontToComponents(a.font);return a.fontStyle&&(b.fontStyle=a.fontStyle),a.fontVariant&&(b.fontVariant=a.fontVariant),a.fontWeight&&(b.fontWeight=a.fontWeight),a.fontSize&&("number"==typeof a.fontSize&&(a.fontSize=a.fontSize+"px"),b.fontSize=a.fontSize),this._fontComponents=b,a.font=this.componentsToFont(this._fontComponents),this.style=a,this.dirty=!0,this},c.Text.prototype.updateText=function(){this.texture.baseTexture.resolution=this._res,this.context.font=this.style.font;var a=this.text;this.style.wordWrap&&(a=this.runWordWrap(this.text));var b=a.split(/(?:\r\n|\r|\n)/),c=this.style.tabs,d=[],e=0,f=this.determineFontProperties(this.style.font),g=b.length;this.style.maxLines>0&&this.style.maxLines<b.length&&(g=this.style.maxLines);for(var h=0;g>h;h++){if(0===c){var i=this.context.measureText(b[h]).width+this.style.strokeThickness+this.padding.x;this.style.wordWrap&&(i-=this.context.measureText(" ").width)}else{var j=b[h].split(/(?:\t)/),i=this.padding.x+this.style.strokeThickness;if(Array.isArray(c))for(var k=0,l=0;l<j.length;l++){var m=Math.ceil(this.context.measureText(j[l]).width);l>0&&(k+=c[l-1]),i=k+m}else for(var l=0;l<j.length;l++){i+=Math.ceil(this.context.measureText(j[l]).width);var n=this.game.math.snapToCeil(i,c)-i;i+=n}}d[h]=Math.ceil(i),e=Math.max(e,d[h])}this.canvas.width=e*this._res;var o=f.fontSize+this.style.strokeThickness+this.padding.y,p=o*g,q=this._lineSpacing;0>q&&Math.abs(q)>o&&(q=-o),0!==q&&(p+=q>0?q*b.length:q*(b.length-1)),this.canvas.height=p*this._res,this.context.scale(this._res,this._res),navigator.isCocoonJS&&this.context.clearRect(0,0,this.canvas.width,this.canvas.height),this.style.backgroundColor&&(this.context.fillStyle=this.style.backgroundColor,this.context.fillRect(0,0,this.canvas.width,this.canvas.height)),this.context.fillStyle=this.style.fill,this.context.font=this.style.font,this.context.strokeStyle=this.style.stroke,this.context.textBaseline="alphabetic",this.context.lineWidth=this.style.strokeThickness,this.context.lineCap="round",this.context.lineJoin="round";var r,s;for(this._charCount=0,h=0;g>h;h++)r=this.style.strokeThickness/2,s=this.style.strokeThickness/2+h*o+f.ascent,h>0&&(s+=q*h),"right"===this.style.align?r+=e-d[h]:"center"===this.style.align&&(r+=(e-d[h])/2),this.autoRound&&(r=Math.round(r),s=Math.round(s)),this.colors.length>0||this.strokeColors.length>0||this.fontWeights.length>0||this.fontStyles.length>0?this.updateLine(b[h],r,s):(this.style.stroke&&this.style.strokeThickness&&(this.updateShadow(this.style.shadowStroke),0===c?this.context.strokeText(b[h],r,s):this.renderTabLine(b[h],r,s,!1)),this.style.fill&&(this.updateShadow(this.style.shadowFill),0===c?this.context.fillText(b[h],r,s):this.renderTabLine(b[h],r,s,!0)));this.updateTexture()},c.Text.prototype.renderTabLine=function(a,b,c,d){var e=a.split(/(?:\t)/),f=this.style.tabs,g=0;if(Array.isArray(f))for(var h=0,i=0;i<e.length;i++)i>0&&(h+=f[i-1]),g=b+h,d?this.context.fillText(e[i],g,c):this.context.strokeText(e[i],g,c);else for(var i=0;i<e.length;i++){var j=Math.ceil(this.context.measureText(e[i]).width);g=this.game.math.snapToCeil(b,f),d?this.context.fillText(e[i],g,c):this.context.strokeText(e[i],g,c),b=g+j}},c.Text.prototype.updateShadow=function(a){a?(this.context.shadowOffsetX=this.style.shadowOffsetX,this.context.shadowOffsetY=this.style.shadowOffsetY,this.context.shadowColor=this.style.shadowColor,this.context.shadowBlur=this.style.shadowBlur):(this.context.shadowOffsetX=0,this.context.shadowOffsetY=0,this.context.shadowColor=0,this.context.shadowBlur=0)},c.Text.prototype.updateLine=function(a,b,c){for(var d=0;d<a.length;d++){
var e=a[d];if(this.fontWeights.length>0||this.fontStyles.length>0){var f=this.fontToComponents(this.context.font);this.fontStyles[this._charCount]&&(f.fontStyle=this.fontStyles[this._charCount]),this.fontWeights[this._charCount]&&(f.fontWeight=this.fontWeights[this._charCount]),this.context.font=this.componentsToFont(f)}this.style.stroke&&this.style.strokeThickness&&(this.strokeColors[this._charCount]&&(this.context.strokeStyle=this.strokeColors[this._charCount]),this.updateShadow(this.style.shadowStroke),this.context.strokeText(e,b,c)),this.style.fill&&(this.colors[this._charCount]&&(this.context.fillStyle=this.colors[this._charCount]),this.updateShadow(this.style.shadowFill),this.context.fillText(e,b,c)),b+=this.context.measureText(e).width,this._charCount++}},c.Text.prototype.clearColors=function(){return this.colors=[],this.strokeColors=[],this.dirty=!0,this},c.Text.prototype.clearFontValues=function(){return this.fontStyles=[],this.fontWeights=[],this.dirty=!0,this},c.Text.prototype.addColor=function(a,b){return this.colors[b]=a,this.dirty=!0,this},c.Text.prototype.addStrokeColor=function(a,b){return this.strokeColors[b]=a,this.dirty=!0,this},c.Text.prototype.addFontStyle=function(a,b){return this.fontStyles[b]=a,this.dirty=!0,this},c.Text.prototype.addFontWeight=function(a,b){return this.fontWeights[b]=a,this.dirty=!0,this},c.Text.prototype.precalculateWordWrap=function(a){this.texture.baseTexture.resolution=this._res,this.context.font=this.style.font;var b=this.runWordWrap(a);return b.split(/(?:\r\n|\r|\n)/)},c.Text.prototype.runWordWrap=function(a){return this.useAdvancedWrap?this.advancedWordWrap(a):this.basicWordWrap(a)},c.Text.prototype.advancedWordWrap=function(a){for(var b=this.context,c=this.style.wordWrapWidth,d="",e=a.replace(/ +/gi," ").split(/\r?\n/gi),f=e.length,g=0;f>g;g++){var h=e[g],i="";h=h.replace(/^ *|\s*$/gi,"");var j=b.measureText(h).width;if(c>j)d+=h+"\n";else{for(var k=c,l=h.split(" "),m=0;m<l.length;m++){var n=l[m],o=n+" ",p=b.measureText(o).width;if(p>k){if(0===m){for(var q=o;q.length&&(q=q.slice(0,-1),p=b.measureText(q).width,!(k>=p)););if(!q.length)throw new Error("This text's wordWrapWidth setting is less than a single character!");var r=n.substr(q.length);l[m]=r,i+=q}var s=l[m].length?m:m+1,t=l.slice(s).join(" ").replace(/[ \n]*$/gi,"");e[g+1]=t+" "+(e[g+1]||""),f=e.length;break}i+=o,k-=p}d+=i.replace(/[ \n]*$/gi,"")+"\n"}}return d=d.replace(/[\s|\n]*$/gi,"")},c.Text.prototype.basicWordWrap=function(a){for(var b="",c=a.split("\n"),d=0;d<c.length;d++){for(var e=this.style.wordWrapWidth,f=c[d].split(" "),g=0;g<f.length;g++){var h=this.context.measureText(f[g]).width,i=h+this.context.measureText(" ").width;i>e?(g>0&&(b+="\n"),b+=f[g]+" ",e=this.style.wordWrapWidth-h):(e-=i,b+=f[g]+" ")}d<c.length-1&&(b+="\n")}return b},c.Text.prototype.updateFont=function(a){var b=this.componentsToFont(a);this.style.font!==b&&(this.style.font=b,this.dirty=!0,this.parent&&this.updateTransform())},c.Text.prototype.fontToComponents=function(a){var b=a.match(/^\s*(?:\b(normal|italic|oblique|inherit)?\b)\s*(?:\b(normal|small-caps|inherit)?\b)\s*(?:\b(normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900|inherit)?\b)\s*(?:\b(xx-small|x-small|small|medium|large|x-large|xx-large|larger|smaller|0|\d*(?:[.]\d*)?(?:%|[a-z]{2,5}))?\b)\s*(.*)\s*$/);if(b){var c=b[5].trim();return/^(?:inherit|serif|sans-serif|cursive|fantasy|monospace)$/.exec(c)||/['",]/.exec(c)||(c="'"+c+"'"),{font:a,fontStyle:b[1]||"normal",fontVariant:b[2]||"normal",fontWeight:b[3]||"normal",fontSize:b[4]||"medium",fontFamily:c}}return console.warn("Phaser.Text - unparsable CSS font: "+a),{font:a}},c.Text.prototype.componentsToFont=function(a){var b,c=[];return b=a.fontStyle,b&&"normal"!==b&&c.push(b),b=a.fontVariant,b&&"normal"!==b&&c.push(b),b=a.fontWeight,b&&"normal"!==b&&c.push(b),b=a.fontSize,b&&"medium"!==b&&c.push(b),b=a.fontFamily,b&&c.push(b),c.length||c.push(a.font),c.join(" ")},c.Text.prototype.setText=function(a){return this.text=a.toString()||"",this.dirty=!0,this},c.Text.prototype.parseList=function(a){if(!Array.isArray(a))return this;for(var b="",c=0;c<a.length;c++)Array.isArray(a[c])?(b+=a[c].join("	"),c<a.length-1&&(b+="\n")):(b+=a[c],c<a.length-1&&(b+="	"));return this.text=b,this.dirty=!0,this},c.Text.prototype.setTextBounds=function(a,b,d,e){return void 0===a?this.textBounds=null:(this.textBounds?this.textBounds.setTo(a,b,d,e):this.textBounds=new c.Rectangle(a,b,d,e),this.style.wordWrapWidth>d&&(this.style.wordWrapWidth=d)),this.updateTexture(),this},c.Text.prototype.updateTexture=function(){var a=this.texture.baseTexture,b=this.texture.crop,c=this.texture.frame,d=this.canvas.width,e=this.canvas.height;if(a.width=d,a.height=e,b.width=d,b.height=e,c.width=d,c.height=e,this.texture.width=d,this.texture.height=e,this._width=d,this._height=e,this.textBounds){var f=this.textBounds.x,g=this.textBounds.y;"right"===this.style.boundsAlignH?f+=this.textBounds.width-this.canvas.width:"center"===this.style.boundsAlignH&&(f+=this.textBounds.halfWidth-this.canvas.width/2),"bottom"===this.style.boundsAlignV?g+=this.textBounds.height-this.canvas.height:"middle"===this.style.boundsAlignV&&(g+=this.textBounds.halfHeight-this.canvas.height/2),this.pivot.x=-f,this.pivot.y=-g}this.renderable=0!==d&&0!==e,this.texture.requiresReTint=!0,this.texture.baseTexture.dirty()},c.Text.prototype._renderWebGL=function(a){this.dirty&&(this.updateText(),this.dirty=!1),PIXI.Sprite.prototype._renderWebGL.call(this,a)},c.Text.prototype._renderCanvas=function(a){this.dirty&&(this.updateText(),this.dirty=!1),PIXI.Sprite.prototype._renderCanvas.call(this,a)},c.Text.prototype.determineFontProperties=function(a){var b=c.Text.fontPropertiesCache[a];if(!b){b={};var d=c.Text.fontPropertiesCanvas,e=c.Text.fontPropertiesContext;e.font=a;var f=Math.ceil(e.measureText("|MÉq").width),g=Math.ceil(e.measureText("|MÉq").width),h=2*g;if(g=1.4*g|0,d.width=f,d.height=h,e.fillStyle="#f00",e.fillRect(0,0,f,h),e.font=a,e.textBaseline="alphabetic",e.fillStyle="#000",e.fillText("|MÉq",0,g),!e.getImageData(0,0,f,h))return b.ascent=g,b.descent=g+6,b.fontSize=b.ascent+b.descent,c.Text.fontPropertiesCache[a]=b,b;var i,j,k=e.getImageData(0,0,f,h).data,l=k.length,m=4*f,n=0,o=!1;for(i=0;g>i;i++){for(j=0;m>j;j+=4)if(255!==k[n+j]){o=!0;break}if(o)break;n+=m}for(b.ascent=g-i,n=l-m,o=!1,i=h;i>g;i--){for(j=0;m>j;j+=4)if(255!==k[n+j]){o=!0;break}if(o)break;n-=m}b.descent=i-g,b.descent+=6,b.fontSize=b.ascent+b.descent,c.Text.fontPropertiesCache[a]=b}return b},c.Text.prototype.getBounds=function(a){return this.dirty&&(this.updateText(),this.dirty=!1),PIXI.Sprite.prototype.getBounds.call(this,a)},Object.defineProperty(c.Text.prototype,"text",{get:function(){return this._text},set:function(a){a!==this._text&&(this._text=a.toString()||"",this.dirty=!0,this.parent&&this.updateTransform())}}),Object.defineProperty(c.Text.prototype,"cssFont",{get:function(){return this.componentsToFont(this._fontComponents)},set:function(a){a=a||"bold 20pt Arial",this._fontComponents=this.fontToComponents(a),this.updateFont(this._fontComponents)}}),Object.defineProperty(c.Text.prototype,"font",{get:function(){return this._fontComponents.fontFamily},set:function(a){a=a||"Arial",a=a.trim(),/^(?:inherit|serif|sans-serif|cursive|fantasy|monospace)$/.exec(a)||/['",]/.exec(a)||(a="'"+a+"'"),this._fontComponents.fontFamily=a,this.updateFont(this._fontComponents)}}),Object.defineProperty(c.Text.prototype,"fontSize",{get:function(){var a=this._fontComponents.fontSize;return a&&/(?:^0$|px$)/.exec(a)?parseInt(a,10):a},set:function(a){a=a||"0","number"==typeof a&&(a+="px"),this._fontComponents.fontSize=a,this.updateFont(this._fontComponents)}}),Object.defineProperty(c.Text.prototype,"fontWeight",{get:function(){return this._fontComponents.fontWeight||"normal"},set:function(a){a=a||"normal",this._fontComponents.fontWeight=a,this.updateFont(this._fontComponents)}}),Object.defineProperty(c.Text.prototype,"fontStyle",{get:function(){return this._fontComponents.fontStyle||"normal"},set:function(a){a=a||"normal",this._fontComponents.fontStyle=a,this.updateFont(this._fontComponents)}}),Object.defineProperty(c.Text.prototype,"fontVariant",{get:function(){return this._fontComponents.fontVariant||"normal"},set:function(a){a=a||"normal",this._fontComponents.fontVariant=a,this.updateFont(this._fontComponents)}}),Object.defineProperty(c.Text.prototype,"fill",{get:function(){return this.style.fill},set:function(a){a!==this.style.fill&&(this.style.fill=a,this.dirty=!0)}}),Object.defineProperty(c.Text.prototype,"align",{get:function(){return this.style.align},set:function(a){a!==this.style.align&&(this.style.align=a,this.dirty=!0)}}),Object.defineProperty(c.Text.prototype,"resolution",{get:function(){return this._res},set:function(a){a!==this._res&&(this._res=a,this.dirty=!0)}}),Object.defineProperty(c.Text.prototype,"tabs",{get:function(){return this.style.tabs},set:function(a){a!==this.style.tabs&&(this.style.tabs=a,this.dirty=!0)}}),Object.defineProperty(c.Text.prototype,"boundsAlignH",{get:function(){return this.style.boundsAlignH},set:function(a){a!==this.style.boundsAlignH&&(this.style.boundsAlignH=a,this.dirty=!0)}}),Object.defineProperty(c.Text.prototype,"boundsAlignV",{get:function(){return this.style.boundsAlignV},set:function(a){a!==this.style.boundsAlignV&&(this.style.boundsAlignV=a,this.dirty=!0)}}),Object.defineProperty(c.Text.prototype,"stroke",{get:function(){return this.style.stroke},set:function(a){a!==this.style.stroke&&(this.style.stroke=a,this.dirty=!0)}}),Object.defineProperty(c.Text.prototype,"strokeThickness",{get:function(){return this.style.strokeThickness},set:function(a){a!==this.style.strokeThickness&&(this.style.strokeThickness=a,this.dirty=!0)}}),Object.defineProperty(c.Text.prototype,"wordWrap",{get:function(){return this.style.wordWrap},set:function(a){a!==this.style.wordWrap&&(this.style.wordWrap=a,this.dirty=!0)}}),Object.defineProperty(c.Text.prototype,"wordWrapWidth",{get:function(){return this.style.wordWrapWidth},set:function(a){a!==this.style.wordWrapWidth&&(this.style.wordWrapWidth=a,this.dirty=!0)}}),Object.defineProperty(c.Text.prototype,"lineSpacing",{get:function(){return this._lineSpacing},set:function(a){a!==this._lineSpacing&&(this._lineSpacing=parseFloat(a),this.dirty=!0,this.parent&&this.updateTransform())}}),Object.defineProperty(c.Text.prototype,"shadowOffsetX",{get:function(){return this.style.shadowOffsetX},set:function(a){a!==this.style.shadowOffsetX&&(this.style.shadowOffsetX=a,this.dirty=!0)}}),Object.defineProperty(c.Text.prototype,"shadowOffsetY",{get:function(){return this.style.shadowOffsetY},set:function(a){a!==this.style.shadowOffsetY&&(this.style.shadowOffsetY=a,this.dirty=!0)}}),Object.defineProperty(c.Text.prototype,"shadowColor",{get:function(){return this.style.shadowColor},set:function(a){a!==this.style.shadowColor&&(this.style.shadowColor=a,this.dirty=!0)}}),Object.defineProperty(c.Text.prototype,"shadowBlur",{get:function(){return this.style.shadowBlur},set:function(a){a!==this.style.shadowBlur&&(this.style.shadowBlur=a,this.dirty=!0)}}),Object.defineProperty(c.Text.prototype,"shadowStroke",{get:function(){return this.style.shadowStroke},set:function(a){a!==this.style.shadowStroke&&(this.style.shadowStroke=a,this.dirty=!0)}}),Object.defineProperty(c.Text.prototype,"shadowFill",{get:function(){return this.style.shadowFill},set:function(a){a!==this.style.shadowFill&&(this.style.shadowFill=a,this.dirty=!0)}}),Object.defineProperty(c.Text.prototype,"width",{get:function(){return this.dirty&&(this.updateText(),this.dirty=!1),this.scale.x*this.texture.frame.width},set:function(a){this.scale.x=a/this.texture.frame.width,this._width=a}}),Object.defineProperty(c.Text.prototype,"height",{get:function(){return this.dirty&&(this.updateText(),this.dirty=!1),this.scale.y*this.texture.frame.height},set:function(a){this.scale.y=a/this.texture.frame.height,this._height=a}}),c.Text.fontPropertiesCache={},c.Text.fontPropertiesCanvas=PIXI.CanvasPool.create(c.Text.fontPropertiesCanvas),c.Text.fontPropertiesContext=c.Text.fontPropertiesCanvas.getContext("2d"),c.BitmapText=function(a,b,d,e,f,g,h){b=b||0,d=d||0,e=e||"",f=f||"",g=g||32,h=h||"left",PIXI.DisplayObjectContainer.call(this),this.type=c.BITMAPTEXT,this.physicsType=c.SPRITE,this.textWidth=0,this.textHeight=0,this.anchor=new c.Point,this._prevAnchor=new c.Point,this._glyphs=[],this._maxWidth=0,this._text=f.toString()||"",this._data=a.cache.getBitmapFont(e),this._font=e,this._fontSize=g,this._align=h,this._tint=16777215,this.updateText(),this.dirty=!1,c.Component.Core.init.call(this,a,b,d,"",null)},c.BitmapText.prototype=Object.create(PIXI.DisplayObjectContainer.prototype),c.BitmapText.prototype.constructor=c.BitmapText,c.Component.Core.install.call(c.BitmapText.prototype,["Angle","AutoCull","Bounds","Destroy","FixedToCamera","InputEnabled","InWorld","LifeSpan","PhysicsBody","Reset"]),c.BitmapText.prototype.preUpdatePhysics=c.Component.PhysicsBody.preUpdate,c.BitmapText.prototype.preUpdateLifeSpan=c.Component.LifeSpan.preUpdate,c.BitmapText.prototype.preUpdateInWorld=c.Component.InWorld.preUpdate,c.BitmapText.prototype.preUpdateCore=c.Component.Core.preUpdate,c.BitmapText.prototype.preUpdate=function(){return this.preUpdatePhysics()&&this.preUpdateLifeSpan()&&this.preUpdateInWorld()?this.preUpdateCore():!1},c.BitmapText.prototype.postUpdate=function(){c.Component.PhysicsBody.postUpdate.call(this),c.Component.FixedToCamera.postUpdate.call(this),this.body&&this.body.type===c.Physics.ARCADE&&(this.textWidth!==this.body.sourceWidth||this.textHeight!==this.body.sourceHeight)&&this.body.setSize(this.textWidth,this.textHeight)},c.BitmapText.prototype.setText=function(a){this.text=a},c.BitmapText.prototype.scanLine=function(a,b,c){for(var d=0,e=0,f=-1,g=null,h=this._maxWidth>0?this._maxWidth:null,i=[],j=0;j<c.length;j++){var k=j===c.length-1?!0:!1;if(/(?:\r\n|\r|\n)/.test(c.charAt(j)))return{width:e,text:c.substr(0,j),end:k,chars:i};var l=c.charCodeAt(j),m=a.chars[l],n=0;void 0===m&&(l=32,m=a.chars[l]);var o=g&&m.kerning[g]?m.kerning[g]:0;if(f=/(\s)/.test(c.charAt(j))?j:f,n=(o+m.texture.width+m.xOffset)*b,h&&e+n>=h&&f>-1)return{width:e,text:c.substr(0,j-(j-f)),end:k,chars:i};e+=(m.xAdvance+o)*b,i.push(d+(m.xOffset+o)*b),d+=(m.xAdvance+o)*b,g=l}return{width:e,text:c,end:k,chars:i}},c.BitmapText.prototype.cleanText=function(a,b){void 0===b&&(b="");var c=this._data.font;if(!c)return"";for(var d=/\r\n|\n\r|\n|\r/g,e=a.replace(d,"\n").split("\n"),f=0;f<e.length;f++){for(var g="",h=e[f],i=0;i<h.length;i++)g=c.chars[h.charCodeAt(i)]?g.concat(h[i]):g.concat(b);e[f]=g}return e.join("\n")},c.BitmapText.prototype.updateText=function(){var a=this._data.font;if(a){var b=this.text,c=this._fontSize/a.size,d=[],e=0;this.textWidth=0;do{var f=this.scanLine(a,c,b);f.y=e,d.push(f),f.width>this.textWidth&&(this.textWidth=f.width),e+=a.lineHeight*c,b=b.substr(f.text.length+1)}while(f.end===!1);this.textHeight=e;for(var g=0,h=0,i=this.textWidth*this.anchor.x,j=this.textHeight*this.anchor.y,k=0;k<d.length;k++){var f=d[k];"right"===this._align?h=this.textWidth-f.width:"center"===this._align&&(h=(this.textWidth-f.width)/2);for(var l=0;l<f.text.length;l++){var m=f.text.charCodeAt(l),n=a.chars[m];void 0===n&&(m=32,n=a.chars[m]);var o=this._glyphs[g];o?o.texture=n.texture:(o=new PIXI.Sprite(n.texture),o.name=f.text[l],this._glyphs.push(o)),o.position.x=f.chars[l]+h-i,o.position.y=f.y+n.yOffset*c-j,o.scale.set(c),o.tint=this.tint,o.texture.requiresReTint=!0,o.parent||this.addChild(o),g++}}for(k=g;k<this._glyphs.length;k++)this.removeChild(this._glyphs[k])}},c.BitmapText.prototype.purgeGlyphs=function(){for(var a=this._glyphs.length,b=[],c=0;c<this._glyphs.length;c++)this._glyphs[c].parent!==this?this._glyphs[c].destroy():b.push(this._glyphs[c]);return this._glyphs=[],this._glyphs=b,this.updateText(),a-b.length},c.BitmapText.prototype.updateTransform=function(){(this.dirty||!this.anchor.equals(this._prevAnchor))&&(this.updateText(),this.dirty=!1,this._prevAnchor.copyFrom(this.anchor)),PIXI.DisplayObjectContainer.prototype.updateTransform.call(this)},Object.defineProperty(c.BitmapText.prototype,"align",{get:function(){return this._align},set:function(a){a===this._align||"left"!==a&&"center"!==a&&"right"!==a||(this._align=a,this.updateText())}}),Object.defineProperty(c.BitmapText.prototype,"tint",{get:function(){return this._tint},set:function(a){a!==this._tint&&(this._tint=a,this.updateText())}}),Object.defineProperty(c.BitmapText.prototype,"font",{get:function(){return this._font},set:function(a){a!==this._font&&(this._font=a.trim(),this._data=this.game.cache.getBitmapFont(this._font),this.updateText())}}),Object.defineProperty(c.BitmapText.prototype,"fontSize",{get:function(){return this._fontSize},set:function(a){a=parseInt(a,10),a!==this._fontSize&&a>0&&(this._fontSize=a,this.updateText())}}),Object.defineProperty(c.BitmapText.prototype,"text",{get:function(){return this._text},set:function(a){a!==this._text&&(this._text=a.toString()||"",this.updateText())}}),Object.defineProperty(c.BitmapText.prototype,"maxWidth",{get:function(){return this._maxWidth},set:function(a){a!==this._maxWidth&&(this._maxWidth=a,this.updateText())}}),Object.defineProperty(c.BitmapText.prototype,"smoothed",{get:function(){return!this._data.base.scaleMode},set:function(a){a?this._data.base.scaleMode=0:this._data.base.scaleMode=1}}),c.RetroFont=function(a,b,d,e,f,g,h,i,j,k){if(!a.cache.checkImageKey(b))return!1;(void 0===g||null===g)&&(g=a.cache.getImage(b).width/d),this.characterWidth=d,this.characterHeight=e,this.characterSpacingX=h||0,this.characterSpacingY=i||0,this.characterPerRow=g,this.offsetX=j||0,this.offsetY=k||0,this.align="left",this.multiLine=!1,this.autoUpperCase=!0,this.customSpacingX=0,this.customSpacingY=0,this.fixedWidth=0,this.fontSet=a.cache.getImage(b),this._text="",this.grabData=[],this.frameData=new c.FrameData;for(var l=this.offsetX,m=this.offsetY,n=0,o=0;o<f.length;o++){var p=this.frameData.addFrame(new c.Frame(o,l,m,this.characterWidth,this.characterHeight));this.grabData[f.charCodeAt(o)]=p.index,n++,n===this.characterPerRow?(n=0,l=this.offsetX,m+=this.characterHeight+this.characterSpacingY):l+=this.characterWidth+this.characterSpacingX}a.cache.updateFrameData(b,this.frameData),this.stamp=new c.Image(a,0,0,b,0),c.RenderTexture.call(this,a,100,100,"",c.scaleModes.NEAREST),this.type=c.RETROFONT},c.RetroFont.prototype=Object.create(c.RenderTexture.prototype),c.RetroFont.prototype.constructor=c.RetroFont,c.RetroFont.ALIGN_LEFT="left",c.RetroFont.ALIGN_RIGHT="right",c.RetroFont.ALIGN_CENTER="center",c.RetroFont.TEXT_SET1=" !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~",c.RetroFont.TEXT_SET2=" !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ",c.RetroFont.TEXT_SET3="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ",c.RetroFont.TEXT_SET4="ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789",c.RetroFont.TEXT_SET5="ABCDEFGHIJKLMNOPQRSTUVWXYZ.,/() '!?-*:0123456789",c.RetroFont.TEXT_SET6="ABCDEFGHIJKLMNOPQRSTUVWXYZ!?:;0123456789\"(),-.' ",c.RetroFont.TEXT_SET7="AGMSY+:4BHNTZ!;5CIOU.?06DJPV,(17EKQW\")28FLRX-'39",c.RetroFont.TEXT_SET8="0123456789 .ABCDEFGHIJKLMNOPQRSTUVWXYZ",c.RetroFont.TEXT_SET9="ABCDEFGHIJKLMNOPQRSTUVWXYZ()-0123456789.:,'\"?!",c.RetroFont.TEXT_SET10="ABCDEFGHIJKLMNOPQRSTUVWXYZ",c.RetroFont.TEXT_SET11="ABCDEFGHIJKLMNOPQRSTUVWXYZ.,\"-+!?()':;0123456789",c.RetroFont.prototype.setFixedWidth=function(a,b){void 0===b&&(b="left"),this.fixedWidth=a,this.align=b},c.RetroFont.prototype.setText=function(a,b,c,d,e,f){this.multiLine=b||!1,this.customSpacingX=c||0,this.customSpacingY=d||0,this.align=e||"left",f?this.autoUpperCase=!1:this.autoUpperCase=!0,a.length>0&&(this.text=a)},c.RetroFont.prototype.buildRetroFontText=function(){var a=0,b=0;if(this.clear(),this.multiLine){var d=this._text.split("\n");this.fixedWidth>0?this.resize(this.fixedWidth,d.length*(this.characterHeight+this.customSpacingY)-this.customSpacingY,!0):this.resize(this.getLongestLine()*(this.characterWidth+this.customSpacingX),d.length*(this.characterHeight+this.customSpacingY)-this.customSpacingY,!0);for(var e=0;e<d.length;e++)a=0,this.align===c.RetroFont.ALIGN_RIGHT?a=this.width-d[e].length*(this.characterWidth+this.customSpacingX):this.align===c.RetroFont.ALIGN_CENTER&&(a=this.width/2-d[e].length*(this.characterWidth+this.customSpacingX)/2,a+=this.customSpacingX/2),0>a&&(a=0),this.pasteLine(d[e],a,b,this.customSpacingX),b+=this.characterHeight+this.customSpacingY}else this.fixedWidth>0?this.resize(this.fixedWidth,this.characterHeight,!0):this.resize(this._text.length*(this.characterWidth+this.customSpacingX),this.characterHeight,!0),a=0,this.align===c.RetroFont.ALIGN_RIGHT?a=this.width-this._text.length*(this.characterWidth+this.customSpacingX):this.align===c.RetroFont.ALIGN_CENTER&&(a=this.width/2-this._text.length*(this.characterWidth+this.customSpacingX)/2,a+=this.customSpacingX/2),0>a&&(a=0),this.pasteLine(this._text,a,0,this.customSpacingX);this.requiresReTint=!0},c.RetroFont.prototype.pasteLine=function(a,b,c,d){for(var e=0;e<a.length;e++)if(" "===a.charAt(e))b+=this.characterWidth+d;else if(this.grabData[a.charCodeAt(e)]>=0&&(this.stamp.frame=this.grabData[a.charCodeAt(e)],this.renderXY(this.stamp,b,c,!1),b+=this.characterWidth+d,b>this.width))break},c.RetroFont.prototype.getLongestLine=function(){var a=0;if(this._text.length>0)for(var b=this._text.split("\n"),c=0;c<b.length;c++)b[c].length>a&&(a=b[c].length);return a},c.RetroFont.prototype.removeUnsupportedCharacters=function(a){for(var b="",c=0;c<this._text.length;c++){var d=this._text[c],e=d.charCodeAt(0);(this.grabData[e]>=0||!a&&"\n"===d)&&(b=b.concat(d))}return b},c.RetroFont.prototype.updateOffset=function(a,b){if(this.offsetX!==a||this.offsetY!==b){for(var c=a-this.offsetX,d=b-this.offsetY,e=this.game.cache.getFrameData(this.stamp.key).getFrames(),f=e.length;f--;)e[f].x+=c,e[f].y+=d;this.buildRetroFontText()}},Object.defineProperty(c.RetroFont.prototype,"text",{get:function(){return this._text},set:function(a){var b;b=this.autoUpperCase?a.toUpperCase():a,b!==this._text&&(this._text=b,this.removeUnsupportedCharacters(this.multiLine),this.buildRetroFontText())}}),Object.defineProperty(c.RetroFont.prototype,"smoothed",{get:function(){return this.stamp.smoothed},set:function(a){this.stamp.smoothed=a,this.buildRetroFontText()}}),c.Rope=function(a,b,d,e,f,g){this.points=[],this.points=g,this._hasUpdateAnimation=!1,this._updateAnimationCallback=null,b=b||0,d=d||0,e=e||null,f=f||null,this.type=c.ROPE,PIXI.Rope.call(this,PIXI.TextureCache.__default,this.points),c.Component.Core.init.call(this,a,b,d,e,f)},c.Rope.prototype=Object.create(PIXI.Rope.prototype),c.Rope.prototype.constructor=c.Rope,c.Component.Core.install.call(c.Rope.prototype,["Angle","Animation","AutoCull","Bounds","BringToTop","Crop","Delta","Destroy","FixedToCamera","InWorld","LifeSpan","LoadTexture","Overlap","PhysicsBody","Reset","ScaleMinMax","Smoothed"]),c.Rope.prototype.preUpdatePhysics=c.Component.PhysicsBody.preUpdate,c.Rope.prototype.preUpdateLifeSpan=c.Component.LifeSpan.preUpdate,c.Rope.prototype.preUpdateInWorld=c.Component.InWorld.preUpdate,c.Rope.prototype.preUpdateCore=c.Component.Core.preUpdate,c.Rope.prototype.preUpdate=function(){return this.preUpdatePhysics()&&this.preUpdateLifeSpan()&&this.preUpdateInWorld()?this.preUpdateCore():!1},c.Rope.prototype.update=function(){this._hasUpdateAnimation&&this.updateAnimation.call(this)},c.Rope.prototype.reset=function(a,b){return c.Component.Reset.prototype.reset.call(this,a,b),this},Object.defineProperty(c.Rope.prototype,"updateAnimation",{get:function(){return this._updateAnimation},set:function(a){a&&"function"==typeof a?(this._hasUpdateAnimation=!0,this._updateAnimation=a):(this._hasUpdateAnimation=!1,this._updateAnimation=null)}}),Object.defineProperty(c.Rope.prototype,"segments",{get:function(){for(var a,b,d,e,f,g,h,i,j=[],k=0;k<this.points.length;k++)a=4*k,b=this.vertices[a]*this.scale.x,d=this.vertices[a+1]*this.scale.y,e=this.vertices[a+4]*this.scale.x,f=this.vertices[a+3]*this.scale.y,g=c.Math.difference(b,e),h=c.Math.difference(d,f),b+=this.world.x,d+=this.world.y,i=new c.Rectangle(b,d,g,h),j.push(i);return j}}),c.TileSprite=function(a,b,d,e,f,g,h){b=b||0,d=d||0,e=e||256,f=f||256,g=g||null,h=h||null,this.type=c.TILESPRITE,this.physicsType=c.SPRITE,this._scroll=new c.Point;var i=a.cache.getImage("__default",!0);PIXI.TilingSprite.call(this,new PIXI.Texture(i.base),e,f),c.Component.Core.init.call(this,a,b,d,g,h)},c.TileSprite.prototype=Object.create(PIXI.TilingSprite.prototype),c.TileSprite.prototype.constructor=c.TileSprite,c.Component.Core.install.call(c.TileSprite.prototype,["Angle","Animation","AutoCull","Bounds","BringToTop","Destroy","FixedToCamera","Health","InCamera","InputEnabled","InWorld","LifeSpan","LoadTexture","Overlap","PhysicsBody","Reset","Smoothed"]),c.TileSprite.prototype.preUpdatePhysics=c.Component.PhysicsBody.preUpdate,c.TileSprite.prototype.preUpdateLifeSpan=c.Component.LifeSpan.preUpdate,c.TileSprite.prototype.preUpdateInWorld=c.Component.InWorld.preUpdate,c.TileSprite.prototype.preUpdateCore=c.Component.Core.preUpdate,c.TileSprite.prototype.preUpdate=function(){return 0!==this._scroll.x&&(this.tilePosition.x+=this._scroll.x*this.game.time.physicsElapsed),0!==this._scroll.y&&(this.tilePosition.y+=this._scroll.y*this.game.time.physicsElapsed),this.preUpdatePhysics()&&this.preUpdateLifeSpan()&&this.preUpdateInWorld()?this.preUpdateCore():!1},c.TileSprite.prototype.autoScroll=function(a,b){this._scroll.set(a,b)},c.TileSprite.prototype.stopScroll=function(){this._scroll.set(0,0)},c.TileSprite.prototype.destroy=function(a){c.Component.Destroy.prototype.destroy.call(this,a),PIXI.TilingSprite.prototype.destroy.call(this)},c.TileSprite.prototype.reset=function(a,b){return c.Component.Reset.prototype.reset.call(this,a,b),this.tilePosition.x=0,this.tilePosition.y=0,this},c.Device=function(){this.deviceReadyAt=0,this.initialized=!1,this.desktop=!1,this.iOS=!1,this.iOSVersion=0,this.cocoonJS=!1,this.cocoonJSApp=!1,this.cordova=!1,this.node=!1,this.nodeWebkit=!1,this.electron=!1,this.ejecta=!1,this.crosswalk=!1,this.android=!1,this.chromeOS=!1,this.linux=!1,this.macOS=!1,this.windows=!1,this.windowsPhone=!1,this.canvas=!1,this.canvasBitBltShift=null,this.webGL=!1,this.file=!1,this.fileSystem=!1,this.localStorage=!1,this.worker=!1,this.css3D=!1,this.pointerLock=!1,this.typedArray=!1,this.vibration=!1,this.getUserMedia=!0,this.quirksMode=!1,this.touch=!1,this.mspointer=!1,this.wheelEvent=null,this.arora=!1,this.chrome=!1,this.chromeVersion=0,this.epiphany=!1,this.firefox=!1,this.firefoxVersion=0,this.ie=!1,this.ieVersion=0,this.trident=!1,this.tridentVersion=0,this.edge=!1,this.mobileSafari=!1,this.midori=!1,this.opera=!1,this.safari=!1,this.safariVersion=0,this.webApp=!1,this.silk=!1,this.audioData=!1,this.webAudio=!1,this.ogg=!1,this.opus=!1,this.mp3=!1,this.wav=!1,this.m4a=!1,this.webm=!1,this.dolby=!1,this.oggVideo=!1,this.h264Video=!1,this.mp4Video=!1,this.webmVideo=!1,this.vp9Video=!1,this.hlsVideo=!1,this.iPhone=!1,this.iPhone4=!1,this.iPad=!1,this.pixelRatio=0,this.littleEndian=!1,this.LITTLE_ENDIAN=!1,this.support32bit=!1,this.fullscreen=!1,this.requestFullscreen="",this.cancelFullscreen="",this.fullscreenKeyboard=!1},c.Device=new c.Device,c.Device.onInitialized=new c.Signal,c.Device.whenReady=function(a,b,c){var d=this._readyCheck;if(this.deviceReadyAt||!d)a.call(b,this);else if(d._monitor||c)d._queue=d._queue||[],d._queue.push([a,b]);else{d._monitor=d.bind(this),d._queue=d._queue||[],d._queue.push([a,b]);var e="undefined"!=typeof window.cordova,f=navigator.isCocoonJS;"complete"===document.readyState||"interactive"===document.readyState?window.setTimeout(d._monitor,0):e&&!f?document.addEventListener("deviceready",d._monitor,!1):(document.addEventListener("DOMContentLoaded",d._monitor,!1),window.addEventListener("load",d._monitor,!1))}},c.Device._readyCheck=function(){var a=this._readyCheck;if(document.body){if(!this.deviceReadyAt){this.deviceReadyAt=Date.now(),document.removeEventListener("deviceready",a._monitor),document.removeEventListener("DOMContentLoaded",a._monitor),window.removeEventListener("load",a._monitor),this._initialize(),this.initialized=!0,this.onInitialized.dispatch(this);for(var b;b=a._queue.shift();){var c=b[0],d=b[1];c.call(d,this)}this._readyCheck=null,this._initialize=null,this.onInitialized=null}}else window.setTimeout(a._monitor,20)},c.Device._initialize=function(){function a(){var a=navigator.userAgent;/Playstation Vita/.test(a)?l.vita=!0:/Kindle/.test(a)||/\bKF[A-Z][A-Z]+/.test(a)||/Silk.*Mobile Safari/.test(a)?l.kindle=!0:/Android/.test(a)?l.android=!0:/CrOS/.test(a)?l.chromeOS=!0:/iP[ao]d|iPhone/i.test(a)?(l.iOS=!0,navigator.appVersion.match(/OS (\d+)/),l.iOSVersion=parseInt(RegExp.$1,10)):/Linux/.test(a)?l.linux=!0:/Mac OS/.test(a)?l.macOS=!0:/Windows/.test(a)&&(l.windows=!0),(/Windows Phone/i.test(a)||/IEMobile/i.test(a))&&(l.android=!1,l.iOS=!1,l.macOS=!1,l.windows=!0,l.windowsPhone=!0);var b=/Silk/.test(a);(l.windows||l.macOS||l.linux&&!b||l.chromeOS)&&(l.desktop=!0),(l.windowsPhone||/Windows NT/i.test(a)&&/Touch/i.test(a))&&(l.desktop=!1)}function b(){l.canvas=!!window.CanvasRenderingContext2D||l.cocoonJS;try{l.localStorage=!!localStorage.getItem}catch(a){l.localStorage=!1}l.file=!!(window.File&&window.FileReader&&window.FileList&&window.Blob),l.fileSystem=!!window.requestFileSystem,l.webGL=function(){try{var a=document.createElement("canvas");return a.screencanvas=!1,!!window.WebGLRenderingContext&&(a.getContext("webgl")||a.getContext("experimental-webgl"))}catch(b){return!1}}(),l.webGL=!!l.webGL,l.worker=!!window.Worker,l.pointerLock="pointerLockElement"in document||"mozPointerLockElement"in document||"webkitPointerLockElement"in document,l.quirksMode="CSS1Compat"===document.compatMode?!1:!0,navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia||navigator.oGetUserMedia,window.URL=window.URL||window.webkitURL||window.mozURL||window.msURL,l.getUserMedia=l.getUserMedia&&!!navigator.getUserMedia&&!!window.URL,l.firefox&&l.firefoxVersion<21&&(l.getUserMedia=!1),!l.iOS&&(l.ie||l.firefox||l.chrome)&&(l.canvasBitBltShift=!0),(l.safari||l.mobileSafari)&&(l.canvasBitBltShift=!1)}function c(){("ontouchstart"in document.documentElement||window.navigator.maxTouchPoints&&window.navigator.maxTouchPoints>=1)&&(l.touch=!0),(window.navigator.msPointerEnabled||window.navigator.pointerEnabled)&&(l.mspointer=!0),l.cocoonJS||("onwheel"in window||l.ie&&"WheelEvent"in window?l.wheelEvent="wheel":"onmousewheel"in window?l.wheelEvent="mousewheel":l.firefox&&"MouseScrollEvent"in window&&(l.wheelEvent="DOMMouseScroll"))}function d(){for(var a=["requestFullscreen","requestFullScreen","webkitRequestFullscreen","webkitRequestFullScreen","msRequestFullscreen","msRequestFullScreen","mozRequestFullScreen","mozRequestFullscreen"],b=document.createElement("div"),c=0;c<a.length;c++)if(b[a[c]]){l.fullscreen=!0,l.requestFullscreen=a[c];break}var d=["cancelFullScreen","exitFullscreen","webkitCancelFullScreen","webkitExitFullscreen","msCancelFullScreen","msExitFullscreen","mozCancelFullScreen","mozExitFullscreen"];if(l.fullscreen)for(var c=0;c<d.length;c++)if(document[d[c]]){l.cancelFullscreen=d[c];break}window.Element&&Element.ALLOW_KEYBOARD_INPUT&&(l.fullscreenKeyboard=!0)}function e(){var a=navigator.userAgent;if(/Arora/.test(a)?l.arora=!0:/Edge\/\d+/.test(a)?l.edge=!0:/Chrome\/(\d+)/.test(a)&&!l.windowsPhone?(l.chrome=!0,l.chromeVersion=parseInt(RegExp.$1,10)):/Epiphany/.test(a)?l.epiphany=!0:/Firefox\D+(\d+)/.test(a)?(l.firefox=!0,l.firefoxVersion=parseInt(RegExp.$1,10)):/AppleWebKit/.test(a)&&l.iOS?l.mobileSafari=!0:/MSIE (\d+\.\d+);/.test(a)?(l.ie=!0,l.ieVersion=parseInt(RegExp.$1,10)):/Midori/.test(a)?l.midori=!0:/Opera/.test(a)?l.opera=!0:/Safari\/(\d+)/.test(a)&&!l.windowsPhone?(l.safari=!0,/Version\/(\d+)\./.test(a)&&(l.safariVersion=parseInt(RegExp.$1,10))):/Trident\/(\d+\.\d+)(.*)rv:(\d+\.\d+)/.test(a)&&(l.ie=!0,
l.trident=!0,l.tridentVersion=parseInt(RegExp.$1,10),l.ieVersion=parseInt(RegExp.$3,10)),/Silk/.test(a)&&(l.silk=!0),navigator.standalone&&(l.webApp=!0),"undefined"!=typeof window.cordova&&(l.cordova=!0),"undefined"!=typeof process&&"undefined"!=typeof require&&(l.node=!0),l.node&&"object"==typeof process.versions&&(l.nodeWebkit=!!process.versions["node-webkit"],l.electron=!!process.versions.electron),navigator.isCocoonJS&&(l.cocoonJS=!0),l.cocoonJS)try{l.cocoonJSApp="undefined"!=typeof CocoonJS}catch(b){l.cocoonJSApp=!1}"undefined"!=typeof window.ejecta&&(l.ejecta=!0),/Crosswalk/.test(a)&&(l.crosswalk=!0)}function f(){var a=document.createElement("video"),b=!1;try{(b=!!a.canPlayType)&&(a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,"")&&(l.oggVideo=!0),a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,"")&&(l.h264Video=!0,l.mp4Video=!0),a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,"")&&(l.webmVideo=!0),a.canPlayType('video/webm; codecs="vp9"').replace(/^no$/,"")&&(l.vp9Video=!0),a.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/,"")&&(l.hlsVideo=!0))}catch(c){}}function g(){l.audioData=!!window.Audio,l.webAudio=!(!window.AudioContext&&!window.webkitAudioContext);var a=document.createElement("audio"),b=!1;try{if((b=!!a.canPlayType)&&(a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,"")&&(l.ogg=!0),(a.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/,"")||a.canPlayType("audio/opus;").replace(/^no$/,""))&&(l.opus=!0),a.canPlayType("audio/mpeg;").replace(/^no$/,"")&&(l.mp3=!0),a.canPlayType('audio/wav; codecs="1"').replace(/^no$/,"")&&(l.wav=!0),(a.canPlayType("audio/x-m4a;")||a.canPlayType("audio/aac;").replace(/^no$/,""))&&(l.m4a=!0),a.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,"")&&(l.webm=!0),""!==a.canPlayType('audio/mp4;codecs="ec-3"')))if(l.edge)l.dolby=!0;else if(l.safari&&l.safariVersion>=9&&/Mac OS X (\d+)_(\d+)/.test(navigator.userAgent)){var c=parseInt(RegExp.$1,10),d=parseInt(RegExp.$2,10);(10===c&&d>=11||c>10)&&(l.dolby=!0)}}catch(e){}}function h(){l.pixelRatio=window.devicePixelRatio||1,l.iPhone=-1!=navigator.userAgent.toLowerCase().indexOf("iphone"),l.iPhone4=2==l.pixelRatio&&l.iPhone,l.iPad=-1!=navigator.userAgent.toLowerCase().indexOf("ipad"),"undefined"!=typeof Int8Array?l.typedArray=!0:l.typedArray=!1,"undefined"!=typeof ArrayBuffer&&"undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint32Array&&(l.littleEndian=i(),l.LITTLE_ENDIAN=l.littleEndian),l.support32bit="undefined"!=typeof ArrayBuffer&&"undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof Int32Array&&null!==l.littleEndian&&j(),navigator.vibrate=navigator.vibrate||navigator.webkitVibrate||navigator.mozVibrate||navigator.msVibrate,navigator.vibrate&&(l.vibration=!0)}function i(){var a=new ArrayBuffer(4),b=new Uint8Array(a),c=new Uint32Array(a);return b[0]=161,b[1]=178,b[2]=195,b[3]=212,3569595041==c[0]?!0:2712847316==c[0]?!1:null}function j(){if(void 0===Uint8ClampedArray)return!1;var a=PIXI.CanvasPool.create(this,1,1),b=a.getContext("2d");if(!b)return!1;var c=b.createImageData(1,1);return PIXI.CanvasPool.remove(this),c.data instanceof Uint8ClampedArray}function k(){var a,b=document.createElement("p"),c={webkitTransform:"-webkit-transform",OTransform:"-o-transform",msTransform:"-ms-transform",MozTransform:"-moz-transform",transform:"transform"};document.body.insertBefore(b,null);for(var d in c)void 0!==b.style[d]&&(b.style[d]="translate3d(1px,1px,1px)",a=window.getComputedStyle(b).getPropertyValue(c[d]));document.body.removeChild(b),l.css3D=void 0!==a&&a.length>0&&"none"!==a}var l=this;a(),e(),g(),f(),k(),h(),b(),d(),c()},c.Device.canPlayAudio=function(a){return"mp3"===a&&this.mp3?!0:"ogg"===a&&(this.ogg||this.opus)?!0:"m4a"===a&&this.m4a?!0:"opus"===a&&this.opus?!0:"wav"===a&&this.wav?!0:"webm"===a&&this.webm?!0:"mp4"===a&&this.dolby?!0:!1},c.Device.canPlayVideo=function(a){return"webm"===a&&(this.webmVideo||this.vp9Video)?!0:"mp4"===a&&(this.mp4Video||this.h264Video)?!0:"ogg"!==a&&"ogv"!==a||!this.oggVideo?"mpeg"===a&&this.hlsVideo?!0:!1:!0},c.Device.isConsoleOpen=function(){return window.console&&window.console.firebug?!0:window.console&&(console.profile(),console.profileEnd(),console.clear&&console.clear(),console.profiles)?console.profiles.length>0:!1},c.Device.isAndroidStockBrowser=function(){var a=window.navigator.userAgent.match(/Android.*AppleWebKit\/([\d.]+)/);return a&&a[1]<537},c.Canvas={create:function(a,b,c,d,e){if(b=b||256,c=c||256,void 0===e)var f=PIXI.CanvasPool.create(a,b,c);else var f=document.createElement("canvas");return"string"==typeof d&&""!==d&&(f.id=d),f.width=b,f.height=c,f.style.display="block",f},setBackgroundColor:function(a,b){return b=b||"rgb(0,0,0)",a.style.backgroundColor=b,a},setTouchAction:function(a,b){return b=b||"none",a.style.msTouchAction=b,a.style["ms-touch-action"]=b,a.style["touch-action"]=b,a},setUserSelect:function(a,b){return b=b||"none",a.style["-webkit-touch-callout"]=b,a.style["-webkit-user-select"]=b,a.style["-khtml-user-select"]=b,a.style["-moz-user-select"]=b,a.style["-ms-user-select"]=b,a.style["user-select"]=b,a.style["-webkit-tap-highlight-color"]="rgba(0, 0, 0, 0)",a},addToDOM:function(a,b,c){var d;return void 0===c&&(c=!0),b&&("string"==typeof b?d=document.getElementById(b):"object"==typeof b&&1===b.nodeType&&(d=b)),d||(d=document.body),c&&d.style&&(d.style.overflow="hidden"),d.appendChild(a),a},removeFromDOM:function(a){a.parentNode&&a.parentNode.removeChild(a)},setTransform:function(a,b,c,d,e,f,g){return a.setTransform(d,f,g,e,b,c),a},setSmoothingEnabled:function(a,b){var d=c.Canvas.getSmoothingPrefix(a);return d&&(a[d]=b),a},getSmoothingPrefix:function(a){var b=["i","webkitI","msI","mozI","oI"];for(var c in b){var d=b[c]+"mageSmoothingEnabled";if(d in a)return d}return null},getSmoothingEnabled:function(a){var b=c.Canvas.getSmoothingPrefix(a);return b?a[b]:void 0},setImageRenderingCrisp:function(a){for(var b=["optimizeSpeed","crisp-edges","-moz-crisp-edges","-webkit-optimize-contrast","optimize-contrast","pixelated"],c=0;c<b.length;c++)a.style["image-rendering"]=b[c];return a.style.msInterpolationMode="nearest-neighbor",a},setImageRenderingBicubic:function(a){return a.style["image-rendering"]="auto",a.style.msInterpolationMode="bicubic",a}},c.RequestAnimationFrame=function(a,b){void 0===b&&(b=!1),this.game=a,this.isRunning=!1,this.forceSetTimeOut=b;for(var c=["ms","moz","webkit","o"],d=0;d<c.length&&!window.requestAnimationFrame;d++)window.requestAnimationFrame=window[c[d]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[c[d]+"CancelAnimationFrame"];this._isSetTimeOut=!1,this._onLoop=null,this._timeOutID=null},c.RequestAnimationFrame.prototype={start:function(){this.isRunning=!0;var a=this;!window.requestAnimationFrame||this.forceSetTimeOut?(this._isSetTimeOut=!0,this._onLoop=function(){return a.updateSetTimeout()},this._timeOutID=window.setTimeout(this._onLoop,0)):(this._isSetTimeOut=!1,this._onLoop=function(b){return a.updateRAF(b)},this._timeOutID=window.requestAnimationFrame(this._onLoop))},updateRAF:function(a){this.game.update(Math.floor(a)),this._timeOutID=window.requestAnimationFrame(this._onLoop)},updateSetTimeout:function(){this.game.update(Date.now()),this._timeOutID=window.setTimeout(this._onLoop,this.game.time.timeToCall)},stop:function(){this._isSetTimeOut?clearTimeout(this._timeOutID):window.cancelAnimationFrame(this._timeOutID),this.isRunning=!1},isSetTimeOut:function(){return this._isSetTimeOut},isRAF:function(){return this._isSetTimeOut===!1}},c.RequestAnimationFrame.prototype.constructor=c.RequestAnimationFrame,c.Math={PI2:2*Math.PI,fuzzyEqual:function(a,b,c){return void 0===c&&(c=1e-4),Math.abs(a-b)<c},fuzzyLessThan:function(a,b,c){return void 0===c&&(c=1e-4),b+c>a},fuzzyGreaterThan:function(a,b,c){return void 0===c&&(c=1e-4),a>b-c},fuzzyCeil:function(a,b){return void 0===b&&(b=1e-4),Math.ceil(a-b)},fuzzyFloor:function(a,b){return void 0===b&&(b=1e-4),Math.floor(a+b)},average:function(){for(var a=0,b=arguments.length,c=0;b>c;c++)a+=+arguments[c];return a/b},shear:function(a){return a%1},snapTo:function(a,b,c){return void 0===c&&(c=0),0===b?a:(a-=c,a=b*Math.round(a/b),c+a)},snapToFloor:function(a,b,c){return void 0===c&&(c=0),0===b?a:(a-=c,a=b*Math.floor(a/b),c+a)},snapToCeil:function(a,b,c){return void 0===c&&(c=0),0===b?a:(a-=c,a=b*Math.ceil(a/b),c+a)},roundTo:function(a,b,c){void 0===b&&(b=0),void 0===c&&(c=10);var d=Math.pow(c,-b);return Math.round(a*d)/d},floorTo:function(a,b,c){void 0===b&&(b=0),void 0===c&&(c=10);var d=Math.pow(c,-b);return Math.floor(a*d)/d},ceilTo:function(a,b,c){void 0===b&&(b=0),void 0===c&&(c=10);var d=Math.pow(c,-b);return Math.ceil(a*d)/d},angleBetween:function(a,b,c,d){return Math.atan2(d-b,c-a)},angleBetweenY:function(a,b,c,d){return Math.atan2(c-a,d-b)},angleBetweenPoints:function(a,b){return Math.atan2(b.y-a.y,b.x-a.x)},angleBetweenPointsY:function(a,b){return Math.atan2(b.x-a.x,b.y-a.y)},reverseAngle:function(a){return this.normalizeAngle(a+Math.PI,!0)},normalizeAngle:function(a){return a%=2*Math.PI,a>=0?a:a+2*Math.PI},maxAdd:function(a,b,c){return Math.min(a+b,c)},minSub:function(a,b,c){return Math.max(a-b,c)},wrap:function(a,b,c){var d=c-b;if(0>=d)return 0;var e=(a-b)%d;return 0>e&&(e+=d),e+b},wrapValue:function(a,b,c){var d;return a=Math.abs(a),b=Math.abs(b),c=Math.abs(c),d=(a+b)%c},isOdd:function(a){return!!(1&a)},isEven:function(a){return!(1&a)},min:function(){if(1===arguments.length&&"object"==typeof arguments[0])var a=arguments[0];else var a=arguments;for(var b=1,c=0,d=a.length;d>b;b++)a[b]<a[c]&&(c=b);return a[c]},max:function(){if(1===arguments.length&&"object"==typeof arguments[0])var a=arguments[0];else var a=arguments;for(var b=1,c=0,d=a.length;d>b;b++)a[b]>a[c]&&(c=b);return a[c]},minProperty:function(a){if(2===arguments.length&&"object"==typeof arguments[1])var b=arguments[1];else var b=arguments.slice(1);for(var c=1,d=0,e=b.length;e>c;c++)b[c][a]<b[d][a]&&(d=c);return b[d][a]},maxProperty:function(a){if(2===arguments.length&&"object"==typeof arguments[1])var b=arguments[1];else var b=arguments.slice(1);for(var c=1,d=0,e=b.length;e>c;c++)b[c][a]>b[d][a]&&(d=c);return b[d][a]},wrapAngle:function(a,b){return b?this.wrap(a,-Math.PI,Math.PI):this.wrap(a,-180,180)},linearInterpolation:function(a,b){var c=a.length-1,d=c*b,e=Math.floor(d);return 0>b?this.linear(a[0],a[1],d):b>1?this.linear(a[c],a[c-1],c-d):this.linear(a[e],a[e+1>c?c:e+1],d-e)},bezierInterpolation:function(a,b){for(var c=0,d=a.length-1,e=0;d>=e;e++)c+=Math.pow(1-b,d-e)*Math.pow(b,e)*a[e]*this.bernstein(d,e);return c},catmullRomInterpolation:function(a,b){var c=a.length-1,d=c*b,e=Math.floor(d);return a[0]===a[c]?(0>b&&(e=Math.floor(d=c*(1+b))),this.catmullRom(a[(e-1+c)%c],a[e],a[(e+1)%c],a[(e+2)%c],d-e)):0>b?a[0]-(this.catmullRom(a[0],a[0],a[1],a[1],-d)-a[0]):b>1?a[c]-(this.catmullRom(a[c],a[c],a[c-1],a[c-1],d-c)-a[c]):this.catmullRom(a[e?e-1:0],a[e],a[e+1>c?c:e+1],a[e+2>c?c:e+2],d-e)},linear:function(a,b,c){return(b-a)*c+a},bernstein:function(a,b){return this.factorial(a)/this.factorial(b)/this.factorial(a-b)},factorial:function(a){if(0===a)return 1;for(var b=a;--a;)b*=a;return b},catmullRom:function(a,b,c,d,e){var f=.5*(c-a),g=.5*(d-b),h=e*e,i=e*h;return(2*b-2*c+f+g)*i+(-3*b+3*c-2*f-g)*h+f*e+b},difference:function(a,b){return Math.abs(a-b)},roundAwayFromZero:function(a){return a>0?Math.ceil(a):Math.floor(a)},sinCosGenerator:function(a,b,c,d){void 0===b&&(b=1),void 0===c&&(c=1),void 0===d&&(d=1);for(var e=b,f=c,g=d*Math.PI/a,h=[],i=[],j=0;a>j;j++)f-=e*g,e+=f*g,h[j]=f,i[j]=e;return{sin:i,cos:h,length:a}},distance:function(a,b,c,d){var e=a-c,f=b-d;return Math.sqrt(e*e+f*f)},distanceSq:function(a,b,c,d){var e=a-c,f=b-d;return e*e+f*f},distancePow:function(a,b,c,d,e){return void 0===e&&(e=2),Math.sqrt(Math.pow(c-a,e)+Math.pow(d-b,e))},clamp:function(a,b,c){return b>a?b:a>c?c:a},clampBottom:function(a,b){return b>a?b:a},within:function(a,b,c){return Math.abs(a-b)<=c},mapLinear:function(a,b,c,d,e){return d+(a-b)*(e-d)/(c-b)},smoothstep:function(a,b,c){return a=Math.max(0,Math.min(1,(a-b)/(c-b))),a*a*(3-2*a)},smootherstep:function(a,b,c){return a=Math.max(0,Math.min(1,(a-b)/(c-b))),a*a*a*(a*(6*a-15)+10)},sign:function(a){return 0>a?-1:a>0?1:0},percent:function(a,b,c){return void 0===c&&(c=0),a>b||c>b?1:c>a||c>a?0:(a-c)/b}};var k=Math.PI/180,l=180/Math.PI;return c.Math.degToRad=function(a){return a*k},c.Math.radToDeg=function(a){return a*l},c.RandomDataGenerator=function(a){void 0===a&&(a=[]),this.c=1,this.s0=0,this.s1=0,this.s2=0,"string"==typeof a?this.state(a):this.sow(a)},c.RandomDataGenerator.prototype={rnd:function(){var a=2091639*this.s0+2.3283064365386963e-10*this.c;return this.c=0|a,this.s0=this.s1,this.s1=this.s2,this.s2=a-this.c,this.s2},sow:function(a){if(this.s0=this.hash(" "),this.s1=this.hash(this.s0),this.s2=this.hash(this.s1),this.c=1,a)for(var b=0;b<a.length&&null!=a[b];b++){var c=a[b];this.s0-=this.hash(c),this.s0+=~~(this.s0<0),this.s1-=this.hash(c),this.s1+=~~(this.s1<0),this.s2-=this.hash(c),this.s2+=~~(this.s2<0)}},hash:function(a){var b,c,d;for(d=4022871197,a=a.toString(),c=0;c<a.length;c++)d+=a.charCodeAt(c),b=.02519603282416938*d,d=b>>>0,b-=d,b*=d,d=b>>>0,b-=d,d+=4294967296*b;return 2.3283064365386963e-10*(d>>>0)},integer:function(){return 4294967296*this.rnd.apply(this)},frac:function(){return this.rnd.apply(this)+1.1102230246251565e-16*(2097152*this.rnd.apply(this)|0)},real:function(){return this.integer()+this.frac()},integerInRange:function(a,b){return Math.floor(this.realInRange(0,b-a+1)+a)},between:function(a,b){return this.integerInRange(a,b)},realInRange:function(a,b){return this.frac()*(b-a)+a},normal:function(){return 1-2*this.frac()},uuid:function(){var a="",b="";for(b=a="";a++<36;b+=~a%5|3*a&4?(15^a?8^this.frac()*(20^a?16:4):4).toString(16):"-");return b},pick:function(a){return a[this.integerInRange(0,a.length-1)]},sign:function(){return this.pick([-1,1])},weightedPick:function(a){return a[~~(Math.pow(this.frac(),2)*(a.length-1)+.5)]},timestamp:function(a,b){return this.realInRange(a||9466848e5,b||1577862e6)},angle:function(){return this.integerInRange(-180,180)},state:function(a){return"string"==typeof a&&a.match(/^!rnd/)&&(a=a.split(","),this.c=parseFloat(a[1]),this.s0=parseFloat(a[2]),this.s1=parseFloat(a[3]),this.s2=parseFloat(a[4])),["!rnd",this.c,this.s0,this.s1,this.s2].join(",")}},c.RandomDataGenerator.prototype.constructor=c.RandomDataGenerator,c.QuadTree=function(a,b,c,d,e,f,g){this.maxObjects=10,this.maxLevels=4,this.level=0,this.bounds={},this.objects=[],this.nodes=[],this._empty=[],this.reset(a,b,c,d,e,f,g)},c.QuadTree.prototype={reset:function(a,b,c,d,e,f,g){this.maxObjects=e||10,this.maxLevels=f||4,this.level=g||0,this.bounds={x:Math.round(a),y:Math.round(b),width:c,height:d,subWidth:Math.floor(c/2),subHeight:Math.floor(d/2),right:Math.round(a)+Math.floor(c/2),bottom:Math.round(b)+Math.floor(d/2)},this.objects.length=0,this.nodes.length=0},populate:function(a){a.forEach(this.populateHandler,this,!0)},populateHandler:function(a){a.body&&a.exists&&this.insert(a.body)},split:function(){this.nodes[0]=new c.QuadTree(this.bounds.right,this.bounds.y,this.bounds.subWidth,this.bounds.subHeight,this.maxObjects,this.maxLevels,this.level+1),this.nodes[1]=new c.QuadTree(this.bounds.x,this.bounds.y,this.bounds.subWidth,this.bounds.subHeight,this.maxObjects,this.maxLevels,this.level+1),this.nodes[2]=new c.QuadTree(this.bounds.x,this.bounds.bottom,this.bounds.subWidth,this.bounds.subHeight,this.maxObjects,this.maxLevels,this.level+1),this.nodes[3]=new c.QuadTree(this.bounds.right,this.bounds.bottom,this.bounds.subWidth,this.bounds.subHeight,this.maxObjects,this.maxLevels,this.level+1)},insert:function(a){var b,c=0;if(null!=this.nodes[0]&&(b=this.getIndex(a),-1!==b))return void this.nodes[b].insert(a);if(this.objects.push(a),this.objects.length>this.maxObjects&&this.level<this.maxLevels)for(null==this.nodes[0]&&this.split();c<this.objects.length;)b=this.getIndex(this.objects[c]),-1!==b?this.nodes[b].insert(this.objects.splice(c,1)[0]):c++},getIndex:function(a){var b=-1;return a.x<this.bounds.right&&a.right<this.bounds.right?a.y<this.bounds.bottom&&a.bottom<this.bounds.bottom?b=1:a.y>this.bounds.bottom&&(b=2):a.x>this.bounds.right&&(a.y<this.bounds.bottom&&a.bottom<this.bounds.bottom?b=0:a.y>this.bounds.bottom&&(b=3)),b},retrieve:function(a){if(a instanceof c.Rectangle)var b=this.objects,d=this.getIndex(a);else{if(!a.body)return this._empty;var b=this.objects,d=this.getIndex(a.body)}return this.nodes[0]&&(-1!==d?b=b.concat(this.nodes[d].retrieve(a)):(b=b.concat(this.nodes[0].retrieve(a)),b=b.concat(this.nodes[1].retrieve(a)),b=b.concat(this.nodes[2].retrieve(a)),b=b.concat(this.nodes[3].retrieve(a)))),b},clear:function(){this.objects.length=0;for(var a=this.nodes.length;a--;)this.nodes[a].clear(),this.nodes.splice(a,1);this.nodes.length=0}},c.QuadTree.prototype.constructor=c.QuadTree,c.Net=function(a){this.game=a},c.Net.prototype={getHostName:function(){return window.location&&window.location.hostname?window.location.hostname:null},checkDomainName:function(a){return-1!==window.location.hostname.indexOf(a)},updateQueryString:function(a,b,c,d){void 0===c&&(c=!1),(void 0===d||""===d)&&(d=window.location.href);var e="",f=new RegExp("([?|&])"+a+"=.*?(&|#|$)(.*)","gi");if(f.test(d))e="undefined"!=typeof b&&null!==b?d.replace(f,"$1"+a+"="+b+"$2$3"):d.replace(f,"$1$3").replace(/(&|\?)$/,"");else if("undefined"!=typeof b&&null!==b){var g=-1!==d.indexOf("?")?"&":"?",h=d.split("#");d=h[0]+g+a+"="+b,h[1]&&(d+="#"+h[1]),e=d}else e=d;return c?void(window.location.href=e):e},getQueryString:function(a){void 0===a&&(a="");var b={},c=location.search.substring(1).split("&");for(var d in c){var e=c[d].split("=");if(e.length>1){if(a&&a==this.decodeURI(e[0]))return this.decodeURI(e[1]);b[this.decodeURI(e[0])]=this.decodeURI(e[1])}}return b},decodeURI:function(a){return decodeURIComponent(a.replace(/\+/g," "))}},c.Net.prototype.constructor=c.Net,c.TweenManager=function(a){this.game=a,this.frameBased=!1,this._tweens=[],this._add=[],this.easeMap={Power0:c.Easing.Power0,Power1:c.Easing.Power1,Power2:c.Easing.Power2,Power3:c.Easing.Power3,Power4:c.Easing.Power4,Linear:c.Easing.Linear.None,Quad:c.Easing.Quadratic.Out,Cubic:c.Easing.Cubic.Out,Quart:c.Easing.Quartic.Out,Quint:c.Easing.Quintic.Out,Sine:c.Easing.Sinusoidal.Out,Expo:c.Easing.Exponential.Out,Circ:c.Easing.Circular.Out,Elastic:c.Easing.Elastic.Out,Back:c.Easing.Back.Out,Bounce:c.Easing.Bounce.Out,"Quad.easeIn":c.Easing.Quadratic.In,"Cubic.easeIn":c.Easing.Cubic.In,"Quart.easeIn":c.Easing.Quartic.In,"Quint.easeIn":c.Easing.Quintic.In,"Sine.easeIn":c.Easing.Sinusoidal.In,"Expo.easeIn":c.Easing.Exponential.In,"Circ.easeIn":c.Easing.Circular.In,"Elastic.easeIn":c.Easing.Elastic.In,"Back.easeIn":c.Easing.Back.In,"Bounce.easeIn":c.Easing.Bounce.In,"Quad.easeOut":c.Easing.Quadratic.Out,"Cubic.easeOut":c.Easing.Cubic.Out,"Quart.easeOut":c.Easing.Quartic.Out,"Quint.easeOut":c.Easing.Quintic.Out,"Sine.easeOut":c.Easing.Sinusoidal.Out,"Expo.easeOut":c.Easing.Exponential.Out,"Circ.easeOut":c.Easing.Circular.Out,"Elastic.easeOut":c.Easing.Elastic.Out,"Back.easeOut":c.Easing.Back.Out,"Bounce.easeOut":c.Easing.Bounce.Out,"Quad.easeInOut":c.Easing.Quadratic.InOut,"Cubic.easeInOut":c.Easing.Cubic.InOut,"Quart.easeInOut":c.Easing.Quartic.InOut,"Quint.easeInOut":c.Easing.Quintic.InOut,"Sine.easeInOut":c.Easing.Sinusoidal.InOut,"Expo.easeInOut":c.Easing.Exponential.InOut,"Circ.easeInOut":c.Easing.Circular.InOut,"Elastic.easeInOut":c.Easing.Elastic.InOut,"Back.easeInOut":c.Easing.Back.InOut,"Bounce.easeInOut":c.Easing.Bounce.InOut},this.game.onPause.add(this._pauseAll,this),this.game.onResume.add(this._resumeAll,this)},c.TweenManager.prototype={getAll:function(){return this._tweens},removeAll:function(){for(var a=0;a<this._tweens.length;a++)this._tweens[a].pendingDelete=!0;this._add=[]},removeFrom:function(a,b){void 0===b&&(b=!0);var d,e;if(Array.isArray(a))for(d=0,e=a.length;e>d;d++)this.removeFrom(a[d]);else if(a.type===c.GROUP&&b)for(var d=0,e=a.children.length;e>d;d++)this.removeFrom(a.children[d]);else{for(d=0,e=this._tweens.length;e>d;d++)a===this._tweens[d].target&&this.remove(this._tweens[d]);for(d=0,e=this._add.length;e>d;d++)a===this._add[d].target&&this.remove(this._add[d])}},add:function(a){a._manager=this,this._add.push(a)},create:function(a){return new c.Tween(a,this.game,this)},remove:function(a){var b=this._tweens.indexOf(a);-1!==b?this._tweens[b].pendingDelete=!0:(b=this._add.indexOf(a),-1!==b&&(this._add[b].pendingDelete=!0))},update:function(){var a=this._add.length,b=this._tweens.length;if(0===b&&0===a)return!1;for(var c=0;b>c;)this._tweens[c].update(this.game.time.time)?c++:(this._tweens.splice(c,1),b--);return a>0&&(this._tweens=this._tweens.concat(this._add),this._add.length=0),!0},isTweening:function(a){return this._tweens.some(function(b){return b.target===a})},_pauseAll:function(){for(var a=this._tweens.length-1;a>=0;a--)this._tweens[a]._pause()},_resumeAll:function(){for(var a=this._tweens.length-1;a>=0;a--)this._tweens[a]._resume()},pauseAll:function(){for(var a=this._tweens.length-1;a>=0;a--)this._tweens[a].pause()},resumeAll:function(){for(var a=this._tweens.length-1;a>=0;a--)this._tweens[a].resume(!0)}},c.TweenManager.prototype.constructor=c.TweenManager,c.Tween=function(a,b,d){this.game=b,this.target=a,this.manager=d,this.timeline=[],this.reverse=!1,this.timeScale=1,this.repeatCounter=0,this.pendingDelete=!1,this.onStart=new c.Signal,this.onLoop=new c.Signal,this.onRepeat=new c.Signal,this.onChildComplete=new c.Signal,this.onComplete=new c.Signal,this.isRunning=!1,this.current=0,this.properties={},this.chainedTween=null,this.isPaused=!1,this.frameBased=d.frameBased,this._onUpdateCallback=null,this._onUpdateCallbackContext=null,this._pausedTime=0,this._codePaused=!1,this._hasStarted=!1},c.Tween.prototype={to:function(a,b,d,e,f,g,h){return(void 0===b||0>=b)&&(b=1e3),(void 0===d||null===d)&&(d=c.Easing.Default),void 0===e&&(e=!1),void 0===f&&(f=0),void 0===g&&(g=0),void 0===h&&(h=!1),"string"==typeof d&&this.manager.easeMap[d]&&(d=this.manager.easeMap[d]),this.isRunning?(console.warn("Phaser.Tween.to cannot be called after Tween.start"),this):(this.timeline.push(new c.TweenData(this).to(a,b,d,f,g,h)),e&&this.start(),this)},from:function(a,b,d,e,f,g,h){return void 0===b&&(b=1e3),(void 0===d||null===d)&&(d=c.Easing.Default),void 0===e&&(e=!1),void 0===f&&(f=0),void 0===g&&(g=0),void 0===h&&(h=!1),"string"==typeof d&&this.manager.easeMap[d]&&(d=this.manager.easeMap[d]),this.isRunning?(console.warn("Phaser.Tween.from cannot be called after Tween.start"),this):(this.timeline.push(new c.TweenData(this).from(a,b,d,f,g,h)),e&&this.start(),this)},start:function(a){if(void 0===a&&(a=0),null===this.game||null===this.target||0===this.timeline.length||this.isRunning)return this;for(var b=0;b<this.timeline.length;b++)for(var c in this.timeline[b].vEnd)this.properties[c]=this.target[c]||0,Array.isArray(this.properties[c])||(this.properties[c]*=1);for(var b=0;b<this.timeline.length;b++)this.timeline[b].loadValues();return this.manager.add(this),this.isRunning=!0,(0>a||a>this.timeline.length-1)&&(a=0),this.current=a,this.timeline[this.current].start(),this},stop:function(a){return void 0===a&&(a=!1),this.isRunning=!1,this._onUpdateCallback=null,this._onUpdateCallbackContext=null,a&&(this.onComplete.dispatch(this.target,this),this._hasStarted=!1,this.chainedTween&&this.chainedTween.start()),this.manager.remove(this),this},updateTweenData:function(a,b,c){if(0===this.timeline.length)return this;if(void 0===c&&(c=0),-1===c)for(var d=0;d<this.timeline.length;d++)this.timeline[d][a]=b;else this.timeline[c][a]=b;return this},delay:function(a,b){return this.updateTweenData("delay",a,b)},repeat:function(a,b,c){return void 0===b&&(b=0),this.updateTweenData("repeatCounter",a,c),this.updateTweenData("repeatDelay",b,c)},repeatDelay:function(a,b){return this.updateTweenData("repeatDelay",a,b)},yoyo:function(a,b,c){return void 0===b&&(b=0),this.updateTweenData("yoyo",a,c),this.updateTweenData("yoyoDelay",b,c)},yoyoDelay:function(a,b){return this.updateTweenData("yoyoDelay",a,b)},easing:function(a,b){return"string"==typeof a&&this.manager.easeMap[a]&&(a=this.manager.easeMap[a]),this.updateTweenData("easingFunction",a,b)},interpolation:function(a,b,d){return void 0===b&&(b=c.Math),this.updateTweenData("interpolationFunction",a,d),this.updateTweenData("interpolationContext",b,d)},repeatAll:function(a){return void 0===a&&(a=0),this.repeatCounter=a,this},chain:function(){for(var a=arguments.length;a--;)a>0?arguments[a-1].chainedTween=arguments[a]:this.chainedTween=arguments[a];return this},loop:function(a){return void 0===a&&(a=!0),this.repeatCounter=a?-1:0,this},onUpdateCallback:function(a,b){return this._onUpdateCallback=a,this._onUpdateCallbackContext=b,this},pause:function(){this.isPaused=!0,this._codePaused=!0,this._pausedTime=this.game.time.time},_pause:function(){this._codePaused||(this.isPaused=!0,this._pausedTime=this.game.time.time)},resume:function(){if(this.isPaused){this.isPaused=!1,this._codePaused=!1;for(var a=0;a<this.timeline.length;a++)this.timeline[a].isRunning||(this.timeline[a].startTime+=this.game.time.time-this._pausedTime)}},_resume:function(){this._codePaused||this.resume()},update:function(a){if(this.pendingDelete||!this.target)return!1;if(this.isPaused)return!0;var b=this.timeline[this.current].update(a);if(b===c.TweenData.PENDING)return!0;if(b===c.TweenData.RUNNING)return this._hasStarted||(this.onStart.dispatch(this.target,this),this._hasStarted=!0),null!==this._onUpdateCallback&&this._onUpdateCallback.call(this._onUpdateCallbackContext,this,this.timeline[this.current].value,this.timeline[this.current]),this.isRunning;if(b===c.TweenData.LOOPED)return-1===this.timeline[this.current].repeatCounter?this.onLoop.dispatch(this.target,this):this.onRepeat.dispatch(this.target,this),!0;if(b===c.TweenData.COMPLETE){var d=!1;return this.reverse?(this.current--,this.current<0&&(this.current=this.timeline.length-1,d=!0)):(this.current++,this.current===this.timeline.length&&(this.current=0,d=!0)),d?-1===this.repeatCounter?(this.timeline[this.current].start(),this.onLoop.dispatch(this.target,this),!0):this.repeatCounter>0?(this.repeatCounter--,this.timeline[this.current].start(),this.onRepeat.dispatch(this.target,this),!0):(this.isRunning=!1,this.onComplete.dispatch(this.target,this),this._hasStarted=!1,this.chainedTween&&this.chainedTween.start(),!1):(this.onChildComplete.dispatch(this.target,this),this.timeline[this.current].start(),!0)}},generateData:function(a,b){if(null===this.game||null===this.target)return null;void 0===a&&(a=60),void 0===b&&(b=[]);for(var c=0;c<this.timeline.length;c++)for(var d in this.timeline[c].vEnd)this.properties[d]=this.target[d]||0,Array.isArray(this.properties[d])||(this.properties[d]*=1);for(var c=0;c<this.timeline.length;c++)this.timeline[c].loadValues();for(var c=0;c<this.timeline.length;c++)b=b.concat(this.timeline[c].generateData(a));return b}},Object.defineProperty(c.Tween.prototype,"totalDuration",{get:function(){for(var a=0,b=0;b<this.timeline.length;b++)a+=this.timeline[b].duration;return a}}),c.Tween.prototype.constructor=c.Tween,c.TweenData=function(a){this.parent=a,this.game=a.game,this.vStart={},this.vStartCache={},this.vEnd={},this.vEndCache={},this.duration=1e3,this.percent=0,this.value=0,this.repeatCounter=0,this.repeatDelay=0,this.repeatTotal=0,this.interpolate=!1,this.yoyo=!1,this.yoyoDelay=0,this.inReverse=!1,this.delay=0,this.dt=0,this.startTime=null,this.easingFunction=c.Easing.Default,this.interpolationFunction=c.Math.linearInterpolation,this.interpolationContext=c.Math,this.isRunning=!1,this.isFrom=!1},c.TweenData.PENDING=0,c.TweenData.RUNNING=1,c.TweenData.LOOPED=2,c.TweenData.COMPLETE=3,c.TweenData.prototype={to:function(a,b,c,d,e,f){return this.vEnd=a,this.duration=b,this.easingFunction=c,this.delay=d,this.repeatTotal=e,this.yoyo=f,this.isFrom=!1,this},from:function(a,b,c,d,e,f){return this.vEnd=a,this.duration=b,this.easingFunction=c,this.delay=d,this.repeatTotal=e,this.yoyo=f,this.isFrom=!0,this},start:function(){if(this.startTime=this.game.time.time+this.delay,this.parent.reverse?this.dt=this.duration:this.dt=0,this.delay>0?this.isRunning=!1:this.isRunning=!0,this.isFrom)for(var a in this.vStartCache)this.vStart[a]=this.vEndCache[a],this.vEnd[a]=this.vStartCache[a],this.parent.target[a]=this.vStart[a];return this.value=0,this.yoyoCounter=0,this.repeatCounter=this.repeatTotal,this},loadValues:function(){for(var a in this.parent.properties){if(this.vStart[a]=this.parent.properties[a],Array.isArray(this.vEnd[a])){if(0===this.vEnd[a].length)continue;0===this.percent&&(this.vEnd[a]=[this.vStart[a]].concat(this.vEnd[a]))}"undefined"!=typeof this.vEnd[a]?("string"==typeof this.vEnd[a]&&(this.vEnd[a]=this.vStart[a]+parseFloat(this.vEnd[a],10)),this.parent.properties[a]=this.vEnd[a]):this.vEnd[a]=this.vStart[a],this.vStartCache[a]=this.vStart[a],this.vEndCache[a]=this.vEnd[a]}return this},update:function(a){if(this.isRunning){if(a<this.startTime)return c.TweenData.RUNNING}else{if(!(a>=this.startTime))return c.TweenData.PENDING;this.isRunning=!0}var b=this.parent.frameBased?this.game.time.physicsElapsedMS:this.game.time.elapsedMS;this.parent.reverse?(this.dt-=b*this.parent.timeScale,this.dt=Math.max(this.dt,0)):(this.dt+=b*this.parent.timeScale,this.dt=Math.min(this.dt,this.duration)),this.percent=this.dt/this.duration,this.value=this.easingFunction(this.percent);for(var d in this.vEnd){var e=this.vStart[d],f=this.vEnd[d];Array.isArray(f)?this.parent.target[d]=this.interpolationFunction.call(this.interpolationContext,f,this.value):this.parent.target[d]=e+(f-e)*this.value}return!this.parent.reverse&&1===this.percent||this.parent.reverse&&0===this.percent?this.repeat():c.TweenData.RUNNING},generateData:function(a){this.parent.reverse?this.dt=this.duration:this.dt=0;var b=[],c=!1,d=1/a*1e3;do{this.parent.reverse?(this.dt-=d,this.dt=Math.max(this.dt,0)):(this.dt+=d,this.dt=Math.min(this.dt,this.duration)),this.percent=this.dt/this.duration,this.value=this.easingFunction(this.percent);var e={};for(var f in this.vEnd){var g=this.vStart[f],h=this.vEnd[f];Array.isArray(h)?e[f]=this.interpolationFunction(h,this.value):e[f]=g+(h-g)*this.value}b.push(e),(!this.parent.reverse&&1===this.percent||this.parent.reverse&&0===this.percent)&&(c=!0)}while(!c);if(this.yoyo){var i=b.slice();i.reverse(),b=b.concat(i)}return b},repeat:function(){if(this.yoyo){if(this.inReverse&&0===this.repeatCounter){for(var a in this.vStartCache)this.vStart[a]=this.vStartCache[a],this.vEnd[a]=this.vEndCache[a];return this.inReverse=!1,c.TweenData.COMPLETE}this.inReverse=!this.inReverse}else if(0===this.repeatCounter)return c.TweenData.COMPLETE;if(this.inReverse)for(var a in this.vStartCache)this.vStart[a]=this.vEndCache[a],this.vEnd[a]=this.vStartCache[a];else{for(var a in this.vStartCache)this.vStart[a]=this.vStartCache[a],this.vEnd[a]=this.vEndCache[a];this.repeatCounter>0&&this.repeatCounter--}return this.startTime=this.game.time.time,this.yoyo&&this.inReverse?this.startTime+=this.yoyoDelay:this.inReverse||(this.startTime+=this.repeatDelay),this.parent.reverse?this.dt=this.duration:this.dt=0,c.TweenData.LOOPED}},c.TweenData.prototype.constructor=c.TweenData,c.Easing={Linear:{None:function(a){return a}},Quadratic:{In:function(a){return a*a},Out:function(a){return a*(2-a)},InOut:function(a){return(a*=2)<1?.5*a*a:-.5*(--a*(a-2)-1)}},Cubic:{In:function(a){return a*a*a},Out:function(a){return--a*a*a+1},InOut:function(a){return(a*=2)<1?.5*a*a*a:.5*((a-=2)*a*a+2)}},Quartic:{In:function(a){return a*a*a*a},Out:function(a){return 1- --a*a*a*a},InOut:function(a){return(a*=2)<1?.5*a*a*a*a:-.5*((a-=2)*a*a*a-2)}},Quintic:{In:function(a){return a*a*a*a*a},Out:function(a){return--a*a*a*a*a+1},InOut:function(a){return(a*=2)<1?.5*a*a*a*a*a:.5*((a-=2)*a*a*a*a+2)}},Sinusoidal:{In:function(a){return 0===a?0:1===a?1:1-Math.cos(a*Math.PI/2)},Out:function(a){return 0===a?0:1===a?1:Math.sin(a*Math.PI/2);
},InOut:function(a){return 0===a?0:1===a?1:.5*(1-Math.cos(Math.PI*a))}},Exponential:{In:function(a){return 0===a?0:Math.pow(1024,a-1)},Out:function(a){return 1===a?1:1-Math.pow(2,-10*a)},InOut:function(a){return 0===a?0:1===a?1:(a*=2)<1?.5*Math.pow(1024,a-1):.5*(-Math.pow(2,-10*(a-1))+2)}},Circular:{In:function(a){return 1-Math.sqrt(1-a*a)},Out:function(a){return Math.sqrt(1- --a*a)},InOut:function(a){return(a*=2)<1?-.5*(Math.sqrt(1-a*a)-1):.5*(Math.sqrt(1-(a-=2)*a)+1)}},Elastic:{In:function(a){var b,c=.1,d=.4;return 0===a?0:1===a?1:(!c||1>c?(c=1,b=d/4):b=d*Math.asin(1/c)/(2*Math.PI),-(c*Math.pow(2,10*(a-=1))*Math.sin((a-b)*(2*Math.PI)/d)))},Out:function(a){var b,c=.1,d=.4;return 0===a?0:1===a?1:(!c||1>c?(c=1,b=d/4):b=d*Math.asin(1/c)/(2*Math.PI),c*Math.pow(2,-10*a)*Math.sin((a-b)*(2*Math.PI)/d)+1)},InOut:function(a){var b,c=.1,d=.4;return 0===a?0:1===a?1:(!c||1>c?(c=1,b=d/4):b=d*Math.asin(1/c)/(2*Math.PI),(a*=2)<1?-.5*(c*Math.pow(2,10*(a-=1))*Math.sin((a-b)*(2*Math.PI)/d)):c*Math.pow(2,-10*(a-=1))*Math.sin((a-b)*(2*Math.PI)/d)*.5+1)}},Back:{In:function(a){var b=1.70158;return a*a*((b+1)*a-b)},Out:function(a){var b=1.70158;return--a*a*((b+1)*a+b)+1},InOut:function(a){var b=2.5949095;return(a*=2)<1?.5*(a*a*((b+1)*a-b)):.5*((a-=2)*a*((b+1)*a+b)+2)}},Bounce:{In:function(a){return 1-c.Easing.Bounce.Out(1-a)},Out:function(a){return 1/2.75>a?7.5625*a*a:2/2.75>a?7.5625*(a-=1.5/2.75)*a+.75:2.5/2.75>a?7.5625*(a-=2.25/2.75)*a+.9375:7.5625*(a-=2.625/2.75)*a+.984375},InOut:function(a){return.5>a?.5*c.Easing.Bounce.In(2*a):.5*c.Easing.Bounce.Out(2*a-1)+.5}}},c.Easing.Default=c.Easing.Linear.None,c.Easing.Power0=c.Easing.Linear.None,c.Easing.Power1=c.Easing.Quadratic.Out,c.Easing.Power2=c.Easing.Cubic.Out,c.Easing.Power3=c.Easing.Quartic.Out,c.Easing.Power4=c.Easing.Quintic.Out,c.Time=function(a){this.game=a,this.time=0,this.prevTime=0,this.now=0,this.elapsed=0,this.elapsedMS=0,this.physicsElapsed=1/60,this.physicsElapsedMS=1/60*1e3,this.desiredFpsMult=1/60,this._desiredFps=60,this.suggestedFps=this.desiredFps,this.slowMotion=1,this.advancedTiming=!1,this.frames=0,this.fps=0,this.fpsMin=1e3,this.fpsMax=0,this.msMin=1e3,this.msMax=0,this.pauseDuration=0,this.timeToCall=0,this.timeExpected=0,this.events=new c.Timer(this.game,!1),this._frameCount=0,this._elapsedAccumulator=0,this._started=0,this._timeLastSecond=0,this._pauseStarted=0,this._justResumed=!1,this._timers=[]},c.Time.prototype={boot:function(){this._started=Date.now(),this.time=Date.now(),this.events.start(),this.timeExpected=this.time},add:function(a){return this._timers.push(a),a},create:function(a){void 0===a&&(a=!0);var b=new c.Timer(this.game,a);return this._timers.push(b),b},removeAll:function(){for(var a=0;a<this._timers.length;a++)this._timers[a].destroy();this._timers=[],this.events.removeAll()},refresh:function(){var a=this.time;this.time=Date.now(),this.elapsedMS=this.time-a},update:function(a){var b=this.time;this.time=Date.now(),this.elapsedMS=this.time-b,this.prevTime=this.now,this.now=a,this.elapsed=this.now-this.prevTime,this.game.raf._isSetTimeOut&&(this.timeToCall=Math.floor(Math.max(0,1e3/this._desiredFps-(this.timeExpected-a))),this.timeExpected=a+this.timeToCall),this.advancedTiming&&this.updateAdvancedTiming(),this.game.paused||(this.events.update(this.time),this._timers.length&&this.updateTimers())},updateTimers:function(){for(var a=0,b=this._timers.length;b>a;)this._timers[a].update(this.time)?a++:(this._timers.splice(a,1),b--)},updateAdvancedTiming:function(){this._frameCount++,this._elapsedAccumulator+=this.elapsed,this._frameCount>=2*this._desiredFps&&(this.suggestedFps=5*Math.floor(200/(this._elapsedAccumulator/this._frameCount)),this._frameCount=0,this._elapsedAccumulator=0),this.msMin=Math.min(this.msMin,this.elapsed),this.msMax=Math.max(this.msMax,this.elapsed),this.frames++,this.now>this._timeLastSecond+1e3&&(this.fps=Math.round(1e3*this.frames/(this.now-this._timeLastSecond)),this.fpsMin=Math.min(this.fpsMin,this.fps),this.fpsMax=Math.max(this.fpsMax,this.fps),this._timeLastSecond=this.now,this.frames=0)},gamePaused:function(){this._pauseStarted=Date.now(),this.events.pause();for(var a=this._timers.length;a--;)this._timers[a]._pause()},gameResumed:function(){this.time=Date.now(),this.pauseDuration=this.time-this._pauseStarted,this.events.resume();for(var a=this._timers.length;a--;)this._timers[a]._resume()},totalElapsedSeconds:function(){return.001*(this.time-this._started)},elapsedSince:function(a){return this.time-a},elapsedSecondsSince:function(a){return.001*(this.time-a)},reset:function(){this._started=this.time,this.removeAll()}},Object.defineProperty(c.Time.prototype,"desiredFps",{get:function(){return this._desiredFps},set:function(a){this._desiredFps=a,this.physicsElapsed=1/a,this.physicsElapsedMS=1e3*this.physicsElapsed,this.desiredFpsMult=1/a}}),c.Time.prototype.constructor=c.Time,c.Timer=function(a,b){void 0===b&&(b=!0),this.game=a,this.running=!1,this.autoDestroy=b,this.expired=!1,this.elapsed=0,this.events=[],this.onComplete=new c.Signal,this.nextTick=0,this.timeCap=1e3,this.paused=!1,this._codePaused=!1,this._started=0,this._pauseStarted=0,this._pauseTotal=0,this._now=Date.now(),this._len=0,this._marked=0,this._i=0,this._diff=0,this._newTick=0},c.Timer.MINUTE=6e4,c.Timer.SECOND=1e3,c.Timer.HALF=500,c.Timer.QUARTER=250,c.Timer.prototype={create:function(a,b,d,e,f,g){a=Math.round(a);var h=a;h+=0===this._now?this.game.time.time:this._now;var i=new c.TimerEvent(this,a,h,d,b,e,f,g);return this.events.push(i),this.order(),this.expired=!1,i},add:function(a,b,c){return this.create(a,!1,0,b,c,Array.prototype.slice.call(arguments,3))},repeat:function(a,b,c,d){return this.create(a,!1,b,c,d,Array.prototype.slice.call(arguments,4))},loop:function(a,b,c){return this.create(a,!0,0,b,c,Array.prototype.slice.call(arguments,3))},start:function(a){if(!this.running){this._started=this.game.time.time+(a||0),this.running=!0;for(var b=0;b<this.events.length;b++)this.events[b].tick=this.events[b].delay+this._started}},stop:function(a){this.running=!1,void 0===a&&(a=!0),a&&(this.events.length=0)},remove:function(a){for(var b=0;b<this.events.length;b++)if(this.events[b]===a)return this.events[b].pendingDelete=!0,!0;return!1},order:function(){this.events.length>0&&(this.events.sort(this.sortHandler),this.nextTick=this.events[0].tick)},sortHandler:function(a,b){return a.tick<b.tick?-1:a.tick>b.tick?1:0},clearPendingEvents:function(){for(this._i=this.events.length;this._i--;)this.events[this._i].pendingDelete&&this.events.splice(this._i,1);this._len=this.events.length,this._i=0},update:function(a){if(this.paused)return!0;if(this.elapsed=a-this._now,this._now=a,this.elapsed>this.timeCap&&this.adjustEvents(a-this.elapsed),this._marked=0,this.clearPendingEvents(),this.running&&this._now>=this.nextTick&&this._len>0){for(;this._i<this._len&&this.running&&this._now>=this.events[this._i].tick&&!this.events[this._i].pendingDelete;)this._newTick=this._now+this.events[this._i].delay-(this._now-this.events[this._i].tick),this._newTick<0&&(this._newTick=this._now+this.events[this._i].delay),this.events[this._i].loop===!0?(this.events[this._i].tick=this._newTick,this.events[this._i].callback.apply(this.events[this._i].callbackContext,this.events[this._i].args)):this.events[this._i].repeatCount>0?(this.events[this._i].repeatCount--,this.events[this._i].tick=this._newTick,this.events[this._i].callback.apply(this.events[this._i].callbackContext,this.events[this._i].args)):(this._marked++,this.events[this._i].pendingDelete=!0,this.events[this._i].callback.apply(this.events[this._i].callbackContext,this.events[this._i].args)),this._i++;this.events.length>this._marked?this.order():(this.expired=!0,this.onComplete.dispatch(this))}return this.expired&&this.autoDestroy?!1:!0},pause:function(){this.running&&(this._codePaused=!0,this.paused||(this._pauseStarted=this.game.time.time,this.paused=!0))},_pause:function(){!this.paused&&this.running&&(this._pauseStarted=this.game.time.time,this.paused=!0)},adjustEvents:function(a){for(var b=0;b<this.events.length;b++)if(!this.events[b].pendingDelete){var c=this.events[b].tick-a;0>c&&(c=0),this.events[b].tick=this._now+c}var d=this.nextTick-a;0>d?this.nextTick=this._now:this.nextTick=this._now+d},resume:function(){if(this.paused){var a=this.game.time.time;this._pauseTotal+=a-this._now,this._now=a,this.adjustEvents(this._pauseStarted),this.paused=!1,this._codePaused=!1}},_resume:function(){this._codePaused||this.resume()},removeAll:function(){this.onComplete.removeAll(),this.events.length=0,this._len=0,this._i=0},destroy:function(){this.onComplete.removeAll(),this.running=!1,this.events=[],this._len=0,this._i=0}},Object.defineProperty(c.Timer.prototype,"next",{get:function(){return this.nextTick}}),Object.defineProperty(c.Timer.prototype,"duration",{get:function(){return this.running&&this.nextTick>this._now?this.nextTick-this._now:0}}),Object.defineProperty(c.Timer.prototype,"length",{get:function(){return this.events.length}}),Object.defineProperty(c.Timer.prototype,"ms",{get:function(){return this.running?this._now-this._started-this._pauseTotal:0}}),Object.defineProperty(c.Timer.prototype,"seconds",{get:function(){return this.running?.001*this.ms:0}}),c.Timer.prototype.constructor=c.Timer,c.TimerEvent=function(a,b,c,d,e,f,g,h){this.timer=a,this.delay=b,this.tick=c,this.repeatCount=d-1,this.loop=e,this.callback=f,this.callbackContext=g,this.args=h,this.pendingDelete=!1},c.TimerEvent.prototype.constructor=c.TimerEvent,c.AnimationManager=function(a){this.sprite=a,this.game=a.game,this.currentFrame=null,this.currentAnim=null,this.updateIfVisible=!0,this.isLoaded=!1,this._frameData=null,this._anims={},this._outputFrames=[]},c.AnimationManager.prototype={loadFrameData:function(a,b){if(void 0===a)return!1;if(this.isLoaded)for(var c in this._anims)this._anims[c].updateFrameData(a);return this._frameData=a,void 0===b||null===b?this.frame=0:"string"==typeof b?this.frameName=b:this.frame=b,this.isLoaded=!0,!0},copyFrameData:function(a,b){if(this._frameData=a.clone(),this.isLoaded)for(var c in this._anims)this._anims[c].updateFrameData(this._frameData);return void 0===b||null===b?this.frame=0:"string"==typeof b?this.frameName=b:this.frame=b,this.isLoaded=!0,!0},add:function(a,b,d,e,f){return b=b||[],d=d||60,void 0===e&&(e=!1),void 0===f&&(f=b&&"number"==typeof b[0]?!0:!1),this._outputFrames=[],this._frameData.getFrameIndexes(b,f,this._outputFrames),this._anims[a]=new c.Animation(this.game,this.sprite,a,this._frameData,this._outputFrames,d,e),this.currentAnim=this._anims[a],this.sprite.tilingTexture&&(this.sprite.refreshTexture=!0),this._anims[a]},validateFrames:function(a,b){void 0===b&&(b=!0);for(var c=0;c<a.length;c++)if(b===!0){if(a[c]>this._frameData.total)return!1}else if(this._frameData.checkFrameName(a[c])===!1)return!1;return!0},play:function(a,b,c,d){return this._anims[a]?this.currentAnim===this._anims[a]?this.currentAnim.isPlaying===!1?(this.currentAnim.paused=!1,this.currentAnim.play(b,c,d)):this.currentAnim:(this.currentAnim&&this.currentAnim.isPlaying&&this.currentAnim.stop(),this.currentAnim=this._anims[a],this.currentAnim.paused=!1,this.currentFrame=this.currentAnim.currentFrame,this.currentAnim.play(b,c,d)):void 0},stop:function(a,b){void 0===b&&(b=!1),!this.currentAnim||"string"==typeof a&&a!==this.currentAnim.name||this.currentAnim.stop(b)},update:function(){return this.updateIfVisible&&!this.sprite.visible?!1:this.currentAnim&&this.currentAnim.update()?(this.currentFrame=this.currentAnim.currentFrame,!0):!1},next:function(a){this.currentAnim&&(this.currentAnim.next(a),this.currentFrame=this.currentAnim.currentFrame)},previous:function(a){this.currentAnim&&(this.currentAnim.previous(a),this.currentFrame=this.currentAnim.currentFrame)},getAnimation:function(a){return"string"==typeof a&&this._anims[a]?this._anims[a]:null},refreshFrame:function(){this.sprite.setTexture(PIXI.TextureCache[this.currentFrame.uuid])},destroy:function(){var a=null;for(var a in this._anims)this._anims.hasOwnProperty(a)&&this._anims[a].destroy();this._anims={},this._outputFrames=[],this._frameData=null,this.currentAnim=null,this.currentFrame=null,this.sprite=null,this.game=null}},c.AnimationManager.prototype.constructor=c.AnimationManager,Object.defineProperty(c.AnimationManager.prototype,"frameData",{get:function(){return this._frameData}}),Object.defineProperty(c.AnimationManager.prototype,"frameTotal",{get:function(){return this._frameData.total}}),Object.defineProperty(c.AnimationManager.prototype,"paused",{get:function(){return this.currentAnim.isPaused},set:function(a){this.currentAnim.paused=a}}),Object.defineProperty(c.AnimationManager.prototype,"name",{get:function(){return this.currentAnim?this.currentAnim.name:void 0}}),Object.defineProperty(c.AnimationManager.prototype,"frame",{get:function(){return this.currentFrame?this.currentFrame.index:void 0},set:function(a){"number"==typeof a&&this._frameData&&null!==this._frameData.getFrame(a)&&(this.currentFrame=this._frameData.getFrame(a),this.currentFrame&&this.sprite.setFrame(this.currentFrame))}}),Object.defineProperty(c.AnimationManager.prototype,"frameName",{get:function(){return this.currentFrame?this.currentFrame.name:void 0},set:function(a){"string"==typeof a&&this._frameData&&null!==this._frameData.getFrameByName(a)?(this.currentFrame=this._frameData.getFrameByName(a),this.currentFrame&&(this._frameIndex=this.currentFrame.index,this.sprite.setFrame(this.currentFrame))):console.warn("Cannot set frameName: "+a)}}),c.Animation=function(a,b,d,e,f,g,h){void 0===h&&(h=!1),this.game=a,this._parent=b,this._frameData=e,this.name=d,this._frames=[],this._frames=this._frames.concat(f),this.delay=1e3/g,this.loop=h,this.loopCount=0,this.killOnComplete=!1,this.isFinished=!1,this.isPlaying=!1,this.isPaused=!1,this._pauseStartTime=0,this._frameIndex=0,this._frameDiff=0,this._frameSkip=1,this.currentFrame=this._frameData.getFrame(this._frames[this._frameIndex]),this.onStart=new c.Signal,this.onUpdate=null,this.onComplete=new c.Signal,this.onLoop=new c.Signal,this.game.onPause.add(this.onPause,this),this.game.onResume.add(this.onResume,this)},c.Animation.prototype={play:function(a,b,c){return"number"==typeof a&&(this.delay=1e3/a),"boolean"==typeof b&&(this.loop=b),"undefined"!=typeof c&&(this.killOnComplete=c),this.isPlaying=!0,this.isFinished=!1,this.paused=!1,this.loopCount=0,this._timeLastFrame=this.game.time.time,this._timeNextFrame=this.game.time.time+this.delay,this._frameIndex=0,this.updateCurrentFrame(!1,!0),this._parent.events.onAnimationStart$dispatch(this._parent,this),this.onStart.dispatch(this._parent,this),this._parent.animations.currentAnim=this,this._parent.animations.currentFrame=this.currentFrame,this},restart:function(){this.isPlaying=!0,this.isFinished=!1,this.paused=!1,this.loopCount=0,this._timeLastFrame=this.game.time.time,this._timeNextFrame=this.game.time.time+this.delay,this._frameIndex=0,this.currentFrame=this._frameData.getFrame(this._frames[this._frameIndex]),this._parent.setFrame(this.currentFrame),this._parent.animations.currentAnim=this,this._parent.animations.currentFrame=this.currentFrame,this.onStart.dispatch(this._parent,this)},setFrame:function(a,b){var c;if(void 0===b&&(b=!1),"string"==typeof a)for(var d=0;d<this._frames.length;d++)this._frameData.getFrame(this._frames[d]).name===a&&(c=d);else if("number"==typeof a)if(b)c=a;else for(var d=0;d<this._frames.length;d++)this._frames[d]===c&&(c=d);c&&(this._frameIndex=c-1,this._timeNextFrame=this.game.time.time,this.update())},stop:function(a,b){void 0===a&&(a=!1),void 0===b&&(b=!1),this.isPlaying=!1,this.isFinished=!0,this.paused=!1,a&&(this.currentFrame=this._frameData.getFrame(this._frames[0]),this._parent.setFrame(this.currentFrame)),b&&(this._parent.events.onAnimationComplete$dispatch(this._parent,this),this.onComplete.dispatch(this._parent,this))},onPause:function(){this.isPlaying&&(this._frameDiff=this._timeNextFrame-this.game.time.time)},onResume:function(){this.isPlaying&&(this._timeNextFrame=this.game.time.time+this._frameDiff)},update:function(){return this.isPaused?!1:this.isPlaying&&this.game.time.time>=this._timeNextFrame?(this._frameSkip=1,this._frameDiff=this.game.time.time-this._timeNextFrame,this._timeLastFrame=this.game.time.time,this._frameDiff>this.delay&&(this._frameSkip=Math.floor(this._frameDiff/this.delay),this._frameDiff-=this._frameSkip*this.delay),this._timeNextFrame=this.game.time.time+(this.delay-this._frameDiff),this._frameIndex+=this._frameSkip,this._frameIndex>=this._frames.length?this.loop?(this._frameIndex%=this._frames.length,this.currentFrame=this._frameData.getFrame(this._frames[this._frameIndex]),this.currentFrame&&this._parent.setFrame(this.currentFrame),this.loopCount++,this._parent.events.onAnimationLoop$dispatch(this._parent,this),this.onLoop.dispatch(this._parent,this),this.onUpdate?(this.onUpdate.dispatch(this,this.currentFrame),!!this._frameData):!0):(this.complete(),!1):this.updateCurrentFrame(!0)):!1},updateCurrentFrame:function(a,b){if(void 0===b&&(b=!1),!this._frameData)return!1;var c=this.currentFrame.index;return this.currentFrame=this._frameData.getFrame(this._frames[this._frameIndex]),this.currentFrame&&(b||!b&&c!==this.currentFrame.index)&&this._parent.setFrame(this.currentFrame),this.onUpdate&&a?(this.onUpdate.dispatch(this,this.currentFrame),!!this._frameData):!0},next:function(a){void 0===a&&(a=1);var b=this._frameIndex+a;b>=this._frames.length&&(this.loop?b%=this._frames.length:b=this._frames.length-1),b!==this._frameIndex&&(this._frameIndex=b,this.updateCurrentFrame(!0))},previous:function(a){void 0===a&&(a=1);var b=this._frameIndex-a;0>b&&(this.loop?b=this._frames.length+b:b++),b!==this._frameIndex&&(this._frameIndex=b,this.updateCurrentFrame(!0))},updateFrameData:function(a){this._frameData=a,this.currentFrame=this._frameData?this._frameData.getFrame(this._frames[this._frameIndex%this._frames.length]):null},destroy:function(){this._frameData&&(this.game.onPause.remove(this.onPause,this),this.game.onResume.remove(this.onResume,this),this.game=null,this._parent=null,this._frames=null,this._frameData=null,this.currentFrame=null,this.isPlaying=!1,this.onStart.dispose(),this.onLoop.dispose(),this.onComplete.dispose(),this.onUpdate&&this.onUpdate.dispose())},complete:function(){this._frameIndex=this._frames.length-1,this.currentFrame=this._frameData.getFrame(this._frames[this._frameIndex]),this.isPlaying=!1,this.isFinished=!0,this.paused=!1,this._parent.events.onAnimationComplete$dispatch(this._parent,this),this.onComplete.dispatch(this._parent,this),this.killOnComplete&&this._parent.kill()}},c.Animation.prototype.constructor=c.Animation,Object.defineProperty(c.Animation.prototype,"paused",{get:function(){return this.isPaused},set:function(a){this.isPaused=a,a?this._pauseStartTime=this.game.time.time:this.isPlaying&&(this._timeNextFrame=this.game.time.time+this.delay)}}),Object.defineProperty(c.Animation.prototype,"frameTotal",{get:function(){return this._frames.length}}),Object.defineProperty(c.Animation.prototype,"frame",{get:function(){return null!==this.currentFrame?this.currentFrame.index:this._frameIndex},set:function(a){this.currentFrame=this._frameData.getFrame(this._frames[a]),null!==this.currentFrame&&(this._frameIndex=a,this._parent.setFrame(this.currentFrame),this.onUpdate&&this.onUpdate.dispatch(this,this.currentFrame))}}),Object.defineProperty(c.Animation.prototype,"speed",{get:function(){return Math.round(1e3/this.delay)},set:function(a){a>=1&&(this.delay=1e3/a)}}),Object.defineProperty(c.Animation.prototype,"enableUpdate",{get:function(){return null!==this.onUpdate},set:function(a){a&&null===this.onUpdate?this.onUpdate=new c.Signal:a||null===this.onUpdate||(this.onUpdate.dispose(),this.onUpdate=null)}}),c.Animation.generateFrameNames=function(a,b,d,e,f){void 0===e&&(e="");var g=[],h="";if(d>b)for(var i=b;d>=i;i++)h="number"==typeof f?c.Utils.pad(i.toString(),f,"0",1):i.toString(),h=a+h+e,g.push(h);else for(var i=b;i>=d;i--)h="number"==typeof f?c.Utils.pad(i.toString(),f,"0",1):i.toString(),h=a+h+e,g.push(h);return g},c.Frame=function(a,b,d,e,f,g){this.index=a,this.x=b,this.y=d,this.width=e,this.height=f,this.name=g,this.centerX=Math.floor(e/2),this.centerY=Math.floor(f/2),this.distance=c.Math.distance(0,0,e,f),this.rotated=!1,this.rotationDirection="cw",this.trimmed=!1,this.sourceSizeW=e,this.sourceSizeH=f,this.spriteSourceSizeX=0,this.spriteSourceSizeY=0,this.spriteSourceSizeW=0,this.spriteSourceSizeH=0,this.right=this.x+this.width,this.bottom=this.y+this.height},c.Frame.prototype={resize:function(a,b){this.width=a,this.height=b,this.centerX=Math.floor(a/2),this.centerY=Math.floor(b/2),this.distance=c.Math.distance(0,0,a,b),this.sourceSizeW=a,this.sourceSizeH=b,this.right=this.x+a,this.bottom=this.y+b},setTrim:function(a,b,c,d,e,f,g){this.trimmed=a,a&&(this.sourceSizeW=b,this.sourceSizeH=c,this.centerX=Math.floor(b/2),this.centerY=Math.floor(c/2),this.spriteSourceSizeX=d,this.spriteSourceSizeY=e,this.spriteSourceSizeW=f,this.spriteSourceSizeH=g)},clone:function(){var a=new c.Frame(this.index,this.x,this.y,this.width,this.height,this.name);for(var b in this)this.hasOwnProperty(b)&&(a[b]=this[b]);return a},getRect:function(a){return void 0===a?a=new c.Rectangle(this.x,this.y,this.width,this.height):a.setTo(this.x,this.y,this.width,this.height),a}},c.Frame.prototype.constructor=c.Frame,c.FrameData=function(){this._frames=[],this._frameNames=[]},c.FrameData.prototype={addFrame:function(a){return a.index=this._frames.length,this._frames.push(a),""!==a.name&&(this._frameNames[a.name]=a.index),a},getFrame:function(a){return a>=this._frames.length&&(a=0),this._frames[a]},getFrameByName:function(a){return"number"==typeof this._frameNames[a]?this._frames[this._frameNames[a]]:null},checkFrameName:function(a){return null==this._frameNames[a]?!1:!0},clone:function(){for(var a=new c.FrameData,b=0;b<this._frames.length;b++)a._frames.push(this._frames[b].clone());for(var d in this._frameNames)this._frameNames.hasOwnProperty(d)&&a._frameNames.push(this._frameNames[d]);return a},getFrameRange:function(a,b,c){void 0===c&&(c=[]);for(var d=a;b>=d;d++)c.push(this._frames[d]);return c},getFrames:function(a,b,c){if(void 0===b&&(b=!0),void 0===c&&(c=[]),void 0===a||0===a.length)for(var d=0;d<this._frames.length;d++)c.push(this._frames[d]);else for(var d=0;d<a.length;d++)b?c.push(this.getFrame(a[d])):c.push(this.getFrameByName(a[d]));return c},getFrameIndexes:function(a,b,c){if(void 0===b&&(b=!0),void 0===c&&(c=[]),void 0===a||0===a.length)for(var d=0;d<this._frames.length;d++)c.push(this._frames[d].index);else for(var d=0;d<a.length;d++)b&&this._frames[a[d]]?c.push(this._frames[a[d]].index):this.getFrameByName(a[d])&&c.push(this.getFrameByName(a[d]).index);return c},destroy:function(){this._frames=null,this._frameNames=null}},c.FrameData.prototype.constructor=c.FrameData,Object.defineProperty(c.FrameData.prototype,"total",{get:function(){return this._frames.length}}),c.AnimationParser={spriteSheet:function(a,b,d,e,f,g,h){var i=b;if("string"==typeof b&&(i=a.cache.getImage(b)),null===i)return null;var j=i.width,k=i.height;0>=d&&(d=Math.floor(-j/Math.min(-1,d))),0>=e&&(e=Math.floor(-k/Math.min(-1,e)));var l=Math.floor((j-g)/(d+h)),m=Math.floor((k-g)/(e+h)),n=l*m;if(-1!==f&&(n=f),0===j||0===k||d>j||e>k||0===n)return console.warn("Phaser.AnimationParser.spriteSheet: '"+b+"'s width/height zero or width/height < given frameWidth/frameHeight"),null;for(var o=new c.FrameData,p=g,q=g,r=0;n>r;r++)o.addFrame(new c.Frame(r,p,q,d,e,"")),p+=d+h,p+d>j&&(p=g,q+=e+h);return o},JSONData:function(a,b){if(!b.frames)return console.warn("Phaser.AnimationParser.JSONData: Invalid Texture Atlas JSON given, missing 'frames' array"),void console.log(b);for(var d,e=new c.FrameData,f=b.frames,g=0;g<f.length;g++)d=e.addFrame(new c.Frame(g,f[g].frame.x,f[g].frame.y,f[g].frame.w,f[g].frame.h,f[g].filename)),f[g].trimmed&&d.setTrim(f[g].trimmed,f[g].sourceSize.w,f[g].sourceSize.h,f[g].spriteSourceSize.x,f[g].spriteSourceSize.y,f[g].spriteSourceSize.w,f[g].spriteSourceSize.h);return e},JSONDataPyxel:function(a,b){var d=["layers","tilewidth","tileheight","tileswide","tileshigh"];if(d.forEach(function(a){return b[a]?void 0:(console.warn("Phaser.AnimationParser.JSONDataPyxel: Invalid Pyxel Tilemap JSON given, missing '"+a+"' key."),void console.log(b))}),1!=b.layers.length)return console.warn("Phaser.AnimationParser.JSONDataPyxel: Too many layers, this parser only supports flat Tilemaps."),void console.log(b);for(var e,f=new c.FrameData,g=b.tileheight,h=b.tilewidth,i=b.layers[0].tiles,j=0;j<i.length;j++)e=f.addFrame(new c.Frame(j,i[j].x,i[j].y,h,g,"frame_"+j)),e.setTrim(!1);return f},JSONDataHash:function(a,b){if(!b.frames)return console.warn("Phaser.AnimationParser.JSONDataHash: Invalid Texture Atlas JSON given, missing 'frames' object"),void console.log(b);var d,e=new c.FrameData,f=b.frames,g=0;for(var h in f)d=e.addFrame(new c.Frame(g,f[h].frame.x,f[h].frame.y,f[h].frame.w,f[h].frame.h,h)),f[h].trimmed&&d.setTrim(f[h].trimmed,f[h].sourceSize.w,f[h].sourceSize.h,f[h].spriteSourceSize.x,f[h].spriteSourceSize.y,f[h].spriteSourceSize.w,f[h].spriteSourceSize.h),g++;return e},XMLData:function(a,b){if(!b.getElementsByTagName("TextureAtlas"))return void console.warn("Phaser.AnimationParser.XMLData: Invalid Texture Atlas XML given, missing <TextureAtlas> tag");for(var d,e,f,g,h,i,j,k,l,m,n,o=new c.FrameData,p=b.getElementsByTagName("SubTexture"),q=0;q<p.length;q++)f=p[q].attributes,e=f.name.value,g=parseInt(f.x.value,10),h=parseInt(f.y.value,10),i=parseInt(f.width.value,10),j=parseInt(f.height.value,10),k=null,l=null,f.frameX&&(k=Math.abs(parseInt(f.frameX.value,10)),l=Math.abs(parseInt(f.frameY.value,10)),m=parseInt(f.frameWidth.value,10),n=parseInt(f.frameHeight.value,10)),d=o.addFrame(new c.Frame(q,g,h,i,j,e)),(null!==k||null!==l)&&d.setTrim(!0,i,j,k,l,m,n);return o}},c.Cache=function(a){this.game=a,this.autoResolveURL=!1,this._cache={canvas:{},image:{},texture:{},sound:{},video:{},text:{},json:{},xml:{},physics:{},tilemap:{},binary:{},bitmapData:{},bitmapFont:{},shader:{},renderTexture:{}},this._urlMap={},this._urlResolver=new Image,this._urlTemp=null,this.onSoundUnlock=new c.Signal,this._cacheMap=[],this._cacheMap[c.Cache.CANVAS]=this._cache.canvas,this._cacheMap[c.Cache.IMAGE]=this._cache.image,this._cacheMap[c.Cache.TEXTURE]=this._cache.texture,this._cacheMap[c.Cache.SOUND]=this._cache.sound,this._cacheMap[c.Cache.TEXT]=this._cache.text,this._cacheMap[c.Cache.PHYSICS]=this._cache.physics,this._cacheMap[c.Cache.TILEMAP]=this._cache.tilemap,this._cacheMap[c.Cache.BINARY]=this._cache.binary,this._cacheMap[c.Cache.BITMAPDATA]=this._cache.bitmapData,this._cacheMap[c.Cache.BITMAPFONT]=this._cache.bitmapFont,this._cacheMap[c.Cache.JSON]=this._cache.json,this._cacheMap[c.Cache.XML]=this._cache.xml,this._cacheMap[c.Cache.VIDEO]=this._cache.video,this._cacheMap[c.Cache.SHADER]=this._cache.shader,this._cacheMap[c.Cache.RENDER_TEXTURE]=this._cache.renderTexture,this.addDefaultImage(),this.addMissingImage()},c.Cache.CANVAS=1,c.Cache.IMAGE=2,c.Cache.TEXTURE=3,c.Cache.SOUND=4,c.Cache.TEXT=5,c.Cache.PHYSICS=6,c.Cache.TILEMAP=7,c.Cache.BINARY=8,c.Cache.BITMAPDATA=9,c.Cache.BITMAPFONT=10,c.Cache.JSON=11,c.Cache.XML=12,c.Cache.VIDEO=13,c.Cache.SHADER=14,c.Cache.RENDER_TEXTURE=15,c.Cache.prototype={addCanvas:function(a,b,c){void 0===c&&(c=b.getContext("2d")),this._cache.canvas[a]={canvas:b,context:c}},addImage:function(a,b,d){this.checkImageKey(a)&&this.removeImage(a);var e={key:a,url:b,data:d,base:new PIXI.BaseTexture(d),frame:new c.Frame(0,0,0,d.width,d.height,a),frameData:new c.FrameData};return e.frameData.addFrame(new c.Frame(0,0,0,d.width,d.height,b)),this._cache.image[a]=e,this._resolveURL(b,e),e},addDefaultImage:function(){var a=new Image;a.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgAQMAAABJtOi3AAAAA1BMVEX///+nxBvIAAAAAXRSTlMAQObYZgAAABVJREFUeF7NwIEAAAAAgKD9qdeocAMAoAABm3DkcAAAAABJRU5ErkJggg==";var b=this.addImage("__default",null,a);b.base.skipRender=!0,PIXI.TextureCache.__default=new PIXI.Texture(b.base)},addMissingImage:function(){var a=new Image;a.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJ9JREFUeNq01ssOwyAMRFG46v//Mt1ESmgh+DFmE2GPOBARKb2NVjo+17PXLD8a1+pl5+A+wSgFygymWYHBb0FtsKhJDdZlncG2IzJ4ayoMDv20wTmSMzClEgbWYNTAkQ0Z+OJ+A/eWnAaR9+oxCF4Os0H8htsMUp+pwcgBBiMNnAwF8GqIgL2hAzaGFFgZauDPKABmowZ4GL369/0rwACp2yA/ttmvsQAAAABJRU5ErkJggg==";var b=this.addImage("__missing",null,a);PIXI.TextureCache.__missing=new PIXI.Texture(b.base)},addSound:function(a,b,c,d,e){void 0===d&&(d=!0,e=!1),void 0===e&&(d=!1,e=!0);var f=!1;e&&(f=!0),this._cache.sound[a]={url:b,data:c,isDecoding:!1,decoded:f,webAudio:d,audioTag:e,locked:this.game.sound.touchLocked},this._resolveURL(b,this._cache.sound[a])},addText:function(a,b,c){this._cache.text[a]={url:b,data:c},this._resolveURL(b,this._cache.text[a])},addPhysicsData:function(a,b,c,d){this._cache.physics[a]={url:b,data:c,format:d},this._resolveURL(b,this._cache.physics[a])},addTilemap:function(a,b,c,d){this._cache.tilemap[a]={url:b,data:c,format:d},this._resolveURL(b,this._cache.tilemap[a])},addBinary:function(a,b){this._cache.binary[a]=b},addBitmapData:function(a,b,d){return b.key=a,void 0===d&&(d=new c.FrameData,d.addFrame(b.textureFrame)),this._cache.bitmapData[a]={data:b,frameData:d},b},addBitmapFont:function(a,b,d,e,f,g,h){var i={url:b,data:d,font:null,base:new PIXI.BaseTexture(d)};void 0===g&&(g=0),void 0===h&&(h=0),"json"===f?i.font=c.LoaderParser.jsonBitmapFont(e,i.base,g,h):i.font=c.LoaderParser.xmlBitmapFont(e,i.base,g,h),this._cache.bitmapFont[a]=i,this._resolveURL(b,i)},addJSON:function(a,b,c){this._cache.json[a]={url:b,data:c},this._resolveURL(b,this._cache.json[a])},addXML:function(a,b,c){this._cache.xml[a]={url:b,data:c},this._resolveURL(b,this._cache.xml[a])},addVideo:function(a,b,c,d){this._cache.video[a]={url:b,data:c,isBlob:d,locked:!0},this._resolveURL(b,this._cache.video[a])},addShader:function(a,b,c){this._cache.shader[a]={url:b,data:c},this._resolveURL(b,this._cache.shader[a])},addRenderTexture:function(a,b){this._cache.renderTexture[a]={texture:b,frame:new c.Frame(0,0,0,b.width,b.height,"","")}},addSpriteSheet:function(a,b,d,e,f,g,h,i){void 0===g&&(g=-1),void 0===h&&(h=0),void 0===i&&(i=0);var j={key:a,url:b,data:d,frameWidth:e,frameHeight:f,margin:h,spacing:i,base:new PIXI.BaseTexture(d),frameData:c.AnimationParser.spriteSheet(this.game,d,e,f,g,h,i)};this._cache.image[a]=j,this._resolveURL(b,j)},addTextureAtlas:function(a,b,d,e,f){var g={key:a,url:b,data:d,base:new PIXI.BaseTexture(d)};f===c.Loader.TEXTURE_ATLAS_XML_STARLING?g.frameData=c.AnimationParser.XMLData(this.game,e,a):f===c.Loader.TEXTURE_ATLAS_JSON_PYXEL?g.frameData=c.AnimationParser.JSONDataPyxel(this.game,e,a):Array.isArray(e.frames)?g.frameData=c.AnimationParser.JSONData(this.game,e,a):g.frameData=c.AnimationParser.JSONDataHash(this.game,e,a),this._cache.image[a]=g,this._resolveURL(b,g)},reloadSound:function(a){var b=this,c=this.getSound(a);c&&(c.data.src=c.url,c.data.addEventListener("canplaythrough",function(){return b.reloadSoundComplete(a)},!1),c.data.load())},reloadSoundComplete:function(a){var b=this.getSound(a);b&&(b.locked=!1,this.onSoundUnlock.dispatch(a))},updateSound:function(a,b,c){var d=this.getSound(a);d&&(d[b]=c)},decodedSound:function(a,b){var c=this.getSound(a);c.data=b,c.decoded=!0,c.isDecoding=!1},isSoundDecoded:function(a){var b=this.getItem(a,c.Cache.SOUND,"isSoundDecoded");return b?b.decoded:void 0},isSoundReady:function(a){var b=this.getItem(a,c.Cache.SOUND,"isSoundDecoded");return b?b.decoded&&!this.game.sound.touchLocked:void 0},checkKey:function(a,b){return this._cacheMap[a][b]?!0:!1},checkURL:function(a){return this._urlMap[this._resolveURL(a)]?!0:!1},checkCanvasKey:function(a){return this.checkKey(c.Cache.CANVAS,a)},checkImageKey:function(a){return this.checkKey(c.Cache.IMAGE,a)},checkTextureKey:function(a){return this.checkKey(c.Cache.TEXTURE,a)},checkSoundKey:function(a){
return this.checkKey(c.Cache.SOUND,a)},checkTextKey:function(a){return this.checkKey(c.Cache.TEXT,a)},checkPhysicsKey:function(a){return this.checkKey(c.Cache.PHYSICS,a)},checkTilemapKey:function(a){return this.checkKey(c.Cache.TILEMAP,a)},checkBinaryKey:function(a){return this.checkKey(c.Cache.BINARY,a)},checkBitmapDataKey:function(a){return this.checkKey(c.Cache.BITMAPDATA,a)},checkBitmapFontKey:function(a){return this.checkKey(c.Cache.BITMAPFONT,a)},checkJSONKey:function(a){return this.checkKey(c.Cache.JSON,a)},checkXMLKey:function(a){return this.checkKey(c.Cache.XML,a)},checkVideoKey:function(a){return this.checkKey(c.Cache.VIDEO,a)},checkShaderKey:function(a){return this.checkKey(c.Cache.SHADER,a)},checkRenderTextureKey:function(a){return this.checkKey(c.Cache.RENDER_TEXTURE,a)},getItem:function(a,b,c,d){return this.checkKey(b,a)?void 0===d?this._cacheMap[b][a]:this._cacheMap[b][a][d]:(c&&console.warn("Phaser.Cache."+c+': Key "'+a+'" not found in Cache.'),null)},getCanvas:function(a){return this.getItem(a,c.Cache.CANVAS,"getCanvas","canvas")},getImage:function(a,b){(void 0===a||null===a)&&(a="__default"),void 0===b&&(b=!1);var d=this.getItem(a,c.Cache.IMAGE,"getImage");return null===d&&(d=this.getItem("__missing",c.Cache.IMAGE,"getImage")),b?d:d.data},getTextureFrame:function(a){return this.getItem(a,c.Cache.TEXTURE,"getTextureFrame","frame")},getSound:function(a){return this.getItem(a,c.Cache.SOUND,"getSound")},getSoundData:function(a){return this.getItem(a,c.Cache.SOUND,"getSoundData","data")},getText:function(a){return this.getItem(a,c.Cache.TEXT,"getText","data")},getPhysicsData:function(a,b,d){var e=this.getItem(a,c.Cache.PHYSICS,"getPhysicsData","data");if(null===e||void 0===b||null===b)return e;if(e[b]){var f=e[b];if(!f||!d)return f;for(var g in f)if(g=f[g],g.fixtureKey===d)return g;console.warn('Phaser.Cache.getPhysicsData: Could not find given fixtureKey: "'+d+" in "+a+'"')}else console.warn('Phaser.Cache.getPhysicsData: Invalid key/object: "'+a+" / "+b+'"');return null},getTilemapData:function(a){return this.getItem(a,c.Cache.TILEMAP,"getTilemapData")},getBinary:function(a){return this.getItem(a,c.Cache.BINARY,"getBinary")},getBitmapData:function(a){return this.getItem(a,c.Cache.BITMAPDATA,"getBitmapData","data")},getBitmapFont:function(a){return this.getItem(a,c.Cache.BITMAPFONT,"getBitmapFont")},getJSON:function(a,b){var d=this.getItem(a,c.Cache.JSON,"getJSON","data");return d?b?c.Utils.extend(!0,d):d:null},getXML:function(a){return this.getItem(a,c.Cache.XML,"getXML","data")},getVideo:function(a){return this.getItem(a,c.Cache.VIDEO,"getVideo")},getShader:function(a){return this.getItem(a,c.Cache.SHADER,"getShader","data")},getRenderTexture:function(a){return this.getItem(a,c.Cache.RENDER_TEXTURE,"getRenderTexture")},getBaseTexture:function(a,b){return void 0===b&&(b=c.Cache.IMAGE),this.getItem(a,b,"getBaseTexture","base")},getFrame:function(a,b){return void 0===b&&(b=c.Cache.IMAGE),this.getItem(a,b,"getFrame","frame")},getFrameCount:function(a,b){var c=this.getFrameData(a,b);return c?c.total:0},getFrameData:function(a,b){return void 0===b&&(b=c.Cache.IMAGE),this.getItem(a,b,"getFrameData","frameData")},hasFrameData:function(a,b){return void 0===b&&(b=c.Cache.IMAGE),null!==this.getItem(a,b,"","frameData")},updateFrameData:function(a,b,d){void 0===d&&(d=c.Cache.IMAGE),this._cacheMap[d][a]&&(this._cacheMap[d][a].frameData=b)},getFrameByIndex:function(a,b,c){var d=this.getFrameData(a,c);return d?d.getFrame(b):null},getFrameByName:function(a,b,c){var d=this.getFrameData(a,c);return d?d.getFrameByName(b):null},getPixiTexture:function(a){if(PIXI.TextureCache[a])return PIXI.TextureCache[a];var b=this.getPixiBaseTexture(a);return b?new PIXI.Texture(b):null},getPixiBaseTexture:function(a){if(PIXI.BaseTextureCache[a])return PIXI.BaseTextureCache[a];var b=this.getItem(a,c.Cache.IMAGE,"getPixiBaseTexture");return null!==b?b.base:null},getURL:function(a){var a=this._resolveURL(a);return a?this._urlMap[a]:(console.warn('Phaser.Cache.getUrl: Invalid url: "'+a+'" or Cache.autoResolveURL was false'),null)},getKeys:function(a){void 0===a&&(a=c.Cache.IMAGE);var b=[];if(this._cacheMap[a])for(var d in this._cacheMap[a])"__default"!==d&&"__missing"!==d&&b.push(d);return b},removeCanvas:function(a){delete this._cache.canvas[a]},removeImage:function(a,b){void 0===b&&(b=!0);var c=this.getImage(a,!0);b&&c.base&&c.base.destroy(),delete this._cache.image[a]},removeSound:function(a){delete this._cache.sound[a]},removeText:function(a){delete this._cache.text[a]},removePhysics:function(a){delete this._cache.physics[a]},removeTilemap:function(a){delete this._cache.tilemap[a]},removeBinary:function(a){delete this._cache.binary[a]},removeBitmapData:function(a){delete this._cache.bitmapData[a]},removeBitmapFont:function(a){delete this._cache.bitmapFont[a]},removeJSON:function(a){delete this._cache.json[a]},removeXML:function(a){delete this._cache.xml[a]},removeVideo:function(a){delete this._cache.video[a]},removeShader:function(a){delete this._cache.shader[a]},removeRenderTexture:function(a){delete this._cache.renderTexture[a]},removeSpriteSheet:function(a){delete this._cache.spriteSheet[a]},removeTextureAtlas:function(a){delete this._cache.atlas[a]},clearGLTextures:function(){for(var a in this._cache.image)this._cache.image[a].base._glTextures=[]},_resolveURL:function(a,b){return this.autoResolveURL?(this._urlResolver.src=this.game.load.baseURL+a,this._urlTemp=this._urlResolver.src,this._urlResolver.src="",b&&(this._urlMap[this._urlTemp]=b),this._urlTemp):null},destroy:function(){for(var a=0;a<this._cacheMap.length;a++){var b=this._cacheMap[a];for(var c in b)"__default"!==c&&"__missing"!==c&&(b[c].destroy&&b[c].destroy(),delete b[c])}this._urlMap=null,this._urlResolver=null,this._urlTemp=null}},c.Cache.prototype.constructor=c.Cache,c.Loader=function(a){this.game=a,this.cache=a.cache,this.resetLocked=!1,this.isLoading=!1,this.hasLoaded=!1,this.preloadSprite=null,this.crossOrigin=!1,this.baseURL="",this.path="",this.onLoadStart=new c.Signal,this.onLoadComplete=new c.Signal,this.onPackComplete=new c.Signal,this.onFileStart=new c.Signal,this.onFileComplete=new c.Signal,this.onFileError=new c.Signal,this.useXDomainRequest=!1,this._warnedAboutXDomainRequest=!1,this.enableParallel=!0,this.maxParallelDownloads=4,this._withSyncPointDepth=0,this._fileList=[],this._flightQueue=[],this._processingHead=0,this._fileLoadStarted=!1,this._totalPackCount=0,this._totalFileCount=0,this._loadedPackCount=0,this._loadedFileCount=0},c.Loader.TEXTURE_ATLAS_JSON_ARRAY=0,c.Loader.TEXTURE_ATLAS_JSON_HASH=1,c.Loader.TEXTURE_ATLAS_XML_STARLING=2,c.Loader.PHYSICS_LIME_CORONA_JSON=3,c.Loader.PHYSICS_PHASER_JSON=4,c.Loader.TEXTURE_ATLAS_JSON_PYXEL=5,c.Loader.prototype={setPreloadSprite:function(a,b){b=b||0,this.preloadSprite={sprite:a,direction:b,width:a.width,height:a.height,rect:null},0===b?this.preloadSprite.rect=new c.Rectangle(0,0,1,a.height):this.preloadSprite.rect=new c.Rectangle(0,0,a.width,1),a.crop(this.preloadSprite.rect),a.visible=!0},resize:function(){this.preloadSprite&&this.preloadSprite.height!==this.preloadSprite.sprite.height&&(this.preloadSprite.rect.height=this.preloadSprite.sprite.height)},checkKeyExists:function(a,b){return this.getAssetIndex(a,b)>-1},getAssetIndex:function(a,b){for(var c=-1,d=0;d<this._fileList.length;d++){var e=this._fileList[d];if(e.type===a&&e.key===b&&(c=d,!e.loaded&&!e.loading))break}return c},getAsset:function(a,b){var c=this.getAssetIndex(a,b);return c>-1?{index:c,file:this._fileList[c]}:!1},reset:function(a,b){void 0===b&&(b=!1),this.resetLocked||(a&&(this.preloadSprite=null),this.isLoading=!1,this._processingHead=0,this._fileList.length=0,this._flightQueue.length=0,this._fileLoadStarted=!1,this._totalFileCount=0,this._totalPackCount=0,this._loadedPackCount=0,this._loadedFileCount=0,b&&(this.onLoadStart.removeAll(),this.onLoadComplete.removeAll(),this.onPackComplete.removeAll(),this.onFileStart.removeAll(),this.onFileComplete.removeAll(),this.onFileError.removeAll()))},addToFileList:function(a,b,c,d,e,f){if(void 0===e&&(e=!1),void 0===b||""===b)return console.warn("Phaser.Loader: Invalid or no key given of type "+a),this;if(void 0===c||null===c){if(!f)return console.warn("Phaser.Loader: No URL given for file type: "+a+" key: "+b),this;c=b+f}var g={type:a,key:b,path:this.path,url:c,syncPoint:this._withSyncPointDepth>0,data:null,loading:!1,loaded:!1,error:!1};if(d)for(var h in d)g[h]=d[h];var i=this.getAssetIndex(a,b);if(e&&i>-1){var j=this._fileList[i];j.loading||j.loaded?(this._fileList.push(g),this._totalFileCount++):this._fileList[i]=g}else-1===i&&(this._fileList.push(g),this._totalFileCount++);return this},replaceInFileList:function(a,b,c,d){return this.addToFileList(a,b,c,d,!0)},pack:function(a,b,c,d){if(void 0===b&&(b=null),void 0===c&&(c=null),void 0===d&&(d=null),!b&&!c)return console.warn("Phaser.Loader.pack - Both url and data are null. One must be set."),this;var e={type:"packfile",key:a,url:b,path:this.path,syncPoint:!0,data:null,loading:!1,loaded:!1,error:!1,callbackContext:d};c&&("string"==typeof c&&(c=JSON.parse(c)),e.data=c||{},e.loaded=!0);for(var f=0;f<this._fileList.length+1;f++){var g=this._fileList[f];if(!g||!g.loaded&&!g.loading&&"packfile"!==g.type){this._fileList.splice(f,0,e),this._totalPackCount++;break}}return this},image:function(a,b,c){return this.addToFileList("image",a,b,void 0,c,".png")},images:function(a,b){if(Array.isArray(b))for(var c=0;c<a.length;c++)this.image(a[c],b[c]);else for(var c=0;c<a.length;c++)this.image(a[c]);return this},text:function(a,b,c){return this.addToFileList("text",a,b,void 0,c,".txt")},json:function(a,b,c){return this.addToFileList("json",a,b,void 0,c,".json")},shader:function(a,b,c){return this.addToFileList("shader",a,b,void 0,c,".frag")},xml:function(a,b,c){return this.addToFileList("xml",a,b,void 0,c,".xml")},script:function(a,b,c,d){return void 0===c&&(c=!1),c!==!1&&void 0===d&&(d=this),this.addToFileList("script",a,b,{syncPoint:!0,callback:c,callbackContext:d},!1,".js")},binary:function(a,b,c,d){return void 0===c&&(c=!1),c!==!1&&void 0===d&&(d=c),this.addToFileList("binary",a,b,{callback:c,callbackContext:d},!1,".bin")},spritesheet:function(a,b,c,d,e,f,g){return void 0===e&&(e=-1),void 0===f&&(f=0),void 0===g&&(g=0),this.addToFileList("spritesheet",a,b,{frameWidth:c,frameHeight:d,frameMax:e,margin:f,spacing:g},!1,".png")},audio:function(a,b,c){return this.game.sound.noAudio?this:(void 0===c&&(c=!0),"string"==typeof b&&(b=[b]),this.addToFileList("audio",a,b,{buffer:null,autoDecode:c}))},audioSprite:function(a,b,c,d,e){return this.game.sound.noAudio?this:(void 0===c&&(c=null),void 0===d&&(d=null),void 0===e&&(e=!0),this.audio(a,b,e),c?this.json(a+"-audioatlas",c):d?("string"==typeof d&&(d=JSON.parse(d)),this.cache.addJSON(a+"-audioatlas","",d)):console.warn("Phaser.Loader.audiosprite - You must specify either a jsonURL or provide a jsonData object"),this)},audiosprite:function(a,b,c,d,e){return this.audioSprite(a,b,c,d,e)},video:function(a,b,c,d){return void 0===c&&(c=this.game.device.firefox?"loadeddata":"canplaythrough"),void 0===d&&(d=!1),"string"==typeof b&&(b=[b]),this.addToFileList("video",a,b,{buffer:null,asBlob:d,loadEvent:c})},tilemap:function(a,b,d,e){if(void 0===b&&(b=null),void 0===d&&(d=null),void 0===e&&(e=c.Tilemap.CSV),b||d||(b=e===c.Tilemap.CSV?a+".csv":a+".json"),d){switch(e){case c.Tilemap.CSV:break;case c.Tilemap.TILED_JSON:"string"==typeof d&&(d=JSON.parse(d))}this.cache.addTilemap(a,null,d,e)}else this.addToFileList("tilemap",a,b,{format:e});return this},physics:function(a,b,d,e){return void 0===b&&(b=null),void 0===d&&(d=null),void 0===e&&(e=c.Physics.LIME_CORONA_JSON),b||d||(b=a+".json"),d?("string"==typeof d&&(d=JSON.parse(d)),this.cache.addPhysicsData(a,null,d,e)):this.addToFileList("physics",a,b,{format:e}),this},bitmapFont:function(a,b,c,d,e,f){if((void 0===b||null===b)&&(b=a+".png"),void 0===c&&(c=null),void 0===d&&(d=null),null===c&&null===d&&(c=a+".xml"),void 0===e&&(e=0),void 0===f&&(f=0),c)this.addToFileList("bitmapfont",a,b,{atlasURL:c,xSpacing:e,ySpacing:f});else if("string"==typeof d){var g,h;try{g=JSON.parse(d)}catch(i){h=this.parseXml(d)}if(!h&&!g)throw new Error("Phaser.Loader. Invalid Bitmap Font atlas given");this.addToFileList("bitmapfont",a,b,{atlasURL:null,atlasData:g||h,atlasType:g?"json":"xml",xSpacing:e,ySpacing:f})}return this},atlasJSONArray:function(a,b,d,e){return this.atlas(a,b,d,e,c.Loader.TEXTURE_ATLAS_JSON_ARRAY)},atlasJSONHash:function(a,b,d,e){return this.atlas(a,b,d,e,c.Loader.TEXTURE_ATLAS_JSON_HASH)},atlasXML:function(a,b,d,e){return void 0===d&&(d=null),void 0===e&&(e=null),d||e||(d=a+".xml"),this.atlas(a,b,d,e,c.Loader.TEXTURE_ATLAS_XML_STARLING)},atlas:function(a,b,d,e,f){if((void 0===b||null===b)&&(b=a+".png"),void 0===d&&(d=null),void 0===e&&(e=null),void 0===f&&(f=c.Loader.TEXTURE_ATLAS_JSON_ARRAY),d||e||(d=f===c.Loader.TEXTURE_ATLAS_XML_STARLING?a+".xml":a+".json"),d)this.addToFileList("textureatlas",a,b,{atlasURL:d,format:f});else{switch(f){case c.Loader.TEXTURE_ATLAS_JSON_ARRAY:"string"==typeof e&&(e=JSON.parse(e));break;case c.Loader.TEXTURE_ATLAS_XML_STARLING:if("string"==typeof e){var g=this.parseXml(e);if(!g)throw new Error("Phaser.Loader. Invalid Texture Atlas XML given");e=g}}this.addToFileList("textureatlas",a,b,{atlasURL:null,atlasData:e,format:f})}return this},withSyncPoint:function(a,b){this._withSyncPointDepth++;try{a.call(b||this,this)}finally{this._withSyncPointDepth--}return this},addSyncPoint:function(a,b){var c=this.getAsset(a,b);return c&&(c.file.syncPoint=!0),this},removeFile:function(a,b){var c=this.getAsset(a,b);c&&(c.loaded||c.loading||this._fileList.splice(c.index,1))},removeAll:function(){this._fileList.length=0,this._flightQueue.length=0},start:function(){this.isLoading||(this.hasLoaded=!1,this.isLoading=!0,this.updateProgress(),this.processLoadQueue())},processLoadQueue:function(){if(!this.isLoading)return console.warn("Phaser.Loader - active loading canceled / reset"),void this.finishedLoading(!0);for(var a=0;a<this._flightQueue.length;a++){var b=this._flightQueue[a];(b.loaded||b.error)&&(this._flightQueue.splice(a,1),a--,b.loading=!1,b.requestUrl=null,b.requestObject=null,b.error&&this.onFileError.dispatch(b.key,b),"packfile"!==b.type?(this._loadedFileCount++,this.onFileComplete.dispatch(this.progress,b.key,!b.error,this._loadedFileCount,this._totalFileCount)):"packfile"===b.type&&b.error&&(this._loadedPackCount++,this.onPackComplete.dispatch(b.key,!b.error,this._loadedPackCount,this._totalPackCount)))}for(var d=!1,e=this.enableParallel?c.Math.clamp(this.maxParallelDownloads,1,12):1,a=this._processingHead;a<this._fileList.length;a++){var b=this._fileList[a];if("packfile"===b.type&&!b.error&&b.loaded&&a===this._processingHead&&(this.processPack(b),this._loadedPackCount++,this.onPackComplete.dispatch(b.key,!b.error,this._loadedPackCount,this._totalPackCount)),b.loaded||b.error?a===this._processingHead&&(this._processingHead=a+1):!b.loading&&this._flightQueue.length<e&&("packfile"!==b.type||b.data?d||(this._fileLoadStarted||(this._fileLoadStarted=!0,this.onLoadStart.dispatch()),this._flightQueue.push(b),b.loading=!0,this.onFileStart.dispatch(this.progress,b.key,b.url),this.loadFile(b)):(this._flightQueue.push(b),b.loading=!0,this.loadFile(b))),!b.loaded&&b.syncPoint&&(d=!0),this._flightQueue.length>=e||d&&this._loadedPackCount===this._totalPackCount)break}if(this.updateProgress(),this._processingHead>=this._fileList.length)this.finishedLoading();else if(!this._flightQueue.length){console.warn("Phaser.Loader - aborting: processing queue empty, loading may have stalled");var f=this;setTimeout(function(){f.finishedLoading(!0)},2e3)}},finishedLoading:function(a){this.hasLoaded||(this.hasLoaded=!0,this.isLoading=!1,a||this._fileLoadStarted||(this._fileLoadStarted=!0,this.onLoadStart.dispatch()),this.onLoadComplete.dispatch(),this.game.state.loadComplete(),this.reset())},asyncComplete:function(a,b){void 0===b&&(b=""),a.loaded=!0,a.error=!!b,b&&(a.errorMessage=b,console.warn("Phaser.Loader - "+a.type+"["+a.key+"]: "+b)),this.processLoadQueue()},processPack:function(a){var b=a.data[a.key];if(!b)return void console.warn("Phaser.Loader - "+a.key+": pack has data, but not for pack key");for(var d=0;d<b.length;d++){var e=b[d];switch(e.type){case"image":this.image(e.key,e.url,e.overwrite);break;case"text":this.text(e.key,e.url,e.overwrite);break;case"json":this.json(e.key,e.url,e.overwrite);break;case"xml":this.xml(e.key,e.url,e.overwrite);break;case"script":this.script(e.key,e.url,e.callback,a.callbackContext||this);break;case"binary":this.binary(e.key,e.url,e.callback,a.callbackContext||this);break;case"spritesheet":this.spritesheet(e.key,e.url,e.frameWidth,e.frameHeight,e.frameMax,e.margin,e.spacing);break;case"video":this.video(e.key,e.urls);break;case"audio":this.audio(e.key,e.urls,e.autoDecode);break;case"audiosprite":this.audiosprite(e.key,e.urls,e.jsonURL,e.jsonData,e.autoDecode);break;case"tilemap":this.tilemap(e.key,e.url,e.data,c.Tilemap[e.format]);break;case"physics":this.physics(e.key,e.url,e.data,c.Loader[e.format]);break;case"bitmapFont":this.bitmapFont(e.key,e.textureURL,e.atlasURL,e.atlasData,e.xSpacing,e.ySpacing);break;case"atlasJSONArray":this.atlasJSONArray(e.key,e.textureURL,e.atlasURL,e.atlasData);break;case"atlasJSONHash":this.atlasJSONHash(e.key,e.textureURL,e.atlasURL,e.atlasData);break;case"atlasXML":this.atlasXML(e.key,e.textureURL,e.atlasURL,e.atlasData);break;case"atlas":this.atlas(e.key,e.textureURL,e.atlasURL,e.atlasData,c.Loader[e.format]);break;case"shader":this.shader(e.key,e.url,e.overwrite)}}},transformUrl:function(a,b){return a?a.match(/^(?:blob:|data:|http:\/\/|https:\/\/|\/\/)/)?a:this.baseURL+b.path+a:!1},loadFile:function(a){switch(a.type){case"packfile":this.xhrLoad(a,this.transformUrl(a.url,a),"text",this.fileComplete);break;case"image":case"spritesheet":case"textureatlas":case"bitmapfont":this.loadImageTag(a);break;case"audio":a.url=this.getAudioURL(a.url),a.url?this.game.sound.usingWebAudio?this.xhrLoad(a,this.transformUrl(a.url,a),"arraybuffer",this.fileComplete):this.game.sound.usingAudioTag&&this.loadAudioTag(a):this.fileError(a,null,"No supported audio URL specified or device does not have audio playback support");break;case"video":a.url=this.getVideoURL(a.url),a.url?a.asBlob?this.xhrLoad(a,this.transformUrl(a.url,a),"blob",this.fileComplete):this.loadVideoTag(a):this.fileError(a,null,"No supported video URL specified or device does not have video playback support");break;case"json":this.xhrLoad(a,this.transformUrl(a.url,a),"text",this.jsonLoadComplete);break;case"xml":this.xhrLoad(a,this.transformUrl(a.url,a),"text",this.xmlLoadComplete);break;case"tilemap":a.format===c.Tilemap.TILED_JSON?this.xhrLoad(a,this.transformUrl(a.url,a),"text",this.jsonLoadComplete):a.format===c.Tilemap.CSV?this.xhrLoad(a,this.transformUrl(a.url,a),"text",this.csvLoadComplete):this.asyncComplete(a,"invalid Tilemap format: "+a.format);break;case"text":case"script":case"shader":case"physics":this.xhrLoad(a,this.transformUrl(a.url,a),"text",this.fileComplete);break;case"binary":this.xhrLoad(a,this.transformUrl(a.url,a),"arraybuffer",this.fileComplete)}},loadImageTag:function(a){var b=this;a.data=new Image,a.data.name=a.key,this.crossOrigin&&(a.data.crossOrigin=this.crossOrigin),a.data.onload=function(){a.data.onload&&(a.data.onload=null,a.data.onerror=null,b.fileComplete(a))},a.data.onerror=function(){a.data.onload&&(a.data.onload=null,a.data.onerror=null,b.fileError(a))},a.data.src=this.transformUrl(a.url,a),a.data.complete&&a.data.width&&a.data.height&&(a.data.onload=null,a.data.onerror=null,this.fileComplete(a))},loadVideoTag:function(a){var b=this;a.data=document.createElement("video"),a.data.name=a.key,a.data.controls=!1,a.data.autoplay=!1;var d=function(){a.data.removeEventListener(a.loadEvent,d,!1),a.data.onerror=null,a.data.canplay=!0,c.GAMES[b.game.id].load.fileComplete(a)};a.data.onerror=function(){a.data.removeEventListener(a.loadEvent,d,!1),a.data.onerror=null,a.data.canplay=!1,b.fileError(a)},a.data.addEventListener(a.loadEvent,d,!1),a.data.src=this.transformUrl(a.url,a),a.data.load()},loadAudioTag:function(a){var b=this;if(this.game.sound.touchLocked)a.data=new Audio,a.data.name=a.key,a.data.preload="auto",a.data.src=this.transformUrl(a.url,a),this.fileComplete(a);else{a.data=new Audio,a.data.name=a.key;var c=function(){a.data.removeEventListener("canplaythrough",c,!1),a.data.onerror=null,b.fileComplete(a)};a.data.onerror=function(){a.data.removeEventListener("canplaythrough",c,!1),a.data.onerror=null,b.fileError(a)},a.data.preload="auto",a.data.src=this.transformUrl(a.url,a),a.data.addEventListener("canplaythrough",c,!1),a.data.load()}},xhrLoad:function(a,b,c,d,e){if(this.useXDomainRequest&&window.XDomainRequest)return void this.xhrLoadWithXDR(a,b,c,d,e);var f=new XMLHttpRequest;f.open("GET",b,!0),f.responseType=c,e=e||this.fileError;var g=this;f.onload=function(){try{return 4==f.readyState&&f.status>=400&&f.status<=599?e.call(g,a,f):d.call(g,a,f)}catch(b){g.hasLoaded?window.console&&console.error(b):g.asyncComplete(a,b.message||"Exception")}},f.onerror=function(){try{return e.call(g,a,f)}catch(b){g.hasLoaded?window.console&&console.error(b):g.asyncComplete(a,b.message||"Exception")}},a.requestObject=f,a.requestUrl=b,f.send()},xhrLoadWithXDR:function(a,b,c,d,e){this._warnedAboutXDomainRequest||this.game.device.ie&&!(this.game.device.ieVersion>=10)||(this._warnedAboutXDomainRequest=!0,console.warn("Phaser.Loader - using XDomainRequest outside of IE 9"));var f=new window.XDomainRequest;f.open("GET",b,!0),f.responseType=c,f.timeout=3e3,e=e||this.fileError;var g=this;f.onerror=function(){try{return e.call(g,a,f)}catch(b){g.asyncComplete(a,b.message||"Exception")}},f.ontimeout=function(){try{return e.call(g,a,f)}catch(b){g.asyncComplete(a,b.message||"Exception")}},f.onprogress=function(){},f.onload=function(){try{return 4==f.readyState&&f.status>=400&&f.status<=599?e.call(g,a,f):d.call(g,a,f)}catch(b){g.asyncComplete(a,b.message||"Exception")}},a.requestObject=f,a.requestUrl=b,setTimeout(function(){f.send()},0)},getVideoURL:function(a){for(var b=0;b<a.length;b++){var c,d=a[b];if(d.uri){if(c=d.type,d=d.uri,this.game.device.canPlayVideo(c))return d}else{if(0===d.indexOf("blob:")||0===d.indexOf("data:"))return d;d.indexOf("?")>=0&&(d=d.substr(0,d.indexOf("?")));var e=d.substr((Math.max(0,d.lastIndexOf("."))||1/0)+1);if(c=e.toLowerCase(),this.game.device.canPlayVideo(c))return a[b]}}return null},getAudioURL:function(a){if(this.game.sound.noAudio)return null;for(var b=0;b<a.length;b++){var c,d=a[b];if(d.uri){if(c=d.type,d=d.uri,this.game.device.canPlayAudio(c))return d}else{if(0===d.indexOf("blob:")||0===d.indexOf("data:"))return d;d.indexOf("?")>=0&&(d=d.substr(0,d.indexOf("?")));var e=d.substr((Math.max(0,d.lastIndexOf("."))||1/0)+1);if(c=e.toLowerCase(),this.game.device.canPlayAudio(c))return a[b]}}return null},fileError:function(a,b,c){var d=a.requestUrl||this.transformUrl(a.url,a),e="error loading asset from URL "+d;!c&&b&&(c=b.status),c&&(e=e+" ("+c+")"),this.asyncComplete(a,e)},fileComplete:function(a,b){var d=!0;switch(a.type){case"packfile":var e=JSON.parse(b.responseText);a.data=e||{};break;case"image":this.cache.addImage(a.key,a.url,a.data);break;case"spritesheet":this.cache.addSpriteSheet(a.key,a.url,a.data,a.frameWidth,a.frameHeight,a.frameMax,a.margin,a.spacing);break;case"textureatlas":if(null==a.atlasURL)this.cache.addTextureAtlas(a.key,a.url,a.data,a.atlasData,a.format);else if(d=!1,a.format==c.Loader.TEXTURE_ATLAS_JSON_ARRAY||a.format==c.Loader.TEXTURE_ATLAS_JSON_HASH||a.format==c.Loader.TEXTURE_ATLAS_JSON_PYXEL)this.xhrLoad(a,this.transformUrl(a.atlasURL,a),"text",this.jsonLoadComplete);else{if(a.format!=c.Loader.TEXTURE_ATLAS_XML_STARLING)throw new Error("Phaser.Loader. Invalid Texture Atlas format: "+a.format);this.xhrLoad(a,this.transformUrl(a.atlasURL,a),"text",this.xmlLoadComplete)}break;case"bitmapfont":a.atlasURL?(d=!1,this.xhrLoad(a,this.transformUrl(a.atlasURL,a),"text",function(a,b){var c;try{c=JSON.parse(b.responseText)}catch(d){}c?(a.atlasType="json",this.jsonLoadComplete(a,b)):(a.atlasType="xml",this.xmlLoadComplete(a,b))})):this.cache.addBitmapFont(a.key,a.url,a.data,a.atlasData,a.atlasType,a.xSpacing,a.ySpacing);break;case"video":if(a.asBlob)try{a.data=b.response}catch(f){throw new Error("Phaser.Loader. Unable to parse video file as Blob: "+a.key)}this.cache.addVideo(a.key,a.url,a.data,a.asBlob);break;case"audio":this.game.sound.usingWebAudio?(a.data=b.response,this.cache.addSound(a.key,a.url,a.data,!0,!1),a.autoDecode&&this.game.sound.decode(a.key)):this.cache.addSound(a.key,a.url,a.data,!1,!0);break;case"text":a.data=b.responseText,this.cache.addText(a.key,a.url,a.data);break;case"shader":a.data=b.responseText,this.cache.addShader(a.key,a.url,a.data);break;case"physics":var e=JSON.parse(b.responseText);this.cache.addPhysicsData(a.key,a.url,e,a.format);break;case"script":a.data=document.createElement("script"),a.data.language="javascript",a.data.type="text/javascript",a.data.defer=!1,a.data.text=b.responseText,document.head.appendChild(a.data),a.callback&&(a.data=a.callback.call(a.callbackContext,a.key,b.responseText));break;case"binary":a.callback?a.data=a.callback.call(a.callbackContext,a.key,b.response):a.data=b.response,this.cache.addBinary(a.key,a.data)}d&&this.asyncComplete(a)},jsonLoadComplete:function(a,b){var c=JSON.parse(b.responseText);"tilemap"===a.type?this.cache.addTilemap(a.key,a.url,c,a.format):"bitmapfont"===a.type?this.cache.addBitmapFont(a.key,a.url,a.data,c,a.atlasType,a.xSpacing,a.ySpacing):"json"===a.type?this.cache.addJSON(a.key,a.url,c):this.cache.addTextureAtlas(a.key,a.url,a.data,c,a.format),this.asyncComplete(a)},csvLoadComplete:function(a,b){var c=b.responseText;this.cache.addTilemap(a.key,a.url,c,a.format),this.asyncComplete(a)},xmlLoadComplete:function(a,b){var c=b.responseText,d=this.parseXml(c);if(!d){var e=b.responseType||b.contentType;return console.warn("Phaser.Loader - "+a.key+": invalid XML ("+e+")"),void this.asyncComplete(a,"invalid XML")}"bitmapfont"===a.type?this.cache.addBitmapFont(a.key,a.url,a.data,d,a.atlasType,a.xSpacing,a.ySpacing):"textureatlas"===a.type?this.cache.addTextureAtlas(a.key,a.url,a.data,d,a.format):"xml"===a.type&&this.cache.addXML(a.key,a.url,d),this.asyncComplete(a)},parseXml:function(a){var b;try{if(window.DOMParser){var c=new DOMParser;b=c.parseFromString(a,"text/xml")}else b=new ActiveXObject("Microsoft.XMLDOM"),b.async="false",b.loadXML(a)}catch(d){b=null}return b&&b.documentElement&&!b.getElementsByTagName("parsererror").length?b:null},updateProgress:function(){this.preloadSprite&&(0===this.preloadSprite.direction?this.preloadSprite.rect.width=Math.floor(this.preloadSprite.width/100*this.progress):this.preloadSprite.rect.height=Math.floor(this.preloadSprite.height/100*this.progress),this.preloadSprite.sprite?this.preloadSprite.sprite.updateCrop():this.preloadSprite=null)},totalLoadedFiles:function(){return this._loadedFileCount},totalQueuedFiles:function(){return this._totalFileCount-this._loadedFileCount},totalLoadedPacks:function(){return this._totalPackCount},totalQueuedPacks:function(){return this._totalPackCount-this._loadedPackCount}},Object.defineProperty(c.Loader.prototype,"progressFloat",{get:function(){var a=this._loadedFileCount/this._totalFileCount*100;return c.Math.clamp(a||0,0,100)}}),Object.defineProperty(c.Loader.prototype,"progress",{get:function(){return Math.round(this.progressFloat)}}),c.Loader.prototype.constructor=c.Loader,c.LoaderParser={bitmapFont:function(a,b,c,d){return this.xmlBitmapFont(a,b,c,d)},xmlBitmapFont:function(a,b,c,d){var e={},f=a.getElementsByTagName("info")[0],g=a.getElementsByTagName("common")[0];e.font=f.getAttribute("face"),e.size=parseInt(f.getAttribute("size"),10),e.lineHeight=parseInt(g.getAttribute("lineHeight"),10)+d,e.chars={};for(var h=a.getElementsByTagName("char"),i=0;i<h.length;i++){var j=parseInt(h[i].getAttribute("id"),10);e.chars[j]={x:parseInt(h[i].getAttribute("x"),10),y:parseInt(h[i].getAttribute("y"),10),width:parseInt(h[i].getAttribute("width"),10),height:parseInt(h[i].getAttribute("height"),10),xOffset:parseInt(h[i].getAttribute("xoffset"),10),yOffset:parseInt(h[i].getAttribute("yoffset"),10),xAdvance:parseInt(h[i].getAttribute("xadvance"),10)+c,kerning:{}}}var k=a.getElementsByTagName("kerning");for(i=0;i<k.length;i++){var l=parseInt(k[i].getAttribute("first"),10),m=parseInt(k[i].getAttribute("second"),10),n=parseInt(k[i].getAttribute("amount"),10);e.chars[m].kerning[l]=n}return this.finalizeBitmapFont(b,e)},jsonBitmapFont:function(a,b,c,d){var e={font:a.font.info._face,size:parseInt(a.font.info._size,10),lineHeight:parseInt(a.font.common._lineHeight,10)+d,chars:{}};return a.font.chars["char"].forEach(function(a){var b=parseInt(a._id,10);e.chars[b]={x:parseInt(a._x,10),y:parseInt(a._y,10),width:parseInt(a._width,10),height:parseInt(a._height,10),xOffset:parseInt(a._xoffset,10),yOffset:parseInt(a._yoffset,10),xAdvance:parseInt(a._xadvance,10)+c,kerning:{}}}),a.font.kernings&&a.font.kernings.kerning&&a.font.kernings.kerning.forEach(function(a){e.chars[a._second].kerning[a._first]=parseInt(a._amount,10)}),this.finalizeBitmapFont(b,e)},finalizeBitmapFont:function(a,b){return Object.keys(b.chars).forEach(function(d){var e=b.chars[d];e.texture=new PIXI.Texture(a,new c.Rectangle(e.x,e.y,e.width,e.height))}),b}},c.AudioSprite=function(a,b){this.game=a,this.key=b,this.config=this.game.cache.getJSON(b+"-audioatlas"),this.autoplayKey=null,this.autoplay=!1,this.sounds={};for(var c in this.config.spritemap){var d=this.config.spritemap[c],e=this.game.add.sound(this.key);e.addMarker(c,d.start,d.end-d.start,null,d.loop),this.sounds[c]=e}this.config.autoplay&&(this.autoplayKey=this.config.autoplay,this.play(this.autoplayKey),this.autoplay=this.sounds[this.autoplayKey])},c.AudioSprite.prototype={play:function(a,b){return void 0===b&&(b=1),this.sounds[a].play(a,null,b)},stop:function(a){if(a)this.sounds[a].stop();else for(var b in this.sounds)this.sounds[b].stop()},get:function(a){return this.sounds[a]}},c.AudioSprite.prototype.constructor=c.AudioSprite,c.Sound=function(a,b,d,e,f){void 0===d&&(d=1),void 0===e&&(e=!1),void 0===f&&(f=a.sound.connectToMaster),this.game=a,this.name=b,this.key=b,this.loop=e,this.volume=d,this.markers={},this.context=null,this.autoplay=!1,this.totalDuration=0,this.startTime=0,this.currentTime=0,this.duration=0,this.durationMS=0,this.position=0,this.stopTime=0,this.paused=!1,this.pausedPosition=0,this.pausedTime=0,this.isPlaying=!1,this.currentMarker="",this.fadeTween=null,this.pendingPlayback=!1,this.override=!1,this.allowMultiple=!1,this.usingWebAudio=this.game.sound.usingWebAudio,this.usingAudioTag=this.game.sound.usingAudioTag,this.externalNode=null,this.masterGainNode=null,this.gainNode=null,this._sound=null,this.usingWebAudio?(this.context=this.game.sound.context,this.masterGainNode=this.game.sound.masterGain,void 0===this.context.createGain?this.gainNode=this.context.createGainNode():this.gainNode=this.context.createGain(),this.gainNode.gain.value=d*this.game.sound.volume,f&&this.gainNode.connect(this.masterGainNode)):this.usingAudioTag&&(this.game.cache.getSound(b)&&this.game.cache.isSoundReady(b)?(this._sound=this.game.cache.getSoundData(b),this.totalDuration=0,this._sound.duration&&(this.totalDuration=this._sound.duration)):this.game.cache.onSoundUnlock.add(this.soundHasUnlocked,this)),this.onDecoded=new c.Signal,this.onPlay=new c.Signal,this.onPause=new c.Signal,this.onResume=new c.Signal,this.onLoop=new c.Signal,this.onStop=new c.Signal,this.onMute=new c.Signal,this.onMarkerComplete=new c.Signal,this.onFadeComplete=new c.Signal,this._volume=d,this._buffer=null,this._muted=!1,this._tempMarker=0,this._tempPosition=0,this._tempVolume=0,this._muteVolume=0,this._tempLoop=0,this._paused=!1,this._onDecodedEventDispatched=!1},c.Sound.prototype={soundHasUnlocked:function(a){a===this.key&&(this._sound=this.game.cache.getSoundData(this.key),this.totalDuration=this._sound.duration);
},addMarker:function(a,b,c,d,e){(void 0===d||null===d)&&(d=1),void 0===e&&(e=!1),this.markers[a]={name:a,start:b,stop:b+c,volume:d,duration:c,durationMS:1e3*c,loop:e}},removeMarker:function(a){delete this.markers[a]},onEndedHandler:function(){this._sound.onended=null,this.isPlaying=!1,this.currentTime=this.durationMS,this.stop()},update:function(){return this.game.cache.checkSoundKey(this.key)?(this.isDecoded&&!this._onDecodedEventDispatched&&(this.onDecoded.dispatch(this),this._onDecodedEventDispatched=!0),this.pendingPlayback&&this.game.cache.isSoundReady(this.key)&&(this.pendingPlayback=!1,this.play(this._tempMarker,this._tempPosition,this._tempVolume,this._tempLoop)),void(this.isPlaying&&(this.currentTime=this.game.time.time-this.startTime,this.currentTime>=this.durationMS&&(this.usingWebAudio?this.loop?(this.onLoop.dispatch(this),""===this.currentMarker?(this.currentTime=0,this.startTime=this.game.time.time):(this.onMarkerComplete.dispatch(this.currentMarker,this),this.play(this.currentMarker,0,this.volume,!0,!0))):""!==this.currentMarker&&this.stop():this.loop?(this.onLoop.dispatch(this),this.play(this.currentMarker,0,this.volume,!0,!0)):this.stop())))):void this.destroy()},loopFull:function(a){this.play(null,0,a,!0)},play:function(a,b,c,d,e){if((void 0===a||a===!1||null===a)&&(a=""),void 0===e&&(e=!0),this.isPlaying&&!this.allowMultiple&&!e&&!this.override)return this;if(this._sound&&this.isPlaying&&!this.allowMultiple&&(this.override||e))if(this.usingWebAudio){if(void 0===this._sound.stop)this._sound.noteOff(0);else try{this._sound.stop(0)}catch(f){}this.externalNode?this._sound.disconnect(this.externalNode):this._sound.disconnect(this.gainNode)}else this.usingAudioTag&&(this._sound.pause(),this._sound.currentTime=0);if(""===a&&Object.keys(this.markers).length>0)return this;if(""!==a){if(this.currentMarker=a,!this.markers[a])return this;this.position=this.markers[a].start,this.volume=this.markers[a].volume,this.loop=this.markers[a].loop,this.duration=this.markers[a].duration,this.durationMS=this.markers[a].durationMS,"undefined"!=typeof c&&(this.volume=c),"undefined"!=typeof d&&(this.loop=d),this._tempMarker=a,this._tempPosition=this.position,this._tempVolume=this.volume,this._tempLoop=this.loop}else b=b||0,void 0===c&&(c=this._volume),void 0===d&&(d=this.loop),this.position=Math.max(0,b),this.volume=c,this.loop=d,this.duration=0,this.durationMS=0,this._tempMarker=a,this._tempPosition=b,this._tempVolume=c,this._tempLoop=d;return this.usingWebAudio?this.game.cache.isSoundDecoded(this.key)?(this._sound=this.context.createBufferSource(),this.externalNode?this._sound.connect(this.externalNode):this._sound.connect(this.gainNode),this._buffer=this.game.cache.getSoundData(this.key),this._sound.buffer=this._buffer,this.loop&&""===a&&(this._sound.loop=!0),this.loop||""!==a||(this._sound.onended=this.onEndedHandler.bind(this)),this.totalDuration=this._sound.buffer.duration,0===this.duration&&(this.duration=this.totalDuration,this.durationMS=Math.ceil(1e3*this.totalDuration)),void 0===this._sound.start?this._sound.noteGrainOn(0,this.position,this.duration):this.loop&&""===a?this._sound.start(0,0):this._sound.start(0,this.position,this.duration),this.isPlaying=!0,this.startTime=this.game.time.time,this.currentTime=0,this.stopTime=this.startTime+this.durationMS,this.onPlay.dispatch(this)):(this.pendingPlayback=!0,this.game.cache.getSound(this.key)&&this.game.cache.getSound(this.key).isDecoding===!1&&this.game.sound.decode(this.key,this)):this.game.cache.getSound(this.key)&&this.game.cache.getSound(this.key).locked?(this.game.cache.reloadSound(this.key),this.pendingPlayback=!0):this._sound&&(this.game.device.cocoonJS||4===this._sound.readyState)?(this._sound.play(),this.totalDuration=this._sound.duration,0===this.duration&&(this.duration=this.totalDuration,this.durationMS=1e3*this.totalDuration),this._sound.currentTime=this.position,this._sound.muted=this._muted,this._muted||this.game.sound.mute?this._sound.volume=0:this._sound.volume=this._volume,this.isPlaying=!0,this.startTime=this.game.time.time,this.currentTime=0,this.stopTime=this.startTime+this.durationMS,this.onPlay.dispatch(this)):this.pendingPlayback=!0,this},restart:function(a,b,c,d){a=a||"",b=b||0,c=c||1,void 0===d&&(d=!1),this.play(a,b,c,d,!0)},pause:function(){this.isPlaying&&this._sound&&(this.paused=!0,this.pausedPosition=this.currentTime,this.pausedTime=this.game.time.time,this.onPause.dispatch(this),this.stop())},resume:function(){if(this.paused&&this._sound){if(this.usingWebAudio){var a=Math.max(0,this.position+this.pausedPosition/1e3);this._sound=this.context.createBufferSource(),this._sound.buffer=this._buffer,this.externalNode?this._sound.connect(this.externalNode):this._sound.connect(this.gainNode),this.loop&&(this._sound.loop=!0),this.loop||""!==this.currentMarker||(this._sound.onended=this.onEndedHandler.bind(this));var b=this.duration-this.pausedPosition/1e3;void 0===this._sound.start?this._sound.noteGrainOn(0,a,b):this.loop&&this.game.device.chrome?42===this.game.device.chromeVersion?this._sound.start(0):this._sound.start(0,a):this._sound.start(0,a,b)}else this._sound.play();this.isPlaying=!0,this.paused=!1,this.startTime+=this.game.time.time-this.pausedTime,this.onResume.dispatch(this)}},stop:function(){if(this.isPlaying&&this._sound)if(this.usingWebAudio){if(void 0===this._sound.stop)this._sound.noteOff(0);else try{this._sound.stop(0)}catch(a){}this.externalNode?this._sound.disconnect(this.externalNode):this._sound.disconnect(this.gainNode)}else this.usingAudioTag&&(this._sound.pause(),this._sound.currentTime=0);if(this.pendingPlayback=!1,this.isPlaying=!1,!this.paused){var b=this.currentMarker;""!==this.currentMarker&&this.onMarkerComplete.dispatch(this.currentMarker,this),this.currentMarker="",null!==this.fadeTween&&this.fadeTween.stop(),this.onStop.dispatch(this,b)}},fadeIn:function(a,b,c){void 0===b&&(b=!1),void 0===c&&(c=this.currentMarker),this.paused||(this.play(c,0,0,b),this.fadeTo(a,1))},fadeOut:function(a){this.fadeTo(a,0)},fadeTo:function(a,b){if(this.isPlaying&&!this.paused&&b!==this.volume){if(void 0===a&&(a=1e3),void 0===b)return void console.warn("Phaser.Sound.fadeTo: No Volume Specified.");this.fadeTween=this.game.add.tween(this).to({volume:b},a,c.Easing.Linear.None,!0),this.fadeTween.onComplete.add(this.fadeComplete,this)}},fadeComplete:function(){this.onFadeComplete.dispatch(this,this.volume),0===this.volume&&this.stop()},updateGlobalVolume:function(a){this.usingAudioTag&&this._sound&&(this._sound.volume=a*this._volume)},destroy:function(a){void 0===a&&(a=!0),this.stop(),a?this.game.sound.remove(this):(this.markers={},this.context=null,this._buffer=null,this.externalNode=null,this.onDecoded.dispose(),this.onPlay.dispose(),this.onPause.dispose(),this.onResume.dispose(),this.onLoop.dispose(),this.onStop.dispose(),this.onMute.dispose(),this.onMarkerComplete.dispose())}},c.Sound.prototype.constructor=c.Sound,Object.defineProperty(c.Sound.prototype,"isDecoding",{get:function(){return this.game.cache.getSound(this.key).isDecoding}}),Object.defineProperty(c.Sound.prototype,"isDecoded",{get:function(){return this.game.cache.isSoundDecoded(this.key)}}),Object.defineProperty(c.Sound.prototype,"mute",{get:function(){return this._muted||this.game.sound.mute},set:function(a){a=a||!1,a!==this._muted&&(a?(this._muted=!0,this._muteVolume=this._tempVolume,this.usingWebAudio?this.gainNode.gain.value=0:this.usingAudioTag&&this._sound&&(this._sound.volume=0)):(this._muted=!1,this.usingWebAudio?this.gainNode.gain.value=this._muteVolume:this.usingAudioTag&&this._sound&&(this._sound.volume=this._muteVolume)),this.onMute.dispatch(this))}}),Object.defineProperty(c.Sound.prototype,"volume",{get:function(){return this._volume},set:function(a){return this.game.device.firefox&&this.usingAudioTag&&(a=this.game.math.clamp(a,0,1)),this._muted?void(this._muteVolume=a):(this._tempVolume=a,this._volume=a,void(this.usingWebAudio?this.gainNode.gain.value=a:this.usingAudioTag&&this._sound&&(this._sound.volume=a)))}}),c.SoundManager=function(a){this.game=a,this.onSoundDecode=new c.Signal,this.onVolumeChange=new c.Signal,this.onMute=new c.Signal,this.onUnMute=new c.Signal,this.context=null,this.usingWebAudio=!1,this.usingAudioTag=!1,this.noAudio=!1,this.connectToMaster=!0,this.touchLocked=!1,this.channels=32,this.muteOnPause=!0,this._codeMuted=!1,this._muted=!1,this._unlockSource=null,this._volume=1,this._sounds=[],this._watchList=new c.ArraySet,this._watching=!1,this._watchCallback=null,this._watchContext=null},c.SoundManager.prototype={boot:function(){if(this.game.device.iOS&&this.game.device.webAudio===!1&&(this.channels=1),window.PhaserGlobal){if(window.PhaserGlobal.disableAudio===!0)return this.noAudio=!0,void(this.touchLocked=!1);if(window.PhaserGlobal.disableWebAudio===!0)return this.usingAudioTag=!0,void(this.touchLocked=!1)}if(window.PhaserGlobal&&window.PhaserGlobal.audioContext)this.context=window.PhaserGlobal.audioContext;else if(window.AudioContext)try{this.context=new window.AudioContext}catch(a){this.context=null,this.usingWebAudio=!1,this.touchLocked=!1}else if(window.webkitAudioContext)try{this.context=new window.webkitAudioContext}catch(a){this.context=null,this.usingWebAudio=!1,this.touchLocked=!1}if(null===this.context){if(void 0===window.Audio)return void(this.noAudio=!0);this.usingAudioTag=!0}else this.usingWebAudio=!0,void 0===this.context.createGain?this.masterGain=this.context.createGainNode():this.masterGain=this.context.createGain(),this.masterGain.gain.value=1,this.masterGain.connect(this.context.destination);this.noAudio||(!this.game.device.cocoonJS&&this.game.device.iOS||window.PhaserGlobal&&window.PhaserGlobal.fakeiOSTouchLock)&&this.setTouchLock()},setTouchLock:function(){this.noAudio||window.PhaserGlobal&&window.PhaserGlobal.disableAudio===!0||(this.game.device.iOSVersion>8?this.game.input.touch.addTouchLockCallback(this.unlock,this,!0):this.game.input.touch.addTouchLockCallback(this.unlock,this),this.touchLocked=!0)},unlock:function(){if(this.noAudio||!this.touchLocked||null!==this._unlockSource)return!0;if(this.usingAudioTag)this.touchLocked=!1,this._unlockSource=null;else if(this.usingWebAudio){var a=this.context.createBuffer(1,1,22050);this._unlockSource=this.context.createBufferSource(),this._unlockSource.buffer=a,this._unlockSource.connect(this.context.destination),void 0===this._unlockSource.start?this._unlockSource.noteOn(0):this._unlockSource.start(0)}return!0},stopAll:function(){if(!this.noAudio)for(var a=0;a<this._sounds.length;a++)this._sounds[a]&&this._sounds[a].stop()},pauseAll:function(){if(!this.noAudio)for(var a=0;a<this._sounds.length;a++)this._sounds[a]&&this._sounds[a].pause()},resumeAll:function(){if(!this.noAudio)for(var a=0;a<this._sounds.length;a++)this._sounds[a]&&this._sounds[a].resume()},decode:function(a,b){b=b||null;var c=this.game.cache.getSoundData(a);if(c&&this.game.cache.isSoundDecoded(a)===!1){this.game.cache.updateSound(a,"isDecoding",!0);var d=this;try{this.context.decodeAudioData(c,function(c){c&&(d.game.cache.decodedSound(a,c),d.onSoundDecode.dispatch(a,b))})}catch(e){}}},setDecodedCallback:function(a,b,d){"string"==typeof a&&(a=[a]),this._watchList.reset();for(var e=0;e<a.length;e++)a[e]instanceof c.Sound?this.game.cache.isSoundDecoded(a[e].key)||this._watchList.add(a[e].key):this.game.cache.isSoundDecoded(a[e])||this._watchList.add(a[e]);0===this._watchList.total?(this._watching=!1,b.call(d)):(this._watching=!0,this._watchCallback=b,this._watchContext=d)},update:function(){if(!this.noAudio){!this.touchLocked||null===this._unlockSource||this._unlockSource.playbackState!==this._unlockSource.PLAYING_STATE&&this._unlockSource.playbackState!==this._unlockSource.FINISHED_STATE||(this.touchLocked=!1,this._unlockSource=null);for(var a=0;a<this._sounds.length;a++)this._sounds[a].update();if(this._watching){for(var b=this._watchList.first;b;)this.game.cache.isSoundDecoded(b)&&this._watchList.remove(b),b=this._watchList.next;0===this._watchList.total&&(this._watching=!1,this._watchCallback.call(this._watchContext))}}},add:function(a,b,d,e){void 0===b&&(b=1),void 0===d&&(d=!1),void 0===e&&(e=this.connectToMaster);var f=new c.Sound(this.game,a,b,d,e);return this._sounds.push(f),f},addSprite:function(a){var b=new c.AudioSprite(this.game,a);return b},remove:function(a){for(var b=this._sounds.length;b--;)if(this._sounds[b]===a)return this._sounds[b].destroy(!1),this._sounds.splice(b,1),!0;return!1},removeByKey:function(a){for(var b=this._sounds.length,c=0;b--;)this._sounds[b].key===a&&(this._sounds[b].destroy(!1),this._sounds.splice(b,1),c++);return c},play:function(a,b,c){if(!this.noAudio){var d=this.add(a,b,c);return d.play(),d}},setMute:function(){if(!this._muted){this._muted=!0,this.usingWebAudio&&(this._muteVolume=this.masterGain.gain.value,this.masterGain.gain.value=0);for(var a=0;a<this._sounds.length;a++)this._sounds[a].usingAudioTag&&(this._sounds[a].mute=!0);this.onMute.dispatch()}},unsetMute:function(){if(this._muted&&!this._codeMuted){this._muted=!1,this.usingWebAudio&&(this.masterGain.gain.value=this._muteVolume);for(var a=0;a<this._sounds.length;a++)this._sounds[a].usingAudioTag&&(this._sounds[a].mute=!1);this.onUnMute.dispatch()}},destroy:function(){this.stopAll();for(var a=0;a<this._sounds.length;a++)this._sounds[a]&&this._sounds[a].destroy();this._sounds=[],this.onSoundDecode.dispose(),this.context&&(window.PhaserGlobal?window.PhaserGlobal.audioContext=this.context:this.context.close&&this.context.close())}},c.SoundManager.prototype.constructor=c.SoundManager,Object.defineProperty(c.SoundManager.prototype,"mute",{get:function(){return this._muted},set:function(a){if(a=a||!1){if(this._muted)return;this._codeMuted=!0,this.setMute()}else{if(!this._muted)return;this._codeMuted=!1,this.unsetMute()}}}),Object.defineProperty(c.SoundManager.prototype,"volume",{get:function(){return this._volume},set:function(a){if(0>a?a=0:a>1&&(a=1),this._volume!==a){if(this._volume=a,this.usingWebAudio)this.masterGain.gain.value=a;else for(var b=0;b<this._sounds.length;b++)this._sounds[b].usingAudioTag&&this._sounds[b].updateGlobalVolume(a);this.onVolumeChange.dispatch(a)}}}),c.ScaleManager=function(a,b,d){this.game=a,this.dom=c.DOM,this.grid=null,this.width=0,this.height=0,this.minWidth=null,this.maxWidth=null,this.minHeight=null,this.maxHeight=null,this.offset=new c.Point,this.forceLandscape=!1,this.forcePortrait=!1,this.incorrectOrientation=!1,this._pageAlignHorizontally=!1,this._pageAlignVertically=!1,this.onOrientationChange=new c.Signal,this.enterIncorrectOrientation=new c.Signal,this.leaveIncorrectOrientation=new c.Signal,this.fullScreenTarget=null,this._createdFullScreenTarget=null,this.onFullScreenInit=new c.Signal,this.onFullScreenChange=new c.Signal,this.onFullScreenError=new c.Signal,this.screenOrientation=this.dom.getScreenOrientation(),this.scaleFactor=new c.Point(1,1),this.scaleFactorInversed=new c.Point(1,1),this.margin={left:0,top:0,right:0,bottom:0,x:0,y:0},this.bounds=new c.Rectangle,this.aspectRatio=0,this.sourceAspectRatio=0,this.event=null,this.windowConstraints={right:"layout",bottom:""},this.compatibility={supportsFullScreen:!1,orientationFallback:null,noMargins:!1,scrollTo:null,forceMinimumDocumentHeight:!1,canExpandParent:!0,clickTrampoline:""},this._scaleMode=c.ScaleManager.NO_SCALE,this._fullScreenScaleMode=c.ScaleManager.NO_SCALE,this.parentIsWindow=!1,this.parentNode=null,this.parentScaleFactor=new c.Point(1,1),this.trackParentInterval=2e3,this.onSizeChange=new c.Signal,this.onResize=null,this.onResizeContext=null,this._pendingScaleMode=null,this._fullScreenRestore=null,this._gameSize=new c.Rectangle,this._userScaleFactor=new c.Point(1,1),this._userScaleTrim=new c.Point(0,0),this._lastUpdate=0,this._updateThrottle=0,this._updateThrottleReset=100,this._parentBounds=new c.Rectangle,this._tempBounds=new c.Rectangle,this._lastReportedCanvasSize=new c.Rectangle,this._lastReportedGameSize=new c.Rectangle,this._booted=!1,a.config&&this.parseConfig(a.config),this.setupScale(b,d)},c.ScaleManager.EXACT_FIT=0,c.ScaleManager.NO_SCALE=1,c.ScaleManager.SHOW_ALL=2,c.ScaleManager.RESIZE=3,c.ScaleManager.USER_SCALE=4,c.ScaleManager.prototype={boot:function(){var a=this.compatibility;a.supportsFullScreen=this.game.device.fullscreen&&!this.game.device.cocoonJS,this.game.device.iPad||this.game.device.webApp||this.game.device.desktop||(this.game.device.android&&!this.game.device.chrome?a.scrollTo=new c.Point(0,1):a.scrollTo=new c.Point(0,0)),this.game.device.desktop?(a.orientationFallback="screen",a.clickTrampoline="when-not-mouse"):(a.orientationFallback="",a.clickTrampoline="");var b=this;this._orientationChange=function(a){return b.orientationChange(a)},this._windowResize=function(a){return b.windowResize(a)},window.addEventListener("orientationchange",this._orientationChange,!1),window.addEventListener("resize",this._windowResize,!1),this.compatibility.supportsFullScreen&&(this._fullScreenChange=function(a){return b.fullScreenChange(a)},this._fullScreenError=function(a){return b.fullScreenError(a)},document.addEventListener("webkitfullscreenchange",this._fullScreenChange,!1),document.addEventListener("mozfullscreenchange",this._fullScreenChange,!1),document.addEventListener("MSFullscreenChange",this._fullScreenChange,!1),document.addEventListener("fullscreenchange",this._fullScreenChange,!1),document.addEventListener("webkitfullscreenerror",this._fullScreenError,!1),document.addEventListener("mozfullscreenerror",this._fullScreenError,!1),document.addEventListener("MSFullscreenError",this._fullScreenError,!1),document.addEventListener("fullscreenerror",this._fullScreenError,!1)),this.game.onResume.add(this._gameResumed,this),this.dom.getOffset(this.game.canvas,this.offset),this.bounds.setTo(this.offset.x,this.offset.y,this.width,this.height),this.setGameSize(this.game.width,this.game.height),this.screenOrientation=this.dom.getScreenOrientation(this.compatibility.orientationFallback),c.FlexGrid&&(this.grid=new c.FlexGrid(this,this.width,this.height)),this._booted=!0,null!==this._pendingScaleMode&&(this.scaleMode=this._pendingScaleMode,this._pendingScaleMode=null)},parseConfig:function(a){void 0!==a.scaleMode&&(this._booted?this.scaleMode=a.scaleMode:this._pendingScaleMode=a.scaleMode),void 0!==a.fullScreenScaleMode&&(this.fullScreenScaleMode=a.fullScreenScaleMode),a.fullScreenTarget&&(this.fullScreenTarget=a.fullScreenTarget)},setupScale:function(a,b){var d,e=new c.Rectangle;""!==this.game.parent&&("string"==typeof this.game.parent?d=document.getElementById(this.game.parent):this.game.parent&&1===this.game.parent.nodeType&&(d=this.game.parent)),d?(this.parentNode=d,this.parentIsWindow=!1,this.getParentBounds(this._parentBounds),e.width=this._parentBounds.width,e.height=this._parentBounds.height,this.offset.set(this._parentBounds.x,this._parentBounds.y)):(this.parentNode=null,this.parentIsWindow=!0,e.width=this.dom.visualBounds.width,e.height=this.dom.visualBounds.height,this.offset.set(0,0));var f=0,g=0;"number"==typeof a?f=a:(this.parentScaleFactor.x=parseInt(a,10)/100,f=e.width*this.parentScaleFactor.x),"number"==typeof b?g=b:(this.parentScaleFactor.y=parseInt(b,10)/100,g=e.height*this.parentScaleFactor.y),f=Math.floor(f),g=Math.floor(g),this._gameSize.setTo(0,0,f,g),this.updateDimensions(f,g,!1)},_gameResumed:function(){this.queueUpdate(!0)},setGameSize:function(a,b){this._gameSize.setTo(0,0,a,b),this.currentScaleMode!==c.ScaleManager.RESIZE&&this.updateDimensions(a,b,!0),this.queueUpdate(!0)},setUserScale:function(a,b,c,d){this._userScaleFactor.setTo(a,b),this._userScaleTrim.setTo(0|c,0|d),this.queueUpdate(!0)},setResizeCallback:function(a,b){this.onResize=a,this.onResizeContext=b},signalSizeChange:function(){if(!c.Rectangle.sameDimensions(this,this._lastReportedCanvasSize)||!c.Rectangle.sameDimensions(this.game,this._lastReportedGameSize)){var a=this.width,b=this.height;this._lastReportedCanvasSize.setTo(0,0,a,b),this._lastReportedGameSize.setTo(0,0,this.game.width,this.game.height),this.grid&&this.grid.onResize(a,b),this.onSizeChange.dispatch(this,a,b),this.currentScaleMode===c.ScaleManager.RESIZE&&(this.game.state.resize(a,b),this.game.load.resize(a,b))}},setMinMax:function(a,b,c,d){this.minWidth=a,this.minHeight=b,"undefined"!=typeof c&&(this.maxWidth=c),"undefined"!=typeof d&&(this.maxHeight=d)},preUpdate:function(){if(!(this.game.time.time<this._lastUpdate+this._updateThrottle)){var a=this._updateThrottle;this._updateThrottleReset=a>=400?0:100,this.dom.getOffset(this.game.canvas,this.offset);var b=this._parentBounds.width,d=this._parentBounds.height,e=this.getParentBounds(this._parentBounds),f=e.width!==b||e.height!==d,g=this.updateOrientationState();(f||g)&&(this.onResize&&this.onResize.call(this.onResizeContext,this,e),this.updateLayout(),this.signalSizeChange());var h=2*this._updateThrottle;this._updateThrottle<a&&(h=Math.min(a,this._updateThrottleReset)),this._updateThrottle=c.Math.clamp(h,25,this.trackParentInterval),this._lastUpdate=this.game.time.time}},pauseUpdate:function(){this.preUpdate(),this._updateThrottle=this.trackParentInterval},updateDimensions:function(a,b,c){this.width=a*this.parentScaleFactor.x,this.height=b*this.parentScaleFactor.y,this.game.width=this.width,this.game.height=this.height,this.sourceAspectRatio=this.width/this.height,this.updateScalingAndBounds(),c&&(this.game.renderer.resize(this.width,this.height),this.game.camera.setSize(this.width,this.height),this.game.world.resize(this.width,this.height))},updateScalingAndBounds:function(){this.scaleFactor.x=this.game.width/this.width,this.scaleFactor.y=this.game.height/this.height,this.scaleFactorInversed.x=this.width/this.game.width,this.scaleFactorInversed.y=this.height/this.game.height,this.aspectRatio=this.width/this.height,this.game.canvas&&this.dom.getOffset(this.game.canvas,this.offset),this.bounds.setTo(this.offset.x,this.offset.y,this.width,this.height),this.game.input&&this.game.input.scale&&this.game.input.scale.setTo(this.scaleFactor.x,this.scaleFactor.y)},forceOrientation:function(a,b){void 0===b&&(b=!1),this.forceLandscape=a,this.forcePortrait=b,this.queueUpdate(!0)},classifyOrientation:function(a){return"portrait-primary"===a||"portrait-secondary"===a?"portrait":"landscape-primary"===a||"landscape-secondary"===a?"landscape":null},updateOrientationState:function(){var a=this.screenOrientation,b=this.incorrectOrientation;this.screenOrientation=this.dom.getScreenOrientation(this.compatibility.orientationFallback),this.incorrectOrientation=this.forceLandscape&&!this.isLandscape||this.forcePortrait&&!this.isPortrait;var c=a!==this.screenOrientation,d=b!==this.incorrectOrientation;return d&&(this.incorrectOrientation?this.enterIncorrectOrientation.dispatch():this.leaveIncorrectOrientation.dispatch()),(c||d)&&this.onOrientationChange.dispatch(this,a,b),c||d},orientationChange:function(a){this.event=a,this.queueUpdate(!0)},windowResize:function(a){this.event=a,this.queueUpdate(!0)},scrollTop:function(){var a=this.compatibility.scrollTo;a&&window.scrollTo(a.x,a.y)},refresh:function(){this.scrollTop(),this.queueUpdate(!0)},updateLayout:function(){var a=this.currentScaleMode;if(a===c.ScaleManager.RESIZE)return void this.reflowGame();if(this.scrollTop(),this.compatibility.forceMinimumDocumentHeight&&(document.documentElement.style.minHeight=window.innerHeight+"px"),this.incorrectOrientation?this.setMaximum():a===c.ScaleManager.EXACT_FIT?this.setExactFit():a===c.ScaleManager.SHOW_ALL?!this.isFullScreen&&this.boundingParent&&this.compatibility.canExpandParent?(this.setShowAll(!0),this.resetCanvas(),this.setShowAll()):this.setShowAll():a===c.ScaleManager.NO_SCALE?(this.width=this.game.width,this.height=this.game.height):a===c.ScaleManager.USER_SCALE&&(this.width=this.game.width*this._userScaleFactor.x-this._userScaleTrim.x,this.height=this.game.height*this._userScaleFactor.y-this._userScaleTrim.y),!this.compatibility.canExpandParent&&(a===c.ScaleManager.SHOW_ALL||a===c.ScaleManager.USER_SCALE)){var b=this.getParentBounds(this._tempBounds);this.width=Math.min(this.width,b.width),this.height=Math.min(this.height,b.height)}this.width=0|this.width,this.height=0|this.height,this.reflowCanvas()},getParentBounds:function(a){var b=a||new c.Rectangle,d=this.boundingParent,e=this.dom.visualBounds,f=this.dom.layoutBounds;if(d){var g=d.getBoundingClientRect(),h=d.offsetParent?d.offsetParent.getBoundingClientRect():d.getBoundingClientRect();b.setTo(g.left-h.left,g.top-h.top,g.width,g.height);var i=this.windowConstraints;if(i.right){var j="layout"===i.right?f:e;b.right=Math.min(b.right,j.width)}if(i.bottom){var j="layout"===i.bottom?f:e;b.bottom=Math.min(b.bottom,j.height)}}else b.setTo(0,0,e.width,e.height);return b.setTo(Math.round(b.x),Math.round(b.y),Math.round(b.width),Math.round(b.height)),b},alignCanvas:function(a,b){var c=this.getParentBounds(this._tempBounds),d=this.game.canvas,e=this.margin;if(a){e.left=e.right=0;var f=d.getBoundingClientRect();if(this.width<c.width&&!this.incorrectOrientation){var g=f.left-c.x,h=c.width/2-this.width/2;h=Math.max(h,0);var i=h-g;e.left=Math.round(i)}d.style.marginLeft=e.left+"px",0!==e.left&&(e.right=-(c.width-f.width-e.left),d.style.marginRight=e.right+"px")}if(b){e.top=e.bottom=0;var f=d.getBoundingClientRect();if(this.height<c.height&&!this.incorrectOrientation){var g=f.top-c.y,h=c.height/2-this.height/2;h=Math.max(h,0);var i=h-g;e.top=Math.round(i)}d.style.marginTop=e.top+"px",0!==e.top&&(e.bottom=-(c.height-f.height-e.top),d.style.marginBottom=e.bottom+"px")}e.x=e.left,e.y=e.top},reflowGame:function(){this.resetCanvas("","");var a=this.getParentBounds(this._tempBounds);this.updateDimensions(a.width,a.height,!0)},reflowCanvas:function(){this.incorrectOrientation||(this.width=c.Math.clamp(this.width,this.minWidth||0,this.maxWidth||this.width),this.height=c.Math.clamp(this.height,this.minHeight||0,this.maxHeight||this.height)),this.resetCanvas(),this.compatibility.noMargins||(this.isFullScreen&&this._createdFullScreenTarget?this.alignCanvas(!0,!0):this.alignCanvas(this.pageAlignHorizontally,this.pageAlignVertically)),this.updateScalingAndBounds()},resetCanvas:function(a,b){void 0===a&&(a=this.width+"px"),void 0===b&&(b=this.height+"px");var c=this.game.canvas;this.compatibility.noMargins||(c.style.marginLeft="",c.style.marginTop="",c.style.marginRight="",c.style.marginBottom=""),c.style.width=a,c.style.height=b},queueUpdate:function(a){a&&(this._parentBounds.width=0,this._parentBounds.height=0),this._updateThrottle=this._updateThrottleReset},reset:function(a){a&&this.grid&&this.grid.reset()},setMaximum:function(){this.width=this.dom.visualBounds.width,this.height=this.dom.visualBounds.height},setShowAll:function(a){var b,c=this.getParentBounds(this._tempBounds),d=c.width,e=c.height;b=a?Math.max(e/this.game.height,d/this.game.width):Math.min(e/this.game.height,d/this.game.width),this.width=Math.round(this.game.width*b),this.height=Math.round(this.game.height*b)},setExactFit:function(){var a=this.getParentBounds(this._tempBounds);this.width=a.width,this.height=a.height,this.isFullScreen||(this.maxWidth&&(this.width=Math.min(this.width,this.maxWidth)),this.maxHeight&&(this.height=Math.min(this.height,this.maxHeight)))},createFullScreenTarget:function(){var a=document.createElement("div");return a.style.margin="0",a.style.padding="0",a.style.background="#000",a},startFullScreen:function(a,b){if(this.isFullScreen)return!1;if(!this.compatibility.supportsFullScreen){var d=this;return void setTimeout(function(){d.fullScreenError()},10)}if("when-not-mouse"===this.compatibility.clickTrampoline){var e=this.game.input;if(e.activePointer&&e.activePointer!==e.mousePointer&&(b||b!==!1))return void e.activePointer.addClickTrampoline("startFullScreen",this.startFullScreen,this,[a,!1])}"undefined"!=typeof a&&this.game.renderType===c.CANVAS&&(this.game.stage.smoothed=a);var f=this.fullScreenTarget;f||(this.cleanupCreatedTarget(),this._createdFullScreenTarget=this.createFullScreenTarget(),f=this._createdFullScreenTarget);var g={targetElement:f};if(this.onFullScreenInit.dispatch(this,g),this._createdFullScreenTarget){var h=this.game.canvas,i=h.parentNode;i.insertBefore(f,h),f.appendChild(h)}return this.game.device.fullscreenKeyboard?f[this.game.device.requestFullscreen](Element.ALLOW_KEYBOARD_INPUT):f[this.game.device.requestFullscreen](),!0},stopFullScreen:function(){return this.isFullScreen&&this.compatibility.supportsFullScreen?(document[this.game.device.cancelFullscreen](),!0):!1},cleanupCreatedTarget:function(){var a=this._createdFullScreenTarget;if(a&&a.parentNode){var b=a.parentNode;b.insertBefore(this.game.canvas,a),b.removeChild(a)}this._createdFullScreenTarget=null},prepScreenMode:function(a){var b=!!this._createdFullScreenTarget,d=this._createdFullScreenTarget||this.fullScreenTarget;a?(b||this.fullScreenScaleMode===c.ScaleManager.EXACT_FIT)&&d!==this.game.canvas&&(this._fullScreenRestore={targetWidth:d.style.width,targetHeight:d.style.height},d.style.width="100%",d.style.height="100%"):(this._fullScreenRestore&&(d.style.width=this._fullScreenRestore.targetWidth,d.style.height=this._fullScreenRestore.targetHeight,this._fullScreenRestore=null),this.updateDimensions(this._gameSize.width,this._gameSize.height,!0),this.resetCanvas())},fullScreenChange:function(a){this.event=a,this.isFullScreen?(this.prepScreenMode(!0),this.updateLayout(),this.queueUpdate(!0)):(this.prepScreenMode(!1),this.cleanupCreatedTarget(),this.updateLayout(),this.queueUpdate(!0)),this.onFullScreenChange.dispatch(this,this.width,this.height)},fullScreenError:function(a){this.event=a,this.cleanupCreatedTarget(),console.warn("Phaser.ScaleManager: requestFullscreen failed or device does not support the Fullscreen API"),this.onFullScreenError.dispatch(this)},scaleSprite:function(a,b,c,d){if(void 0===b&&(b=this.width),void 0===c&&(c=this.height),void 0===d&&(d=!1),!a||!a.scale)return a;if(a.scale.x=1,a.scale.y=1,a.width<=0||a.height<=0||0>=b||0>=c)return a;var e=b,f=a.height*b/a.width,g=a.width*c/a.height,h=c,i=g>b;return i=i?d:!d,i?(a.width=Math.floor(e),a.height=Math.floor(f)):(a.width=Math.floor(g),a.height=Math.floor(h)),a},destroy:function(){this.game.onResume.remove(this._gameResumed,this),window.removeEventListener("orientationchange",this._orientationChange,!1),window.removeEventListener("resize",this._windowResize,!1),this.compatibility.supportsFullScreen&&(document.removeEventListener("webkitfullscreenchange",this._fullScreenChange,!1),document.removeEventListener("mozfullscreenchange",this._fullScreenChange,!1),document.removeEventListener("MSFullscreenChange",this._fullScreenChange,!1),document.removeEventListener("fullscreenchange",this._fullScreenChange,!1),document.removeEventListener("webkitfullscreenerror",this._fullScreenError,!1),document.removeEventListener("mozfullscreenerror",this._fullScreenError,!1),document.removeEventListener("MSFullscreenError",this._fullScreenError,!1),document.removeEventListener("fullscreenerror",this._fullScreenError,!1))}},c.ScaleManager.prototype.constructor=c.ScaleManager,Object.defineProperty(c.ScaleManager.prototype,"boundingParent",{get:function(){if(this.parentIsWindow||this.isFullScreen&&!this._createdFullScreenTarget)return null;var a=this.game.canvas&&this.game.canvas.parentNode;return a||null}}),Object.defineProperty(c.ScaleManager.prototype,"scaleMode",{get:function(){return this._scaleMode},set:function(a){return a!==this._scaleMode&&(this.isFullScreen||(this.updateDimensions(this._gameSize.width,this._gameSize.height,!0),this.queueUpdate(!0)),this._scaleMode=a),this._scaleMode}}),Object.defineProperty(c.ScaleManager.prototype,"fullScreenScaleMode",{get:function(){return this._fullScreenScaleMode},set:function(a){return a!==this._fullScreenScaleMode&&(this.isFullScreen?(this.prepScreenMode(!1),this._fullScreenScaleMode=a,this.prepScreenMode(!0),this.queueUpdate(!0)):this._fullScreenScaleMode=a),this._fullScreenScaleMode}}),Object.defineProperty(c.ScaleManager.prototype,"currentScaleMode",{get:function(){return this.isFullScreen?this._fullScreenScaleMode:this._scaleMode;
}}),Object.defineProperty(c.ScaleManager.prototype,"pageAlignHorizontally",{get:function(){return this._pageAlignHorizontally},set:function(a){a!==this._pageAlignHorizontally&&(this._pageAlignHorizontally=a,this.queueUpdate(!0))}}),Object.defineProperty(c.ScaleManager.prototype,"pageAlignVertically",{get:function(){return this._pageAlignVertically},set:function(a){a!==this._pageAlignVertically&&(this._pageAlignVertically=a,this.queueUpdate(!0))}}),Object.defineProperty(c.ScaleManager.prototype,"isFullScreen",{get:function(){return!!(document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement||document.msFullscreenElement)}}),Object.defineProperty(c.ScaleManager.prototype,"isPortrait",{get:function(){return"portrait"===this.classifyOrientation(this.screenOrientation)}}),Object.defineProperty(c.ScaleManager.prototype,"isLandscape",{get:function(){return"landscape"===this.classifyOrientation(this.screenOrientation)}}),Object.defineProperty(c.ScaleManager.prototype,"isGamePortrait",{get:function(){return this.height>this.width}}),Object.defineProperty(c.ScaleManager.prototype,"isGameLandscape",{get:function(){return this.width>this.height}}),c.Utils.Debug=function(a){this.game=a,this.sprite=null,this.bmd=null,this.canvas=null,this.context=null,this.font="14px Courier",this.columnWidth=100,this.lineHeight=16,this.renderShadow=!0,this.currentX=0,this.currentY=0,this.currentAlpha=1,this.dirty=!1},c.Utils.Debug.prototype={boot:function(){this.game.renderType===c.CANVAS?this.context=this.game.context:(this.bmd=this.game.make.bitmapData(this.game.width,this.game.height),this.sprite=this.game.make.image(0,0,this.bmd),this.game.stage.addChild(this.sprite),this.game.scale.onSizeChange.add(this.resize,this),this.canvas=PIXI.CanvasPool.create(this,this.game.width,this.game.height),this.context=this.canvas.getContext("2d"))},resize:function(a,b,c){this.bmd.resize(b,c),this.canvas.width=b,this.canvas.height=c},preUpdate:function(){this.dirty&&this.sprite&&(this.bmd.clear(),this.bmd.draw(this.canvas,0,0),this.context.clearRect(0,0,this.game.width,this.game.height),this.dirty=!1)},reset:function(){this.context&&this.context.clearRect(0,0,this.game.width,this.game.height),this.sprite&&this.bmd.clear()},start:function(a,b,c,d){"number"!=typeof a&&(a=0),"number"!=typeof b&&(b=0),c=c||"rgb(255,255,255)",void 0===d&&(d=0),this.currentX=a,this.currentY=b,this.currentColor=c,this.columnWidth=d,this.dirty=!0,this.context.save(),this.context.setTransform(1,0,0,1,0,0),this.context.strokeStyle=c,this.context.fillStyle=c,this.context.font=this.font,this.context.globalAlpha=this.currentAlpha},stop:function(){this.context.restore()},line:function(){for(var a=this.currentX,b=0;b<arguments.length;b++)this.renderShadow&&(this.context.fillStyle="rgb(0,0,0)",this.context.fillText(arguments[b],a+1,this.currentY+1),this.context.fillStyle=this.currentColor),this.context.fillText(arguments[b],a,this.currentY),a+=this.columnWidth;this.currentY+=this.lineHeight},soundInfo:function(a,b,c,d){this.start(b,c,d),this.line("Sound: "+a.key+" Locked: "+a.game.sound.touchLocked),this.line("Is Ready?: "+this.game.cache.isSoundReady(a.key)+" Pending Playback: "+a.pendingPlayback),this.line("Decoded: "+a.isDecoded+" Decoding: "+a.isDecoding),this.line("Total Duration: "+a.totalDuration+" Playing: "+a.isPlaying),this.line("Time: "+a.currentTime),this.line("Volume: "+a.volume+" Muted: "+a.mute),this.line("WebAudio: "+a.usingWebAudio+" Audio: "+a.usingAudioTag),""!==a.currentMarker&&(this.line("Marker: "+a.currentMarker+" Duration: "+a.duration+" (ms: "+a.durationMS+")"),this.line("Start: "+a.markers[a.currentMarker].start+" Stop: "+a.markers[a.currentMarker].stop),this.line("Position: "+a.position)),this.stop()},cameraInfo:function(a,b,c,d){this.start(b,c,d),this.line("Camera ("+a.width+" x "+a.height+")"),this.line("X: "+a.x+" Y: "+a.y),a.bounds&&this.line("Bounds x: "+a.bounds.x+" Y: "+a.bounds.y+" w: "+a.bounds.width+" h: "+a.bounds.height),this.line("View x: "+a.view.x+" Y: "+a.view.y+" w: "+a.view.width+" h: "+a.view.height),this.line("Total in view: "+a.totalInView),this.stop()},timer:function(a,b,c,d){this.start(b,c,d),this.line("Timer (running: "+a.running+" expired: "+a.expired+")"),this.line("Next Tick: "+a.next+" Duration: "+a.duration),this.line("Paused: "+a.paused+" Length: "+a.length),this.stop()},pointer:function(a,b,c,d,e){null!=a&&(void 0===b&&(b=!1),c=c||"rgba(0,255,0,0.5)",d=d||"rgba(255,0,0,0.5)",(b!==!0||a.isUp!==!0)&&(this.start(a.x,a.y-100,e),this.context.beginPath(),this.context.arc(a.x,a.y,a.circle.radius,0,2*Math.PI),a.active?this.context.fillStyle=c:this.context.fillStyle=d,this.context.fill(),this.context.closePath(),this.context.beginPath(),this.context.moveTo(a.positionDown.x,a.positionDown.y),this.context.lineTo(a.position.x,a.position.y),this.context.lineWidth=2,this.context.stroke(),this.context.closePath(),this.line("ID: "+a.id+" Active: "+a.active),this.line("World X: "+a.worldX+" World Y: "+a.worldY),this.line("Screen X: "+a.x+" Screen Y: "+a.y+" In: "+a.withinGame),this.line("Duration: "+a.duration+" ms"),this.line("is Down: "+a.isDown+" is Up: "+a.isUp),this.stop()))},spriteInputInfo:function(a,b,c,d){this.start(b,c,d),this.line("Sprite Input: ("+a.width+" x "+a.height+")"),this.line("x: "+a.input.pointerX().toFixed(1)+" y: "+a.input.pointerY().toFixed(1)),this.line("over: "+a.input.pointerOver()+" duration: "+a.input.overDuration().toFixed(0)),this.line("down: "+a.input.pointerDown()+" duration: "+a.input.downDuration().toFixed(0)),this.line("just over: "+a.input.justOver()+" just out: "+a.input.justOut()),this.stop()},key:function(a,b,c,d){this.start(b,c,d,150),this.line("Key:",a.keyCode,"isDown:",a.isDown),this.line("justDown:",a.justDown,"justUp:",a.justUp),this.line("Time Down:",a.timeDown.toFixed(0),"duration:",a.duration.toFixed(0)),this.stop()},inputInfo:function(a,b,c){this.start(a,b,c),this.line("Input"),this.line("X: "+this.game.input.x+" Y: "+this.game.input.y),this.line("World X: "+this.game.input.worldX+" World Y: "+this.game.input.worldY),this.line("Scale X: "+this.game.input.scale.x.toFixed(1)+" Scale Y: "+this.game.input.scale.x.toFixed(1)),this.line("Screen X: "+this.game.input.activePointer.screenX+" Screen Y: "+this.game.input.activePointer.screenY),this.stop()},spriteBounds:function(a,b,c){var d=a.getBounds();d.x+=this.game.camera.x,d.y+=this.game.camera.y,this.rectangle(d,b,c)},ropeSegments:function(a,b,c){var d=a.segments,e=this;d.forEach(function(a){e.rectangle(a,b,c)},this)},spriteInfo:function(a,b,c,d){this.start(b,c,d),this.line("Sprite:  ("+a.width+" x "+a.height+") anchor: "+a.anchor.x+" x "+a.anchor.y),this.line("x: "+a.x.toFixed(1)+" y: "+a.y.toFixed(1)),this.line("angle: "+a.angle.toFixed(1)+" rotation: "+a.rotation.toFixed(1)),this.line("visible: "+a.visible+" in camera: "+a.inCamera),this.line("bounds x: "+a._bounds.x.toFixed(1)+" y: "+a._bounds.y.toFixed(1)+" w: "+a._bounds.width.toFixed(1)+" h: "+a._bounds.height.toFixed(1)),this.stop()},spriteCoords:function(a,b,c,d){this.start(b,c,d,100),a.name&&this.line(a.name),this.line("x:",a.x.toFixed(2),"y:",a.y.toFixed(2)),this.line("pos x:",a.position.x.toFixed(2),"pos y:",a.position.y.toFixed(2)),this.line("world x:",a.world.x.toFixed(2),"world y:",a.world.y.toFixed(2)),this.stop()},lineInfo:function(a,b,c,d){this.start(b,c,d,80),this.line("start.x:",a.start.x.toFixed(2),"start.y:",a.start.y.toFixed(2)),this.line("end.x:",a.end.x.toFixed(2),"end.y:",a.end.y.toFixed(2)),this.line("length:",a.length.toFixed(2),"angle:",a.angle),this.stop()},pixel:function(a,b,c,d){d=d||2,this.start(),this.context.fillStyle=c,this.context.fillRect(a,b,d,d),this.stop()},geom:function(a,b,d,e){void 0===d&&(d=!0),void 0===e&&(e=0),b=b||"rgba(0,255,0,0.4)",this.start(),this.context.fillStyle=b,this.context.strokeStyle=b,a instanceof c.Rectangle||1===e?d?this.context.fillRect(a.x-this.game.camera.x,a.y-this.game.camera.y,a.width,a.height):this.context.strokeRect(a.x-this.game.camera.x,a.y-this.game.camera.y,a.width,a.height):a instanceof c.Circle||2===e?(this.context.beginPath(),this.context.arc(a.x-this.game.camera.x,a.y-this.game.camera.y,a.radius,0,2*Math.PI,!1),this.context.closePath(),d?this.context.fill():this.context.stroke()):a instanceof c.Point||3===e?this.context.fillRect(a.x-this.game.camera.x,a.y-this.game.camera.y,4,4):(a instanceof c.Line||4===e)&&(this.context.lineWidth=1,this.context.beginPath(),this.context.moveTo(a.start.x+.5-this.game.camera.x,a.start.y+.5-this.game.camera.y),this.context.lineTo(a.end.x+.5-this.game.camera.x,a.end.y+.5-this.game.camera.y),this.context.closePath(),this.context.stroke()),this.stop()},rectangle:function(a,b,c){void 0===c&&(c=!0),b=b||"rgba(0, 255, 0, 0.4)",this.start(),c?(this.context.fillStyle=b,this.context.fillRect(a.x-this.game.camera.x,a.y-this.game.camera.y,a.width,a.height)):(this.context.strokeStyle=b,this.context.strokeRect(a.x-this.game.camera.x,a.y-this.game.camera.y,a.width,a.height)),this.stop()},text:function(a,b,c,d,e){d=d||"rgb(255,255,255)",e=e||"16px Courier",this.start(),this.context.font=e,this.renderShadow&&(this.context.fillStyle="rgb(0,0,0)",this.context.fillText(a,b+1,c+1)),this.context.fillStyle=d,this.context.fillText(a,b,c),this.stop()},quadTree:function(a,b){b=b||"rgba(255,0,0,0.3)",this.start();var c=a.bounds;if(0===a.nodes.length){this.context.strokeStyle=b,this.context.strokeRect(c.x,c.y,c.width,c.height),this.text("size: "+a.objects.length,c.x+4,c.y+16,"rgb(0,200,0)","12px Courier"),this.context.strokeStyle="rgb(0,255,0)";for(var d=0;d<a.objects.length;d++)this.context.strokeRect(a.objects[d].x,a.objects[d].y,a.objects[d].width,a.objects[d].height)}else for(var d=0;d<a.nodes.length;d++)this.quadTree(a.nodes[d]);this.stop()},body:function(a,b,d){a.body&&(this.start(),a.body.type===c.Physics.ARCADE?c.Physics.Arcade.Body.render(this.context,a.body,b,d):a.body.type===c.Physics.NINJA?c.Physics.Ninja.Body.render(this.context,a.body,b,d):a.body.type===c.Physics.BOX2D&&c.Physics.Box2D.renderBody(this.context,a.body,b),this.stop())},bodyInfo:function(a,b,d,e){a.body&&(this.start(b,d,e,210),a.body.type===c.Physics.ARCADE?c.Physics.Arcade.Body.renderBodyInfo(this,a.body):a.body.type===c.Physics.BOX2D&&this.game.physics.box2d.renderBodyInfo(this,a.body),this.stop())},box2dWorld:function(){this.start(),this.context.translate(-this.game.camera.view.x,-this.game.camera.view.y,0),this.game.physics.box2d.renderDebugDraw(this.context),this.stop()},box2dBody:function(a,b){this.start(),c.Physics.Box2D.renderBody(this.context,a,b),this.stop()},destroy:function(){PIXI.CanvasPool.remove(this)}},c.Utils.Debug.prototype.constructor=c.Utils.Debug,c.DOM={getOffset:function(a,b){b=b||new c.Point;var d=a.getBoundingClientRect(),e=c.DOM.scrollY,f=c.DOM.scrollX,g=document.documentElement.clientTop,h=document.documentElement.clientLeft;return b.x=d.left+f-h,b.y=d.top+e-g,b},getBounds:function(a,b){return void 0===b&&(b=0),a=a&&!a.nodeType?a[0]:a,a&&1===a.nodeType?this.calibrate(a.getBoundingClientRect(),b):!1},calibrate:function(a,b){b=+b||0;var c={width:0,height:0,left:0,right:0,top:0,bottom:0};return c.width=(c.right=a.right+b)-(c.left=a.left-b),c.height=(c.bottom=a.bottom+b)-(c.top=a.top-b),c},getAspectRatio:function(a){a=null==a?this.visualBounds:1===a.nodeType?this.getBounds(a):a;var b=a.width,c=a.height;return"function"==typeof b&&(b=b.call(a)),"function"==typeof c&&(c=c.call(a)),b/c},inLayoutViewport:function(a,b){var c=this.getBounds(a,b);return!!c&&c.bottom>=0&&c.right>=0&&c.top<=this.layoutBounds.width&&c.left<=this.layoutBounds.height},getScreenOrientation:function(a){var b=window.screen,c=b.orientation||b.mozOrientation||b.msOrientation;if(c&&"string"==typeof c.type)return c.type;if("string"==typeof c)return c;var d="portrait-primary",e="landscape-primary";if("screen"===a)return b.height>b.width?d:e;if("viewport"===a)return this.visualBounds.height>this.visualBounds.width?d:e;if("window.orientation"===a&&"number"==typeof window.orientation)return 0===window.orientation||180===window.orientation?d:e;if(window.matchMedia){if(window.matchMedia("(orientation: portrait)").matches)return d;if(window.matchMedia("(orientation: landscape)").matches)return e}return this.visualBounds.height>this.visualBounds.width?d:e},visualBounds:new c.Rectangle,layoutBounds:new c.Rectangle,documentBounds:new c.Rectangle},c.Device.whenReady(function(a){var b=window&&"pageXOffset"in window?function(){return window.pageXOffset}:function(){return document.documentElement.scrollLeft},d=window&&"pageYOffset"in window?function(){return window.pageYOffset}:function(){return document.documentElement.scrollTop};Object.defineProperty(c.DOM,"scrollX",{get:b}),Object.defineProperty(c.DOM,"scrollY",{get:d}),Object.defineProperty(c.DOM.visualBounds,"x",{get:b}),Object.defineProperty(c.DOM.visualBounds,"y",{get:d}),Object.defineProperty(c.DOM.layoutBounds,"x",{value:0}),Object.defineProperty(c.DOM.layoutBounds,"y",{value:0});var e=a.desktop&&document.documentElement.clientWidth<=window.innerWidth&&document.documentElement.clientHeight<=window.innerHeight;if(e){var f=function(){return Math.max(window.innerWidth,document.documentElement.clientWidth)},g=function(){return Math.max(window.innerHeight,document.documentElement.clientHeight)};Object.defineProperty(c.DOM.visualBounds,"width",{get:f}),Object.defineProperty(c.DOM.visualBounds,"height",{get:g}),Object.defineProperty(c.DOM.layoutBounds,"width",{get:f}),Object.defineProperty(c.DOM.layoutBounds,"height",{get:g})}else Object.defineProperty(c.DOM.visualBounds,"width",{get:function(){return window.innerWidth}}),Object.defineProperty(c.DOM.visualBounds,"height",{get:function(){return window.innerHeight}}),Object.defineProperty(c.DOM.layoutBounds,"width",{get:function(){var a=document.documentElement.clientWidth,b=window.innerWidth;return b>a?b:a}}),Object.defineProperty(c.DOM.layoutBounds,"height",{get:function(){var a=document.documentElement.clientHeight,b=window.innerHeight;return b>a?b:a}});Object.defineProperty(c.DOM.documentBounds,"x",{value:0}),Object.defineProperty(c.DOM.documentBounds,"y",{value:0}),Object.defineProperty(c.DOM.documentBounds,"width",{get:function(){var a=document.documentElement;return Math.max(a.clientWidth,a.offsetWidth,a.scrollWidth)}}),Object.defineProperty(c.DOM.documentBounds,"height",{get:function(){var a=document.documentElement;return Math.max(a.clientHeight,a.offsetHeight,a.scrollHeight)}})},null,!0),c.ArraySet=function(a){this.position=0,this.list=a||[]},c.ArraySet.prototype={add:function(a){return this.exists(a)||this.list.push(a),a},getIndex:function(a){return this.list.indexOf(a)},getByKey:function(a,b){for(var c=this.list.length;c--;)if(this.list[c][a]===b)return this.list[c];return null},exists:function(a){return this.list.indexOf(a)>-1},reset:function(){this.list.length=0},remove:function(a){var b=this.list.indexOf(a);return b>-1?(this.list.splice(b,1),a):void 0},setAll:function(a,b){for(var c=this.list.length;c--;)this.list[c]&&(this.list[c][a]=b)},callAll:function(a){for(var b=Array.prototype.slice.call(arguments,1),c=this.list.length;c--;)this.list[c]&&this.list[c][a]&&this.list[c][a].apply(this.list[c],b)},removeAll:function(a){void 0===a&&(a=!1);for(var b=this.list.length;b--;)if(this.list[b]){var c=this.remove(this.list[b]);a&&c.destroy()}this.position=0,this.list=[]}},Object.defineProperty(c.ArraySet.prototype,"total",{get:function(){return this.list.length}}),Object.defineProperty(c.ArraySet.prototype,"first",{get:function(){return this.position=0,this.list.length>0?this.list[0]:null}}),Object.defineProperty(c.ArraySet.prototype,"next",{get:function(){return this.position<this.list.length?(this.position++,this.list[this.position]):null}}),c.ArraySet.prototype.constructor=c.ArraySet,c.ArrayUtils={getRandomItem:function(a,b,c){if(null===a)return null;void 0===b&&(b=0),void 0===c&&(c=a.length);var d=b+Math.floor(Math.random()*c);return void 0===a[d]?null:a[d]},removeRandomItem:function(a,b,c){if(null==a)return null;void 0===b&&(b=0),void 0===c&&(c=a.length);var d=b+Math.floor(Math.random()*c);if(d<a.length){var e=a.splice(d,1);return void 0===e[0]?null:e[0]}return null},shuffle:function(a){for(var b=a.length-1;b>0;b--){var c=Math.floor(Math.random()*(b+1)),d=a[b];a[b]=a[c],a[c]=d}return a},transposeMatrix:function(a){for(var b=a.length,c=a[0].length,d=new Array(c),e=0;c>e;e++){d[e]=new Array(b);for(var f=b-1;f>-1;f--)d[e][f]=a[f][e]}return d},rotateMatrix:function(a,b){if("string"!=typeof b&&(b=(b%360+360)%360),90===b||-270===b||"rotateLeft"===b)a=c.ArrayUtils.transposeMatrix(a),a=a.reverse();else if(-90===b||270===b||"rotateRight"===b)a=a.reverse(),a=c.ArrayUtils.transposeMatrix(a);else if(180===Math.abs(b)||"rotate180"===b){for(var d=0;d<a.length;d++)a[d].reverse();a=a.reverse()}return a},findClosest:function(a,b){if(!b.length)return NaN;if(1===b.length||a<b[0])return b[0];for(var c=1;b[c]<a;)c++;var d=b[c-1],e=c<b.length?b[c]:Number.POSITIVE_INFINITY;return a-d>=e-a?e:d},rotate:function(a){var b=a.shift();return a.push(b),b},numberArray:function(a,b){for(var c=[],d=a;b>=d;d++)c.push(d);return c},numberArrayStep:function(a,b,d){(void 0===a||null===a)&&(a=0),(void 0===b||null===b)&&(b=a,a=0),void 0===d&&(d=1);for(var e=[],f=Math.max(c.Math.roundAwayFromZero((b-a)/(d||1)),0),g=0;f>g;g++)e.push(a),a+=d;return e}},c.LinkedList=function(){this.next=null,this.prev=null,this.first=null,this.last=null,this.total=0},c.LinkedList.prototype={add:function(a){return 0===this.total&&null===this.first&&null===this.last?(this.first=a,this.last=a,this.next=a,a.prev=this,this.total++,a):(this.last.next=a,a.prev=this.last,this.last=a,this.total++,a)},reset:function(){this.first=null,this.last=null,this.next=null,this.prev=null,this.total=0},remove:function(a){return 1===this.total?(this.reset(),void(a.next=a.prev=null)):(a===this.first?this.first=this.first.next:a===this.last&&(this.last=this.last.prev),a.prev&&(a.prev.next=a.next),a.next&&(a.next.prev=a.prev),a.next=a.prev=null,null===this.first&&(this.last=null),void this.total--)},callAll:function(a){if(this.first&&this.last){var b=this.first;do b&&b[a]&&b[a].call(b),b=b.next;while(b!=this.last.next)}}},c.LinkedList.prototype.constructor=c.LinkedList,c.Create=function(a){this.game=a,this.bmd=null,this.canvas=null,this.ctx=null,this.palettes=[{0:"#000",1:"#9D9D9D",2:"#FFF",3:"#BE2633",4:"#E06F8B",5:"#493C2B",6:"#A46422",7:"#EB8931",8:"#F7E26B",9:"#2F484E",A:"#44891A",B:"#A3CE27",C:"#1B2632",D:"#005784",E:"#31A2F2",F:"#B2DCEF"},{0:"#000",1:"#191028",2:"#46af45",3:"#a1d685",4:"#453e78",5:"#7664fe",6:"#833129",7:"#9ec2e8",8:"#dc534b",9:"#e18d79",A:"#d6b97b",B:"#e9d8a1",C:"#216c4b",D:"#d365c8",E:"#afaab9",F:"#f5f4eb"},{0:"#000",1:"#2234d1",2:"#0c7e45",3:"#44aacc",4:"#8a3622",5:"#5c2e78",6:"#aa5c3d",7:"#b5b5b5",8:"#5e606e",9:"#4c81fb",A:"#6cd947",B:"#7be2f9",C:"#eb8a60",D:"#e23d69",E:"#ffd93f",F:"#fff"},{0:"#000",1:"#fff",2:"#8b4131",3:"#7bbdc5",4:"#8b41ac",5:"#6aac41",6:"#3931a4",7:"#d5de73",8:"#945a20",9:"#5a4100",A:"#bd736a",B:"#525252",C:"#838383",D:"#acee8b",E:"#7b73de",F:"#acacac"},{0:"#000",1:"#191028",2:"#46af45",3:"#a1d685",4:"#453e78",5:"#7664fe",6:"#833129",7:"#9ec2e8",8:"#dc534b",9:"#e18d79",A:"#d6b97b",B:"#e9d8a1",C:"#216c4b",D:"#d365c8",E:"#afaab9",F:"#fff"}]},c.Create.PALETTE_ARNE=0,c.Create.PALETTE_JMP=1,c.Create.PALETTE_CGA=2,c.Create.PALETTE_C64=3,c.Create.PALETTE_JAPANESE_MACHINE=4,c.Create.prototype={texture:function(a,b,c,d,e){void 0===c&&(c=8),void 0===d&&(d=c),void 0===e&&(e=0);var f=b[0].length*c,g=b.length*d;null===this.bmd&&(this.bmd=this.game.make.bitmapData(),this.canvas=this.bmd.canvas,this.ctx=this.bmd.context),this.bmd.resize(f,g),this.bmd.clear();for(var h=0;h<b.length;h++)for(var i=b[h],j=0;j<i.length;j++){var k=i[j];"."!==k&&" "!==k&&(this.ctx.fillStyle=this.palettes[e][k],this.ctx.fillRect(j*c,h*d,c,d))}return this.bmd.generateTexture(a)},grid:function(a,b,c,d,e,f){null===this.bmd&&(this.bmd=this.game.make.bitmapData(),this.canvas=this.bmd.canvas,this.ctx=this.bmd.context),this.bmd.resize(b,c),this.ctx.fillStyle=f;for(var g=0;c>g;g+=e)this.ctx.fillRect(0,g,b,1);for(var h=0;b>h;h+=d)this.ctx.fillRect(h,0,1,c);return this.bmd.generateTexture(a)}},c.Create.prototype.constructor=c.Create,c.FlexGrid=function(a,b,d){this.game=a.game,this.manager=a,this.width=b,this.height=d,this.boundsCustom=new c.Rectangle(0,0,b,d),this.boundsFluid=new c.Rectangle(0,0,b,d),this.boundsFull=new c.Rectangle(0,0,b,d),this.boundsNone=new c.Rectangle(0,0,b,d),this.positionCustom=new c.Point(0,0),this.positionFluid=new c.Point(0,0),this.positionFull=new c.Point(0,0),this.positionNone=new c.Point(0,0),this.scaleCustom=new c.Point(1,1),this.scaleFluid=new c.Point(1,1),this.scaleFluidInversed=new c.Point(1,1),this.scaleFull=new c.Point(1,1),this.scaleNone=new c.Point(1,1),this.customWidth=0,this.customHeight=0,this.customOffsetX=0,this.customOffsetY=0,this.ratioH=b/d,this.ratioV=d/b,this.multiplier=0,this.layers=[]},c.FlexGrid.prototype={setSize:function(a,b){this.width=a,this.height=b,this.ratioH=a/b,this.ratioV=b/a,this.scaleNone=new c.Point(1,1),this.boundsNone.width=this.width,this.boundsNone.height=this.height,this.refresh()},createCustomLayer:function(a,b,d,e){void 0===e&&(e=!0),this.customWidth=a,this.customHeight=b,this.boundsCustom.width=a,this.boundsCustom.height=b;var f=new c.FlexLayer(this,this.positionCustom,this.boundsCustom,this.scaleCustom);return e&&this.game.world.add(f),this.layers.push(f),"undefined"!=typeof d&&null!==typeof d&&f.addMultiple(d),f},createFluidLayer:function(a,b){void 0===b&&(b=!0);var d=new c.FlexLayer(this,this.positionFluid,this.boundsFluid,this.scaleFluid);return b&&this.game.world.add(d),this.layers.push(d),"undefined"!=typeof a&&null!==typeof a&&d.addMultiple(a),d},createFullLayer:function(a){var b=new c.FlexLayer(this,this.positionFull,this.boundsFull,this.scaleFluid);return this.game.world.add(b),this.layers.push(b),"undefined"!=typeof a&&b.addMultiple(a),b},createFixedLayer:function(a){var b=new c.FlexLayer(this,this.positionNone,this.boundsNone,this.scaleNone);return this.game.world.add(b),this.layers.push(b),"undefined"!=typeof a&&b.addMultiple(a),b},reset:function(){for(var a=this.layers.length;a--;)this.layers[a].persist||(this.layers[a].position=null,this.layers[a].scale=null,this.layers.slice(a,1))},onResize:function(a,b){this.ratioH=a/b,this.ratioV=b/a,this.refresh(a,b)},refresh:function(){this.multiplier=Math.min(this.manager.height/this.height,this.manager.width/this.width),this.boundsFluid.width=Math.round(this.width*this.multiplier),this.boundsFluid.height=Math.round(this.height*this.multiplier),this.scaleFluid.set(this.boundsFluid.width/this.width,this.boundsFluid.height/this.height),this.scaleFluidInversed.set(this.width/this.boundsFluid.width,this.height/this.boundsFluid.height),this.scaleFull.set(this.boundsFull.width/this.width,this.boundsFull.height/this.height),this.boundsFull.width=Math.round(this.manager.width*this.scaleFluidInversed.x),this.boundsFull.height=Math.round(this.manager.height*this.scaleFluidInversed.y),this.boundsFluid.centerOn(this.manager.bounds.centerX,this.manager.bounds.centerY),this.boundsNone.centerOn(this.manager.bounds.centerX,this.manager.bounds.centerY),this.positionFluid.set(this.boundsFluid.x,this.boundsFluid.y),this.positionNone.set(this.boundsNone.x,this.boundsNone.y)},fitSprite:function(a){this.manager.scaleSprite(a),a.x=this.manager.bounds.centerX,a.y=this.manager.bounds.centerY},debug:function(){this.game.debug.text(this.boundsFluid.width+" x "+this.boundsFluid.height,this.boundsFluid.x+4,this.boundsFluid.y+16),this.game.debug.geom(this.boundsFluid,"rgba(255,0,0,0.9",!1)}},c.FlexGrid.prototype.constructor=c.FlexGrid,c.FlexLayer=function(a,b,d,e){c.Group.call(this,a.game,null,"__flexLayer"+a.game.rnd.uuid(),!1),this.manager=a.manager,this.grid=a,this.persist=!1,this.position=b,this.bounds=d,this.scale=e,this.topLeft=d.topLeft,this.topMiddle=new c.Point(d.halfWidth,0),this.topRight=d.topRight,this.bottomLeft=d.bottomLeft,this.bottomMiddle=new c.Point(d.halfWidth,d.bottom),this.bottomRight=d.bottomRight},c.FlexLayer.prototype=Object.create(c.Group.prototype),c.FlexLayer.prototype.constructor=c.FlexLayer,c.FlexLayer.prototype.resize=function(){},c.FlexLayer.prototype.debug=function(){this.game.debug.text(this.bounds.width+" x "+this.bounds.height,this.bounds.x+4,this.bounds.y+16),this.game.debug.geom(this.bounds,"rgba(0,0,255,0.9",!1),this.game.debug.geom(this.topLeft,"rgba(255,255,255,0.9"),this.game.debug.geom(this.topMiddle,"rgba(255,255,255,0.9"),this.game.debug.geom(this.topRight,"rgba(255,255,255,0.9")},c.Color={packPixel:function(a,b,d,e){return c.Device.LITTLE_ENDIAN?(e<<24|d<<16|b<<8|a)>>>0:(a<<24|b<<16|d<<8|e)>>>0},unpackPixel:function(a,b,d,e){return(void 0===b||null===b)&&(b=c.Color.createColor()),(void 0===d||null===d)&&(d=!1),(void 0===e||null===e)&&(e=!1),c.Device.LITTLE_ENDIAN?(b.a=(4278190080&a)>>>24,b.b=(16711680&a)>>>16,b.g=(65280&a)>>>8,b.r=255&a):(b.r=(4278190080&a)>>>24,b.g=(16711680&a)>>>16,b.b=(65280&a)>>>8,b.a=255&a),b.color=a,b.rgba="rgba("+b.r+","+b.g+","+b.b+","+b.a/255+")",d&&c.Color.RGBtoHSL(b.r,b.g,b.b,b),e&&c.Color.RGBtoHSV(b.r,b.g,b.b,b),b},fromRGBA:function(a,b){return b||(b=c.Color.createColor()),b.r=(4278190080&a)>>>24,b.g=(16711680&a)>>>16,b.b=(65280&a)>>>8,b.a=255&a,b.rgba="rgba("+b.r+","+b.g+","+b.b+","+b.a+")",b},toRGBA:function(a,b,c,d){return a<<24|b<<16|c<<8|d},RGBtoHSL:function(a,b,d,e){e||(e=c.Color.createColor(a,b,d,1)),a/=255,b/=255,d/=255;var f=Math.min(a,b,d),g=Math.max(a,b,d);if(e.h=0,e.s=0,e.l=(g+f)/2,g!==f){var h=g-f;e.s=e.l>.5?h/(2-g-f):h/(g+f),g===a?e.h=(b-d)/h+(d>b?6:0):g===b?e.h=(d-a)/h+2:g===d&&(e.h=(a-b)/h+4),e.h/=6}return e},HSLtoRGB:function(a,b,d,e){if(e?(e.r=d,e.g=d,e.b=d):e=c.Color.createColor(d,d,d),0!==b){var f=.5>d?d*(1+b):d+b-d*b,g=2*d-f;e.r=c.Color.hueToColor(g,f,a+1/3),e.g=c.Color.hueToColor(g,f,a),e.b=c.Color.hueToColor(g,f,a-1/3)}return e.r=Math.floor(255*e.r|0),e.g=Math.floor(255*e.g|0),e.b=Math.floor(255*e.b|0),c.Color.updateColor(e),e},RGBtoHSV:function(a,b,d,e){e||(e=c.Color.createColor(a,b,d,255)),a/=255,b/=255,d/=255;var f=Math.min(a,b,d),g=Math.max(a,b,d),h=g-f;return e.h=0,e.s=0===g?0:h/g,e.v=g,g!==f&&(g===a?e.h=(b-d)/h+(d>b?6:0):g===b?e.h=(d-a)/h+2:g===d&&(e.h=(a-b)/h+4),e.h/=6),e},HSVtoRGB:function(a,b,d,e){void 0===e&&(e=c.Color.createColor(0,0,0,1,a,b,0,d));var f,g,h,i=Math.floor(6*a),j=6*a-i,k=d*(1-b),l=d*(1-j*b),m=d*(1-(1-j)*b);switch(i%6){case 0:f=d,g=m,h=k;break;case 1:f=l,g=d,h=k;break;case 2:f=k,g=d,h=m;break;case 3:f=k,g=l,h=d;break;case 4:f=m,g=k,h=d;break;case 5:f=d,g=k,h=l}return e.r=Math.floor(255*f),e.g=Math.floor(255*g),e.b=Math.floor(255*h),c.Color.updateColor(e),e},hueToColor:function(a,b,c){return 0>c&&(c+=1),c>1&&(c-=1),1/6>c?a+6*(b-a)*c:.5>c?b:2/3>c?a+(b-a)*(2/3-c)*6:a},createColor:function(a,b,d,e,f,g,h,i){var j={r:a||0,g:b||0,b:d||0,a:e||1,h:f||0,s:g||0,l:h||0,v:i||0,color:0,color32:0,rgba:""};return c.Color.updateColor(j)},updateColor:function(a){return a.rgba="rgba("+a.r.toString()+","+a.g.toString()+","+a.b.toString()+","+a.a.toString()+")",a.color=c.Color.getColor(a.r,a.g,a.b),a.color32=c.Color.getColor32(255*a.a,a.r,a.g,a.b),a},getColor32:function(a,b,c,d){return a<<24|b<<16|c<<8|d},getColor:function(a,b,c){return a<<16|b<<8|c},RGBtoString:function(a,b,d,e,f){return void 0===e&&(e=255),void 0===f&&(f="#"),"#"===f?"#"+((1<<24)+(a<<16)+(b<<8)+d).toString(16).slice(1):"0x"+c.Color.componentToHex(e)+c.Color.componentToHex(a)+c.Color.componentToHex(b)+c.Color.componentToHex(d)},hexToRGB:function(a){var b=c.Color.hexToColor(a);return b?c.Color.getColor32(b.a,b.r,b.g,b.b):void 0},hexToColor:function(a,b){a=a.replace(/^(?:#|0x)?([a-f\d])([a-f\d])([a-f\d])$/i,function(a,b,c,d){return b+b+c+c+d+d});var d=/^(?:#|0x)?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);if(d){var e=parseInt(d[1],16),f=parseInt(d[2],16),g=parseInt(d[3],16);b?(b.r=e,b.g=f,b.b=g):b=c.Color.createColor(e,f,g)}return b},webToColor:function(a,b){b||(b=c.Color.createColor());var d=/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?))?\s*\)$/.exec(a);return d&&(b.r=parseInt(d[1],10),b.g=parseInt(d[2],10),b.b=parseInt(d[3],10),b.a=void 0!==d[4]?parseFloat(d[4]):1,c.Color.updateColor(b)),b},valueToColor:function(a,b){if(b||(b=c.Color.createColor()),"string"==typeof a)return 0===a.indexOf("rgb")?c.Color.webToColor(a,b):(b.a=1,c.Color.hexToColor(a,b));if("number"==typeof a){var d=c.Color.getRGB(a);return b.r=d.r,b.g=d.g,b.b=d.b,b.a=d.a/255,b}return b},componentToHex:function(a){var b=a.toString(16);return 1==b.length?"0"+b:b},HSVColorWheel:function(a,b){void 0===a&&(a=1),void 0===b&&(b=1);for(var d=[],e=0;359>=e;e++)d.push(c.Color.HSVtoRGB(e/359,a,b));return d},HSLColorWheel:function(a,b){void 0===a&&(a=.5),void 0===b&&(b=.5);for(var d=[],e=0;359>=e;e++)d.push(c.Color.HSLtoRGB(e/359,a,b));return d},interpolateColor:function(a,b,d,e,f){void 0===f&&(f=255);var g=c.Color.getRGB(a),h=c.Color.getRGB(b),i=(h.red-g.red)*e/d+g.red,j=(h.green-g.green)*e/d+g.green,k=(h.blue-g.blue)*e/d+g.blue;return c.Color.getColor32(f,i,j,k)},interpolateColorWithRGB:function(a,b,d,e,f,g){var h=c.Color.getRGB(a),i=(b-h.red)*g/f+h.red,j=(d-h.green)*g/f+h.green,k=(e-h.blue)*g/f+h.blue;return c.Color.getColor(i,j,k)},interpolateRGB:function(a,b,d,e,f,g,h,i){var j=(e-a)*i/h+a,k=(f-b)*i/h+b,l=(g-d)*i/h+d;return c.Color.getColor(j,k,l)},getRandomColor:function(a,b,d){if(void 0===a&&(a=0),void 0===b&&(b=255),void 0===d&&(d=255),b>255||a>b)return c.Color.getColor(255,255,255);var e=a+Math.round(Math.random()*(b-a)),f=a+Math.round(Math.random()*(b-a)),g=a+Math.round(Math.random()*(b-a));return c.Color.getColor32(d,e,f,g)},getRGB:function(a){return a>16777215?{alpha:a>>>24,red:a>>16&255,green:a>>8&255,blue:255&a,a:a>>>24,r:a>>16&255,g:a>>8&255,b:255&a}:{alpha:255,red:a>>16&255,green:a>>8&255,blue:255&a,a:255,r:a>>16&255,g:a>>8&255,b:255&a}},getWebRGB:function(a){if("object"==typeof a)return"rgba("+a.r.toString()+","+a.g.toString()+","+a.b.toString()+","+(a.a/255).toString()+")";var b=c.Color.getRGB(a);return"rgba("+b.r.toString()+","+b.g.toString()+","+b.b.toString()+","+(b.a/255).toString()+")"},getAlpha:function(a){return a>>>24},getAlphaFloat:function(a){return(a>>>24)/255},getRed:function(a){return a>>16&255},getGreen:function(a){return a>>8&255},getBlue:function(a){return 255&a},blendNormal:function(a){return a},blendLighten:function(a,b){return b>a?b:a},blendDarken:function(a,b){return b>a?a:b},blendMultiply:function(a,b){return a*b/255},blendAverage:function(a,b){return(a+b)/2},blendAdd:function(a,b){return Math.min(255,a+b)},blendSubtract:function(a,b){return Math.max(0,a+b-255)},blendDifference:function(a,b){return Math.abs(a-b)},blendNegation:function(a,b){return 255-Math.abs(255-a-b)},blendScreen:function(a,b){return 255-((255-a)*(255-b)>>8)},blendExclusion:function(a,b){return a+b-2*a*b/255},blendOverlay:function(a,b){return 128>b?2*a*b/255:255-2*(255-a)*(255-b)/255},blendSoftLight:function(a,b){return 128>b?2*((a>>1)+64)*(b/255):255-2*(255-((a>>1)+64))*(255-b)/255},blendHardLight:function(a,b){return c.Color.blendOverlay(b,a)},blendColorDodge:function(a,b){return 255===b?b:Math.min(255,(a<<8)/(255-b))},blendColorBurn:function(a,b){return 0===b?b:Math.max(0,255-(255-a<<8)/b)},blendLinearDodge:function(a,b){return c.Color.blendAdd(a,b)},blendLinearBurn:function(a,b){return c.Color.blendSubtract(a,b)},blendLinearLight:function(a,b){return 128>b?c.Color.blendLinearBurn(a,2*b):c.Color.blendLinearDodge(a,2*(b-128))},blendVividLight:function(a,b){return 128>b?c.Color.blendColorBurn(a,2*b):c.Color.blendColorDodge(a,2*(b-128))},blendPinLight:function(a,b){return 128>b?c.Color.blendDarken(a,2*b):c.Color.blendLighten(a,2*(b-128))},blendHardMix:function(a,b){return c.Color.blendVividLight(a,b)<128?0:255},blendReflect:function(a,b){return 255===b?b:Math.min(255,a*a/(255-b))},blendGlow:function(a,b){return c.Color.blendReflect(b,a)},blendPhoenix:function(a,b){return Math.min(a,b)-Math.max(a,b)+255}},c.Physics=function(a,b){b=b||{},this.game=a,
this.config=b,this.arcade=null,this.p2=null,this.ninja=null,this.box2d=null,this.chipmunk=null,this.matter=null,this.parseConfig()},c.Physics.ARCADE=0,c.Physics.P2JS=1,c.Physics.NINJA=2,c.Physics.BOX2D=3,c.Physics.CHIPMUNK=4,c.Physics.MATTERJS=5,c.Physics.prototype={parseConfig:function(){this.config.hasOwnProperty("arcade")&&this.config.arcade!==!0||!c.Physics.hasOwnProperty("Arcade")||(this.arcade=new c.Physics.Arcade(this.game)),this.config.hasOwnProperty("ninja")&&this.config.ninja===!0&&c.Physics.hasOwnProperty("Ninja")&&(this.ninja=new c.Physics.Ninja(this.game)),this.config.hasOwnProperty("p2")&&this.config.p2===!0&&c.Physics.hasOwnProperty("P2")&&(this.p2=new c.Physics.P2(this.game,this.config)),this.config.hasOwnProperty("box2d")&&this.config.box2d===!0&&c.Physics.hasOwnProperty("BOX2D")&&(this.box2d=new c.Physics.BOX2D(this.game,this.config)),this.config.hasOwnProperty("matter")&&this.config.matter===!0&&c.Physics.hasOwnProperty("Matter")&&(this.matter=new c.Physics.Matter(this.game,this.config))},startSystem:function(a){a===c.Physics.ARCADE?this.arcade=new c.Physics.Arcade(this.game):a===c.Physics.P2JS?null===this.p2?this.p2=new c.Physics.P2(this.game,this.config):this.p2.reset():a===c.Physics.NINJA?this.ninja=new c.Physics.Ninja(this.game):a===c.Physics.BOX2D?null===this.box2d?this.box2d=new c.Physics.Box2D(this.game,this.config):this.box2d.reset():a===c.Physics.MATTERJS&&(null===this.matter?this.matter=new c.Physics.Matter(this.game,this.config):this.matter.reset())},enable:function(a,b,d){void 0===b&&(b=c.Physics.ARCADE),void 0===d&&(d=!1),b===c.Physics.ARCADE?this.arcade.enable(a):b===c.Physics.P2JS&&this.p2?this.p2.enable(a,d):b===c.Physics.NINJA&&this.ninja?this.ninja.enableAABB(a):b===c.Physics.BOX2D&&this.box2d?this.box2d.enable(a):b===c.Physics.MATTERJS&&this.matter?this.matter.enable(a):console.warn(a.key+" is attempting to enable a physics body using an unknown physics system.")},preUpdate:function(){this.p2&&this.p2.preUpdate(),this.box2d&&this.box2d.preUpdate(),this.matter&&this.matter.preUpdate()},update:function(){this.p2&&this.p2.update(),this.box2d&&this.box2d.update(),this.matter&&this.matter.update()},setBoundsToWorld:function(){this.arcade&&this.arcade.setBoundsToWorld(),this.ninja&&this.ninja.setBoundsToWorld(),this.p2&&this.p2.setBoundsToWorld(),this.box2d&&this.box2d.setBoundsToWorld(),this.matter&&this.matter.setBoundsToWorld()},clear:function(){this.p2&&this.p2.clear(),this.box2d&&this.box2d.clear(),this.matter&&this.matter.clear()},reset:function(){this.p2&&this.p2.reset(),this.box2d&&this.box2d.reset(),this.matter&&this.matter.reset()},destroy:function(){this.p2&&this.p2.destroy(),this.box2d&&this.box2d.destroy(),this.matter&&this.matter.destroy(),this.arcade=null,this.ninja=null,this.p2=null,this.box2d=null,this.matter=null}},c.Physics.prototype.constructor=c.Physics,c.Physics.Arcade=function(a){this.game=a,this.gravity=new c.Point,this.bounds=new c.Rectangle(0,0,a.world.width,a.world.height),this.checkCollision={up:!0,down:!0,left:!0,right:!0},this.maxObjects=10,this.maxLevels=4,this.OVERLAP_BIAS=4,this.forceX=!1,this.sortDirection=c.Physics.Arcade.LEFT_RIGHT,this.skipQuadTree=!0,this.isPaused=!1,this.quadTree=new c.QuadTree(this.game.world.bounds.x,this.game.world.bounds.y,this.game.world.bounds.width,this.game.world.bounds.height,this.maxObjects,this.maxLevels),this._total=0,this.setBoundsToWorld()},c.Physics.Arcade.prototype.constructor=c.Physics.Arcade,c.Physics.Arcade.SORT_NONE=0,c.Physics.Arcade.LEFT_RIGHT=1,c.Physics.Arcade.RIGHT_LEFT=2,c.Physics.Arcade.TOP_BOTTOM=3,c.Physics.Arcade.BOTTOM_TOP=4,c.Physics.Arcade.prototype={setBounds:function(a,b,c,d){this.bounds.setTo(a,b,c,d)},setBoundsToWorld:function(){this.bounds.copyFrom(this.game.world.bounds)},enable:function(a,b){void 0===b&&(b=!0);var d=1;if(Array.isArray(a))for(d=a.length;d--;)a[d]instanceof c.Group?this.enable(a[d].children,b):(this.enableBody(a[d]),b&&a[d].hasOwnProperty("children")&&a[d].children.length>0&&this.enable(a[d],!0));else a instanceof c.Group?this.enable(a.children,b):(this.enableBody(a),b&&a.hasOwnProperty("children")&&a.children.length>0&&this.enable(a.children,!0))},enableBody:function(a){a.hasOwnProperty("body")&&null===a.body&&(a.body=new c.Physics.Arcade.Body(a),a.parent&&a.parent instanceof c.Group&&a.parent.addToHash(a))},updateMotion:function(a){var b=this.computeVelocity(0,a,a.angularVelocity,a.angularAcceleration,a.angularDrag,a.maxAngular)-a.angularVelocity;a.angularVelocity+=b,a.rotation+=a.angularVelocity*this.game.time.physicsElapsed,a.velocity.x=this.computeVelocity(1,a,a.velocity.x,a.acceleration.x,a.drag.x,a.maxVelocity.x),a.velocity.y=this.computeVelocity(2,a,a.velocity.y,a.acceleration.y,a.drag.y,a.maxVelocity.y)},computeVelocity:function(a,b,c,d,e,f){return void 0===f&&(f=1e4),1===a&&b.allowGravity?c+=(this.gravity.x+b.gravity.x)*this.game.time.physicsElapsed:2===a&&b.allowGravity&&(c+=(this.gravity.y+b.gravity.y)*this.game.time.physicsElapsed),d?c+=d*this.game.time.physicsElapsed:e&&(e*=this.game.time.physicsElapsed,c-e>0?c-=e:0>c+e?c+=e:c=0),c>f?c=f:-f>c&&(c=-f),c},overlap:function(a,b,c,d,e){if(c=c||null,d=d||null,e=e||c,this._total=0,!Array.isArray(a)&&Array.isArray(b))for(var f=0;f<b.length;f++)this.collideHandler(a,b[f],c,d,e,!0);else if(Array.isArray(a)&&!Array.isArray(b))for(var f=0;f<a.length;f++)this.collideHandler(a[f],b,c,d,e,!0);else if(Array.isArray(a)&&Array.isArray(b))for(var f=0;f<a.length;f++)for(var g=0;g<b.length;g++)this.collideHandler(a[f],b[g],c,d,e,!0);else this.collideHandler(a,b,c,d,e,!0);return this._total>0},collide:function(a,b,c,d,e){if(c=c||null,d=d||null,e=e||c,this._total=0,!Array.isArray(a)&&Array.isArray(b))for(var f=0;f<b.length;f++)this.collideHandler(a,b[f],c,d,e,!1);else if(Array.isArray(a)&&!Array.isArray(b))for(var f=0;f<a.length;f++)this.collideHandler(a[f],b,c,d,e,!1);else if(Array.isArray(a)&&Array.isArray(b))for(var f=0;f<a.length;f++)for(var g=0;g<b.length;g++)this.collideHandler(a[f],b[g],c,d,e,!1);else this.collideHandler(a,b,c,d,e,!1);return this._total>0},sortLeftRight:function(a,b){return a.body&&b.body?a.body.x-b.body.x:0},sortRightLeft:function(a,b){return a.body&&b.body?b.body.x-a.body.x:0},sortTopBottom:function(a,b){return a.body&&b.body?a.body.y-b.body.y:0},sortBottomTop:function(a,b){return a.body&&b.body?b.body.y-a.body.y:0},sort:function(a,b){null!==a.physicsSortDirection?b=a.physicsSortDirection:void 0===b&&(b=this.sortDirection),b===c.Physics.Arcade.LEFT_RIGHT?a.hash.sort(this.sortLeftRight):b===c.Physics.Arcade.RIGHT_LEFT?a.hash.sort(this.sortRightLeft):b===c.Physics.Arcade.TOP_BOTTOM?a.hash.sort(this.sortTopBottom):b===c.Physics.Arcade.BOTTOM_TOP&&a.hash.sort(this.sortBottomTop)},collideHandler:function(a,b,d,e,f,g){return void 0===b&&a.physicsType===c.GROUP?(this.sort(a),void this.collideGroupVsSelf(a,d,e,f,g)):void(a&&b&&a.exists&&b.exists&&(this.sortDirection!==c.Physics.Arcade.SORT_NONE&&(a.physicsType===c.GROUP&&this.sort(a),b.physicsType===c.GROUP&&this.sort(b)),a.physicsType===c.SPRITE?b.physicsType===c.SPRITE?this.collideSpriteVsSprite(a,b,d,e,f,g):b.physicsType===c.GROUP?this.collideSpriteVsGroup(a,b,d,e,f,g):b.physicsType===c.TILEMAPLAYER&&this.collideSpriteVsTilemapLayer(a,b,d,e,f,g):a.physicsType===c.GROUP?b.physicsType===c.SPRITE?this.collideSpriteVsGroup(b,a,d,e,f,g):b.physicsType===c.GROUP?this.collideGroupVsGroup(a,b,d,e,f,g):b.physicsType===c.TILEMAPLAYER&&this.collideGroupVsTilemapLayer(a,b,d,e,f,g):a.physicsType===c.TILEMAPLAYER&&(b.physicsType===c.SPRITE?this.collideSpriteVsTilemapLayer(b,a,d,e,f,g):b.physicsType===c.GROUP&&this.collideGroupVsTilemapLayer(b,a,d,e,f,g))))},collideSpriteVsSprite:function(a,b,c,d,e,f){return a.body&&b.body?(this.separate(a.body,b.body,d,e,f)&&(c&&c.call(e,a,b),this._total++),!0):!1},collideSpriteVsGroup:function(a,b,d,e,f,g){if(0!==b.length&&a.body){var h;if(this.skipQuadTree||a.body.skipQuadTree){for(var i=0;i<b.hash.length;i++)if(b.hash[i]&&b.hash[i].exists&&b.hash[i].body){if(h=b.hash[i].body,this.sortDirection===c.Physics.Arcade.LEFT_RIGHT){if(a.body.right<h.x)break;if(h.right<a.body.x)continue}else if(this.sortDirection===c.Physics.Arcade.RIGHT_LEFT){if(a.body.x>h.right)break;if(h.x>a.body.right)continue}else if(this.sortDirection===c.Physics.Arcade.TOP_BOTTOM){if(a.body.bottom<h.y)break;if(h.bottom<a.body.y)continue}else if(this.sortDirection===c.Physics.Arcade.BOTTOM_TOP){if(a.body.y>h.bottom)break;if(h.y>a.body.bottom)continue}this.collideSpriteVsSprite(a,b.hash[i],d,e,f,g)}}else{this.quadTree.clear(),this.quadTree.reset(this.game.world.bounds.x,this.game.world.bounds.y,this.game.world.bounds.width,this.game.world.bounds.height,this.maxObjects,this.maxLevels),this.quadTree.populate(b);for(var j=this.quadTree.retrieve(a),i=0;i<j.length;i++)this.separate(a.body,j[i],e,f,g)&&(d&&d.call(f,a,j[i].sprite),this._total++)}}},collideGroupVsSelf:function(a,b,d,e,f){if(0!==a.length)for(var g=0;g<a.hash.length;g++)if(a.hash[g]&&a.hash[g].exists&&a.hash[g].body)for(var h=a.hash[g],i=g+1;i<a.hash.length;i++)if(a.hash[i]&&a.hash[i].exists&&a.hash[i].body){var j=a.hash[i];if(this.sortDirection===c.Physics.Arcade.LEFT_RIGHT){if(h.body.right<j.body.x)break;if(j.body.right<h.body.x)continue}else if(this.sortDirection===c.Physics.Arcade.RIGHT_LEFT){if(h.body.x>j.body.right)continue;if(j.body.x>h.body.right)break}else if(this.sortDirection===c.Physics.Arcade.TOP_BOTTOM){if(h.body.bottom<j.body.y)continue;if(j.body.bottom<h.body.y)break}else if(this.sortDirection===c.Physics.Arcade.BOTTOM_TOP){if(h.body.y>j.body.bottom)continue;if(j.body.y>h.body.bottom)break}this.collideSpriteVsSprite(h,j,b,d,e,f)}},collideGroupVsGroup:function(a,b,d,e,f,g){if(0!==a.length&&0!==b.length)for(var h=0;h<a.children.length;h++)a.children[h].exists&&(a.children[h].physicsType===c.GROUP?this.collideGroupVsGroup(a.children[h],b,d,e,f,g):this.collideSpriteVsGroup(a.children[h],b,d,e,f,g))},separate:function(a,b,c,d,e){if(!a.enable||!b.enable||!this.intersects(a,b))return!1;if(c&&c.call(d,a.sprite,b.sprite)===!1)return!1;var f=!1,g=!1;return this.forceX||Math.abs(this.gravity.y+a.gravity.y)<Math.abs(this.gravity.x+a.gravity.x)?(f=this.separateX(a,b,e),this.intersects(a,b)&&(g=this.separateY(a,b,e))):(g=this.separateY(a,b,e),this.intersects(a,b)&&(f=this.separateX(a,b,e))),f||g},intersects:function(a,b){return a.right<=b.position.x?!1:a.bottom<=b.position.y?!1:a.position.x>=b.right?!1:a.position.y>=b.bottom?!1:!0},getOverlapX:function(a,b){var c=0,d=a.deltaAbsX()+b.deltaAbsX()+this.OVERLAP_BIAS;return 0===a.deltaX()&&0===b.deltaX()?(a.embedded=!0,b.embedded=!0):a.deltaX()>b.deltaX()?(c=a.right-b.x,c>d||a.checkCollision.right===!1||b.checkCollision.left===!1?c=0:(a.touching.none=!1,a.touching.right=!0,b.touching.none=!1,b.touching.left=!0)):a.deltaX()<b.deltaX()&&(c=a.x-b.width-b.x,-c>d||a.checkCollision.left===!1||b.checkCollision.right===!1?c=0:(a.touching.none=!1,a.touching.left=!0,b.touching.none=!1,b.touching.right=!0)),a.overlapX=c,b.overlapX=c,c},getOverlapY:function(a,b){var c=0,d=a.deltaAbsY()+b.deltaAbsY()+this.OVERLAP_BIAS;return 0===a.deltaY()&&0===b.deltaY()?(a.embedded=!0,b.embedded=!0):a.deltaY()>b.deltaY()?(c=a.bottom-b.y,c>d||a.checkCollision.down===!1||b.checkCollision.up===!1?c=0:(a.touching.none=!1,a.touching.down=!0,b.touching.none=!1,b.touching.up=!0)):a.deltaY()<b.deltaY()&&(c=a.y-b.bottom,-c>d||a.checkCollision.up===!1||b.checkCollision.down===!1?c=0:(a.touching.none=!1,a.touching.up=!0,b.touching.none=!1,b.touching.down=!0)),a.overlapY=c,b.overlapY=c,c},separateX:function(a,b,c){var d=this.getOverlapX(a,b);if(c||0===d||a.immovable&&b.immovable||a.customSeparateX||b.customSeparateX)return 0!==d;var e=a.velocity.x,f=b.velocity.x;if(a.immovable||b.immovable)a.immovable?(b.x+=d,b.velocity.x=e-f*b.bounce.x,a.moves&&(b.y+=(a.y-a.prev.y)*a.friction.y)):(a.x-=d,a.velocity.x=f-e*a.bounce.x,b.moves&&(a.y+=(b.y-b.prev.y)*b.friction.y));else{d*=.5,a.x-=d,b.x+=d;var g=Math.sqrt(f*f*b.mass/a.mass)*(f>0?1:-1),h=Math.sqrt(e*e*a.mass/b.mass)*(e>0?1:-1),i=.5*(g+h);g-=i,h-=i,a.velocity.x=i+g*a.bounce.x,b.velocity.x=i+h*b.bounce.x}return!0},separateY:function(a,b,c){var d=this.getOverlapY(a,b);if(c||0===d||a.immovable&&b.immovable||a.customSeparateY||b.customSeparateY)return 0!==d;var e=a.velocity.y,f=b.velocity.y;if(a.immovable||b.immovable)a.immovable?(b.y+=d,b.velocity.y=e-f*b.bounce.y,a.moves&&(b.x+=(a.x-a.prev.x)*a.friction.x)):(a.y-=d,a.velocity.y=f-e*a.bounce.y,b.moves&&(a.x+=(b.x-b.prev.x)*b.friction.x));else{d*=.5,a.y-=d,b.y+=d;var g=Math.sqrt(f*f*b.mass/a.mass)*(f>0?1:-1),h=Math.sqrt(e*e*a.mass/b.mass)*(e>0?1:-1),i=.5*(g+h);g-=i,h-=i,a.velocity.y=i+g*a.bounce.y,b.velocity.y=i+h*b.bounce.y}return!0},getObjectsUnderPointer:function(a,b,c,d){return 0!==b.length&&a.exists?this.getObjectsAtLocation(a.x,a.y,b,c,d,a):void 0},getObjectsAtLocation:function(a,b,d,e,f,g){this.quadTree.clear(),this.quadTree.reset(this.game.world.bounds.x,this.game.world.bounds.y,this.game.world.bounds.width,this.game.world.bounds.height,this.maxObjects,this.maxLevels),this.quadTree.populate(d);for(var h=new c.Rectangle(a,b,1,1),i=[],j=this.quadTree.retrieve(h),k=0;k<j.length;k++)j[k].hitTest(a,b)&&(e&&e.call(f,g,j[k].sprite),i.push(j[k].sprite));return i},moveToObject:function(a,b,c,d){void 0===c&&(c=60),void 0===d&&(d=0);var e=Math.atan2(b.y-a.y,b.x-a.x);return d>0&&(c=this.distanceBetween(a,b)/(d/1e3)),a.body.velocity.x=Math.cos(e)*c,a.body.velocity.y=Math.sin(e)*c,e},moveToPointer:function(a,b,c,d){void 0===b&&(b=60),c=c||this.game.input.activePointer,void 0===d&&(d=0);var e=this.angleToPointer(a,c);return d>0&&(b=this.distanceToPointer(a,c)/(d/1e3)),a.body.velocity.x=Math.cos(e)*b,a.body.velocity.y=Math.sin(e)*b,e},moveToXY:function(a,b,c,d,e){void 0===d&&(d=60),void 0===e&&(e=0);var f=Math.atan2(c-a.y,b-a.x);return e>0&&(d=this.distanceToXY(a,b,c)/(e/1e3)),a.body.velocity.x=Math.cos(f)*d,a.body.velocity.y=Math.sin(f)*d,f},velocityFromAngle:function(a,b,d){return void 0===b&&(b=60),d=d||new c.Point,d.setTo(Math.cos(this.game.math.degToRad(a))*b,Math.sin(this.game.math.degToRad(a))*b)},velocityFromRotation:function(a,b,d){return void 0===b&&(b=60),d=d||new c.Point,d.setTo(Math.cos(a)*b,Math.sin(a)*b)},accelerationFromRotation:function(a,b,d){return void 0===b&&(b=60),d=d||new c.Point,d.setTo(Math.cos(a)*b,Math.sin(a)*b)},accelerateToObject:function(a,b,c,d,e){void 0===c&&(c=60),void 0===d&&(d=1e3),void 0===e&&(e=1e3);var f=this.angleBetween(a,b);return a.body.acceleration.setTo(Math.cos(f)*c,Math.sin(f)*c),a.body.maxVelocity.setTo(d,e),f},accelerateToPointer:function(a,b,c,d,e){void 0===c&&(c=60),void 0===b&&(b=this.game.input.activePointer),void 0===d&&(d=1e3),void 0===e&&(e=1e3);var f=this.angleToPointer(a,b);return a.body.acceleration.setTo(Math.cos(f)*c,Math.sin(f)*c),a.body.maxVelocity.setTo(d,e),f},accelerateToXY:function(a,b,c,d,e,f){void 0===d&&(d=60),void 0===e&&(e=1e3),void 0===f&&(f=1e3);var g=this.angleToXY(a,b,c);return a.body.acceleration.setTo(Math.cos(g)*d,Math.sin(g)*d),a.body.maxVelocity.setTo(e,f),g},distanceBetween:function(a,b){var c=a.x-b.x,d=a.y-b.y;return Math.sqrt(c*c+d*d)},distanceToXY:function(a,b,c){var d=a.x-b,e=a.y-c;return Math.sqrt(d*d+e*e)},distanceToPointer:function(a,b){b=b||this.game.input.activePointer;var c=a.x-b.worldX,d=a.y-b.worldY;return Math.sqrt(c*c+d*d)},angleBetween:function(a,b){var c=b.x-a.x,d=b.y-a.y;return Math.atan2(d,c)},angleToXY:function(a,b,c){var d=b-a.x,e=c-a.y;return Math.atan2(e,d)},angleToPointer:function(a,b){b=b||this.game.input.activePointer;var c=b.worldX-a.x,d=b.worldY-a.y;return Math.atan2(d,c)},worldAngleToPointer:function(a,b){b=b||this.game.input.activePointer;var c=b.worldX-a.world.x,d=b.worldY-a.world.y;return Math.atan2(d,c)}},c.Physics.Arcade.Body=function(a){this.sprite=a,this.game=a.game,this.type=c.Physics.ARCADE,this.enable=!0,this.offset=new c.Point,this.position=new c.Point(a.x,a.y),this.prev=new c.Point(this.position.x,this.position.y),this.allowRotation=!0,this.rotation=a.rotation,this.preRotation=a.rotation,this.width=a.width,this.height=a.height,this.sourceWidth=a.width,this.sourceHeight=a.height,a.texture&&(this.sourceWidth=a.texture.frame.width,this.sourceHeight=a.texture.frame.height),this.halfWidth=Math.abs(a.width/2),this.halfHeight=Math.abs(a.height/2),this.center=new c.Point(a.x+this.halfWidth,a.y+this.halfHeight),this.velocity=new c.Point,this.newVelocity=new c.Point(0,0),this.deltaMax=new c.Point(0,0),this.acceleration=new c.Point,this.drag=new c.Point,this.allowGravity=!0,this.gravity=new c.Point(0,0),this.bounce=new c.Point,this.maxVelocity=new c.Point(1e4,1e4),this.friction=new c.Point(1,0),this.angularVelocity=0,this.angularAcceleration=0,this.angularDrag=0,this.maxAngular=1e3,this.mass=1,this.angle=0,this.speed=0,this.facing=c.NONE,this.immovable=!1,this.moves=!0,this.customSeparateX=!1,this.customSeparateY=!1,this.overlapX=0,this.overlapY=0,this.embedded=!1,this.collideWorldBounds=!1,this.checkCollision={none:!1,any:!0,up:!0,down:!0,left:!0,right:!0},this.touching={none:!0,up:!1,down:!1,left:!1,right:!1},this.wasTouching={none:!0,up:!1,down:!1,left:!1,right:!1},this.blocked={up:!1,down:!1,left:!1,right:!1},this.tilePadding=new c.Point,this.dirty=!1,this.skipQuadTree=!1,this.syncBounds=!1,this._reset=!0,this._sx=a.scale.x,this._sy=a.scale.y,this._dx=0,this._dy=0},c.Physics.Arcade.Body.prototype={updateBounds:function(){if(this.syncBounds){var a=this.sprite.getBounds();a.ceilAll(),(a.width!==this.width||a.height!==this.height)&&(this.width=a.width,this.height=a.height,this._reset=!0)}else{var b=Math.abs(this.sprite.scale.x),c=Math.abs(this.sprite.scale.y);(b!==this._sx||c!==this._sy)&&(this.width=this.sourceWidth*b,this.height=this.sourceHeight*c,this._sx=b,this._sy=c,this._reset=!0)}this._reset&&(this.halfWidth=Math.floor(this.width/2),this.halfHeight=Math.floor(this.height/2),this.center.setTo(this.position.x+this.halfWidth,this.position.y+this.halfHeight))},preUpdate:function(){this.enable&&!this.game.physics.arcade.isPaused&&(this.dirty=!0,this.wasTouching.none=this.touching.none,this.wasTouching.up=this.touching.up,this.wasTouching.down=this.touching.down,this.wasTouching.left=this.touching.left,this.wasTouching.right=this.touching.right,this.touching.none=!0,this.touching.up=!1,this.touching.down=!1,this.touching.left=!1,this.touching.right=!1,this.blocked.up=!1,this.blocked.down=!1,this.blocked.left=!1,this.blocked.right=!1,this.embedded=!1,this.updateBounds(),this.position.x=this.sprite.world.x-this.sprite.anchor.x*this.width+this.offset.x,this.position.y=this.sprite.world.y-this.sprite.anchor.y*this.height+this.offset.y,this.rotation=this.sprite.angle,this.preRotation=this.rotation,(this._reset||this.sprite.fresh)&&(this.prev.x=this.position.x,this.prev.y=this.position.y),this.moves&&(this.game.physics.arcade.updateMotion(this),this.newVelocity.set(this.velocity.x*this.game.time.physicsElapsed,this.velocity.y*this.game.time.physicsElapsed),this.position.x+=this.newVelocity.x,this.position.y+=this.newVelocity.y,(this.position.x!==this.prev.x||this.position.y!==this.prev.y)&&(this.angle=Math.atan2(this.velocity.y,this.velocity.x)),this.speed=Math.sqrt(this.velocity.x*this.velocity.x+this.velocity.y*this.velocity.y),this.collideWorldBounds&&this.checkWorldBounds()),this._dx=this.deltaX(),this._dy=this.deltaY(),this._reset=!1)},postUpdate:function(){this.enable&&this.dirty&&(this.dirty=!1,this.deltaX()<0?this.facing=c.LEFT:this.deltaX()>0&&(this.facing=c.RIGHT),this.deltaY()<0?this.facing=c.UP:this.deltaY()>0&&(this.facing=c.DOWN),this.moves&&(this._dx=this.deltaX(),this._dy=this.deltaY(),0!==this.deltaMax.x&&0!==this._dx&&(this._dx<0&&this._dx<-this.deltaMax.x?this._dx=-this.deltaMax.x:this._dx>0&&this._dx>this.deltaMax.x&&(this._dx=this.deltaMax.x)),0!==this.deltaMax.y&&0!==this._dy&&(this._dy<0&&this._dy<-this.deltaMax.y?this._dy=-this.deltaMax.y:this._dy>0&&this._dy>this.deltaMax.y&&(this._dy=this.deltaMax.y)),this.sprite.position.x+=this._dx,this.sprite.position.y+=this._dy,this._reset=!0),this.center.setTo(this.position.x+this.halfWidth,this.position.y+this.halfHeight),this.allowRotation&&(this.sprite.angle+=this.deltaZ()),this.prev.x=this.position.x,this.prev.y=this.position.y)},checkWorldBounds:function(){var a=this.position,b=this.game.physics.arcade.bounds,c=this.game.physics.arcade.checkCollision;a.x<b.x&&c.left?(a.x=b.x,this.velocity.x*=-this.bounce.x,this.blocked.left=!0):this.right>b.right&&c.right&&(a.x=b.right-this.width,this.velocity.x*=-this.bounce.x,this.blocked.right=!0),a.y<b.y&&c.up?(a.y=b.y,this.velocity.y*=-this.bounce.y,this.blocked.up=!0):this.bottom>b.bottom&&c.down&&(a.y=b.bottom-this.height,this.velocity.y*=-this.bounce.y,this.blocked.down=!0)},setSize:function(a,b,c,d){this.isCircle||(void 0===c&&(c=this.offset.x),void 0===d&&(d=this.offset.y),this.sourceWidth=a,this.sourceHeight=b,this.width=this.sourceWidth*this._sx,this.height=this.sourceHeight*this._sy,this.halfWidth=Math.floor(this.width/2),this.halfHeight=Math.floor(this.height/2),this.offset.setTo(c,d),this.center.setTo(this.position.x+this.halfWidth,this.position.y+this.halfHeight))},setCircle:function(a,b,c){void 0===b&&(b=this.offset.x),void 0===c&&(c=this.offset.y),a>0?(this.isCircle=!0,this.radius=a,this.sourceWidth=2*a,this.sourceHeight=2*a,this.width=this.sourceWidth*this._sx,this.height=this.sourceHeight*this._sy,this.halfWidth=Math.floor(this.width/2),this.halfHeight=Math.floor(this.height/2),this.offset.setTo(b,c),this.center.setTo(this.position.x+this.halfWidth,this.position.y+this.halfHeight)):this.isCircle=!1},reset:function(a,b){this.velocity.set(0),this.acceleration.set(0),this.speed=0,this.angularVelocity=0,this.angularAcceleration=0,this.position.x=a-this.sprite.anchor.x*this.width+this.offset.x,this.position.y=b-this.sprite.anchor.y*this.height+this.offset.y,this.prev.x=this.position.x,this.prev.y=this.position.y,this.rotation=this.sprite.angle,this.preRotation=this.rotation,this._sx=this.sprite.scale.x,this._sy=this.sprite.scale.y,this.center.setTo(this.position.x+this.halfWidth,this.position.y+this.halfHeight)},hitTest:function(a,b){return this.isCircle?c.Circle.contains(this,a,b):c.Rectangle.contains(this,a,b)},onFloor:function(){return this.blocked.down},onCeiling:function(){return this.blocked.up},onWall:function(){return this.blocked.left||this.blocked.right},deltaAbsX:function(){return this.deltaX()>0?this.deltaX():-this.deltaX()},deltaAbsY:function(){return this.deltaY()>0?this.deltaY():-this.deltaY()},deltaX:function(){return this.position.x-this.prev.x},deltaY:function(){return this.position.y-this.prev.y},deltaZ:function(){return this.rotation-this.preRotation},destroy:function(){this.sprite.parent&&this.sprite.parent instanceof c.Group&&this.sprite.parent.removeFromHash(this.sprite),this.sprite.body=null,this.sprite=null}},Object.defineProperty(c.Physics.Arcade.Body.prototype,"left",{get:function(){return this.position.x}}),Object.defineProperty(c.Physics.Arcade.Body.prototype,"right",{get:function(){return this.position.x+this.width}}),Object.defineProperty(c.Physics.Arcade.Body.prototype,"top",{get:function(){return this.position.y}}),Object.defineProperty(c.Physics.Arcade.Body.prototype,"bottom",{get:function(){return this.position.y+this.height}}),Object.defineProperty(c.Physics.Arcade.Body.prototype,"x",{get:function(){return this.position.x},set:function(a){this.position.x=a}}),Object.defineProperty(c.Physics.Arcade.Body.prototype,"y",{get:function(){return this.position.y},set:function(a){this.position.y=a}}),c.Physics.Arcade.Body.render=function(a,b,c,d){void 0===d&&(d=!0),c=c||"rgba(0,255,0,0.4)",d?(a.fillStyle=c,a.fillRect(b.position.x-b.game.camera.x,b.position.y-b.game.camera.y,b.width,b.height)):(a.strokeStyle=c,a.strokeRect(b.position.x-b.game.camera.x,b.position.y-b.game.camera.y,b.width,b.height))},c.Physics.Arcade.Body.renderBodyInfo=function(a,b){a.line("x: "+b.x.toFixed(2),"y: "+b.y.toFixed(2),"width: "+b.width,"height: "+b.height),a.line("velocity x: "+b.velocity.x.toFixed(2),"y: "+b.velocity.y.toFixed(2),"deltaX: "+b._dx.toFixed(2),"deltaY: "+b._dy.toFixed(2)),a.line("acceleration x: "+b.acceleration.x.toFixed(2),"y: "+b.acceleration.y.toFixed(2),"speed: "+b.speed.toFixed(2),"angle: "+b.angle.toFixed(2)),a.line("gravity x: "+b.gravity.x,"y: "+b.gravity.y,"bounce x: "+b.bounce.x.toFixed(2),"y: "+b.bounce.y.toFixed(2)),a.line("touching left: "+b.touching.left,"right: "+b.touching.right,"up: "+b.touching.up,"down: "+b.touching.down),a.line("blocked left: "+b.blocked.left,"right: "+b.blocked.right,"up: "+b.blocked.up,"down: "+b.blocked.down)},c.Physics.Arcade.Body.prototype.constructor=c.Physics.Arcade.Body,c.Physics.Arcade.TilemapCollision=function(){},c.Physics.Arcade.TilemapCollision.prototype={TILE_BIAS:16,collideSpriteVsTilemapLayer:function(a,b,c,d,e,f){if(a.body){var g=b.getTiles(a.body.position.x-a.body.tilePadding.x,a.body.position.y-a.body.tilePadding.y,a.body.width+a.body.tilePadding.x,a.body.height+a.body.tilePadding.y,!1,!1);if(0!==g.length)for(var h=0;h<g.length;h++)d?d.call(e,a,g[h])&&this.separateTile(h,a.body,g[h],f)&&(this._total++,c&&c.call(e,a,g[h])):this.separateTile(h,a.body,g[h],f)&&(this._total++,c&&c.call(e,a,g[h]))}},collideGroupVsTilemapLayer:function(a,b,c,d,e,f){if(0!==a.length)for(var g=0;g<a.children.length;g++)a.children[g].exists&&this.collideSpriteVsTilemapLayer(a.children[g],b,c,d,e,f)},separateTile:function(a,b,c,d){if(!b.enable)return!1;if(!c.intersects(b.position.x,b.position.y,b.right,b.bottom))return!1;if(d)return!0;if(c.collisionCallback&&!c.collisionCallback.call(c.collisionCallbackContext,b.sprite,c))return!1;if(c.layer.callbacks[c.index]&&!c.layer.callbacks[c.index].callback.call(c.layer.callbacks[c.index].callbackContext,b.sprite,c))return!1;if(!(c.faceLeft||c.faceRight||c.faceTop||c.faceBottom))return!1;var e=0,f=0,g=0,h=1;if(b.deltaAbsX()>b.deltaAbsY()?g=-1:b.deltaAbsX()<b.deltaAbsY()&&(h=-1),0!==b.deltaX()&&0!==b.deltaY()&&(c.faceLeft||c.faceRight)&&(c.faceTop||c.faceBottom)&&(g=Math.min(Math.abs(b.position.x-c.right),Math.abs(b.right-c.left)),h=Math.min(Math.abs(b.position.y-c.bottom),Math.abs(b.bottom-c.top))),h>g){if((c.faceLeft||c.faceRight)&&(e=this.tileCheckX(b,c),0!==e&&!c.intersects(b.position.x,b.position.y,b.right,b.bottom)))return!0;(c.faceTop||c.faceBottom)&&(f=this.tileCheckY(b,c))}else{if((c.faceTop||c.faceBottom)&&(f=this.tileCheckY(b,c),0!==f&&!c.intersects(b.position.x,b.position.y,b.right,b.bottom)))return!0;(c.faceLeft||c.faceRight)&&(e=this.tileCheckX(b,c))}return 0!==e||0!==f},tileCheckX:function(a,b){var c=0;return a.deltaX()<0&&!a.blocked.left&&b.collideRight&&a.checkCollision.left?b.faceRight&&a.x<b.right&&(c=a.x-b.right,c<-this.TILE_BIAS&&(c=0)):a.deltaX()>0&&!a.blocked.right&&b.collideLeft&&a.checkCollision.right&&b.faceLeft&&a.right>b.left&&(c=a.right-b.left,c>this.TILE_BIAS&&(c=0)),0!==c&&(a.customSeparateX?a.overlapX=c:this.processTileSeparationX(a,c)),c},tileCheckY:function(a,b){var c=0;return a.deltaY()<0&&!a.blocked.up&&b.collideDown&&a.checkCollision.up?b.faceBottom&&a.y<b.bottom&&(c=a.y-b.bottom,c<-this.TILE_BIAS&&(c=0)):a.deltaY()>0&&!a.blocked.down&&b.collideUp&&a.checkCollision.down&&b.faceTop&&a.bottom>b.top&&(c=a.bottom-b.top,c>this.TILE_BIAS&&(c=0)),0!==c&&(a.customSeparateY?a.overlapY=c:this.processTileSeparationY(a,c)),c},processTileSeparationX:function(a,b){0>b?a.blocked.left=!0:b>0&&(a.blocked.right=!0),a.position.x-=b,0===a.bounce.x?a.velocity.x=0:a.velocity.x=-a.velocity.x*a.bounce.x},processTileSeparationY:function(a,b){0>b?a.blocked.up=!0:b>0&&(a.blocked.down=!0),a.position.y-=b,0===a.bounce.y?a.velocity.y=0:a.velocity.y=-a.velocity.y*a.bounce.y}},c.Utils.mixinPrototype(c.Physics.Arcade.prototype,c.Physics.Arcade.TilemapCollision.prototype),c.ImageCollection=function(a,b,c,d,e,f,g){(void 0===c||0>=c)&&(c=32),(void 0===d||0>=d)&&(d=32),void 0===e&&(e=0),void 0===f&&(f=0),this.name=a,this.firstgid=0|b,this.imageWidth=0|c,this.imageHeight=0|d,this.imageMargin=0|e,this.imageSpacing=0|f,this.properties=g||{},this.images=[],this.total=0},c.ImageCollection.prototype={containsImageIndex:function(a){return a>=this.firstgid&&a<this.firstgid+this.total},addImage:function(a,b){this.images.push({gid:a,image:b}),this.total++}},c.ImageCollection.prototype.constructor=c.ImageCollection,c.Tile=function(a,b,c,d,e,f){this.layer=a,this.index=b,this.x=c,this.y=d,this.rotation=0,this.flipped=!1,this.worldX=c*e,this.worldY=d*f,this.width=e,this.height=f,this.centerX=Math.abs(e/2),this.centerY=Math.abs(f/2),this.alpha=1,this.properties={},this.scanned=!1,this.faceTop=!1,this.faceBottom=!1,this.faceLeft=!1,this.faceRight=!1,this.collideLeft=!1,this.collideRight=!1,this.collideUp=!1,this.collideDown=!1,this.collisionCallback=null,this.collisionCallbackContext=this},c.Tile.prototype={containsPoint:function(a,b){return!(a<this.worldX||b<this.worldY||a>this.right||b>this.bottom)},intersects:function(a,b,c,d){return c<=this.worldX?!1:d<=this.worldY?!1:a>=this.worldX+this.width?!1:b>=this.worldY+this.height?!1:!0},setCollisionCallback:function(a,b){this.collisionCallback=a,this.collisionCallbackContext=b},destroy:function(){this.collisionCallback=null,this.collisionCallbackContext=null,this.properties=null},setCollision:function(a,b,c,d){this.collideLeft=a,this.collideRight=b,this.collideUp=c,this.collideDown=d,this.faceLeft=a,this.faceRight=b,this.faceTop=c,this.faceBottom=d},resetCollision:function(){this.collideLeft=!1,this.collideRight=!1,this.collideUp=!1,this.collideDown=!1,this.faceTop=!1,this.faceBottom=!1,this.faceLeft=!1,this.faceRight=!1},isInteresting:function(a,b){return a&&b?this.collideLeft||this.collideRight||this.collideUp||this.collideDown||this.faceTop||this.faceBottom||this.faceLeft||this.faceRight||this.collisionCallback:a?this.collideLeft||this.collideRight||this.collideUp||this.collideDown:b?this.faceTop||this.faceBottom||this.faceLeft||this.faceRight:!1},copy:function(a){this.index=a.index,this.alpha=a.alpha,this.properties=a.properties,this.collideUp=a.collideUp,this.collideDown=a.collideDown,this.collideLeft=a.collideLeft,this.collideRight=a.collideRight,this.collisionCallback=a.collisionCallback,this.collisionCallbackContext=a.collisionCallbackContext}},c.Tile.prototype.constructor=c.Tile,Object.defineProperty(c.Tile.prototype,"collides",{get:function(){return this.collideLeft||this.collideRight||this.collideUp||this.collideDown}}),Object.defineProperty(c.Tile.prototype,"canCollide",{get:function(){return this.collideLeft||this.collideRight||this.collideUp||this.collideDown||this.collisionCallback}}),Object.defineProperty(c.Tile.prototype,"left",{get:function(){return this.worldX}}),Object.defineProperty(c.Tile.prototype,"right",{get:function(){return this.worldX+this.width}}),Object.defineProperty(c.Tile.prototype,"top",{get:function(){return this.worldY}}),Object.defineProperty(c.Tile.prototype,"bottom",{get:function(){return this.worldY+this.height}}),c.Tilemap=function(a,b,d,e,f,g){this.game=a,this.key=b;var h=c.TilemapParser.parse(this.game,b,d,e,f,g);null!==h&&(this.width=h.width,this.height=h.height,this.tileWidth=h.tileWidth,this.tileHeight=h.tileHeight,this.orientation=h.orientation,this.format=h.format,this.version=h.version,this.properties=h.properties,this.widthInPixels=h.widthInPixels,this.heightInPixels=h.heightInPixels,this.layers=h.layers,this.tilesets=h.tilesets,this.imagecollections=h.imagecollections,this.tiles=h.tiles,this.objects=h.objects,this.collideIndexes=[],this.collision=h.collision,this.images=h.images,this.currentLayer=0,this.debugMap=[],this._results=[],this._tempA=0,this._tempB=0)},c.Tilemap.CSV=0,c.Tilemap.TILED_JSON=1,c.Tilemap.NORTH=0,c.Tilemap.EAST=1,c.Tilemap.SOUTH=2,c.Tilemap.WEST=3,c.Tilemap.prototype={create:function(a,b,c,d,e,f){return void 0===f&&(f=this.game.world),this.width=b,this.height=c,this.setTileSize(d,e),this.layers.length=0,this.createBlankLayer(a,b,c,d,e,f)},setTileSize:function(a,b){this.tileWidth=a,this.tileHeight=b,this.widthInPixels=this.width*a,this.heightInPixels=this.height*b},addTilesetImage:function(a,b,d,e,f,g,h){
if(void 0===a)return null;void 0===d&&(d=this.tileWidth),void 0===e&&(e=this.tileHeight),void 0===f&&(f=0),void 0===g&&(g=0),void 0===h&&(h=0),0===d&&(d=32),0===e&&(e=32);var i=null;if((void 0===b||null===b)&&(b=a),b instanceof c.BitmapData)i=b.canvas;else{if(!this.game.cache.checkImageKey(b))return console.warn('Phaser.Tilemap.addTilesetImage: Invalid image key given: "'+b+'"'),null;i=this.game.cache.getImage(b)}var j=this.getTilesetIndex(a);if(null===j&&this.format===c.Tilemap.TILED_JSON)return console.warn('Phaser.Tilemap.addTilesetImage: No data found in the JSON matching the tileset name: "'+a+'"'),null;if(this.tilesets[j])return this.tilesets[j].setImage(i),this.tilesets[j];var k=new c.Tileset(a,h,d,e,f,g,{});k.setImage(i),this.tilesets.push(k);for(var l=this.tilesets.length-1,m=f,n=f,o=0,p=0,q=0,r=h;r<h+k.total&&(this.tiles[r]=[m,n,l],m+=d+g,o++,o!==k.total)&&(p++,p!==k.columns||(m=f,n+=e+g,p=0,q++,q!==k.rows));r++);return k},createFromObjects:function(a,b,d,e,f,g,h,i,j){if(void 0===f&&(f=!0),void 0===g&&(g=!1),void 0===h&&(h=this.game.world),void 0===i&&(i=c.Sprite),void 0===j&&(j=!0),!this.objects[a])return void console.warn("Tilemap.createFromObjects: Invalid objectgroup name given: "+a);for(var k=0;k<this.objects[a].length;k++){var l=!1,m=this.objects[a][k];if(void 0!==m.gid&&"number"==typeof b&&m.gid===b?l=!0:void 0!==m.id&&"number"==typeof b&&m.id===b?l=!0:void 0!==m.name&&"string"==typeof b&&m.name===b&&(l=!0),l){var n=new i(this.game,parseFloat(m.x,10),parseFloat(m.y,10),d,e);n.name=m.name,n.visible=m.visible,n.autoCull=g,n.exists=f,m.width&&(n.width=m.width),m.height&&(n.height=m.height),m.rotation&&(n.angle=m.rotation),j&&(n.y-=n.height),h.add(n);for(var o in m.properties)h.set(n,o,m.properties[o],!1,!1,0,!0)}}},createFromTiles:function(a,b,d,e,f,g){"number"==typeof a&&(a=[a]),void 0===b||null===b?b=[]:"number"==typeof b&&(b=[b]),e=this.getLayer(e),void 0===f&&(f=this.game.world),void 0===g&&(g={}),void 0===g.customClass&&(g.customClass=c.Sprite),void 0===g.adjustY&&(g.adjustY=!0);var h=this.layers[e].width,i=this.layers[e].height;if(this.copy(0,0,h,i,e),this._results.length<2)return 0;for(var j,k=0,l=1,m=this._results.length;m>l;l++)if(-1!==a.indexOf(this._results[l].index)){j=new g.customClass(this.game,this._results[l].worldX,this._results[l].worldY,d);for(var n in g)j[n]=g[n];f.add(j),k++}if(1===b.length)for(l=0;l<a.length;l++)this.replace(a[l],b[0],0,0,h,i,e);else if(b.length>1)for(l=0;l<a.length;l++)this.replace(a[l],b[l],0,0,h,i,e);return k},createLayer:function(a,b,d,e){void 0===b&&(b=this.game.width),void 0===d&&(d=this.game.height),void 0===e&&(e=this.game.world);var f=a;return"string"==typeof a&&(f=this.getLayerIndex(a)),null===f||f>this.layers.length?void console.warn("Tilemap.createLayer: Invalid layer ID given: "+f):e.add(new c.TilemapLayer(this.game,this,f,b,d))},createBlankLayer:function(a,b,d,e,f,g){if(void 0===g&&(g=this.game.world),null!==this.getLayerIndex(a))return void console.warn("Tilemap.createBlankLayer: Layer with matching name already exists");for(var h,i={name:a,x:0,y:0,width:b,height:d,widthInPixels:b*e,heightInPixels:d*f,alpha:1,visible:!0,properties:{},indexes:[],callbacks:[],bodies:[],data:null},j=[],k=0;d>k;k++){h=[];for(var l=0;b>l;l++)h.push(new c.Tile(i,-1,l,k,e,f));j.push(h)}i.data=j,this.layers.push(i),this.currentLayer=this.layers.length-1;var m=i.widthInPixels,n=i.heightInPixels;m>this.game.width&&(m=this.game.width),n>this.game.height&&(n=this.game.height);var j=new c.TilemapLayer(this.game,this,this.layers.length-1,m,n);return j.name=a,g.add(j)},getIndex:function(a,b){for(var c=0;c<a.length;c++)if(a[c].name===b)return c;return null},getLayerIndex:function(a){return this.getIndex(this.layers,a)},getTilesetIndex:function(a){return this.getIndex(this.tilesets,a)},getImageIndex:function(a){return this.getIndex(this.images,a)},setTileIndexCallback:function(a,b,c,d){if(d=this.getLayer(d),"number"==typeof a)this.layers[d].callbacks[a]={callback:b,callbackContext:c};else for(var e=0,f=a.length;f>e;e++)this.layers[d].callbacks[a[e]]={callback:b,callbackContext:c}},setTileLocationCallback:function(a,b,c,d,e,f,g){if(g=this.getLayer(g),this.copy(a,b,c,d,g),!(this._results.length<2))for(var h=1;h<this._results.length;h++)this._results[h].setCollisionCallback(e,f)},setCollision:function(a,b,c,d){if(void 0===b&&(b=!0),void 0===d&&(d=!0),c=this.getLayer(c),"number"==typeof a)return this.setCollisionByIndex(a,b,c,!0);if(Array.isArray(a)){for(var e=0;e<a.length;e++)this.setCollisionByIndex(a[e],b,c,!1);d&&this.calculateFaces(c)}},setCollisionBetween:function(a,b,c,d,e){if(void 0===c&&(c=!0),void 0===e&&(e=!0),d=this.getLayer(d),!(a>b)){for(var f=a;b>=f;f++)this.setCollisionByIndex(f,c,d,!1);e&&this.calculateFaces(d)}},setCollisionByExclusion:function(a,b,c,d){void 0===b&&(b=!0),void 0===d&&(d=!0),c=this.getLayer(c);for(var e=0,f=this.tiles.length;f>e;e++)-1===a.indexOf(e)&&this.setCollisionByIndex(e,b,c,!1);d&&this.calculateFaces(c)},setCollisionByIndex:function(a,b,c,d){if(void 0===b&&(b=!0),void 0===c&&(c=this.currentLayer),void 0===d&&(d=!0),b)this.collideIndexes.push(a);else{var e=this.collideIndexes.indexOf(a);e>-1&&this.collideIndexes.splice(e,1)}for(var f=0;f<this.layers[c].height;f++)for(var g=0;g<this.layers[c].width;g++){var h=this.layers[c].data[f][g];h&&h.index===a&&(b?h.setCollision(!0,!0,!0,!0):h.resetCollision(),h.faceTop=b,h.faceBottom=b,h.faceLeft=b,h.faceRight=b)}return d&&this.calculateFaces(c),c},getLayer:function(a){return void 0===a?a=this.currentLayer:"string"==typeof a?a=this.getLayerIndex(a):a instanceof c.TilemapLayer&&(a=a.index),a},setPreventRecalculate:function(a){if(a===!0&&this.preventingRecalculate!==!0&&(this.preventingRecalculate=!0,this.needToRecalculate={}),a===!1&&this.preventingRecalculate===!0){this.preventingRecalculate=!1;for(var b in this.needToRecalculate)this.calculateFaces(b);this.needToRecalculate=!1}},calculateFaces:function(a){if(this.preventingRecalculate)return void(this.needToRecalculate[a]=!0);for(var b=null,c=null,d=null,e=null,f=0,g=this.layers[a].height;g>f;f++)for(var h=0,i=this.layers[a].width;i>h;h++){var j=this.layers[a].data[f][h];j&&(b=this.getTileAbove(a,h,f),c=this.getTileBelow(a,h,f),d=this.getTileLeft(a,h,f),e=this.getTileRight(a,h,f),j.collides&&(j.faceTop=!0,j.faceBottom=!0,j.faceLeft=!0,j.faceRight=!0),b&&b.collides&&(j.faceTop=!1),c&&c.collides&&(j.faceBottom=!1),d&&d.collides&&(j.faceLeft=!1),e&&e.collides&&(j.faceRight=!1))}},getTileAbove:function(a,b,c){return c>0?this.layers[a].data[c-1][b]:null},getTileBelow:function(a,b,c){return c<this.layers[a].height-1?this.layers[a].data[c+1][b]:null},getTileLeft:function(a,b,c){return b>0?this.layers[a].data[c][b-1]:null},getTileRight:function(a,b,c){return b<this.layers[a].width-1?this.layers[a].data[c][b+1]:null},setLayer:function(a){a=this.getLayer(a),this.layers[a]&&(this.currentLayer=a)},hasTile:function(a,b,c){return c=this.getLayer(c),void 0===this.layers[c].data[b]||void 0===this.layers[c].data[b][a]?!1:this.layers[c].data[b][a].index>-1},removeTile:function(a,b,d){if(d=this.getLayer(d),a>=0&&a<this.layers[d].width&&b>=0&&b<this.layers[d].height&&this.hasTile(a,b,d)){var e=this.layers[d].data[b][a];return this.layers[d].data[b][a]=new c.Tile(this.layers[d],-1,a,b,this.tileWidth,this.tileHeight),this.layers[d].dirty=!0,this.calculateFaces(d),e}},removeTileWorldXY:function(a,b,c,d,e){return e=this.getLayer(e),a=this.game.math.snapToFloor(a,c)/c,b=this.game.math.snapToFloor(b,d)/d,this.removeTile(a,b,e)},putTile:function(a,b,d,e){if(null===a)return this.removeTile(b,d,e);if(e=this.getLayer(e),b>=0&&b<this.layers[e].width&&d>=0&&d<this.layers[e].height){var f;return a instanceof c.Tile?(f=a.index,this.hasTile(b,d,e)?this.layers[e].data[d][b].copy(a):this.layers[e].data[d][b]=new c.Tile(e,f,b,d,a.width,a.height)):(f=a,this.hasTile(b,d,e)?this.layers[e].data[d][b].index=f:this.layers[e].data[d][b]=new c.Tile(this.layers[e],f,b,d,this.tileWidth,this.tileHeight)),this.collideIndexes.indexOf(f)>-1?this.layers[e].data[d][b].setCollision(!0,!0,!0,!0):this.layers[e].data[d][b].resetCollision(),this.layers[e].dirty=!0,this.calculateFaces(e),this.layers[e].data[d][b]}return null},putTileWorldXY:function(a,b,c,d,e,f){return f=this.getLayer(f),b=this.game.math.snapToFloor(b,d)/d,c=this.game.math.snapToFloor(c,e)/e,this.putTile(a,b,c,f)},searchTileIndex:function(a,b,c,d){void 0===b&&(b=0),void 0===c&&(c=!1),d=this.getLayer(d);var e=0;if(c){for(var f=this.layers[d].height-1;f>=0;f--)for(var g=this.layers[d].width-1;g>=0;g--)if(this.layers[d].data[f][g].index===a){if(e===b)return this.layers[d].data[f][g];e++}}else for(var f=0;f<this.layers[d].height;f++)for(var g=0;g<this.layers[d].width;g++)if(this.layers[d].data[f][g].index===a){if(e===b)return this.layers[d].data[f][g];e++}return null},getTile:function(a,b,c,d){return void 0===d&&(d=!1),c=this.getLayer(c),a>=0&&a<this.layers[c].width&&b>=0&&b<this.layers[c].height?-1===this.layers[c].data[b][a].index?d?this.layers[c].data[b][a]:null:this.layers[c].data[b][a]:null},getTileWorldXY:function(a,b,c,d,e,f){return void 0===c&&(c=this.tileWidth),void 0===d&&(d=this.tileHeight),e=this.getLayer(e),a=this.game.math.snapToFloor(a,c)/c,b=this.game.math.snapToFloor(b,d)/d,this.getTile(a,b,e,f)},copy:function(a,b,c,d,e){if(e=this.getLayer(e),!this.layers[e])return void(this._results.length=0);void 0===a&&(a=0),void 0===b&&(b=0),void 0===c&&(c=this.layers[e].width),void 0===d&&(d=this.layers[e].height),0>a&&(a=0),0>b&&(b=0),c>this.layers[e].width&&(c=this.layers[e].width),d>this.layers[e].height&&(d=this.layers[e].height),this._results.length=0,this._results.push({x:a,y:b,width:c,height:d,layer:e});for(var f=b;b+d>f;f++)for(var g=a;a+c>g;g++)this._results.push(this.layers[e].data[f][g]);return this._results},paste:function(a,b,c,d){if(void 0===a&&(a=0),void 0===b&&(b=0),d=this.getLayer(d),c&&!(c.length<2)){for(var e=a-c[1].x,f=b-c[1].y,g=1;g<c.length;g++)this.layers[d].data[f+c[g].y][e+c[g].x].copy(c[g]);this.layers[d].dirty=!0,this.calculateFaces(d)}},swap:function(a,b,c,d,e,f,g){g=this.getLayer(g),this.copy(c,d,e,f,g),this._results.length<2||(this._tempA=a,this._tempB=b,this._results.forEach(this.swapHandler,this),this.paste(c,d,this._results,g))},swapHandler:function(a){a.index===this._tempA?a.index=this._tempB:a.index===this._tempB&&(a.index=this._tempA)},forEach:function(a,b,c,d,e,f,g){g=this.getLayer(g),this.copy(c,d,e,f,g),this._results.length<2||(this._results.forEach(a,b),this.paste(c,d,this._results,g))},replace:function(a,b,c,d,e,f,g){if(g=this.getLayer(g),this.copy(c,d,e,f,g),!(this._results.length<2)){for(var h=1;h<this._results.length;h++)this._results[h].index===a&&(this._results[h].index=b);this.paste(c,d,this._results,g)}},random:function(a,b,c,d,e){if(e=this.getLayer(e),this.copy(a,b,c,d,e),!(this._results.length<2)){for(var f=[],g=1;g<this._results.length;g++)if(this._results[g].index){var h=this._results[g].index;-1===f.indexOf(h)&&f.push(h)}for(var i=1;i<this._results.length;i++)this._results[i].index=this.game.rnd.pick(f);this.paste(a,b,this._results,e)}},shuffle:function(a,b,d,e,f){if(f=this.getLayer(f),this.copy(a,b,d,e,f),!(this._results.length<2)){for(var g=[],h=1;h<this._results.length;h++)this._results[h].index&&g.push(this._results[h].index);c.ArrayUtils.shuffle(g);for(var i=1;i<this._results.length;i++)this._results[i].index=g[i-1];this.paste(a,b,this._results,f)}},fill:function(a,b,c,d,e,f){if(f=this.getLayer(f),this.copy(b,c,d,e,f),!(this._results.length<2)){for(var g=1;g<this._results.length;g++)this._results[g].index=a;this.paste(b,c,this._results,f)}},removeAllLayers:function(){this.layers.length=0,this.currentLayer=0},dump:function(){for(var a="",b=[""],c=0;c<this.layers[this.currentLayer].height;c++){for(var d=0;d<this.layers[this.currentLayer].width;d++)a+="%c  ",this.layers[this.currentLayer].data[c][d]>1?this.debugMap[this.layers[this.currentLayer].data[c][d]]?b.push("background: "+this.debugMap[this.layers[this.currentLayer].data[c][d]]):b.push("background: #ffffff"):b.push("background: rgb(0, 0, 0)");a+="\n"}b[0]=a,console.log.apply(console,b)},destroy:function(){this.removeAllLayers(),this.data=[],this.game=null}},c.Tilemap.prototype.constructor=c.Tilemap,Object.defineProperty(c.Tilemap.prototype,"layer",{get:function(){return this.layers[this.currentLayer]},set:function(a){a!==this.currentLayer&&this.setLayer(a)}}),c.TilemapLayer=function(a,b,d,e,f){e|=0,f|=0,c.Sprite.call(this,a,0,0),this.map=b,this.index=d,this.layer=b.layers[d],this.canvas=PIXI.CanvasPool.create(this,e,f),this.context=this.canvas.getContext("2d"),this.setTexture(new PIXI.Texture(new PIXI.BaseTexture(this.canvas))),this.type=c.TILEMAPLAYER,this.physicsType=c.TILEMAPLAYER,this.renderSettings={enableScrollDelta:!1,overdrawRatio:.2,copyCanvas:null},this.debug=!1,this.exists=!0,this.debugSettings={missingImageFill:"rgb(255,255,255)",debuggedTileOverfill:"rgba(0,255,0,0.4)",forceFullRedraw:!0,debugAlpha:.5,facingEdgeStroke:"rgba(0,255,0,1)",collidingTileOverfill:"rgba(0,255,0,0.2)"},this.scrollFactorX=1,this.scrollFactorY=1,this.dirty=!0,this.rayStepRate=4,this._wrap=!1,this._mc={scrollX:0,scrollY:0,renderWidth:0,renderHeight:0,tileWidth:b.tileWidth,tileHeight:b.tileHeight,cw:b.tileWidth,ch:b.tileHeight,tilesets:[]},this._scrollX=0,this._scrollY=0,this._results=[],a.device.canvasBitBltShift||(this.renderSettings.copyCanvas=c.TilemapLayer.ensureSharedCopyCanvas()),this.fixedToCamera=!0},c.TilemapLayer.prototype=Object.create(c.Sprite.prototype),c.TilemapLayer.prototype.constructor=c.TilemapLayer,c.TilemapLayer.prototype.preUpdateCore=c.Component.Core.preUpdate,c.TilemapLayer.sharedCopyCanvas=null,c.TilemapLayer.ensureSharedCopyCanvas=function(){return this.sharedCopyCanvas||(this.sharedCopyCanvas=c.Canvas.create(2,2)),this.sharedCopyCanvas},c.TilemapLayer.prototype.preUpdate=function(){return this.preUpdateCore()},c.TilemapLayer.prototype.postUpdate=function(){c.Component.FixedToCamera.postUpdate.call(this);var a=this.game.camera;this.scrollX=a.x*this.scrollFactorX/this.scale.x,this.scrollY=a.y*this.scrollFactorY/this.scale.y,this.render()},c.TilemapLayer.prototype.destroy=function(){PIXI.CanvasPool.remove(this),c.Component.Destroy.prototype.destroy.call(this)},c.TilemapLayer.prototype.resize=function(a,b){this.canvas.width=a,this.canvas.height=b,this.texture.frame.resize(a,b),this.texture.width=a,this.texture.height=b,this.texture.crop.width=a,this.texture.crop.height=b,this.texture.baseTexture.width=a,this.texture.baseTexture.height=b,this.texture.baseTexture.dirty(),this.texture.requiresUpdate=!0,this.texture._updateUvs(),this.dirty=!0},c.TilemapLayer.prototype.resizeWorld=function(){this.game.world.setBounds(0,0,this.layer.widthInPixels*this.scale.x,this.layer.heightInPixels*this.scale.y)},c.TilemapLayer.prototype._fixX=function(a){return 0>a&&(a=0),1===this.scrollFactorX?a:this._scrollX+(a-this._scrollX/this.scrollFactorX)},c.TilemapLayer.prototype._unfixX=function(a){return 1===this.scrollFactorX?a:this._scrollX/this.scrollFactorX+(a-this._scrollX)},c.TilemapLayer.prototype._fixY=function(a){return 0>a&&(a=0),1===this.scrollFactorY?a:this._scrollY+(a-this._scrollY/this.scrollFactorY)},c.TilemapLayer.prototype._unfixY=function(a){return 1===this.scrollFactorY?a:this._scrollY/this.scrollFactorY+(a-this._scrollY)},c.TilemapLayer.prototype.getTileX=function(a){return Math.floor(this._fixX(a)/this._mc.tileWidth)},c.TilemapLayer.prototype.getTileY=function(a){return Math.floor(this._fixY(a)/this._mc.tileHeight)},c.TilemapLayer.prototype.getTileXY=function(a,b,c){return c.x=this.getTileX(a),c.y=this.getTileY(b),c},c.TilemapLayer.prototype.getRayCastTiles=function(a,b,c,d){b||(b=this.rayStepRate),void 0===c&&(c=!1),void 0===d&&(d=!1);var e=this.getTiles(a.x,a.y,a.width,a.height,c,d);if(0===e.length)return[];for(var f=a.coordinatesOnLine(b),g=[],h=0;h<e.length;h++)for(var i=0;i<f.length;i++){var j=e[h],k=f[i];if(j.containsPoint(k[0],k[1])){g.push(j);break}}return g},c.TilemapLayer.prototype.getTiles=function(a,b,c,d,e,f){void 0===e&&(e=!1),void 0===f&&(f=!1);var g=!(e||f);a=this._fixX(a),b=this._fixY(b);for(var h=Math.floor(a/(this._mc.cw*this.scale.x)),i=Math.floor(b/(this._mc.ch*this.scale.y)),j=Math.ceil((a+c)/(this._mc.cw*this.scale.x))-h,k=Math.ceil((b+d)/(this._mc.ch*this.scale.y))-i;this._results.length;)this._results.pop();for(var l=i;i+k>l;l++)for(var m=h;h+j>m;m++){var n=this.layer.data[l];n&&n[m]&&(g||n[m].isInteresting(e,f))&&this._results.push(n[m])}return this._results.slice()},c.TilemapLayer.prototype.resolveTileset=function(a){var b=this._mc.tilesets;if(2e3>a)for(;b.length<a;)b.push(void 0);var c=this.map.tiles[a]&&this.map.tiles[a][2];if(null!=c){var d=this.map.tilesets[c];if(d&&d.containsTileIndex(a))return b[a]=d}return b[a]=null},c.TilemapLayer.prototype.resetTilesetCache=function(){for(var a=this._mc.tilesets;a.length;)a.pop()},c.TilemapLayer.prototype.setScale=function(a,b){a=a||1,b=b||a;for(var c=0;c<this.layer.data.length;c++)for(var d=this.layer.data[c],e=0;e<d.length;e++){var f=d[e];f.width=this.map.tileWidth*a,f.height=this.map.tileHeight*b,f.worldX=f.x*f.width,f.worldY=f.y*f.height}this.scale.setTo(a,b)},c.TilemapLayer.prototype.shiftCanvas=function(a,b,c){var d=a.canvas,e=d.width-Math.abs(b),f=d.height-Math.abs(c),g=0,h=0,i=b,j=c;0>b&&(g=-b,i=0),0>c&&(h=-c,j=0);var k=this.renderSettings.copyCanvas;if(k){(k.width<e||k.height<f)&&(k.width=e,k.height=f);var l=k.getContext("2d");l.clearRect(0,0,e,f),l.drawImage(d,g,h,e,f,0,0,e,f),a.clearRect(i,j,e,f),a.drawImage(k,0,0,e,f,i,j,e,f)}else a.save(),a.globalCompositeOperation="copy",a.drawImage(d,g,h,e,f,i,j,e,f),a.restore()},c.TilemapLayer.prototype.renderRegion=function(a,b,c,d,e,f){var g=this.context,h=this.layer.width,i=this.layer.height,j=this._mc.tileWidth,k=this._mc.tileHeight,l=this._mc.tilesets,m=NaN;this._wrap||(e>=c&&(c=Math.max(0,c),e=Math.min(h-1,e)),f>=d&&(d=Math.max(0,d),f=Math.min(i-1,f)));var n,o,p,q,r,s,t=c*j-a,u=d*k-b,v=(c+(1<<20)*h)%h,w=(d+(1<<20)*i)%i;for(g.fillStyle=this.tileColor,q=w,s=f-d,o=u;s>=0;q++,s--,o+=k){q>=i&&(q-=i);var x=this.layer.data[q];for(p=v,r=e-c,n=t;r>=0;p++,r--,n+=j){p>=h&&(p-=h);var y=x[p];if(y&&!(y.index<0)){var z=y.index,A=l[z];void 0===A&&(A=this.resolveTileset(z)),y.alpha===m||this.debug||(g.globalAlpha=y.alpha,m=y.alpha),A?y.rotation||y.flipped?(g.save(),g.translate(n+y.centerX,o+y.centerY),g.rotate(y.rotation),y.flipped&&g.scale(-1,1),A.draw(g,-y.centerX,-y.centerY,z),g.restore()):A.draw(g,n,o,z):this.debugSettings.missingImageFill&&(g.fillStyle=this.debugSettings.missingImageFill,g.fillRect(n,o,j,k)),y.debug&&this.debugSettings.debuggedTileOverfill&&(g.fillStyle=this.debugSettings.debuggedTileOverfill,g.fillRect(n,o,j,k))}}}},c.TilemapLayer.prototype.renderDeltaScroll=function(a,b){var c=this._mc.scrollX,d=this._mc.scrollY,e=this.canvas.width,f=this.canvas.height,g=this._mc.tileWidth,h=this._mc.tileHeight,i=0,j=-g,k=0,l=-h;if(0>a?(i=e+a,j=e-1):a>0&&(j=a),0>b?(k=f+b,l=f-1):b>0&&(l=b),this.shiftCanvas(this.context,a,b),i=Math.floor((i+c)/g),j=Math.floor((j+c)/g),k=Math.floor((k+d)/h),l=Math.floor((l+d)/h),j>=i){this.context.clearRect(i*g-c,0,(j-i+1)*g,f);var m=Math.floor((0+d)/h),n=Math.floor((f-1+d)/h);this.renderRegion(c,d,i,m,j,n)}if(l>=k){this.context.clearRect(0,k*h-d,e,(l-k+1)*h);var o=Math.floor((0+c)/g),p=Math.floor((e-1+c)/g);this.renderRegion(c,d,o,k,p,l)}},c.TilemapLayer.prototype.renderFull=function(){var a=this._mc.scrollX,b=this._mc.scrollY,c=this.canvas.width,d=this.canvas.height,e=this._mc.tileWidth,f=this._mc.tileHeight,g=Math.floor(a/e),h=Math.floor((c-1+a)/e),i=Math.floor(b/f),j=Math.floor((d-1+b)/f);this.context.clearRect(0,0,c,d),this.renderRegion(a,b,g,i,h,j)},c.TilemapLayer.prototype.render=function(){var a=!1;if(this.visible){(this.dirty||this.layer.dirty)&&(this.layer.dirty=!1,a=!0);var b=this.canvas.width,c=this.canvas.height,d=0|this._scrollX,e=0|this._scrollY,f=this._mc,g=f.scrollX-d,h=f.scrollY-e;if(a||0!==g||0!==h||f.renderWidth!==b||f.renderHeight!==c)return this.context.save(),f.scrollX=d,f.scrollY=e,(f.renderWidth!==b||f.renderHeight!==c)&&(f.renderWidth=b,f.renderHeight=c),this.debug&&(this.context.globalAlpha=this.debugSettings.debugAlpha,this.debugSettings.forceFullRedraw&&(a=!0)),!a&&this.renderSettings.enableScrollDelta&&Math.abs(g)+Math.abs(h)<Math.min(b,c)?this.renderDeltaScroll(g,h):this.renderFull(),this.debug&&(this.context.globalAlpha=1,this.renderDebug()),this.texture.baseTexture.dirty(),this.dirty=!1,this.context.restore(),!0}},c.TilemapLayer.prototype.renderDebug=function(){var a,b,c,d,e,f,g=this._mc.scrollX,h=this._mc.scrollY,i=this.context,j=this.canvas.width,k=this.canvas.height,l=this.layer.width,m=this.layer.height,n=this._mc.tileWidth,o=this._mc.tileHeight,p=Math.floor(g/n),q=Math.floor((j-1+g)/n),r=Math.floor(h/o),s=Math.floor((k-1+h)/o),t=p*n-g,u=r*o-h,v=(p+(1<<20)*l)%l,w=(r+(1<<20)*m)%m;for(i.strokeStyle=this.debugSettings.facingEdgeStroke,d=w,f=s-r,b=u;f>=0;d++,f--,b+=o){d>=m&&(d-=m);var x=this.layer.data[d];for(c=v,e=q-p,a=t;e>=0;c++,e--,a+=n){c>=l&&(c-=l);var y=x[c];!y||y.index<0||!y.collides||(this.debugSettings.collidingTileOverfill&&(i.fillStyle=this.debugSettings.collidingTileOverfill,i.fillRect(a,b,this._mc.cw,this._mc.ch)),this.debugSettings.facingEdgeStroke&&(i.beginPath(),y.faceTop&&(i.moveTo(a,b),i.lineTo(a+this._mc.cw,b)),y.faceBottom&&(i.moveTo(a,b+this._mc.ch),i.lineTo(a+this._mc.cw,b+this._mc.ch)),y.faceLeft&&(i.moveTo(a,b),i.lineTo(a,b+this._mc.ch)),y.faceRight&&(i.moveTo(a+this._mc.cw,b),i.lineTo(a+this._mc.cw,b+this._mc.ch)),i.stroke()))}}},Object.defineProperty(c.TilemapLayer.prototype,"wrap",{get:function(){return this._wrap},set:function(a){this._wrap=a,this.dirty=!0}}),Object.defineProperty(c.TilemapLayer.prototype,"scrollX",{get:function(){return this._scrollX},set:function(a){this._scrollX=a}}),Object.defineProperty(c.TilemapLayer.prototype,"scrollY",{get:function(){return this._scrollY},set:function(a){this._scrollY=a}}),Object.defineProperty(c.TilemapLayer.prototype,"collisionWidth",{get:function(){return this._mc.cw},set:function(a){this._mc.cw=0|a,this.dirty=!0}}),Object.defineProperty(c.TilemapLayer.prototype,"collisionHeight",{get:function(){return this._mc.ch},set:function(a){this._mc.ch=0|a,this.dirty=!0}}),c.TilemapParser={INSERT_NULL:!1,parse:function(a,b,d,e,f,g){if(void 0===d&&(d=32),void 0===e&&(e=32),void 0===f&&(f=10),void 0===g&&(g=10),void 0===b)return this.getEmptyData();if(null===b)return this.getEmptyData(d,e,f,g);var h=a.cache.getTilemapData(b);if(h){if(h.format===c.Tilemap.CSV)return this.parseCSV(b,h.data,d,e);if(!h.format||h.format===c.Tilemap.TILED_JSON)return this.parseTiledJSON(h.data)}else console.warn("Phaser.TilemapParser.parse - No map data found for key "+b)},parseCSV:function(a,b,d,e){var f=this.getEmptyData();b=b.trim();for(var g=[],h=b.split("\n"),i=h.length,j=0,k=0;k<h.length;k++){g[k]=[];for(var l=h[k].split(","),m=0;m<l.length;m++)g[k][m]=new c.Tile(f.layers[0],parseInt(l[m],10),m,k,d,e);0===j&&(j=l.length)}return f.format=c.Tilemap.CSV,f.name=a,f.width=j,f.height=i,f.tileWidth=d,f.tileHeight=e,f.widthInPixels=j*d,f.heightInPixels=i*e,f.layers[0].width=j,f.layers[0].height=i,f.layers[0].widthInPixels=f.widthInPixels,f.layers[0].heightInPixels=f.heightInPixels,f.layers[0].data=g,f},getEmptyData:function(a,b,c,d){var e={};e.width=0,e.height=0,e.tileWidth=0,e.tileHeight=0,"undefined"!=typeof a&&null!==a&&(e.tileWidth=a),"undefined"!=typeof b&&null!==b&&(e.tileHeight=b),"undefined"!=typeof c&&null!==c&&(e.width=c),"undefined"!=typeof d&&null!==d&&(e.height=d),e.orientation="orthogonal",e.version="1",e.properties={},e.widthInPixels=0,e.heightInPixels=0;var f=[],g={name:"layer",x:0,y:0,width:0,height:0,widthInPixels:0,heightInPixels:0,alpha:1,visible:!0,properties:{},indexes:[],callbacks:[],bodies:[],data:[]};return f.push(g),e.layers=f,e.images=[],e.objects={},e.collision={},e.tilesets=[],e.tiles=[],e},parseTiledJSON:function(a){function b(a,b){var c={};for(var d in b){var e=b[d];"undefined"!=typeof a[e]&&(c[e]=a[e])}return c}if("orthogonal"!==a.orientation)return console.warn("TilemapParser.parseTiledJSON - Only orthogonal map types are supported in this version of Phaser"),null;var d={};d.width=a.width,d.height=a.height,d.tileWidth=a.tilewidth,d.tileHeight=a.tileheight,d.orientation=a.orientation,d.format=c.Tilemap.TILED_JSON,d.version=a.version,d.properties=a.properties,d.widthInPixels=d.width*d.tileWidth,d.heightInPixels=d.height*d.tileHeight;for(var e=[],f=0;f<a.layers.length;f++)if("tilelayer"===a.layers[f].type){var g=a.layers[f];if(!g.compression&&g.encoding&&"base64"===g.encoding){for(var h=window.atob(g.data),i=h.length,j=new Array(i),k=0;i>k;k+=4)j[k/4]=(h.charCodeAt(k)|h.charCodeAt(k+1)<<8|h.charCodeAt(k+2)<<16|h.charCodeAt(k+3)<<24)>>>0;g.data=j,delete g.encoding}else if(g.compression){console.warn("TilemapParser.parseTiledJSON - Layer compression is unsupported, skipping layer '"+g.name+"'");continue}var l={name:g.name,x:g.x,y:g.y,width:g.width,height:g.height,widthInPixels:g.width*a.tilewidth,heightInPixels:g.height*a.tileheight,alpha:g.opacity,visible:g.visible,properties:{},indexes:[],callbacks:[],bodies:[]};g.properties&&(l.properties=g.properties);for(var m,n,o,p,q=0,r=[],s=[],t=0,i=g.data.length;i>t;t++){if(m=0,n=!1,p=g.data[t],p>536870912)switch(o=0,p>2147483648&&(p-=2147483648,o+=4),p>1073741824&&(p-=1073741824,o+=2),p>536870912&&(p-=536870912,o+=1),o){case 5:m=Math.PI/2;break;case 6:m=Math.PI;break;case 3:m=3*Math.PI/2;break;case 4:m=0,n=!0;break;case 7:m=Math.PI/2,n=!0;break;case 2:m=Math.PI,n=!0;break;case 1:m=3*Math.PI/2,n=!0}p>0?(r.push(new c.Tile(l,p,q,s.length,a.tilewidth,a.tileheight)),r[r.length-1].rotation=m,r[r.length-1].flipped=n):c.TilemapParser.INSERT_NULL?r.push(null):r.push(new c.Tile(l,-1,q,s.length,a.tilewidth,a.tileheight)),q++,q===g.width&&(s.push(r),q=0,r=[])}l.data=s,e.push(l)}d.layers=e;for(var u=[],f=0;f<a.layers.length;f++)if("imagelayer"===a.layers[f].type){var v=a.layers[f],w={name:v.name,image:v.image,x:v.x,y:v.y,alpha:v.opacity,visible:v.visible,properties:{}};v.properties&&(w.properties=v.properties),u.push(w)}d.images=u;for(var x=[],y=[],f=0;f<a.tilesets.length;f++){var z=a.tilesets[f];if(z.image){var A=new c.Tileset(z.name,z.firstgid,z.tilewidth,z.tileheight,z.margin,z.spacing,z.properties);z.tileproperties&&(A.tileProperties=z.tileproperties),A.updateTileData(z.imagewidth,z.imageheight),x.push(A)}else{var B=new c.ImageCollection(z.name,z.firstgid,z.tilewidth,z.tileheight,z.margin,z.spacing,z.properties);for(var C in z.tiles){var w=z.tiles[C].image,p=z.firstgid+parseInt(C,10);B.addImage(p,w)}y.push(B)}}d.tilesets=x,d.imagecollections=y;for(var D={},E={},f=0;f<a.layers.length;f++)if("objectgroup"===a.layers[f].type){var F=a.layers[f];D[F.name]=[],E[F.name]=[];for(var G=0,i=F.objects.length;i>G;G++)if(F.objects[G].gid){var H={gid:F.objects[G].gid,name:F.objects[G].name,type:F.objects[G].hasOwnProperty("type")?F.objects[G].type:"",x:F.objects[G].x,y:F.objects[G].y,visible:F.objects[G].visible,properties:F.objects[G].properties};F.objects[G].rotation&&(H.rotation=F.objects[G].rotation),D[F.name].push(H)}else if(F.objects[G].polyline){var H={name:F.objects[G].name,type:F.objects[G].type,x:F.objects[G].x,y:F.objects[G].y,width:F.objects[G].width,height:F.objects[G].height,visible:F.objects[G].visible,properties:F.objects[G].properties};F.objects[G].rotation&&(H.rotation=F.objects[G].rotation),H.polyline=[];for(var I=0;I<F.objects[G].polyline.length;I++)H.polyline.push([F.objects[G].polyline[I].x,F.objects[G].polyline[I].y]);E[F.name].push(H),D[F.name].push(H)}else if(F.objects[G].polygon){var H=b(F.objects[G],["name","type","x","y","visible","rotation","properties"]);H.polygon=[];for(var I=0;I<F.objects[G].polygon.length;I++)H.polygon.push([F.objects[G].polygon[I].x,F.objects[G].polygon[I].y]);D[F.name].push(H)}else if(F.objects[G].ellipse){var H=b(F.objects[G],["name","type","ellipse","x","y","width","height","visible","rotation","properties"]);D[F.name].push(H)}else{var H=b(F.objects[G],["name","type","x","y","width","height","visible","rotation","properties"]);H.rectangle=!0,D[F.name].push(H)}}d.objects=D,d.collision=E,d.tiles=[];for(var f=0;f<d.tilesets.length;f++)for(var z=d.tilesets[f],q=z.tileMargin,J=z.tileMargin,K=0,L=0,M=0,t=z.firstgid;t<z.firstgid+z.total&&(d.tiles[t]=[q,J,f],q+=z.tileWidth+z.tileSpacing,K++,K!==z.total)&&(L++,L!==z.columns||(q=z.tileMargin,J+=z.tileHeight+z.tileSpacing,L=0,M++,M!==z.rows));t++);for(var l,N,O,z,f=0;f<d.layers.length;f++){l=d.layers[f];for(var k=0;k<l.data.length;k++){r=l.data[k];for(var P=0;P<r.length;P++)N=r[P],null===N||N.index<0||(O=d.tiles[N.index][2],z=d.tilesets[O],z.tileProperties&&z.tileProperties[N.index-z.firstgid]&&(N.properties=c.Utils.mixin(z.tileProperties[N.index-z.firstgid],N.properties)))}}return d}},c.Tileset=function(a,b,c,d,e,f,g){(void 0===c||0>=c)&&(c=32),(void 0===d||0>=d)&&(d=32),void 0===e&&(e=0),void 0===f&&(f=0),this.name=a,this.firstgid=0|b,this.tileWidth=0|c,this.tileHeight=0|d,this.tileMargin=0|e,this.tileSpacing=0|f,this.properties=g||{},this.image=null,this.rows=0,this.columns=0,this.total=0,this.drawCoords=[]},c.Tileset.prototype={draw:function(a,b,c,d){var e=d-this.firstgid<<1;e>=0&&e+1<this.drawCoords.length&&a.drawImage(this.image,this.drawCoords[e],this.drawCoords[e+1],this.tileWidth,this.tileHeight,b,c,this.tileWidth,this.tileHeight)},containsTileIndex:function(a){return a>=this.firstgid&&a<this.firstgid+this.total},setImage:function(a){this.image=a,this.updateTileData(a.width,a.height)},setSpacing:function(a,b){this.tileMargin=0|a,this.tileSpacing=0|b,this.image&&this.updateTileData(this.image.width,this.image.height)},updateTileData:function(a,b){var c=(b-2*this.tileMargin+this.tileSpacing)/(this.tileHeight+this.tileSpacing),d=(a-2*this.tileMargin+this.tileSpacing)/(this.tileWidth+this.tileSpacing);(c%1!==0||d%1!==0)&&console.warn("Phaser.Tileset - "+this.name+" image tile area is not an even multiple of tile size"),c=Math.floor(c),d=Math.floor(d),(this.rows&&this.rows!==c||this.columns&&this.columns!==d)&&console.warn("Phaser.Tileset - actual and expected number of tile rows and columns differ"),this.rows=c,this.columns=d,this.total=c*d,this.drawCoords.length=0;for(var e=this.tileMargin,f=this.tileMargin,g=0;g<this.rows;g++){for(var h=0;h<this.columns;h++)this.drawCoords.push(e),this.drawCoords.push(f),e+=this.tileWidth+this.tileSpacing;e=this.tileMargin,f+=this.tileHeight+this.tileSpacing}}},c.Tileset.prototype.constructor=c.Tileset,c.Particle=function(a,b,d,e,f){c.Sprite.call(this,a,b,d,e,f),this.autoScale=!1,this.scaleData=null,this._s=0,this.autoAlpha=!1,this.alphaData=null,this._a=0},c.Particle.prototype=Object.create(c.Sprite.prototype),c.Particle.prototype.constructor=c.Particle,c.Particle.prototype.update=function(){this.autoScale&&(this._s--,this._s?this.scale.set(this.scaleData[this._s].x,this.scaleData[this._s].y):this.autoScale=!1),this.autoAlpha&&(this._a--,this._a?this.alpha=this.alphaData[this._a].v:this.autoAlpha=!1)},c.Particle.prototype.onEmit=function(){},c.Particle.prototype.setAlphaData=function(a){this.alphaData=a,this._a=a.length-1,this.alpha=this.alphaData[this._a].v,this.autoAlpha=!0},c.Particle.prototype.setScaleData=function(a){this.scaleData=a,this._s=a.length-1,this.scale.set(this.scaleData[this._s].x,this.scaleData[this._s].y),this.autoScale=!0},c.Particle.prototype.reset=function(a,b,d){return c.Component.Reset.prototype.reset.call(this,a,b,d),this.alpha=1,this.scale.set(1),this.autoScale=!1,this.autoAlpha=!1,this},c.Particles=function(a){this.game=a,this.emitters={},this.ID=0},c.Particles.prototype={add:function(a){return this.emitters[a.name]=a,a},remove:function(a){delete this.emitters[a.name]},update:function(){for(var a in this.emitters)this.emitters[a].exists&&this.emitters[a].update()}},c.Particles.prototype.constructor=c.Particles,c.Particles.Arcade={},c.Particles.Arcade.Emitter=function(a,b,d,e){this.maxParticles=e||50,c.Group.call(this,a),this.name="emitter"+this.game.particles.ID++,this.type=c.EMITTER,
this.physicsType=c.GROUP,this.area=new c.Rectangle(b,d,1,1),this.minParticleSpeed=new c.Point(-100,-100),this.maxParticleSpeed=new c.Point(100,100),this.minParticleScale=1,this.maxParticleScale=1,this.scaleData=null,this.minRotation=-360,this.maxRotation=360,this.minParticleAlpha=1,this.maxParticleAlpha=1,this.alphaData=null,this.gravity=100,this.particleClass=c.Particle,this.particleDrag=new c.Point,this.angularDrag=0,this.frequency=100,this.lifespan=2e3,this.bounce=new c.Point,this.on=!1,this.particleAnchor=new c.Point(.5,.5),this.blendMode=c.blendModes.NORMAL,this.emitX=b,this.emitY=d,this.autoScale=!1,this.autoAlpha=!1,this.particleBringToTop=!1,this.particleSendToBack=!1,this._minParticleScale=new c.Point(1,1),this._maxParticleScale=new c.Point(1,1),this._quantity=0,this._timer=0,this._counter=0,this._flowQuantity=0,this._flowTotal=0,this._explode=!0,this._frames=null},c.Particles.Arcade.Emitter.prototype=Object.create(c.Group.prototype),c.Particles.Arcade.Emitter.prototype.constructor=c.Particles.Arcade.Emitter,c.Particles.Arcade.Emitter.prototype.update=function(){if(this.on&&this.game.time.time>=this._timer)if(this._timer=this.game.time.time+this.frequency*this.game.time.slowMotion,0!==this._flowTotal)if(this._flowQuantity>0){for(var a=0;a<this._flowQuantity;a++)if(this.emitParticle()&&(this._counter++,-1!==this._flowTotal&&this._counter>=this._flowTotal)){this.on=!1;break}}else this.emitParticle()&&(this._counter++,-1!==this._flowTotal&&this._counter>=this._flowTotal&&(this.on=!1));else this.emitParticle()&&(this._counter++,this._quantity>0&&this._counter>=this._quantity&&(this.on=!1));for(var a=this.children.length;a--;)this.children[a].exists&&this.children[a].update()},c.Particles.Arcade.Emitter.prototype.makeParticles=function(a,b,c,d,e){void 0===b&&(b=0),void 0===c&&(c=this.maxParticles),void 0===d&&(d=!1),void 0===e&&(e=!1);var f,g=0,h=a,i=b;for(this._frames=b,c>this.maxParticles&&(this.maxParticles=c);c>g;)Array.isArray(a)&&(h=this.game.rnd.pick(a)),Array.isArray(b)&&(i=this.game.rnd.pick(b)),f=new this.particleClass(this.game,0,0,h,i),this.game.physics.arcade.enable(f,!1),d?(f.body.checkCollision.any=!0,f.body.checkCollision.none=!1):f.body.checkCollision.none=!0,f.body.collideWorldBounds=e,f.body.skipQuadTree=!0,f.exists=!1,f.visible=!1,f.anchor.copyFrom(this.particleAnchor),this.add(f),g++;return this},c.Particles.Arcade.Emitter.prototype.kill=function(){return this.on=!1,this.alive=!1,this.exists=!1,this},c.Particles.Arcade.Emitter.prototype.revive=function(){return this.alive=!0,this.exists=!0,this},c.Particles.Arcade.Emitter.prototype.explode=function(a,b){return this._flowTotal=0,this.start(!0,a,0,b,!1),this},c.Particles.Arcade.Emitter.prototype.flow=function(a,b,c,d,e){return(void 0===c||0===c)&&(c=1),void 0===d&&(d=-1),void 0===e&&(e=!0),c>this.maxParticles&&(c=this.maxParticles),this._counter=0,this._flowQuantity=c,this._flowTotal=d,e?(this.start(!0,a,b,c),this._counter+=c,this.on=!0,this._timer=this.game.time.time+b*this.game.time.slowMotion):this.start(!1,a,b,c),this},c.Particles.Arcade.Emitter.prototype.start=function(a,b,c,d,e){if(void 0===a&&(a=!0),void 0===b&&(b=0),(void 0===c||null===c)&&(c=250),void 0===d&&(d=0),void 0===e&&(e=!1),d>this.maxParticles&&(d=this.maxParticles),this.revive(),this.visible=!0,this.lifespan=b,this.frequency=c,a||e)for(var f=0;d>f;f++)this.emitParticle();else this.on=!0,this._quantity=d,this._counter=0,this._timer=this.game.time.time+c*this.game.time.slowMotion;return this},c.Particles.Arcade.Emitter.prototype.emitParticle=function(a,b,c,d){void 0===a&&(a=null),void 0===b&&(b=null);var e=this.getFirstExists(!1);if(null===e)return!1;var f=this.game.rnd;void 0!==c&&void 0!==d?e.loadTexture(c,d):void 0!==c&&e.loadTexture(c);var g=this.emitX,h=this.emitY;null!==a?g=a:this.width>1&&(g=f.between(this.left,this.right)),null!==b?h=b:this.height>1&&(h=f.between(this.top,this.bottom)),e.reset(g,h),e.angle=0,e.lifespan=this.lifespan,this.particleBringToTop?this.bringToTop(e):this.particleSendToBack&&this.sendToBack(e),this.autoScale?e.setScaleData(this.scaleData):1!==this.minParticleScale||1!==this.maxParticleScale?e.scale.set(f.realInRange(this.minParticleScale,this.maxParticleScale)):(this._minParticleScale.x!==this._maxParticleScale.x||this._minParticleScale.y!==this._maxParticleScale.y)&&e.scale.set(f.realInRange(this._minParticleScale.x,this._maxParticleScale.x),f.realInRange(this._minParticleScale.y,this._maxParticleScale.y)),void 0===d&&(Array.isArray(this._frames)?e.frame=this.game.rnd.pick(this._frames):e.frame=this._frames),this.autoAlpha?e.setAlphaData(this.alphaData):e.alpha=f.realInRange(this.minParticleAlpha,this.maxParticleAlpha),e.blendMode=this.blendMode;var i=e.body;return i.updateBounds(),i.bounce.copyFrom(this.bounce),i.drag.copyFrom(this.particleDrag),i.velocity.x=f.between(this.minParticleSpeed.x,this.maxParticleSpeed.x),i.velocity.y=f.between(this.minParticleSpeed.y,this.maxParticleSpeed.y),i.angularVelocity=f.between(this.minRotation,this.maxRotation),i.gravity.y=this.gravity,i.angularDrag=this.angularDrag,e.onEmit(),!0},c.Particles.Arcade.Emitter.prototype.destroy=function(){this.game.particles.remove(this),c.Group.prototype.destroy.call(this,!0,!1)},c.Particles.Arcade.Emitter.prototype.setSize=function(a,b){return this.area.width=a,this.area.height=b,this},c.Particles.Arcade.Emitter.prototype.setXSpeed=function(a,b){return a=a||0,b=b||0,this.minParticleSpeed.x=a,this.maxParticleSpeed.x=b,this},c.Particles.Arcade.Emitter.prototype.setYSpeed=function(a,b){return a=a||0,b=b||0,this.minParticleSpeed.y=a,this.maxParticleSpeed.y=b,this},c.Particles.Arcade.Emitter.prototype.setRotation=function(a,b){return a=a||0,b=b||0,this.minRotation=a,this.maxRotation=b,this},c.Particles.Arcade.Emitter.prototype.setAlpha=function(a,b,d,e,f){if(void 0===a&&(a=1),void 0===b&&(b=1),void 0===d&&(d=0),void 0===e&&(e=c.Easing.Linear.None),void 0===f&&(f=!1),this.minParticleAlpha=a,this.maxParticleAlpha=b,this.autoAlpha=!1,d>0&&a!==b){var g={v:a},h=this.game.make.tween(g).to({v:b},d,e);h.yoyo(f),this.alphaData=h.generateData(60),this.alphaData.reverse(),this.autoAlpha=!0}return this},c.Particles.Arcade.Emitter.prototype.setScale=function(a,b,d,e,f,g,h){if(void 0===a&&(a=1),void 0===b&&(b=1),void 0===d&&(d=1),void 0===e&&(e=1),void 0===f&&(f=0),void 0===g&&(g=c.Easing.Linear.None),void 0===h&&(h=!1),this.minParticleScale=1,this.maxParticleScale=1,this._minParticleScale.set(a,d),this._maxParticleScale.set(b,e),this.autoScale=!1,f>0&&(a!==b||d!==e)){var i={x:a,y:d},j=this.game.make.tween(i).to({x:b,y:e},f,g);j.yoyo(h),this.scaleData=j.generateData(60),this.scaleData.reverse(),this.autoScale=!0}return this},c.Particles.Arcade.Emitter.prototype.at=function(a){return a.center?(this.emitX=a.center.x,this.emitY=a.center.y):(this.emitX=a.world.x+a.anchor.x*a.width,this.emitY=a.world.y+a.anchor.y*a.height),this},Object.defineProperty(c.Particles.Arcade.Emitter.prototype,"width",{get:function(){return this.area.width},set:function(a){this.area.width=a}}),Object.defineProperty(c.Particles.Arcade.Emitter.prototype,"height",{get:function(){return this.area.height},set:function(a){this.area.height=a}}),Object.defineProperty(c.Particles.Arcade.Emitter.prototype,"x",{get:function(){return this.emitX},set:function(a){this.emitX=a}}),Object.defineProperty(c.Particles.Arcade.Emitter.prototype,"y",{get:function(){return this.emitY},set:function(a){this.emitY=a}}),Object.defineProperty(c.Particles.Arcade.Emitter.prototype,"left",{get:function(){return Math.floor(this.x-this.area.width/2)}}),Object.defineProperty(c.Particles.Arcade.Emitter.prototype,"right",{get:function(){return Math.floor(this.x+this.area.width/2)}}),Object.defineProperty(c.Particles.Arcade.Emitter.prototype,"top",{get:function(){return Math.floor(this.y-this.area.height/2)}}),Object.defineProperty(c.Particles.Arcade.Emitter.prototype,"bottom",{get:function(){return Math.floor(this.y+this.area.height/2)}}),c.Video=function(a,b,d){if(void 0===b&&(b=null),void 0===d&&(d=null),this.game=a,this.key=b,this.width=0,this.height=0,this.type=c.VIDEO,this.disableTextureUpload=!1,this.touchLocked=!1,this.onPlay=new c.Signal,this.onChangeSource=new c.Signal,this.onComplete=new c.Signal,this.onAccess=new c.Signal,this.onError=new c.Signal,this.onTimeout=new c.Signal,this.timeout=15e3,this._timeOutID=null,this.video=null,this.videoStream=null,this.isStreaming=!1,this.retryLimit=20,this.retry=0,this.retryInterval=500,this._retryID=null,this._codeMuted=!1,this._muted=!1,this._codePaused=!1,this._paused=!1,this._pending=!1,this._autoplay=!1,this._endCallback=null,this._playCallback=null,b&&this.game.cache.checkVideoKey(b)){var e=this.game.cache.getVideo(b);e.isBlob?this.createVideoFromBlob(e.data):this.video=e.data,this.width=this.video.videoWidth,this.height=this.video.videoHeight}else d&&this.createVideoFromURL(d,!1);this.video&&!d?(this.baseTexture=new PIXI.BaseTexture(this.video),this.baseTexture.forceLoaded(this.width,this.height)):(this.baseTexture=new PIXI.BaseTexture(PIXI.TextureCache.__default.baseTexture.source),this.baseTexture.forceLoaded(this.width,this.height)),this.texture=new PIXI.Texture(this.baseTexture),this.textureFrame=new c.Frame(0,0,0,this.width,this.height,"video"),this.texture.setFrame(this.textureFrame),this.texture.valid=!1,null!==b&&this.video&&(this.texture.valid=this.video.canplay),this.snapshot=null,c.BitmapData&&(this.snapshot=new c.BitmapData(this.game,"",this.width,this.height)),!this.game.device.cocoonJS&&(this.game.device.iOS||this.game.device.android)||window.PhaserGlobal&&window.PhaserGlobal.fakeiOSTouchLock?this.setTouchLock():e&&(e.locked=!1)},c.Video.prototype={connectToMediaStream:function(a,b){return a&&b&&(this.video=a,this.videoStream=b,this.isStreaming=!0,this.baseTexture.source=this.video,this.updateTexture(null,this.video.videoWidth,this.video.videoHeight),this.onAccess.dispatch(this)),this},startMediaStream:function(a,b,c){if(void 0===a&&(a=!1),void 0===b&&(b=null),void 0===c&&(c=null),!this.game.device.getUserMedia)return this.onError.dispatch(this,"No getUserMedia"),!1;null!==this.videoStream&&(this.videoStream.active?this.videoStream.active=!1:this.videoStream.stop()),this.removeVideoElement(),this.video=document.createElement("video"),this.video.setAttribute("autoplay","autoplay"),null!==b&&(this.video.width=b),null!==c&&(this.video.height=c),this._timeOutID=window.setTimeout(this.getUserMediaTimeout.bind(this),this.timeout);try{navigator.getUserMedia({audio:a,video:!0},this.getUserMediaSuccess.bind(this),this.getUserMediaError.bind(this))}catch(d){this.getUserMediaError(d)}return this},getUserMediaTimeout:function(){clearTimeout(this._timeOutID),this.onTimeout.dispatch(this)},getUserMediaError:function(a){clearTimeout(this._timeOutID),this.onError.dispatch(this,a)},getUserMediaSuccess:function(a){clearTimeout(this._timeOutID),this.videoStream=a,void 0!==this.video.mozSrcObject?this.video.mozSrcObject=a:this.video.src=window.URL&&window.URL.createObjectURL(a)||a;var b=this;this.video.onloadeddata=function(){function a(){if(c>0)if(b.video.videoWidth>0){var d=b.video.videoWidth,e=b.video.videoHeight;isNaN(b.video.videoHeight)&&(e=d/(4/3)),b.video.play(),b.isStreaming=!0,b.baseTexture.source=b.video,b.updateTexture(null,d,e),b.onAccess.dispatch(b)}else window.setTimeout(a,500);else console.warn("Unable to connect to video stream. Webcam error?");c--}var c=10;a()}},createVideoFromBlob:function(a){var b=this;return this.video=document.createElement("video"),this.video.controls=!1,this.video.setAttribute("autoplay","autoplay"),this.video.addEventListener("loadeddata",function(a){b.updateTexture(a)},!0),this.video.src=window.URL.createObjectURL(a),this.video.canplay=!0,this},createVideoFromURL:function(a,b){return void 0===b&&(b=!1),this.texture&&(this.texture.valid=!1),this.video=document.createElement("video"),this.video.controls=!1,b&&this.video.setAttribute("autoplay","autoplay"),this.video.src=a,this.video.canplay=!0,this.video.load(),this.retry=this.retryLimit,this._retryID=window.setTimeout(this.checkVideoProgress.bind(this),this.retryInterval),this.key=a,this},updateTexture:function(a,b,c){var d=!1;(void 0===b||null===b)&&(b=this.video.videoWidth,d=!0),(void 0===c||null===c)&&(c=this.video.videoHeight),this.width=b,this.height=c,this.baseTexture.source!==this.video&&(this.baseTexture.source=this.video),this.baseTexture.forceLoaded(b,c),this.texture.frame.resize(b,c),this.texture.width=b,this.texture.height=c,this.texture.valid=!0,this.snapshot&&this.snapshot.resize(b,c),d&&null!==this.key&&(this.onChangeSource.dispatch(this,b,c),this._autoplay&&(this.video.play(),this.onPlay.dispatch(this,this.loop,this.playbackRate)))},complete:function(){this.onComplete.dispatch(this)},play:function(a,b){return void 0===a&&(a=!1),void 0===b&&(b=1),this.game.sound.onMute&&(this.game.sound.onMute.add(this.setMute,this),this.game.sound.onUnMute.add(this.unsetMute,this),this.game.sound.mute&&this.setMute()),this.game.onPause.add(this.setPause,this),this.game.onResume.add(this.setResume,this),this._endCallback=this.complete.bind(this),this.video.addEventListener("ended",this._endCallback,!0),a?this.video.loop="loop":this.video.loop="",this.video.playbackRate=b,this.touchLocked?this._pending=!0:(this._pending=!1,null!==this.key&&(4!==this.video.readyState?(this.retry=this.retryLimit,this._retryID=window.setTimeout(this.checkVideoProgress.bind(this),this.retryInterval)):(this._playCallback=this.playHandler.bind(this),this.video.addEventListener("playing",this._playCallback,!0))),this.video.play(),this.onPlay.dispatch(this,a,b)),this},playHandler:function(){this.video.removeEventListener("playing",this._playCallback,!0),this.updateTexture()},stop:function(){return this.game.sound.onMute&&(this.game.sound.onMute.remove(this.setMute,this),this.game.sound.onUnMute.remove(this.unsetMute,this)),this.game.onPause.remove(this.setPause,this),this.game.onResume.remove(this.setResume,this),this.isStreaming?(this.video.mozSrcObject?(this.video.mozSrcObject.stop(),this.video.src=null):(this.video.src="",this.videoStream.active?this.videoStream.active=!1:this.videoStream.getTracks?this.videoStream.getTracks().forEach(function(a){a.stop()}):this.videoStream.stop()),this.videoStream=null,this.isStreaming=!1):(this.video.removeEventListener("ended",this._endCallback,!0),this.video.removeEventListener("playing",this._playCallback,!0),this.touchLocked?this._pending=!1:this.video.pause()),this},add:function(a){if(Array.isArray(a))for(var b=0;b<a.length;b++)a[b].loadTexture&&a[b].loadTexture(this);else a.loadTexture(this);return this},addToWorld:function(a,b,c,d,e,f){e=e||1,f=f||1;var g=this.game.add.image(a,b,this);return g.anchor.set(c,d),g.scale.set(e,f),g},render:function(){!this.disableTextureUpload&&this.playing&&this.baseTexture.dirty()},setMute:function(){this._muted||(this._muted=!0,this.video.muted=!0)},unsetMute:function(){this._muted&&!this._codeMuted&&(this._muted=!1,this.video.muted=!1)},setPause:function(){this._paused||this.touchLocked||(this._paused=!0,this.video.pause())},setResume:function(){!this._paused||this._codePaused||this.touchLocked||(this._paused=!1,this.video.ended||this.video.play())},changeSource:function(a,b){return void 0===b&&(b=!0),this.texture.valid=!1,this.video.pause(),this.retry=this.retryLimit,this._retryID=window.setTimeout(this.checkVideoProgress.bind(this),this.retryInterval),this.video.src=a,this.video.load(),this._autoplay=b,b||(this.paused=!0),this},checkVideoProgress:function(){4===this.video.readyState?this.updateTexture():(this.retry--,this.retry>0?this._retryID=window.setTimeout(this.checkVideoProgress.bind(this),this.retryInterval):console.warn("Phaser.Video: Unable to start downloading video in time",this.isStreaming))},setTouchLock:function(){this.game.input.touch.addTouchLockCallback(this.unlock,this),this.touchLocked=!0},unlock:function(){if(this.touchLocked=!1,this.video.play(),this.onPlay.dispatch(this,this.loop,this.playbackRate),this.key){var a=this.game.cache.getVideo(this.key);a&&!a.isBlob&&(a.locked=!1)}return!0},grab:function(a,b,c){return void 0===a&&(a=!1),void 0===b&&(b=1),void 0===c&&(c=null),null===this.snapshot?void console.warn("Video.grab cannot run because Phaser.BitmapData is unavailable"):(a&&this.snapshot.cls(),this.snapshot.copy(this.video,0,0,this.width,this.height,0,0,this.width,this.height,0,0,0,1,1,b,c),this.snapshot)},removeVideoElement:function(){if(this.video){for(this.video.parentNode&&this.video.parentNode.removeChild(this.video);this.video.hasChildNodes();)this.video.removeChild(this.video.firstChild);this.video.removeAttribute("autoplay"),this.video.removeAttribute("src"),this.video=null}},destroy:function(){this.stop(),this.removeVideoElement(),this.touchLocked&&this.game.input.touch.removeTouchLockCallback(this.unlock,this),this._retryID&&window.clearTimeout(this._retryID)}},Object.defineProperty(c.Video.prototype,"currentTime",{get:function(){return this.video?this.video.currentTime:0},set:function(a){this.video.currentTime=a}}),Object.defineProperty(c.Video.prototype,"duration",{get:function(){return this.video?this.video.duration:0}}),Object.defineProperty(c.Video.prototype,"progress",{get:function(){return this.video?this.video.currentTime/this.video.duration:0}}),Object.defineProperty(c.Video.prototype,"mute",{get:function(){return this._muted},set:function(a){if(a=a||null){if(this._muted)return;this._codeMuted=!0,this.setMute()}else{if(!this._muted)return;this._codeMuted=!1,this.unsetMute()}}}),Object.defineProperty(c.Video.prototype,"paused",{get:function(){return this._paused},set:function(a){if(a=a||null,!this.touchLocked)if(a){if(this._paused)return;this._codePaused=!0,this.setPause()}else{if(!this._paused)return;this._codePaused=!1,this.setResume()}}}),Object.defineProperty(c.Video.prototype,"volume",{get:function(){return this.video?this.video.volume:1},set:function(a){0>a?a=0:a>1&&(a=1),this.video&&(this.video.volume=a)}}),Object.defineProperty(c.Video.prototype,"playbackRate",{get:function(){return this.video?this.video.playbackRate:1},set:function(a){this.video&&(this.video.playbackRate=a)}}),Object.defineProperty(c.Video.prototype,"loop",{get:function(){return this.video?this.video.loop:!1},set:function(a){a&&this.video?this.video.loop="loop":this.video&&(this.video.loop="")}}),Object.defineProperty(c.Video.prototype,"playing",{get:function(){return!(this.video.paused&&this.video.ended)}}),c.Video.prototype.constructor=c.Video,void 0===PIXI.blendModes&&(PIXI.blendModes=c.blendModes),void 0===PIXI.scaleModes&&(PIXI.scaleModes=c.scaleModes),void 0===PIXI.Texture.emptyTexture&&(PIXI.Texture.emptyTexture=new PIXI.Texture(new PIXI.BaseTexture)),void 0===PIXI.DisplayObject._tempMatrix&&(PIXI.DisplayObject._tempMatrix=new PIXI.Matrix),void 0===PIXI.RenderTexture.tempMatrix&&(PIXI.RenderTexture.tempMatrix=new PIXI.Matrix),PIXI.Graphics&&void 0===PIXI.Graphics.POLY&&(PIXI.Graphics.POLY=c.POLYGON,PIXI.Graphics.RECT=c.RECTANGLE,PIXI.Graphics.CIRC=c.CIRCLE,PIXI.Graphics.ELIP=c.ELLIPSE,PIXI.Graphics.RREC=c.ROUNDEDRECTANGLE),PIXI.TextureSilentFail=!0,"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=c),exports.Phaser=c):"undefined"!=typeof define&&define.amd?define("Phaser",function(){return b.Phaser=c}()):b.Phaser=c,c}.call(this);
//# sourceMappingURL=phaser-arcade-physics.map
/* Web Font Loader v1.6.22 - (c) Adobe Systems, Google. License: Apache 2.0 */
(function(){function aa(a,b,d){return a.call.apply(a.bind,arguments)}function ba(a,b,d){if(!a)throw Error();if(2<arguments.length){var c=Array.prototype.slice.call(arguments,2);return function(){var d=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(d,c);return a.apply(b,d)}}return function(){return a.apply(b,arguments)}}function p(a,b,d){p=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?aa:ba;return p.apply(null,arguments)}var q=Date.now||function(){return+new Date};function ca(a,b){this.a=a;this.m=b||a;this.c=this.m.document}var da=!!window.FontFace;function t(a,b,d,c){b=a.c.createElement(b);if(d)for(var e in d)d.hasOwnProperty(e)&&("style"==e?b.style.cssText=d[e]:b.setAttribute(e,d[e]));c&&b.appendChild(a.c.createTextNode(c));return b}function u(a,b,d){a=a.c.getElementsByTagName(b)[0];a||(a=document.documentElement);a.insertBefore(d,a.lastChild)}function v(a){a.parentNode&&a.parentNode.removeChild(a)}
function w(a,b,d){b=b||[];d=d||[];for(var c=a.className.split(/\s+/),e=0;e<b.length;e+=1){for(var f=!1,g=0;g<c.length;g+=1)if(b[e]===c[g]){f=!0;break}f||c.push(b[e])}b=[];for(e=0;e<c.length;e+=1){f=!1;for(g=0;g<d.length;g+=1)if(c[e]===d[g]){f=!0;break}f||b.push(c[e])}a.className=b.join(" ").replace(/\s+/g," ").replace(/^\s+|\s+$/,"")}function y(a,b){for(var d=a.className.split(/\s+/),c=0,e=d.length;c<e;c++)if(d[c]==b)return!0;return!1}
function z(a){if("string"===typeof a.f)return a.f;var b=a.m.location.protocol;"about:"==b&&(b=a.a.location.protocol);return"https:"==b?"https:":"http:"}function ea(a){return a.m.location.hostname||a.a.location.hostname}
function A(a,b,d){function c(){k&&e&&f&&(k(g),k=null)}b=t(a,"link",{rel:"stylesheet",href:b,media:"all"});var e=!1,f=!0,g=null,k=d||null;da?(b.onload=function(){e=!0;c()},b.onerror=function(){e=!0;g=Error("Stylesheet failed to load");c()}):setTimeout(function(){e=!0;c()},0);u(a,"head",b)}
function B(a,b,d,c){var e=a.c.getElementsByTagName("head")[0];if(e){var f=t(a,"script",{src:b}),g=!1;f.onload=f.onreadystatechange=function(){g||this.readyState&&"loaded"!=this.readyState&&"complete"!=this.readyState||(g=!0,d&&d(null),f.onload=f.onreadystatechange=null,"HEAD"==f.parentNode.tagName&&e.removeChild(f))};e.appendChild(f);setTimeout(function(){g||(g=!0,d&&d(Error("Script load timeout")))},c||5E3);return f}return null};function C(){this.a=0;this.c=null}function D(a){a.a++;return function(){a.a--;E(a)}}function F(a,b){a.c=b;E(a)}function E(a){0==a.a&&a.c&&(a.c(),a.c=null)};function G(a){this.a=a||"-"}G.prototype.c=function(a){for(var b=[],d=0;d<arguments.length;d++)b.push(arguments[d].replace(/[\W_]+/g,"").toLowerCase());return b.join(this.a)};function H(a,b){this.c=a;this.f=4;this.a="n";var d=(b||"n4").match(/^([nio])([1-9])$/i);d&&(this.a=d[1],this.f=parseInt(d[2],10))}function fa(a){return I(a)+" "+(a.f+"00")+" 300px "+J(a.c)}function J(a){var b=[];a=a.split(/,\s*/);for(var d=0;d<a.length;d++){var c=a[d].replace(/['"]/g,"");-1!=c.indexOf(" ")||/^\d/.test(c)?b.push("'"+c+"'"):b.push(c)}return b.join(",")}function K(a){return a.a+a.f}function I(a){var b="normal";"o"===a.a?b="oblique":"i"===a.a&&(b="italic");return b}
function ga(a){var b=4,d="n",c=null;a&&((c=a.match(/(normal|oblique|italic)/i))&&c[1]&&(d=c[1].substr(0,1).toLowerCase()),(c=a.match(/([1-9]00|normal|bold)/i))&&c[1]&&(/bold/i.test(c[1])?b=7:/[1-9]00/.test(c[1])&&(b=parseInt(c[1].substr(0,1),10))));return d+b};function ha(a,b){this.c=a;this.f=a.m.document.documentElement;this.h=b;this.a=new G("-");this.j=!1!==b.events;this.g=!1!==b.classes}function ia(a){a.g&&w(a.f,[a.a.c("wf","loading")]);L(a,"loading")}function M(a){if(a.g){var b=y(a.f,a.a.c("wf","active")),d=[],c=[a.a.c("wf","loading")];b||d.push(a.a.c("wf","inactive"));w(a.f,d,c)}L(a,"inactive")}function L(a,b,d){if(a.j&&a.h[b])if(d)a.h[b](d.c,K(d));else a.h[b]()};function ja(){this.c={}}function ka(a,b,d){var c=[],e;for(e in b)if(b.hasOwnProperty(e)){var f=a.c[e];f&&c.push(f(b[e],d))}return c};function N(a,b){this.c=a;this.f=b;this.a=t(this.c,"span",{"aria-hidden":"true"},this.f)}function O(a){u(a.c,"body",a.a)}function P(a){return"display:block;position:absolute;top:-9999px;left:-9999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:"+J(a.c)+";"+("font-style:"+I(a)+";font-weight:"+(a.f+"00")+";")};function Q(a,b,d,c,e,f){this.g=a;this.j=b;this.a=c;this.c=d;this.f=e||3E3;this.h=f||void 0}Q.prototype.start=function(){var a=this.c.m.document,b=this,d=q(),c=new Promise(function(c,e){function k(){q()-d>=b.f?e():a.fonts.load(fa(b.a),b.h).then(function(a){1<=a.length?c():setTimeout(k,25)},function(){e()})}k()}),e=new Promise(function(a,c){setTimeout(c,b.f)});Promise.race([e,c]).then(function(){b.g(b.a)},function(){b.j(b.a)})};function R(a,b,d,c,e,f,g){this.v=a;this.B=b;this.c=d;this.a=c;this.s=g||"BESbswy";this.f={};this.w=e||3E3;this.u=f||null;this.o=this.j=this.h=this.g=null;this.g=new N(this.c,this.s);this.h=new N(this.c,this.s);this.j=new N(this.c,this.s);this.o=new N(this.c,this.s);a=new H(this.a.c+",serif",K(this.a));a=P(a);this.g.a.style.cssText=a;a=new H(this.a.c+",sans-serif",K(this.a));a=P(a);this.h.a.style.cssText=a;a=new H("serif",K(this.a));a=P(a);this.j.a.style.cssText=a;a=new H("sans-serif",K(this.a));a=
P(a);this.o.a.style.cssText=a;O(this.g);O(this.h);O(this.j);O(this.o)}var S={D:"serif",C:"sans-serif"},T=null;function U(){if(null===T){var a=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);T=!!a&&(536>parseInt(a[1],10)||536===parseInt(a[1],10)&&11>=parseInt(a[2],10))}return T}R.prototype.start=function(){this.f.serif=this.j.a.offsetWidth;this.f["sans-serif"]=this.o.a.offsetWidth;this.A=q();la(this)};
function ma(a,b,d){for(var c in S)if(S.hasOwnProperty(c)&&b===a.f[S[c]]&&d===a.f[S[c]])return!0;return!1}function la(a){var b=a.g.a.offsetWidth,d=a.h.a.offsetWidth,c;(c=b===a.f.serif&&d===a.f["sans-serif"])||(c=U()&&ma(a,b,d));c?q()-a.A>=a.w?U()&&ma(a,b,d)&&(null===a.u||a.u.hasOwnProperty(a.a.c))?V(a,a.v):V(a,a.B):na(a):V(a,a.v)}function na(a){setTimeout(p(function(){la(this)},a),50)}function V(a,b){setTimeout(p(function(){v(this.g.a);v(this.h.a);v(this.j.a);v(this.o.a);b(this.a)},a),0)};function W(a,b,d){this.c=a;this.a=b;this.f=0;this.o=this.j=!1;this.s=d}var X=null;W.prototype.g=function(a){var b=this.a;b.g&&w(b.f,[b.a.c("wf",a.c,K(a).toString(),"active")],[b.a.c("wf",a.c,K(a).toString(),"loading"),b.a.c("wf",a.c,K(a).toString(),"inactive")]);L(b,"fontactive",a);this.o=!0;oa(this)};
W.prototype.h=function(a){var b=this.a;if(b.g){var d=y(b.f,b.a.c("wf",a.c,K(a).toString(),"active")),c=[],e=[b.a.c("wf",a.c,K(a).toString(),"loading")];d||c.push(b.a.c("wf",a.c,K(a).toString(),"inactive"));w(b.f,c,e)}L(b,"fontinactive",a);oa(this)};function oa(a){0==--a.f&&a.j&&(a.o?(a=a.a,a.g&&w(a.f,[a.a.c("wf","active")],[a.a.c("wf","loading"),a.a.c("wf","inactive")]),L(a,"active")):M(a.a))};function pa(a){this.j=a;this.a=new ja;this.h=0;this.f=this.g=!0}pa.prototype.load=function(a){this.c=new ca(this.j,a.context||this.j);this.g=!1!==a.events;this.f=!1!==a.classes;qa(this,new ha(this.c,a),a)};
function ra(a,b,d,c,e){var f=0==--a.h;(a.f||a.g)&&setTimeout(function(){var a=e||null,k=c||null||{};if(0===d.length&&f)M(b.a);else{b.f+=d.length;f&&(b.j=f);var h,m=[];for(h=0;h<d.length;h++){var l=d[h],n=k[l.c],r=b.a,x=l;r.g&&w(r.f,[r.a.c("wf",x.c,K(x).toString(),"loading")]);L(r,"fontloading",x);r=null;null===X&&(X=window.FontFace?(x=/Gecko.*Firefox\/(\d+)/.exec(window.navigator.userAgent))?42<parseInt(x[1],10):!0:!1);X?r=new Q(p(b.g,b),p(b.h,b),b.c,l,b.s,n):r=new R(p(b.g,b),p(b.h,b),b.c,l,b.s,a,
n);m.push(r)}for(h=0;h<m.length;h++)m[h].start()}},0)}function qa(a,b,d){var c=[],e=d.timeout;ia(b);var c=ka(a.a,d,a.c),f=new W(a.c,b,e);a.h=c.length;b=0;for(d=c.length;b<d;b++)c[b].load(function(b,c,d){ra(a,f,b,c,d)})};function sa(a,b){this.c=a;this.a=b}function ta(a,b,d){var c=z(a.c);a=(a.a.api||"fast.fonts.net/jsapi").replace(/^.*http(s?):(\/\/)?/,"");return c+"//"+a+"/"+b+".js"+(d?"?v="+d:"")}
sa.prototype.load=function(a){function b(){if(e["__mti_fntLst"+d]){var c=e["__mti_fntLst"+d](),g=[],k;if(c)for(var h=0;h<c.length;h++){var m=c[h].fontfamily;void 0!=c[h].fontStyle&&void 0!=c[h].fontWeight?(k=c[h].fontStyle+c[h].fontWeight,g.push(new H(m,k))):g.push(new H(m))}a(g)}else setTimeout(function(){b()},50)}var d=this.a.projectId,c=this.a.version;if(d){var e=this.c.m;B(this.c,ta(this,d,c),function(c){c?a([]):b()}).id="__MonotypeAPIScript__"+d}else a([])};function ua(a,b){this.c=a;this.a=b}ua.prototype.load=function(a){var b,d,c=this.a.urls||[],e=this.a.families||[],f=this.a.testStrings||{},g=new C;b=0;for(d=c.length;b<d;b++)A(this.c,c[b],D(g));var k=[];b=0;for(d=e.length;b<d;b++)if(c=e[b].split(":"),c[1])for(var h=c[1].split(","),m=0;m<h.length;m+=1)k.push(new H(c[0],h[m]));else k.push(new H(c[0]));F(g,function(){a(k,f)})};function va(a,b,d){a?this.c=a:this.c=b+wa;this.a=[];this.f=[];this.g=d||""}var wa="//fonts.googleapis.com/css";function xa(a,b){for(var d=b.length,c=0;c<d;c++){var e=b[c].split(":");3==e.length&&a.f.push(e.pop());var f="";2==e.length&&""!=e[1]&&(f=":");a.a.push(e.join(f))}}
function ya(a){if(0==a.a.length)throw Error("No fonts to load!");if(-1!=a.c.indexOf("kit="))return a.c;for(var b=a.a.length,d=[],c=0;c<b;c++)d.push(a.a[c].replace(/ /g,"+"));b=a.c+"?family="+d.join("%7C");0<a.f.length&&(b+="&subset="+a.f.join(","));0<a.g.length&&(b+="&text="+encodeURIComponent(a.g));return b};function za(a){this.f=a;this.a=[];this.c={}}
var Aa={latin:"BESbswy",cyrillic:"\u0439\u044f\u0416",greek:"\u03b1\u03b2\u03a3",khmer:"\u1780\u1781\u1782",Hanuman:"\u1780\u1781\u1782"},Ba={thin:"1",extralight:"2","extra-light":"2",ultralight:"2","ultra-light":"2",light:"3",regular:"4",book:"4",medium:"5","semi-bold":"6",semibold:"6","demi-bold":"6",demibold:"6",bold:"7","extra-bold":"8",extrabold:"8","ultra-bold":"8",ultrabold:"8",black:"9",heavy:"9",l:"3",r:"4",b:"7"},Ca={i:"i",italic:"i",n:"n",normal:"n"},Da=/^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$/;
function Ea(a){for(var b=a.f.length,d=0;d<b;d++){var c=a.f[d].split(":"),e=c[0].replace(/\+/g," "),f=["n4"];if(2<=c.length){var g;var k=c[1];g=[];if(k)for(var k=k.split(","),h=k.length,m=0;m<h;m++){var l;l=k[m];if(l.match(/^[\w-]+$/)){var n=Da.exec(l.toLowerCase());if(null==n)l="";else{l=n[2];l=null==l||""==l?"n":Ca[l];n=n[1];if(null==n||""==n)n="4";else var r=Ba[n],n=r?r:isNaN(n)?"4":n.substr(0,1);l=[l,n].join("")}}else l="";l&&g.push(l)}0<g.length&&(f=g);3==c.length&&(c=c[2],g=[],c=c?c.split(","):
g,0<c.length&&(c=Aa[c[0]])&&(a.c[e]=c))}a.c[e]||(c=Aa[e])&&(a.c[e]=c);for(c=0;c<f.length;c+=1)a.a.push(new H(e,f[c]))}};function Fa(a,b){this.c=a;this.a=b}var Ga={Arimo:!0,Cousine:!0,Tinos:!0};Fa.prototype.load=function(a){var b=new C,d=this.c,c=new va(this.a.api,z(d),this.a.text),e=this.a.families;xa(c,e);var f=new za(e);Ea(f);A(d,ya(c),D(b));F(b,function(){a(f.a,f.c,Ga)})};function Ha(a,b){this.c=a;this.a=b}Ha.prototype.load=function(a){var b=this.a.id,d=this.c.m;b?B(this.c,(this.a.api||"https://use.typekit.net")+"/"+b+".js",function(b){if(b)a([]);else if(d.Typekit&&d.Typekit.config&&d.Typekit.config.fn){b=d.Typekit.config.fn;for(var e=[],f=0;f<b.length;f+=2)for(var g=b[f],k=b[f+1],h=0;h<k.length;h++)e.push(new H(g,k[h]));try{d.Typekit.load({events:!1,classes:!1,async:!0})}catch(m){}a(e)}},2E3):a([])};function Ia(a,b){this.c=a;this.f=b;this.a=[]}Ia.prototype.load=function(a){var b=this.f.id,d=this.c.m,c=this;b?(d.__webfontfontdeckmodule__||(d.__webfontfontdeckmodule__={}),d.__webfontfontdeckmodule__[b]=function(b,d){for(var g=0,k=d.fonts.length;g<k;++g){var h=d.fonts[g];c.a.push(new H(h.name,ga("font-weight:"+h.weight+";font-style:"+h.style)))}a(c.a)},B(this.c,z(this.c)+(this.f.api||"//f.fontdeck.com/s/css/js/")+ea(this.c)+"/"+b+".js",function(b){b&&a([])})):a([])};var Y=new pa(window);Y.a.c.custom=function(a,b){return new ua(b,a)};Y.a.c.fontdeck=function(a,b){return new Ia(b,a)};Y.a.c.monotype=function(a,b){return new sa(b,a)};Y.a.c.typekit=function(a,b){return new Ha(b,a)};Y.a.c.google=function(a,b){return new Fa(b,a)};var Z={load:p(Y.load,Y)};"function"===typeof define&&define.amd?define(function(){return Z}):"undefined"!==typeof module&&module.exports?module.exports=Z:(window.WebFont=Z,window.WebFontConfig&&Y.load(window.WebFontConfig));}());

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var IWG;
(function (IWG) {
    var GameSignal = (function (_super) {
        __extends(GameSignal, _super);
        function GameSignal(signalName) {
            _super.call(this);
            this._signalID = null;
            this._signalActive = false;
            this._signalFired = false;
            this._listening = [];
            this._signalID = signalName;
            this._signalActive = false;
            this._signalFired = false;
            this._listening = [];
        }
        ;
        GameSignal.prototype.add = function (listener, listeningContext, priority) {
            if (listeningContext === void 0) { listeningContext = null; }
            if (priority === void 0) { priority = 0; }
            var args = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                args[_i - 3] = arguments[_i];
            }
            this._signalActive = true;
            this._listening.push(listeningContext);
            return _super.prototype.add.apply(this, [listener, listeningContext, priority].concat(args));
        };
        ;
        GameSignal.prototype.remove = function (listener, listeningContext) {
            this._listening.splice(this._listening.indexOf(listeningContext), 1);
            if (this.getNumListeners() === 0) {
                this._signalActive = false;
            }
            return _super.prototype.remove.call(this, listener, listeningContext);
        };
        ;
        GameSignal.prototype.dispatch = function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i - 0] = arguments[_i];
            }
            this._signalFired = true;
            _super.prototype.dispatch.apply(this, params);
        };
        Object.defineProperty(GameSignal.prototype, "ID", {
            get: function () {
                return this._signalID;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(GameSignal.prototype, "inUse", {
            get: function () {
                return this._signalActive;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(GameSignal.prototype, "hasFired", {
            get: function () {
                return this._signalFired;
            },
            enumerable: true,
            configurable: true
        });
        ;
        GameSignal.prototype.getListeningContexts = function () {
            var retString = '';
            this._listening.forEach(function (context) {
                var funcNameRegex = /function (.{1,})\(/;
                var results = (funcNameRegex).exec(context["constructor"].toString());
                var name = (results && results.length > 1) ? results[1] : "";
                retString += name;
                retString += ", ";
            });
            retString += ".";
            return retString.replace(', .', '.');
        };
        ;
        return GameSignal;
    }(Phaser.Signal));
    IWG.GameSignal = GameSignal;
})(IWG || (IWG = {}));
var IWG;
(function (IWG) {
    var SignalManager = (function () {
        function SignalManager() {
            this._signalArray = null;
            if (SignalManager.instance != null) {
                throw new Error("Tried to make a signal manager when one already existed. To use SignalManager, use SignalManager.instance.");
            }
            else {
                SignalManager.instance = this;
                this._signalArray = [];
                IWG.Debug.instance.log("Signal Manager has been initialised and added.", IWG.DEBUGTYPE.INIT, this);
            }
        }
        ;
        SignalManager.prototype.add = function (addID, listener, listeningContext, priority) {
            if (listeningContext === void 0) { listeningContext = null; }
            if (priority === void 0) { priority = 0; }
            var args = [];
            for (var _i = 4; _i < arguments.length; _i++) {
                args[_i - 4] = arguments[_i];
            }
            var added = false;
            this._signalArray.forEach(function (signal) {
                if (signal.ID === addID) {
                    signal.add(listener, listeningContext, priority, args);
                    added = true;
                }
            });
            if (!added) {
                var newSignal = new IWG.GameSignal(addID);
                this._signalArray.push(newSignal);
                newSignal.add.apply(newSignal, [listener, listeningContext, priority].concat(args));
                return true;
            }
            else {
                return false;
            }
        };
        ;
        SignalManager.prototype.remove = function (removeID, listener, listeningContext) {
            if (listeningContext === void 0) { listeningContext = null; }
            this._signalArray.forEach(function (signal) {
                if (signal.ID === removeID) {
                    signal.remove(listener, listeningContext);
                    return true;
                }
            });
            return false;
        };
        ;
        SignalManager.prototype.dispatch = function (dispatchID) {
            var params = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                params[_i - 1] = arguments[_i];
            }
            this._signalArray.forEach(function (signal) {
                if (signal.ID === dispatchID) {
                    signal.dispatch.apply(signal, params);
                    return true;
                }
            });
            return false;
        };
        ;
        SignalManager.prototype.get = function (getID) {
            var ret = null;
            this._signalArray.forEach(function (signal) {
                if (signal.ID === getID) {
                    ret = signal;
                }
            });
            return ret;
        };
        ;
        SignalManager.prototype.checkAllSignals = function () {
            var _this = this;
            this._signalArray.forEach(function (signal) {
                IWG.Debug.instance.log("ID: " + signal.ID + "\nActive: " + signal.inUse + "\nFired: " + signal.hasFired + "\nListening in: " + signal.getListeningContexts(), IWG.DEBUGTYPE.DEBUG, _this);
            });
        };
        ;
        SignalManager.instance = null;
        return SignalManager;
    }());
    IWG.SignalManager = SignalManager;
})(IWG || (IWG = {}));
var IWG;
(function (IWG) {
    var TicketManager = (function () {
        function TicketManager() {
        }
        TicketManager.prototype.reset = function () {
            this._ticket = null;
        };
        TicketManager.prototype.setTicket = function (objIn) {
            this._ticket = objIn;
        };
        TicketManager.prototype.getTicket = function () {
            return this._ticket;
        };
        TicketManager.prototype.getIsTrialGame = function () {
            return this._ticket.outcome.try == 1 ? true : false;
        };
        TicketManager.prototype.getStake = function () {
            return this._ticket.params.stake;
        };
        TicketManager.prototype.getIsWinner = function () {
            if (this._ticket.params.wT === 1) {
                return true;
            }
            else {
                return false;
            }
        };
        TicketManager.prototype.getTotalAmount = function () {
            return this._ticket.outcome.amount;
        };
        TicketManager.prototype.getGameOneTurn = function (turnNumber) {
            return this._ticket.turns.g1[turnNumber];
        };
        TicketManager.prototype.validate = function () {
            var totalWinValue = 0;
            var winCount = 0;
            var winPrize = -1;
            var symbols = [];
            console.log(this._ticket);
            if (this.getIsWinner()) {
                if (this._ticket.outcome.amount === 0) {
                    return false;
                }
                for (var i = 0; i < this._ticket.turns.g1.length; i++) {
                    if (this._ticket.turns.g1[i].w === 1) {
                        if (winCount === 0) {
                            totalWinValue += this._ticket.turns.g1[i].value;
                        }
                        if (winPrize === -1) {
                            winPrize = this._ticket.turns.g1[i].value;
                        }
                        winCount++;
                    }
                }
                for (var i = 0; i < this._ticket.turns.g1.length; i++) {
                    if (winPrize != this._ticket.turns.g1[i].value && this._ticket.turns.g1[i].w === 1) {
                        return false;
                    }
                }
                if (winCount !== 3) {
                    return false;
                }
            }
            else {
                if (this._ticket.outcome.amount !== 0) {
                    return false;
                }
                for (var i = 0; i < this._ticket.turns.g1.length; i++) {
                    symbols.push(this._ticket.turns.g1[i].value);
                    if (this._ticket.turns.g1[i].w === 1) {
                        return false;
                    }
                }
                symbols.sort(function (a, b) { return a - b; });
                for (var i = 0; i < symbols.length - 2; i++) {
                    if (symbols[i] != undefined && symbols[i + 1] != undefined && symbols[i + 2] != undefined) {
                        if (symbols[i] === symbols[i + 1] && symbols[i + 1] === symbols[i + 2]) {
                            return false;
                        }
                    }
                }
            }
            if (totalWinValue !== this._ticket.outcome.amount) {
                console.log(totalWinValue, this._ticket.outcome.amount);
                return false;
            }
            return true;
        };
        return TicketManager;
    }());
    IWG.TicketManager = TicketManager;
})(IWG || (IWG = {}));
var IWG;
(function (IWG) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
            this._horizontalHeight = 0;
            this.gameLoaded = false;
        }
        Boot.prototype.preload = function () {
            this.load.image('loadingScreen', './assets/img/loadingScreen.png');
            this.load.image('horse', './assets/img/horse.png');
            this.load.image('box', './assets/img/box.png');
            this.load.json("langConfig", "./js/langConfig.json");
        };
        Boot.prototype.create = function () {
            IWG.LanguageCurrencyManager.instance.init(this.cache.getJSON("langConfig"), "en", "GBP", false, false);
            IWG.Debug.instance.log("Boot created", IWG.DEBUGTYPE.INIT, this);
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.pageAlignVertically = true;
            this.scale.refresh();
            this.game.time.desiredFps = 60;
            this.game.tweens.frameBased = true;
            if (this.game.device.desktop) {
            }
            else {
                IWG.DeviceManager.instance.fullscreen = true;
                IWG.DeviceManager.instance.orientation = true;
            }
            IWG.DeviceManager.instance.init();
            IWG.DeviceManager.instance.update();
            var font = {
                google: {
                    families: ['Cabin Sketch::latin', 'Quattrocento::latin', 'Noto+Sans:400,700:latin']
                },
                active: function () {
                    IWG.SignalManager.instance.dispatch('states.SwitchState', 'Preloader');
                },
                timeout: 5000,
                inactive: function () {
                    IWG.Debug.instance.error("font could not be loaded :C", IWG.DEBUGTYPE.ERROR);
                    IWG.SignalManager.instance.dispatch('states.SwitchState', 'Preloader');
                }
            };
            WebFont.load(font);
        };
        return Boot;
    }(Phaser.State));
    IWG.Boot = Boot;
})(IWG || (IWG = {}));
var IWG;
(function (IWG) {
    var Sounds = (function () {
        function Sounds() {
        }
        Sounds.SOUND_IDS = "soundID";
        Sounds.BACKGROUNDLOOP = 'backgroundLoop';
        Sounds.CLICK = 'click';
        Sounds.ROLLOVER = 'rollover';
        Sounds.PLAYBUTTON = 'playButton';
        Sounds.GUNSHOT = 'gunShot';
        Sounds.PRIZEREVEAL = 'prizeReveal';
        Sounds.BONUSKEY = 'bonusKey';
        Sounds.EAGLEFLY = 'eagleFly';
        Sounds.ENDWIN = 'endWin';
        Sounds.ENDLOSE = 'endLose';
        Sounds.MULTIPLER = 'multiplierWin';
        Sounds.JAILDOOR = 'jailDoor';
        Sounds.ROWWIN = 'rowWin';
        Sounds.SWOOSH = 'swoosh';
        Sounds.MEGASWOOSH = 'mega_swoosh';
        Sounds.COUNT = 'count';
        Sounds.KERCHING = 'kerching';
        return Sounds;
    }());
    IWG.Sounds = Sounds;
    ;
    var SoundChannels = (function () {
        function SoundChannels() {
        }
        SoundChannels.BACKGROUND = 'background';
        SoundChannels.FX_SOUNDS = 'fx_sounds';
        return SoundChannels;
    }());
    IWG.SoundChannels = SoundChannels;
    ;
    var GameSoundChannel = (function () {
        function GameSoundChannel(name, initialVolume) {
            this._name = name;
            this._sounds = new collections.LinkedDictionary();
            this._volume = initialVolume;
            this._desiredVolume = initialVolume;
        }
        GameSoundChannel.prototype.addGameSound = function (sound) {
            this._sounds.setValue(sound.getName(), sound);
        };
        GameSoundChannel.prototype.getGameSound = function (soundName) {
            return this._sounds.getValue(soundName);
        };
        GameSoundChannel.prototype.getGameSounds = function () {
            return this._sounds.values();
        };
        GameSoundChannel.prototype.getName = function () {
            return this._name;
        };
        GameSoundChannel.prototype.setName = function (value) {
            this._name = value;
        };
        GameSoundChannel.prototype.getVolume = function () {
            return this._volume;
        };
        GameSoundChannel.prototype.setIsMuted = function (value) {
            this._isMuted = value;
        };
        GameSoundChannel.prototype.getIsMuted = function () {
            return this._isMuted;
        };
        GameSoundChannel.prototype.setVolume = function (volume) {
            this._volume = volume;
            if (this._isMuted) {
                this._desiredVolume = volume;
            }
            else {
                this._volume = volume;
                var values = this._sounds.values();
                for (var i = 0; i < values.length; i++) {
                    values[i].setCurrentVolume(volume);
                }
            }
        };
        GameSoundChannel.prototype.mute = function (value) {
            this._isMuted = value;
            var values = this._sounds.values();
            for (var i = 0; i < values.length; i++) {
                if (value) {
                    this._desiredVolume = values[i].getCurrentVolume();
                    values[i].setCurrentVolume(0);
                }
                else {
                    values[i].setCurrentVolume(this._desiredVolume);
                }
            }
        };
        return GameSoundChannel;
    }());
    var GameSound = (function () {
        function GameSound(game, name, channel, maxVolume, isLoop, initialVolume, allowMultiple) {
            this._name = name;
            this._channel = channel;
            maxVolume === undefined ? this._maxVolume = maxVolume : this._maxVolume = maxVolume;
            initialVolume === undefined ? this._currentVolume = maxVolume : this._currentVolume = initialVolume;
            isLoop === undefined ? this._isLoop = false : this._isLoop = isLoop;
            allowMultiple === undefined ? this._allowMultiple = true : this._allowMultiple = allowMultiple;
            this._sound = new Phaser.Sound(game, name, this._currentVolume, isLoop);
        }
        GameSound.prototype.getName = function () {
            return this._name;
        };
        GameSound.prototype.setName = function (value) {
            this._name = value;
        };
        GameSound.prototype.getMaxVolume = function () {
            return this._maxVolume;
        };
        GameSound.prototype.setMaxVolume = function (value) {
            this._maxVolume = value;
        };
        GameSound.prototype.getCurrentVolume = function () {
            return this._currentVolume;
        };
        GameSound.prototype.setCurrentVolume = function (volume) {
            this._currentVolume = this._maxVolume * volume;
            this._sound.volume = this._currentVolume;
        };
        GameSound.prototype.setDesiredVolume = function (volume) {
            this._currentVolume = this._maxVolume * volume;
        };
        GameSound.prototype.getChannel = function () {
            return this._channel;
        };
        GameSound.prototype.setChannel = function (value) {
            this._channel = value;
        };
        GameSound.prototype.isLoop = function () {
            return this._isLoop;
        };
        GameSound.prototype.setIsLoop = function (value) {
            this._isLoop = value;
        };
        GameSound.prototype.getSound = function () {
            return this._sound;
        };
        GameSound.prototype.setSound = function (value) {
            this._sound = value;
        };
        GameSound.prototype.getAllowMultiple = function () {
            return this._allowMultiple;
        };
        GameSound.prototype.setAllowMultiple = function (value) {
            this._allowMultiple = value;
        };
        return GameSound;
    }());
    var AudioManager = (function () {
        function AudioManager(game) {
            this._currentlyPlayingBGMusic = null;
            this._game = game;
            this._soundChannels = new collections.LinkedDictionary();
            this._subscribeSignals();
            IWG.Debug.instance.log("Audio Manager has been initialised and added.", IWG.DEBUGTYPE.INIT, this);
        }
        ;
        AudioManager.prototype._subscribeSignals = function () {
            IWG.SignalManager.instance.add(AudioManager.PLAY_AUDIO, this._playAudio, this);
            IWG.SignalManager.instance.add(AudioManager.STOP_AUDIO, this._stopAudio, this);
            IWG.SignalManager.instance.add(AudioManager.SET_CHANNEL_VOLUME, this._setChannelVolume, this);
            IWG.SignalManager.instance.add(AudioManager.MUTE_ALL_CHANNELS, this._muteAudio, this);
        };
        ;
        AudioManager.prototype._unsubscribeSignals = function () {
            IWG.SignalManager.instance.remove(AudioManager.PLAY_AUDIO, this._playAudio, this);
            IWG.SignalManager.instance.remove(AudioManager.STOP_AUDIO, this._stopAudio, this);
            IWG.SignalManager.instance.remove(AudioManager.SET_CHANNEL_VOLUME, this._setChannelVolume, this);
            IWG.SignalManager.instance.remove(AudioManager.MUTE_ALL_CHANNELS, this._muteAudio, this);
        };
        ;
        AudioManager.prototype.addSoundChannel = function (channelName, initialVolume) {
            var soundChannel = new GameSoundChannel(channelName, initialVolume);
            this._soundChannels.setValue(channelName, soundChannel);
        };
        ;
        AudioManager.prototype.addSound = function (game, soundName, channelName, maxVolume, isLoop, initialVolume, allowMultiple) {
            var sound = new GameSound(this._game, soundName, channelName, maxVolume, isLoop, initialVolume, allowMultiple);
            var soundChannel = this._soundChannels.getValue(channelName);
            soundChannel.addGameSound(sound);
        };
        ;
        AudioManager.prototype._setChannelVolume = function (channelName, volume, isFade, duration) {
            var soundChannel = this._soundChannels.getValue(channelName);
            var gameSounds = soundChannel.getGameSounds();
            if (!this._isMuted) {
                for (var i = 0; i < gameSounds.length; i++) {
                    var gameSound = gameSounds[i];
                    if (isFade) {
                        var tween = this._game.add.tween(gameSound.getSound()).to({ volume: volume }, duration, Phaser.Easing.Linear.None);
                        tween.onComplete.add(function () {
                            gameSound.setCurrentVolume(volume);
                        }, this);
                        tween.start();
                    }
                    else {
                        gameSound.setCurrentVolume(volume);
                    }
                }
            }
            else {
                for (var i = 0; i < gameSounds.length; i++) {
                    var gameSound = gameSounds[i];
                    gameSound.setDesiredVolume(volume);
                }
            }
        };
        ;
        AudioManager.prototype._stopAllSounds = function () {
            var soundChannel = this._soundChannels.getValue(SoundChannels.FX_SOUNDS);
            if (soundChannel != null) {
                var gameSounds = soundChannel.getGameSounds();
                for (var i = 0; i < gameSounds.length; i++) {
                    gameSounds[i].getSound().stop();
                }
                ;
            }
            soundChannel = this._soundChannels.getValue(SoundChannels.BACKGROUND);
            if (soundChannel != null) {
                gameSounds = soundChannel.getGameSounds();
                for (var i = 0; i < gameSounds.length; i++) {
                    gameSounds[i].getSound().stop();
                }
                ;
            }
        };
        AudioManager.prototype._stopAudio = function (soundName, channelName, isFadeOut, duration, delay) {
            var _this = this;
            var gameSound = this._soundChannels.getValue(channelName).getGameSound(soundName);
            if (sound != null) {
                var sound = gameSound.getSound();
                sound.volume = gameSound.getCurrentVolume();
                if (isFadeOut) {
                    var step = { value: 1 };
                    var fadeOutTween = this._game.make.tween(step).to({ value: 0 }, duration, Phaser.Easing.Linear.None, true, delay);
                    fadeOutTween.onUpdateCallback(function () {
                        sound.volume = _this._currentMusicVolume * step.value;
                    }, this);
                    fadeOutTween.onComplete.add(function () {
                        sound.stop();
                    }, this);
                }
                else {
                    if (delay !== undefined) {
                        var t = this._game.time.create(true);
                        t.add(delay, function () {
                            sound.stop();
                        }, this);
                        t.start();
                    }
                    else {
                        sound.stop();
                    }
                }
            }
        };
        AudioManager.prototype._playAudio = function (soundName, channelName, isFadeIn, duration, delay) {
            var _this = this;
            if ((channelName === SoundChannels.BACKGROUND)) {
                this._currentlyPlayingBGMusic = soundName;
            }
            var gameSound = this._soundChannels.getValue(channelName).getGameSound(soundName);
            var sound = gameSound.getSound();
            sound.volume = gameSound.getCurrentVolume();
            sound.allowMultiple = gameSound.getAllowMultiple();
            if (isFadeIn) {
                sound.volume = 0;
                sound.play();
                var step = { value: 0 };
                var fadeInTween = this._game.make.tween(step).to({ value: 1 }, duration, Phaser.Easing.Linear.None, true, delay);
                fadeInTween.onUpdateCallback(function () {
                    sound.volume = _this._currentMusicVolume * step.value;
                }, this);
            }
            else {
                if (delay !== undefined) {
                    var t = this._game.time.create(true);
                    t.add(delay, function () {
                        sound.play();
                    }, this);
                    t.start();
                }
                else {
                    sound.play();
                }
            }
        };
        ;
        AudioManager.prototype._musicCrossFade = function (soundname) {
            var _this = this;
            var gameSound = this._soundChannels.getValue(SoundChannels.BACKGROUND).getGameSound(this._currentlyPlayingBGMusic);
            var sound;
            var isASound = false;
            if (gameSound != null) {
                sound = gameSound.getSound();
                isASound = true;
            }
            var step = { value: 1 };
            var fadeOutTween = this._game.make.tween(step).to({ value: 0 }, 1500, Phaser.Easing.Linear.None, true, 0);
            fadeOutTween.onUpdateCallback(function () {
                if (isASound) {
                    sound.volume = _this._currentMusicVolume * step.value;
                }
            }, this);
            fadeOutTween.onComplete.add(function () {
                if (isASound) {
                    sound.stop();
                }
                _this._currentlyPlayingBGMusic = soundname;
                var gameSound = _this._soundChannels.getValue(SoundChannels.BACKGROUND).getGameSound(soundname);
                var sound2 = gameSound.getSound();
                sound2.volume = 0;
                sound2.play();
                var step = { value: 0 };
                var fadeInTween = _this._game.make.tween(step).to({ value: 1 }, 1500, Phaser.Easing.Linear.None, true, 0);
                fadeInTween.onUpdateCallback(function () {
                    sound2.volume = _this._currentMusicVolume * step.value;
                }, _this);
            }, this);
        };
        AudioManager.prototype._muteAudioChannels = function (mute) {
            var channelNames = this._soundChannels.keys();
            for (var i = 0; i < channelNames.length; i++) {
                var soundChannel = this._soundChannels.getValue(channelNames[i]);
                soundChannel.mute(mute);
            }
        };
        AudioManager.prototype._muteAudio = function () {
            if (!this._isMuted) {
                this._isMuted = true;
                this._muteAudioChannels(true);
            }
            else {
                this._isMuted = false;
                this._muteAudioChannels(false);
            }
        };
        AudioManager.PLAY_AUDIO = "Audio.playAudio";
        AudioManager.STOP_AUDIO = "Audio.stopAudio";
        AudioManager.SET_CHANNEL_VOLUME = "Audio.setChannelVolume";
        AudioManager.MUTE_ALL_CHANNELS = "Audio.muteAll";
        return AudioManager;
    }());
    IWG.AudioManager = AudioManager;
})(IWG || (IWG = {}));
var IWG;
(function (IWG) {
    var GameGroup = (function (_super) {
        __extends(GameGroup, _super);
        function GameGroup() {
            _super.call(this, IWG.GameManager.instance);
            this.subscribeSignals();
            this._addStateSwitch();
        }
        GameGroup.prototype.subscribeSignals = function () {
        };
        ;
        GameGroup.prototype.unsubscribeSignals = function () {
        };
        ;
        GameGroup.prototype._addStateSwitch = function () {
            IWG.SignalManager.instance.add('states.SwitchState', this._onStateSwitch, this);
        };
        GameGroup.prototype._onStateSwitch = function () {
            this.destroy();
        };
        GameGroup.prototype.destroy = function () {
            this.unsubscribeSignals();
            IWG.SignalManager.instance.remove('states.SwitchState', this._onStateSwitch, this);
            _super.prototype.destroy.call(this, true, false);
        };
        ;
        return GameGroup;
    }(Phaser.Group));
    IWG.GameGroup = GameGroup;
    var GameState = (function (_super) {
        __extends(GameState, _super);
        function GameState() {
            _super.call(this);
        }
        GameState.prototype.subscribeSignals = function () {
        };
        ;
        GameState.prototype.unsubscribeSignals = function () {
        };
        ;
        GameState.prototype._addStateSwitch = function () {
            IWG.SignalManager.instance.add('states.SwitchState', this._onStateSwitch, this);
        };
        GameState.prototype._onStateSwitch = function () {
            this.destroy();
        };
        GameState.prototype.destroy = function () {
            this.unsubscribeSignals();
            IWG.SignalManager.instance.remove('states.SwitchState', this._onStateSwitch, this);
        };
        ;
        GameState.prototype.create = function () {
            this._addStateSwitch();
            this.subscribeSignals();
        };
        return GameState;
    }(Phaser.State));
    IWG.GameState = GameState;
    var NonDisplayObject = (function () {
        function NonDisplayObject() {
            this.subscribeSignals();
            this._addStateSwitch();
        }
        NonDisplayObject.prototype.subscribeSignals = function () {
        };
        ;
        NonDisplayObject.prototype.unsubscribeSignals = function () {
        };
        ;
        NonDisplayObject.prototype._addStateSwitch = function () {
            IWG.SignalManager.instance.add('states.SwitchState', this._onStateSwitch, this);
        };
        NonDisplayObject.prototype._onStateSwitch = function () {
            this.destroy();
        };
        NonDisplayObject.prototype.destroy = function () {
            this.unsubscribeSignals();
            IWG.SignalManager.instance.remove('states.SwitchState', this._onStateSwitch, this);
        };
        ;
        return NonDisplayObject;
    }());
    IWG.NonDisplayObject = NonDisplayObject;
})(IWG || (IWG = {}));
var IWG;
(function (IWG) {
    (function (TimerInteractionStatus) {
        TimerInteractionStatus[TimerInteractionStatus["startOrReset"] = 0] = "startOrReset";
        TimerInteractionStatus[TimerInteractionStatus["stop"] = 1] = "stop";
    })(IWG.TimerInteractionStatus || (IWG.TimerInteractionStatus = {}));
    var TimerInteractionStatus = IWG.TimerInteractionStatus;
    var IdleClass = (function (_super) {
        __extends(IdleClass, _super);
        function IdleClass() {
            _super.call(this);
            this.delayUntillIdle = null;
            this.delayUntillIdleTimeOut = null;
            this._idleEnabled = null;
            this._useTimeOut = false;
            this._timerReachedIdleStart = false;
            this._idleControlled = false;
            this._idleConroller = null;
        }
        IdleClass.prototype.coreIdleEvent = function () {
            if (this._idleEnabled) {
                this.replaceableIdleEvent();
            }
        };
        IdleClass.prototype.replaceableIdleEvent = function () {
        };
        IdleClass.prototype.coreStopIdleEvent = function () {
            if (this._idleEnabled) {
                this.replaceableStopIdleEvent();
            }
        };
        IdleClass.prototype.replaceableStopIdleEvent = function () {
        };
        IdleClass.prototype.coreIdleTimeOutEvent = function () {
            if (this._idleEnabled) {
                this.replaceableIdleTimeOutEvent();
            }
        };
        IdleClass.prototype.replaceableIdleTimeOutEvent = function () {
        };
        IdleClass.prototype.coreIdleInteruptedEvent = function () {
            if (this._idleEnabled) {
                this.replaceableIdleInteruptedEvent();
            }
        };
        IdleClass.prototype.replaceableIdleInteruptedEvent = function () {
        };
        IdleClass.prototype.coreBreakIdleIfActive = function () {
            if (this._idleEnabled) {
                if (!this._idleControlled) {
                    this.resetAndStartOrStopTimer(TimerInteractionStatus.stop);
                }
                else {
                    this._idleConroller.coreBreakIdleIfActive();
                }
            }
        };
        IdleClass.prototype.coreResumeIdleIfActive = function () {
            if (this._idleEnabled) {
                if (!this._idleControlled) {
                    this.resetAndStartOrStopTimer(TimerInteractionStatus.startOrReset);
                }
                else {
                    this._idleConroller.coreResumeIdleIfActive();
                }
            }
        };
        IdleClass.prototype.resetAndStartOrStopTimer = function (status) {
            var _this = this;
            if (this._idleTimer !== undefined) {
                this._idleTimer.destroy();
            }
            if (!this._idleControlled && this._idleEnabled) {
                if (this._timerReachedIdleStart) {
                    this.coreIdleInteruptedEvent();
                }
                this.coreStopIdleEvent();
                if (status == TimerInteractionStatus.startOrReset) {
                    this._idleTimer = IWG.GameManager.instance.time.create(true);
                    this._idleTimer.add(this.delayUntillIdle, function () {
                        _this.coreIdleEvent();
                        _this._timerReachedIdleStart = true;
                    });
                    if (this._useTimeOut) {
                        this._idleTimer.add(this.delayUntillIdleTimeOut, function () {
                            _this.resetAndStartOrStopTimer(TimerInteractionStatus.stop);
                            _this.coreIdleTimeOutEvent();
                        });
                    }
                    this._idleTimer.start();
                }
            }
            this._timerReachedIdleStart = false;
        };
        IdleClass.prototype.setIdleController = function (idleContoller, useIdleController) {
            if (useIdleController === void 0) { useIdleController = true; }
            this._idleConroller = idleContoller;
            this._idleConroller.addTooControlledIdlesArray(this);
            this.setIdleControlled(useIdleController);
        };
        IdleClass.prototype.setIdleControlled = function (value) {
            this._idleControlled = value;
            this.resetAndStartOrStopTimer(TimerInteractionStatus.stop);
        };
        IdleClass.prototype.getIdleControlled = function () {
            return this._idleControlled;
        };
        IdleClass.prototype.setTimerValues = function (delayUntillIdle, delayUntillIdleTimeOut) {
            this.delayUntillIdle = delayUntillIdle;
            this.delayUntillIdleTimeOut = delayUntillIdleTimeOut;
        };
        IdleClass.prototype.enableOrDisableIdleTimeOut = function (value) {
            this._useTimeOut = value;
        };
        IdleClass.prototype.getUseTimeOutStatus = function () {
            return this._useTimeOut;
        };
        IdleClass.prototype.enableOrDisableIdle = function (value) {
            this._idleEnabled = value;
            if (!this._idleEnabled) {
                this.resetAndStartOrStopTimer(TimerInteractionStatus.stop);
            }
        };
        IdleClass.prototype.getUseIdleStatus = function () {
            return this._idleEnabled;
        };
        IdleClass.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            if (this._idleTimer !== undefined) {
                this._idleTimer.destroy();
            }
        };
        IdleClass.prototype.removeSelfFromIdleControlerAndArray = function () {
            this.setIdleControlled(false);
            this._idleConroller.removeIdleClass(this);
            this._idleConroller = null;
        };
        IdleClass.prototype.stopTimerIdleAndRemoveFromController = function () {
            this.enableOrDisableIdle(false);
            this.removeSelfFromIdleControlerAndArray();
        };
        return IdleClass;
    }(IWG.NonDisplayObject));
    IWG.IdleClass = IdleClass;
})(IWG || (IWG = {}));
var IWG;
(function (IWG) {
    var SpriteInfo = (function () {
        function SpriteInfo() {
        }
        return SpriteInfo;
    }());
    IWG.SpriteInfo = SpriteInfo;
    var ButtonClass = (function (_super) {
        __extends(ButtonClass, _super);
        function ButtonClass(buttonParameters) {
            var _this = this;
            _super.call(this);
            this.buttonSprite = null;
            this.buttonText = null;
            this.inactivePromptTime = -1;
            this.activeTween = null;
            this.buttonEnabledStatus = null;
            this.buttonUpSpriteInfo = null;
            this.buttonDownSpriteInfo = null;
            this.buttonOverSpriteInfo = null;
            this.buttonDisabledSpriteInfo = null;
            this.idleClass = null;
            this._currentSpriteInfo = null;
            this._clickWasInButton = null;
            this._internalGroupScaler = null;
            this._OutsideTrigger = null;
            this._interactivityScaling = null;
            this._internalGroupScaler = new Phaser.Group(IWG.GameManager.instance, this);
            this.buttonSprite = IWG.GameManager.instance.make.sprite(0, 0);
            this.buttonSprite.anchor.set(0.5, 0.5);
            this._internalGroupScaler.add(this.buttonSprite);
            if (buttonParameters.useText === true) {
                if (buttonParameters.MyOwnTextObject !== undefined) {
                    this.buttonText = buttonParameters.MyOwnTextObject;
                    this._internalGroupScaler.add(this.buttonText);
                    this._internalGroupScaler.bringToTop(this.buttonText);
                }
                else {
                    this.buttonText = new Phaser.Text(IWG.GameManager.instance, 0, 0, "", {
                        font: "20px Arial",
                        align: "center"
                    });
                    this.buttonText.fill = '#FFF';
                    this.buttonText.anchor.set(0.5, 0.5);
                    this._internalGroupScaler.add(this.buttonText);
                    this._internalGroupScaler.bringToTop(this.buttonText);
                    if (buttonParameters.textMessage !== undefined) {
                        this.buttonText.text = buttonParameters.textMessage;
                    }
                }
            }
            if (buttonParameters.interactivityScaling !== undefined) {
                this._interactivityScaling = buttonParameters.interactivityScaling;
                if (this._interactivityScaling.mouseOver === undefined) {
                    this._interactivityScaling.mouseOver = new Phaser.Point(1.05, 1.05);
                }
                if (this._interactivityScaling.mouseDown === undefined) {
                    this._interactivityScaling.mouseDown = new Phaser.Point(0.95, 0.95);
                }
                if (this._interactivityScaling.disabledState === undefined) {
                    this._interactivityScaling.disabledState = new Phaser.Point(0.95, 0.95);
                }
            }
            else {
                this._interactivityScaling = ({
                    useInteractivityScaling: true,
                    mouseOver: new Phaser.Point(1.05, 1.05),
                    mouseDown: new Phaser.Point(0.95, 0.95),
                    disabledState: new Phaser.Point(0.95, 0.95)
                });
            }
            this._currentSpriteInfo = new SpriteInfo();
            this.buttonUpSpriteInfo = new SpriteInfo();
            this.buttonDownSpriteInfo = new SpriteInfo();
            this.buttonOverSpriteInfo = new SpriteInfo();
            this.buttonDisabledSpriteInfo = new SpriteInfo();
            if (buttonParameters.buttonUpSpriteSheetName !== undefined) {
                this.buttonUpSpriteInfo.spriteSheets = buttonParameters.buttonUpSpriteSheetName;
            }
            this.buttonUpSpriteInfo.frameName = buttonParameters.buttonUpStateImageName;
            (buttonParameters.buttonOverSpriteSheetName === undefined) ? this.buttonOverSpriteInfo.spriteSheets = buttonParameters.buttonUpSpriteSheetName :
                this.buttonOverSpriteInfo.spriteSheets = buttonParameters.buttonOverSpriteSheetName;
            (buttonParameters.buttonOverStateImageName === undefined) ? this.buttonOverSpriteInfo.frameName = buttonParameters.buttonUpStateImageName :
                this.buttonOverSpriteInfo.frameName = buttonParameters.buttonOverStateImageName;
            (buttonParameters.buttonDownSpriteSheetName === undefined) ? this.buttonDownSpriteInfo.spriteSheets = buttonParameters.buttonUpSpriteSheetName :
                this.buttonDownSpriteInfo.spriteSheets = buttonParameters.buttonDownSpriteSheetName;
            (buttonParameters.buttonDownStateImageName === undefined) ? this.buttonDownSpriteInfo.frameName = buttonParameters.buttonUpStateImageName :
                this.buttonDownSpriteInfo.frameName = buttonParameters.buttonDownStateImageName;
            (buttonParameters.buttonDisabledSpriteSheetName === undefined) ? this.buttonDisabledSpriteInfo.spriteSheets = buttonParameters.buttonUpSpriteSheetName :
                this.buttonDisabledSpriteInfo.spriteSheets = buttonParameters.buttonDisabledSpriteSheetName;
            (buttonParameters.buttonDisabledStateImageName === undefined) ? this.buttonDisabledSpriteInfo.frameName = buttonParameters.buttonUpStateImageName :
                this.buttonDisabledSpriteInfo.frameName = buttonParameters.buttonDisabledStateImageName;
            this.idleClass = new IWG.IdleClass();
            this.idleClass.replaceableIdleEvent = function () { _this.promptTweenPart1(); };
            this.idleClass.replaceableStopIdleEvent = function () { _this.clearTweens(); };
            this.buttonSprite.inputEnabled = true;
            this.enableButton();
        }
        ButtonClass.prototype.subscribeSignals = function () {
        };
        ;
        ButtonClass.prototype.unsubscribeSignals = function () {
        };
        ;
        ;
        ButtonClass.prototype.buttonDownFunctionality = function (internal) {
            if (internal === void 0) { internal = true; }
            if (this._interactivityScaling.useInteractivityScaling) {
                this._internalGroupScaler.scale.set(this._interactivityScaling.mouseDown.x, this._interactivityScaling.mouseDown.y);
            }
            this._clickWasInButton = true;
            this.idleClass.coreBreakIdleIfActive();
            this.buttonDown();
            this._loadTextureCheck(this.buttonDownSpriteInfo.spriteSheets, this.buttonDownSpriteInfo.frameName);
        };
        ButtonClass.prototype.buttonDown = function () {
        };
        ButtonClass.prototype.buttonUpFunctionality = function (internal) {
            if (internal === void 0) { internal = true; }
            this._defaultState();
            if (this._clickWasInButton == true) {
                this.buttonUp();
            }
            this.idleClass.coreResumeIdleIfActive();
            this._loadTextureCheck(this.buttonUpSpriteInfo.spriteSheets, this.buttonUpSpriteInfo.frameName);
        };
        ButtonClass.prototype.buttonUp = function () {
        };
        ButtonClass.prototype.buttonMouseOverFunctionality = function () {
            if (this._interactivityScaling.useInteractivityScaling) {
                this._internalGroupScaler.scale.set(this._interactivityScaling.mouseOver.x, this._interactivityScaling.mouseOver.y);
            }
            this.idleClass.coreBreakIdleIfActive();
            this.buttonMouseOver();
            this._loadTextureCheck(this.buttonOverSpriteInfo.spriteSheets, this.buttonOverSpriteInfo.frameName);
        };
        ButtonClass.prototype.buttonMouseOver = function () {
        };
        ButtonClass.prototype.buttonMouseOutFunctionality = function () {
            this._clickWasInButton = false;
            this._defaultState();
            this.buttonMouseOut();
            this.idleClass.coreResumeIdleIfActive();
        };
        ButtonClass.prototype.buttonMouseOut = function () {
        };
        ButtonClass.prototype._enabledState = function () {
            this._defaultState();
            this.enabledState();
        };
        ButtonClass.prototype.enabledState = function () {
        };
        ButtonClass.prototype._disabledState = function () {
            if (this._interactivityScaling.useInteractivityScaling) {
                this._internalGroupScaler.scale.set(this._interactivityScaling.disabledState.x, this._interactivityScaling.disabledState.y);
            }
            this._loadTextureCheck(this.buttonDisabledSpriteInfo.spriteSheets, this.buttonDisabledSpriteInfo.frameName);
            this.disabledState();
        };
        ButtonClass.prototype.disabledState = function () {
            this.buttonSprite.tint = 0x71717e;
        };
        ButtonClass.prototype._defaultState = function () {
            if (this._interactivityScaling.useInteractivityScaling) {
                this._internalGroupScaler.scale.set(1, 1);
            }
            this._loadTextureCheck(this.buttonUpSpriteInfo.spriteSheets, this.buttonUpSpriteInfo.frameName);
            this.defaultState();
        };
        ButtonClass.prototype.defaultState = function () {
            this.buttonSprite.tint = 0xffffff;
            this.rotation = 0;
        };
        ButtonClass.prototype.clearTweens = function () {
            if (this.activeTween !== undefined && this.game !== null) {
                this.game.tweens.remove(this.activeTween);
            }
            this.activeTween = null;
        };
        ButtonClass.prototype.getButtonSprite = function () {
            return this.buttonSprite;
        };
        ButtonClass.prototype.promptTweenPart1 = function () {
            var _this = this;
            var instance = this;
            var buttonPrompt = this.game.add.tween(this.getScalerGroup().scale).to({
                x: 1.04,
                y: 1.04
            }, 600, Phaser.Easing.power2, false, 0);
            this.activeTween = buttonPrompt;
            buttonPrompt.onComplete.add(function () {
                if (instance.game !== null && _this !== null) {
                    instance.game.tweens.remove(buttonPrompt);
                    if (_this.buttonEnabledStatus) {
                        instance.promptTweenPart2();
                    }
                }
            });
            buttonPrompt.start();
        };
        ButtonClass.prototype.promptTweenPart2 = function () {
            var _this = this;
            var instance = this;
            var buttonPrompt = this.game.add.tween(this.getScalerGroup().scale).to({
                x: 1,
                y: 1
            }, 600, Phaser.Easing.power2, false, 0);
            this.activeTween = buttonPrompt;
            buttonPrompt.onComplete.add(function () {
                if (instance.game !== null && _this !== null) {
                    instance.game.tweens.remove(buttonPrompt);
                    if (_this.buttonEnabledStatus) {
                        instance.promptTweenPart1();
                    }
                }
            });
            buttonPrompt.start();
        };
        ButtonClass.prototype.enableButton = function () {
            this.buttonSprite.inputEnabled = true;
            this.buttonEnabledStatus = true;
            this.buttonSprite.events.onInputDown.add(this.buttonDownFunctionality, this);
            this.buttonSprite.events.onInputUp.add(this.buttonUpFunctionality, this);
            this.buttonSprite.events.onInputOver.add(this.buttonMouseOverFunctionality, this);
            this.buttonSprite.events.onInputOut.add(this.buttonMouseOutFunctionality, this);
            this.idleClass.coreResumeIdleIfActive();
            this._enabledState();
        };
        ;
        ButtonClass.prototype.disableButton = function () {
            this.buttonSprite.inputEnabled = false;
            this.buttonEnabledStatus = false;
            this.buttonSprite.events.onInputDown.remove(this.buttonDownFunctionality, this);
            this.buttonSprite.events.onInputUp.remove(this.buttonUpFunctionality, this);
            this.buttonSprite.events.onInputOver.remove(this.buttonMouseOverFunctionality, this);
            this.buttonSprite.events.onInputOut.remove(this.buttonMouseOutFunctionality, this);
            this.idleClass.coreBreakIdleIfActive();
            this._disabledState();
        };
        ;
        ButtonClass.prototype.getScalerGroup = function () {
            return this._internalGroupScaler;
        };
        ButtonClass.prototype._loadTextureCheck = function (spriteSheet, frameName) {
            var same = false;
            if (this._currentSpriteInfo.spriteSheets == spriteSheet && this._currentSpriteInfo.frameName == frameName) {
                same = true;
            }
            if (!same) {
                this.buttonSprite.loadTexture((spriteSheet == null) ? frameName : spriteSheet, (spriteSheet == null) ? null : frameName);
                this._currentSpriteInfo.spriteSheets = spriteSheet;
                this._currentSpriteInfo.frameName = frameName;
            }
        };
        ButtonClass.prototype.simulateClick = function (enableButtonAfterWards) {
            if (enableButtonAfterWards === void 0) { enableButtonAfterWards = true; }
            this.disableButton();
            this._clickWasInButton = true;
            this.buttonUpFunctionality(false);
            if (enableButtonAfterWards) {
                this.enableButton();
            }
        };
        return ButtonClass;
    }(IWG.GameGroup));
    IWG.ButtonClass = ButtonClass;
})(IWG || (IWG = {}));
var IWG;
(function (IWG) {
    var IdleController = (function (_super) {
        __extends(IdleController, _super);
        function IdleController() {
            _super.call(this);
            this.contolledIdles = [];
        }
        IdleController.prototype.coreIdleEvent = function () {
            _super.prototype.coreIdleEvent.call(this);
            for (var i = 0; i < this.contolledIdles.length; i++) {
                if (this._fireEventCheck(this.contolledIdles[i])) {
                    this.contolledIdles[i].coreIdleEvent();
                }
            }
        };
        IdleController.prototype.coreStopIdleEvent = function () {
            _super.prototype.coreStopIdleEvent.call(this);
            for (var i = 0; i < this.contolledIdles.length; i++) {
                if (this._fireEventCheck(this.contolledIdles[i])) {
                    this.contolledIdles[i].coreStopIdleEvent();
                }
            }
        };
        IdleController.prototype.coreIdleInteruptedEvent = function () {
            _super.prototype.coreIdleInteruptedEvent.call(this);
            for (var i = 0; i < this.contolledIdles.length; i++) {
                if (this._fireEventCheck(this.contolledIdles[i])) {
                    this.contolledIdles[i].coreIdleInteruptedEvent();
                }
            }
        };
        IdleController.prototype.coreIdleTimeOutEvent = function () {
            _super.prototype.coreIdleTimeOutEvent.call(this);
            for (var i = 0; i < this.contolledIdles.length; i++) {
                if (this._fireEventCheck(this.contolledIdles[i])) {
                    this.contolledIdles[i].coreIdleTimeOutEvent();
                }
            }
        };
        IdleController.prototype.addTooControlledIdlesArray = function (idleClass) {
            this.contolledIdles.push(idleClass);
        };
        IdleController.prototype.removeIdleClass = function (idleClass) {
            for (var i = 0; i < this.contolledIdles.length; i++) {
                if (idleClass == this.contolledIdles[i]) {
                    this.contolledIdles.splice(i, 1);
                }
            }
        };
        IdleController.prototype._fireEventCheck = function (idleClass) {
            if (idleClass.getUseIdleStatus() && idleClass.getIdleControlled()) {
                return true;
            }
            else {
                return false;
            }
        };
        return IdleController;
    }(IWG.IdleClass));
    IWG.IdleController = IdleController;
})(IWG || (IWG = {}));
var IWG;
(function (IWG) {
    var PanelClass = (function (_super) {
        __extends(PanelClass, _super);
        function PanelClass(panelParams) {
            _super.call(this);
            this.buttonsArray = [];
            this.panelBackground = null;
            this.revealed = null;
            this.buttonsGroup = null;
            this.idleController = null;
            if (panelParams.sheetName !== undefined && panelParams.backGroundImageString !== undefined) {
                this.panelBackground = new Phaser.Image(IWG.GameManager.instance, 0, 0, panelParams.sheetName, panelParams.backGroundImageString);
                this.add(this.panelBackground);
            }
            else if (panelParams.sheetName === undefined && panelParams.backGroundImageString !== undefined) {
                this.panelBackground = new Phaser.Image(IWG.GameManager.instance, 0, 0, panelParams.backGroundImageString);
                this.add(this.panelBackground);
            }
            else {
            }
            this.revealed = false;
            this.buttonsGroup = new Phaser.Group(IWG.GameManager.instance);
            this.add(this.buttonsGroup);
            this.idleController = new IWG.IdleController();
        }
        PanelClass.prototype.subscribeSignals = function () {
        };
        ;
        PanelClass.prototype.unsubscribeSignals = function () {
        };
        ;
        ;
        PanelClass.prototype.addButtonsToArrayAndGroup = function (buttons) {
            for (var i = 0; i < buttons.length; i++) {
                this.buttonsArray.push(buttons[i]);
                this.buttonsGroup.add(buttons[i]);
            }
        };
        ;
        PanelClass.prototype.show = function (enableButtons) {
            if (enableButtons === void 0) { enableButtons = true; }
            if (enableButtons) {
                this.enableButtons();
            }
            this.revealed = true;
            this.visible = true;
        };
        ;
        PanelClass.prototype.hide = function (disableButtons) {
            if (disableButtons === void 0) { disableButtons = true; }
            if (disableButtons) {
                this.disableButtons();
            }
            this.revealed = false;
            this.visible = false;
        };
        ;
        PanelClass.prototype.disableButtons = function () {
            for (var i = 0; i < this.buttonsArray.length; i++) {
                this.buttonsArray[i].disableButton();
            }
        };
        ;
        PanelClass.prototype.enableButtons = function () {
            for (var i = 0; i < this.buttonsArray.length; i++) {
                this.buttonsArray[i].enableButton();
            }
        };
        ;
        PanelClass.prototype.simulateClickAllButtons = function () {
            var counter = 0;
            for (var i = 0; i < this.buttonsArray.length; i++) {
                if (this.buttonsArray[i].buttonEnabledStatus) {
                    this.buttonsArray[i].disableButton();
                    this.simulateClickWithDelay(this.buttonsArray[i], 300 * counter);
                    counter++;
                }
            }
        };
        PanelClass.prototype.simulateClickWithDelay = function (symbolToReveal, delay) {
            var revealTimer = IWG.GameManager.instance.time.create(true);
            revealTimer.add(delay, function () {
                symbolToReveal.simulateClick(false);
            }, this);
            revealTimer.start();
        };
        return PanelClass;
    }(IWG.GameGroup));
    IWG.PanelClass = PanelClass;
})(IWG || (IWG = {}));
var IWG;
(function (IWG) {
    var GameFonts = (function () {
        function GameFonts() {
        }
        GameFonts.createStandardFont = function () {
            var standardFont = IWG.GameManager.instance.make.text(0, 0, "");
            standardFont.anchor.set(0.5);
            standardFont.align = 'center';
            standardFont.font = 'times new roman';
            standardFont.fontSize = 50;
            standardFont.fill = '#ffffff';
            return standardFont;
        };
        GameFonts.createMenuFont = function () {
            var standardFont = IWG.GameManager.instance.make.text(0, 0, "");
            standardFont.anchor.set(0.5);
            standardFont.align = 'center';
            standardFont.font = 'times new roman';
            standardFont.fontSize = 45;
            standardFont.fill = '#272727';
            return standardFont;
        };
        GameFonts.createMultiplierWinFont = function () {
            var multiplierWinFont = IWG.GameManager.instance.make.text(0, 0, "");
            multiplierWinFont.anchor.set(0.5);
            multiplierWinFont.align = 'center';
            multiplierWinFont.font = 'times new roman';
            multiplierWinFont.fontSize = 50;
            multiplierWinFont.fill = '#f0a127';
            return multiplierWinFont;
        };
        GameFonts.createMultiplierFont = function () {
            var multiplierWinFont = IWG.GameManager.instance.make.text(0, 0, "");
            multiplierWinFont.anchor.set(0.5);
            multiplierWinFont.align = 'center';
            multiplierWinFont.font = 'times new roman';
            multiplierWinFont.fontSize = 42;
            multiplierWinFont.fill = '#ffffff';
            return multiplierWinFont;
        };
        GameFonts.createEndWinFont = function () {
            var multiplierWinFont = IWG.GameManager.instance.make.text(0, 0, "");
            multiplierWinFont.anchor.set(0.5);
            multiplierWinFont.align = 'center';
            multiplierWinFont.font = 'times new roman';
            multiplierWinFont.fontSize = 32;
            return multiplierWinFont;
        };
        return GameFonts;
    }());
    IWG.GameFonts = GameFonts;
})(IWG || (IWG = {}));
var IWG;
(function (IWG) {
    var LanguageCurrencyManager = (function () {
        function LanguageCurrencyManager() {
            this._config = null;
            this._selectedCurrency = null;
            this._selectedLanguage = null;
            this._useISOCode = null;
            this._useMinorIfPresent = null;
            this._selectedCurrencyData = null;
            if (LanguageCurrencyManager.instance === null) {
                LanguageCurrencyManager.instance = this;
            }
            else {
                throw new Error("Cant make 2 LanguageCurrencyManager, use .instance instead.");
            }
        }
        LanguageCurrencyManager.prototype.init = function (config, language, currency, useISO, useMinorIfPresent) {
            this._config = config;
            if (this.checkLanguageSupport(language.toLowerCase())) {
                this._selectedLanguage = language.toLowerCase();
            }
            else {
                this._selectedLanguage = "en";
                console.warn("Language '", language.toLowerCase(), "' not found, defaulting to 'en'.");
            }
            if (this.checkCurrencySupport(currency.toUpperCase())) {
                this._selectedCurrency = currency.toUpperCase();
            }
            else {
                this._selectedCurrency = "GBP";
                console.warn("Currency '", currency.toUpperCase(), "' not found, defaulting to 'GBP'.");
            }
            this._useISOCode = useISO;
            this._useMinorIfPresent = useMinorIfPresent;
            this._selectedCurrencyData = this.getCurrencyData(this._selectedCurrency);
        };
        LanguageCurrencyManager.prototype.checkLanguageSupport = function (lang) {
            if (this._config.supportedLanguages.hasOwnProperty(lang)) {
                return this._config.supportedLanguages[lang];
            }
            else {
                return false;
            }
        };
        LanguageCurrencyManager.prototype.getAssetPackInfo = function () {
            if (this._config.useAssetPacks && this._config.assets.hasOwnProperty(this._selectedLanguage)) {
                if (this._config.assets[this._selectedLanguage].useAssetPack) {
                    return this._config.assets[this._selectedLanguage];
                }
                else {
                    return this._config.assets.empty;
                }
            }
            else {
                return this._config.assets.empty;
            }
        };
        LanguageCurrencyManager.prototype.getDelimitedString = function (targetKey) {
            var thisString = "";
            var targetObject = null;
            for (var i = 0; i < this._config.messages.length; i++) {
                if (this._config.messages[i].key === targetKey) {
                    targetObject = this._config.messages[i];
                }
            }
            if (targetObject == null) {
                return targetKey;
            }
            else {
                if (targetObject.values.hasOwnProperty(this._selectedLanguage)) {
                    thisString = targetObject.values[this._selectedLanguage];
                    return this.delimitText(thisString);
                }
                else {
                    return targetKey;
                }
            }
        };
        LanguageCurrencyManager.prototype.getDelimitedErrorString = function (targetKey) {
            var thisString = "";
            var targetObject = null;
            for (var i = 0; i < this._config.errors.length; i++) {
                if (this._config.errors[i].key === targetKey) {
                    targetObject = this._config.errors[i];
                }
            }
            if (targetObject == null) {
                return targetKey;
            }
            else {
                if (targetObject.values.hasOwnProperty(this._selectedLanguage)) {
                    thisString = targetObject.values[this._selectedLanguage];
                    return this.delimitText(thisString);
                }
                else {
                    return targetKey;
                }
            }
        };
        LanguageCurrencyManager.prototype.delimitText = function (stringIn) {
            if (stringIn.indexOf("{{line_break}}") == -1) {
                return stringIn;
            }
            else {
                stringIn = stringIn.replace("{{line_break}}", "\n");
                return this.delimitText(stringIn);
            }
        };
        LanguageCurrencyManager.prototype.checkCurrencySupport = function (curr) {
            for (var i = 0; i < LanguageCurrencyManager.CURRENCY_CODES.length; i++) {
                if (LanguageCurrencyManager.CURRENCY_CODES[i].ISOCode === curr) {
                    return true;
                }
            }
            return false;
        };
        LanguageCurrencyManager.prototype.getCurrencyData = function (curr) {
            for (var i = 0; i < LanguageCurrencyManager.CURRENCY_CODES.length; i++) {
                if (LanguageCurrencyManager.CURRENCY_CODES[i].ISOCode === curr) {
                    return LanguageCurrencyManager.CURRENCY_CODES[i];
                }
            }
        };
        LanguageCurrencyManager.prototype.formatCurrency = function (value) {
            var returnString = "";
            var preppedValue = this.prepNumbers(value, this._selectedCurrencyData.decimalPrecision, 3, this._selectedCurrencyData.majorDelimiter, this._selectedCurrencyData.minorDelimiter);
            if (this._useISOCode) {
                returnString = this._selectedCurrency;
                returnString += " ";
                returnString += preppedValue;
            }
            else {
                if (this._selectedCurrencyData.minorPresent && this._useMinorIfPresent) {
                    if (value >= 1) {
                        if (this._selectedCurrencyData.majorPosition === "R") {
                            returnString = preppedValue;
                            returnString += " ";
                            returnString += this._selectedCurrencyData.majorSymbol;
                        }
                        else {
                            returnString = this._selectedCurrencyData.majorSymbol;
                            returnString += preppedValue;
                        }
                    }
                    else {
                        if (this._selectedCurrencyData.majorPosition === "R") {
                            returnString = preppedValue;
                            returnString += " ";
                            returnString += this._selectedCurrencyData.minorSymbol;
                        }
                        else {
                            returnString = this._selectedCurrencyData.minorSymbol;
                            returnString += preppedValue;
                        }
                    }
                }
                else {
                    if (this._selectedCurrencyData.majorPosition === "R") {
                        returnString = preppedValue;
                        returnString += " ";
                        returnString += this._selectedCurrencyData.majorSymbol;
                    }
                    else {
                        returnString = this._selectedCurrencyData.majorSymbol;
                        returnString += preppedValue;
                    }
                }
            }
            return returnString;
        };
        LanguageCurrencyManager.prototype.prepNumbers = function (numIn, n, x, s, c) {
            var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')', num = numIn.toFixed(Math.max(0, ~~n));
            return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
        };
        LanguageCurrencyManager.instance = null;
        LanguageCurrencyManager.DECIMAL_ZERO = 0;
        LanguageCurrencyManager.DECIMAL_ONE = 1;
        LanguageCurrencyManager.DECIMAL_TWO = 2;
        LanguageCurrencyManager.DECIMAL_THREE = 3;
        LanguageCurrencyManager.CURRENCY_CODES = [
            { country: "United Kingdom", currency: "Pound", ISOCode: "GBP", minorPresent: true, majorSymbol: "£", minorSymbol: "p", decimalPrecision: LanguageCurrencyManager.DECIMAL_TWO, majorPosition: "L", minorPosition: "R", majorDelimiter: ",", minorDelimiter: "." },
            { country: "United States", currency: "Dollar", ISOCode: "USD", minorPresent: true, majorSymbol: "$", minorSymbol: "¢", decimalPrecision: LanguageCurrencyManager.DECIMAL_TWO, majorPosition: "L", minorPosition: "R", majorDelimiter: ",", minorDelimiter: "." },
            { country: "Euro Member Countries", currency: "Euro", ISOCode: "EUR", minorPresent: false, majorSymbol: "€", minorSymbol: "", decimalPrecision: LanguageCurrencyManager.DECIMAL_TWO, majorPosition: "R", minorPosition: "", majorDelimiter: ".", minorDelimiter: "," },
            { country: "Japan", currency: "Yen", ISOCode: "JPY", minorPresent: false, majorSymbol: "¥", minorSymbol: "", decimalPrecision: LanguageCurrencyManager.DECIMAL_ZERO, majorPosition: "L", minorPosition: "", majorDelimiter: ",", minorDelimiter: "." },
            { country: "Mexico", currency: "Peso", ISOCode: "MXN", minorPresent: false, majorSymbol: "$", minorSymbol: "¢", decimalPrecision: LanguageCurrencyManager.DECIMAL_TWO, majorPosition: "L", minorPosition: "R", majorDelimiter: ",", minorDelimiter: "." }
        ];
        return LanguageCurrencyManager;
    }());
    IWG.LanguageCurrencyManager = LanguageCurrencyManager;
})(IWG || (IWG = {}));
var IWG;
(function (IWG) {
    var Prize_Core = (function (_super) {
        __extends(Prize_Core, _super);
        function Prize_Core(gamePanel, buttonParams) {
            _super.call(this, buttonParams);
            this._thisTurn = null;
            this._isWinner = null;
            this.gameNumber = -1;
            this.prizeAmountValueFormatted = 'n';
            this.prizeAmountValue = 'n';
            this.prizeIndex = null;
            this._onAnimationComplete = function () { throw new Error("No animation complete set! Did you forget to call a super? "); };
            this._onAnimationCompleteScope = null;
            this._numberOfRevealingObjects = 1;
            this._numberOfCountingObjects = 1;
            this._numberOfWinningObjects = 1;
            this._numberOfLosingObjects = 1;
            this._numRevealedObjects = 0;
            this._rowInitialised = false;
            this._rowHasRevealed = false;
            this._rowHasCountedUp = false;
            this._checkedForWin = false;
            this._winRevealed = false;
            this._cycleFinished = false;
            this._rowPressed = false;
            this.grp_concealerGroup = null;
            this.grp_prizeGroup = null;
            this.gamePanel = null;
            this.gamePanel = gamePanel;
            this.grp_concealerGroup = this.game.make.group();
            this.add(this.grp_concealerGroup);
            this.grp_concealerGroup.add(this.getScalerGroup());
            this.idleClass.setIdleController(this.gamePanel.idleController, true);
            this.idleClass.enableOrDisableIdle(true);
            this.idleClass.enableOrDisableIdleTimeOut(true);
            this.grp_prizeGroup = this.game.make.group();
            this.add(this.grp_prizeGroup);
            this.grp_prizeGroup.alpha = 0;
            this.grp_prizeGroup.visible = false;
        }
        Prize_Core.prototype.revealSymbolsAnimation = function (onCompleteFunction, scope, animationPlaying) {
            if (animationPlaying === void 0) { animationPlaying = false; }
            this._onAnimationComplete = onCompleteFunction;
            this._onAnimationCompleteScope = scope;
            if (!animationPlaying) {
                this.onAnimationComplete();
            }
        };
        ;
        Prize_Core.prototype.revealWinAnimation = function (onCompleteFunction, scope, animationPlaying) {
            if (animationPlaying === void 0) { animationPlaying = false; }
            this._onAnimationComplete = onCompleteFunction;
            this._onAnimationCompleteScope = scope;
            if (!animationPlaying) {
                this.onAnimationComplete();
            }
        };
        ;
        Prize_Core.prototype.countUpAnimation = function (onCompleteFunction, scope, animationPlaying) {
            if (animationPlaying === void 0) { animationPlaying = false; }
            this._onAnimationComplete = onCompleteFunction;
            this._onAnimationCompleteScope = scope;
            if (!animationPlaying) {
                this.onAnimationComplete();
            }
        };
        ;
        Prize_Core.prototype.revealLoseAnimation = function (onCompleteFunction, scope, animationPlaying) {
            if (animationPlaying === void 0) { animationPlaying = false; }
            this._onAnimationComplete = onCompleteFunction;
            this._onAnimationCompleteScope = scope;
            if (!animationPlaying) {
                this.onAnimationComplete();
            }
        };
        ;
        Prize_Core.prototype.subscribeSignals = function () {
        };
        ;
        Prize_Core.prototype.unsubscribeSignals = function () {
        };
        ;
        ;
        Prize_Core.prototype.buttonUp = function () {
            this.prizePressed();
            this.disableButton();
            this.idleClass.coreResumeIdleIfActive();
            this.idleClass.removeSelfFromIdleControlerAndArray();
            this.idleClass.enableOrDisableIdle(false);
        };
        Prize_Core.prototype.prizePressed = function () {
            if (!this._rowPressed) {
                this._rowPressed = true;
                this.updateGameRow_Core();
            }
        };
        Prize_Core.prototype.updateGameRow_Core = function (winIndex) {
            if (winIndex === void 0) { winIndex = null; }
            if (!this._rowInitialised) {
                IWG.Debug.instance.log("Initialising and begining animation on a match 3 row.", IWG.DEBUGTYPE.CORE);
                this._rowInitialised = true;
                var turn = IWG.GameManager.instance.getNextPrize();
                this.prizeAmountValue = turn.a.toString();
                this.prizeAmountValueFormatted = IWG.LanguageCurrencyManager.instance.formatCurrency(turn.a);
                this.prizeIndex = turn.i;
                if (turn.w === 0) {
                    this._isWinner = false;
                }
                else {
                    this._isWinner = true;
                }
                this.updateGameRow_Core();
            }
            else if (!this._rowHasRevealed) {
                this._rowHasRevealed = true;
                IWG.Debug.instance.log("Revealing this symbol ... ", IWG.DEBUGTYPE.CORE);
                this.revealPrize();
            }
            else if (!this._checkedForWin) {
                this._checkedForWin = true;
                IWG.Debug.instance.log("Checking for win and pushing for array..  ", IWG.DEBUGTYPE.CORE);
                if (this._isWinner) {
                    IWG.SignalManager.instance.dispatch('addWinningRevealedPrize', this);
                }
                else {
                    this._winRevealed = true;
                    this.updateGameRow_Core();
                }
            }
            else if (!this._winRevealed) {
                this._winRevealed = true;
                IWG.Debug.instance.log("Win revealed. ", IWG.DEBUGTYPE.CORE);
                this.winReveal(winIndex);
            }
            else if (!this._cycleFinished) {
                this._cycleFinished = true;
                IWG.Debug.instance.log("Cycle finished. This prize has finished all it needs to do! ", IWG.DEBUGTYPE.CORE);
                IWG.SignalManager.instance.dispatch('addFinishedRevealedPrize', this);
            }
        };
        ;
        Prize_Core.prototype._getSymbolFromTicket = function (partToGet) {
            switch (partToGet) {
                case 'prize': {
                    IWG.Debug.instance.log("Returned value from ticket. It was " + this._thisTurn.value, IWG.DEBUGTYPE.TICKET);
                    console.log("getting value from ticket " + this._thisTurn.value);
                    return this._thisTurn.value;
                }
                default: {
                    IWG.Debug.instance.error("This value doesnt exist on the rowcore ticket.", IWG.DEBUGTYPE.ERROR);
                    break;
                }
            }
        };
        Prize_Core.prototype.revealPrize = function () {
            var _this = this;
            this.revealSymbolsAnimation(function () {
                _this._checkAllRevealAnimations();
            }, this);
        };
        Prize_Core.prototype.winReveal = function (winIndex) {
            var _this = this;
            this.revealWinAnimation(function () {
                _this._checkAllWinnerAnimations();
            }, this);
        };
        Prize_Core.prototype._checkAllRevealAnimations = function () {
            this._numRevealedObjects++;
            IWG.Debug.instance.log("Reveal animations complete: " + this._numRevealedObjects + " / " + this._numberOfRevealingObjects, IWG.DEBUGTYPE.ANIMATION);
            if (this._numRevealedObjects === this._numberOfRevealingObjects) {
                IWG.Debug.instance.log("All reveal animations completed for the GameRow.", IWG.DEBUGTYPE.ANIMATION);
                this._numRevealedObjects = 0;
                this._numberOfRevealingObjects = 0;
                this._onAnimationComplete = function () { throw new Error("No on animation complete set! Did you forget to call a super? "); };
                this.updateGameRow_Core();
            }
        };
        Prize_Core.prototype._checkAllCountingAnimations = function () {
            this._numRevealedObjects++;
            IWG.Debug.instance.log("Counting animations complete: " + this._numRevealedObjects + " / " + this._numberOfCountingObjects, IWG.DEBUGTYPE.ANIMATION);
            if (this._numRevealedObjects === this._numberOfCountingObjects) {
                IWG.Debug.instance.log("All counting animations completed for the GameRow.", IWG.DEBUGTYPE.ANIMATION);
                this._numRevealedObjects = 0;
                this._numberOfCountingObjects = 0;
                this._onAnimationComplete = function () { throw new Error("No on animation complete set! Did you forget to call a super? "); };
                this.updateGameRow_Core();
            }
        };
        Prize_Core.prototype._checkAllWinnerAnimations = function () {
            this._numRevealedObjects++;
            IWG.Debug.instance.log("Win animations complete: " + this._numRevealedObjects + " / " + this._numberOfWinningObjects, IWG.DEBUGTYPE.ANIMATION);
            if (this._numRevealedObjects === this._numberOfWinningObjects) {
                IWG.Debug.instance.log("All win animations completed for the GameRow.", IWG.DEBUGTYPE.ANIMATION);
                this._numRevealedObjects = 0;
                this._numberOfWinningObjects = 0;
                this._onAnimationComplete = function () { throw new Error("No on animation set! Did you forget to call a super? "); };
                this.updateGameRow_Core();
            }
        };
        Prize_Core.prototype.onAnimationComplete = function () {
            this._onAnimationComplete.bind(this._onAnimationCompleteScope)();
        };
        Prize_Core.prototype.isWinner = function () {
            if (this._thisTurn.w === 0) {
                return false;
            }
            else {
                return true;
            }
        };
        Prize_Core.prototype.getRevealed = function () {
            return this._rowHasRevealed;
        };
        return Prize_Core;
    }(IWG.ButtonClass));
    IWG.Prize_Core = Prize_Core;
})(IWG || (IWG = {}));
var IWG;
(function (IWG) {
    var Particle = (function () {
        function Particle(frameNames, maxParticles, xSpeed, ySpeed, xOffset, yOffset, gravity, width, height, maxScale, minScale, scaleFadeNumber, alpha, alphaFadeNumber, rotation) {
            if (frameNames === void 0) { frameNames = []; }
            if (maxParticles === void 0) { maxParticles = 1; }
            if (xSpeed === void 0) { xSpeed = { min: 200, max: 200 }; }
            if (ySpeed === void 0) { ySpeed = { min: 200, max: 200 }; }
            if (xOffset === void 0) { xOffset = 0; }
            if (yOffset === void 0) { yOffset = 0; }
            if (gravity === void 0) { gravity = 2000; }
            if (width === void 0) { width = 1; }
            if (height === void 0) { height = 1; }
            if (maxScale === void 0) { maxScale = 1; }
            if (minScale === void 0) { minScale = 1; }
            if (scaleFadeNumber === void 0) { scaleFadeNumber = null; }
            if (alpha === void 0) { alpha = 1; }
            if (alphaFadeNumber === void 0) { alphaFadeNumber = null; }
            if (rotation === void 0) { rotation = 90; }
            this.frameNames = frameNames;
            this.maxParticles = maxParticles;
            this.xSpeed = xSpeed;
            this.ySpeed = ySpeed;
            this.maxScale = maxScale;
            this.minScale = minScale;
            this.scaleFadeNum = scaleFadeNumber;
            this.alpha = alpha;
            this.alphaFadeNum = alphaFadeNumber;
            this.xOffset = xOffset;
            this.yOffset = yOffset;
            this.gravity = gravity;
            this.width = width;
            this.height = height;
            this.rotation = rotation;
        }
        return Particle;
    }());
    IWG.Particle = Particle;
    ;
    var Reveals = (function () {
        function Reveals() {
        }
        Reveals.Pop_Reveal = function (objToAnimate, objToFinish, group, key, frames, onCompleteListener, onCompleteContext) {
            if (key === void 0) { key = null; }
            if (frames === void 0) { frames = null; }
            if (onCompleteListener === void 0) { onCompleteListener = function () { }; }
            if (onCompleteContext === void 0) { onCompleteContext = this; }
            var params = [];
            for (var _i = 7; _i < arguments.length; _i++) {
                params[_i - 7] = arguments[_i];
            }
            var anim = new (RevealAnimations.bind.apply(RevealAnimations, [void 0].concat([onCompleteListener, onCompleteContext], params)))();
            anim.Pop_Reveal(objToAnimate, objToFinish, group, key, frames);
        };
        ;
        Reveals.Explode_Reveal = function () {
        };
        ;
        Reveals.Hidden_Lasers = function () {
        };
        ;
        return Reveals;
    }());
    IWG.Reveals = Reveals;
    var RevealAnimations = (function () {
        function RevealAnimations(onCompleteListener, onCompleteContext) {
            var params = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                params[_i - 2] = arguments[_i];
            }
            this._onCompleteFunc = null;
            this._onCompleteScope = null;
            this._onCompleteParams = null;
            this._onCompleteFunc = onCompleteListener;
            this._onCompleteScope = onCompleteContext;
            this._onCompleteParams = params;
        }
        RevealAnimations.prototype.Pop_Reveal = function (objToAnimate, objToFinish, group, key, frames) {
            var _this = this;
            if (key === void 0) { key = null; }
            if (frames === void 0) { frames = null; }
            var emittersCreates = [];
            var t = IWG.GameManager.instance.time.create(true);
            var smokeEmitter = group.game.add.emitter(objToAnimate.world.x, objToAnimate.world.y);
            IWG.SignalManager.instance.dispatch('Audio.playAudio', IWG.Sounds.GUNSHOT, IWG.SoundChannels.FX_SOUNDS);
            smokeEmitter.setXSpeed(-40, 40);
            smokeEmitter.setYSpeed(-20, 20);
            smokeEmitter.gravity = -400;
            smokeEmitter.setAlpha(0.5, 0, 2000, Phaser.Easing.Quadratic.In);
            smokeEmitter.setScale(0, 2, 0, 2);
            smokeEmitter.makeParticles('barrelExplosion', 'smoke.png', 10, false, false);
            smokeEmitter.start(true, 2000, null, 10);
            t.add(2000, function () {
                smokeEmitter.destroy(true);
            }, this);
            var fadeOutAnimation = IWG.GameManager.instance.add.tween(objToAnimate).to({ alpha: 0 }, 80, Phaser.Easing.Linear.None, true);
            fadeOutAnimation.onComplete.add(function () {
                group.add(objToFinish);
                objToFinish.scale = new PIXI.Point(0, 0);
                objToFinish.anchor.setTo(.5, .5);
                objToAnimate.destroy();
                var bounceInTween = IWG.GameManager.instance.add.tween(objToFinish.scale).to({ x: 1, y: 1 }, 1400, Phaser.Easing.Bounce.Out, true);
                bounceInTween.onComplete.add(function () {
                    _this._onCompleteFunc.bind(_this._onCompleteScope).apply(void 0, _this._onCompleteParams);
                }, _this);
            }, this);
            frames.forEach(function (frame) {
                var newEmitter = group.game.add.emitter(objToAnimate.world.x + frame.xOffset, objToAnimate.world.y + frame.yOffset);
                newEmitter.height = frame.height;
                newEmitter.width = frame.width;
                newEmitter.setXSpeed(frame.xSpeed.min, frame.xSpeed.max);
                newEmitter.setYSpeed(frame.ySpeed.min, frame.ySpeed.max);
                newEmitter.gravity = frame.gravity;
                newEmitter.setScale(frame.minScale, frame.maxScale, frame.minScale, frame.maxScale, frame.alphaFadeNum);
                newEmitter.setRotation(-frame.rotation, frame.rotation);
                newEmitter.makeParticles(key, frame.frameNames);
                if (frame.alphaFadeNum != null) {
                    newEmitter.setAlpha(frame.alpha, 0, frame.alphaFadeNum);
                }
                else {
                    newEmitter.setAlpha(frame.alpha, frame.alpha);
                }
                newEmitter.start(true, 3000, null, frame.maxParticles);
                newEmitter.setRotation(-frame.rotation, frame.rotation);
                t.add(3000, function () {
                    newEmitter.destroy(true);
                }, _this);
            });
            t.start();
        };
        ;
        return RevealAnimations;
    }());
    ;
})(IWG || (IWG = {}));
;
var IWG;
(function (IWG) {
    var Prize = (function (_super) {
        __extends(Prize, _super);
        function Prize(game, gamePanel) {
            _super.call(this, gamePanel, {
                buttonUpSpriteSheetName: 'mainGame',
                buttonUpStateImageName: "barrell",
                interactivityScaling: {
                    useInteractivityScaling: true,
                    disabledState: new Phaser.Point(1, 1),
                    mouseOver: new Phaser.Point(1.1, 1.1),
                    mouseDown: new Phaser.Point(0.9, 0.9)
                }
            });
            this._symbolwinAnimationFinished = 0;
            this._winValueTxt = null;
            this._goldHighlightText = null;
            this.myCountUpValue = null;
            this._idleWhenReady = false;
            this._idleTweensArray = [];
            this._game = game;
            this._goldHighlightText = this._game.add.bitmapText(-10, -50, 'font', "£1,000", 38);
            this._goldHighlightText.anchor.setTo(.5, .5);
            this._goldHighlightText.tint = 0xFF88FF;
            this._goldHighlightText.alpha = 0;
            this.grp_prizeGroup.add(this._goldHighlightText);
            this._winValueTxt = this._game.add.bitmapText(-10, -50, 'font', "£1,000", 38);
            this._winValueTxt.text = this.prizeAmountValueFormatted;
            this._winValueTxt.anchor.setTo(.5, .5);
            this.grp_prizeGroup.add(this._winValueTxt);
            this.alpha = 0;
            this.scale.setTo(0, 0);
            this.rotation = Math.PI * 0.25;
        }
        Prize.prototype.subscribeSignals = function () {
        };
        Prize.prototype.unsubscribeSignals = function () {
        };
        Prize.prototype.symbolFinishedWinAnimation = function () {
            this._symbolwinAnimationFinished++;
        };
        Prize.prototype.createAnimation = function () {
            var _this = this;
            this.disableButton();
            var alphaInTween = this._game.make.tween(this).to({ alpha: 1, rotation: 0 }, 1000, Phaser.Easing.Quadratic.InOut, true);
            var scaleUpTween = this._game.make.tween(this.scale).to({ x: 1, y: 1 }, 1300, Phaser.Easing.Back.Out, true);
            scaleUpTween.onComplete.add(function () {
                _this.enableButton();
            });
        };
        Prize.prototype._createGlowFilter = function () {
            var fragmentSrc = [
                'precision lowp float;',
                'varying vec2 vTextureCoord;',
                'varying vec4 vColor;',
                'uniform sampler2D uSampler;',
                'void main() {',
                'vec4 sum = vec4(0);',
                'vec2 texcoord = vTextureCoord;',
                'for(int xx = -4; xx <= 4; xx++) {',
                'for(int yy = -3; yy <= 3; yy++) {',
                'float dist = sqrt(float(xx*xx) + float(yy*yy));',
                'float factor = 0.0;',
                'if (dist == 0.0) {',
                'factor = 2.0;',
                '} else {',
                'factor = 2.0/abs(float(dist));',
                '}',
                'sum += texture2D(uSampler, texcoord + vec2(xx, yy) * 0.002) * factor;',
                '}',
                '}',
                'gl_FragColor = sum * 0.025 + texture2D(uSampler, texcoord);',
                '}'
            ];
            return new Phaser.Filter(this._game, null, fragmentSrc);
        };
        Prize.prototype.revealSymbolsAnimation = function (onCompleteFunction, scope) {
            var _this = this;
            _super.prototype.revealSymbolsAnimation.call(this, onCompleteFunction, scope, true);
            this._winValueTxt.text = this.prizeAmountValueFormatted;
            this._goldHighlightText.text = this.prizeAmountValueFormatted;
            IWG.SignalManager.instance.dispatch('screenShakeSignal');
            IWG.SignalManager.instance.dispatch('barrellClicked', this);
            var revealFrames = [
                new IWG.Particle(['barrel_piece_1.png', 'barrel_piece_2.png', 'barrel_piece_3.png'], 3, { min: -300, max: 300 }, { min: 0, max: -700 }, -15, 0, 2000, 30, 30),
                new IWG.Particle(['barrel_piece_1.png',], 5, { min: -450, max: 450 }, { min: 0, max: -850 }),
                new IWG.Particle(['barrel_piece_2.png'], 1, { min: 0, max: 0 }, { min: 0, max: 0 }, 0, 0, 0, 10, 10, 2, 1, 1800, 1, 1800),
                new IWG.Particle(['barrel_piece_3.png'], 1, { min: -50, max: 100 }, { min: -400, max: -500 }, 30, -30, 2000, 0, 0, 1, 1, null, 1, null, 75)];
            IWG.Reveals.Pop_Reveal(this.buttonSprite, this._winValueTxt, this, 'barrelExplosion', revealFrames, function () {
                _this.onAnimationComplete();
            }, this);
        };
        Prize.prototype.revealWinAnimation = function (onCompleteFunction, scope) {
            var _this = this;
            _super.prototype.revealWinAnimation.call(this, onCompleteFunction, scope, true);
            this.grp_prizeGroup.add(this._winValueTxt);
            this.grp_prizeGroup.alpha = 1;
            this.grp_prizeGroup.visible = true;
            this._goldHighlightText.alpha = 1;
            var winTextMask = this._game.make.graphics(-this._winValueTxt.width, this._winValueTxt.y);
            this.grp_prizeGroup.add(winTextMask);
            winTextMask.beginFill(0x000000, 1);
            winTextMask.drawRect(-this._goldHighlightText.width / 2 + this._goldHighlightText.width, -this._goldHighlightText.height / 2 - 30, this._goldHighlightText.width, this._goldHighlightText.height + 30);
            var sparkleEmitter = this._game.make.emitter(-this._winValueTxt.width / 2, -15, 400);
            this.grp_prizeGroup.add(sparkleEmitter);
            sparkleEmitter.makeParticles('barrelExplosion', 'win_sparkle.png');
            sparkleEmitter.gravity = 400;
            sparkleEmitter.setXSpeed(-50, 50);
            sparkleEmitter.setYSpeed(-150, 150);
            sparkleEmitter.setScale(0.2, 0.6, 0.2, 0.6);
            sparkleEmitter.setAlpha(1, 0, 1200);
            sparkleEmitter.height = this._winValueTxt.height;
            sparkleEmitter.start(false, 10000, 0.1, 350);
            this._winValueTxt.mask = winTextMask;
            var maskOverTween = this._game.add.tween(winTextMask).to({ x: 0 }, 1000, Phaser.Easing.Quadratic.InOut, true);
            var emitterOverTween = this._game.add.tween(sparkleEmitter).to({ x: this._winValueTxt.width / 2 }, 1000, Phaser.Easing.Quadratic.InOut, true);
            emitterOverTween.onComplete.add(function () {
                sparkleEmitter.on = false;
                var pulseTween = _this._game.add.tween(_this._goldHighlightText.scale).to({ x: 1.1, y: 1.1 }, 1000, Phaser.Easing.Quadratic.InOut, true, 0, -1, true);
                _this.onAnimationComplete();
            });
            var sparkleBG = this._game.make.sprite(-5, -55, 'mainGame', 'sparkle');
            sparkleBG.anchor.setTo(.5, .5);
            sparkleBG.alpha = 0;
            sparkleBG.scale.setTo(.5, .5);
            this.grp_prizeGroup.add(sparkleBG);
            this.grp_prizeGroup.sendToBack(sparkleBG);
            var constantRotation = this._game.make.tween(sparkleBG).to({ rotation: Math.PI * 2 }, 5000, Phaser.Easing.Linear.None, true, 0, -1);
            var scaleUpTween = this._game.make.tween(sparkleBG.scale).to({ x: 1.6, y: 1.6 }, 850, Phaser.Easing.Back.Out, true);
            var fadeInTween = this._game.make.tween(sparkleBG).to({ alpha: 1 }, 850, Phaser.Easing.Quadratic.InOut, true);
            fadeInTween.onComplete.add(function () {
            }, this);
            IWG.SignalManager.instance.dispatch('Audio.playAudio', IWG.Sounds.ROWWIN, IWG.SoundChannels.FX_SOUNDS);
        };
        return Prize;
    }(IWG.Prize_Core));
    IWG.Prize = Prize;
})(IWG || (IWG = {}));
var IWG;
(function (IWG) {
    var MainGameGroup = (function (_super) {
        __extends(MainGameGroup, _super);
        function MainGameGroup() {
            _super.call(this);
            this._elFurrito = null;
            this._barrells = [];
            this._barrellsShadows = [];
            this._barrellsExplosion = [];
            this._clickCount = 0;
            this._key = null;
        }
        MainGameGroup.prototype._setupLayout = function () {
            var gamePanel = new IWG.PanelClass({});
            var barralPosArray = [
                [530, 550],
                [520, 360],
                [670, 370],
                [660, 480],
                [780, 560],
                [840, 340],
                [820, 450],
                [970, 390],
                [980, 530]
            ];
            this._barrells = [];
            this._clickCount = 0;
            for (var i = 0; i < barralPosArray.length; i++) {
                var pos = barralPosArray[i];
                var icon = new IWG.Prize(this.game, gamePanel);
                icon.getButtonSprite().anchor.setTo(0.5, 1.0);
                icon.position.setTo(pos[0], pos[1]);
                icon.alpha = 1;
                icon.scale.setTo(1, 0.0);
                icon.rotation = 0;
                var shadow = this.game.add.image(0, 0, 'mainGame', 'barrel_shadow');
                shadow.alpha = 0;
                shadow.anchor.setTo(0.5, 0.5);
                shadow.position.setTo(pos[0] - 3, pos[1] - 10);
                shadow.scale.setTo(1.1, 1.0);
                var explosion = this.game.add.image(0, 0, 'mainGame', 'explosion', this);
                explosion.alpha = 0;
                explosion.blendMode = 2;
                explosion.anchor.setTo(0.5, 0.5);
                explosion.scale.setTo(0.8, 0.8);
                explosion.position.setTo(pos[0], pos[1] - 230);
                this.add(icon);
                this._barrells.push(icon);
                this._barrellsShadows.push(shadow);
                this._barrellsExplosion.push(explosion);
            }
            gamePanel.idleController.setTimerValues(4000, 14000);
            gamePanel.idleController.enableOrDisableIdle(true);
            gamePanel.idleController.enableOrDisableIdleTimeOut(true);
            gamePanel.idleController.resetAndStartOrStopTimer(IWG.TimerInteractionStatus.startOrReset);
            gamePanel.idleController.replaceableIdleTimeOutEvent = function () { gamePanel.simulateClickAllButtons(); };
            this.add(gamePanel);
            this._elFurrito = this.game.add.sprite(0, 0, "cowboyIdle", 'cowboyIdle_1', this);
            this._furritoIdle(false);
            this._elFurrito.position.setTo(-300, 230);
            this._elFurrito.anchor.setTo(0.5, 0);
            this.alpha = 0;
        };
        MainGameGroup.prototype.subscribeSignals = function () {
            IWG.SignalManager.instance.add('barrellClicked', this._barrellClicked, this);
            IWG.SignalManager.instance.add('showMainGame', this._show, this);
            IWG.SignalManager.instance.add('hideFurrito', this._hideElFurrito, this);
            IWG.SignalManager.instance.add('restartGame', this._resetGame, this);
            IWG.SignalManager.instance.add('keyUnlock', this._keyAnimation, this);
            IWG.SignalManager.instance.add('endGameIntro', this._endGame, this);
        };
        ;
        MainGameGroup.prototype.unsubscribeSignals = function () {
            IWG.SignalManager.instance.remove('barrellClicked', this._barrellClicked, this);
            IWG.SignalManager.instance.remove('showMainGame', this._show, this);
            IWG.SignalManager.instance.remove('hideFurrito', this._hideElFurrito, this);
            IWG.SignalManager.instance.remove('restartGame', this._resetGame, this);
            IWG.SignalManager.instance.remove('keyUnlock', this._keyAnimation, this);
            IWG.SignalManager.instance.remove('endGameIntro', this._endGame, this);
        };
        ;
        MainGameGroup.prototype._furritoIdle = function (load) {
            if (load === void 0) { load = true; }
            if (load) {
                this._elFurrito.loadTexture('cowboyIdle');
            }
            this._elFurrito.animations.add('idle', Phaser.Animation.generateFrameNames('cowboyIdle_', 0, 12, "", 0), 12, true);
            this._elFurrito.play('idle');
        };
        MainGameGroup.prototype._furritoFire = function () {
            var boom = IWG.GameManager.instance.rnd.integerInRange(0, 1) ? true : false;
            var texture = 'cowboyShotLeftAnimation';
            var animation = 'shootLeft';
            var prefix = 'cowboyShotLeft_';
            var upperFrame = 8;
            if (boom) {
                texture = 'cowboyShotRightAnimation';
                animation = 'shootRight';
                prefix = 'cowboyShotRight_';
                upperFrame = 6;
            }
            this._elFurrito.loadTexture(texture);
            this._elFurrito.animations.add(animation, Phaser.Animation.generateFrameNames(prefix, 1, upperFrame, "", 0), 12, false);
            this._elFurrito.animations.currentAnim.onComplete.add(function () {
                this._furritoIdle();
            }, this);
            this._elFurrito.play(animation);
        };
        MainGameGroup.prototype._barrellClicked = function (barrel) {
            this._clickCount++;
            this._furritoFire();
            if (this._clickCount === 1) {
                IWG.SignalManager.instance.dispatch('vulture', this);
            }
            if (this._clickCount === 3) {
                this._keyAnimation(barrel);
            }
            if (this._clickCount > 5) {
                IWG.SignalManager.instance.dispatch('endGameIntro', this);
                for (var i = 0; i < this._barrells.length; i++) {
                    var element = this._barrells[i];
                    element.buttonSprite.inputEnabled = false;
                }
            }
            for (var i = 0; i < this._barrells.length; i++) {
                if (this._barrells[i].getRevealed()) {
                    this._barrellsExplosion[i].alpha = 0.5;
                }
            }
        };
        MainGameGroup.prototype._keyAnimation = function (barrel) {
            this._key = this.game.add.sprite(barrel.position.x, barrel.position.y, "keyAnimation", 'key_1', this);
            this._key.scale.setTo(0.8, 0.8);
            this._key.anchor.setTo(0.5, 0.5);
            this._key.loadTexture('keyAnimation');
            var unlock = this._key.animations.add('key', Phaser.Animation.generateFrameNames('key_', 1, 19, "", 0), 12, false);
            unlock.play();
            IWG.SignalManager.instance.dispatch('Audio.playAudio', IWG.Sounds.BONUSKEY, IWG.SoundChannels.FX_SOUNDS);
            this.game.add.tween(this._key).to({ x: 770, y: 240 }, 1000, Phaser.Easing.Linear.None, true);
            unlock.onComplete.add(function () {
                IWG.SignalManager.instance.dispatch('openJailDoor');
                this._key.alpha = 0;
            }, this);
        };
        MainGameGroup.prototype._show = function () {
            this.position.setTo(0);
            this.alpha = 1;
            this._showElFurrito();
            for (var i = 0; i < this._barrells.length; i++) {
                var grow = this.game.add.tween(this._barrells[i].scale).to({ y: 1 }, 500, Phaser.Easing.Bounce.Out, true, 1000);
            }
        };
        MainGameGroup.prototype._resetGame = function () {
            this._elFurrito.scale.setTo(-1, 1);
            var moveFurrito = this.game.add.tween(this._elFurrito).to({ x: this._elFurrito.position.x - 300 }, 300, Phaser.Easing.Quintic.In, true);
            for (var i = 0; i < this._barrells.length; i++) {
                if (this._barrells[i].getRevealed()) {
                    var alpha = this.game.add.tween(this._barrells[i]).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0);
                    var explosions = this.game.add.tween(this._barrellsExplosion[i]).to({ alpha: 0 }, 100, Phaser.Easing.Linear.None, true, 0);
                }
                else {
                    var disapear = this.game.add.tween(this._barrells[i].scale).to({ y: 0 }, 500, Phaser.Easing.Exponential.In, true, 0);
                    var shadows = this.game.add.tween(this._barrellsShadows[i]).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0);
                }
            }
        };
        MainGameGroup.prototype._endGame = function () {
            for (var i = 0; i < this._barrells.length; i++) {
                if (!this._barrells[i].getRevealed()) {
                    var shadows = this.game.add.tween(this._barrellsShadows[i]).to({ alpha: 1 }, 700, Phaser.Easing.Linear.None, true, 0);
                    var explosions = this.game.add.tween(this._barrellsShadows[i]).to({ alpha: 0.7 }, 700, Phaser.Easing.Linear.None, true, 0);
                    var tint = this.game.add.tween(this._barrells[i]).to({ tint: 0x4D4D4D }, 700, Phaser.Easing.Linear.None, true, 0);
                }
            }
        };
        MainGameGroup.prototype._hideElFurrito = function () {
            this._elFurrito.scale.setTo(-1, 1);
            IWG.SignalManager.instance.dispatch('Audio.playAudio', IWG.Sounds.SWOOSH, IWG.SoundChannels.FX_SOUNDS);
            var hide = this.game.add.tween(this._elFurrito).to({ x: this._elFurrito.position.x - 300 }, 1000, Phaser.Easing.Quintic.In, true);
            hide.onComplete.add(function () {
                IWG.SignalManager.instance.dispatch('showEndGame');
            }, this);
        };
        MainGameGroup.prototype._showElFurrito = function () {
            var moveFurrito = this.game.add.tween(this._elFurrito).to({ x: 150 }, 1000, Phaser.Easing.Quintic.In, true, 1000);
            moveFurrito.onStart.add(function () {
                IWG.SignalManager.instance.dispatch('Audio.playAudio', IWG.Sounds.SWOOSH, IWG.SoundChannels.FX_SOUNDS);
            }, this);
        };
        return MainGameGroup;
    }(IWG.GameGroup));
    IWG.MainGameGroup = MainGameGroup;
})(IWG || (IWG = {}));
var IWG;
(function (IWG) {
    var SplashGroup = (function (_super) {
        __extends(SplashGroup, _super);
        function SplashGroup() {
            _super.call(this);
            this._gameName = null;
            this._winupto = null;
            this._bigCactus = null;
            this._skull = null;
            this._playButton = null;
            this._weed = null;
            this._weedTween = null;
            var spritesheet = 'startScreen';
            this._gameName = this.game.add.image(0, 0, spritesheet, 'cowboyCash', this);
            this._gameName.anchor.setTo(0.5, 0.5);
            this._gameName.position.setTo(this.game.width / 2, -150);
            this._winupto = this.game.add.image(0, 0, spritesheet, 'winupto', this);
            this._winupto.anchor.setTo(0.5, 0.5);
            this._winupto.position.setTo(this.game.width / 2, -150);
            this._weed = this.game.add.image(0, 0, 'mainGame', 'tumbleweed', this);
            this._weed.anchor.setTo(0.5, 0.5);
            this._weed.position.setTo(1300, 400);
            this._weed.alpha = 1;
            this._bigCactus = this.game.add.image(0, 0, spritesheet, 'cactus', this);
            this._bigCactus.anchor.setTo(0.5, 1.0);
            this._bigCactus.position.setTo(this.game.width / 2, 575);
            this._bigCactus.alpha = 0;
            this._playButton = this.game.add.image(0, 0, spritesheet, 'buttonBackground', this);
            this._playButton.anchor.setTo(0.5, 0.5);
            this._playButton.position.setTo(this.game.width / 2, 550);
            this._playButton.alpha = 0;
            this._skull = this.game.add.image(0, 0, spritesheet, 'skull', this);
            this._skull.anchor.setTo(0.5, 0.5);
            this._skull.position.setTo(700, 575);
            this._skull.alpha = 0;
            var playTextImage = this.game.add.image(0, 0, spritesheet, 'playText', this);
            playTextImage.anchor.setTo(0.5, 0.5);
            this._playButton.addChild(playTextImage);
            var idleAnimation = this.game.add.tween(this._playButton.scale).to({ x: 0.9, y: 0.9 }, 500, Phaser.Easing.Quadratic.Out, true, 100, -1);
            idleAnimation.yoyo(true, 3000);
            this._weedTween = this.game.add.tween(this._weed).to({ x: -50 }, 3500, Phaser.Easing.Linear.None, true, 5000, -1);
            this._weedTween.repeatDelay(this.game.rnd.integerInRange(10000, 20000));
            var weedRotation = this.game.add.tween(this._weed).to({ angle: -359 }, 500, Phaser.Easing.Linear.None, true, 100, -1);
            weedRotation.onComplete.add(function () {
                this._weed.angle = 0;
            }, this);
            var jumpTimer = this.game.time.create(false);
            jumpTimer.loop(2000, function () {
                var tween = this.game.add.tween(this._weed).to({ y: this._weed.y - 20 }, this.game.rnd.integerInRange(100, 200), Phaser.Easing.Bounce.In, true);
                tween.yoyo(true);
            }, this);
            jumpTimer.start();
            this._playButton.events.onInputUp.add(function () {
                this._playButton.inputEnabled = false;
                IWG.SignalManager.instance.dispatch('mainGameIntro');
                IWG.SignalManager.instance.dispatch('Audio.playAudio', IWG.Sounds.PLAYBUTTON, IWG.SoundChannels.FX_SOUNDS);
            }, this);
        }
        SplashGroup.prototype.subscribeSignals = function () {
            IWG.SignalManager.instance.add('showSplashGroup', this._show, this);
            IWG.SignalManager.instance.add('mainGameIntro', this._hide, this);
        };
        SplashGroup.prototype.unsubscribeSignals = function () {
            IWG.SignalManager.instance.remove('showSplashGroup', this._show, this);
            IWG.SignalManager.instance.remove('mainGameIntro', this._hide, this);
        };
        SplashGroup.prototype._show = function () {
            this._bigCactus.alpha = 0;
            this._bigCactus.scale.y = 1.0;
            this._bigCactus.scale.x = 1.0;
            this._gameName.position.y = -150;
            this._winupto.position.y = -150;
            this._gameName.alpha = 1;
            this._winupto.alpha = 1;
            var nameTween = this.game.add.tween(this._gameName).to({ y: 185 }, 500, Phaser.Easing.Linear.None, true);
            var winUpTween = this.game.add.tween(this._winupto).to({ y: 215 }, 500, Phaser.Easing.Linear.None, true);
            var cactusTween = this.game.add.tween(this._bigCactus).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 500);
            var skullTween = this.game.add.tween(this._skull).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 500);
            var playTween = this.game.add.tween(this._playButton).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 500);
            playTween.onComplete.add(function () {
                this._playButton.inputEnabled = true;
            }, this);
            var weedTween = this.game.add.tween(this._weed).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 500);
            IWG.SignalManager.instance.dispatch('Audio.playAudio', IWG.Sounds.BACKGROUNDLOOP, IWG.SoundChannels.BACKGROUND);
            IWG.SignalManager.instance.dispatch('Audio.setChannelVolume', IWG.SoundChannels.BACKGROUND, 1, true, 500);
            IWG.SignalManager.instance.dispatch('Audio.playAudio', IWG.Sounds.MEGASWOOSH, IWG.SoundChannels.FX_SOUNDS);
        };
        SplashGroup.prototype._hide = function () {
            var nameTween = this.game.add.tween(this._gameName).to({ alpha: 0 }, 250, Phaser.Easing.Linear.None, true);
            var winUpTween = this.game.add.tween(this._winupto).to({ alpha: 0 }, 250, Phaser.Easing.Linear.None, true);
            var cactusTween = this.game.add.tween(this._bigCactus.scale).to({ y: 0, x: 0.5 }, 250, Phaser.Easing.Exponential.Out, true);
            var skullTween = this.game.add.tween(this._skull).to({ alpha: 0 }, 250, Phaser.Easing.Linear.None, true);
            var playTween = this.game.add.tween(this._playButton).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
            var weedTween = this.game.add.tween(this._weed).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 500);
        };
        return SplashGroup;
    }(IWG.GameGroup));
    IWG.SplashGroup = SplashGroup;
})(IWG || (IWG = {}));
var IWG;
(function (IWG) {
    var MainGame = (function (_super) {
        __extends(MainGame, _super);
        function MainGame() {
            _super.apply(this, arguments);
            this._mainGameGroup = null;
            this._backgroundGroup = null;
            this._endGroup = null;
            this._splashGroup = null;
        }
        MainGame.prototype.subscribeSignals = function () {
            IWG.SignalManager.instance.add('startGame', this._startGame, this);
            IWG.SignalManager.instance.add('restartGame', this._restart, this);
            IWG.SignalManager.instance.add('screenShakeSignal', this._shake, this);
        };
        MainGame.prototype.unsubscribeSignals = function () {
            IWG.SignalManager.instance.remove('startGame', this._startGame, this);
            IWG.SignalManager.instance.remove('restartGame', this._restart, this);
            IWG.SignalManager.instance.remove('screenShakeSignal', this._shake, this);
        };
        MainGame.prototype.create = function () {
            _super.prototype.create.call(this);
            IWG.Debug.instance.log('[states/MainGame.ts] [create] MainGame created!', IWG.DEBUGTYPE.CORE);
            this.stage.disableVisibilityChange = true;
            this._backgroundGroup = new IWG.BackgroundGroup();
            this.add.existing(this._backgroundGroup);
            this._splashGroup = new IWG.SplashGroup();
            this.add.existing(this._splashGroup);
            this._endGroup = new IWG.EndGameGroup();
            this.add.existing(this._endGroup);
            this._endGroup.position.setTo(1300);
            this._mainGameGroup = new IWG.MainGameGroup();
            this.add.existing(this._mainGameGroup);
            IWG.SignalManager.instance.dispatch('initialIntro');
            IWG.SignalManager.instance.checkAllSignals();
        };
        MainGame.prototype._restart = function () {
            this._endGroup.position.set(1300, 0);
        };
        MainGame.prototype._startGame = function () {
            if (this._mainGameGroup === null) {
                this._mainGameGroup = new IWG.MainGameGroup();
                this.add.existing(this._mainGameGroup);
            }
            else {
                this._mainGameGroup.destroy();
                this._mainGameGroup = new IWG.MainGameGroup();
                this.add.existing(this._mainGameGroup);
            }
            this._mainGameGroup._setupLayout();
            IWG.SignalManager.instance.dispatch('showMainGame');
        };
        MainGame.prototype._shake = function (x, y, repeats) {
            if (x === void 0) { x = 5; }
            if (y === void 0) { y = 5; }
            if (repeats === void 0) { repeats = 2; }
            if (Math.random() > 0.5) {
                x = -x;
            }
            if (Math.random() > 0.5) {
                y = -y;
            }
            var shake1 = IWG.GameManager.instance.add.tween(this._mainGameGroup).to({
                x: x,
                y: y
            }, 50, Phaser.Easing.power2, true, 0, repeats, true);
            shake1.onStart.add(function () {
                var shake1 = IWG.GameManager.instance.add.tween(this._backgroundGroup).to({
                    x: x,
                    y: y
                }, 50, Phaser.Easing.power2, true, 0, repeats, true);
            }, this);
        };
        MainGame.SPRITESHEET_ID = "game0";
        return MainGame;
    }(IWG.GameState));
    IWG.MainGame = MainGame;
})(IWG || (IWG = {}));
var IWG;
(function (IWG) {
    var DebugController = (function () {
        function DebugController() {
            this.ppreload = false;
            this.pcore = false;
            this.panimation = false;
            this.pticket = false;
            this.perror = false;
            this.pgeneral = false;
            this.pinit = false;
            this.pdebug = false;
            if (DebugController.instance === null) {
                DebugController.instance = this;
            }
            else {
                throw new Error("Cant make 2 DebugController, use .instance instead.");
            }
            ;
        }
        DebugController.prototype.log = function (msg, channel, scope) {
            if (channel === void 0) { channel = 'general'; }
            if (scope === void 0) { scope = this; }
            switch (channel) {
                case 'preload':
                    {
                        if (this.ppreload) {
                            console.log('%c[PRELOAD],' + msg, "color: green");
                        }
                        break;
                    }
                    ;
                case 'core':
                    {
                        if (this.pcore) {
                            console.log('%c[CORE],' + msg, "color: orange");
                        }
                        break;
                    }
                    ;
                case 'animation':
                    {
                        if (this.panimation) {
                            console.log('%c[ANIMATION],' + msg, "color: blue");
                        }
                        break;
                    }
                    ;
                case 'ticket':
                    {
                        if (this.pticket) {
                            console.log('%c[TICKET] ' + msg, "color: pink");
                        }
                        break;
                    }
                    ;
                case 'error':
                    {
                        if (this.perror) {
                            console.log('%c[ERROR] ' + msg, "color: red");
                        }
                        break;
                    }
                    ;
                case 'init':
                    {
                        if (this.perror) {
                            console.log('%c[INITIALISED] ' + msg, "color: magenta");
                        }
                        break;
                    }
                    ;
                case 'debug':
                    {
                        if (this.perror) {
                            console.log('%c[DEBUG] ' + msg, "color: purple");
                        }
                        break;
                    }
                    ;
                case 'general':
                default:
                    {
                        if (this.pgeneral) {
                            console.log('%c[GENERAL] ' + msg, "color: black");
                        }
                        break;
                    }
                    ;
            }
        };
        ;
        DebugController.prototype.warn = function (msg, channel, scope) {
            if (channel === void 0) { channel = 'general'; }
            if (scope === void 0) { scope = this; }
            switch (channel) {
                case 'preload':
                    {
                        if (this.ppreload) {
                            console.warn('%c[PRELOAD],' + msg, "color: green");
                        }
                        break;
                    }
                    ;
                case 'core':
                    {
                        if (this.pcore) {
                            console.warn('%c[CORE],' + msg, "color: orange");
                        }
                        break;
                    }
                    ;
                case 'animation':
                    {
                        if (this.panimation) {
                            console.warn('%c[ANIMATION],' + msg, "color: blue");
                        }
                        break;
                    }
                    ;
                case 'ticket':
                    {
                        if (this.pticket) {
                            console.warn('%c[TICKET],' + msg, "color: pink");
                        }
                        break;
                    }
                    ;
                case 'error':
                    {
                        if (this.perror) {
                            console.warn('%c[ERROR],' + msg, "color: red");
                        }
                        break;
                    }
                    ;
                case 'init':
                    {
                        if (this.perror) {
                            console.warn('%c[INITIALISED],' + msg, "color: magenta");
                        }
                        break;
                    }
                    ;
                case 'debug':
                    {
                        if (this.perror) {
                            console.warn('%c[DEBUG] ' + msg, "color: purple");
                        }
                        break;
                    }
                    ;
                case 'general':
                default:
                    {
                        if (this.pgeneral) {
                            console.warn('%c[GENERAL],' + msg, "color: black");
                        }
                        break;
                    }
                    ;
            }
        };
        ;
        DebugController.prototype.error = function (msg, channel, scope) {
            if (channel === void 0) { channel = 'general'; }
            if (scope === void 0) { scope = this; }
            switch (channel) {
                case 'preload':
                    {
                        if (this.ppreload) {
                            console.error('%c[PRELOAD]' + msg, "color: green");
                        }
                        break;
                    }
                    ;
                case 'core':
                    {
                        if (this.pcore) {
                            console.error('%c[CORE]' + msg, "color: orange");
                        }
                        break;
                    }
                    ;
                case 'animation':
                    {
                        if (this.panimation) {
                            console.error('%c[ANIMATION]' + msg, "color: blue");
                        }
                        break;
                    }
                    ;
                case 'ticket':
                    {
                        if (this.pticket) {
                            console.error('%c[TICKET]' + msg, "color: pink");
                        }
                        break;
                    }
                    ;
                case 'error':
                    {
                        if (this.perror) {
                            console.error('%c[ERROR]' + msg, "color: red");
                        }
                        break;
                    }
                    ;
                case 'init':
                    {
                        if (this.perror) {
                            console.error('%c[INITIALISED],' + msg, "color: magenta");
                        }
                        break;
                    }
                    ;
                case 'debug':
                    {
                        if (this.perror) {
                            console.error('%c[DEBUG] ' + msg, "color: purple");
                        }
                        break;
                    }
                    ;
                case 'general':
                default:
                    {
                        if (this.pgeneral) {
                            console.error('%c[GENERAL]' + msg, "color: black");
                        }
                        break;
                    }
                    ;
            }
        };
        ;
        DebugController.prototype.setAll = function () {
            console.log("%c[DEBUG] " + "Debug messages showing ALL.", "color: gray");
            this.panimation = true;
            this.pcore = true;
            this.perror = true;
            this.pgeneral = true;
            this.ppreload = true;
            this.pticket = true;
            this.pinit = true;
            this.pdebug = true;
        };
        ;
        DebugController.prototype.setOFF = function () {
            console.log("%c[DEBUG] " + "Debug messages showing NONE.", "color: gray");
            this.panimation = false;
            this.pcore = false;
            this.perror = false;
            this.pgeneral = false;
            this.ppreload = false;
            this.pticket = false;
            this.pinit = false;
            this.pdebug = false;
        };
        ;
        DebugController.prototype.setPRELOAD = function () {
            if (this.ppreload) {
                console.log("%c[DEBUG] " + "Preloader messages turned off.", "color: gray");
                this.ppreload = false;
            }
            else {
                console.log("%c[DEBUG] " + "Preloader messages turned on.", "color: gray");
                this.ppreload = true;
            }
        };
        DebugController.prototype.setCORE = function () {
            if (this.pcore) {
                console.log("%c[DEBUG] " + "Core messages turned off.", "color: gray");
                this.pcore = false;
            }
            else {
                console.log("%c[DEBUG] " + "Core messages turned on.", "color: gray");
                this.pcore = true;
            }
        };
        DebugController.prototype.setANIMATION = function () {
            if (this.panimation) {
                console.log("%c[DEBUG] " + "Animation messages turned off.", "color: gray");
                this.panimation = false;
            }
            else {
                console.log("%c[DEBUG] " + "Animation messages turned on.", "color: gray");
                this.panimation = true;
            }
        };
        DebugController.prototype.setERROR = function () {
            if (this.perror) {
                console.log("%c[DEBUG] " + "Error messages turned off.", "color: gray");
                this.perror = false;
            }
            else {
                console.log("%c[DEBUG] " + "Error messages turned on.", "color: gray");
                this.perror = true;
            }
        };
        DebugController.prototype.setGENERAL = function () {
            if (this.pgeneral) {
                console.log("%c[DEBUG] " + "General messages turned off.", "color: gray");
                this.pgeneral = false;
            }
            else {
                console.log("%c[DEBUG] " + "General messages turned on.", "color: gray");
                this.pgeneral = true;
            }
        };
        DebugController.prototype.setTICKET = function () {
            if (this.pticket) {
                console.log("%c[DEBUG] " + "Ticket messages turned off.", "color: gray");
                this.pticket = false;
            }
            else {
                console.log("%c[DEBUG] " + "Ticket messages turned on.", "color: gray");
                this.pticket = true;
            }
        };
        DebugController.prototype.setINIT = function () {
            if (this.pinit) {
                console.log("%c[DEBUG] " + "Init messages turned off.", "color: gray");
                this.pinit = false;
            }
            else {
                console.log("%c[DEBUG] " + "Init messages turned on.", "color: gray");
                this.pinit = true;
            }
        };
        ;
        DebugController.prototype.setDEBUG = function () {
            if (this.pinit) {
                console.log("%c[DEBUG] " + "Debug messages turned off.", "color: gray");
                this.pdebug = false;
            }
            else {
                console.log("%c[DEBUG] " + "Debug messages turned on.", "color: gray");
                this.pdebug = true;
            }
        };
        ;
        DebugController.instance = null;
        return DebugController;
    }());
    IWG.DebugController = DebugController;
    ;
    var DEBUGTYPE = (function () {
        function DEBUGTYPE() {
        }
        DEBUGTYPE.PRELOADER = "preload";
        DEBUGTYPE.ANIMATION = "animation";
        DEBUGTYPE.GENERAL = "general";
        DEBUGTYPE.CORE = "core";
        DEBUGTYPE.TICKET = "ticket";
        DEBUGTYPE.ERROR = "error";
        DEBUGTYPE.INIT = "init";
        DEBUGTYPE.DEBUG = "debug";
        return DEBUGTYPE;
    }());
    IWG.DEBUGTYPE = DEBUGTYPE;
    var Debug = (function () {
        function Debug() {
            this.controller = null;
            if (Debug.instance === null) {
                Debug.instance = this;
                this.controller = new DebugController();
                this.log("DebugManager initialised.", DEBUGTYPE.INIT, this);
            }
            else {
                throw new Error("Cant make 2 debug, use .instance instead.");
            }
            ;
        }
        ;
        Debug.prototype.log = function (message, channel, scope) {
            if (channel === void 0) { channel = 'general'; }
            if (scope === void 0) { scope = this; }
            this.controller.log(message, channel, scope);
        };
        ;
        Debug.prototype.warn = function (message, channel, scope) {
            if (channel === void 0) { channel = 'general'; }
            if (scope === void 0) { scope = this; }
            this.controller.warn(message, channel, scope);
        };
        ;
        Debug.prototype.error = function (message, channel, scope) {
            if (channel === void 0) { channel = 'general'; }
            if (scope === void 0) { scope = this; }
            this.controller.error(message, channel, scope);
        };
        ;
        Debug.instance = null;
        Debug.OFF = function () { Debug.instance.controller.setOFF(); };
        Debug.ALL = function () { Debug.instance.controller.setAll(); };
        Debug.PRELOADER = function () { Debug.instance.controller.setPRELOAD(); };
        Debug.CORE = function () { Debug.instance.controller.setCORE(); };
        Debug.ANIMATIONS = function () { Debug.instance.controller.setANIMATION(); };
        Debug.GENERAL = function () { Debug.instance.controller.setGENERAL(); };
        Debug.TICKET = function () { Debug.instance.controller.setTICKET(); };
        Debug.ERROR = function () { Debug.instance.controller.setERROR(); };
        Debug.INIT = function () { Debug.instance.controller.setINIT(); };
        Debug.DEBUG = function () { Debug.instance.controller.setDEBUG(); };
        return Debug;
    }());
    IWG.Debug = Debug;
})(IWG || (IWG = {}));
var IWG;
(function (IWG) {
    var GameManager = (function (_super) {
        __extends(GameManager, _super);
        function GameManager(loader) {
            _super.call(this, GameManager.NATIVE_WIDTH, GameManager.NATIVE_HEIGHT, Phaser.AUTO, 'gameArea', true, true);
            this._signalManager = null;
            this._audioManager = null;
            this._ticketManager = null;
            this._T40_TicketManager = null;
            this._languageCurrency = null;
            this._deviceManager = null;
            this._boot = null;
            this._preloader = null;
            this._maingame = null;
            this._prizeNum = null;
            this._arr_winningPrizes = [];
            this._arr_finishedPrizes = [];
            new IWG.Debug();
            IWG.Debug.ALL();
            if (GameManager.instance === null) {
                throw new Error("Tried to make a game manager when one already existed. To use GameManager, use GameManager.instance ");
            }
            else {
                GameManager.instance = this;
                IWG.Debug.instance.log("GameManager initialised!", IWG.DEBUGTYPE.INIT, this);
                this._signalManager = new IWG.SignalManager();
                this._audioManager = new IWG.AudioManager(this);
                this._ticketManager = new IWG.TicketManager();
                this._T40_TicketManager = new IWG.T40_Ticket_Manager();
                this._languageCurrency = new IWG.LanguageCurrencyManager();
                this._deviceManager = new IWG.DeviceManager();
                this._prizeNum = -1;
                if (this._T40_TicketManager.init(loader)) {
                    console.log("Ticket = " + loader);
                    IWG.Debug.instance.log("T40Link initialised!", IWG.DEBUGTYPE.INIT, this);
                    this._boot = new IWG.Boot();
                    this._preloader = new IWG.Preloader();
                    this._maingame = new IWG.MainGame();
                    this.state.add('Boot', this._boot, false);
                    this.state.add('Preloader', this._preloader, false);
                    this.state.add('MainGame', this._maingame, false);
                    this._subscribeSignals();
                    this.state.start('Boot');
                }
                else {
                    throw new Error("Invalid ticket. Bye bye");
                }
            }
        }
        ;
        GameManager.prototype._subscribeSignals = function () {
            IWG.SignalManager.instance.add('states.SwitchState', this._switchState, this);
            IWG.SignalManager.instance.add('addWinningRevealedPrize', this._addWinningRevealedPrize, this);
            IWG.SignalManager.instance.add('addFinishedRevealedPrize', this._addFinishedPrize, this);
            IWG.SignalManager.instance.add('restartGame', this._restartGame, this);
        };
        ;
        GameManager.prototype._unsubscribeSignals = function () {
            IWG.SignalManager.instance.remove('states.SwitchState', this._switchState, this);
            IWG.SignalManager.instance.remove('addWinningRevealedPrize', this._addWinningRevealedPrize, this);
            IWG.SignalManager.instance.remove('addFinishedRevealedPrize', this._addFinishedPrize, this);
            IWG.SignalManager.instance.remove('restartGame', this._restartGame, this);
        };
        GameManager.prototype._switchState = function (name) {
            this.state.start(name);
        };
        GameManager.prototype._restartGame = function () {
            this._prizeNum = -1;
            this._arr_winningPrizes = [];
        };
        GameManager.prototype._addWinningRevealedPrize = function (prize) {
            if (prize != null) {
                this._arr_winningPrizes.push(prize);
                console.log('array length: ', this._arr_winningPrizes.length);
                if (this._arr_winningPrizes.length === 3) {
                    var counter = 0;
                    this._arr_winningPrizes.forEach(function (prize) {
                        prize.updateGameRow_Core(counter);
                        counter++;
                    });
                }
            }
        };
        ;
        GameManager.prototype._addFinishedPrize = function (prize) {
            if (prize != null) {
                this._arr_finishedPrizes.push(prize);
                if (this._arr_finishedPrizes.length === 6) {
                    if (this._ticketManager.getIsWinner()) {
                        IWG.SignalManager.instance.dispatch('gameFinished', 'win');
                    }
                    else {
                        IWG.SignalManager.instance.dispatch('gameFinished', 'lose');
                    }
                }
            }
        };
        ;
        GameManager.prototype.getNextPrize = function () {
            this._prizeNum++;
            return { a: GameManager.instance.getTicketManager().getGameOneTurn(this._prizeNum).value, w: GameManager.instance.getTicketManager().getGameOneTurn(this._prizeNum).w, i: GameManager.instance.getTicketManager().getGameOneTurn(this._prizeNum).pIndex };
        };
        GameManager.prototype.getTicketManager = function () {
            return this._ticketManager;
        };
        GameManager.prototype.getAudioManager = function () {
            return this._audioManager;
        };
        GameManager.NATIVE_HEIGHT = 640;
        GameManager.NATIVE_WIDTH = 1136;
        return GameManager;
    }(Phaser.Game));
    IWG.GameManager = GameManager;
})(IWG || (IWG = {}));
var IWG;
(function (IWG) {
    var Preloader_Core = (function (_super) {
        __extends(Preloader_Core, _super);
        function Preloader_Core() {
            _super.apply(this, arguments);
        }
        Preloader_Core.prototype.preload = function () {
            IWG.Debug.instance.log('[core/Preloader_core.ts] [preload] Preloader CORE preloading...', 'core');
            _super.prototype.preload.call(this);
        };
        Preloader_Core.prototype.create = function () {
            IWG.Debug.instance.log('[core/Preloader_core.ts] [create] Preloader CORE creating...', 'core');
            _super.prototype.create.call(this);
            this.stage.disableVisibilityChange = true;
            this.game.load.reset();
            this.setupLoadingScene();
            this.addAssetsToLoad();
            this.game.load.onFileStart.add(this.fileStarted, this);
            this.game.load.onFileComplete.add(this.fileLoaded, this);
            this.game.load.onFileError.add(this.fileFailed, this);
            this.game.load.onLoadComplete.add(this.onLoad, this);
            this.load.start();
        };
        Preloader_Core.prototype.setupLoadingScene = function () {
            IWG.Debug.instance.log('[core/Preloader_core.ts] [preload] Setting up loading scene...', 'preload');
        };
        Preloader_Core.prototype.addAssetsToLoad = function () {
            IWG.Debug.instance.log('[core/Preloader_core.ts] [preload] Adding assets to load...', 'preload');
        };
        Preloader_Core.prototype.fileStarted = function (progress, cacheKey, fileurl) {
            IWG.Debug.instance.log('[core/Preloader_core.ts] Preloader.filestarted(' + progress + ', ' + cacheKey + ', ' + fileurl + ')', 'preload');
        };
        Preloader_Core.prototype.fileLoaded = function (progress, cacheKey, success, totalLoaded, totalFiles) {
            IWG.Debug.instance.log('[core/Preloader_core.ts] Preloader.fileLoaded(' + progress + ', ' + cacheKey + ', ' + success + ', ' + totalLoaded + ', ' + totalFiles + ')', 'preload');
        };
        Preloader_Core.prototype.fileFailed = function (cacheKey, errorObj) {
            IWG.Debug.instance.log('[core/Preloader_core.ts] Preloader.fileFailed(' + cacheKey + errorObj + ')', 'preload');
        };
        Preloader_Core.prototype.onLoad = function () {
            IWG.Debug.instance.log('[core/Preloader_core.ts] Preloader.onLoad()', 'preload');
        };
        return Preloader_Core;
    }(Phaser.State));
    IWG.Preloader_Core = Preloader_Core;
})(IWG || (IWG = {}));
var IWG;
(function (IWG) {
    var DeviceManager = (function () {
        function DeviceManager() {
            this._initialised = false;
            this._gameArea = null;
            this._useProperFullscreen = true;
            this._useFullscreen = false;
            this._useOrientation = false;
            this._pauseOnIncorrect = false;
            this._autoRefresh = false;
            this._currentlyFullscreen = false;
            this._fullscreenDiv = null;
            this._currentOrientation = null;
            this._orientationDiv = null;
            if (DeviceManager.instance == null) {
                DeviceManager.instance = this;
            }
            else {
                throw new Error("Cannot create multiple instances of DeviceManager, please use DeviceManager.instance instead.");
            }
        }
        Object.defineProperty(DeviceManager.prototype, "useProperFullscreen", {
            get: function () {
                return this._useProperFullscreen;
            },
            set: function (input) {
                this._useProperFullscreen = input;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeviceManager.prototype, "fullscreen", {
            get: function () {
                return this._useFullscreen;
            },
            set: function (input) {
                this._useFullscreen = input;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeviceManager.prototype, "orientation", {
            get: function () {
                return this._useOrientation;
            },
            set: function (input) {
                this._useOrientation = input;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeviceManager.prototype, "pauseOnIncorrect", {
            get: function () {
                return this._pauseOnIncorrect;
            },
            set: function (input) {
                this._pauseOnIncorrect = input;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DeviceManager.prototype, "autoRefresh", {
            get: function () {
                return this._autoRefresh;
            },
            set: function (input) {
                this._autoRefresh = input;
            },
            enumerable: true,
            configurable: true
        });
        DeviceManager.prototype.init = function () {
            if (!this._initialised) {
                this._initialised = true;
                this._gameArea = document.getElementById('gameArea');
                if (IWG.GameManager.instance.device.iPad) {
                    this._useFullscreen = false;
                }
                if (this._useFullscreen) {
                    if (this._useProperFullscreen && this._supportsFullscreen()) {
                        this._addWebAPIFullscreenOverlay();
                    }
                    else {
                        this._addFullscreenOverlay();
                    }
                }
                if (this._useOrientation) {
                    IWG.GameManager.instance.scale.forceOrientation(true, false);
                    this._addOrientationOverlay();
                }
            }
        };
        DeviceManager.prototype.update = function () {
            if (this._useFullscreen) {
                this._checkFullscreen();
            }
        };
        DeviceManager.prototype.deviceStatus = function () {
            return { fullscreen: this._currentlyFullscreen, orientation: this._currentOrientation };
        };
        DeviceManager.prototype._addFullscreenOverlay = function () {
            this._fullscreenDiv = document.createElement("div");
            this._fullscreenDiv.id = "fullScreenMask";
            this._fullscreenDiv.className = "fs_off";
            var slideText = document.createElement("p");
            slideText.appendChild(document.createTextNode("Swipe up to go fullscreen."));
            this._fullscreenDiv.appendChild(slideText);
            document.body.appendChild(this._fullscreenDiv);
            this._addFullscreenListeners();
        };
        ;
        DeviceManager.prototype._addWebAPIFullscreenOverlay = function () {
            this._fullscreenDiv = document.createElement("div");
            this._fullscreenDiv.id = "fullScreenMask";
            this._fullscreenDiv.className = "fs_off";
            var slideText = document.createElement("p");
            slideText.appendChild(document.createTextNode("Tap to go fullscreen."));
            this._fullscreenDiv.appendChild(slideText);
            this._fullscreenDiv.style.height = "100%";
            document.body.appendChild(this._fullscreenDiv);
            this._addWebAPIFullscreenListeners();
        };
        ;
        DeviceManager.prototype._addFullscreenListeners = function () {
            var _this = this;
            window.addEventListener('scroll', function () {
                _this._checkFullscreen();
            });
            window.addEventListener('touchmove', function () {
                _this._checkFullscreen();
            });
            window.addEventListener('resize', function () {
                _this._checkFullscreen();
            });
            window.addEventListener('touchend', function () {
                _this._checkFullscreen(true);
                IWG.GameManager.instance.time.events.add(150, function () {
                    _this._checkFullscreen();
                });
            });
            window.addEventListener('visibilitychange', function () {
                if (!(document.visibilityState === "hidden")) {
                    _this._displayFullscreenOverlay();
                }
            });
        };
        DeviceManager.prototype._addWebAPIFullscreenListeners = function () {
            var _this = this;
            this._fullscreenDiv.addEventListener('mousedown', function () {
                _this._goProperFullscreen();
            });
            this._fullscreenDiv.addEventListener('touchdown', function () {
                _this._goProperFullscreen();
            });
            window.addEventListener('resize', function () {
                _this._checkFullscreen();
            });
            window.addEventListener('visibilitychange', function () {
                if (!(document.visibilityState === "hidden")) {
                    _this._displayFullscreenOverlay();
                }
            });
        };
        DeviceManager.prototype._checkFullscreen = function (goFull) {
            if (goFull === void 0) { goFull = false; }
            var windowInnerHeight = Math.min(window.innerWidth, window.innerHeight);
            var screenHeight = Math.min(window.screen.width, window.screen.height);
            var magicRatio = 8;
            var difference = Math.abs(windowInnerHeight - screenHeight);
            IWG.GameManager.instance.debug.reset();
            if ((100 / screenHeight) * difference > magicRatio) {
                this._displayFullscreenOverlay();
            }
            else {
                this._deviceInFullscreen();
            }
        };
        DeviceManager.prototype._goProperFullscreen = function () {
            IWG.GameManager.instance.scale.startFullScreen(false);
        };
        DeviceManager.prototype._displayFullscreenOverlay = function () {
            if (this._pauseOnIncorrect) {
                IWG.GameManager.instance.paused = true;
            }
            window.removeEventListener('scroll', this._removeDefault);
            window.removeEventListener('touchmove', this._removeDefault);
            this._currentlyFullscreen = false;
            this._fullscreenDiv.className = "fs_on";
        };
        DeviceManager.prototype._deviceInFullscreen = function () {
            if (this._pauseOnIncorrect) {
                IWG.GameManager.instance.paused = false;
            }
            window.addEventListener('scroll', this._removeDefault);
            window.addEventListener('touchmove', this._removeDefault);
            this._currentlyFullscreen = false;
            this._fullscreenDiv.className = "fs_off";
        };
        DeviceManager.prototype._addOrientationOverlay = function () {
            this._orientationDiv = document.createElement("div");
            this._orientationDiv.id = "rotateDevice";
            this._orientationDiv.className = "hide";
            document.body.appendChild(this._orientationDiv);
            this._setupOrientationListeners();
        };
        DeviceManager.prototype._setupOrientationListeners = function () {
            IWG.GameManager.instance.scale.enterIncorrectOrientation.add(this._displayOrientationOverlay, this);
            IWG.GameManager.instance.scale.leaveIncorrectOrientation.add(this._gameCorrectOrientation, this);
        };
        DeviceManager.prototype._displayOrientationOverlay = function () {
            if (this._pauseOnIncorrect) {
                IWG.GameManager.instance.paused = true;
            }
            if (this._useProperFullscreen) {
                IWG.GameManager.instance.scale.stopFullScreen();
            }
            this._currentOrientation = "portrait";
            this._orientationDiv.className = "show";
            this._gameArea.className = "hide";
        };
        DeviceManager.prototype._gameCorrectOrientation = function () {
            this._currentOrientation = "landscape";
            this._orientationDiv.className = "hide";
            this._gameArea.className = "show";
            this._checkFullscreen();
        };
        DeviceManager.prototype._supportsFullscreen = function () {
            var tsfixDocument = document;
            return (tsfixDocument.fullscreenEnabled ||
                tsfixDocument.webkitFullscreenEnabled ||
                tsfixDocument.mozFullScreenEnabled ||
                tsfixDocument.msFullscreenEnabled);
        };
        DeviceManager.prototype._removeDefault = function (e) {
            if (e.preventDefault) {
                e.preventDefault();
            }
        };
        DeviceManager.instance = null;
        return DeviceManager;
    }());
    IWG.DeviceManager = DeviceManager;
})(IWG || (IWG = {}));
var IWG;
(function (IWG) {
    var BackgroundGroup = (function (_super) {
        __extends(BackgroundGroup, _super);
        function BackgroundGroup() {
            _super.call(this);
            this._preload = null;
            this._sky = null;
            this._redsky = null;
            this._mountains = null;
            this._ground = null;
            this._clouds = null;
            this._clouds2 = null;
            this._town = null;
            this._townLights = null;
            this._sun = null;
            this._rays = null;
            this._doorHole = null;
            this._door = null;
            this._vulture = null;
            this._cloudsTween = null;
            this._cloudsTween2 = null;
            this._cactus = null;
            this._cactusShadow = null;
            this._currentSkyAlpha = 0;
            this._preload = this.game.add.image(0, 0, 'loadingScreen', this);
            this._preload.sendToBack();
            this._createBackground();
        }
        BackgroundGroup.prototype.subscribeSignals = function () {
            IWG.SignalManager.instance.add('initialIntro', this._initialAnimation, this);
            IWG.SignalManager.instance.add('mainGameIntro', this._mainGameIntro, this);
            IWG.SignalManager.instance.add('endGameIntro', this._endGameIntro, this);
            IWG.SignalManager.instance.add('openJailDoor', this._openJailDoor, this);
            IWG.SignalManager.instance.add('restartGame', this._resetGame, this);
            IWG.SignalManager.instance.add('vulture', this._playVultureAnimation, this);
        };
        BackgroundGroup.prototype.unsubscribeSignals = function () {
            IWG.SignalManager.instance.remove('initialIntro', this._initialAnimation, this);
            IWG.SignalManager.instance.remove('mainGameIntro', this._mainGameIntro, this);
            IWG.SignalManager.instance.remove('endGameIntro', this._endGameIntro, this);
            IWG.SignalManager.instance.remove('openJailDoor', this._openJailDoor, this);
            IWG.SignalManager.instance.remove('restartGame', this._resetGame, this);
            IWG.SignalManager.instance.remove('vulture', this._playVultureAnimation, this);
        };
        BackgroundGroup.prototype._createBackground = function () {
            var spritesheet = 'background';
            this._sky = this.game.add.image(0, 0, spritesheet, 'sky', this);
            this._sky.alpha = 0;
            this._rays = this.game.add.image(0, 0, 'background', 'rays', this);
            this._rays.anchor.setTo(0.5, 0.5);
            this._rays.position.setTo(this.game.width / 2, -400);
            this._rays.alpha = 0.3;
            this._sun = this.game.add.image(0, 0, 'startScreen', 'sun', this);
            this._sun.anchor.setTo(0.5, 0.5);
            this._sun.position.setTo(this.game.width / 2, -500);
            this._redsky = this.game.add.image(0, 0, spritesheet, 'endSky', this);
            this._redsky.scale.setTo(1, 1.1);
            this._redsky.alpha = 0;
            this._clouds = this.game.add.image(0, 0, spritesheet, 'clouds_1', this);
            this._clouds.anchor.setTo(0.5, 0.5);
            this._clouds.position.setTo(1300, 150);
            this._clouds2 = this.game.add.image(0, 0, spritesheet, 'clouds_2', this);
            this._clouds2.anchor.setTo(0.5, 0.5);
            this._clouds2.position.setTo(1300, 80);
            this._mountains = this.game.add.image(0, 0, spritesheet, 'mountains', this);
            this._mountains.position.setTo(0, 242);
            this._town = this.game.add.sprite(0, 0, spritesheet, 'town', this);
            this._town.anchor.setTo(0.5, 0.5);
            this._town.position.setTo(this.game.width / 2, 500);
            this._town.alpha = 0;
            this._doorHole = this.game.add.image(0, 0, 'mainGame', 'doorHole');
            this._doorHole.anchor.setTo(0.5, 0.5);
            this._doorHole.scale.setTo(0.7, 0.7);
            this._doorHole.position.setTo(203, 55);
            this._town.addChild(this._doorHole);
            this._door = this.game.add.sprite(0, 0, 'jailDoor', 'jailDoor_001');
            this._door.anchor.setTo(0.5, 0.5);
            this._door.scale.setTo(0.7, 0.7);
            this._door.position.setTo(210, 55);
            this._town.addChild(this._door);
            this._townLights = this.game.add.image(0, 0, spritesheet, 'townLights', this);
            this._townLights.anchor.setTo(0.5, 0.5);
            this._townLights.position.setTo(this.game.width / 2 - 134, 190);
            this._townLights.alpha = 0;
            this._ground = this.game.add.image(0, 0, spritesheet, 'ground', this);
            this._ground.anchor.setTo(0.5, 0);
            this._ground.position.setTo(this.game.width / 2, 900);
            this._cactus = this.game.add.image(0, 0, "mainGame", 'cactus', this);
            this._cactus.position.setTo(100, 330);
            this._cactus.anchor.setTo(0.5, 1.0);
            this._cactus.scale.setTo(0.0, 0.0);
            this._cactusShadow = this.game.add.image(0, 0, spritesheet, 'cactusShadow', this);
            this._cactusShadow.anchor.setTo(0.5, 0);
            this._cactusShadow.scale.setTo(1.2, 1.2);
            this._cactusShadow.position.setTo(this._cactusShadow.width / 2 - 17, 300);
            this._cactusShadow.alpha = 0;
            this._cloudsTween = this.game.add.tween(this._clouds).to({ x: -200 }, 30000, Phaser.Easing.Linear.None, true, 3000, -1);
            this._cloudsTween.repeatDelay(this.game.rnd.integerInRange(5000, 15000));
            this._cloudsTween.onLoop.add(function () {
                this._clouds.position.setTo(1300, this.game.rnd.integerInRange(10, 150));
            }, this);
            this._cloudsTween2 = this.game.add.tween(this._clouds2).to({ x: -200 }, 37000, Phaser.Easing.Linear.None, true, 12000, -1);
            this._cloudsTween2.repeatDelay(this.game.rnd.integerInRange(2000, 25000));
            this._cloudsTween2.onLoop.add(function () {
                this._clouds2.position.setTo(1300, this.game.rnd.integerInRange(5, 190));
            }, this);
            this._vulture = this.game.add.sprite(0, 0, 'vultureAnimation', 'vulture_1');
            this._vulture.anchor.setTo(0.5, 0.5);
            this._vulture.position.setTo(-100, 150);
            this._town.addChild(this._vulture);
        };
        BackgroundGroup.prototype._initialAnimation = function () {
            var groundTween = this.game.add.tween(this._ground).to({ y: 350 }, 500, Phaser.Easing.Quintic.Out, true, 0);
            groundTween.onComplete.add(function () {
                var mountainsTween = this.game.add.tween(this._mountains).to({ y: 180 }, 500, Phaser.Easing.Exponential.Out, true, 0);
                mountainsTween.onComplete.add(function () {
                    var raysTween = this.game.add.tween(this._rays).to({ y: 300 }, 500, Phaser.Easing.Exponential.Out, true, 250);
                    var sunTween = this.game.add.tween(this._sun).to({ y: 220 }, 500, Phaser.Easing.Exponential.Out, true, 250);
                    var skyTween = this.game.add.tween(this._sky).to({ alpha: 1.0 }, 500, Phaser.Easing.Linear.None, true, 0);
                    sunTween.onComplete.add(function () {
                        IWG.SignalManager.instance.dispatch('showSplashGroup');
                        this._preload.destroy();
                    }, this);
                }, this);
            }, this);
        };
        BackgroundGroup.prototype._mainGameIntro = function () {
            this._town.alpha = 1;
            this._vulture.alpha = 1;
            var moveGround = this.game.add.tween(this._ground).to({ y: 262 }, 500, Phaser.Easing.Linear.None);
            var moveMountains = this.game.add.tween(this._mountains).to({ y: 500 }, 1200, Phaser.Easing.Linear.None);
            var raysTween = this.game.add.tween(this._rays).to({ alpha: 0 }, 100, Phaser.Easing.Linear.None, true, 0);
            var sunTween = this.game.add.tween(this._sun).to({ y: 700 }, 1000, Phaser.Easing.Exponential.In, true, 800);
            sunTween.onComplete.add(function () {
                var moveTown = this.game.add.tween(this._town).to({ y: 185 }, 1000, Phaser.Easing.Exponential.Out, true, 0);
                this.game.add.tween(this._cactus.scale).to({ x: 1, y: 1 }, 500, Phaser.Easing.Exponential.Out, true, 1000);
                IWG.SignalManager.instance.dispatch('startGame');
            }, this);
            moveGround.start();
            moveMountains.start();
        };
        BackgroundGroup.prototype._endGameIntro = function () {
            var redSky = this.game.add.tween(this._redsky).to({ alpha: 1 }, 700, 'Linear', true, 0);
            var lights = this.game.add.tween(this._townLights).to({ alpha: 1 }, 700, Phaser.Easing.Elastic.InOut, true, 0);
            var ground = this.game.add.tween(this._ground).to({ tint: 0xABABAB }, 700, Phaser.Easing.Linear.None, true);
            var ground = this.game.add.tween(this._town).to({ tint: 0xABABAB }, 700, Phaser.Easing.Linear.None, true);
            var cactus = this.game.add.tween(this._cactusShadow).to({ alpha: 1 }, 700, Phaser.Easing.Linear.None, true);
            redSky.onComplete.add(function () {
                IWG.SignalManager.instance.dispatch('hideFurrito', this);
            }, this);
        };
        BackgroundGroup.prototype._openJailDoor = function () {
            this._door.loadTexture('jailDoor');
            this._door.animations.add('open', Phaser.Animation.generateFrameNames('jailDoor_00', 1, 4, "", 0), 12, false);
            this._door.play('open');
            IWG.SignalManager.instance.dispatch('Audio.playAudio', IWG.Sounds.JAILDOOR, IWG.SoundChannels.FX_SOUNDS);
            this._door.animations.currentAnim.onComplete.add(function () {
                IWG.SignalManager.instance.dispatch('showMultiplier');
            }, this);
        };
        BackgroundGroup.prototype._playVultureAnimation = function () {
            this._vulture.loadTexture('vultureAnimation');
            this._vulture.animations.add('fly', Phaser.Animation.generateFrameNames('vulture_', 1, 17, "", 0), 12, false);
            this._vulture.play('fly');
            var vultureUp = this.game.add.tween(this._vulture).to({ y: this._vulture.position.y - 100 }, 1500, 'Linear', true);
            IWG.SignalManager.instance.dispatch('Audio.playAudio', IWG.Sounds.EAGLEFLY, IWG.SoundChannels.FX_SOUNDS);
            vultureUp.onComplete.add(function () {
                this._vulture.alpha = 0;
                this._vulture.loadTexture('vultureAnimation');
                this._vulture.animations.add('fly', Phaser.Animation.generateFrameNames('vulture_', 17, 1, "", 0), 12, false);
                this._vulture.play('fly');
                this._vulture.position.setTo(-100, 150);
            }, this);
        };
        BackgroundGroup.prototype._resetGame = function () {
            var lights = this.game.add.tween(this._townLights).to({ alpha: 0 }, 300, 'Linear', true, 750);
            var redSky = this.game.add.tween(this._redsky).to({ alpha: 0 }, 700, 'Linear', true, 750);
            var ground = this.game.add.tween(this._ground).to({ tint: 0xFFFFFF }, 700, Phaser.Easing.Linear.None, true);
            var ground = this.game.add.tween(this._town).to({ tint: 0xFFFFFF }, 700, Phaser.Easing.Linear.None, true);
            var cactus = this.game.add.tween(this._cactusShadow).to({ alpha: 0 }, 700, Phaser.Easing.Linear.None, true);
            this.game.add.tween(this._cactus.scale).to({ y: 0, x: 0 }, 500, Phaser.Easing.Exponential.Out, true, 0);
            var moveTown = this.game.add.tween(this._town).to({ y: 500 }, 1000, Phaser.Easing.Linear.None, true, 1000);
            var moveMountains = this.game.add.tween(this._mountains).to({ y: 242 }, 1200, Phaser.Easing.Linear.None, true, 1450);
            var moveGround = this.game.add.tween(this._ground).to({ y: 350 }, 1200, Phaser.Easing.Linear.None, true, 1450);
            var sunTween = this.game.add.tween(this._sun).to({ y: 220 }, 500, Phaser.Easing.Linear.None, true, 1900);
            var raysMoveTween = this.game.add.tween(this._rays).to({ y: 300 }, 500, Phaser.Easing.Linear.None, true, 1900);
            var raysAlphaTween = this.game.add.tween(this._rays).to({ alpha: 0.3 }, 300, Phaser.Easing.Linear.None, true, 2200);
            raysAlphaTween.onComplete.add(function () {
                IWG.SignalManager.instance.dispatch('showSplashGroup');
            }, this);
            this._door.loadTexture('jailDoor');
            this._door.animations.add('open', Phaser.Animation.generateFrameNames('jailDoor_00', 4, 1, "", 0), 12, false);
            this._door.play('open');
        };
        return BackgroundGroup;
    }(IWG.GameGroup));
    IWG.BackgroundGroup = BackgroundGroup;
})(IWG || (IWG = {}));
var IWG;
(function (IWG) {
    var EndGameGroup = (function (_super) {
        __extends(EndGameGroup, _super);
        function EndGameGroup() {
            _super.call(this);
            this._poster = null;
            this._firstText = null;
            this._secondText = null;
            this._amount = null;
            this._finishButton = null;
            this._spritesheet = 'endGame';
            this._multiplier = null;
            this._multi = "x" + this.game.rnd.integerInRange(1, 5).toString();
            this.alpha = 0;
            this._createPoster();
        }
        EndGameGroup.prototype.subscribeSignals = function () {
            IWG.SignalManager.instance.add('showEndGame', this._show, this);
            IWG.SignalManager.instance.add('restartGame', this._hide, this);
            IWG.SignalManager.instance.add('showMultiplier', this._showMultiplier, this);
        };
        EndGameGroup.prototype.unsubscribeSignals = function () {
            IWG.SignalManager.instance.remove('showEndGame', this._show, this);
            IWG.SignalManager.instance.remove('restartGame', this._hide, this);
            IWG.SignalManager.instance.remove('showMultiplier', this._showMultiplier, this);
        };
        EndGameGroup.prototype._createPoster = function () {
            this._poster = this.game.add.sprite(0, 0, this._spritesheet, 'endPoster');
            this._poster.position.setTo(this._poster.width / 2, this._poster.height / 2);
            this._poster.anchor.setTo(0.5, 0.5);
            this._poster.scale.setTo(0.0, 0.0);
            if (IWG.GameManager.instance.getTicketManager().getIsWinner()) {
                this._createWin();
            }
            else {
                this._createLose();
            }
            this._createFinishButton();
        };
        EndGameGroup.prototype._createFinishButton = function () {
            this._multiplier = this.game.add.bitmapText(0, 0, 'font', this._multi, 38);
            this._multiplier.anchor.setTo(0.5, 0.5);
            this._multiplier.position.setTo(768, 247);
            this._multiplier.alpha = 0;
            this._finishButton = this.game.add.sprite(0, 0, this._spritesheet, 'endButton');
            this._finishButton.anchor.setTo(0.5, 0.5);
            this._finishButton.position.setTo(20, 200);
            this._finishButton.scale.setTo(1.0, 1.0);
            var finishTextImage = this.game.add.sprite(0, 0, this._spritesheet, 'finishText');
            finishTextImage.anchor.setTo(0.5, 0.5);
            this._finishButton.addChild(finishTextImage);
            this._poster.addChild(this._finishButton);
            var idleAnimation = this.game.add.tween(this._finishButton.scale).to({ x: 0.9, y: 0.9 }, 500, Phaser.Easing.Quadratic.Out, true, 100, -1);
            idleAnimation.yoyo(true, 3000);
            this._finishButton.inputEnabled = true;
            this._finishButton.events.onInputUp.add(function () {
                this._finishButton.inputEnabled = false;
                IWG.SignalManager.instance.dispatch('restartGame', this);
                IWG.SignalManager.instance.dispatch('Audio.playAudio', IWG.Sounds.PLAYBUTTON, IWG.SoundChannels.FX_SOUNDS);
            }, this);
        };
        EndGameGroup.prototype._createWin = function () {
            this._firstText = this.game.add.image(0, 0, this._spritesheet, 'congratulations');
            this._firstText.anchor.setTo(0.5, 0.5);
            this._firstText.position.setTo(-30, -220);
            this._poster.addChild(this._firstText);
            this._secondText = this.game.add.image(0, 0, this._spritesheet, 'youhavewon');
            this._secondText.anchor.setTo(0.5, 0.5);
            this._secondText.position.setTo(-10, 50);
            this._poster.addChild(this._secondText);
            this._amount = this.game.add.bitmapText(0, 0, 'font_big', '', 60);
            this._amount.anchor.setTo(0.5, 0.5);
            this._amount.angle = -5;
            this._amount.position.setTo(-5, 110);
            this._poster.addChild(this._amount);
        };
        EndGameGroup.prototype._createLose = function () {
            this._firstText = this.game.add.image(0, 0, this._spritesheet, 'wanted');
            this._firstText.anchor.setTo(0.5, 0.5);
            this._firstText.position.setTo(-30, -220);
            this._poster.addChild(this._firstText);
            this._secondText = this.game.add.image(0, 0, this._spritesheet, 'youhavewon');
            this._secondText.anchor.setTo(0.5, 0.5);
            this._secondText.position.setTo(-10, 50);
            this._poster.addChild(this._secondText);
        };
        EndGameGroup.prototype._show = function () {
            var amount = IWG.GameManager.instance.getTicketManager().getTotalAmount();
            this._amount.setText("");
            this.alpha = 1;
            IWG.SignalManager.instance.dispatch('Audio.setChannelVolume', IWG.SoundChannels.BACKGROUND, 0, true, 500);
            if (amount > 0) {
                IWG.SignalManager.instance.dispatch('Audio.playAudio', IWG.Sounds.ENDWIN, IWG.SoundChannels.FX_SOUNDS);
            }
            else {
                IWG.SignalManager.instance.dispatch('Audio.playAudio', IWG.Sounds.ENDLOSE, IWG.SoundChannels.FX_SOUNDS);
            }
            var scaleTween = this.game.add.tween(this._poster.scale).to({ x: 1.0, y: 1.0 }, 1000, Phaser.Easing.Quintic.Out, true, 1000);
            scaleTween.onComplete.add(function () {
                this.createCounter(this._amount, 0, IWG.GameManager.instance.getTicketManager().getTotalAmount() * Number(this._multi.slice(1, 2)), 210, null, null, null, null, true);
                this.game.add.tween(this._finishButton.scale).to({ x: 1.0, y: 1.0 }, 1000, Phaser.Easing.Quintic.Out, true);
                this._finishButton.inputEnabled = true;
            }, this);
        };
        EndGameGroup.prototype._hide = function () {
            var scaleTween = this.game.add.tween(this._poster).to({ y: this._poster.position.y + 700 }, 1000, Phaser.Easing.Quintic.In, true);
            scaleTween.onComplete.add(function () {
                this._poster.position.setTo(this._poster.width / 2, this._poster.height / 2);
                this._poster.scale.setTo(0.0, 0.0);
            }, this);
            scaleTween.start();
            var fade = this.game.add.tween(this._multiplier).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
        };
        EndGameGroup.prototype.createCounter = function (textField, currentValue, targetValue, speed, onStart, onUpdate, onComplete, onCompleteScope, isAnimated) {
            var counter = currentValue;
            var winAmount = targetValue - currentValue;
            var speedVariation = winAmount / speed;
            var tween;
            if (isAnimated) {
                tween = this.game.add.tween(textField.scale).to({
                    x: 1.1,
                    y: 1.1
                }, 500, Phaser.Easing.Linear.None, false, 0, -1);
                tween.yoyo(true, 0);
                tween.start();
            }
            if (onStart !== null) {
                onStart.bind(onCompleteScope);
            }
            var timer = this.game.time.events.loop(1, function (oU, oC, oCS) {
                var realRandom = this.game.rnd.realInRange(speedVariation, speedVariation + (speedVariation * 0.1));
                counter += realRandom;
                textField.text = IWG.LanguageCurrencyManager.instance.formatCurrency(counter);
                if (oU !== null) {
                    oU.bind(oCS)();
                }
                IWG.SignalManager.instance.dispatch('Audio.playAudio', IWG.Sounds.COUNT, IWG.SoundChannels.FX_SOUNDS);
                if (counter > targetValue) {
                    textField.text = IWG.LanguageCurrencyManager.instance.formatCurrency(targetValue);
                    if (oC !== null) {
                        oC.bind(oCS)();
                    }
                    this.game.time.events.remove(timer);
                    if (isAnimated) {
                        tween.stop();
                        IWG.SignalManager.instance.dispatch('Audio.playAudio', IWG.Sounds.KERCHING, IWG.SoundChannels.FX_SOUNDS);
                    }
                }
            }, this, onUpdate, onComplete, onCompleteScope);
        };
        EndGameGroup.prototype._showMultiplier = function () {
            var fade = this.game.add.tween(this._multiplier).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true);
        };
        return EndGameGroup;
    }(IWG.GameGroup));
    IWG.EndGameGroup = EndGameGroup;
})(IWG || (IWG = {}));
var IWG;
(function (IWG) {
    var T40_Ticket_Manager = (function () {
        function T40_Ticket_Manager() {
            this.hasInitialised = false;
            this.loadedTicket = false;
            this.development = false;
            this.ticketInfo = null;
            this.gameResultFromAPI = null;
            this.globalAudioVolume = 1;
            this.basePath = '/';
            this.finishURL = '';
            this.trialGame = 0;
            this.TotalNumTurns = -1;
            this.currentTurnNum = -1;
            this.prizeAmounts = [];
            this.outcomeAmount = -1;
            this.prizeTier = -1;
            this._hasWon = -1;
            this._game1Information = [];
            this._outCome = null;
            this._ticket = null;
            this._params = null;
            this._games = null;
            this._pList = null;
            this._upperCurrencySymbol = "$";
            this._lowerCurrencySymbol = "¢";
            this._dualSymbolCurrency = true;
        }
        T40_Ticket_Manager.prototype.init = function (input1) {
            this.ticketInfo = input1;
            return this.initTicket();
            ;
        };
        T40_Ticket_Manager.prototype.initTicket = function () {
            var xml = this.ticketInfo.ticket;
            xml = (new DOMParser).parseFromString(xml, 'text/xml');
            var gameResultFromAPI = this.xmlToJson(xml);
            if (gameResultFromAPI === null || gameResultFromAPI === undefined) {
                console.error("No valid instantGameBetResult passed into ticketmanager. \nGame has terminated.");
                return false;
            }
            this.basePath = this.ticketInfo.basePath;
            this.finishURL = this.ticketInfo.finishURL;
            this.outcomeAmount = +gameResultFromAPI.ticket.outcome['@attributes']['amount'];
            this.prizeTier = +gameResultFromAPI.ticket.outcome['@attributes']['tier'];
            var pl = gameResultFromAPI.ticket.params['@attributes'].pList;
            this.prizeAmounts = pl.split(',');
            this._hasWon = +gameResultFromAPI.ticket.outcome['@attributes']['wT'];
            if (gameResultFromAPI.ticket.outcome['@attributes']['amount'] !== undefined) {
                this.trialGame = +gameResultFromAPI.ticket.outcome['@attributes']['try'];
            }
            this.TotalNumTurns = +gameResultFromAPI.ticket.g1.go.length;
            this._game1Information = [];
            for (var i = 0; i < this.TotalNumTurns; i++) {
                var gameRow = ({
                    i: +gameResultFromAPI.ticket.g1.go[i]['@attributes']['i'],
                    w: +gameResultFromAPI.ticket.g1.go[i]['@attributes']['w'],
                    value: +this.prizeAmounts[parseInt(gameResultFromAPI.ticket.g1.go[i]['@attributes']['p'])],
                    pIndex: parseInt(gameResultFromAPI.ticket.g1.go[i]['@attributes']['p'])
                });
                this._game1Information.push(gameRow);
            }
            this._games = ({
                g1: this._game1Information
            });
            this._params = ({
                wT: this._hasWon,
                stake: 2
            });
            this._outCome = ({
                amount: this.outcomeAmount,
                prizeTier: this.prizeTier
            });
            this._ticket = ({
                outcome: this._outCome,
                params: this._params,
                turns: this._games,
                prizeList: this.prizeAmounts
            });
            IWG.GameManager.instance.getTicketManager().setTicket(this._ticket);
            this.currentTurnNum = 0;
            this.loadedTicket = true;
            gameResultFromAPI = null;
            return IWG.GameManager.instance.getTicketManager().validate();
        };
        T40_Ticket_Manager.prototype.xmlToJson = function (xml) {
            var attr, child, attrs = xml.attributes, children = xml.childNodes, key = xml.nodeType, obj = {}, i = -1;
            if (key == 1 && attrs.length) {
                obj[key = '@attributes'] = {};
                while (attr = attrs.item(++i)) {
                    obj[key][attr.nodeName] = attr.nodeValue;
                }
                i = -1;
            }
            else if (key == 3) {
                obj = xml.nodeValue;
            }
            while (child = children.item(++i)) {
                key = child.nodeName;
                if (obj.hasOwnProperty(key)) {
                    if (obj.toString.call(obj[key]) != '[object Array]') {
                        obj[key] = [obj[key]];
                    }
                    obj[key].push(this.xmlToJson(child));
                }
                else {
                    obj[key] = this.xmlToJson(child);
                }
            }
            return obj;
        };
        T40_Ticket_Manager.prototype.gameFinished = function () {
            IWG.Debug.instance.log("Game has finished and the ticket data has been flushed.", IWG.DEBUGTYPE.TICKET);
            this._flushTicketData();
        };
        ;
        T40_Ticket_Manager.prototype.isWinningGame = function () {
            if (this._hasWon == 1) {
                return true;
            }
            else {
                return false;
            }
        };
        T40_Ticket_Manager.prototype._flushTicketData = function () {
            this.loadedTicket = false;
        };
        T40_Ticket_Manager.prototype.isDualCurrency = function () {
            return this._dualSymbolCurrency;
        };
        T40_Ticket_Manager.prototype.getUpperCurrencySymbol = function () {
            return this._upperCurrencySymbol;
        };
        T40_Ticket_Manager.prototype.getLowerCurrencySymbol = function () {
            return this._lowerCurrencySymbol;
        };
        return T40_Ticket_Manager;
    }());
    IWG.T40_Ticket_Manager = T40_Ticket_Manager;
})(IWG || (IWG = {}));
;
var IWG;
(function (IWG) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            _super.apply(this, arguments);
            this.grp_loadingAssets = null;
            this.img_loaderBG = null;
            this.spr_loadingGameLogo = null;
            this.spr_loadingBar = null;
            this._currentFeature = -1;
            this._horse = null;
            this._bar = null;
        }
        Preloader.prototype.setupLoadingScene = function () {
            var loadingScreen = this.game.add.image(0, 0, 'loadingScreen');
            loadingScreen.alpha = 0;
            this._horse = this.game.add.image(0, 0, 'horse');
            this._horse.anchor.setTo(0.5, 0.5);
            this._horse.position.setTo(-this._horse.width, 382);
            this._horse.scale.setTo(0.7, 0.7);
            this._horse.angle = -10;
            this._bar = this.game.add.graphics(0, 0);
            this._bar.position.setTo(410, 520);
            this._bar.beginFill(0xff3300);
            this._bar.drawRect(0, 0, 400, 33);
            this._bar.scale.set(0, 1);
            this._bar.alpha = 0;
            var box = this.game.add.image(0, 0, 'box');
            box.alpha = 0;
            box.anchor.setTo(0.5, 0.5);
            box.position.setTo(this.game.width / 2, 540);
            var alphaTween = this.game.add.tween(loadingScreen).to({ alpha: 1.0 }, 250, Phaser.Easing.Linear.None, true);
            alphaTween.onComplete.add(function () {
                this.game.add.tween(box).to({ alpha: 1.0 }, 250, Phaser.Easing.Linear.None, true);
                this.game.add.tween(this._bar).to({ alpha: 1.0 }, 500, Phaser.Easing.Linear.None, true);
            }, this);
            var horseTween = this.game.add.tween(this._horse).to({ angle: 10 }, 500, Phaser.Easing.Linear.None, false, 0, -1, true);
            horseTween.start();
        };
        Preloader.prototype.addAssetsToLoad = function () {
            var path = "";
            if (path === 'https://sta-williamhill.static.virtuefusion.com/assets/files/com.sideplay/sherluck-holmes/current/zip/') {
                console.log('Path override');
                path = 'dist/';
            }
            this.load.atlasJSONArray('cowboyIdle', path + './assets/spritesheets/cowboyIdleAnimation.png', path + './assets/spritesheets/cowboyIdleAnimation.json');
            this.load.atlasJSONArray('background', path + './assets/spritesheets/background.png', path + './assets/spritesheets/background.json');
            this.load.atlasJSONArray('endGame', path + './assets/spritesheets/endGame.png', path + './assets/spritesheets/endGame.json');
            this.load.atlasJSONArray('mainGame', path + './assets/spritesheets/mainGame.png', path + './assets/spritesheets/mainGame.json');
            this.load.atlasJSONArray('barrelExplosion', path + './assets/spritesheets/barrelExplosion.png', path + './assets/spritesheets/barrelExplosion.json');
            this.load.atlasJSONArray('cowboyShotLeftAnimation', path + './assets/spritesheets/cowboyShotLeftAnimation.png', path + './assets/spritesheets/cowboyShotLeftAnimation.json');
            this.load.atlasJSONArray('cowboyShotRightAnimation', path + './assets/spritesheets/cowboyShotRightAnimation.png', path + './assets/spritesheets/cowboyShotRightAnimation.json');
            this.load.atlasJSONArray('jailDoor', path + './assets/spritesheets/jailDoor.png', path + './assets/spritesheets/jailDoor.json');
            this.load.atlasJSONArray('keyAnimation', path + './assets/spritesheets/keyAnimation.png', path + './assets/spritesheets/keyAnimation.json');
            this.load.atlasJSONArray('overlay', path + './assets/spritesheets/overlay.png', path + './assets/spritesheets/overlay.json');
            this.load.atlasJSONArray('vultureAnimation', path + './assets/spritesheets/vultureAnimation.png', path + './assets/spritesheets/vultureAnimation.json');
            this.load.atlasJSONArray('startScreen', path + './assets/spritesheets/startScreen.png', path + './assets/spritesheets/startScreen.json');
            this.load.bitmapFont('font', path + './assets/fonts/font.png', path + './assets/fonts/font.fnt');
            this.load.bitmapFont('font_big', path + './assets/fonts/font_big.png', path + './assets/fonts/font_big.fnt');
            this.load.audio('backgroundLoop', ['./assets/audio/background/background.mp3', './assets/audio/background/background.mp3']);
            this.load.audio('click', ['./assets/audio/click/click.mp3', './assets/audio/click/click.mp3']);
            this.load.audio('rollover', ['./assets/audio/rollover/rollover.mp3', './assets/audio/rollover/rollover.mp3']);
            this.load.audio('playButton', ['./assets/audio/play_button/playButton.mp3', './assets/audio/play_button/playButton.mp3']);
            this.load.audio('gunShot', ['./assets/audio/barrel_shoot/gunShot.mp3', './assets/audio/barrel_shoot/gunShot.mp3']);
            this.load.audio('prizeReveal', ['./assets/audio/prize_reveal/prizeReveal.mp3', './assets/audio/prize_reveal/prizeReveal.mp3']);
            this.load.audio('bonusKey', ['./assets/audio/bonus_key/bonusKey.mp3', './assets/audio/bonus_key/bonusKey.mp3']);
            this.load.audio('eagleFly', ['./assets/audio/eagle_fly/eagleFly.mp3', './assets/audio/eagle_fly/eagleFly.mp3']);
            this.load.audio('endWin', ['./assets/audio/end_win/endWin.mp3', './assets/audio/end_win/endWin.mp3']);
            this.load.audio('endLose', ['./assets/audio/end_Lose/endLose.mp3', './assets/audio/end_Lose/endLose.mp3']);
            this.load.audio('multiplierWin', ['./assets/audio/multiplier_win/multiplierWin.mp3', './assets/audio/multiplier_win/multiplierWin.mp3']);
            this.load.audio('jailDoor', ['./assets/audio/jail_door/jailDoor.mp3', './assets/audio/jail_door/jailDoor.mp3']);
            this.load.audio('rowWin', ['./assets/audio/row_win/rowWin.mp3', './assets/audio/row_win/rowWin.mp3']);
            this.load.audio('swoosh', ['./assets/audio/swoosh/bet_slide.mp3', './assets/audio/swoosh/bet_slide.mp3']);
            this.load.audio('mega_swoosh', ['./assets/audio/swoosh/mega_swoosh.mp3', './assets/audio/swoosh/mega_swoosh.mp3']);
            this.load.audio('count', ['./assets/audio/count_up/tick.mp3', './assets/audio/count_up/tick.mp3']);
            this.load.audio('kerching', ['./assets/audio/kerching/kerching.mp3', './assets/audio/kerching/kerching.mp3']);
        };
        Preloader.prototype._loadSoundsToAudioManager = function () {
            IWG.GameManager.instance.getAudioManager().addSoundChannel(IWG.SoundChannels.BACKGROUND, 1);
            IWG.GameManager.instance.getAudioManager().addSoundChannel(IWG.SoundChannels.FX_SOUNDS, 1);
            IWG.GameManager.instance.getAudioManager().addSound(this.game, IWG.Sounds.BACKGROUNDLOOP, IWG.SoundChannels.BACKGROUND, 1, true, 1, false);
            IWG.GameManager.instance.getAudioManager().addSound(this.game, IWG.Sounds.CLICK, IWG.SoundChannels.FX_SOUNDS, 1, false, 1, true);
            IWG.GameManager.instance.getAudioManager().addSound(this.game, IWG.Sounds.ROLLOVER, IWG.SoundChannels.FX_SOUNDS, 1, false, 1, true);
            IWG.GameManager.instance.getAudioManager().addSound(this.game, IWG.Sounds.PLAYBUTTON, IWG.SoundChannels.FX_SOUNDS, 1, false, 1, true);
            IWG.GameManager.instance.getAudioManager().addSound(this.game, IWG.Sounds.GUNSHOT, IWG.SoundChannels.FX_SOUNDS, 1, false, 1, true);
            IWG.GameManager.instance.getAudioManager().addSound(this.game, IWG.Sounds.PRIZEREVEAL, IWG.SoundChannels.FX_SOUNDS, 1, false, 1, true);
            IWG.GameManager.instance.getAudioManager().addSound(this.game, IWG.Sounds.BONUSKEY, IWG.SoundChannels.FX_SOUNDS, 1, false, 1, true);
            IWG.GameManager.instance.getAudioManager().addSound(this.game, IWG.Sounds.EAGLEFLY, IWG.SoundChannels.FX_SOUNDS, 1, false, 1, true);
            IWG.GameManager.instance.getAudioManager().addSound(this.game, IWG.Sounds.ENDWIN, IWG.SoundChannels.FX_SOUNDS, 1, false, 1, true);
            IWG.GameManager.instance.getAudioManager().addSound(this.game, IWG.Sounds.ENDLOSE, IWG.SoundChannels.FX_SOUNDS, 1, false, 1, true);
            IWG.GameManager.instance.getAudioManager().addSound(this.game, IWG.Sounds.MULTIPLER, IWG.SoundChannels.FX_SOUNDS, 1, false, 1, true);
            IWG.GameManager.instance.getAudioManager().addSound(this.game, IWG.Sounds.JAILDOOR, IWG.SoundChannels.FX_SOUNDS, 1, false, 1, true);
            IWG.GameManager.instance.getAudioManager().addSound(this.game, IWG.Sounds.ROWWIN, IWG.SoundChannels.FX_SOUNDS, 1, false, 1, true);
            IWG.GameManager.instance.getAudioManager().addSound(this.game, IWG.Sounds.SWOOSH, IWG.SoundChannels.FX_SOUNDS, 1, false, 1, true);
            IWG.GameManager.instance.getAudioManager().addSound(this.game, IWG.Sounds.MEGASWOOSH, IWG.SoundChannels.FX_SOUNDS, 1, false, 1, true);
            IWG.GameManager.instance.getAudioManager().addSound(this.game, IWG.Sounds.COUNT, IWG.SoundChannels.FX_SOUNDS, 1, false, 1, true);
            IWG.GameManager.instance.getAudioManager().addSound(this.game, IWG.Sounds.KERCHING, IWG.SoundChannels.FX_SOUNDS, 1, false, 1, true);
        };
        Preloader.prototype.fileLoaded = function (progress, cacheKey, success, totalLoaded, totalFiles) {
            this._horse.position.setTo(-this._horse.width + (progress * 1250 / 100), this._horse.position.y);
            this._bar.scale.set(progress / 100, 1);
        };
        Preloader.prototype.onLoad = function () {
            this._loadSoundsToAudioManager();
            IWG.SignalManager.instance.dispatch('states.SwitchState', 'MainGame');
        };
        return Preloader;
    }(IWG.Preloader_Core));
    IWG.Preloader = Preloader;
})(IWG || (IWG = {}));
var loaderObj = null;
var Loader = (function () {
    function Loader(obj) {
        loaderObj = obj;
        initGame();
    }
    return Loader;
})();


function initGame()  {
    new IWG.GameManager(loaderObj);
}