# INTERFACE SEGREGATION PRINCIPLE


# before
class Ticker

    def initialize
        @tick = 0
    end

    def start
        Thread.new do
            loop do 
                @tick += 1
                puts "TICKER: #{@tick}"
            end
        end
    end

end



# after
class Ticker

    def initialize
        @tick = 0
    end

    def start
        Thread.new do
            loop do 
                @tick += 1
            end
        end
    end

    def start_verbose
        Thread.new do
            loop do 
                @tick += 1
                puts "TICKER: #{@tick}"
            end
        end
    end

end