const isInstructor = (req, res, next) => {
  if (req.user.role !== "instructor") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Only instructors are allowed.",
    });
  }
  next();
};

export default isInstructor;
