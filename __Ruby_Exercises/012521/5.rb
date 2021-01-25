# DEPENDENCY INVERSION PRINCIPLE

class Person
    def initialize(name, age)
        @name = name
        @age = age
    end

    def sing(instance)
        instance.sing
    end
end

class Chef
    def sing()
        # do something
    end
end

class Doctor
    def sing()
        # do something
    end
end

person = Person.new
chef = Chef.new
doctor = Doctor.new

person.sing chef
person.sing doctor