const LIBRARY = require("../Models/Library")

//creating videos and PDFs in library
const handle_Library_PDFs_and_Videos = async ( req, res ) => {
    try {
        if( !req.body ) throw( new Error( "library body not found" ) )
        
        const { books, videos } = req.body
        const newPDFsAndVideos = await LIBRARY.create({
            books : books || [],
            videos : videos || []
        })

        if( !newPDFsAndVideos ) throw( new Error( "books and videos not found" ) )
        
        res.json({
            msg : "library created successfully",
            library : newPDFsAndVideos
        })
    } catch (error) {
        res.end( error.message )
    }
}

//getting content for library to be shown
const get_Library = async ( req, res ) => {
    try {
        const findLibrary = await LIBRARY.find({})
        if( findLibrary.length == 0 ) throw( new Error( "Library not found" ) )
        res.json({
            msg : "Library fetched Successfully",
            library : findLibrary
        })
    } catch (error) {
        res.end( error.message )
        
    }
}

module.exports = {
    handle_Library_PDFs_and_Videos,
    get_Library
}