getmentor = async (req, res) => {
    console.log('getmentor');
    const { mentorID } = req.params;
    return res.status(200).json();
}

module.exports = getmentor;