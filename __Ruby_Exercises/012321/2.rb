class Confection

    def prepare
        "Baking at 350 degrees for 25 minutes"
    end

end


class Cupcake < Confection

    def prepare
        puts "CUPCAKE: " + super  + " and applying frosting"
    end

end


class BananaCake < Confection

    def prepare 
        puts "BANANA CAKE: " + super
    end

end


banana_cake = BananaCake.new
cupcake = Cupcake.new

banana_cake.prepare
cupcake.prepare
