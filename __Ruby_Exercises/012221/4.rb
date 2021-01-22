
arr = [6, 3, 1, 8, 4, 2, 10, 65, 102]

new_array = arr.select { |n| n.even? }

p new_array