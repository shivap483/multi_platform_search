import searchService from "../services/search.service"
import IController from "../types/IController"

const search:IController = async(req,res)=>{
    searchService.search(req.query.keyword).then((results:any)=>{
            return res.json({
                message: "search successful",
                searchResults: results
            })
        }).catch((err)=>{
        return res.status(err.statusCode).send(err.message)
    })
}

export default {
    search
}
