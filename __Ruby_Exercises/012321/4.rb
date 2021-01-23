# ENCAPSULATION

class Product

    def initialize(name, price, discount)
        @name = name
        @price = price
        @discount = discount
    end

    def total
        "Discounted price for #{@name} : $#{@price - (@price * @discount)}"  
    end
end


shirt_a = Product.new('Uniqlo', 25, 0.5)
shirt_b = Product.new('Carhartt', 50, 0.5)
shirt_c = Product.new('Brooklinen', 100, 0.5)

p shirt_a.total
p shirt_b.total
p shirt_c.total