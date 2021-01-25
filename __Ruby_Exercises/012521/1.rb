# SINGLE RESPONSIBILITY

class Person
    attr_reader :name, :age

    def initialize(name, age)
        @name = name
        @age = age
    end

    def get_details
        puts "Name is #{@name} and is currently #{@age} years old"
    end

    def celebrate_birthday
        @age += 1
    end

end

person1 = Person.new 'Kevin Basina', 24
person1.get_details
person1.celebrate_birthday
person1.get_details