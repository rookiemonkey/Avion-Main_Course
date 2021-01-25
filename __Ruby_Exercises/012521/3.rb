# LISKOV PRINCIPLE

class Person
    def set_name(name)
        @name = name
    end

    def set_age(age)
        @age = age
    end
end

class Chef < Person
    def set_name(name)
        super(name)
        @name = name
    end

    def set_age(age)
        super(age)
        @name = age
    end
end