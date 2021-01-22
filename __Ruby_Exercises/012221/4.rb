
arr = [6, 3, 1, 8, 4, 2, 10, 65, 102]

# FROM SCRATCH

scratch_array = Array.new

arr.each do |n|
    scratch_array << n if n % 2 == 0
end

p 'SCRATCH: ', scratch_array





# USING NATIVE METHOD

new_array = arr.select { |n| n.even? }

p 'NATIVE: ', new_array