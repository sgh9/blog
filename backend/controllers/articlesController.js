import Article from '../models/articlesModel.js';

export const getArticles = async(req, res)=> {
    try {
        const articles = await Article.find({});
        res.status(200).send(articles);
        
    } catch (error) {
        res.status(401).send(error.message);
    }

}

export const getUserArticles = async(req, res)=> {
    try {
        const articles = await Article.find({ userId: req.user._id});
        res.status(200).send(articles);
        
    } catch (error) {
        console.error(error);
        res.status(401).send(error.message);
    }

}

export const postArticle = async(req, res)=> {
    const article = new Article(req.body);
    article.userId = req.user._id;
    try {
       const result =  await article.save();
       res.status(200).json(result);

    } catch (error) {
        res.status(401).send(error.message);
    }
    
}

export const getArticle = async(req, res)=> {
    const id = req.params.id;

    try {
        const article = await Article.findById(id);
        res.status(200).json(article);

    } catch (error) {
        res.status(401).send(error.message);
    }
    
}

export const updateArticle = async(req, res)=> {
    const id = req.params.id;
    console.log("req b",req.body)
    const {title, desc, category } = req.body;

    const userId =  req.user._id;

    try {
        const article = await Article.findOne({_id: id});

        console.log({article, userId})

        if(!article) {
            return res.status(404).send({msg: "not article"});
        }

        if(!article.userId.equals(userId)) {
            return res.status(401).send({msg: "not Autorized"});
        }

        article.title = title;
        article.desc = desc;
        article.category = category;

        await article.save();
        res.status(200).json(article);

    } catch (error) {
        res.status(401).send(error.message);
    }
    
}

export const DeleteArticle = async(req, res)=> {
    const id = req.params.id;
    const userId =  req.user._id;

    try {
        const deleteArticle = await Article.findOne({_id: id});

        if(!deleteArticle.userId.equals(userId)) {
            return res.status(401).send({msg: "not Autorized"});
        }

        const article = await Article.findByIdAndDelete(id);

        if(!article) {
            return res.status(201).json({msg: "No Article Exists"});
        }
        res.status(200).json({msg: "Article deleted successfully", id: article._id});

    } catch (error) {
        res.status(401).send(error.message);
    }
    
}