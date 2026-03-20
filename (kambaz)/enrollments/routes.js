import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app, db) {
  const dao = EnrollmentsDao(db);

  const findMyEnrollments = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.status(401).json({ message: "Not signed in" });
      return;
    }

    const enrollments = dao.findEnrollmentsForUser(currentUser._id);
    res.json(enrollments);
  };

  const enrollUserInCourse = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.status(401).json({ message: "Not signed in" });
      return;
    }

    const { courseId } = req.params;
    const enrollment = dao.enrollUserInCourse(currentUser._id, courseId);
    res.json(enrollment);
  };

  const unenrollUserFromCourse = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.status(401).json({ message: "Not signed in" });
      return;
    }

    const { courseId } = req.params;
    dao.unenrollUserFromCourse(currentUser._id, courseId);
    res.sendStatus(200);
  };

  app.get("/api/users/current/enrollments", findMyEnrollments);
  app.post("/api/courses/:courseId/enrollments", enrollUserInCourse);
  app.delete("/api/courses/:courseId/enrollments", unenrollUserFromCourse);
}