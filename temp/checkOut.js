const getCheckoutUser = async (userId) => {

    console.log("Checkout User ID:", userId);

    return {
        name: "Test User",
        email: "test@gmail.com",
        phone: "9876543210",
        address: "Test Address",
        city: "Kolkata",
        state: "West Bengal",
        pin: "700001"
    };

};

module.exports = {
    getCheckoutUser
};