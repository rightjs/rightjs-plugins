var StringTest = TestCase.create({
  name: 'StringTest',
  
  testTrim: function() {
    this.assertEqual('abc', ' abc  '.trim());
    this.assertEqual('', '   '.trim());
  }
})