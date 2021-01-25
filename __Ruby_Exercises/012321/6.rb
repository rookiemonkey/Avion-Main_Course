# DUCK TYPING

class Gadget 
    def type(gadget)
        gadget.type
    end
end

class Desktop
    def type
        puts "TYPE: Desktop"
    end
end

class Mobile
    def type
        puts "TYPE: Mobile"
    end
end

class Tablet
    def type
        puts "TYPE: Tablet"
    end
end


gadget = Gadget.new
samsung = Mobile.new
dell = Desktop.new
apple = Tablet.new

gadget.type(samsung)
gadget.type(dell)
gadget.type(apple)