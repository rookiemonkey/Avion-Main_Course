
#3
contact_data = [
    ["ana@email.com", "123 Main st.", "555-123-4567"],
    ["avion@email.com", "404 Not Found Dr.", "123-234-3454"]
]
                
contacts = {
    "Analyn Cajocson" => {}, 
    "Avion School" => {}
}

keys = [:email, :address, :phone]

# loop to contacts and destructure the array [key, value]
contacts.each_with_index do |(_, hash), index|

    # loop to data intended for the current contact
    contact_data[index].each_with_index do |data, key_index|
        hash[keys[key_index]] = data
    end

end

puts contacts