try{

    const updated=await User.findOneAndUpdate({_id:req.query.id},{verified:true},{ new: true})
    if(updated)
    {    res.status(200).json({message:"email verified"})}
    else  res.status(404).json({message:"Account not found"})
  }
  catch(error)
  {
    console.log('errr:'+ error.message)
    res.status(400).json(error.message)
  }