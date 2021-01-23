# ABSTRACTION

class Product

    attr_reader :stocks

    def initialize(name, price, discount)
        @name = name
        @price = price
        @discount = discount
        @stocks = 100
    end

    def buy(quantity)
        return 'Out of Stock' if @stocks.zero?
        @stocks -= quantity
    end

    def get_discounted_price_for(quantity)
        self.get_discounted_price * quantity
    end

    def get_discounted_price
        @price - (@price * @discount) 
    end

end

shirt = Product.new('Carhartt', 50, 0.5)

shirt.buy(2)            
p shirt.stocks                          # bought 2 shirts, now have 98 stocks

p shirt.get_discounted_price            # returns the discounted price for a shirt

p shirt.get_discounted_price_for(5)     # discounted price for 5 shirts