signout = async (req, res) => {
    console.log('signout');
    return res.status(200).json();
}

module.exports = signout;