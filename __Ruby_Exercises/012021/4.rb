
#4
print "How old are you? "
age = gets.chomp.to_i

[10,20,30,40].each do |in_year|
    p "in #{in_year} years you will be #{in_year + age}"
end