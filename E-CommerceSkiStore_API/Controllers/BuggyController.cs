using Microsoft.AspNetCore.Mvc;

namespace E_CommerceSkiStore_API.Controllers
{
    [Route("api/buggy/")]
    public class BuggyController : BaseApiController
    {

        [HttpGet("not-found")]
        public ActionResult GetNotFound()
        {
            return NotFound();
        }
        [HttpGet("bad-request")]
        public ActionResult GetBadRequest()
        {
            return BadRequest(new ProblemDetails { Title= "This is a bad Request!" });
        }
        [HttpGet("unauthorised")]
        public ActionResult GetUnauthorised()
        {
            return Unauthorized();
        }
        [HttpGet("validation-error")]
        public ActionResult GetValidationError()
        {
            ModelState.AddModelError("Problem1","This is the first error");
            ModelState.AddModelError("Problem2", "This is the second error");
            return ValidationProblem();
        }
        [HttpGet("server-error")]
        public ActionResult GetServerError()
        {
            throw new Exception("This is a server error");
        }
    }
}
