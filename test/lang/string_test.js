var StringTest = TestCase.create({
  name: 'StringTest',
  
  testTrim: function() {
    this.assertEqual('abc', ' abc  '.trim());
    this.assertEqual('', '   '.trim());
  },
  
  testTruncate: function() {
    this.assertEqual('fo...', 'foobar'.truncate(5)),
    this.assertEqual('foo..', 'foobar'.truncate(5, '..')),
    this.assertEqual('fooba', 'foobar'.truncate(5, '')),
  }
})