
print 'Please enter a number between 0-100: '
input = gets.chomp.to_i

case input

    when 0..50
        p 'Number is between 0-50'
    
    when 51..100
        p 'Number is between 51-100'

    else 
        p 'Number is above 100'
end
