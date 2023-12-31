const prisma = require("../prisma");
const router = require("express").Router();
module.exports = router;

// /api/students - GET all students
router.get("/", async (req, res, next) => {
  try {
    const students = await prisma.student.findMany();
    res.json(students);
  } catch (err) {
    next(err);
  }
});

// /api/students/:id - GET the details of student specified by the id
router.get("/:id", async (req, res, next) => {
  try {
    const id = +req.params.id;
    const result = await prisma.student.findUnique({
      where: {
        id: id,
      },
    });
    if (!result) {
      return next({
        status: 404,
        message: `Could not find student with id ${id}`,
      });
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// /api/students - POST, create a new student
router.post("/", async (req, res, next) => {
  try {
    const { firstName, lastName, email, gpa, imageUrl } = req.body;
    if (!firstName || !lastName || !email) {
      const error = {
        status: 400,
        message: "Must provide first name, last name, and email.",
      };
      return next(error);
    }
    const newStudent = await prisma.student.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        gpa: gpa,
        imageUrl: imageUrl
      },
    });
    res.json(newStudent);
  } catch (err) {
    next(err);
  }
});

// /api/students/:id - PATCH, updates a student by id number
router.patch("/:id", async (req, res, next) => {
  try {
    const id = +req.params.id;

    const { firstName, lastName, email, gpa, imageUrl } = req.body;

    const updateStudent = await prisma.student.update({
      where: { id: id },
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        gpa: gpa,
        imageUrl: imageUrl
      },
    });

    res.json(updateStudent);
  } catch (err) {
    next(err);
  }
});

// /api/students/:id - DELETE, deletes a student by id number
router.delete("/:id", async (req, res, next) => {
  try {
    const id = +req.params.id;
    const result = await prisma.student.delete({
      where: {
        id: id,
      },
    });
    if (!result) {
      return next({
        status: 404,
        message: `Could not find student with id ${id}`,
      });
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
});
