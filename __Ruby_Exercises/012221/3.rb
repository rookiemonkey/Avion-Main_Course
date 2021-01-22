
print 'Please type anything you want :) ==> '
input = gets.chomp

while input.upcase != 'STOP'
    puts "Your input: #{input}"
    print 'Please type anything you want :) ==> '
    input = gets.chomp
end

