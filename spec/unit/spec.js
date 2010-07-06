
describe 'Zeller\'s congruence:'
  describe 'zeller()'
    it 'should return a day given a date'
      zeller(5, 7, 2010).should.be 'Monday'
    end
    
    it 'should return an ISO week date number for a given date'
      zeller(5, 7, 2010, true).should.be 1
    end
    
    it 'should return a day given a Julian calendar date'
      zeller(5, 7, 2010, false, 'julian').should.be 'Sunday'
    end

    it 'should return an ISO week date number given a Julian calendar date'
      zeller(5, 7, 2010, true, 'julian').should.be 7
    end
    
    it 'should return an internationalized weekday string given a date'
      zeller(5, 7, 2010, null, null, ['土', '日', '月', '火', '水', '木', '金']).should.be '月'
    end
    
    it 'should throw MissingParameters if dayOfMonth is not passed in.'
      -{ zeller() }.should.throw_error 
    end

    it 'should throw MissingParameters if month is not passed in.'
      -{ zeller(5) }.should.throw_error 
    end

    it 'should throw MissingParameters if year is not passed in.'
      -{ zeller(5, 7) }.should.throw_error 
    end

    it 'should throw InvalidParameters if month is not valid.'
        -{ zeller(5, 77, 2010) }.should.throw_error 
        -{ zeller(5, -2, 2010) }.should.throw_error 
    end

    it 'should throw InvalidParameters if dayOfMonth is not valid.'
        -{ zeller(-5, 7, 2010) }.should.throw_error 
        -{ zeller(55, 7, 2010) }.should.throw_error 
        -{ zeller(31, 4, 2010) }.should.throw_error 
        -{ zeller(31, 6, 2010) }.should.throw_error 
        -{ zeller(31, 9, 2010) }.should.throw_error 
        -{ zeller(31, 11, 2010) }.should.throw_error 
        -{ zeller(29, 2, 2010) }.should.throw_error 
        -{ zeller(30, 2, 2008) }.should.throw_error 
    end
    
    it 'should throw InvalidParameters if the calendar type is supplied and is not valid.'
      -{ zeller(5, 7, 2010, null, 'trevorian') }.should.throw_error 
    end

    it 'should throw InvalidParameters if iso is supplied and is not valid.'
      -{ zeller(5, 7, 2010, 'true') }.should.throw_error 
    end

    it 'should throw InvalidParameters if i18nDayMapping is supplied and is not valid.'
      -{ zeller(5, 7, 2010, null, null, []) }.should.throw_error 
      -{ zeller(5, 7, 2010, null, null, [1, 2, 3, 4, 5 ,6 ,7]) }.should.throw_error 
    end
  end

  // This is not working in the spec, although it works on the command line.
  // It seems like 'this' is undefined here...
  //
  // describe 'String.getDay()'
  //   it 'should return a day given a date'
  //     "7/5/2010".getDay().should.be 'Monday'
  //   end
  // end
end