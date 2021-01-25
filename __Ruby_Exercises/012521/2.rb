# OPEN/CLOSED PRINCIPLE

class Person
    attr_reader :name, :age

    def initialize(name, age)
        @name = name
        @age = age
    end

    def get_details
        puts "Name is #{@name} and is currently #{@age} years old"
    end

end

class Chef < Person
    attr_reader :occupation

    def initialize(name, age)
        super name, age
        @occupation = 'Chef'
    end

    def get_details
        puts "Name is #{@name} and is currently #{@age} years old. My Job is a #{@occupation}"
    end

end

person1 = Chef.new 'Kevin Basina', 24
person1.get_details