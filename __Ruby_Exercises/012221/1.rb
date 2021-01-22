arr = [1, 3, 5, 7, 9, 11]
number = 3


# FROM SCRATCH
def custom_include(arr, num)
    is_included = false
    arr.each { |n| is_included = true if n == num }
    is_included
end

p custom_include arr, number
p custom_include arr, 152




# USING NATIVE METHOD

p arr.include? number
p arr.include? 152