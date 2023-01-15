const Thing = require('../models/thing');

//route to create a record and save to db
exports.createThing = (req, res, next) => {
    req.body.thing = JSON.parse(req.body.thing);
    const url = req.protocol + '://' + req.get('host');
    const thing = new Thing({
      title: req.body.thing.title,
      description: req.body.thing.description,
      imageUrl: url + '/images/' + req.file.filename,
      price: req.body.thing.price,
      userId: req.body.thing.userId
    });
    thing.save().then(() => {
        res.json({
          message: 'Post saved successfully!'
        });
      }
    ).catch( (error) => {
        res.json({ error: error });
      });
  };
//route to fetch one thing
exports.getOneThing = (req,res,next)=>{
    Thing.findOne({
        _id: req.params.id
    }).then((thing) =>{
        res.json(thing);
    }) .catch( (error) =>{
        res.json(error)
    });
    };
//route to update one thing
exports.modifyThing =(req,res,next)=>{
    const thing = new Thing({
        _id: req.params.id,
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        userId: req.body.userId
    });
    Thing.updateOne({_id: req.params.id}, thing).then(() =>{
        res.json({message:'thing updated succesfully'});
    }).catch( (error) =>{
        res.json(error)
    });
    };

// route to delete

exports.deleteThing =(req,res,next)=>{
    
        Thing.deleteOne({_id: req.params.id}).then(() =>{
            res.json({message:'deleted'});
        }) .catch( (error) =>{
            res.json(error)
        });

   
    };
//route to fetch everything
exports.getAllStuff =(req,res,next)=>{
Thing.find().then((Thing) =>{
    res.json(Thing);
}) .catch( (error) =>{
    res.json(error)
});
};