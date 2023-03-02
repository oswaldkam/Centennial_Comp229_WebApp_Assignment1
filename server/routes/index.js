let express = require("express");
let router = express.Router();
let indexController = require("../controllers/index");

/* GET home page. */
router.get("/", indexController.displayHomePage);

router.get("/home", indexController.displayHomePage);

/*GET Route for displaying the Login page*/
router.get("/login", indexController.displayLoginPage);

/*POST Route for processing the Login Page*/

router.post("/login", indexController.processLoginPage);

/*GET Route for register page*/
router.get("/register", indexController.displayRegisterPage);

/*POST Route for processing the Register page*/
router.post("/register", indexController.processRegisterPage);

/*GET to perform userLogout*/
router.get("/logout", indexController.performLogout);

function requireAuth(req, res, next) {
  console.log(req.isAuthenticated);
  //check if the user is logged in
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  next();
}
//connect to our contacts model
let contactController = require("../controllers/contact");
//GET ROUTE for the contact list page -READ OPERATION
router.get("/contact/list", requireAuth, contactController.displayContactList);

/*GET Route for displaying the Add Page- CREATE Operation*/
router.get("/contact/add", requireAuth, contactController.displayAddPage);

/* POST Route for processing the Add Page - CREATE operation*/

router.post("/contact/add", requireAuth, contactController.processAddPage);

/*GET Route for displaying the Edit page - UPDATE operation*/

router.get("/contact/edit/:id", requireAuth, contactController.displayEditPage);

/*POST Route for processing the Edit page - UPDATE Operation*/
router.post(
  "/contact/edit/:id",
  requireAuth,
  contactController.processEditPage
);

/*GET to perform Deletion - DELETE Operation */
router.get("/contact/delete/:id", requireAuth, contactController.performDelete);

module.exports = router;
