const Image = require("../models/Image");
const cloudinary = require('cloudinary').v2;

async function fileuploadTocloudinary(file,folder){
  // console.log("fileuploader start");
  const options = {folder};
  const response = await cloudinary.uploader.upload(file.tempFilePath,options)
  // console.log("file uploder end")
  return response;
}

module.exports.imageUpload = async(req,res)=>{
  try {
    // console.log("CreatePPsot= ",req.body);
    const file = req.files.file;
    console.log("File is here", file);
   

    console.log("file support start")
    const supporttags = ["jpg","jpeg","png"];
    const filetype = file.name.split(".")[1].toLowerCase();
    // console.log(filetype);
    // console.log("Middles");

    if(!supporttags.includes(filetype)){
      return res.status(400).json({
      success: false,
      message: "errorr New contact create",
    })
    }
    // console.log("file support end")

    const response = await fileuploadTocloudinary(file,"imageGallery");
    // console.log(response);

    // console.log(fullname,email,phonenumber,birth);
    const ImageEntryToDB = await Image.create({
      image: response.secure_url,
      publicID: response.public_id,
    });

    return res.status(200).json({
      success: true,
      conatct: ImageEntryToDB,
      response: response,
      message: "New Image Uploaded successfully",
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "errorr Image Uploaded",
      error: error.message
    })
  }
}

module.exports.allimage = async(req,res)=>{
  try {
    console.log("allimages");
    const allimages = await Image.find({});
    console.log(allimages);
    console.log("allimages 1");
    return res.status(200).json({
      success: true,
      conatct: allimages,
      message: "all images fetched",
    });
    console.log("allimages End");
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "errorr all images create",
      error: error.message
    })
  }
}

module.exports.deleteimage = async(req,res)=>{
  try {
    
    const image = await Image.findById(req.params.id);

    //delete the image from cloudinary
    const publicid = image.publicID;
    await cloudinary.uploader.destroy(publicid);

    //delete the image entry from DB
    await Image.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Image Deleted Successfully"
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "errorr In images Deleted",
      error: error.message
    })
  }
}