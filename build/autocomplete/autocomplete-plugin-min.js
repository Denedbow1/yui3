YUI.add("autocomplete-plugin",function(b){var a=b.namespace("Plugin");function c(d){d=b.mix({},d,true);d.inputNode=d.host;AutoCompletePlugin.superclass.constructor.apply(this,arguments);}b.extend(c,b.AutoCompleteList,{},{NAME:"autocompleteListPlugin",NS:"aclist"});a.AutoComplete=c;a.AutoCompleteList=c;},"@VERSION@",{requires:["autocomplete-base","node-pluginhost"]});