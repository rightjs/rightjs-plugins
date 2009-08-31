/**
 * The JSON export/import functionality test
 *
 * @copyright (C) 2009 Nikolay V. Nemshilov aka St.
 */
var JsonTest = TestCase.create({
  name: "JsonTest",
  
  testStringToJSON: function() {
    this.assertEqual('"boo"', "boo".toJSON());
    
    this.assertEqual('"\\b"', '\b'.toJSON());
    this.assertEqual('"\\t"', '\t'.toJSON());
    this.assertEqual('"\\n"', '\n'.toJSON());
    this.assertEqual('"\\r"', '\r'.toJSON());
    this.assertEqual('"\\f"', '\f'.toJSON());
    this.assertEqual('"\\\\"', '\\'.toJSON());
    this.assertEqual('"\\""', '"'.toJSON());
    
    this.assertEqual('"\\ufff0"', "\ufff0".toJSON());
    this.assertEqual('"\\uffff"', "\uffff".toJSON());
  },
  
  testDateToJSON: function() {
    var date = new Date();
    date.setSeconds(8);
    date.setMinutes(8);
    date.setHours(8);
    date.setDate(8);
    date.setMonth(8);
    date.setYear(2008);
    
    this.assertEqual('2008-09-08T04:08:08Z', date.toJSON())
  },
  
  testNumberToJSON: function() {
    this.assertEqual('8', (8).toJSON());
    this.assertEqual('8.8', (8.8).toJSON());
    this.assertEqual('-8.8', (-8.8).toJSON());
  },
  
  testBooleanToJSON: function() {
    this.assertEqual('true', true.toJSON());
    this.assertEqual('false', false.toJSON());
  },
  
  testArrayToJSON: function() {
    this.assertEqual('[1,2,3]', [1,2,3].toJSON());
    this.assertEqual('["a","b","c"]', $w('a b c').toJSON());
    
    this.assertEqual('["a",["b",["c"]]]', ['a',['b',['c']]].toJSON());
  },
  
  testObjectToJson: function() {
    this.assertEqual('{"a":"a1","b":"b1"}', JSON.encode({a:'a1',b:'b1'}));
    
    this.assertEqual(
      '{"a":[1,{"b":1}],"b":1,"c":false,"d":null,"e":{"f":"g"}}',
      JSON.encode({a:[1,{b:1}],b:1,c:false,d:null,e:{f:'g'}})
    );
  },
  
  testUnsupportedValuesToJson: function() {
    this.assertThrows(function() {
      JSON.encode(window);
    });
  },
  
  testJsonParse: function() {
    this.assertEqual(
      {a:[1,{b:1}],b:1,c:false,d:null,e:{f:'g'}},
      JSON.decode('{"a":[1,{"b":1}],"b":1,"c":false,"d":null,"e":{"f":"g"}}')
    );
  },
  
  testJsonParseError: function() {
    this.assertThrows(function() {
      JSON.decode('{123');
    })
  }
});