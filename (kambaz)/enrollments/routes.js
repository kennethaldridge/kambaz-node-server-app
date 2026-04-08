import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app, db) {
  const dao = EnrollmentsDao(db);

  const findCoursesForCurrentUser = async (req, res) => {
    try {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.status(401).json({ message: "Not signed in" });
        return;
      }
      const courses = await dao.findCoursesForUser(currentUser._id);
      res.json(courses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };

  const enrollUserInCourse = async (req, res) => {
    try {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.status(401).json({ message: "Not signed in" });
        return;
      }
      const { courseId } = req.params;
      const enrollment = await dao.enrollUserInCourse(currentUser._id, courseId);
      res.json(enrollment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };

  const unenrollUserFromCourse = async (req, res) => {
    try {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.status(401).json({ message: "Not signed in" });
        return;
      }
      const { courseId } = req.params;
      await dao.unenrollUserFromCourse(currentUser._id, courseId);
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };

  app.get("/api/users/current/enrollments", findCoursesForCurrentUser);
  app.post("/api/courses/:courseId/enrollments", enrollUserInCourse);
  app.delete("/api/courses/:courseId/enrollments", unenrollUserFromCourse);
}
