function JSONHttpRequest(){function f(b){try{if(typeof a[b]=="function"){d[b]=function(){if(b=="setRequestHeader")c=arguments[0].toLowerCase()=="content-type";return a[b].apply(a,Array.prototype.slice.apply(arguments))}}else{e.get=function(){return a[b]};e.set=function(c){a[b]=c};Object.defineProperty(d,b,e)}}catch(f){}}var a=new XMLHttpRequest;var b=null;var c=false;var d=this;var e={get:function(){try{b=a.responseText?!b?JSON.parse(a.responseText):b:null}catch(c){if(d.strictJSON)throw c}return b},enumerable:true,configurable:true};d.strictJSON=true;Object.defineProperty(d,"responseJSON",e);d.sendJSON=function(e){try{e=JSON.stringify(e);b=null;if(!c)a.setRequestHeader("Content-Type","application/json;charset=encoding");c=false}catch(f){if(d.strictJSON)throw f}a.send(e)};f("onreadystatechange");for(n in a)f(n)}