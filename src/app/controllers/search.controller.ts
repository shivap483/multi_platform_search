import searchService from "../services/search.service"
import IController from "../types/IController"

const search:IController = async(req,res)=>{
    searchService.search(req.query).then((searchResults:any)=>{
            return res.json({
                message: "loan created",
                results: { ...searchResults }
            })
        }).catch((err)=>{
        return res.status(err.statusCode).send(err.message)
    })
}

export default {
    search
}
