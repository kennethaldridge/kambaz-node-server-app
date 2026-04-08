import ModulesDao from "../modules/dao.js";

export default function ModulesRoutes(app, db) {
  const dao = ModulesDao(db);

  const findModulesForCourse = async (req, res) => {
    try {
      const { courseId } = req.params;
      const modules = await dao.findModulesForCourse(courseId);
      res.json(modules);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };

  const createModuleForCourse = async (req, res) => {
    try {
      const { courseId } = req.params;
      const newModule = await dao.createModule(courseId, req.body);
      res.json(newModule);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };

  const updateModule = async (req, res) => {
    try {
      const { courseId, moduleId } = req.params;
      const status = await dao.updateModule(courseId, moduleId, req.body);
      res.json(status);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };

  const deleteModule = async (req, res) => {
    try {
      const { courseId, moduleId } = req.params;
      const status = await dao.deleteModule(courseId, moduleId);
      res.json(status);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };

  app.get("/api/courses/:courseId/modules", findModulesForCourse);
  app.post("/api/courses/:courseId/modules", createModuleForCourse);
  app.put("/api/courses/:courseId/modules/:moduleId", updateModule);
  app.delete("/api/courses/:courseId/modules/:moduleId", deleteModule);
}
