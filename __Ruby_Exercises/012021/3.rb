
#3
contact_data = [
    ["ana@email.com", "123 Main st.", "555-123-4567"],
    ["avion@email.com", "404 Not Found Dr.", "123-234-3454"]
]
                
contacts = {"Analyn Cajocson" => {}, "Avion School" => {}}

keys = ["email", "address", "phone"]

# loop to contacts
contacts.each do |_,hash|
    contact_data.each do |group|
        group.each_with_index do |data, ind|
            hash[keys[ind]] = data
        end
    end
end

puts contacts