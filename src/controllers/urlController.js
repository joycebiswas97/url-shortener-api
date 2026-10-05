const {nanoid} = require('nanoid');
const Url = require('../models/url')

const shortenUrl = async(req,res) => {
  try{
    const {originalUrl} = req.body;
    if(!originalUrl){
      return res.status(400).json({error:"originalUrl is required in body"});
    }
    try{
      const parsed = new URL(originalUrl);
      if(parsed.protocol !== 'http:' && parsed.protocol !== 'https:'){
        return res.status(400).json({error:'originalUrl must contain http:// or https://'});
      }
    }
    catch(err){
      return res.status(400).json({error:"Invalid Url format"});  
    }

    const existingUrl = await Url.findOne({originalUrl});
    if(existingUrl){
      return res.status(200).json({
        message: "URL already shortened",
        originalUrl: existingUrl.originalUrl,
        shortcode: existingUrl.shortCode,
        shortUrl: `${process.env.BASE_URL}/${existingUrl.shortCode}`
      });
    }

    const shortCode = nanoid(7);

    const newUrl = await Url.create({
      originalUrl,
      shortCode
    });
    return res.status(201).json({
      message:"URL shortened successfully",
      originalUrl: newUrl.originalUrl,
      shortcode: newUrl.shortCode,
      shortUrl: `${process.env.BASE_URL}/${newUrl.shortCode}`
    })
  }
  catch(error){
    console.error("Error shortening URL", error)
    return res.status(500).json({error:"Internal server error"});
  }
};

const redirectToUrl = async(req,res) => {
  try{
    const {shortCode} = req.params;
    const urlDoc = await Url.findOne({shortCode});
    if(!urlDoc){
      return res.status(404).json({error:"Short URL not found"});
    }

    urlDoc.clicks += 1;
    await urlDoc.save();

    return res.redirect(urlDoc.originalUrl);
  }
  catch(error){
    console.error('Error redirecting');
    return res.status(500).json({error:'Internal server error'});
  }
}

module.exports = {
  shortenUrl,
  redirectToUrl
};