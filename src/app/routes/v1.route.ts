import express from "../config/express";
import searchController from "../controllers/search.controller";

const router = express.Router();

router.get('/search', searchController.search)

export default router;
