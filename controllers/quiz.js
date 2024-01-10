const db = require("../models");
const Quiz = db.quizzes;

// CREATE: untuk menambahkan data kedalam tabel quiz
exports.create = async (req, res) => {
    try {
        const data = await Quiz.create(req.body)
        res.json({
            message: "quiz created seccessfully.",
            data: data,
        })
    } catch (error) {
        res.status(500).json({
                message: error.message,
                data: null,            
        });
    }
}

// READ: menampilkan atau mengambil semua data quiz sesuai model dari database
exports.getAll = async (req, res) => {
    try {
        const quizzes = await Quiz.findAll()
        res.json({
            message: "Quizzes retrieved seccessfully.",
            data: quizzes,
        })
    } catch (error) {
        res.status(500).json({
                message: error.message,
                data: null,            
        });
    }
}

// UPDATE: mengubah data sesuai id yang dikirimkan
exports.update = async (req, res) => {
    const id = req.params.id
    try {
        const quiz = await Quiz.findByPk(id, { rejectOnEmpty: true })
        quiz.update(req.body, {
            where: {id}
        })
        res.json({
            message: "Quizzes updated seccessfully.",
            data: quiz,
        })
    } catch (error) {
        res.status(500).json({
                message: error.message || "Some error occured while retrieving quiz",
                data: null,            
        });
    }
}

// DELETE: menghapus data sesuai id yang dikirimkan
exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
        const quiz = await Quiz.findByPk(id, { rejectOnEmpty: true });
        
        quiz.destroy()

        res.json({
            message: "Quizzes deleted seccessfully.",
        })
    } catch (error) {
        res.status(500).json({
          message: error.message || "Some error occured while retrieving quiz",
          data: null,
        });
    }
}

// SHOWBYID: mengambil data sesuai id yang dikirimkan
exports.findOne = async (req, res) => {
    const id = req.params.id;
    try {
        const quiz = await Quiz.findByPk(id, { rejectOnEmpty: true });
        res.json({
            message: `Quizzes retrieved seccessfully with id=${id}.`,
            data: quiz,
        })
    } catch (error) {
        res.status(500).json({
          message: error.message || "Some error occured while retrieving quiz",
          data: null,
        });
    }
}

// SHOWBYCATEGORY: mengambil data sesuai category tertentu
exports.getByCategoryId = async (req, res) => {
    const id = req.params.id;
    const quizzes = await Quiz.findAll({
        where : {
            categoryId: id
        }
    })
    res.json({
        message: `Quizzes retrieved seccessfully with categoryId=${id}.`,
        data: quizzes,
    });
}

// SHOWBYLEVEL: mengambil data sesuai level tertentu
exports.getByLevelId = async (req, res) => {
    const id = req.params.id;
    const quizzes = await Quiz.findAll({
        where : {
            levelId: id
        }
    })
    res.json({
        message: `Quizzes retrieved seccessfully with levelId=${id}.`,
        data: quizzes,
    });
}